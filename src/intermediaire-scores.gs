/** @OnlyCurrentDoc */
/* ============================================================
   INTERMÉDIAIRE DES SCORES — Révisions Livio & Liano (refonte 2026, étape D4)
   À coller dans Apps Script, attaché à la feuille Google « Révisions – scores ».
   Versions : 1 (01.11.2026) · 1.1 (01.11.2026 : @OnlyCurrentDoc, l'autorisation Google ne couvre que cette feuille).

   Ce qu'il fait : il est le seul à lire et écrire la feuille. Les outils de révision (site GitHub Pages)
   lui envoient leurs tests ; il vérifie le code de l'élève, puis range le test dans l'onglet de l'élève.
   Aucune clé ni aucun code n'est écrit dans les pages du site : les codes vivent ici, dans les
   « Propriétés du script » (Paramètres du projet → Propriétés du script) :
       CODE_LIVIO = (le code de Livio)
       CODE_LIANO = (le code de Liano)

   La feuille : un onglet par élève (« Livio », « Liano »), créé s'il manque. Une ligne par enregistrement :
       A id · B outil (QUIZ_ID) · C type (test | doc = test en cours | suppr = test effacé) · D date du test · E mis à jour le · F… le contenu JSON,
       coupé en morceaux de 45 000 caractères (une cellule Google en accepte 50 000).
   On peut lire la feuille, mais il ne faut pas la modifier à la main.

   Protocole (POST, corps JSON en texte simple) :
       { eleve, code, action:"ping" }                        → { ok:true }
       { eleve, code, action:"list", quiz }                  → { ok:true, items:[{ id, type, date, maj, data }] }
       { eleve, code, action:"batch", ops:[{ op:"put"|"del", quiz, id, type, date, data }] }
                                                             → { ok:true, done:n }
   Protections : code vérifié à chaque appel ; 8 codes faux de suite → l'élève est bloqué 15 minutes ;
   50 opérations au plus par envoi, 400 000 caractères au plus par enregistrement ; un seul envoi écrit à la fois.
   ============================================================ */

const ELEVES = ["Livio", "Liano"];
const MORCEAU = 45000, MAX_OPS = 50, MAX_TAILLE = 400000, ESSAIS = 8, BLOCAGE_S = 900;

function doPost(e){
  let req;
  try { req = JSON.parse(e.postData.contents); } catch(err){ return reponse({ ok:false, erreur:"requete" }); }
  return reponse(traiter(req));
}
function doGet(){ return reponse({ ok:true, service:"revisions-scores", version:1 }); }

function traiter(req){
  const eleve = String(req.eleve || "");
  if (ELEVES.indexOf(eleve) < 0) return { ok:false, erreur:"eleve" };
  const cache = CacheService.getScriptCache(), cle = "essais-" + eleve;
  const essais = Number(cache.get(cle) || 0);
  if (essais >= ESSAIS) return { ok:false, erreur:"bloque" };
  const attendu = PropertiesService.getScriptProperties().getProperty("CODE_" + eleve.toUpperCase());
  if (!attendu || String(req.code || "") !== attendu){ cache.put(cle, String(essais + 1), BLOCAGE_S); return { ok:false, erreur:"code" }; }
  cache.remove(cle);

  if (req.action === "ping") return { ok:true };
  const feuille = onglet(eleve);
  if (req.action === "list") return { ok:true, items:lister(feuille, String(req.quiz || "")) };
  if (req.action === "batch"){
    const ops = Array.isArray(req.ops) ? req.ops : [];
    if (ops.length > MAX_OPS) return { ok:false, erreur:"trop" };
    const verrou = LockService.getScriptLock();
    if (!verrou.tryLock(20000)) return { ok:false, erreur:"occupe" };
    try {
      let n = 0;
      ops.forEach(o => { if (appliquer(feuille, o)) n++; });
      return { ok:true, done:n };
    } finally { verrou.releaseLock(); }
  }
  return { ok:false, erreur:"action" };
}

function onglet(eleve){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let f = ss.getSheetByName(eleve);
  if (!f){ f = ss.insertSheet(eleve); }
  if (f.getLastRow() === 0) f.appendRow(["id", "outil", "type", "date", "mis à jour", "contenu (JSON, suite dans les colonnes suivantes)"]);
  return f;
}

function lister(f, quiz){
  const n = f.getLastRow(); if (n < 2) return [];
  const larg = Math.max(6, f.getLastColumn());
  const lignes = f.getRange(2, 1, n - 1, larg).getValues();
  const out = [];
  lignes.forEach(l => {
    if (String(l[1]) !== quiz) return;
    const json = l.slice(5).map(String).join("");
    let data = null; try { data = json ? JSON.parse(json) : null; } catch(err){ return; }
    out.push({ id:String(l[0]), type:String(l[2]), date:Number(l[3]) || 0, maj:Number(l[4]) || 0, data });
  });
  return out;
}

function trouver(f, quiz, id){
  const n = f.getLastRow(); if (n < 2) return 0;
  const ids = f.getRange(2, 1, n - 1, 2).getValues();
  for (let i = 0; i < ids.length; i++) if (String(ids[i][0]) === id && String(ids[i][1]) === quiz) return i + 2;
  return 0;
}

function appliquer(f, o){
  const quiz = String(o.quiz || ""), id = String(o.id || "");
  if (!quiz || !id || quiz.length > 120 || id.length > 160) return false;
  const ligne = trouver(f, quiz, id);
  if (o.op === "del"){ if (ligne) f.deleteRow(ligne); return true; }
  if (o.op !== "put") return false;
  const json = JSON.stringify(o.data == null ? null : o.data);
  if (json.length > MAX_TAILLE) return false;
  const morceaux = []; for (let i = 0; i < json.length; i += MORCEAU) morceaux.push(json.slice(i, i + MORCEAU));
  const valeurs = [id, quiz, (o.type === "doc" || o.type === "suppr") ? o.type : "test", Number(o.date) || 0, Date.now()].concat(morceaux);
  const cible = ligne || f.getLastRow() + 1;
  if (ligne){ const larg = f.getLastColumn(); if (larg > 5) f.getRange(ligne, 6, 1, larg - 5).clearContent(); }
  /* le texte est forcé en texte brut (sinon Google pourrait transformer un morceau qui ressemble à un nombre ou une date) */
  f.getRange(cible, 1, 1, valeurs.length).setNumberFormat("@").setValues([valeurs.map(String)]);
  return true;
}

function reponse(obj){ return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }

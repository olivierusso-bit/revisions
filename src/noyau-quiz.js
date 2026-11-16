/* ============================================================
   NOYAU QUIZ — code commun à tous les outils de révision
   (prompt-artefact-revision.md § 2 à § 10 ; refonte 2026, étape C1).
   Assemblé en dernier, après le contenu et la couche, dans un seul <script>.

   Ce que le noyau attend du CONTENU : QUIZ_ID, DUE, THEME, VERSION, OUTIL, SOURCES, SOURCES_NOTE, PHOTOS, DECKS, FICHE, TAG_LABEL.
   Réglages facultatifs d'OUTIL (étape C2) : badgeHtml (remplace le maillot de l'en-tête), comptes ([10,20,30,0] = « Combien de questions »,
   0 = toutes) et compteDefaut, compte ("cartes" pour compter les cartes au lieu des éléments), umlautsStricts (ä ≠ a à la correction),
   accentsStricts (v9 : aucun accent retiré, é ≠ e, ç ≠ c…, pour la correction, la correction en direct et « Voir mes erreurs »),
   prefixeIndice (devant l'indice, défaut « petit indice : »), sousNiveaux ({easy, normal, hard}), conseilSetup (phrase sous « Commencer »
   hors correction en direct), noteAutre (phrase quand la réponse écrite n'a rien à voir).
   Une section de FICHE peut porter html (chaîne ou fonction qui la rend, déjà échappée) et count, en plus de pairs / tips / astuce.
   Ce qu'il attend de la COUCHE : l'objet COUCHE (rings, allCards, buildTest, isRight, cardFace, liveCands, hasLive).
   Il fournit : stockage (Claude db / navigateur / mémoire), test en cours gardé, suivi graphique (anneaux, courbe,
   jour par jour, cartes qui résistent), Bilan, « Voir mes erreurs », rattrapage, note suisse, version papier,
   onglets et écrans, prompt d'analyse (âge déduit de la classe, jamais écrit en dur).
   Les clés de stockage et le format des historiques sont ceux des outils précédents : rien n'est perdu.
   Versions : 1 (01.11.2026, C1, né du modèle de français v4) · 2 (01.11.2026, C2 : réglages facultatifs d'OUTIL ci-dessus, Umlaute,
   nombre de questions, faute de frappe enregistrée, test en cours plus complet, source dans le corrigé et la copie, cartes homonymes distinguées)
   · 3 (01.11.2026, C3 : moteur à un anneau (maths, Dossier), réglages par paquet et ordre des questions, accroches de la couche Maths)
   · 4 (01.11.2026, D4 : synchronisation des scores et du test en cours entre appareils, sur le site seulement — voir SYNC)
   · 5 (01.11.2026, D4 : bouton « Entrer mon code » dans l'onglet Scores, état de la synchronisation affiché aussi quand l'historique est vide)
   · 6 (01.11.2026, C4 : accroches de la couche Dossier, sans changement pour les langues et les maths)
   · 7 (01.11.2026, D6 : réglages facultatifs OUTIL.paquetsCoches (paquets cochés à l'ouverture) et OUTIL.introPaquets (html de l'intro
   de l'écran Paquets) ; « les cartes qui résistent » prennent le label de la carte (couche) si la question enregistrée n'en a pas ;
   un test en cours gardé avec liveFixed en { l, s } (ancien format) est relu ; accroche facultative de la couche
   COUCHE.clavier(q) = clavier du téléphone pour une réponse à écrire (« numeric », « text ») ; sans ces réglages, rien ne change)
   · 8 (01.11.2026, contrôle qualité : version papier réglée par la couche — COUCHE.papierGrille (cadre quadrillé de 3 mm sous chaque
   réponse à écrire, maths) et COUCHE.papierSource (source de la question sous chaque question, Dossier) ; sans ces réglages, rien ne change)
   · 9 (08.11.2026 : réglage facultatif OUTIL.accentsStricts — deAcc() ne retire plus aucun accent : é ≠ e, è ≠ e, ê ≠ e, â ≠ a,
   î ≠ i, û ≠ u, ç ≠ c… à la correction (norm), dans la correction en direct (lvUnit) et dans « Voir mes erreurs » (dxN) ;
   comme umlautsStricts pour ä ö ü, qu'il englobe ; sans ce réglage, rien ne change)
   · 10 (14.11.2026 : temps de révision — chronomètre actif par question (arrêté quand la page passe en arrière-plan, se ferme
   ou est gardée pour plus tard ; au plus 2 minutes comptées sans clic ni frappe), morceaux de travail entre deux pauses ;
   enregistrés dans le test en cours (qms, mc, ms par réponse) et dans le test terminé (actif, morceaux, ms par question) ;
   onglet Scores : bloc « ⏱ Mon temps de révision » (7 derniers jours, temps moyen par question, barres jour par jour, temps par
   paquet, questions les plus longues et « Refaire ces questions ») et temps actif sous chaque test de l'historique ;
   les tests d'avant la v10 restent tels quels, « temps non mesuré »)
   · 11 (15.11.2026 : bouton « 🔁 Réviser mes erreurs (N) », commun à tous les outils, en haut de l'écran Paquets (sous la
   pastille générale) et dans l'onglet Scores (au-dessus de « Les cartes qui résistent ») — un vrai test « Je m'entraîne », au niveau
   des réglages, sur toutes les cartes en erreur, tous paquets confondus, questions tirées à nouveau ; une carte est en erreur dès
   qu'elle est ratée au premier passage d'un test (jamais un rattrapage) et en sort quand, après sa dernière erreur, elle a été
   réussie au premier passage de tests faits deux jours différents ; le test garde revErreurs: true et la mention « Révision des
   erreurs » ; un seul test à la fois respecté ; sans ce bouton touché, rien ne change)
   · 12 (15.11.2026 : cercles calculés sur les cartes déjà posées — chaque anneau (ou l'anneau unique) prend la note de ses cartes
   justes au dernier passage à son niveau sur les cartes déjà posées à ce niveau (plus sur tout le paquet) ; centre « justes/posées »
   du niveau le plus difficile déjà testé ; mêmes seuils (sous 4 rouge, 4–4,5 orange, 5 et plus vert) ; dessin inchangé (les arcs
   gardent leur longueur sur le total du paquet) ; moins de 50 % du paquet posé → « réussi, à compléter » au lieu de « réussi » ;
   « OK ✓ » seulement si tout le paquet est posé (au Niveau épreuve pour trois anneaux) et 75 % ou plus des cartes acquises ;
   flèche ↗ / ↘ sur la part de justes parmi les posées ; nouvelle barre des cartes testées (« N/M <unité> testés », cases pleines
   et vides) sous la pastille générale, sur l'écran Paquets, dans les sections de la fiche liées à un paquet et dans le sommaire
   du Dossier, avec « Tester les X pas encore posés » (« Je m'entraîne », un seul test à la fois) ; « Réviser mes erreurs » inchangé)
   · 13 (16.11.2026 : barre des cartes testées par niveau — avec trois anneaux, trois lignes compactes dans l'ordre des cercles
   (Échauffement, Entraînement, Niveau épreuve) : nom du niveau, barre fine de cases pleines et vides, « N/M » (cartes posées au
   moins une fois au premier passage d'un test à ce niveau, sur le total du paquet ; rattrapages exclus ; « 0/M » si jamais testé),
   et au bout « Tester les X » (test « Je m'entraîne » sur ces cartes, à ce niveau, un seul test à la fois ; libellé complet pour les
   lecteurs d'écran) ou « ✓ complet » ; avec un anneau, une seule ligne tous niveaux, dont le bouton lance le test au niveau des
   réglages ; à 390 px, le bouton passe sous la barre quand la place manque ; l'ancien bouton « Tester les X pas encore posés »
   est retiré ; même chose sous la pastille générale, sous chaque paquet, dans la Fiche et dans le sommaire du Dossier ;
   cercles et « Réviser mes erreurs » inchangés).
   · 14 (16.11.2026 : « Réviser mes erreurs » avec son propre choix de niveau — trois boutons ○ Échauffement, □ Entraînement,
   ◆ Niveau épreuve sous le bouton (Niveau épreuve par défaut, indépendant des réglages du test) ; une carte ne sort de la liste
   que réussie deux jours différents au niveau de son erreur ou plus haut (le plus haut niveau raté depuis son entrée dans la liste) ;
   aucune limite de cartes ; le niveau du test en cours (S.qDiff) est séparé du niveau des réglages (S.difficulty) : « Refaire ces
   cartes », « Tester les X », « Réviser mes erreurs », un rattrapage ou un test repris ne changent plus les réglages ;
   « Mes … jour après jour » : chaque case montre le pourcentage du test le plus exigeant du jour, précédé de son symbole
   (○ □ ◆ ★, comme la courbe), « + » quand d'autres niveaux ont été joués ce jour-là, détail au survol et en touchant la case ;
   en haut de l'onglet Scores, les tuiles « meilleure » et « moyenne » sont remplacées par le tableau « notes par niveau » :
   ○ □ ◆ (tests faits à ce niveau, hors épreuves blanches) et ★ (épreuves blanches), avec tests, moyenne et meilleure note).
   · 15 (16.11.2026 : symboles des niveaux dessinés — ○ Échauffement (rond), □ Entraînement (carré), ◆ Niveau épreuve (losange plein),
   ★ Épreuve blanche (étoile) ne sont plus des caractères de texte : ils sont dessinés en SVG avec exactement les formes des points
   de la courbe (formeNiv(), commune à la courbe et aux symboles), réduits à la taille du texte et alignés sur la ligne, dans la couleur
   du texte (currentColor) ; partout où ils apparaissent : légende sous la courbe, cases, détail et légende de « … jour après jour »,
   tableau des notes par niveau et sa phrase, trois boutons de niveau de « Réviser mes erreurs » ; dessin décoratif (aria-hidden),
   le nom du niveau reste écrit ou lu ; les libellés des cases pour les lecteurs d'écran et au survol donnent le nom sans le caractère ;
   NIV_SYMB reste défini (équivalent texte, repère du noyau v14 pour assembler.py) ; rien d'autre ne change).
   · 16 (16.11.2026 : avancement dans l'onglet Scores — le grand cadre « N tests » est retiré ; trois anneaux : dans le tableau des notes
   par niveau, sous le nom de ○ Échauffement, □ Entraînement et ◆ Niveau épreuve, une barre fine de cases pleines et vides et « N/M »
   (+ « ✓ » quand c'est complet), même calcul que les lignes des cartes testées de la pastille générale (couverture() sur tout l'outil :
   cartes posées au premier passage d'un test à ce niveau, rattrapages exclus) ; pas de barre pour ★ Épreuve blanche (elle compte déjà au
   niveau où elle est faite) ; aucun bouton ; un anneau (maths, Dossier) : une seule ligne « Questions testées » (ou « Cartes testées »),
   tous niveaux, au-dessus du tableau, sans barre par niveau ; le nombre total de tests passe dans la phrase sous le tableau ;
   lisible sans les couleurs (cases pleines et vides, nombres écrits, texte pour les lecteurs d'écran) ; rien d'autre ne change).
   Accroches ajoutées à C4 (toutes facultatives) : COUCHE.vueFiche() remplace l'écran Fiche et OUTIL.ongletFiche [emoji, nom] son onglet ;
   COUCHE.vueCartes() remplace l'écran Cartes ; COUCHE.etat (champs ajoutés à S) ; COUCHE.charger() (au chargement, après le stockage) ;
   COUCHE.action(act, v, el) (boutons data-act que le noyau ne connaît pas) ; COUCHE.surNav() (changement d'onglet) ; COUCHE.onChange(e),
   COUCHE.onInput(e) ; COUCHE.sousQuestion(q) (html sous l'énoncé pendant le test) ; COUCHE.carteDe(question) (carte d'une question
   enregistrée sans champ card) ; COUCHE.acquisAvantLibre (une carte est acquise si la dernière réponse est écrite, même si la précédente
   était à choix) ; refreshCards() recalcule les cartes (cartes retirées des tests). OUTIL.cePaquet (« Ce chapitre ») dans l'état d'un paquet.
   Réglages facultatifs ajoutés à C3 : comptesParPaquet (le nombre de questions vaut pour chaque paquet), compteLabel, ordres
   ({clé:{label, sub, emoji}} = « Ordre des questions »), sousEntete (html ou fonction, sous l'en-tête hors du quiz), ficheOuverte,
   titreAstuceNeg, motPaquets (pluriel). Un paquet peut porter code (« Obj. 1 ») et detail ; une section de FICHE num, deck, miss, astuceNeg.
   Accroches facultatives de la COUCHE : affiche(s) (écriture affichée, ex. 10^7 → 10⁷), classeMot(q), classeChoix(o), badges(q),
   saisie(q, Q) (html sous le champ), onSaisie(Q), diffEntiere (réponse fausse barrée en entier), wrote(question) (pour un anneau).
   ============================================================ */

const HAS_CLAUDE = !!(window.claude && window.claude.use);
const INDEX_KEY = QUIZ_ID + "-index";
const ATTEMPT_PREFIX = QUIZ_ID + "-attempt-";
const DRAFT_ID = QUIZ_ID + "-test-en-cours";
const DECK = Object.fromEntries(DECKS.map(d => [d.key, d]));

/* âge approximatif déduit de la classe HarmoS (socle, table_harmos) : 5e → 8-9 ans … 10e → 13-14 ans */
function ageDeClasse(classe){
  const m = /(\d+)\s*e/.exec(classe || ""); if (!m) return "";
  const n = +m[1], a = n + 3; return `${a} à ${a + 1} ans`;
}
const AGE_ELEVE = ageDeClasse(OUTIL.classe);

const SOUS_NIVEAUX = Object.assign({ easy:"Je choisis parmi des réponses", normal:"Je choisis et j'écris", hard:"J'écris les réponses" }, OUTIL.sousNiveaux || {});
const DIFFICULTIES = {
  easy:{ label:"Échauffement", sub:SOUS_NIVEAUX.easy, emoji:"🟢" },
  normal:{ label:"Entraînement", sub:SOUS_NIVEAUX.normal, emoji:"🔵" },
  hard:{ label:"Niveau épreuve", sub:SOUS_NIVEAUX.hard, emoji:"🔴" },
};
/* nombre de questions par test : liste proposée par l'outil (0 = toutes) ; sans liste, toutes les questions */
const COUNTS = Array.isArray(OUTIL.comptes) && OUTIL.comptes.length ? OUTIL.comptes : null;
const UMLAUTS_STRICTS = !!OUTIL.umlautsStricts;
const ACCENTS_STRICTS = !!OUTIL.accentsStricts;
const ORDRES = OUTIL.ordres || null;
const AFF = s => COUCHE.affiche ? COUCHE.affiche(s == null ? "" : String(s)) : (s == null ? "" : String(s));
const MOT_PAQUETS = OUTIL.motPaquets || (OUTIL.motPaquet.toLowerCase() + "s");
const LVL_OF_LABEL = { "Échauffement":0, "Entraînement":1, "Niveau épreuve":2 };
const MODES = COUCHE.hasLive ? {
  train:{ label:"Je m'entraîne", sub:"Correction après chaque question", emoji:"🃏" },
  live:{ label:"Correction en direct", sub:"Chaque lettre fausse est marquée pendant que tu écris", emoji:"✍️" },
  exam:{ label:"Épreuve blanche", sub:"Correction seulement à la fin", emoji:"⏱️" },
} : {
  train:{ label:"Je m'entraîne", sub:"Correction après chaque question", emoji:"🃏" },
  exam:{ label:"Épreuve blanche", sub:"Correction seulement à la fin", emoji:"⏱️" },
};

/* ---------- utilitaires ---------- */
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
/* enlève les accents ; avec umlautsStricts, ä ö ü restent distincts de a o u (c'est ce que la leçon d'allemand fait apprendre) ;
   avec accentsStricts (v9), aucun accent n'est retiré (é, è, ê, â, î, û, ç… comptent, comme en conjugaison française) */
function deAcc(s){
  s = String(s);
  if (ACCENTS_STRICTS) return s.normalize("NFC");
  if (UMLAUTS_STRICTS) s = s.replace(/ä/g,"\u0001").replace(/ö/g,"\u0002").replace(/ü/g,"\u0003");
  s = s.normalize("NFD").replace(/[̀-ͯ]/g,"");
  return UMLAUTS_STRICTS ? s.replace(/\u0001/g,"ä").replace(/\u0002/g,"ö").replace(/\u0003/g,"ü") : s;
}
function norm(s, apoMode){
  return deAcc(String(s || "").toLowerCase().replace(/ß/g,"ss").normalize("NFC"))
    .replace(/…|\.\.\./g," ").replace(/[’'`]/g, apoMode === "del" ? "" : " ")
    .replace(/[.!?;,:«»"()\/\-+–]/g," ").replace(/\s+/g," ").trim();
}
const stripFr = s => s.replace(/^(le |la |les |l |un |une |des |du |de la |d )/,"").trim();
const stripDe = s => s.replace(/^(der |die |das )/,"").trim();
/* article facultatif (sauf keep) : français le/la/les…, allemand der/die/das */
function matchAnswer(input, accept, lang, keep){
  return ["sp","del"].some(m => {
    const a = norm(input, m); if (!a) return false;
    return accept.some(raw => { const b = norm(raw, m); if (a === b) return true; if (keep) return false;
      if (lang === "fr") return stripFr(a) === stripFr(b);
      if (lang === "de") return stripDe(a) === stripDe(b);
      return false; });
  });
}
function shuffle(arr){ const a = [...arr]; for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; } return a; }
function pickOptions(good, pool, wide, valueFn){
  const out = [], seen = new Set([good]);
  const take = list => shuffle(list).forEach(x => { if (out.length >= 3) return; const v = valueFn(x); if (v && !seen.has(v)){ seen.add(v); out.push(v); } });
  take(pool); if (out.length < 3) take(wide);
  return shuffle([good, ...out]);
}
const noteFrom = r => Math.round((1 + 5*r)*2)/2;
const fmtNote = n => Number(n).toFixed(1).replace(".", ",");
function dateLabel(ts){ const d = new Date(ts), p = x => String(x).padStart(2,"0"); return `${p(d.getDate())}.${p(d.getMonth()+1)}.${d.getFullYear()} · ${p(d.getHours())}h${p(d.getMinutes())}`; }
function dayOf(t){ const d = new Date(t); return d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate(); }

/* ---------- cartes ---------- */
let CARDS = COUCHE.allCards();
let CARD = Object.fromEntries(CARDS.map(c => [c.k, c]));
/* la couche peut changer ses cartes après le chargement (couche Dossier : cartes retirées des tests par la revue) */
function refreshCards(){ CARDS = COUCHE.allCards(); CARD = Object.fromEntries(CARDS.map(c => [c.k, c])); }
function deckCards(dk){ return CARDS.filter(c => c.dk === dk); }
function buildTest(deckKeys, difficulty, limit, order){ return COUCHE.buildTest(deckKeys, difficulty, limit || 0, order || (ORDRES ? Object.keys(ORDRES)[0] : "")); }
/* ce que l'écran Paquets compte : les éléments des paquets, ou les cartes (OUTIL.compte = "cartes") */
function compteSel(keys){ const n = keys.reduce((s,k) => s + (OUTIL.compte === "cartes" ? deckCards(k).length : DECK[k].items.length), 0); return { n, mot: OUTIL.compte === "cartes" ? "carte" : OUTIL.compte === "questions" ? "question" : "élément" }; }

/* ---------- stockage ---------- */
const store = {
  mode:"memory", col:null, mem:{}, memDocs:{},
  async init(){
    try {
      if (window.claude && window.claude.use){
        const [db, user] = await Promise.all([window.claude.use("db"), window.claude.use("user")]);
        if (db && user){ const uid = await user.id(); if (uid){ this.col = db.collection("data/users/" + uid); this.mode = "db"; return; } }
      }
    } catch(e){}
    try { localStorage.setItem(QUIZ_ID + "-probe","1"); localStorage.removeItem(QUIZ_ID + "-probe"); this.mode = "local"; } catch(e){ this.mode = "memory"; }
  },
  async list(){
    if (this.mode === "db"){ const snap = await this.col.limit(1000).get(); return snap.docs.filter(d => d.id.startsWith(ATTEMPT_PREFIX)).map(d => d.data()).filter(Boolean); }
    if (this.mode === "local"){ const idx = JSON.parse(localStorage.getItem(INDEX_KEY) || "[]"); return idx.map(id => { try { return JSON.parse(localStorage.getItem(ATTEMPT_PREFIX + id)); } catch(e){ return null; } }).filter(Boolean); }
    return Object.values(this.mem);
  },
  async save(att){
    if (this.mode === "db"){ await this.col.doc(ATTEMPT_PREFIX + att.id).set(att); return; }
    if (this.mode === "local"){ this.saveLocal(att); SYNC.sauver(att); return; }
    this.mem[att.id] = att;
  },
  saveLocal(att){ localStorage.setItem(ATTEMPT_PREFIX + att.id, JSON.stringify(att)); const idx = JSON.parse(localStorage.getItem(INDEX_KEY) || "[]"); if (!idx.includes(att.id)) idx.unshift(att.id); localStorage.setItem(INDEX_KEY, JSON.stringify(idx)); },
  removeLocal(id){ localStorage.removeItem(ATTEMPT_PREFIX + id); const idx = JSON.parse(localStorage.getItem(INDEX_KEY) || "[]").filter(x => x !== id); localStorage.setItem(INDEX_KEY, JSON.stringify(idx)); },
  async remove(id){
    if (this.mode === "db"){ await this.col.doc(ATTEMPT_PREFIX + id).delete(); return; }
    if (this.mode === "local"){ this.removeLocal(id); SYNC.effacer(id); return; }
    delete this.mem[id];
  },
  async getDoc(id){
    if (this.mode === "db"){ const sn = await this.col.doc(id).get(); return sn && sn.exists ? sn.data() : null; }
    if (this.mode === "local"){ const v = localStorage.getItem(id); return v ? JSON.parse(v) : null; }
    return this.memDocs[id] || null;
  },
  async setDoc(id, obj){
    if (this.mode === "db"){ await this.col.doc(id).set(obj); return; }
    if (this.mode === "local"){ localStorage.setItem(id, JSON.stringify(obj)); return; }
    this.memDocs[id] = obj;
  },
};

/* ---------- synchronisation entre appareils (refonte D4) ----------
   Sur le site seulement (navigateur, pas dans Claude). L'accueil du site enregistre sur l'appareil, sous la clé
   « revisions-appareil », l'adresse de l'intermédiaire Google et le code de chaque élève :
       { url, eleves:{ Livio:{ code }, Liano:{ code } } }
   L'outil garde toujours sa copie dans le navigateur (il marche hors ligne) et envoie chaque test à l'intermédiaire,
   qui le range dans la feuille « Révisions – scores ». Ce qui n'a pas pu partir attend dans une file sur l'appareil
   et repart au chargement suivant ou au retour du réseau. Au chargement, les tests faits sur un autre appareil
   sont ajoutés ; un test effacé laisse une marque « suppr » pour ne pas revenir d'un autre appareil. */
const SYNC_CONF = "revisions-appareil";
/* adresse de l'intermédiaire, la même que la constante INTERMEDIAIRE de l'accueil du site (publication-github.md § 11) :
   sert au bouton « Entrer mon code » de l'onglet Scores, quand l'appareil n'a pas encore de code pour cet élève */
const SYNC_URL_SITE = "https://script.google.com/macros/s/AKfycbzUVgqKYNSQaLeKAOk4kCGdYNF0weB5xKBLmZMSWCfmoSVoVf2R9Y6WKwQqh9CON-1K/exec";
const SYNC = {
  on:false, url:"", code:"", etat:"", derniere:0, file:[], occupe:false, minuterie:null, echeance:0,
  cleFile: QUIZ_ID + "-sync-file", cleSuppr: QUIZ_ID + "-sync-suppr",
  init(){
    this.on = false;
    if (store.mode !== "local") return;
    try {
      const c = JSON.parse(localStorage.getItem(SYNC_CONF) || "null");
      const e = c && c.eleves && c.eleves[OUTIL.eleve];
      if (c && c.url && e && e.code){ this.url = c.url; this.code = e.code; this.on = true; }
      this.file = JSON.parse(localStorage.getItem(this.cleFile) || "[]");
    } catch(e){ this.on = false; }
  },
  garderFile(){ try { localStorage.setItem(this.cleFile, JSON.stringify(this.file)); } catch(e){} },
  supprimes(){ try { return new Set(JSON.parse(localStorage.getItem(this.cleSuppr) || "[]")); } catch(e){ return new Set(); } },
  noterSuppr(id){ const s = this.supprimes(); s.add(id); try { localStorage.setItem(this.cleSuppr, JSON.stringify([...s].slice(-500))); } catch(e){} },
  async appel(corps){
    const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    const t = ctrl ? setTimeout(() => ctrl.abort(), 20000) : null;
    try {
      const r = await fetch(this.url, { method:"POST", body:JSON.stringify({ eleve:OUTIL.eleve, code:this.code, ...corps }), signal: ctrl ? ctrl.signal : undefined });
      const j = await r.json();
      if (!j.ok){ const err = new Error(j.erreur || "erreur"); err.code = j.erreur || "erreur"; throw err; }
      return j;
    } finally { if (t) clearTimeout(t); }
  },
  /* une opération en attente remplace la précédente sur le même enregistrement */
  ajouter(op){
    if (!this.on) return;
    op.quiz = QUIZ_ID;
    this.file = this.file.filter(x => x.id !== op.id); this.file.push(op); this.garderFile();
    /* un test part tout de suite ; le test en cours attend 2,5 s (il change à chaque réponse) ; un envoi déjà prévu plus tôt est gardé */
    const due = Date.now() + (op.type === "doc" ? 2500 : 50);
    if (this.minuterie && this.echeance <= due) return;
    clearTimeout(this.minuterie); this.echeance = due;
    this.minuterie = setTimeout(() => { this.minuterie = null; this.envoyer(); }, due - Date.now());
  },
  async envoyer(){
    if (!this.on || this.occupe || !this.file.length) return;
    this.occupe = true;
    try {
      while (this.file.length){
        const lot = this.file.slice(0, 20);
        await this.appel({ action:"batch", ops:lot });
        const ids = new Set(lot.map(x => x.id + "|" + (x.maj || 0)));
        this.file = this.file.filter(x => !ids.has(x.id + "|" + (x.maj || 0))); this.garderFile();
      }
      this.etat = "ok"; this.derniere = Date.now();
    } catch(e){ this.etat = e.code === "code" || e.code === "bloque" ? "code" : "hors-ligne"; }
    this.occupe = false;
    if (this.file.length && this.etat === "ok" && !this.minuterie) this.minuterie = setTimeout(() => { this.minuterie = null; this.envoyer(); }, 2500);
    majSyncLigne();
  },
  /* tests et test en cours de l'autre appareil ; null si l'intermédiaire ne répond pas */
  async recevoir(){
    if (!this.on) return null;
    try { const j = await this.appel({ action:"list", quiz:QUIZ_ID }); this.etat = "ok"; this.derniere = Date.now(); return j.items || []; }
    catch(e){ this.etat = e.code === "code" || e.code === "bloque" ? "code" : "hors-ligne"; return null; }
  },
  sauver(att){ this.ajouter({ op:"put", id:att.id, type:"test", date:att.date, data:att, maj:Date.now() }); },
  effacer(id){ this.noterSuppr(id); this.ajouter({ op:"put", id, type:"suppr", date:0, data:null, maj:Date.now() }); },
  doc(id, obj){ this.ajouter({ op:"put", id, type:"doc", date:obj && obj.saved || 0, data:obj, maj:Date.now() }); },
};
function syncTexte(){
  if (store.mode !== "local") return "";
  if (!SYNC.on) return /^https?:/.test(location.protocol) ? `Tes scores sont gardés dans ce navigateur uniquement. Pour les retrouver sur tous tes appareils, passe une fois par <a href="../">l'accueil du site</a> et entre ton code.` : "Tes scores sont gardés dans ce navigateur uniquement. Exporte-les de temps en temps.";
  const n = SYNC.file.filter(x => x.type !== "doc").length;
  if (SYNC.etat === "code") return `Le code enregistré sur cet appareil n'est plus accepté : repasse par <a href="../">l'accueil du site</a> pour l'entrer à nouveau. Tes scores restent gardés ici en attendant.`;
  if (SYNC.etat === "hors-ligne" || n) return `🔄 Synchronisation en attente${n ? ` : ${n} enregistrement${n>1?"s":""} partira${n>1?"ont":""} dès que le réseau revient` : ""}. Tes scores sont gardés sur cet appareil en attendant.`;
  return `☁️ Tes scores sont synchronisés entre tes appareils${SYNC.derniere ? ` (dernière fois à ${String(new Date(SYNC.derniere).getHours()).padStart(2,"0")}h${String(new Date(SYNC.derniere).getMinutes()).padStart(2,"0")})` : ""}.`;
}
/* ligne d'état de la synchronisation (onglet Scores) ; sans code sur le site : bouton et petit formulaire pour l'entrer ici */
function syncBloc(){
  if (store.mode !== "local") return "";
  let h = `<p class="note" id="sync-ligne">${syncTexte()}</p>`;
  const surSite = /^https?:/.test(location.protocol) && SYNC_URL_SITE;
  if (surSite && (!SYNC.on || SYNC.etat === "code")){
    if (!S.syncForm) h += `<button class="ghost small" data-act="syncCode">🔑 Entrer mon code</button>`;
    else h += `<div class="synccode" style="display:flex;flex-direction:column;gap:8px;margin-top:8px"><label class="fine" for="sync-code-in">Ton code, ${esc(OUTIL.eleve)}</label>
      <input id="sync-code-in" class="tinput" type="password" inputmode="numeric" autocomplete="off" autocapitalize="off" spellcheck="false">
      ${S.syncErr ? `<p class="warn">${esc(S.syncErr)}</p>` : ""}
      <div class="row"><button class="ghost small" data-act="syncNo">Plus tard</button><button class="cta" data-act="syncOk"${S.syncBusy ? " disabled" : ""}>${S.syncBusy ? "Vérification…" : "Valider"}</button></div></div>`;
  }
  return h;
}
async function syncValider(){
  const inp = document.getElementById("sync-code-in"), code = inp ? inp.value.trim() : "";
  if (!code || S.syncBusy) return;
  S.syncBusy = true; S.syncErr = ""; render();
  let rep = null;
  try { const r = await fetch(SYNC_URL_SITE, { method:"POST", body:JSON.stringify({ eleve:OUTIL.eleve, code, action:"ping" }) }); rep = await r.json(); } catch(e){ rep = { ok:false, erreur:"reseau" }; }
  S.syncBusy = false;
  if (rep && rep.ok){
    try {
      const c = JSON.parse(localStorage.getItem(SYNC_CONF) || "null") || { eleves:{} };
      c.url = SYNC_URL_SITE; c.eleves = c.eleves || {}; c.eleves[OUTIL.eleve] = { code };
      localStorage.setItem(SYNC_CONF, JSON.stringify(c));
    } catch(e){}
    location.reload(); return;
  }
  S.syncErr = rep && rep.erreur === "code" ? "Ce code n'est pas le bon. Réessaie, ou demande à ton papa."
    : rep && rep.erreur === "bloque" ? "Trop d'essais : attends un quart d'heure avant de réessayer."
    : "Pas de réseau pour vérifier le code. Réessaie plus tard : tes scores restent gardés ici.";
  render();
  const i2 = document.getElementById("sync-code-in"); if (i2) i2.focus();
}
function majSyncLigne(){ const el = document.getElementById("sync-ligne"); if (el) el.innerHTML = syncTexte(); }

/* ---------- état ---------- */
const S = {
  screen:"fiche", ficheOpen: OUTIL.ficheOuverte != null ? OUTIL.ficheOuverte : 0, order: ORDRES ? Object.keys(ORDRES)[0] : "",
  selected: Array.isArray(OUTIL.paquetsCoches) ? DECKS.map(d => d.key).filter(k => OUTIL.paquetsCoches.includes(k)) : DECKS.map(d => d.key),
  difficulty:"normal", mode:"train", count: COUNTS ? (OUTIL.compteDefaut != null ? OUTIL.compteDefaut : COUNTS[0]) : 0,
  frozen:null, paperMsg:"", paperCopy:"",
  quiz:null, rattrapage:false, rattrLabel:"", lastResult:null, storeMsg:"",
  attempts:[], loaded:false, loadErr:"",
  cards:{ order:[], pos:0, flip:false },
  results:{ all:false },
  scores:{ open:null, exportOpen:false, confirm:false },
  suivi:{ ch:"all", f:"all", pt:null, cell:null }, revNiv:"hard", qDiff:"normal",
  bilan:{},
  draft:null, draftAsk:false, draftBlock:false, draftErr:false, quitAsk:false,
};
if (COUCHE.etat) Object.assign(S, COUCHE.etat);
const deckLabel = keys => keys.length === DECKS.length ? OUTIL.labelTout
  : DECKS[0].code ? (keys.length > 3 ? keys.length + " " + MOT_PAQUETS : keys.map(k => DECK[k].code).join(" + "))
  : keys.map(k => DECK[k].title).join(" + ");

/* ============================================================
   SUIVI GRAPHIQUE (§ 6 quater) — anneaux par paquet (3 pour les langues, § 11.4)
   ============================================================ */
function rootTests(){ return S.attempts.filter(a => !a.rattrapage).sort((a, b) => a.date - b.date); }
function parentOf(a){
  if (a.parent) return a.parent;
  const prev = S.attempts.filter(x => !x.rattrapage && x.date < a.date && dayOf(x.date) === dayOf(a.date)).sort((x, y) => y.date - x.date)[0];
  return prev ? prev.id : null;
}
function isExam(a){ return a.mode === MODES.exam.label; }
function chapOfQ(x){ return x.question ? x.question.deckKey : null; }
function inChap(ch){ return x => ch === "all" || chapOfQ(x) === ch; }
function qCardKey(x){ return x.question ? (x.question.card || (COUCHE.carteDe ? COUCHE.carteDe(x.question) : undefined)) : ("p|" + x.prompt); }

/* note sans aide d'un test (éventuellement limitée à un paquet) et remontée après chaque rattrapage */
function testScore(root, ch){
  const qs = root.questions.filter(inChap(ch)), score = qs.filter(x => x.correct).length, total = qs.length;
  if (!total) return null;
  const wrong = new Set(qs.filter(x => !x.correct).map(qCardKey)), fixed = new Set(), steps = [];
  S.attempts.filter(a => a.rattrapage && parentOf(a) === root.id).sort((a, b) => a.date - b.date).forEach(r => {
    const rq = r.questions.filter(inChap(ch)); if (!rq.length) return;
    rq.forEach(x => { if (x.correct && wrong.has(qCardKey(x))) fixed.add(qCardKey(x)); });
    const sc = score + fixed.size;
    steps.push({ score:sc, note:noteFrom(sc / total), asked:rq.length, ok:rq.filter(x => x.correct).length });
  });
  return { score, total, note:noteFrom(score / total), typos:qs.filter(x => x.typo).length, steps };
}

/* une réponse compte comme « écrite » (pour un anneau) si elle a été tapée, ou si la question n'existe qu'à choix */
function wroteOf(q){ return COUCHE.wrote ? COUCHE.wrote(q) : (q.type === "type" || !!q.mcqOnly); }
/* historique des cartes au premier passage des tests (jamais les rattrapages) */
function histByCard(exceptId){
  const h = {};
  rootTests().filter(a => a.id !== exceptId).forEach(a => {
    const lvl = LVL_OF_LABEL[a.difficulty]; if (lvl == null) return;
    a.questions.forEach(x => { if (!x.question) return; const k = qCardKey(x); (h[k] = h[k] || []).push({ ok:x.correct, lvl, day:dayOf(a.date), date:a.date, wrote:wroteOf(x.question) }); });
  });
  Object.values(h).forEach(arr => arr.sort((a, b) => a.date - b.date));
  return h;
}
/* état d'une carte pour l'anneau du niveau ringLvl : un anneau = un niveau (fiche v21) */
function ringState(entries, ringLvl){
  const es = entries.filter(e => e.lvl === ringLvl);
  if (!es.length) return "new";
  return es[es.length - 1].ok ? "ok" : "bad";
}
function acquiredOuter(entries){
  const hd = entries.filter(e => e.lvl === 2);
  if (!hd.length || !hd[hd.length - 1].ok) return false;
  const days = new Set(); for (let i = hd.length - 1; i >= 0 && hd[i].ok; i--) days.add(hd[i].day);
  return days.size >= 2;
}
/* résumé d'un anneau (un niveau) sur un ensemble de cartes */
function ringSummary(cards, ringLvl, hist){
  const sub = cards.filter(c => c.levels.includes(ringLvl));
  const c = { ok:0, mid:0, bad:0, new:0 }, total = sub.length;
  sub.forEach(card => {
    const st = ringState(hist[card.k] || [], ringLvl);
    if (st === "new") c.new++;
    else if (st === "bad") c.bad++;
    else { if (ringLvl === 2 && acquiredOuter(hist[card.k] || [])) c.ok++; else c.mid++; }
  });
  /* v12 : la note se calcule sur les cartes déjà posées à ce niveau ; total reste le paquet (longueur des arcs, barre des cartes testées) */
  const right = c.ok + c.mid, posed = total - c.new, pct = posed ? Math.round(right / posed * 100) : 0;
  const note = posed ? noteFrom(right / posed) : 0;
  const okFull = ringLvl === 2 && total > 0 && posed === total && c.ok / total >= 0.75;
  const state = !posed ? "start" : okFull ? "ok" : note >= 5 ? "win" : note >= 4 ? "mid" : "low";
  return { ...c, total, right, posed, pct, note, state, ringLvl, partiel: posed < total / 2 };
}
function paquetRings(dk, hist){ const cards = deckCards(dk); return [0,1,2].map(l => ringSummary(cards, l, hist)); }
const P_LABEL = { start:"à commencer", low:"à revoir", mid:"en route", win:"réussi", ok:"OK ✓" };
/* mot sous un cercle (v12) : « réussi, à compléter » quand moins de la moitié du paquet est posée */
function motNiveau(sum){ return sum.state === "win" && sum.partiel ? "réussi, à compléter" : P_LABEL[sum.state]; }
/* sous un cercle, sur deux lignes pour garder la largeur de la pastille */
function motPastille(sum){ return sum.state === "win" && sum.partiel ? "réussi,<br>à compléter" : P_LABEL[sum.state]; }
/* part de justes parmi les cartes posées (flèche ↗ / ↘, v12) */
const tauxJuste = s => s && s.posed ? s.right / s.posed : 0;
const LVL_LABEL = ["à revoir", "en route", "réussi"];
function lvlOf(sum){ return !sum || sum.state === "start" ? -1 : sum.note >= 5 ? 2 : sum.note >= 4 ? 1 : 0; }
function pColor(state){ return state === "ok" ? "var(--p-okdark)" : state === "win" ? "var(--p-ok)" : state === "mid" ? "var(--p-mid)" : "var(--p-low)"; }
/* un anneau SVG à un rayon donné : une seule couleur, celle de sa note ; part juste en plein, le reste en clair */
function ringArc(sum, r, w){
  if (sum.state === "start") return `<circle r="${r}" fill="none" stroke-width="${w}" stroke-dasharray="3 3" style="stroke:var(--rule)"/>`;
  const C = 2 * Math.PI * r, c = pColor(sum.state);
  return `<circle r="${r}" fill="none" stroke-width="${w}" stroke="${c}" stroke-opacity=".22"/>` +
    (sum.right ? `<circle r="${r}" fill="none" stroke-width="${w}" stroke="${c}" stroke-dasharray="${(C * sum.right / sum.total).toFixed(2)} 999" transform="rotate(-90)"/>` : "");
}
/* trois anneaux concentriques : intérieur = Échauffement, milieu = Entraînement, extérieur = Niveau épreuve */
function ring3Svg(rings, size, centerText){
  const h = size / 2, w = 6;
  const radii = [h - 24, h - 16, h - 8];   /* intérieur, milieu, extérieur */
  const body = rings.map((s, i) => ringArc(s, radii[i], w)).join("");
  const fs = centerText.length >= 5 ? 11.5 : 13.5;
  return `<svg class="pring" width="${size}" height="${size}" viewBox="${-h} ${-h} ${size} ${size}" aria-hidden="true">${body}<text x="0" y="${(fs/3).toFixed(1)}" text-anchor="middle" class="pring-t" style="font-size:${fs}px">${centerText}</text></svg>`;
}
/* niveau le plus difficile déjà testé (-1 si aucun) */
function topRing(rings){ let t = -1; rings.forEach((s, i) => { if (s.state !== "start") t = i; }); return t; }
/* un seul anneau (pastille générale) */
function ring1Svg(sum, size, centerText){
  const h = size / 2, r = h - 7, w = 8;
  return `<svg class="pring" width="${size}" height="${size}" viewBox="${-h} ${-h} ${size} ${size}" aria-hidden="true">${ringArc(sum, r, w)}<text x="0" y="6" text-anchor="middle" class="pring-t" style="font-size:16px">${centerText}</text></svg>`;
}

/* ---------- UN ANNEAU (maths, Dossier) : tous les niveaux comptent ----------
   État d'une carte : son dernier passage. Juste et écrit deux jours différents de suite = acquise (vert foncé) ;
   juste = en route (couleur du niveau) ; fausse = à revoir (rouge pâle) ; jamais posée = gris. */
function state1(es){
  if (!es || !es.length) return "new";
  const last = es[es.length - 1]; if (!last.ok) return "bad";
  if (!last.wrote) return "mid";
  for (let k = es.length - 2; k >= 0; k--){ if (!es[k].ok) break; if ((es[k].wrote || COUCHE.acquisAvantLibre) && es[k].day !== last.day) return "ok"; }
  return "mid";
}
function summary1(cards, hist){
  const c = { ok:0, mid:0, bad:0, new:0 }, total = cards.length;
  cards.forEach(card => c[state1(hist[card.k])]++);
  /* v12 : note sur les cartes déjà posées ; OK ✓ seulement si tout le paquet est posé et 75 % ou plus acquises */
  const right = c.ok + c.mid, posed = total - c.new, pct = posed ? Math.round(right / posed * 100) : 0;
  const note = posed ? noteFrom(right / posed) : 0;
  const okFull = total > 0 && posed === total && c.ok / total >= 0.75;
  const state = !posed ? "start" : okFull ? "ok" : note >= 5 ? "win" : note >= 4 ? "mid" : "low";
  return { ...c, total, right, posed, pct, note, state, partiel: posed < total / 2 };
}
/* résumé de référence d'un paquet : un anneau, ou l'anneau Niveau épreuve */
function paqSum(dk, hist){ return COUCHE.rings === 1 ? summary1(deckCards(dk), hist) : paquetRings(dk, hist)[2]; }
/* anneau segmenté : acquises (vert foncé), justes (couleur du niveau), à revoir (rouge pâle), pas posées (gris) */
function ringSegSvg(sum, size, centerText){
  const h = size / 2, r = h - 6, w = 7, C = 2 * Math.PI * r;
  let arcs;
  if (sum.state === "start") arcs = `<circle r="${r}" fill="none" stroke-width="${w}" stroke-dasharray="3 3" style="stroke:var(--rule)"/>`;
  else {
    arcs = `<circle r="${r}" fill="none" stroke-width="${w}" style="stroke:var(--rule)"/>`;
    let off = 0;
    [[sum.ok, "var(--p-okdark)"], [sum.mid, pColor(sum.state === "ok" ? "win" : sum.state)], [sum.bad, "var(--p-lowsoft)"]].forEach(([n, col]) => {
      if (!n) return; const len = C * n / sum.total;
      arcs += `<circle r="${r}" fill="none" stroke-width="${w}" stroke="${col}" stroke-dasharray="${len.toFixed(2)} ${C.toFixed(2)}" stroke-dashoffset="${(-off).toFixed(2)}" transform="rotate(-90)"/>`;
      off += len;
    });
  }
  const fs = size > 70 ? 15 : 12;
  return `<svg class="pring" width="${size}" height="${size}" viewBox="${-h} ${-h} ${size} ${size}" aria-hidden="true">${arcs}<text x="0" y="${(fs/3).toFixed(1)}" text-anchor="middle" class="pring-t" style="font-size:${fs}px">${centerText}</text></svg>`;
}
function trend1(dk, hist){
  const tests = rootTests().filter(a => a.questions.some(inChap(dk))); if (tests.length < 2) return "";
  const now = summary1(deckCards(dk), hist), prev = summary1(deckCards(dk), histByCard(tests[tests.length - 1].id));
  if (!prev.posed) return "";
  const a = tauxJuste(now), b = tauxJuste(prev);
  return a > b + 1e-9 ? " ↗" : a < b - 1e-9 ? " ↘" : "";
}
function pastille1(dk){
  if (!S.loaded) return "";
  const hist = histByCard(), sum = summary1(deckCards(dk), hist), dr = dropOf(dk, hist);
  const label = sum.state === "start" ? "Pas encore testé" : `${sum.right} justes sur ${sum.posed} posées, ${motNiveau(sum)}${dr ? ", avant : " + P_LABEL[dr.prev.state] : ""}`;
  return `<div class="deck-pst" data-dk="${esc(dk)}" aria-label="${label}">${ringSegSvg(sum, 52, sum.state === "start" ? "" : sum.right + "/" + sum.posed)}<span class="pst-l pst-${sum.state}">${motPastille(sum)}${sum.state === "start" ? "" : trend1(dk, hist)}</span>${dr ? `<span class="pst-notes">avant : ${P_LABEL[dr.prev.state]}</span>` : ""}</div>`;
}
/* état d'un paquet en toutes lettres + boutons (section de la fiche liée à un paquet) */
function paqStatus(dk){
  if (!S.loaded) return "";
  const hist = histByCard(), sum = paqSum(dk, hist), dr = dropOf(dk, hist), m = OUTIL.motPaquet.toLowerCase();
  let h = `<p class="fine"><b>${OUTIL.cePaquet || "Cet " + m} : ${motNiveau(sum)}</b>${sum.state !== "start" ? ` · ${sum.right} justes sur ${sum.posed} posées au dernier test (note ${fmtNote(sum.note)}) · dont ${sum.ok} acquises · ${sum.bad} à revoir · ${sum.new} pas encore posées` : ""}${sum.state === "win" ? (sum.new ? " · teste aussi les questions pas encore posées, puis refais un test un autre jour pour le confirmer" : " · refais un test un autre jour pour le confirmer") : ""}</p>`;
  if (dr && dr.lost.length) h += `<div class="pdrop"><p>↘ Le ${dayShort(dr.date)}, c'était « ${P_LABEL[dr.prev.state]} » (note ${fmtNote(dr.prev.note)}). ${dr.lost.length} question${dr.lost.length>1?"s":""} réussie${dr.lost.length>1?"s":""} avant ${dr.lost.length>1?"sont ratées":"est ratée"} au dernier test : ce sont elles à reprendre.</p><button class="ghost small" data-act="redoCards" data-v="lost:${dk}">Refaire ces ${dr.lost.length} questions</button></div>`;
  else { const bad = paqBad(dk, hist); if (bad.length) h += `<button class="ghost small" data-act="redoCards" data-v="${dk}">${bad.length > 1 ? `Refaire mes ${bad.length} questions à revoir` : "Refaire ma question à revoir"}</button>`; }
  return h + barreTestes(dk, hist);
}
function dayShort(t){ const d = new Date(t); return String(d.getDate()).padStart(2,"0") + "." + String(d.getMonth()+1).padStart(2,"0"); }

function trendOf(dk, hist, lvl = 2){
  const tests = rootTests().filter(a => a.questions.some(inChap(dk))); if (tests.length < 2) return "";
  const now = paquetRings(dk, hist)[lvl];
  const prev = ringSummary(deckCards(dk), lvl, histByCard(tests[tests.length - 1].id));
  if (prev.state === "start") return "";
  const a = tauxJuste(now), b = tauxJuste(prev);
  return a > b + 1e-9 ? " ↗" : a < b - 1e-9 ? " ↘" : "";
}
function dropOf(dk, hist, lvl = 2){
  const tests = rootTests().filter(a => a.questions.some(inChap(dk))); if (tests.length < 2) return null;
  const last = tests[tests.length - 1];
  if (COUCHE.rings === 1){
    const prevHist = histByCard(last.id), now = summary1(deckCards(dk), hist), prev = summary1(deckCards(dk), prevHist);
    if (lvlOf(now) < 0 || lvlOf(prev) <= lvlOf(now)) return null;
    const lost = deckCards(dk).filter(c => { const ps = state1(prevHist[c.k]), ns = state1(hist[c.k]); return (ps === "ok" || ps === "mid") && ns === "bad"; });
    return { prev, lost, date:tests[tests.length - 2].date };
  }
  const now = paquetRings(dk, hist)[lvl], prevHist = histByCard(last.id), prev = ringSummary(deckCards(dk), lvl, prevHist);
  if (lvlOf(now) < 0 || lvlOf(prev) <= lvlOf(now)) return null;
  const lost = deckCards(dk).filter(c => c.levels.includes(lvl)).filter(c => { const ps = ringState(prevHist[c.k] || [], lvl), ns = ringState(hist[c.k] || [], lvl); return (ps === "ok") && ns === "bad"; });
  return { prev, lost, date:tests[tests.length - 2].date };
}
/* pastille à 3 anneaux pour un paquet (écran Paquets) */
function pastille3(dk){
  if (!S.loaded) return "";
  const hist = histByCard(), rings = paquetRings(dk, hist), top = topRing(rings);
  const ref = top < 0 ? rings[2] : rings[top];
  const dr = top < 0 ? null : dropOf(dk, hist, top);
  const NIV = ["Échauffement", "Entraînement", "Niveau épreuve"];
  const label = top < 0 ? "Pas encore testé" : `${NIV[top]} : ${ref.right} justes sur ${ref.posed} posées, ${motNiveau(ref)}${dr ? ", avant : " + LVL_LABEL[lvlOf(dr.prev)] : ""}`;
  return `<div class="deck-pst" data-dk="${esc(dk)}" aria-label="${label}">${ring3Svg(rings, 84, top < 0 ? "" : ref.right + "/" + ref.posed)}<span class="pst-l pst-${ref.state}">${motPastille(ref)}${top < 0 ? "" : trendOf(dk, hist, top)}</span>${dr ? `<span class="pst-notes">avant : ${LVL_LABEL[lvlOf(dr.prev)]}</span>` : ""}</div>`;
}
/* pastille d'un paquet selon la couche (1 anneau : à écrire à l'étape C3, maths et Dossier) */
function pastilleDeck(dk){ return COUCHE.rings === 1 ? pastille1(dk) : pastille3(dk); }
function globalPastille(){
  if (!S.loaded || !rootTests().length) return "";
  if (COUCHE.rings === 1) return globalPastille1();
  const hist = histByCard(), sum = ringSummary(CARDS, 2, hist);
  const nOk = DECKS.filter(d => paquetRings(d.key, hist)[2].state === "ok").length;
  const nWin = DECKS.filter(d => paquetRings(d.key, hist)[2].state === "win").length;
  return `<div class="pglob">${ring1Svg(sum, 66, sum.state === "start" ? "—" : sum.pct + " %")}<div class="pglob-x"><b>Avancement général (niveau épreuve) · ${motNiveau(sum)}</b><span>${sum.right} cartes justes au niveau épreuve sur ${sum.posed} posées, dont ${sum.ok} acquises · ${sum.bad} à revoir · ${sum.new} pas encore posées</span><span>${nOk} paquet${nOk>1?"s":""} OK · ${nWin} réussi${nWin>1?"s":""}, à confirmer · sur ${DECKS.length}</span></div></div>
  ${barreTestes(BT_TOUT, hist)}
  <details class="plegend"><summary>Comment se lisent les 3 anneaux ?</summary>
  <p>Chaque paquet a <b>trois anneaux</b> : à l'intérieur l'Échauffement, au milieu l'Entraînement, à l'extérieur le Niveau épreuve. Tu montes en compétence du « je choisis » vers « j'écris tout » : chaque anneau ne compte que les tests faits à son niveau : si tu n'as fait que le Niveau épreuve, les deux anneaux intérieurs restent gris en pointillé.</p>
  <p>Dans chaque anneau, la partie en couleur pleine, ce sont tes cartes justes ; la partie claire, celles qu'il te reste. Un anneau gris en pointillé n'a pas encore été testé. Au centre : tes cartes justes sur celles déjà posées, au niveau le plus difficile que tu as déjà fait.</p>
  <p>Couleur de chaque anneau selon sa note, calculée sur les cartes déjà posées à ce niveau (les cartes pas encore posées ne comptent pas) : <b>rouge</b> à revoir (moins de 4), <b>orange</b> en route (4–4,5), <b>vert</b> réussi (5 et plus), <b>vert foncé</b> OK ✓ (tout le paquet posé au niveau épreuve et au moins 3 cartes sur 4 acquises, c'est-à-dire réussies deux jours différents). Tant que moins de la moitié du paquet est posée, « réussi » devient « réussi, à compléter ».</p>
  <p>Sous les anneaux, <b>trois lignes</b>, dans le même ordre que les anneaux : Échauffement, Entraînement, Niveau épreuve. Chaque ligne montre une case pleine pour chaque carte déjà posée à ce niveau (au premier passage d'un test, pas dans un rattrapage) et une case vide pour chaque carte pas encore posée, puis le nombre : « 9/17 », c'est 9 cartes posées sur les 17 du paquet. Avec beaucoup de cartes, une case en regroupe plusieurs ; le nombre écrit est exact. Un niveau jamais testé montre une ligne vide, « 0/17 ».</p>
  <p>Au bout de chaque ligne, le bouton <b>« Tester les X »</b> lance un test « Je m'entraîne » sur les seules cartes pas encore posées à ce niveau, à ce niveau-là. Quand toutes les cartes ont été posées, la ligne affiche « ✓ complet ». Tu ne peux pas lancer ce test pendant qu'un autre test est en cours.</p>
  <p>Seul le premier passage d'un test compte ; refaire ses erreurs aide à apprendre mais ne change pas les anneaux.</p></details>`;
}
function paqBad(dk, hist){ const h = hist || histByCard(); return deckCards(dk).filter(c => COUCHE.rings === 1 ? state1(h[c.k]) === "bad" : ringState(h[c.k] || [], 2) === "bad"); }
function globalPastille1(){
  const hist = histByCard(), g = summary1(CARDS, hist), sums = DECKS.map(d => summary1(deckCards(d.key), hist));
  const nOk = sums.filter(x => x.state === "ok").length, nWin = sums.filter(x => x.state === "win").length;
  return `<div class="pglob">${ringSegSvg(g, 84, g.state === "start" ? "—" : g.pct + "%")}<div class="pglob-x"><b>Avancement général · ${motNiveau(g)}</b><span>${g.right} cartes justes au dernier test sur ${g.posed} posées, dont ${g.ok} acquises · ${g.bad} à revoir · ${g.new} pas encore posées</span><span>${nOk} ${esc(MOT_PAQUETS)} OK · ${nWin} réussi${nWin>1?"s":""}, à confirmer · sur ${DECKS.length}</span></div></div>
  ${barreTestes(BT_TOUT, hist)}
  <details class="plegend"><summary>Comment se lit la pastille ?</summary>
  <p>Le chiffre au centre : les questions du ${esc(OUTIL.motPaquet.toLowerCase())} réussies au dernier test où chacune est tombée, sur celles déjà posées (les questions pas encore posées ne comptent pas). Seul le premier passage d'un test compte, pas les rattrapages.</p>
  <p>Mots et couleurs suivent cette note : sous 4 « à revoir » (rouge), 4 à 4,5 « en route » (orange), 5 et plus « réussi » (vert) — « réussi, à compléter » tant que moins de la moitié des questions est posée —, « OK ✓ » (vert foncé) quand toutes les questions ont été posées et qu'au moins 3 sur 4 sont acquises. Gris en pointillé : pas encore testé.</p>
  <p>Sous la pastille, une <b>ligne des questions testées</b>, tous niveaux confondus : une case pleine pour chaque question déjà posée (au premier passage d'un test, pas dans un rattrapage), une case vide pour chaque question pas encore posée, puis le nombre (« 9/17 » : 9 questions posées sur 17). Avec beaucoup de questions, une case en regroupe plusieurs ; le nombre écrit est exact. Au bout de la ligne, le bouton <b>« Tester les X »</b> lance un test « Je m'entraîne » sur les seules questions pas encore posées, au niveau choisi dans les réglages ; quand toutes ont été posées, la ligne affiche « ✓ complet ».</p>
  <p>Dans l'anneau : vert foncé = acquis (écrit juste deux jours différents), couleur du niveau = juste au dernier test, rouge pâle = raté, gris = pas encore posé. Une question n'est acquise que si elle a été écrite, pas seulement choisie.</p></details>`;
}

/* ----- barre des cartes testées, une ligne par niveau (v13) -----
   Trois anneaux (langues et français) : trois lignes compactes, dans l'ordre des cercles (Échauffement, Entraînement,
   Niveau épreuve). Chaque ligne : le nom du niveau en toutes lettres, une barre fine de cases pleines (cartes posées au moins
   une fois au premier passage d'un test à ce niveau) et vides, et « N/M » sur le total du paquet ; les rattrapages ne comptent
   pas ; un niveau jamais testé montre une barre vide « 0/M ». Au bout de la ligne, « Tester les X » (X = cartes pas encore posées
   à ce niveau ; libellé complet pour les lecteurs d'écran) lance un test « Je m'entraîne » sur ces seules cartes, à ce niveau,
   un seul test à la fois ; une ligne complète affiche « ✓ complet » à la place du bouton. Un anneau (maths, Dossier) : une
   seule ligne, comptée à n'importe quel niveau, dont le bouton lance le test au niveau des réglages.
   Lisible sans les couleurs : cases pleines et vides, nombres écrits, « ✓ complet ». Au-delà de 30 cartes, une case en
   regroupe plusieurs (le nombre écrit reste exact). À 390 px, quand la place manque, le bouton passe sous la barre. */
const BT_TOUT = "__tout";
const BT_FEM = /^(cartes|questions|phrases|notions|formes|expressions|définitions|dates|règles|opérations|fractions|puissances|racines|consignes|personnes|unités|lettres|heures)$/i;
const NIV_KEYS = ["easy", "normal", "hard"];
function uniteDe(dk){
  const gen = OUTIL.compte === "questions" ? "questions" : "cartes";
  if (dk === BT_TOUT) return gen;
  const d = DECK[dk];
  return d && d.unit && d.unit !== "cartes" && deckCards(dk).length === d.items.length ? d.unit : gen;
}
/* couverture d'un paquet (ou de tout l'outil) à un niveau : lvl 0, 1, 2 ; lvl -1 = n'importe quel niveau (un anneau) */
function couverture(dk, hist, lvl){
  const cards = dk === BT_TOUT ? CARDS : deckCards(dk);
  const sub = lvl >= 0 ? cards.filter(c => c.levels.includes(lvl)) : cards;
  const non = sub.filter(c => { const es = hist[c.k] || []; return lvl < 0 ? !es.length : !es.some(e => e.lvl === lvl); });
  return { lvl, total:sub.length, posed:sub.length - non.length, non };
}
const NIV_LIGNES = () => COUCHE.rings === 1 ? [-1] : [0, 1, 2];
function ligneTestes(dk, cv){
  const n = cv.total, u = uniteDe(dk), acc = BT_FEM.test(u) ? "es" : "s", x = cv.non.length;
  const cells = n <= 30 ? n : 20;
  let plein = n <= 30 ? cv.posed : Math.round(cv.posed / n * cells);
  if (cv.posed > 0 && plein < 1) plein = 1; if (cv.posed < n && plein > cells - 1) plein = cells - 1;
  const nom = cv.lvl < 0 ? "Tous niveaux" : DIFFICULTIES[NIV_KEYS[cv.lvl]].label;
  const ou = cv.lvl < 0 ? ", au niveau choisi dans les réglages" : cv.lvl === 2 ? " au " + nom : " au niveau " + nom;
  let cases = ""; for (let i = 0; i < cells; i++) cases += `<i class="bt-c${i < plein ? " on" : ""}"></i>`;
  const fin = !x ? `<span class="bt-ok">✓ complet</span>`
    : `<button class="bt-go" data-act="testerNonPoses" data-v="${esc(dk)}|${cv.lvl}" aria-label="Tester les ${x} ${esc(u)} pas encore posé${acc}${esc(ou)}">Tester les ${x}</button>`;
  return `<div class="bt-row"><span class="bt-niv">${esc(nom)}</span><div class="bt-bar" role="img" aria-label="${esc(nom)} : ${cv.posed} ${esc(u)} testé${acc} sur ${n}">${cases}</div><span class="bt-t">${cv.posed}/${n}</span>${fin}</div>`;
}
function barreTestes(dk, hist){
  if (!S.loaded) return "";
  const h = hist || histByCard();
  const lignes = NIV_LIGNES().map(l => couverture(dk, h, l)).filter(cv => cv.total);
  if (!lignes.length) return "";
  return `<div class="btest">${lignes.map(cv => ligneTestes(dk, cv)).join("")}</div>`;
}
/* la barre sous les pastilles du sommaire (Dossier) : une pastille dans un bouton de sommaire reçoit sa barre juste après le bouton */
function barresSommaire(){
  if (!S.loaded) return;
  const boutons = [...app.querySelectorAll("button.toc-item")].filter(b => b.querySelector(".deck-pst[data-dk]"));
  if (!boutons.length) return;
  const hist = histByCard();
  boutons.forEach(b => { const dk = b.querySelector(".deck-pst[data-dk]").dataset.dk; if (DECK[dk]) b.insertAdjacentHTML("afterend", barreTestes(dk, hist).replace('class="btest"', 'class="btest bt-toc"')); });
}
/* style des lignes, ajouté une fois à la page (variables du thème, clair et sombre) : nom | barre | N/M | bouton ;
   quand la ligne est trop étroite (téléphone), le bouton passe sous la barre */
(function(){ try { const st = document.createElement("style"); st.textContent = `.btest{display:flex;flex-direction:column;gap:3px;margin:2px 0 8px;container-type:inline-size;min-width:0}.deck-redo + .btest,.deckrow + .btest{padding:0 12px;margin-top:-4px}.bt-toc{padding:0 12px;margin:-2px 0 10px}.bt-row{display:grid;grid-template-columns:7.6em minmax(40px,1fr) 3.6em max-content;align-items:center;column-gap:6px;row-gap:3px;min-height:26px;font-size:12px}.bt-niv{color:var(--soft);white-space:nowrap}.bt-bar{display:flex;gap:1px;min-width:0}.bt-c{flex:1 1 0;min-width:2px;height:8px;border:1.5px solid var(--soft);border-radius:2px;box-sizing:border-box;background:transparent}.bt-c.on{background:var(--box);border-color:var(--box)}.bt-t{color:var(--soft);font-variant-numeric:tabular-nums;text-align:right;white-space:nowrap}.bt-go{width:auto;justify-self:start;padding:3px 9px;border:1px solid var(--rule);border-radius:var(--r-s,8px);background:var(--sheet);color:inherit;font:inherit;font-size:12.5px;font-weight:700;cursor:pointer;white-space:nowrap}.bt-ok{font-weight:700;color:var(--soft);white-space:nowrap}@container (max-width:320px){.bt-row{grid-template-columns:7.6em minmax(0,1fr) 3.6em}.bt-go,.bt-ok{grid-column:2 / 4;grid-row:2}}.rev-niv{display:flex;gap:6px}.rev-niv .ghost{flex:1 1 0;min-width:0;width:auto;margin:0;padding:7px 4px;font-size:12.5px;line-height:1.2;white-space:normal}.rev-niv .ghost.on{background:var(--box);color:var(--sheet);border-color:var(--box)}.heat td[data-act]{cursor:pointer;white-space:nowrap}.heat td.hc-on{outline:2px solid var(--box);outline-offset:-2px}.hc-s{font-weight:700}.hc-plus{font-size:.75em;margin-left:1px}.heat-det{font-size:13px;margin:6px 0 0}.nn-av{display:flex;align-items:center;gap:4px;margin-top:4px;font-size:11.5px;font-weight:400;color:var(--soft)}.nn-av .bt-bar{flex:none;width:5em;overflow:hidden}.nn-av .bt-c{min-width:3px}.nn-av .nn-n{font-variant-numeric:tabular-nums;white-space:nowrap}.nn-un{display:flex;align-items:center;gap:8px;margin:8px 0 0;font-size:13px}.nn-un .nn-lab{font-weight:700;white-space:nowrap}.nn-un .bt-bar{flex:1 1 auto;min-width:40px;max-width:12em;overflow:hidden}.nn-un .nn-n{color:var(--soft);font-variant-numeric:tabular-nums;white-space:nowrap}.notesniv{margin:10px 0 4px}.notesniv td.k{white-space:nowrap}.nv{display:inline-block;width:1.05em;height:1.05em;vertical-align:-.17em;margin-right:.3em;overflow:visible;flex:none}.nvw{white-space:nowrap}.hc-s .nv{margin-right:.22em}.ch-legend .nv-leg{display:block}.ch-legend .nv-leg .nvw{display:inline}`; document.head.appendChild(st); } catch(e){} })();
/* « Tester les X » : v = "<paquet>|<niveau>" (niveau -1 : un anneau, niveau des réglages) */
function testerNonPoses(v){
  if (S.draft){ S.draftBlock = true; S.draftAsk = false; S.screen = "home"; render(); window.scrollTo(0,0); return; }
  const i = String(v).lastIndexOf("|"), dk = i < 0 ? v : v.slice(0, i), lvl = i < 0 ? -1 : +v.slice(i + 1);
  const cv = couverture(dk, histByCard(), COUCHE.rings === 1 ? -1 : lvl), keys = new Set(cv.non.map(c => c.k)); if (!keys.size) return;
  const diff = cv.lvl < 0 ? S.difficulty : NIV_KEYS[cv.lvl];
  const decks = DECKS.map(d => d.key).filter(dk => [...keys].some(k => CARD[k] && CARD[k].dk === dk));
  const ordre = ORDRES ? Object.keys(ORDRES)[0] : "", pris = new Map(), rang = {};
  for (let tour = 0; tour < 6 && [...keys].some(k => !pris.has(k)); tour++)
    buildTest(decks, diff, 0, ordre).forEach(q => { if (keys.has(q.card) && !pris.has(q.card)) pris.set(q.card, q); });
  CARDS.forEach((c, i) => { rang[c.k] = i; });
  const qs = [...pris.values()].sort((a, b) => rang[a.card] - rang[b.card]); if (!qs.length) return;
  /* numérotation unique du test, un exercice par paquet et par consigne (« Version papier ») */
  let n = 0, ex = 0, prec = null;
  qs.forEach(q => { const bloc = q.deckKey + "|" + q.consigne; if (bloc !== prec){ ex++; prec = bloc; } q.ex = ex; q.num = ++n; });
  S.selected = decks; S.mode = "train"; S.frozen = null; S.rattrParent = null;
  startQuiz(qs, false, { diff });
}

/* lancer un test sur des cartes précises (refaire à revoir / cartes qui résistent / perdues) */
function redoCards(v){
  let keys;
  const hist = histByCard();
  if (v === "resist") keys = new Set(resistant().map(x => x.k));
  else if (v === "lent") keys = new Set(lentes().map(x => x.k));
  else if (v.startsWith("lost:")){ const dk = v.slice(5), dr = dropOf(dk, hist); keys = new Set(dr ? dr.lost.map(c => c.k) : []); }
  else keys = new Set(paqBad(v, hist).map(c => c.k));
  if (!keys.size) return;
  const decks = DECKS.map(d => d.key).filter(dk => [...keys].some(k => CARD[k] && CARD[k].dk === dk));
  const qs = buildTest(decks, "hard", 0, ORDRES ? Object.keys(ORDRES)[0] : "").filter(q => keys.has(q.card));
  if (!qs.length) return;
  let n = 0; qs.forEach(q => { q.num = ++n; });
  S.selected = decks; S.mode = "train"; S.frozen = null;
  startQuiz(qs, false, { diff:"hard" });
}

/* ----- « Réviser mes erreurs » (v11, niveaux v14) : toutes les cartes en erreur, tous paquets confondus -----
   Une carte entre dans la liste dès qu'elle est ratée au premier passage d'un test (« Je ne sais pas » et mot corrigé en direct
   comptent comme ratés ; les rattrapages ne comptent jamais). Elle en sort quand, après être entrée, elle a été réussie au premier
   passage de tests faits deux jours différents, À SON NIVEAU OU PLUS HAUT (v14) : le niveau exigé est le plus haut niveau où elle a
   été ratée depuis son entrée dans la liste (0 Échauffement, 1 Entraînement, 2 Niveau épreuve) ; une réussite à un niveau plus facile
   ne compte pas. Une nouvelle erreur remet le compte des jours à zéro.
   Le test lancé par le bouton est un vrai test (pastilles, courbe, historique), marqué revErreurs: true, au niveau choisi sous le
   bouton (S.revNiv, Niveau épreuve par défaut), sans toucher au niveau des réglages du test. */
const REV_LABEL = "Révision des erreurs";
/* équivalent texte des symboles (v14) ; depuis la v15 l'écran les dessine (symbNiv) ; gardé comme repère du noyau v14 pour assembler.py */
const NIV_SYMB = { easy:"○", normal:"□", hard:"◆" };
/* une carte est-elle en erreur ? es = ses passages, du plus ancien au plus récent : { ok, day, lvl } */
function enErreur(es){
  let dans = false, exige = -1, jours = new Set();
  es.forEach(e => {
    const l = e.lvl == null ? 0 : e.lvl;
    if (!e.ok){ exige = dans ? Math.max(exige, l) : l; dans = true; jours = new Set(); return; }
    if (dans && l >= exige){ jours.add(e.day); if (jours.size >= 2){ dans = false; exige = -1; } }
  });
  return dans;
}
function cartesEnErreur(){
  const h = {};
  rootTests().forEach(a => { const lvl = LVL_OF_LABEL[a.difficulty]; (a.questions || []).forEach(x => { const k = qCardKey(x); if (!CARD[k]) return; (h[k] = h[k] || []).push({ ok:!!x.correct, day:dayOf(a.date), lvl }); }); });
  return CARDS.map(c => c.k).filter(k => h[k] && enErreur(h[k]));
}
function motCartes(n){ const m = OUTIL.compte === "questions" ? "question" : "carte"; return n + " " + m + (n > 1 ? "s" : ""); }
function reviserBloc(){
  if (!S.loaded) return "";
  const n = cartesEnErreur().length;
  if (!n) return `<button class="ghost" disabled aria-disabled="true" style="opacity:.55;cursor:not-allowed">Aucune erreur à réviser 👍</button>`;
  const u = OUTIL.compte === "questions" ? "question" : "carte", niv = DIFFICULTIES[S.revNiv] ? S.revNiv : "hard";
  return `<div class="revbloc" style="display:flex;flex-direction:column;gap:6px"><button class="ghost on" data-act="reviserErreurs">🔁 Réviser mes erreurs (${n})</button>
  <div class="rev-niv" role="group" aria-label="Niveau de la révision des erreurs">${NIV_KEYS.map(k => `<button class="ghost small${niv === k ? " on" : ""}" data-act="revNiv" data-v="${k}" aria-pressed="${niv === k}">${nomNiv(k, DIFFICULTIES[k].label)}</button>`).join("")}</div>
  <p class="fine">${motCartes(n)} ratée${n > 1 ? "s" : ""} au premier passage d'un test, tous ${esc(MOT_PAQUETS)} confondus · « Je m'entraîne », au niveau choisi juste au-dessus (${esc(DIFFICULTIES[niv].label)}). Une ${u} sort de la liste quand tu l'as réussie deux jours différents, au niveau où tu l'as ratée ou à un niveau plus difficile. Tu peux t'arrêter en cours de route : ✕, puis « Garder pour plus tard ».</p></div>`;
}
function reviserErreurs(){
  if (S.draft){ S.draftBlock = true; S.draftAsk = false; S.screen = "home"; render(); window.scrollTo(0,0); return; }
  const keys = new Set(cartesEnErreur()); if (!keys.size) return;
  const niv = DIFFICULTIES[S.revNiv] ? S.revNiv : "hard";
  const decks = DECKS.map(d => d.key).filter(dk => [...keys].some(k => CARD[k].dk === dk));
  const ordre = ORDRES ? Object.keys(ORDRES)[0] : "", pris = new Map(), avant = {}, rang = {};
  /* l'énoncé de la dernière erreur de chaque carte : la question est tirée à nouveau et, quand la carte le permet
     (conjugaison : une autre personne), elle ne revient pas à l'identique */
  rootTests().forEach(a => (a.questions || []).forEach(x => { if (!x.correct){ const k = qCardKey(x); if (keys.has(k)) avant[k] = x.prompt; } }));
  /* au niveau choisi d'abord ; une carte que ce niveau ne pose pas est prise au niveau le plus proche */
  [niv, ...["normal", "hard", "easy"].filter(d => d !== niv)].forEach(diff => {
    const secours = new Map();
    for (let tour = 0; tour < 6 && [...keys].some(k => !pris.has(k)); tour++)
      buildTest(decks, diff, 0, ordre).forEach(q => { if (!keys.has(q.card) || pris.has(q.card)) return;
        if (q.prompt !== avant[q.card]) pris.set(q.card, q); else if (!secours.has(q.card)) secours.set(q.card, q); });
    secours.forEach((q, k) => { if (!pris.has(k)) pris.set(k, q); });
  });
  CARDS.forEach((c, i) => { rang[c.k] = i; });
  const qs = [...pris.values()].sort((a, b) => rang[a.card] - rang[b.card]); if (!qs.length) return;
  /* numérotation unique du test, un exercice par paquet et par consigne (« Version papier ») */
  let n = 0, ex = 0, prec = null;
  qs.forEach(q => { const bloc = q.deckKey + "|" + q.consigne; if (bloc !== prec){ ex++; prec = bloc; } q.ex = ex; q.num = ++n; });
  S.mode = "train"; S.frozen = null; S.rattrParent = null;
  startQuiz(qs, false, { revErr:true, diff:niv, label:`${REV_LABEL} (${motCartes(qs.length)})` });
}

/* ----- onglet Scores : courbe, jour par jour, cartes qui résistent ----- */
/* les 5 cartes les plus ratées (premier passage des tests) */
function resistant(){
  const m = {};
  rootTests().forEach(a => a.questions.forEach(x => { if (!x.question) return; const k = qCardKey(x), lab = x.question.label || (CARD[k] && CARD[k].label); m[k] = m[k] || { k, word:lab || x.question.word, hint:lab ? "" : (x.question.hint || ""), ch:x.question.deckKey, tag:x.question.tag, n:0, miss:0 }; m[k].n++; if (!x.correct) m[k].miss++; }));
  const out = Object.values(m).filter(x => x.miss).sort((a, b) => b.miss - a.miss || b.miss / b.n - a.miss / a.n).slice(0, 5);
  /* deux cartes de même énoncé : on les distingue par l'étiquette, ou par l'indice si l'étiquette est la même */
  out.forEach(x => { const twins = out.filter(y => y !== x && y.word === x.word); if (!twins.length) return;
    if (twins.some(y => y.tag !== x.tag)) x.word += " · " + (TAG_LABEL[x.tag] || x.tag); else if (x.hint) x.word += " (" + x.hint + ")"; });
  return out;
}
/* v15 : forme d'un niveau, la même pour les points de la courbe et pour les symboles dessinés dans le texte (symbNiv) :
   easy = rond ○, normal = carré □, hard = losange plein ◆ (le carré tourné de 45°), exam = étoile ★ (épreuve blanche) */
function formeNiv(k, x, y, f){
  if (k === "exam"){ const p = []; for (let i = 0; i < 10; i++){ const r = i % 2 ? 3.6 : 8.5, t = Math.PI/5*i - Math.PI/2; p.push((x + r*Math.cos(t)).toFixed(1) + "," + (y + r*Math.sin(t)).toFixed(1)); } return `<polygon points="${p.join(" ")}" ${f}/>`; }
  if (k === "easy") return `<circle cx="${x}" cy="${y}" r="6" ${f}/>`;
  if (k === "normal") return `<rect x="${x-6}" y="${y-6}" width="12" height="12" ${f}/>`;
  return `<polygon points="${x},${y-8} ${x+8},${y} ${x},${y+8} ${x-8},${y}" ${f}/>`;
}
function formeDe(a){ return isExam(a) ? "exam" : a.difficulty === DIFFICULTIES.easy.label ? "easy" : a.difficulty === DIFFICULTIES.normal.label ? "normal" : "hard"; }
function shapeSvg(a, x, y){ return formeNiv(formeDe(a), x, y, `fill="var(--box)" stroke="var(--sheet)" stroke-width="2"`); }
/* symbole dessiné d'un niveau, à la taille du texte et dans sa couleur ; décoratif : le nom du niveau est toujours écrit à côté */
const symbNiv = k => `<svg class="nv" viewBox="-9 -9 18 18" aria-hidden="true" focusable="false">${formeNiv(k, 0, 0, 'fill="currentColor"')}</svg>`;
/* symbole + nom ; le symbole reste collé au premier mot quand le libellé passe à la ligne */
function nomNiv(k, nom){ const t = esc(nom), i = t.indexOf(" "); return `<span class="nvw">${symbNiv(k)}${i < 0 ? t : t.slice(0, i)}</span>${i < 0 ? "" : t.slice(i)}`; }
const LEGENDE_NIV = () => `${nomNiv("easy", "Échauffement")} · ${nomNiv("normal", "Entraînement")} · ${nomNiv("hard", "Niveau épreuve")} · ${nomNiv("exam", "Épreuve blanche")}`;
function suiviChart(){
  const s = S.suivi;
  let tests = rootTests(); if (s.f === "exam") tests = tests.filter(a => a.difficulty === DIFFICULTIES.hard.label || isExam(a));
  const pts = tests.map(a => ({ a, sc:testScore(a, s.ch) })).filter(p => p.sc);
  if (!pts.length) return `<p class="fine">Aucun test ne correspond à ce choix pour l'instant.</p>`;
  const L = 44, R = 18, T = 24, B = 40, H = 220, step = 58, W = Math.max(330, L + R + step * pts.length);
  const y = n => T + (6 - n)/5 * (H - T - B), X = i => L + step/2 + i*step;
  let g = "";
  [1,2,3,4,5,6].forEach(n => { g += `<line x1="${L}" x2="${W-R}" y1="${y(n)}" y2="${y(n)}" style="stroke:var(--rule)" stroke-width="1"${n===4?' stroke-dasharray="5 4"':""}/><text x="${L-8}" y="${y(n)+4}" text-anchor="end" class="ch-t">${n}</text>`; });
  g += `<text x="${W-R}" y="${y(4)-5}" text-anchor="end" class="ch-t">4 suffisant</text>`;
  pts.forEach((p, i) => { if (!p.sc.steps.length) return; const last = p.sc.steps[p.sc.steps.length-1];
    g += `<line x1="${X(i)}" x2="${X(i)}" y1="${y(p.sc.note)-9}" y2="${y(last.note)+6}" style="stroke:var(--good)" stroke-width="2" stroke-dasharray="4 3"/>`;
    p.sc.steps.forEach((st, k) => { const fin = k === p.sc.steps.length-1; g += `<circle cx="${X(i)}" cy="${y(st.note)}" r="${fin?5.5:3.5}" fill="var(--sheet)" style="stroke:var(--good)" stroke-width="2"/>`; });
    g += `<text x="${X(i)}" y="${y(last.note)-10}" text-anchor="middle" class="ch-t ch-g">${fmtNote(last.note)}</text>`; });
  g += `<polyline points="${pts.map((p,i) => X(i)+","+y(p.sc.note)).join(" ")}" fill="none" style="stroke:var(--box)" stroke-width="2" stroke-linejoin="round"/>`;
  pts.forEach((p, i) => { const on = s.pt === p.a.id;
    g += `<g class="ch-pt" data-act="suiviPt" data-v="${p.a.id}" role="button" tabindex="0" aria-label="Test du ${dateLabel(p.a.date)}, note ${fmtNote(p.sc.note)}">${on ? `<circle cx="${X(i)}" cy="${y(p.sc.note)}" r="13" fill="none" style="stroke:var(--crane)" stroke-width="2"/>` : ""}${shapeSvg(p.a, X(i), y(p.sc.note))}<rect x="${X(i)-18}" y="${T-6}" width="36" height="${H-T}" fill="transparent"/></g>`;
    g += `<text x="${X(i)-11}" y="${y(p.sc.note)+4}" text-anchor="end" class="ch-t ch-b">${fmtNote(p.sc.note)}</text>`;
    const d = new Date(p.a.date); g += `<text x="${X(i)}" y="${H-B+18}" text-anchor="middle" class="ch-t">${String(d.getDate()).padStart(2,"0")}.${String(d.getMonth()+1).padStart(2,"0")}</text>`; });
  g += `<text x="${L}" y="${H-6}" class="ch-t">épreuve : ${esc(DUE.short)}</text>`;
  let detail = "";
  const sel = pts.find(p => p.a.id === s.pt);
  if (sel){ const a = sel.a, sc = sel.sc;
    detail = `<div class="ch-detail"><b>${dateLabel(a.date)} · ${esc(a.difficulty)} · ${esc(a.mode)}</b><span>${esc(a.deck)}${s.ch !== "all" ? " · questions du paquet « " + esc(DECK[s.ch].title) + " »" : ""}</span>
    <span>Sans aide : ${sc.score} juste${sc.score>1?"s":""} sur ${sc.total} → note ${fmtNote(sc.note)}${sc.typos?` (dont ${sc.typos} faute${sc.typos>1?"s":""} de frappe acceptée${sc.typos>1?"s":""})`:""}</span>
    ${sc.steps.map((st, k) => `<span>${k+1}${k?"e":"er"} rattrapage : ${st.ok} sur ${st.asked} → note ${fmtNote(st.note)}</span>`).join("")}
    <button class="ghost small" data-act="openAttempt" data-v="${a.id}">Voir les questions de ce test</button></div>`; }
  return `<div class="ch-legend"><span><i class="lg-line"></i>Note du test, sans aide</span><span><i class="lg-ring"></i>Après « Refaire mes erreurs »</span><span class="nv-leg">${LEGENDE_NIV()}</span></div>
  <div class="ch-wrap"><svg class="ch-svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Courbe des notes sans aide, avec la remontée après les rattrapages">${g}</svg></div>
  <p class="fine">Touche un point pour voir le détail du test.</p>${detail}`;
}
/* v14 : dans chaque case, le test le plus exigeant du jour (○ Échauffement < □ Entraînement < ◆ Niveau épreuve ; ★ épreuve blanche
   juste au-dessus du niveau où elle est faite), son pourcentage et sa couleur ; « + » quand d'autres niveaux ont été joués ce
   jour-là ; leur détail au survol (title), pour les lecteurs d'écran (aria-label) et en touchant la case (ligne sous le tableau) */
function heatGroupes(tests, dk, day){
  const g = {};
  tests.filter(a => dayOf(a.date) === day).forEach(a => {
    const qs = a.questions.filter(inChap(dk)); if (!qs.length) return;
    const lvl = LVL_OF_LABEL[a.difficulty] != null ? LVL_OF_LABEL[a.difficulty] : 1, ex = isExam(a), cle = lvl + (ex ? "x" : "");
    const e = g[cle] = g[cle] || { rang:lvl * 2 + (ex ? 1 : 0), forme:ex ? "exam" : NIV_KEYS[lvl], nom:ex ? "Épreuve blanche (" + DIFFICULTIES[NIV_KEYS[lvl]].label + ")" : DIFFICULTIES[NIV_KEYS[lvl]].label, n:0, ok:0 };
    e.n += qs.length; e.ok += qs.filter(x => x.correct).length;
  });
  return Object.values(g).map(e => ({ ...e, pc:Math.round(e.ok / e.n * 100) })).sort((a, b) => b.rang - a.rang);
}
function suiviHeat(){
  const tests = rootTests(); if (!tests.length) return "";
  const days = [...new Set(tests.map(a => dayOf(a.date)))].slice(-6);
  const tested = new Set(tests.flatMap(a => a.questions.map(chapOfQ)));
  const chs = DECKS.filter(d => tested.has(d.key)), rest = DECKS.filter(d => !tested.has(d.key));
  const lab = d => { const [y, m, j] = d.split("-"); return j.padStart(2,"0") + "." + m.padStart(2,"0"); };
  const ligne = e => ` : ${e.pc} % (${e.ok} juste${e.ok > 1 ? "s" : ""} sur ${e.n})`;
  const txt = gs => gs.map(e => e.nom + ligne(e)).join(" · ");
  const txtHtml = gs => gs.map(e => nomNiv(e.forme, e.nom) + esc(ligne(e))).join(" · ");
  let h = `<div class="tbl heat"><table><thead><tr><th>${esc(OUTIL.motPaquet)}</th>${days.map(d => `<th>${lab(d)}</th>`).join("")}</tr></thead><tbody>`, detail = "";
  chs.forEach(d => {
    h += `<tr><td class="k">${esc(d.emoji)} ${esc(d.title)}</td>` + days.map(day => {
      const gs = heatGroupes(tests, d.key, day);
      if (!gs.length) return `<td class="hc-0">·</td>`;
      const top = gs[0], n = noteFrom(top.pc / 100), cle = d.key + "|" + day, on = S.suivi.cell === cle, plus = gs.length > 1;
      if (on) detail = `<p class="heat-det" aria-live="polite"><b>${esc(d.title)} · ${lab(day)}</b> — ${txtHtml(gs)}</p>`;
      const lib = `${d.title}, ${lab(day)} : ${txt(gs)}`;
      return `<td class="${n>=5?"hc-ok":n>=4?"hc-mid":"hc-low"}${on ? " hc-on" : ""}" data-act="heatCell" data-v="${esc(cle)}" role="button" tabindex="0" title="${esc(lib)}" aria-label="${esc(lib)}"><span class="hc-s" aria-hidden="true">${symbNiv(top.forme)}</span>${top.pc}${n>=5?" ✓":""}${plus ? `<sup class="hc-plus" aria-hidden="true">+</sup>` : ""}</td>`;
    }).join("") + `</tr>`;
  });
  return h + `</tbody></table></div>${detail}${rest.length ? `<p class="fine">Pas encore testés : ${rest.map(d => d.title).join(", ")}.</p>` : ""}<p class="fine">Pourcentage de réponses justes au premier passage des tests, par ${esc(OUTIL.motPaquet.toLowerCase())} et par jour (6 derniers jours), au test le plus exigeant du jour : ${LEGENDE_NIV()}. « + » : d'autres niveaux ce jour-là, touche la case pour les voir. Vert et ✓ : note de 5 ou plus ; orange : 4 à 4,5 ; rouge : sous 4.</p>`;
}
function suiviBlock(){
  const s = S.suivi;
  if (!rootTests().length) return "";
  const res = resistant();
  return `<section class="suivi"><h3>Ma courbe de notes</h3>
  <div class="suivi-ctl"><label class="fine" for="suivi-ch">${esc(OUTIL.motPaquet)}</label><select id="suivi-ch" class="suivi-sel"><option value="all"${s.ch==="all"?" selected":""}>${esc(OUTIL.labelTout)}</option>${DECKS.map(d => `<option value="${d.key}"${s.ch===d.key?" selected":""}>${esc(d.title)}</option>`).join("")}</select>
  <div class="row"><button class="ghost small${s.f==="all"?" on":""}" data-act="suiviF" data-v="all" aria-pressed="${s.f==="all"}">Tous les tests</button><button class="ghost small${s.f==="exam"?" on":""}" data-act="suiviF" data-v="exam" aria-pressed="${s.f==="exam"}">Niveau épreuve et épreuve blanche</button></div></div>
  ${suiviChart()}
  <h3>Mes ${esc(OUTIL.motPaquet.toLowerCase())}s jour après jour</h3>${suiviHeat()}
  ${reviserBloc()}
  ${res.length ? `<h3>Les ${OUTIL.compte === "questions" ? "questions" : "cartes"} qui résistent</h3><div class="resist">${res.map(x => `<p><span class="code">${esc(DECK[x.ch].code || DECK[x.ch].title)}</span> ${esc(AFF(x.word))} <small>ratée ${x.miss} fois sur ${x.n}</small></p>`).join("")}</div><button class="ghost" data-act="redoCards" data-v="resist">Refaire ces ${res.length} ${OUTIL.compte === "questions" ? "questions" : "cartes"}</button>` : ""}
  </section>`;
}
/* ----- onglet Scores : temps de révision (v10) ----- */
const avecTemps = () => S.attempts.filter(a => a.actif != null);
function tempsTest(a){
  if (a.actif == null) return `<p class="fine tps-test">⏱ Temps non mesuré pour ce test (fait avant la mesure du temps).</p>`;
  const mc = a.morceaux || [];
  return `<p class="tps-test">⏱ <b>${fmtDuree(a.actif)} actives</b>${mc.length > 1 ? `, en ${mc.length} fois : ` + mc.map(m => heureCourte(m[0]) + " → " + heureCourte(m[1])).join(", puis ") : mc.length ? ` : ${heureCourte(mc[0][0])} → ${heureCourte(mc[0][1])}` : ""}</p>`;
}
/* temps d'un test réparti sur les jours de ses morceaux, au prorata de leur durée */
function tempsParJour(){
  const m = {};
  avecTemps().forEach(a => {
    const mc = (a.morceaux || []).filter(x => x[1] > x[0]), tot = mc.reduce((s, x) => s + x[1] - x[0], 0);
    if (!mc.length || !tot){ const k = dayOf(a.date); m[k] = (m[k] || 0) + a.actif; return; }
    mc.forEach(x => { const k = dayOf(x[0]); m[k] = (m[k] || 0) + a.actif * (x[1] - x[0]) / tot; });
  });
  return m;
}
/* les questions les plus longues en moyenne (tous les passages mesurés) */
function lentes(){
  const m = {};
  avecTemps().forEach(a => a.questions.forEach(x => { if (!x.question || x.ms == null) return; const k = qCardKey(x), lab = x.question.label || (CARD[k] && CARD[k].label);
    const e = m[k] = m[k] || { k, word:lab || x.question.word, ch:x.question.deckKey, n:0, ms:0, last:0, ok:false };
    e.n++; e.ms += x.ms; if (a.date >= e.last){ e.last = a.date; e.ok = !!x.correct; } }));
  return Object.values(m).filter(x => CARD[x.k] && DECK[x.ch]).map(x => ({ ...x, moy:x.ms / x.n })).sort((a, b) => b.moy - a.moy).slice(0, 5);
}
const JOURS_COURTS = ["di","lu","ma","me","je","ve","sa"];
function tempsBlock(){
  const L = avecTemps(); if (!L.length) return "";
  const parJour = tempsParJour(), now = new Date(), j0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const jours = []; for (let i = 6; i >= 0; i--){ const d = new Date(j0); d.setDate(d.getDate() - i); jours.push({ d, k:dayOf(d.getTime()), ms:parJour[dayOf(d.getTime())] || 0 }); }
  const sem = jours.reduce((s, x) => s + x.ms, 0), nSem = L.filter(a => a.date >= jours[0].d.getTime()).length;
  const qs = L.flatMap(a => a.questions.filter(x => x.ms != null)), moyQ = qs.length ? qs.reduce((s, x) => s + x.ms, 0) / qs.length : 0;
  const max = Math.max(60000, ...jours.map(x => x.ms));
  const due = DUE && DUE.iso ? new Date(DUE.iso + "T00:00:00") : null, dansSemaine = due && due > j0 && (due - j0) / 864e5 <= 7;
  const barres = jours.map(x => { const min = Math.round(x.ms / 60000);
    return `<div class="tps-col"><span class="tps-v">${x.ms ? (min ? min : "<1") : "0"}</span><div class="tps-bar" style="height:${x.ms ? Math.max(3, Math.round(x.ms / max * 100)) : 0}%"></div></div>`; }).join("")
    + (dansSemaine ? `<div class="tps-col tps-te"><span class="tps-v">TE</span></div>` : "");
  const noms = jours.map(x => `<span>${JOURS_COURTS[x.d.getDay()]}<small>${x.d.getDate()}</small></span>`).join("") + (dansSemaine ? `<span>${JOURS_COURTS[due.getDay()]}<small>${due.getDate()}</small></span>` : "");
  const pq = {}; qs.forEach(x => { const k = x.question && x.question.deckKey; if (k && DECK[k]) pq[k] = (pq[k] || 0) + x.ms; });
  const paqs = Object.entries(pq).sort((a, b) => b[1] - a[1]), pmax = paqs.length ? paqs[0][1] : 1;
  const lent = lentes();
  return `<section class="suivi tps"><h3>⏱ Mon temps de révision</h3>
  <div class="tps-tiles"><div class="tps-tile"><span>7 derniers jours</span><b>${fmtDuree(sem)}</b><small>${nSem} test${nSem > 1 ? "s" : ""}</small></div><div class="tps-tile"><span>Par question</span><b>${fmtDuree(moyQ)}</b><small>en moyenne</small></div></div>
  <p class="fine">Jour par jour, en minutes actives</p>
  <div class="tps-chart" role="img" aria-label="Minutes de révision des 7 derniers jours : ${jours.map(x => JOURS_COURTS[x.d.getDay()] + " " + x.d.getDate() + " " + Math.round(x.ms / 60000) + " min").join(", ")}">${barres}</div>
  <div class="tps-days">${noms}</div>
  ${paqs.length ? `<p class="fine">Par ${esc(OUTIL.motPaquet.toLowerCase())}, depuis le début</p><div class="tps-paqs">${paqs.map(([k, ms]) => `<div class="tps-paq"><span class="tps-paq-t">${esc(DECK[k].code || DECK[k].title)}</span><div class="tps-paq-b"><i style="width:${Math.max(4, Math.round(ms / pmax * 100))}%"></i></div><span class="tps-paq-v">${fmtDuree(ms)}</span></div>`).join("")}</div>` : ""}
  ${lent.length ? `<p class="fine">Les questions qui te prennent le plus de temps</p><div class="resist">${lent.map(x => `<p><span class="code">${esc(DECK[x.ch].code || DECK[x.ch].title)}</span> ${esc(AFF(x.word))} <small>${fmtDuree(x.moy)} en moyenne · ${x.ok ? "✓ juste" : "✗ fausse"} la dernière fois</small></p>`).join("")}</div><button class="ghost" data-act="redoCards" data-v="lent">Refaire ces ${lent.length} questions</button>` : ""}
  <p class="fine">Le temps ne compte que quand la page est ouverte devant toi : il s'arrête si tu changes d'application, fermes la page ou gardes le test pour plus tard, et au bout de 2 minutes sans toucher l'écran.</p></section>`;
}
function chainTxt(a){
  if (a.rattrapage) return "";
  const sc = testScore(a, "all"); if (!sc || !sc.steps.length) return "";
  const last = sc.steps[sc.steps.length-1];
  return ` · ${fmtNote(sc.note)} → ${fmtNote(last.note)} après ${sc.steps.length} rattrapage${sc.steps.length>1?"s":""}`;
}

/* ============================================================
   TEMPS DE RÉVISION (v10) : chronomètre actif par question
   Q.qms = temps déjà compté sur la question affichée ; Q.qt0 = début du comptage en cours (null = en pause) ;
   Q.act = dernière action (clic, frappe) ; Q.mc = morceaux [début, fin] ; Q.seg0 = début du morceau ouvert.
   Au plus INACTIF ms sont comptées entre deux actions : au-delà, le temps s'arrête et le morceau se ferme.
   ============================================================ */
const INACTIF = 120000;
function chronoQ(){ const Q = S.quiz; return Q && !Q.done && S.screen === "quiz" ? Q : null; }
function chronoCompte(Q, now){
  if (Q.qt0 == null) return;
  const fin = Math.min(now, (Q.act || Q.qt0) + INACTIF);
  if (fin > Q.qt0) Q.qms = (Q.qms || 0) + (fin - Q.qt0);
  if (now - (Q.act || Q.qt0) > INACTIF){ chronoFerme(Q, fin); Q.qt0 = null; return; }
  Q.qt0 = now;
}
function chronoFerme(Q, fin){ if (Q.seg0 != null){ Q.mc = Q.mc || []; if (fin > Q.seg0) Q.mc.push([Q.seg0, fin]); Q.seg0 = null; } }
function chronoMarche(){ const Q = chronoQ(); if (!Q || document.hidden) return; const now = Date.now(); chronoCompte(Q, now); if (Q.qt0 == null) Q.qt0 = now; if (Q.seg0 == null) Q.seg0 = now; Q.act = now; }
function chronoPause(){ const Q = S.quiz; if (!Q || Q.qt0 == null) return; const now = Date.now(); chronoCompte(Q, now); if (Q.qt0 != null){ chronoFerme(Q, Math.min(now, (Q.act || now) + INACTIF)); Q.qt0 = null; } }
function chronoPrend(Q){ chronoCompte(Q, Date.now()); const ms = Math.round(Q.qms || 0); Q.qms = 0; return ms; }
function fmtDuree(ms){ const s = Math.round(ms / 1000); if (s < 60) return s + " s"; const m = Math.round(s / 60); if (m < 60) return m + " min"; return Math.floor(m / 60) + " h " + String(m % 60).padStart(2, "0"); }
function heureCourte(t){ const d = new Date(t); return d.getHours() + " h " + String(d.getMinutes()).padStart(2, "0"); }

/* ============================================================
   TEST EN COURS GARDÉ (§ 2)
   ============================================================ */
let draftChain = Promise.resolve();
let draftSig = "";   /* dernier état gardé : on ne réécrit pas un test en cours qui n'a pas changé (sinon une page restée ouverte sur un autre appareil le rajeunirait en se fermant) */
function draftLocalSet(obj){ try { localStorage.setItem(DRAFT_ID, JSON.stringify(obj)); return true; } catch(e){ return false; } }
function draftLocalGet(){ try { const v = localStorage.getItem(DRAFT_ID); return v ? JSON.parse(v) : null; } catch(e){ return null; } }
function draftWrite(obj){
  const okLocal = draftLocalSet(obj);
  if (store.mode === "local") SYNC.doc(DRAFT_ID, obj);
  if (store.mode === "db") draftChain = draftChain.then(() => store.setDoc(DRAFT_ID, obj)).then(() => { S.draftErr = false; }, () => { S.draftErr = !okLocal; draftErrShow(); });
  else if (store.mode === "memory"){ store.setDoc(DRAFT_ID, obj); S.draftErr = !okLocal; draftErrShow(); }
}
function draftErrShow(){ const m = document.getElementById("draft-err"); if (m) m.hidden = !S.draftErr; }
function draftSave(){
  const Q = S.quiz; if (!Q || Q.done) return;
  const d = { v:2, questions:Q.questions, i:Q.i, answers:Q.detail.map(x => { const o = { u:x.user, c:x.correct }; if (x.ms != null) o.ms = x.ms; if (x.typo) o.t = 1; if (x.liveFixed){ o.lf = 1; o.ls = x.liveSnap; } return o; }),
    picked:Q.checked ? Q.picked : null, typed:Q.checked ? Q.typed : "", checked:Q.checked, ok:Q.ok, liveFixed:!!Q.liveFixed, errSnap:Q.errSnap || "",
    label:Q.label, start:Q.start || Date.now(), saved:Date.now(), rattrapage:!!S.rattrapage, rattrLabel:S.rattrLabel || "", rattrParent:S.rattrParent || null, revErr:!!S.revErr,
    selected:S.selected, difficulty:S.qDiff, mode:S.mode, order:S.order, qms:Math.round(Q.qms || 0), mc:(Q.mc || []).concat(Q.seg0 != null ? [[Q.seg0, Math.min(Date.now(), (Q.act || Date.now()) + INACTIF)]] : []) };
  const sig = JSON.stringify({ ...d, saved:0 }); if (sig === draftSig) return; draftSig = sig;
  S.draft = d; draftWrite(d);
}
function draftDetail(d){
  if (d.detail) return d.detail;
  return (d.answers || []).map((x, k) => { const q = d.questions[k];
    return { num:q.num, ex:q.ex, ref:q.exTitle, prompt:q.prompt, user:x.u, answer:q.answer, correct:x.c, ...(x.ms != null ? { ms:x.ms } : {}), ...(x.t ? { typo:true } : {}), liveFixed:!!(x.lf || x.l), liveSnap:x.ls || x.s || "", expl:q.expl, tag:q.tag, question:q }; });
}
const draftN = d => (d.answers || d.detail || []).length;
const draftOk = d => !!(d && d.questions && d.questions.length && (d.answers || d.detail));
function draftPick(a, b){ const ta = a ? a.saved || 0 : -1, tb = b ? b.saved || 0 : -1; const w = ta >= tb ? a : b; return draftOk(w) ? w : null; }
function draftClear(){ draftSig = ""; S.draft = null; S.draftAsk = false; S.draftBlock = false; draftWrite({ vide:true, saved:Date.now() }); }
function draftResume(){
  const d = S.draft; if (!d) return;
  S.selected = (d.selected || d.keys || DECKS.map(x => x.key)).filter(k => DECK[k]); S.qDiff = DIFFICULTIES[d.difficulty] ? d.difficulty : S.difficulty; S.mode = MODES[d.mode] ? d.mode : "train"; S.frozen = null;
  if (ORDRES && d.order && ORDRES[d.order]) S.order = d.order;
  S.rattrapage = !!d.rattrapage; S.rattrLabel = d.rattrLabel || d.label || ""; S.rattrParent = d.rattrParent || d.parent || null; S.revErr = !!d.revErr;
  S.quiz = { questions:d.questions, i:d.i, picked:d.picked, typed:d.typed || "", checked:!!d.checked, ok:!!d.ok, liveFixed:!!d.liveFixed, hadErr:!!d.liveFixed, errSnap:d.errSnap || "", detail:draftDetail(d), finishing:false, done:false, start:d.start, label:d.label, qms:d.qms || 0, mc:d.mc || [], qt0:null, seg0:null };
  S.lastResult = null; S.storeMsg = ""; S.quitAsk = false; S.draftAsk = false; S.draftBlock = false; S.screen = "quiz";
  chronoMarche(); render(); window.scrollTo(0,0);
}
function draftWhat(d){ return d.rattrapage ? "Rattrapage" : DIFFICULTIES[d.difficulty].label + " · " + (MODES[d.mode] || MODES.train).label; }
function draftBanner(){
  const d = S.draft; if (!d) return "";
  const n = draftN(d), tot = d.questions.length;
  if (S.draftAsk) return `<div class="draft"><p><b>Abandonner ce test ?</b><span>Tes ${n} réponse${n>1?"s":""} ser${n>1?"ont effacées":"a effacée"} et ne compter${n>1?"ont":"a"} nulle part.</span></p>
    <div class="draft-row"><button class="ghost small" data-act="draftDrop">Oui, abandonner</button><button class="cta" data-act="draftNo">Non, je le garde</button></div></div>`;
  return `<div class="draft${S.draftBlock?" block":""}">${S.draftBlock ? `<p class="draft-stop"><b>Un seul test à la fois</b><span>Reprends ce test ou abandonne-le avant d'en lancer un autre.</span></p>` : ""}<p><b>⏸ Tu as un test en cours</b><span>${esc(d.label)} · ${esc(draftWhat(d))} · ${n} sur ${tot} répondue${n>1?"s":""} · ${dateLabel(d.saved)}</span></p>
    <div class="draft-row"><button class="cta" data-act="draftResume">Reprendre mon test</button><button class="ghost small" data-act="draftAsk">Abandonner</button></div>
    <p class="fine">Il compte dans tes scores seulement quand tu l'as terminé. Tu ne peux pas lancer un autre test tant que celui-ci n'est pas terminé ou abandonné.</p></div>`;
}
function quitView(){
  const Q = S.quiz, n = Q.detail.length, tot = Q.questions.length;
  return `<div class="draft quitbox"><p><b>Tu veux arrêter ce test ?</b><span>Tu as répondu à ${n} question${n>1?"s":""} sur ${tot}.</span></p>
  <button class="cta" data-act="quitKeep">Garder pour plus tard</button>
  <p class="fine">Ton test est gardé tel quel : tu le reprends depuis la Fiche, les Paquets ou le Test, à la question où tu t'es arrêté. Il compte seulement quand il est terminé.</p>
  <button class="ghost" data-act="quitDrop">Abandonner ce test</button>
  <p class="fine">Tes réponses sont effacées et ne comptent nulle part.</p>
  <button class="ghost small" data-act="quitNo">← Continuer le test</button></div>`;
}
function draftErrLine(){ return `<p class="warn" id="draft-err"${S.draftErr?"":" hidden"}>Je n'arrive pas à garder ce test sur cet appareil : ne ferme pas la page avant la fin.</p>`; }

/* ---------- rendu ---------- */
const app = document.getElementById("app");
function render(){
  if (S.screen === "quiz" && !S.quiz) S.screen = "fiche";
  if (S.screen === "results" && !S.lastResult) S.screen = "home";
  const v = { fiche:COUCHE.vueFiche || viewFiche, home:viewHome, cards:COUCHE.vueCartes || viewCards, setup:viewSetup, quiz:viewQuiz, results:viewResults, scores:viewScores }[S.screen];
  app.innerHTML = header() + `<div class="screen">${v()}</div>`;
  renderTabs();
  barresSommaire();
  if (S.screen === "quiz"){ const inp = document.getElementById("answer-input"); if (inp && !inp.disabled) inp.focus(); updateLive(); }
}
function header(){
  const badge = OUTIL.badgeHtml || `<div class="jersey" aria-hidden="true"><b>${esc(OUTIL.jersey)}</b></div>`;
  const sous = S.screen === "quiz" ? "" : typeof OUTIL.sousEntete === "function" ? OUTIL.sousEntete() : (OUTIL.sousEntete || "");
  return `<header class="head">${badge}<div><h1>${esc(OUTIL.titre)}</h1><p>${esc(OUTIL.sousTitre)} — à savoir pour le ${esc(DUE.long)}</p></div></header>${sous}`;
}
function renderTabs(){
  const bar = document.getElementById("tabbar");
  if (S.screen === "quiz"){ bar.hidden = true; return; }
  bar.hidden = false;
  const tabs = [["fiche", ...(OUTIL.ongletFiche || ["📚","Fiche"])],["home","🏠","Paquets"],["cards","🃏","Cartes"],["setup","🎯","Test"],["scores","📊","Scores"]];
  bar.innerHTML = `<div class="tabbar-in">` + tabs.map(([k,e,l]) => {
    const on = S.screen === k || (k === "setup" && S.screen === "results");
    return `<button class="tab${on?" on":""}" data-act="nav" data-v="${k}" aria-current="${on?"page":"false"}"><span class="tab-e">${e}</span><span class="tab-l">${l}</span></button>`;
  }).join("") + `</div>`;
}

function viewFiche(){
  let h = draftBanner() + `<p class="intro">${esc(OUTIL.introFiche)}</p>`;
  FICHE.forEach((sec, i) => {
    const open = S.ficheOpen === i;
    const cnt = sec.count != null ? sec.count : sec.pairs ? sec.pairs.length : 0;
    const dk = sec.deck && DECK[sec.deck] ? DECK[sec.deck] : null;
    const tete = sec.num != null ? `<span class="entry-num${sec.miss ? " miss" : ""}">${esc(sec.num)}</span>` : `<span class="entry-icon">${sec.icon}</span>`;
    h += `<section class="entry${open?" open":""}"><button class="entry-head" data-act="fiche" data-v="${i}" aria-expanded="${open}">${tete}<span class="entry-title">${esc(dk ? dk.title : sec.titre)}</span>${dk ? pastilleDeck(dk.key) : cnt ? `<span class="entry-count">${cnt}</span>` : ""}</button>`;
    if (open){
      h += `<div class="entry-body">`;
      if (sec.pairs) h += sec.pairs.map(p => `<div class="pair"><span class="pair-de">${esc(p[0])}</span><span>${esc(p[1])}</span></div>`).join("");
      if (sec.html) h += typeof sec.html === "function" ? sec.html() : sec.html;
      if (sec.tips) h += `<div style="display:flex;flex-direction:column;gap:6px">` + sec.tips.map(t => `<p class="tip">${esc(t)}</p>`).join("") + `</div>`;
      if (sec.astuce) h += `<p class="astuce${sec.astuceNeg ? " neg" : ""}"><b>${sec.astuceNeg ? esc(OUTIL.titreAstuceNeg || "Attention") : "Astuce"}</b>${esc(sec.astuce)}</p>`;
      if (dk) h += `<div class="fiche-paq">${paqStatus(dk.key)}<button class="ghost small" data-act="testDeck" data-v="${dk.key}">🎯 Teste-toi sur cet ${esc(OUTIL.motPaquet.toLowerCase())} (${dk.items.length} questions, Je m'entraîne)</button></div>`;
      h += `</div>`;
    }
    h += `</section>`;
  });
  const openS = S.ficheOpen === FICHE.length;
  h += `<section class="entry${openS?" open":""}"><button class="entry-head" data-act="fiche" data-v="${FICHE.length}" aria-expanded="${openS}"><span class="entry-icon">🔎</span><span class="entry-title">D'où viennent les questions</span></button>`;
  if (openS){
    h += `<div class="entry-body">` + SOURCES.map(x => `<div class="pair"><span class="pair-de">${esc(x.titre)} <span class="src-date">reçue le ${esc(x.recue)}</span></span><span>${esc(x.contenu)}</span></div>`).join("") + `<p class="astuce"><b>Contrôle</b>${esc(SOURCES_NOTE)}</p>`;
    if (HAS_CLAUDE){
      h += `<div class="photos">` + PHOTOS.map(ph => ph.url
        ? `<figure><a href="${esc(ph.url)}" target="_blank" rel="noopener"><img src="${esc(ph.url)}" alt="${esc(ph.titre)}" loading="lazy"></a><figcaption>${esc(ph.titre)}</figcaption></figure>`
        : `<figure class="missing"><span>Photo à renvoyer dans le chat</span><figcaption>${esc(ph.titre)}</figcaption></figure>`).join("") + `</div>`;
    }
    h += `</div>`;
  }
  h += `</section>`;
  return h + `<button class="cta" data-act="nav" data-v="home">Je passe à l'entraînement</button><p class="version">Version ${VERSION.n} · mise à jour le ${VERSION.date}</p>`;
}

function viewHome(){
  const allOn = S.selected.length === DECKS.length;
  const cs = compteSel(S.selected), count = cs.n;
  const hist = S.loaded ? histByCard() : null;
  let h = draftBanner() + globalPastille() + reviserBloc() + `<p class="intro">${OUTIL.introPaquets || "Choisis ce que tu veux travailler. Tu peux cocher plusieurs paquets. Les anneaux montrent ta progression."}</p>`;
  h += DECKS.map(d => {
    const on = S.selected.includes(d.key);
    const bad = hist ? paqBad(d.key, hist) : [];
    return `<div class="deckrow${on?" on":""}"><button class="deck-sel" data-act="toggle" data-v="${d.key}" aria-pressed="${on}">${d.emoji ? `<span class="deck-e">${d.emoji}</span>` : ""}<span class="deck-txt">${d.code ? `<span class="deck-c">${esc(d.code)}</span>` : ""}<span class="deck-t">${esc(d.title)}</span><span class="deck-n">${d.items.length} ${esc(d.unit)}${OUTIL.compte === "cartes" ? ` · ${deckCards(d.key).length} cartes` : ""}${d.detail ? " · " + esc(d.detail) : ""}</span></span></button>${on?`<span class="deck-tick">✓</span>`:""}${pastilleDeck(d.key)}</div>` +
      (bad.length ? `<div class="deck-redo"><button class="ghost small" data-act="redoBad" data-v="${d.key}">${(() => { const m = OUTIL.compte === "questions" ? "question" : "carte"; return bad.length > 1 ? `Refaire mes ${bad.length} ${m}s à revoir` : `Refaire ma ${m} à revoir`; })()}</button></div>` : "") +
      (hist ? barreTestes(d.key, hist) : "");
  }).join("");
  h += `<button class="ghost" data-act="allDecks">${allOn ? "Tout décocher" : "Tout cocher"}</button>
  <p class="fine">${count} ${cs.mot}${count>1?"s":""} sélectionné${cs.mot === "carte" ? "e" : ""}${count>1?"s":""}</p>
  <div class="row"><button class="ghost" data-act="toCards" ${count?"":"disabled"}>🃏 Cartes</button><button class="cta" data-act="nav" data-v="setup" ${count?"":"disabled"}>🎯 Test</button></div>`;
  return h;
}

/* une entrée par face : la couche peut donner plusieurs faces pour un même élément (une par aspect) */
function cardEntries(){ return S.selected.flatMap(k => DECK[k].items.flatMap(it => { const f = COUCHE.cardFace(DECK[k], it); return (Array.isArray(f) ? f : [f]).map(face => ({ it, d:DECK[k], face })); })); }
function viewCards(){
  const ents = cardEntries();
  if (!ents.length) return `<p class="intro">Coche au moins un paquet pour voir les cartes.</p><button class="cta" data-act="nav" data-v="home">Choisir des paquets</button>`;
  if (S.cards.order.length !== ents.length){ S.cards.order = shuffle(ents.map((_,i) => i)); S.cards.pos = 0; S.cards.flip = false; }
  const f = ents[S.cards.order[S.cards.pos]].face;
  return `<button class="back" data-act="nav" data-v="home">← Paquets</button>
  <p class="fine">${esc(deckLabel(S.selected))} · carte ${S.cards.pos+1} sur ${ents.length}</p>
  <button class="flash${S.cards.flip?" flipped":""}" data-act="flip" aria-label="Retourner la carte">
    <span class="face f"><span class="face-tag">${esc(f.tagF)}</span><span class="face-word${f.frontClass ? " " + f.frontClass : ""}">${esc(f.front)}</span>${f.frontMini ? `<span class="face-mini">${esc(f.frontMini)}</span>` : ""}<span class="face-hint">${f.hintF ? esc(f.hintF) : "touche la carte"}</span></span>
    <span class="face b"><span class="face-tag">${esc(f.tagB)}</span>${f.backHtml}</span>
  </button>
  <div class="row3"><button class="ghost" data-act="card" data-v="-1">Précédente</button><button class="ghost" data-act="cardShuffle">Mélanger</button><button class="ghost" data-act="card" data-v="1">Suivante</button></div>`;
}

function viewSetup(){
  if (!S.selected.length) return `<p class="intro">Coche au moins un paquet avant de lancer un test.</p><button class="cta" data-act="nav" data-v="home">Choisir des paquets</button>`;
  const cs = compteSel(S.selected), total = cs.n;
  let h = draftBanner() + `<button class="back" data-act="nav" data-v="home">← Paquets</button>
  <p class="fine">${esc(deckLabel(S.selected))} · ${total} ${cs.mot}${total>1?"s":""}${cs.mot === "carte" ? " en tout" : ""}</p>
  ${COUNTS ? `<p class="lab">${esc(OUTIL.compteLabel || "Combien de questions")}</p><div class="row4">${COUNTS.map(n => `<button class="ghost small${S.count===n?" on":""}" data-act="count" data-v="${n}" aria-pressed="${S.count===n}">${n ? n : (OUTIL.comptesParPaquet ? "Tout" : "Toutes")}</button>`).join("")}</div>
  <p class="fine">${OUTIL.comptesParPaquet ? `${DECKS.filter(d => S.selected.includes(d.key)).reduce((n, d) => n + (S.count ? Math.min(d.items.length, S.count) : d.items.length), 0)} questions avec ce réglage.` : "Les questions sont tirées dans tous les paquets cochés, à tour de rôle."}</p>` : ""}
  <p class="lab">Ton niveau</p><div class="opts">${Object.entries(DIFFICULTIES).map(([k,d]) => `<button class="opt${S.difficulty===k?" on":""}" data-act="diff" data-v="${k}" aria-pressed="${S.difficulty===k}"><span class="opt-e">${d.emoji}</span><span class="opt-main">${d.label}</span><span class="opt-sub">${d.sub}</span></button>`).join("")}</div>
  <p class="lab">Comment on corrige</p><div class="opts">${Object.entries(MODES).map(([k,m]) => `<button class="opt${S.mode===k?" on":""}" data-act="mode" data-v="${k}" aria-pressed="${S.mode===k}"><span class="opt-e">${m.emoji}</span><span class="opt-main">${m.label}</span><span class="opt-sub">${m.sub}</span></button>`).join("")}</div>`;
  if (ORDRES) h += `<p class="lab">Ordre des questions</p><div class="opts">${Object.entries(ORDRES).map(([k,o]) => `<button class="opt${S.order===k?" on":""}" data-act="order" data-v="${k}" aria-pressed="${S.order===k}"><span class="opt-e">${o.emoji}</span><span class="opt-main">${o.label}</span><span class="opt-sub">${o.sub}</span></button>`).join("")}</div>`;
  if (S.frozen){
    h += `<div class="paper"><b>Version papier prête</b><p class="fine">Ce test est figé : la question N° 5 de la feuille sera la N° 5 à l'écran.</p>
      <button class="ghost small" data-act="paper" data-v="ex">Feuille d'exercices</button>
      <button class="ghost small" data-act="paper" data-v="both">Exercices + corrigé en dernière page</button>
      <button class="ghost small" data-act="paper" data-v="key">Corrigé seul</button>
      ${S.paperMsg ? `<p class="warn">${esc(S.paperMsg)}</p>` : ""}
      ${S.paperCopy ? `<textarea class="exportarea" readonly rows="6" id="paper-copy">${esc(S.paperCopy)}</textarea>` : ""}
      <button class="ghost small" data-act="unfreeze">Annuler et tirer un autre test</button></div>
      <button class="cta" data-act="start">Commencer ce test à l'écran</button>`;
  } else {
    h += `<button class="ghost" data-act="freeze">🖨️ Version papier de ce test</button><button class="cta" data-act="start">Commencer</button>`;
  }
  h += `<p class="fine">${S.mode === "live" ? "En correction en direct, une lettre fausse est marquée dès que tu la tapes. Un mot que tu as dû corriger ne compte pas dans la note : il revient dans « Refaire mes erreurs »." : esc(OUTIL.conseilSetup || `En épreuve blanche, tu ne vois aucune réponse avant la fin : c'est ce qui ressemble le plus à l'épreuve du ${DUE.long}.`)}</p>`;
  return h;
}

/* ---------- correction en direct (publication-github.md § 9) ---------- */
function lvUnit(c){ return /[\p{L}\p{N}]/u.test(c) ? dxN(c) : ""; }
function lvCands(q){ return COUCHE.liveCands(q); }
function lvCheck(typed, cands){
  const chars = [...typed], T = [];
  chars.forEach((c, i) => { for (const u of lvUnit(c)) T.push({ ch:u, i }); });
  const t = T.map(x => x.ch), m = t.length;
  let best = null;
  cands.forEach(cs => {
    const c = [...cs], n = c.length;
    const D = Array.from({ length:m+1 }, () => new Array(n+1).fill(0));
    for (let i = 0; i <= m; i++) D[i][0] = i;
    for (let j = 0; j <= n; j++) D[0][j] = j;
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) D[i][j] = Math.min(D[i-1][j] + 1, D[i][j-1] + 1, D[i-1][j-1] + (t[i-1] === c[j-1] ? 0 : 1));
    let bj = 0; for (let j = 0; j <= n; j++) if (D[m][j] < D[m][bj]) bj = j;
    if (!best || D[m][bj] < best.cost) best = { cost:D[m][bj], D, c, bj };
  });
  const bad = new Set(), miss = new Set();
  if (best && best.cost > 0){
    const { D, c } = best; let i = m, j = best.bj;
    while (i > 0 && j > 0){
      if (D[i][j] === D[i-1][j-1] + (t[i-1] === c[j-1] ? 0 : 1)){ if (t[i-1] !== c[j-1]) bad.add(T[i-1].i); i--; j--; }
      else if (D[i][j] === D[i-1][j] + 1){ bad.add(T[i-1].i); i--; }
      else { miss.add(i < m ? T[i].i : -1); j--; }
    }
    while (i > 0){ bad.add(T[i-1].i); i--; }
    while (j > 0){ miss.add(m ? T[0].i : -1); j--; }
  }
  return { bad, miss, n: bad.size + miss.size };
}
function lvHtml(typed, r){
  let h = "";
  [...typed].forEach((c, i) => {
    if (r.miss.has(i)) h += dxMiss;
    h += r.bad.has(i) ? `<span class="lv-bad">${esc(c)}</span>` : esc(c);
  });
  if (r.miss.has(-1)) h += dxMiss;
  return h || `<span class="lv-empty">Tes lettres s'affichent ici</span>`;
}
function updateLive(){
  const Q = S.quiz; if (!Q || S.mode !== "live") return;
  const q = Q.questions[Q.i]; if (!q || q.type !== "type" || Q.checked) return;
  Q.lvcache = Q.lvcache || {};
  const cands = Q.lvcache[Q.i] || (Q.lvcache[Q.i] = lvCands(q));
  const r = lvCheck(Q.typed, cands);
  if (r.n > 0){ Q.hadErr = true; Q.errSnap = Q.typed; }
  const box = document.getElementById("live-box"); if (box) box.innerHTML = lvHtml(Q.typed, r);
  const st = document.getElementById("live-state");
  if (st) st.textContent = r.n ? `✗ ${r.n} ${r.n > 1 ? "lettres à corriger" : "lettre à corriger"}`
    : Q.hadErr ? "✓ Corrigé — ce mot ne comptera pas dans la note" : Q.typed.trim() ? "✓ Pour l'instant, c'est juste" : "";
}

/* ---------- quiz ---------- */
function startQuiz(questions, rattrapage, opts){
  if (S.draft){ S.draftBlock = true; S.draftAsk = false; S.screen = "home"; render(); window.scrollTo(0,0); return; }
  S.quiz = { questions, i:0, picked:null, typed:"", checked:false, ok:false, detail:[], finishing:false, done:false, start:Date.now(), label: opts && opts.label ? opts.label : rattrapage ? S.rattrLabel : deckLabel(S.selected), qms:0, mc:[], qt0:null, seg0:null };
  S.qDiff = opts && opts.diff && DIFFICULTIES[opts.diff] ? opts.diff : S.difficulty;
  S.rattrapage = rattrapage; S.revErr = !!(opts && opts.revErr); S.lastResult = null; S.storeMsg = ""; S.results.all = false; S.quitAsk = false; S.screen = "quiz";
  chronoMarche(); draftSave(); render(); window.scrollTo(0,0);
}
function viewQuiz(){
  if (S.quitAsk) return quitView();
  const Q = S.quiz, q = Q.questions[Q.i], total = Q.questions.length, instant = S.mode !== "exam";
  let h = `<div class="qtop"><button class="quit" data-act="quit" aria-label="Quitter le test">✕</button><div class="bar"><i style="width:${Math.round(Q.i/total*100)}%"></i></div><span class="qn">${Q.i+1}/${total}</span></div>${draftErrLine()}
  <div class="badges"><span class="num">N° ${q.num}</span>${TAG_LABEL[q.tag] ? `<span class="chip ${q.tag}">${esc(TAG_LABEL[q.tag])}</span>` : ""}<span class="ref">Exercice ${q.ex} · ${esc(q.ref || q.exTitle)}</span>${COUCHE.badges ? COUCHE.badges(q) : ""}</div>
  <p class="consigne">${esc(q.consigne)}</p><p class="qword${COUCHE.classeMot ? " " + COUCHE.classeMot(q) : ""}">${esc(AFF(q.word))}</p>${COUCHE.sousQuestion ? COUCHE.sousQuestion(q) : ""}${q.hint ? `<p class="qhint">${esc(OUTIL.prefixeIndice != null ? OUTIL.prefixeIndice : "petit indice : ")}${esc(q.hint)}</p>` : ""}`;
  if (q.type === "mcq"){
    h += `<div class="opts">` + q.options.map((o, k) => {
      let c = "choice" + (COUCHE.classeChoix ? " " + COUCHE.classeChoix(o) : "");
      if (Q.checked){ c += o === q.answer ? " good" : o === Q.picked ? " bad" : " off"; } else if (o === Q.picked) c += " sel";
      return `<button class="${c}" data-act="pick" data-v="${k}" ${Q.checked||Q.finishing?"disabled":""}>${Q.checked && o === q.answer ? "✓ " : Q.checked && o === Q.picked ? "✗ " : ""}${esc(AFF(o))}</button>`;
    }).join("") + `</div>`;
  } else {
    h += `<input id="answer-input" class="tinput${Q.checked?(Q.ok?" good":" bad"):""}" value="${esc(Q.typed)}" placeholder="${q.lang === "de" ? "Deine Antwort…" : "Ta réponse…"}" ${COUCHE.clavier ? ` inputmode="${COUCHE.clavier(q)}"` : ""} autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" ${Q.checked||Q.finishing?"disabled":""}>`;
    if (q.lang === "de" && !Q.checked && !Q.finishing) h += `<div class="umlauts" aria-label="Lettres avec Umlaut">${["ä","ö","ü","Ä","Ö","Ü"].map(u => `<button data-act="uml" data-v="${u}" aria-label="Ajouter ${u}">${u}</button>`).join("")}</div>`;
    if (COUCHE.saisie) h += COUCHE.saisie(q, Q);
    if (S.mode === "live" && !Q.checked) h += `<div class="live"><p class="live-lab">Ta réponse, lettre par lettre</p><div class="live-box" id="live-box"></div><p class="live-state" id="live-state" aria-live="polite"></p></div>`;
  }
  if (Q.finishing) h += `<p class="fine">J'enregistre ton résultat…</p>`;
  if (!Q.checked && !Q.finishing){
    const last = Q.i + 1 >= total;
    if (q.type === "type") h += `<button class="cta" data-act="validate" id="validate-btn" ${Q.typed.trim()?"":"disabled"}>${instant ? "Vérifier" : last ? "Terminer" : "Valider"}</button>`;
    else if (!instant) h += `<button class="cta" data-act="validate" ${Q.picked===null?"disabled":""}>${last ? "Terminer" : "Valider"}</button>`;
    h += `<button class="ghost small" data-act="dontknow">Je ne sais pas</button>`;
  }
  if (Q.checked){
    h += `<div class="fb ${Q.ok?"ok":"no"}"><p class="fb-t">${Q.ok ? "✓ " + ["Juste !","Bien vu.","Nickel.","Exact.","Tu l'as."][Q.i % 5] : Q.liveFixed ? "✓ Juste à la fin, avec de l'aide." : "✗ Presque. Regarde bien :"}</p>
      ${Q.liveFixed ? `<p>Tu as corrigé des lettres en direct : ce mot ne compte pas dans la note. Il reviendra dans « Refaire mes erreurs ».</p>` : ""}
      ${Q.ok ? "" : `<p>Réponse : <b>${esc(AFF(q.answer))}</b></p>`}<p class="fb-x">${esc(AFF(q.expl))}</p>
      ${q.type === "type" && !Q.ok && !Q.liveFixed && S.mode === "train" ? `<button class="ghost small" data-act="typo">C'était juste, j'ai fait une faute de frappe</button>` : ""}
      <button class="cta" data-act="next">${Q.i+1 >= total ? "Voir mon résultat" : "Suivante"}</button></div>`;
  }
  return h;
}
function isRight(q, val){ return COUCHE.isRight(q, val); }
function validate(val){
  const Q = S.quiz; if (Q.done) return;
  const q = Q.questions[Q.i], right = isRight(q, val);
  const liveFixed = S.mode === "live" && q.type === "type" && right && !!Q.hadErr;
  const correct = right && !liveFixed;
  if (S.mode !== "exam"){ Q.ok = correct; Q.liveFixed = liveFixed; Q.checked = true; draftSave(); render(); }
  else record(val, correct);
}
function record(val, correct, typo){
  const Q = S.quiz; if (Q.done) return;
  const q = Q.questions[Q.i];
  const liveFixed = !!(S.mode === "live" && Q.liveFixed);
  const e = { num:q.num, ex:q.ex, ref:q.ref || q.exTitle, prompt:q.prompt, user:val || "", answer:q.answer, correct, expl:q.expl, tag:q.tag, question:q, liveFixed, liveSnap: liveFixed ? (Q.errSnap || "") : "", ms:chronoPrend(Q) };
  if (typo) e.typo = true;
  Q.detail.push(e);
  if (Q.i + 1 >= Q.questions.length){ Q.done = true; Q.finishing = true; render(); finishQuiz(); }
  else { Q.i++; Q.picked = null; Q.typed = ""; Q.checked = false; Q.ok = false; Q.hadErr = false; Q.errSnap = ""; Q.liveFixed = false; draftSave(); render(); }
}
async function finishQuiz(){
  { const Q0 = S.quiz, now = Date.now(); chronoFerme(Q0, Math.min(now, (Q0.act || now) + INACTIF)); Q0.qt0 = null; }
  const Q = S.quiz, score = Q.detail.filter(x => x.correct).length, total = Q.detail.length, id = String(Date.now());
  const att = { id, quiz:QUIZ_ID, date:Date.now(), branche:OUTIL.branche, theme:THEME, deck:Q.label,
    difficulty:DIFFICULTIES[S.qDiff].label, mode:MODES[S.mode].label, ...(ORDRES && ORDRES[S.order] ? { order:ORDRES[S.order].label } : {}), rattrapage:S.rattrapage, parent: S.rattrapage ? (S.rattrParent || null) : null, ...(S.revErr && !S.rattrapage ? { revErreurs:true } : {}), score, total, note:noteFrom(score/total), actif:Q.detail.reduce((s, x) => s + (x.ms || 0), 0), morceaux:(Q.mc || []).map(m => [Math.round(m[0]), Math.round(m[1])]), questions:Q.detail };
  S.attempts = [att, ...S.attempts.filter(a => a.id !== id)];
  try { await store.save(att); S.storeMsg = store.mode === "memory" ? "Ce résultat est affiché ici, mais il ne sera pas gardé si tu fermes la page. Pense à noter ta note ou à l'exporter." : ""; }
  catch(e){ S.storeMsg = "Je n'ai pas pu enregistrer ce résultat : il disparaîtra si tu fermes la page. Note ta note ou copie-la pour le chat."; }
  draftClear();
  S.lastResult = att; S.frozen = null; S.paperMsg = ""; S.paperCopy = ""; S.screen = "results"; render(); window.scrollTo(0,0);
}

/* ---------- bilan (§ 6 bis) ---------- */
function bilanState(id){ return S.bilan[id] || (S.bilan[id] = { busy:false, err:"", copied:false, fallback:"" }); }
function bilanBlock(att){
  const b = bilanState(att.id), a = att.analysis;
  const wrong = att.questions.filter(x => !x.correct), canRetry = wrong.some(x => x.question);
  let h = `<div class="bilan">`;
  if (!a && !b.busy && HAS_CLAUDE) h += `<p class="fine">Tu veux savoir ce qui coince vraiment ? Je regarde tes réponses et je te dis quoi travailler.</p><button class="cta" data-act="analyse" data-v="${att.id}">Analyser mes résultats</button>`;
  if (!a && !HAS_CLAUDE) h += `<p class="fine">Pour savoir ce qui coince vraiment, copie tes résultats et colle-les dans le chat de révisions : on les analyse ensemble.</p>`;
  if (b.busy) h += `<p class="fine">Je regarde tes réponses une par une…</p>`;
  if (b.err) h += `<p class="warn">${esc(b.err)}</p>`;
  if (a){
    h += `<h3>Ton bilan</h3>`;
    if (a.points_forts.length) h += `<p class="bilan-lab">Ce qui est acquis</p><ul class="forts">${a.points_forts.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
    if (a.a_travailler.length) h += `<p class="bilan-lab">À travailler</p><ul class="work">${a.a_travailler.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
    if (a.conseil) h += `<p class="bilan-tip">${esc(a.conseil)}</p>`;
  }
  if (canRetry) h += `<button class="cta" data-act="retryWrong" data-v="${att.id}">Refaire mes erreurs (${wrong.length})</button>`;
  const ev = errView(att.id);
  h += `<div class="${wrong.length?"row":""}">${wrong.length ? `<button class="ghost" data-act="showErr" data-v="${att.id}" aria-pressed="${ev}">${ev ? "Voir toutes les questions" : `Voir mes erreurs (${wrong.length})`}</button>` : ""}<button class="ghost" data-act="copy" data-v="${att.id}">${b.copied ? "Copié — colle-le dans le chat" : "Copier pour le chat"}</button></div>`;
  if (b.fallback) h += `<p class="fine">La copie automatique est bloquée ici. Le texte est sélectionné : copie-le à la main.</p><textarea class="exportarea" readonly rows="8" id="fb-${att.id}">${esc(b.fallback)}</textarea>`;
  return h + `</div>`;
}
function findAttempt(id){ return (S.lastResult && S.lastResult.id === id) ? S.lastResult : S.attempts.find(a => a.id === id); }
/* prompt d'analyse : gabarit commun, rempli par OUTIL.analyse ; l'âge vient de la classe (jamais écrit en dur) */
function analysePrompt(att){
  const A = OUTIL.analyse;
  const lignes = att.questions.map(q => `N° ${q.num}. [${q.tag}] (${q.ref}) ${q.prompt} | réponse de l'élève : ${q.user || "(rien)"} | attendu : ${AFF(q.answer)} | ${q.correct ? (q.typo ? "JUSTE (faute de frappe acceptée)" : "JUSTE") : q.liveFixed ? `JUSTE APRÈS CORRECTION EN DIRECT, compté faux (avait d'abord écrit : ${q.liveSnap})` : "FAUX"}`).join("\n");
  return `Tu es ${A.role}, bienveillant, qui analyse le test d'un élève de ${AGE_ELEVE} (${OUTIL.classe}, canton de Neuchâtel). Il révise ${A.sujet} pour un test le ${DUE.long}.

Score : ${att.score}/${att.total} (note suisse ${fmtNote(att.note)}/6)${att.rattrapage ? " — RATTRAPAGE : seules les questions ratées d'un test précédent ont été rejouées" : ""}
Paquets : ${att.deck}
Niveau : ${att.difficulty} — Mode : ${att.mode}

Détail (l'étiquette entre crochets donne le type de question : ${A.etiquettes}) :
${lignes}

Analyse les ERREURS pour trouver ce qui coince vraiment : ${A.pistes} ? Cherche le point commun, ne recopie pas la liste. S'il n'y a pas de motif clair, dis-le honnêtement.

Réponds UNIQUEMENT par un objet JSON valide, sans texte autour, exactement dans ce format :
{"points_forts":["..."],"a_travailler":["..."],"conseil":"..."}
- "points_forts" : 1 à 3 points courts et concrets.
- "a_travailler" : 1 à 3 axes de progrès formulés positivement, avec l'exemple précis tiré du test.
- "conseil" : 2 phrases maximum, une action à faire ce soir.
Tu tutoies l'élève. Français de Suisse romande, ton encourageant, simple pour un élève de ${AGE_ELEVE}, pas bébé.`;
}
async function analyse(id){
  const att = findAttempt(id), b = bilanState(id); b.busy = true; b.err = ""; render();
  try {
    const sample = window.claude && window.claude.use ? await window.claude.use("sample") : null;
    if (!sample) throw new Error("no sample");
    const parsed = await sample.json(analysePrompt(att), { modelTier:"default" });
    att.analysis = { points_forts: Array.isArray(parsed.points_forts) ? parsed.points_forts : [], a_travailler: Array.isArray(parsed.a_travailler) ? parsed.a_travailler : [], conseil: parsed.conseil || "" };
    try { await store.save(att); } catch(e){}
  } catch(e){
    b.err = "Le bilan n'a pas pu être calculé ici. Le bouton de copie fonctionne quand même : colle tes résultats dans le chat et je les analyse là.";
  }
  b.busy = false; render();
}
/* la source d'une question : ce qui suit le dernier « — » de l'explication (convention des contenus) */
const srcOf = q => (q.expl && q.expl.includes(" — ") ? q.expl.split(" — ").pop() : "").replace(/\.$/,"").trim();
function copyText(att){
  const a = att.analysis, l = [];
  l.push(OUTIL.copie.titre + " (test du " + DUE.short + ")");
  l.push(`${dateLabel(att.date)} · ${att.deck} · ${att.difficulty} · ${att.mode}${att.rattrapage ? " · RATTRAPAGE (questions ratées rejouées)" : ""}`);
  l.push(`Score : ${att.score}/${att.total} — note ${fmtNote(att.note)}/6`, "");
  if (a){ l.push("BILAN"); if (a.points_forts.length) l.push("Acquis : " + a.points_forts.join(" · ")); if (a.a_travailler.length) l.push("À travailler : " + a.a_travailler.join(" · ")); if (a.conseil) l.push("Conseil : " + a.conseil); l.push(""); }
  const wrong = att.questions.filter(q => !q.correct);
  l.push(`ERREURS (${wrong.length}/${att.total})`);
  if (!wrong.length) l.push("Aucune erreur.");
  wrong.forEach(q => l.push(`- N° ${q.num} [${q.tag}] ${q.prompt} → ${q.liveFixed ? `corrigé en direct (j'avais écrit « ${q.liveSnap} », puis « ${q.user} »)` : `j'ai répondu « ${AFF(q.user) || "rien"} »`}, attendu : ${AFF(q.answer)}${srcOf(q) ? ` (${srcOf(q)})` : ""}`));
  return l.join("\n");
}
function copyFor(id){
  const att = findAttempt(id), b = bilanState(id), text = copyText(att);
  const fail = () => { b.fallback = text; render(); setTimeout(() => { const t = document.getElementById("fb-" + id); if (t){ t.focus(); t.select(); } }, 30); };
  try { navigator.clipboard.writeText(text).then(() => { b.copied = true; render(); setTimeout(() => { b.copied = false; render(); }, 2500); }, fail); }
  catch(e){ fail(); }
}
function retryWrong(id){
  const att = findAttempt(id);
  const qs = att.questions.filter(x => !x.correct && x.question).map(x => x.question);
  if (!qs.length) return;
  S.rattrLabel = att.deck; S.rattrParent = att.rattrapage ? (att.parent || att.id) : att.id;
  startQuiz(shuffle(qs), true, { diff:NIV_KEYS[LVL_OF_LABEL[att.difficulty]] });
}

/* ---------- voir mes erreurs (publication-github.md § 8) ---------- */
function dxN(c){ return deAcc(String(c).toLowerCase().replace(/ß/g,"ss").normalize("NFC")); }
function dxW(w){ return dxN(w).replace(/[.,!?;:«»"()…]/g,""); }
function lev(a, b){ const m=a.length,n=b.length; if(!m) return n; if(!n) return m; let p=Array.from({length:n+1},(_,j)=>j); for(let i=1;i<=m;i++){ const c=[i]; for(let j=1;j<=n;j++) c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1)); p=c; } return p[n]; }
function lcsOps(A, B, eq){
  const m=A.length, n=B.length, L=Array.from({length:m+1},()=>new Array(n+1).fill(0));
  for(let i=m-1;i>=0;i--) for(let j=n-1;j>=0;j--) L[i][j]=eq(A[i],B[j])?L[i+1][j+1]+1:Math.max(L[i+1][j],L[i][j+1]);
  const ops=[]; let i=0,j=0;
  while(i<m&&j<n){ if(eq(A[i],B[j])){ ops.push({t:"=",a:A[i],b:B[j]}); i++; j++; } else if(L[i+1][j]>=L[i][j+1]) ops.push({t:"-",a:A[i++]}); else ops.push({t:"+",b:B[j++]}); }
  while(i<m) ops.push({t:"-",a:A[i++]}); while(j<n) ops.push({t:"+",b:B[j++]});
  return ops;
}
function dxBlocks(ops){ const out=[]; let cur=null; ops.forEach(o=>{ if(o.t==="="){ cur=null; out.push(o); } else { if(!cur){ cur={t:"x",del:[],ins:[]}; out.push(cur); } (o.t==="-"?cur.del:cur.ins).push(o.t==="-"?o.a:o.b); } }); return out; }
const dxBad = t => `<del class="dx-bad">${esc(t)}</del>`;
const dxGood = t => `<ins class="dx-good">${esc(t)}</ins>`;
const dxMiss = `<span class="dx-miss" aria-label="il manque quelque chose ici">?</span>`;
function dxChars(u, r){
  let U="", R="";
  dxBlocks(lcsOps([...u],[...r],(x,y)=>dxN(x)===dxN(y))).forEach(b=>{
    if(b.t==="="){ U+=esc(b.a); R+=esc(b.b); return; }
    U += b.del.length ? dxBad(b.del.join("")) : dxMiss;
    if(b.ins.length) R += dxGood(b.ins.join(""));
  });
  return { U, R };
}
function dxDiff(user, right){
  const A=user.trim().split(/\s+/).filter(Boolean), B=right.trim().split(/\s+/).filter(Boolean);
  const U=[], R=[]; let common=0;
  dxBlocks(lcsOps(A,B,(x,y)=>dxW(x)===dxW(y))).forEach(b=>{
    if(b.t==="="){ common++; U.push(esc(b.a)); R.push(esc(b.b)); return; }
    const k=Math.min(b.del.length,b.ins.length);
    for(let i=0;i<k;i++){
      const x=b.del[i], y=b.ins[i], lim=Math.max(1, Math.floor(Math.max(dxW(x).length,dxW(y).length)*0.4));
      if(lev(dxW(x),dxW(y))<=lim){ const c=dxChars(x,y); U.push(c.U); R.push(c.R); common++; }
      else { U.push(dxBad(x)); R.push(dxGood(y)); }
    }
    b.del.slice(k).forEach(x=>U.push(dxBad(x)));
    if(b.ins.length>k){ U.push(dxMiss); b.ins.slice(k).forEach(y=>R.push(dxGood(y))); }
  });
  return { U:U.join(" "), R:R.join(" "), other: common===0 };
}
function dxLegend(){ return `<p class="dx-legend"><span>${dxBad("barré")} = ce qui était faux</span><span>${dxGood("souligné")} = ce qu'il fallait écrire</span><span>${dxMiss} = il manque quelque chose</span></p>`; }
function errCard(q){
  const Q = q.question || {}, isMcq = Q.type === "mcq", user = ((q.liveFixed && q.liveSnap) ? q.liveSnap : (q.user || "")).trim();
  let right = q.answer, U, R, note = "";
  if (!user){ U = `<span class="dx-none">rien</span>`; R = dxGood(AFF(right)); }
  else if (isMcq || COUCHE.diffEntiere){ U = dxBad(AFF(user)); R = dxGood(AFF(right)); }
  else {
    const cands = (Q.accept && Q.accept.length ? Q.accept : [q.answer]).filter(Boolean);
    right = cands.reduce((best, c) => lev(dxN(user), dxN(c)) < lev(dxN(user), dxN(best)) ? c : best, cands[0]);
    const d = dxDiff(user, right); U = d.U; R = d.R;
    if (d.other) note = OUTIL.noteAutre || "Ce n'est pas la même phrase : relis le modèle et réécris-la en entier.";
  }
  if (q.liveFixed) note = "Corrigé en direct : juste à la fin, mais avec de l'aide. Ce mot ne compte pas dans la note.";
  return `<div class="revcard"><p class="rev-q">N° ${q.num} · ${esc(q.prompt)}</p>
    <p class="dx-line"><span class="dx-lab">✗ ${isMcq ? "Tu as choisi" : q.liveFixed ? "Tu avais écrit" : "Tu as écrit"}</span><span class="dx-ans">${U}</span></p>
    <p class="dx-line"><span class="dx-lab">✓ Il fallait</span><span class="dx-ans">${R}</span></p>
    ${note ? `<p class="dx-note">${note}</p>` : ""}${right !== q.answer ? `<p class="fine">Réponse complète : ${esc(AFF(q.answer))}</p>` : ""}
    <p class="rev-x">${esc(AFF(q.expl))}</p></div>`;
}
function errView(id){ const b = bilanState(id); return b.errOnly != null ? b.errOnly : S.screen === "results"; }
function questionList(att){
  const only = errView(att.id), wrong = att.questions.filter(q => !q.correct), list = only ? wrong : att.questions;
  return (wrong.length ? dxLegend() : "") + list.map(q => q.correct ? revCard(q, !only) : errCard(q)).join("");
}
function revCard(q, showGoodAlways){
  return `<div class="revcard${q.correct?" ok":""}"><p class="rev-q">N° ${q.num} · ${esc(q.prompt)}</p><p>Ta réponse : ${q.user ? esc(AFF(q.user)) : "—"}${q.typo ? " (faute de frappe acceptée)" : ""}</p>${(!q.correct || showGoodAlways) ? `<p class="${q.correct?"rev-good":""}">Réponse : <b>${esc(AFF(q.answer))}</b></p>` : ""}<p class="rev-x">${esc(AFF(q.expl))}</p></div>`;
}
function viewResults(){
  const att = S.lastResult, pct = Math.round(att.score/att.total*100), wrong = att.questions.filter(q => !q.correct);
  const msg = pct === 100 ? `Sans faute. Tu es prêt pour ${DUE.long}.` : pct >= 80 ? "Solide. Repasse juste sur les quelques ratés." : pct >= 60 ? "La base est là. Refais tes erreurs, tu vas vite grimper." : pct >= 40 ? "Bon début. Relis la fiche, puis refais un tour en Échauffement." : "C'est le moment de relire la fiche tranquillement. Ça va venir.";
  return `<div class="scorebox${att.rattrapage ? " rattr-box" : ""}"><div class="score-n">${att.score}<small>/${att.total}</small></div><span class="score-note">note ${fmtNote(att.note)}</span>${att.rattrapage ? `<span class="rattr">Rattrapage — ${att.total} question${att.total>1?"s":""} ratée${att.total>1?"s":""} rejouée${att.total>1?"s":""}</span>` : ""}</div>
  <p class="intro">${msg}</p>${(() => { if (!att.rattrapage) return ""; const p = S.attempts.find(a => a.id === att.parent); const sc = p && testScore(p, "all"); return sc && sc.steps.length ? `<p class="note">Ton test du ${dateLabel(p.date)} remonte : ${fmtNote(sc.note)} → ${fmtNote(sc.steps[sc.steps.length-1].note)} après ${sc.steps.length} rattrapage${sc.steps.length>1?"s":""}.</p>` : ""; })()}${(() => { const lf = att.questions.filter(q => q.liveFixed).length; return lf ? `<p class="fine">Dont ${lf} mot${lf>1?"s":""} juste${lf>1?"s":""} après correction en direct : ${lf>1?"ils ne comptent":"il ne compte"} pas dans la note.</p>` : ""; })()}${S.storeMsg ? `<p class="warn">${esc(S.storeMsg)}</p>` : ""}
  ${bilanBlock(att)}
  <p class="lab">${!wrong.length ? "Aucune erreur" : errView(att.id) ? `Mes erreurs (${wrong.length})` : `Toutes les questions (${att.total})`}</p>
  <div class="rev">${questionList(att)}</div>
  ${att.revErreurs ? reviserBloc() + `<button class="ghost" data-act="nav" data-v="home">Paquets</button>` : `<div class="row"><button class="ghost" data-act="start">Refaire le test</button><button class="ghost" data-act="nav" data-v="home">Paquets</button></div>`}`;
}

/* v14 : notes sans aide par niveau (rattrapages exclus) — ○ □ ◆ pour les tests « Je m'entraîne » et « Correction en direct »
   faits à ce niveau, ★ pour les épreuves blanches, quel que soit leur niveau ; « — » pour un niveau jamais testé */
/* v16 : avancement d'un niveau (ou de tous les niveaux, lvl -1) sur tout l'outil, sans bouton : barre fine de cases pleines et vides,
   « N/M » et « ✓ » quand c'est complet ; mêmes chiffres que les lignes des cartes testées sous la pastille générale */
function barreCompacte(cv){
  const n = cv.total, u = uniteDe(BT_TOUT), acc = BT_FEM.test(u) ? "es" : "s";
  const cells = n <= 12 ? n : 12;   /* barre courte : au plus 12 cases, le nombre écrit reste exact */
  let plein = n <= 12 ? cv.posed : Math.round(cv.posed / n * cells);
  if (cv.posed > 0 && plein < 1) plein = 1; if (cv.posed < n && plein > cells - 1) plein = cells - 1;
  const nom = cv.lvl < 0 ? "Tous niveaux" : DIFFICULTIES[NIV_KEYS[cv.lvl]].label;
  let cases = ""; for (let i = 0; i < cells; i++) cases += `<i class="bt-c${i < plein ? " on" : ""}"></i>`;
  return `<span class="bt-bar" role="img" aria-label="${esc(nom)} : ${cv.posed} ${esc(u)} testé${acc} sur ${n}${cv.posed === n ? ", complet" : ""}">${cases}</span><span class="nn-n" aria-hidden="true">${cv.posed}/${n}${cv.posed === n ? " ✓" : ""}</span>`;
}
function notesParNiveau(roots){
  if (!roots.length) return "";
  const hist = histByCard(), trois = COUCHE.rings !== 1;
  const av = k => { if (!trois || k === "exam") return ""; const cv = couverture(BT_TOUT, hist, NIV_KEYS.indexOf(k)); return cv.total ? `<span class="nn-av">${barreCompacte(cv)}</span>` : ""; };
  let un = "";
  if (!trois){ const cv = couverture(BT_TOUT, hist, -1), u = uniteDe(BT_TOUT); if (cv.total) un = `<div class="nn-un"><span class="nn-lab">${esc(u.charAt(0).toUpperCase() + u.slice(1))} testé${BT_FEM.test(u) ? "es" : "s"}</span>${barreCompacte(cv)}</div>`; }
  const lignes = [...NIV_KEYS.map(k => ({ forme:k, nom:DIFFICULTIES[k].label, as:roots.filter(a => !isExam(a) && a.difficulty === DIFFICULTIES[k].label) })),
    { forme:"exam", nom:"Épreuve blanche", as:roots.filter(isExam) }];
  const cl = n => n >= 5 ? "hc-ok" : n >= 4 ? "hc-mid" : "hc-low";
  return `${un}<div class="tbl heat notesniv"><table><thead><tr><th>Niveau</th><th>Tests</th><th>Moyenne</th><th>Meilleure</th></tr></thead><tbody>${lignes.map(l => {
    if (!l.as.length) return `<tr><td class="k">${nomNiv(l.forme, l.nom)}${av(l.forme)}</td><td class="hc-0">0</td><td class="hc-0">—</td><td class="hc-0">—</td></tr>`;
    const moy = l.as.reduce((s, a) => s + a.note, 0) / l.as.length, best = Math.max(...l.as.map(a => a.note));
    return `<tr><td class="k">${nomNiv(l.forme, l.nom)}${av(l.forme)}</td><td>${l.as.length}</td><td class="${cl(moy)}">${fmtNote(moy)}</td><td>${fmtNote(best)}</td></tr>`; }).join("")}</tbody></table></div>
  <p class="fine">${roots.length} test${roots.length > 1 ? "s" : ""} en tout, rattrapages exclus. Notes sans aide (premier passage) ; moyenne arrondie au dixième.${trois ? " Sous chaque niveau : les cartes déjà posées au premier passage d'un test à ce niveau, sur toutes les cartes de l'outil (« ✓ » : toutes posées)." : ""} ${nomNiv("exam", "Épreuve blanche")} : quel que soit le niveau. La ligne ${nomNiv("hard", "Niveau épreuve")} et la ligne ${nomNiv("exam", "Épreuve blanche")} sont celles qui ressemblent le plus à l'épreuve.</p>`;
}
function viewScores(){
  if (!S.loaded) return `<p class="lab">Mes scores</p><p class="fine">Je récupère tes résultats…</p>`;
  const list = S.attempts;
  if (!list.length) return `<p class="lab">Mes scores</p>${S.loadErr ? `<p class="warn">${esc(S.loadErr)}</p>` : ""}${syncBloc()}<p class="intro">Rien pour l'instant. Fais un premier test : la date, la note et le détail de chaque question s'enregistreront ici.</p><button class="cta" data-act="nav" data-v="setup">Faire un test</button>`;
  const roots = rootTests();
  const sorted = [...list].sort((a,b) => b.date - a.date);
  const exportText = sorted.map(a => `${dateLabel(a.date)} — ${a.deck} (${a.difficulty}, ${a.mode}${a.rattrapage ? ", rattrapage" : ""}) : ${a.score}/${a.total} → note ${fmtNote(a.note)}`).join("\n");
  let h = `<p class="lab">Mes scores</p>${S.loadErr ? `<p class="warn">${esc(S.loadErr)}</p>` : ""}
  ${syncBloc()}
  ${notesParNiveau(roots)}
  ${suiviBlock()}
  ${tempsBlock()}
  <p class="lab">Historique</p>
  <div class="rev">`;
  sorted.forEach(a => {
    const open = S.scores.open === a.id;
    h += `<div class="attempt"><button class="attempt-head" data-act="openAttempt" data-v="${a.id}" aria-expanded="${open}"><span class="attempt-left"><b>${a.rattrapage ? `<span class="rattr-tag">Rattrapage</span>` : ""}${esc(a.deck)}</b><span>${esc(a.difficulty)} · ${esc(a.mode)} · ${dateLabel(a.date)} · ${a.score}/${a.total}${esc(chainTxt(a))}${a.actif != null ? " · ⏱ " + fmtDuree(a.actif) : ""}</span></span><span class="attempt-note ${a.note >= 4 ? "good" : "low"}">${fmtNote(a.note)}</span></button>`;
    if (open) h += `<div class="attempt-body">${tempsTest(a)}${bilanBlock(a)}${questionList(a)}</div>`;
    h += `</div>`;
  });
  h += `</div><button class="ghost" data-act="exportToggle">${S.scores.exportOpen ? "Cacher la sauvegarde" : "💾 Exporter mes scores"}</button>`;
  if (S.scores.exportOpen) h += `<p class="fine">Touche le texte, copie-le et colle-le dans une note ou envoie-le à tes parents.</p><textarea class="exportarea" readonly rows="${Math.min(list.length+1, 8)}" id="export-area">${esc(exportText)}</textarea>`;
  h += S.scores.confirm
    ? `<div class="confirm"><span>Tout effacer, sans retour possible ?</span><button class="mini yes" data-act="clearYes">Effacer</button><button class="mini" data-act="clearNo">Annuler</button></div>`
    : `<button class="ghost danger" data-act="clearAsk">🗑️ Effacer tout l'historique</button>`;
  return h;
}

/* ---------- version papier (§ 11.6) ---------- */
function paperHtml(qs, part){
  const P = OUTIL.papier;
  const exercises = []; qs.forEach(q => { let e = exercises[exercises.length-1]; if (!e || e.ex !== q.ex){ e = { ex:q.ex, title:q.exTitle, consigne:q.consigne, qs:[] }; exercises.push(e); } e.qs.push(q); });
  const meta = `${deckLabel(S.selected)} · ${DIFFICULTIES[S.difficulty].label} · ${qs.length} questions`;
  const line = q => `<b>${q.num}.</b> ${esc(AFF(q.word))}${q.hint ? ` <span class="hint">(${esc(q.hint)})</span>` : ""}${q.ref ? ` <span class="hint">${esc(q.ref)}</span>` : ""}${COUCHE.papierSource && (q.src || srcOf(q)) ? `<span class="qsrc">📖 Où vérifier : ${esc(q.src || srcOf(q))}</span>` : ""}`;
  const sheet = exercises.map(e => `<section class="ex"><h2>Exercice ${e.ex} — ${esc(e.title)}</h2><p class="cons">${esc(e.consigne)}</p>${e.qs.map(q => q.type === "mcq"
    ? `<div class="q">${line(q)}<div class="opts">${q.options.map(o => `<span>☐ ${esc(AFF(o))}</span>`).join("")}</div></div>`
    : `<div class="q">${line(q)}${COUCHE.papierGrille ? `<div class="qgrid"></div>` : `<div class="qline"></div>`}</div>`).join("")}</section>`).join("");
  const key = `<h1>Corrigé</h1><p class="meta">${esc(meta)}</p>` + exercises.map(e => `<section class="ex"><h2>Exercice ${e.ex} — ${esc(e.title)}</h2>${e.qs.map(q => `<div class="k"><b>${q.num}.</b> ${esc(AFF(q.word))} → <b>${esc(AFF(q.answer))}</b>${srcOf(q) ? ` <span class="hint">(${esc(srcOf(q))})</span>` : ""}</div>`).join("")}</section>`).join("");
  const head = `<h1>${esc(P.titre)}</h1><p class="meta">Prénom : ${esc(OUTIL.eleve)} · test du ${esc(DUE.long)} · ${esc(meta)}</p><p class="meta">Date : ____________ &nbsp; Note : ______ / 6</p>`;
  const body = part === "ex" ? head + sheet : part === "key" ? key : head + sheet + `<div class="pb"></div>` + key;
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(P.court)} (${esc(DUE.short)})</title><style>
@page{size:A4 portrait;margin:12mm}body{font-family:Arial,Helvetica,sans-serif;color:#111;margin:0 auto;max-width:186mm;padding:10px}
h1{font-size:20px;margin:0 0 4px}h2{font-size:15px;margin:14px 0 2px;border-bottom:1px solid #999}.meta{margin:2px 0;font-size:13px}.cons{font-style:italic;margin:2px 0 6px;font-size:13px}
.ex{break-inside:avoid}.q{margin:8px 0;font-size:14px;break-inside:avoid}.hint{color:#555;font-size:12px}.opts{display:flex;flex-wrap:wrap;gap:4px 18px;margin:4px 0 0 18px}.qline{border-bottom:1px solid #444;height:22px;margin:6px 0 0 18px}.qgrid{height:15mm;margin:6px 0 0 18px;border:1px solid #888;background-image:linear-gradient(#ccc 1px,transparent 1px),linear-gradient(90deg,#ccc 1px,transparent 1px);background-size:3mm 3mm;-webkit-print-color-adjust:exact;print-color-adjust:exact}.qsrc{display:block;color:#555;font-size:11.5px;margin:2px 0 0 18px}
.k{font-size:13.5px;margin:3px 0}.pb{break-before:page}.print{position:fixed;top:10px;right:10px;padding:8px 14px;font-size:14px}@media print{.print{display:none}}
</style></head><body><button class="print" onclick="window.print()">Imprimer</button>${body}</body></html>`;
}
async function savePaper(part){
  const qs = S.frozen; S.paperMsg = ""; S.paperCopy = "";
  const names = { ex:"exercices", both:"exercices-et-corrige", key:"corrige" };
  const filename = `${DUE.iso}_${OUTIL.papier.fichier}-${names[part]}.html`;
  try {
    if (!HAS_CLAUDE){
      const url = URL.createObjectURL(new Blob([paperHtml(qs, part)], { type:"text/html" }));
      const a = document.createElement("a"); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      S.paperMsg = "Fichier téléchargé : ouvre-le, puis touche « Imprimer »."; render(); return;
    }
    const dl = await window.claude.use("downloads");
    if (!dl) throw { code:"unavailable" };
    await dl.save({ filename, data:paperHtml(qs, part) });
  } catch(e){
    if (e && e.code === "declined"){ S.paperMsg = "Téléchargement annulé."; }
    else {
      S.paperMsg = "Le téléchargement ne passe pas ici. Copie le texte ci-dessous et colle-le dans le chat : je t'envoie la feuille de ce test exact.";
      S.paperCopy = OUTIL.papier.code + "\n" + qs.map(q => `${q.num}. [Ex ${q.ex} ${q.exTitle} — ${q.consigne}] ${AFF(q.word)}${q.hint ? " (" + q.hint + ")" : ""}${q.options ? " | " + q.options.map(AFF).join(" / ") : ""} → ${AFF(q.answer)}`).join("\n");
    }
  }
  render();
}

/* ---------- chargement de l'historique + test en cours ---------- */
async function loadHistory(){
  try {
    await store.init();
    if (COUCHE.charger){ try { await COUCHE.charger(); } catch(e){} }
    SYNC.init();
    S.syncDoc = null;
    if (SYNC.on){
      const items = await SYNC.recevoir();
      if (items){
        const enFile = new Set(SYNC.file.map(x => x.id)), supprLoc = SYNC.supprimes();
        const ici = new Set((await store.list()).map(a => a.id)), distants = new Set();
        items.forEach(it => {
          if (it.type === "suppr"){ distants.add(it.id); if (ici.has(it.id) && !enFile.has(it.id)) store.removeLocal(it.id); SYNC.noterSuppr(it.id); return; }
          if (it.type === "doc"){ if (it.id === DRAFT_ID && !enFile.has(DRAFT_ID)) S.syncDoc = it.data; return; }
          distants.add(it.id);
          if (it.data && !ici.has(it.id) && !supprLoc.has(it.id)) store.saveLocal(it.data);
        });
        /* tests de cet appareil jamais envoyés (avant la synchro, ou envoi perdu) : on les envoie */
        (await store.list()).forEach(a => { if (!distants.has(a.id) && !enFile.has(a.id)) SYNC.sauver(a); });
      }
      SYNC.envoyer();
      window.addEventListener("online", () => SYNC.envoyer());
    }
    let raw = await store.list();
    raw.sort((a,b) => b.date - a.date);
    const cleaned = raw.filter((a, k) => { const prev = raw[k-1]; return !(prev && prev.deck === a.deck && !!prev.rattrapage === !!a.rattrapage && prev.total === a.total && Math.abs(prev.date - a.date) < 3000); });
    for (const a of raw) if (!cleaned.includes(a)) { try { await store.remove(a.id); } catch(e){} }
    const known = new Set(S.attempts.map(a => a.id));
    S.attempts = [...S.attempts, ...cleaned.filter(a => !known.has(a.id))].sort((a,b) => b.date - a.date);
  } catch(e){
    S.loadErr = "Je n'arrive pas à lire tes anciens résultats pour l'instant. Les nouveaux tests s'afficheront quand même.";
  }
  try { let dd = null; try { dd = store.mode === "local" ? S.syncDoc : await store.getDoc(DRAFT_ID); } catch(e){} const dl = draftLocalGet(); const d = draftPick(dd, dl); if (!S.quiz) S.draft = d; } catch(e){}
  S.loaded = true;
  render();
}

/* ---------- événements ---------- */
document.addEventListener("click", e => {
  const el = e.target.closest("[data-act]"); if (!el || el.disabled) return;
  const act = el.dataset.act, v = el.dataset.v;
  const Q = S.quiz;
  switch(act){
    case "nav": S.draftBlock = false; S.screen = v; S.scores.confirm = false; if (COUCHE.surNav) COUCHE.surNav(); render(); window.scrollTo(0,0); break;
    case "fiche": S.ficheOpen = S.ficheOpen === +v ? -1 : +v; render(); break;
    case "toggle": S.selected = S.selected.includes(v) ? S.selected.filter(x => x !== v) : DECKS.map(d => d.key).filter(k => k === v || S.selected.includes(k)); S.frozen = null; S.cards.order = []; render(); break;
    case "allDecks": S.selected = S.selected.length === DECKS.length ? [] : DECKS.map(d => d.key); S.frozen = null; S.cards.order = []; render(); break;
    case "toCards": S.screen = "cards"; render(); break;
    case "flip": S.cards.flip = !S.cards.flip; render(); break;
    case "card": { const n = cardEntries().length; S.cards.flip = false; S.cards.pos = (S.cards.pos + (+v) + n) % n; render(); break; }
    case "cardShuffle": S.cards.order = shuffle(S.cards.order); S.cards.pos = 0; S.cards.flip = false; render(); break;
    case "diff": S.difficulty = v; S.frozen = null; S.paperMsg = ""; S.paperCopy = ""; render(); break;
    case "mode": S.mode = v; render(); break;
    case "count": S.count = +v; S.frozen = null; render(); break;
    case "order": S.order = v; S.frozen = null; S.paperMsg = ""; S.paperCopy = ""; render(); break;
    case "testDeck": if (S.draft){ S.draftBlock = true; S.screen = "home"; render(); window.scrollTo(0,0); break; } S.mode = "train"; S.rattrParent = null; S.selected = [v]; startQuiz(buildTest([v], S.difficulty, 0, ORDRES ? Object.keys(ORDRES)[0] : ""), false); break;
    case "freeze": S.frozen = buildTest(S.selected, S.difficulty, S.count, S.order); render(); break;
    case "unfreeze": S.frozen = null; S.paperMsg = ""; S.paperCopy = ""; render(); break;
    case "paper": savePaper(v); break;
    case "start": S.rattrParent = null; startQuiz(S.frozen || buildTest(S.selected, S.difficulty, S.count, S.order), false); break;
    case "uml": case "key": { const inp = document.getElementById("answer-input"); if (!inp || inp.disabled) return; const s = inp.selectionStart ?? inp.value.length, en = inp.selectionEnd ?? s; inp.value = inp.value.slice(0, s) + v + inp.value.slice(en); Q.typed = inp.value; inp.focus(); inp.setSelectionRange(s + v.length, s + v.length); const b = document.getElementById("validate-btn"); if (b) b.disabled = !Q.typed.trim(); updateLive(); if (COUCHE.onSaisie) COUCHE.onSaisie(Q); break; }
    case "quit": S.quitAsk = true; render(); break;
    case "quitKeep": chronoPause(); draftSave(); S.quiz = null; S.quitAsk = false; S.screen = "home"; render(); window.scrollTo(0,0); break;
    case "quitDrop": draftClear(); S.quiz = null; S.quitAsk = false; S.screen = "home"; render(); window.scrollTo(0,0); break;
    case "quitNo": S.quitAsk = false; render(); break;
    case "draftResume": draftResume(); break;
    case "draftAsk": S.draftAsk = true; render(); break;
    case "draftNo": S.draftAsk = false; render(); break;
    case "draftDrop": draftClear(); render(); break;
    case "pick": { if (Q.checked || Q.done) return; const q = Q.questions[Q.i]; Q.picked = q.options[+v]; if (S.mode === "train" || S.mode === "live") validate(Q.picked); else render(); break; }
    case "validate": { const q = Q.questions[Q.i]; if (q.type === "type"){ const inp = document.getElementById("answer-input"); Q.typed = inp ? inp.value : Q.typed; if (Q.typed.trim()) validate(Q.typed); } else if (Q.picked !== null) validate(Q.picked); break; }
    case "dontknow": { const q = Q.questions[Q.i]; if (S.mode !== "exam"){ Q.ok = false; Q.liveFixed = false; Q.checked = true; if (q.type === "mcq") Q.picked = null; draftSave(); render(); } else record("", false); break; }
    case "typo": record(Q.typed, true, true); break;
    case "next": { const q = Q.questions[Q.i]; record(q.type === "mcq" ? Q.picked : Q.typed, Q.ok); break; }
    case "showErr": { const b = bilanState(v); b.errOnly = !errView(v); render(); break; }
    case "analyse": analyse(v); break;
    case "copy": copyFor(v); break;
    case "retryWrong": retryWrong(v); break;
    case "redoBad": redoCards(v); break;
    case "redoCards": redoCards(v); break;
    case "reviserErreurs": reviserErreurs(); break;
    case "revNiv": if (DIFFICULTIES[v]) S.revNiv = v; render(); break;
    case "heatCell": S.suivi.cell = S.suivi.cell === v ? null : v; render(); break;
    case "testerNonPoses": testerNonPoses(v); break;
    case "suiviF": S.suivi.f = v; S.suivi.pt = null; render(); break;
    case "suiviPt": S.suivi.pt = S.suivi.pt === v ? null : v; render(); break;
    case "openAttempt": S.scores.open = S.scores.open === v ? null : v; render(); break;
    case "exportToggle": S.scores.exportOpen = !S.scores.exportOpen; render(); break;
    case "clearAsk": S.scores.confirm = true; render(); break;
    case "syncCode": S.syncForm = true; S.syncErr = ""; render(); { const i = document.getElementById("sync-code-in"); if (i) i.focus(); } break;
    case "syncNo": S.syncForm = false; S.syncErr = ""; render(); break;
    case "syncOk": syncValider(); break;
    case "clearNo": S.scores.confirm = false; render(); break;
    case "clearYes": (async () => {
      const ids = S.attempts.map(a => a.id); S.attempts = []; S.scores = { open:null, exportOpen:false, confirm:false }; render();
      let failed = false; for (const id of ids){ try { await store.remove(id); } catch(e){ failed = true; } }
      if (failed){ S.loadErr = "L'effacement n'a pas pu être enregistré partout. Recharge la page et réessaie."; render(); }
    })(); break;
    default: if (COUCHE.action) COUCHE.action(act, v, el);
  }
});
document.addEventListener("change", e => { if (e.target && e.target.id === "suivi-ch"){ S.suivi.ch = e.target.value; S.suivi.pt = null; render(); return; } if (COUCHE.onChange) COUCHE.onChange(e); });
document.addEventListener("input", e => {
  if (COUCHE.onInput && COUCHE.onInput(e)) return;
  if (e.target.id === "answer-input" && S.quiz){ S.quiz.typed = e.target.value; const b = document.getElementById("validate-btn"); if (b) b.disabled = !S.quiz.typed.trim(); updateLive(); if (COUCHE.onSaisie) COUCHE.onSaisie(S.quiz); }
});
document.addEventListener("keydown", e => {
  if (e.target.id === "sync-code-in" && e.key === "Enter"){ e.preventDefault(); syncValider(); return; }
  if (e.target.id === "answer-input" && e.key === "Enter" && S.quiz && !S.quiz.checked && !S.quiz.done && S.quiz.typed.trim()){ e.preventDefault(); validate(S.quiz.typed); }
  if ((e.key === "Enter" || e.key === " ") && e.target && e.target.dataset && e.target.dataset.act === "heatCell"){ e.preventDefault(); const v = e.target.dataset.v; S.suivi.cell = S.suivi.cell === v ? null : v; render(); return; }
  if ((e.key === "Enter" || e.key === " ") && e.target && e.target.classList && e.target.classList.contains("ch-pt")){ e.preventDefault(); const v = e.target.dataset.v; S.suivi.pt = S.suivi.pt === v ? null : v; render(); }
});
document.addEventListener("focusin", e => { if (e.target.classList && e.target.classList.contains("exportarea")) e.target.select(); });

/* le test en cours est aussi gardé quand la page passe en arrière-plan */
/* … et ce qui attend d'être synchronisé part tout de suite (les envois répétés ne créent pas de doublon) */
function syncAuDepart(){ if (!SYNC.on || !SYNC.file.length || !navigator.sendBeacon) return; try { navigator.sendBeacon(SYNC.url, JSON.stringify({ eleve:OUTIL.eleve, code:SYNC.code, action:"batch", ops:SYNC.file.slice(0, 20) })); } catch(e){} }
document.addEventListener("visibilitychange", () => { if (document.hidden){ chronoPause(); draftSave(); syncAuDepart(); } else chronoMarche(); });
window.addEventListener("pagehide", () => { chronoPause(); draftSave(); syncAuDepart(); });
/* chaque clic ou frappe pendant un test relance le chronomètre (et compte au plus 2 minutes depuis l'action précédente) */
["pointerdown", "keydown", "input"].forEach(t => document.addEventListener(t, () => { if (chronoQ()) chronoMarche(); }, true));

render();
loadHistory();

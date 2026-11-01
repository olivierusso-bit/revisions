/* ============================================================
   COUCHE MATHS — calculs, puissances, notation scientifique, racines
   (prompt-artefact-revision.md § 11.3). Assemblée entre le contenu et le noyau.
   Versions : 1 (01.11.2026, C3, née du modèle de maths TE3 « Puissances et racines » v1).

   Ce que la couche attend du CONTENU :
     DECKS[] : paquets { key, code, title, src, consigne, unit, items[] } ; un paquet par objectif de la feuille.
     item    : { front, back:[réponses acceptées, la 1re affichée], wrong:[erreurs typiques], expl, src,
                 consigne?, mcqOnly?, expr?, chg? }
               front et back s'écrivent avec ^ pour un exposant (10^7, 10^(−3)) ; l'écran affiche 10⁷, 10⁻³.
               mcqOnly = toujours à choix ; expr = réponse en écriture (puissance, fraction, notation scientifique) ;
               chg = chiffres changés par rapport à l'exercice d'origine (src).
   Ce que la couche fournit au NOYAU (contrat COUCHE) :
     rings 1 (un anneau, tous niveaux confondus ; une question est acquise quand elle a été écrite juste deux jours différents)
     hasLive false (pas de correction en direct en maths)
     allCards, buildTest(keys, difficulty, limit, order), isRight, cardFace, liveCands
     affiche (10^7 → 10⁷), classeMot, classeChoix, badges (« chiffres changés »), saisie (clavier ^ · − , ( ) / et aperçu),
     onSaisie, diffEntiere (en maths, une réponse fausse est barrée en entier).
   Les références des questions (« Obj. 1 a) ») et les identités des cartes (« o1:a) ») sont celles du modèle v1 :
   l'historique déjà enregistré reste lisible.
   ============================================================ */

/* références stables : a), b)… dans l'ordre de la feuille ; carte = paquet:ref */
DECKS.forEach(d => d.items.forEach((it, i) => { it.consigne = it.consigne || d.consigne; it.ref = String.fromCharCode(97 + i) + ")"; it.key = d.key + ":" + it.ref; }));
const ITEM = {}; DECKS.forEach(d => d.items.forEach(it => ITEM[it.key] = { it, d }));

/* ---------- écriture : 10^7 ↔ 10⁷ ---------- */
const SUP = {"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹","+":"⁺","−":"⁻","-":"⁻"};
function uni(s){ return String(s == null ? "" : s).replace(/\^\(([^)]*)\)|\^(-?[0-9]+)/g, (m, a, b) => [...(a != null ? a : b)].map(c => SUP[c] || c).join("")); }
const UNSUP = {"⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","⁻":"-","⁺":"+"};
/* forme comparable d'une réponse : exposants, signes, espaces et apostrophes des milliers, virgule, « x = » */
function normMath(s){
  let t = String(s || "").toLowerCase().trim();
  t = t.replace(/^[a-z]\s*=\s*/, "");
  t = t.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]+/g, m => "^(" + [...m].map(c => UNSUP[c]).join("") + ")");
  t = t.replace(/[−–—]/g, "-").replace(/[×*∙•]/g, "·").replace(/(\d)\s*x\s*(\d)/g, "$1·$2").replace(/[\s'’]/g, "");
  t = t.replace(/,/g, ".").replace(/:/g, "/");
  t = t.replace(/\^\((-?\d+)\)/g, "^$1").replace(/^\+/, "");
  if (/^-?\d+(\.\d+)?$/.test(t)) t = String(parseFloat(t));
  return t;
}
function mathMatch(input, accept){
  if (!input || !String(input).trim()) return false;
  const me = normMath(input);
  return accept.some(a => normMath(a) === me);
}
/* 4 choix : la bonne réponse et 3 erreurs typiques de l'item, sinon des réponses d'autres items du paquet */
function mathOptions(good, wrong, pool){
  const seen = new Set([normMath(good)]), out = [];
  const add = v => { if (v == null || out.length >= 3) return; const k = normMath(v); if (seen.has(k)) return; seen.add(k); out.push(v); };
  if (wrong && wrong.length){ shuffle(wrong).forEach(add); return shuffle([good, ...out]); }
  shuffle(pool).forEach(x => add(x.back[0]));
  return shuffle([good, ...out]);
}
const isExpr = s => /[\d)]\^|[·:+−\/√∛<>]|^\(/.test(String(s));
const isText = s => /[a-zà-ÿ]{4}/i.test(String(s));

/* ---------- fabrication du test ---------- */
/* n questions d'un paquet : réparties entre ses consignes, dans l'ordre de la feuille */
function sampleDeck(d, n){
  const items = d.items.map((it, idx) => ({ it, idx }));
  if (!n || items.length <= n) return items.map(x => x.it);
  const groups = []; let last = null;
  items.forEach(x => { const c = x.it.consigne; if (c !== last){ groups.push([]); last = c; } groups[groups.length-1].push(x); });
  const pools = groups.map(g => shuffle(g)), picked = []; let gi = 0;
  while (picked.length < n && pools.some(p => p.length)){ const p = pools[gi % pools.length]; if (p.length) picked.push(p.pop()); gi++; }
  return picked.sort((a,b) => a.idx - b.idx).map(x => x.it);
}
function makeQ(it, d, difficulty, i){
  const asMcq = it.mcqOnly || difficulty === "easy" || (difficulty === "normal" && Math.random() < 0.5);
  const q = { id:"q"+(i+1), num:i+1, ex:0, exTitle:d.title, deckKey:d.key, tag:d.key, code:d.code, ref:d.code + " " + it.ref, card:it.key, consigne:it.consigne,
    word:it.front, prompt:`${it.consigne} ${uni(it.front)}`, answer:it.back[0], chg:!!it.chg, mcqOnly:!!it.mcqOnly,
    expl:it.expl + " — " + (it.chg ? "même exercice que " : "") + it.src + ".", expr:!!it.expr, hint:"" };
  if (asMcq){ q.type = "mcq"; q.options = mathOptions(it.back[0], it.wrong, d.items); }
  else { q.type = "type"; q.accept = it.back.slice(); }
  return q;
}
/* un exercice = un bloc de même paquet et même consigne ; numéros uniques (§ 11.6) */
function numberQs(list){
  let ex = 0, lastBlock = null;
  list.forEach((q, i) => { const block = q.deckKey + "|" + q.consigne; if (block !== lastBlock){ ex++; lastBlock = block; } q.ex = ex; q.num = i + 1; q.id = "q" + (i+1); });
  return list;
}
function typeHint(q){
  if (q.expr && /·10\^/.test(q.answer)) return "Tape 4,8·10^-3 (le · avec la touche ci-dessous, ou *).";
  if (q.expr && /^\(.*\/.*\)\^/.test(q.answer)) return "Tape la fraction entre parenthèses : (2/3)^2";
  if (q.expr && /\^/.test(q.answer)) return "Tape l'exposant avec ^ : 10^7, 10^-3";
  if (/^\d{1,3}( \d{3})+$/.test(q.answer)) return "Les espaces ou les apostrophes entre les milliers sont acceptés.";
  return "";
}
function keysFor(q){
  const k = ["−", ","];
  if (q.expr){ k.push("^", "·", "(", ")"); if (/\//.test(q.answer)) k.push("/"); }
  return k;
}

const COUCHE = {
  rings: 1,
  hasLive: false,

  allCards(){
    return DECKS.flatMap(d => d.items.map(it => ({ dk:d.key, word:it.front, aspect:"calcul", mcqOnly:!!it.mcqOnly, levels:[0,1,2], k:it.key })));
  },

  /* limit = nombre de questions par paquet (0 = toutes) ; order = "paper" (comme la feuille) ou "mixed" */
  buildTest(keys, difficulty, limit, order){
    let list = [];
    DECKS.filter(d => keys.includes(d.key)).forEach(d => sampleDeck(d, limit).forEach(it => list.push({ it, d })));
    if (order === "mixed") list = shuffle(list);
    return numberQs(list.map(({ it, d }, i) => makeQ(it, d, difficulty, i)));
  },

  isRight(q, val){ return q.type === "mcq" ? val === q.answer : mathMatch(val, q.accept || [q.answer]); },

  cardFace(d, it){
    return { tagF:`${d.code} ${it.ref} · ${it.consigne}`, front:uni(it.front), frontClass:isText(it.front) ? "txt" : "", hintF:`touche la carte · 📖 ${it.src}`,
      tagB:"Réponse", backHtml:`<span class="face-word${isText(it.back[0]) ? " txt" : ""}">${esc(uni(it.back[0]))}</span><span class="face-mini">${esc(uni(it.expl))}</span><span class="face-hint">📖 ${it.chg ? "même exercice que " : ""}${esc(it.src)}</span>` };
  },

  liveCands(){ return []; },

  /* accroches d'affichage du noyau */
  affiche: uni,
  classeMot(q){ return isText(q.word) ? "txt" : ""; },
  classeChoix(o){ return isExpr(o) && !isText(o) ? "expr" : ""; },
  badges(q){ return q.chg ? `<span class="chg">chiffres changés</span>` : ""; },
  saisie(q, Q){
    let h = "";
    if (!Q.checked && !Q.finishing) h += `<div class="keys">${keysFor(q).map(k => `<button data-act="key" data-v="${esc(k)}" aria-label="Ajouter ${esc(k)}">${esc(k)}</button>`).join("")}</div>`;
    h += `<p class="preview" id="preview">${Q.typed ? "Tu as écrit : " + esc(uni(Q.typed)) : ""}</p>`;
    const hint = typeHint(q);
    if (hint && !Q.checked) h += `<p class="qhint">${esc(hint)}</p>`;
    return h;
  },
  onSaisie(Q){ const p = document.getElementById("preview"); if (p) p.innerHTML = Q.typed ? "Tu as écrit : " + esc(uni(Q.typed)) : ""; },
  diffEntiere: true,
};

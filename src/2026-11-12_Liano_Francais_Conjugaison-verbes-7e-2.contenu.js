/* ============================================================
   CONTENU — Français : conjugaison, « Objectifs évaluation de conjugaison – verbes 7e (2) »
   Outil de révision de Liano — 7e HarmoS. Évaluation : jeudi 12 novembre 2026 (agenda : « FRA : verbe ② Eval »).
   Ce fichier est la seule partie propre à cet outil. Il est assemblé avec
   claude/couche-langues.js et claude/noyau-quiz.js par claude/assembler.py.
   Modèle : 2026-11-17_Livio_Francais_Conjugaison-verbes-10H.contenu.js (conjugaison, couche Langues), simplifié pour la 7e.
   Choix signalés au parent (v1) :
   - verbes et temps : exactement ceux de la feuille d'objectifs (5 verbes : commencer, savoir, courir, dire, vouloir ;
     4 temps de l'indicatif : présent, imparfait, futur simple, passé composé) ;
   - un paquet = un verbe (demande du parent : « une carte par verbe »), une carte = le verbe à un temps (4 cartes par verbe, 20) ;
     à chaque test, la personne (je, tu, il…) est tirée au hasard ;
   - la photo ne donne que la liste des verbes et des temps : les formes conjuguées viennent des tableaux de conjugaison
     de référence (pas d'une photo du cahier de Liano) ; à comparer avec ses tableaux s'il en a ;
   - les ACCENTS et la CÉDILLE COMPTENT (OUTIL.accentsStricts, noyau v9) : « il n'y aura pas de référence » à l'évaluation,
     et « commençait » sans cédille serait faux. Majuscules, espaces et pronom facultatifs ;
   - dans les choix (QCM), en plus des vraies formes des autres personnes et des autres temps, quelques pièges courants
     (cédille oubliée, « vous disez », « je courirai »…) : ce sont des erreurs à reconnaître, jamais des réponses.
   ============================================================ */

/* Thème « l'ardoise de conjugaison » : ardoise vert-de-gris, craie jaune, papier crème ; en-tête : la grille des six personnes.
   Fredoka pour les titres et les formes (rond, lisible, accents nets), Atkinson Hyperlegible pour l'interface. */
const CSS_THEME = `
:root{
  --paper:#F6F1E4; --sheet:#FFFDF7; --ink:#1F2A26; --soft:#5C6862; --rule:#DCD5C2;
  --court:#2F5D50; --court-wash:#E2EDE6; --jersey:#E0A526; --score:#F4D35E; --board:#24352F;
  --good:#1E7A55; --good-wash:#D4F0E1; --bad:#A3241B; --bad-wash:#F6DEDB; --on-court:#FFFFFF;
  --p-okdark:#135E43; --p-ok:#1E8A5F; --p-mid:#D0821F; --p-low:#B8382A; --p-lowsoft:#F0C7C0;
  --box:#2F5D50; --crane:#E0A526; --hl:#FBE8B0;
  --display:'Fredoka','Atkinson Hyperlegible',system-ui,sans-serif;
  --body:'Atkinson Hyperlegible',system-ui,-apple-system,'Segoe UI',sans-serif;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --paper:#141B18; --sheet:#1C2622; --ink:#ECF1EC; --soft:#A2B2AA; --rule:#2F3D37;
  --court:#7CC7AE; --court-wash:#1F3129; --jersey:#F0BC4A; --score:#F4D35E; --board:#0E1512;
  --good:#5ED3A0; --good-wash:#15362A; --bad:#FF8A7D; --bad-wash:#3A1E1B; --on-court:#0E1512;
  --p-okdark:#3FB488; --p-ok:#5ED3A0; --p-mid:#E8A24D; --p-low:#FF8A7D; --p-lowsoft:#5A2A25;
  --box:#7CC7AE; --crane:#F0BC4A; --hl:#4A3A16; color-scheme:dark}}
:root[data-theme="dark"]{
  --paper:#141B18; --sheet:#1C2622; --ink:#ECF1EC; --soft:#A2B2AA; --rule:#2F3D37;
  --court:#7CC7AE; --court-wash:#1F3129; --jersey:#F0BC4A; --score:#F4D35E; --board:#0E1512;
  --good:#5ED3A0; --good-wash:#15362A; --bad:#FF8A7D; --bad-wash:#3A1E1B; --on-court:#0E1512;
  --p-okdark:#3FB488; --p-ok:#5ED3A0; --p-mid:#E8A24D; --p-low:#FF8A7D; --p-lowsoft:#5A2A25;
  --box:#7CC7AE; --crane:#F0BC4A; --hl:#4A3A16; color-scheme:dark}
:root{ --focus:var(--jersey); }
/* en-tête : une petite ardoise avec les six personnes écrites à la craie */
.head{align-items:center}
.ardoise{flex:none;display:grid;grid-template-columns:repeat(3,auto);gap:1px 8px;padding:9px 11px;border:4px solid #A9774A;border-radius:8px;background:#2B3D36;font-family:var(--display);font-weight:500;font-size:14px;line-height:1.2;color:#F2EFE4;box-shadow:0 3px 0 rgba(0,0,0,.15)}
.ardoise span:nth-child(n+4){color:#F4D35E}
.head h1{font-family:var(--display);font-weight:600;font-size:clamp(25px,7.4vw,33px);line-height:1.05}
.qword,.face-word{font-family:var(--display);font-weight:500}
.choice{font-family:var(--display);font-weight:500;font-size:19px}
.tinput{font-family:var(--display);font-weight:500}
/* tableaux de la fiche : une case par temps */
.cj-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
.cj-t{background:var(--paper);border-radius:8px;padding:8px 10px 9px}
.cj-t.cmp{background:transparent;border:1px dashed var(--rule)}
.cj-t h4{margin:0 0 4px;font:700 13px/1.2 var(--body);color:var(--court)}
.cj-t p{margin:0;font-family:var(--display);font-size:16px;line-height:1.45}
.cj-t p i{font-style:normal;color:var(--soft)}
.cj-t b{color:#B5651D;font-weight:600}
.cj-note{margin:10px 0 0;padding:8px 10px;border-left:4px solid var(--jersey);background:var(--hl);border-radius:0 6px 6px 0;font-size:15px}
.cj-face{display:block;font-family:var(--display);font-size:20px;line-height:1.45;text-align:left}
.cj-face i{font-style:normal;color:var(--soft)}
/* étiquettes : le temps demandé */
.chip.pres{background:#E2EDE6;color:#2F5D50}
.chip.imp{background:#FDEFD6;color:#8A5410}
.chip.fut{background:#ECE6F8;color:#563C9A}
.chip.pc{background:#DDEBF7;color:#1C5A77}
`;

const QUIZ_ID = "liano-quiz-francais-conjugaison-verbes-7e-2";
const DUE = { iso:"2026-11-12", long:"jeudi 12 novembre", short:"12.11" };
const THEME = "Conjugaison — verbes 7e (2)";
const VERSION = { n:1, date:"08.11.2026" };   /* v1 : 08.11.2026, première version (5 verbes, 4 temps) */

/* Tout ce que le noyau affiche ou écrit et qui dépend de l'outil. Jamais d'âge en dur : le noyau le déduit de la classe. */
const OUTIL = {
  eleve:"Liano", classe:"7e HarmoS", branche:"Français",
  titre:"Mes 5 verbes", sousTitre:"Français · conjugaison, évaluation verbes 7e (2)",
  jersey:"je tu il",
  badgeHtml:`<div class="ardoise" aria-hidden="true"><span>je</span><span>tu</span><span>il</span><span>nous</span><span>vous</span><span>ils</span></div>`,
  polices:"https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600&family=Atkinson+Hyperlegible:wght@400;700&display=swap",
  introFiche:"Un verbe par section, avec ses 4 temps. Ouvre un verbe, récite chaque case à voix haute en cachant les formes, puis teste-toi sur ce verbe. Le jour de l'évaluation, tu n'auras pas de tableau pour t'aider : c'est dans ta tête que ça doit être !",
  introPaquets:"Un paquet = un verbe, avec ses 4 temps (présent, imparfait, futur simple, passé composé). Coche ceux que tu veux travailler. À chaque test, la personne (je, tu, il…) est tirée au hasard.",
  labelTout:"Les 5 verbes",
  motPaquet:"Verbe", motPaquets:"verbes", cePaquet:"Ce verbe",
  comptes:[10,20,40,0], compteDefaut:20,
  accentsStricts:true,   /* noyau v9 : é ≠ e, ç ≠ c… aussi dans la correction en direct et « Voir mes erreurs » */
  conseilSetup:"Les accents et la cédille comptent, comme à l'évaluation : « il commençait » s'écrit avec ç. En épreuve blanche, tu ne vois aucune réponse avant la fin.",
  papier:{ titre:"Français — Conjugaison, verbes 7e (2)", court:"Conjugaison — verbes 7e (2)", fichier:"conjugaison-verbes-7e-2-liano", code:"#PDF-FR-CONJ7E2" },
  copie:{ titre:"RÉSULTAT — Français, conjugaison des verbes 7e (2)" },
  analyse:{
    role:"un enseignant de français suisse",
    sujet:"la conjugaison de 5 verbes (commencer, savoir, courir, dire, vouloir) au présent, à l'imparfait, au futur simple et au passé composé de l'indicatif",
    etiquettes:"pres = présent, imp = imparfait, fut = futur simple, pc = passé composé ; le verbe et la personne sont écrits dans la question",
    pistes:"les terminaisons selon la personne (je cours / il court, je veux / il veut), la cédille de commencer (nous commençons, je commençais / nous commencions), le double r du futur de courir (je courrai) face à l'imparfait (je courais), les radicaux du futur (je saurai, je voudrai, je dirai), « vous dites », les participes passés (su, couru, dit, voulu, commencé), la confusion entre imparfait et futur (-ais / -ai)",
  },
};

/* ---------- SOURCES ---------- */
const SOURCES = [
  { titre:"Photo — « Objectifs évaluation de conjugaison – verbes 7e (2) »", recue:"08.11.2026", contenu:"Conjuguer les verbes commencer, savoir, courir, dire et vouloir aux 4 temps suivants : indicatif présent, indicatif imparfait, indicatif futur simple, indicatif passé composé. « Il n'y aura pas de référence à disposition lors de cette évaluation. » Cases Acquis / À réviser pas encore remplies." },
  { titre:"Agenda de Liano", recue:"08.11.2026", contenu:"« FRA : verbe ② Eval » le jeudi 12 novembre 2026." },
  { titre:"Formes conjuguées", recue:"08.11.2026", contenu:"Tableaux de conjugaison de référence du français (aucune photo des tableaux du cahier de Liano). Le passé composé de ces 5 verbes se forme avec l'auxiliaire avoir." },
];
const SOURCES_NOTE = "La photo ne donne que les verbes et les temps : les formes viennent des tableaux de conjugaison de référence. Si les tableaux du cahier de Liano diffèrent (il/elle/on, ordre…), c'est son cahier qui fait foi : envoie une photo et l'outil sera aligné. Les pièges des choix (cédille oubliée, « vous disez »…) sont des erreurs à reconnaître, jamais des réponses.";
const PHOTOS = [
  { titre:"Objectifs évaluation de conjugaison – verbes 7e (2)", url:"/_blob/e8cad83c8bf32f3ea701ee850578d2aa" },
];

/* ---------- les verbes ---------- */
/* personnes je, tu, il, nous, vous, ils. Présent et imparfait écrits en entier ; futur = radical + terminaisons ;
   passé composé = avoir au présent + participe passé. */
const PERS = ["je","tu","il","nous","vous","ils"];
const T_FUT = ["ai","as","a","ons","ez","ont"];
const AVOIR_PRES = ["ai","as","a","avons","avez","ont"];
const VERBES = [
  { k:"commencer", emoji:"🚦", pp:"commencé", rFut:"commencer",
    pres:["commence","commences","commence","commençons","commencez","commencent"],
    imp:["commençais","commençais","commençait","commencions","commenciez","commençaient"],
    note:"Cédille sous le c devant a et o : nous commençons, je commençais. Pas de cédille devant e et i : je commence, nous commencions." },
  { k:"savoir", emoji:"🧠", pp:"su", rFut:"saur",
    pres:["sais","sais","sait","savons","savez","savent"],
    imp:["savais","savais","savait","savions","saviez","savaient"],
    note:"Futur : je saurai (le radical change : saur-). Passé composé : j'ai su, deux lettres seulement." },
  { k:"courir", emoji:"🏃", pp:"couru", rFut:"courr",
    pres:["cours","cours","court","courons","courez","courent"],
    imp:["courais","courais","courait","courions","couriez","couraient"],
    note:"Futur : deux r, je courrai. Imparfait : un seul r, je courais. Présent : je cours, tu cours (avec s), il court (avec t)." },
  { k:"dire", emoji:"💬", pp:"dit", rFut:"dir",
    pres:["dis","dis","dit","disons","dites","disent"],
    imp:["disais","disais","disait","disions","disiez","disaient"],
    note:"Vous dites (jamais « disez »). Passé composé : j'ai dit, avec un t." },
  { k:"vouloir", emoji:"🙋", pp:"voulu", rFut:"voudr",
    pres:["veux","veux","veut","voulons","voulez","veulent"],
    imp:["voulais","voulais","voulait","voulions","vouliez","voulaient"],
    note:"Je veux, tu veux (avec x) ; il veut (avec t) ; ils veulent. Futur : je voudrai (radical voudr-)." },
];

const TEMPS = [
  { t:"pres", nom:"présent",       lab:"présent" },
  { t:"imp",  nom:"imparfait",     lab:"imparfait" },
  { t:"fut",  nom:"futur simple",  lab:"futur simple" },
  { t:"pc",   nom:"passé composé", lab:"passé composé", comp:true },
];
const TEMPS_DE = Object.fromEntries(TEMPS.map(x => [x.t, x]));

/* les six formes nues (sans pronom) d'un verbe à un temps */
function formes(v, t){
  if (t === "pres" || t === "imp") return v[t];
  if (t === "fut") return T_FUT.map(e => v.rFut + e);
  return AVOIR_PRES.map(a => a + " " + v.pp);
}
const voyelle = s => /^[aeéèêiîouyh]/i.test(s);
/* pronom devant une forme : j' devant une voyelle */
const pronom = (p, forme) => p === 0 && voyelle(forme) ? "j'" : PERS[p] + " ";
const complete = (v, t, p) => { const f = formes(v, t)[p]; return pronom(p, f) + f; };
/* repère de la question : « nous… », « j'… » (l'élision se voit, elle ne donne pas la réponse) */
const repere = (v, t, p) => pronom(p, formes(v, t)[p]) + "…";

/* explication : le temps en entier, la règle du temps, la note du verbe */
const REGLE = {
  imp:"Imparfait : -ais, -ais, -ait, -ions, -iez, -aient.",
  fut:"Futur simple : -ai, -as, -a, -ons, -ez, -ont (je …rai, sans s).",
  pc:"Passé composé = avoir au présent (j'ai, tu as, il a…) + participe passé.",
  pres:"",
};
const SRC = "feuille d'objectifs « verbes 7e (2) »";
function explique(v, t){
  const T = TEMPS_DE[t], liste = PERS.map((_, p) => complete(v, t, p)).join(", ");
  return `${cap(T.lab)} de « ${v.k} » : ${liste}. ${(ASTUCE[v.k] || {})[t] || REGLE[t]}`.replace(/\s+/g, " ").trim() + ` — ${SRC}`;
}
/* astuce courte du verbe pour le temps demandé (sinon la règle du temps) */
const ASTUCE = {
  commencer:{ pres:"Nous commençons : cédille devant o.", imp:"Cédille devant a (je commençais), pas devant i (nous commencions).", fut:"On garde commencer en entier, puis -ai, -as, -a…" },
  savoir:{ fut:"Le radical change : je saurai.", pc:"Participe passé : su (j'ai su)." },
  courir:{ pres:"Je cours, tu cours (s) ; il court (t).", imp:"Un seul r : je courais.", fut:"Deux r : je courrai.", pc:"Participe passé : couru (un seul r)." },
  dire:{ pres:"Vous dites, jamais « disez ».", pc:"Participe passé : dit, avec un t." },
  vouloir:{ pres:"Je veux, tu veux (x) ; il veut (t).", fut:"Le radical change : je voudrai." },
};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

/* pièges des choix : erreurs fréquentes (jamais égales à une vraie réponse de la même question) */
function pieges(v, t, p, f){
  const out = [];
  if (v.k === "commencer") out.push(f.includes("ç") ? f.replace("ç", "c") : f.replace(/c(?=[^c]*$)/, "ç"));
  if (v.k === "courir"){ if (t === "fut") out.push(f.replace("courr", "courir")); if (t === "imp") out.push(f.replace("cour", "courr")); if (t === "pc") out.push(f.replace("couru", "courru")); }
  if (v.k === "dire"){ if (t === "pres" && p === 4) out.push("disez"); if (t === "pc") out.push(f.replace(/dit$/, "dis")); }
  if (v.k === "vouloir"){ if (t === "fut") out.push(f.replace("voudr", "vouler")); if (t === "pc") out.push(f.replace("voulu", "voulé")); }
  if (v.k === "savoir"){ if (t === "fut") out.push(f.replace("saur", "saver")); if (t === "pc") out.push(f.replace(/su$/, "savé")); }
  return out.filter(x => x && x !== f);
}

/* ---------- paquets : un verbe = un paquet, un temps = une carte ---------- */
const DECKS = VERBES.map(v => ({
  key:v.k, title:v.k, emoji:v.emoji, gen:"conj", unit:"temps", detail:"4 temps de l'indicatif",
  src:`${SRC} : ${v.k}`,
  items:TEMPS.map(T => ({ front:`${v.k} · ${T.lab}`, v:v.k, t:T.t, src:`${SRC} : ${v.k}, ${T.lab}` })),
}));
const VERBE = Object.fromEntries(VERBES.map(v => [v.k, v]));

/* ---------- types de questions ---------- */
const KINDS = {
  mcq_conj:{ type:"mcq", tag:"pres", aspect:"conj", consigne:"Choisis la bonne forme." },
  type_conj:{ type:"type", tag:"pres", aspect:"conj", consigne:"Écris la forme (avec ou sans le pronom). Les accents et la cédille comptent." },
};
const KIND_ORDER = ["mcq_conj","type_conj"];
const TAG_LABEL = { pres:"présent", imp:"imparfait", fut:"futur simple", pc:"passé composé" };

/* une question : personne tirée au hasard */
function tirage(v, t){
  const p = Math.floor(Math.random() * 6), f = formes(v, t)[p], full = complete(v, t, p);
  const accept = [full, f];
  if (p === 2) ["elle","on"].forEach(x => accept.push(full.replace(/^il /, x + " ")));
  if (p === 5) accept.push(full.replace(/^ils /, "elles "));
  const autresPers = formes(v, t).filter((x, i) => i !== p && x !== f);
  const autresTemps = TEMPS.filter(x => x.t !== t).map(x => formes(v, x.t)[p]);
  return { p, word:`${TEMPS_DE[t].lab} · ${repere(v, t, p)}`, bare:f, full, accept:[...new Set(accept)], pieges:pieges(v, t, p, f), autresPers, autresTemps };
}

/* correction : accents, cédille comptent ; majuscules, espaces, apostrophe ’ / ' et ponctuation non */
const cjNorm = s => String(s || "").toLowerCase().normalize("NFC").replace(/[’`]/g,"'").replace(/[.!?;,:«»"()]/g," ").replace(/\s*'\s*/g,"'").replace(/\s+/g," ").trim();
/* nombre de questions : quand on demande plus de questions qu'il n'y a de cartes, chaque carte revient avec une autre personne */
let DEJA = {};
const COUCHE_CONTENU = {
  /* copie de buildTest de la couche Langues v3, avec la répétition des cartes (comme l'outil de conjugaison de Livio du 17.11) */
  buildTest(deckKeys, difficulty, limit){
    DEJA = {};
    const sel = DECKS.filter(d => deckKeys.includes(d.key));
    const nItems = sel.reduce((n, d) => n + d.items.length, 0);
    const tours = limit && limit > nItems ? Math.min(6, Math.ceil(limit / nItems)) : 1;
    let parDeck = sel.map(d => { const g = GENS[d.gen];
      return shuffle(d.items.flatMap(it => { const out = []; for (let r = 0; r < tours; r++) g.kinds(d, it, difficulty).forEach(kind => out.push({ d, g, it, kind })); return out; })); });
    if (limit && limit > 0 && parDeck.reduce((n, l) => n + l.length, 0) > limit){
      const kept = sel.map(() => []); let i = 0, total = 0;
      while (total < limit && parDeck.some(l => l.length)){ const l = parDeck[i % parDeck.length]; if (l.length){ kept[i % parDeck.length].push(l.shift()); total++; } i++; }
      parDeck = kept;
    }
    const qs = []; let num = 0, ex = 0;
    parDeck.forEach((list, di) => {
      const d = sel[di], g = GENS[d.gen];
      const buckets = {}; KIND_ORDER.forEach(k => buckets[k] = []);
      list.forEach(x => buckets[x.kind].push(x.it));
      const pool = g.pool ? g.pool(d) : [];
      KIND_ORDER.forEach(kind => {
        const items = buckets[kind]; if (!items.length) return;
        ex++; const K = KINDS[kind];
        items.forEach(it => {
          num++;
          const q = { id:"q"+num, num, ex, exTitle:d.title, deckKey:d.key, kind, type:K.type, tag:K.tag, aspect:K.aspect, lang:"fr", consigne:K.consigne, keep:true, hint:"" };
          g.fill(q, kind, it, d, pool);
          if (!q.card) q.card = cardKey(d.key, itemFront(g, d, it), K.aspect);
          if (!q.prompt) q.prompt = `${q.consigne} « ${q.word} »`;
          qs.push(q);
        });
      });
    });
    return qs;
  },
  isRight(q, val){ if (q.type === "mcq") return val === q.answer; const a = cjNorm(val); return !!a && (q.accept || [q.answer]).some(x => cjNorm(x) === a); },
};

const unDe = l => l.length ? [l[Math.floor(Math.random() * l.length)]] : [];
function remplir(q, kind, it){
  /* une carte qui revient dans le même test prend une personne pas encore posée */
  const deja = DEJA[it.front] = DEJA[it.front] || new Set();
  const v = VERBE[it.v]; let x, essai = 0;
  do { x = tirage(v, it.t); } while (deja.has(x.p) && ++essai < 30);
  deja.add(x.p);
  q.tag = it.t; q.word = x.word; q.expl = explique(v, it.t);
  if (kind === "mcq_conj"){
    q.consigne = `« ${v.k} » : choisis la bonne forme.`;
    /* un piège, une autre personne, un autre temps ; complété par le reste */
    q.options = pickOptions(x.bare, [...unDe(x.pieges), ...unDe(x.autresPers), ...unDe(x.autresTemps)], [...x.autresPers, ...x.autresTemps, ...x.pieges], y => y);
    q.answer = x.bare;
  } else { q.consigne = `« ${v.k} » : écris la forme (accents et cédille compris).`; q.accept = x.accept; q.answer = x.full; q.keep = true; }
  q.prompt = `« ${v.k} » ${q.word}`;
}
const niveau = diff => [diff === "easy" ? "mcq_conj" : diff === "hard" ? "type_conj" : (Math.random() < 0.5 ? "mcq_conj" : "type_conj")];
const lignesTemps = (v, t) => PERS.map((_, p) => { const f = formes(v, t)[p]; return `<i>${esc(pronom(p, f))}</i>${esc(f)}`; });
const GENS = {
  conj:{
    cards:(d, it) => [{ aspect:"conj", mcqOnly:false, levels:[0,1,2], label:it.front }],
    kinds:(d, it, diff) => niveau(diff),
    fill:(q, kind, it) => remplir(q, kind, it),
    face:(d, it) => {
      const v = VERBE[it.v], T = TEMPS_DE[it.t];
      return { tagF:"Récite les 6 personnes", front:v.k, frontMini:T.lab, tagB:cap(T.lab), backHtml:`<span class="cj-face">${lignesTemps(v, it.t).join("<br>")}</span>` };
    },
  },
};

/* ---------- fiche ---------- */
function tableauVerbe(v){
  const cases = TEMPS.map(T => `<div class="cj-t${T.comp ? " cmp" : ""}"><h4>${esc(cap(T.nom))}</h4><p>${lignesTemps(v, T.t).join("<br>")}</p></div>`).join("");
  return `<div class="cj-grid">${cases}</div><p class="cj-note"><b>À retenir :</b> ${esc(v.note)}</p>`;
}
const FICHE = [
  { icon:"🗓️", titre:"Ce que tu dois savoir jeudi", tips:[
    "Conjuguer 5 verbes : commencer, savoir, courir, dire, vouloir.",
    "À 4 temps de l'indicatif : présent, imparfait, futur simple, passé composé.",
    "Il n'y aura pas de référence à disposition pendant l'évaluation : pas de tableau, tout doit être dans ta tête.",
    "Évaluation le jeudi 12 novembre.",
  ], astuce:"Ordre conseillé : un verbe à la fois en Échauffement, puis Entraînement sur deux ou trois verbes, puis Niveau épreuve en Correction en direct, et enfin l'Épreuve blanche sur les 5 verbes." },
  { icon:"🧩", titre:"Les terminaisons qui reviennent", tips:[
    "Imparfait : -ais, -ais, -ait, -ions, -iez, -aient (je courais, nous courions).",
    "Futur simple : -ai, -as, -a, -ons, -ez, -ont (je dirai, tu diras, il dira).",
    "Passé composé : avoir au présent + participe passé (j'ai commencé, j'ai su, j'ai couru, j'ai dit, j'ai voulu).",
    "Imparfait ou futur ? je courais (imparfait, -ais) · je courrai (futur, -ai, sans s).",
  ] },
  ...VERBES.map(v => ({ icon:v.emoji, deck:v.k, titre:v.k, html:() => tableauVerbe(v), count:TEMPS.length })),
];

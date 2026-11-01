/* ============================================================
   CONTENU — Anglais, Unit 2 « My world » : vocabulaire 2.1 à 2.5
   Outil de révision de Liano — 7e HarmoS. Test : vendredi 6 novembre 2026.
   Ce fichier est la seule partie propre à cet outil. Il est assemblé avec
   claude/couche-langues.js et claude/noyau-quiz.js par claude/assembler.py.
   Reconstruit le 01.11.2026 (v7) à partir de la v6, outil écrit avant le noyau : mêmes paquets, mêmes réponses
   acceptées, même correction (règles anglaises de la v6, voir « correction »), mêmes clés de cartes (paquet_mot).
   L'historique de la v6 (tests et test en cours, dans Claude et dans le navigateur) est lu tel quel, sans être réécrit :
   voir « ancien format » en fin de fichier (COUCHE_CONTENU.charger).
   ============================================================ */

/* Thème « compteur de nombres » : bleu électrique + jaune soleil, fond crème-bleuté / bleu nuit (palette de la v6).
   Palette, bandeau bleu de l'en-tête ; la CSS de base vient du noyau (base.css). */
const CSS_THEME = `
:root{
  --paper:#eef3fb; --sheet:#ffffff; --ink:#15223b; --soft:#5a6b86; --rule:#d6e0f0;
  --court:#1f5fe0; --court-wash:#e4ecfc; --jersey:#f6b21a; --score:#f6b21a; --board:#15223b;
  --good:#1f9d5f; --good-wash:#d4f0e1; --bad:#a3241b; --bad-wash:#f6dedb; --on-court:#ffffff;
  --p-okdark:#0f7a4f; --p-ok:#1f9d5f; --p-mid:#e08a1e; --p-low:#c23b2e; --p-lowsoft:#e8b7b1;
  --box:#1f5fe0; --crane:#f6b21a;
  --display:"Baloo 2","Trebuchet MS",system-ui,sans-serif;
  --body:"Nunito",system-ui,-apple-system,sans-serif;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --paper:#0f1830; --sheet:#182642; --ink:#eaf1ff; --soft:#9fb0cf; --rule:#2a3b5e;
  --court:#5a92ff; --court-wash:#1b2c52; --jersey:#ffc74d; --score:#ffc74d; --board:#06142e;
  --good:#36c483; --good-wash:#0c3b28; --bad:#ef6b5e; --bad-wash:#3a1e1b; --on-court:#06142e;
  --p-okdark:#2fd08a; --p-ok:#36c483; --p-mid:#f2a43a; --p-low:#ef6b5e; --p-lowsoft:#6b2b26;
  --box:#5a92ff; --crane:#ffc74d; color-scheme:dark}}
:root[data-theme="dark"]{
  --paper:#0f1830; --sheet:#182642; --ink:#eaf1ff; --soft:#9fb0cf; --rule:#2a3b5e;
  --court:#5a92ff; --court-wash:#1b2c52; --jersey:#ffc74d; --score:#ffc74d; --board:#06142e;
  --good:#36c483; --good-wash:#0c3b28; --bad:#ef6b5e; --bad-wash:#3a1e1b; --on-court:#06142e;
  --p-okdark:#2fd08a; --p-ok:#36c483; --p-mid:#f2a43a; --p-low:#ef6b5e; --p-lowsoft:#6b2b26;
  --box:#5a92ff; --crane:#ffc74d; color-scheme:dark}
/* bandeau bleu de l'en-tête, comme la v6 */
.head{background:linear-gradient(120deg,var(--court),#3f78ff);color:#fff;border-radius:16px;padding:12px 14px}
.head p{color:#fff;opacity:.92}
.head .jersey{background:var(--score);box-shadow:none;padding:8px 12px}
.head .jersey b{color:#4a3200;letter-spacing:0}
/* étiquettes des types de questions */
.chip.sens{background:#e4ecfc;color:#1a4fb8}
.chip.anglais{background:#fdf0cc;color:#6b4a00}
`;

const QUIZ_ID = "liano-quiz-anglais-unit2nombres";   /* repris de l'outil précédent (nombres 1 à 20) : l'historique de Liano reste sous ces clés */
const DUE = { iso:"2026-11-06", long:"vendredi 6 novembre", short:"06.11" };
const THEME = "Unit 2 « My world »";
const VERSION = { n:7, date:"01.11.2026" };
/* v7 : 01.11.2026, outil reconstruit sur le noyau commun : mêmes contenus et même suivi, scores synchronisés entre appareils sur le site
   v1 : 26.10.2026, première version — couche Langues (anglais), suivi à 3 anneaux et test en cours gardé.
   v2 : 26.10.2026, barre du bas resserrée au centre sur grand écran, comme les autres outils.
   v3 : 27.10.2026, pastille : chaque anneau lit son propre niveau ; une erreur en Niveau épreuve ne fait plus baisser l'Échauffement ni l'Entraînement.
   v4 : 27.10.2026, « OK ✓ » vert foncé sur l'anneau extérieur quand le Niveau épreuve est réussi deux jours différents (cartes acquises).
   v5 : 31.10.2026, ajout des groupes 2.3 (famille), 2.4 (mots et phrases) et 2.5 (phrases), pour le vendredi 6 novembre.
   v6 : 01.11.2026, un anneau = un niveau : seuls les tests faits à ce niveau remplissent l'anneau (un niveau jamais testé reste gris en pointillé). */

/* Tout ce que le noyau affiche ou écrit et qui dépend de l'outil. Jamais d'âge en dur : le noyau le déduit de la classe. */
const OUTIL = {
  eleve:"Liano", classe:"7e HarmoS", branche:"Anglais",
  titre:"Unit 2 · My world", sousTitre:"Anglais · vocabulaire 2.1 à 2.5",
  jersey:"🌍",
  polices:"https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@400;700;800&display=swap",
  introFiche:"Tout le vocabulaire de la Unit 2 : les nombres (2.1, 2.2), la famille (2.3), des mots et des phrases (2.4, 2.5). Coche dans « Paquets » ceux que tu veux réviser, et entraîne-toi dans les deux sens !",
  labelTout:"Toute la Unit 2",
  motPaquet:"Paquet",
  sousNiveaux:{ easy:"Tu choisis la bonne réponse parmi plusieurs (QCM).", normal:"Un mélange : parfois tu choisis, parfois tu écris le mot en français.", hard:"Comme au contrôle : tu écris le nombre en anglais. 💪" },
  papier:{ titre:"Anglais · Unit 2 My world — test du vendredi 6 novembre", court:"Anglais · Unit 2 My world", fichier:"Liano_Anglais_Unit-2-My-world", code:"#PDF-ANGLAIS-UNIT2" },
  copie:{ titre:"Anglais · Unit 2 My world (Liano)" },
  analyse:{
    role:"un tuteur d'anglais",
    sujet:"l'anglais, Unit 2 « My world » (les nombres 1 à 20, la famille, des mots et des phrases)",
    etiquettes:"sens = traduire l'anglais en français, anglais = écrire en anglais à partir du français",
    pistes:"les nombres en -teen (four / fourteen, six / sixteen…), l'orthographe (eight : g-h-t), les phrases du livre (I'm = I am), le sens de traduction (anglais → français ou français → anglais)",
  },
};

/* ===== Sources (visibles partout, y compris sur le site public) ===== */
const SOURCES = [
  { titre:"Photo 1 — page de vocabulaire Unit 2 (numéro de page pas visible)", recue:"26.10.2026",
    contenu:"Nombres surlignés 2.1 (1 à 10) et 2.2 (11 à 20), avec leur traduction française." },
  { titre:"Photo 2 — même page, Unit 2 « My world » (numéro de page pas visible)", recue:"31.10.2026",
    contenu:"2.3 (bleu-vert) : The family + animal, ball. 2.4 (rose) : bear, (best) friend, favourite, frog, number, tortoise et les phrases How old…?, I'm / He's / She's…, I'm from…. 2.5 (violet) : I'm in Year…, My favourite number is…, Thank you / Thanks, These are…, What year are you in?, What's your favourite…?, Where are you from?" }
];
const PHOTOS = [ { titre:"Photo 1 — page de vocabulaire Unit 2", url:"/_blob/048177ff31e7e64baa4bb4123f6e4384" },
  { titre:"Photo 2 — page de vocabulaire Unit 2 « My world » (31.10)", url:"/_blob/3de7e3cb6cecc4502b1f1d5ded74843b" } ];
const SOURCES_NOTE = "Les groupes 2.1 à 2.5 suivent le classement validé par le papa (couleurs du surligneur). « animal » et « ball » vont avec 2.3. La ligne « I'm / He's / She's (eleven). » du livre est coupée en trois cartes. Les mots entre parenthèses des phrases sont ceux du livre (Noah, eleven, Switzerland, 5, nine…).";

/* ===== Données : couche Langues (anglais) ===== */
/* item : { en, fr:[...], frShow }  — nombres : pas d'article, rien à « keep ». */
const DECKS = [
  { key:"n1a10", title:"Numbers 1 → 10", emoji:"🔟", src:"livre, Unit 2 « Numbers », groupe 2.1", items:[
    {en:"one",fr:["un"],frShow:"un"},
    {en:"two",fr:["deux"],frShow:"deux"},
    {en:"three",fr:["trois"],frShow:"trois"},
    {en:"four",fr:["quatre"],frShow:"quatre"},
    {en:"five",fr:["cinq"],frShow:"cinq"},
    {en:"six",fr:["six"],frShow:"six"},
    {en:"seven",fr:["sept"],frShow:"sept"},
    {en:"eight",fr:["huit"],frShow:"huit"},
    {en:"nine",fr:["neuf"],frShow:"neuf"},
    {en:"ten",fr:["dix"],frShow:"dix"}
  ]},
  { key:"n11a20", title:"Numbers 11 → 20", emoji:"🔢", src:"livre, Unit 2 « Numbers », groupe 2.2", items:[
    {en:"eleven",fr:["onze"],frShow:"onze"},
    {en:"twelve",fr:["douze"],frShow:"douze"},
    {en:"thirteen",fr:["treize"],frShow:"treize"},
    {en:"fourteen",fr:["quatorze"],frShow:"quatorze"},
    {en:"fifteen",fr:["quinze"],frShow:"quinze"},
    {en:"sixteen",fr:["seize"],frShow:"seize"},
    {en:"seventeen",fr:["dix-sept"],frShow:"dix-sept"},
    {en:"eighteen",fr:["dix-huit"],frShow:"dix-huit"},
    {en:"nineteen",fr:["dix-neuf"],frShow:"dix-neuf"},
    {en:"twenty",fr:["vingt"],frShow:"vingt"}
  ]},
  { key:"famille", title:"The family + animal, ball (2.3)", emoji:"👨‍👩‍👧", src:"livre, Unit 2 « The family » et « Words and phrases », groupe 2.3", items:[
    {en:"baby",enShow:"baby (pl babies)",fr:["bébé"],frShow:"bébé"},
    {en:"brother",fr:["frère"],frShow:"frère"},
    {en:"dad",fr:["papa"],frShow:"papa"},
    {en:"family",enShow:"family (pl families)",fr:["famille"],frShow:"famille"},
    {en:"grandad",fr:["grand-papa"],frShow:"grand-papa"},
    {en:"granny",fr:["grand-maman"],frShow:"grand-maman"},
    {en:"mum",fr:["maman"],frShow:"maman"},
    {en:"sister",fr:["sœur"],frShow:"sœur"},
    {en:"animal",fr:["animal"],frShow:"animal"},
    {en:"ball",fr:["balle"],frShow:"balle"}
  ]},
  { key:"mots", title:"Words and phrases (2.4)", emoji:"🐸", src:"livre, Unit 2 « Words and phrases », groupe 2.4 (rose)", items:[
    {en:"bear",fr:["ours"],frShow:"ours"},
    {en:"(best) friend",optParen:true,fr:["meilleur ami","ami"],frShow:"(meilleur) ami"},
    {en:"favourite",fr:["préféré"],frShow:"préféré"},
    {en:"frog",fr:["grenouille"],frShow:"grenouille"},
    {en:"number",fr:["chiffre","nombre","chiffre, nombre"],frShow:"chiffre, nombre"},
    {en:"tortoise",fr:["tortue"],frShow:"tortue"},
    {en:"How old are you?",keep:true,fr:["Quel âge as-tu ?","Quel âge avez-vous ?"],frShow:"Quel âge as-tu / avez-vous ?"},
    {en:"How old is (Noah)?",keep:true,fr:["Quel âge a (Noah) ?"],frShow:"Quel âge a (Noah) ?"},
    {en:"I'm (eleven).",keep:true,enAccept:["I am (eleven)."],fr:["J'ai (onze) ans."],frShow:"J'ai (onze) ans."},
    {en:"He's (eleven).",keep:true,enAccept:["He is (eleven)."],fr:["Il a (onze) ans."],frShow:"Il a (onze) ans."},
    {en:"She's (eleven).",keep:true,enAccept:["She is (eleven)."],fr:["Elle a (onze) ans."],frShow:"Elle a (onze) ans."},
    {en:"I'm from (Switzerland).",keep:true,enAccept:["I am from (Switzerland)."],fr:["Je viens de (Suisse)."],frShow:"Je viens de (Suisse)."}
  ]},
  { key:"phrases", title:"Phrases (2.5)", emoji:"💬", src:"livre, Unit 2 « Words and phrases », groupe 2.5 (violet)", items:[
    {en:"I'm in Year (5).",keep:true,enAccept:["I am in Year (5).","I'm in Year five.","I am in Year five."],fr:["Je suis en (5)ème.","Je suis en 5e.","Je suis en cinquième."],frShow:"Je suis en (5)ème."},
    {en:"My favourite number is (nine).",keep:true,fr:["Mon chiffre préféré est le (neuf).","Mon nombre préféré est le (neuf)."],frShow:"Mon chiffre préféré est le (neuf)."},
    {en:"Thank you.",enShow:"Thank you. / Thanks.",keep:true,enAccept:["Thanks."],fr:["Merci."],frShow:"Merci."},
    {en:"These are (my brother and sister).",keep:true,fr:["Ce sont (mes frère et sœur)."],frShow:"Ce sont (mes frère et sœur)."},
    {en:"What year are you in?",keep:true,fr:["En quelle année es-tu ?","En quelle année êtes-vous ?"],frShow:"En quelle année es-tu / êtes-vous ?"},
    {en:"What's your favourite (number)?",keep:true,enAccept:["What is your favourite (number)?"],fr:["Quel est ton chiffre préféré ?","Quel est ton nombre préféré ?"],frShow:"Quel est ton (chiffre/nombre) préféré ?"},
    {en:"Where are you from?",keep:true,fr:["D'où viens-tu ?","D'où venez-vous ?"],frShow:"D'où viens-tu / venez-vous ?"}
  ]}
];
/* écran Paquets : « 10 mots · livre, Unit 2 … », comme la v6 ; clé de carte de la v6 : paquet_mot anglais */
DECKS.forEach(d => { d.gen = "vocab"; d.unit = "mots"; d.detail = d.src; });
const anCardKey = (d, it) => d.key + "_" + it.en;

/* ---------- fiche ---------- */
const FICHE = [
  { icon:"🔎", titre:"Les pièges à repérer", html:`
    <p class="tip"><b>four</b> (4) et <b>fourteen</b> (14) : « -teen » = « +10 ». Pareil pour <b>six / sixteen</b>, <b>seven / seventeen</b>…</p>
    <p class="tip"><b>nine</b> (9) garde son « e », mais <b>nineteen</b> (19) aussi. Attention à <b>eight</b> (8) : g-h-t !</p>
    <p class="tip">À partir de 13, beaucoup finissent par <b>-teen</b> : thir<b>teen</b>, four<b>teen</b>, fif<b>teen</b>…</p>
    <p class="tip">Dans les phrases, les mots entre parenthèses sont les exemples du livre : <b>How old is (Noah)?</b>, <b>I'm (eleven).</b> Écris-les comme dans le livre. <b>I'm</b> = <b>I am</b> : les deux sont acceptés.</p>
    <p class="fine">— Conseil de méthode (pas une page du livre), à partir de la liste Unit 2</p>` },
  { icon:"📋", titre:"La liste complète", html:() => DECKS.map(d => `<p><b>${esc(d.title)}</b><br>${d.items.map(it => `${esc(it.enShow || it.en)} = ${esc(it.frShow)}`).join(" · ")}<br><span class="fine">— ${esc(d.src)}</span></p>`).join("") },
];

/* ---------- types de questions ---------- */
/* Comme la v6 : Échauffement = anglais montré, choisir le français (QCM) ; Entraînement = mélange, choisir ou écrire le français ;
   Niveau épreuve = français montré, écrire l'anglais. Une seule carte par élément (clé de la v6), quel que soit le sens. */
const KINDS = {
  mcq_fr:{ type:"mcq", tag:"sens", aspect:"en", consigne:"Traduis en français :" },
  type_fr:{ type:"type", tag:"sens", aspect:"en", consigne:"Traduis en français :" },
  type_en:{ type:"type", tag:"anglais", aspect:"en", consigne:"Écris en anglais :" },
};
const KIND_ORDER = ["mcq_fr","type_fr","type_en"];
const TAG_LABEL = { sens:"traduire en français", anglais:"écrire en anglais" };

/* ---------- correction (celle de la v6, à l'identique) ---------- */
function anNorm(s){ return (s||"").toString().toLowerCase().replace(/œ/g,"oe").replace(/æ/g,"ae").replace(/[-‐–]/g," ").replace(/[’'`]/g,"").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9\- ]/g,"").replace(/\s+/g," ").trim(); }
function anStripEn(s){ return s.replace(/^(to |the |a |an )/,"").trim(); }
function anStripFrArt(s){ return s.replace(/^(le |la |les |l'|l |un |une |des )/,"").trim(); }
function anDropParen(s){ return s.replace(/\s*\([^)]*\)/g,"").trim(); }
/* réponses anglaises acceptées : en, enAccept, enShow quand il donne deux formes (« Thank you. / Thanks. ») ; parenthèses facultatives si optParen */
function anEnList(it){ const base = [it.en, ...(it.enAccept||[]), ...(it.enShow && it.enShow.includes(" / ") ? [it.enShow] : [])]; return [...new Set(it.optParen ? base.flatMap(x => [x, anDropParen(x)]) : base)]; }
function anFrList(it){ return [...new Set([...it.fr, it.frShow])]; }
/* anglais : to / the / a / an facultatifs en tête, sauf keep ; français : article le / la / les / un / une / des facultatif */
function anCheckEN(input, accept, keep){
  const want = accept.map(anNorm), got = anNorm(input);
  return want.includes(got) || (!keep && want.map(anStripEn).includes(anStripEn(got)));
}
function anCheckFR(input, accept){
  const want = accept.map(anNorm), got = anNorm(input);
  return want.includes(got) || want.map(anStripFrArt).includes(anStripFrArt(got));
}
const anShownEn = it => it.enShow && it.enShow.includes(" / ") ? it.enShow : it.en;

/* une question, comme la couche la construit ; options imposées pour relire un test de la v6 */
function anFill(q, kind, it, d){
  const label = it.enShow || it.en;
  q.card = anCardKey(d, it);
  q.expl = `${label} = ${it.frShow} — ${d.src}`;
  if (kind === "type_en"){ q.word = it.frShow; q.accept = anEnList(it); q.answer = anShownEn(it); q.lang = "en"; q.keep = !!it.keep; return; }
  q.word = label; q.lang = "fr"; q.keep = false; q.accept = anFrList(it); q.answer = it.frShow;
  if (kind === "mcq_fr"){
    const same = d.items.filter(x => x !== it), other = DECKS.filter(x => x !== d).flatMap(x => x.items);
    q.options = pickOptions(it.frShow, same, other, x => x.frShow);
  }
}

const GENS = {
  vocab:{
    cards:() => [{ aspect:"en", mcqOnly:false, levels:[0,1,2] }],
    kinds:(d, it, diff) => [diff === "easy" ? "mcq_fr" : diff === "hard" ? "type_en" : (Math.random() < 0.5 ? "type_fr" : "mcq_fr")],
    fill:(q, kind, it, d) => anFill(q, kind, it, d),
    face:(d, it) => ({ tagF:d.title, front:it.en, hintF:"Touche pour voir la réponse", tagB:"Réponse", backHtml:`<span class="face-word">${esc(it.frShow)}</span><span class="face-mini">🇬🇧 ${esc(it.en)}</span><span class="face-mini">— ${esc(d.src)}</span>` }),
  },
};

/* ---------- ancien format (v1 à v6) ----------
   La v6 enregistrait ses tests autrement que le noyau : { id, ts, level, mode, decks, score, total, note, rattrapage, parent,
   answers:[{ num, cardKey, dir, kind, given, correct, c, typo, liveFixed, liveSnap, idk, question:{ it, dir, kind, num, deck, cardKey, options } }], bilan }
   et son test en cours sous la même clé ({ questions, answers, cur, showingCorr, level, mode, decks, saved… }).
   On ne réécrit rien : à la lecture, chaque ancien test est traduit en mémoire au format du noyau (mêmes clés de cartes,
   mêmes notes, mêmes rattachements). Un ancien test analysé de nouveau (bilan) est réenregistré dans son format d'origine. */
const AN_LVL = { echauff:"easy", entrain:"normal", epreuve:"hard" };
const AN_MODE = { entrain:"train", live:"live", blanche:"exam" };
const AN_DIFF_LABEL = { easy:"Échauffement", normal:"Entraînement", hard:"Niveau épreuve" };
const AN_MODE_LABEL = { train:"Je m'entraîne", live:"Correction en direct", exam:"Épreuve blanche" };
const anKindOf = oq => oq.dir === "en" ? "type_en" : oq.kind === "mcq" ? "mcq_fr" : "type_fr";
function anDeckLabel(keys){ const ks = (keys || []).filter(k => DECKS.some(d => d.key === k)); return ks.length === DECKS.length ? OUTIL.labelTout : ks.map(k => DECKS.find(d => d.key === k).title).join(" + "); }
/* question de la v6 → question du noyau (même numéro, mêmes propositions, même carte) */
function anQuestion(oq){
  const d = DECKS.find(x => x.key === oq.deck) || DECKS[0];
  const it = d.items.find(x => anCardKey(d, x) === oq.cardKey) || oq.it;
  const kind = anKindOf(oq), K = KINDS[kind], ex = DECKS.indexOf(d) + 1;
  const q = { id:"q" + oq.num, num:oq.num, ex, exTitle:d.title, deckKey:d.key, kind, type:K.type, tag:K.tag, aspect:K.aspect, lang:"fr", consigne:K.consigne, keep:true, hint:"" };
  anFill(q, kind, it, d);
  if (kind === "mcq_fr") q.options = (oq.options || q.options).slice();
  q.card = oq.cardKey || q.card;
  q.prompt = `${q.consigne} « ${q.word} »`;
  return q;
}
const anIsOld = a => !!(a && Array.isArray(a.answers) && !Array.isArray(a.questions) && a.answers.every(x => x && x.question && x.question.dir));
function anAttempt(raw){
  if (!anIsOld(raw)) return raw;
  const questions = raw.answers.map(a => { const Q = anQuestion(a.question);
    const e = { num:a.num, ex:Q.ex, ref:Q.exTitle, prompt:Q.prompt, user:a.given || "", answer:a.correct, correct:!!a.c, expl:Q.expl, tag:Q.tag, question:Q, liveFixed:!!a.liveFixed, liveSnap:a.liveFixed ? (a.liveSnap || "") : "" };
    if (a.typo) e.typo = true; return e; });
  const diff = AN_LVL[raw.level] || "normal", mode = AN_MODE[raw.mode] || "train";
  const att = { id:raw.id, quiz:QUIZ_ID, date:raw.ts, branche:OUTIL.branche, theme:THEME, deck:anDeckLabel(raw.decks),
    difficulty:AN_DIFF_LABEL[diff], mode:AN_MODE_LABEL[mode], rattrapage:!!raw.rattrapage, parent:raw.rattrapage ? (raw.parent || null) : null,
    score:raw.score, total:raw.total, note:raw.note, questions };
  if (raw.bilan) att.analysis = { points_forts:raw.bilan.points_forts || [], a_travailler:raw.bilan.a_travailler || [], conseil:raw.bilan.conseil || "" };
  Object.defineProperty(att, "__brut", { value:raw, enumerable:false });
  return att;
}
/* ancien test traduit → enregistrement d'origine (avec le bilan s'il vient d'être calculé) */
function anBrut(att){ if (!att || !att.__brut) return att; const r = Object.assign({}, att.__brut); if (att.analysis) r.bilan = att.analysis; return r; }
function anDraft(d){
  if (!d || d.vide || d.v || !Array.isArray(d.questions) || !Array.isArray(d.answers) || d.cur == null || !d.questions.every(q => q && q.dir)) return d;
  const qs = d.questions.map(anQuestion), cur = d.cur, ans = d.answers;
  const pend = ans.length > cur ? ans[cur] : null;   /* réponse déjà donnée à la question en cours : sa correction était affichée */
  const compact = a => { const o = { u:a.given || "", c:!!a.c }; if (a.typo) o.t = 1; if (a.liveFixed){ o.lf = 1; o.ls = a.liveSnap || ""; } return o; };
  const q = qs[cur], diff = AN_LVL[d.level] || "normal", mode = AN_MODE[d.mode] || "train";
  const out = { v:2, questions:qs, i:cur, answers:ans.slice(0, cur).map(compact),
    picked:null, typed:"", checked:false, ok:false, liveFixed:false, errSnap:"",
    label:anDeckLabel(d.decks), start:d.ts || d.saved, saved:d.saved || 0, rattrapage:!!d.rattrapage, rattrLabel:d.rattrapage ? anDeckLabel(d.decks) : "", rattrParent:d.rattrapage ? (d.parent || null) : null,
    selected:(d.decks || []).filter(k => DECKS.some(x => x.key === k)), difficulty:diff, mode, order:"" };
  if (pend && q){
    out.checked = true; out.ok = !!pend.c;
    if (q.type === "mcq") out.picked = pend.given ? pend.given : null; else out.typed = pend.given || "";
    if (pend.liveFixed){ out.liveFixed = true; out.errSnap = pend.liveSnap || ""; }
  }
  return out;
}

/* ---------- accroches données à la couche (couche-langues.js v3, COUCHE_CONTENU) ---------- */
const COUCHE_CONTENU = {
  /* une carte par élément, clé de la v6 (paquet_mot) */
  allCards(){ return DECKS.flatMap(d => d.items.map(it => ({ dk:d.key, word:it.enShow || it.en, aspect:"en", mcqOnly:false, levels:[0,1,2], k:anCardKey(d, it) }))); },
  /* correction de la v6 : choix = la proposition elle-même ; écrit = anCheckEN / anCheckFR */
  isRight(q, val){ if (q.type === "mcq") return val === q.answer; return q.lang === "en" ? anCheckEN(val, q.accept, q.keep) : anCheckFR(val, q.accept); },
  /* correction en direct : mêmes réponses que la correction, article facultatif (anglais sauf keep, français toujours) */
  liveCands(q){
    const out = new Set();
    /* chaque réponse telle qu'écrite (sœur) et normalisée comme la correction (soeur) */
    (q.accept || [q.answer]).forEach(a => [a.toLowerCase(), anNorm(a)].forEach(n => {
      out.add(n);
      if (q.lang === "en" && !q.keep){ const s = anStripEn(n); out.add(s); ["to ","the ","a ","an "].forEach(p => out.add(p + s)); }
      if (q.lang === "fr"){ const s = anStripFrArt(n); out.add(s); ["le ","la ","les ","l ","un ","une ","des "].forEach(p => out.add(p + s)); }
    }));
    return [...out].map(v => [...v].map(lvUnit).join("")).filter(Boolean);
  },
  /* lecture de l'historique de la v6 sans le réécrire (appelé par le noyau juste après l'ouverture du stockage) */
  charger(){
    const list0 = store.list.bind(store), save0 = store.save.bind(store), saveLocal0 = store.saveLocal.bind(store);
    store.list = async () => (await list0()).map(anAttempt);
    store.saveLocal = att => saveLocal0(anBrut(att));
    store.save = async att => {
      if (!att || !att.__brut) return save0(att);
      if (store.mode === "local"){ store.saveLocal(att); SYNC.sauver(att); return; }
      return save0(anBrut(att));
    };
    SYNC.sauver = att => SYNC.ajouter({ op:"put", id:att.id, type:"test", date:att.date || att.ts, data:anBrut(att), maj:Date.now() });
    const pick0 = draftPick;
    draftPick = (a, b) => pick0(anDraft(a), anDraft(b));
    /* « Les cartes qui résistent » : comme la v6, les plus ratées d'abord, à égalité dans l'ordre où elles sont tombées
       (le noyau départage par la part ratée : la 5e carte pouvait changer) */
    resistant = () => {
      const m = {};
      rootTests().forEach(a => a.questions.forEach(x => { if (!x.question) return; const k = qCardKey(x);
        m[k] = m[k] || { k, word:x.question.label || x.question.word, hint:"", ch:x.question.deckKey, tag:x.question.tag, n:0, miss:0 }; m[k].n++; if (!x.correct) m[k].miss++; }));
      return Object.values(m).filter(x => x.miss).sort((a, b) => b.miss - a.miss).slice(0, 5);
    };
  },
};

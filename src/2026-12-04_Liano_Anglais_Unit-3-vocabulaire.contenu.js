/* ============================================================
   CONTENU — Anglais, Unit 3 : tout le vocabulaire (3.1 à 3.4, plus Art en 3.5)
   Outil de révision de Liano — 7e HarmoS. Échéance : vendredi 4 décembre 2026 (agenda : « Liano - Devoir : ANG voc 3.1 ») ;
   le papa demande toute la Unit 3, une carte par groupe 3.1, 3.2, 3.3, 3.4, et Art à la fin en 3.5.
   Ce fichier est la seule partie propre à cet outil. Il est assemblé avec
   claude/couche-langues.js et claude/noyau-quiz.js par claude/assembler.py.
   Modèle : claude/2026-11-20_Liano_Anglais_Unit-1-et-2-vocabulaire.contenu.js (mêmes règles de correction de l'anglais).
   ============================================================ */

/* Thème « surligneurs » : la page du livre, avec les couleurs de surligneur de Liano (orange, jaune, vert, rose) et le rond vert « Unit 3 ». */
const CSS_THEME = `
:root{
  --paper:#f3f7f1; --sheet:#ffffff; --ink:#1d2b22; --soft:#5a6b5f; --rule:#d6e2d8;
  --court:#2f7d3a; --court-wash:#e2f1e2; --jersey:#ff9f1c; --score:#e9f542; --board:#1d2b22;
  --good:#1f7a45; --good-wash:#d4f0e1; --bad:#a3241b; --bad-wash:#f6dedb; --on-court:#ffffff;
  --p-okdark:#0f6b45; --p-ok:#1f8a57; --p-mid:#d9821c; --p-low:#c23b2e; --p-lowsoft:#e8b7b1;
  --box:#2f7d3a; --crane:#e0457b;
  --hl-o:#ffb347; --hl-y:#eef55a; --hl-g:#8fe07a; --hl-p:#f7a8c0;
  --display:"Baloo 2","Trebuchet MS",system-ui,sans-serif;
  --body:"Atkinson Hyperlegible",system-ui,-apple-system,sans-serif;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --paper:#101812; --sheet:#18231b; --ink:#eaf3ec; --soft:#a3b5a8; --rule:#2b3b2f;
  --court:#7ed38a; --court-wash:#1d3322; --jersey:#ffb347; --score:#e9f542; --board:#0b120d;
  --good:#3fc98a; --good-wash:#0c3b28; --bad:#ef6b5e; --bad-wash:#3a1e1b; --on-court:#0b120d;
  --p-okdark:#2fd08a; --p-ok:#3fc98a; --p-mid:#f2a43a; --p-low:#ef6b5e; --p-lowsoft:#6b2b26;
  --box:#7ed38a; --crane:#ff7aa6;
  --hl-o:#7a4a10; --hl-y:#5a5e12; --hl-g:#2c5e22; --hl-p:#6a2a40; color-scheme:dark}}
:root[data-theme="dark"]{
  --paper:#101812; --sheet:#18231b; --ink:#eaf3ec; --soft:#a3b5a8; --rule:#2b3b2f;
  --court:#7ed38a; --court-wash:#1d3322; --jersey:#ffb347; --score:#e9f542; --board:#0b120d;
  --good:#3fc98a; --good-wash:#0c3b28; --bad:#ef6b5e; --bad-wash:#3a1e1b; --on-court:#0b120d;
  --p-okdark:#2fd08a; --p-ok:#3fc98a; --p-mid:#f2a43a; --p-low:#ef6b5e; --p-lowsoft:#6b2b26;
  --box:#7ed38a; --crane:#ff7aa6;
  --hl-o:#7a4a10; --hl-y:#5a5e12; --hl-g:#2c5e22; --hl-p:#6a2a40; color-scheme:dark}
/* en-tête : le rond vert « Unit 3 » du livre, titre souligné au surligneur orange */
.head .jersey{width:66px;height:66px;border-radius:50%;padding:0;background:#2f7d3a;box-shadow:0 0 0 4px var(--paper),0 0 0 7px #2f7d3a;flex-direction:column;gap:0}
.head .jersey small{display:block;color:#fff;font-family:var(--display);font-size:12px;font-weight:700;line-height:1;margin-top:4px}
.head .jersey b{color:#fff;font-size:30px;letter-spacing:0;line-height:.95}
.head h1{display:inline;background:linear-gradient(transparent 55%,var(--hl-o) 55%,var(--hl-o) 92%,transparent 92%);padding:0 4px;margin-left:-4px}
.face{border-top-color:var(--jersey)}
.entry.open{border-left-color:var(--jersey)}
/* étiquettes des types de questions */
.chip.sens{background:#e2f1e2;color:#22612c}
.chip.anglais{background:#fde7cc;color:#8a4a00}
:root[data-theme="dark"] .chip.sens{background:#1d3322;color:#bfe8c5}
:root[data-theme="dark"] .chip.anglais{background:#3d2a12;color:#ffd39a}
/* listes de la fiche : le mot anglais surligné de la couleur de son groupe, comme dans le livre */
.wl{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:0 12px;margin:4px 0}
.wl span{padding:6px 0;border-top:1px solid var(--rule);font-size:15px}
.wl span.en b{font-weight:700;padding:0 3px;border-radius:2px;background:var(--hl,transparent);color:var(--ink)}
.wl.u31{--hl:var(--hl-o)} .wl.u32{--hl:var(--hl-y)} .wl.u33{--hl:var(--hl-g)} .wl.u34{--hl:var(--hl-p)} .wl.u35{--hl:transparent}
`;

const QUIZ_ID = "liano-quiz-anglais-unit3";
const DUE = { iso:"2026-12-04", long:"vendredi 4 décembre", short:"04.12" };
const THEME = "Unit 3 (vocabulaire 3.1 à 3.5)";
const VERSION = { n:1, date:"27.11.2026" };   /* v1 : 27.11.2026, première version — couche Langues (anglais), noyau v16 :
   tout le vocabulaire de la Unit 3, cinq paquets rangés comme les groupes surlignés du livre (3.1 à 3.4) et Art (3.5). */

const OUTIL = {
  eleve:"Liano", classe:"7e HarmoS", branche:"Anglais",
  titre:"Unit 3", sousTitre:"Anglais · tout le vocabulaire",
  badgeHtml:`<div class="jersey" aria-hidden="true"><small>Unit</small><b>3</b></div>`,
  jersey:"3",
  polices:"https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Atkinson+Hyperlegible:wght@400;700&display=swap",
  introFiche:"Tout le vocabulaire de la Unit 3, rangé comme dans ton livre : 3.1, 3.2, 3.3, 3.4, puis Art (3.5). Pour vendredi, commence par le 3.1 (les sentiments).",
  labelTout:"Unit 3",
  motPaquet:"Paquet",
  comptes:[20, 40, 0], compteDefaut:20,
  compteLabel:"Combien de questions",
  sousNiveaux:{ easy:"Tu choisis la bonne réponse (QCM), dans les deux sens.", normal:"Un mélange : tu choisis l'anglais, ou tu écris le français.", hard:"Comme à l'évaluation : tu vois le français, tu écris l'anglais. 💪" },
  conseilSetup:"Avec « 20 », les questions sont prises dans tous les paquets cochés, à tour de rôle : refais le test plusieurs fois, ce ne seront pas les mêmes. « Toutes » pose les 45 mots et phrases. Pour vendredi, coche seulement le 3.1.",
  papier:{ titre:"Anglais · Unit 3, tout le vocabulaire — pour le vendredi 4 décembre", court:"Anglais · Unit 3", fichier:"Liano_Anglais_Unit-3-vocabulaire", code:"#PDF-ANGLAIS-UNIT3" },
  copie:{ titre:"Anglais · Unit 3, vocabulaire (Liano)" },
  analyse:{
    role:"un tuteur d'anglais",
    sujet:"l'anglais, Unit 3 (les sentiments, les jours de la semaine, les personnes, des mots de l'école et de la semaine, des petites phrases, l'art)",
    etiquettes:"sens = traduire l'anglais en français, anglais = écrire ou choisir l'anglais à partir du français",
    pistes:"l'orthographe des jours (Wednesday, Thursday / Tuesday, la majuscule), child / children, man / woman, les mots avec (be) (bored, hungry, thirsty), scared / I'm scared of, nice / Nice to meet you, week / weekend, paint / painter / painting, les phrases du livre",
  },
};

/* ===== Sources (visibles partout, y compris sur le site public) ===== */
const SOURCES = [
  { titre:"Photo 1 — livre, page de vocabulaire Unit 3", recue:"27.11.2026",
    contenu:"Groupes notés à la main et surlignés : 3.1 (orange) Feelings ; 3.2 (jaune) Days of the week + boy, child, children ; 3.3 (vert) girl, man, woman + day, homework, nice, school, test, today, tomorrow ; 3.4 (rose) very, week, weekend et les phrases Are you OK? … Why? ; Art (pas surligné, ajouté en 3.5 à la demande du papa) draw, paint, painter, painting." }
];
const PHOTOS = [ { titre:"Photo 1 — livre, vocabulaire Unit 3", url:"/_blob/465a185b50bb73912673c968ffb54b3f" } ];
const SOURCES_NOTE = "Les paquets suivent les groupes notés et surlignés dans le livre : la couleur décide du groupe. Boy, child et children sont surlignés en jaune comme les jours : ils vont avec 3.2 ; girl, man et woman, en vert, avec 3.3 ; very, week et weekend, en rose, avec 3.4. La partie Art n'a ni numéro ni surligneur : elle forme le paquet 3.5, à la demande du papa. Le numéro de la page n'est pas visible sur la photo. Les mots entre parenthèses sont ceux du livre (be, dogs, your friend) ; « (be) » rappelle qu'en anglais ces mots vont avec be.";

/* ===== Données : couche Langues (anglais) =====
   item : { en, enShow?, enAccept[], keep?, phrase?, excl[], fr[], frShow } */
const SRC = "livre, vocabulaire Unit 3";
const DECKS = [
  { key:"u31", title:"3.1 · Feelings", emoji:"😊", unit:"mots", src:SRC + ", « Feelings », groupe 3.1 (orange)", items:[
    {en:"angry",fr:["fâché"],frShow:"fâché"},
    {en:"bored",enShow:"bored (be)",enAccept:["be bored"],fr:["s'ennuyer"],frShow:"s'ennuyer"},
    {en:"cold",excl:["hot"],fr:["froid"],frShow:"froid"},
    {en:"happy",fr:["heureux"],frShow:"heureux"},
    {en:"hot",excl:["cold"],fr:["chaud"],frShow:"chaud"},
    {en:"hungry",enShow:"hungry (be)",enAccept:["be hungry"],fr:["(avoir) faim","avoir faim","faim"],frShow:"(avoir) faim"},
    {en:"sad",fr:["triste"],frShow:"triste"},
    {en:"scared",fr:["effrayé"],frShow:"effrayé"},
    {en:"thirsty",enShow:"thirsty (be)",enAccept:["be thirsty"],fr:["assoiffé (avoir soif)","assoiffé","avoir soif"],frShow:"assoiffé (avoir soif)"},
    {en:"tired",fr:["fatigué"],frShow:"fatigué"}
  ]},
  { key:"u32", title:"3.2 · Days of the week + boy, child, children", emoji:"📅", unit:"mots", src:SRC + ", « Days of the week » et « People », groupe 3.2 (jaune)", items:[
    {en:"Monday",fr:["lundi"],frShow:"lundi"},
    {en:"Tuesday",fr:["mardi"],frShow:"mardi"},
    {en:"Wednesday",fr:["mercredi"],frShow:"mercredi"},
    {en:"Thursday",fr:["jeudi"],frShow:"jeudi"},
    {en:"Friday",fr:["vendredi"],frShow:"vendredi"},
    {en:"Saturday",fr:["samedi"],frShow:"samedi"},
    {en:"Sunday",fr:["dimanche"],frShow:"dimanche"},
    {en:"boy",fr:["garçon"],frShow:"garçon"},
    {en:"child",excl:["children"],fr:["enfant"],frShow:"enfant"},
    {en:"children",excl:["child"],fr:["enfants"],frShow:"enfants"}
  ]},
  { key:"u33", title:"3.3 · People and school words", emoji:"🏫", unit:"mots", src:SRC + ", « People » et « Words and phrases », groupe 3.3 (vert)", items:[
    {en:"girl",fr:["fille"],frShow:"fille"},
    {en:"man",fr:["homme"],frShow:"homme"},
    {en:"woman",fr:["femme"],frShow:"femme"},
    {en:"day",fr:["jour"],frShow:"jour"},
    {en:"homework",fr:["devoirs (scolaires)","devoirs","devoirs scolaires"],frShow:"devoirs (scolaires)"},
    {en:"nice",fr:["gentil"],frShow:"gentil"},
    {en:"school",fr:["école"],frShow:"école"},
    {en:"test",fr:["test"],frShow:"test"},
    {en:"today",excl:["tomorrow"],fr:["aujourd'hui"],frShow:"aujourd'hui"},
    {en:"tomorrow",excl:["today"],fr:["demain"],frShow:"demain"}
  ]},
  { key:"u34", title:"3.4 · Very, week, weekend + phrases", emoji:"💬", unit:"mots et phrases", src:SRC + ", « Words and phrases », groupe 3.4 (rose)", items:[
    {en:"very",fr:["très"],frShow:"très"},
    {en:"week",excl:["weekend"],fr:["semaine"],frShow:"semaine"},
    {en:"weekend",excl:["week"],enAccept:["week-end"],fr:["week-end","weekend"],frShow:"week-end"},
    {en:"Are you OK?",keep:true,phrase:true,fr:["Est-ce que ça va ?"],frShow:"Est-ce que ça va ?"},
    {en:"at home",keep:true,fr:["à la maison"],frShow:"à la maison"},
    {en:"Don't be late!",keep:true,phrase:true,enAccept:["Do not be late!"],fr:["Ne sois pas en retard !","Ne soyez pas en retard !","Ne sois/soyez pas en retard !"],frShow:"Ne sois / soyez pas en retard !"},
    {en:"I'm scared of (dogs).",keep:true,phrase:true,enAccept:["I am scared of (dogs)."],fr:["J'ai peur des (chiens)."],frShow:"J'ai peur des (chiens)."},
    {en:"Nice to meet you.",keep:true,phrase:true,fr:["Enchanté. (bonjour)","Enchanté."],frShow:"Enchanté. (bonjour)"},
    {en:"That's right.",keep:true,phrase:true,enAccept:["That is right."],fr:["C'est ça."],frShow:"C'est ça."},
    {en:"Who's (your friend)?",keep:true,phrase:true,enAccept:["Who is (your friend)?"],fr:["Comment s'appelle (ton ami) ?","Comment s'appelle (votre ami) ?","Comment s'appelle (ton/votre ami) ?"],frShow:"Comment s'appelle (ton/votre ami) ?"},
    {en:"Why?",keep:true,phrase:true,fr:["Pourquoi ?"],frShow:"Pourquoi ?"}
  ]},
  { key:"u35", title:"3.5 · Art", emoji:"🎨", unit:"mots", src:SRC + ", « Art » (pas surligné, ajouté en 3.5)", items:[
    {en:"draw",fr:["dessiner"],frShow:"dessiner"},
    {en:"paint",fr:["peindre"],frShow:"peindre"},
    {en:"painter",fr:["peintre"],frShow:"peintre"},
    {en:"painting",fr:["peinture"],frShow:"peinture"}
  ]}
];
DECKS.forEach(d => { d.gen = "vocab"; d.detail = d.src.replace(SRC + ", ", ""); });
const anCardKey = (d, it) => d.key + "_" + it.en;

/* ---------- fiche ---------- */
const wl = d => `<div class="wl ${d.key}">${d.items.map(it => `<span class="en"><b>${esc(it.enShow || it.en)}</b></span><span>${esc(it.frShow)}</span>`).join("")}</div><p class="fine">— ${esc(d.src)}</p>`;
const FICHE = [
  { icon:"🧭", titre:"Ce qu'il faut savoir", html:`
    <p class="tip">Pour <b>vendredi 4 décembre</b>, ton devoir : apprendre le <b>3.1</b> (Feelings, 10 mots). Le reste de la Unit 3 viendra ensuite : tout est déjà là.</p>
    <p class="tip">Tu verras sûrement le <b>français</b> et tu devras écrire l'<b>anglais</b> : c'est le « Niveau épreuve » de l'outil.</p>
    <p class="tip">Un bon plan : le 3.1 en Échauffement, puis en Entraînement, puis en Niveau épreuve avec « Correction en direct » pour l'orthographe.</p>
    <p class="fine">— Conseil de méthode (pas une page du livre)</p>` },
  { icon:"🔎", titre:"Les pièges à repérer", html:`
    <p class="tip"><b>(be)</b> : en anglais, <b>bored</b>, <b>hungry</b> et <b>thirsty</b> vont avec <b>be</b>. En français, on dit <b>s'ennuyer</b>, <b>avoir faim</b>, <b>avoir soif</b>.</p>
    <p class="tip"><b>cold</b> = froid, <b>hot</b> = chaud. <b>scared</b> = effrayé ; dans la phrase <b>I'm scared of (dogs).</b> = J'ai peur des (chiens).</p>
    <p class="tip">Les jours prennent une <b>majuscule</b> en anglais : Monday, Tuesday… <b>Tu</b>esday (mardi) et <b>Th</b>ursday (jeudi) se ressemblent : regarde bien la 2e lettre. W<b>ed</b>n<b>es</b>day s'écrit avec un <b>d</b> qu'on n'entend presque pas.</p>
    <p class="tip"><b>child</b> = un enfant, <b>children</b> = des enfants. <b>man</b> = homme, <b>woman</b> = femme.</p>
    <p class="tip"><b>nice</b> = gentil, mais <b>Nice to meet you.</b> = Enchanté. <b>week</b> = semaine, <b>weekend</b> = week-end.</p>
    <p class="tip"><b>today</b> = aujourd'hui, <b>tomorrow</b> = demain (deux <b>r</b> !).</p>
    <p class="tip"><b>paint</b> = peindre, <b>painter</b> = peintre, <b>painting</b> = peinture.</p>
    <p class="tip"><b>I'm</b> = <b>I am</b>, <b>That's</b> = <b>That is</b>, <b>Who's</b> = <b>Who is</b>, <b>Don't</b> = <b>Do not</b> : les deux écritures sont acceptées.</p>
    <p class="fine">— Conseil de méthode (pas une page du livre), à partir de la page de vocabulaire Unit 3</p>` },
  ...DECKS.map(d => ({ deck:d.key, icon:d.emoji, titre:d.title, count:d.items.length, html:() => wl(d) })),
];

/* ---------- types de questions ---------- */
const KINDS = {
  mcq_fr:{ type:"mcq", tag:"sens", aspect:"en", consigne:"Traduis en français :" },
  mcq_en:{ type:"mcq", tag:"anglais", aspect:"en", consigne:"Choisis l'anglais :" },
  type_fr:{ type:"type", tag:"sens", aspect:"en", consigne:"Traduis en français :" },
  type_en:{ type:"type", tag:"anglais", aspect:"en", consigne:"Écris en anglais :" },
};
const KIND_ORDER = ["mcq_fr","mcq_en","type_fr","type_en"];
const TAG_LABEL = { sens:"traduire en français", anglais:"en anglais" };

/* ---------- correction (celle du modèle d'anglais) ---------- */
function anNorm(s){ return (s||"").toString().toLowerCase().replace(/œ/g,"oe").replace(/æ/g,"ae").replace(/…/g," ").replace(/[-‐–]/g," ").replace(/[’'`]/g,"").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9\- ]/g," ").replace(/\s+/g," ").trim(); }
function anStripEn(s){ return s.replace(/^(to |the |a |an )/,"").trim(); }
function anStripFrArt(s){ return s.replace(/^(le |la |les |l |un |une |des )/,"").trim(); }
function anDropParen(s){ return s.replace(/\s*\([^)]*\)/g,"").trim(); }
function anEnList(it){ const base = [it.en, ...(it.enAccept||[])]; return [...new Set(it.optParen ? base.flatMap(x => [x, anDropParen(x)]) : base)]; }
function anFrList(it){ return [...new Set([...it.fr, it.frShow])]; }
function anCheckEN(input, accept, keep){
  const want = accept.map(anNorm), got = anNorm(input);
  return want.includes(got) || (!keep && want.map(anStripEn).includes(anStripEn(got)));
}
function anCheckFR(input, accept){
  const want = accept.map(anNorm), got = anNorm(input);
  return want.includes(got) || want.map(anStripFrArt).includes(anStripFrArt(got));
}
const anLabel = it => it.enShow || it.en;

function anFill(q, kind, it, d){
  const label = anLabel(it);
  q.card = anCardKey(d, it); q.label = label;
  q.expl = `${label} = ${it.frShow} — ${d.src}`;
  const ok = x => x !== it && !(it.excl || []).includes(x.en) && !(x.excl || []).includes(it.en);
  const same = d.items.filter(ok), other = DECKS.filter(x => x !== d).flatMap(x => x.items).filter(ok);
  if (kind === "type_en" || kind === "mcq_en"){
    q.word = it.frShow; q.answer = anLabel(it); q.lang = "en"; q.keep = !!it.keep;
    if (kind === "type_en"){ q.accept = anEnList(it); return; }
    q.options = pickOptions(anLabel(it), same, other, x => anLabel(x)); return;
  }
  q.word = label; q.lang = "fr"; q.keep = false; q.accept = anFrList(it); q.answer = it.frShow;
  if (kind === "mcq_fr") q.options = pickOptions(it.frShow, same, other, x => x.frShow);
}

const GENS = {
  vocab:{
    cards:() => [{ aspect:"en", mcqOnly:false, levels:[0,1,2] }],
    kinds:(d, it, diff) => {
      const pile = () => Math.random() < 0.5;
      if (diff === "easy") return [pile() ? "mcq_fr" : "mcq_en"];
      if (diff === "hard") return ["type_en"];
      return [it.phrase ? (pile() ? "mcq_fr" : "mcq_en") : (pile() ? "type_fr" : "mcq_en")];
    },
    fill:(q, kind, it, d) => anFill(q, kind, it, d),
    face:(d, it) => ({ tagF:d.title, front:anLabel(it), hintF:"Touche pour voir la réponse", tagB:"Réponse", backHtml:`<span class="face-word">${esc(it.frShow)}</span><span class="face-mini">🇬🇧 ${esc(anLabel(it))}</span><span class="face-mini">— ${esc(d.src)}</span>` }),
  },
};

/* ---------- accroches données à la couche (COUCHE_CONTENU) ---------- */
const COUCHE_CONTENU = {
  allCards(){ return DECKS.flatMap(d => d.items.map(it => ({ dk:d.key, word:anLabel(it), aspect:"en", mcqOnly:false, levels:[0,1,2], k:anCardKey(d, it), label:anLabel(it) }))); },
  isRight(q, val){ if (q.type === "mcq") return val === q.answer; return q.lang === "en" ? anCheckEN(val, q.accept, q.keep) : anCheckFR(val, q.accept); },
  /* correction en direct : mêmes réponses que la correction ; parenthèses et ponctuation ignorées ; article facultatif */
  liveCands(q){
    const out = new Set();
    (q.accept || [q.answer]).forEach(a => [a.toLowerCase(), anNorm(a)].forEach(n => {
      out.add(n);
      if (q.lang === "en" && !q.keep){ const s = anStripEn(anNorm(n)); out.add(s); ["to ","the ","a ","an "].forEach(p => out.add(p + s)); }
      if (q.lang === "fr"){ const s = anStripFrArt(anNorm(n)); out.add(s); ["le ","la ","les ","l ","un ","une ","des "].forEach(p => out.add(p + s)); }
    }));
    return [...out].map(v => [...v].map(lvUnit).join("")).filter(Boolean);
  },
};

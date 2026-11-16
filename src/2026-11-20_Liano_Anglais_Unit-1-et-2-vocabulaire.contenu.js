/* ============================================================
   CONTENU — Anglais, Unit 1 et Unit 2 : tout le vocabulaire (1.1 à 1.4, 2.1 à 2.5)
   Outil de révision de Liano — 7e HarmoS. Évaluation : vendredi 20 novembre 2026 (agenda : « ANG Eval : Unit 2 » ;
   le papa précise que l'évaluation porte sur toute la Unit 1 et toute la Unit 2).
   Ce fichier est la seule partie propre à cet outil. Il est assemblé avec
   claude/couche-langues.js et claude/noyau-quiz.js par claude/assembler.py.
   Modèle : claude/2026-11-19_Livio_Anglais_Unit-2-Holiday-time.contenu.js (règles de correction de l'anglais, outil neuf
   sans partie « ancien format »). Les groupes 2.1 à 2.5 reprennent mot pour mot les items de
   claude/2026-11-06_Liano_Anglais_Unit-2-My-world.contenu.js (mêmes réponses acceptées).
   ============================================================ */

/* Thème « carte postale » : bleu marine de l'encre, rouge des boîtes aux lettres anglaises, timbre « 1·2 » dans l'en-tête. */
const CSS_THEME = `
:root{
  --paper:#eef1f6; --sheet:#ffffff; --ink:#1e2a4a; --soft:#5b6680; --rule:#d5dbe6;
  --court:#1f3d7a; --court-wash:#e3e9f5; --jersey:#c8102e; --score:#f2b705; --board:#1e2a4a;
  --good:#1f8a57; --good-wash:#d4f0e1; --bad:#a3241b; --bad-wash:#f6dedb; --on-court:#ffffff;
  --p-okdark:#0f6b45; --p-ok:#1f8a57; --p-mid:#d9821c; --p-low:#c23b2e; --p-lowsoft:#e8b7b1;
  --box:#1f3d7a; --crane:#c8102e;
  --display:"Fredoka","Trebuchet MS",system-ui,sans-serif;
  --body:"Nunito",system-ui,-apple-system,sans-serif;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --paper:#0f1526; --sheet:#182038; --ink:#edf1fa; --soft:#a2adc6; --rule:#2a3555;
  --court:#7fa2ea; --court-wash:#1c2a4d; --jersey:#ff5a6e; --score:#ffcc33; --board:#0a1020;
  --good:#3fc98a; --good-wash:#0c3b28; --bad:#ef6b5e; --bad-wash:#3a1e1b; --on-court:#0a1020;
  --p-okdark:#2fd08a; --p-ok:#3fc98a; --p-mid:#f2a43a; --p-low:#ef6b5e; --p-lowsoft:#6b2b26;
  --box:#7fa2ea; --crane:#ff5a6e; color-scheme:dark}}
:root[data-theme="dark"]{
  --paper:#0f1526; --sheet:#182038; --ink:#edf1fa; --soft:#a2adc6; --rule:#2a3555;
  --court:#7fa2ea; --court-wash:#1c2a4d; --jersey:#ff5a6e; --score:#ffcc33; --board:#0a1020;
  --good:#3fc98a; --good-wash:#0c3b28; --bad:#ef6b5e; --bad-wash:#3a1e1b; --on-court:#0a1020;
  --p-okdark:#2fd08a; --p-ok:#3fc98a; --p-mid:#f2a43a; --p-low:#ef6b5e; --p-lowsoft:#6b2b26;
  --box:#7fa2ea; --crane:#ff5a6e; color-scheme:dark}
/* en-tête carte postale : bande marine, liseré rouge et bleu de l'enveloppe par avion, timbre dentelé */
.head{background:#1e2a4a;color:#fff;border-radius:16px;padding:14px;position:relative;overflow:hidden}
.head::after{content:"";position:absolute;left:0;right:0;bottom:0;height:6px;background:repeating-linear-gradient(135deg,#c8102e 0 12px,#fff 12px 18px,#1f3d7a 18px 30px,#fff 30px 36px)}
.head .jersey{background:#fff;border-radius:3px;padding:7px 9px;box-shadow:none;outline:3px dotted #1e2a4a;outline-offset:-1px;flex-direction:column;gap:0;transform:rotate(-4deg)}
.head .jersey b{color:#c8102e;font-size:24px;letter-spacing:1px}
.head .jersey small{display:block;color:#1e2a4a;font-size:9.5px;font-weight:800;letter-spacing:.5px}
.head h1{color:#fff}
.head p{color:#fff;opacity:.85}
.face{border-top-color:var(--jersey)}
.entry.open{border-left-color:var(--jersey)}
/* étiquettes des types de questions */
.chip.sens{background:#e3e9f5;color:#1f3d7a}
.chip.anglais{background:#fbe1e5;color:#8a0c20}
:root[data-theme="dark"] .chip.sens{background:#1c2a4d;color:#b9cdf5}
:root[data-theme="dark"] .chip.anglais{background:#3d1820;color:#ffb3bd}
/* listes de la fiche */
.wl{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:0 12px;margin:4px 0}
.wl span{padding:6px 0;border-top:1px solid var(--rule);font-size:14.5px}
.wl span.en{font-weight:700;color:var(--court)}
`;

const QUIZ_ID = "liano-quiz-anglais-unit1et2";
const DUE = { iso:"2026-11-20", long:"vendredi 20 novembre", short:"20.11" };
const THEME = "Unit 1 et Unit 2 (vocabulaire 1.1 à 2.5)";
const VERSION = { n:3, date:"16.11.2026" };   /* v3 : 16.11.2026, noyau v14 (« Réviser mes erreurs » avec choix du niveau, sortie au niveau de l'erreur ou plus haut ; tableau jour par jour avec ○ □ ◆ ★ ; notes par niveau dans l'onglet Scores) */
/* v2 : 16.11.2026, barre des cartes testées par niveau : trois lignes Échauffement, Entraînement, Niveau épreuve, avec « Tester les X » ou « ✓ complet » au bout de chaque ligne (noyau v13).
/* v1 : 16.11.2026, première version — couche Langues (anglais), noyau v12 : tout le vocabulaire des Units 1 et 2,
   neuf paquets rangés comme les groupes surlignés du livre (1.1 à 1.4, 2.1 à 2.5). */

const OUTIL = {
  eleve:"Liano", classe:"7e HarmoS", branche:"Anglais",
  titre:"Units 1 & 2", sousTitre:"Anglais · tout le vocabulaire",
  badgeHtml:`<div class="jersey" aria-hidden="true"><b>1·2</b><small>ENGLISH</small></div>`,
  jersey:"✉️",
  polices:"https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;700;800&display=swap",
  introFiche:"Tout le vocabulaire de la Unit 1 et de la Unit 2, rangé comme dans ton livre : 1.1, 1.2, 1.3, 1.4, puis 2.1 à 2.5. Commence par les pièges, puis entraîne-toi paquet par paquet ou tout mélangé.",
  labelTout:"Units 1 et 2",
  motPaquet:"Paquet",
  comptes:[20, 40, 0], compteDefaut:20,
  compteLabel:"Combien de questions",
  sousNiveaux:{ easy:"Tu choisis la bonne réponse (QCM), dans les deux sens.", normal:"Un mélange : tu choisis l'anglais, ou tu écris le français.", hard:"Comme à l'évaluation : tu vois le français, tu écris l'anglais. 💪" },
  conseilSetup:"Avec « 20 », les questions sont prises dans tous les paquets cochés, à tour de rôle : refais le test plusieurs fois, ce ne seront pas les mêmes. « Toutes » pose les 91 mots et phrases.",
  papier:{ titre:"Anglais · Units 1 et 2, tout le vocabulaire — évaluation du vendredi 20 novembre", court:"Anglais · Units 1 et 2", fichier:"Liano_Anglais_Unit-1-et-2-vocabulaire", code:"#PDF-ANGLAIS-UNIT1-2" },
  copie:{ titre:"Anglais · Units 1 et 2, vocabulaire (Liano)" },
  analyse:{
    role:"un tuteur d'anglais",
    sujet:"l'anglais, Units 1 et 2 (animaux, dire bonjour et au revoir, se présenter, pays et lieux, nombres de 1 à 20, la famille, des mots et des phrases pour parler de soi)",
    etiquettes:"sens = traduire l'anglais en français, anglais = écrire ou choisir l'anglais à partir du français",
    pistes:"les nombres en -teen (four / fourteen, six / sixteen…), l'orthographe (eight, Switzerland, Germany), city / town, les différentes façons de dire bonjour (hello, hi, good morning…), His / Her name's, I'm = I am, les phrases du livre",
  },
};

/* ===== Sources (visibles partout, y compris sur le site public) ===== */
const SOURCES = [
  { titre:"Photo 1 — livre p. 6, vocabulaire Unit 1", recue:"16.11.2026",
    contenu:"Groupes notés à la main et surlignés : 1.1 (vert) Pets + hello, hi, bye, goodbye, see you ; 1.2 (jaune) good morning… good night, and, cool, fine, great, no, pet, yes ; 1.3 (orange) les phrases Her name's… What's your name? et Britain, Europe, France ; 1.4 (bleu) Germany, Italy, Portugal, Spain, Switzerland, city, country, region, town, village." },
  { titre:"Photo 2 — livre p. 10, vocabulaire Unit 2", recue:"16.11.2026",
    contenu:"2.1 (jaune) nombres 1 à 10 ; 2.2 (bleu) 11 à 20 ; 2.3 (bleu-vert) The family + animal, ball ; 2.4 (rose) bear, (best) friend, favourite, frog, number, tortoise et How old…?, I'm / He's / She's (eleven), I'm from… ; 2.5 (violet) I'm in Year (5)… Where are you from?" }
];
const PHOTOS = [ { titre:"Photo 1 — livre p. 6, Unit 1", url:"/_blob/38ebe5f84251dfdedb224dbdd30605b8" }, { titre:"Photo 2 — livre p. 10, Unit 2", url:"/_blob/9f0cc8a546c6ab07ba8f3e3d62eaa3d7" } ];
const SOURCES_NOTE = "Les paquets suivent les groupes notés et surlignés dans le livre : la couleur décide du groupe. Britain, Europe et France sont surlignés en orange : ils vont avec 1.3 ; Germany et la suite, en bleu, avec 1.4. Dans 1.4, les traductions « Italie, Portugal, Espagne » sont barrées au stylo sur la photo, mais les mots anglais sont surlignés : ils sont gardés, avec la traduction imprimée. « My name's (Léa). / I'm (Léa). » donne une seule carte : les deux réponses sont acceptées. « I'm / He's / She's (eleven). » donne trois cartes, comme dans l'outil Unit 2. Les mots entre parenthèses des phrases sont ceux du livre (Sophie, Joël, Claudio, Léa, my dog, Noah, eleven…).";

/* ===== Données : couche Langues (anglais) =====
   item : { en, enShow?, enAccept[], optParen?, keep?, phrase?, excl[], fr[], frShow }
   en = réponse anglaise de référence ; excl = mots qui ne servent jamais de piège dans les choix (sens trop proche dans le livre). */
const DECKS = [
  { key:"u11", title:"1.1 · Pets, hello and goodbye", emoji:"🐶", unit:"mots", src:"livre p. 6, Unit 1, « Pets » et « Hello and goodbye », groupe 1.1 (vert)", items:[
    {en:"cat",fr:["chat"],frShow:"chat"},
    {en:"dog",fr:["chien"],frShow:"chien"},
    {en:"fish",fr:["poisson"],frShow:"poisson"},
    {en:"hamster",fr:["hamster"],frShow:"hamster"},
    {en:"mouse",fr:["souris"],frShow:"souris"},
    {en:"rabbit",fr:["lapin"],frShow:"lapin"},
    {en:"hello",excl:["hi","good morning","good afternoon"],fr:["bonjour"],frShow:"bonjour"},
    {en:"hi",excl:["hello","bye"],fr:["salut (bonjour)","salut","bonjour"],frShow:"salut (bonjour)"},
    {en:"bye",excl:["goodbye","hi"],fr:["salut (au revoir)","salut","au revoir"],frShow:"salut (au revoir)"},
    {en:"goodbye",excl:["bye"],enAccept:["good bye","good-bye"],fr:["au revoir"],frShow:"au revoir"},
    {en:"see you",fr:["à bientôt"],frShow:"à bientôt"}
  ]},
  { key:"u12", title:"1.2 · Good morning… and words", emoji:"🌅", unit:"mots", src:"livre p. 6, Unit 1, « Hello and goodbye » et « Words and phrases », groupe 1.2 (jaune)", items:[
    {en:"good morning",excl:["hello"],fr:["bonjour (matin)","bonjour"],frShow:"bonjour (matin)"},
    {en:"good afternoon",excl:["hello"],fr:["bonjour (après-midi)","bonjour"],frShow:"bonjour (après-midi)"},
    {en:"good evening",fr:["bonsoir"],frShow:"bonsoir"},
    {en:"good night",fr:["bonne nuit"],frShow:"bonne nuit"},
    {en:"and",fr:["et"],frShow:"et"},
    {en:"cool",excl:["great"],fr:["génial"],frShow:"génial"},
    {en:"fine",fr:["bien"],frShow:"bien"},
    {en:"great",excl:["cool"],fr:["super"],frShow:"super"},
    {en:"no",fr:["non"],frShow:"non"},
    {en:"pet",fr:["animal de compagnie"],frShow:"animal de compagnie"},
    {en:"yes",fr:["oui"],frShow:"oui"}
  ]},
  { key:"u13", title:"1.3 · Who are you? + Britain, Europe, France", emoji:"🙋", unit:"mots et phrases", src:"livre p. 6, Unit 1, « Words and phrases » et « Geography », groupe 1.3 (orange)", items:[
    {en:"Her name's (Sophie).",keep:true,phrase:true,enAccept:["Her name is (Sophie)."],fr:["Elle s'appelle (Sophie)."],frShow:"Elle s'appelle (Sophie)."},
    {en:"His name's (Joël).",keep:true,phrase:true,enAccept:["His name is (Joël)."],fr:["Il s'appelle (Joël)."],frShow:"Il s'appelle (Joël)."},
    {en:"How are you?",keep:true,phrase:true,fr:["Comment vas-tu ?","Comment allez-vous ?","Comment vas-tu / allez-vous ?"],frShow:"Comment vas-tu / allez-vous ?"},
    {en:"How do you spell (Claudio)?",keep:true,phrase:true,fr:["Comment épelles-tu (Claudio) ?","Comment épelez-vous (Claudio) ?","Comment épelles-tu / épelez-vous (Claudio) ?"],frShow:"Comment épelles-tu / épelez-vous (Claudio) ?"},
    {en:"My name's (Léa).",enShow:"My name's (Léa). / I'm (Léa).",keep:true,phrase:true,enAccept:["My name is (Léa).","I'm (Léa).","I am (Léa)."],fr:["Je m'appelle (Léa)."],frShow:"Je m'appelle (Léa)."},
    {en:"This is (my dog).",keep:true,phrase:true,fr:["C'est (mon chien)."],frShow:"C'est (mon chien)."},
    {en:"What's your name?",keep:true,phrase:true,enAccept:["What is your name?"],fr:["Comment t'appelles-tu ?","Comment vous appelez-vous ?","Comment t'appelles-tu / vous appelez-vous ?"],frShow:"Comment t'appelles-tu / vous appelez-vous ?"},
    {en:"Britain",fr:["Grande-Bretagne"],frShow:"Grande-Bretagne"},
    {en:"Europe",fr:["Europe"],frShow:"Europe"},
    {en:"France",fr:["France"],frShow:"France"}
  ]},
  { key:"u14", title:"1.4 · Countries and places", emoji:"🗺️", unit:"mots", src:"livre p. 6, Unit 1, « Geography », groupe 1.4 (bleu)", items:[
    {en:"Germany",fr:["Allemagne"],frShow:"Allemagne"},
    {en:"Italy",fr:["Italie"],frShow:"Italie"},
    {en:"Portugal",fr:["Portugal"],frShow:"Portugal"},
    {en:"Spain",fr:["Espagne"],frShow:"Espagne"},
    {en:"Switzerland",fr:["Suisse"],frShow:"Suisse"},
    {en:"city",excl:["town"],fr:["ville (grande)","grande ville","ville"],frShow:"ville (grande)"},
    {en:"country",fr:["pays"],frShow:"pays"},
    {en:"region",fr:["région"],frShow:"région"},
    {en:"town",excl:["city"],fr:["ville (petite)","petite ville","ville"],frShow:"ville (petite)"},
    {en:"village",fr:["village"],frShow:"village"}
  ]},
  { key:"n1a10", title:"2.1 · Numbers 1 → 10", emoji:"🔟", unit:"nombres", src:"livre p. 10, Unit 2, « Numbers », groupe 2.1 (jaune)", items:[
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
  { key:"n11a20", title:"2.2 · Numbers 11 → 20", emoji:"🔢", unit:"nombres", src:"livre p. 10, Unit 2, « Numbers », groupe 2.2 (bleu)", items:[
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
  { key:"famille", title:"2.3 · The family + animal, ball", emoji:"👨‍👩‍👧", unit:"mots", src:"livre p. 10, Unit 2, « The family » et « Words and phrases », groupe 2.3 (bleu-vert)", items:[
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
  { key:"mots", title:"2.4 · Words and phrases", emoji:"🐸", unit:"mots et phrases", src:"livre p. 10, Unit 2, « Words and phrases », groupe 2.4 (rose)", items:[
    {en:"bear",fr:["ours"],frShow:"ours"},
    {en:"(best) friend",optParen:true,fr:["meilleur ami","ami"],frShow:"(meilleur) ami"},
    {en:"favourite",fr:["préféré"],frShow:"préféré"},
    {en:"frog",fr:["grenouille"],frShow:"grenouille"},
    {en:"number",fr:["chiffre","nombre","chiffre, nombre"],frShow:"chiffre, nombre"},
    {en:"tortoise",fr:["tortue"],frShow:"tortue"},
    {en:"How old are you?",keep:true,phrase:true,fr:["Quel âge as-tu ?","Quel âge avez-vous ?"],frShow:"Quel âge as-tu / avez-vous ?"},
    {en:"How old is (Noah)?",keep:true,phrase:true,fr:["Quel âge a (Noah) ?"],frShow:"Quel âge a (Noah) ?"},
    {en:"I'm (eleven).",keep:true,phrase:true,enAccept:["I am (eleven)."],fr:["J'ai (onze) ans."],frShow:"J'ai (onze) ans."},
    {en:"He's (eleven).",keep:true,phrase:true,enAccept:["He is (eleven)."],fr:["Il a (onze) ans."],frShow:"Il a (onze) ans."},
    {en:"She's (eleven).",keep:true,phrase:true,enAccept:["She is (eleven)."],fr:["Elle a (onze) ans."],frShow:"Elle a (onze) ans."},
    {en:"I'm from (Switzerland).",keep:true,phrase:true,enAccept:["I am from (Switzerland)."],fr:["Je viens de (Suisse)."],frShow:"Je viens de (Suisse)."}
  ]},
  { key:"phrases", title:"2.5 · Phrases", emoji:"💬", unit:"phrases", src:"livre p. 10, Unit 2, « Words and phrases », groupe 2.5 (violet)", items:[
    {en:"I'm in Year (5).",keep:true,phrase:true,enAccept:["I am in Year (5).","I'm in Year five.","I am in Year five."],fr:["Je suis en (5)ème.","Je suis en 5e.","Je suis en cinquième."],frShow:"Je suis en (5)ème."},
    {en:"My favourite number is (nine).",keep:true,phrase:true,fr:["Mon chiffre préféré est le (neuf).","Mon nombre préféré est le (neuf)."],frShow:"Mon chiffre préféré est le (neuf)."},
    {en:"Thank you.",enShow:"Thank you. / Thanks.",keep:true,phrase:true,enAccept:["Thanks."],fr:["Merci."],frShow:"Merci."},
    {en:"These are (my brother and sister).",keep:true,phrase:true,fr:["Ce sont (mes frère et sœur)."],frShow:"Ce sont (mes frère et sœur)."},
    {en:"What year are you in?",keep:true,phrase:true,fr:["En quelle année es-tu ?","En quelle année êtes-vous ?"],frShow:"En quelle année es-tu / êtes-vous ?"},
    {en:"What's your favourite (number)?",keep:true,phrase:true,enAccept:["What is your favourite (number)?"],fr:["Quel est ton chiffre préféré ?","Quel est ton nombre préféré ?"],frShow:"Quel est ton (chiffre/nombre) préféré ?"},
    {en:"Where are you from?",keep:true,phrase:true,fr:["D'où viens-tu ?","D'où venez-vous ?"],frShow:"D'où viens-tu / venez-vous ?"}
  ]}
];
DECKS.forEach(d => { d.gen = "vocab"; d.detail = d.src; });
const anCardKey = (d, it) => d.key + "_" + it.en;

/* ---------- fiche ---------- */
const wl = d => `<div class="wl">${d.items.map(it => `<span class="en">${esc(it.enShow || it.en)}</span><span>${esc(it.frShow)}</span>`).join("")}</div><p class="fine">— ${esc(d.src)}</p>`;
const FICHE = [
  { icon:"🧭", titre:"Ce qu'il faut savoir pour vendredi", html:`
    <p class="tip">L'évaluation porte sur <b>toute la Unit 1</b> (1.1 à 1.4) et <b>toute la Unit 2</b> (2.1 à 2.5) : 91 mots et phrases.</p>
    <p class="tip">Tu verras sûrement le <b>français</b> et tu devras écrire l'<b>anglais</b> : c'est le « Niveau épreuve » de l'outil.</p>
    <p class="tip">Un bon plan : un paquet à la fois en Échauffement, puis tout mélangé en Entraînement, puis le Niveau épreuve en « Épreuve blanche » la veille.</p>
    <p class="fine">— Conseil de méthode (pas une page du livre)</p>` },
  { icon:"🔎", titre:"Les pièges à repérer", html:`
    <p class="tip"><b>Bonjour</b> se dit de plusieurs façons : <b>hello</b> (bonjour), <b>hi</b> (salut), <b>good morning</b> (le matin), <b>good afternoon</b> (l'après-midi). Le soir : <b>good evening</b> (bonsoir) ; pour aller dormir : <b>good night</b>.</p>
    <p class="tip"><b>bye</b> = salut (au revoir), <b>goodbye</b> = au revoir, <b>see you</b> = à bientôt.</p>
    <p class="tip"><b>His</b> name's… = <b>il</b> s'appelle (un garçon). <b>Her</b> name's… = <b>elle</b> s'appelle (une fille).</p>
    <p class="tip"><b>city</b> = une grande ville, <b>town</b> = une petite ville.</p>
    <p class="tip">Les pays prennent une <b>majuscule</b> : Germany, Italy, Spain, Switzerland. Attention à l'orthographe de Swi<b>tz</b>erland et Germ<b>a</b>ny.</p>
    <p class="tip"><b>four</b> (4) et <b>fourteen</b> (14) : « -teen » = « +10 ». Pareil pour <b>six / sixteen</b>, <b>seven / seventeen</b>… Attention à <b>eight</b> (8) : e-i-g-h-t !</p>
    <p class="tip"><b>I'm</b> = <b>I am</b>, <b>name's</b> = <b>name is</b>, <b>What's</b> = <b>What is</b> : les deux écritures sont acceptées.</p>
    <p class="tip">Dans les phrases, les mots entre parenthèses sont les exemples du livre : <b>How old is (Noah)?</b>, <b>This is (my dog).</b> Écris-les comme dans le livre.</p>
    <p class="fine">— Conseil de méthode (pas une page du livre), à partir des pages 6 et 10</p>` },
  ...DECKS.map(d => ({ deck:d.key, icon:d.emoji, titre:d.title, count:d.items.length, html:() => wl(d) })),
];

/* ---------- types de questions ---------- */
/* Échauffement = QCM dans les deux sens ; Entraînement = choisir l'anglais ou écrire le français (phrases : QCM) ;
   Niveau épreuve = français montré, écrire l'anglais. Une seule carte par élément. */
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

/* ============================================================
   CONTENU — Français, Module 1 : Types et formes de phrases
   Outil de révision de Liano — 7e HarmoS. Test : jeudi 29 octobre 2026.
   Ce fichier est la seule partie propre à cet outil. Il est assemblé avec
   claude/couche-langues.js et claude/noyau-quiz.js par claude/assembler.py.
   Contenu : cours (Module 1) + exercices 1 à 5 (énoncés imprimés).
   Les réponses manuscrites de l'élève ne sont pas utilisées.
   ============================================================ */

/* Thème « les signaux de la phrase » : chaque phrase finit par un signal — . ? ! — comme un panneau. Violet encre, corail et ambre.
   Palette et couleurs des étiquettes (.chip.<tag>) de cet outil ; la CSS de base vient du noyau (base.css). */
const CSS_THEME = `
:root{
  --paper:#EEF1F8; --sheet:#FFFFFF; --ink:#20264B; --soft:#6B7390; --rule:#D5DAE8;
  --court:#5A42C9; --court-wash:#ECE8FB; --jersey:#F26A4B; --score:#FFC24B; --board:#20264B;
  --good:#2E8B6F; --good-wash:#DEF3EB; --bad:#C63B2A; --bad-wash:#FBE4DF; --on-court:#FFFFFF;
  --p-okdark:#1B6B4F; --p-ok:#2E8B6F; --p-mid:#D9822B; --p-low:#C63B2A; --p-lowsoft:#F0C7C0;
  --box:#5A42C9; --crane:#F26A4B;
  --display:'Fredoka','Trebuchet MS',sans-serif;
  --body:'Atkinson Hyperlegible',system-ui,-apple-system,'Segoe UI',sans-serif;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --paper:#121523; --sheet:#1B2036; --ink:#E7EAF5; --soft:#9AA3C0; --rule:#2E3454;
  --court:#9D8CFF; --court-wash:#231E47; --jersey:#FF8A6B; --score:#FFC24B; --board:#0C0F1D;
  --good:#5ED3A0; --good-wash:#15362A; --bad:#FF8A7D; --bad-wash:#3A1E1B; --on-court:#0C0F1D;
  --p-okdark:#3FB488; --p-ok:#5ED3A0; --p-mid:#E8A24D; --p-low:#FF8A7D; --p-lowsoft:#5A2A25;
  --box:#9D8CFF; --crane:#FF8A6B; color-scheme:dark}}
:root[data-theme="dark"]{
  --paper:#121523; --sheet:#1B2036; --ink:#E7EAF5; --soft:#9AA3C0; --rule:#2E3454;
  --court:#9D8CFF; --court-wash:#231E47; --jersey:#FF8A6B; --score:#FFC24B; --board:#0C0F1D;
  --good:#5ED3A0; --good-wash:#15362A; --bad:#FF8A7D; --bad-wash:#3A1E1B; --on-court:#0C0F1D;
  --p-okdark:#3FB488; --p-ok:#5ED3A0; --p-mid:#E8A24D; --p-low:#FF8A7D; --p-lowsoft:#5A2A25;
  --box:#9D8CFF; --crane:#FF8A6B; color-scheme:dark}
.chip.type{background:#E6E0FB;color:#4A34B4}
.chip.forme{background:#FBEBC0;color:#7A5806}
.chip.ponct{background:#DDEFF7;color:#1C5A77}
.chip.reperer{background:#E7F3E6;color:#2C6E34}
.chip.verbe{background:#F7E2DC;color:#9A3C27}
.chip.transfo{background:#EFE0F2;color:#6E3A7C}
`;

const QUIZ_ID = "liano-quiz-francais-types-formes";
const DUE = { iso:"2026-10-29", long:"jeudi 29 octobre", short:"29.10" };
const THEME = "Types et formes de phrases";
const VERSION = { n:5, date:"01.11.2026" };   /* v1 : 26.10.2026, première version · v2 : 26.10.2026, suivi 3 anneaux + courbe + jour par jour + cartes qui résistent + test en cours gardé · v3 : 26.10.2026, anneaux colorés selon leur note (plein/clair), au centre réussies/total du niveau le plus difficile testé · v4 : 01.11.2026, un anneau = un niveau (seuls les tests faits à ce niveau le remplissent) · v5 : 01.11.2026, reconstruit sur le noyau commun (refonte C1), même comportement */

/* Tout ce que le noyau affiche ou écrit et qui dépend de l'outil. Jamais d'âge en dur : le noyau le déduit de la classe. */
const OUTIL = {
  eleve:"Liano", classe:"7e HarmoS", branche:"Français",
  titre:"Types et formes de phrases", sousTitre:"Français · Module 1",
  jersey:". ? !",
  polices:"https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Atkinson+Hyperlegible:wght@400;700&display=swap",
  introFiche:"Toute la leçon est ici : les 4 types, les 2 formes, la ponctuation, et comment transformer une phrase. Ouvre une section, lis-la à voix haute, puis passe aux cartes ou au test.",
  labelTout:"Tout le module",
  motPaquet:"Paquet",
  papier:{ titre:"Français — Types et formes de phrases", court:"Français — Types et formes", fichier:"francais-types-formes-liano", code:"#PDF-FR-TYPES" },
  copie:{ titre:"RÉSULTAT — Français, Types et formes de phrases" },
  analyse:{
    role:"un professeur de français suisse",
    sujet:"la grammaire « Types et formes de phrases » (les 4 types : déclaratif, interrogatif, impératif, exclamatif ; la ponctuation ; les 2 formes : positive et négative ; transformer à l'impératif ; varier une phrase exclamative)",
    etiquettes:"type = reconnaître le type de phrase, forme = positive/négative, ponct = ponctuation, reperer = repérer une phrase impérative, verbe = le verbe à l'impératif, transfo = transformer une phrase",
    pistes:"la confusion entre deux types (par exemple impératif pris pour exclamatif à cause du point d'exclamation), la forme négative pas repérée, la ponctuation, la conjugaison à l'impératif (le « s » à « tu », les possessifs ton/nos/vos), la construction de l'exclamation",
  },
};

/* ---------- SOURCES ---------- */
const SOURCES = [
  { titre:"Photo — Cours « Module 1, Types et formes de phrases »", recue:"26.10.2026", contenu:"Définitions des 4 types (déclaratif, interrogatif, exclamatif, impératif), ponctuation de chacun, formes positive et négative, et les exemples du cours." },
  { titre:"Photo — Exercice 1 et Exercice 2", recue:"26.10.2026", contenu:"Exercice 1 : classer 12 phrases (type et forme). Exercice 2 : repérer les phrases impératives et souligner le verbe à l'impératif." },
  { titre:"Photo — Exercice 3 et Exercice 4", recue:"26.10.2026", contenu:"Exercice 3 : transformer des phrases à l'impératif (personne et forme imposées). Exercice 4 : varier la construction d'une phrase exclamative (que, comme, quel, phrase nominale)." },
  { titre:"Photo — Exercice 5", recue:"26.10.2026", contenu:"Grand tableau : classer les phrases 1 à 16 (type et forme). L'« exercice en plus » (phrases écrites à la main par l'élève) n'est pas repris." },
];
const SOURCES_NOTE = "Tout vient des énoncés imprimés des exercices et du cours. Les réponses écrites à la main par Liano ne sont pas utilisées. La phrase 6 de l'exercice 1 (« Ne cours pas dans le couloir ! ») est classée impérative, d'après la règle du cours (verbe à l'impératif, pas de sujet), même si elle finit par un point d'exclamation.";
const PHOTOS = [
  { titre:"Cours — Types et formes", url:"/_blob/bd3b3ea8ee1130d2038a541a98926274" },
  { titre:"Exercices 1 et 2", url:"/_blob/fe44f371c4ea253dca41878b7414e8d8" },
  { titre:"Exercices 3 et 4", url:"/_blob/d7b3cccf432e6fd5d5988ec65abbbbf8" },
  { titre:"Exercice 5", url:"/_blob/24366f00e134ac59de7b8bfc8b790a3b" },
];

/* ---------- CONTENU : paquets ---------- */
const DECKS = [
  { key:"types", title:"Les 4 types et les 2 formes", emoji:"🚦", gen:"typeforme", unit:"phrases", src:"Exercices 1 et 5",
    items:[
      { front:"Apporte-moi une feuille blanche.", type:"impératif", forme:"positive", src:"Exercice 1" },
      { front:"Cette maison n'est pas très grande.", type:"déclaratif", forme:"négative", src:"Exercice 1" },
      { front:"Magnifique, ce tableau !", type:"exclamatif", forme:"positive", src:"Exercice 1" },
      { front:"Il n'écoute jamais en classe.", type:"déclaratif", forme:"négative", src:"Exercice 1" },
      { front:"Comme cette musique est douce !", type:"exclamatif", forme:"positive", src:"Exercice 1" },
      { front:"Ne cours pas dans le couloir !", type:"impératif", forme:"négative", src:"Exercice 1" },
      { front:"Est-ce que tu comprends la leçon ?", type:"interrogatif", forme:"positive", src:"Exercice 1" },
      { front:"Luc n'est jamais allé en France.", type:"déclaratif", forme:"négative", src:"Exercice 1" },
      { front:"Elle lit souvent avant de dormir.", type:"déclaratif", forme:"positive", src:"Exercice 1" },
      { front:"Quelle surprise agréable !", type:"exclamatif", forme:"positive", src:"Exercice 1" },
      { front:"As-tu terminé ton dessin ?", type:"interrogatif", forme:"positive", src:"Exercice 1" },
      { front:"N'avez-vous pas envie d'une glace ?", type:"interrogatif", forme:"négative", src:"Exercice 1" },
      { front:"Il n'emprunte jamais de livres à la bibliothèque.", type:"déclaratif", forme:"négative", src:"Exercice 5" },
      { front:"Qui est-ce qui commence le premier ?", type:"interrogatif", forme:"positive", src:"Exercice 5" },
      { front:"Lève-toi maintenant !", type:"impératif", forme:"positive", src:"Exercice 5" },
      { front:"Le trapéziste fait frémir les spectateurs.", type:"déclaratif", forme:"positive", src:"Exercice 5" },
      { front:"Brosse-toi les cheveux chaque matin.", type:"impératif", forme:"positive", src:"Exercice 5" },
      { front:"Assure-le de notre soutien.", type:"impératif", forme:"positive", src:"Exercice 5" },
      { front:"Ne préfères-tu pas commencer demain ?", type:"interrogatif", forme:"négative", src:"Exercice 5" },
      { front:"Il n'a pas répondu à notre demande.", type:"déclaratif", forme:"négative", src:"Exercice 5" },
      { front:"Comme tu es agressif !", type:"exclamatif", forme:"positive", src:"Exercice 5" },
      { front:"Quelle triste journée !", type:"exclamatif", forme:"positive", src:"Exercice 5" },
      { front:"Ne venez pas avec votre portable en classe.", type:"impératif", forme:"négative", src:"Exercice 5" },
      { front:"Vous ne partagez pas vos salaires ?", type:"interrogatif", forme:"négative", src:"Exercice 5" },
      { front:"Claude vient avec nous ?", type:"interrogatif", forme:"positive", src:"Exercice 5" },
      { front:"Comme ces phrases sont simples !", type:"exclamatif", forme:"positive", src:"Exercice 5" },
    ]},
  { key:"ponct", title:"La ponctuation", emoji:"❗", gen:"regle", unit:"règles", src:"Cours",
    items:[
      { front:"Par quel signe se termine une phrase déclarative ?", options:["un point (.)","un point d'interrogation (?)","un point d'exclamation (!)"], back:"un point (.)", expl:"La phrase déclarative donne une information et se termine par un point. — Cours" },
      { front:"Par quel signe se termine une phrase interrogative ?", options:["un point (.)","un point d'interrogation (?)","un point d'exclamation (!)"], back:"un point d'interrogation (?)", expl:"La phrase interrogative pose une question et se termine par un point d'interrogation. — Cours" },
      { front:"Par quel signe se termine une phrase exclamative ?", options:["un point (.)","un point d'interrogation (?)","un point d'exclamation (!)"], back:"un point d'exclamation (!)", expl:"La phrase exclamative exprime un sentiment et se termine par un point d'exclamation. — Cours" },
      { front:"Par quel signe peut se terminer une phrase impérative ?", options:["un point (.) ou un point d'exclamation (!)","un point d'interrogation (?)","seulement un point d'exclamation (!)"], back:"un point (.) ou un point d'exclamation (!)", expl:"La phrase impérative donne un ordre ou un conseil : « Mélangez les ingrédients. » (point) ou « Range ta chambre ! » (point d'exclamation). — Cours" },
    ]},
  { key:"imp", title:"Repérer l'impératif", emoji:"🎯", gen:"imperative", unit:"phrases", src:"Exercice 2",
    items:[
      { front:"Ajoutez du sucre et des œufs.", imperative:true, verbe:"Ajoutez", src:"Exercice 2" },
      { front:"Vous ne me parlez pas sur ce ton !", imperative:false, why:"la phrase a un sujet (« vous ») : c'est une phrase déclarative à la forme négative", src:"Exercice 2" },
      { front:"Donne-le-lui avant demain.", imperative:true, verbe:"Donne", src:"Exercice 2" },
      { front:"Répondons correctement aux questions.", imperative:true, verbe:"Répondons", src:"Exercice 2" },
      { front:"Cachez-vous dans cette armoire !", imperative:true, verbe:"Cachez", src:"Exercice 2" },
      { front:"Aiment-ils aussi les sushis au saumon ?", imperative:false, why:"c'est une question : une phrase interrogative", src:"Exercice 2" },
      { front:"Ne jette pas ce papier sur le tapis.", imperative:true, verbe:"jette", src:"Exercice 2" },
      { front:"En entourant ce numéro, vous faites une erreur.", imperative:false, why:"la phrase a un sujet (« vous ») et donne une information : c'est une phrase déclarative", src:"Exercice 2" },
    ]},
  { key:"timp", title:"Transformer à l'impératif", emoji:"✍️", gen:"transfo", unit:"phrases", src:"Exercice 3",
    items:[
      { front:"Mettre ses chaussures sur le siège. → forme négative, 2e personne du pluriel (vous)", answer:"Ne mettez pas vos chaussures sur le siège.", accept:["Ne mettez pas vos chaussures sur le siège.","Ne mettez pas vos chaussures sur le siège"], expl:"2e personne du pluriel (vous), forme négative : « Ne … pas ». Le verbe « mettre » donne « mettez », et « ses » devient « vos ». — Exercice 3" },
      { front:"Finir son assiette. → forme positive, 2e personne du singulier (tu)", answer:"Finis ton assiette.", accept:["Finis ton assiette.","Finis ton assiette"], expl:"2e personne du singulier (tu) : le verbe « finir » fait « finis ». « Son » devient « ton ». — Exercice 3" },
      { front:"Utiliser l'ordinateur avec soin. → forme positive, 1re personne du pluriel (nous)", answer:"Utilisons l'ordinateur avec soin.", accept:["Utilisons l'ordinateur avec soin.","Utilisons l'ordinateur avec soin"], expl:"1re personne du pluriel (nous) : « utilisons ». La phrase reste positive. — Exercice 3" },
      { front:"Parler trop fort en classe. → forme négative, 2e personne du singulier (tu)", answer:"Ne parle pas trop fort en classe.", accept:["Ne parle pas trop fort en classe.","Ne parle pas trop fort en classe"], expl:"2e personne du singulier (tu), forme négative : « Ne parle pas ». À l'impératif, « parler » fait « parle » sans s. — Exercice 3" },
      { front:"Poser ses livres sur l'étagère. → forme positive, 1re personne du pluriel (nous)", answer:"Posons nos livres sur l'étagère.", accept:["Posons nos livres sur l'étagère.","Posons nos livres sur l'étagère"], expl:"1re personne du pluriel (nous) : « posons ». « Ses » devient « nos ». — Exercice 3" },
    ]},
  { key:"texc", title:"Varier la phrase exclamative", emoji:"💬", gen:"transfo", unit:"phrases", src:"Exercice 4",
    items:[
      { front:"« Quelle superbe peinture ! » → récris avec COMME", answer:"Comme cette peinture est superbe !", accept:["Comme cette peinture est superbe !","Comme cette peinture est superbe"], expl:"Construction avec « comme » : Comme + sujet + verbe + adjectif. — Exercice 4" },
      { front:"« Quelle superbe peinture ! » → récris avec QUE", answer:"Que cette peinture est superbe !", accept:["Que cette peinture est superbe !","Que cette peinture est superbe","Qu'elle est superbe, cette peinture !","Qu'elle est superbe cette peinture"], expl:"Construction avec « que » : Que + sujet + verbe + adjectif. — Exercice 4" },
      { front:"« Comme cette mer est agitée ! » → récris avec QUE", answer:"Que cette mer est agitée !", accept:["Que cette mer est agitée !","Que cette mer est agitée"], expl:"Construction avec « que » : Que + sujet + verbe + adjectif. — Exercice 4" },
      { front:"« Comme cette mer est agitée ! » → récris avec QUEL / QUELLE", answer:"Quelle mer agitée !", accept:["Quelle mer agitée !","Quelle mer agitée","Quelle agitée mer !"], expl:"Construction avec « quel » : Quel(le) + nom + adjectif. Ici « quelle » (mer est féminin). — Exercice 4" },
      { front:"« Que ce film est captivant ! » → récris avec COMME", answer:"Comme ce film est captivant !", accept:["Comme ce film est captivant !","Comme ce film est captivant"], expl:"Construction avec « comme » : Comme + sujet + verbe + adjectif. — Exercice 4" },
      { front:"« Que ce film est captivant ! » → récris avec QUEL", answer:"Quel film captivant !", accept:["Quel film captivant !","Quel film captivant","Quel captivant film !"], expl:"Construction avec « quel » : Quel + nom + adjectif. — Exercice 4" },
      { front:"« Minuscules, ces fourmis ! » → récris avec COMME", answer:"Comme ces fourmis sont minuscules !", accept:["Comme ces fourmis sont minuscules !","Comme ces fourmis sont minuscules"], expl:"Construction avec « comme » : Comme + sujet + verbe + adjectif (au pluriel : « sont »). — Exercice 4" },
      { front:"« Minuscules, ces fourmis ! » → récris avec QUE", answer:"Que ces fourmis sont minuscules !", accept:["Que ces fourmis sont minuscules !","Que ces fourmis sont minuscules"], expl:"Construction avec « que » : Que + sujet + verbe + adjectif (au pluriel : « sont »). — Exercice 4" },
    ]},
];

/* ---------- fiche ---------- */
const FICHE = [
  { icon:"🚦", titre:"Les 4 types de phrases", pairs:[
    ["déclaratif","donne une information · finit par un point. → Léonard a la grippe."],
    ["interrogatif","pose une question · finit par un point d'interrogation. → L'avion a-t-il du retard ?"],
    ["exclamatif","exprime un sentiment · finit par un point d'exclamation · souvent avec que, quel, comme. → Quel beau combat !"],
    ["impératif","donne un ordre ou un conseil · verbe à l'impératif · pas de sujet. → Range ta chambre !"]],
    astuce:"Pour trouver le type, pose-toi deux questions dans l'ordre : est-ce que la phrase donne un ordre (verbe au début, pas de sujet) ? → impératif. Sinon, regarde le signe de la fin : . → déclaratif, ? → interrogatif, ! avec que/quel/comme ou juste un sentiment → exclamatif." },
  { icon:"❗", titre:"La ponctuation de chaque type", tips:[
    "Déclaratif → un point : Cet appareil fonctionne.",
    "Interrogatif → un point d'interrogation : Qui as-tu invité ?",
    "Exclamatif → un point d'exclamation : Comme tu es drôle !",
    "Impératif → un point OU un point d'exclamation : Mélangez les ingrédients. / Range ta chambre !"] },
  { icon:"➕", titre:"Les deux formes : positive et négative", pairs:[
    ["forme positive","pas de négation. → Cet appareil fonctionne."],
    ["forme négative","on ajoute une négation : ne… pas, ne… rien, ne… jamais, ne… plus. → Cet appareil ne fonctionne pas."],
    ["Attention","la forme (positive / négative) ne dépend pas du type. Une question peut être négative : Est-ce qu'il ne vient plus chez nous ?"]],
    astuce:"Pour la forme, cherche la négation : si tu vois ne … pas / jamais / plus / rien, c'est négatif. Sinon, c'est positif. Le « n' » compte aussi : « Il n'écoute jamais » est négatif." },
  { icon:"✍️", titre:"Transformer à l'impératif présent", tips:[
    "L'impératif n'a pas de sujet et seulement 3 personnes : tu, nous, vous.",
    "tu → verbe sans « s » pour les verbes en -er : Parler → Parle. (mais Finir → Finis)",
    "nous → terminaison -ons : Utiliser → Utilisons. · vous → terminaison -ez : Mettre → Mettez.",
    "Forme négative : on encadre le verbe : Ne … pas. → Ne parle pas trop fort.",
    "Pense aussi aux possessifs : avec « tu » → ton/ta/tes ; avec « nous » → notre/nos ; avec « vous » → votre/vos. (ses livres → nos livres)"] },
  { icon:"💬", titre:"Varier la phrase exclamative", tips:[
    "Avec QUE : Que + sujet + verbe + adjectif ! → Que ce quartier est magnifique !",
    "Avec COMME : Comme + sujet + verbe + adjectif ! → Comme ce quartier est magnifique !",
    "Avec QUEL / QUELLE : Quel(le) + nom + adjectif ! → Quel quartier magnifique !",
    "Phrase nominale (sans verbe) : Adjectif, nom ! → Magnifique, ce quartier !",
    "« quel » s'accorde : quel (masc.), quelle (fém.), quels / quelles (pluriel)."] },
  { icon:"🎯", titre:"Mes réflexes pour jeudi", tips:[
    "Type d'abord, forme ensuite : ce sont deux questions différentes pour chaque phrase.",
    "Un point d'exclamation ne veut pas toujours dire « exclamatif » : « Ne cours pas ! » est impératif (ordre, pas de sujet).",
    "À l'impératif, pas de sujet et pas de « s » à « tu » pour les verbes en -er. Relis tes transformations à voix haute."] },
];

/* ---------- types de questions propres à cet outil ---------- */
/* Chaque générateur (gen) d'un paquet est décrit ici : KINDS (types de questions), ordre, étiquettes,
   et dans GENS les fonctions cartes / kinds / fill / face. La couche Langues fournit le reste
   (buildTest, correction, correction en direct, cartes, trois anneaux). */
const KINDS = {
  mcq_type:{ type:"mcq", tag:"type", aspect:"type", consigne:"Quel est le type de cette phrase ?" },
  type_type:{ type:"type", tag:"type", aspect:"type", consigne:"Écris le type de la phrase." },
  mcq_forme:{ type:"mcq", tag:"forme", aspect:"forme", consigne:"Cette phrase est à quelle forme ?" },
  type_forme:{ type:"type", tag:"forme", aspect:"forme", consigne:"Écris la forme de la phrase (positive ou négative)." },
  mcq_ponct:{ type:"mcq", tag:"ponct", aspect:"ponct", consigne:"Choisis le bon signe de ponctuation." },
  mcq_imp:{ type:"mcq", tag:"reperer", aspect:"rep", consigne:"Cette phrase est-elle impérative ?" },
  type_verbe:{ type:"type", tag:"verbe", aspect:"verbe", consigne:"Écris le verbe conjugué à l'impératif." },
  mcq_transfo:{ type:"mcq", tag:"transfo", aspect:"transfo", consigne:"Choisis la bonne transformation." },
  type_transfo:{ type:"type", tag:"transfo", aspect:"transfo", consigne:"Récris la phrase comme demandé." },
};
const KIND_ORDER = ["mcq_type","type_type","mcq_forme","type_forme","mcq_ponct","mcq_imp","type_verbe","mcq_transfo","type_transfo"];
const TAG_LABEL = { type:"type de phrase", forme:"forme", ponct:"ponctuation", reperer:"impérative ?", verbe:"verbe à l'impératif", transfo:"transformation" };

const TYPES = ["déclaratif","interrogatif","impératif","exclamatif"];
const TYPE_REASON = {
  "déclaratif":"elle donne une information et se termine par un point",
  "interrogatif":"elle pose une question et se termine par un point d'interrogation",
  "impératif":"elle donne un ordre ou un conseil, le verbe est à l'impératif et il n'y a pas de sujet",
  "exclamatif":"elle exprime un sentiment ou une émotion (souvent avec que, quel ou comme) et se termine par un point d'exclamation",
};
const FORME_REASON = { "positive":"il n'y a pas de négation", "négative":"il y a une négation (ne… pas, ne… jamais, ne… plus, ne… rien)" };
const TYPE_ACCEPT = {
  "déclaratif":["déclaratif","déclarative"], "interrogatif":["interrogatif","interrogative"],
  "impératif":["impératif","impérative"], "exclamatif":["exclamatif","exclamative"],
};
const FORME_ACCEPT = { "positive":["positive","affirmative"], "négative":["négative","negative"] };

const explType = it => `« ${it.front} » est une phrase ${it.type} : ${TYPE_REASON[it.type]}. — ${it.src}`;
const explForme = it => `« ${it.front} » est à la forme ${it.forme} : ${FORME_REASON[it.forme]}. — ${it.src}`;
const explImp = it => it.imperative
  ? `Oui : le verbe « ${it.verbe} » est à l'impératif et il n'y a pas de sujet. — ${it.src}`
  : `Non : ${it.why}. — ${it.src}`;

/* GENS : un générateur par valeur de `gen` dans DECKS.
   cards(d,it)        → les cartes d'un item : { aspect, mcqOnly, levels }
   kinds(d,it,diff)   → les types de questions à poser pour cet item au niveau diff (easy / normal / hard)
   fill(q,kind,it,d,pool) → remplit q.word, q.options ou q.accept, q.answer, q.expl, q.hint, q.keep
   pool(d)            → réservoir de distracteurs du paquet (facultatif)
   face(d,it)         → recto / verso de la carte à retourner */
const GENS = {
  typeforme:{
    cards:(d, it) => [{ aspect:"type", mcqOnly:false, levels:[0,1,2] }, { aspect:"forme", mcqOnly:false, levels:[0,1,2] }],
    kinds:(d, it, diff) => {
      const kt = diff === "easy" ? "mcq_type" : diff === "hard" ? "type_type" : (Math.random() < 0.5 ? "mcq_type" : "type_type");
      const kf = diff === "easy" ? "mcq_forme" : diff === "hard" ? "type_forme" : (Math.random() < 0.5 ? "mcq_forme" : "type_forme");
      return [kt, kf];
    },
    fill:(q, kind, it) => {
      switch(kind){
        case "mcq_type": q.word = it.front; q.options = shuffle(TYPES.slice()); q.answer = it.type; q.expl = explType(it); break;
        case "type_type": q.word = it.front; q.accept = TYPE_ACCEPT[it.type]; q.answer = it.type; q.keep = false; q.hint = "déclaratif, interrogatif, impératif ou exclamatif"; q.expl = explType(it); break;
        case "mcq_forme": q.word = it.front; q.options = ["positive","négative"]; q.answer = it.forme; q.expl = explForme(it); break;
        case "type_forme": q.word = it.front; q.accept = FORME_ACCEPT[it.forme]; q.answer = it.forme; q.keep = false; q.hint = "positive ou négative"; q.expl = explForme(it); break;
      }
    },
    face:(d, it) => ({ tagF:"La phrase", front:it.front, tagB:"Type et forme", backHtml:`<span class="face-word">${esc(it.type)}</span><span class="face-mini">forme : ${esc(it.forme)}</span>` }),
  },
  regle:{
    cards:() => [{ aspect:"ponct", mcqOnly:true, levels:[0,1,2] }],
    kinds:() => ["mcq_ponct"],
    fill:(q, kind, it) => { q.word = it.front; q.options = it.options.slice(); q.answer = it.back; q.expl = it.expl; },
    face:(d, it) => ({ tagF:"Question", front:it.front, tagB:"Réponse", backHtml:`<span class="face-word">${esc(it.back)}</span>` }),
  },
  imperative:{
    cards:(d, it) => { const out = [{ aspect:"rep", mcqOnly:true, levels:[0,1,2] }]; if (it.imperative) out.push({ aspect:"verbe", mcqOnly:false, levels:[1,2] }); return out; },
    kinds:(d, it, diff) => { const out = ["mcq_imp"]; if (it.imperative && diff !== "easy") out.push("type_verbe"); return out; },
    fill:(q, kind, it) => {
      if (kind === "mcq_imp"){ q.word = it.front; q.options = ["Oui","Non"]; q.answer = it.imperative ? "Oui" : "Non"; q.expl = explImp(it); }
      else { q.word = it.front; q.hint = "le verbe qui donne l'ordre"; q.accept = [it.verbe]; q.answer = it.verbe; q.expl = explImp(it); }
    },
    face:(d, it) => ({ tagF:"La phrase", front:it.front, tagB:"Alors ?", backHtml: it.imperative ? `<span class="face-word">Impérative</span><span class="face-mini">verbe : ${esc(it.verbe)}</span>` : `<span class="face-word">Pas impérative</span>` }),
  },
  transfo:{
    cards:() => [{ aspect:"transfo", mcqOnly:false, levels:[0,1,2] }],
    kinds:(d, it, diff) => [diff === "easy" ? "mcq_transfo" : "type_transfo"],
    pool:d => d.items.map(x => ({ a:x.answer })),
    fill:(q, kind, it, d, pool) => {
      if (kind === "mcq_transfo"){ q.word = it.front; q.options = pickOptions(it.answer, pool, pool, x => x.a); q.answer = it.answer; q.expl = it.expl; }
      else { q.word = it.front; q.accept = it.accept.slice(); q.answer = it.answer; q.keep = true; q.expl = it.expl; }
    },
    face:(d, it) => ({ tagF:"À transformer", front:it.front, tagB:"Une réponse possible", backHtml:`<span class="face-word">${esc(it.answer)}</span>${(it.accept && it.accept.length > 2) ? `<span class="face-mini">(d'autres formulations sont possibles)</span>` : ""}` }),
  },
};

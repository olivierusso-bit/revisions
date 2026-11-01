/* ============================================================
   CONTENU — ALLEMAND — Um sieben Uhr stehe ich auf (ma journée) : Lernwortschatz 1.7 + 1.8
   Outil de révision de Liano — 7e HarmoS (cycle 2)
   Contenu : photo du manuel, chapitre 4 (« Das kenne ich schon » et « Lernwortschatz »),
   surligné en violet = 1.7, surligné en bleu = 1.8.
   Épreuve : jeudi 5 novembre 2026 (vocabulaire 1.7 seulement). Le 1.8 est prêt pour plus tard.
   Ce fichier est la seule partie propre à cet outil. Il est assemblé avec
   claude/couche-langues.js et claude/noyau-quiz.js par claude/assembler.py.
   Reconstruit sur le noyau le 01.11.2026 (v3) à partir de la v2 publiée : mêmes paquets, mêmes réponses acceptées,
   mêmes explications, même tirage des questions, même correction (accents et Umlaute tolérés, ß = ss : pas d'umlautsStricts).
   Gardé pour que l'historique de Liano se relise tel quel : QUIZ_ID et clés de stockage, et l'identité des cartes
   de la v2 (q.card = le mot allemand de l'élément, it.de), donnée à la couche par cards() (k) et reprise par fill.
   Paquet 1.7 seul coché à l'ouverture (OUTIL.paquetsCoches) : l'épreuve du 05.11 ne porte que sur lui.
   ============================================================ */

/* Thème « ma journée » : du lever de soleil (ambre) à la nuit (violet profond), surligneurs violet (1.7) et bleu (1.8) comme dans le manuel.
   Palette, horloge soleil/lune de l'en-tête, repères violet/bleu des sections de la fiche et étiquettes (.chip.<tag>) ;
   la CSS de base vient du noyau (base.css). */
const CSS_THEME = `
:root{
  --floor:#F3EEF8; --sheet:#FFFFFF; --ink:#211733; --soft:#675C7A; --rule:#DCD2E8;
  --court:#6B3FA0; --court-wash:#EFE6F8; --jersey:#2E1F4F; --score:#F2B134; --board:#22163A;
  --good:#1E7A54; --good-wash:#DDF0E6; --bad:#C0392B; --bad-wash:#F9E2DE; --on-court:#FFFFFF;
  --lines:rgba(46,31,79,.09);
  --display:'Fredoka',system-ui,sans-serif;
  --body:'Nunito Sans',system-ui,-apple-system,'Segoe UI',sans-serif;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --floor:#120D1C; --sheet:#1C1629; --ink:#EEE8F6; --soft:#ADA2C2; --rule:#352B48;
  --court:#B99AE8; --court-wash:#2B2142; --jersey:#CDB8EE; --score:#F2B134; --board:#0D0816;
  --good:#5ED3A0; --good-wash:#173326; --bad:#FF8A7D; --bad-wash:#3A1E1B; --on-court:#170F24;
  --lines:rgba(255,255,255,.05); color-scheme:dark}}
:root[data-theme="dark"]{
  --floor:#120D1C; --sheet:#1C1629; --ink:#EEE8F6; --soft:#ADA2C2; --rule:#352B48;
  --court:#B99AE8; --court-wash:#2B2142; --jersey:#CDB8EE; --score:#F2B134; --board:#0D0816;
  --good:#5ED3A0; --good-wash:#173326; --bad:#FF8A7D; --bad-wash:#3A1E1B; --on-court:#170F24;
  --lines:rgba(255,255,255,.05); color-scheme:dark}
:root{--p-ok:#3C9A44;--p-okdark:#1B5E20;--p-mid:#D07A00;--p-low:#C62828;--p-lowsoft:#F1A9A0}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--p-ok:#7BD486;--p-okdark:#3FA34D;--p-mid:#F0A43A;--p-low:#FF8A80;--p-lowsoft:#7A3A35}}
:root[data-theme="dark"]{--p-ok:#7BD486;--p-okdark:#3FA34D;--p-mid:#F0A43A;--p-low:#FF8A80;--p-lowsoft:#7A3A35}
/* raccord avec les noms de couleurs du noyau, rayons de la v2 */
:root{ --paper:var(--floor); --box:var(--court); --crane:var(--score); --focus:var(--score); --scorebox-border:#2B3B55;
  --r-xl:14px; --r-l:12px; --r:10px; --r-m:8px; --r-s:8px; --r-xs:4px; }
body{background-image:radial-gradient(circle at 50% 150px,transparent 96px,var(--lines) 97px,var(--lines) 100px,transparent 101px),
  radial-gradient(circle at 50% 150px,transparent 112px,var(--lines) 113px,var(--lines) 115px,transparent 116px);
  background-repeat:no-repeat;background-attachment:fixed}
.clock{width:66px;height:66px;flex:none}
.head h1{font-size:clamp(27px,8vw,35px);line-height:.98}
.face-word{font-size:28px;line-height:1.15}
.qword{font-size:clamp(24px,7vw,30px);line-height:1.15}
.score-note{color:#15233A}
/* repères violet (1.7) et bleu (1.8) des sections de la fiche, dans l'ordre de FICHE : sections 1 à 3 = 1.7 (tag "17"), section 4 = 1.8 (tag "18") */
.screen > section.entry:nth-of-type(-n+4) .entry-title::after{display:inline-block;font-family:var(--body);font-size:11px;font-weight:700;padding:0 6px;border-radius:4px;margin-left:6px;vertical-align:1px}
.screen > section.entry:nth-of-type(-n+3) .entry-title::after{content:"violet · jeudi";background:#E9DDF7;color:#4E2A80}
.screen > section.entry:nth-of-type(4) .entry-title::after{content:"bleu · plus tard";background:#D6F0F5;color:#0E5A6B}
/* étiquettes des types de questions (sens : couleur de base) */
.chip.allemand{background:var(--bad-wash);color:var(--bad)}
.chip.verbe{background:#FFF1D1;color:#7A4A00}
`;

const QUIZ_ID = "liano-quiz-allemand-quotidien";
const DUE = { iso:"2026-11-05", long:"jeudi 5 novembre", short:"05.11" };
const THEME = "Um sieben Uhr stehe ich auf — 1.7 + 1.8";
const VERSION = { n:3, date:"01.11.2026" };   /* v3 : 01.11.2026, outil reconstruit sur le noyau commun : mêmes contenus et même suivi, scores synchronisés entre appareils sur le site · v1 : 31.10.2026, première version (1.7 violet pour l'épreuve du 05.11, 1.8 bleu pour plus tard, conjugaisons du manuel) · v2 : 01.11.2026, un anneau = un niveau (seuls les tests faits à ce niveau le remplissent) */

/* Tout ce que le noyau affiche ou écrit et qui dépend de l'outil. Jamais d'âge en dur : le noyau le déduit de la classe. */
const OUTIL = {
  eleve:"Liano", classe:"7e HarmoS", branche:"Allemand",
  titre:"Um sieben Uhr stehe ich auf.", sousTitre:"Allemand · ma journée (1.7 + 1.8)",
  jersey:"1.7",
  /* soleil qui se lève d'un côté, lune de l'autre : toute la journée */
  badgeHtml:`<svg class="clock" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="33" cy="33" r="31" fill="var(--jersey)"/>
    <path d="M2 33a31 31 0 0 1 62 0z" fill="#FFE3A3"/>
    <circle cx="33" cy="33" r="11" fill="var(--score)"/>
    <g stroke="var(--score)" stroke-width="3" stroke-linecap="round">
      <line x1="33" y1="8" x2="33" y2="15"/><line x1="15" y1="16" x2="20" y2="21"/><line x1="51" y1="16" x2="46" y2="21"/><line x1="9" y1="30" x2="15" y2="30"/><line x1="57" y1="30" x2="51" y2="30"/>
    </g>
    <rect x="2" y="33" width="62" height="3" fill="var(--sheet)"/>
    <path d="M40 46a8 8 0 1 0 6 11a7 7 0 0 1-6-11z" fill="#F5E9C8"/>
    <circle cx="22" cy="50" r="1.4" fill="#F5E9C8"/><circle cx="28" cy="57" r="1" fill="#F5E9C8"/>
  </svg>`,
  polices:"https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito+Sans:wght@400;700&display=swap",
  introFiche:"Tout le vocabulaire du chapitre est ici : le violet (1.7, pour jeudi) et le bleu (1.8, pour plus tard). Ouvre une partie, lis-la à voix haute, puis passe aux cartes ou au test. ☀️",
  introPaquets:"Choisis ce que tu veux travailler. L'épreuve du jeudi 5 novembre porte sur le <b>1.7</b> (le violet) : il est déjà coché. Le 1.8 (le bleu) est pour plus tard. 🟣",
  paquetsCoches:["v17"],   /* l'épreuve du 05.11 porte sur le 1.7 : seul ce paquet est coché au départ */
  labelTout:"Tout le vocabulaire (1.7 + 1.8)",
  motPaquet:"Paquet",
  sousNiveaux:{ easy:"Je choisis parmi plusieurs réponses", normal:"Je choisis et j'écris", hard:"J'écris tout en allemand" },
  conseilSetup:"En niveau épreuve, tu écris tout en allemand. Pas de panique : la correction ne t'embête pas avec les majuscules, les accents ni la ponctuation. Pour les verbes, écris juste la forme qui manque (par exemple stehst).",
  noteAutre:"Ce n'est pas la même chose : réapprends l'expression en entier.",
  papier:{ titre:"Allemand — Ma journée (Lernwortschatz 1.7 + 1.8)", court:"Allemand ma journée", fichier:"allemand-ma-journee-liano", code:"#PDF-ALLEMAND-MA-JOURNEE" },
  copie:{ titre:"RÉSULTAT — Allemand, ma journée (Lernwortschatz 1.7 + 1.8, épreuve sur le 1.7)" },
  analyse:{
    role:"un professeur d'allemand suisse",
    sujet:"le vocabulaire « ma journée » en allemand (chapitre 4, Lernwortschatz 1.7 : Wann, um drei Uhr, Hausaufgaben machen, einen Film / eine Serie sehen, schlafen, auf|stehen, frühstücken, Zähne putzen, der Unterricht, et les formes ich / du / er-sie de ces verbes ; et 1.8 pour plus tard ; l'épreuve porte sur le 1.7)",
    etiquettes:"sens = traduire vers le français, allemand = produire l'allemand, verbe = conjuguer avec ich / du / er-sie ; entre parenthèses, le paquet",
    pistes:"les fins de verbe (-e, -st, -t, et du putzt), les verbes qui se coupent (auf|stehen → ich stehe auf), l'article der Unterricht, l'orthographe (ü de frühstücken, Zähne), une confusion entre deux expressions proches",
  },
};

/* ---------- SOURCES : d'où vient le contenu ----------
   Photo 1 — manuel, chapitre 4 « Um sieben Uhr stehe ich auf. » (reçue le 31.10.2026).
   Surligné en VIOLET (repère 1.7 écrit à la main) = encadré « Das kenne ich schon » + les 4 premières entrées du Lernwortschatz.
   Surligné en BLEU (repère 1.8) = le reste du Lernwortschatz.
   Les formes conjuguées imprimées sous les verbes (ich / du / er-sie) sont reprises en cartes de conjugaison.
   Le numéro de page n'est pas visible sur la photo (il ne change aucune question). Rien n'a été ajouté. */
const SOURCES = [
  { titre:"Photo 1 — manuel, chapitre 4 « Um sieben Uhr stehe ich auf. »", recue:"31.10.2026", contenu:"Violet 1.7 — Das kenne ich schon : Wann …?, um drei Uhr, Hausaufgaben machen, einen Film / eine Serie sehen, schlafen ; Lernwortschatz : auf|stehen (ich stehe auf, du stehst auf, er/sie steht auf), frühstücken (ich frühstücke, du frühstückst, er/sie frühstückt), Zähne putzen (ich putze, du putzt, er/sie putzt), der Unterricht. Bleu 1.8 : an|fangen (Die Schule fängt um acht Uhr an.), auf|hören (Der Unterricht hört um Viertel vor zwölf auf.), Es gibt Mittagessen., etwas essen, an|rufen (ich rufe an, du rufst an, er/sie ruft an), ins Bett gehen." },
];
const SOURCES_NOTE = "Tout ce qui est surligné est repris mot pour mot, avec la traduction du manuel. Les formes conjuguées viennent des petites lignes imprimées sous les verbes. Quelques traductions proches sont aussi acceptées (par exemple « faire ses devoirs »), pour ne pas te pénaliser. Le numéro de page n'était pas visible sur la photo. La correction de chaque question indique d'où elle vient (1.7 ou 1.8).";
/* Photos : seulement dans la version Claude (privée), jamais sur le site public. url = adresse dans l'espace privé de l'outil. */
const PHOTOS = [
  { titre:"Manuel — chapitre 4, Lernwortschatz 1.7 / 1.8", url:"/_blob/d9a160218458a8cfb6ede388a2204400" },
];

/* ---------- CONTENU : paquets (texte exact du manuel) ----------
   Vocabulaire : de = allemand (affiché), alt = autres écritures acceptées, fr = traductions acceptées (1re = celle du manuel),
   note = info affichée entre parenthèses, tip = petite astuce ajoutée à l'explication.
   Conjugaison (conj:true) : verb = l'infinitif du manuel, gap = la phrase à trou, ans = la forme à écrire, de = la forme complète. */
const C17 = "manuel, chapitre 4, Lernwortschatz (surligné en violet, 1.7)";
const K17 = "manuel, chapitre 4, « Das kenne ich schon » (surligné en violet, 1.7)";
const C18 = "manuel, chapitre 4, Lernwortschatz (surligné en bleu, 1.8)";
const SEP = "Le petit trait dans auf|stehen montre que auf se détache : il part à la fin de la phrase (ich stehe auf).";
const DECKS = [
  { key:"v17", code:"1.7", title:"Ma journée (violet)", emoji:"🟣", unit:"entrées", gen:"voc", src:C17, items:[
    { de:"Wann …?", alt:["Wann?","Wann"], fr:["Quand … ?","quand"], src:K17 },
    { de:"um drei Uhr", fr:["à trois heures"], src:K17, tip:"um + l'heure = « à telle heure »." },
    { de:"Hausaufgaben machen", fr:["faire les devoirs","faire ses devoirs","faire mes devoirs"], src:K17 },
    { de:"einen Film / eine Serie sehen", alt:["einen Film sehen","eine Serie sehen","einen Film oder eine Serie sehen"], fr:["regarder un film / une série","regarder un film","regarder une série","regarder un film ou une série"], src:K17 },
    { de:"schlafen", fr:["dormir"], src:K17 },
    { de:"aufstehen", alt:["auf|stehen"], fr:["se lever"], tip:SEP },
    { de:"frühstücken", fr:["prendre son petit déjeuner","prendre son petit-déjeuner","prendre le petit déjeuner","prendre le petit-déjeuner","déjeuner"] },
    { de:"Zähne putzen", alt:["die Zähne putzen"], fr:["se brosser les dents"] },
    { de:"der Unterricht", alt:["Unterricht"], fr:["le cours, les cours","le cours","les cours"], tip:"Apprends le mot avec son article : der Unterricht." },
    { conj:true, verb:"auf|stehen", gap:"ich ___ auf", ans:"stehe", de:"ich stehe auf", tip:SEP },
    { conj:true, verb:"auf|stehen", gap:"du ___ auf", ans:"stehst", de:"du stehst auf", tip:"Avec du, la fin est -st : du stehst auf." },
    { conj:true, verb:"auf|stehen", gap:"er/sie ___ auf", ans:"steht", de:"er/sie steht auf", tip:"Avec er/sie, la fin est -t : er steht auf." },
    { conj:true, verb:"frühstücken", gap:"ich ___", ans:"frühstücke", de:"ich frühstücke", tip:"Avec ich, la fin est -e : ich frühstücke." },
    { conj:true, verb:"frühstücken", gap:"du ___", ans:"frühstückst", de:"du frühstückst", tip:"Avec du, la fin est -st : du frühstückst." },
    { conj:true, verb:"frühstücken", gap:"er/sie ___", ans:"frühstückt", de:"er/sie frühstückt", tip:"Avec er/sie, la fin est -t : er frühstückt." },
    { conj:true, verb:"Zähne putzen", gap:"ich ___", ans:"putze", de:"ich putze", tip:"Avec ich, la fin est -e : ich putze." },
    { conj:true, verb:"Zähne putzen", gap:"du ___", ans:"putzt", de:"du putzt", tip:"Attention : putzen a déjà un z, donc avec du on écrit seulement putzt (pas de s en plus)." },
    { conj:true, verb:"Zähne putzen", gap:"er/sie ___", ans:"putzt", de:"er/sie putzt", tip:"Avec er/sie aussi : putzt. Avec du et er/sie, c'est la même forme." },
  ]},
  { key:"v18", code:"1.8", title:"Ma journée, suite (bleu)", emoji:"🔵", unit:"entrées", gen:"voc", src:C18, items:[
    { de:"anfangen", alt:["an|fangen"], fr:["commencer"], tip:"an|fangen se coupe aussi : Die Schule fängt um acht Uhr an." },
    { de:"Die Schule fängt um acht Uhr an.", fr:["L'école commence à huit heures."] },
    { de:"aufhören", alt:["auf|hören"], fr:["finir","terminer","se terminer"], tip:"auf|hören se coupe : Der Unterricht hört … auf." },
    { de:"Der Unterricht hört um Viertel vor zwölf auf.", fr:["Les cours se terminent à midi moins le quart.","Le cours se termine à midi moins le quart."] },
    { de:"Es gibt Mittagessen.", fr:["C'est l'heure du dîner."]},
    { de:"etwas essen", fr:["manger quelque chose"] },
    { de:"anrufen", alt:["an|rufen"], fr:["téléphoner / appeler","téléphoner","appeler"] },
    { de:"ins Bett gehen", fr:["aller au lit"] },
    { conj:true, verb:"an|rufen", gap:"ich ___ an", ans:"rufe", de:"ich rufe an", tip:"an se détache et part à la fin : ich rufe an." },
    { conj:true, verb:"an|rufen", gap:"du ___ an", ans:"rufst", de:"du rufst an", tip:"Avec du, la fin est -st : du rufst an." },
    { conj:true, verb:"an|rufen", gap:"er/sie ___ an", ans:"ruft", de:"er/sie ruft an", tip:"Avec er/sie, la fin est -t : er ruft an." },
  ]},
];

/* ---------- CONTENU : fiche ---------- */
const FICHE = [
  { icon:"🟣", titre:"Ce que je connais déjà (1.7)", tag:"17", pairs:[
    ["Wann …?","Quand … ?"],
    ["um drei Uhr","à trois heures"],
    ["Hausaufgaben machen","faire les devoirs"],
    ["einen Film / eine Serie sehen","regarder un film / une série"],
    ["schlafen","dormir"]] },
  { icon:"🌅", titre:"Ma journée (1.7)", tag:"17", pairs:[
    ["auf|stehen","se lever"],
    ["frühstücken","prendre son petit déjeuner"],
    ["Zähne putzen","se brosser les dents"],
    ["der Unterricht","le cours, les cours"]],
    astuce:"Le petit trait dans auf|stehen veut dire que le verbe se coupe en deux : auf part à la fin de la phrase. On dit ich stehe auf (je me lève). Et apprends der Unterricht avec son article der." },
  { icon:"✏️", titre:"Les verbes conjugués (1.7)", tag:"17", pairs:[
    ["ich stehe auf · du stehst auf · er/sie steht auf","auf|stehen"],
    ["ich frühstücke · du frühstückst · er/sie frühstückt","frühstücken"],
    ["ich putze · du putzt · er/sie putzt","Zähne putzen"]],
    astuce:"Regarde les fins de verbe : ich → -e, du → -st, er/sie → -t. Seul piège : putzen a déjà un z, donc du putzt (et pas « putzst »)." },
  { icon:"🔵", titre:"Pour plus tard : la suite (1.8)", tag:"18", pairs:[
    ["an|fangen","commencer"],
    ["Die Schule fängt um acht Uhr an.","L'école commence à huit heures."],
    ["auf|hören","finir"],
    ["Der Unterricht hört um Viertel vor zwölf auf.","Les cours se terminent à midi moins le quart."],
    ["Es gibt Mittagessen.","C'est l'heure du dîner."],
    ["etwas essen","manger quelque chose"],
    ["an|rufen — ich rufe an · du rufst an · er/sie ruft an","téléphoner / appeler"],
    ["ins Bett gehen","aller au lit"]],
    astuce:"Le 1.8 n'est pas dans l'épreuve du jeudi 5 novembre. Tu peux le regarder quand le 1.7 est bien su." },
  { icon:"🎯", titre:"Trois trucs pour jeudi", tips:[
    "L'épreuve porte sur le 1.7 (le violet) : le paquet 1.7 est déjà coché pour toi.",
    "Dis chaque mot à voix haute en faisant le geste (te lever, te brosser les dents, dormir…), puis cache le français et redis-le en allemand.",
    "Récite les trois formes des verbes comme une petite chanson : ich stehe auf, du stehst auf, er steht auf."] },
];

/* DIFFICULTIES et MODES : fournis par le noyau, mêmes libellés ; sous-titres des niveaux de la v2 dans OUTIL.sousNiveaux. */
const KINDS = {
  mcq_sens:{ type:"mcq", tag:"sens", aspect:"carte", lang:"fr", consigne:"Choisis la bonne traduction en français." },
  type_sens:{ type:"type", tag:"sens", aspect:"carte", lang:"fr", consigne:"Traduis en français." },
  mcq_de:{ type:"mcq", tag:"allemand", aspect:"carte", lang:"de", consigne:"Choisis l'allemand qui correspond." },
  type_de:{ type:"type", tag:"allemand", aspect:"carte", lang:"de", consigne:"Écris en allemand." },
  mcq_conj:{ type:"mcq", tag:"verbe", aspect:"carte", lang:"de", consigne:"Choisis la bonne forme du verbe." },
  type_conj:{ type:"type", tag:"verbe", aspect:"carte", lang:"de", consigne:"Écris la bonne forme du verbe." },
};
const KIND_ORDER = ["mcq_sens","type_sens","mcq_de","type_de","mcq_conj","type_conj"];
const TAG_LABEL = { sens:"vers le français", allemand:"vers l'allemand", verbe:"conjugaison" };

/* ---------- explication d'une correction (texte de la v2) ---------- */
function explain(it, deck){
  if (it.conj) return `${it.verb} : ${it.de} — ${it.src || deck.src}, forme imprimée sous le verbe.` + (it.tip ? " " + it.tip : "");
  let t = it.de;
  if (it.note) t += " (" + it.note + ")";
  t += " = " + it.fr[0] + " — " + (it.src || deck.src) + ".";
  if (it.tip) t += " " + it.tip;
  return t;
}
/* type de question pour un élément selon le niveau (tirage de la v2) */
function chooseKind(it, difficulty){
  const r = Math.random();
  if (it.conj) return difficulty === "easy" ? "mcq_conj" : difficulty === "hard" ? "type_conj" : (r < 0.6 ? "type_conj" : "mcq_conj");
  if (difficulty === "easy") return "mcq_sens";
  if (difficulty === "hard") return "type_de";
  return r < 0.7 ? "type_sens" : "mcq_de";
}

/* GENS : un seul générateur, « voc », pour les deux paquets (vocabulaire et conjugaison).
   cards(d,it) → une carte par élément ; k = it.de, l'identité des cartes de la v2 (l'historique de Liano la porte dans q.card),
                 label = it.de, le libellé de la carte dans « les cartes qui résistent » (comme la v2)
   kinds / fill → les questions de la v2 : mêmes types, mêmes choix, mêmes réponses acceptées, même explication
   face(d,it)  → la carte à retourner de la v2 (Deutsch / Français, ou Conjugue · verbe / Réponse) */
const ALL = [0,1,2];
const GENS = {
  voc:{
    label: (d, it) => it.de,
    cards: (d, it) => [{ aspect:"carte", mcqOnly:false, levels:ALL, k:it.de, label:it.de }],
    kinds: (d, it, diff) => [chooseKind(it, diff)],
    fill: (q, kind, it, d) => {
      const K = KINDS[kind];
      /* distracteurs : d'abord le même paquet (comme la v2, qui le complétait par les paquets cochés) ; réserve = tous les paquets.
         Ici le paquet suffit toujours (au moins 3 autres réponses distinctes), sauf pour putzt (verbe complété par wideC, comme la v2). */
      const wide = DECKS.flatMap(x => x.items).filter(x => !x.conj), wideC = DECKS.flatMap(x => x.items).filter(x => x.conj);
      q.card = it.de; q.lang = K.lang; q.keep = true; q.expl = explain(it, d); q.hint = "";
      switch(kind){
        case "mcq_sens": q.word = it.de; q.options = pickOptions(it.fr[0], d.items.filter(x => !x.conj), wide, x => x.fr[0]); q.answer = it.fr[0]; break;
        case "type_sens": q.word = it.de; q.accept = it.fr; q.answer = it.fr[0]; q.keep = false; break;
        case "mcq_de": q.word = it.fr[0]; q.options = pickOptions(it.de, d.items.filter(x => !x.conj), wide, x => x.de); q.answer = it.de; break;
        case "type_de": q.word = it.fr[0]; q.accept = [it.de, ...(it.alt || [])]; q.answer = it.de; break;
        case "mcq_conj": q.word = `${it.verb} : ${it.gap}`; q.options = pickOptions(it.ans, d.items.filter(x => x.conj && x.verb === it.verb), wideC, x => x.ans); q.answer = it.ans; break;
        case "type_conj": q.word = `${it.verb} : ${it.gap}`; q.accept = [it.ans, it.de]; q.answer = it.ans; break;
      }
    },
    face: (d, it) => it.conj
      ? { tagF:"Conjugue · " + it.verb, front:it.gap, tagB:"Réponse", backHtml:`<span class="face-word">${esc(it.de)}</span>` }
      : { tagF:"Deutsch", front:it.de, frontMini:it.note ? "(" + it.note + ")" : "", tagB:"Français", backHtml:`<span class="face-word">${esc(it.fr[0])}</span>` },
  },
};

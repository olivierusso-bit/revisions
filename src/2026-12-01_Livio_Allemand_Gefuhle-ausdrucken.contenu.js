/* ============================================================
   CONTENU — Allemand, chapitre 3 : « Gefühle ausdrücken » (feuille S.3 10H N1-N2, Wort-Schatz S. 18-21)
   Outil de révision de Livio — 10e HarmoS (niveau 2). Échéance (agenda) : devoir « ALL apprendre par cœur expressions
   « Gefühle ausdrücken » », mardi 1er décembre 2026.
   Ce fichier est la seule partie propre à cet outil. Il est assemblé avec
   claude/couche-langues.js et claude/noyau-quiz.js par claude/assembler.py.
   Modèle : 2026-11-24_Livio_Allemand_Wortschatz-Seiten-20-und-21.contenu.js (même chapitre, mêmes réglages).
   Choix signalés au parent (v1) :
   - la feuille ne donne que l'allemand : le français vient des pages 18 à 21 du livre, déjà photographiées pour les outils
     « Wortschatz Seite 18 + 19 » et « Seiten 20 + 21 » ; une phrase française assemble deux traductions du livre
     (Ich finde … = Je trouve…, interessant = intéressant-e → « Je trouve ça intéressant. ») ;
   - « Ich finde das toll. » : pas de traduction dans le livre → seulement la question « Dans quelle colonne ? » ;
   - les 5 lignes en gras de la feuille (encadré □□■ de la p. 19) dans leur propre paquet, coché d'office ;
   - Umlaute exigés (OUTIL.umlautsStricts), ß = ss accepté, comme dans tous les outils d'allemand.
   ============================================================ */

/* Thème « la feuille S.3 » : papier blanc, cadres au surligneur turquoise doublés d'un trait noir, visages gris.
   La seule touche forte : le badge de l'en-tête, les trois visages de la feuille, en gris, dans un cadre surligné.
   Schibsted Grotesk pour les titres, Atkinson Hyperlegible pour le texte. */
const CSS_THEME = `
:root{
  --paper:#F1F4F4; --sheet:#FFFFFF; --ink:#1F2628; --soft:#5B6669; --rule:#D5DDDF;
  --court:#16809B; --court-wash:#E0F2F6; --jersey:#56C3DC; --score:#F2C230; --board:#1F2628;
  --good:#1F7A5A; --good-wash:#DCF1E7; --bad:#B8382A; --bad-wash:#F9E2DE; --on-court:#FFFFFF;
  --p-okdark:#16634A; --p-ok:#1F8A63; --p-mid:#C97A1E; --p-low:#B8382A; --p-lowsoft:#F0C7C0;
  --box:#16809B; --crane:#F2C230; --hl:#56C3DC;
  --display:'Schibsted Grotesk','Arial Narrow',sans-serif;
  --body:'Atkinson Hyperlegible',system-ui,-apple-system,'Segoe UI',sans-serif;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --paper:#121819; --sheet:#1B2325; --ink:#E6EDEE; --soft:#9BAAAD; --rule:#2E3B3E;
  --court:#6FD0E6; --court-wash:#173037; --jersey:#56C3DC; --score:#F2C230; --board:#0C1112;
  --good:#5ED3A0; --good-wash:#15362A; --bad:#FF8A7D; --bad-wash:#3A1E1B; --on-court:#0C1112;
  --p-okdark:#3FB488; --p-ok:#5ED3A0; --p-mid:#E8A24D; --p-low:#FF8A7D; --p-lowsoft:#5A2A25;
  --box:#6FD0E6; --crane:#F2C230; --hl:#3FA9C2; color-scheme:dark}}
:root[data-theme="dark"]{
  --paper:#121819; --sheet:#1B2325; --ink:#E6EDEE; --soft:#9BAAAD; --rule:#2E3B3E;
  --court:#6FD0E6; --court-wash:#173037; --jersey:#56C3DC; --score:#F2C230; --board:#0C1112;
  --good:#5ED3A0; --good-wash:#15362A; --bad:#FF8A7D; --bad-wash:#3A1E1B; --on-court:#0C1112;
  --p-okdark:#3FB488; --p-ok:#5ED3A0; --p-mid:#E8A24D; --p-low:#FF8A7D; --p-lowsoft:#5A2A25;
  --box:#6FD0E6; --crane:#F2C230; --hl:#3FA9C2; color-scheme:dark}
:root{ --focus:var(--court); --scorebox-border:#2A4A52; }
/* le badge : les trois visages de la feuille, en gris, dans un cadre au surligneur doublé d'un trait fin */
.head{align-items:center}
.gef{flex:none;display:flex;gap:2px;padding:6px 7px;border:4px solid var(--hl);outline:1px solid var(--ink);outline-offset:-7px;border-radius:3px;background:var(--sheet);transform:rotate(-2deg)}
.gef span{font-size:22px;line-height:1;filter:grayscale(1) contrast(1.1)}
.head h1{font-weight:800;font-size:clamp(26px,7.4vw,34px);line-height:1;letter-spacing:-.6px}
.lab,.entry-title,.fb-t,.bilan h3{font-weight:700}
.face-word,.qword{font-weight:700;letter-spacing:-.2px}
.score-n{font-weight:800}
/* fiche : chaque colonne de la feuille dans son cadre surligné */
.col{border:3px solid var(--hl);outline:1px solid var(--ink);outline-offset:-6px;border-radius:2px;padding:10px 14px;margin-top:4px}
.col-h{display:flex;align-items:center;gap:8px;font-family:var(--display);font-weight:700;font-size:15px;margin:2px 0 4px}
.col-h span{font-size:22px;filter:grayscale(1)}
.wl{padding:7px 0;border-top:1px solid var(--rule)}
.wl:first-of-type{border-top:0}
.wl .de{font-weight:700;font-size:17px}
.wl .de.gras{font-weight:800;text-decoration:underline;text-decoration-color:var(--hl);text-decoration-thickness:3px;text-underline-offset:3px}
.wl .fr{color:var(--soft);font-size:15px}
.wl .g{font-size:12px;color:var(--soft);font-weight:700}
.paire{display:grid;grid-template-columns:1fr auto 1fr;gap:6px;align-items:center;padding:7px 0;border-top:1px solid var(--rule);font-weight:700;font-size:15px}
.paire:first-child{border-top:0}
.paire b{color:var(--court);font-size:18px}
/* étiquettes des types de questions */
.chip.colonne{background:#E6E9EA;color:#3A4447}
.chip.sens,.chip.allemand{background:#E0F2F6;color:#155F72}
.chip.contraire{background:#FDEFD6;color:#8A5410}
`;

const QUIZ_ID = "livio-quiz-allemand-gefuehle-ausdruecken";
const DUE = { iso:"2026-12-01", long:"mardi 1er décembre", short:"01.12" };
const THEME = "Chapitre 3 — Gefühle ausdrücken (feuille S.3, Wort-Schatz S. 18-21)";
const VERSION = { n:1, date:"28.11.2026" };   /* v1 : 28.11.2026, première version (feuille S.3), devoir du 01.12 */

const OUTIL = {
  eleve:"Livio", classe:"10e HarmoS (niveau 2)", branche:"Allemand",
  titre:"Gefühle ausdrücken", sousTitre:"Allemand · feuille S.3, expressions des pages 18 à 21",
  jersey:"S.3",
  badgeHtml:`<div class="gef" aria-hidden="true"><span>😊</span><span>😐</span><span>😞</span></div>`,
  polices:"https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&family=Atkinson+Hyperlegible:wght@400;700&display=swap",
  introFiche:"Les 39 expressions de ta feuille « Gefühle ausdrücken », à savoir par cœur pour le mardi 1er décembre. Elles sont rangées comme sur la feuille : 😊 à gauche, 😞 à droite, 😐 en bas. Lis-les à voix haute, puis passe aux cartes ou au test.",
  labelTout:"Toute la feuille",
  motPaquet:"Paquet",
  compte:"cartes",
  comptes:[10, 20, 30, 0], compteDefaut:0,
  umlautsStricts:true,
  prefixeIndice:"",
  sousNiveaux:{ easy:"Je choisis parmi plusieurs réponses", hard:"J'écris les phrases en allemand" },
  conseilSetup:"Ordre conseillé : Correction en direct pour fixer l'orthographe (et les Umlaute), puis Épreuve blanche, où tu ne vois aucune réponse avant la fin.",
  noteAutre:"Ce n'est pas la même phrase : relis la ligne de ta feuille et apprends-la en entier.",
  papier:{ titre:"Allemand — Gefühle ausdrücken (feuille S.3)", court:"Allemand Gefühle ausdrücken", fichier:"allemand-gefuehle-ausdruecken-livio", code:"#PDF-ALLEMAND-GEFUEHLE" },
  copie:{ titre:"RÉSULTAT — Allemand, Gefühle ausdrücken (feuille S.3)" },
  analyse:{
    role:"un professeur d'allemand suisse",
    sujet:"les expressions pour dire ses sentiments (feuille « Gefühle ausdrücken », chapitre 3, pages 18 à 21)",
    etiquettes:"colonne = dire si la phrase va dans la colonne 😊, 😞 ou 😐 de la feuille, sens = choisir la traduction française, allemand = écrire la phrase allemande à partir du français, contraire = écrire ou choisir la phrase contraire (ordentlich ≠ unordentlich, gute ≠ schlechte Laune)",
    pistes:"l'Umlaut oublié (glucklich, mude, wutend, angstlich, gefallt, stort, enttauscht), le mauvais verbe (Ich bin au lieu de Ich habe gute Laune, Es geht mir au lieu de Ich bin), « das » oublié dans Ich finde das …, la confusion genervt (énervé) / nervig (énervant) / Es nervt mich (ça m'énerve), sauer / wütend, le mot oublié dans une phrase entière",
  },
};

/* ---------- SOURCES ---------- */
const SOURCES = [
  { titre:"Photo 1 — feuille « S.3 10H N1-N2, Gefühle Ausdrücke aus dem Wort-Schatz S.18-21 »", recue:"28.11.2026", contenu:"Trois cadres surlignés : 😊 (Es geht mir sehr gut. / super. / ganz gut., Ich bin glücklich., Ich finde das cool. / toll. / interessant. / lustig., Ich bin froh. / süss., Ich habe gute Laune., Es gefällt mir., Ich bin romantisch. / ruhig. / ordentlich. / leise., en gras : Ich bin gut drauf.), 😞 (Es geht mir nicht gut. / schlecht., Ich finde das blöd. / langweilig. / traurig., Ich bin sauer. / wütend., Es nervt mich., Ich bin streng. / ängstlich., Ich habe schlechte Laune., Ich mag es nicht., Es gefällt mir nicht., Ich bin unromantisch. / unordentlich. / laut., en gras : Ich bin genervt., Ich bin nervig.), 😐 (Ich bin müde., Es stört mich., en gras : Die Stimmung ist schlecht., Ich bin enttäuscht.)." },
  { titre:"Livre pp. 18 à 21 (photos des 07, 08 et 20.11.2026, outils « Wortschatz Seite 18 + 19 » et « Seiten 20 + 21 »)", recue:"07.11 au 20.11.2026", contenu:"Les traductions françaises : p. 18 (Es geht mir …, glücklich, müde, Ich finde …, blöd, interessant ≠ langweilig, lustig ≠ traurig, froh, sauer, wütend, nerven, streng, süss, ängstlich, gute / schlechte Laune, Ich mag es (nicht), wenn …), p. 19 (Es stört mich, wenn …, Es gefällt mir (nicht), wenn …, romantisch ≠ unromantisch, ruhig, genervt, gut drauf sein, enttäuscht, nervig, Die Stimmung ist schlecht.), p. 20 (ordentlich ≠ unordentlich, leise ≠ laut)." },
];
const SOURCES_NOTE = "Les phrases allemandes et les colonnes viennent de la feuille, et de rien d'autre. La feuille ne donne pas le français : il vient des pages 18 à 21 du livre (déjà photographiées). Quand le livre traduit les deux morceaux séparément, la phrase française les assemble (« Ich finde … » = « Je trouve… » et « interessant » = « intéressant-e » donnent « Je trouve ça intéressant. »). « Ich finde das toll. » n'a pas de traduction dans le livre : il n'a que la question « Dans quelle colonne ? ». Pour « leise », le livre dit « à voix basse » : la phrase française est écrite « Je suis … (à voix basse). ». « Ich habe gute Laune. » et « Ich bin gut drauf. » veulent dire la même chose (le livre traduit les deux par « être de bonne humeur ») : les deux sont acceptées. Les contraires sont ceux que le livre marque avec ≠ (interessant ≠ langweilig, lustig ≠ traurig, romantisch ≠ unromantisch, ordentlich ≠ unordentlich, leise ≠ laut) ou donne ensemble (gute / schlechte Laune, Es gefällt mir (nicht)). Les lignes en gras de la feuille (les mots de l'encadré □□■ du livre, p. 19) sont dans leur propre paquet. Les mauvaises réponses des questions à choix sont d'autres lignes de la feuille, jamais du vocabulaire nouveau. L'agenda donne le devoir « ALL apprendre par cœur expressions « Gefühle ausdrücken » » le mardi 1er décembre.";
const PHOTOS = [
  { titre:"Feuille S.3 « Gefühle ausdrücken »", url:"/_blob/817f3d8ac5315f66e0057248af035898" },
];

/* ---------- CONTENU : paquets ---------- */
/* col : pos = 😊 (colonne de gauche), neg = 😞 (colonne de droite), mid = 😐 (cadre du bas) ; p = page du livre pour le français */
const F = "feuille S.3";
const DECKS = [
  { key:"geht", gen:"expr", title:"Es geht mir …", emoji:"🙂", unit:"phrases", src:F + ", « Es geht mir … »", items:[
    { de:"Es geht mir sehr gut.", fr:"Je vais très bien.", col:"pos", p:18 },
    { de:"Es geht mir super.", fr:"Je vais super.", col:"pos", p:18 },
    { de:"Es geht mir ganz gut.", fr:"Je vais assez bien.", acc:["Es geht mir gut."], col:"pos", p:18 },
    { de:"Es geht mir nicht gut.", fr:"Je ne vais pas bien.", col:"neg", p:18 },
    { de:"Es geht mir schlecht.", fr:"Je vais mal.", col:"neg", p:18 },
  ]},
  { key:"finde", gen:"expr", title:"Ich finde das …", emoji:"💬", unit:"phrases", src:F + ", « Ich finde das … »", items:[
    { de:"Ich finde das cool.", fr:"Je trouve ça cool.", col:"pos", p:18 },
    { de:"Ich finde das toll.", fr:null, col:"pos", p:18 },
    { de:"Ich finde das interessant.", fr:"Je trouve ça intéressant.", col:"pos", p:18 },
    { de:"Ich finde das lustig.", fr:"Je trouve ça drôle.", col:"pos", p:18 },
    { de:"Ich finde das blöd.", fr:"Je trouve ça stupide.", col:"neg", p:18 },
    { de:"Ich finde das langweilig.", fr:"Je trouve ça ennuyeux.", col:"neg", p:18 },
    { de:"Ich finde das traurig.", fr:"Je trouve ça triste.", col:"neg", p:18 },
  ]},
  { key:"bin", gen:"expr", title:"Ich bin …", emoji:"🧍", unit:"phrases", src:F + ", « Ich bin … »", items:[
    { de:"Ich bin glücklich.", fr:"Je suis heureux / heureuse.", col:"pos", p:18 },
    { de:"Ich bin froh.", fr:"Je suis content-e.", col:"pos", p:18 },
    { de:"Ich bin süss.", fr:"Je suis mignon / mignonne.", col:"pos", p:18 },
    { de:"Ich bin romantisch.", fr:"Je suis romantique.", col:"pos", p:19 },
    { de:"Ich bin ruhig.", fr:"Je suis tranquille.", col:"pos", p:19 },
    { de:"Ich bin ordentlich.", fr:"Je suis ordonné-e.", col:"pos", p:20 },
    { de:"Ich bin leise.", fr:"Je suis … (à voix basse).", col:"pos", p:20 },
    { de:"Ich bin sauer.", fr:"Je suis fâché-e.", col:"neg", p:18 },
    { de:"Ich bin wütend.", fr:"Je suis furieux / furieuse.", col:"neg", p:18 },
    { de:"Ich bin streng.", fr:"Je suis strict-e, sévère.", col:"neg", p:18 },
    { de:"Ich bin ängstlich.", fr:"Je suis anxieux / anxieuse.", col:"neg", p:18 },
    { de:"Ich bin unromantisch.", fr:"Je ne suis pas romantique.", col:"neg", p:19 },
    { de:"Ich bin unordentlich.", fr:"Je suis désordonné-e.", col:"neg", p:20 },
    { de:"Ich bin laut.", fr:"Je suis bruyant-e.", col:"neg", p:20 },
    { de:"Ich bin müde.", fr:"Je suis fatigué-e.", col:"mid", p:18 },
  ]},
  { key:"mir", gen:"expr", title:"Laune, gefällt mir, nervt mich …", emoji:"🌦️", unit:"phrases", src:F + ", « Ich habe … Laune », « Es … mir / mich »", items:[
    { de:"Ich habe gute Laune.", fr:"Je suis de bonne humeur.", acc:["Ich bin gut drauf."], hint:"deux phrases possibles sur ta feuille", col:"pos", p:18 },
    { de:"Es gefällt mir.", fr:"Ça me plaît.", col:"pos", p:19, proche:["Ich mag es nicht."] },
    { de:"Ich habe schlechte Laune.", fr:"Je suis de mauvaise humeur.", col:"neg", p:18 },
    { de:"Ich mag es nicht.", fr:"Je n'aime pas ça.", hint:"avec « mögen »", col:"neg", p:18, proche:["Es gefällt mir nicht.","Es gefällt mir."] },
    { de:"Es gefällt mir nicht.", fr:"Ça ne me plaît pas.", hint:"avec « gefallen »", col:"neg", p:19, proche:["Ich mag es nicht."] },
    { de:"Es nervt mich.", fr:"Ça m'énerve.", col:"neg", p:18, proche:["Es stört mich."] },
    { de:"Es stört mich.", fr:"Ça me dérange.", col:"mid", p:19, proche:["Es nervt mich."] },
  ]},
  { key:"gras", gen:"expr", title:"Les lignes en gras (encadré □□■)", emoji:"🖍️", unit:"phrases", src:F + ", lignes en gras", items:[
    { de:"Ich bin gut drauf.", fr:"Je suis de bonne humeur.", acc:["Ich habe gute Laune."], hint:"deux phrases possibles sur ta feuille", col:"pos", p:19, gras:true },
    { de:"Ich bin genervt.", fr:"Je suis énervé-e, agacé-e.", col:"neg", p:19, gras:true },
    { de:"Ich bin nervig.", fr:"Je suis énervant-e.", col:"neg", p:19, gras:true },
    { de:"Die Stimmung ist schlecht.", fr:"L'ambiance est mauvaise.", col:"mid", p:19, gras:true },
    { de:"Ich bin enttäuscht.", fr:"Je suis déçu-e.", col:"mid", p:19, gras:true },
  ]},
  { key:"contr", gen:"contr", title:"Les contraires (≠)", emoji:"↔️", unit:"phrases", src:F + ", phrases contraires des colonnes 😊 et 😞", items:[
    { a:"Ich finde das interessant.", b:"Ich finde das langweilig.", p:18 },
    { a:"Ich finde das langweilig.", b:"Ich finde das interessant.", p:18 },
    { a:"Ich finde das lustig.", b:"Ich finde das traurig.", p:18 },
    { a:"Ich finde das traurig.", b:"Ich finde das lustig.", p:18 },
    { a:"Ich bin romantisch.", b:"Ich bin unromantisch.", p:19 },
    { a:"Ich bin unromantisch.", b:"Ich bin romantisch.", p:19 },
    { a:"Ich bin ordentlich.", b:"Ich bin unordentlich.", p:20 },
    { a:"Ich bin unordentlich.", b:"Ich bin ordentlich.", p:20 },
    { a:"Ich bin leise.", b:"Ich bin laut.", p:20 },
    { a:"Ich bin laut.", b:"Ich bin leise.", p:20 },
    { a:"Ich habe gute Laune.", b:"Ich habe schlechte Laune.", p:18 },
    { a:"Ich habe schlechte Laune.", b:"Ich habe gute Laune.", p:18 },
    { a:"Es gefällt mir.", b:"Es gefällt mir nicht.", p:19 },
    { a:"Es gefällt mir nicht.", b:"Es gefällt mir.", p:19 },
  ]},
];

/* ---------- fiche ---------- */
const COL = { pos:"😊 colonne de gauche", neg:"😞 colonne de droite", mid:"😐 cadre du bas" };
const COL_OPTS = [COL.pos, COL.neg, COL.mid];
const EXPR = DECKS.filter(d => d.gen === "expr").flatMap(d => d.items);
/* ordre de la feuille, colonne par colonne */
const ORDRE_FEUILLE = {
  pos:["Es geht mir sehr gut.","Es geht mir super.","Es geht mir ganz gut.","Ich bin glücklich.","Ich finde das cool.","Ich finde das toll.","Ich finde das interessant.","Ich finde das lustig.","Ich bin froh.","Ich bin süss.","Ich habe gute Laune.","Es gefällt mir.","Ich bin romantisch.","Ich bin ruhig.","Ich bin ordentlich.","Ich bin leise.","Ich bin gut drauf."],
  neg:["Es geht mir nicht gut.","Es geht mir schlecht.","Ich finde das blöd.","Ich finde das langweilig.","Ich finde das traurig.","Ich bin sauer.","Ich bin wütend.","Es nervt mich.","Ich bin streng.","Ich bin ängstlich.","Ich habe schlechte Laune.","Ich mag es nicht.","Es gefällt mir nicht.","Ich bin unromantisch.","Ich bin unordentlich.","Ich bin laut.","Ich bin genervt.","Ich bin nervig."],
  mid:["Ich bin müde.","Es stört mich.","Die Stimmung ist schlecht.","Ich bin enttäuscht."],
};
const colonne = (c, titre) => `<div class="col"><p class="col-h"><span aria-hidden="true">${c === "pos" ? "😊" : c === "neg" ? "😞" : "😐"}</span>${esc(titre)}</p>` +
  ORDRE_FEUILLE[c].map(de => { const it = EXPR.find(x => x.de === de);
    return `<div class="wl"><div class="de${it.gras ? " gras" : ""}">${esc(it.de)}</div><div class="fr">${it.fr ? esc(it.fr) : "(pas de traduction dans le livre)"}</div>${it.gras ? `<div class="g">en gras sur ta feuille</div>` : ""}</div>`; }).join("") + `</div>`;
const paires = () => DECKS.find(d => d.key === "contr").items.filter((x, i) => i % 2 === 0)
  .map(x => `<div class="paire"><span>${esc(x.a)}</span><b aria-label="contraire de">≠</b><span>${esc(x.b)}</span></div>`).join("");
const FICHE = [
  { icon:"😊", titre:"Colonne de gauche : ça va bien", count:17, html:() => colonne("pos", "17 phrases, dont 1 en gras"),
    astuce:"Ich habe gute Laune et Ich bin gut drauf disent la même chose : je suis de bonne humeur. Attention au verbe : on a (habe) une bonne humeur, mais on est (bin) gut drauf." },
  { icon:"😞", titre:"Colonne de droite : ça ne va pas", count:18, html:() => colonne("neg", "18 phrases, dont 2 en gras"),
    astuce:"Trois façons de dire que ça énerve : Es nervt mich (ça m'énerve), Ich bin genervt (je suis énervé-e), Ich bin nervig (je suis énervant-e : c'est moi qui énerve les autres !)." },
  { icon:"😐", titre:"Cadre du bas : entre les deux", count:4, html:() => colonne("mid", "4 phrases, dont 2 en gras"),
    astuce:"Seule phrase sans « Ich » ni « Es » au début : Die Stimmung ist schlecht (l'ambiance est mauvaise)." },
  { icon:"↔️", titre:"Les contraires (≠)", count:7, html:paires,
    astuce:"Le contraire se fait de trois façons sur ta feuille : un autre mot (interessant ≠ langweilig, leise ≠ laut), un-devant le mot (ordentlich ≠ unordentlich), ou nicht à la fin (Es gefällt mir ≠ Es gefällt mir nicht)." },
  { icon:"🎯", titre:"Mes réflexes pour le devoir", tips:[
    "Les Umlaute comptent : glücklich, müde, süss, wütend, ängstlich, gefällt, stört, enttäuscht. Dans cet outil, « mude » au lieu de « müde » est faux.",
    "Quatre débuts de phrase à connaître : Es geht mir … (comment je vais), Ich finde das … (ce que je pense d'une chose), Ich bin … (comment je suis), Ich habe … Laune (mon humeur).",
    "N'oublie pas « das » : Ich finde das cool, pas « Ich finde cool ».",
    "Apprends chaque ligne en entier, avec son point : c'est une phrase, pas un mot seul.",
    "Lis la feuille colonne par colonne, cache l'allemand, et redis chaque phrase à partir du français."] },
];

/* ---------- types de questions ---------- */
const KINDS = {
  mcq_col:    { type:"mcq",  tag:"colonne",   aspect:"col",   consigne:"Dans quelle colonne de ta feuille est cette phrase ?" },
  mcq_sens:   { type:"mcq",  tag:"sens",      aspect:"sens",  consigne:"Choisis la traduction en français." },
  type_sens:  { type:"type", tag:"allemand",  aspect:"sens",  consigne:"Écris la phrase en allemand." },
  mcq_contr:  { type:"mcq",  tag:"contraire", aspect:"contr", consigne:"Choisis la phrase contraire (≠)." },
  type_contr: { type:"type", tag:"contraire", aspect:"contr", consigne:"Écris la phrase contraire (≠) en allemand." },
};
const KIND_ORDER = ["mcq_col","mcq_sens","type_sens","mcq_contr","type_contr"];
const TAG_LABEL = { colonne:"😊 😞 😐", sens:"traduction", allemand:"phrase en allemand", contraire:"contraire" };

/* utilitaires du contenu (repris du modèle Wortschatz Seiten 20 + 21) */
function fillOpts(good, cands, pool, n = 4){
  const out = [good], seen = new Set([norm(good)]);
  const add = v => { if (out.length >= n || !v) return; const k = norm(v); if (seen.has(k)) return; seen.add(k); out.push(v); };
  cands.forEach(add); shuffle(pool).forEach(add);
  return shuffle(out);
}
const choix = (diff, m, t) => diff === "easy" ? m : diff === "hard" ? t : (Math.random() < 0.5 ? m : t);
const ALL = [0,1,2];
const debut = s => s.split(" ").slice(0, 2).join(" ");
function finir(q){
  q.prompt = `${q.consigne} « ${q.word} »${q.hint ? " (" + q.hint + ")" : ""}`;
  q.label = q.word + (q.hint ? " (" + q.hint + ")" : "");
}
const face = (tag, front, frontMini, back, mini) => ({ tagF:TAG_LABEL[tag], front, frontMini, tagB:"Réponse", backHtml:`<span class="face-word">${esc(back)}</span><span class="face-mini">${esc(mini)}</span>` });
const srcDe = (it, d) => `${F}, ${COL[it.col]}${it.gras ? ", en gras" : ""}${it.fr ? " ; français : livre p. " + it.p : ""}`;

const GENS = {
  expr:{
    label: (d, it) => it.de,
    cards: (d, it) => { const out = [{ aspect:"col", mcqOnly:true, levels:ALL }];
      if (it.fr) out.push({ aspect:"sens", mcqOnly:false, levels:ALL });
      return out; },
    kinds: (d, it, diff) => it.fr ? ["mcq_col", choix(diff, "mcq_sens", "type_sens")] : ["mcq_col"],
    base: (it, d) => `${it.de}${it.fr ? " = " + it.fr : ""} · ${COL[it.col]}${it.acc ? ". Aussi juste : " + it.acc.join(" / ") : ""} — ${srcDe(it, d)}.`,
    fill: (q, kind, it, d) => {
      q.expl = GENS.expr.base(it, d); q.keep = true; q.card = cardKey(d.key, it.de, KINDS[kind].aspect);
      switch(kind){
        case "mcq_col":  q.word = it.de; q.options = COL_OPTS.slice(); q.answer = COL[it.col]; break;
        case "mcq_sens": q.word = it.de; q.answer = it.fr;
          q.options = fillOpts(it.fr, [], d.items.filter(x => x.fr && x.fr !== it.fr && !(it.proche || []).includes(x.de) && !(it.acc || []).includes(x.de)).map(x => x.fr)); break;
        case "type_sens": q.word = it.fr; q.hint = it.hint || ""; q.lang = "de"; q.accept = [it.de, ...(it.acc || [])]; q.answer = it.de; break;
      }
      finir(q);
    },
    face: (d, it) => { const base = GENS.expr.base(it, d), out = [face("colonne", it.de, "dans quelle colonne ?", COL[it.col], base)];
      if (it.fr) out.push(face("allemand", it.fr, it.hint || "", it.de, base));
      return out; },
  },
  contr:{
    label: (d, it) => it.a,
    cards: () => [{ aspect:"contr", mcqOnly:false, levels:ALL }],
    kinds: (d, it, diff) => [choix(diff, "mcq_contr", "type_contr")],
    base: (it, d) => `${it.a} ≠ ${it.b} — ${F}, colonnes 😊 et 😞 ; contraire : livre p. ${it.p}.`,
    fill: (q, kind, it, d) => {
      q.word = it.a; q.expl = GENS.contr.base(it, d); q.keep = true; q.lang = "de";
      if (kind === "mcq_contr"){
        /* distracteurs : d'autres lignes de la feuille, avec un autre début de phrase (jamais un autre contraire possible) */
        q.options = fillOpts(it.b, [], d.items.map(x => x.b).filter(b => b !== it.b && b !== it.a && debut(b) !== debut(it.a)));
        q.answer = it.b;
      } else { q.accept = [it.b]; q.answer = it.b; }
      finir(q);
    },
    face: (d, it) => [face("contraire", it.a + " ≠ ?", "", it.b, GENS.contr.base(it, d))],
  },
};

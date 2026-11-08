/* ============================================================
   CONTENU — Allemand, chapitre 3 « Wie geht's denn so? » : Wortschatz Seite 18 und 19 (les émotions)
   Outil de révision de Livio — 10e HarmoS (niveau 2). Échéances (agenda) : devoir « ALL Seite 18 Ws » mardi 10 novembre 2026,
   devoir « ALL Seite 19 » et test « Wortschatzkontrolle Seite 18+19 » mercredi 18 novembre 2026.
   Nom avant la v2 : 2026-11-10_Livio_Allemand_Wie-geht-s-denn-so-Seite-18 (même QUIZ_ID : l'historique est gardé).
   Ce fichier est la seule partie propre à cet outil. Il est assemblé avec
   claude/couche-langues.js et claude/noyau-quiz.js par claude/assembler.py.
   Modèle : 2026-11-03_Livio_Allemand_Komparativ-und-Superlativ.contenu.js (même famille, mêmes réglages).
   Choix signalés au parent (v1) :
   - les Umlaute (ä, ö, ü) ne sont PAS tolérés à la correction (OUTIL.umlautsStricts), comme dans l'outil Komparativ :
     « mude » au lieu de « müde » est faux, comme au test. ß = ss reste accepté (süss / süß). Touches ä ö ü sous le champ.
   - les phrases à barres obliques du livre (« Es geht mir sehr gut / super / (ganz) gut / nicht gut / schlecht. ») sont
     découpées en une carte par variante, avec la traduction que donne le livre pour chacune.
   ============================================================ */

/* Thème « l'humeur-o-mètre » : la page parle de comment on se sent, du plus orageux (wütend) au plus ensoleillé (glücklich).
   Encre prune, violet indigo, soleil ; la seule touche forte est la bulle « Na? » de l'en-tête et son échelle de cinq humeurs.
   Bricolage Grotesque pour les titres (une grotesque expressive, qui parle), Atkinson Hyperlegible pour le texte. */
const CSS_THEME = `
:root{
  --paper:#EEEDF5; --sheet:#FFFFFF; --ink:#241A38; --soft:#625A75; --rule:#D9D5E4;
  --court:#4B3A8C; --court-wash:#ECE8F7; --jersey:#F0A23A; --score:#F7C948; --board:#241A38;
  --good:#1F7A5A; --good-wash:#DCF1E7; --bad:#B8382A; --bad-wash:#F9E2DE; --on-court:#FFFFFF;
  --p-okdark:#16634A; --p-ok:#1F8A63; --p-mid:#D07F22; --p-low:#B8382A; --p-lowsoft:#F0C7C0;
  --box:#4B3A8C; --crane:#F0A23A;
  --m1:#C2412D; --m2:#E07B39; --m3:#8A93B0; --m4:#F2C14E; --m5:#3FA37A;
  --display:'Bricolage Grotesque','Arial Narrow',sans-serif;
  --body:'Atkinson Hyperlegible',system-ui,-apple-system,'Segoe UI',sans-serif;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --paper:#15111F; --sheet:#1F1A2C; --ink:#ECE8F4; --soft:#A79FBA; --rule:#342C46;
  --court:#A996F0; --court-wash:#2A2342; --jersey:#F2B45A; --score:#F7C948; --board:#0E0B16;
  --good:#5ED3A0; --good-wash:#15362A; --bad:#FF8A7D; --bad-wash:#3A1E1B; --on-court:#0E0B16;
  --p-okdark:#3FB488; --p-ok:#5ED3A0; --p-mid:#E8A24D; --p-low:#FF8A7D; --p-lowsoft:#5A2A25;
  --box:#A996F0; --crane:#F2B45A; color-scheme:dark}}
:root[data-theme="dark"]{
  --paper:#15111F; --sheet:#1F1A2C; --ink:#ECE8F4; --soft:#A79FBA; --rule:#342C46;
  --court:#A996F0; --court-wash:#2A2342; --jersey:#F2B45A; --score:#F7C948; --board:#0E0B16;
  --good:#5ED3A0; --good-wash:#15362A; --bad:#FF8A7D; --bad-wash:#3A1E1B; --on-court:#0E0B16;
  --p-okdark:#3FB488; --p-ok:#5ED3A0; --p-mid:#E8A24D; --p-low:#FF8A7D; --p-lowsoft:#5A2A25;
  --box:#A996F0; --crane:#F2B45A; color-scheme:dark}
:root{ --focus:var(--jersey); --scorebox-border:#3A2D66; }
/* la bulle « Na? » de l'en-tête, avec l'échelle des humeurs du livre : wütend · sauer · müde · froh · glücklich */
.head{align-items:center}
.na{flex:none;display:flex;flex-direction:column;align-items:center;gap:6px}
.na-bulle{position:relative;background:var(--court);color:#fff;font-family:var(--display);font-weight:800;font-size:24px;line-height:1;padding:10px 13px 11px;border-radius:18px 18px 18px 4px}
.na-echelle{display:flex;gap:3px}
.na-echelle i{display:block;width:9px;height:9px;border-radius:50%}
.na-echelle i:nth-child(1){background:var(--m1)} .na-echelle i:nth-child(2){background:var(--m2)} .na-echelle i:nth-child(3){background:var(--m3)}
.na-echelle i:nth-child(4){background:var(--m4)} .na-echelle i:nth-child(5){background:var(--m5)}
.head h1{font-weight:800;font-size:clamp(27px,8vw,36px);line-height:1;letter-spacing:-.4px}
.lab,.entry-title,.fb-t,.bilan h3{font-weight:700}
.face-word,.qword{font-weight:700;letter-spacing:-.2px}
.score-n{font-weight:800}
/* la fiche : une ligne par mot, avec la couleur de son humeur quand le livre en donne une */
.gef{display:grid;grid-template-columns:6px 1fr;gap:0 10px;padding:9px 0;border-top:1px solid var(--rule)}
.gef:first-child{border-top:0}
.gef s{text-decoration:none;border-radius:3px;background:var(--rule)}
.gef .de{font-weight:700;font-size:17px}
.gef .fr{color:var(--soft);font-size:15px}
.gef .ex{font-size:15px;margin-top:3px}
.gef .ex i{color:var(--soft)}
.gef.m1 s{background:var(--m1)} .gef.m2 s{background:var(--m2)} .gef.m3 s{background:var(--m3)} .gef.m4 s{background:var(--m4)} .gef.m5 s{background:var(--m5)}
/* étiquettes des types de questions */
.chip.allemand{background:#ECE8F7;color:#4B3A8C}
.chip.contraire{background:#FDEFD6;color:#8A5410}
.chip.verbe{background:#F7E2DC;color:#9A3C27}
.chip.phrase{background:#E2F1EA;color:#1F6A4C}
.chip.article,.chip.pluriel{background:#E3EAF5;color:#2D4B7A}
`;

const QUIZ_ID = "livio-quiz-allemand-seite18-gefuehle";
const DUE = { iso:"2026-11-18", long:"mercredi 18 novembre", short:"18.11" };
const THEME = "Chapitre 3 — Wie geht's denn so? (Wortschatz Seite 18 und 19)";
const VERSION = { n:2, date:"08.11.2026" };   /* v1 : 07.11.2026, première version (Seite 18) · v2 : 08.11.2026, page 19 ajoutée, titre « Wortschatz Seite 18 + 19 », test du 18.11 */

/* Tout ce que le noyau affiche ou écrit et qui dépend de l'outil. Jamais d'âge en dur : le noyau le déduit de la classe. */
const OUTIL = {
  eleve:"Livio", classe:"10e HarmoS (niveau 2)", branche:"Allemand",
  titre:"Wortschatz Seite 18 + 19", sousTitre:"Allemand · chapitre 3 « Wie geht's denn so? » · Wortschatzkontrolle",
  jersey:"Na?",
  badgeHtml:`<div class="na" aria-hidden="true"><span class="na-bulle">Na?</span><span class="na-echelle"><i></i><i></i><i></i><i></i><i></i></span></div>`,
  polices:"https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap",
  introFiche:"Tout le vocabulaire des pages 18 et 19 : la page 18 pour le devoir du mardi 10 novembre, les deux pages pour la Wortschatzkontrolle du mercredi 18 novembre. Chaque section et chaque paquet dit de quelle page il vient. Lis à voix haute, puis passe aux cartes ou au test.",
  labelTout:"Pages 18 et 19",
  motPaquet:"Paquet",
  compte:"cartes",
  comptes:[10, 20, 30, 0], compteDefaut:0,
  umlautsStricts:true,
  prefixeIndice:"",
  sousNiveaux:{ easy:"Je choisis parmi plusieurs réponses", hard:"J'écris tout en allemand" },
  conseilSetup:"Pour mardi, coche seulement les paquets « p. 18 ». Ordre conseillé : Correction en direct pour fixer l'orthographe (et les Umlaute), puis Épreuve blanche, où tu ne vois aucune réponse avant la fin, comme au contrôle.",
  noteAutre:"Ce n'est pas le même mot : apprends-le en entier.",
  papier:{ titre:"Allemand — Wortschatz Seite 18 + 19 (Wie geht's denn so?)", court:"Allemand Seite 18 + 19", fichier:"allemand-wortschatz-seite18-19-livio", code:"#PDF-ALLEMAND-SEITE18-19" },
  copie:{ titre:"RÉSULTAT — Allemand, Wortschatz Seite 18 + 19 (Wie geht's denn so?)" },
  analyse:{
    role:"un professeur d'allemand suisse",
    sujet:"le vocabulaire des émotions, pages 18 et 19 du chapitre 3 « Wie geht's denn so? » (Wortschatzkontrolle)",
    etiquettes:"allemand = traduire un mot ou une phrase, contraire = trouver le contraire (interessant ≠ langweilig, lustig ≠ traurig, romantisch ≠ unromantisch), verbe = forme avec er au présent ou au passé (er nervt, er hat sich gefreut, er regt sich auf, er hat sich gestritten), article = der / die / das, pluriel, phrase = compléter une phrase du livre",
    pistes:"l'Umlaut oublié (mude au lieu de müde, wutend, argern, enttauscht), deux mots confondus (froh et glücklich, sauer et wütend, genervt et nervig), l'auxiliaire hat / ist au passé, le « sich » oublié ou mal placé, la particule séparable (er regt sich auf, hat sich aufgeregt), le participe irrégulier gestritten, mir / Ihnen, gute / schlechte Laune",
  },
};

/* ---------- SOURCES ---------- */
const SOURCES = [
  { titre:"Photo 1 — livre p. 18", recue:"07.11.2026", contenu:"Chapitre 3 « Wie geht's denn so? » : encadré gris « Das kennst du schon » (Wie geht's?, Es geht mir …, glücklich, müde, Ich finde …, interessant ≠ langweilig, lustig ≠ traurig), les mots nouveaux (froh, sauer, wütend, nerven, streng, süss, ängstlich) avec leurs phrases, et l'encadré bleu (Was ist (denn) los?, gute / schlechte Laune, Ich mag es (nicht), wenn …)." },
  { titre:"Photo 2 — livre p. 19", recue:"08.11.2026", contenu:"Suite de l'encadré bleu (Es stört mich, wenn …, Es gefällt mir (nicht), wenn …, romantisch ≠ unromantisch, ruhig), encadré bleu marqué □□■ (genervt, gut drauf sein, enttäuscht, nervig, die Stimmung), « Freude/Ärger haben » (sich freuen, reden, lieben, lachen, sich ärgern, der Ärger, weinen) et encadré bleu marqué □■■ (sich auf|regen, der Streit, sich streiten), avec leurs phrases." },
];
const SOURCES_NOTE = "Tout vient des pages 18 et 19, et de rien d'autre. Pas de question sur « cool » (même mot en allemand et en français), ni sur les petits signes de prononciation du livre (voyelles soulignées ou pointées). Les mauvaises réponses proposées dans les questions à choix sont des pièges fabriqués pour l'exercice (lettre oubliée, mauvais mot de la page), jamais du vocabulaire à apprendre. Le titre « Freude/Ärger haben = Plaisirs et problèmes » de la page 19 n'est pas interrogé (c'est un titre de rubrique). Les petits carrés devant les encadrés bleus (□■■ en p. 18 et en bas de la p. 19, □□■ au milieu de la p. 19) indiquent sans doute un niveau, mais la photo ne le dit pas : tout est repris, et l'encadré □□■ a son propre paquet pour pouvoir le décocher. L'agenda donne le devoir « ALL Seite 18 Ws » (mardi 10.11), puis « ALL Seite 19 » et la « Wortschatzkontrolle Seite 18+19 » (mercredi 18.11).";
const PHOTOS = [
  { titre:"Livre p. 18", url:"/_blob/f38ad497558ba1dcb114b19aac2e5940" },
  { titre:"Livre p. 19", url:"/_blob/0ac86bc1264e1ab54b8112d719f94255" },
];

/* ---------- CONTENU : paquets ----------
   mot    : de (allemand), fr[] (fr[0] = forme affichée), alt[] (autres écritures allemandes acceptées),
            contr (le contraire du livre), pres / pp (formes du verbe avec er), art / pl (article et pluriel d'un nom), src (endroit précis de la page)
   phrase : s (phrase avec ___), h (indice en français), acc[] (réponses écrites acceptées), o[] (choix, o[0] = la bonne), fr (traduction du livre) */
const P = "livre p. 18", Q = "livre p. 19";
const DECKS = [
  { key:"kennst", gen:"mot", title:"p. 18 · Das kennst du schon", emoji:"👋", unit:"entrées", src:P + ", encadré gris « Das kennst du schon »", items:[
    { de:"Na, wie geht's?", alt:["Na, wie geht es?"], fr:["Alors, ça va ?"], src:P + ", « Na, wie geht's? »" },
    { de:"Wie geht's?", alt:["Wie geht es?"], fr:["Comment ça va ?"] },
    { de:"Wie geht es Ihnen?", fr:["Comment allez-vous ?"] },
    { de:"Es geht mir sehr gut.", fr:["Je vais très bien."] },
    { de:"Es geht mir super.", fr:["Je vais super."] },
    { de:"Es geht mir (ganz) gut.", alt:["Es geht mir gut.","Es geht mir ganz gut."], fr:["Je vais assez bien."] },
    { de:"Es geht mir nicht gut.", fr:["Je ne vais pas bien."] },
    { de:"Es geht mir schlecht.", fr:["Je vais mal."] },
    { de:"Ich bin glücklich.", fr:["Je suis heureux / heureuse."] },
    { de:"Ich bin müde.", fr:["Je suis fatigué-e."] },
    { de:"Ich finde …", alt:["Ich finde"], fr:["Je trouve…"] },
    { de:"blöd", fr:["stupide"], src:P + ", encadré gris, « Ich finde … cool/toll/blöd. »" },
    { de:"interessant", fr:["intéressant-e"], contr:"langweilig", contrO:["langweilig","traurig","lustig","müde"] },
    { de:"langweilig", fr:["ennuyeux / ennuyeuse"], contr:"interessant", contrO:["interessant","lustig","glücklich","toll"] },
    { de:"lustig", fr:["drôle, amusant-e"], contr:"traurig", contrO:["traurig","langweilig","müde","blöd"] },
    { de:"traurig", fr:["triste"], contr:"lustig", contrO:["lustig","interessant","froh","toll"] },
  ]},
  { key:"neu", gen:"mot", title:"p. 18 · Les mots nouveaux", emoji:"🌦️", unit:"mots", src:P + ", mots nouveaux", items:[
    { de:"froh", fr:["content-e"], m:4, ex:"Ich bin froh, wenn du kommst.", exFr:"Je suis content-e si tu viens." },
    { de:"sauer", fr:["fâché-e (acide)"], m:2, ex:"Er ist sauer, wenn er warten muss.", exFr:"Il est fâché quand il doit attendre." },
    { de:"wütend", fr:["furieux / furieuse"], m:1 },
    { de:"nerven", fr:["énerver, agacer"], m:2, pres:"er nervt", presAcc:["nervt","er nervt"], presO:["er nervt","er nerft","er nervet","er nervst"],
      pp:"er hat genervt", ppAcc:["hat genervt","er hat genervt"], ppO:["er hat genervt","er ist genervt","er hat genervet","er hat nervt"],
      ex:"Es nervt mich, wenn …", exFr:"Ça m'énerve quand…", forme:"nerven, er nervt, hat genervt" },
    { de:"streng", fr:["strict(ement), sévère(ment)"], m:3 },
    { de:"süss", fr:["mignon / mignonne (sucré-e, doux / douce)"], m:5 },
    { de:"ängstlich", fr:["anxieux / anxieuse, avoir peur"], m:3 },
  ]},
  { key:"laune", gen:"mot", title:"p. 18 · Réagir : Was ist los?", emoji:"💬", unit:"phrases", src:P + ", encadré bleu", items:[
    { de:"Was ist (denn) los?", alt:["Was ist los?","Was ist denn los?"], fr:["Qu'est-ce qu'il y a ? Que se passe-t-il ?"] },
    { de:"Ich habe gute Laune.", fr:["Je suis de bonne humeur."] },
    { de:"Ich habe schlechte Laune.", fr:["Je suis de mauvaise humeur."] },
    { de:"Ich habe sehr gute Laune.", fr:["Je suis de très bonne humeur."] },
    { de:"Ich mag es, wenn …", alt:["Ich mag es, wenn"], fr:["J'aime bien, quand…"] },
    { de:"Ich mag es nicht, wenn …", alt:["Ich mag es nicht, wenn"], fr:["Je n'aime pas, quand…"] },
  ]},
  { key:"saetze", gen:"phrase", title:"p. 18 · Phrases à compléter", emoji:"✏️", unit:"phrases", src:P, items:[
    { s:"Ich bin ___, wenn du kommst.", h:"content-e", acc:["froh"], o:["froh","sauer","müde","traurig"], fr:"Je suis content-e si tu viens.", src:P + ", froh" },
    { s:"Er ist ___, wenn er warten muss.", h:"fâché", acc:["sauer"], o:["sauer","froh","süss","glücklich"], fr:"Il est fâché quand il doit attendre.", src:P + ", sauer" },
    { s:"Es ___ mich, wenn …", h:"énerver", acc:["nervt"], o:["nervt","nerve","genervt","nerven"], fr:"Ça m'énerve quand…", src:P + ", nerven" },
    { s:"Was ist (denn) ___?", h:"Qu'est-ce qu'il y a ?", acc:["los"], o:["los","toll","gut","lustig"], fr:"Qu'est-ce qu'il y a ? Que se passe-t-il ?", src:P + ", encadré bleu" },
    { s:"Ich habe (sehr) gute ___.", h:"humeur", acc:["Laune"], o:["Laune","Laun","Lune","Launen"], fr:"Je suis de (très) bonne humeur.", src:P + ", encadré bleu" },
    { s:"Ich habe ___ Laune.", h:"mauvaise", acc:["schlechte"], o:["schlechte","schlecht","gute","traurige"], fr:"Je suis de mauvaise humeur.", src:P + ", encadré bleu" },
    { s:"Ich ___ es nicht, wenn …", h:"aimer", acc:["mag"], o:["mag","finde","bin","habe"], fr:"Je n'aime pas, quand…", src:P + ", encadré bleu" },
    { s:"Ich mag es ___, wenn …", h:"Je n'aime pas, quand…", acc:["nicht"], o:["nicht","sehr","ganz","denn"], fr:"Je n'aime pas, quand…", src:P + ", encadré bleu" },
    { s:"Wie geht es ___?", h:"Comment allez-vous ?", acc:["Ihnen"], o:["Ihnen","mir","Ihr","Sie"], fr:"Comment allez-vous ?", src:P + ", encadré gris" },
    { s:"Es geht ___ schlecht.", h:"Je vais mal.", acc:["mir"], o:["mir","mich","ich","Ihnen"], fr:"Je vais mal.", src:P + ", encadré gris" },
    { s:"Es geht mir ___ gut.", h:"Je vais assez bien.", acc:["ganz"], o:["ganz","sehr","nicht","super"], fr:"Je vais assez bien.", src:P + ", encadré gris" },
    { s:"Es geht mir ___ gut.", h:"Je vais très bien.", acc:["sehr"], o:["sehr","ganz","nicht","super"], fr:"Je vais très bien.", src:P + ", encadré gris" },
    { s:"Ich finde … ___.", h:"super", acc:["toll"], o:["toll","blöd","lustig","traurig"], fr:"Je trouve… super.", src:P + ", encadré gris" },
    { s:"Ich finde … ___.", h:"stupide", acc:["blöd"], o:["blöd","toll","lustig","süss"], fr:"Je trouve… stupide.", src:P + ", encadré gris" },
    { s:"Ich ___ … cool.", h:"trouver", acc:["finde"], o:["finde","mag","bin","habe"], fr:"Je trouve… cool.", src:P + ", encadré gris" },
  ]},
  { key:"stoert", gen:"mot", title:"p. 19 · Réagir (suite) : Es stört mich…", emoji:"💬", unit:"entrées", src:Q + ", encadré bleu en haut de page", items:[
    { de:"Es stört mich, wenn …", alt:["Es stört mich, wenn"], fr:["Ça me dérange quand…"] },
    { de:"Es gefällt mir, wenn …", alt:["Es gefällt mir, wenn"], fr:["Ça me plaît quand…"] },
    { de:"Es gefällt mir nicht, wenn …", alt:["Es gefällt mir nicht, wenn"], fr:["Ça ne me plaît pas quand…"] },
    { de:"romantisch", fr:["romantique"], contr:"unromantisch", contrO:["unromantisch","nichtromantisch","antiromantisch","ruhig"] },
    { de:"unromantisch", fr:["pas romantique"], contr:"romantisch", contrO:["romantisch","ruhig","lustig","nervig"] },
    { de:"ruhig", fr:["tranquille"] },
  ]},
  { key:"drauf", gen:"mot", title:"p. 19 · Humeur et ambiance (encadré □□■)", emoji:"🌡️", unit:"entrées", src:Q + ", encadré bleu marqué □□■", items:[
    { de:"genervt", fr:["énervé-e, agacé-e"], ex:"Meine Mutter ist genervt, weil ich nicht aufräume.", exFr:"Ma mère est agacée parce que je ne range pas." },
    { de:"gut drauf sein", fr:["être de bonne humeur"] },
    { de:"enttäuscht", fr:["déçu-e"] },
    { de:"nervig", fr:["énervant-e, tuant-e"] },
    { de:"die Stimmung", art:"die", pl:"die Stimmungen", plo:["die Stimmungen","die Stimmunge","die Stimmungs","die Stimmung"], fr:["l'atmosphère, l'ambiance"], ex:"Die Stimmung ist schlecht.", exFr:"L'ambiance est mauvaise.", forme:"die Stimmung, -en" },
  ]},
  { key:"freude", gen:"mot", title:"p. 19 · Freude / Ärger haben", emoji:"🎭", unit:"entrées", src:Q + ", « Freude/Ärger haben »", items:[
    { de:"sich freuen", fr:["se réjouir"], forme:"sich freuen, er freut sich, hat sich gefreut",
      pres:"er freut sich", presAcc:["er freut sich","freut sich"], presO:["er freut sich","er freuet sich","er freust sich","er freut"],
      pp:"er hat sich gefreut", ppAcc:["er hat sich gefreut","hat sich gefreut"], ppO:["er hat sich gefreut","er ist sich gefreut","er hat gefreut","er hat sich gefreuen"] },
    { de:"reden", fr:["parler, causer"], forme:"reden, er redet, hat geredet",
      pres:"er redet", presAcc:["er redet","redet"], presO:["er redet","er redt","er redest","er redett"],
      pp:"er hat geredet", ppAcc:["er hat geredet","hat geredet"], ppO:["er hat geredet","er ist geredet","er hat geredt","er hat gereden"] },
    { de:"lieben", fr:["aimer"], forme:"lieben, er liebt, hat geliebt",
      pres:"er liebt", presAcc:["er liebt","liebt"], presO:["er liebt","er liebet","er liebst","er lieb"],
      pp:"er hat geliebt", ppAcc:["er hat geliebt","hat geliebt"], ppO:["er hat geliebt","er ist geliebt","er hat geliebet","er hat gelieben"] },
    { de:"lachen", fr:["rire"], forme:"lachen, er lacht, hat gelacht",
      pres:"er lacht", presAcc:["er lacht","lacht"], presO:["er lacht","er lächt","er lachet","er lachst"],
      pp:"er hat gelacht", ppAcc:["er hat gelacht","hat gelacht"], ppO:["er hat gelacht","er ist gelacht","er hat gelachen","er hat lacht"] },
    { de:"sich ärgern", fr:["s'énerver, se fâcher"], forme:"sich ärgern, er ärgert sich, hat sich geärgert",
      pres:"er ärgert sich", presAcc:["er ärgert sich","ärgert sich"], presO:["er ärgert sich","er ärgern sich","er ärgert","er ärgerst sich"],
      pp:"er hat sich geärgert", ppAcc:["er hat sich geärgert","hat sich geärgert"], ppO:["er hat sich geärgert","er ist sich geärgert","er hat geärgert","er hat sich geärgern"] },
    { de:"der Ärger", art:"der", fr:["les ennuis"], ex:"Ich habe Ärger mit meiner Mutter.", exFr:"J'ai des ennuis avec ma mère.", forme:"der Ärger (Sg.)" },
    { de:"weinen", fr:["pleurer"], forme:"weinen, er weint, hat geweint",
      pres:"er weint", presAcc:["er weint","weint"], presO:["er weint","er weinet","er weinst","er wein"],
      pp:"er hat geweint", ppAcc:["er hat geweint","hat geweint"], ppO:["er hat geweint","er ist geweint","er hat geweinen","er hat weint"] },
  ]},
  { key:"streit", gen:"mot", title:"p. 19 · Se disputer (encadré □■■)", emoji:"⚡", unit:"entrées", src:Q + ", encadré bleu marqué □■■", items:[
    { de:"sich aufregen", alt:["sich auf|regen"], fr:["s'énerver"], forme:"sich auf|regen, er regt sich … auf, hat sich aufgeregt",
      pres:"er regt sich auf", presAcc:["er regt sich auf","regt sich auf"], presO:["er regt sich auf","er aufregt sich","er regt auf sich","er regt sich"],
      pp:"er hat sich aufgeregt", ppAcc:["er hat sich aufgeregt","hat sich aufgeregt"], ppO:["er hat sich aufgeregt","er hat sich geaufregt","er ist sich aufgeregt","er hat sich aufregt"] },
    { de:"der Streit", art:"der", fr:["la dispute"], ex:"Heute hatte ich Streit mit Ben.", exFr:"Aujourd'hui, j'ai eu une dispute avec Ben." },
    { de:"sich streiten", fr:["se disputer"], forme:"sich streiten, er streitet sich, hat sich gestritten",
      pres:"er streitet sich", presAcc:["er streitet sich","streitet sich"], presO:["er streitet sich","er streit sich","er streitst sich","er streitet"],
      pp:"er hat sich gestritten", ppAcc:["er hat sich gestritten","hat sich gestritten"], ppO:["er hat sich gestritten","er hat sich gestreitet","er ist sich gestritten","er hat sich gestreiten"] },
  ]},
  { key:"saetze19", gen:"phrase", title:"p. 19 · Phrases à compléter", emoji:"✏️", unit:"phrases", src:Q, items:[
    { s:"Es ___ mich, wenn …", h:"déranger", acc:["stört"], o:["stört","gefällt","nervt","freut"], fr:"Ça me dérange quand…", src:Q + ", encadré bleu" },
    { s:"Es ___ mir nicht, wenn …", h:"Ça ne me plaît pas quand…", acc:["gefällt"], o:["gefällt","stört","mag","geht"], fr:"Ça ne me plaît pas quand…", src:Q + ", encadré bleu" },
    { s:"Meine Mutter ist ___, weil ich nicht aufräume.", h:"agacée", acc:["genervt"], o:["genervt","nervig","nervt","enttäuscht"], fr:"Ma mère est agacée parce que je ne range pas.", src:Q + ", genervt" },
    { s:"Die ___ ist schlecht.", h:"L'ambiance", acc:["Stimmung"], o:["Stimmung","Laune","Streit","Ärger"], fr:"L'ambiance est mauvaise.", src:Q + ", die Stimmung" },
    { s:"Ich habe ___ mit meiner Mutter.", h:"des ennuis", acc:["Ärger"], o:["Ärger","Streit","Stimmung","Laune"], fr:"J'ai des ennuis avec ma mère.", src:Q + ", der Ärger" },
    { s:"Heute hatte ich ___ mit Ben.", h:"une dispute", acc:["Streit"], o:["Streit","Ärger","Stimmung","Laune"], fr:"Aujourd'hui, j'ai eu une dispute avec Ben.", src:Q + ", der Streit" },
  ]},
];

/* ---------- fiche ---------- */
/* liste des mots d'un paquet dans la fiche (forme du livre, traduction, phrase d'exemple) */
const listeMots = key => DECKS.find(d => d.key === key).items.map(it =>
  `<div class="gef${it.m ? " m" + it.m : ""}"><s></s><div><div class="de">${esc(it.forme || it.de)}</div><div class="fr">${esc(it.fr[0])}</div>${it.ex ? `<div class="ex">${esc(it.ex)} <i>${esc(it.exFr)}</i></div>` : ""}</div></div>`).join("");
const FICHE = [
  { icon:"👋", titre:"p. 18 · Demander et dire comment ça va", pairs:[
    ["Na, wie geht's?","Alors, ça va ?"],
    ["Wie geht's? / Wie geht es Ihnen?","Comment ça va ? / Comment allez-vous ?"],
    ["Es geht mir sehr gut / super / (ganz) gut / nicht gut / schlecht.","Je vais très bien / super / assez bien / pas bien / mal."]],
    astuce:"C'est toujours « es geht mir » : mot à mot, « ça va à moi ». Pour quelqu'un qu'on vouvoie, « Wie geht es Ihnen? », avec un I majuscule, comme dans ton livre." },
  { icon:"🙂", titre:"p. 18 · Das kennst du schon", pairs:[
    ["Ich bin glücklich.","Je suis heureux / heureuse."],
    ["Ich bin müde.","Je suis fatigué-e."],
    ["Ich finde … cool / toll / blöd.","Je trouve… cool / super / stupide."],
    ["interessant ≠ langweilig","intéressant-e ≠ ennuyeux / ennuyeuse"],
    ["lustig ≠ traurig","drôle, amusant-e ≠ triste"]],
    astuce:"Le signe ≠ de ton livre veut dire « contraire » : apprends ces mots par paires. Le test te demandera parfois le contraire." },
  { icon:"🌦️", titre:"p. 18 · Les mots nouveaux", count:7, html:() => listeMots("neu"),
    astuce:"nerven se conjugue comme un verbe normal : er nervt, et au passé er hat genervt (avec hat, pas ist). La barre de couleur à gauche range les humeurs du plus orageux (rouge) au plus ensoleillé (vert) : c'est un repère pour la mémoire, pas une info du livre." },
  { icon:"💬", titre:"p. 18 · Réagir : Was ist los?", pairs:[
    ["Was ist (denn) los?","Qu'est-ce qu'il y a ? Que se passe-t-il ?"],
    ["Ich habe (sehr) gute / schlechte Laune.","Je suis de (très) bonne / mauvaise humeur."],
    ["Ich mag es (nicht), wenn …","J'aime bien (Je n'aime pas), quand…"]],
    astuce:"En français on « est » de bonne humeur ; en allemand on l'« a » : Ich habe gute Laune." },
  { icon:"💬", titre:"p. 19 · Réagir (suite)", pairs:[
    ["Es stört mich, wenn …","Ça me dérange quand…"],
    ["Es gefällt mir (nicht), wenn …","Ça (ne) me plaît (pas) quand…"],
    ["romantisch ≠ unromantisch","romantique ≠ pas romantique"],
    ["ruhig","tranquille"]],
    astuce:"Ces lignes continuent l'encadré bleu de la page 18 : « Ich mag es (nicht), wenn … », « Es stört mich, wenn … », « Es gefällt mir (nicht), wenn … » se terminent tous par wenn …" },
  { icon:"🌡️", titre:"p. 19 · Humeur et ambiance (encadré □□■)", count:5, html:() => listeMots("drauf"),
    astuce:"Trois mots de la même famille : nerven (énerver) → genervt (énervé-e, c'est la personne) → nervig (énervant-e, c'est la chose ou la personne qui énerve). Le petit symbole □□■ de ton livre marque cet encadré : demande à ton maître s'il est pour ton niveau. En attendant, il est dans l'outil, dans son propre paquet." },
  { icon:"🎭", titre:"p. 19 · Freude / Ärger haben", count:7, html:() => listeMots("freude"),
    astuce:"Au passé, tous ces verbes prennent hat : er hat gelacht, er hat geweint. Avec sich, le sich reste après hat : er hat sich gefreut, er hat sich geärgert. der Ärger n'a pas de pluriel (Sg. dans ton livre)." },
  { icon:"⚡", titre:"p. 19 · Se disputer (encadré □■■)", count:3, html:() => listeMots("streit"),
    astuce:"sich auf|regen est un verbe à particule séparable (la barre | le montre) : au présent, auf part à la fin (er regt sich … auf) ; au passé, ge se glisse au milieu (hat sich aufgeregt). streiten est irrégulier : hat sich gestritten." },
  { icon:"🎯", titre:"Mes réflexes pour les contrôles", tips:[
    "Pour le devoir de mardi 10.11 (page 18), coche seulement les paquets « p. 18 ». Pour la Wortschatzkontrolle du mercredi 18.11, prends tout.",
    "Les Umlaute comptent : glücklich, müde, blöd, wütend, süss, ängstlich, stört, gefällt, enttäuscht, ärgern, Ärger. Dans cet outil, « mude » au lieu de « müde » est faux, comme au test.",
    "süss s'écrit avec ss, comme dans ton livre suisse ; si tu écris süß, c'est accepté aussi.",
    "Ne confonds pas les deux mots fâchés : sauer = fâché-e, wütend = furieux / furieuse (plus fort).",
    "Ne confonds pas froh (content-e) et glücklich (heureux / heureuse).",
    "Récite les paires de contraires à voix haute : interessant ≠ langweilig, lustig ≠ traurig, romantisch ≠ unromantisch.",
    "Apprends les noms avec leur article : die Stimmung (pluriel die Stimmungen), der Ärger, der Streit."] },
];

/* ---------- types de questions propres à cet outil ---------- */
const KINDS = {
  mcq_mot:    { type:"mcq",  tag:"allemand",  aspect:"sens",   consigne:"Choisis la traduction en français." },
  type_mot:   { type:"type", tag:"allemand",  aspect:"sens",   consigne:"Écris en allemand." },
  mcq_contr:  { type:"mcq",  tag:"contraire", aspect:"contr",  consigne:"Choisis le contraire (≠)." },
  type_contr: { type:"type", tag:"contraire", aspect:"contr",  consigne:"Écris le contraire (≠) en allemand." },
  mcq_pres:   { type:"mcq",  tag:"verbe",     aspect:"pres",   consigne:"Choisis la forme avec « er »." },
  type_pres:  { type:"type", tag:"verbe",     aspect:"pres",   consigne:"Écris la forme avec « er » (présent)." },
  mcq_pp:     { type:"mcq",  tag:"verbe",     aspect:"pp",     consigne:"Choisis le passé (Perfekt) avec « er »." },
  type_pp:    { type:"type", tag:"verbe",     aspect:"pp",     consigne:"Écris le passé (Perfekt) avec « er »." },
  mcq_art:    { type:"mcq",  tag:"article",   aspect:"art",    consigne:"Choisis l'article : der, die ou das." },
  mcq_pl:     { type:"mcq",  tag:"pluriel",   aspect:"pl",     consigne:"Choisis le pluriel." },
  type_pl:    { type:"type", tag:"pluriel",   aspect:"pl",     consigne:"Écris le pluriel, avec l'article." },
  mcq_phrase: { type:"mcq",  tag:"phrase",    aspect:"phrase", consigne:"Complète la phrase." },
  type_phrase:{ type:"type", tag:"phrase",    aspect:"phrase", consigne:"Complète la phrase (écris ce qui manque)." },
};
const KIND_ORDER = ["mcq_mot","type_mot","mcq_contr","type_contr","mcq_pres","type_pres","mcq_pp","type_pp","mcq_art","mcq_pl","type_pl","mcq_phrase","type_phrase"];
const TAG_LABEL = { allemand:"vocabulaire", contraire:"contraire", verbe:"forme du verbe", article:"der / die / das", pluriel:"pluriel", phrase:"phrase à compléter" };

/* utilitaires du contenu (repris du modèle Komparativ) */
function fillOpts(good, cands, pool, n = 4){
  const out = [good], seen = new Set([norm(good)]);
  const add = v => { if (out.length >= n || !v) return; const k = norm(v); if (seen.has(k)) return; seen.add(k); out.push(v); };
  cands.forEach(add); shuffle(pool).forEach(add);
  return shuffle(out);
}
const itemLabel = it => it.s ? it.s + (it.h ? " (" + it.h + ")" : "") : it.de;
const choix = (diff, m, t) => diff === "easy" ? m : diff === "hard" ? t : (Math.random() < 0.5 ? m : t);
const ALL = [0,1,2];
function finir(q){
  q.lang = "de";
  q.prompt = `${q.consigne} « ${q.word} »${q.hint ? " (" + q.hint + ")" : ""}`;
  q.label = q.word + (q.hint ? " (" + q.hint + ")" : "");
}
const face = (tag, front, frontMini, back, mini) => ({ tagF:TAG_LABEL[tag], front, frontMini, tagB:"Réponse", backHtml:`<span class="face-word">${esc(back)}</span><span class="face-mini">${esc(mini)}</span>` });

const GENS = {
  /* mot ou phrase toute faite : sens ; contraire et formes du verbe quand le livre les donne */
  mot:{
    label: (d, it) => itemLabel(it),
    cards: (d, it) => { const out = [{ aspect:"sens", mcqOnly:false, levels:ALL }];
      if (it.contr) out.push({ aspect:"contr", mcqOnly:false, levels:ALL });
      if (it.pres) out.push({ aspect:"pres", mcqOnly:false, levels:ALL });
      if (it.pp) out.push({ aspect:"pp", mcqOnly:false, levels:ALL });
      if (it.art) out.push({ aspect:"art", mcqOnly:true, levels:ALL });
      if (it.pl) out.push({ aspect:"pl", mcqOnly:false, levels:ALL });
      return out; },
    kinds: (d, it, diff) => { const out = [choix(diff, "mcq_mot", "type_mot")];
      if (it.contr) out.push(choix(diff, "mcq_contr", "type_contr"));
      if (it.pres) out.push(choix(diff, "mcq_pres", "type_pres"));
      if (it.pp) out.push(choix(diff, "mcq_pp", "type_pp"));
      if (it.art) out.push("mcq_art");
      if (it.pl) out.push(choix(diff, "mcq_pl", "type_pl"));
      return out; },
    base: (it, d) => `${it.forme || it.de}${it.pl && !it.forme ? " (pluriel : " + it.pl + ")" : ""} = ${it.fr[0]}${it.contr ? " (contraire : " + it.contr + ")" : ""}${it.ex ? ". " + it.ex + " = " + it.exFr : ""} — ${it.src || d.src}.`,
    fill: (q, kind, it, d) => {
      const base = GENS.mot.base(it, d);
      q.expl = base; q.keep = true;
      switch(kind){
        case "mcq_mot":    q.word = it.de; q.options = fillOpts(it.fr[0], [], d.items.map(x => x.fr[0])); q.answer = it.fr[0]; break;
        case "type_mot":   q.word = it.fr[0]; q.accept = [it.de, ...(it.alt || [])]; q.answer = it.de; if (it.art) q.consigne = "Écris en allemand, avec l'article."; break;
        case "mcq_art":    q.word = stripDe(it.de); q.hint = it.fr[0]; q.options = ["der","die","das"]; q.answer = it.art; break;
        case "mcq_pl":     q.word = it.de; q.hint = it.fr[0]; q.options = shuffle(it.plo.slice()); q.answer = it.pl; break;
        case "type_pl":    q.word = it.de; q.hint = it.fr[0]; q.accept = [it.pl]; q.answer = it.pl; break;
        case "mcq_contr":  q.word = it.de; q.hint = it.fr[0]; q.options = shuffle(it.contrO.slice()); q.answer = it.contr; break;
        case "type_contr": q.word = it.de; q.hint = it.fr[0]; q.accept = [it.contr]; q.answer = it.contr; break;
        case "mcq_pres":   q.word = it.de; q.hint = it.fr[0]; q.options = shuffle(it.presO.slice()); q.answer = it.pres; break;
        case "type_pres":  q.word = it.de; q.hint = it.fr[0]; q.accept = it.presAcc.slice(); q.answer = it.pres; break;
        case "mcq_pp":     q.word = it.de; q.hint = it.fr[0]; q.options = shuffle(it.ppO.slice()); q.answer = it.pp; break;
        case "type_pp":    q.word = it.de; q.hint = it.fr[0]; q.accept = it.ppAcc.slice(); q.answer = it.pp; break;
      }
      finir(q);
    },
    face: (d, it) => { const base = GENS.mot.base(it, d), out = [face("allemand", it.de, "", it.fr[0], base)];
      if (it.contr) out.push(face("contraire", it.de + " ≠ ?", it.fr[0], it.contr, base));
      if (it.pres) out.push(face("verbe", it.de + " → er …", it.fr[0], it.pres, base));
      if (it.pp) out.push(face("verbe", it.de + " → passé avec er", it.fr[0], it.pp, base));
      if (it.art) out.push(face("article", stripDe(it.de), it.fr[0], it.art, base));
      if (it.pl) out.push(face("pluriel", it.de, it.fr[0], it.pl, base));
      return out; },
  },
  /* phrase à compléter : à choix (o) ou écrite (acc) */
  phrase:{
    label: (d, it) => itemLabel(it),
    cards: () => [{ aspect:"phrase", mcqOnly:false, levels:ALL }],
    kinds: (d, it, diff) => [choix(diff, "mcq_phrase", "type_phrase")],
    expl: (it, d) => `${it.s.replace("___", it.acc[0])} = ${it.fr} — ${it.src || d.src}.`,
    fill: (q, kind, it, d) => {
      q.word = it.s; q.hint = it.h || ""; q.expl = GENS.phrase.expl(it, d); q.keep = true;
      if (kind === "mcq_phrase"){ q.options = shuffle(it.o.slice()); q.answer = it.o[0]; }
      else { q.accept = it.acc.slice(); q.answer = it.acc[0]; }
      finir(q);
    },
    face: (d, it) => [face("phrase", it.s, it.h || "", it.acc[0], GENS.phrase.expl(it, d))],
  },
};

/* ============================================================
   CONTENU — Allemand, chapitre 3 : Wortschatz Seiten 20 und 21 (« Ich soll, aber ich will nicht! »)
   Outil de révision de Livio — 10e HarmoS (niveau 2). Échéance (agenda) : devoir « ALL Seiten 20-21 WS », mardi 24 novembre 2026.
   Ce fichier est la seule partie propre à cet outil. Il est assemblé avec
   claude/couche-langues.js et claude/noyau-quiz.js par claude/assembler.py.
   Modèle : 2026-11-18_Livio_Allemand_Wortschatzkontrolle-Seite-18-et-19.contenu.js (même chapitre, mêmes réglages).
   Choix signalés au parent (v1) :
   - Umlaute exigés (OUTIL.umlautsStricts), ß = ss accepté, comme dans tous les outils d'allemand ;
   - lignes à barres obliques du livre découpées en cartes (Entschuldigung. / Entschuldige bitte.) ; « Sorry! » sans carte à lui
     (même mot qu'en anglais), mais accepté pour « Pardon. » ;
   - encadré marqué □□■ (p. 20) dans un paquet à part, comme à la p. 19 ;
   - lignes « Für mich wichtige Wörter und Wendungen » vides et encadrés « Lerntipp » : aucune question.
   ============================================================ */

/* Thème « je dois, mais je ne veux pas » : papier bleu froid des encadrés du livre, encre marine, bleu du manuel.
   La seule touche forte : le badge de l'en-tête, « soll » sur une étiquette bleue, « will nicht! » en tampon rouge penché.
   Familjen Grotesk pour les titres, Atkinson Hyperlegible pour le texte. */
const CSS_THEME = `
:root{
  --paper:#EDF2F6; --sheet:#FFFFFF; --ink:#1B2433; --soft:#5A6577; --rule:#D3DCE5;
  --court:#2C6E9E; --court-wash:#E2EEF7; --jersey:#C2362B; --score:#F2C230; --board:#1B2433;
  --good:#1F7A5A; --good-wash:#DCF1E7; --bad:#B8382A; --bad-wash:#F9E2DE; --on-court:#FFFFFF;
  --p-okdark:#16634A; --p-ok:#1F8A63; --p-mid:#C97A1E; --p-low:#B8382A; --p-lowsoft:#F0C7C0;
  --box:#2C6E9E; --crane:#F2C230; --stamp:#C2362B;
  --display:'Familjen Grotesk','Arial Narrow',sans-serif;
  --body:'Atkinson Hyperlegible',system-ui,-apple-system,'Segoe UI',sans-serif;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --paper:#111821; --sheet:#1A2330; --ink:#E7EDF4; --soft:#9DAABB; --rule:#2D3A4B;
  --court:#7FB6E0; --court-wash:#1F3346; --jersey:#FF8A7D; --score:#F2C230; --board:#0B1118;
  --good:#5ED3A0; --good-wash:#15362A; --bad:#FF8A7D; --bad-wash:#3A1E1B; --on-court:#0B1118;
  --p-okdark:#3FB488; --p-ok:#5ED3A0; --p-mid:#E8A24D; --p-low:#FF8A7D; --p-lowsoft:#5A2A25;
  --box:#7FB6E0; --crane:#F2C230; --stamp:#FF8A7D; color-scheme:dark}}
:root[data-theme="dark"]{
  --paper:#111821; --sheet:#1A2330; --ink:#E7EDF4; --soft:#9DAABB; --rule:#2D3A4B;
  --court:#7FB6E0; --court-wash:#1F3346; --jersey:#FF8A7D; --score:#F2C230; --board:#0B1118;
  --good:#5ED3A0; --good-wash:#15362A; --bad:#FF8A7D; --bad-wash:#3A1E1B; --on-court:#0B1118;
  --p-okdark:#3FB488; --p-ok:#5ED3A0; --p-mid:#E8A24D; --p-low:#FF8A7D; --p-lowsoft:#5A2A25;
  --box:#7FB6E0; --crane:#F2C230; --stamp:#FF8A7D; color-scheme:dark}
:root{ --focus:var(--court); --scorebox-border:#2C4A66; }
/* le badge : « soll » (ce qu'on te demande) et « will nicht! » (ce que tu réponds), tamponné de travers */
.head{align-items:center}
.soll{flex:none;display:flex;flex-direction:column;align-items:flex-start;gap:3px}
.soll-a{background:var(--court);color:#fff;font-family:var(--display);font-weight:700;font-size:20px;line-height:1;padding:7px 10px 8px;border-radius:6px}
.soll-b{font-family:var(--display);font-weight:700;font-size:16px;line-height:1;color:var(--stamp);border:2px solid var(--stamp);border-radius:4px;padding:4px 6px;transform:rotate(-7deg);margin-left:10px;background:var(--sheet);white-space:nowrap}
.head h1{font-weight:700;font-size:clamp(26px,7.6vw,34px);line-height:1;letter-spacing:-.5px}
.lab,.entry-title,.fb-t,.bilan h3{font-weight:700}
.face-word,.qword{font-weight:700;letter-spacing:-.2px}
.score-n{font-weight:700}
/* fiche : une ligne par mot, comme dans le livre (allemand à gauche, français dessous) */
.wl{padding:9px 0;border-top:1px solid var(--rule)}
.wl:first-child{border-top:0}
.wl .de{font-weight:700;font-size:17px}
.wl .fr{color:var(--soft);font-size:15px}
.wl .ex{font-size:15px;margin-top:3px}
.wl .ex i{color:var(--soft)}
/* étiquettes des types de questions */
.chip.allemand{background:#E2EEF7;color:#21557C}
.chip.contraire{background:#FDEFD6;color:#8A5410}
.chip.verbe{background:#F7E2DC;color:#9A3C27}
.chip.phrase{background:#E2F1EA;color:#1F6A4C}
.chip.article,.chip.pluriel{background:#ECE8F7;color:#4B3A8C}
`;

const QUIZ_ID = "livio-quiz-allemand-seiten20-21";
const DUE = { iso:"2026-11-24", long:"mardi 24 novembre", short:"24.11" };
const THEME = "Chapitre 3 — Ich soll, aber ich will nicht! (Wortschatz Seiten 20 und 21)";
const VERSION = { n:1, date:"20.11.2026" };   /* v1 : 20.11.2026, première version (pages 20 et 21), devoir du 24.11 */

const OUTIL = {
  eleve:"Livio", classe:"10e HarmoS (niveau 2)", branche:"Allemand",
  titre:"Wortschatz Seiten 20 + 21", sousTitre:"Allemand · chapitre 3 « Ich soll, aber ich will nicht! »",
  jersey:"soll",
  badgeHtml:`<div class="soll" aria-hidden="true"><span class="soll-a">soll</span><span class="soll-b">will nicht!</span></div>`,
  polices:"https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@500;600;700&family=Atkinson+Hyperlegible:wght@400;700&display=swap",
  introFiche:"Tout le vocabulaire des pages 20 et 21 pour le devoir du mardi 24 novembre. Chaque section et chaque paquet dit de quelle page il vient. Lis à voix haute, avec les phrases d'exemple, puis passe aux cartes ou au test.",
  labelTout:"Pages 20 et 21",
  motPaquet:"Paquet",
  compte:"cartes",
  comptes:[10, 20, 30, 0], compteDefaut:0,
  umlautsStricts:true,
  prefixeIndice:"",
  sousNiveaux:{ easy:"Je choisis parmi plusieurs réponses", hard:"J'écris tout en allemand" },
  conseilSetup:"Ordre conseillé : Correction en direct pour fixer l'orthographe (et les Umlaute), puis Épreuve blanche, où tu ne vois aucune réponse avant la fin, comme au contrôle.",
  noteAutre:"Ce n'est pas le même mot : apprends-le en entier.",
  papier:{ titre:"Allemand — Wortschatz Seiten 20 + 21 (Ich soll, aber ich will nicht!)", court:"Allemand Seiten 20 + 21", fichier:"allemand-wortschatz-seiten20-21-livio", code:"#PDF-ALLEMAND-SEITEN20-21" },
  copie:{ titre:"RÉSULTAT — Allemand, Wortschatz Seiten 20 + 21 (Ich soll, aber ich will nicht!)" },
  analyse:{
    role:"un professeur d'allemand suisse",
    sujet:"le vocabulaire des pages 20 et 21 du chapitre 3 (se disputer, s'excuser, ranger, devoir)",
    etiquettes:"allemand = traduire un mot ou une phrase, contraire = trouver le contraire (ordentlich ≠ unordentlich, leise ≠ laut, wenig ≠ viel), verbe = forme avec er au présent ou au passé (er hört auf, er hat aufgehört, er hat sich entschuldigt, er hat widersprochen), article = der / die / das, pluriel, phrase = compléter une phrase du livre",
    pistes:"l'Umlaut oublié (horen, aufraumen, fuhlen), la particule séparable au présent (er hört … auf, er räumt … auf, er ruft … an) et le ge- placé au milieu au passé (aufgehört, abgeschrieben, aufgeräumt, angerufen, wohlgefühlt), les verbes sans ge- au passé (bekommen, vergessen, besucht, entschuldigt, erinnert, widersprochen), le « sich » oublié ou mal placé, les participes irréguliers (abgeschrieben, angerufen, widersprochen), le genre des noms (die Note, die Wahrheit, der Quatsch, die Ruhe, die Entschuldigung)",
  },
};

/* ---------- SOURCES ---------- */
const SOURCES = [
  { titre:"Photo 1 — livre p. 20", recue:"20.11.2026", contenu:"Chapitre 3 : encadré bleu du haut (auf|hören, Hört mit dem Streit auf!, sich entschuldigen, einverstanden, Ich bin nicht einverstanden!, ab|schreiben, die Note, bekommen, Sie hat eine schlechte Note bekommen.), encadré bleu marqué □□■ (sich wohl|fühlen, sich erinnern, die Wahrheit, der Quatsch, widersprechen), titre « Ich soll, aber ich will nicht! » et encadré gris « Das kennst du schon » (ordentlich ≠ unordentlich, leise ≠ laut, auf|räumen, an|rufen, Entschuldigung. / Entschuldige bitte.)." },
  { titre:"Photo 2 — livre p. 21", recue:"20.11.2026", contenu:"Fin de l'encadré gris (Sorry! / Tut mir (echt) leid.), puis les mots nouveaux : die Ruhe, Lass mich in Ruhe!, sollen, Meine Mutter sagt, ich soll aufräumen., wenig ≠ viel, vergessen, Er hat das Buch vergessen., besuchen, die Entschuldigung. Lignes « Für mich wichtige Wörter und Wendungen » vides et deux encadrés « Lerntipp » : aucune question." },
];
const SOURCES_NOTE = "Tout vient des pages 20 et 21, et de rien d'autre. Pas de carte pour « Sorry! » (même mot qu'en anglais) : il est accepté quand on te demande « Pardon. ». Pas de question sur les signes de prononciation du livre (voyelles soulignées ou pointées), ni sur les lignes vides « Für mich wichtige Wörter und Wendungen », ni sur les encadrés « Lerntipp ». Le titre « Ich soll, aber ich will nicht! » est repris dans une phrase à compléter, parce que le livre en donne la traduction. Le petit symbole □□■ devant le deuxième encadré bleu de la p. 20 indique sans doute un niveau, mais la photo ne le dit pas : l'encadré est repris dans son propre paquet, pour pouvoir le décocher. Les mauvaises réponses des questions à choix sont des pièges fabriqués pour l'exercice (lettre oubliée, ge- mal placé, mauvais mot de la page), jamais du vocabulaire à apprendre. L'agenda donne le devoir « ALL Seiten 20-21 WS » le mardi 24.11.";
const PHOTOS = [
  { titre:"Livre p. 20", url:"/_blob/3276948fddfb7d1a0448fb2fcd6767ef" },
  { titre:"Livre p. 21", url:"/_blob/4672af38f76a818d6be8223f8193a5f9" },
];

/* ---------- CONTENU : paquets ---------- */
const P = "livre p. 20", Q = "livre p. 21";
const DECKS = [
  { key:"kennst", gen:"mot", title:"p. 20-21 · Das kennst du schon", emoji:"🧹", unit:"entrées", src:P + ", encadré gris « Das kennst du schon » (suite p. 21)", items:[
    { de:"ordentlich", fr:["ordonné-e"], contr:"unordentlich", contrO:["unordentlich","laut","leise","wenig"] },
    { de:"unordentlich", fr:["désordonné-e"], contr:"ordentlich", contrO:["ordentlich","laut","viel","leise"] },
    { de:"leise", fr:["à voix basse"], contr:"laut", contrO:["laut","viel","ordentlich","wenig"] },
    { de:"laut", fr:["à voix haute, fort, bruyant-e"], contr:"leise", contrO:["leise","wenig","unordentlich","viel"] },
    { de:"aufräumen", alt:["auf|räumen"], fr:["ranger"], forme:"auf|räumen, er räumt … auf, hat aufgeräumt",
      pres:"er räumt auf", presAcc:["er räumt auf","räumt auf"], presO:["er räumt auf","er aufräumt","er raumt auf","er räumst auf"],
      pp:"er hat aufgeräumt", ppAcc:["er hat aufgeräumt","hat aufgeräumt"], ppO:["er hat aufgeräumt","er hat geaufräumt","er ist aufgeräumt","er hat aufgeraumt"] },
    { de:"anrufen", alt:["an|rufen"], fr:["appeler (au téléphone)"], forme:"an|rufen, er ruft … an, hat angerufen",
      pres:"er ruft an", presAcc:["er ruft an","ruft an"], presO:["er ruft an","er anruft","er ruft auf","er rufst an"],
      pp:"er hat angerufen", ppAcc:["er hat angerufen","hat angerufen"], ppO:["er hat angerufen","er hat geanrufen","er hat angeruft","er ist angerufen"] },
    { de:"Entschuldigung.", alt:["Entschuldigung","Sorry!"], fr:["Pardon."], src:P + ", encadré gris, « Entschuldigung. / Entschuldige bitte. »" },
    { de:"Entschuldige bitte.", fr:["Excuse-moi."], src:P + ", encadré gris, « Entschuldigung. / Entschuldige bitte. »" },
    { de:"Tut mir (echt) leid.", alt:["Tut mir leid.","Tut mir echt leid."], fr:["Je suis (vraiment) désolé-e."], src:Q + ", haut de page, « Sorry! / Tut mir (echt) leid. »" },
  ]},
  { key:"streit", gen:"mot", title:"p. 20 · Arrêter, s'excuser, copier", emoji:"✋", unit:"entrées", src:P + ", encadré bleu du haut", items:[
    { de:"aufhören", alt:["auf|hören"], fr:["arrêter"], forme:"auf|hören, er hört … auf, hat aufgehört", ex:"Hört mit dem Streit auf!", exFr:"Arrêtez de vous disputer !",
      pres:"er hört auf", presAcc:["er hört auf","hört auf"], presO:["er hört auf","er aufhört","er hört an","er hörst auf"],
      pp:"er hat aufgehört", ppAcc:["er hat aufgehört","hat aufgehört"], ppO:["er hat aufgehört","er hat geaufhört","er ist aufgehört","er hat aufhört"] },
    { de:"sich entschuldigen", fr:["s'excuser"], forme:"sich entschuldigen, er entschuldigt sich, hat sich entschuldigt",
      pres:"er entschuldigt sich", presAcc:["er entschuldigt sich","entschuldigt sich"], presO:["er entschuldigt sich","er entschuldigt","er entschuldigst sich","er entschuldigen sich"],
      pp:"er hat sich entschuldigt", ppAcc:["er hat sich entschuldigt","hat sich entschuldigt"], ppO:["er hat sich entschuldigt","er hat sich geentschuldigt","er ist sich entschuldigt","er hat entschuldigt"] },
    { de:"einverstanden", fr:["d'accord"], ex:"Ich bin nicht einverstanden!", exFr:"Je ne suis pas d'accord !" },
    { de:"abschreiben", alt:["ab|schreiben"], fr:["copier"], forme:"ab|schreiben, er schreibt … ab, hat abgeschrieben",
      pres:"er schreibt ab", presAcc:["er schreibt ab","schreibt ab"], presO:["er schreibt ab","er abschreibt","er schreibt an","er schreibst ab"],
      pp:"er hat abgeschrieben", ppAcc:["er hat abgeschrieben","hat abgeschrieben"], ppO:["er hat abgeschrieben","er hat geabschrieben","er hat abgeschreibt","er ist abgeschrieben"] },
    { de:"die Note", art:"die", pl:"die Noten", plo:["die Noten","die Notes","die Note","die Notten"], fr:["la note"], forme:"die Note, -n" },
    { de:"bekommen", fr:["recevoir, avoir"], forme:"bekommen, er bekommt, hat bekommen", ex:"Sie hat eine schlechte Note bekommen.", exFr:"Elle a eu une mauvaise note.",
      pres:"er bekommt", presAcc:["er bekommt","bekommt"], presO:["er bekommt","er bekomt","er bekommst","er bekommen"],
      pp:"er hat bekommen", ppAcc:["er hat bekommen","hat bekommen"], ppO:["er hat bekommen","er hat gebekommen","er ist bekommen","er hat bekommt"] },
  ]},
  { key:"wohl", gen:"mot", title:"p. 20 · Se sentir bien, la vérité (encadré □□■)", emoji:"🙂", unit:"entrées", src:P + ", encadré bleu marqué □□■", items:[
    { de:"sich wohlfühlen", alt:["sich wohl|fühlen"], fr:["se sentir bien, à l'aise"], forme:"sich wohl|fühlen, er fühlt sich … wohl, hat sich wohlgefühlt",
      pres:"er fühlt sich wohl", presAcc:["er fühlt sich wohl","fühlt sich wohl"], presO:["er fühlt sich wohl","er wohlfühlt sich","er fühlt wohl sich","er fühlt sich"],
      pp:"er hat sich wohlgefühlt", ppAcc:["er hat sich wohlgefühlt","hat sich wohlgefühlt"], ppO:["er hat sich wohlgefühlt","er hat sich gewohlfühlt","er ist sich wohlgefühlt","er hat sich wohlfühlt"] },
    { de:"sich erinnern", fr:["se rappeler, se souvenir"], forme:"sich erinnern, er erinnert sich, hat sich erinnert",
      pres:"er erinnert sich", presAcc:["er erinnert sich","erinnert sich"], presO:["er erinnert sich","er erinnern sich","er erinnert","er erinnerst sich"],
      pp:"er hat sich erinnert", ppAcc:["er hat sich erinnert","hat sich erinnert"], ppO:["er hat sich erinnert","er hat sich geerinnert","er ist sich erinnert","er hat erinnert"] },
    { de:"die Wahrheit", art:"die", pl:"die Wahrheiten", plo:["die Wahrheiten","die Wahrheits","die Wahrheite","die Wahrheit"], fr:["la vérité"], forme:"die Wahrheit, -en" },
    { de:"der Quatsch", art:"der", fr:["les âneries, les bêtises"], forme:"der Quatsch (Sg.)" },
    { de:"widersprechen", fr:["contredire"], forme:"widersprechen, er widerspricht, hat widersprochen",
      pres:"er widerspricht", presAcc:["er widerspricht","widerspricht"], presO:["er widerspricht","er widersprecht","er widersprechst","er spricht wider"],
      pp:"er hat widersprochen", ppAcc:["er hat widersprochen","hat widersprochen"], ppO:["er hat widersprochen","er hat widergesprochen","er hat widersprecht","er ist widersprochen"] },
  ]},
  { key:"saetze20", gen:"phrase", title:"p. 20 · Phrases à compléter", emoji:"✏️", unit:"phrases", src:P, items:[
    { s:"Hört mit dem Streit ___!", h:"Arrêtez de vous disputer !", acc:["auf"], o:["auf","an","ab","aus"], fr:"Arrêtez de vous disputer !", src:P + ", auf|hören" },
    { s:"Ich bin nicht ___!", h:"d'accord", acc:["einverstanden"], o:["einverstanden","einverstanen","entschuldigt","laut"], fr:"Je ne suis pas d'accord !", src:P + ", einverstanden" },
    { s:"Sie hat eine schlechte Note ___.", h:"recevoir, avoir", acc:["bekommen"], o:["bekommen","gebekommen","bekommt","abgeschrieben"], fr:"Elle a eu une mauvaise note.", src:P + ", bekommen" },
    { s:"Sie hat eine schlechte ___ bekommen.", h:"note", acc:["Note"], o:["Note","Noten","Wahrheit","Ruhe"], fr:"Elle a eu une mauvaise note.", src:P + ", die Note" },
    { s:"Ich ___, aber ich will nicht!", h:"Je dois, mais je ne veux pas !", acc:["soll"], o:["soll","will","sollt","bin"], fr:"Je dois, mais je ne veux pas !", src:P + ", titre « Ich soll, aber ich will nicht! »" },
    { s:"Entschuldige ___.", h:"Excuse-moi.", acc:["bitte"], o:["bitte","mich","leid","sorry"], fr:"Excuse-moi.", src:P + ", encadré gris" },
  ]},
  { key:"neu21", gen:"mot", title:"p. 21 · Les mots nouveaux", emoji:"📕", unit:"entrées", src:Q + ", mots nouveaux", items:[
    { de:"die Ruhe", art:"die", fr:["la tranquillité"], forme:"die Ruhe (Sg.)" },
    { de:"Lass mich in Ruhe!", fr:["Laisse-moi tranquille !"] },
    { de:"sollen", fr:["devoir"], forme:"sollen, er soll", ex:"Meine Mutter sagt, ich soll aufräumen.", exFr:"Ma mère dit que je dois ranger.",
      pres:"er soll", presAcc:["er soll","soll"], presO:["er soll","er sollt","er sollst","er sollen"] },
    { de:"wenig", fr:["peu"], contr:"viel", contrO:["viel","laut","leise","ordentlich"] },
    { de:"viel", fr:["beaucoup (de)"], contr:"wenig", contrO:["wenig","leise","laut","unordentlich"] },
    { de:"vergessen", fr:["oublier"], forme:"vergessen, er vergisst, hat vergessen", ex:"Er hat das Buch vergessen.", exFr:"Il a oublié le livre.",
      pres:"er vergisst", presAcc:["er vergisst","vergisst"], presO:["er vergisst","er vergesst","er vergiss","er vergessen"],
      pp:"er hat vergessen", ppAcc:["er hat vergessen","hat vergessen"], ppO:["er hat vergessen","er hat gevergessen","er hat vergisst","er ist vergessen"] },
    { de:"besuchen", fr:["visiter, rendre visite"], forme:"besuchen, er besucht, hat besucht",
      pres:"er besucht", presAcc:["er besucht","besucht"], presO:["er besucht","er besuchst","er besuch","er besuchen"],
      pp:"er hat besucht", ppAcc:["er hat besucht","hat besucht"], ppO:["er hat besucht","er hat gebesucht","er ist besucht","er hat besuchen"] },
    { de:"die Entschuldigung", art:"die", pl:"die Entschuldigungen", plo:["die Entschuldigungen","die Entschuldigungs","die Entschuldigunge","die Entschuldigung"], fr:["l'excuse"], forme:"die Entschuldigung, -en" },
  ]},
  { key:"saetze21", gen:"phrase", title:"p. 21 · Phrases à compléter", emoji:"✏️", unit:"phrases", src:Q, items:[
    { s:"Lass mich in ___!", h:"Laisse-moi tranquille !", acc:["Ruhe"], o:["Ruhe","Rue","Ruh","Note"], fr:"Laisse-moi tranquille !", src:Q + ", die Ruhe" },
    { s:"Meine Mutter sagt, ich ___ aufräumen.", h:"devoir", acc:["soll"], o:["soll","will","sollt","sollen"], fr:"Ma mère dit que je dois ranger.", src:Q + ", sollen" },
    { s:"Meine Mutter sagt, ich soll ___.", h:"ranger", acc:["aufräumen"], o:["aufräumen","aufraumen","räumen auf","anrufen"], fr:"Ma mère dit que je dois ranger.", src:Q + ", sollen" },
    { s:"Er hat das Buch ___.", h:"oublier", acc:["vergessen"], o:["vergessen","gevergessen","vergisst","besucht"], fr:"Il a oublié le livre.", src:Q + ", vergessen" },
    { s:"Tut mir (echt) ___.", h:"Je suis (vraiment) désolé-e.", acc:["leid"], o:["leid","lied","leit","bitte"], fr:"Je suis (vraiment) désolé-e.", src:Q + ", haut de page" },
  ]},
];

/* ---------- fiche ---------- */
const listeMots = key => DECKS.find(d => d.key === key).items.map(it =>
  `<div class="wl"><div class="de">${esc(it.forme || it.de)}</div><div class="fr">${esc(it.fr[0])}${it.contr ? " (contraire : " + esc(it.contr) + ")" : ""}</div>${it.ex ? `<div class="ex">${esc(it.ex)} <i>${esc(it.exFr)}</i></div>` : ""}</div>`).join("");
const FICHE = [
  { icon:"🧹", titre:"p. 20-21 · Das kennst du schon", count:9, html:() => listeMots("kennst"),
    astuce:"Le signe ≠ veut dire « contraire » : apprends ordentlich ≠ unordentlich et leise ≠ laut par paires. La barre | de auf|räumen et an|rufen montre la particule qui se sépare : er räumt … auf, er ruft … an." },
  { icon:"✋", titre:"p. 20 · Arrêter, s'excuser, copier", count:6, html:() => listeMots("streit"),
    astuce:"Au passé, le ge- se glisse entre la particule et le verbe : auf|hören → hat aufgehört, ab|schreiben → hat abgeschrieben. Regarde aussi bekommen : dans ton livre, le passé est hat bekommen, sans ge-." },
  { icon:"🙂", titre:"p. 20 · Se sentir bien, la vérité (encadré □□■)", count:5, html:() => listeMots("wohl"),
    astuce:"Avec sich, le sich reste juste après hat : er hat sich wohlgefühlt, er hat sich erinnert. Le petit symbole □□■ de ton livre marque cet encadré : demande à ton maître s'il est pour ton niveau. En attendant, il est dans l'outil, dans son propre paquet." },
  { icon:"📕", titre:"p. 21 · Les mots nouveaux", count:8, html:() => listeMots("neu21"),
    astuce:"Ton livre donne trois passés sans ge- sur ces deux pages : hat bekommen, hat vergessen, hat besucht (et aussi hat sich entschuldigt, hat sich erinnert, hat widersprochen). der Quatsch et die Ruhe n'ont pas de pluriel (Sg.)." },
  { icon:"🎯", titre:"Mes réflexes pour le devoir", tips:[
    "Les Umlaute comptent : aufhören, aufgehört, aufräumen, fühlen, wohlgefühlt. Dans cet outil, « aufraumen » au lieu de « aufräumen » est faux, comme au contrôle.",
    "Présent avec er : la particule part à la fin (er hört auf, er schreibt ab, er räumt auf, er ruft an, er fühlt sich wohl).",
    "Passé avec er : toujours hat sur ces deux pages. Particule + ge + verbe (aufgehört, abgeschrieben, aufgeräumt, angerufen, wohlgefühlt) ; sans ge- pour bekommen, vergessen, besucht, entschuldigt, erinnert, widersprochen.",
    "Apprends les noms avec leur article et leur pluriel : die Note (die Noten), die Wahrheit (die Wahrheiten), die Entschuldigung (die Entschuldigungen), der Quatsch et die Ruhe (pas de pluriel).",
    "Ton livre conseille d'apprendre les nouvelles structures avec des phrases d'exemple (Lerntipp p. 21) : récite Hört mit dem Streit auf!, Lass mich in Ruhe! et Meine Mutter sagt, ich soll aufräumen. à voix haute."] },
];

/* ---------- types de questions ---------- */
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

/* utilitaires du contenu (repris du modèle Wortschatz Seite 18 + 19) */
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

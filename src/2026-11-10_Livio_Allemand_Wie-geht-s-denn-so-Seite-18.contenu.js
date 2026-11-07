/* ============================================================
   CONTENU — Allemand, chapitre 3 « Wie geht's denn so? » : Wortschatz Seite 18 (les émotions)
   Outil de révision de Livio — 10e HarmoS (niveau 2). Devoir : mardi 10 novembre 2026 (agenda : « ALL Seite 18 Ws »).
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
`;

const QUIZ_ID = "livio-quiz-allemand-seite18-gefuehle";
const DUE = { iso:"2026-11-10", long:"mardi 10 novembre", short:"10.11" };
const THEME = "Chapitre 3 — Wie geht's denn so? (Seite 18)";
const VERSION = { n:1, date:"07.11.2026" };   /* v1 : 07.11.2026, première version */

/* Tout ce que le noyau affiche ou écrit et qui dépend de l'outil. Jamais d'âge en dur : le noyau le déduit de la classe. */
const OUTIL = {
  eleve:"Livio", classe:"10e HarmoS (niveau 2)", branche:"Allemand",
  titre:"Wie geht's denn so?", sousTitre:"Allemand · Wortschatz Seite 18, les émotions",
  jersey:"Na?",
  badgeHtml:`<div class="na" aria-hidden="true"><span class="na-bulle">Na?</span><span class="na-echelle"><i></i><i></i><i></i><i></i><i></i></span></div>`,
  polices:"https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap",
  introFiche:"Tout le vocabulaire de la page 18 pour mardi : demander comment ça va, dire comment tu te sens, réagir. Lis chaque section à voix haute, puis passe aux cartes ou au test.",
  labelTout:"Toute la page 18",
  motPaquet:"Paquet",
  compte:"cartes",
  comptes:[10, 20, 30, 0], compteDefaut:0,
  umlautsStricts:true,
  prefixeIndice:"",
  sousNiveaux:{ easy:"Je choisis parmi plusieurs réponses", hard:"J'écris tout en allemand" },
  conseilSetup:"Ordre conseillé : Correction en direct pour fixer l'orthographe (et les Umlaute), puis Épreuve blanche, où tu ne vois aucune réponse avant la fin, comme mardi.",
  noteAutre:"Ce n'est pas le même mot : apprends-le en entier.",
  papier:{ titre:"Allemand — Wie geht's denn so? (Seite 18)", court:"Allemand Seite 18", fichier:"allemand-seite18-livio", code:"#PDF-ALLEMAND-SEITE18" },
  copie:{ titre:"RÉSULTAT — Allemand, Wie geht's denn so? (Seite 18)" },
  analyse:{
    role:"un professeur d'allemand suisse",
    sujet:"le vocabulaire des émotions, page 18 du chapitre 3 « Wie geht's denn so? »",
    etiquettes:"allemand = traduire un mot ou une phrase, contraire = trouver le contraire (interessant ≠ langweilig, lustig ≠ traurig), verbe = forme de nerven (er nervt, er hat genervt), phrase = compléter une phrase du livre",
    pistes:"l'Umlaut oublié (mude au lieu de müde, gluecklich, wutend, sus), deux mots confondus (froh et glücklich, sauer et wütend), l'auxiliaire hat / ist au passé, mir / Ihnen dans « Wie geht es … ? », gute / schlechte Laune",
  },
};

/* ---------- SOURCES ---------- */
const SOURCES = [
  { titre:"Photo 1 — livre p. 18", recue:"07.11.2026", contenu:"Chapitre 3 « Wie geht's denn so? » : encadré gris « Das kennst du schon » (Wie geht's?, Es geht mir …, glücklich, müde, Ich finde …, interessant ≠ langweilig, lustig ≠ traurig), les mots nouveaux (froh, sauer, wütend, nerven, streng, süss, ängstlich) avec leurs phrases, et l'encadré bleu (Was ist (denn) los?, gute / schlechte Laune, Ich mag es (nicht), wenn …)." },
];
const SOURCES_NOTE = "Tout vient de la page 18, et de rien d'autre. Pas de question sur « cool » (même mot en allemand et en français), ni sur les petits signes de prononciation du livre (voyelles soulignées ou pointées). L'encadré bleu porte un petit symbole de trois carrés dont la photo ne dit pas le sens : il est quand même repris. Les mauvaises réponses proposées dans les questions à choix sont des pièges fabriqués pour l'exercice (lettre oubliée, mauvais mot de la page), jamais du vocabulaire à apprendre. Le devoir de l'agenda est « ALL Seite 18 Ws » : la page 18 seulement.";
const PHOTOS = [
  { titre:"Livre p. 18", url:"/_blob/f38ad497558ba1dcb114b19aac2e5940" },
];

/* ---------- CONTENU : paquets ----------
   mot    : de (allemand), fr[] (fr[0] = forme affichée), alt[] (autres écritures allemandes acceptées),
            contr (le contraire du livre), pres / pp (formes du verbe), src (endroit précis de la page)
   phrase : s (phrase avec ___), h (indice en français), acc[] (réponses écrites acceptées), o[] (choix, o[0] = la bonne), fr (traduction du livre) */
const P = "livre p. 18";
const DECKS = [
  { key:"kennst", gen:"mot", title:"Das kennst du schon", emoji:"👋", unit:"entrées", src:P + ", encadré gris « Das kennst du schon »", items:[
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
  { key:"neu", gen:"mot", title:"Les mots nouveaux", emoji:"🌦️", unit:"mots", src:P + ", mots nouveaux", items:[
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
  { key:"laune", gen:"mot", title:"Réagir : Was ist los?", emoji:"💬", unit:"phrases", src:P + ", encadré bleu", items:[
    { de:"Was ist (denn) los?", alt:["Was ist los?","Was ist denn los?"], fr:["Qu'est-ce qu'il y a ? Que se passe-t-il ?"] },
    { de:"Ich habe gute Laune.", fr:["Je suis de bonne humeur."] },
    { de:"Ich habe schlechte Laune.", fr:["Je suis de mauvaise humeur."] },
    { de:"Ich habe sehr gute Laune.", fr:["Je suis de très bonne humeur."] },
    { de:"Ich mag es, wenn …", alt:["Ich mag es, wenn"], fr:["J'aime bien, quand…"] },
    { de:"Ich mag es nicht, wenn …", alt:["Ich mag es nicht, wenn"], fr:["Je n'aime pas, quand…"] },
  ]},
  { key:"saetze", gen:"phrase", title:"Phrases à compléter", emoji:"✏️", unit:"phrases", src:P, items:[
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
];

/* ---------- fiche ---------- */
const FICHE = [
  { icon:"👋", titre:"Demander et dire comment ça va", pairs:[
    ["Na, wie geht's?","Alors, ça va ?"],
    ["Wie geht's? / Wie geht es Ihnen?","Comment ça va ? / Comment allez-vous ?"],
    ["Es geht mir sehr gut / super / (ganz) gut / nicht gut / schlecht.","Je vais très bien / super / assez bien / pas bien / mal."]],
    astuce:"C'est toujours « es geht mir » : mot à mot, « ça va à moi ». Pour quelqu'un qu'on vouvoie, « Wie geht es Ihnen? », avec un I majuscule, comme dans ton livre." },
  { icon:"🙂", titre:"Das kennst du schon", pairs:[
    ["Ich bin glücklich.","Je suis heureux / heureuse."],
    ["Ich bin müde.","Je suis fatigué-e."],
    ["Ich finde … cool / toll / blöd.","Je trouve… cool / super / stupide."],
    ["interessant ≠ langweilig","intéressant-e ≠ ennuyeux / ennuyeuse"],
    ["lustig ≠ traurig","drôle, amusant-e ≠ triste"]],
    astuce:"Le signe ≠ de ton livre veut dire « contraire » : apprends ces mots par paires. Le test te demandera parfois le contraire." },
  { icon:"🌦️", titre:"Les mots nouveaux", count:7, html:() => DECKS.find(d => d.key === "neu").items.map(it =>
      `<div class="gef m${it.m}"><s></s><div><div class="de">${esc(it.forme || it.de)}</div><div class="fr">${esc(it.fr[0])}</div>${it.ex ? `<div class="ex">${esc(it.ex)} <i>${esc(it.exFr)}</i></div>` : ""}</div></div>`).join(""),
    astuce:"nerven se conjugue comme un verbe normal : er nervt, et au passé er hat genervt (avec hat, pas ist). La barre de couleur à gauche range les humeurs du plus orageux (rouge) au plus ensoleillé (vert) : c'est un repère pour la mémoire, pas une info du livre." },
  { icon:"💬", titre:"Réagir : Was ist los?", pairs:[
    ["Was ist (denn) los?","Qu'est-ce qu'il y a ? Que se passe-t-il ?"],
    ["Ich habe (sehr) gute / schlechte Laune.","Je suis de (très) bonne / mauvaise humeur."],
    ["Ich mag es (nicht), wenn …","J'aime bien (Je n'aime pas), quand…"]],
    astuce:"En français on « est » de bonne humeur ; en allemand on l'« a » : Ich habe gute Laune." },
  { icon:"🎯", titre:"Mes réflexes pour mardi", tips:[
    "Les Umlaute comptent : glücklich, müde, blöd, wütend, süss, ängstlich. Dans cet outil, « mude » au lieu de « müde » est faux, comme au test.",
    "süss s'écrit avec ss, comme dans ton livre suisse ; si tu écris süß, c'est accepté aussi.",
    "Ne confonds pas les deux mots fâchés : sauer = fâché-e, wütend = furieux / furieuse (plus fort).",
    "Ne confonds pas froh (content-e) et glücklich (heureux / heureuse).",
    "Récite les deux paires de contraires à voix haute : interessant ≠ langweilig, lustig ≠ traurig."] },
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
  mcq_phrase: { type:"mcq",  tag:"phrase",    aspect:"phrase", consigne:"Complète la phrase." },
  type_phrase:{ type:"type", tag:"phrase",    aspect:"phrase", consigne:"Complète la phrase (écris ce qui manque)." },
};
const KIND_ORDER = ["mcq_mot","type_mot","mcq_contr","type_contr","mcq_pres","type_pres","mcq_pp","type_pp","mcq_phrase","type_phrase"];
const TAG_LABEL = { allemand:"vocabulaire", contraire:"contraire", verbe:"verbe nerven", phrase:"phrase à compléter" };

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
      return out; },
    kinds: (d, it, diff) => { const out = [choix(diff, "mcq_mot", "type_mot")];
      if (it.contr) out.push(choix(diff, "mcq_contr", "type_contr"));
      if (it.pres) out.push(choix(diff, "mcq_pres", "type_pres"));
      if (it.pp) out.push(choix(diff, "mcq_pp", "type_pp"));
      return out; },
    base: (it, d) => `${it.forme || it.de} = ${it.fr[0]}${it.contr ? " (contraire : " + it.contr + ")" : ""}${it.ex ? ". " + it.ex + " = " + it.exFr : ""} — ${it.src || d.src}.`,
    fill: (q, kind, it, d) => {
      const base = GENS.mot.base(it, d);
      q.expl = base; q.keep = true;
      switch(kind){
        case "mcq_mot":    q.word = it.de; q.options = fillOpts(it.fr[0], [], d.items.map(x => x.fr[0])); q.answer = it.fr[0]; break;
        case "type_mot":   q.word = it.fr[0]; q.accept = [it.de, ...(it.alt || [])]; q.answer = it.de; break;
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

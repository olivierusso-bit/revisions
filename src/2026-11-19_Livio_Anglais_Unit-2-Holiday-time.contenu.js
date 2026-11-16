/* ============================================================
   CONTENU — Anglais, Unit 2 « Holiday time » : Active wordlist pp. 20-21
   Outil de révision de Livio — 10e HarmoS. Test : jeudi 19 novembre 2026 (agenda : « ANG TE Voc p. 20-21 »).
   Ce fichier est la seule partie propre à cet outil. Il est assemblé avec
   claude/couche-langues.js et claude/noyau-quiz.js par claude/assembler.py.
   Modèle : claude/2026-11-06_Liano_Anglais_Unit-2-My-world.contenu.js (règles de correction de l'anglais),
   sans sa partie « ancien format » (outil neuf, aucun historique à relire).
   ============================================================ */

/* Thème « carte d'embarquement » : bleu nuit de l'aéroport, turquoise de la mer, orange du surligneur de la p. 20. */
const CSS_THEME = `
:root{
  --paper:#f3f1ea; --sheet:#ffffff; --ink:#14233a; --soft:#5d6b7e; --rule:#dcd8cb;
  --court:#0e7c86; --court-wash:#e0f2f1; --jersey:#f28c28; --score:#f6b04a; --board:#14233a;
  --good:#1f8a57; --good-wash:#d4f0e1; --bad:#a3241b; --bad-wash:#f6dedb; --on-court:#ffffff;
  --p-okdark:#0f6b45; --p-ok:#1f8a57; --p-mid:#d9821c; --p-low:#c23b2e; --p-lowsoft:#e8b7b1;
  --box:#0e7c86; --crane:#f28c28;
  --display:"Bricolage Grotesque","Trebuchet MS",system-ui,sans-serif;
  --body:"Atkinson Hyperlegible",system-ui,-apple-system,sans-serif;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --paper:#0d1724; --sheet:#152335; --ink:#eef3f8; --soft:#9fb0c2; --rule:#26384f;
  --court:#3cc2cc; --court-wash:#12313a; --jersey:#ff9f45; --score:#ffbf66; --board:#081320;
  --good:#3fc98a; --good-wash:#0c3b28; --bad:#ef6b5e; --bad-wash:#3a1e1b; --on-court:#081320;
  --p-okdark:#2fd08a; --p-ok:#3fc98a; --p-mid:#f2a43a; --p-low:#ef6b5e; --p-lowsoft:#6b2b26;
  --box:#3cc2cc; --crane:#ff9f45; color-scheme:dark}}
:root[data-theme="dark"]{
  --paper:#0d1724; --sheet:#152335; --ink:#eef3f8; --soft:#9fb0c2; --rule:#26384f;
  --court:#3cc2cc; --court-wash:#12313a; --jersey:#ff9f45; --score:#ffbf66; --board:#081320;
  --good:#3fc98a; --good-wash:#0c3b28; --bad:#ef6b5e; --bad-wash:#3a1e1b; --on-court:#081320;
  --p-okdark:#2fd08a; --p-ok:#3fc98a; --p-mid:#f2a43a; --p-low:#ef6b5e; --p-lowsoft:#6b2b26;
  --box:#3cc2cc; --crane:#ff9f45; color-scheme:dark}
/* en-tête façon carte d'embarquement : talon détachable à gauche, perforation en pointillé */
.head{background:#14233a;color:#fff;border-radius:16px;padding:12px 14px 12px 0;gap:0;position:relative;overflow:hidden}
.head::after{content:"";position:absolute;left:0;right:0;bottom:0;height:5px;background:repeating-linear-gradient(90deg,#f28c28 0 18px,#0e7c86 18px 36px)}
.head .jersey{background:transparent;box-shadow:none;border-right:2px dashed rgba(255,255,255,.45);border-radius:0;padding:6px 14px;margin-right:14px;flex-direction:column;gap:2px}
.head .jersey b{color:#f6b04a;font-size:15px;letter-spacing:2px}
.head .jersey small{display:block;color:#fff;font-size:10px;letter-spacing:1.5px;opacity:.8;font-weight:700}
.head h1{color:#fff;letter-spacing:-.5px}
.head p{color:#fff;opacity:.85}
.face{border-top-color:var(--jersey)}
.entry.open{border-left-color:var(--jersey)}
/* étiquettes des types de questions */
.chip.sens{background:#e0f2f1;color:#0b5f66}
.chip.anglais{background:#fde7cf;color:#7a3f00}
:root[data-theme="dark"] .chip.sens{background:#12313a;color:#7fe0e7}
:root[data-theme="dark"] .chip.anglais{background:#3a2610;color:#ffc98a}
/* liste de la fiche */
.wl{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:0 12px;margin:4px 0}
.wl span{padding:6px 0;border-top:1px solid var(--rule);font-size:14.5px}
.wl span.en{font-weight:700;color:var(--court)}
`;

const QUIZ_ID = "livio-quiz-anglais-unit2holiday";
const DUE = { iso:"2026-11-19", long:"jeudi 19 novembre", short:"19.11" };
const THEME = "Unit 2 « Holiday time » (Active wordlist pp. 20-21)";
const VERSION = { n:4, date:"16.11.2026" };   /* v4 : 16.11.2026, noyau v14 (« Réviser mes erreurs » avec choix du niveau, sortie au niveau de l'erreur ou plus haut ; tableau jour par jour avec ○ □ ◆ ★ ; notes par niveau dans l'onglet Scores) */
/* v3 : 16.11.2026, barre des cartes testées par niveau : trois lignes Échauffement, Entraînement, Niveau épreuve, avec « Tester les X » ou « ✓ complet » au bout de chaque ligne (noyau v13).
/* v2 : 15.11.2026, fiche : emoji du paquet devant chaque section de vocabulaire (« undefined » s'affichait par-dessus le titre).
   v1 : 15.11.2026, première version — couche Langues (anglais), noyau v12 : p. 20 en entier (parenthèses comprises),
   p. 21 « Words and phrases » et ses phrases ; « Everyday English » laissé de côté (barré sur la photo). */

const OUTIL = {
  eleve:"Livio", classe:"10e HarmoS", branche:"Anglais",
  titre:"Unit 2 · Holiday time", sousTitre:"Anglais · vocabulaire pp. 20-21",
  badgeHtml:`<div class="jersey" aria-hidden="true"><b>ANG</b><small>GATE 20·21</small></div>`,
  jersey:"✈️",
  polices:"https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap",
  introFiche:"Tout le vocabulaire du test du jeudi 19 novembre : la page 20 en entier, avec ce qui est entre parenthèses, et la page 21 sans « Everyday English ». Chaque paquet commence par sa page (« p. 20 · … ») : coche dans « Paquets » ce que tu veux réviser.",
  labelTout:"Pages 20 et 21",
  motPaquet:"Paquet",
  sousNiveaux:{ easy:"Tu choisis la bonne traduction (QCM), dans les deux sens.", normal:"Un mélange : tu choisis l'anglais, ou tu écris le français.", hard:"Comme au test : tu vois le français, tu écris l'anglais. 💪" },
  papier:{ titre:"Anglais · Unit 2 Holiday time (pp. 20-21) — test du jeudi 19 novembre", court:"Anglais · Unit 2 Holiday time", fichier:"Livio_Anglais_Unit-2-Holiday-time", code:"#PDF-ANGLAIS-HOLIDAY" },
  copie:{ titre:"Anglais · Unit 2 Holiday time, pp. 20-21 (Livio)" },
  analyse:{
    role:"un tuteur d'anglais",
    sujet:"l'anglais, Unit 2 « Holiday time » (expressions de temps au futur, voyages et transports, activités de vacances, mots et phrases de la gare et de l'aéroport)",
    etiquettes:"sens = traduire l'anglais en français, anglais = écrire ou choisir l'anglais à partir du français",
    pistes:"les petits mots des expressions de temps (on Monday, in two days, next week sans « the »), ce soir = tonight ou this evening, les verbes de transport (get a bus, fly, cycle), l'orthographe des mots longs (sightseeing, snorkelling, exhibition, timetable), l'ordre des mots dans les questions (How long does it take?)",
  },
};

/* ===== Sources (visibles partout, y compris sur le site public) ===== */
const SOURCES = [
  { titre:"Photo 1 — livre p. 20, « Active wordlist », Unit 2 « Holiday time »", recue:"15.11.2026",
    contenu:"Future time expressions, Travel and transport, Holiday activities 1 (titres surlignés en orange) et Holiday activities 2 (entouré en orange) : toute la page, avec ce qui est entre parenthèses (demande du papa)." },
  { titre:"Photo 2 — livre p. 21, « Active wordlist », Unit 2", recue:"15.11.2026",
    contenu:"« Words and phrases » (surligné en jaune) : 16 mots, puis 7 questions et phrases (Are you doing anything special? … Which platform does the train leave from?). « Everyday English » est barré en jaune : pas repris." }
];
const PHOTOS = [ { titre:"Photo 1 — livre p. 20", url:"/_blob/2a6fc0f70ff7d4d58fc4ea68307dec30" }, { titre:"Photo 2 — livre p. 21", url:"/_blob/ca1328601ffe89abfc7633a80c666478" } ];
const SOURCES_NOTE = "Page 20 : tout est repris, parenthèses comprises. Les lignes qui regroupent plusieurs expressions sont coupées en cartes séparées, avec les mots du livre : « in (two) (days/months) » donne in two days et in two months ; « next (week/weekend/month/year) » en donne quatre ; « on (Saturday) (morning) » donne on Saturday morning ; « this (morning/afternoon/evening) » en donne trois ; « get (a bus/train) » en donne deux. Page 21 : ce qui est entre parenthèses est facultatif dans tes réponses (adventure (holiday), I'm really looking forward to (meeting you)). « Everyday English » (barré) n'est pas dans l'outil. Sur la photo de la p. 20, la colonne française est décalée d'une ligne vers le bas dans « Holiday activities 2 » : les mots sont appariés dans l'ordre (buy souvenirs = acheter des souvenirs … visit a castle = visiter un château).";

/* ===== Données : couche Langues (anglais) =====
   item : { en, enShow?, enAccept[], optParen?, keep?, fr[], frShow, phrase? }
   en = la réponse anglaise de référence ; les mots entre parenthèses sont exigés sauf optParen (p. 21) ;
   les parenthèses elles-mêmes ne comptent jamais (la correction ignore la ponctuation). */
const DECKS = [
  { key:"temps", title:"p. 20 · Future time expressions", emoji:"🗓️", src:"livre p. 20, « Future time expressions »", items:[
    {en:"in two days",fr:["dans deux jours"],frShow:"dans deux jours"},
    {en:"in two months",fr:["dans deux mois"],frShow:"dans deux mois"},
    {en:"next week",fr:["la semaine prochaine"],frShow:"la semaine prochaine"},
    {en:"next weekend",enAccept:["next week-end","next week end"],fr:["le week-end prochain","le weekend prochain"],frShow:"le week-end prochain"},
    {en:"next month",fr:["le mois prochain"],frShow:"le mois prochain"},
    {en:"next year",fr:["l'année prochaine"],frShow:"l'année prochaine"},
    {en:"on Monday",fr:["lundi"],frShow:"lundi"},
    {en:"on Saturday morning",fr:["samedi matin"],frShow:"samedi matin"},
    {en:"this morning",fr:["ce matin"],frShow:"ce matin"},
    {en:"this afternoon",fr:["cette après-midi","cet après-midi"],frShow:"cette après-midi"},
    {en:"this evening",enAccept:["tonight"],fr:["ce soir"],frShow:"ce soir",excl:["tonight"],note:"le livre traduit aussi tonight par « ce soir »"},
    {en:"tomorrow",fr:["demain"],frShow:"demain"},
    {en:"tonight",excl:["this evening"],fr:["ce soir / cette nuit","ce soir","cette nuit"],frShow:"ce soir / cette nuit"}
  ]},
  { key:"transport", title:"p. 20 · Travel and transport", emoji:"🚆", src:"livre p. 20, « Travel and transport »", items:[
    {en:"come back",fr:["revenir"],frShow:"revenir"},
    {en:"cycle",fr:["aller à vélo"],frShow:"aller à vélo"},
    {en:"fly",fr:["voyager en avion"],frShow:"voyager en avion"},
    {en:"get a bus",fr:["prendre l'autobus","prendre le bus"],frShow:"prendre l'autobus"},
    {en:"get a train",fr:["prendre le train"],frShow:"prendre le train"},
    {en:"go on holiday (to Spain)",fr:["aller en vacances (en Espagne)"],frShow:"aller en vacances (en Espagne)"},
    {en:"leave",fr:["partir"],frShow:"partir"},
    {en:"spend (time)",fr:["passer (du temps)"],frShow:"passer (du temps)"},
    {en:"stay (in a hotel)",fr:["séjourner, loger (à l'hôtel)","séjourner (à l'hôtel)","loger (à l'hôtel)"],frShow:"séjourner, loger (à l'hôtel)"},
    {en:"travel (by boat)",fr:["voyager (en bateau)"],frShow:"voyager (en bateau)"}
  ]},
  { key:"act1", title:"p. 20 · Holiday activities 1", emoji:"🏄", src:"livre p. 20, « Holiday activities 1 »", items:[
    {en:"bungee jumping",fr:["saut à l'élastique"],frShow:"saut à l'élastique"},
    {en:"camping",fr:["camping"],frShow:"camping"},
    {en:"canoeing",fr:["canoë"],frShow:"canoë"},
    {en:"climbing",fr:["escalade"],frShow:"escalade"},
    {en:"hiking",fr:["randonnée"],frShow:"randonnée"},
    {en:"kite surfing",enAccept:["kitesurfing","kite-surfing"],fr:["kitesurf"],frShow:"kitesurf"},
    {en:"paragliding",fr:["parapente"],frShow:"parapente"},
    {en:"sightseeing",fr:["tourisme"],frShow:"tourisme"},
    {en:"snorkelling",fr:["plongée avec tuba"],frShow:"plongée avec tuba"},
    {en:"sunbathing",fr:["bain de soleil"],frShow:"bain de soleil"}
  ]},
  { key:"act2", title:"p. 20 · Holiday activities 2", emoji:"🏰", src:"livre p. 20, « Holiday activities 2 »", items:[
    {en:"buy souvenirs",fr:["acheter des souvenirs"],frShow:"acheter des souvenirs"},
    {en:"go on a coach trip",fr:["faire un voyage en car"],frShow:"faire un voyage en car"},
    {en:"go to a theme park",fr:["aller dans un parc à thème"],frShow:"aller dans un parc à thème"},
    {en:"go to an exhibition",fr:["aller voir une exposition"],frShow:"aller voir une exposition"},
    {en:"learn local customs",fr:["apprendre les coutumes locales"],frShow:"apprendre les coutumes locales"},
    {en:"look at the view",fr:["regarder la vue"],frShow:"regarder la vue"},
    {en:"meet local people",fr:["rencontrer les habitants"],frShow:"rencontrer les habitants"},
    {en:"try local food",fr:["goûter la cuisine locale"],frShow:"goûter la cuisine locale"},
    {en:"try out the language",fr:["s'essayer à parler la langue"],frShow:"s'essayer à parler la langue"},
    {en:"visit a castle",fr:["visiter un château"],frShow:"visiter un château"}
  ]},
  { key:"mots", title:"p. 21 · Words and phrases", emoji:"🎫", src:"livre p. 21, « Words and phrases »", items:[
    {en:"adventure (holiday)",optParen:true,fr:["vacances aventure","aventure","(vacances) aventure"],frShow:"(vacances) aventure"},
    {en:"airport",fr:["aéroport"],frShow:"aéroport"},
    {en:"boarding pass",fr:["carte d'embarquement"],frShow:"carte d'embarquement"},
    {en:"bus station",fr:["gare routière"],frShow:"gare routière"},
    {en:"gate",fr:["porte"],frShow:"porte"},
    {en:"information",fr:["informations"],frShow:"informations"},
    {en:"leaflet",fr:["dépliant"],frShow:"dépliant"},
    {en:"one way",enAccept:["one-way"],fr:["aller simple"],frShow:"aller simple"},
    {en:"platform",fr:["quai"],frShow:"quai"},
    {en:"return",enShow:"return (n)",fr:["aller-retour"],frShow:"aller-retour"},
    {en:"station",fr:["gare, station","gare","station"],frShow:"gare, station"},
    {en:"ticket",fr:["billet"],frShow:"billet"},
    {en:"timetable",fr:["horaire"],frShow:"horaire"},
    {en:"tourist information centre",enAccept:["tourist information center"],fr:["office de tourisme"],frShow:"office de tourisme"},
    {en:"trip",fr:["voyage"],frShow:"voyage"},
    {en:"Underground",fr:["métro"],frShow:"métro"}
  ]},
  { key:"phrases", title:"p. 21 · Questions et phrases", emoji:"💬", src:"livre p. 21, « Words and phrases » (phrases)", items:[
    {en:"Are you doing anything special?",keep:true,phrase:true,fr:["Tu fais / Vous faites quelque chose de particulier ?","Tu fais quelque chose de particulier ?","Vous faites quelque chose de particulier ?"],frShow:"Tu fais / Vous faites quelque chose de particulier ?"},
    {en:"Can you give me some information about …?",keep:true,phrase:true,enAccept:["Can you give me some information about?"],fr:["Est-ce que vous pouvez me donner des renseignements sur… ?"],frShow:"Est-ce que vous pouvez me donner des renseignements sur… ?"},
    {en:"How do I get there?",keep:true,phrase:true,fr:["Comment fait-on pour y aller ?"],frShow:"Comment fait-on pour y aller ?"},
    {en:"How long does it take?",keep:true,phrase:true,fr:["Ça prend combien de temps ?"],frShow:"Ça prend combien de temps ?"},
    {en:"How much does it cost?",keep:true,phrase:true,fr:["Ça coûte combien ?"],frShow:"Ça coûte combien ?"},
    {en:"I'm really looking forward to (meeting you).",keep:true,phrase:true,optParen:true,enAccept:["I am really looking forward to (meeting you)."],fr:["J'ai hâte de (te/vous rencontrer)."],frShow:"J'ai hâte de (te/vous rencontrer)."},
    {en:"Which platform does the train leave from?",keep:true,phrase:true,fr:["Le train part de quel quai ?"],frShow:"Le train part de quel quai ?"}
  ]}
];
DECKS.forEach(d => { d.gen = "vocab"; d.unit = d.key === "phrases" ? "phrases" : d.key === "act1" || d.key === "mots" ? "mots" : "expressions"; d.detail = d.src; });
const anCardKey = (d, it) => d.key + "_" + it.en;

/* ---------- fiche ---------- */
const wl = d => `<div class="wl">${d.items.map(it => `<span class="en">${esc(it.enShow || it.en)}</span><span>${esc(it.frShow)}</span>`).join("")}</div><p class="fine">— ${esc(d.src)}</p>`;
const FICHE = [
  { icon:"🧭", titre:"Ce qu'il faut savoir pour jeudi", html:`
    <p class="tip">Au test, tu verras sûrement le <b>français</b> et tu devras écrire l'<b>anglais</b> : c'est le « Niveau épreuve » de l'outil.</p>
    <p class="tip">Page 20 : <b>tout</b>, même ce qui est entre parenthèses (<b>go on holiday to Spain</b>, <b>stay in a hotel</b>, <b>travel by boat</b>). Page 21 : « Words and phrases » et les phrases, <b>sans</b> « Everyday English ».</p>
    <p class="fine">— Conseil de méthode (pas une page du livre), d'après les pages surlignées</p>` },
  { icon:"🔎", titre:"Les pièges à repérer", html:`
    <p class="tip"><b>on</b> devant un jour : <b>on Monday</b> (lundi), <b>on Saturday morning</b> (samedi matin). <b>in</b> devant une durée : <b>in two days</b> (dans deux jours).</p>
    <p class="tip"><b>next week</b>, <b>next year</b> : pas de « the » en anglais, alors que le français dit « <b>la</b> semaine prochaine ».</p>
    <p class="tip"><b>ce soir</b> : le livre donne <b>this evening</b> et <b>tonight</b> (ce soir / cette nuit). Les deux sont acceptés quand tu vois « ce soir ».</p>
    <p class="tip"><b>get</b> a bus / a train = <b>prendre</b> le bus / le train. <b>fly</b> = voyager en avion, <b>cycle</b> = aller à vélo.</p>
    <p class="tip">Orthographe : sigh<b>t</b>seeing, snorke<b>ll</b>ing (deux l), exhi<b>b</b>ition, ti<b>me</b>table, Underground avec une <b>majuscule</b> (comme dans le livre).</p>
    <p class="tip">Questions : <b>How long does it take?</b> · <b>How much does it cost?</b> · <b>Which platform does the train leave from?</b> — le petit mot <b>does</b> vient avant <b>it</b> / <b>the train</b>.</p>
    <p class="fine">— Conseil de méthode (pas une page du livre), à partir des pp. 20-21</p>` },
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
  q.expl = `${label} = ${it.frShow}${it.note ? " (" + it.note + ")" : ""} — ${d.src}`;
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

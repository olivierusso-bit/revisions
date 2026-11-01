/* ============================================================
   CONTENU — Maths 10CR niveau 2 · TE 3 « NO – Puissances, racines »
   Outil de révision de Livio — 10e HarmoS. Épreuve : jeudi 5 novembre 2026.
   Ce fichier est la seule partie propre à cet outil. Il est assemblé avec
   claude/couche-maths.js et claude/noyau-quiz.js par claude/assembler.py (--couche maths).
   Paquets = les 6 objectifs de la feuille « Objectifs TE 3 », dans son ordre (demande du papa, 31.10.2026).
   ============================================================ */

/* Règle logarithmique des puissances de dix : exposants négatifs en magenta, positifs en indigo, 10⁰ au centre.
   Les calculs sont en chasse fixe, comme au cahier. Palette propre (--pos, --neg, --mark) reliée aux noms de la base. */
const CSS_THEME = `
:root{
  --paper:#F1F0F6; --sheet:#FFFFFF; --ink:#1A1834; --soft:#5B5878; --rule:#CFCCE0;
  --pos:#3A3A96; --pos-wash:#E3E3F5; --neg:#A73A72; --neg-wash:#F7E1EC; --mark:#C99A00; --board:#1A1834;
  --good:#11704B; --good-wash:#DCF1E6; --bad:#B23A26; --bad-wash:#F9E1DB; --on-accent:#FFFFFF;
  --p-okdark:#0B5A3A; --p-ok:#2E9E62; --p-mid:#D9860B; --p-low:#C6382B; --p-lowsoft:#F2B9B2;
  --display:'Familjen Grotesk','Arial Narrow',system-ui,sans-serif;
  --body:'Atkinson Hyperlegible',system-ui,-apple-system,'Segoe UI',sans-serif;
  --mono:'IBM Plex Mono',ui-monospace,Menlo,Consolas,monospace;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --paper:#0F0E1C; --sheet:#1A1930; --ink:#E8E6F4; --soft:#A3A0C0; --rule:#2F2D4A;
  --pos:#9C9CF2; --pos-wash:#24234A; --neg:#F08CBE; --neg-wash:#3A1D2E; --mark:#E6B82A; --board:#0A0916;
  --good:#5ED3A0; --good-wash:#173326; --bad:#FF8A7D; --bad-wash:#3A1E1B; --on-accent:#0F0E1C;
  --p-okdark:#3FCB86; --p-ok:#7EDCA8; --p-mid:#F2A93B; --p-low:#FF7A6B; --p-lowsoft:#5A2A26; color-scheme:dark}}
:root[data-theme="dark"]{
  --paper:#0F0E1C; --sheet:#1A1930; --ink:#E8E6F4; --soft:#A3A0C0; --rule:#2F2D4A;
  --pos:#9C9CF2; --pos-wash:#24234A; --neg:#F08CBE; --neg-wash:#3A1D2E; --mark:#E6B82A; --board:#0A0916;
  --good:#5ED3A0; --good-wash:#173326; --bad:#FF8A7D; --bad-wash:#3A1E1B; --on-accent:#0F0E1C;
  --p-okdark:#3FCB86; --p-ok:#7EDCA8; --p-mid:#F2A93B; --p-low:#FF7A6B; --p-lowsoft:#5A2A26; color-scheme:dark}
:root{ --court:var(--pos); --court-wash:var(--pos-wash); --jersey:var(--neg); --score:var(--mark); --on-court:var(--on-accent); --box:var(--pos); --crane:var(--mark);
  --focus:var(--mark); --scorebox-border:#2F2D4A; --r-xl:12px; --r-l:12px; --r:10px; --r-m:10px; --r-s:8px; --r-xs:4px; }
.head{align-items:center}
.badge{width:60px;height:60px;flex:none;border-radius:50%;background:var(--board);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1}
.badge small{font-size:11px;letter-spacing:1px;font-weight:700;color:var(--mark)}
.badge b{font-family:var(--display);font-weight:700;font-size:26px}
.head h1{font-size:clamp(28px,7.5vw,36px);text-wrap:balance}
.axis{display:block;width:100%;height:auto;margin:-8px 0 16px}
/* calculs en chasse fixe, comme au cahier */
.qword{font-family:var(--mono);font-weight:600;font-size:clamp(21px,6vw,28px);line-height:1.35;overflow-wrap:anywhere}
.qword.txt{font-family:var(--body);font-weight:700;font-size:clamp(19px,5.2vw,23px)}
.choice.expr{font-family:var(--mono);font-size:18px}
.tinput{font-family:var(--mono);font-weight:600}
.face{border-top-color:var(--neg)}
.face-word{font-family:var(--mono);font-weight:600;font-size:24px;line-height:1.3;overflow-wrap:anywhere}
.face-word.txt{font-family:var(--body);font-size:20px}
.fb p b,.dx-ans{font-family:var(--mono)}
.pair-de{font-family:var(--mono);font-weight:600;overflow-wrap:anywhere}
.score-n{color:#fff} .score-n small{color:#A3A0C0} .score-note{color:#1A1834}
/* magenta pour ce qui demande attention : chiffres changés, section manquante, erreurs vues sur ses feuilles */
.chg{color:var(--neg);border-color:var(--neg)}
.entry-num.miss{color:var(--neg);border-color:var(--neg)}
.astuce.neg{background:var(--neg-wash)} .astuce.neg b{color:var(--neg)}
.num{font-family:var(--mono)}
.flash{height:300px}
`;

const QUIZ_ID = "livio-quiz-maths-te3-puissances";
const DUE = { iso:"2026-11-05", long:"jeudi 5 novembre", short:"05.11" };
const THEME = "TE3 — Puissances, notation scientifique, racines";
const VERSION = { n:4, date:"01.11.2026" };   /* v4 : 01.11.2026, outil réglé sur 5 questions par objectif à l'ouverture (« Combien de questions », on peut choisir 3, 8 ou tout) ; version papier avec un cadre quadrillé sous chaque calcul · v1 : 31.10.2026, première version (dans Claude), photos dans l'espace privé · v2 : 01.11.2026, reconstruit sur le noyau commun (refonte C3), même contenu et même historique · v3 : 01.11.2026, scores synchronisés entre appareils sur le site (refonte D4) */

/* Tout ce que le noyau affiche ou écrit et qui dépend de l'outil. Jamais d'âge en dur : le noyau le déduit de la classe. */
const OUTIL = {
  eleve:"Livio", classe:"10e HarmoS (niveau 2)", branche:"Mathématiques",
  titre:"Puissances et racines", sousTitre:"Maths 10CR niveau 2",
  jersey:"TE 3",
  badgeHtml:`<div class="badge" aria-hidden="true"><small>TE</small><b>3</b></div>`,
  /* règle des puissances de dix, de 10⁻⁶ à 10⁹ : chaque graduation vaut dix fois la précédente */
  sousEntete(){
    let t = "";
    for (let k = -6; k <= 9; k++){
      const x = 16 + (k + 6) * 24.5, col = k < 0 ? "var(--neg)" : k > 0 ? "var(--pos)" : "var(--ink)";
      t += `<line x1="${x}" y1="${k===0?6:12}" x2="${x}" y2="${k===0?30:24}" stroke="${col}" stroke-width="${k===0?3:1.5}"/>`;
      if (k % 3 === 0) t += `<text x="${x}" y="46" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="11" font-weight="${k===0?600:500}" fill="${col}">10${uni("^(" + (k<0?"−":"") + Math.abs(k) + ")")}</text>`;
    }
    return `<svg class="axis" viewBox="0 0 400 52" role="img" aria-label="Règle des puissances de dix, de 10 puissance moins 6 à 10 puissance 9"><line x1="16" y1="18" x2="163" y2="18" stroke="var(--neg)" stroke-width="2"/><line x1="163" y1="18" x2="384" y2="18" stroke="var(--pos)" stroke-width="2"/>${t}</svg>`;
  },
  polices:"https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@600;700&family=Atkinson+Hyperlegible:wght@400;700&family=IBM+Plex+Mono:wght@500;600&display=swap",
  introFiche:"Une section par objectif de ta feuille, dans le même ordre, avec la théorie et tes propres exercices. Relis, puis va te tester.",
  ficheOuverte:-1,
  titreAstuceNeg:"Attention, vu sur tes feuilles",
  labelTout:"Tout le TE3",
  motPaquet:"Objectif", motPaquets:"objectifs",
  compte:"questions",
  comptes:[3, 5, 8, 0], compteDefaut:5, comptesParPaquet:true, compteLabel:"Combien de questions par objectif",
  ordres:{
    paper:{ label:"Comme la feuille papier", sub:"Même ordre et mêmes numéros sur papier et à l'écran", emoji:"📝" },
    mixed:{ label:"Mélangé", sub:"Pour vérifier que tu ne réponds pas par habitude", emoji:"🔀" },
  },
  sousNiveaux:{ easy:"Je choisis parmi les réponses proposées", hard:"J'écris toutes les réponses" },
  conseilSetup:"Pour un exposant, tape ^ : 10^7 pour 10⁷, 10^-3 pour 10⁻³. Notation scientifique : 4,8·10^-3 (le point · est sur le clavier sous la question). Les classements restent à choix, même au niveau épreuve.",
  prefixeIndice:"",
  papier:{ titre:"Mathématiques 10CR niveau 2 — TE 3 « Puissances, racines »", court:"Maths TE3", fichier:"maths-te3-livio", code:"#PDF-MATHS-TE3" },
  copie:{ titre:"RÉSULTAT — Maths, TE 3 « Puissances, racines »" },
  analyse:{
    role:"un professeur de mathématiques suisse",
    sujet:"le TE 3 « Puissances, racines » (puissances, notation scientifique, racines)",
    etiquettes:"o1 = livrets de 1 à 12 ; o2 = calculs avec racines, puissances, priorité des opérations, puissances de nombres négatifs, racine d'un nombre négatif ; o3 = propriétés des puissances (même base, puissance de puissance, même exposant, trouver l'exposant) et des racines ; o4 = classer des nombres en notation scientifique ; o5 = passer de la notation décimale à la notation scientifique et inversement, y compris exposants négatifs ; o6 = multiplier et diviser des puissances de dix, km en m en notation scientifique. Dans les réponses tapées, ^ note un exposant (10^-3 = 10⁻³)",
    pistes:"signe de l'exposant oublié pour un nombre plus petit que 1, nombre devant la puissance de dix pas entre 1 et 10, rangs mal comptés, exposants additionnés au lieu de soustraits, division par une puissance négative, carré d'un nombre négatif, racine calculée avant l'opération sous la racine",
  },
};

/* ---------- SOURCES : d'où vient le contenu ---------- */
const SOURCES = [
  { titre:"Photo 1 — feuille « Objectifs TE 3, NO – Puissances, racines »", recue:"31.10.2026", contenu:"Matière (fiches, livre, exercices 1 à 9, théorie) et les 6 objectifs : un paquet par objectif, dans le même ordre." },
  { titre:"Photo 2 — fiche NO214 « Du Soleil à Pluton », corrigée", recue:"31.10.2026", contenu:"Tableau décimal → scientifique, questions a) et b) : objectifs 4 et 5." },
  { titre:"Photo 3 — fiche NO215 « Diamètres de corps célestes », corrigée", recue:"31.10.2026", contenu:"Scientifique → décimal, classement, km en m : objectifs 4, 5 et 6." },
  { titre:"Photo 4 — tableau des puissances de dix et de leurs noms", recue:"31.10.2026", contenu:"De 10⁻²⁴ à 10²⁴ : fiche, section « Noms des puissances de dix »." },
  { titre:"Photo 5 — fiche « Écris en notation scientifique… » (titre non visible, probablement NO216) et NO218 « D'une notation à l'autre »", recue:"31.10.2026", contenu:"Pas encore corrigées par le maître : réponses calculées et vérifiées par programme. Objectif 5." },
  { titre:"Photo 6 — théorie « 6. Racines » et exercices corrigés", recue:"31.10.2026", contenu:"Définitions de la racine carrée, cubique, n-ième ; racine d'un nombre négatif : objectif 2 et fiche." },
  { titre:"Photo 7 — cahier, NO196 p. 66 (réponses corrigées)", recue:"31.10.2026", contenu:"Ses réponses au NO196 : objectifs 2 et 3." },
  { titre:"Photo 8 — fiche NO210 « Puissances de dix »", recue:"31.10.2026", contenu:"Multiplications et divisions de puissances de dix, pas encore corrigées : objectif 6." },
  { titre:"Photo 9 — exercice 9 « Calcule » (dossier distribué), corrigé, 13 points", recue:"31.10.2026", contenu:"Calculs avec racines et priorités : objectifs 1, 2 et 3." },
  { titre:"Photo 10 — livre p. 66, NO196 « Applique-les ! »", recue:"31.10.2026", contenu:"Énoncés du NO196 : objectifs 2 et 3." },
  { titre:"Photo 11 — théorie « Propriétés des racines » et exercices", recue:"31.10.2026", contenu:"√(a·b) = √a · √b et √(a/b) = √a / √b : objectif 3." },
  { titre:"Photo 12 — livre, NO205 « Trouver la lettre »", recue:"31.10.2026", contenu:"Énoncés seulement, pas faits : réponses calculées par programme. Objectif 3." },
  { titre:"Photo 13 — livre p. 68, NO207 « À la racine »", recue:"31.10.2026", contenu:"Énoncés seulement, pas faits : g) et j) (racine d'un nombre négatif) repris dans l'objectif 2." },
  { titre:"Photo 14 — fiches NO198, NO201, NO202, corrigées", recue:"31.10.2026", contenu:"Puissances de nombres négatifs, racines carrées et cubiques : objectifs 1 et 2." },
];
const SOURCES_NOTE = "Chaque question reprend un exercice de ces documents, avec la même consigne et la même façon de faire ; quand c'est marqué « chiffres changés », seuls les nombres ont été remplacés, pour vérifier que tu sais refaire et pas seulement te souvenir. Toutes les réponses ont été calculées et vérifiées par un programme. Pas encore couverts, faute de photo : fiches 189, 190, 197, 199, 204, livre 221, exercices 1 à 8 du dossier distribué. L'objectif 6 (multiplier en notation scientifique) ne s'appuie pour l'instant que sur NO210 et NO215 c). La correction de chaque question indique d'où elle vient.";
/* Photos : seulement dans la version Claude (privée), jamais sur le site public. */
const PHOTOS = [
  { titre:"Objectifs TE 3", url:"/_blob/9a16d79b4e6d67961ef2076ed87b76f6" }, { titre:"NO214", url:"/_blob/da17ef6e30b965a7631726ff1858c163" }, { titre:"NO215", url:"/_blob/c2f153b3284eff2f29d575302e534fd1" }, { titre:"Puissances de dix", url:"/_blob/9758113a5e4bf7f367709144e077e86f" },
  { titre:"NO216 (?) et NO218", url:"/_blob/0b6a030616024c75e50a2c2842a305db" }, { titre:"6. Racines", url:"/_blob/4129e93527cceac3a4ca0532e5cd4c47" }, { titre:"NO196 au cahier", url:"/_blob/f41da15db151983521db093f69a0972e" }, { titre:"NO210", url:"/_blob/abff3ebe5bdb557dfc25045aeb91c21e" },
  { titre:"Exercice 9", url:"/_blob/6fe3ceea2f8e6803db9fca68b176695c" }, { titre:"Livre p. 66", url:"/_blob/1c5aadb0706dc1d822cc57633b3d66a0" }, { titre:"Propriétés des racines", url:"/_blob/248a295354e92e6ef7f9357659856243" }, { titre:"NO205", url:"/_blob/d2ef735a5a0a4080e95f388f29b68b9d" },
  { titre:"Livre p. 68", url:"/_blob/a2c41566368313d5e3cf8d5cd213cce3" }, { titre:"NO198, NO201, NO202", url:"/_blob/4cf19791b3f640c00ca84d0b94598589" },
];

/* ---------- CONTENU : un paquet par objectif ----------
   front = énoncé (^ = exposant), back = réponses acceptées (1re = affichée), wrong = erreurs typiques,
   mcqOnly = toujours à choix, expr = réponse en écriture (puissance, fraction, notation scientifique),
   chg = chiffres changés par rapport à l'exercice d'origine (src). */

/* ---------- CONTENU : un paquet par objectif ----------
   front = énoncé (^ = exposant), back = réponses acceptées (1re = affichée), wrong = erreurs typiques,
   mcqOnly = toujours à choix, expr = réponse en écriture (puissance, fraction, notation scientifique),
   chg = chiffres changés par rapport à l'exercice d'origine (src). Les références a), b)… sont posées par la couche Maths. */
const DECKS = [
  { key:"o1", unit:"questions", code:"Obj. 1", title:"Maîtriser les livrets (1 à 12)", src:"multiplications de tes exercices", consigne:"Calcule de tête :", items:[
    { front:"4 · 5", back:["20"], wrong:["9","25","45"], expl:"4 · 5 = 20. C'est le calcul de √16 · √25.", src:"Propriétés des racines, √(16 · 25)" },
    { front:"9 · 2", back:["18"], wrong:["11","92","81"], expl:"9 · 2 = 18. Dans (3 · √2)², tu calcules 9 · 2.", src:"exercice 9 j)" },
    { front:"4 · 7", back:["28"], wrong:["11","24","47"], expl:"4 · 7 = 28. Dans (−2 · √7)², tu calcules 4 · 7.", src:"exercice 9 k)" },
    { front:"3 · 12", back:["36"], wrong:["15","32","312"], expl:"3 · 12 = 36, d'où √3 · √12 = √36 = 6.", src:"Propriétés des racines, √3 · √12" },
    { front:"3 · 5", back:["15"], wrong:["8","35","53"], expl:"3 · 5 = 15, d'où √(9 · 25) = 3 · 5 = 15.", src:"NO202 i)" },
    { front:"7 · 7", back:["49"], wrong:["14","42","77"], expl:"7 · 7 = 49, donc √49 = 7.", src:"théorie « 6. Racines »" },
    { front:"8 · 8", back:["64"], wrong:["16","56","88"], expl:"8 · 8 = 64, donc √8 · √8 = √64 = 8.", src:"Propriétés des racines, √8 · √8" },
    { front:"9 · 9", back:["81"], wrong:["18","72","99"], expl:"9 · 9 = 81, donc √81 = 9.", src:"exercice 9 h)" },
    { front:"11 · 11", back:["121"], wrong:["22","111","1111"], expl:"11 · 11 = 121, donc √121 = 11.", src:"NO201 a)" },
    { front:"12 · 6", back:["72"], wrong:["18","66","62"], chg:true, expl:"12 · 6 = 72. Sur ta feuille de propriétés, 72 : 2 = 36, et 36 = 6 · 6.", src:"Propriétés des racines, √72 / √2" },
  ]},
  { key:"o2", unit:"questions", code:"Obj. 2", title:"Quatre opérations, puissances, racines, priorités", src:"exercice 9, NO196, NO198, Racines", consigne:"Calcule :", items:[
    { front:"√36 + √16", back:["10"], wrong:["√52","52","20"], chg:true, expl:"Les racines d'abord : √36 = 6 et √16 = 4. Puis 6 + 4 = 10. Même calcul que √49 + √25 = 12.", src:"exercice 9 a)" },
    { front:"√(100 − 36)", back:["8"], wrong:["4","64","√64"], chg:true, expl:"Ce qui est sous la racine se calcule d'abord : 100 − 36 = 64, puis √64 = 8. Ce n'est pas 10 − 6.", src:"exercice 9 f)" },
    { front:"√(64 + 4 · 9)", back:["10"], wrong:["26","20","14"], chg:true, expl:"Sous la racine, la priorité : 4 · 9 = 36, puis 64 + 36 = 100, et √100 = 10.", src:"exercice 9 i)" },
    { front:"3 · √0,04", back:["0,6"], wrong:["6","0,12","60"], chg:true, expl:"√0,04 = 0,2 car 0,2 · 0,2 = 0,04. Puis 3 · 0,2 = 0,6. Sur ta feuille, 4 · √0,01 = 4 · 0,1 = 0,4.", src:"exercice 9 g)" },
    { consigne:"Donne la réponse sous la forme d'une puissance si c'est possible ; sinon, effectue :", front:"5^2 + 5^2", back:["50"], wrong:["5^4","100","20"], chg:true, expl:"On ne peut pas additionner des puissances en additionnant les exposants : 5² + 5² = 25 + 25 = 50. Même chose que 3³ + 3³ = 54.", src:"NO196 c)" },
    { consigne:"Donne la réponse sous la forme d'une puissance si c'est possible ; sinon, effectue :", front:"5^3 − 4^3", back:["61"], wrong:["1","1^3","9"], chg:true, expl:"5³ = 125 et 4³ = 64, puis 125 − 64 = 61. Comme 7³ − 6³ = 343 − 216 = 127.", src:"NO196 f)" },
    { front:"−6^2", back:["−36"], wrong:["36","−12","12"], chg:true, expl:"Le carré ne touche que le 6 : −6² = −(6 · 6) = −36. Comme −7² = −49.", src:"NO198 f)" },
    { front:"(−3)^3", back:["−27"], wrong:["27","−9","9"], chg:true, expl:"(−3)³ = (−3) · (−3) · (−3) = −27 : trois facteurs négatifs, le résultat est négatif. Comme (−5)³ = −125.", src:"NO198 g)" },
    { front:"∛(−8)", back:["−2"], wrong:["2","−4","impossible"], chg:true, expl:"∛(−8) = −2 car (−2)³ = −8. Une racine cubique d'un nombre négatif existe. Comme ∛(−125) = −5.", src:"théorie « 6. Racines »" },
    { consigne:"Réponds :", front:"√(−49) = ?", back:["impossible : aucun nombre au carré ne donne −49"], wrong:["−7","7","−7 et 7"], mcqOnly:true, chg:true, expl:"Un carré n'est jamais négatif : √(−49) n'existe pas. Sur ta feuille, √−36 = ∅.", src:"théorie « 6. Racines » et NO207 g) j)" },
  ]},
  { key:"o3", unit:"questions", code:"Obj. 3", title:"Propriétés des puissances et des racines", src:"NO196, NO205, propriétés des racines, exercice 9", consigne:"Donne la réponse sous la forme d'une puissance :", items:[
    { front:"3^4 · 3^2", back:["3^6"], expr:true, wrong:["3^8","9^6","3^2"], chg:true, expl:"Même base : on additionne les exposants. 4 + 2 = 6, donc 3⁶. Comme 4⁴ · 4² = 4⁶.", src:"NO196 b)" },
    { front:"10^7 : 10^3", back:["10^4"], expr:true, wrong:["10^10","10^21","1^4"], chg:true, expl:"Même base : on soustrait les exposants. 7 − 3 = 4, donc 10⁴. Comme 10⁶ : 10² = 10⁴.", src:"NO196 j)" },
    { front:"(10^2)^4", back:["10^8"], expr:true, wrong:["10^6","10^42","10^2"], chg:true, expl:"Puissance d'une puissance : on multiplie les exposants. 2 · 4 = 8, donc 10⁸. Comme (10³)² = 10⁶.", src:"NO196 n)" },
    { front:"10^2 / 10^5", back:["10^(−3)"], expr:true, wrong:["10^3","10^7","10^(−7)"], chg:true, expl:"On soustrait : 2 − 5 = −3, donc 10⁻³. Comme 10³ / 10⁶ = 10⁻³.", src:"NO196 o)" },
    { front:"3^2 · 4^2", back:["12^2"], expr:true, wrong:["7^2","12^4","7^4"], chg:true, expl:"Même exposant : on multiplie les bases. 3 · 4 = 12, donc 12². Comme 5² · 2² = 10².", src:"NO196 h)" },
    { front:"3^2 / 5^2", back:["(3/5)^2"], expr:true, wrong:["(3/5)^4","(5/3)^2","(3/5)^1"], chg:true, expl:"Même exposant au numérateur et au dénominateur : (3/5)². Comme 2²/3² = (2/3)².", src:"NO196 q)" },
    { consigne:"Remplace la lettre par un nombre pour que l'égalité soit vraie :", front:"2^3 · 2^x = 64", back:["3"], wrong:["8","2","61"], chg:true, expl:"64 = 2⁶. Donc 3 + x = 6 et x = 3. Comme 3³ · 3ˣ = 243 = 3⁵ donne x = 2.", src:"NO205 a)" },
    { consigne:"Remplace la lettre par un nombre pour que l'égalité soit vraie :", front:"10^5 · 10^x = 10^2", back:["−3"], wrong:["3","7","−7"], chg:true, expl:"5 + x = 2, donc x = −3. Comme 10⁷ · 10ˣ = 10¹ donne x = −6.", src:"NO205 d)" },
    { consigne:"Calcule :", front:"√50 / √2", back:["5"], wrong:["25","24","√48"], chg:true, expl:"√50 / √2 = √(50/2) = √25 = 5. Comme √72 / √2 = √36 = 6.", src:"Propriétés des racines" },
    { consigne:"Calcule :", front:"(−2 · √5)^2", back:["20"], wrong:["−20","10","−10"], chg:true, expl:"(−2 · √5)² = (−2)² · (√5)² = 4 · 5 = 20 : le carré d'un nombre négatif est positif. Comme (−2 · √7)² = 28.", src:"exercice 9 k)" },
  ]},
  { key:"o4", unit:"questions", code:"Obj. 4", title:"Classer des nombres (croissant, décroissant)", src:"NO214 a) b), NO215 b)", consigne:"Choisis :", items:[
    { front:"Le plus grand de ces nombres :", back:["2,1·10^5"], wrong:["6,3·10^4","9,8·10^4","1,05·10^4"], mcqOnly:true, chg:true, expl:"On compare d'abord les exposants : 10⁵ est le plus grand. Comme pour ranger les diamètres du NO215.", src:"NO215 b)" },
    { front:"Le plus petit de ces nombres :", back:["2,9·10^3"], wrong:["3,2·10^3","1,1·10^4","8,4·10^3"], mcqOnly:true, chg:true, expl:"Les trois en 10³ sont plus petits que 1,1 · 10⁴. Parmi eux, on compare les nombres devant : 2,9 < 3,2 < 8,4.", src:"NO215 b)" },
    { front:"Range dans l'ordre croissant : 7,5·10^3 ; 1,2·10^4 ; 9·10^3", back:["7,5·10^3 < 9·10^3 < 1,2·10^4"], wrong:["1,2·10^4 < 7,5·10^3 < 9·10^3","9·10^3 < 7,5·10^3 < 1,2·10^4","7,5·10^3 < 1,2·10^4 < 9·10^3"], mcqOnly:true, chg:true, expl:"Croissant = du plus petit au plus grand. 7 500 < 9 000 < 12 000.", src:"NO215 b)" },
    { front:"Range dans l'ordre décroissant : 4,1·10^9 ; 3,9·10^8 ; 5·10^9", back:["5·10^9 > 4,1·10^9 > 3,9·10^8"], wrong:["4,1·10^9 > 5·10^9 > 3,9·10^8","3,9·10^8 > 4,1·10^9 > 5·10^9","5·10^9 > 3,9·10^8 > 4,1·10^9"], mcqOnly:true, chg:true, expl:"Décroissant = du plus grand au plus petit. 3,9 · 10⁸ est le seul en 10⁸ : il est le plus petit.", src:"objectif 4 et NO214" },
    { front:"Quel nombre vaut environ 6·10^8 ?", back:["578 000 000"], wrong:["6 080 000","61 000 000","5 900 000 000"], mcqOnly:true, chg:true, expl:"578 000 000 = 5,78 · 10⁸, donc environ 6 · 10⁸. Comme Mars : 227 940 000 ≈ 2 · 10⁸.", src:"NO214 a)" },
    { front:"Lequel se situe entre 10^8 et 10^9 ?", back:["4,6·10^8"], wrong:["3,4·10^9","7,2·10^7","1,1·10^10"], mcqOnly:true, chg:true, expl:"Entre 10⁸ et 10⁹, c'est un nombre en « … · 10⁸ ».", src:"NO214 b)" },
    { front:"Vénus est à 108 190 000 km du Soleil. Se situe-t-elle entre 10^8 et 10^9 km ?", back:["Oui, car 108 190 000 = 1,0819·10^8"], wrong:["Non, car 108 190 000 = 108,19·10^6","Non, elle est avant 10^8"], mcqOnly:true, expl:"108 190 000 = 1,0819 · 10⁸ : c'est plus que 10⁸ (100 000 000). Sur ta feuille, Vénus avait été oubliée.", src:"NO214 b)" },
    { front:"Le plus grand : 9,9·10^5 ou 1,01·10^6 ?", back:["1,01·10^6"], wrong:["9,9·10^5","ils sont égaux"], mcqOnly:true, chg:true, expl:"On compare d'abord les exposants : 10⁶ > 10⁵. 1 010 000 > 990 000, même si 9,9 > 1,01.", src:"NO215 b) et d)" },
  ]},
  { key:"o5", unit:"questions", code:"Obj. 5", title:"Notation décimale ↔ notation scientifique", src:"NO214, NO215 a), NO216 (?), NO218", consigne:"Écris en notation scientifique :", items:[
    { front:"74 000 000", back:["7,4·10^7"], expr:true, wrong:["74·10^6","7,4·10^6","0,74·10^8"], chg:true, expl:"Le nombre devant doit être entre 1 et 10 : 7,4. La virgule recule de 7 rangs : 7,4 · 10⁷. Comme 58 000 000 = 5,8 · 10⁷.", src:"NO214, Mercure" },
    { front:"213 500 000", back:["2,135·10^8"], expr:true, wrong:["213,5·10^6","2,135·10^7","21,35·10^7"], chg:true, expl:"2,135 · 10⁸ : un seul chiffre avant la virgule. Sur ta feuille, Vénus était écrite 108,19 · 10⁶, il fallait 1,0819 · 10⁸.", src:"NO214, Vénus" },
    { front:"3,8 milliards", back:["3,8·10^9"], expr:true, wrong:["3,8·10^6","38·10^8","3,8·10^12"], chg:true, expl:"1 milliard = 10⁹, donc 3,8 milliards = 3,8 · 10⁹. Sur ta feuille, 4,5 milliards = 4,5 · 10⁹.", src:"NO216 e) et tableau des puissances de dix" },
    { front:"250 millions", back:["2,5·10^8"], expr:true, wrong:["250·10^6","2,5·10^6","25·10^7"], chg:true, expl:"250 millions = 250 000 000 = 2,5 · 10⁸. La consigne demande la notation scientifique, pas l'écriture décimale.", src:"NO216 b)" },
    { front:"0,000032", back:["3,2·10^(−5)"], expr:true, wrong:["3,2·10^5","3,2·10^(−6)","32·10^(−6)"], chg:true, expl:"Nombre plus petit que 1 : l'exposant est négatif. La virgule avance de 5 rangs : 3,2 · 10⁻⁵. Sur ta feuille, le « − » manquait.", src:"NO216 f)" },
    { front:"0,0048", back:["4,8·10^(−3)"], expr:true, wrong:["4,8·10^3","4,8·10^(−4)","48·10^(−4)"], chg:true, expl:"0,0048 = 4,8 · 10⁻³ (3 rangs). Comme 0,00205 = 2,05 · 10⁻³.", src:"NO216 g) et NO218 e)" },
    { front:"40 007 000 000", back:["4,0007·10^10"], expr:true, wrong:["4,0007·10^9","4,0007·10^6","40,007·10^9"], chg:true, expl:"Compte les rangs après le 4 : 10 chiffres, donc 4,0007 · 10¹⁰. Sur ta feuille, 60 005 000 000 = 6,0005 · 10¹⁰, et pas 10⁶.", src:"NO218 i)" },
    { consigne:"Écris en notation décimale :", front:"6,25·10^4", back:["62 500"], wrong:["625 000","6 250","6 250 000"], chg:true, expl:"10⁴ : la virgule avance de 4 rangs. 6,25 → 62 500. Comme 1,2104 · 10⁴ = 12 104.", src:"NO215 a)" },
    { consigne:"Écris en notation décimale :", front:"2,7·10^9", back:["2 700 000 000"], wrong:["27 000 000 000","270 000 000","2 700 000"], chg:true, expl:"10⁹ = 1 milliard : 2,7 · 10⁹ = 2 700 000 000 (9 rangs après le 2). Sur ta feuille, 3,2 · 10⁹ = 3 200 000 000.", src:"NO218 h)" },
    { consigne:"Écris en notation décimale :", front:"6,4·10^(−5)", back:["0,000064"], wrong:["0,0000064","0,00064","640 000"], chg:true, expl:"10⁻⁵ : la virgule recule de 5 rangs. 6,4 → 0,000064. Comme 7,5 · 10⁻⁵ = 0,000075.", src:"NO218 f)" },
  ]},
  { key:"o6", unit:"questions", code:"Obj. 6", title:"Multiplier en notation scientifique", src:"NO210, NO215 c)", consigne:"Écris avec des puissances de dix, puis donne le résultat sous la forme 10ⁿ :", items:[
    { front:"10 000 · 1000", back:["10^7","10 000 000"], expr:true, wrong:["10^12","10^1","10^4"], chg:true, expl:"10⁴ · 10³ = 10⁴⁺³ = 10⁷ = 10 000 000. Comme 100 000 · 1000 = 10⁸.", src:"NO210 b)" },
    { front:"100 000 · 0,01", back:["10^3","1000"], expr:true, wrong:["10^(−7)","10^7","10^(−3)"], chg:true, expl:"0,01 = 10⁻². 10⁵ · 10⁻² = 10⁵⁻² = 10³ = 1000.", src:"NO210 c)" },
    { front:"0,01 · 0,0001", back:["10^(−6)","0,000001"], expr:true, wrong:["10^6","10^(−2)","10^(−8)"], chg:true, expl:"10⁻² · 10⁻⁴ = 10⁻² ⁺ ⁽⁻⁴⁾ = 10⁻⁶ = 0,000001.", src:"NO210 e)" },
    { front:"0,001 : 100", back:["10^(−5)","0,00001"], expr:true, wrong:["10^(−1)","10^5","10^1"], chg:true, expl:"10⁻³ : 10² = 10⁻³⁻² = 10⁻⁵ = 0,00001. Comme 0,01 : 100 = 10⁻⁴.", src:"NO210 h)" },
    { front:"10 000 : 0,001", back:["10^7","10 000 000"], expr:true, wrong:["10^1","10","10^(−7)"], chg:true, expl:"10⁴ : 10⁻³ = 10⁴⁻⁽⁻³⁾ = 10⁴⁺³ = 10⁷. Moins un nombre négatif, ça fait plus. Sur ta feuille, 10⁵ : 10⁻² = 10⁷, et pas 10³.", src:"NO210 i)" },
    { front:"100 : 100 000", back:["10^(−3)","0,001"], expr:true, wrong:["10^3","1000","10^7"], chg:true, expl:"10² : 10⁵ = 10²⁻⁵ = 10⁻³ = 0,001. On divise un petit nombre par un grand : le résultat est plus petit que 1. Sur ta feuille, 10 : 10 000 = 10⁻³.", src:"NO210 j)" },
    { front:"0,1^3", back:["10^(−3)","0,001"], expr:true, wrong:["10^3","0,3","10^(−4)"], chg:true, expl:"0,1³ = 10⁻¹ · 10⁻¹ · 10⁻¹ = 10⁻³ = 0,001. Comme 0,01³ = 10⁻⁶.", src:"NO210 g)" },
    { consigne:"Exprime en mètres, en notation scientifique :", front:"3 476 km", back:["3,476·10^6"], expr:true, wrong:["3,476·10^3","3,476·10^9","34,76·10^5"], chg:true, expl:"3 476 km = 3,476 · 10³ km, et 1 km = 10³ m. Donc 3,476 · 10³ · 10³ = 3,476 · 10⁶ m. Comme Mercure : 4,878 · 10⁶ m.", src:"NO215 c)" },
    { consigne:"Exprime en mètres, en notation scientifique :", front:"1,2·10^5 km", back:["1,2·10^8"], expr:true, wrong:["1,2·10^15","1,2·10^2","1,2·10^5"], chg:true, expl:"On multiplie par 10³ : 1,2 · 10⁵ · 10³ = 1,2 · 10⁵⁺³ = 1,2 · 10⁸ m. Les exposants s'additionnent.", src:"NO215 c)" },
  ]},
];

/* références stables (identiques à l'écran, sur la feuille papier, au corrigé et dans l'historique) */
/* sous-titre de chaque paquet : ses sources et le nombre de questions aux chiffres changés */
DECKS.forEach(d => { const n = d.items.filter(it => it.chg).length; d.detail = d.src + (n ? ` · ${n} aux chiffres changés` : ""); });

/* ---------- CONTENU : fiche (une section par objectif, liée à son paquet, avec la théorie des photos) ---------- */
const FICHE = [
  { num:"1", deck:"o1", titre:"Les livrets de 1 à 12", pairs:[
    ["Carrés", "1 · 4 · 9 · 16 · 25 · 36 · 49 · 64 · 81 · 100 · 121 · 144"],
    ["√ et livrets", "√49 = 7 car 7² = 49 · √121 = 11 car 11² = 121"]],
    astuce:"Toutes les racines de ta fiche reposent sur les livrets : sans eux, pas de √. Récite-les à voix haute, un livret par jour jusqu'à jeudi." },
  { num:"2", deck:"o2", titre:"Opérations, puissances, racines, priorités", pairs:[
    ["Racine carrée", "La racine carrée de a est le nombre positif dont le carré est égal à a : √a = b ⇔ b² = a"],
    ["Racine cubique", "∛a = b ⇔ b³ = a. Exemple : ∛64 = 4 car 4³ = 64"],
    ["En général", "ⁿ√a = b ⇔ bⁿ = a. Par convention, ²√a = √a"],
    ["√−36", "∅ : aucun nombre au carré ne donne un nombre négatif"],
    ["∛−125", "= −5 car (−5)³ = −125"],
    ["−7² et (−8)²", "−7² = −49 ; (−8)² = 64"],
    ["Priorité", "1) ( ) et ce qui est sous la racine 2) puissances et racines 3) · et : 4) + et −"]],
    astuceNeg:true, astuce:"Sur l'exercice 9 g) : 4 · √0,01 = 4 · 0,1 = 0,4. √0,01 = 0,1 car 0,1 · 0,1 = 0,01. Et √(100 − 64) se calcule sous la racine d'abord : √36 = 6." },
  { num:"3", deck:"o3", titre:"Propriétés des puissances et des racines", pairs:[
    ["aᵐ · aⁿ = aᵐ⁺ⁿ", "2² · 2⁵ = 2⁷"],
    ["aᵐ : aⁿ = aᵐ⁻ⁿ", "10⁶ : 10² = 10⁴ · 10³/10⁶ = 10⁻³"],
    ["(aᵐ)ⁿ = aᵐ·ⁿ", "(10³)² = 10⁶"],
    ["aⁿ · bⁿ = (a · b)ⁿ", "5² · 2² = 10² · 2²/3² = (2/3)²"],
    ["a² + a²", "pas de règle : 3³ + 3³ = 27 + 27 = 54"],
    ["√(a · b) = √a · √b", "√(16 · 25) = 4 · 5 = 20"],
    ["√(a/b) = √a / √b", "√(16/9) = 4/3 · √72 / √2 = √36 = 6"],
    ["(√a)² = a", "(√9)² = 9 · (3 · √2)² = 9 · 2 = 18"]],
    astuce:"Trouver la lettre (NO205) : écris les deux côtés avec la même base, puis compare les exposants. 3³ · 3ˣ = 243 = 3⁵, donc 3 + x = 5." },
  { num:"4", deck:"o4", titre:"Classer des nombres", pairs:[
    ["1) les exposants", "1,2 · 10⁵ > 5,12 · 10⁴ : 10⁵ gagne"],
    ["2) le nombre devant", "même exposant : 4,686 · 10⁴ < 5,12 · 10⁴"],
    ["Croissant", "du plus petit au plus grand (<)"],
    ["Décroissant", "du plus grand au plus petit (>)"]],
    astuce:"NO214 b) : Vénus (1,0819 · 10⁸) est bien entre 10⁸ et 10⁹. Écris chaque nombre en notation scientifique avant de comparer." },
  { num:"5", deck:"o5", titre:"Notation décimale ↔ notation scientifique", pairs:[
    ["Forme", "a · 10ⁿ, avec a entre 1 et 10 (un seul chiffre avant la virgule)"],
    ["58 000 000", "= 5,8 · 10⁷"],
    ["0,00205", "= 2,05 · 10⁻³ : nombre plus petit que 1 → exposant négatif"],
    ["1,2104 · 10⁴", "= 12 104"],
    ["7,5 · 10⁻⁵", "= 0,000075"]],
    astuceNeg:true, astuce:"Sur ta fiche NO216 et NO218 : 0,000015 m = 1,5 · 10⁻⁵ (le « − » manquait) ; 108 190 000 = 1,0819 · 10⁸ (pas 108,19 · 10⁶) ; 3,2 · 10⁹ = 3 200 000 000 ; 60 005 000 000 = 6,0005 · 10¹⁰. Compte les rangs un par un." },
  { num:"6", deck:"o6", titre:"Multiplier en notation scientifique", pairs:[
    ["10 000 · 100", "= 10⁴ · 10² = 10⁴⁺² = 10⁶ = 1 000 000"],
    ["10⁴ · 10⁻³", "= 10¹ = 10"],
    ["10⁵ : 10⁻²", "= 10⁵⁻⁽⁻²⁾ = 10⁷"],
    ["10 : 10 000", "= 10¹⁻⁴ = 10⁻³ = 0,001"],
    ["km → m", "12 104 km = 1,2104 · 10⁴ · 10³ m = 1,2104 · 10⁷ m"]],
    astuceNeg:true, astuce:"Sur NO210 i) et j) : diviser par 10⁻², c'est ajouter 2 à l'exposant (10⁷, pas 10³) ; 10 : 10 000 donne un résultat plus petit que 1 (10⁻³, pas 10³)." },
  { num:"10ⁿ", titre:"Noms des puissances de dix", pairs:[
    ["10³ · 10⁶ · 10⁹", "mille · million · milliard"],
    ["10¹² · 10¹⁵ · 10¹⁸", "billion · billiard · trillion"],
    ["10⁻¹ · 10⁻² · 10⁻³", "dixième · centième · millième"],
    ["10⁻⁶ · 10⁻⁹", "millionième · milliardième"]] },
  { num:"manque", titre:"Pas encore dans l'outil", miss:true, tips:[
    "Fiches 189, 190, 197, 199, 204, livre 221 et exercices 1 à 8 du dossier : pas encore photographiés.",
    "Objectif 6 : aucun calcul du type (2 · 10³) · (3 · 10⁴) dans les photos reçues. Il est sans doute dans le livre 221 ou les exercices 1 à 8 : à envoyer pour l'ajouter.",
    "NO205 et NO207 ne sont pas faits : leurs réponses sont calculées par programme, pas corrigées en classe."] },
  { num:"05.11", titre:"Le jour de l'épreuve", tips:[
    "Relis la consigne : « sous la forme d'une puissance » (10⁴) n'est pas « effectue » (10 000).",
    "Notation scientifique : un seul chiffre avant la virgule, et un exposant négatif pour un nombre plus petit que 1.",
    "Écris tes étapes : 10⁴ · 10⁻³ = 10⁴⁺⁽⁻³⁾ = 10¹."] },
];


/* étiquettes : pas de pastille de type en maths (la référence « Obj. 1 a) » suffit) */
const TAG_LABEL = {};

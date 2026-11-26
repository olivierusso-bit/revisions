/* ============================================================
   CONTENU — Maths 10FR niveau 2 · TE 4 « FA – Calcul littéral »
   Outil de révision de Livio — 10e HarmoS. Épreuve : jeudi 3 décembre 2026 (agenda : « MATH TE 4 Calcul Littéral »).
   Ce fichier est la seule partie propre à cet outil. Il est assemblé avec
   claude/couche-maths.js et claude/noyau-quiz.js par claude/assembler.py (--couche maths).
   Paquets = les 10 objectifs de la feuille « Objectifs TE 4 », dans son ordre (comme le modèle TE3) ;
   l'objectif 2 est coupé en deux paquets (la couche Maths nomme les questions a) à z), au-delà les références ne sont plus lisibles).
   ============================================================ */

/* Thème « tuiles algébriques » : sous l'en-tête, le rectangle (x + 2)(x + 1) posé en tuiles x², x et 1,
   comme les rectangles découpés de FA105 et FA166. Vert sapin pour les lettres, ocre pour les nombres, prune pour ce qui demande attention. */
const CSS_THEME = `
:root{
  --paper:#EDF1EE; --sheet:#FFFFFF; --ink:#14211D; --soft:#55645F; --rule:#C9D3CE;
  --pos:#175E50; --pos-wash:#DDEBE5; --neg:#8A2F5B; --neg-wash:#F4E2EB; --mark:#B5860F; --mark-wash:#F6ECCF; --board:#14211D;
  --good:#11704B; --good-wash:#DCF1E6; --bad:#B23A26; --bad-wash:#F9E1DB; --on-accent:#FFFFFF;
  --p-okdark:#0B5A3A; --p-ok:#2E9E62; --p-mid:#D9860B; --p-low:#C6382B; --p-lowsoft:#F2B9B2;
  --display:'Bricolage Grotesque','Arial Narrow',system-ui,sans-serif;
  --body:'Atkinson Hyperlegible',system-ui,-apple-system,'Segoe UI',sans-serif;
  --mono:'IBM Plex Mono',ui-monospace,Menlo,Consolas,monospace;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --paper:#0E1513; --sheet:#17211E; --ink:#E4EDE9; --soft:#9DB0A9; --rule:#2B3A35;
  --pos:#6FC9B2; --pos-wash:#1C332D; --neg:#EE93BF; --neg-wash:#3A1E2C; --mark:#E7B94A; --mark-wash:#3A3018; --board:#0A100E;
  --good:#5ED3A0; --good-wash:#173326; --bad:#FF8A7D; --bad-wash:#3A1E1B; --on-accent:#0E1513;
  --p-okdark:#3FCB86; --p-ok:#7EDCA8; --p-mid:#F2A93B; --p-low:#FF7A6B; --p-lowsoft:#5A2A26; color-scheme:dark}}
:root[data-theme="dark"]{
  --paper:#0E1513; --sheet:#17211E; --ink:#E4EDE9; --soft:#9DB0A9; --rule:#2B3A35;
  --pos:#6FC9B2; --pos-wash:#1C332D; --neg:#EE93BF; --neg-wash:#3A1E2C; --mark:#E7B94A; --mark-wash:#3A3018; --board:#0A100E;
  --good:#5ED3A0; --good-wash:#173326; --bad:#FF8A7D; --bad-wash:#3A1E1B; --on-accent:#0E1513;
  --p-okdark:#3FCB86; --p-ok:#7EDCA8; --p-mid:#F2A93B; --p-low:#FF7A6B; --p-lowsoft:#5A2A26; color-scheme:dark}
:root{ --court:var(--pos); --court-wash:var(--pos-wash); --jersey:var(--neg); --score:var(--mark); --on-court:var(--on-accent); --box:var(--pos); --crane:var(--mark);
  --focus:var(--mark); --scorebox-border:#2B3A35; --r-xl:6px; --r-l:8px; --r:8px; --r-m:6px; --r-s:5px; --r-xs:3px; }
.head{align-items:center}
.badge{width:62px;height:62px;flex:none;display:grid;grid-template-columns:38px 18px;grid-template-rows:38px 18px;gap:3px}
.badge i{display:block;border-radius:3px}
.badge .t2{background:var(--pos)} .badge .tx{background:var(--mark)} .badge .tx2{background:var(--mark)} .badge .t1{background:var(--neg)}
.head h1{font-size:clamp(28px,7.5vw,36px);letter-spacing:-.5px;text-wrap:balance}
.tiles{display:block;width:100%;height:auto;margin:-6px 0 14px}
.tiles text{font-family:'IBM Plex Mono',monospace;font-weight:600}
/* expressions en chasse fixe, comme au cahier */
.qword{font-family:var(--mono);font-weight:600;font-size:clamp(21px,6vw,28px);line-height:1.35;overflow-wrap:anywhere}
.qword.txt{font-family:var(--body);font-weight:700;font-size:clamp(18px,5vw,22px)}
.choice.expr{font-family:var(--mono);font-size:18px}
.tinput{font-family:var(--mono);font-weight:600}
.face{border-top-color:var(--mark)}
.face-word{font-family:var(--mono);font-weight:600;font-size:24px;line-height:1.3;overflow-wrap:anywhere}
.face-word.txt{font-family:var(--body);font-size:19px}
.fb p b,.dx-ans{font-family:var(--mono)}
.pair-de{font-family:var(--mono);font-weight:600;overflow-wrap:anywhere}
.score-n{color:#fff} .score-n small{color:#9DB0A9} .score-note{color:#14211D}
.chg{color:var(--neg);border-color:var(--neg)}
.entry-num.miss{color:var(--neg);border-color:var(--neg)}
.astuce.neg{background:var(--neg-wash)} .astuce.neg b{color:var(--neg)}
.num{font-family:var(--mono)}
.flash{height:300px}
`;

const QUIZ_ID = "livio-quiz-maths-te4-calcul-litteral";
const DUE = { iso:"2026-12-03", long:"jeudi 3 décembre", short:"03.12" };
const THEME = "TE4 — Calcul littéral";
const VERSION = { n:1, date:"26.11.2026" };   /* v1 : 26.11.2026, première version (dans Claude), d'après les 18 photos du 26.11 */

/* Tout ce que le noyau affiche ou écrit et qui dépend de l'outil. Jamais d'âge en dur : le noyau le déduit de la classe. */
const OUTIL = {
  eleve:"Livio", classe:"10e HarmoS (niveau 2)", branche:"Mathématiques",
  titre:"Calcul littéral", sousTitre:"Maths 10FR niveau 2 · TE 4",
  jersey:"TE 4",
  badgeHtml:`<div class="badge" aria-hidden="true"><i class="t2"></i><i class="tx"></i><i class="tx2"></i><i class="t1"></i></div>`,
  /* le rectangle (x + 2)(x + 1) en tuiles : une tuile x², trois tuiles x, deux tuiles 1 → x² + 3x + 2 */
  sousEntete(){
    const T = (x, y, w, h, fill, lab, col) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}"/><text x="${x + w/2}" y="${y + h/2 + 5}" text-anchor="middle" font-size="${h < 24 ? 12 : 15}" fill="${col}">${lab}</text>`;
    const g = 3, X = 70, x1 = 22;
    let t = "";
    t += T(0, 0, X, X, "var(--pos)", "x²", "var(--on-accent)");
    t += T(X + g, 0, x1, X, "var(--mark)", "x", "#14211D");
    t += T(X + g + x1 + g, 0, x1, X, "var(--mark)", "x", "#14211D");
    t += T(0, X + g, X, x1, "var(--mark)", "x", "#14211D");
    t += T(X + g, X + g, x1, x1, "var(--neg)", "1", "#FFFFFF");
    t += T(X + g + x1 + g, X + g, x1, x1, "var(--neg)", "1", "#FFFFFF");
    const W = X + 2 * (x1 + g);
    return `<svg class="tiles" viewBox="-4 -4 404 104" role="img" aria-label="Rectangle de côtés x + 2 et x + 1, découpé en une tuile x carré, trois tuiles x et deux tuiles 1 : son aire vaut x carré + 3x + 2"><g transform="translate(0,0)">${t}</g>
      <text x="${W + 18}" y="30" font-size="15" fill="var(--ink)">(x + 2)(x + 1)</text>
      <text x="${W + 18}" y="56" font-size="15" fill="var(--ink)">= x² + x + 2x + 2</text>
      <text x="${W + 18}" y="82" font-size="15" fill="var(--pos)">= x² + 3x + 2</text></svg>`;
  },
  polices:"https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Atkinson+Hyperlegible:wght@400;700&family=IBM+Plex+Mono:wght@500;600&display=swap",
  introFiche:"Une section par objectif de ta feuille, dans le même ordre, avec tes propres exercices corrigés. Relis, puis va te tester.",
  ficheOuverte:-1,
  titreAstuceNeg:"Attention, vu sur tes feuilles",
  labelTout:"Tout le TE4",
  motPaquet:"Objectif", motPaquets:"objectifs",
  compte:"questions",
  comptes:[3, 5, 8, 0], compteDefaut:5, comptesParPaquet:true, compteLabel:"Combien de questions par objectif",
  ordres:{
    paper:{ label:"Comme la feuille papier", sub:"Même ordre et mêmes numéros sur papier et à l'écran", emoji:"📝" },
    mixed:{ label:"Mélangé", sub:"Pour vérifier que tu ne réponds pas par habitude", emoji:"🔀" },
  },
  sousNiveaux:{ easy:"Je choisis parmi les réponses proposées", hard:"J'écris toutes les réponses" },
  conseilSetup:"Pour un exposant, tape ^ : x^2 pour x², 4x^6 pour 4x⁶. Pour « Effectue et réduis », l'ordre des termes est libre ; pour « Réduis et ordonne », écris de la plus grande puissance à la plus petite. Calculatrice autorisée au TE.",
  prefixeIndice:"",
  papier:{ titre:"Mathématiques 10FR niveau 2 — TE 4 « Calcul littéral »", court:"Maths TE4", fichier:"maths-te4-livio", code:"#PDF-MATHS-TE4" },
  copie:{ titre:"RÉSULTAT — Maths, TE 4 « Calcul littéral »" },
  analyse:{
    role:"un professeur de mathématiques suisse",
    sujet:"le TE 4 « Calcul littéral » (conventions d'écriture, monômes, polynômes, expressions équivalentes, valeur numérique)",
    etiquettes:"o1 = conventions d'écriture (phrase → expression, forme réduite, signes · ) ; o2a = coefficient et partie littérale d'un monôme ; o2b = degré d'un monôme ; o3 = monômes semblables ; o4 = opposé d'un polynôme ; o5 = additionner, soustraire, multiplier des monômes (puissances de monômes comprises) ; o6 = additionner, soustraire, multiplier des polynômes (parenthèses précédées d'un moins, produits de binômes) ; o7 = réduire et ordonner un polynôme ; o8 = expressions équivalentes ; o9 = élaborer une expression à partir d'une figure ou d'une phrase ; o10 = valeur numérique. Dans les réponses tapées, ^ note un exposant (x^2 = x²)",
    pistes:"termes non semblables additionnés (7 + 3a = 10a, a² · 12 + 8 · b² = 20a²b²), exposants additionnés au lieu de coefficients (x² + 2x² = 3x⁴ ?), coefficient oublié dans une puissance ((2x³)² = 2x⁶), signe d'une puissance de −x, moins devant une parenthèse qui ne change pas tous les signes, signe oublié dans un produit de binômes, priorité de la multiplication (12x − 2x · 4), degré d'un monôme à plusieurs lettres",
  },
};

/* ---------- SOURCES : d'où vient le contenu ---------- */
const SOURCES = [
  { titre:"Photo 1 — feuille « Objectifs TE 4, FA – Calcul littéral » (10FR niveau 2)", recue:"26.11.2026", contenu:"Matière (fiches, livre, exercices 1 et 2, théorie) et les 10 objectifs : un paquet par objectif, dans le même ordre ; « Outils : calculatrice »." },
  { titre:"Photo 2 — fiches p. 109 : FA131, FA132 (corrigée), FA134", recue:"26.11.2026", contenu:"FA132 « Réduisons ! » : objectif 5. FA131 n'est pas dans la liste du TE ; FA134 n'est pas faite (aucune question)." },
  { titre:"Photo 3 — fiches p. 112 : FA155, FA157, FA159", recue:"26.11.2026", contenu:"FA159 « Expressions littérales égales », faite en couleurs, sans correction visible : chaque réduction a été vérifiée par programme. Objectif 8. FA155 et FA157 ne sont pas dans la liste et sont vides." },
  { titre:"Photo 4 — fiches p. 110 : FA139 (corrigée), FA142", recue:"26.11.2026", contenu:"FA139 « On réduit toujours » : objectif 5. FA142 n'est pas dans la liste (vide)." },
  { titre:"Photo 5 — fiches p. 100 : FA111 (corrigée), FA112", recue:"26.11.2026", contenu:"FA111 « Associations » : objectif 1. FA112 n'est pas dans la liste (vide)." },
  { titre:"Photo 6 — fiches p. 108 : FA126, FA130", recue:"26.11.2026", contenu:"FA130 b) « Associe les monômes semblables » (faite, cochée) : objectif 3. FA130 a) est au cahier (photo 14). FA126 n'est pas dans la liste (vide)." },
  { titre:"Photo 7 — fiches p. 102 : FA117 et FA118 (corrigées)", recue:"26.11.2026", contenu:"FA117 a) tableau des valeurs : objectif 10 ; FA117 b) expressions équivalentes : objectif 8 ; FA118 : objectif 1." },
  { titre:"Photo 8 — fiches p. 113 : FA160, FA161 (corrigée)", recue:"26.11.2026", contenu:"FA161 « Toute la différence » : objectif 6. FA160 n'est pas dans la liste (vide)." },
  { titre:"Photo 9 — cahier : FA115 p. 114, FA105 p. 113, FA106", recue:"26.11.2026", contenu:"FA105 (rectangles de carrés) et FA115 (trois nombres) : objectif 9. FA106 laissée de côté : réponse marquée d'un point d'interrogation." },
  { titre:"Photo 10 — fiches p. 115 : FA166, FA168 (corrigée en partie), FA169", recue:"26.11.2026", contenu:"FA168 « Produits de polynômes » : objectif 6, réponses vérifiées par programme. FA166 et FA169 ne sont pas dans la liste." },
  { titre:"Photo 11 — cahier : FA156 et FA163 p. 123", recue:"26.11.2026", contenu:"FA156 (opposés, corrigé) : objectif 4. FA163 (sommes recopiées au cahier) : objectif 7. D de FA156 laissé de côté (écriture pas lisible avec certitude)." },
  { titre:"Photo 12 — cahier : FA119 p. 114, FA109 p. 113, FA107 p. 113", recue:"26.11.2026", contenu:"FA119 (corrections visibles et partie 2) : objectif 1 ; FA109 (corrections du maître) : objectif 9. FA107 : réponses sans énoncé, laissée de côté." },
  { titre:"Photo 13 — cahier : FA129 et FA128 p. 116", recue:"26.11.2026", contenu:"Réponses seulement, sans les énoncés ni la figure du livre : laissées de côté pour l'instant." },
  { titre:"Photo 14 — cahier : FA130 (tableau), FA137 p. 117, FA138 p. 118", recue:"26.11.2026", contenu:"Tableau coefficient / partie littérale / degré corrigé : objectif 2. FA138 (énoncés recopiés) : objectif 7. FA137 : réponses sans énoncés." },
  { titre:"Photo 15 — cahier : FA108 p. 113, FA127, FA116 p. 114", recue:"26.11.2026", contenu:"FA108 b), c), e), h) (écritures avec leur résultat) : objectif 9. FA116 : réponses sans énoncés. FA127 n'est pas dans la liste." },
  { titre:"Photo 16 — cahier : FA133 p. 117, FA141 p. 118, FA148", recue:"26.11.2026", contenu:"FA141 (calculs recopiés avec leur résultat) : objectif 5. FA133 (2 sur 10) : réponses sans énoncés, à compléter avec la page du livre." },
  { titre:"Photo 17 — cahier : FA146 p. 120, FA167 p. 124, FA171 p. 125", recue:"26.11.2026", contenu:"Réponses sans énoncés ni figures : laissées de côté pour l'instant." },
  { titre:"Photo 18 — cahier : FA149 p. 121", recue:"26.11.2026", contenu:"Devoir pour lundi, pas encore corrigé : aucune question." },
];
const SOURCES_NOTE = "Chaque question reprend un exercice de tes fiches ou de ton cahier, avec ses expressions exactes. Toutes les réponses ont été vérifiées par un programme (calcul symbolique). Pas encore couverts, faute de photo : la théorie « Calcul littéral », les exercices 1 et 2 de la feuille distribuée, et les énoncés du livre pour FA106, FA107, FA116, FA128, FA129, FA133, FA137, FA146, FA167, FA171 (pp. 113 à 125). FA134 n'est pas faite. La correction de chaque question indique d'où elle vient.";
/* Photos : seulement dans la version Claude (privée), jamais sur le site public. Déposées dans l'espace privé de l'outil le 26.11.2026. */
const PHOTOS = [
  { titre:"Objectifs TE 4", url:"/_blob/313db30d51c48c24db039413431abeb5" }, { titre:"Fiches p. 109", url:"/_blob/a76e1d980249035d7e8157aab3eb5fe9" }, { titre:"Fiches p. 112", url:"/_blob/6d15577b173a0fbce1535f7a1dc23cec" }, { titre:"Fiches p. 110", url:"/_blob/f528e917b19678689b02b063470205d8" },
  { titre:"Fiches p. 100", url:"/_blob/059d64dee4c59076389a954de0a11dbd" }, { titre:"Fiches p. 108", url:"/_blob/8e85a1f3124a7ecbcd15f7a287c7c59d" }, { titre:"Fiches p. 102", url:"/_blob/e6368eee5296200a8d809a81c1cd2a83" }, { titre:"Fiches p. 113", url:"/_blob/14bd2b8ea3e2c976e3a0f6aa864cc10c" },
  { titre:"Cahier FA115, FA105", url:"/_blob/da0efa0c0986cdafc7a62c01f3405901" }, { titre:"Fiches p. 115", url:"/_blob/35bfa1be1eaded363aed5bcb86035f1e" }, { titre:"Cahier FA156, FA163", url:"/_blob/7552d889c4af7364374547783562b354" }, { titre:"Cahier FA119, FA109", url:"/_blob/9c4448c9ad9999e9a0ddbeb0e55d3631" },
  { titre:"Cahier FA129, FA128", url:"/_blob/e192f0dcb5d5ce33706a5efda7bf5a4a" }, { titre:"Cahier FA130, FA138", url:"/_blob/f760c561dbb4b53820ec333994b4be59" }, { titre:"Cahier FA108, FA116", url:"/_blob/e1414380ef20343885b63894f7ec0f69" }, { titre:"Cahier FA133, FA141", url:"/_blob/2a4ee9d545057ffaf5e57caa7f508b60" },
  { titre:"Cahier FA146, FA167, FA171", url:"/_blob/a056a5a5ee846fcc7c7ab24e2541e95c" }, { titre:"Cahier FA149", url:"/_blob/a3675fd61743edb99bb27a81985fc330" },
];

/* ---------- FA117 a) : le tableau des valeurs, tel quel ---------- */
const FA117_EXPR = [
  { e:"7 · x", f:x => 7*x, typ:x => [7 + x, Number("7" + x), x] },
  { e:"x · x", f:x => x*x, typ:x => [x + x, x, 2] },
  { e:"9 + 6 · x", f:x => 9 + 6*x, typ:x => [(9 + 6)*x, 9 + 6 + x, 6*x] },
  { e:"x^2", f:x => x*x, typ:x => [2*x, x, x + 2] },
  { e:"4 · x + 3 · x", f:x => 7*x, typ:x => [4 + 3 + x, (4*x + 3)*x, 7] },
  { e:"6 · x + 9", f:x => 6*x + 9, typ:x => [6*(x + 9), 6 + x + 9, 15*x] },
];
function fa117(){
  const out = [];
  [2, 0, 1, 10].forEach(x => FA117_EXPR.forEach(E => {
    const v = E.f(x), wrong = [...new Set([...E.typ(x), v + 1, v * 2, v + 10].filter(w => w !== v).map(String))];
    const det = E.e === "9 + 6 · x" ? `9 + 6 · ${x} = 9 + ${6*x} = ${v} : la multiplication d'abord.`
      : E.e === "6 · x + 9" ? `6 · ${x} + 9 = ${6*x} + 9 = ${v}.`
      : E.e === "4 · x + 3 · x" ? `4 · ${x} + 3 · ${x} = ${4*x} + ${3*x} = ${v}.`
      : E.e === "x^2" ? `${x}² = ${x} · ${x} = ${v}.` : E.e === "x · x" ? `${x} · ${x} = ${v}.` : `7 · ${x} = ${v}.`;
    out.push({ consigne:`Remplace x par ${x}, puis calcule :`, front:E.e, back:[String(v)], wrong:wrong.slice(0, 5), expl:det, src:"FA117 a), fiche p. 102" });
  }));
  return out;
}

/* ---------- CONTENU : un paquet par objectif ----------
   front = énoncé (^ = exposant), back = réponses acceptées (1re = affichée), wrong = erreurs typiques (souvent les tiennes),
   mcqOnly = toujours à choix, expr = réponse en écriture (exposants, parenthèses),
   libre = l'ordre des termes est libre (« effectue et réduis ») ; sans libre, l'ordre compte (« réduis et ordonne »). */
const DECKS = [
  { key:"o1", unit:"questions", code:"Obj. 1", title:"Conventions d'écriture", src:"FA111, FA118, FA119", consigne:"Quelle expression littérale correspond à cette phrase ?", items:[
    { front:"Choisir un nombre n, le multiplier par dix, puis ajouter quinze au résultat.", back:["10 · n + 15"], wrong:["(n + 15) · 10","15 · n + 10","n + 15 · 10"], mcqOnly:true, expl:"D'abord · 10, puis + 15 : 10 · n + 15. Tu l'avais juste (n° 4).", src:"FA111 a), fiche p. 100" },
    { front:"Choisir un nombre n, lui ajouter quinze, puis multiplier le résultat par dix.", back:["(n + 15) · 10"], wrong:["10 · n + 15","n + 15 · 10","15 · n + 10"], mcqOnly:true, expl:"L'addition se fait d'abord : il faut des parenthèses, (n + 15) · 10.", src:"FA111 b), fiche p. 100" },
    { front:"Choisir un nombre n, lui soustraire dix, puis multiplier le résultat par quinze.", back:["(n − 10) · 15"], wrong:["n − 15 : 10","15 · n + 10","n − 10 · 15"], mcqOnly:true, expl:"La soustraction d'abord, donc entre parenthèses : (n − 10) · 15.", src:"FA111 c), fiche p. 100" },
    { front:"Choisir un nombre n, lui ajouter le produit de quinze par dix.", back:["n + 15 · 10"], wrong:["(n + 15) · 10","10 · n + 15","n · n + 10"], mcqOnly:true, expl:"Le produit 15 · 10 est ajouté à n : n + 15 · 10 (la multiplication se fait d'abord, sans parenthèses).", src:"FA111 d), fiche p. 100" },
    { front:"Choisir un nombre n, le multiplier par lui-même, puis ajouter dix au résultat.", back:["n · n + 10"], wrong:["10 · n + 15","n + 15 · 10","15 · n + 10"], mcqOnly:true, expl:"n multiplié par lui-même : n · n, puis + 10.", src:"FA111 e), fiche p. 100" },
    { front:"Choisir un nombre n, le multiplier par quinze, puis ajouter dix au résultat.", back:["15 · n + 10"], wrong:["10 · n + 15","(n − 10) · 15","n · n + 10"], mcqOnly:true, expl:"· 15 puis + 10 : 15 · n + 10. Attention à ne pas inverser avec 10 · n + 15.", src:"FA111 f), fiche p. 100" },
    { front:"Choisir un nombre n, lui soustraire le quotient de quinze par dix.", back:["n − 15 : 10"], wrong:["(n − 10) · 15","n − 10 · 15","(n − 15) : 10"], mcqOnly:true, expl:"Le quotient 15 : 10 est soustrait de n : n − 15 : 10.", src:"FA111 g), fiche p. 100" },
    { consigne:"Écris la forme réduite de cette expression :", front:"4 · x · 3", back:["12x"], wrong:["43x","7x","12 · x · 3"], expl:"On multiplie les nombres entre eux : 4 · 3 = 12, donc 12x.", src:"FA118, fiche p. 102" },
    { consigne:"Écris la forme réduite de cette expression :", front:"x · x · x", back:["x^3"], expr:true, wrong:["3x","x^2","3x^3"], expl:"x · x · x = x³ (trois facteurs x). À ne pas confondre avec x + x + x = 3x.", src:"FA118, fiche p. 102" },
    { consigne:"Écris la forme réduite de cette expression :", front:"0 · x + 14 · y", back:["14y"], wrong:["14xy","x + 14y","0 + 14y"], expl:"0 · x = 0, il reste 14 · y = 14y.", src:"FA118, fiche p. 102" },
    { consigne:"Écris la forme réduite de cette expression :", front:"3 · x + 2 · y", back:["3x + 2y"], wrong:["5xy","6xy","5x + y"], expl:"On enlève seulement les signes · : 3x + 2y. 3x et 2y ne s'additionnent pas.", src:"FA118, fiche p. 102" },
    { consigne:"Écris la forme réduite de cette expression :", front:"1 · y", back:["y"], wrong:["1y","1","y^1 · 1"], expl:"1 · y = y : on n'écrit pas le coefficient 1.", src:"FA118, fiche p. 102" },
    { consigne:"Écris la forme réduite de cette expression :", front:"3 · x", back:["3x"], wrong:["x^3","3 + x","x3"], expl:"3 · x s'écrit 3x : le nombre devant la lettre, sans le signe ·.", src:"FA118, fiche p. 102" },
    { consigne:"Écris sans les signes · inutiles :", front:"3x · y", back:["3xy"], wrong:["3x · y","3x^2y","4xy"], expl:"3x · y = 3xy. Sur ton cahier, tu avais laissé « 3x · y » : le maître a corrigé en 3xy.", src:"FA119 1. b), cahier p. 114" },
    { consigne:"Écris sans les signes · inutiles :", front:"4y · x", back:["4xy"], wrong:["4y · x","4y + x","5xy"], expl:"4y · x = 4xy : le nombre d'abord, puis les lettres dans l'ordre de l'alphabet. C'est la correction du maître sur ton cahier.", src:"FA119 1. i), cahier p. 114" },
    { consigne:"Réécris avec tous les signes de multiplication :", front:"5(a + 2)", back:["5 · (a + 2)"], expr:true, wrong:["5 · a + 2","5a · 2","5 + (a + 2)"], expl:"Entre un nombre et une parenthèse, le signe · est sous-entendu : 5(a + 2) = 5 · (a + 2).", src:"FA119 2. j), cahier p. 114" },
    { consigne:"Réécris avec tous les signes de multiplication :", front:"11ab", back:["11 · a · b"], wrong:["11 · ab","11a + b","1 · 1 · a · b"], expl:"Tous les signes : 11 · a · b. Sur ton cahier, « 11 · ab » a été corrigé en 11 · a · b.", src:"FA119 2. l), cahier p. 114" },
    { consigne:"Réécris avec tous les signes de multiplication :", front:"7a^2", back:["7 · a^2"], expr:true, wrong:["7 · a · 2","(7a)^2","7 · 2 · a"], expl:"7a² = 7 · a² : l'exposant ne touche que a.", src:"FA119 2. m), cahier p. 114" },
    { consigne:"Réécris avec tous les signes de multiplication :", front:"x^2y", back:["x^2 · y"], expr:true, wrong:["x · 2 · y","2 · x · y","(xy)^2"], expl:"x²y = x² · y.", src:"FA119 2. n), cahier p. 114" },
    { consigne:"Réécris avec tous les signes de multiplication :", front:"−4m", back:["−4 · m"], wrong:["−4 + m","4 · m","−(4 + m)"], expl:"−4m = −4 · m.", src:"FA119 2. q), cahier p. 114" },
    { consigne:"Réécris avec tous les signes de multiplication :", front:"(4 + x)(3 + x)", back:["(4 + x) · (3 + x)"], expr:true, wrong:["4 + x · 3 + x","(4 + x) + (3 + x)","4 · x · 3 · x"], expl:"Entre deux parenthèses, le signe · est sous-entendu : (4 + x) · (3 + x).", src:"FA119 2. r), cahier p. 114" },
  ]},
  { key:"o2a", unit:"questions", code:"Obj. 2", title:"Coefficient et partie littérale d'un monôme", src:"FA130 a), cahier", consigne:"Quel est le coefficient de ce monôme ?", items:[
    { front:"−5x", back:["−5"], wrong:["5","x","1"], expl:"Le coefficient est le nombre devant la partie littérale, avec son signe : −5.", src:"FA130 a), cahier" },
    { front:"2z^3", back:["2"], wrong:["3","z","6"], expl:"Coefficient 2, partie littérale z³.", src:"FA130 a), cahier" },
    { front:"9/2 y^2", back:["9/2","4,5"], expr:true, wrong:["2","9","y^2"], expl:"Coefficient 9/2, partie littérale y².", src:"FA130 a), cahier" },
    { front:"0,5", back:["0,5"], wrong:["0","1","5"], expl:"Un nombre seul est un monôme : son coefficient est 0,5 lui-même.", src:"FA130 a), cahier" },
    { front:"1,2x", back:["1,2"], wrong:["12","1","2"], expl:"Coefficient 1,2, partie littérale x.", src:"FA130 a), cahier" },
    { front:"20x^2/7", back:["20/7"], expr:true, wrong:["20","7","2"], expl:"20x²/7 = (20/7) · x² : le coefficient est 20/7.", src:"FA130 a), cahier" },
    { front:"m^4", back:["1"], wrong:["4","0","m"], expl:"m⁴ = 1 · m⁴ : le coefficient est 1, même s'il ne s'écrit pas.", src:"FA130 a), cahier" },
    { front:"−p", back:["−1"], wrong:["1","0","−p"], expl:"−p = −1 · p : le coefficient est −1.", src:"FA130 a), cahier" },
    { front:"4x^2y", back:["4"], wrong:["2","8","1"], expl:"Coefficient 4, partie littérale x²y.", src:"FA130 a), cahier" },
    { front:"−3ab", back:["−3"], wrong:["3","−1","ab"], expl:"Coefficient −3, partie littérale ab.", src:"FA130 a), cahier" },
    { front:"bh/2", back:["1/2","0,5","½"], expr:true, wrong:["2","1","bh"], expl:"bh/2 = (1/2) · bh : le coefficient est 1/2.", src:"FA130 a), cahier" },
    { front:"xyz", back:["1"], wrong:["3","0","xyz"], expl:"xyz = 1 · xyz : le coefficient est 1.", src:"FA130 a), cahier" },
    { consigne:"Quelle est la partie littérale de ce monôme ?", front:"−5x", back:["x"], wrong:["−5","−5x","5x"], mcqOnly:true, expl:"La partie littérale, ce sont les lettres avec leurs exposants : x.", src:"FA130 a), cahier" },
    { consigne:"Quelle est la partie littérale de ce monôme ?", front:"2z^3", back:["z^3"], wrong:["z","2z","3"], mcqOnly:true, expl:"Partie littérale z³ (l'exposant en fait partie).", src:"FA130 a), cahier" },
    { consigne:"Quelle est la partie littérale de ce monôme ?", front:"9/2 y^2", back:["y^2"], wrong:["y","9/2","2"], mcqOnly:true, expl:"Partie littérale y².", src:"FA130 a), cahier" },
    { consigne:"Quelle est la partie littérale de ce monôme ?", front:"1,2x", back:["x"], wrong:["1,2","1,2x","2x"], mcqOnly:true, expl:"Partie littérale x.", src:"FA130 a), cahier" },
    { consigne:"Quelle est la partie littérale de ce monôme ?", front:"20x^2/7", back:["x^2"], wrong:["x","20/7","x^2/7"], mcqOnly:true, expl:"Partie littérale x².", src:"FA130 a), cahier" },
    { consigne:"Quelle est la partie littérale de ce monôme ?", front:"m^4", back:["m^4"], wrong:["m","4","1"], mcqOnly:true, expl:"Partie littérale m⁴.", src:"FA130 a), cahier" },
    { consigne:"Quelle est la partie littérale de ce monôme ?", front:"−p", back:["p"], wrong:["−1","−p","1"], mcqOnly:true, expl:"Partie littérale p ; le signe va dans le coefficient (−1).", src:"FA130 a), cahier" },
    { consigne:"Quelle est la partie littérale de ce monôme ?", front:"4x^2y", back:["x^2y"], wrong:["x^2","xy","4x^2"], mcqOnly:true, expl:"Partie littérale x²y : toutes les lettres, avec leurs exposants.", src:"FA130 a), cahier" },
    { consigne:"Quelle est la partie littérale de ce monôme ?", front:"−3ab", back:["ab"], wrong:["a","−3a","3ab"], mcqOnly:true, expl:"Partie littérale ab.", src:"FA130 a), cahier" },
    { consigne:"Quelle est la partie littérale de ce monôme ?", front:"bh/2", back:["bh"], wrong:["b","h/2","2"], mcqOnly:true, expl:"bh/2 = (1/2) · bh : partie littérale bh.", src:"FA130 a), cahier" },
    { consigne:"Quelle est la partie littérale de ce monôme ?", front:"xyz", back:["xyz"], wrong:["x","1","3"], mcqOnly:true, expl:"Partie littérale xyz.", src:"FA130 a), cahier" },
  ]},
  { key:"o2b", unit:"questions", code:"Obj. 2", title:"Degré d'un monôme", src:"FA130 a), cahier", consigne:"Quel est le degré de ce monôme ?", items:[
    { front:"−5x", back:["1"], wrong:["0","5","−5"], expl:"x = x¹ : degré 1.", src:"FA130 a), cahier" },
    { front:"2z^3", back:["3"], wrong:["2","6","1"], expl:"Degré = l'exposant de la lettre : 3.", src:"FA130 a), cahier" },
    { front:"9/2 y^2", back:["2"], wrong:["9","1","4,5"], expl:"Degré 2 (y²). Le coefficient ne compte pas.", src:"FA130 a), cahier" },
    { front:"0,5", back:["0"], wrong:["1","0,5","5"], expl:"Pas de lettre : degré 0.", src:"FA130 a), cahier" },
    { front:"1,2x", back:["1"], wrong:["2","1,2","0"], expl:"Degré 1 (x).", src:"FA130 a), cahier" },
    { front:"20x^2/7", back:["2"], wrong:["7","20","1"], expl:"Degré 2 (x²).", src:"FA130 a), cahier" },
    { front:"m^4", back:["4"], wrong:["1","0","5"], expl:"Degré 4.", src:"FA130 a), cahier" },
    { front:"−p", back:["1"], wrong:["−1","0","2"], expl:"−p = −1 · p¹ : degré 1.", src:"FA130 a), cahier" },
    { front:"4x^2y", back:["3"], wrong:["2","4","1"], expl:"On additionne les exposants de toutes les lettres : 2 + 1 = 3. Sur ton tableau, tu avais écrit 2 : le maître a corrigé (2 + 1 = 3).", src:"FA130 a), cahier" },
    { front:"−3ab", back:["2"], wrong:["1","3","−3"], expl:"a¹ et b¹ : 1 + 1 = 2. C'est la correction de ton tableau.", src:"FA130 a), cahier" },
    { front:"bh/2", back:["2"], wrong:["1","0","1/2"], expl:"b¹ et h¹ : 1 + 1 = 2. Le /2 est dans le coefficient, il ne change pas le degré.", src:"FA130 a), cahier" },
    { front:"xyz", back:["3"], wrong:["1","2","0"], expl:"x, y et z : 1 + 1 + 1 = 3. C'est la correction de ton tableau.", src:"FA130 a), cahier" },
  ]},
  { key:"o3", unit:"questions", code:"Obj. 3", title:"Regrouper des monômes semblables", src:"FA130 b), fiche p. 108", consigne:"Parmi les monômes de FA130 b), lequel est semblable à celui-ci ?", items:[
    { front:"3y^3", back:["y^3/3"], wrong:["3x^3","−3y","3x^2"], mcqOnly:true, expl:"Semblables = même partie littérale. 3y³, y³ et y³/3 ont tous y³. Sur ta fiche, y³/3 était resté seul.", src:"FA130 b), fiche p. 108" },
    { front:"x^3/2", back:["−x^3"], wrong:["x/2","3x^2","y^3"], mcqOnly:true, expl:"x³/2, 3x³ et −x³ ont la même partie littérale x³.", src:"FA130 b), fiche p. 108" },
    { front:"1,5x", back:["x/2"], wrong:["x^3/2","3x^2","2,5y"], mcqOnly:true, expl:"x/2, 1,5x, −x et x ont tous la partie littérale x.", src:"FA130 b), fiche p. 108" },
    { front:"−3y", back:["y/2"], wrong:["y^3","3y^3","−x"], mcqOnly:true, expl:"y, −3y, (1/3)y, 2,5y et y/2 ont la partie littérale y. y³ n'est pas semblable : l'exposant compte.", src:"FA130 b), fiche p. 108" },
    { front:"3x^2", back:["aucun monôme de la liste"], wrong:["3x^3","x^3/2","3x"], mcqOnly:true, expl:"Aucun autre monôme de la liste n'a x² : 3x² reste seul. Le même coefficient 3 ne suffit pas.", src:"FA130 b), fiche p. 108" },
    { front:"(1/3)y", back:["2,5y"], wrong:["y^3/3","x/2","3y^3"], mcqOnly:true, expl:"(1/3)y et 2,5y ont la même partie littérale y.", src:"FA130 b), fiche p. 108" },
    { front:"−x", back:["x"], wrong:["−x^3","y","x^3/2"], mcqOnly:true, expl:"−x et x ont la même partie littérale x.", src:"FA130 b), fiche p. 108" },
    { front:"y^3", back:["3y^3"], wrong:["y","3y","y/2"], mcqOnly:true, expl:"y³ et 3y³ : même partie littérale y³.", src:"FA130 b), fiche p. 108" },
  ]},
  { key:"o4", unit:"questions", code:"Obj. 4", title:"Opposé d'un polynôme", src:"FA156, cahier p. 123", consigne:"Écris l'opposé de ce polynôme :", items:[
    { front:"5m^2 + 7m − 1", back:["−5m^2 − 7m + 1"], expr:true, libre:true, wrong:["−5m^2 + 7m − 1","5m^2 − 7m + 1","−5m^2 − 7m − 1"], expl:"L'opposé change le signe de chaque terme : −5m² − 7m + 1. C'est ton −A de FA156, juste.", src:"FA156, A, cahier p. 123" },
    { front:"−12m + 12/7", back:["12m − 12/7"], expr:true, libre:true, wrong:["−12m − 12/7","12m + 12/7","−12m + 7/12"], expl:"Chaque signe change : 12m − 12/7. C'est ton −B de FA156.", src:"FA156, B, cahier p. 123" },
    { front:"−5m^3 + 3/8 m − 4", back:["5m^3 − 3/8 m + 4","5m^3 − (3/8)m + 4","5m^3 − 3m/8 + 4","5m^3 − 0,375m + 4"], expr:true, libre:true, wrong:["5m^3 + 3/8 m − 4","−5m^3 − 3/8 m + 4","5m^3 − 3/8 m − 4"], expl:"5m³ − (3/8)m + 4 : les trois signes changent. C'est ton −C de FA156.", src:"FA156, C, cahier p. 123" },
    { front:"½x^2 + x", back:["−½x^2 − x","−1/2x^2 − x","−(1/2)x^2 − x","−0,5x^2 − x","−x^2/2 − x"], expr:true, libre:true, wrong:["−½x^2 + x","½x^2 − x","−½x − x"], expl:"−½x² − x : les deux termes changent de signe. C'est ton −E de FA156.", src:"FA156, E, cahier p. 123" },
  ]},
  { key:"o5", unit:"questions", code:"Obj. 5", title:"Additionner, soustraire, multiplier des monômes", src:"FA132, FA139, FA141", consigne:"Effectue et/ou réduis :", items:[
    { front:"a · (ab)", back:["a^2b"], expr:true, wrong:["2ab","a^2b^2","ab"], expl:"a · a · b = a²b.", src:"FA132 a), fiche p. 109" },
    { front:"(6c)^2", back:["36c^2"], expr:true, wrong:["6c^2","12c^2","36c"], expl:"(6c)² = 6c · 6c = 36c² : le 6 aussi est au carré.", src:"FA132 b), fiche p. 109" },
    { front:"5z · 2z", back:["10z^2"], expr:true, wrong:["10z","7z^2","7z"], expl:"5 · 2 = 10 et z · z = z² : 10z².", src:"FA132 c), fiche p. 109" },
    { front:"x^3 · 2x^2", back:["2x^5"], expr:true, wrong:["2x^6","3x^5","x^5"], expl:"x³ · x² = x³⁺² = x⁵, coefficient 2 : 2x⁵.", src:"FA132 d), fiche p. 109" },
    { front:"(2x^3)^2", back:["4x^6"], expr:true, wrong:["2x^6","4x^5","2x^9"], expl:"(2x³)² = 2x³ · 2x³ = 4x⁶. Sur ta fiche : 2x⁶ — le 2 aussi est au carré (2² = 4).", src:"FA132 e), fiche p. 109" },
    { front:"(2xy) · (3xy)", back:["6x^2y^2"], expr:true, wrong:["6xy","5x^2y^2","6x^2y"], expl:"2 · 3 = 6, x · x = x², y · y = y² : 6x²y².", src:"FA132 f), fiche p. 109" },
    { front:"(−x)^2", back:["x^2"], expr:true, wrong:["−x^2","2x","−2x"], expl:"(−x)² = (−x) · (−x) = x² : moins fois moins donne plus. Sur ta fiche : −x², corrigé en x².", src:"FA132 g), fiche p. 109" },
    { front:"−x^2", back:["−x^2"], expr:true, wrong:["x^2","−2x","2x"], expl:"Ici le carré ne touche que x : −x² = −(x · x).", src:"FA132 h), fiche p. 109" },
    { front:"(−x)^3", back:["−x^3"], expr:true, wrong:["x^3","−3x","3x"], expl:"Trois facteurs −x : le résultat est négatif, −x³.", src:"FA132 i), fiche p. 109" },
    { consigne:"Écris cette expression sous sa forme réduite :", front:"a + 7a", back:["8a"], libre:true, wrong:["7a^2","8a^2","7a"], expl:"1a + 7a = 8a.", src:"FA139 a), fiche p. 110" },
    { consigne:"Écris cette expression sous sa forme réduite :", front:"7 + 3a", back:["7 + 3a"], libre:true, wrong:["10a","10","21a"], expl:"7 n'a pas de partie littérale, 3a en a une : ils ne sont pas semblables, on ne peut rien réduire. Sur ta fiche : 10a, corrigé en 7 + 3a.", src:"FA139 b), fiche p. 110" },
    { consigne:"Écris cette expression sous sa forme réduite :", front:"−15x − 50x", back:["−65x"], libre:true, wrong:["35x","−35x","65x"], expl:"−15 − 50 = −65 : −65x. Sur ta fiche : 35x.", src:"FA139 c), fiche p. 110" },
    { consigne:"Écris cette expression sous sa forme réduite :", front:"12x^2 − x", back:["12x^2 − x"], expr:true, libre:true, wrong:["11x^2","11x","12x"], expl:"x² et x ne sont pas semblables : 12x² − x reste tel quel.", src:"FA139 d), fiche p. 110" },
    { consigne:"Écris cette expression sous sa forme réduite :", front:"30x − 12 − 25x − 8", back:["5x − 20"], libre:true, wrong:["5x − 4","55x − 20","5x + 20"], expl:"30x − 25x = 5x et −12 − 8 = −20 : 5x − 20. Sur ta fiche : 5x − 4 (−12 − 8 n'est pas −4).", src:"FA139 e), fiche p. 110" },
    { consigne:"Écris cette expression sous sa forme réduite :", front:"2a + 2a", back:["4a"], libre:true, wrong:["4a^2","2a^2","4"], expl:"Addition : 2a + 2a = 4a.", src:"FA139 f), fiche p. 110" },
    { consigne:"Écris cette expression sous sa forme réduite :", front:"2a · 2a", back:["4a^2"], expr:true, libre:true, wrong:["4a","2a^2","4a^4"], expl:"Multiplication : 2 · 2 = 4 et a · a = a² : 4a².", src:"FA139 g), fiche p. 110" },
    { consigne:"Écris cette expression sous sa forme réduite :", front:"12x − 2x · 4", back:["4x"], libre:true, wrong:["10x^4","40x","10x"], expl:"La multiplication d'abord : 2x · 4 = 8x, puis 12x − 8x = 4x. Sur ta fiche : 10x⁴.", src:"FA139 h), fiche p. 110" },
    { consigne:"Écris cette expression sous sa forme réduite :", front:"5xy − 5y + 12xy − 13y", back:["17xy − 18y"], libre:true, wrong:["17xy + 8y","−1xy","17xy − 8y"], expl:"5xy + 12xy = 17xy et −5y − 13y = −18y : 17xy − 18y. Sur ta fiche : 17xy + 8y (le signe de −5y).", src:"FA139 i), fiche p. 110" },
    { consigne:"Écris cette expression sous sa forme réduite :", front:"a^2 · 12 + 8 · b^2", back:["12a^2 + 8b^2"], expr:true, libre:true, wrong:["20a^2b^2","96a^2b^2","20ab"], expl:"a² et b² ne sont pas semblables : 12a² + 8b². Sur ta fiche : 20a²b².", src:"FA139 j), fiche p. 110" },
    { consigne:"Calcule :", front:"−4a^4 + 4a^4", back:["0"], wrong:["8a^4","−16a^8","8a^8"], expl:"Deux monômes opposés : leur somme vaut 0.", src:"FA141 d), cahier p. 118" },
    { consigne:"Calcule :", front:"4x^2 · 15x^2", back:["60x^4"], expr:true, wrong:["19x^4","60x^2","19x^2"], expl:"4 · 15 = 60 et x² · x² = x⁴ : 60x⁴.", src:"FA141 e), cahier p. 118" },
    { consigne:"Calcule :", front:"4x^2 + 15x^2", back:["19x^2"], expr:true, wrong:["19x^4","60x^4","60x^2"], expl:"Addition de monômes semblables : 4 + 15 = 19, la partie littérale ne change pas : 19x².", src:"FA141 e), cahier p. 118" },
    { consigne:"Calcule :", front:"−3x^3 + 3x^3", back:["0"], wrong:["6x^3","−9x^6","−6x^3"], expl:"−3x³ et 3x³ sont opposés : 0.", src:"FA141 g), cahier p. 118" },
    { consigne:"Calcule :", front:"−3x^3 · 3x^3", back:["−9x^6"], expr:true, wrong:["−9x^9","9x^6","0"], expl:"−3 · 3 = −9 et x³ · x³ = x⁶ : −9x⁶.", src:"FA141 g), cahier p. 118" },
    { consigne:"Calcule :", front:"4x^3 · 6x · 5x", back:["120x^5"], expr:true, wrong:["120x^3","15x^5","120x^6"], expl:"4 · 6 · 5 = 120 et x³ · x · x = x⁵ : 120x⁵.", src:"FA141 h), cahier p. 118" },
  ]},
  { key:"o6", unit:"questions", code:"Obj. 6", title:"Additionner, soustraire, multiplier des polynômes", src:"FA161, FA168", consigne:"Effectue et réduis :", items:[
    { front:"(4y + 5x) + (3x − 2y)", back:["8x + 2y"], libre:true, wrong:["8x − 2y","8x + 6y","2x + 2y"], expl:"5x + 3x = 8x et 4y − 2y = 2y : 8x + 2y.", src:"FA161 a), fiche p. 113" },
    { front:"(4y + 5x) − (3x − 2y)", back:["2x + 6y"], libre:true, wrong:["8x − 2y","2x + 2y","2x − 6y"], expl:"Le − devant la parenthèse change tous ses signes : 4y + 5x − 3x + 2y = 2x + 6y. Sur ta fiche : 8x − 2y.", src:"FA161 b), fiche p. 113" },
    { front:"(120a^2 − 75b^2) + (200a^2 − 125b^2)", back:["320a^2 − 200b^2"], expr:true, libre:true, wrong:["320a^2 − 50b^2","−80a^2 + 50b^2","320a^2 + 200b^2"], expl:"120 + 200 = 320 et −75 − 125 = −200 : 320a² − 200b².", src:"FA161 c), fiche p. 113" },
    { front:"(120a^2 − 75b^2) − (200a^2 − 125b^2)", back:["−80a^2 + 50b^2"], expr:true, libre:true, wrong:["320a^2 + 50b^2","−80a^2 − 200b^2","80a^2 + 50b^2"], expl:"120a² − 75b² − 200a² + 125b² = −80a² + 50b². Sur ta fiche : 320a² + 50b² (le − n'avait pas changé 200a²).", src:"FA161 d), fiche p. 113" },
    { front:"67x^2y + 29x^2 + (−71x^2y + 38x^2)", back:["−4x^2y + 67x^2"], expr:true, libre:true, wrong:["4x^2y + 67x^2","−4x^2y − 9x^2","63x^4y"], expl:"67x²y − 71x²y = −4x²y et 29x² + 38x² = 67x².", src:"FA161 e), fiche p. 113" },
    { front:"67x^2y + 29x^2 − (71x^2y − 38x^2)", back:["−4x^2y + 67x^2"], expr:true, libre:true, wrong:["−4x^2y − 9x^2","138x^2y − 9x^2","−4x^2y + 9x^2"], expl:"−(71x²y − 38x²) = −71x²y + 38x² : on retrouve −4x²y + 67x².", src:"FA161 f), fiche p. 113" },
    { front:"(16x^2 − 40xy + 25y^2) + (4x^2 − 24xy + 9y^2)", back:["20x^2 − 64xy + 34y^2"], expr:true, libre:true, wrong:["20x^2 − 16xy + 34y^2","12x^2 − 64xy + 16y^2","20x^2 + 64xy + 34y^2"], expl:"16 + 4 = 20, −40 − 24 = −64, 25 + 9 = 34.", src:"FA161 g), fiche p. 113" },
    { front:"16x^2 − 40xy + 25y^2 − (4x^2 − 24xy + 9y^2)", back:["12x^2 − 16xy + 16y^2"], expr:true, libre:true, wrong:["12x^2 − 64xy + 16y^2","12x^2 − 16xy + 34y^2","20x^2 − 16xy + 16y^2"], expl:"−(4x² − 24xy + 9y²) = −4x² + 24xy − 9y² ; puis 16 − 4 = 12, −40 + 24 = −16, 25 − 9 = 16.", src:"FA161 h), fiche p. 113" },
    { front:"(x + 7)(x + 1)", back:["x^2 + 8x + 7"], expr:true, libre:true, wrong:["x^2 + 7","x^2 + 8x + 8","2x + 8"], expl:"Chaque terme multiplie chaque terme : x² + x + 7x + 7 = x² + 8x + 7 (tes flèches au cahier).", src:"FA168 a), fiche p. 115" },
    { front:"(a + 1)(b − 9)", back:["ab − 9a + b − 9"], libre:true, wrong:["ab + 9a + b − 9","ab − 9","ab − 9a − b − 9"], expl:"a · b = ab, a · (−9) = −9a, 1 · b = b, 1 · (−9) = −9. Sur ta fiche : +9a, le signe était oublié.", src:"FA168 b), fiche p. 115" },
    { front:"(x − 7)(y − 2)", back:["xy − 2x − 7y + 14"], libre:true, wrong:["xy + 2x + 7y + 14","xy − 2x − 7y − 14","xy + 14"], expl:"x · (−2) = −2x, −7 · y = −7y, (−7) · (−2) = +14 : xy − 2x − 7y + 14.", src:"FA168 c), fiche p. 115" },
    { front:"(−3x − 4)(−x + 3)", back:["3x^2 − 5x − 12"], expr:true, libre:true, wrong:["3x^2 − 13x − 12","−3x^2 − 5x − 12","3x^2 + 5x − 12"], expl:"3x² − 9x + 4x − 12 = 3x² − 5x − 12 (la correction de ta fiche).", src:"FA168 d), fiche p. 115" },
    { front:"(x − 8)(8 + x)", back:["x^2 − 64"], expr:true, libre:true, wrong:["x^2 + 16x − 64","x^2 − 16x − 64","x^2 + 64"], expl:"8x + x² − 64 − 8x : les 8x s'annulent, il reste x² − 64.", src:"FA168 e), fiche p. 115" },
    { front:"(−a + 11)(b + 5)", back:["−ab − 5a + 11b + 55"], libre:true, wrong:["−ab + 5a + 11b + 55","ab − 5a + 11b + 55","−ab − 5a + 11b − 55"], expl:"−a · b = −ab, −a · 5 = −5a, 11 · b = 11b, 11 · 5 = 55.", src:"FA168 f), fiche p. 115" },
    { front:"(x − 20)(y − 4z)", back:["xy − 4xz − 20y + 80z"], libre:true, wrong:["xy − 4xz − 20y − 80z","xy + 80z","xy − 4z − 20y + 80z"], expl:"x · (−4z) = −4xz et (−20) · (−4z) = +80z.", src:"FA168 g), fiche p. 115" },
    { front:"(7x^2 − 4y)(2x^3 − 9y)", back:["14x^5 − 63x^2y − 8x^3y + 36y^2"], expr:true, libre:true, wrong:["14x^6 − 63x^2y − 8x^3y + 36y^2","14x^5 − 63x^2y − 8x^3y − 36y^2","14x^5 + 36y^2"], expl:"7x² · 2x³ = 14x⁵, 7x² · (−9y) = −63x²y, −4y · 2x³ = −8x³y, (−4y) · (−9y) = 36y².", src:"FA168 h), fiche p. 115" },
  ]},
  { key:"o7", unit:"questions", code:"Obj. 7", title:"Réduire et ordonner un polynôme", src:"FA138, FA163", consigne:"Réduis et ordonne (de la plus grande puissance à la plus petite) :", items:[
    { front:"3x^2 + 5x + x^2 + 5 − 3x", back:["4x^2 + 2x + 5"], expr:true, wrong:["4x^4 + 2x + 5","3x^2 + 2x + 5","4x^2 + 8x + 5"], expl:"3x² + x² = 4x², 5x − 3x = 2x, puis 5 : 4x² + 2x + 5.", src:"FA138 a), cahier p. 118" },
    { front:"3z + z^5 − z + 2z^3 + 4z^5 + z^2", back:["5z^5 + 2z^3 + z^2 + 2z"], expr:true, wrong:["5z^10 + 2z^3 + z^2 + 2z","4z^5 + 2z^3 + z^2 + 2z","5z^5 + 2z^3 + z^2 + 3z"], expl:"z⁵ + 4z⁵ = 5z⁵, puis 2z³, z², et 3z − z = 2z.", src:"FA138 b), cahier p. 118" },
    { front:"−2x + 2x^4 − 2^4", back:["2x^4 − 2x − 16"], expr:true, wrong:["2x^4 − 2^4 − 2x","2x^4 − 2x − 8","2x^4 − 2x + 16"], expl:"2⁴ = 16 est un nombre (degré 0). Ordonné : d'abord x⁴, puis x, puis le nombre : 2x⁴ − 2x − 16 (ton cahier a la même réponse dans un autre ordre, −2x + 2x⁴ − 16).", src:"FA138 c), cahier p. 118" },
    { front:"4x^2 + 6x − 2x^2 − 5x", back:["2x^2 + x"], expr:true, wrong:["6x^2 + x","2x^2 + 11x","2x^2 − x"], expl:"4x² − 2x² = 2x² et 6x − 5x = x. Sur ton cahier : 6x² + x (le − de 2x² oublié).", src:"FA138 d), cahier p. 118" },
    { front:"4x + 5y − 2x + 3", back:["2x + 5y + 3"], libre:true, wrong:["7xy + 3","2x + 8y","6x + 5y + 3"], expl:"4x − 2x = 2x ; 5y et 3 restent : 2x + 5y + 3.", src:"FA138 e), cahier p. 118" },
    { front:"7z^2 − 3x + 5,5z^2 − 2x + 2", back:["12,5z^2 − 5x + 2"], expr:true, libre:true, wrong:["12,5z^2 − x + 2","12,5z^4 − 5x + 2","7,5z^2 − 5x + 2"], expl:"7z² + 5,5z² = 12,5z² et −3x − 2x = −5x.", src:"FA138 f), cahier p. 118" },
    { front:"x^3 − 3x^3 + 2x^3", back:["0"], wrong:["6x^3","0x^3","−2x^3"], expl:"1 − 3 + 2 = 0 : le résultat est 0. Sur ton cahier : 6x³, corrigé en 0.", src:"FA138 g), cahier p. 118" },
    { front:"2x + 3 + 3x − 4", back:["5x − 1"], wrong:["5x + 7","5x − 7","x − 1"], expl:"2x + 3x = 5x et 3 − 4 = −1 : 5x − 1.", src:"FA163 1., cahier p. 123" },
    { front:"2x + 3 − 2x^2 − 5x", back:["−2x^2 − 3x + 3"], expr:true, wrong:["−2x^2 + 3x + 3","−2x^2 − 7x + 3","−2x^2 + 3x − 3"], expl:"2x − 5x = −3x ; ordonné : −2x² − 3x + 3.", src:"FA163 2., cahier p. 123" },
    { front:"2x^2 + 5x + x^2 + 2x + 1", back:["3x^2 + 7x + 1"], expr:true, wrong:["2x^4 + 7x + 1","3x^4 + 7x + 1","3x^2 + 7x"], expl:"2x² + x² = 3x² (les exposants ne s'additionnent pas). Sur ton cahier : 2x⁴, corrigé en 3x².", src:"FA163 3., cahier p. 123" },
    { front:"x^3 − 2x^2 + 3x − 4 − x^2 − 2x − 1", back:["x^3 − 3x^2 + x − 5"], expr:true, wrong:["x^3 − 3x^2 + 1x − 5","x^3 − x^2 + x − 5","x^3 − 3x^2 + 5x − 5"], expl:"−2x² − x² = −3x², 3x − 2x = x (on n'écrit pas 1x), −4 − 1 = −5.", src:"FA163 4., cahier p. 123" },
    { front:"2x^3 + 3x^2 + x + 0,5 − x^3 + 2x^2", back:["x^3 + 5x^2 + x + 0,5"], expr:true, wrong:["1x^3 + 5x^2 + x + 0,5","3x^3 + 5x^2 + x + 0,5","x^3 + x^2 + x + 0,5"], expl:"2x³ − x³ = x³ (pas 1x³), 3x² + 2x² = 5x².", src:"FA163 5., cahier p. 123" },
    { front:"2x^3 + 3x^2 + x + 0,5 + 3x − 4", back:["2x^3 + 3x^2 + 4x − 3,5"], expr:true, wrong:["2x^3 + 3x^2 + 4x + 4,5","2x^3 + 3x^2 + 3x − 3,5","5x^3 + 3x^2 + x − 3,5"], expl:"x + 3x = 4x et 0,5 − 4 = −3,5.", src:"FA163 6., cahier p. 123" },
  ]},
  { key:"o8", unit:"questions", code:"Obj. 8", title:"Expressions littérales équivalentes", src:"FA117 b), FA159", consigne:"Réduis cette expression de FA159 :", items:[
    { front:"5x − (x + 3x)", back:["x"], libre:true, wrong:["9x","x + 3x","3x"], expl:"5x − x − 3x = x.", src:"FA159, fiche p. 112" },
    { front:"−4x − (x − 4)", back:["−5x + 4"], libre:true, wrong:["−5x − 4","−3x + 4","−4x − x − 4"], expl:"−4x − x + 4 = −5x + 4 : le − change le signe de −4.", src:"FA159, fiche p. 112" },
    { front:"x + (−2x − 3) + 3", back:["−x"], libre:true, wrong:["−x − 6","3x","−x + 6"], expl:"x − 2x − 3 + 3 = −x.", src:"FA159, fiche p. 112" },
    { front:"2x − (4 − 3x)", back:["5x − 4"], libre:true, wrong:["−x − 4","5x + 4","−x + 4"], expl:"2x − 4 + 3x = 5x − 4.", src:"FA159, fiche p. 112" },
    { front:"1 + x − (2x − 2)", back:["−x + 3"], libre:true, wrong:["−x − 1","3x − 1","x + 3"], expl:"1 + x − 2x + 2 = −x + 3.", src:"FA159, fiche p. 112" },
    { front:"4x − (1 − x + 3)", back:["5x − 4"], libre:true, wrong:["3x − 4","5x + 2","3x + 2"], expl:"4x − 1 + x − 3 = 5x − 4 : les trois signes de la parenthèse changent.", src:"FA159, fiche p. 112" },
    { front:"9x − (x + x)", back:["7x"], libre:true, wrong:["9x","8x","7x^2"], expl:"x + x = 2x, et 9x − 2x = 7x.", src:"FA159, fiche p. 112" },
    { front:"3 − (x + 3) + 2x", back:["x"], libre:true, wrong:["3x + 6","−3x","x + 6"], expl:"3 − x − 3 + 2x = x.", src:"FA159, fiche p. 112" },
    { front:"−(x + 1)", back:["−x − 1"], libre:true, wrong:["−x + 1","x − 1","−x"], expl:"Le − devant la parenthèse change les deux signes : −x − 1.", src:"FA159, fiche p. 112" },
    { front:"x − (x − 7x)", back:["7x"], libre:true, wrong:["−7x","x","−5x"], expl:"x − x + 7x = 7x.", src:"FA159, fiche p. 112" },
    { front:"3x − 3 − (4x + 2)", back:["−x − 5"], libre:true, wrong:["−x − 1","7x − 1","−x + 5"], expl:"3x − 3 − 4x − 2 = −x − 5.", src:"FA159, fiche p. 112" },
    { front:"−(x + 4) + 6x", back:["5x − 4"], libre:true, wrong:["5x + 4","7x + 4","−7x − 4"], expl:"−x − 4 + 6x = 5x − 4.", src:"FA159, fiche p. 112" },
    { consigne:"Dans FA159, quelle expression est égale à 5x − 4 ?", front:"5x − 4", back:["−(x + 4) + 6x"], wrong:["−4x − (x − 4)","1 + x − (2x − 2)","3x − 3 − (4x + 2)"], mcqOnly:true, expl:"−(x + 4) + 6x = −x − 4 + 6x = 5x − 4. Les trois autres donnent −5x + 4, −x + 3 et −x − 5.", src:"FA159, fiche p. 112" },
    { consigne:"Dans FA159, quelle expression est égale à 7x ?", front:"7x", back:["x − (x − 7x)"], wrong:["5x − (x + 3x)","3 − (x + 3) + 2x","2x − x"], mcqOnly:true, expl:"x − (x − 7x) = x − x + 7x = 7x. Les trois autres donnent x.", src:"FA159, fiche p. 112" },
    { consigne:"Dans FA159, quelle expression est égale à −x ?", front:"−x", back:["x + (−2x − 3) + 3"], wrong:["−(x + 1)","1 + x − (2x − 2)","3x − 3 − (4x + 2)"], mcqOnly:true, expl:"x − 2x − 3 + 3 = −x. Les autres donnent −x − 1, −x + 3 et −x − 5.", src:"FA159, fiche p. 112" },
    { consigne:"Des expressions « équivalentes » donnent toujours la même valeur numérique. Laquelle est équivalente à celle-ci ?", front:"x · x", back:["x^2"], wrong:["7 · x","9 + 6 · x","4 · x + 3 · x"], mcqOnly:true, expl:"x · x et x² donnent la même valeur pour chaque x de ton tableau (4, 0, 1, 100).", src:"FA117 b), fiche p. 102" },
    { consigne:"Des expressions « équivalentes » donnent toujours la même valeur numérique. Laquelle est équivalente à celle-ci ?", front:"7 · x", back:["4 · x + 3 · x"], wrong:["x · x","6 · x + 9","x^2"], mcqOnly:true, expl:"4 · x + 3 · x = 7 · x : ton tableau donne 14, 0, 7, 70 dans les deux colonnes.", src:"FA117 b), fiche p. 102" },
    { consigne:"Des expressions « équivalentes » donnent toujours la même valeur numérique. Laquelle est équivalente à celle-ci ?", front:"9 + 6 · x", back:["6 · x + 9"], wrong:["7 · x","4 · x + 3 · x","x^2"], mcqOnly:true, expl:"9 + 6 · x = 6 · x + 9 : on peut échanger les termes d'une addition (21, 9, 15, 69).", src:"FA117 b), fiche p. 102" },
  ]},
  { key:"o9", unit:"questions", code:"Obj. 9", title:"Élaborer une expression (figure, phrase)", src:"FA105, FA108, FA109, FA115", consigne:"FA105 a) : rectangle formé de 2 carrés de côté c (longueur 2c, largeur c).", items:[
    { front:"Quel est son périmètre ?", back:["6c"], wrong:["2c^2","4c","3c"], expl:"2c + c + 2c + c = 6c. Tu l'avais juste.", src:"FA105 a), cahier p. 113" },
    { front:"Quelle est son aire ?", back:["2c^2"], expr:true, wrong:["6c","c^2","2c"], expl:"c² + c² = 2c² (deux carrés), ou 2c · c = 2c².", src:"FA105 a), cahier p. 113" },
    { consigne:"FA105 b) : rectangle formé de 3 carrés de côté a (longueur 3a, largeur a).", front:"Quel est son périmètre ?", back:["8a"], wrong:["3a^2","6a","4a"], expl:"3a + a + 3a + a = 8a. Tu l'avais juste.", src:"FA105 b), cahier p. 113" },
    { consigne:"FA105 b) : rectangle formé de 3 carrés de côté a (longueur 3a, largeur a).", front:"Quelle est son aire ?", back:["3a^2"], expr:true, wrong:["8a","a^2","3a"], expl:"a² + a² + a² = 3a².", src:"FA105 b), cahier p. 113" },
    { consigne:"Écris le plus simplement possible (FA108) :", front:"x · y", back:["xy"], wrong:["x + y","x · y","2xy"], expl:"x · y = xy : le signe · ne s'écrit pas entre deux lettres.", src:"FA108 b), cahier p. 113" },
    { consigne:"Écris le plus simplement possible (FA108) :", front:"a · 5", back:["5a"], wrong:["a5","a + 5","5 + a"], expl:"a · 5 = 5a : le nombre devant la lettre.", src:"FA108 c), cahier p. 113" },
    { consigne:"Écris le plus simplement possible (FA108) :", front:"x + x + 1 + x + 2", back:["3x + 3"], libre:true, wrong:["3x + 2","x^3 + 3","5x"], expl:"x + x + x = 3x et 1 + 2 = 3 : 3x + 3.", src:"FA108 e), cahier p. 113" },
    { consigne:"Écris le plus simplement possible (FA108) :", front:"c · c · c", back:["c^3"], expr:true, wrong:["3c","c^2","3c^3"], expl:"c · c · c = c³.", src:"FA108 h), cahier p. 113" },
    { consigne:"Écris selon les conventions d'écriture, comme la correction de ton FA109 :", front:"(a · 4) + 5", back:["4a + 5"], libre:true, wrong:["(a · 4) + 5","a4 + 5","4(a + 5)"], expl:"a · 4 = 4a, et les parenthèses sont inutiles : 4a + 5.", src:"FA109 a), cahier p. 113" },
    { consigne:"Écris selon les conventions d'écriture, comme la correction de ton FA109 :", front:"(b + 5) · 4", back:["4(b + 5)"], expr:true, wrong:["(b + 5) · 4","4b + 5","b + 20"], expl:"Le nombre devant la parenthèse, sans signe · : 4(b + 5).", src:"FA109 b), cahier p. 113" },
    { consigne:"Écris selon les conventions d'écriture, comme la correction de ton FA109 :", front:"c + 4 · 5", back:["c + 20"], libre:true, wrong:["c + 4 · 5","20c","4c + 5"], expl:"4 · 5 = 20 se calcule : c + 20.", src:"FA109 c), cahier p. 113" },
    { consigne:"Écris selon les conventions d'écriture, comme la correction de ton FA109 :", front:"(d − 5) · 4", back:["4(d − 5)"], expr:true, wrong:["(d − 5) · 4","4d − 5","d − 20"], expl:"4(d − 5).", src:"FA109 d), cahier p. 113" },
    { consigne:"Écris selon les conventions d'écriture, comme la correction de ton FA109 :", front:"e · 5 − 4", back:["5e − 4"], libre:true, wrong:["e · 5 − 4","5(e − 4)","e5 − 4"], expl:"e · 5 = 5e : 5e − 4.", src:"FA109 e), cahier p. 113" },
    { consigne:"Écris selon les conventions d'écriture, comme la correction de ton FA109 :", front:"(f − 4) · 5", back:["5(f − 4)"], expr:true, wrong:["(f − 4) · 5","5f − 4","f − 20"], expl:"5(f − 4).", src:"FA109 f), cahier p. 113" },
    { consigne:"FA115 : les trois nombres sont x, x + 12 et 3x.", front:"Quelle est leur somme, réduite ?", back:["5x + 12"], libre:true, wrong:["4x + 12","3x + 12","5x"], expl:"x + x + 12 + 3x = 5x + 12.", src:"FA115 b), cahier p. 114" },
    { consigne:"FA115 : les trois nombres sont x, x + 12 et 3x.", front:"Avec x = 9, que vaut la somme ?", back:["57"], wrong:["45","21","117"], expl:"9 + 21 + 27 = 57, et 5 · 9 + 12 = 57 : les deux calculs de ton cahier donnent le même résultat.", src:"FA115 c), cahier p. 114" },
  ]},
  { key:"o10", unit:"questions", code:"Obj. 10", title:"Valeur numérique d'une expression", src:"FA117 a), fiche p. 102", consigne:"Remplace x par le nombre indiqué, puis calcule :", items: fa117() },
];

/* sous-titre de chaque paquet : ses sources */
DECKS.forEach(d => { d.detail = d.src; });

/* ---------- ordre libre des termes (« effectue et réduis ») ----------
   Une réponse est acceptée si elle a exactement les mêmes termes que la réponse attendue, dans n'importe quel ordre.
   Les items sans « libre » (réduire ET ordonner) gardent l'ordre exact. Le reste de la couche Maths ne change pas. */
function termesLibres(t){
  const out = []; let d = 0, cur = "";
  for (let i = 0; i < t.length; i++){
    const c = t[i];
    if (c === "(") d++; else if (c === ")") d--;
    if (d === 0 && (c === "+" || c === "-") && i > 0 && t[i-1] !== "^" && t[i-1] !== "("){ out.push(cur); cur = c === "-" ? "-" : ""; continue; }
    cur += c;
  }
  out.push(cur);
  return out.filter(x => x !== "").sort().join("|");
}
const COUCHE_CONTENU = {
  isRight(q, val){
    if (q.type === "mcq") return val === q.answer;
    const acc = q.accept || [q.answer];
    if (mathMatch(val, acc)) return true;
    const e = ITEM[q.card];
    if (!e || !e.it.libre || !val || !String(val).trim()) return false;
    const me = termesLibres(normMath(val));
    return acc.some(a => termesLibres(normMath(a)) === me);
  },
  /* aide de saisie propre au calcul littéral (la couche parle de 10^7) */
  saisie(q, Q){
    let h = "";
    const k = ["−", ",", "^", "(", ")"]; if (/·/.test(q.answer)) k.push("·"); if (/\//.test(q.answer)) k.push("/");
    if (!Q.checked && !Q.finishing) h += `<div class="keys">${k.map(c => `<button data-act="key" data-v="${esc(c)}" aria-label="Ajouter ${esc(c)}">${esc(c)}</button>`).join("")}</div>`;
    h += `<p class="preview" id="preview">${Q.typed ? "Tu as écrit : " + esc(uni(Q.typed)) : ""}</p>`;
    if (!Q.checked){
      const libre = ITEM[q.card] && ITEM[q.card].it.libre;
      const hint = /\^/.test(q.answer) ? "Tape l'exposant avec ^ : x^2 pour x², 4x^6 pour 4x⁶." : /·/.test(q.answer) ? "Le signe · est sur la touche ci-dessus (ou tape *)." : "";
      const ordre = /[+−-]/.test(q.answer.slice(1)) ? (libre ? " L'ordre des termes est libre." : " Ordonne : de la plus grande puissance à la plus petite.") : "";
      if (hint || ordre) h += `<p class="qhint">${esc((hint + ordre).trim())}</p>`;
    }
    return h;
  },
};

/* ---------- CONTENU : fiche (une section par objectif, liée à son paquet, avec tes exercices corrigés) ---------- */
const FICHE = [
  { num:"1", deck:"o1", titre:"Conventions d'écriture", pairs:[
    ["multiplier par dix, puis ajouter quinze", "10 · n + 15 (FA111 a)"],
    ["ajouter quinze, puis multiplier par dix", "(n + 15) · 10 : l'addition d'abord, donc entre parenthèses (FA111 b)"],
    ["ajouter le produit de quinze par dix", "n + 15 · 10 (FA111 d)"],
    ["4 · x · 3", "= 12x (FA118)"],
    ["x · x · x", "= x³ (FA118)"],
    ["1 · y", "= y (FA118)"],
    ["3x · y · 4y · x", "→ 3xy · 4xy (corrections de ton FA119)"],
    ["5(a + 2) · 11ab", "= 5 · (a + 2) · 11 · a · b (FA119, partie 2)"]],
    astuceNeg:true, astuce:"Sur ton FA119, « 3x · y » et « 4y · x » ont été corrigés en 3xy et 4xy, et « 11 · ab » en 11 · a · b. Pour écrire réduit : le nombre devant, puis les lettres, sans signe ·." },
  { num:"2", deck:"o2a", titre:"Coefficient et partie littérale", pairs:[
    ["−5x", "coefficient −5 · partie littérale x"],
    ["2z³", "coefficient 2 · partie littérale z³"],
    ["9/2 y²", "coefficient 9/2 · partie littérale y²"],
    ["m⁴ · −p", "coefficient 1 · coefficient −1"],
    ["bh/2", "coefficient 1/2 · partie littérale bh"],
    ["xyz", "coefficient 1 · partie littérale xyz"]],
    astuce:"Le coefficient, c'est le nombre (avec son signe) ; la partie littérale, ce sont les lettres avec leurs exposants. Quand on ne voit pas de nombre, le coefficient est 1 (ou −1)." },
  { num:"2", deck:"o2b", titre:"Degré d'un monôme", pairs:[
    ["0,5", "degré 0 (pas de lettre)"],
    ["−5x · 1,2x", "degré 1"],
    ["2z³", "degré 3"],
    ["4x²y", "degré 3 (2 + 1 = 3)"],
    ["−3ab · bh/2", "degré 2 (1 + 1 = 2)"],
    ["xyz", "degré 3 (1 + 1 + 1 = 3)"]],
    astuceNeg:true, astuce:"Sur ton tableau FA130, les degrés de 4x²y, −3ab, bh/2 et xyz ont été corrigés : on additionne les exposants de toutes les lettres, comme le maître l'a écrit (2 + 1 = 3, 1 + 1 = 2, 1 + 1 + 1 = 3)." },
  { num:"3", deck:"o3", titre:"Monômes semblables", pairs:[
    ["x³", "x³/2 · 3x³ · −x³"],
    ["x", "x/2 · 1,5x · −x · x"],
    ["y", "y · −3y · (1/3)y · 2,5y · y/2"],
    ["y³", "3y³ · y³ · y³/3"],
    ["x²", "3x² reste seul"]],
    astuceNeg:true, astuce:"Semblables = même partie littérale, exposants compris (y et y³ ne sont pas semblables). Sur ta fiche FA130 b), y³/3 était resté sans groupe : il va avec 3y³ et y³." },
  { num:"4", deck:"o4", titre:"Opposé d'un polynôme", pairs:[
    ["A = 5m² + 7m − 1", "−A = −5m² − 7m + 1"],
    ["B = −12m + 12/7", "−B = 12m − 12/7"],
    ["E = ½x² + x", "−E = −½x² − x"]],
    astuce:"Tes réponses de FA156 sont justes : l'opposé change le signe de chaque terme. C'est aussi ce qui se passe quand un − est devant une parenthèse (objectifs 6 et 8)." },
  { num:"5", deck:"o5", titre:"Monômes : additionner, soustraire, multiplier", pairs:[
    ["2a + 2a · 2a · 2a", "= 4a · = 4a² (FA139 f, g)"],
    ["4x² + 15x² · 4x² · 15x²", "= 19x² · = 60x⁴ (FA141 e)"],
    ["(6c)²", "= 36c² (FA132 b)"],
    ["(−x)² · −x² · (−x)³", "= x² · = −x² · = −x³ (FA132 g, h, i)"],
    ["12x − 2x · 4", "= 12x − 8x = 4x (FA139 h)"]],
    astuceNeg:true, astuce:"Sur ta fiche FA139 : 7 + 3a ≠ 10a et a² · 12 + 8 · b² ≠ 20a²b² (termes pas semblables : on ne réduit pas) ; −15x − 50x = −65x ; 30x − 12 − 25x − 8 = 5x − 20 ; −5y − 13y = −18y. Sur FA132 : (2x³)² = 4x⁶, le 2 aussi au carré, et (−x)² = x²." },
  { num:"6", deck:"o6", titre:"Polynômes : additionner, soustraire, multiplier", pairs:[
    ["(4y + 5x) − (3x − 2y)", "= 4y + 5x − 3x + 2y = 2x + 6y (FA161 b)"],
    ["(120a² − 75b²) − (200a² − 125b²)", "= 120a² − 75b² − 200a² + 125b² = −80a² + 50b² (FA161 d)"],
    ["(x + 7)(x + 1)", "= x² + x + 7x + 7 = x² + 8x + 7 (FA168 a)"],
    ["(−3x − 4)(−x + 3)", "= 3x² − 9x + 4x − 12 = 3x² − 5x − 12 (FA168 d)"]],
    astuceNeg:true, astuce:"Le − devant une parenthèse change tous ses signes : sur FA161 b) et d), il n'avait changé qu'un terme. Dans un produit, chaque terme multiplie chaque terme avec son signe : (a + 1)(b − 9) = ab − 9a + b − 9 (tu avais +9a)." },
  { num:"7", deck:"o7", titre:"Réduire et ordonner", pairs:[
    ["3x² + 5x + x² + 5 − 3x", "= 4x² + 2x + 5 (FA138 a)"],
    ["3z + z⁵ − z + 2z³ + 4z⁵ + z²", "= 5z⁵ + 2z³ + z² + 2z (FA138 b)"],
    ["2x² + 5x + x² + 2x + 1", "= 3x² + 7x + 1 (FA163 3.)"],
    ["x³ − 3x³ + 2x³", "= 0 (FA138 g)"]],
    astuceNeg:true, astuce:"Sur ton cahier : 2x² + x² a donné 2x⁴, corrigé en 3x² (on additionne les coefficients, pas les exposants) ; 4x² − 2x² a donné 6x², il fallait 2x² ; 1x³ s'écrit x³ ; 2⁴ = 16 est un nombre. Ordonner : de la plus grande puissance à la plus petite, comme dans tes réponses." },
  { num:"8", deck:"o8", titre:"Expressions équivalentes", pairs:[
    ["Définition (FA117 b)", "des expressions « équivalentes » donnent toujours la même valeur numérique"],
    ["x · x et x²", "4, 0, 1, 100 pour x = 2, 0, 1, 10"],
    ["7 · x et 4 · x + 3 · x", "14, 0, 7, 70"],
    ["= x (FA159)", "5x − (x + 3x) · 3 − (x + 3) + 2x · 2x − x"],
    ["= 5x − 4 (FA159)", "2x − (4 − 3x) · 4x − (1 − x + 3) · −(x + 4) + 6x"],
    ["= 7x (FA159)", "9x − (x + x) · x − (x − 7x)"]],
    astuce:"Pour savoir si deux expressions sont égales : réduis chacune, puis compare les formes réduites. C'est exactement ce que tu as fait sur FA159." },
  { num:"9", deck:"o9", titre:"Élaborer une expression", pairs:[
    ["2 carrés de côté c", "P = 6c · A = 2c² (FA105 a)"],
    ["3 carrés de côté a", "P = 8a · A = 3a² (FA105 b)"],
    ["(a · 4) + 5 · (b + 5) · 4", "→ 4a + 5 · 4(b + 5) (corrections de ton FA109)"],
    ["c + 4 · 5", "→ c + 20 (FA109 c)"],
    ["x ; x + 12 ; 3x", "somme 5x + 12 ; pour x = 9 : 57 (FA115)"]],
    astuceNeg:true, astuce:"Sur ton FA109, la plupart des expressions étaient justes mais pas écrites selon les conventions : (a · 4) + 5 s'écrit 4a + 5, (f − 4) · 5 s'écrit 5(f − 4)." },
  { num:"10", deck:"o10", titre:"Valeur numérique", pairs:[
    ["9 + 6 · x pour x = 2", "9 + 12 = 21 : la multiplication d'abord"],
    ["x² pour x = 10", "10 · 10 = 100"],
    ["4 · x + 3 · x pour x = 2", "8 + 6 = 14"],
    ["6 · x + 9 pour x = 0", "0 + 9 = 9"]],
    astuce:"Ton tableau FA117 est entièrement juste. Remplace la lettre par le nombre, puis respecte la priorité des opérations." },
  { num:"manque", titre:"Pas encore dans l'outil", miss:true, tips:[
    "Théorie « Calcul littéral » et exercices 1 et 2 de la feuille distribuée : pas encore photographiés.",
    "Livre (pp. 113 à 125) : les énoncés de FA106, FA107, FA116, FA128, FA129, FA133, FA137, FA146, FA167, FA171 manquent ; ton cahier ne donne que les réponses. FA133 (puissances de monômes, 2 sur 10) est important : envoie la page 117.",
    "FA134 (monômes semblables) n'est pas faite, et FA149 est un devoir pas encore corrigé : aucune question pour l'instant.",
    "FA159 et FA168 h) n'ont pas de correction visible : leurs réponses ont été vérifiées par programme."] },
  { num:"03.12", titre:"Le jour de l'épreuve", tips:[
    "Calculatrice autorisée (feuille d'objectifs) : elle t'aide pour les nombres, pas pour les lettres.",
    "Avant de réduire : entoure les termes semblables de la même couleur, comme sur ton cahier.",
    "Un − devant une parenthèse : réécris d'abord la ligne sans parenthèse, en changeant tous les signes.",
    "Relis la consigne : « réduis » (ordre libre) n'est pas « réduis et ordonne »."] },
];

/* étiquettes : pas de pastille de type en maths (la référence « Obj. 1 a) » suffit) */
const TAG_LABEL = {};

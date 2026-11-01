/* ============================================================
   CONTENU — Maths 7e HarmoS · « Nombres naturels »
   Outil de révision de Liano — 7e HarmoS. Test : mardi 3 novembre 2026.
   Ce fichier est la seule partie propre à cet outil. Il est assemblé avec
   claude/couche-maths.js et claude/noyau-quiz.js par claude/assembler.py (--couche maths).
   Toutes les questions sont des VARIANTES (prompt-artefact-revision.md § 11.3) des fiches
   N-F1 à N-F17 : même consigne, mêmes types d'exercice, autres nombres. Variantes demandées et
   validées par le papa le 31.10.2026 (au plus 5 lignes par objectif). Réponses vérifiées par script.
   v2 (refonte D6) : mêmes paquets, mêmes questions, mêmes identités de cartes (« v_o1|1a) ») et même
   historique que la v1 ; seuls le moteur (noyau commun) et la synchronisation des scores changent.
   ============================================================ */

/* Thème « tableau des positions » : chaque rang a sa colonne (CM DM UM | C D U), comme au cahier.
   Classe des mille en sarcelle, classe des unités en ambre ; les nombres en chasse fixe.
   Palette propre (--pos, --amber, --mark) reliée aux noms de la base (--court, --jersey, --score…). */
const CSS_THEME = `
:root{
  --paper:#EDF3F1; --sheet:#FFFFFF; --ink:#17302B; --soft:#5E716C; --rule:#CCDAD5;
  --pos:#0E6E5C; --pos-wash:#DCEFE9; --amber:#C77A0A; --amber-wash:#FBEBD0; --board:#17302B; --mark:#F2B632;
  --good:#1E7A55; --good-wash:#DCF1E6; --bad:#B23A26; --bad-wash:#F9E1DB; --on-accent:#FFFFFF;
  --p-okdark:#14583F; --p-ok:#2E8B6F; --p-mid:#D9822B; --p-low:#C63B2A; --p-lowsoft:#F0C7C0;
  --display:'Fredoka','Trebuchet MS',sans-serif;
  --body:'Atkinson Hyperlegible',system-ui,-apple-system,'Segoe UI',sans-serif;
  --mono:'JetBrains Mono',ui-monospace,Menlo,Consolas,monospace;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --paper:#0E1715; --sheet:#16231F; --ink:#E3EEEA; --soft:#98ADA7; --rule:#293A35;
  --pos:#4FC7AE; --pos-wash:#123129; --amber:#F2B04A; --amber-wash:#3A2A12; --board:#0A1210; --mark:#F2B632;
  --good:#5ED3A0; --good-wash:#173326; --bad:#FF8A7D; --bad-wash:#3A1E1B; --on-accent:#0A1A16;
  --p-okdark:#3FB488; --p-ok:#5ED3A0; --p-mid:#E8A24D; --p-low:#FF8A7D; --p-lowsoft:#5A2A25; color-scheme:dark}}
:root[data-theme="dark"]{
  --paper:#0E1715; --sheet:#16231F; --ink:#E3EEEA; --soft:#98ADA7; --rule:#293A35;
  --pos:#4FC7AE; --pos-wash:#123129; --amber:#F2B04A; --amber-wash:#3A2A12; --board:#0A1210; --mark:#F2B632;
  --good:#5ED3A0; --good-wash:#173326; --bad:#FF8A7D; --bad-wash:#3A1E1B; --on-accent:#0A1A16;
  --p-okdark:#3FB488; --p-ok:#5ED3A0; --p-mid:#E8A24D; --p-low:#FF8A7D; --p-lowsoft:#5A2A25; color-scheme:dark}
:root{ --court:var(--pos); --court-wash:var(--pos-wash); --jersey:var(--amber); --score:var(--mark); --on-court:var(--on-accent); --box:var(--pos); --crane:var(--amber);
  --focus:var(--mark); --scorebox-border:#2C4A43; }
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .heat td.hc-mid{background:#3A3016;color:#E8C27A}}
.m{font-family:var(--mono);font-weight:500}
.head{margin-bottom:0}
.head h1{font-size:clamp(28px,8vw,36px)}
.ptab{display:block;width:100%;height:auto;margin:12px 0 16px}
/* fiche */
.entry-num{min-width:30px;font-weight:700;border-width:1.5px;border-radius:6px;padding:1px 4px}
.entry-num.miss{color:var(--amber);border-color:var(--amber)}
.entry-title{font-size:17px;line-height:1.2}
.objtxt{margin:0 0 6px;font-style:italic;font-size:14.5px;color:var(--soft)}
.pair-k{font-family:var(--mono);font-weight:700;color:var(--pos);overflow-wrap:anywhere}
.astuce.amb{background:var(--amber-wash)} .astuce.amb b{color:var(--amber)}
.tip{padding:6px 0 6px 12px;border-left-color:var(--mark)}
.pdrop{background:var(--amber-wash)}
/* cartes : les nombres en chasse fixe */
.flash{height:260px}
.face{text-align:center}
.face-word{font-family:var(--mono);font-weight:700;font-size:22px;line-height:1.3;overflow-wrap:anywhere}
.face-mini{color:inherit;font-weight:400;line-height:1.45}
/* quiz */
.num{font-family:var(--mono);font-size:14px}
.qword{font-family:var(--mono);font-weight:700;font-size:clamp(20px,6vw,27px);line-height:1.3}
.qword.txt{font-family:var(--display);font-weight:600}
.choice{font-size:17px;line-height:1.35}
.choice.nb{font-family:var(--mono)}
.choice.bad{text-decoration:line-through}
.tinput{font-family:var(--mono);font-size:20px}
.keys button{min-width:48px;padding:9px 12px;border-radius:10px;font-weight:700;font-size:17px}
.dx-ans{font-family:var(--mono)}
/* résultats et scores */
.scorebox.rattr-box{border-color:var(--amber)}
.score-n{color:#fff} .score-n small{color:#9FB7B0} .score-note{color:#17302B}
.rattr{color:#F2B04A}
.stat span{color:#C3D3CE}
.rattr-tag,.attempt-left .rattr-tag{background:var(--amber)}
`;

const QUIZ_ID = "liano-quiz-maths-nombres-naturels";
const DUE = { iso:"2026-11-03", long:"mardi 3 novembre", short:"03.11" };
const THEME = "Nombres naturels";
const VERSION = { n:3, date:"01.11.2026" };   /* v3 : 01.11.2026, outil réglé sur 5 questions par objectif à l'ouverture (« Combien de questions », on peut choisir 3 ou tout) ; version papier avec un cadre quadrillé sous chaque calcul · v2 : 01.11.2026, outil reconstruit sur le noyau commun : mêmes contenus et même suivi, scores synchronisés entre appareils sur le site · v1 : 31.10.2026, première version (6 paquets de variantes, suivi à 1 anneau, test en cours gardé) */

/* Tout ce que le noyau affiche ou écrit et qui dépend de l'outil. Jamais d'âge en dur : le noyau le déduit de la classe. */
const OUTIL = {
  eleve:"Liano", classe:"7e HarmoS", branche:"Mathématiques",
  titre:"Nombres naturels", sousTitre:"Maths 7e",
  badgeHtml:" ",   /* pas de maillot dans l'en-tête : le tableau des positions est dessous */
  /* tableau des positions avec 247 563 : classe des mille / classe des unités */
  sousEntete(){
    const cols = [["CM","2"],["DM","4"],["UM","7"],["C","5"],["D","6"],["U","3"]];
    let g = "";
    cols.forEach(([h, v], i) => {
      const x = 6 + i * 64 + (i >= 3 ? 8 : 0), mil = i < 3, col = mil ? "var(--pos)" : "var(--amber)";
      g += `<rect x="${x}" y="22" width="58" height="26" rx="5" fill="${col}"/><text x="${x+29}" y="40" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="14" fill="var(--on-accent)">${h}</text>`;
      g += `<rect x="${x}" y="52" width="58" height="44" rx="5" fill="var(--sheet)" stroke="${col}" stroke-width="1.5"/><text x="${x+29}" y="84" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="700" font-size="26" fill="var(--ink)">${v}</text>`;
    });
    g += `<text x="99" y="14" text-anchor="middle" font-family="Atkinson Hyperlegible, sans-serif" font-size="11.5" font-weight="700" fill="var(--pos)">classe des mille</text>`;
    g += `<text x="299" y="14" text-anchor="middle" font-family="Atkinson Hyperlegible, sans-serif" font-size="11.5" font-weight="700" fill="var(--amber)">classe des unités</text>`;
    return `<svg class="ptab" viewBox="0 0 400 100" role="img" aria-label="Tableau des positions : 247 563, soit 2 centaines de milliers, 4 dizaines de milliers, 7 milliers, 5 centaines, 6 dizaines et 3 unités">${g}</svg>`;
  },
  polices:"https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Atkinson+Hyperlegible:wght@400;700&family=JetBrains+Mono:wght@500;700&display=swap",
  introFiche:"Les objectifs de ton test, un par un, avec tes propres exercices comme exemples. Ouvre une section, relis-la, puis va t'entraîner.",
  ficheOuverte:0,
  labelTout:"Tous les objectifs",
  motPaquet:"Objectif", motPaquets:"objectifs",
  compte:"questions",
  comptes:[3, 5, 0], compteDefaut:5, comptesParPaquet:true, compteLabel:"Combien de questions par objectif",
  ordres:{
    paper:{ label:"Comme la feuille papier", sub:"Même ordre et mêmes numéros sur papier et à l'écran", emoji:"📝" },
    mixed:{ label:"Mélangé", sub:"Pour vérifier que tu ne réponds pas par habitude", emoji:"🔀" },
  },
  sousNiveaux:{ easy:"Je choisis parmi les réponses proposées", normal:"Je choisis et j'écris", hard:"J'écris toutes les réponses" },
  conseilSetup:"Tu peux écrire 47000, 47 000 ou 47'000 : les trois sont acceptés. Conseil : Échauffement d'abord, puis Entraînement, puis Niveau épreuve en Épreuve blanche avant mardi.",
  prefixeIndice:"",
  papier:{ titre:"Mathématiques — Nombres naturels", court:"Maths — Nombres naturels", fichier:"maths-nombres-naturels-liano", code:"#PDF-MATHS-NOMBRES" },
  copie:{ titre:"RÉSULTAT — Maths, Nombres naturels" },
  analyse:{
    role:"un enseignant de mathématiques suisse",
    sujet:"les nombres naturels inférieurs à 1 000 000",
    etiquettes:"v_o1 = décomposer un nombre (chiffre des milliers…, écrire en chiffres une décomposition, relier) ; v_o2 = mot-nombre vers écriture chiffrée et lecture ; v_o3 = comparer (< >), ordonner (croissant, décroissant), intercaler avec les mêmes chiffres ; v_o4 = entre quelles graduations d'une droite graduée ; v_o5 = ajouter ou enlever une dizaine, centaine, millier, dizaine de milliers (retenues) ; v_o6 = chiffre des… ou nombre entier de…",
    pistes:"rang confondu (dizaines de milliers / milliers), zéro oublié pour un rang vide, retenue oubliée quand il y a des 9, « chiffre des » confondu avec « nombre entier de », croissant confondu avec décroissant, graduation mal choisie",
  },
};

/* ---------- SOURCES ---------- */
const SOURCES = [
  { titre:"Photos 1 et 2 — feuille d'objectifs « Nombres naturels »", recue:"31.10.2026", contenu:"Les 7 objectifs, les fiches et pages du livre de chacun, et l'encadré « Rappel » (< > croissant décroissant). Un paquet par objectif, de 1 à 6." },
  { titre:"Photo 3 — fichier p. 107, N-F1 et N-F2", recue:"31.10.2026", contenu:"Modèles des variantes des objectifs 1 (chiffre des milliers…, écrire en chiffres une décomposition) et 2 (mot-nombre → chiffres)." },
  { titre:"Photo 4 — fichier p. 108, N-F3", recue:"31.10.2026", contenu:"Sommets du monde : modèle de l'objectif 3 (classer du plus élevé au moins élevé)." },
  { titre:"Photo 5 — fichier p. 111, N-F5", recue:"31.10.2026", contenu:"Animaux de compagnie : modèle « … est le chiffre des … » (objectif 1)." },
  { titre:"Photo 6 — fichier p. 112, N-F6", recue:"31.10.2026", contenu:"Nombres égaux : modèle du « Relie » (objectif 1)." },
  { titre:"Photos 7 et 8 — fichier p. 115 et 116, N-F9 et N-F10", recue:"31.10.2026", contenu:"Dictées de nombres, populations cantonales : modèles de l'objectif 2." },
  { titre:"Photo 9 — fichier p. 117, N-F11", recue:"31.10.2026", contenu:"Compare et ordonne : modèles de l'objectif 3 (< ou >, ordre décroissant, ordre croissant)." },
  { titre:"Photo 10 — fichier p. 118, N-F12", recue:"31.10.2026", contenu:"Entre deux graduations : modèle de l'objectif 4 (par milliers, dizaines de milliers, centaines de milliers)." },
  { titre:"Photo 11 — fichier p. 119, N-F13", recue:"31.10.2026", contenu:"Quelles graduations ? Placer des flèches sur une droite : pas transposable à l'écran, laissé de côté." },
  { titre:"Photo 12 — fichier p. 120, N-F14", recue:"31.10.2026", contenu:"Mêmes chiffres, nombres différents : modèle de l'intercalation (objectif 3)." },
  { titre:"Photo 13 — fichier p. 121, N-F15", recue:"31.10.2026", contenu:"Ajoute ou enlève : modèle de l'objectif 5." },
  { titre:"Photo 14 — fichier p. 122, N-F16 et N-F17", recue:"31.10.2026", contenu:"Quel est le nombre entier de… ? Chiffre des… : modèles de l'objectif 6." },
];
const SOURCES_NOTE = "Chaque question est une variante d'un exercice des fiches : même consigne, autres nombres. Les variantes ont été validées par ton papa le 31.10.2026 et chaque réponse a été vérifiée par un programme. Les exemples de la fiche de révision sont tes propres exercices corrigés. Pas encore couverts : l'objectif 7 (résolution de problèmes, aucune fiche reçue), N-F13 (placer des flèches), et les pages non photographiées (N-F4 p. 110, N-F7 p. 113, livre N-L1, L2, L5, L8, aide-mémoire AM 32-33).";
/* Photos : seulement dans la version Claude (privée), jamais sur le site public. */
const PHOTOS = [
  { titre:"Objectifs (1)", url:"/_blob/0d8fd42e03fa544b0c1948e629487137" }, { titre:"Objectifs (2)", url:"/_blob/328bcac49f1854ceac522820a3ca3db3" },
  { titre:"p. 107 · N-F1, N-F2", url:"/_blob/cd648c859a132b1fb70fe02690ed896a" }, { titre:"p. 108 · N-F3", url:"/_blob/02ac819b70478f1c45dcd37f7c377d5d" },
  { titre:"p. 111 · N-F5", url:"/_blob/45ac66f59dab8f2e0d409dcf69791119" }, { titre:"p. 112 · N-F6", url:"/_blob/dddcc8c80c5ff0e142ecf220055d08bb" },
  { titre:"p. 115 · N-F9", url:"/_blob/738f49b91ac73fafb542b56c5e6e4635" }, { titre:"p. 116 · N-F10", url:"/_blob/5fb283b8669e28290a6972ac6407c4cc" },
  { titre:"p. 117 · N-F11", url:"/_blob/2a1beffacb0db10d0d5b87bf7b26ee97" }, { titre:"p. 118 · N-F12", url:"/_blob/713046cf6edd5e8a83ce86966e29030b" },
  { titre:"p. 119 · N-F13", url:"/_blob/5e6b9ed6bb44af5628b3c38bcd051135" }, { titre:"p. 120 · N-F14", url:"/_blob/623f5bf1399040ce057c32ddc05ab79e" },
  { titre:"p. 121 · N-F15", url:"/_blob/cf12475c772e56120b92dea75e4ed4ee" }, { titre:"p. 122 · N-F16, N-F17", url:"/_blob/186cc94687f38cecd2d262aa1977ef0c" },
];

/* ---------- CONTENU : paquets (tous des variantes) ----------
   front = énoncé, back = réponses acceptées (1re = affichée), wrong = distracteurs (erreurs typiques),
   mcqOnly = toujours à choix, seq = ordre à écrire (sign = < ou >), bounds = [graduation avant, après] (mid = le nombre),
   les nombres s'écrivent avec une espace fine : à l'écran l'élève peut taper 47000, 47 000 ou 47'000. */
const T = " ";
const nb = s => String(s).replace(/(\d) (?=\d{3}(?!\d))/g, "$1" + T);   /* espace fine seulement entre les groupes de chiffres */
const DECKS = [
  { key:"v_o1", code:"V-1", n:"1", title:"Variante — Décomposer un nombre", src:"variante de N-F1 (p. 107), N-F5 (p. 111) et N-F6 (p. 112)", variant:true, items:[
    { consigne:"Dans le nombre 274 516…", front:"le chiffre des dizaines de milliers est …", back:["7"], wrong:["4","2","5"], expl:"2 7 4 5 1 6 : CM 2, DM 7, UM 4, C 5, D 1, U 6. Le chiffre des dizaines de milliers est 7.", src:"variante de N-F1 A, p. 107" },
    { consigne:"Dans le nombre 274 516…", front:"le chiffre des centaines est …", back:["5"], wrong:["4","1","6"], expl:"2 7 4 | 5 1 6 : dans la classe des unités, C 5, D 1, U 6. Le chiffre des centaines est 5.", src:"variante de N-F1 A, p. 107" },
    { consigne:"Écris ce nombre en chiffres :", front:"quatre centaines de milliers, deux milliers, six dizaines et une unité", back:["402 061"], wrong:["420 061","402 610","4 261"], expl:"CM 4, DM 0, UM 2, C 0, D 6, U 1 → 402 061. Un 0 pour chaque rang vide (dizaines de milliers, centaines).", src:"variante de N-F1 B, p. 107" },
    { consigne:"Écris ce nombre en chiffres :", front:"50 000 + 3 000 + 80 + 9", back:["53 089"], wrong:["53 890","5 389","530 089"], expl:"5 dizaines de milliers, 3 milliers, 0 centaine, 8 dizaines, 9 unités → 53 089. Pas de centaines : on écrit 0.", src:"variante de N-F1 C, p. 107" },
    { consigne:"Relie : quel nombre est égal ?", front:"cinq dizaines de milliers et cinq centaines", back:["50 500"], wrong:["505 000","5 500","500 500"], mcqOnly:true, expl:"DM 5, UM 0, C 5, D 0, U 0 → 50 500.", src:"variante de N-F6, p. 112" },
    { consigne:"Complète :", front:"Dans 708 042, 8 est le chiffre des …", back:["milliers"], wrong:["centaines de milliers","dizaines de milliers","dizaines"], mcqOnly:true, expl:"7 0 8 | 0 4 2 : CM 7, DM 0, UM 8. Le 8 est le chiffre des milliers.", src:"variante de N-F5 ex. 3, p. 111" },
  ]},
  { key:"v_o2", code:"V-2", n:"2", title:"Variante — Mot-nombre ↔ chiffres", src:"variante de N-F2 (p. 107), N-F9 (p. 115) et N-F10 (p. 116)", variant:true, items:[
    { consigne:"Écris ce nombre en chiffres :", front:"six-mille-quatre-cent-dix-sept", back:["6417"], wrong:["6407","60 417","6470"], expl:"six-mille (6) · quatre-cent (4) · dix-sept (17) → 6417.", src:"variante de N-F2 ex. 1, p. 107" },
    { consigne:"Écris ce nombre en chiffres :", front:"huit-mille-neuf", back:["8009"], wrong:["809","8090","80 009"], expl:"huit-mille, puis 0 centaine, 0 dizaine et 9 unités → 8009.", src:"variante de N-F2 ex. 1, p. 107" },
    { consigne:"Écris ce nombre en chiffres :", front:"deux-cent-quarante-sept-mille-cinq-cent-soixante-trois", back:["247 563"], wrong:["240 563","2 047 563","247 536"], expl:"Avant « mille » : deux-cent-quarante-sept → 247. Après : cinq-cent-soixante-trois → 563. Donc 247 563.", src:"variante de N-F10, p. 116" },
    { consigne:"Écris ce nombre en chiffres :", front:"six-cent-mille-septante-huit", back:["600 078"], wrong:["600 708","678 000","6 000 078"], expl:"Avant « mille » : six-cent → 600. Après : septante-huit → 078 (toujours 3 chiffres après les milliers). Donc 600 078.", src:"variante de N-F10, p. 116" },
    { consigne:"Comment se lit ce nombre ?", front:"7 070", back:["sept-mille-septante"], wrong:["septante-mille-septante","sept-mille-sept-cent","sept-mille-sept"], mcqOnly:true, expl:"7 070 : 7 milliers, 0 centaine, 7 dizaines, 0 unité → sept-mille-septante.", src:"variante de N-F2 ex. 2, p. 107" },
  ]},
  { key:"v_o3", code:"V-3", n:"3", title:"Variante — Comparer, ordonner, intercaler", src:"variante de N-F3 (p. 108), N-F11 (p. 117) et N-F14 (p. 120)", variant:true, items:[
    { consigne:"Compare les nombres en utilisant les signes < ou >.", front:"385 214  …  38 521", back:[">"], wrong:["<"], mcqOnly:true, expl:"385 214 a 6 chiffres, 38 521 en a 5 : le nombre qui a le plus de chiffres est le plus grand. 385 214 > 38 521.", src:"variante de N-F11 ex. 1, p. 117" },
    { consigne:"Compare les nombres en utilisant les signes < ou >.", front:"607 381  …  607 318", back:[">"], wrong:["<"], mcqOnly:true, expl:"Même nombre de chiffres : on compare de gauche à droite. 6 0 7 3 pareil, puis 8 dizaines contre 1 dizaine : 607 381 > 607 318.", src:"variante de N-F11 ex. 1, p. 117" },
    { consigne:"Ordonne les nombres dans l'ordre décroissant. Utilise le signe > entre chaque nombre.", front:"254 130 ; 25 413 ; 245 310 ; 254 103", back:["254 130 > 254 103 > 245 310 > 25 413"], seq:[254130,254103,245310,25413], sign:">", expl:"Décroissant = du plus grand au plus petit. 25 413 n'a que 5 chiffres : il est le plus petit. Puis 254 130 > 254 103 (3 dizaines contre 0) > 245 310.", src:"variante de N-F11 ex. 2, p. 117" },
    { consigne:"Ordonne les nombres dans l'ordre croissant. Utilise le signe < entre chaque nombre.", front:"98 765 ; 96 875 ; 678 059 ; 97 586", back:["96 875 < 97 586 < 98 765 < 678 059"], seq:[96875,97586,98765,678059], sign:"<", expl:"Croissant = du plus petit au plus grand. 678 059 a 6 chiffres : il est le plus grand. Pour les autres, on regarde les milliers : 96, 97, 98.", src:"variante de N-F11 ex. 3, p. 117" },
    { consigne:"Trouve un nombre compris entre les deux nombres donnés. Il doit avoir exactement les mêmes chiffres.", front:"452 318 < … < 452 831", back:["452 381","452 813"], wrong:["452 138","453 218","452 318"], expl:"On garde 452 au début et on change l'ordre de 3, 1, 8 : 452 381 et 452 813 sont tous les deux entre les deux nombres. (452 138 est trop petit.)", src:"variante de N-F14 ex. 2, p. 120" },
  ]},
  { key:"v_o4", code:"V-4", n:"4", title:"Variante — Entre deux graduations", src:"variante de N-F12 (p. 118)", variant:true, items:[
    { consigne:"Droite graduée par milliers : entre quelles graduations se trouve ce nombre ?", front:"… < 47 380 < …", back:["47 000 et 48 000"], bounds:[47000,48000], mid:47380, wrong:["47 300 et 47 400","40 000 et 50 000","46 000 et 47 000"], expl:"Par milliers, on regarde jusqu'au chiffre des milliers : 47 380 est entre 47 000 et 48 000.", src:"variante de N-F12 a), p. 118" },
    { consigne:"Droite graduée par milliers : entre quelles graduations se trouve ce nombre ?", front:"… < 309 950 < …", back:["309 000 et 310 000"], bounds:[309000,310000], mid:309950, wrong:["300 000 et 310 000","309 900 et 310 000","310 000 et 311 000"], expl:"309 950 a 309 milliers : il est entre 309 000 et le millier suivant, 310 000.", src:"variante de N-F12 a), p. 118" },
    { consigne:"Droite graduée par dizaines de milliers : entre quelles graduations se trouve ce nombre ?", front:"… < 263 900 < …", back:["260 000 et 270 000"], bounds:[260000,270000], mid:263900, wrong:["263 000 et 264 000","200 000 et 300 000","270 000 et 280 000"], expl:"Par dizaines de milliers, on regarde jusqu'au chiffre des dizaines de milliers : 26… → entre 260 000 et 270 000.", src:"variante de N-F12 b), p. 118" },
    { consigne:"Droite graduée par dizaines de milliers : entre quelles graduations se trouve ce nombre ?", front:"… < 9870 < …", back:["0 et 10 000"], bounds:[0,10000], mid:9870, wrong:["9000 et 10 000","10 000 et 20 000","9800 et 9900"], expl:"9870 a 0 dizaine de milliers : il est entre 0 et 10 000, comme 9980 sur ta fiche.", src:"variante de N-F12 b), p. 118" },
    { consigne:"Droite graduée par centaines de milliers : entre quelles graduations se trouve ce nombre ?", front:"… < 584 200 < …", back:["500 000 et 600 000"], bounds:[500000,600000], mid:584200, wrong:["580 000 et 590 000","584 000 et 585 000","600 000 et 700 000"], expl:"Par centaines de milliers, seul le premier chiffre compte : 5… → entre 500 000 et 600 000.", src:"variante de N-F12 c), p. 118" },
  ]},
  { key:"v_o5", code:"V-5", n:"5", title:"Variante — Ajoute ou enlève", src:"variante de N-F15 (p. 121)", variant:true, items:[
    { consigne:"Ajoute une dizaine :", front:"58 993", back:["59 003"], wrong:["58 994","59 993","59 093"], expl:"+ 10 : 9 dizaines + 1 = 10 dizaines, on retient 1 centaine ; 9 centaines + 1 = 10, on retient 1 millier. 58 993 + 10 = 59 003.", src:"variante de N-F15 A, p. 121" },
    { consigne:"Ajoute une centaine :", front:"79 940", back:["80 040"], wrong:["79 950","80 940","79 040"], expl:"+ 100 : 9 centaines + 1 = 10, on retient ; 9 milliers + 1 = 10, on retient encore. 79 940 + 100 = 80 040.", src:"variante de N-F15 A, p. 121" },
    { consigne:"Ajoute une dizaine de milliers :", front:"7352", back:["17 352"], wrong:["8352","70 352","7362"], expl:"+ 10 000 : il n'y avait aucune dizaine de milliers, il y en a 1 maintenant. 7352 + 10 000 = 17 352.", src:"variante de N-F15 A, p. 121" },
    { consigne:"Enlève un millier :", front:"230 405", back:["229 405"], wrong:["230 305","220 405","229 505"], expl:"− 1000 : 0 millier, on emprunte 1 dizaine de milliers. 230 405 − 1000 = 229 405.", src:"variante de N-F15 B, p. 121" },
    { consigne:"Enlève une dizaine de milliers :", front:"104 600", back:["94 600"], wrong:["103 600","4 600","104 500"], expl:"− 10 000 : 0 dizaine de milliers, on emprunte 1 centaine de milliers. 104 600 − 10 000 = 94 600.", src:"variante de N-F15 B, p. 121" },
  ]},
  { key:"v_o6", code:"V-6", n:"6", title:"Variante — Chiffre des… / nombre entier de…", src:"variante de N-F16 et N-F17 (p. 122)", variant:true, items:[
    { consigne:"Quel est le nombre entier de dizaines de…", front:"56 438 ?", back:["5643"], wrong:["3","564","56 430"], expl:"Nombre entier de dizaines : on garde tout jusqu'au chiffre des dizaines (on enlève les unités). 56 43|8 → 5643.", src:"variante de N-F16, p. 122" },
    { consigne:"Quel est le nombre entier de centaines de…", front:"408 517 ?", back:["4085"], wrong:["5","408","40 851"], expl:"Nombre entier de centaines : on garde tout jusqu'au chiffre des centaines. 408 5|17 → 4085.", src:"variante de N-F16, p. 122" },
    { consigne:"Quel est le chiffre des centaines de…", front:"408 517 ?", back:["5"], wrong:["4085","0","8"], expl:"Le CHIFFRE des centaines, c'est un seul chiffre : 408 517 → 5.", src:"variante de N-F17, p. 122" },
    { consigne:"Quel est le nombre entier de milliers de…", front:"70 263 ?", back:["70"], wrong:["0","7","702"], expl:"Nombre entier de milliers : tout ce qui est avant les centaines. 70|263 → 70.", src:"variante de N-F16, p. 122" },
    { consigne:"Quel est le chiffre des milliers de…", front:"263 907 ?", back:["3"], wrong:["263","6","9"], expl:"Le chiffre des milliers est un seul chiffre : 2 6 3 | 9 0 7 → 3.", src:"variante de N-F17, p. 122" },
    { consigne:"Quel est le nombre entier de milliers de…", front:"263 907 ?", back:["263"], wrong:["3","2639","26"], expl:"Le nombre entier de milliers, c'est tout ce qui est avant les centaines : 263|907 → 263.", src:"variante de N-F17, p. 122" },
  ]},
];
/* références stables (écran, feuille papier, corrigé, historique) : a), b)… à l'intérieur d'une consigne, précédées du
   numéro de la consigne quand le paquet en a plusieurs (« 1a) », « 2a) ») ; carte = « paquet|réf » (« v_o1|1a) »), comme
   en v1. La couche Maths numérote d'habitude a), b)… et nomme les cartes « paquet:réf » : ici, la référence et l'identité
   sont fixées sur l'élément (lecture seule) pour que l'historique de la v1 se lise sans changement. */
(function annotate(){
  const fixe = (it, nom, val) => Object.defineProperty(it, nom, { get:() => val, set(){}, enumerable:true, configurable:true });
  DECKS.forEach(d => {
    let last = null; const groups = [];
    d.items.forEach(it => { if (it.consigne !== last){ groups.push([]); last = it.consigne; } groups[groups.length-1].push(it); });
    groups.forEach((grp, gi) => grp.forEach((it, i) => {
      const ref = (groups.length > 1 ? (gi+1) : "") + String.fromCharCode(97 + i) + ")";
      fixe(it, "ref", ref); fixe(it, "key", d.key + "|" + ref);
      it.front = nb(it.front); it.back = it.back.map(nb); if (it.wrong) it.wrong = it.wrong.map(nb);
      if (it.seq) it.writeOnly = true;
    }));
    /* affichage de la v1 : le titre sans « Variante — », la source à côté du nombre de questions */
    d.title = d.title.replace("Variante — ", ""); d.unit = "questions"; d.detail = d.src;
  });
})();

/* ---------- FICHE (objectifs mot pour mot, exemples = tes exercices corrigés) ---------- */
const FICHE = [
  { num:"1", titre:"Décomposer un nombre", obj:"Passer du nombre (écriture chiffrée ou mot-nombre) à sa décomposition en unités, dizaines, centaines, milliers, dizaines de milliers, centaines de milliers et inversement.", pairs:[
    ["CM  DM  UM │ C  D  U","centaines de milliers, dizaines de milliers, milliers │ centaines, dizaines, unités"],
    ["7582","chiffre des milliers 7 · centaines 5 · dizaines 8 · unités 2 (N-F1 A)"],
    ["8000 + 90 + 7 = 8097","pas de centaines : on écrit 0 (N-F1 C)"],
    ["30 030","trois dizaines de milliers et trois dizaines (N-F6)"]],
    astuce:"Range le nombre dans le tableau des positions, un chiffre par colonne. Un rang vide reçoit toujours un 0." },
  { num:"2", titre:"Mot-nombre ↔ écriture chiffrée", obj:"Passer du mot-nombre oral ou écrit à son écriture chiffrée et inversement (nombres inférieurs à 1 000 000).", pairs:[
    ["huit-mille-sept = 8007","(N-F2)"],
    ["trois-cent-dix-huit-mille-sept-cent-quatorze = 318 714","avant « mille » : 318 ; après : 714 (N-F10)"],
    ["huit-cent-mille-cent-soixante-deux = 800 162","(N-F10)"]],
    astuce:"Coupe au mot « mille » : à gauche les milliers, à droite toujours 3 chiffres (on complète avec des 0)." },
  { num:"3", titre:"Comparer, ordonner, intercaler", obj:"Comparer, ordonner, encadrer et intercaler des nombres naturels inférieurs à 1 000 000.", pairs:[
    ["<","est plus petit que"],[">","est plus grand que"],
    ["croissant","du plus petit au plus grand"],["décroissant","du plus grand au plus petit"],
    ["201 354 > 201 345","même début : on compare chiffre par chiffre de gauche à droite (N-F11)"]],
    astuce:"Compte d'abord les chiffres : le nombre qui en a le plus est le plus grand. Avec les mêmes chiffres, il arrive qu'aucun nombre ne convienne : c'est un piège (N-F14, 1 f)." },
  { num:"4", titre:"La droite graduée", obj:"Représenter et lire des nombres naturels sur une droite graduée.", pairs:[
    ["0 < 9980 < 10 000","droite par dizaines de milliers (N-F12 b)"],
    ["188 000 < 188 650 < 189 000","droite par milliers (N-F12 a)"],
    ["100 000 < 188 650 < 200 000","droite par centaines de milliers (N-F12 c)"]],
    astuce:"La graduation te dit jusqu'à quel chiffre regarder : par milliers, tu gardes les milliers et tu mets des 0 derrière ; la graduation suivante a 1 millier de plus." },
  { num:"5", titre:"Ajoute ou enlève", obj:"Produire un nombre plus petit ou plus grand qu'un nombre donné d'une unité, d'une dizaine, d'une centaine, d'un millier, d'une dizaine de milliers.", pairs:[
    ["45 995 + 1 dizaine = 46 005","retenues sur plusieurs rangs (N-F15)"],
    ["89 972 + 1 centaine = 90 072","(N-F15)"],
    ["5091 + 1 dizaine de milliers = 15 091","(N-F15)"],
    ["35 000 − 1 dizaine = 34 990","on emprunte (N-F15 B)"]],
    astuce:"Écris le petit calcul au-dessus, comme sur ta fiche : + 10, + 100, + 10 000. Attention aux 9 : 9 + 1 = 10, on retient 1 au rang suivant.", amb:true },
  { num:"6", titre:"Chiffre des… / nombre entier de…", obj:"Extraire le nombre entier ou le chiffre des unités, dizaines, centaines, milliers, dizaines de milliers et centaines de milliers d'un nombre.", pairs:[
    ["309 275","chiffre des centaines : 2 · nombre entier de centaines : 3092 (N-F17)"],
    ["820 354","chiffre des milliers : 0 · nombre entier de milliers : 820 (N-F17)"]],
    astuce:"« Chiffre des… » → un seul chiffre. « Nombre entier de… » → tout ce qui est à gauche, jusqu'à ce rang compris." },
  { num:"7", titre:"Résolution de problèmes", miss:true, tips:["Cet objectif est sur la feuille, mais aucune fiche n'a été envoyée : il n'est pas dans l'outil. Relis tes problèmes faits en classe avec un adulte."] },
  { num:"03.11", titre:"Le jour du test", tips:[
    "Écris tes nombres en groupes de 3 chiffres (247 563) : c'est plus facile à relire.",
    "Relis la consigne : « chiffre des » ou « nombre entier de » ? « croissant » ou « décroissant » ?",
    "Pour ajouter ou enlever, écris + 10, + 100, + 1000 au-dessus, puis calcule."] },
];

/* la fiche telle qu'en v1 : « Objectif N : … », exemples (nombres groupés par 3), conseils, astuce, source ;
   chaque section d'objectif est reliée à son paquet (pastille dans l'en-tête, état du paquet et « Teste-toi » en bas) */
function nnFicheCorps(num, sec, relie){
  let h = "";
  if (sec.obj) h += `<p class="objtxt">Objectif ${esc(num)} : ${esc(sec.obj)}</p>`;
  if (sec.pairs) h += sec.pairs.map(p => `<div class="pair"><span class="pair-k">${esc(nb(p[0]))}</span>${p[1] ? `<span>${esc(nb(p[1]))}</span>` : ""}</div>`).join("");
  if (sec.tips) h += `<div style="display:flex;flex-direction:column;gap:6px;margin-top:6px">` + sec.tips.map(t => `<p class="tip">${esc(t)}</p>`).join("") + `</div>`;
  if (sec.astuce) h += `<p class="astuce${sec.amb ? " amb" : ""}"><b>${sec.amb ? "Attention aux retenues" : "Astuce"}</b>${esc(nb(sec.astuce))}</p>`;
  if (relie) h += `<p class="fine" style="margin-top:8px">Source : feuille d'objectifs (photos 1 et 2) et tes fiches corrigées.</p>`;
  return h;
}
FICHE.forEach(sec => {
  const corps = { obj:sec.obj, pairs:sec.pairs, tips:sec.tips, astuce:sec.astuce, amb:sec.amb }, dk = "v_o" + sec.num;
  if (DECKS.some(d => d.key === dk)) sec.deck = dk;
  sec.html = () => nnFicheCorps(sec.num, corps, !!sec.deck);
  delete sec.pairs; delete sec.tips; delete sec.astuce; sec.count = 0;
});

const TAG_LABEL = {};

/* ============================================================
   CORRECTION ET QUESTIONS PROPRES À CET OUTIL (comme en v1)
   La couche Maths sait corriger des calculs ; ici il faut en plus :
   - un ordre à écrire (seq + sign) : les nombres dans l'ordre, séparés par le signe demandé (ou ; ou ,), toujours à écrire ;
   - deux graduations (bounds + mid) : dans n'importe quel ordre, séparées par « et », « ; », « < », « , », « / » ou « à »,
     le nombre encadré pouvant être recopié au milieu ;
   - les nombres comparés sans les espaces, apostrophes ou espaces fines des milliers.
   Ces réglages remplacent, pour cet outil seulement, quelques accroches de la couche (questions, correction, clavier,
   cartes) ; ils sont posés dès que tout le script est chargé, avant le premier geste de l'élève. Les questions déjà
   enregistrées en v1 (test en cours) portent seq / bounds / accept : elles se corrigent de la même façon.
   ============================================================ */
function nnNorm(s){
  let t = String(s || "").toLowerCase().trim().replace(/[−–—]/g, "-").replace(/[\s'’\u202f\u00a0]/g, "");
  if (/^\d+$/.test(t)) t = String(parseInt(t, 10));
  return t;
}
function nnNombre(p){ const t = String(p).replace(/[\s'’.\u202f\u00a0]/g, ""); return /^\d+$/.test(t) ? parseInt(t, 10) : null; }
function nnOrdre(input, q){
  const signs = String(input).match(/[<>]/g) || [];
  if (signs.some(s => s !== q.sign)) return false;
  const parts = String(input).split(/[<>;,]/).map(p => p.trim()).filter(Boolean).map(nnNombre);
  if (parts.some(x => x === null)) return false;
  return parts.length === q.seq.length && parts.every((x, i) => x === q.seq[i]);
}
function nnGraduations(input, q){
  const parts = String(input).toLowerCase().split(/\s*(?:et|;|<|,|\/|à)\s*/).map(p => p.trim()).filter(Boolean).map(nnNombre);
  if (parts.some(x => x === null)) return false;
  const nums = parts.filter(x => x !== q.mid).sort((a, b) => a - b);
  return nums.length === 2 && nums[0] === q.bounds[0] && nums[1] === q.bounds[1];
}
function nnJuste(input, q){
  if (!input || !String(input).trim()) return false;
  if (q.seq) return nnOrdre(input, q);
  if (q.bounds) return nnGraduations(input, q);
  const me = nnNorm(input);
  return q.accept.some(a => nnNorm(a) === me);
}
function nnChoix(good, wrong){
  const seen = new Set([nnNorm(good)]), out = [];
  shuffle(wrong || []).forEach(v => { if (out.length >= 3) return; const k = nnNorm(v); if (seen.has(k)) return; seen.add(k); out.push(v); });
  return shuffle([good, ...out]);
}
const nnTexte = s => /[a-zà-ÿ]{3}/i.test(String(s));
function nnQuestion(it, d, difficulty, i){
  const asMcq = !it.writeOnly && (it.mcqOnly || difficulty === "easy" || (difficulty === "normal" && Math.random() < 0.5));
  const q = { id:"q"+(i+1), num:i+1, ex:0, exTitle:d.title, deckKey:d.key, tag:d.key, code:d.code, ref:d.code + " " + it.ref, card:it.key,
    consigne:it.consigne, word:it.front, prompt:`${it.consigne} ${it.front}`, answer:it.back[0],
    expl:it.expl + " — " + it.src + ".", mcqOnly:!!it.mcqOnly };
  if (it.seq){ q.seq = it.seq; q.sign = it.sign; }
  if (it.bounds){ q.bounds = it.bounds; q.mid = it.mid; }
  q.accept = it.back;
  if (asMcq){ q.type = "mcq"; q.options = nnChoix(it.back[0], it.wrong); }
  else q.type = "type";
  return q;
}
function nnCoucheOutil(){
  /* limit = nombre de questions par objectif (0 = toutes) ; tirage et numéros de la couche (sampleDeck, numberQs) */
  COUCHE.buildTest = (keys, difficulty, limit, order) => {
    let list = [];
    DECKS.filter(d => keys.includes(d.key)).forEach(d => sampleDeck(d, limit).forEach(it => list.push({ it, d })));
    if (order === "mixed") list = shuffle(list);
    return numberQs(list.map(({ it, d }, i) => nnQuestion(it, d, difficulty, i)));
  };
  COUCHE.isRight = (q, val) => q.type === "mcq" ? val === q.answer : nnJuste(val, q);
  COUCHE.classeMot = q => nnTexte(q.word) && !/\d{3}/.test(q.word) ? "txt" : "";
  COUCHE.classeChoix = o => nnTexte(o) ? "" : "nb";
  /* clavier du téléphone comme dans la v1 : pavé numérique quand la réponse n'est faite que de chiffres */
  COUCHE.clavier = q => !q.seq && !q.bounds && /^[\d\s ]+$/.test(q.answer) ? "numeric" : "text";
  COUCHE.saisie = (q, Q) => {
    const ks = q.seq ? [q.sign] : q.bounds ? [" et "] : [];
    let h = "";
    if (ks.length && !Q.checked && !Q.finishing) h += `<div class="keys">${ks.map(k => `<button data-act="key" data-v="${esc(k)}" aria-label="Ajouter ${esc(k.trim())}">${esc(k.trim())}</button>`).join("")}</div>`;
    const hint = q.seq ? `Écris les 4 nombres dans l'ordre, avec le signe ${q.sign} entre chaque nombre.` : q.bounds ? "Écris les deux graduations avec « et » entre les deux : 47 000 et 48 000" : "";
    if (hint && !Q.checked) h += `<p class="qhint">${esc(hint)}</p>`;
    return h;
  };
  delete COUCHE.onSaisie;
  COUCHE.cardFace = (d, it) => ({ tagF:`Objectif ${d.n} · ${it.consigne}`, front:it.front, frontClass:"", hintF:"touche la carte", tagB:"Réponse",
    backHtml:`<span class="face-word">${esc(it.back[0])}${it.back.length > 1 && !it.bounds ? " ou " + esc(it.back[1]) : ""}</span><span class="face-mini">${esc(it.expl)}</span>` });
}
if (typeof queueMicrotask === "function") queueMicrotask(() => { if (typeof COUCHE !== "undefined") nnCoucheOutil(); });

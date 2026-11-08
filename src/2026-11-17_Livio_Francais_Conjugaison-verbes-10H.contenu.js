/* ============================================================
   CONTENU — Français : conjugaison, les verbes du « Planning verbes 10H » (FRA10J2)
   Outil de révision de Livio — 10e HarmoS. TE de conjugaison (note entière) : mardi 17 novembre 2026.
   Ce fichier est la seule partie propre à cet outil. Il est assemblé avec
   claude/couche-langues.js et claude/noyau-quiz.js par claude/assembler.py.
   Modèle : 2026-10-29_Liano_Francais_Types-et-formes-de-phrases.contenu.js (français de grammaire, couche Langues).
   Choix signalés au parent (v1) :
   - verbes : les 11 verbes du tableau, SANS ceux entre parenthèses (demande du parent) :
     avoir, être, faire, servir, jeter, recevoir, peser, rire, finir, apprécier, courir ;
   - temps : tous (demande du parent) — indicatif (8 temps), conditionnel présent et passé, subjonctif présent, imparfait,
     passé et plus-que-parfait, impératif présent et passé, participe présent, participe passé en deux formes (ri, ayant ri),
     comme sur les fiches « Je conjugue… » de Livio (v2) ;
   - une carte = un verbe à un temps (17 cartes par verbe, 187) + paquet « Subjonctifs présent et passé » (11 cartes, une par verbe,
     demande du parent : c'est là que Livio se trompe sur ses fiches) ; à chaque test, la personne est tirée au hasard
     (dans le paquet Subjonctifs, plus souvent les personnes où il se trompe) ;
   - la photo ne donne que la liste des verbes et les dates : les formes conjuguées viennent des tableaux de conjugaison
     de référence (pas d'une photo du cahier de Livio) ; à comparer avec ses propres tableaux s'il en a ;
   - les ACCENTS COMPTENT à la correction (comme les Umlaute en allemand) : « il eut » (passé simple) ≠ « qu'il eût »
     (subjonctif imparfait). Majuscules, espaces et pronom facultatifs. Limite connue : la correction en direct et
     « Voir mes erreurs » du noyau ne marquent pas une faute d'accent seule (proposé sur « go fiches ») ;
     l'explication la signale.
   ============================================================ */

/* Thème « le carnet de conjugaison » : encre verte de stylo plume, papier vert d'eau, surligneur souci.
   En-tête : la grille des six personnes (je tu il / nous vous ils), le repère qu'on récite.
   Literata pour les formes conjuguées (on lit chaque lettre, chaque accent), Atkinson Hyperlegible pour l'interface. */
const CSS_THEME = `
:root{
  --paper:#EAF0ED; --sheet:#FFFFFF; --ink:#16302A; --soft:#56685F; --rule:#D0DCD6;
  --court:#1F6B57; --court-wash:#E0EEE8; --jersey:#D9952B; --score:#F0C04A; --board:#16302A;
  --good:#1E7A55; --good-wash:#D4F0E1; --bad:#A3241B; --bad-wash:#F6DEDB; --on-court:#FFFFFF;
  --p-okdark:#135E43; --p-ok:#1E8A5F; --p-mid:#D0821F; --p-low:#B8382A; --p-lowsoft:#F0C7C0;
  --box:#1F6B57; --crane:#D9952B; --hl:#FBE3A6;
  --display:'Literata',Georgia,serif;
  --body:'Atkinson Hyperlegible',system-ui,-apple-system,'Segoe UI',sans-serif;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --paper:#101A17; --sheet:#18241F; --ink:#E4EEE9; --soft:#9DB2A8; --rule:#2B3B35;
  --court:#6CC9A8; --court-wash:#1C3029; --jersey:#F0B04F; --score:#F0C04A; --board:#0A120F;
  --good:#5ED3A0; --good-wash:#15362A; --bad:#FF8A7D; --bad-wash:#3A1E1B; --on-court:#0A120F;
  --p-okdark:#3FB488; --p-ok:#5ED3A0; --p-mid:#E8A24D; --p-low:#FF8A7D; --p-lowsoft:#5A2A25;
  --box:#6CC9A8; --crane:#F0B04F; --hl:#4A3A16; color-scheme:dark}}
:root[data-theme="dark"]{
  --paper:#101A17; --sheet:#18241F; --ink:#E4EEE9; --soft:#9DB2A8; --rule:#2B3B35;
  --court:#6CC9A8; --court-wash:#1C3029; --jersey:#F0B04F; --score:#F0C04A; --board:#0A120F;
  --good:#5ED3A0; --good-wash:#15362A; --bad:#FF8A7D; --bad-wash:#3A1E1B; --on-court:#0A120F;
  --p-okdark:#3FB488; --p-ok:#5ED3A0; --p-mid:#E8A24D; --p-low:#FF8A7D; --p-lowsoft:#5A2A25;
  --box:#6CC9A8; --crane:#F0B04F; --hl:#4A3A16; color-scheme:dark}
:root{ --focus:var(--jersey); }
/* en-tête : la grille des six personnes */
.head{align-items:center}
.pers{flex:none;display:grid;grid-template-columns:repeat(3,auto);gap:2px 7px;padding:8px 10px;border:2px solid var(--court);border-radius:6px;background:var(--sheet);font-family:var(--display);font-style:italic;font-size:14px;line-height:1.15;color:var(--court)}
.pers span:nth-child(n+4){color:var(--jersey)}
.head h1{font-family:var(--display);font-weight:700;font-size:clamp(25px,7.4vw,34px);line-height:1.05;letter-spacing:-.3px}
.qword,.face-word{font-family:var(--display);font-weight:600}
.choice{font-family:var(--display);font-size:18px}
.tinput{font-family:var(--display)}
/* tableaux de la fiche : un bloc par mode, une case par temps */
.cj-mode{margin:14px 0 6px;font-family:var(--display);font-weight:700;font-size:17px;color:var(--court);border-bottom:2px solid var(--court-wash);padding-bottom:3px}
.cj-mode:first-child{margin-top:2px}
.cj-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(158px,1fr));gap:8px}
.cj-t{background:var(--paper);border-radius:6px;padding:7px 9px 8px}
.cj-t.cmp{background:transparent;border:1px dashed var(--rule)}
.cj-t h4{margin:0 0 4px;font:700 13px/1.2 var(--body);color:var(--soft)}
.cj-t p{margin:0;font-family:var(--display);font-size:15px;line-height:1.42}
.cj-t p i{font-style:normal;color:var(--soft)}
.cj-note{margin:10px 0 0;padding:8px 10px;border-left:4px solid var(--jersey);background:var(--hl);border-radius:0 6px 6px 0;font-size:15px}
.cj-face{display:block;font-family:var(--display);font-size:19px;line-height:1.5;text-align:left}
.cj-face i{font-style:normal;color:var(--soft)}
/* étiquettes : le mode du temps demandé */
.chip.indicatif{background:#E0EEE8;color:#1F6B57}
.chip.conditionnel{background:#FDEFD6;color:#8A5410}
.chip.subjonctif{background:#ECE6F8;color:#563C9A}
.chip.imperatif{background:#F9E2DE;color:#9A3C27}
.chip.participe{background:#DDEBF7;color:#1C5A77}
`;

const QUIZ_ID = "livio-quiz-francais-conjugaison-verbes-10h";
const DUE = { iso:"2026-11-17", long:"mardi 17 novembre", short:"17.11" };
const THEME = "Conjugaison — les verbes du planning 10H";
const VERSION = { n:3, date:"08.11.2026" };   /* v1 : 08.11.2026, première version (11 verbes, 16 temps) · v2 : 08.11.2026, impératif passé, participe passé en deux formes (ri, ayant ri), paquet et fiche « Subjonctifs présent et passé », photos des fiches de Livio · v3 : 08.11.2026, « Combien de questions » respecté même avec un seul verbe (chaque temps revient avec une autre personne) */

/* Tout ce que le noyau affiche ou écrit et qui dépend de l'outil. Jamais d'âge en dur : le noyau le déduit de la classe. */
const OUTIL = {
  eleve:"Livio", classe:"10e HarmoS", branche:"Français",
  titre:"Mes verbes du planning", sousTitre:"Français · conjugaison, TE",
  jersey:"je tu il",
  badgeHtml:`<div class="pers" aria-hidden="true"><span>je</span><span>tu</span><span>il</span><span>nous</span><span>vous</span><span>ils</span></div>`,
  polices:"https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,500;0,7..72,600;0,7..72,700;1,7..72,500&family=Atkinson+Hyperlegible:wght@400;700&display=swap",
  introFiche:"Un verbe par section, tous ses temps. Ouvre un verbe, récite chaque case à voix haute en cachant les formes, puis teste-toi sur ce verbe. Les cases en pointillé sont les temps composés : avoir + participe passé.",
  introPaquets:"Un paquet = un verbe, avec ses 17 temps. Le paquet 🎯 Subjonctifs reprend le subjonctif présent et passé des 11 verbes : c'est ton point à travailler. Coche ceux que tu veux travailler. À chaque test, la personne (je, tu, il…) est tirée au hasard.",
  labelTout:"Les 11 verbes",
  motPaquet:"Verbe", motPaquets:"verbes", cePaquet:"Ce verbe",
  comptes:[10,20,40,0], compteDefaut:20,
  conseilSetup:"Les accents comptent, comme au TE : « il eut » (passé simple) n'est pas « qu'il eût » (subjonctif imparfait). En épreuve blanche, tu ne vois aucune réponse avant la fin.",
  papier:{ titre:"Français — Conjugaison, verbes du planning 10H", court:"Conjugaison — verbes 10H", fichier:"conjugaison-verbes-10h-livio", code:"#PDF-FR-CONJ10H" },
  copie:{ titre:"RÉSULTAT — Français, conjugaison des verbes du planning 10H" },
  analyse:{
    role:"un professeur de français suisse",
    sujet:"la conjugaison de 11 verbes (avoir, être, faire, servir, jeter, recevoir, peser, rire, finir, apprécier, courir) à tous les temps de l'indicatif, au conditionnel, aux quatre temps du subjonctif, à l'impératif présent et aux participes",
    etiquettes:"indicatif, conditionnel, subjonctif, imperatif, participe = le mode du temps demandé ; le temps exact et la personne sont écrits dans la question",
    pistes:"la confusion entre passé simple et subjonctif imparfait (accent circonflexe : il eut / qu'il eût), entre futur et conditionnel (-rai / -rais), l'auxiliaire mal conjugué dans les temps composés, le participe passé, les radicaux qui changent (jett-, pès-, reç- / reçoiv-, courr-), le double i (nous riions, nous appréciions), les accents ; les subjonctifs présent et passé sont son point faible connu (qu'il court au lieu de qu'il coure, que tu as au lieu de que tu aies)",
  },
};

/* ---------- SOURCES ---------- */
const SOURCES = [
  { titre:"Photo — « Planning verbes 10H » (FRA10J2)", recue:"08.11.2026", contenu:"Liste des verbes à écrire et apprendre, avec leur date : avoir (25 août), être et faire (1er septembre), servir (8 septembre), jeter (15 septembre), recevoir (22 septembre), peser (29 septembre), rire (20 octobre), finir (27 octobre), apprécier (3 novembre), courir (10 novembre). TE de conjugaison, note entière, le mardi 17 novembre. Conseils de l'encadré : travailler régulièrement, revoir le tout d'une semaine à l'autre, noter les difficultés." },
  { titre:"Demande du parent (chat du 08.11.2026)", recue:"08.11.2026", contenu:"Les verbes entre parenthèses (appeler, rappeler, apercevoir, lever, élever, sourire, agir, crier, oublier, s'écrier) ne sont pas repris. Tous les temps sont interrogés, y compris les quatre temps du subjonctif." },
  { titre:"Photos — fiches « Je conjugue… » de Livio : courir, finir, rire", recue:"08.11.2026", contenu:"Liste des temps demandés (17 temps, dont l'impératif passé et le participe passé en deux formes). Les réponses écrites par Livio ne sont pas reprises dans l'outil ; elles montrent les subjonctifs présent et passé comme point à travailler (paquet 🎯)." },
  { titre:"Formes conjuguées", recue:"08.11.2026", contenu:"Tableaux de conjugaison de référence du français (aucune photo des tableaux du cahier de Livio). Les temps composés sont formés avec l'auxiliaire avoir, comme pour ces 11 verbes." },
];
const SOURCES_NOTE = "La photo ne donne que les verbes et les dates : les formes viennent des tableaux de conjugaison de référence. Si les tableaux du cahier de Livio diffèrent (ordre des temps, il/elle/on…), c'est son cahier qui fait foi : envoie une photo et l'outil sera aligné. Participe passé : les deux formes des tableaux classiques (ri, ayant ri), choix du parent.";
const PHOTOS = [
  { titre:"Planning verbes 10H", url:"/_blob/8dfdd18f255b90aec440fa94210cb47b" },
  { titre:"Fiche courir, page 1", url:"/_blob/2127943fe75886c0a3876abde194d880" },
  { titre:"Fiche courir, page 2", url:"/_blob/dd369b4b312c3c77c076dbda59254818" },
  { titre:"Fiche finir, page 1", url:"/_blob/ce7d2218afa32bb9199882fb4a8ffd5a" },
  { titre:"Fiche finir, page 2", url:"/_blob/609040268b2ffb953d25698496f5a13a" },
  { titre:"Fiche rire, page 1", url:"/_blob/d0efe26c9228b1545648273592c4ee51" },
  { titre:"Fiche rire, page 2", url:"/_blob/d25cac55a10c28e217e2335a4c5494a7" },
];

/* ---------- les verbes ---------- */
/* p : personnes je, tu, il, nous, vous, ils. Imparfait, futur et conditionnel se construisent à partir des radicaux
   (terminaisons régulières) ; les autres temps simples sont écrits en entier. Temps composés : avoir + participe passé. */
const PERS = ["je","tu","il","nous","vous","ils"];
const T_IMP = ["ais","ais","ait","ions","iez","aient"], T_FUT = ["ai","as","a","ons","ez","ont"];
const VERBES = [
  { k:"avoir", emoji:"🎒", date:"mardi 25 août", pp:"eu", ppr:"ayant", rImp:"av", rFut:"aur",
    pres:["ai","as","a","avons","avez","ont"], ps:["eus","eus","eut","eûmes","eûtes","eurent"],
    subp:["aie","aies","ait","ayons","ayez","aient"], subi:["eusse","eusses","eût","eussions","eussiez","eussent"], imper:["aie","ayons","ayez"],
    note:"Subjonctif présent : que j'aie (avec e), qu'il ait (avec t). Passé simple il eut ≠ subjonctif imparfait qu'il eût." },
  { k:"être", emoji:"🙂", date:"mardi 1er septembre", pp:"été", ppr:"étant", rImp:"ét", rFut:"ser",
    pres:["suis","es","est","sommes","êtes","sont"], ps:["fus","fus","fut","fûmes","fûtes","furent"],
    subp:["sois","sois","soit","soyons","soyez","soient"], subi:["fusse","fusses","fût","fussions","fussiez","fussent"], imper:["sois","soyons","soyez"],
    note:"Temps composés avec avoir : j'ai été, j'avais été… Passé simple il fut ≠ subjonctif imparfait qu'il fût. Pas de i après le y : nous soyons, vous soyez." },
  { k:"faire", emoji:"🛠️", date:"mardi 1er septembre", pp:"fait", ppr:"faisant", rImp:"fais", rFut:"fer",
    pres:["fais","fais","fait","faisons","faites","font"], ps:["fis","fis","fit","fîmes","fîtes","firent"],
    subp:["fasse","fasses","fasse","fassions","fassiez","fassent"], subi:["fisse","fisses","fît","fissions","fissiez","fissent"], imper:["fais","faisons","faites"],
    note:"Vous faites (pas « faisez »), ils font. Futur : je ferai (radical fer-)." },
  { k:"servir", emoji:"🍽️", date:"mardi 8 septembre", pp:"servi", ppr:"servant", rImp:"serv", rFut:"servir",
    pres:["sers","sers","sert","servons","servez","servent"], ps:["servis","servis","servit","servîmes","servîtes","servirent"],
    subp:["serve","serves","serve","servions","serviez","servent"], subi:["servisse","servisses","servît","servissions","servissiez","servissent"], imper:["sers","servons","servez"],
    note:"Au singulier du présent, le v tombe : je sers, il sert. Pas de -iss- comme finir : nous servons." },
  { k:"jeter", emoji:"🗑️", date:"mardi 15 septembre", pp:"jeté", ppr:"jetant", rImp:"jet", rFut:"jetter",
    pres:["jette","jettes","jette","jetons","jetez","jettent"], ps:["jetai","jetas","jeta","jetâmes","jetâtes","jetèrent"],
    subp:["jette","jettes","jette","jetions","jetiez","jettent"], subi:["jetasse","jetasses","jetât","jetassions","jetassiez","jetassent"], imper:["jette","jetons","jetez"],
    note:"Deux t devant un e muet : je jette, je jetterai, je jetterais ; un seul t ailleurs : nous jetons, je jetais." },
  { k:"recevoir", emoji:"📬", date:"mardi 22 septembre", pp:"reçu", ppr:"recevant", rImp:"recev", rFut:"recevr",
    pres:["reçois","reçois","reçoit","recevons","recevez","reçoivent"], ps:["reçus","reçus","reçut","reçûmes","reçûtes","reçurent"],
    subp:["reçoive","reçoives","reçoive","recevions","receviez","reçoivent"], subi:["reçusse","reçusses","reçût","reçussions","reçussiez","reçussent"], imper:["reçois","recevons","recevez"],
    note:"Cédille devant o et u : je reçois, j'ai reçu ; pas devant e : nous recevons, je recevrai." },
  { k:"peser", emoji:"⚖️", date:"mardi 29 septembre", pp:"pesé", ppr:"pesant", rImp:"pes", rFut:"pèser",
    pres:["pèse","pèses","pèse","pesons","pesez","pèsent"], ps:["pesai","pesas","pesa","pesâmes","pesâtes","pesèrent"],
    subp:["pèse","pèses","pèse","pesions","pesiez","pèsent"], subi:["pesasse","pesasses","pesât","pesassions","pesassiez","pesassent"], imper:["pèse","pesons","pesez"],
    note:"Accent grave devant un e muet : je pèse, je pèserai, je pèserais ; pas d'accent ailleurs : nous pesons, je pesais." },
  { k:"rire", emoji:"😄", date:"mardi 20 octobre", pp:"ri", ppr:"riant", rImp:"ri", rFut:"rir",
    pres:["ris","ris","rit","rions","riez","rient"], ps:["ris","ris","rit","rîmes","rîtes","rirent"],
    subp:["rie","ries","rie","riions","riiez","rient"], subi:["risse","risses","rît","rissions","rissiez","rissent"], imper:["ris","rions","riez"],
    note:"Double i à l'imparfait et au subjonctif présent : nous riions, vous riiez. Futur : je rirai (un seul r). Participe passé ri (sans t)." },
  { k:"finir", emoji:"🏁", date:"mardi 27 octobre", pp:"fini", ppr:"finissant", rImp:"finiss", rFut:"finir",
    pres:["finis","finis","finit","finissons","finissez","finissent"], ps:["finis","finis","finit","finîmes","finîtes","finirent"],
    subp:["finisse","finisses","finisse","finissions","finissiez","finissent"], subi:["finisse","finisses","finît","finissions","finissiez","finissent"], imper:["finis","finissons","finissez"],
    note:"-iss- au pluriel du présent, à l'imparfait et au subjonctif : nous finissons, je finissais. Participe passé fini (sans t)." },
  { k:"apprécier", emoji:"👍", date:"mardi 3 novembre", pp:"apprécié", ppr:"appréciant", rImp:"appréci", rFut:"apprécier",
    pres:["apprécie","apprécies","apprécie","apprécions","appréciez","apprécient"], ps:["appréciai","apprécias","apprécia","appréciâmes","appréciâtes","apprécièrent"],
    subp:["apprécie","apprécies","apprécie","appréciions","appréciiez","apprécient"], subi:["appréciasse","appréciasses","appréciât","appréciassions","appréciassiez","appréciassent"], imper:["apprécie","apprécions","appréciez"],
    note:"Double i à l'imparfait et au subjonctif présent : nous appréciions, vous appréciiez. Futur : j'apprécierai (on garde le e de l'infinitif)." },
  { k:"courir", emoji:"🏃", date:"mardi 10 novembre", pp:"couru", ppr:"courant", rImp:"cour", rFut:"courr",
    pres:["cours","cours","court","courons","courez","courent"], ps:["courus","courus","courut","courûmes","courûtes","coururent"],
    subp:["coure","coures","coure","courions","couriez","courent"], subi:["courusse","courusses","courût","courussions","courussiez","courussent"], imper:["cours","courons","courez"],
    note:"Deux r au futur et au conditionnel : je courrai, je courrais ; un seul r ailleurs : je courais (imparfait)." },
];
const AVOIR = VERBES[0];

/* les 16 temps, dans l'ordre de la fiche ; comp = temps composé (auxiliaire avoir à tel temps) */
const TEMPS = [
  { t:"pres",   mode:"indicatif",    nom:"présent",            lab:"présent de l'indicatif" },
  { t:"imp",    mode:"indicatif",    nom:"imparfait",          lab:"imparfait de l'indicatif" },
  { t:"ps",     mode:"indicatif",    nom:"passé simple",       lab:"passé simple" },
  { t:"fut",    mode:"indicatif",    nom:"futur simple",       lab:"futur simple" },
  { t:"pc",     mode:"indicatif",    nom:"passé composé",      lab:"passé composé", comp:"pres" },
  { t:"pqp",    mode:"indicatif",    nom:"plus-que-parfait",   lab:"plus-que-parfait", comp:"imp" },
  { t:"pa",     mode:"indicatif",    nom:"passé antérieur",    lab:"passé antérieur", comp:"ps" },
  { t:"fa",     mode:"indicatif",    nom:"futur antérieur",    lab:"futur antérieur", comp:"fut" },
  { t:"cond",   mode:"conditionnel", nom:"présent",            lab:"conditionnel présent" },
  { t:"condpa", mode:"conditionnel", nom:"passé",              lab:"conditionnel passé", comp:"cond" },
  { t:"subp",   mode:"subjonctif",   nom:"présent",            lab:"subjonctif présent" },
  { t:"subi",   mode:"subjonctif",   nom:"imparfait",          lab:"subjonctif imparfait" },
  { t:"subpa",  mode:"subjonctif",   nom:"passé",              lab:"subjonctif passé", comp:"subp" },
  { t:"subpqp", mode:"subjonctif",   nom:"plus-que-parfait",   lab:"subjonctif plus-que-parfait", comp:"subi" },
  { t:"imper",  mode:"imperatif",    nom:"présent",            lab:"impératif présent" },
  { t:"imperpa",mode:"imperatif",    nom:"passé",              lab:"impératif passé" },
  { t:"part",   mode:"participe",    nom:"présent et passé",   lab:"participes" },
];
/* impératif : trois formes (tu, nous, vous) ; impératif passé = avoir à l'impératif + participe passé */
const imperatif = (v, t) => t === "imper" ? v.imper : AVOIR.imper.map(a => a + " " + v.pp);
/* participes, comme dans les tableaux de Livio : présent ; passé en deux formes (simple et composée) */
const partLignes = v => [`<i>présent</i> ${esc(v.ppr)}`, `<i>passé</i> ${esc(v.pp)}`, `<i>passé</i> ${esc("ayant " + v.pp)}`];
const MODE_NOM = { indicatif:"Indicatif", conditionnel:"Conditionnel", subjonctif:"Subjonctif", imperatif:"Impératif", participe:"Participes" };
const IMPER_PERS = [1,3,4];   /* tu, nous, vous */

/* les six formes nues (sans pronom) d'un verbe à un temps de la conjugaison personnelle */
function formes(v, t){
  switch(t){
    case "pres": case "ps": case "subp": case "subi": return v[t];
    case "imp": return T_IMP.map(e => v.rImp + e);
    case "fut": return T_FUT.map(e => v.rFut + e);
    case "cond": return T_IMP.map(e => v.rFut + e);
  }
  const T = TEMPS.find(x => x.t === t);
  return formes(AVOIR, T.comp).map(a => a + " " + v.pp);
}
const voyelle = s => /^[aeéèêiîouyh]/i.test(s);
/* pronom devant une forme : j' devant voyelle ; « que » au subjonctif (qu'il, qu'ils) */
function pronom(p, forme, subj){
  let pr = p === 0 && voyelle(forme) ? "j'" : PERS[p] + " ";
  if (subj) pr = (/^[ie]/.test(pr) ? "qu'" : "que ") + pr;
  return pr;
}
const isSubj = t => TEMPS.find(x => x.t === t).mode === "subjonctif";
const complete = (v, t, p) => { const f = formes(v, t)[p]; return pronom(p, f, isSubj(t)) + f; };
/* repère de la question : « que nous… », « j'… » (l'élision se voit : elle ne donne pas la réponse) */
function repere(v, t, p){ const f = formes(v, t)[p], pr = pronom(p, f, isSubj(t)); return pr.endsWith("'") ? pr + "…" : pr + "…"; }

/* explication d'une question : le temps en entier, la règle du temps, la note du verbe quand elle touche ce temps */
const REGLE = {
  ps:"Au passé simple, nous et vous ont un accent circonflexe (-âmes, -âtes, -îmes, -îtes, -ûmes, -ûtes).",
  fut:"Futur : -rai sans s à je. Ne confonds pas avec le conditionnel (-rais).",
  cond:"Conditionnel = radical du futur + terminaisons de l'imparfait (-ais, -ait, -ions, -iez, -aient).",
  imp:"Imparfait : -ais, -ais, -ait, -ions, -iez, -aient.",
  subp:"Le subjonctif se récite avec « que ».",
  subi:"Subjonctif imparfait : accent circonflexe à qu'il (qu'il eût, qu'il fût), alors que le passé simple n'en a pas (il eut, il fut).",
};
function explique(v, t){
  const T = TEMPS.find(x => x.t === t);
  if (t === "part") return `Participes de « ${v.k} » : présent ${v.ppr} ; passé ${v.pp} (forme simple) et ayant ${v.pp} (forme composée). — planning : ${v.date}`;
  let liste;
  if (t === "imper" || t === "imperpa") liste = imperatif(v, t).join(", ");
  else liste = PERS.map((_, p) => complete(v, t, p)).join(", ");
  const regle = t === "imperpa" ? "Avoir à l'impératif + participe passé." : T.comp ? `Avoir au ${TEMPS.find(x => x.t === T.comp).lab} + participe passé.` : (REGLE[t] || "");
  return `${cap(T.lab)} de « ${v.k} » : ${liste}. ${regle}`.trim() + ` — planning : ${v.date}`;
}
/* astuces du paquet Subjonctifs (le point qui coince sur les fiches de Livio) */
const EXCEPTIONS_SUBJ = ["avoir","être","faire"];
function astuceSubj(v, t){
  if (t === "subpa") return "Que tu aies, qu'il ait (avec i) : « tu as », « il a », c'est l'indicatif.";
  if (EXCEPTIONS_SUBJ.includes(v.k)) return "Pas de truc du « ils » : par cœur.";
  return `Truc : ils ${v.pres[5]} → que je ${v.subp[0]} ; nous, vous comme à l'imparfait (nous ${formes(v,"imp")[3]}).`;
}
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

/* ---------- paquets : un verbe = un paquet, un temps = un élément (une carte) ---------- */
const DECKS_VERBES = VERBES.map(v => ({
  key:v.k.normalize("NFD").replace(/[̀-ͯ]/g,""), title:v.k, emoji:v.emoji, gen:"conj", unit:"temps", detail:"planning : " + v.date.replace("mardi ",""),
  src:`Planning verbes 10H : ${v.k} (${v.date})`,
  items:TEMPS.map(T => ({ front:`${v.k} · ${T.lab}`, v:v.k, t:T.t, src:`Planning verbes 10H : ${v.k} (${v.date})` })),
}));
/* paquet en plus : les subjonctifs présent et passé des 11 verbes (demande du parent : c'est là que Livio se trompe le plus) */
const DECK_SUBJ = { key:"subj", title:"Subjonctifs présent et passé", emoji:"🎯", gen:"subj", unit:"cartes", detail:"ton point à travailler",
  src:"Fiches « Je conjugue… » de Livio (courir, finir, rire)",
  /* une carte par verbe (le test tire le présent ou le passé) : l'outil reste sous 200 cartes, ce que l'assemblage sait jouer de bout en bout */
  items:VERBES.map(v => ({ front:`${v.k} · subjonctifs présent et passé`, v:v.k, t:"subj", src:`Planning verbes 10H : ${v.k} (${v.date})` })) };
const DECKS = [DECK_SUBJ, ...DECKS_VERBES];
const VERBE = Object.fromEntries(VERBES.map(v => [v.k, v]));

/* ---------- types de questions ---------- */
const KINDS = {
  mcq_conj:{ type:"mcq", tag:"indicatif", aspect:"conj", consigne:"Choisis la bonne forme." },
  type_conj:{ type:"type", tag:"indicatif", aspect:"conj", consigne:"Écris la forme (avec ou sans le pronom). Les accents comptent." },
};
const KIND_ORDER = ["mcq_conj","type_conj"];
const TAG_LABEL = { indicatif:"indicatif", conditionnel:"conditionnel", subjonctif:"subjonctif", imperatif:"impératif", participe:"participe" };

/* une question : personne (ou participe) tirée au hasard */
/* personne tirée au hasard, éventuellement avec des poids (paquet Subjonctifs : les personnes où Livio se trompe) */
function tirePers(poids){ if (!poids) return Math.floor(Math.random() * 6); let r = Math.random() * poids.reduce((a, b) => a + b, 0); for (let i = 0; i < 6; i++){ r -= poids[i]; if (r < 0) return i; } return 5; }
function tirage(v, t, poids){
  if (t === "part"){
    const k = Math.floor(Math.random() * 3), rep = [v.ppr, v.pp, "ayant " + v.pp][k];
    const word = ["participe présent", "participe passé (forme simple)", "participe passé (forme composée)"][k];
    const pool = k === 2 ? ["ayant " + v.ppr, "eu " + v.pp, "étant " + v.pp, "avoir " + v.pp] : [v.pp, v.ppr, formes(v,"pres")[2], formes(v,"ps")[2], v.k, formes(v,"subi")[2]];
    return { word, bare:rep, full:rep, accept:[rep], pool };
  }
  if (t === "imper" || t === "imperpa"){
    const i = Math.floor(Math.random() * 3), p = IMPER_PERS[i], f = imperatif(v, t)[i];
    const pool = t === "imper" ? ["pres","subp","fut","imp","ps"].map(x => formes(v, x)[p]) : ["pc","subpa","pqp","fa"].map(x => formes(v, x)[p]);
    return { word:`${t === "imper" ? "impératif présent" : "impératif passé"} · (${PERS[p]})…`, bare:f, full:f, accept:[f], pool };
  }
  const p = tirePers(poids), f = formes(v, t)[p], full = complete(v, t, p);
  const T = TEMPS.find(x => x.t === t);
  const accept = [full, f];
  if (isSubj(t)) accept.push(full.replace(/^que |^qu'/, ""));
  if (p === 2) ["elle","on"].forEach(x => accept.push(full.replace(/\bil /, x + " ").replace(/qu'il/, "qu'" + x), f));
  if (p === 5) accept.push(full.replace(/\bils /, "elles ").replace(/qu'ils/, "qu'elles"));
  /* distracteurs : la même personne aux autres temps du même verbe (même nombre de mots d'abord) */
  const autres = TEMPS.filter(x => x.t !== t && x.t !== "imper" && x.t !== "imperpa" && x.t !== "part").map(x => formes(v, x.t)[p]);
  const memeLong = autres.filter(x => x.split(" ").length === f.split(" ").length);
  /* pièges du subjonctif : la forme de l'indicatif qui lui ressemble (que tu aies ≠ tu as ; qu'il coure ≠ il court ≠ il courut) */
  const piege = t === "subp" ? [formes(v,"pres")[p], formes(v,"ps")[p]] : t === "subpa" ? [formes(v,"pc")[p]] : [];
  return { word:`${T.lab} · ${repere(v, t, p)}`, bare:f, full, accept:[...new Set(accept)], pool:memeLong, wide:autres, piege };
}

/* correction : accents, cédille et tréma comptent ; majuscules, espaces, apostrophe ’ / ' et ponctuation non */
const cjNorm = s => String(s || "").toLowerCase().normalize("NFC").replace(/[’`]/g,"'").replace(/[.!?;,:«»"()]/g," ").replace(/\s*'\s*/g,"'").replace(/\s+/g," ").trim();
/* nombre de questions : la couche pose une question par carte au plus (17 pour un verbe). Ici, quand on demande plus de
   questions qu'il n'y a de cartes, chaque carte revient avec une autre personne (jamais deux fois la même question). */
let DEJA = {};
const COUCHE_CONTENU = {
  /* copie de buildTest de la couche Langues v3, avec la répétition des cartes (remplacement prévu par la couche) */
  buildTest(deckKeys, difficulty, limit){
    DEJA = {};
    const sel = DECKS.filter(d => deckKeys.includes(d.key));
    const nItems = sel.reduce((n, d) => n + d.items.length, 0);
    const tours = limit && limit > nItems ? Math.min(6, Math.ceil(limit / nItems)) : 1;
    let parDeck = sel.map(d => { const g = GENS[d.gen];
      return shuffle(d.items.flatMap(it => { const out = []; for (let r = 0; r < tours; r++) g.kinds(d, it, difficulty).forEach(kind => out.push({ d, g, it, kind })); return out; })); });
    if (limit && limit > 0 && parDeck.reduce((n, l) => n + l.length, 0) > limit){
      const kept = sel.map(() => []); let i = 0, total = 0;
      while (total < limit && parDeck.some(l => l.length)){ const l = parDeck[i % parDeck.length]; if (l.length){ kept[i % parDeck.length].push(l.shift()); total++; } i++; }
      parDeck = kept;
    }
    const qs = []; let num = 0, ex = 0;
    parDeck.forEach((list, di) => {
      const d = sel[di], g = GENS[d.gen];
      const buckets = {}; KIND_ORDER.forEach(k => buckets[k] = []);
      list.forEach(x => buckets[x.kind].push(x.it));
      const pool = g.pool ? g.pool(d) : [];
      KIND_ORDER.forEach(kind => {
        const items = buckets[kind]; if (!items.length) return;
        ex++; const K = KINDS[kind];
        items.forEach(it => {
          num++;
          const q = { id:"q"+num, num, ex, exTitle:d.title, deckKey:d.key, kind, type:K.type, tag:K.tag, aspect:K.aspect, lang:"fr", consigne:K.consigne, keep:true, hint:"" };
          g.fill(q, kind, it, d, pool);
          if (!q.card) q.card = cardKey(d.key, itemFront(g, d, it), K.aspect);
          if (!q.prompt) q.prompt = `${q.consigne} « ${q.word} »`;
          qs.push(q);
        });
      });
    });
    return qs;
  },
  isRight(q, val){ if (q.type === "mcq") return val === q.answer; const a = cjNorm(val); return !!a && (q.accept || [q.answer]).some(x => cjNorm(x) === a); },
};

/* une question, pour les deux générateurs ; subj = paquet Subjonctifs (personnes pièges plus souvent, forme de l'indicatif dans les choix, astuce) */
const POIDS_SUBJ = { subp:[1,1,3,3,3,1], subpa:[1,3,3,1,1,1] };
function remplir(q, kind, it, subj){
  /* une carte qui revient dans le même test (plus de questions que de cartes) prend une question pas encore posée */
  const deja = DEJA[it.front] = DEJA[it.front] || new Set();
  let t, x, essai = 0;
  do { t = it.t === "subj" ? (Math.random() < 0.5 ? "subp" : "subpa") : it.t; x = tirage(VERBE[it.v], t, subj ? POIDS_SUBJ[t] : null); } while (deja.has(t + x.word) && ++essai < 30);
  deja.add(t + x.word);
  const v = VERBE[it.v], T = TEMPS.find(x => x.t === t);
  q.tag = T.mode; q.word = x.word;
  q.expl = subj ? explique(v, t).replace(" — planning", " " + astuceSubj(v, t) + " — planning") : explique(v, t);
  if (kind === "mcq_conj"){ q.consigne = `« ${v.k} » : choisis.`; q.options = subj && x.piege.length ? pickOptions(x.bare, x.piege, x.pool, y => y) : pickOptions(x.bare, x.pool, x.wide || x.pool, y => y); q.answer = x.bare; }
  else { q.consigne = `« ${v.k} » : écris la forme (accents compris).`; q.accept = x.accept; q.answer = x.full; q.keep = true; }
  q.prompt = `« ${v.k} » ${q.word}`;   /* court : il est gardé deux fois par question dans l'historique (limite de 256 Kio) */
}
const niveau = diff => [diff === "easy" ? "mcq_conj" : diff === "hard" ? "type_conj" : (Math.random() < 0.5 ? "mcq_conj" : "type_conj")];
function lignesTemps(v, t){
  if (t === "part") return partLignes(v);
  if (t === "imper" || t === "imperpa") return imperatif(v, t).map(f => esc(f));
  return PERS.map((_, p) => { const f = formes(v, t)[p]; return `<i>${esc(pronom(p, f, isSubj(t)))}</i>${esc(f)}`; });
}
const GENS = {
  conj:{
    cards:(d, it) => [{ aspect:"conj", mcqOnly:false, levels:[0,1,2], label:it.front }],
    kinds:(d, it, diff) => niveau(diff),
    fill:(q, kind, it) => remplir(q, kind, it, false),
    face:(d, it) => {
      const v = VERBE[it.v], T = TEMPS.find(x => x.t === it.t);
      const lignes = lignesTemps(v, it.t);
      return { tagF:"Récite", front:v.k, frontMini:T.lab, tagB:cap(T.lab), backHtml:`<span class="cj-face">${lignes.join("<br>")}</span>` };
    },
  },
  subj:{
    cards:(d, it) => [{ aspect:"conj", mcqOnly:false, levels:[0,1,2], label:"🎯 " + it.front }],
    kinds:(d, it, diff) => niveau(diff),
    fill:(q, kind, it) => remplir(q, kind, it, true),
    face:(d, it) => {
      const v = VERBE[it.v];
      return { tagF:"Récite avec « que »", front:v.k, frontMini:"subjonctif présent, puis passé", tagB:"Subjonctif présent · passé", backHtml:`<span class="cj-face" style="font-size:16px">${lignesTemps(v, "subp").join("<br>")}<br><br>${lignesTemps(v, "subpa").join("<br>")}</span>` };
    },
  },
};
/* ---------- fiche ---------- */
function tableauVerbe(v){
  let h = "", mode = "";
  TEMPS.forEach(T => {
    if (T.mode !== mode){ if (mode) h += `</div>`; mode = T.mode; h += `<p class="cj-mode">${MODE_NOM[mode]}</p><div class="cj-grid">`; }
    const lignes = lignesTemps(v, T.t);
    h += `<div class="cj-t${T.comp ? " cmp" : ""}"><h4>${esc(cap(T.nom))}</h4><p>${lignes.join("<br>")}</p></div>`;
  });
  return h + `</div><p class="cj-note"><b>À retenir :</b> ${esc(v.note)}</p>`;
}
/* fiche du paquet Subjonctifs : les trucs, puis le subjonctif présent des 11 verbes retrouvé à partir de « ils » */
function ficheSubj(){
  let h = `<p class="cj-mode">Le subjonctif présent</p>
  <p class="tip">Dis-le toujours avec « que » devant : que je…, que tu…, qu'il…</p>
  <p class="tip">Le truc du « ils » : pars de « ils » au présent de l'indicatif et enlève -ent. Tu as le radical de que je, que tu, qu'il, qu'ils : ils courent → que je coure, que tu coures, qu'il coure, qu'ils courent.</p>
  <p class="tip">Pour nous et vous, prends l'imparfait : nous courions → que nous courions, vous couriez → que vous couriez.</p>
  <p class="tip">Terminaisons : -e, -es, -e, -ions, -iez, -ent. Jamais de t à qu'il : qu'il coure, qu'il rie, qu'il finisse (« il court », « il rit », « il finit », c'est l'indicatif).</p>
  <p class="tip">Trois verbes ne suivent pas le truc, à savoir par cœur : avoir (que j'aie, qu'il ait), être (que je sois, qu'il soit), faire (que je fasse).</p>
  <div class="tbl"><table><thead><tr><th>ils (présent)</th><th>que je…</th><th>que nous…</th></tr></thead><tbody>`;
  VERBES.forEach(v => { const exc = EXCEPTIONS_SUBJ.includes(v.k);
    h += `<tr><td>${esc(exc ? "par cœur" : "ils " + v.pres[5])}</td><td>${esc(complete(v,"subp",0))}</td><td>${esc(complete(v,"subp",3))}</td></tr>`; });
  h += `</tbody></table></div>
  <p class="cj-mode">Le subjonctif passé</p>
  <p class="tip">Que + avoir au subjonctif présent + participe passé : que j'aie couru, que tu aies couru, qu'il ait couru, que nous ayons couru, que vous ayez couru, qu'ils aient couru.</p>
  <p class="tip">Le piège : « que tu as couru », « qu'il a couru ». « As » et « a », c'est l'indicatif (passé composé). Au subjonctif : aie, aies, ait — avec un i.</p>
  <p class="tip">Pour vérifier, commence par « Il faut que… » : il faut que tu aies fini, il faut qu'il ait ri.</p>
  <p class="cj-note"><b>Ne mélange pas :</b> le subjonctif présent (que nous riions) n'est pas le passé simple (nous rîmes). Si tu entends « que » devant, tu es au subjonctif.</p>`;
  return h;
}
const FICHE = [
  { icon:"🗓️", titre:"Le planning et comment réviser", tips:[
    "Les 11 verbes du TE : avoir, être, faire, servir, jeter, recevoir, peser, rire, finir, apprécier, courir. Les verbes entre parenthèses du planning ne sont pas dans cet outil.",
    "TE de conjugaison (note entière) le mardi 17 novembre.",
    "Travaille régulièrement et revois le tout d'une semaine à l'autre (conseil du planning).",
    "Note tes difficultés en couleur ou sur une feuille séparée (conseil du planning) : l'onglet Scores te montre les cartes qui résistent.",
  ], astuce:"Ordre conseillé : un verbe à la fois en Échauffement, puis Entraînement sur deux ou trois verbes, puis Niveau épreuve en Correction en direct, et enfin l'Épreuve blanche sur les 11 verbes." },
  { icon:"🧱", titre:"Les temps composés : avoir + participe passé", tips:[
    "Passé composé = avoir au présent + participe passé : j'ai couru.",
    "Plus-que-parfait = avoir à l'imparfait : j'avais couru. Passé antérieur = avoir au passé simple : j'eus couru. Futur antérieur = avoir au futur : j'aurai couru.",
    "Conditionnel passé = avoir au conditionnel présent : j'aurais couru.",
    "Subjonctif passé = avoir au subjonctif présent : que j'aie couru. Subjonctif plus-que-parfait = avoir au subjonctif imparfait : que j'eusse couru.",
    "Impératif passé = avoir à l'impératif + participe passé : aie couru, ayons couru, ayez couru.",
    "Participe passé, deux formes : couru et ayant couru.",
    "Les 11 verbes se conjuguent avec avoir, même être : j'ai été. Si tu connais avoir par cœur, tu as la moitié des temps.",
  ] },
  { icon:"⚠️", titre:"Les pièges qui reviennent", tips:[
    "Passé simple ou subjonctif imparfait ? il eut / qu'il eût · il fut / qu'il fût · il fit / qu'il fît · il finit / qu'il finît : l'accent circonflexe fait toute la différence.",
    "Futur ou conditionnel ? je serai / je serais · j'aurai / j'aurais : -rai sans s au futur.",
    "Double i : nous riions, nous appréciions (imparfait et subjonctif présent).",
    "Radicaux qui changent : je jette, je pèse, je reçois / ils reçoivent, je courrai.",
    "Participes passés sans t : ri, fini, servi. Avec t : fait.",
  ] },
  { icon:"🎯", deck:"subj", titre:"Subjonctifs présent et passé", html:() => ficheSubj(), count:11 },
  ...VERBES.map((v, i) => ({ icon:v.emoji, deck:DECKS_VERBES[i].key, titre:v.k, html:() => tableauVerbe(v), count:TEMPS.length })),
];

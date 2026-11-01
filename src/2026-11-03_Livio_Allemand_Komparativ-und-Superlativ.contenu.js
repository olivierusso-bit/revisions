/* ============================================================
   CONTENU — Allemand, Geni@l Klick, Sequenz 2 « Fit und sportlich! » : Komparativ und Superlativ
   Outil de révision de Livio — 10e HarmoS (niveau 2). Test (TO, ½ Gruppe) : mardi 3 novembre 2026.
   Ce fichier est la seule partie propre à cet outil. Il est assemblé avec
   claude/couche-langues.js et claude/noyau-quiz.js par claude/assembler.py.
   Adaptations signalées au parent (v1) et gardées :
   - les Umlaute (ä, ö, ü) ne sont PAS tolérés à la correction (OUTIL.umlautsStricts) : c'est justement ce que
     la leçon fait apprendre (alt → älter). Les accents français restent tolérés, ß = ss aussi ; touches ä ö ü sous le champ.
   - réglage « Combien de questions » (10, 20, 30 ou toutes), parce que tous les paquets donnent plus de 150 questions.
   ============================================================ */

/* Thème « le podium » : comparer, c'est monter les marches. gut → besser → am besten.
   Bleu profond, or du vainqueur, argent et bronze. Barlow Condensed pour les titres, coins plus nets (rayons réduits).
   Palette, podium de l'en-tête, tableau des adjectifs (.steps) et étiquettes (.chip.<tag>) ; la CSS de base vient du noyau (base.css). */
const CSS_THEME = `
:root{
  --paper:#ECEFF3; --sheet:#FFFFFF; --ink:#18233A; --soft:#5E6A80; --rule:#CDD4DF;
  --court:#24477E; --court-wash:#E3EAF5; --jersey:#C98A1C; --score:#E8B024; --board:#18233A;
  --silver:#98A3B3; --bronze:#AE6A3A;
  --good:#1F7A5A; --good-wash:#DCF1E7; --bad:#B8382A; --bad-wash:#F9E2DE; --on-court:#FFFFFF;
  --p-okdark:#16634A; --p-ok:#1F8A63; --p-mid:#D07F22; --p-low:#B8382A; --p-lowsoft:#F0C7C0;
  --box:#24477E; --crane:#C98A1C;
  --display:'Barlow Condensed','Arial Narrow',sans-serif;
  --body:'Atkinson Hyperlegible',system-ui,-apple-system,'Segoe UI',sans-serif;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --paper:#10151F; --sheet:#19202D; --ink:#E5EAF2; --soft:#9AA6BA; --rule:#2B3546;
  --court:#86A8E6; --court-wash:#1C2A44; --jersey:#E8B024; --score:#E8B024; --board:#0A0F18;
  --silver:#8C97A8; --bronze:#C98557;
  --good:#5ED3A0; --good-wash:#15362A; --bad:#FF8A7D; --bad-wash:#3A1E1B; --on-court:#0A0F18;
  --p-okdark:#3FB488; --p-ok:#5ED3A0; --p-mid:#E8A24D; --p-low:#FF8A7D; --p-lowsoft:#5A2A25;
  --box:#86A8E6; --crane:#E8B024; color-scheme:dark}}
:root[data-theme="dark"]{
  --paper:#10151F; --sheet:#19202D; --ink:#E5EAF2; --soft:#9AA6BA; --rule:#2B3546;
  --court:#86A8E6; --court-wash:#1C2A44; --jersey:#E8B024; --score:#E8B024; --board:#0A0F18;
  --silver:#8C97A8; --bronze:#C98557;
  --good:#5ED3A0; --good-wash:#15362A; --bad:#FF8A7D; --bad-wash:#3A1E1B; --on-court:#0A0F18;
  --p-okdark:#3FB488; --p-ok:#5ED3A0; --p-mid:#E8A24D; --p-low:#FF8A7D; --p-lowsoft:#5A2A25;
  --box:#86A8E6; --crane:#E8B024; color-scheme:dark}
/* coins plus nets que la base, contour de focus doré */
:root{ --r-xl:12px; --r-l:10px; --r:8px; --r-m:8px; --r-s:6px; --r-xs:4px; --focus:var(--score); --scorebox-border:#2E3D5C; }
/* le podium 2 · 1 · 3 de l'en-tête */
.head{align-items:flex-end}
.podium{flex:none;display:flex;align-items:flex-end;gap:3px;height:62px}
.podium span{width:21px;display:flex;align-items:flex-start;justify-content:center;font-family:var(--display);font-weight:800;font-size:15px;color:#fff;border-radius:3px 3px 0 0;padding-top:2px}
.podium .p2{height:40px;background:var(--silver)}
.podium .p1{height:58px;background:var(--score);color:#3A2A00}
.podium .p3{height:28px;background:var(--bronze)}
/* Barlow Condensed est étroite : titres un peu plus grands et plus gras que la base */
.head h1{font-weight:800;font-size:clamp(28px,8.4vw,38px);line-height:.95;letter-spacing:.2px}
.lab,.entry-title,.fb-t,.bilan h3{font-weight:700;font-size:22px}
.entry-title{font-size:20px}
.cta{font-weight:700;font-size:21px}
.pglob-x b{font-size:19px}
.face-word{font-weight:700;font-size:clamp(22px,6vw,28px);line-height:1.15}
.qword{font-weight:700;font-size:clamp(25px,7vw,31px);line-height:1.15}
.num{font-weight:800;font-size:16px;padding:1px 9px}
.choice{font-size:17px}
.tinput{font-size:19px}
.live-box{font-size:21px}
.score-n{font-weight:800;font-size:60px}
.stat b{font-size:30px}
.attempt-note{font-weight:800;font-size:19px}
.suivi h3{font-size:21px}
.draft p b{font-size:18px}
/* la liste des adjectifs dans la fiche : trois marches (adjectif, comparatif, superlatif) */
.steps{display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;align-items:end;padding:8px 0;border-top:1px solid var(--rule)}
.steps span{display:block;text-align:center;font-weight:700;font-size:13px;padding:6px 2px;border-radius:4px 4px 0 0;overflow-wrap:anywhere;line-height:1.2}
.steps .s1{background:var(--court-wash);min-height:34px}
.steps .s2{background:color-mix(in srgb,var(--silver) 32%,var(--sheet));min-height:44px}
.steps .s3{background:color-mix(in srgb,var(--score) 34%,var(--sheet));min-height:54px}
.steps .fr{grid-column:1/4;font-size:13px;color:var(--soft);font-weight:400;text-align:left;padding:0}
.steps.irr .s1{box-shadow:inset 3px 0 0 var(--jersey)}
/* étiquettes des types de questions */
.chip.komparativ{background:#E6ECF5;color:#2D4B7A}
.chip.superlativ{background:#FBEBC0;color:#7A5806}
.chip.sens,.chip.allemand{background:#E7F3E6;color:#2C6E34}
.chip.phrase{background:#EFE0F2;color:#6E3A7C}
.chip.regle{background:#DDEFF7;color:#1C5A77}
.chip.article,.chip.pluriel{background:#F7E2DC;color:#9A3C27}
`;

const QUIZ_ID = "livio-quiz-allemand-sequenz2-komparativ";
const DUE = { iso:"2026-11-03", long:"mardi 3 novembre", short:"03.11" };
const THEME = "Sequenz 2 — Komparativ und Superlativ";
const VERSION = { n:3, date:"01.11.2026" };   /* v1 : 31.10.2026, première version · v2 : 01.11.2026, un anneau = un niveau (seuls les tests faits à ce niveau le remplissent) · v3 : 01.11.2026, reconstruit sur le noyau commun (refonte C2), même comportement */

/* Tout ce que le noyau affiche ou écrit et qui dépend de l'outil. Jamais d'âge en dur : le noyau le déduit de la classe. */
const OUTIL = {
  eleve:"Livio", classe:"10e HarmoS (niveau 2)", branche:"Allemand",
  titre:"Komparativ und Superlativ", sousTitre:"Allemand · Sequenz 2 « Fit und sportlich! »",
  jersey:"2·1·3",
  badgeHtml:`<div class="podium" aria-hidden="true"><span class="p2">2</span><span class="p1">1</span><span class="p3">3</span></div>`,
  polices:"https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Atkinson+Hyperlegible:wght@400;700&display=swap",
  introFiche:"Tout ce qu'il faut pour le test de mardi : le comparatif, le superlatif, la liste des adjectifs et ta page de Wortschatz. Ouvre une section, lis-la à voix haute, puis passe aux cartes ou au test.",
  labelTout:"Toute la séquence",
  motPaquet:"Paquet",
  compte:"cartes",
  comptes:[10, 20, 30, 0], compteDefaut:20,
  umlautsStricts:true,
  prefixeIndice:"",
  sousNiveaux:{ easy:"Je choisis parmi plusieurs réponses", hard:"J'écris tout en allemand" },
  conseilSetup:"Ordre conseillé : Correction en direct pour fixer l'orthographe (et les Umlaute), puis Épreuve blanche, où tu ne vois aucune réponse avant la fin, comme mardi.",
  noteAutre:"Ce n'est pas le même mot : apprends-le en entier.",
  papier:{ titre:"Allemand — Komparativ und Superlativ", court:"Allemand Komparativ", fichier:"allemand-komparativ-livio", code:"#PDF-ALLEMAND-KOMPARATIV" },
  copie:{ titre:"RÉSULTAT — Allemand, Komparativ und Superlativ" },
  analyse:{
    role:"un professeur d'allemand suisse",
    sujet:"le comparatif et le superlatif (Geni@l Klick, séquence 2 « Fit und sportlich! »)",
    etiquettes:"sens = traduire un adjectif ou un mot, komparativ = forme du comparatif, superlativ = forme du superlatif avec am, phrase = compléter une phrase (als, so … wie, nicht so … wie, der/die/das …ste, am …sten), regle = règle de grammaire, article, pluriel ; entre parenthèses, le paquet",
    pistes:"l'Umlaut oublié (alter au lieu de älter), les exceptions (gut, viel, gern, hoch, teuer, dunkel), als confondu avec wie, superlatif de l'adjectif (der …ste) confondu avec celui de l'adverbe (am …sten), une lettre oubliée en ajoutant -ste, l'accord der/die/das",
  },
};

/* ---------- SOURCES ---------- */
const SOURCES = [
  { titre:"Photo 1 — Récapitulatif (10N2)", recue:"31.10.2026", contenu:"Comparatif de supériorité (adj + -er als), d'égalité (so … wie), d'infériorité (nicht so … wie), leurs exemples, et les « Exceptions à savoir » (gross > grösser … gern > lieber)." },
  { titre:"Photo 2 — Liste des adjectifs (Adjektive – Komparative – Superlative)", recue:"31.10.2026", contenu:"Tableau français / adjectif / comparatif / superlatif, 22 adjectifs du vocabulaire, les 2 adjectifs en plus (klein, gross) et la ligne N2 (anstrengen)." },
  { titre:"Photo 3 — Grammatik : Der Superlativ", recue:"31.10.2026", contenu:"Superlatif de l'adjectif, du nom et de l'adverbe, avec leurs exemples ; encadré des exceptions (gut, viel, gern, gross, teuer) ; Übung 1 (10 phrases)." },
  { titre:"Photo 4 — Lernziele Sequenz 2", recue:"31.10.2026", contenu:"Feuille d'objectifs : comparatif, superlatif, nombres ordinaux, W-Fragen, phrases avec « weil ». Seuls le comparatif et le superlatif sont dans cet outil (voir ci-dessous)." },
  { titre:"Photo 5 — Korrekturen", recue:"31.10.2026", contenu:"Les 16 phrases corrigées (comparatif et superlatif)." },
  { titre:"Photo 6 — Grammatik : Der Komparativ", recue:"31.10.2026", contenu:"Plus que (adj + -er ; Umlaut pour une syllabe en a, o, u ; exceptions gut, gern, viel), autant que (so / genauso … wie), pas autant que (nicht so … wie), exemples Superman et Calimero." },
  { titre:"Photo 7 — Wortschatz p. 15", recue:"31.10.2026", contenu:"viel – mehr – am meisten, gern – lieber – am liebsten, so … wie, als, der Weltrekord, der Sieg, das Rennen, et leurs phrases." },
];
const SOURCES_NOTE = "Pas repris dans cet outil : les nombres ordinaux, les W-Fragen et les phrases avec « weil » de la feuille d'objectifs. Livio a dit à son papa qu'il n'avait pas besoin de réviser ces points. Les formes sont recopiées telles que les feuilles les écrivent, y compris « am grössen » et « anstrengen » (liste des adjectifs) et « am äletesten » (Korrekturen n° 10) ; quand une autre feuille de Livio donne une autre forme (« am grössten » sur la feuille Superlativ, « gesünder » sur le Récapitulatif, « am ältesten » sur la liste), elle est acceptée aussi et signalée dans la correction. Pour l'Übung 1, les réponses écrites par Livio ne sont pas reprises : la bonne réponse vient des formes imprimées de la liste des adjectifs. Le Wortschatz du devoir est la p. 15 seulement.";
const PHOTOS = [
  { titre:"Récapitulatif", url:"/_blob/104bd342118ef7fa1f5b8486dce91d54" },
  { titre:"Liste des adjectifs", url:"/_blob/bf3466adfbc887bb4b41ebd4c1e530c5" },
  { titre:"Der Superlativ + Übung 1", url:"/_blob/9d3eebf80a46df2b5a340f1f1d975ed3" },
  { titre:"Lernziele", url:"/_blob/895e5db87a044466ab5fe944fecf0d5d" },
  { titre:"Korrekturen", url:"/_blob/ba9f5e43d94e288a48cb01db1137a0c3" },
  { titre:"Der Komparativ", url:"/_blob/b69388e7c78c7770c438a7c422a5e43d" },
  { titre:"Wortschatz p. 15", url:"/_blob/12b9868d1253ac6c4b35d2f17a64cfe9" },
];

/* ---------- CONTENU : paquets ----------
   Le type d'un item se lit à ses champs (le générateur `gen` du paquet s'en charge) :
   komp + sup = ligne de la liste des adjectifs (3 cartes : sens, comparatif, superlatif)
   komp seul  = exception du Récapitulatif (1 carte : comparatif)
   s          = phrase à compléter (o[0] = bonne réponse à choix, acc = réponses écrites acceptées)
   q          = règle (toujours à choix, o[0] = bonne réponse)
   de + fr    = mot du Wortschatz (sens ; article et pluriel pour les noms) */
const L = "liste des adjectifs";
const DECKS = [
  { key:"adj", gen:"adjectif", title:"La liste des adjectifs", emoji:"📋", unit:"adjectifs", src:"Liste des adjectifs (à savoir pour le TO)", items:[
    { fr:["facile"], de:"einfach", komp:"einfacher", sup:"am einfachsten" },
    { fr:["difficile"], de:"schwierig", komp:"schwieriger", sup:"am schwierigsten" },
    { fr:["dangereux"], de:"gefährlich", komp:"gefährlicher", sup:"am gefährlichsten" },
    { fr:["pas dangereux"], de:"ungefährlich", komp:"ungefährlicher", sup:"am ungefährlichsten" },
    { fr:["rapide"], de:"schnell", komp:"schneller", sup:"am schnellsten" },
    { fr:["lent"], de:"langsam", komp:"langsamer", sup:"am langsamsten" },
    { fr:["bon marché"], de:"billig", komp:"billiger", sup:"am billigsten" },
    { fr:["cher"], de:"teuer", komp:"teurer", sup:"am teuersten", irr:true },
    { fr:["fort"], de:"stark", komp:"stärker", sup:"am stärksten" },
    { fr:["faible"], de:"schwach", komp:"schwächer", sup:"am schwächsten" },
    { fr:["important"], de:"wichtig", komp:"wichtiger", sup:"am wichtigsten" },
    { fr:["pas important"], de:"unwichtig", komp:"unwichtiger", sup:"am unwichtigsten" },
    { fr:["sain"], de:"gesund", komp:"gesunder", kAlt:["gesünder"], kNote:"le Récapitulatif écrit « gesünder » : les deux sont acceptés", sup:"am gesundesten" },
    { fr:["malsain"], de:"ungesund", komp:"ungesunder", sup:"am ungesundesten" },
    { fr:["haut"], de:"hoch", komp:"höher", sup:"am höchsten", irr:true },
    { fr:["loin"], de:"weit", komp:"weiter", sup:"am weitesten", irr:true },
    { fr:["proche"], de:"nah", komp:"näher", sup:"am nächsten" },
    { fr:["vieux"], de:"alt", komp:"älter", sup:"am ältesten" },
    { fr:["jeune"], de:"jung", komp:"jünger", sup:"am jüngsten" },
    { fr:["bon / bien","bon","bien"], de:"gut", komp:"besser", sup:"am besten", irr:true },
    { fr:["beaucoup"], de:"viel", komp:"mehr", sup:"am meisten", irr:true },
    { fr:["volontiers"], de:"gern", komp:"lieber", sup:"am liebsten", irr:true },
    { fr:["petit"], de:"klein", komp:"kleiner", sup:"am kleinsten", extra:true },
    { fr:["grand"], de:"gross", komp:"grösser", sup:"am grössen", sAlt:["am grössten"], sNote:"la feuille Superlativ écrit « am grössten » : les deux sont acceptés", extra:true },
    { fr:["fatigant","fatiguant"], de:"anstrengen", komp:"anstrengender", sup:"am anstrengendsten", n2:true },
  ]},
  { key:"exc", gen:"exception", title:"Exceptions à savoir", emoji:"⭐", unit:"comparatifs", src:"Récapitulatif, « Exceptions à savoir »", items:[
    { de:"gross", komp:"grösser", wrong:["grosser","grösster","mehr gross"] },
    { de:"alt", komp:"älter", wrong:["alter","älterer","mehr alt"] },
    { de:"jung", komp:"jünger", wrong:["junger","jüngster","mehr jung"] },
    { de:"dunkel", komp:"dunkler", wrong:["dunkeler","dünkler","mehr dunkel"] },
    { de:"teuer", komp:"teurer", wrong:["teuerer","täurer","mehr teuer"] },
    { de:"stark", komp:"stärker", wrong:["starker","stärkster","mehr stark"] },
    { de:"schwach", komp:"schwächer", wrong:["schwacher","schwächster","mehr schwach"] },
    { de:"hoch", komp:"höher", wrong:["hocher","höcher","höchster"] },
    { de:"nah", komp:"näher", wrong:["naher","nächster","mehr nah"] },
    { de:"gesund", komp:"gesünder", kAlt:["gesunder"], kNote:"la liste des adjectifs écrit « gesunder » : les deux sont acceptés", wrong:["gesundster","mehr gesund","gesündester"] },
    { de:"gut", komp:"besser", wrong:["guter","güter","am besten"] },
    { de:"viel", komp:"mehr", wrong:["vieler","mehrer","am meisten"] },
    { de:"gern", komp:"lieber", wrong:["gerner","mehr gern","am liebsten"] },
  ]},
  { key:"komp", gen:"phrase", title:"Comparatif : als, so … wie", emoji:"⚖️", unit:"phrases", src:"Récapitulatif, Der Komparativ, Lernziele", items:[
    { s:"Ein Zug ist ___ ein Fahrrad.", h:"schnell · plus … que", acc:["schneller als"], o:["schneller als","schneller wie","so schnell als","am schnellsten"], src:"Récapitulatif, A" },
    { s:"Mein Vater ist ___ meine Mutter.", h:"alt · plus … que", acc:["älter als"], o:["älter als","alter als","älter wie","am ältesten"], src:"Récapitulatif, A" },
    { s:"Ich trinke ___ Tee als Kaffee.", h:"gern · préférer", acc:["lieber"], o:["lieber","gerner","mehr gern","am liebsten"], src:"Récapitulatif, A" },
    { s:"Peter ist ___ Paul.", h:"klein · aussi … que", acc:["so klein wie"], o:["so klein wie","so klein als","kleiner wie","nicht so klein wie"], src:"Récapitulatif, B" },
    { s:"Ich bin ___ du.", h:"alt · aussi … que", acc:["so alt wie"], o:["so alt wie","so alt als","älter wie","so älter wie"], src:"Récapitulatif, B" },
    { s:"Tanias Auto ist ___ Jans Auto.", h:"neu · pas aussi … que", acc:["nicht so neu wie"], o:["nicht so neu wie","nicht neuer als","so neu wie","nicht so neu als"], src:"Récapitulatif, C" },
    { s:"Meine Haare sind ___ deine.", h:"schön · pas aussi … que", acc:["nicht so schön wie"], o:["nicht so schön wie","so schön wie","nicht schöner wie","nicht so schön als"], src:"Récapitulatif, C" },
    { s:"Superman ist ___ Calimero.", h:"schnell · plus … que", acc:["schneller als"], o:["schneller als","schneller wie","mehr schnell als","am schnellsten"], src:"Der Komparativ, A" },
    { s:"Calimero ist ___ Superman.", h:"klein · plus … que", acc:["kleiner als"], o:["kleiner als","kleiner wie","mehr klein als","so klein als"], src:"Der Komparativ, A" },
    { s:"Superman ist ___ Calimero.", h:"stark · plus … que", acc:["stärker als"], o:["stärker als","starker als","stärker wie","am stärksten"], src:"Der Komparativ, A (Umlaut)" },
    { s:"Calimero ist ___ Superman.", h:"jung · plus … que", acc:["jünger als"], o:["jünger als","junger als","jünger wie","am jüngsten"], src:"Der Komparativ, A (Umlaut)" },
    { s:"Superman fliegt ___ Calimero.", h:"gut · mieux que", acc:["besser als"], o:["besser als","guter als","besser wie","mehr gut als"], src:"Der Komparativ, A (exceptions)" },
    { s:"Superman hat ___ Kraft als Calimero.", h:"viel · plus de", acc:["mehr"], o:["mehr","vieler","am meisten","mehrer"], src:"Der Komparativ, A (exceptions)" },
    { s:"Calimero ist ___ Superman.", h:"lustig · aussi … que", acc:["so lustig wie","genauso lustig wie"], o:["so lustig wie","lustiger wie","so lustig als","nicht so lustig wie"], src:"Der Komparativ, B" },
    { s:"Calimero ist ___ Superman.", h:"stark · pas aussi … que", acc:["nicht so stark wie"], o:["nicht so stark wie","nicht stärker wie","so stark wie","nicht so stark als"], src:"Der Komparativ, C" },
    { s:"Er läuft ___ meine Freundin.", h:"schnell · plus … que", acc:["schneller als"], o:["schneller als","schneller wie","so schnell als","am schnellsten"], src:"Lernziele, le comparatif" },
    { s:"Er läuft ___ meine Freundin.", h:"schnell · aussi … que", acc:["so schnell wie"], o:["so schnell wie","so schnell als","schneller wie","nicht so schnell wie"], src:"Lernziele, le comparatif (N2)" },
    { s:"Er läuft ___ meine Freundin.", h:"schnell · pas aussi … que", acc:["nicht so schnell wie"], o:["nicht so schnell wie","nicht schneller wie","so schnell wie","nicht so schnell als"], src:"Lernziele, le comparatif (N2)" },
  ]},
  { key:"sup", gen:"phrase", title:"Superlatif : adjectif, adverbe, nom", emoji:"🥇", unit:"phrases", src:"Der Superlativ (encadrés et Übung 1)", items:[
    { s:"Er ist der ___ Läufer.", h:"schnell · superlatif de l'adjectif", acc:["schnellste"], o:["schnellste","schnellsten","schneller","am schnellsten"], src:"Der Superlativ, superlatif de l'adjectif", why:"devant un nom (Läufer), c'est le superlatif de l'adjectif : der … -ste." },
    { s:"Sie ist die ___ Läuferin.", h:"schnell · superlatif de l'adjectif", acc:["schnellste"], o:["schnellste","schnellsten","schneller","am schnellsten"], src:"Der Superlativ, superlatif de l'adjectif", why:"devant un nom (Läuferin), c'est le superlatif de l'adjectif : die … -ste." },
    { s:"Er ist der ___.", h:"schnell · superlatif du nom", acc:["Schnellste"], o:["Schnellste","Schneller","am schnellsten","Schnellsten"], src:"Der Superlativ, superlatif du nom", why:"sans nom après, le superlatif devient lui-même un nom : der Schnellste, avec une majuscule." },
    { s:"Er rennt ___.", h:"schnell · superlatif de l'adverbe", acc:["am schnellsten"], o:["am schnellsten","der schnellste","am schnellste","schneller"], src:"Der Superlativ, superlatif de l'adverbe", why:"il dit comment il court (après le verbe rennt) : superlatif de l'adverbe, am … -sten." },
    { s:"Sie spielt ___.", h:"gut · superlatif de l'adverbe", acc:["am besten"], o:["am besten","am gutesten","die beste","besser"], src:"Der Superlativ, superlatif de l'adverbe", why:"après le verbe spielt : am … -sten, et gut est une exception : am besten." },
    { s:"Du springst ___.", h:"weit · superlatif de l'adverbe", acc:["am weitesten"], o:["am weitesten","am weitsten","der weiteste","weiter"], src:"Der Superlativ, superlatif de l'adverbe", why:"après le verbe springst : am … -sten ; la liste des adjectifs donne weit – weiter – am weitesten." },
    { s:"gut ⇒ der, die, das ___ …", h:"exception, superlatif de l'adjectif", acc:["beste"], o:["beste","guteste","besser","gutste"], src:"Der Superlativ, Achtung Ausnahmen", why:"gut ⇒ der, die, das beste… / Beste / am besten." },
    { s:"viel ⇒ am ___", h:"exception, superlatif de l'adverbe", acc:["meisten"], o:["meisten","vielsten","mehrsten","vielesten"], src:"Der Superlativ, Achtung Ausnahmen", why:"viel ⇒ der, die, das meiste… / Meiste / am meisten." },
    { s:"gern ⇒ der, die, das ___ …", h:"exception, superlatif de l'adjectif", acc:["liebste"], o:["liebste","gernste","gerneste","lieberste"], src:"Der Superlativ, Achtung Ausnahmen", why:"gern ⇒ der, die, das liebste… / Liebste / am liebsten." },
    { s:"gross ⇒ am ___", h:"exception, superlatif de l'adverbe", acc:["grössten"], o:["grössten","grossesten","grosssten","grösseren"], src:"Der Superlativ, Achtung Ausnahmen", why:"gross ⇒ der, die, das grösste… / Grösste / am grössten (avec ö, souligné sur la feuille)." },
    { s:"teuer ⇒ der, die, das ___ …", h:"exception, superlatif de l'adjectif", acc:["teuerste"], o:["teuerste","teurerste","teuerere","teurste"], src:"Der Superlativ, Achtung Ausnahmen", why:"teuer ⇒ der, die, das teuerste… / Teuerste / am teuersten." },
    { s:"Er ist ___ Schüler in der Klasse.", h:"klein", acc:["der kleinste"], o:["der kleinste","der kleiste","der kleinsten","am kleinsten"], src:"Der Superlativ, Übung 1 n° 1", why:"devant le nom Schüler : der + …ste. Liste : klein – kleiner – am kleinsten → der kleinste (avec le n de klein)." },
    { s:"Dieser Junge hat ___ Geld.", h:"viel", acc:["am meisten","das meiste"], o:["am meisten","am vielsten","mehr","die meisten"], src:"Der Superlativ, Übung 1 n° 2", why:"viel est une exception : am meisten (ou das meiste Geld, d'après l'encadré des exceptions)." },
    { s:"Diese Schülerin hat ___ Note in Deutsch gemacht.", h:"gut", acc:["die beste"], o:["die beste","die besten","am besten","die guteste"], src:"Der Superlativ, Übung 1 n° 3", why:"devant le nom Note (die Note) : die beste. gut est une exception." },
    { s:"Usain Bolt rennt ___.", h:"schnell", acc:["am schnellsten"], o:["am schnellsten","der schnellste","am schnellste","schneller"], src:"Der Superlativ, Übung 1 n° 4", why:"après le verbe rennt : superlatif de l'adverbe, am schnellsten." },
    { s:"Wer malt ___?", h:"gut", acc:["am besten"], o:["am besten","am gutesten","der beste","besser"], src:"Der Superlativ, Übung 1 n° 5", why:"après le verbe malt : am besten (exception de gut)." },
    { s:"Mein Haus ist ___ Haus.", h:"hoch", acc:["das höchste"], o:["das höchste","das hochste","das höchsten","am höchsten"], src:"Der Superlativ, Übung 1 n° 6", why:"devant le nom Haus (das Haus) : das + …ste. Liste : hoch – höher – am höchsten → das höchste, avec ö." },
    { s:"Was ist ___ Sportart?", h:"gefährlich", acc:["die gefährlichste"], o:["die gefährlichste","die gefährichste","die gefährlichsten","am gefährlichsten"], src:"Der Superlativ, Übung 1 n° 7", why:"devant le nom Sportart (die Sportart) : die + …ste. Liste : gefährlich → am gefährlichsten → die gefährlichste (n'oublie pas le l de -lich)." },
    { s:"Welcher Schüler springt ___?", h:"hoch", acc:["am höchsten"], o:["am höchsten","am hochsten","der höchste","höher"], src:"Der Superlativ, Übung 1 n° 8", why:"après le verbe springt : am höchsten, avec ö (liste des adjectifs)." },
    { s:"Welcher Schüler hat ___ Kunst?", h:"gern", acc:["am liebsten"], o:["am liebsten","am gernsten","lieber","der liebste"], src:"Der Superlativ, Übung 1 n° 9", why:"gern est une exception : am liebsten." },
    { s:"Beckham ist ___ Fussballspieler.", h:"alt", acc:["der älteste"], o:["der älteste","der alteste","der ältesten","am ältesten"], src:"Der Superlativ, Übung 1 n° 10", why:"devant le nom Fussballspieler : der + …ste. Liste : alt – älter – am ältesten → der älteste, avec ä." },
  ]},
  { key:"korr", gen:"phrase", title:"Korrekturen : 16 phrases", emoji:"✅", unit:"phrases", src:"Korrekturen", items:[
    { s:"Seine Jacke ist ___ als meine Jacke.", h:"schön", acc:["schöner"], o:["schöner","schoner","schönster","am schönsten"], src:"Korrekturen n° 1" },
    { s:"Roger Federer ist einfach ___.", h:"gut", a:"der Beste / am besten", acc:["der Beste","am besten"], o:["der Beste","besser","der Guteste","am guten"], src:"Korrekturen n° 2" },
    { s:"Laura läuft ___ als ich.", h:"schnell", acc:["schneller"], o:["schneller","am schnellsten","schnellste","so schnell"], src:"Korrekturen n° 3" },
    { s:"Ist Karate ___ als Judo?", h:"gefährlich", acc:["gefährlicher"], o:["gefährlicher","gefährlichste","gefährlich","gefährlichster"], src:"Korrekturen n° 4" },
    { s:"Mein Bruder ist ___ als ich.", h:"alt", acc:["älter"], o:["älter","alter","älteste","am ältesten"], src:"Korrekturen n° 5" },
    { s:"Meine Schwester ist ___ als deine Schwester.", h:"jung", acc:["jünger"], o:["jünger","junger","jüngste","am jüngsten"], src:"Korrekturen n° 6" },
    { s:"Carla tanzt ___ als ihre Freundin.", h:"gut", acc:["besser"], o:["besser","guter","am besten","mehr gut"], src:"Korrekturen n° 7" },
    { s:"In der Klasse macht Yann immer gute Noten. Er ist ___.", h:"gut", a:"der Beste / am besten", acc:["der Beste","am besten"], o:["der Beste","der Guteste","besser","am guten"], src:"Korrekturen n° 8" },
    { s:"Usain Bolt hat die Goldmedaille gewonnen. Er ist ___.", h:"schnell", a:"der Schnellste / am schnellsten", acc:["der Schnellste","am schnellsten"], o:["der Schnellste","schneller","der Schneller","am schnellste"], src:"Korrekturen n° 9" },
    { s:"Mein Grossvater ist ___ in unserer Familie.", h:"alt", a:"der Älteste / am äletesten", acc:["der Älteste","am äletesten","am ältesten"], o:["der Älteste","der Alteste","älter","der Ältesten"], src:"Korrekturen n° 10", note:"la feuille écrit « am äletesten » ; la liste des adjectifs écrit « am ältesten » : les deux sont acceptés." },
    { s:"Ich trage am ___ eine Jeans und ein Sweatshirt.", h:"gern", acc:["liebsten"], o:["liebsten","gernsten","lieber","liebste"], src:"Korrekturen n° 11" },
    { s:"Ich habe die ___ Grossmutter.", h:"lieb", acc:["liebste"], o:["liebste","liebsten","lieber","am liebsten"], src:"Korrekturen n° 12" },
    { s:"Fussball ist ___ als Volleyball aber Boxen ist am brutalsten.", h:"brutal", acc:["brutaler"], o:["brutaler","brutalster","brutal","am brutalsten"], src:"Korrekturen n° 13" },
    { s:"Fussball ist brutaler als Volleyball aber Boxen ist am ___.", h:"brutal", acc:["brutalsten"], o:["brutalsten","brutaler","brutalste","brutalesten"], src:"Korrekturen n° 13" },
    { s:"Der Sommer ist ___ als der Frühling.", h:"warm", acc:["wärmer"], o:["wärmer","warmer","wärmste","am wärmsten"], src:"Korrekturen n° 14" },
    { s:"Reiten macht ___ Spass als Tennis spielen.", h:"viel", acc:["mehr"], o:["mehr","vieler","am meisten","meiste"], src:"Korrekturen n° 15" },
    { s:"Chasseral ist ___ als Chaumont.", h:"hoch", acc:["höher"], o:["höher","hocher","höchste","am höchsten"], src:"Korrekturen n° 16" },
  ]},
  { key:"regles", gen:"regle", title:"Les règles", emoji:"📐", unit:"règles", src:"Récapitulatif, Der Komparativ, Der Superlativ", items:[
    { q:"Avec le comparatif, on compare…", o:["deux choses ou deux personnes","une chose avec toutes les autres","seulement des personnes"], expl:"Avec le comparatif, on compare deux choses ou deux personnes.", src:"Der Komparativ" },
    { q:"Comment se forme le comparatif de supériorité (plus … que) ?", o:["adj + -er + als","so + adj + wie","am + adj + -sten"], expl:"Le comparatif de supériorité se forme avec adj + -er als : Ein Zug ist schneller als ein Fahrrad.", src:"Récapitulatif, A" },
    { q:"Comment se forme le comparatif d'égalité (aussi … que) ?", o:["so + adj + wie","adj + -er + als","nicht so + adj + wie"], expl:"Le comparatif d'égalité se forme avec so … wie (ou genauso … wie) : Peter ist so klein wie Paul.", src:"Récapitulatif, B" },
    { q:"Comment se forme le comparatif d'infériorité (pas aussi … que) ?", o:["nicht so + adj + wie","nicht + adj + -er + als","so + adj + als"], expl:"Le comparatif d'infériorité se forme avec nicht so … wie : Tanias Auto ist nicht so neu wie Jans Auto.", src:"Récapitulatif, C" },
    { q:"Un adjectif d'une syllabe en a, o, u (alt, gross, jung) fait son comparatif avec…", o:["Umlaut + -er","-er sans Umlaut","mehr devant l'adjectif"], expl:"Adjectifs avec une syllabe en « a, o, u » → adjectif + Umlaut + « er » : stark → stärker, jung → jünger, hoch → höher, gross → grösser.", src:"Der Komparativ, A" },
    { q:"« Er rennt am schnellsten. » : c'est le superlatif…", o:["de l'adverbe","de l'adjectif","du nom"], expl:"Er rennt am schnellsten. (= adverbe) : am … -sten, après un verbe.", src:"Der Superlativ" },
    { q:"« Er ist der schnellste Läufer. » : c'est le superlatif…", o:["de l'adjectif","de l'adverbe","du nom"], expl:"Er ist der schnellste Läufer. (= adjectif) : der/die/das … -ste devant un nom.", src:"Der Superlativ" },
    { q:"« Er ist der Schnellste. » : c'est le superlatif…", o:["du nom","de l'adjectif","de l'adverbe"], expl:"Er ist der Schnellste. (= nom) : le superlatif s'écrit avec une majuscule.", src:"Der Superlativ" },
  ]},
  { key:"wort", gen:"wort", title:"Wortschatz p. 15", emoji:"📗", unit:"entrées", src:"Wortschatz p. 15", items:[
    { de:"viel – mehr – am meisten", alt:["viel mehr am meisten"], fr:["beaucoup – plus – le plus"] },
    { de:"gern – lieber – am liebsten", alt:["gern lieber am liebsten"], fr:["volontiers – plutôt – aimer le plus…, préférer…"] },
    { de:"so … wie", alt:["so wie"], fr:["aussi que"] },
    { de:"als", fr:["que"] },
    { de:"der Weltrekord", art:"der", pl:"die Weltrekorde", plo:["die Weltrekorde","die Weltrekords","die Weltrekorden","die Weltrekörde"], fr:["le record du monde"] },
    { de:"der Sieg", art:"der", pl:"die Siege", plo:["die Siege","die Sieger","die Siegen","die Siegs"], fr:["la victoire"] },
    { de:"das Rennen", art:"das", pl:"die Rennen", plo:["die Rennen","die Rennens","die Rennenen","die Renner"], fr:["la course"] },
    { s:"Carola macht ___ Sport.", h:"viel · le plus", acc:["am meisten"], o:["am meisten","am vielsten","mehr","die meisten"], src:"Wortschatz p. 15, viel – mehr – am meisten" },
    { s:"Ich spiele ___ Tennis als Basketball.", h:"gern · préférer", acc:["lieber"], o:["lieber","gerner","am liebsten","mehr gern"], src:"Wortschatz p. 15, gern – lieber – am liebsten" },
    { s:"Pia ist ___ Tom.", h:"gross · aussi … que", acc:["so gross wie"], o:["so gross wie","so gross als","grösser wie","so grösser wie"], src:"Wortschatz p. 15, so … wie" },
    { s:"Tina ist ___ Tom.", h:"gross · plus … que", acc:["grösser als"], o:["grösser als","grosser als","grösser wie","so gross als"], src:"Wortschatz p. 15, als" },
  ]},
];

/* ---------- fiche ---------- */
const FICHE = [
  { icon:"⚖️", titre:"Le comparatif : plus, autant, pas autant", pairs:[
    ["Supériorité (plus … que) : adj + -er als","Ein Zug ist schneller als ein Fahrrad. · Mein Vater ist älter als meine Mutter. · Ich trinke lieber Tee als Kaffee."],
    ["Égalité (aussi … que) : so … wie (genauso … wie)","Peter ist so klein wie Paul. · Ich bin so alt wie du. · Calimero ist genauso lustig wie Superman."],
    ["Infériorité (pas aussi … que) : nicht so … wie","Tanias Auto ist nicht so neu wie Jans Auto. · Meine Haare sind nicht so schön wie deine."]],
    astuce:"Le piège : -er va avec als, et so … wie va ensemble. Jamais « schneller wie » ni « so schnell als ». Ta feuille d'objectifs marque l'égalité et l'infériorité N2 : tu es en 10N2, elles sont pour toi." },
  { icon:"⭐", titre:"Umlaut et exceptions à savoir", count:13, html:() => DECKS.find(d => d.key === "exc").items.map(it => `<div class="pair"><span class="pair-de">${esc(it.de)} &gt; ${esc(it.komp)}</span></div>`).join(""),
    astuce:"Une syllabe avec a, o ou u → Umlaut + -er : stark → stärker, jung → jünger, hoch → höher, gross → grösser. dunkel et teuer perdent un e : dunkler, teurer. gut, viel, gern changent complètement : besser, mehr, lieber. Ta feuille met « important » à côté de cette liste." },
  { icon:"🥇", titre:"Le superlatif : adjectif, adverbe, nom", pairs:[
    ["Superlatif de l'adjectif (devant un nom)","Er ist der schnellste Läufer. · Sie ist die schnellste Läuferin."],
    ["Superlatif du nom (majuscule)","Er ist der Schnellste. · Sie ist die Schnellste."],
    ["Superlatif de l'adverbe (après un verbe) : am … -sten","Er rennt am schnellsten. · Sie spielt am besten. · Du springst am weitesten."]],
    astuce:"Demande-toi : y a-t-il un nom juste après ? → der/die/das …ste (der schnellste Läufer). Rien après, mais on parle d'une personne ? → der Schnellste. Ça dit comment on fait l'action ? → am …sten." },
  { icon:"⚠️", titre:"Exceptions du superlatif", pairs:[
    ["gut","der, die, das beste… / Beste / am besten"],
    ["viel","der, die, das meiste… / Meiste / am meisten"],
    ["gern","der, die, das liebste… / Liebste / am liebsten"],
    ["gross","der, die, das grösste… / Grösste / am grössten"],
    ["teuer","der, die, das teuerste… / Teuerste / am teuersten"]] },
  { icon:"📋", titre:"La liste des adjectifs (à savoir pour le TO)", count:25, html:() => DECKS.find(d => d.key === "adj").items.map(it => `<div class="steps${it.irr?" irr":""}"><span class="s1">${esc(it.de)}</span><span class="s2">${esc(it.komp)}</span><span class="s3">${esc(it.sup)}</span><span class="fr">${esc(it.fr[0])}${it.extra?" · en plus":""}${it.n2?" · N2":""}</span></div>`).join(""),
    astuce:"Un trait doré à gauche = une ligne en gras sur ta feuille (teuer, hoch, weit, gut, viel, gern). klein et gross sont les deux adjectifs en plus, anstrengen la ligne N2. Les formes sont recopiées comme sur ta feuille : elle écrit « am grössen » (la feuille Superlativ écrit « am grössten ») et « anstrengen »." },
  { icon:"📗", titre:"Wortschatz p. 15", pairs:[
    ["viel – mehr – am meisten","beaucoup – plus – le plus · Carola macht am meisten Sport."],
    ["gern – lieber – am liebsten","volontiers – plutôt – aimer le plus…, préférer… · Ich spiele lieber Tennis als Basketball."],
    ["so … wie","aussi que · Pia ist so gross wie Tom."],
    ["als","que · Tina ist grösser als Tom."],
    ["der Weltrekord, -e","le record du monde"],
    ["der Sieg, -e","la victoire"],
    ["das Rennen, -","la course"]],
    astuce:"Lerntipp de ta page : la plupart des adjectifs fonctionnent comme « schnell » (schnell – schneller – am schnellsten)." },
  { icon:"🎯", titre:"Mes réflexes pour mardi", tips:[
    "L'Umlaut compte : älter, jünger, stärker, höher, grösser. Dans cet outil, « alter » au lieu de « älter » est faux, comme au test.",
    "Recopie bien la forme de la liste avant d'ajouter -ste : klein → der kleinste (avec le n), gefährlich → die gefährlichste (avec le l), hoch → das höchste (avec ö).",
    "Avec un nom, accorde der / die / das : der älteste Fussballspieler, die beste Note, das höchste Haus.",
    "-er + als, so … wie, nicht so … wie : récite les trois phrases « Er läuft … meine Freundin » de ta feuille d'objectifs."] },
  { icon:"🚫", titre:"Ce que cet outil ne couvre pas", tips:[
    "Les nombres ordinaux (der erste, am ersten Januar), les W-Fragen (wann, wie oft, wo, warum, mit wem) et les phrases avec « weil » sont sur ta feuille d'objectifs, mais pas dans cet outil : tu as dit à ton papa que tu n'avais pas besoin de les réviser."] },
];

/* ---------- types de questions propres à cet outil ---------- */
/* KINDS (types de questions), ordre, étiquettes, et dans GENS les fonctions label / cards / kinds / fill / face.
   La couche Langues fournit le reste (buildTest, correction, correction en direct, cartes, trois anneaux). */
const KINDS = {
  mcq_regle: { type:"mcq",  tag:"regle",      aspect:"regle",  consigne:"Choisis la bonne réponse." },
  mcq_sens:  { type:"mcq",  tag:"sens",       aspect:"sens",   consigne:"Choisis la traduction en français." },
  type_sens: { type:"type", tag:"sens",       aspect:"sens",   consigne:"Écris l'adjectif en allemand." },
  mcq_mot:   { type:"mcq",  tag:"allemand",   aspect:"sens",   consigne:"Choisis la traduction en français." },
  type_mot:  { type:"type", tag:"allemand",   aspect:"sens",   consigne:"Écris en allemand." },
  mcq_komp:  { type:"mcq",  tag:"komparativ", aspect:"komp",   consigne:"Choisis le comparatif." },
  type_komp: { type:"type", tag:"komparativ", aspect:"komp",   consigne:"Écris le comparatif (Komparativ)." },
  mcq_sup:   { type:"mcq",  tag:"superlativ", aspect:"sup",    consigne:"Choisis le superlatif avec « am »." },
  type_sup:  { type:"type", tag:"superlativ", aspect:"sup",    consigne:"Écris le superlatif avec « am » (Superlativ)." },
  mcq_phrase:{ type:"mcq",  tag:"phrase",     aspect:"phrase", consigne:"Complète la phrase." },
  type_phrase:{ type:"type", tag:"phrase",    aspect:"phrase", consigne:"Complète la phrase (écris ce qui manque)." },
  mcq_art:   { type:"mcq",  tag:"article",    aspect:"art",    consigne:"Choisis l'article : der, die ou das." },
  mcq_pl:    { type:"mcq",  tag:"pluriel",    aspect:"pl",     consigne:"Choisis le pluriel." },
  type_pl:   { type:"type", tag:"pluriel",    aspect:"pl",     consigne:"Écris le pluriel, avec l'article." },
};
/* ordre des exercices dans un test : règles, sens, comparatif, superlatif, phrases, article, pluriel ; à choix avant écrit */
const KIND_ORDER = ["mcq_regle","mcq_sens","type_sens","mcq_mot","type_mot","mcq_komp","type_komp","mcq_sup","type_sup","mcq_phrase","type_phrase","mcq_art","mcq_pl","type_pl"];
const TAG_LABEL = { sens:"sens de l'adjectif", allemand:"vocabulaire", komparativ:"comparatif", superlativ:"superlatif", phrase:"phrase à compléter", regle:"règle", article:"der / die / das", pluriel:"pluriel" };

/* utilitaires du contenu */
const unUml = s => s.replace(/ä/g,"a").replace(/ö/g,"o").replace(/ü/g,"u");
/* 4 choix : la bonne réponse, puis les distracteurs proposés, complétés par le réservoir du paquet (sans doublon) */
function fillOpts(good, cands, pool, n = 4){
  const out = [good], seen = new Set([norm(good)]);
  const add = v => { if (out.length >= n || !v) return; const k = norm(v); if (seen.has(k)) return; seen.add(k); out.push(v); };
  cands.forEach(add); shuffle(pool).forEach(add);
  return shuffle(out);
}
/* énoncé stable d'un item (identité des cartes, inchangée depuis la v1 : l'historique de Livio reste lisible) */
const itemLabel = it => it.s ? it.s + (it.h ? " (" + it.h + ")" : "") : it.q || it.de;
const choix = (diff, m, t) => diff === "easy" ? m : diff === "hard" ? t : (Math.random() < 0.5 ? m : t);
const ALL = [0,1,2];
/* fin de remplissage commune : allemand, indice entre parenthèses dans l'énoncé gardé, libellé court avec l'indice */
function finir(q){
  q.lang = "de";
  q.prompt = `${q.consigne} « ${q.word} »${q.hint ? " (" + q.hint + ")" : ""}`;
  q.label = q.word + (q.hint ? " (" + q.hint + ")" : "");
}
const face = (tag, front, frontMini, back, mini) => ({ tagF:TAG_LABEL[tag], front, frontMini, tagB:"Réponse", backHtml:`<span class="face-word">${esc(back)}</span><span class="face-mini">${esc(mini)}</span>` });

/* GENS : un générateur par valeur de `gen` dans DECKS.
   label(d,it)        → énoncé de l'item (identité des cartes)
   cards(d,it)        → les cartes d'un item : { aspect, mcqOnly, levels }
   kinds(d,it,diff)   → les types de questions à poser pour cet item au niveau diff (easy / normal / hard)
   fill(q,kind,it,d,pool) → remplit q.word, q.options ou q.accept, q.answer, q.expl, q.hint, q.keep (+ lang, prompt, label via finir)
   pool(d)            → réservoir de distracteurs du paquet (facultatif)
   face(d,it)         → les faces des cartes à retourner (une par aspect) */
const GENS = {
  /* règle : toujours à choix */
  regle:{
    label: (d, it) => itemLabel(it),
    cards: () => [{ aspect:"regle", mcqOnly:true, levels:ALL }],
    kinds: () => ["mcq_regle"],
    fill: (q, kind, it, d) => { q.word = it.q; q.options = shuffle(it.o.slice()); q.answer = it.o[0]; q.expl = it.expl + " — " + (it.src || d.src); finir(q); },
    face: (d, it) => [face("regle", it.q, "", it.o[0], it.expl + " — " + (it.src || d.src))],
  },
  /* phrase à compléter : à choix (o) ou écrite (acc) */
  phrase:{
    label: (d, it) => itemLabel(it),
    cards: () => [{ aspect:"phrase", mcqOnly:false, levels:ALL }],
    kinds: (d, it, diff) => [choix(diff, "mcq_phrase", "type_phrase")],
    fill: (q, kind, it, d) => {
      q.word = it.s; q.hint = it.h || ""; q.expl = GENS.phrase.expl(it, d); q.keep = true;
      if (kind === "mcq_phrase"){ q.options = shuffle(it.o.slice()); q.answer = it.o[0]; }
      else { q.accept = it.acc.slice(); q.answer = it.a || it.acc[0]; }
      finir(q);
    },
    expl: (it, d) => {
      const ans = it.a || it.acc[0], src = it.src || d.src;
      const why = it.why ? " " + it.why[0].toUpperCase() + it.why.slice(1) : "";
      const note = it.note ? " Note : " + it.note : "";
      const full = it.s.replace("___", ans.includes(" / ") ? "[" + ans + "]" : ans);
      return `${full}${why}${note} — ${src}`;
    },
    face: (d, it) => [face("phrase", it.s, it.h || "", it.a || it.acc[0], GENS.phrase.expl(it, d))],
  },
  /* ligne de la liste des adjectifs : sens, comparatif, superlatif */
  adjectif:{
    label: (d, it) => itemLabel(it),
    cards: () => [{ aspect:"sens", mcqOnly:false, levels:ALL }, { aspect:"komp", mcqOnly:false, levels:ALL }, { aspect:"sup", mcqOnly:false, levels:ALL }],
    kinds: (d, it, diff) => [choix(diff, "mcq_sens", "type_sens"), choix(diff, "mcq_komp", "type_komp"), choix(diff, "mcq_sup", "type_sup")],
    base: it => `${it.de} – ${it.komp} – ${it.sup} = ${it.fr[0]}`,
    tail: it => (it.extra ? " (adjectif en plus, pas dans le voc)" : "") + (it.n2 ? " (ligne N2)" : "") + " — " + L + ".",
    fill: (q, kind, it, d) => {
      const G = GENS.adjectif, others = d.items, base = G.base(it), tail = G.tail(it);
      q.keep = true;
      switch(kind){
        case "mcq_sens":  q.word = it.de; q.options = fillOpts(it.fr[0], [], others.map(x => x.fr[0])); q.answer = it.fr[0]; q.expl = base + tail; break;
        case "type_sens": q.word = it.fr[0]; q.accept = [it.de]; q.answer = it.de; q.expl = base + tail; break;
        case "mcq_komp":  q.word = it.de; q.hint = it.fr[0]; q.options = fillOpts(it.komp, [it.de + "er", unUml(it.komp), it.sup, "mehr " + it.de], others.map(x => x.komp)); q.answer = it.komp; q.expl = base + (it.kNote ? " (" + it.kNote + ")" : "") + tail; break;
        case "type_komp": q.word = it.de; q.hint = it.fr[0]; q.accept = [it.komp, ...(it.kAlt || [])]; q.answer = it.komp; q.expl = base + (it.kNote ? " (" + it.kNote + ")" : "") + tail; break;
        case "mcq_sup":   q.word = it.de; q.hint = it.fr[0]; q.options = fillOpts(it.sup, ["am " + it.de + "sten", "am " + it.de + "esten", unUml(it.sup), it.komp], others.map(x => x.sup)); q.answer = it.sup; q.expl = base + (it.sNote ? " (" + it.sNote + ")" : "") + tail; break;
        case "type_sup":  q.word = it.de; q.hint = it.fr[0]; q.accept = [it.sup, ...(it.sAlt || [])]; q.answer = it.sup; q.expl = base + (it.sNote ? " (" + it.sNote + ")" : "") + tail; break;
      }
      finir(q);
    },
    face: (d, it) => { const G = GENS.adjectif, base = G.base(it), tail = G.tail(it); return [
      face("sens", it.de, "", it.fr[0], base + tail),
      face("komparativ", it.de, it.fr[0], it.komp, base + (it.kNote ? " (" + it.kNote + ")" : "") + tail),
      face("superlativ", it.de, it.fr[0], it.sup, base + (it.sNote ? " (" + it.sNote + ")" : "") + tail),
    ]; },
  },
  /* exception du Récapitulatif : le comparatif seulement */
  exception:{
    label: (d, it) => itemLabel(it),
    cards: () => [{ aspect:"komp", mcqOnly:false, levels:ALL }],
    kinds: (d, it, diff) => [choix(diff, "mcq_komp", "type_komp")],
    expl: (it, d) => `${it.de} > ${it.komp}${it.kNote ? " (" + it.kNote + ")" : ""} — ${it.src || d.src}.`,
    fill: (q, kind, it, d) => {
      q.word = it.de; q.answer = it.komp; q.expl = GENS.exception.expl(it, d); q.keep = true;
      if (kind === "mcq_komp") q.options = fillOpts(it.komp, it.wrong, d.items.map(x => x.komp));
      else q.accept = [it.komp, ...(it.kAlt || [])];
      finir(q);
    },
    face: (d, it) => [face("komparativ", it.de, "", it.komp, GENS.exception.expl(it, d))],
  },
  /* mot du Wortschatz : sens ; article et pluriel pour les noms */
  mot:{
    label: (d, it) => itemLabel(it),
    cards: (d, it) => { const out = [{ aspect:"sens", mcqOnly:false, levels:ALL }]; if (it.art) out.push({ aspect:"art", mcqOnly:true, levels:ALL }); if (it.pl) out.push({ aspect:"pl", mcqOnly:false, levels:ALL }); return out; },
    kinds: (d, it, diff) => { const out = [choix(diff, "mcq_mot", "type_mot")]; if (it.art) out.push("mcq_art"); if (it.pl) out.push(choix(diff, "mcq_pl", "type_pl")); return out; },
    base: (it, d) => `${it.de}${it.pl ? " (pluriel : " + it.pl + ")" : ""} = ${it.fr[0]} — ${it.src || d.src}.`,
    fill: (q, kind, it, d) => {
      const base = GENS.mot.base(it, d), voc = d.items.filter(x => x.de && !x.komp);
      q.expl = base; q.keep = true;
      switch(kind){
        case "mcq_mot":  q.word = it.de; q.options = fillOpts(it.fr[0], [], voc.map(x => x.fr[0])); q.answer = it.fr[0]; break;
        case "type_mot": q.word = it.fr[0]; q.accept = [it.de, ...(it.alt || [])]; q.answer = it.de; q.keep = !!it.art; if (it.art) q.consigne = "Écris en allemand, avec l'article."; break;
        case "mcq_art":  q.word = stripDe(it.de); q.hint = it.fr[0]; q.options = ["der","die","das"]; q.answer = it.art; break;
        case "mcq_pl":   q.word = it.de; q.hint = it.fr[0]; q.options = shuffle(it.plo.slice()); q.answer = it.pl; break;
        case "type_pl":  q.word = it.de; q.hint = it.fr[0]; q.accept = [it.pl]; q.answer = it.pl; break;
      }
      finir(q);
    },
    face: (d, it) => { const base = GENS.mot.base(it, d), out = [face("allemand", it.de, "", it.fr[0], base)];
      if (it.art) out.push(face("article", stripDe(it.de), it.fr[0], it.art, base));
      if (it.pl) out.push(face("pluriel", it.de, it.fr[0], it.pl, base));
      return out; },
  },
};
/* le paquet Wortschatz mélange des mots et des phrases à compléter : on aiguille selon l'item */
const wortGen = it => it.s ? GENS.phrase : GENS.mot;
GENS.wort = {
  label: (d, it) => itemLabel(it),
  cards: (d, it) => wortGen(it).cards(d, it),
  kinds: (d, it, diff) => wortGen(it).kinds(d, it, diff),
  fill: (q, kind, it, d, pool) => wortGen(it).fill(q, kind, it, d, pool),
  face: (d, it) => wortGen(it).face(d, it),
};

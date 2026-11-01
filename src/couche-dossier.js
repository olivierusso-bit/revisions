/* ============================================================
   COUCHE DOSSIER — géographie, histoire, sciences
   (prompt-artefact-revision.md § 11.8). Assemblée entre le contenu et le noyau.
   Versions : 1 (01.11.2026, C4, née de l'outil d'histoire « L'Europe à la rencontre du monde » v10)
   · 2 (01.11.2026, contrôle qualité : le contenu peut fournir COUCHE_CONTENU, ajouté à COUCHE ; sans lui, rien ne change)
   · 3 (01.11.2026, contrôle qualité : papierSource, la source de chaque question est imprimée sous la question sur la version papier).

   Ce que la couche attend du CONTENU (les mêmes constantes que l'outil d'origine, que lit aussi export-dossier.py) :
     CHAPTERS[] { key, titre, sous, objLabel? } · PAGES[] { id, ch, titre, court, obj, pre?, blocks[], blank? } (id = code du chapitre)
     LEXIQUE[] · VIDEOS { id: lien MP4 / id YouTube / null } · AUDIOS { id: [mp3…] } · CAPSULES { controle, consigne, diffusion, chapitres[] }
     SVGS { k: fonction(palette) } · P_PAGE (palette du thème) · SUBJECT_LONG
     DECKS[] { key, code (= id de la page du chapitre), title, src, items[] }
     item : { front (une vraie question), back[] (1re = affichée), opts? + keepOrder?, wrong[]?, grp?, mcqOnly?, ans/expl, src? }
   Ce que la couche fournit au NOYAU (contrat COUCHE) :
     rings 1 (un anneau par chapitre ; une carte est acquise quand la dernière réponse juste est écrite, ou à choix pour une
     carte mcqOnly, et qu'une réponse juste précède un autre jour : acquisAvantLibre) ; hasLive false ;
     allCards (sans les cartes « hors test » de la revue), buildTest, isRight, cardFace, liveCands, wrote, carteDe ;
     vueFiche (le Dossier : sommaire, pages, capsules, lexique, sources), vueCartes (cartes et revue des cartes pour les parents),
     etat, charger (revue et vidéos vues), action, surNav, onChange, onInput, sousQuestion (« 📖 Où vérifier » sous l'énoncé).
   Clés de stockage, identités de cartes (paquet|recto), revue et vidéos vues : celles de l'outil d'origine, rien n'est perdu.
   ============================================================ */

if (typeof TAG_LABEL === "undefined") var TAG_LABEL = Object.fromEntries(DECKS.map(d => [d.key, d.title]));
if (typeof FICHE === "undefined") var FICHE = [];
DECKS.forEach(d => { d.unit = d.unit || "questions"; });

const D_ITEM = {}; DECKS.forEach(d => d.items.forEach(it => { D_ITEM[d.key + "|" + it.front] = { it, d }; }));
const dCardKey = (d, it) => d.key + "|" + it.front;
const dDecksOf = code => DECKS.filter(d => d.code === code);

/* ---------- revue des cartes (pour les parents) : gardée hors de S, lue par allCards dès le chargement ---------- */
const REVIEW_ID = QUIZ_ID + "-revue-cartes";
const RV = { data:{} };
function cardId(d, it){ let h = 5381; for (const c of it.front) h = ((h << 5) + h + c.charCodeAt(0)) | 0; return d.key + "-" + (h >>> 0).toString(36); }
const rvOf = (d, it) => RV.data[cardId(d, it)] || {};
const rvMarked = r => !!(r && (r.revoir || r.exclu || (r.note && r.note.trim())));
let rvTimer = null;
function saveReview(){
  refreshCards();
  clearTimeout(rvTimer);
  rvTimer = setTimeout(async () => {
    try { await store.setDoc(REVIEW_ID, RV.data); S.rvMsg = store.mode === "memory" ? "Revue gardée seulement tant que la page reste ouverte : pense à la copier pour le chat." : ""; }
    catch(e){ S.rvMsg = "La revue n'a pas pu être enregistrée. Copie-la pour le chat avant de fermer la page."; }
    const m = document.getElementById("rv-msg"); if (m) m.textContent = S.rvMsg;
  }, 400);
}
function reviewCounts(){
  let revoir = 0, exclu = 0, notes = 0;
  DECKS.forEach(d => d.items.forEach(it => { const r = rvOf(d, it); if (r.revoir) revoir++; if (r.exclu) exclu++; if (r.note && r.note.trim()) notes++; }));
  return { revoir, exclu, notes };
}
function reviewText(){
  const l = ["REVUE DES CARTES — " + SUBJECT_LONG + " (outil version " + VERSION.n + ")"], c = reviewCounts();
  l.push(`${c.revoir} à revoir · ${c.exclu} hors test · ${c.notes} remarque(s)`, "");
  DECKS.forEach(d => d.items.forEach((it, i) => { const r = rvOf(d, it); if (!rvMarked(r)) return;
    const tags = [r.revoir ? "À REVOIR" : "", r.exclu ? "HORS TEST" : ""].filter(Boolean).join(" + ") || "remarque";
    l.push(`- ${d.code} · ${d.title} · carte ${i+1} [${tags}]`, `  Q : ${it.front}`, `  R : ${it.back[0]}`);
    if (r.note && r.note.trim()) l.push(`  Remarque : ${r.note.trim()}`);
  }));
  if (!c.revoir && !c.exclu && !c.notes) l.push("Aucune carte marquée.");
  return l.join("\n");
}

/* ---------- correction (celle de l'outil d'origine : œ = oe, ³ = 3, article français facultatif) ---------- */
function dNorm(s, apoMode){
  return String(s || "").toLowerCase().replace(/ß/g,"ss").replace(/œ/g,"oe").replace(/³/g,"3").normalize("NFD").replace(/[̀-ͯ]/g,"")
    .replace(/…|\.\.\./g," ").replace(/[’'`]/g, apoMode === "del" ? "" : " ")
    .replace(/[.!?;,:«»"()\/\-+×]/g," ").replace(/\s+/g," ").trim();
}
function dMatch(input, accept){
  return ["sp","del"].some(m => {
    const a = dNorm(input, m); if (!a) return false;
    return accept.some(raw => { const b = dNorm(raw, m); return a === b || stripFr(a) === stripFr(b); });
  });
}

/* ---------- fabrication du test : un exercice par paquet et par type (choix, puis écrit), numérotation unique ---------- */
const D_KINDS = { mcq:{ type:"mcq", consigne:"Choisis la bonne réponse." }, type:{ type:"type", consigne:"Écris la réponse." } };
function dExplain(it, deck){ return (it.expl || it.ans || (it.front + " → " + it.back[0])) + " — " + (it.src || deck.src) + "."; }
function dOptions(it, deck){
  const good = it.back[0];
  if (it.opts) return it.keepOrder ? [...it.opts] : shuffle(it.opts);
  if (it.wrong) return shuffle([good, ...it.wrong]);
  const pool = deck.items.filter(x => x !== it && (x.grp || "") === (it.grp || "") && !x.opts && !x.wrong);
  const out = [], seen = new Set([dNorm(good)]);
  shuffle(pool).forEach(x => { if (out.length >= 3) return; const v = x.back[0]; if (!seen.has(dNorm(v))){ seen.add(dNorm(v)); out.push(v); } });
  return shuffle([good, ...out]);
}
function dKind(it, difficulty){
  if (it.mcqOnly || difficulty === "easy") return "mcq";
  if (difficulty === "hard") return "type";
  return Math.random() < 0.5 ? "mcq" : "type";
}

/* ---------- vidéos et audio (capsules) ---------- */
const capOf = id => CAPSULES.chapitres.flatMap(c => c.capsules).find(x => x.id === id);
const CAPS_ORDER = CAPSULES.chapitres.flatMap(c => c.capsules.map(x => x.id));
const capsSeen = () => CAPS_ORDER.filter(id => S.vidSeen[id]).length;
const videoUrl = id => VIDEOS[id] || null;
const VIDS_ID = QUIZ_ID + "-videos-vues";
const audParts = id => (AUDIOS[id] || []);
function capDur(id){ const c = capOf(id); return c && c.duree ? " (" + c.duree + ")" : ""; }
function nextAfter(id){ const i = PAGES.findIndex(p => p.id === id); return PAGES[i+1] ? PAGES[i+1].id : null; }
function vidDonePanel(id, where){
  const decks = dDecksOf(id);
  if (where === "caps"){
    const i = CAPS_ORDER.indexOf(id), nx = CAPS_ORDER[i+1];
    const nxTxt = nx ? (nx === "LIENS" ? "le fil rouge" : nx) : null;
    return `<div class="vdone"><p class="vdone-t">✓ Capsule vue</p>
      ${nx && VIDEOS[nx] ? `<button class="cta" data-act="vidPlay" data-v="${nx}">▶ Capsule suivante : ${esc(nxTxt)}</button>` : `<p class="fine">Tu as fini la série 👏 Passe aux tests du chapitre ou à l'épreuve blanche.</p>`}
      <div class="row">${decks.length ? `<button class="ghost small" data-act="vidCards" data-v="${id}">Teste-toi : cartes ${esc(id)}</button>` : ""}<button class="ghost small" data-act="page" data-v="${id}">Lire ${id === "LIENS" ? "le fil rouge" : "le chapitre " + esc(id)}</button></div></div>`;
  }
  const nxt = nextAfter(id);
  return `<div class="vdone"><p class="vdone-t">✓ Capsule vue</p>
    ${decks.length ? `<button class="cta" data-act="vidCards" data-v="${id}">Teste-toi maintenant : cartes ${esc(id)}</button>` : nxt ? `<button class="cta" data-act="page" data-v="${nxt}">Commencer le chapitre ${esc(nxt)}</button>` : ""}
    <div class="row"><button class="ghost small" data-act="vidReplay" data-v="${id}">Revoir la capsule</button><button class="ghost small" data-act="vidHide">Lire le chapitre</button></div></div>`;
}
function vidPlayer(id){
  const u = videoUrl(id), cap = capOf(id);
  if (HAS_CLAUDE){
    return `<div class="vplay"><a class="cta vlink" href="${esc(u)}" target="_blank" rel="noopener">▶ Ouvrir la capsule${cap && cap.duree ? " (" + esc(cap.duree) + ")" : ""}</a>
      <p class="fine">Dans Claude, la vidéo s'ouvre dans un nouvel onglet. Quand tu as fini, reviens ici.</p>
      <div class="vbar"><button class="ghost small" data-act="vidFinish" data-v="${id}">✓ J'ai fini la capsule</button><button class="ghost small" data-act="vidHide">Fermer</button></div>${chapTest(id, "play")}</div>`;
  }
  if (/^https?:/.test(u)){
    return `<div class="vplay"><div class="vframe"><video id="vid-el" src="${esc(u)}" controls playsinline autoplay preload="metadata" title="Capsule vidéo ${esc(id)}"></video></div>
      <div class="vbar"><button class="ghost small" data-act="vidFinish" data-v="${id}">✓ J'ai fini la capsule</button><button class="ghost small" data-act="vidHide">Fermer</button></div>${chapTest(id, "play")}
      <p class="fine vfb">La vidéo ne démarre pas ? <a href="${esc(u)}" target="_blank" rel="noopener">L'ouvrir dans un nouvel onglet</a></p></div>`;
  }
  /* identifiant YouTube : lecteur intégré, lu dans la page (§ 11.8 j) */
  return `<div class="vplay"><div class="vframe"><iframe id="vid-frame" src="https://www.youtube-nocookie.com/embed/${esc(u)}?autoplay=1&rel=0&playsinline=1&modestbranding=1&iv_load_policy=3&enablejsapi=1" title="Capsule vidéo ${esc(id)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>
    <div class="vbar"><button class="ghost small" data-act="vidFinish" data-v="${id}">✓ J'ai fini la capsule</button><button class="ghost small" data-act="vidHide">Fermer</button></div>${chapTest(id, "play")}
    <p class="fine vfb">La vidéo ne s'affiche pas ? <a href="https://www.youtube.com/watch?v=${esc(u)}" target="_blank" rel="noopener">L'ouvrir dans YouTube</a></p></div>`;
}
function chapTest(id, where){
  const decks = dDecksOf(id); if (!decks.length) return "";
  const n = decks.reduce((k, d) => k + d.items.filter(it => !rvOf(d, it).exclu).length, 0);
  return `<div class="ctest${where === "end" ? " end" : ""}"><p class="ctest-t">🎯 Teste-toi sur ce chapitre <small>${n} questions · correction après chaque question</small></p>
    <div class="row3">${Object.entries(DIFFICULTIES).map(([k,d]) => `<button class="ctest-b" data-act="chapTest" data-v="${id}|${k}"><span>${d.emoji}</span><b>${d.label}</b></button>`).join("")}</div></div>`;
}
function vidPost(cmd){ const f = document.getElementById("vid-frame"); if (f && f.contentWindow) try { f.contentWindow.postMessage(JSON.stringify(cmd), "*"); } catch(e){} }
function vidListen(){
  const ve = document.getElementById("vid-el");
  if (ve){ ve.addEventListener("ended", () => vidEnded(S.vidOpen)); ve.play && ve.play().catch(() => {}); return; }
  const f = document.getElementById("vid-frame"); if (!f) return;
  const hello = () => { vidPost({ event:"listening", id:"vid", channel:"widget" }); vidPost({ event:"command", func:"addEventListener", args:["onStateChange"], id:"vid", channel:"widget" }); };
  f.addEventListener("load", () => { hello(); setTimeout(hello, 800); });
}
function vidEnded(id){
  if (S.vidOpen !== id) return;
  S.vidOpen = null; S.vidDone = id; S.vidSeen[id] = Date.now(); saveVids(); render();
  const el = document.querySelector(".vdone"); if (el) el.scrollIntoView({ block:"center" });
}
async function saveVids(){ try { await store.setDoc(VIDS_ID, S.vidSeen); } catch(e){} }
document.addEventListener("error", e => { const t = e.target; if (t && t.tagName === "IMG" && t.closest && t.closest(".vthumb")) t.remove(); }, true);
window.addEventListener("message", e => {
  if (!/youtube(-nocookie)?\.com$/.test(String(e.origin).replace(/^https?:\/\/(www\.)?/, "").split(":")[0])) return;
  let d = e.data; if (typeof d === "string"){ try { d = JSON.parse(d); } catch(err){ return; } }
  if (!d || !S.vidOpen) return;
  const st = d.event === "onStateChange" ? d.info : (d.event === "infoDelivery" && d.info && "playerState" in d.info ? d.info.playerState : null);
  if (st === 0) vidEnded(S.vidOpen);
});
/* vidéo et audio côte à côte, sur une même ligne, en tête du chapitre */
function mediaRow(id){
  if (S.vidDone === id) return vidDonePanel(id, "page");
  if (S.vidOpen === id) return vidPlayer(id);
  const v = VIDEOS[id], cap = capOf(id), n = audParts(id).length, aOn = S.audOpen === id;
  const vb = !(id in VIDEOS) ? "" : v
    ? `<button class="mbtn" data-act="vidPlay" data-v="${id}" aria-label="Regarder la capsule vidéo ${esc(id)}"><span class="mbtn-i" aria-hidden="true">▶</span><span class="mbtn-x"><b>Vidéo</b><small>${cap && cap.duree ? esc(cap.duree) : "regarder"}${S.vidSeen[id] ? " · ✓ vue" : ""}</small></span></button>`
    : `<div class="mbtn off"><span class="mbtn-i" aria-hidden="true">▶</span><span class="mbtn-x"><b>Vidéo</b><small>bientôt disponible</small></span></div>`;
  const ab = n ? `<button class="mbtn a${aOn ? " on" : ""}" data-act="${aOn ? "audHide" : "audPlay"}" data-v="${id}" aria-label="Écouter la piste audio ${esc(id)}"><span class="mbtn-i" aria-hidden="true">🎧</span><span class="mbtn-x"><b>Audio</b><small>${n > 1 ? n + " parties" : "écouter"}</small></span></button>` : "";
  if (!vb && !ab) return "";
  return `<div class="media${vb && ab ? "" : " one"}">${vb}${ab}</div>${aOn ? audPlayer(id) : ""}${HAS_CLAUDE && (v || n) ? `<p class="fine">Dans Claude, la vidéo et l'audio s'ouvrent dans un nouvel onglet.</p>` : ""}`;
}
function audHead(id, i, n){ return `🎧 Piste audio ${id === "LIENS" ? "du fil rouge" : esc(id)}${n > 1 ? ` · partie ${i+1} / ${n}` : ""}`; }
function audPlayer(id){
  const parts = audParts(id), n = parts.length, i = Math.min(S.audPart || 0, n - 1);
  const note = `<p class="fine">La piste n'a pas de silence aux pauses : quand la voix te dit de mettre sur pause, arrête-la toi-même et réponds avant de continuer.</p>`;
  if (HAS_CLAUDE) return `<div class="aud"><p class="aud-t">${audHead(id, 0, 1)}</p><div class="aud-links">${parts.map((u, k) => `<a class="ghost small" href="${esc(u)}" target="_blank" rel="noopener">▶ ${n > 1 ? "Partie " + (k+1) : "Écouter"}</a>`).join("")}</div>
    <p class="fine">Dans Claude, la piste s'ouvre dans un nouvel onglet.${n > 1 ? " Écoute les parties dans l'ordre." : ""}</p>${note}<button class="ghost small" data-act="audHide">Fermer</button></div>`;
  return `<div class="aud"><p class="aud-t" id="aud-t">${audHead(id, i, n)}</p><audio id="aud-el" src="${esc(parts[i])}" controls autoplay preload="metadata"></audio>
    ${n > 1 ? `<div class="aud-links">${parts.map((u, k) => `<button class="ghost small${k === i ? " on" : ""}" data-act="audPart" data-v="${id}|${k}">Partie ${k+1}</button>`).join("")}</div><p class="fine">Les parties s'enchaînent toutes seules.</p>` : ""}
    ${note}<div class="row"><button class="ghost small" data-act="audHide">Fermer</button><a class="ghost small aud-ext" id="aud-ext" href="${esc(parts[i])}" target="_blank" rel="noopener">Ouvrir dans un onglet</a></div></div>`;
}
function audListen(){
  const a = document.getElementById("aud-el"); if (!a) return;
  a.addEventListener("ended", () => {
    const id = S.audOpen, parts = audParts(id), k = (S.audPart || 0) + 1;
    if (k >= parts.length) return;
    S.audPart = k; a.src = parts[k]; a.play && a.play().catch(() => {});
    const t = document.getElementById("aud-t"); if (t) t.textContent = audHead(id, k, parts.length);
    const x = document.getElementById("aud-ext"); if (x) x.href = parts[k];
    document.querySelectorAll('[data-act="audPart"]').forEach(b => b.classList.toggle("on", b.dataset.v === id + "|" + k));
  });
  a.play && a.play().catch(() => {});
}

/* ---------- le Dossier (onglet 📖) ---------- */
const pageById = id => PAGES.find(p => p.id === id);
const dBook = () => [...(CAPS_ORDER.length ? ["caps"] : []), ...PAGES.map(p => p.id), "lex", "src"];
function pageTitle(id){ return id === "caps" ? "Les " + CAPS_ORDER.length + " capsules dans l'ordre" : id === "lex" ? "Lexique" : id === "src" ? "D'où viennent les questions" : pageById(id).titre; }
/* pastille d'un chapitre : celle du paquet du chapitre, calculée par le noyau (un anneau) */
function dPastille(code){ const d = dDecksOf(code)[0]; return d ? pastilleDeck(d.key) : ""; }
function dChapStatus(code){ const d = dDecksOf(code)[0]; return d && S.loaded ? `<div class="fiche-paq">${paqStatus(d.key)}</div>` : ""; }
function tocBadges(id){
  return `${VIDEOS[id] ? (S.vidSeen[id] ? ` <span class="toc-v seen">✓ vue${capDur(id)}</span>` : ` <span class="toc-v">▶ vidéo${capDur(id)}</span>`) : ""}${audParts(id).length ? ` <span class="toc-v toc-aud">🎧 audio</span>` : ""}`;
}
function viewToc(){
  let h = draftBanner() + `<p class="intro">Ton cours complet, rangé exactement comme ta feuille d'objectifs : ce que tu dois savoir, ce que tu dois être capable de faire, puis les termes, les personnages et les dates. Lis un chapitre, puis teste-toi avec ses cartes.</p>${globalPastille()}
  <div class="legend"><p><span class="tag book">Livre p. 48</span> définition de ton livre (bulle jaune, glossaire ou lexique), mot pour mot : à savoir par cœur.</p><p><span class="tag dico">Dictionnaire</span> le mot n'est pas dans ton livre : définition du dictionnaire Larousse.</p><p><span class="tag mine">Ton dossier</span> ce qui vient de tes fiches et de tes réponses.</p><p><span class="tag gen">À vérifier</span> explication générale, pas encore dans tes pages : jamais interrogée.</p></div>`;
  if (CAPS_ORDER.length) h += `<button class="caps-cta" data-act="page" data-v="caps"><span class="caps-cta-i" aria-hidden="true">▶</span><span><b>Les ${CAPS_ORDER.length} capsules dans l'ordre</b><small>${capsSeen()} / ${CAPS_ORDER.length} vues · regarde-les à la suite, sans quitter l'outil</small></span></button>`;
  const intro = pageById("LIENS");
  if (intro) h += `<section class="toc-ch"><h2>Avant de commencer <span>Le fil rouge et la frise de l'épreuve</span></h2><button class="toc-item" data-act="page" data-v="LIENS"><span class="code">LIENS</span><span class="toc-t">${esc(intro.titre)}${tocBadges("LIENS")}<span class="toc-s">${esc(intro.court)}</span></span></button></section>`;
  CHAPTERS.forEach(c => {
    h += `<section class="toc-ch"><h2>${c.titre} <span>${esc(c.sous)}</span></h2>` + PAGES.filter(p => p.ch === c.key).map(p =>
      `<button class="toc-item" data-act="page" data-v="${p.id}"><span class="code">${p.id}</span><span class="toc-t">${esc(p.titre)}${tocBadges(p.id)}<span class="toc-s">${esc(p.court)}</span></span>${dPastille(p.id)}</button>`).join("") + `</section>`;
  });
  h += `<section class="toc-ch"><h2>Pour finir</h2>
    <button class="toc-item" data-act="page" data-v="lex"><span class="code">ABC</span><span class="toc-t">Lexique<span class="toc-s">Les ${LEXIQUE.length} mots à connaître, en une ligne chacun</span></span></button>
    <button class="toc-item" data-act="page" data-v="src"><span class="code">SRC</span><span class="toc-t">D'où viennent les questions<span class="toc-s">Les photos qui ont servi et ce qui manque</span></span></button></section>`;
  return h + `<button class="cta" data-act="page" data-v="${intro ? "LIENS" : PAGES[0].id}">Commencer la lecture</button><p class="version">Version ${VERSION.n} · mise à jour le ${VERSION.date}</p>`;
}
function bsrc(b){
  if (!["p","def","html","mine","ex","links","tip","pause","svg"].includes(b.t)) return "";
  const t = b.s || (b.t === "def" && b.gen ? "Pas dans tes photos : à vérifier dans le livre" : b.t === "tip" ? "Conseil de méthode (pas une page du livre)" : b.t === "def" ? "Fiches d'exercices" : "");
  return t ? `<p class="bsrc">📖 ${esc(t)}</p>` : "";
}
function preBlock(p){
  if (!p.pre) return "";
  return `<div class="prebox"><p class="prebox-t">🤔 Avant la capsule : essaie de répondre<small>Même si tu ne sais pas encore. Chercher la réponse t'aide à la retenir quand elle arrive.</small></p>
    <ol>${p.pre.map(x => `<li>${esc(x.q)}</li>`).join("")}</ol>
    <details><summary>Voir les réponses (après la capsule)</summary><ol>${p.pre.map(x => `<li>${esc(x.a)}<span class="bsrc">📖 ${esc(x.s)}</span></li>`).join("")}</ol></details></div>`;
}
function blankBlock(p){
  if (!p.blank) return "";
  const b = p.blank;
  return `<div class="blank"><p class="blank-t">📝 Feuille blanche<small>Ferme le Dossier, écris tout ce dont tu te souviens, puis vérifie.</small></p>
    <p class="blank-c">${esc(b.consigne)}</p>
    <details><summary>Vérifier : les points clés</summary><ul class="blank-l">${b.points.map(x => `<li><label><input type="checkbox"> <span>${esc(x)}</span></label></li>`).join("")}</ul><p class="bsrc">📖 ${esc(b.s)}</p></details></div>`;
}
function blockBody(b){
  switch(b.t){
    case "p": return `<p class="read">${b.h}</p>`;
    case "h3": return `<h3>${b.h}</h3>`;
    case "def": { const cls = b.dico ? "dico" : b.book ? "book" : b.gen ? "gen" : "mine", lab = b.book ? (/^(Livre|Dictionnaire)/.test(b.book) ? b.book : "Livre " + b.book) : b.gen ? "À vérifier" : "Ton dossier";
      return `<div class="def ${cls}"><span class="def-term">${esc(b.term)} <span class="tag ${cls}">${esc(lab)}</span></span><p class="read">${b.h}</p></div>`; }
    case "mine": return `<div class="mywork"><p class="mywork-t">${esc(b.titre)}</p><ul>${b.items.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>`;
    case "html": return b.h;
    case "tip": return `<p class="tip"><b>Pour l'épreuve</b>${b.h}</p>`;
    case "todo": return `<p class="todo">📷 ${b.h}</p>`;
    case "ex": return `<div class="exl"><p class="exl-t">Ce que tes exercices t'ont montré</p>${b.items.map(([c,w,so]) => `<div class="exr"><span class="code">${esc(c)}</span><span><b>${w}</b><span class="so">→ ${so}</span></span></div>`).join("")}</div>`;
    case "links": return `<div class="links">${b.items.map(([ids,t]) => `<div class="lk"><span class="lk-ids">${ids.map((id,i) => (i?`<i>↓</i>`:"") + `<button data-act="page" data-v="${id}">${id}</button>`).join("")}</span><p>${t}</p></div>`).join("")}</div>`;
    case "see": return `<div class="see"><span>Voir aussi :</span>${b.ids.map(id => `<button data-act="page" data-v="${id}">${id} · ${esc(pageById(id).titre)}</button>`).join("")}</div>`;
    case "src": return `<p class="src">Toutes les sources de ce chapitre : ${esc(b.h)}</p>`;
    case "pause": return `<div class="pause"><p class="pause-t">⏸ Mets sur pause et réponds</p><p class="pause-q">${esc(b.q)}</p><details><summary>Voir la réponse</summary><p>${esc(b.a)}</p></details></div>`;
    case "svg": return `<figure class="svgfig">${SVGS[b.k](P_PAGE)}<figcaption>${esc(b.titre)}</figcaption></figure>`;
  }
  return "";
}
function pager(id){
  const B = dBook(), i = B.indexOf(id), prev = B[i-1], next = B[i+1];
  return `<div class="pager">${prev ? `<button data-act="page" data-v="${prev}"><small>← Précédent</small><b>${esc(pageTitle(prev))}</b></button>` : `<button data-act="page" data-v=""><small>← Retour</small><b>Sommaire</b></button>`}${next ? `<button data-act="page" data-v="${next}"><small>Suivant →</small><b>${esc(pageTitle(next))}</b></button>` : `<button data-act="nav" data-v="home"><small>Et maintenant →</small><b>M'entraîner</b></button>`}</div>`;
}
function viewPage(id){
  const code = id === "caps" ? "▶" : id === "lex" ? "ABC" : id === "src" ? "SRC" : id;
  let h = `<div class="pbar"><button class="pbar-back" data-act="page" data-v="">← Sommaire</button><span class="pbar-t"><span class="code">${code}</span><span class="pbar-x">${esc(pageTitle(id))}</span></span></div>`;
  if (id === "caps"){
    const n = capsSeen(), tot = CAPS_ORDER.length;
    h += `<article class="page"><h2>Les ${tot} capsules dans l'ordre</h2>
      <div class="caps-meta"><span class="caps-date">Contrôle : ${esc(CAPSULES.controle)}</span><span class="caps-prog"><b>${n}</b> / ${tot} vues</span></div>
      <p class="read">${esc(CAPSULES.consigne)}</p>` +
      CAPSULES.chapitres.map(c => `<section class="caps-ch"><h3>${esc(c.chapitre)}<small>${esc(c.question)}</small></h3>` + c.capsules.map(x => {
        const seen = !!S.vidSeen[x.id];
        const body = S.vidDone === x.id ? vidDonePanel(x.id, "caps") : S.vidOpen === x.id ? vidPlayer(x.id) : S.audOpen === x.id ? audPlayer(x.id) : "";
        return `<div class="caps-row${seen ? " seen" : ""}${body ? " on" : ""}" id="cap-${x.id}">
          <div class="caps-line"><span class="code">${esc(x.code)}</span><span class="caps-txt"><b>${esc(x.titre)}</b><small>${esc(x.objectif)}</small></span>
          ${body ? "" : `<span class="caps-btns"><button class="caps-play" data-act="vidPlay" data-v="${x.id}" aria-label="Lire la capsule ${esc(x.code)}">▶</button>${audParts(x.id).length ? `<button class="caps-play aud" data-act="audPlay" data-v="${x.id}" aria-label="Écouter la piste audio ${esc(x.code)}">🎧</button>` : ""}</span>`}</div>
          <p class="caps-st">${seen ? "✓ vue" : "pas encore vue"} · <button class="back" data-act="page" data-v="${x.id}">lire le chapitre</button></p>${body}</div>`;
      }).join("") + `</section>`).join("") +
      `<p class="fine">${esc(CAPSULES.diffusion)} La marque « vue » est enregistrée ${HAS_CLAUDE ? "dans tes données Claude" : "sur cet appareil"}.</p></article>`;
  } else if (id === "lex"){
    h += `<article class="page"><h2>Lexique</h2>` + LEXIQUE.map(x => `<div class="def ${x.dico?"dico":x.book?"book":x.gen?"gen":"mine"}"><span class="def-term">${esc(x.t)} <span class="tag ${x.dico?"dico":x.book?"book":x.gen?"gen":"mine"}">${esc(x.lab || (x.gen?"À vérifier":"Ton dossier"))}</span></span><p class="read">${esc(x.h)} <button class="back" data-act="page" data-v="${x.ref}" style="display:inline;font-size:14px">${x.ref}</button></p>${x.s ? `<p class="bsrc" style="margin:0">📖 ${esc(x.s)}</p>` : ""}</div>`).join("") + `</article>`;
  } else if (id === "src"){
    h += `<article class="page"><h2>D'où viennent les questions</h2>` + SOURCES.map(x => `<div class="srcrow"><b>${esc(x.titre)}</b><span class="fine">reçue le ${esc(x.recue)}</span><span>${esc(x.contenu)}</span></div>`).join("") + `<p class="note">${esc(SOURCES_NOTE)}</p>`;
    if (HAS_CLAUDE) h += `<div class="photos">` + PHOTOS.map(ph => ph.url
      ? `<figure><a href="${esc(ph.url)}" target="_blank" rel="noopener"><img src="${esc(ph.url)}" alt="${esc(ph.titre)}" loading="lazy"></a><figcaption>${esc(ph.titre)}</figcaption></figure>`
      : `<figure class="missing"><span>Photo à renvoyer dans le chat</span><figcaption>${esc(ph.titre)}</figcaption></figure>`).join("") + `</div>`;
    h += `</article>`;
  } else {
    const p = pageById(id), c = CHAPTERS.find(x => x.key === p.ch) || { titre:"Avant de commencer", sous:"Comment les chapitres se relient" };
    h += `<article class="page"><div class="crumb"><span class="code">${p.id}</span><span>${esc(c.titre)} · ${esc(c.sous)}</span></div><h2>${esc(p.titre)}</h2>${preBlock(p)}${mediaRow(p.id)}${S.vidOpen === p.id ? "" : chapTest(p.id)}
      ${p.obj ? `<p class="objective"><b>${esc(c.objLabel || "Objectif")}</b>${esc(p.obj)}</p>` : ""}` + p.blocks.map(b => blockBody(b) + bsrc(b)).join("") + blankBlock(p) + dChapStatus(p.id) + chapTest(p.id, "end") + `</article>`;
  }
  return h + pager(id) + `<p class="version">Version ${VERSION.n} · mise à jour le ${VERSION.date}</p>`;
}

/* ---------- cartes et revue des cartes ---------- */
function cardItems(){
  let list = S.selected.flatMap(k => DECK[k].items.map((it, i) => ({ it, d:DECK[k], n:i+1, id:cardId(DECK[k], it) })));
  if (S.cards.only) list = list.filter(x => rvMarked(RV.data[x.id]));
  return list;
}
function viewCartesDossier(){
  let h = `<button class="back" data-act="nav" data-v="home">← Paquets</button>`;
  if (S.revMode){
    const c = reviewCounts();
    h += `<div class="rvsum"><p class="rvsum-t">Revue des cartes · <b>${c.revoir}</b> à revoir · <b>${c.exclu}</b> hors test · <b>${c.notes}</b> remarque${c.notes>1?"s":""}</p>
      <div class="row"><button class="ghost small" data-act="rvOnly" aria-pressed="${!!S.cards.only}">${S.cards.only ? "Voir toutes les cartes" : "Seulement les cartes marquées"}</button><button class="ghost small" data-act="rvCopy">${S.rvCopied ? "Copié — colle-le dans le chat" : "Copier ma revue pour le chat"}</button></div>
      ${S.rvCopy ? `<textarea class="exportarea" readonly rows="6" id="rv-copy">${esc(S.rvCopy)}</textarea>` : ""}
      ${S.rvConfirm ? `<div class="confirm"><span>Effacer toute la revue ?</span><button class="mini yes" data-act="rvClearYes">Effacer</button><button class="mini" data-act="rvClearNo">Annuler</button></div>` : `<button class="back rv-clear" data-act="rvClearAsk">Effacer la revue</button>`}</div>`;
  }
  const items = cardItems();
  if (!items.length) return h + (S.cards.only ? `<p class="intro">Aucune carte marquée dans les paquets cochés.</p><button class="ghost" data-act="rvOnly">Voir toutes les cartes</button>` : `<p class="intro">Coche au moins un paquet pour voir les cartes.</p><button class="cta" data-act="nav" data-v="home">Choisir des paquets</button>`);
  if (S.cards.order.length !== items.length){ S.cards.order = shuffle(items.map((_,i) => i)); S.cards.pos = 0; S.cards.flip = false; }
  if (S.cards.pos >= items.length) S.cards.pos = 0;
  const { it, d, n, id } = items[S.cards.order[S.cards.pos]];
  S.cards.curId = id;
  const src = it.src || d.src, more = it.ans || it.expl || "", r = RV.data[id] || {};
  const long = t => String(t).length > 90 ? " long" : String(t).length > 55 ? " mid" : "";
  const marks = [r.revoir ? "à revoir" : "", r.exclu ? "hors test" : ""].filter(Boolean).join(" · ");
  h += `<p class="fine">${esc(deckLabel(S.selected))} · carte ${S.cards.pos+1} sur ${items.length}${marks ? ` · <b>${marks}</b>` : ""}</p>
  <button class="flash${S.cards.flip?" flipped":""}" data-act="dflip" aria-label="Retourner la carte">
    <span class="face f"><span class="face-tag">${esc(d.code)} · ${esc(d.title)} · carte ${n}</span><span class="face-word${long(it.front)}">${esc(it.front)}</span><span class="face-src">📖 Où vérifier : ${esc(src)}</span><span class="face-hint">touche la carte pour voir la réponse</span></span>
    <span class="face b"><span class="face-tag">Réponse · ${esc(d.code)} carte ${n}</span><span class="face-word${long(it.back[0])}">${esc(it.back[0])}</span>${more && more !== it.back[0] ? `<span class="face-ans">${esc(more)}</span>` : ""}<span class="face-src">📖 Où vérifier : ${esc(src)}</span></span>
  </button>
  <div class="row3"><button class="ghost" data-act="dcard" data-v="-1">Précédente</button><button class="ghost" data-act="dshuffle">Mélanger</button><button class="ghost" data-act="dcard" data-v="1">Suivante</button></div>`;
  if (S.revMode){
    h += `<div class="rvw"><p class="rvw-t">Revue de cette carte (${esc(d.code)} · carte ${n})</p>
      <label class="ck"><input type="checkbox" id="rv-revoir" data-rvk="revoir"${r.revoir?" checked":""}><span>À revoir : la carte est mal posée ou pas claire</span></label>
      <label class="ck"><input type="checkbox" id="rv-exclu" data-rvk="exclu"${r.exclu?" checked":""}><span>Hors test : ne pas poser cette question dans le test</span></label>
      <label class="fine" for="rv-note">Remarque (facultatif)</label>
      <textarea id="rv-note" class="rv-note" rows="2" placeholder="Ce qui ne va pas, ou comment la reformuler">${esc(r.note || "")}</textarea>
      <p class="fine" id="rv-msg" aria-live="polite">${esc(S.rvMsg)}</p></div>`;
  }
  h += `<button class="ghost small" data-act="page" data-v="${d.code}">📖 Relire le chapitre ${d.code}</button>
  <button class="back rv-toggle" data-act="rvMode">${S.revMode ? "Fermer la revue des cartes" : "✎ Revue des cartes (pour les parents)"}</button>`;
  return h;
}
function dReset(){ S.audOpen = null; S.vidOpen = null; S.vidDone = null; }

const COUCHE = {
  rings: 1,
  papierSource: true,
  hasLive: false,
  acquisAvantLibre: true,

  allCards(){
    return DECKS.flatMap(d => d.items.filter(it => !rvOf(d, it).exclu).map(it => ({ dk:d.key, word:it.front, aspect:"", mcqOnly:!!it.mcqOnly, levels:[0,1,2], k:dCardKey(d, it) })));
  },

  /* limit et order ne servent pas : le Dossier pose toutes les cartes des paquets choisis (sans les cartes « hors test »),
     à choix d'abord puis à écrire, dans un ordre mélangé (outil d'origine) */
  buildTest(keys, difficulty){
    const qs = []; let num = 0, ex = 0;
    DECKS.filter(d => keys.includes(d.key)).forEach(d => {
      const groups = { mcq:[], type:[] };
      shuffle(d.items.filter(it => !rvOf(d, it).exclu)).forEach(it => groups[dKind(it, difficulty)].push(it));
      ["mcq","type"].forEach(kind => {
        if (!groups[kind].length) return;
        ex++; const K = D_KINDS[kind];
        groups[kind].forEach(it => {
          num++;
          const q = { id:"q"+num, num, ex, exTitle:d.title, deckKey:d.key, card:dCardKey(d, it), kind, type:K.type, tag:d.key, consigne:K.consigne, word:it.front, answer:it.back[0], expl:dExplain(it, d), src:it.src || d.src, hint:"" };
          if (kind === "mcq") q.options = dOptions(it, d); else q.accept = it.back;
          if (it.mcqOnly) q.mcqOnly = true;
          q.prompt = `${K.consigne} « ${q.word} »`;
          qs.push(q);
        });
      });
    });
    return qs;
  },

  isRight(q, val){ return q.type === "mcq" ? val === q.answer : dMatch(val, q.accept || [q.answer]); },

  cardFace(d, it){ const src = it.src || d.src, more = it.ans || it.expl || "";
    return { tagF:`${d.code} · ${d.title}`, front:it.front, hintF:"📖 Où vérifier : " + src, tagB:"Réponse",
      backHtml:`<span class="face-word">${esc(it.back[0])}</span>${more && more !== it.back[0] ? `<span class="face-ans">${esc(more)}</span>` : ""}<span class="face-src">📖 Où vérifier : ${esc(src)}</span>` }; },

  liveCands(){ return []; },

  /* une réponse compte comme « écrite » si elle a été tapée, ou si la carte n'existe qu'à choix */
  wrote(q){ if (q.type === "type") return true; const x = D_ITEM[COUCHE.carteDe(q)]; return !!(x && x.it.mcqOnly); },
  carteDe(q){ return q.card || (q.deckKey + "|" + q.word); },

  sousQuestion(q){ return q.src ? `<p class="bsrc" style="margin:-4px 0 0">📖 Où vérifier : ${esc(q.src)}</p>` : ""; },

  vueFiche(){ return S.page ? viewPage(S.page) : viewToc(); },
  vueCartes(){ return viewCartesDossier(); },

  etat:{ page:null, vidSeen:{}, vidOpen:null, vidDone:null, audOpen:null, audPart:0, rvMsg:"", rvCopy:"", rvCopied:false, rvConfirm:false,
    revMode:(() => { try { return localStorage.getItem(QUIZ_ID + "-revmode") === "1"; } catch(e){ return false; } })() },

  async charger(){
    try { RV.data = (await store.getDoc(REVIEW_ID)) || {}; } catch(e){ RV.data = {}; }
    try { S.vidSeen = (await store.getDoc(VIDS_ID)) || {}; } catch(e){ S.vidSeen = {}; }
    refreshCards();
  },

  surNav(){ dReset(); },

  action(act, v){
    switch(act){
      case "page": S.screen = "fiche"; S.page = v || null; dReset(); render(); window.scrollTo(0,0); break;
      case "audPlay": S.audOpen = v; S.audPart = 0; S.vidOpen = null; S.vidDone = null; render(); audListen(); if (S.page === "caps"){ const r = document.getElementById("cap-" + v); if (r) r.scrollIntoView({ block:"start" }); } break;
      case "audPart": { const [aid, k] = v.split("|"); S.audOpen = aid; S.audPart = +k; render(); audListen(); break; }
      case "audHide": S.audOpen = null; render(); break;
      case "vidPlay": S.audOpen = null; S.vidOpen = v; S.vidDone = null; render(); vidListen(); if (S.page === "caps"){ const r = document.getElementById("cap-" + v); if (r) r.scrollIntoView({ block:"start" }); } break;
      case "vidReplay": S.vidOpen = v; S.vidDone = null; render(); vidListen(); break;
      case "vidFinish": S.vidOpen = v; vidEnded(v); break;
      case "vidHide": S.vidOpen = null; S.vidDone = null; render(); break;
      case "chapTest": { const [cid, lev] = v.split("|"); if (S.draft){ S.draftBlock = true; S.screen = "home"; render(); window.scrollTo(0,0); break; }
        S.selected = dDecksOf(cid).map(d => d.key); S.difficulty = lev; S.mode = "train"; S.frozen = null; S.rattrParent = null; dReset();
        startQuiz(buildTest(S.selected, S.difficulty), false); break; }
      case "vidCards": S.selected = dDecksOf(v).map(d => d.key); S.cards.order = []; S.cards.only = false; S.frozen = null; dReset(); S.screen = "cards"; render(); window.scrollTo(0,0); break;
      case "dflip": S.cards.flip = !S.cards.flip; render(); break;
      case "dcard": { const n = cardItems().length; if (!n) break; S.cards.flip = false; S.cards.pos = (S.cards.pos + (+v) + n) % n; render(); break; }
      case "dshuffle": S.cards.order = shuffle(S.cards.order); S.cards.pos = 0; S.cards.flip = false; render(); break;
      case "rvMode": S.revMode = !S.revMode; try { localStorage.setItem(QUIZ_ID + "-revmode", S.revMode ? "1" : "0"); } catch(e){} render(); break;
      case "rvOnly": S.cards.only = !S.cards.only; S.cards.order = []; render(); break;
      case "rvCopy": { const t = reviewText(); S.rvCopy = ""; try { navigator.clipboard.writeText(t).then(() => { S.rvCopied = true; render(); setTimeout(() => { S.rvCopied = false; render(); }, 2500); }, () => { S.rvCopy = t; render(); setTimeout(() => { const x = document.getElementById("rv-copy"); if (x){ x.focus(); x.select(); } }, 30); }); } catch(e){ S.rvCopy = t; render(); } break; }
      case "rvClearAsk": S.rvConfirm = true; render(); break;
      case "rvClearNo": S.rvConfirm = false; render(); break;
      case "rvClearYes": RV.data = {}; S.rvConfirm = false; S.cards.only = false; S.cards.order = []; saveReview(); render(); break;
    }
  },

  onChange(e){
    const k = e.target.dataset && e.target.dataset.rvk; if (!k || !S.cards.curId) return;
    const r = RV.data[S.cards.curId] = Object.assign({}, RV.data[S.cards.curId], { [k]: e.target.checked });
    if (!rvMarked(r)) delete RV.data[S.cards.curId];
    saveReview(); render();
  },
  onInput(e){
    if (e.target.id !== "rv-note" || !S.cards.curId) return false;
    const r = RV.data[S.cards.curId] = Object.assign({}, RV.data[S.cards.curId], { note: e.target.value });
    if (!rvMarked(r)) delete RV.data[S.cards.curId];
    saveReview(); return true;
  },
};

/* réglages propres à un outil (version 2) : le contenu peut déclarer COUCHE_CONTENU = { … } (accroches facultatives du noyau ou
   remplacement d'une fonction de la couche) ; sans COUCHE_CONTENU, rien ne change. Même mécanisme que la couche Langues v3. */
if (typeof COUCHE_CONTENU !== "undefined") Object.assign(COUCHE, COUCHE_CONTENU);

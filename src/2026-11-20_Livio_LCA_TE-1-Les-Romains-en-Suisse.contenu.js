/* ============================================================
   CONTENU — LCA, TE 1 « Les Romains en Suisse »
   Outil de révision de Livio — 10e HarmoS. Épreuve : vendredi 20 novembre 2026.
   Ce fichier est la seule partie propre à cet outil. Il est assemblé avec
   claude/couche-dossier.js et claude/noyau-quiz.js par claude/assembler.py (--couche dossier).
   CSS du Dossier recopiée depuis le contenu d'histoire (fiche construction, « Couche Dossier »), palette et polices propres à ce thème.
   ============================================================ */

/* Thème « voie romaine » : calcaire, basalte des pavés, rouge pompéien des inscriptions, bronze des bornes. */
const CSS_THEME = `
/* Voie romaine : calcaire, basalte des pavés, rouge pompéien des inscriptions, bronze des bornes ; titres en Marcellus (capitales gravées), cours en Spectral, outil en Fira Sans. */
:root{
  --dock:#E3E1DB; --sheet:#FFFFFF; --ink:#24211D; --soft:#5F5850; --st:#8F887E; --rule:#CFC9BE;
  --box:#8A3324; --box-wash:#F3E2DC; --crane:#C8962E; --crane-ink:#2E1F00; --board:#33302B; --on-box:#FFFFFF;
  --good:#2E6B3A; --good-wash:#DDF0E1; --bad:#9B1C4A; --bad-wash:#F6DEE7;
  --gen:#5B5F66; --gen-wash:#EEEFF1; --book-wash:#FBEFC8; --book-ink:#5A4300; --dico:#6A3D8F; --dico-wash:#EFE6F7;
  --land:#E9E4D6; --r1:#8A3324; --r2:#2F5D8C; --r3:#2E6B3A; --r4:#9A6A12; --r5:#6A3D8F; --r6:#33302B;
  --display:'Marcellus',Georgia,serif;
  --ui:'Fira Sans',system-ui,-apple-system,'Segoe UI',sans-serif;
  --read:'Spectral',Georgia,'Times New Roman',serif;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --dock:#161513; --sheet:#211F1C; --ink:#ECE8E1; --soft:#ADA59A; --st:#6A645C; --rule:#3A3631;
  --box:#E39176; --box-wash:#3A231D; --crane:#E2B556; --crane-ink:#241800; --board:#0F0E0D; --on-box:#1A0B06;
  --good:#74D18F; --good-wash:#173322; --bad:#FF8FB5; --bad-wash:#3A1A27;
  --gen:#A9B0B8; --gen-wash:#24272B; --book-wash:#3A3112; --book-ink:#F2D27A; --dico:#C9A3EC; --dico-wash:#2B2136;
  --land:#2E2B25; --r1:#E39176; --r2:#8DB8F2; --r3:#74D18F; --r4:#E2C66A; --r5:#C9A3EC; --r6:#ECE8E1; color-scheme:dark}}
:root[data-theme="dark"]{
  --dock:#161513; --sheet:#211F1C; --ink:#ECE8E1; --soft:#ADA59A; --st:#6A645C; --rule:#3A3631;
  --box:#E39176; --box-wash:#3A231D; --crane:#E2B556; --crane-ink:#241800; --board:#0F0E0D; --on-box:#1A0B06;
  --good:#74D18F; --good-wash:#173322; --bad:#FF8FB5; --bad-wash:#3A1A27;
  --gen:#A9B0B8; --gen-wash:#24272B; --book-wash:#3A3112; --book-ink:#F2D27A; --dico:#C9A3EC; --dico-wash:#2B2136;
  --land:#2E2B25; --r1:#E39176; --r2:#8DB8F2; --r3:#74D18F; --r4:#E2C66A; --r5:#C9A3EC; --r6:#ECE8E1; color-scheme:dark}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
body{background:var(--dock);color:var(--ink);font-family:var(--ui);font-size:16px;line-height:1.5}
.wrap{max-width:640px;margin:0 auto;padding-block:18px 110px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
button{font:inherit;color:inherit}
button:focus-visible,input:focus-visible,textarea:focus-visible{outline:3px solid var(--crane);outline-offset:2px}

/* en-tête : un conteneur vu de côté (ondulations de la tôle) */
.head{position:relative;overflow:hidden;display:flex;gap:14px;align-items:center;margin-bottom:18px;padding:16px 14px 16px 16px;border-radius:4px;color:#fff;background:radial-gradient(ellipse 22px 14px at 12px 10px,#4A4640 60%,transparent 64%) 0 0/46px 30px,radial-gradient(ellipse 22px 14px at 35px 25px,#45413B 60%,transparent 64%) 0 0/46px 30px,#2A2723}
.head-code{flex:none;background:#D9D2C3;color:#7A1F14;font-family:var(--display);font-size:13px;padding:8px 9px 6px;border-radius:22px 22px 3px 3px;letter-spacing:1.5px;line-height:1.05;text-align:center;box-shadow:inset 0 -3px 0 #B9B09E}
.head-code b{display:block;font-size:26px;font-weight:400}
.head h1{font-family:var(--display);font-weight:400;letter-spacing:.3px;font-size:clamp(25px,7.4vw,34px);line-height:1;margin:0;text-wrap:balance}
.head p{margin:4px 0 0;font-size:14px;opacity:.92}

.screen{display:flex;flex-direction:column;gap:12px}
.intro{margin:0;font-size:15.5px}
.lab{font-family:var(--display);font-weight:700;font-size:22px;margin:12px 0 0}
.fine{font-size:13px;color:var(--soft);margin:0}
.warn{background:var(--bad-wash);border-left:3px solid var(--bad);padding:10px 12px;font-size:14px;border-radius:0 6px 6px 0;margin:0}
.note{background:var(--box-wash);border-radius:6px;padding:10px 12px;font-size:14px;margin:0}
.back{align-self:flex-start;background:none;border:0;color:var(--box);font-weight:700;padding:0;cursor:pointer}
.cta{width:100%;padding:15px;border:0;border-radius:4px;background:var(--box);color:var(--on-box);font-family:var(--display);font-weight:700;font-size:20px;letter-spacing:.3px;cursor:pointer}
.cta:disabled{opacity:.45;cursor:not-allowed}
.ghost{width:100%;padding:12px;border:1px solid var(--rule);border-radius:4px;background:var(--sheet);font-weight:700;font-size:14.5px;cursor:pointer}
.ghost.small{font-size:13.5px;padding:10px}
.ghost.danger{color:var(--bad)}
.row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}

/* ===== DOSSIER (e-book) ===== */
.toc-ch{display:flex;flex-direction:column;gap:6px}
.toc-ch h2{font-family:var(--display);font-weight:800;font-size:26px;line-height:1.1;margin:14px 0 2px;display:flex;flex-direction:column;gap:2px}
.toc-ch h2 span{font-family:var(--ui);font-weight:600;font-size:14px;color:var(--soft)}
.toc-item{display:grid;grid-template-columns:auto minmax(0,1fr);gap:12px;align-items:center;text-align:left;background:var(--sheet);border:1px solid var(--rule);border-radius:4px;padding:11px 12px;cursor:pointer}
.code{font-family:var(--display);font-weight:800;font-size:16px;background:var(--board);color:var(--crane);padding:3px 8px;border-radius:2px;letter-spacing:.5px;min-width:42px;text-align:center}
.toc-t{font-weight:700;font-size:15px;line-height:1.3}
.toc-s{display:block;font-weight:400;font-size:12.5px;color:var(--soft)}
.legend{display:flex;flex-direction:column;gap:6px;background:var(--sheet);border:1px solid var(--rule);border-radius:4px;padding:12px}
.legend p{margin:0;font-size:14px;display:flex;gap:8px;align-items:baseline}

.page{background:var(--sheet);border:1px solid var(--rule);border-radius:4px;padding:18px 16px 20px;display:flex;flex-direction:column;gap:14px}
.crumb{display:flex;gap:10px;align-items:center;flex-wrap:wrap;font-size:13px;color:var(--soft)}
.page h2{font-family:var(--display);font-weight:800;font-size:clamp(26px,7.5vw,32px);line-height:1.05;margin:0;text-wrap:balance}
.objective{margin:0;padding:10px 12px;border:2px solid var(--board);border-radius:3px;font-size:14.5px;background:var(--dock)}
.objective b{display:block;font-family:var(--display);font-size:15px;letter-spacing:.3px;color:var(--soft);font-weight:700}
.read{font-family:var(--read);font-size:17px;line-height:1.65;margin:0;max-width:65ch}
.page h3{font-family:var(--display);font-weight:700;font-size:21px;margin:6px 0 -4px}
.def{border-left:4px solid var(--box);padding:4px 0 4px 12px;display:flex;flex-direction:column;gap:2px}
.def-term{font-family:var(--display);font-weight:800;font-size:20px;line-height:1.15}
.def .read{font-size:16.5px}
.def.gen{border-left:4px dashed var(--gen);background:var(--gen-wash);padding:8px 10px 8px 12px;border-radius:0 4px 4px 0}
.def.book{border-left:4px solid var(--crane);background:var(--book-wash);padding:9px 10px 9px 12px;border-radius:0 14px 14px 0}
.def.book .read{font-weight:600}
.tag.book{background:var(--crane);color:var(--crane-ink)}
.step.st .step-bar{width:6px;justify-self:center;opacity:.55}
.rv-d{font-family:var(--display);font-weight:700;font-size:15px;color:var(--soft)}
.rv-c{font-size:12.5px;font-weight:700;color:var(--box);margin-top:3px}
.nike{gap:10px}
.nk{display:flex;flex-direction:column;gap:3px}
.nk-r{font-weight:700;font-size:14px}
.tag{display:inline-block;white-space:nowrap;flex:none;font-family:var(--ui);font-size:11.5px;font-weight:700;padding:1px 7px;border-radius:3px;vertical-align:2px}
.tag.mine{background:var(--box-wash);color:var(--box)}
.tag.gen{background:var(--gen-wash);color:var(--gen);border:1px dashed var(--gen)}
.mywork{background:var(--box-wash);border-radius:4px;padding:10px 12px;display:flex;flex-direction:column;gap:5px}
.mywork-t{font-weight:700;font-size:14px;color:var(--box);margin:0}
.mywork ul{margin:0;padding-left:18px}
.mywork li{font-family:var(--read);font-size:15.5px;margin:2px 0}
.tip{margin:0;padding:10px 12px;border-radius:4px;background:var(--board);color:#E9EEF2;font-size:15px}
.tip b{color:var(--crane);font-family:var(--display);font-size:17px;display:block}
.todo{margin:0;padding:10px 12px;border:1px dashed var(--bad);border-radius:4px;font-size:14px;color:var(--ink)}
.src{font-size:12.5px;color:var(--soft);margin:0}
.exl{display:flex;flex-direction:column;gap:0;border:1px solid var(--rule);border-radius:4px;overflow:hidden}
.exl-t{margin:0;padding:8px 12px;font-weight:700;font-size:14px;background:var(--box-wash);color:var(--box)}
.exr{display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 10px;padding:9px 12px;border-top:1px solid var(--rule);font-size:14.5px}
.exr .code{font-size:13px;min-width:0;padding:2px 6px;align-self:start}
.exr b{font-weight:600}
.exr span.so{display:block;color:var(--soft);font-size:13.5px;margin-top:2px}
.links{display:flex;flex-direction:column;gap:10px}
.lk{display:grid;grid-template-columns:auto minmax(0,1fr);gap:10px;align-items:start;padding:10px 12px;border:1px solid var(--rule);border-radius:4px}
.lk-ids{display:flex;flex-direction:column;gap:4px;align-items:center}
.lk-ids button{border:0;background:var(--board);color:var(--crane);font-family:var(--display);font-weight:800;font-size:14px;padding:2px 7px;border-radius:2px;cursor:pointer}
.lk-ids i{font-style:normal;color:var(--soft);font-size:12px;line-height:1}
.lk p{margin:0;font-size:15px}
.trio{display:flex;flex-direction:column;gap:0}
.trio-s{display:grid;grid-template-columns:44px minmax(0,1fr);gap:12px;padding:10px 0}
.trio-s + .trio-s{border-top:1px dashed var(--rule)}
.trio-k{font-family:var(--display);font-weight:800;font-size:28px;line-height:1;color:var(--on-box);background:var(--box);border-radius:3px;display:flex;align-items:center;justify-content:center;height:44px}
.trio-s b{display:block;font-family:var(--display);font-size:20px;line-height:1.1}
.trio-s p{margin:2px 0 6px;font-size:14.5px;color:var(--soft)}
.chips{display:flex;flex-wrap:wrap;gap:6px}
.chips button{border:1px solid var(--rule);background:var(--dock);border-radius:3px;padding:3px 8px;font-size:13px;font-weight:700;cursor:pointer}
.rv-s{width:34px;height:34px;color:var(--box)}
.sect6{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.sx{border:2px solid var(--board);border-radius:3px;padding:9px 10px;display:flex;flex-direction:column;gap:3px;min-width:0}
.sx b{font-family:var(--display);font-size:17px;line-height:1.1}
.sx span{font-size:13.5px;color:var(--soft)}
.pbar{position:sticky;top:env(safe-area-inset-top,0px);z-index:4;display:flex;align-items:center;gap:12px;background:var(--dock);border-bottom:1px solid var(--rule);
  margin-left:calc(-1 * max(16px, env(safe-area-inset-left, 0px)));margin-right:calc(-1 * max(16px, env(safe-area-inset-right, 0px)));
  padding:9px max(16px, env(safe-area-inset-right, 0px)) 9px max(16px, env(safe-area-inset-left, 0px))}
.pbar-back{flex:none;background:none;border:0;color:var(--box);font-weight:700;font-size:15px;padding:4px 0;cursor:pointer}
.pbar-t{min-width:0;flex:1;display:flex;gap:8px;align-items:center}
.pbar-t .code{flex:none;font-size:13px;min-width:0;padding:2px 6px}
.pbar-x{min-width:0;font-weight:700;font-size:14.5px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
body::before{content:"";position:fixed;inset:0 0 auto;height:env(safe-area-inset-top,0px);z-index:10;background:var(--dock)}
.vid{display:flex;gap:12px;align-items:center;padding:10px 12px;border-radius:4px;background:var(--board);color:#E9EEF2;text-decoration:none;margin:0}
.vid b{display:block;font-size:15.5px;color:#fff}.vid small{display:block;font-size:12.5px;color:#C9D3E0}
.vid-i{flex:none;width:38px;height:38px;border-radius:50%;background:var(--crane);color:var(--crane-ink);display:flex;align-items:center;justify-content:center;font-size:15px;padding-left:2px}
.vid.off{background:var(--gen-wash);color:var(--gen);border:1px dashed var(--gen)}.vid.off b{color:var(--gen)}.vid.off small{color:var(--gen)}.vid.off .vid-i{background:var(--rule);color:var(--soft)}
.vthumb{position:relative;display:block;width:100%;aspect-ratio:16/9;padding:0;border:0;border-radius:4px;overflow:hidden;background:var(--board);cursor:pointer;color:#fff;text-align:left}
.vthumb img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.55}
.vthumb-play{position:absolute;left:50%;top:42%;transform:translate(-50%,-50%);width:62px;height:62px;border-radius:50%;background:var(--crane);color:var(--crane-ink);display:flex;align-items:center;justify-content:center;font-size:24px;padding-left:4px;box-shadow:0 2px 10px rgba(0,0,0,.35)}
.vthumb-t{position:absolute;left:0;right:0;bottom:0;padding:10px 12px;background:linear-gradient(transparent,rgba(10,17,23,.9))}
.vthumb-t b{display:block;font-size:15.5px}.vthumb-t small{display:block;font-size:12.5px;color:#D5DEE6}
.vplay{display:flex;flex-direction:column;gap:8px}
.vframe{position:relative;width:100%;aspect-ratio:16/9;background:#000;border-radius:4px;overflow:hidden}
.vframe iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.vbar{display:grid;grid-template-columns:1fr auto;gap:8px}
.vfb{margin:0}.vfb a{color:var(--soft)}
.vdone{background:var(--good-wash);border:1px solid var(--good);border-radius:4px;padding:12px;display:flex;flex-direction:column;gap:10px}
.vdone-t{margin:0;font-family:var(--display);font-weight:800;font-size:22px;color:var(--good)}
.toc-v.seen{background:var(--good-wash);color:var(--good);border:1px solid var(--good)}
.ctest{border:1px solid var(--box);background:var(--box-wash);border-radius:4px;padding:10px;display:flex;flex-direction:column;gap:8px}
.ctest.end{margin-top:4px}
.ctest-t{margin:0;font-weight:700;font-size:15px;color:var(--box)}.ctest-t small{display:block;font-weight:400;font-size:12.5px;color:var(--soft)}
.ctest-b{display:flex;flex-direction:column;align-items:center;gap:2px;padding:9px 4px;border:1px solid var(--rule);border-radius:4px;background:var(--sheet);cursor:pointer;min-width:0}
.ctest-b span{font-size:17px}.ctest-b b{font-size:13px;line-height:1.2;text-align:center}
.prebox{border:2px dashed var(--crane);border-radius:4px;padding:10px 12px;display:flex;flex-direction:column;gap:6px;background:var(--sheet)}
.prebox-t,.blank-t{margin:0;font-weight:700;font-size:15.5px}.prebox-t small,.blank-t small{display:block;font-weight:400;font-size:13px;color:var(--soft)}
.prebox ol{margin:0;padding-left:20px;font-size:15px}.prebox li{margin:3px 0}.prebox details li{font-size:14.5px}.prebox .bsrc{display:block;margin:2px 0 0}
.pause{border-left:5px solid var(--crane);background:var(--book-wash);border-radius:0 4px 4px 0;padding:9px 12px;display:flex;flex-direction:column;gap:5px}
.pause-t{margin:0;font-family:var(--display);font-weight:800;font-size:17px;color:var(--book-ink)}
.pause-q{margin:0;font-weight:700;font-size:15.5px}
.pause details p{margin:6px 0 0;font-size:15px}
details summary{cursor:pointer;font-weight:700;font-size:14px;color:var(--box);padding:4px 0}
.blank{border:2px solid var(--board);border-radius:4px;padding:10px 12px;display:flex;flex-direction:column;gap:6px;background:var(--dock)}
.blank-c{margin:0;font-size:15.5px}
.blank-l{list-style:none;margin:6px 0 0;padding:0;display:flex;flex-direction:column;gap:6px}
.blank-l label{display:flex;gap:9px;align-items:flex-start;font-size:14.5px;cursor:pointer}.blank-l input{width:20px;height:20px;flex:none;margin:1px 0 0;accent-color:var(--box)}
.svgfig{margin:0;background:var(--sheet);border:1px solid var(--rule);border-radius:4px;padding:8px}
.svgfig svg{display:block;width:100%;height:auto}
.blank .bsrc{margin:6px 0 0}
.svgfig figcaption{font-size:13px;color:var(--soft);margin-top:4px;font-weight:700}
.caps-cta{display:flex;gap:12px;align-items:center;width:100%;text-align:left;padding:12px 14px;border:0;border-radius:4px;background:var(--board);color:#E9EEF2;cursor:pointer}
.caps-cta b{display:block;font-family:var(--display);font-size:20px;color:#fff;line-height:1.1}.caps-cta small{display:block;font-size:13px;color:#C9D3E0}
.caps-cta-i,.caps-play{flex:none;width:42px;height:42px;border-radius:50%;background:var(--crane);color:var(--crane-ink);display:flex;align-items:center;justify-content:center;font-size:16px;padding-left:3px;border:0;cursor:pointer}
.caps-meta{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center}
.caps-date{font-weight:700;font-size:14px;background:var(--box-wash);color:var(--box);padding:5px 10px;border-radius:4px}
.caps-prog{font-weight:700;color:var(--soft)}.caps-prog b{color:var(--good)}
.caps-ch{display:flex;flex-direction:column;gap:8px}
.caps-ch h3{margin:8px 0 0;border-bottom:2px solid var(--board);padding-bottom:5px}.caps-ch h3 small{display:block;font-family:var(--ui);font-weight:400;font-size:13.5px;color:var(--soft)}
.caps-row{border:1px solid var(--rule);border-radius:4px;padding:10px 12px;display:flex;flex-direction:column;gap:6px;scroll-margin-top:64px}
.caps-row.seen{background:var(--good-wash);border-color:var(--good)}.caps-row.on{border-color:var(--box)}
.caps-line{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:10px;align-items:center}
.caps-line .code{font-size:14px;min-width:46px;padding:3px 6px}
.caps-txt b{display:block;font-size:15.5px;line-height:1.25}.caps-txt small{display:block;font-size:13px;color:var(--soft);line-height:1.35;margin-top:2px}
.caps-st{margin:0;font-size:12.5px;color:var(--soft)}.caps-st .back{font-size:12.5px;display:inline}
.caps-row.seen .caps-st{color:var(--good);font-weight:700}
.toc-v{display:inline-block;font-size:11.5px;font-weight:700;background:var(--crane);color:var(--crane-ink);padding:0 6px;border-radius:3px;vertical-align:2px;white-space:nowrap}
.pm{margin:0 0 6px;font-size:14.5px}
.pm b{display:inline-block;width:16px}
.bsrc{margin:-8px 0 0;font-size:12.5px;color:var(--soft);line-height:1.35}
.see{display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-size:14px}
.see button{border:1px solid var(--rule);background:var(--dock);border-radius:3px;padding:5px 9px;cursor:pointer;font-weight:700}
.pager{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.pager button{text-align:left;padding:10px 12px;border:1px solid var(--rule);border-radius:4px;background:var(--sheet);cursor:pointer;min-width:0}
.pager button:last-child{text-align:right}
.pager small{display:block;color:var(--soft);font-size:12px}
.pager b{display:block;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

/* schémas */
.chain{display:flex;flex-direction:column;gap:0}
.step{display:grid;grid-template-columns:14px minmax(0,1fr);gap:12px;align-items:stretch}
.step-bar{border-radius:3px}
.step-body{padding:8px 0 12px}
.step-body b{font-family:var(--display);font-size:19px;display:block;line-height:1.1}
.step-body span{font-size:14.5px;color:var(--soft)}
.step + .step .step-body{border-top:1px dashed var(--rule)}
.tbl{overflow-x:auto}
.tbl table{border-collapse:collapse;width:100%;font-size:14.5px}
.tbl th,.tbl td{text-align:left;padding:7px 8px;border-bottom:1px solid var(--rule);vertical-align:top}
.tbl th{font-family:var(--display);font-size:16px;font-weight:700;color:var(--soft)}
.tbl td.num{font-variant-numeric:tabular-nums;white-space:nowrap;font-weight:700}
.sw{display:inline-block;width:12px;height:12px;border-radius:2px;margin-right:6px;vertical-align:-1px}
.rev4{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.rv{border:2px solid var(--board);border-radius:3px;padding:9px 10px;display:flex;flex-direction:column;gap:2px;min-width:0}
.rv-n{font-family:var(--display);font-weight:800;font-size:28px;line-height:1;color:var(--box)}
.rv-i{font-weight:700;font-size:14.5px}
.rv-x{font-size:13px;color:var(--soft)}
.rv-i{line-height:1.3}
.bars{display:flex;flex-direction:column;gap:7px}
.bar-row{display:grid;grid-template-columns:96px minmax(0,1fr);gap:8px;align-items:center;font-size:14px}
.bar-track{display:flex;gap:4px;align-items:center}
.bar-fill{height:14px;border-radius:2px;background:var(--box)}
.bar-fill.b{background:var(--crane)}
.bar-v{font-variant-numeric:tabular-nums;font-weight:700;font-size:13px;white-space:nowrap}
.box3d{border:2px solid var(--board);border-radius:3px;padding:12px;text-align:center;font-family:var(--display);font-size:20px;font-weight:700;background:repeating-linear-gradient(90deg,var(--box-wash) 0 8px,var(--sheet) 8px 11px)}
.box3d small{display:block;font-family:var(--ui);font-size:13px;font-weight:400;color:var(--soft)}
.version{margin:4px 0 0;text-align:center;font-size:12.5px;color:var(--soft)}
.photos{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:4px}
.photos figure{margin:0}.photos img{width:100%;height:auto;border-radius:4px;border:1px solid var(--rule);display:block}
.photos .missing span{display:flex;align-items:center;justify-content:center;aspect-ratio:3/4;border:1px dashed var(--rule);border-radius:4px;color:var(--soft);font-size:13px;text-align:center;padding:8px}
.photos figcaption{font-size:12.5px;color:var(--soft);margin-top:4px}
.srcrow{display:flex;flex-direction:column;gap:2px;padding:8px 0;border-top:1px solid var(--rule);font-size:14.5px}
.srcrow b{color:var(--box)}

/* paquets */
.decks{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.deck{position:relative;text-align:left;background:var(--sheet);border:1px solid var(--rule);border-radius:4px;padding:12px;cursor:pointer;display:flex;flex-direction:column;gap:3px;min-width:0}
.deck.on{border-color:var(--box);box-shadow:inset 0 0 0 1px var(--box);background:var(--box-wash)}
.deck-c{align-self:flex-start;font-family:var(--display);font-weight:800;font-size:13px;background:var(--board);color:var(--crane);padding:1px 6px;border-radius:2px}
.deck-t{font-weight:700;font-size:14.5px;line-height:1.25}
.deck-n{font-size:12.5px;color:var(--soft)}
.deck-tick{position:absolute;top:9px;right:10px;color:var(--box);font-weight:800}

/* cartes */
.flash{position:relative;height:480px;perspective:1200px;cursor:pointer;border:0;background:none;padding:0;width:100%}
.face{position:absolute;inset:0;backface-visibility:hidden;border-radius:4px;background:var(--sheet);border:1px solid var(--rule);border-top:8px solid var(--box);display:flex;flex-direction:column;align-items:center;justify-content:safe center;gap:10px;padding:16px 16px 34px;overflow:auto;transition:transform .45s}
.face.b{transform:rotateY(180deg);background:var(--box-wash);border-color:var(--box)}
.flash.flipped .face.f{transform:rotateY(180deg)}
.flash.flipped .face.b{transform:rotateY(360deg)}
.face-tag{font-size:13.5px;font-weight:700;color:var(--soft)}
.face-word{font-family:var(--display);font-weight:700;font-size:clamp(25px,7.5vw,32px);text-align:center;line-height:1.2;overflow-wrap:anywhere}
.face-hint{position:absolute;bottom:10px;font-size:13.5px;color:var(--soft)}
.face-word.mid{font-size:24px}
.face-word.long{font-size:21px;line-height:1.3}
.face-ans{font-size:18px;text-align:center;line-height:1.4;max-width:46ch}
.face-src{font-size:14.5px;color:var(--soft);text-align:center;border-top:1px dashed var(--rule);padding-top:6px}
.rvsum{background:var(--sheet);border:1px dashed var(--box);border-radius:4px;padding:10px 12px;display:flex;flex-direction:column;gap:8px}
.rvsum-t{margin:0;font-size:14px}
.rv-clear{font-size:13px;color:var(--bad)}
.rvw{background:var(--sheet);border:1px solid var(--box);border-radius:4px;padding:12px;display:flex;flex-direction:column;gap:8px}
.rvw-t{margin:0;font-weight:700;color:var(--box);font-size:14.5px}
.ck{display:flex;gap:10px;align-items:flex-start;font-size:15px;cursor:pointer}
.ck input{width:22px;height:22px;flex:none;margin:0;accent-color:var(--box)}
.rv-note{width:100%;border:1px solid var(--rule);border-radius:4px;padding:8px 10px;background:var(--dock);color:var(--ink);font:14.5px/1.4 var(--ui)}
.rv-toggle{align-self:center;font-size:13.5px;margin-top:4px}

/* réglages */
.opts{display:flex;flex-direction:column;gap:9px}
.opt{display:grid;grid-template-columns:auto 1fr;column-gap:12px;align-items:center;text-align:left;background:var(--sheet);border:1px solid var(--rule);border-radius:4px;padding:12px 14px;cursor:pointer}
.opt.on{border-color:var(--box);box-shadow:inset 0 0 0 1px var(--box);background:var(--box-wash)}
.opt-e{grid-row:1/3;font-size:20px}
.opt-main{font-weight:700}
.opt-sub{font-size:13px;color:var(--soft)}
.paper{background:var(--sheet);border:1px dashed var(--box);border-radius:4px;padding:12px;display:flex;flex-direction:column;gap:8px}

/* quiz */
.qtop{display:flex;align-items:center;gap:10px}
.quit{width:34px;height:34px;flex:none;border-radius:50%;border:1px solid var(--rule);background:var(--sheet);cursor:pointer;color:var(--soft)}
.bar{flex:1;height:10px;border-radius:2px;background:var(--sheet);border:1px solid var(--rule);overflow:hidden}
.bar i{display:block;height:100%;background:var(--box);transition:width .3s}
.qn{font-size:13px;font-weight:700;color:var(--soft);font-variant-numeric:tabular-nums}
.badges{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.num{font-family:var(--display);font-weight:800;font-size:15px;background:var(--board);color:var(--crane);padding:2px 9px;border-radius:2px;font-variant-numeric:tabular-nums}
.chip{font-size:12px;font-weight:700;padding:3px 10px;border-radius:20px;background:var(--box-wash);color:var(--box)}
.ref{font-size:12px;color:var(--soft)}
.consigne{margin:0;font-size:14.5px;color:var(--soft)}
.qword{font-family:var(--display);font-weight:700;font-size:clamp(22px,6.5vw,28px);line-height:1.2;margin:0;overflow-wrap:anywhere}
.choice{padding:14px;border-radius:4px;border:1px solid var(--rule);background:var(--sheet);text-align:left;font-size:16px;font-weight:700;cursor:pointer}
.choice.sel{border-color:var(--box);box-shadow:inset 0 0 0 2px var(--box)}
.choice.good{background:var(--good-wash);border-color:var(--good);color:var(--good)}
.choice.bad{background:var(--bad-wash);border-color:var(--bad);color:var(--bad)}
.choice.good::before{content:"✓ "}.choice.bad::before{content:"✗ "}
.choice.off{opacity:.5}
.tinput{width:100%;padding:14px;border-radius:4px;border:1px solid var(--rule);background:var(--sheet);font:inherit;font-size:18px;font-weight:700;color:var(--ink)}
.tinput.good{background:var(--good-wash);border-color:var(--good)}
.tinput.bad{background:var(--bad-wash);border-color:var(--bad)}
.fb{padding:14px;border-radius:4px;border:1px solid var(--rule);display:flex;flex-direction:column;gap:6px}
.fb.ok{background:var(--good-wash);border-color:var(--good)}
.fb.no{background:var(--bad-wash);border-color:var(--bad)}
.fb-t{font-family:var(--display);font-weight:700;font-size:21px;margin:0}
.fb p{margin:0}
.fb-x{font-size:14px;color:var(--soft)}

/* résultats */
.scorebox{background:var(--board);border:4px solid var(--box);border-radius:4px;padding:18px;text-align:center}
.scorebox.rattr-box{border-color:var(--bad)}
.score-n{font-family:var(--display);font-weight:800;font-size:60px;line-height:1;color:var(--crane);font-variant-numeric:tabular-nums}
.score-n small{font-size:30px;color:#B9A256}
.score-note{display:inline-block;margin-top:8px;background:var(--crane);color:#16232E;font-weight:800;padding:4px 14px;border-radius:2px}
.rattr{display:block;margin-top:8px;font-size:13px;font-weight:700;color:#FF9A88}
.rev{display:flex;flex-direction:column;gap:9px}
.revcard{background:var(--sheet);border:1px solid var(--rule);border-left:4px solid var(--bad);border-radius:4px;padding:11px 12px;display:flex;flex-direction:column;gap:3px}
.revcard.ok{border-left-color:var(--good)}
.revcard p{margin:0;font-size:14.5px}
.rev-q{font-weight:700}
.rev-good{color:var(--good)}
.rev-x{font-size:13px!important;color:var(--soft)}

/* bilan */
.bilan{background:var(--sheet);border:1px solid var(--rule);border-radius:4px;padding:14px;display:flex;flex-direction:column;gap:10px}
.bilan h3{font-family:var(--display);font-size:21px;margin:0}
.bilan-lab{font-size:13px;font-weight:700;color:var(--soft);margin:4px 0 0}
.bilan ul{margin:0;padding-left:18px}
.bilan li{margin-bottom:4px;font-size:14.5px}
.bilan ul.forts li{color:var(--good)}
.bilan ul.work li{color:var(--bad)}
.bilan-tip{background:var(--box-wash);border-radius:4px;padding:10px 12px;font-size:14.5px;margin:0}
textarea.exportarea{width:100%;border:1px solid var(--rule);border-radius:4px;padding:10px;background:var(--dock);color:var(--ink);font:13px/1.45 var(--ui)}

/* scores */
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}
.stat{background:var(--board);border-radius:4px;padding:12px 6px;text-align:center}
.stat b{display:block;font-family:var(--display);font-size:30px;line-height:1;color:var(--crane);font-variant-numeric:tabular-nums}
.stat span{font-size:12px;color:#C9D3E0}
.attempt{background:var(--sheet);border:1px solid var(--rule);border-radius:4px;overflow:hidden}
.attempt-head{width:100%;display:flex;gap:10px;align-items:center;background:none;border:0;padding:12px;text-align:left;cursor:pointer}
.attempt-left{flex:1;min-width:0}
.attempt-left b{display:block;font-size:14.5px}
.attempt-left span{display:block;font-size:12px;color:var(--soft)}
.rattr-tag{display:inline-block;background:var(--bad);color:#fff;font-size:11px;font-weight:700;padding:1px 7px;border-radius:3px;margin-right:6px}
.attempt-note{flex:none;width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--display);font-weight:800;font-size:18px;color:var(--on-box)}
.attempt-note.good{background:var(--good)} .attempt-note.low{background:var(--bad)}
.attempt-body{padding:0 12px 12px;display:flex;flex-direction:column;gap:9px}
.confirm{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-weight:700;font-size:14px}
.mini{padding:9px 14px;border-radius:4px;border:1px solid var(--rule);background:var(--sheet);font-weight:700;cursor:pointer}
.mini.yes{background:var(--bad);border-color:var(--bad);color:#fff}

/* onglets */
.tabbar{position:fixed;left:0;right:0;bottom:0;z-index:5;background:var(--sheet);border-top:3px solid var(--box);padding-bottom:env(safe-area-inset-bottom,0px);padding-left:env(safe-area-inset-left,0px);padding-right:env(safe-area-inset-right,0px)}
.tabbar-in{max-width:640px;margin:0 auto;display:flex}
.tab{flex:1;background:none;border:0;padding:8px 2px 10px;display:flex;flex-direction:column;align-items:center;gap:1px;cursor:pointer;color:var(--soft)}
.tab-e{font-size:18px} .tab-l{font-size:11px;font-weight:700}
.tab.on{color:var(--box);background:var(--box-wash)}

/* voir mes erreurs : lisible sans les couleurs */
.dx-legend{display:flex;flex-wrap:wrap;gap:6px 14px;margin:0;font-size:13px;color:var(--soft)}
.dx-line{display:grid;grid-template-columns:104px minmax(0,1fr);gap:8px;align-items:baseline;margin:2px 0!important}
.dx-lab{font-size:12.5px!important;font-weight:700;color:var(--soft)}
.dx-ans{font-size:17px;font-weight:700;overflow-wrap:anywhere;letter-spacing:.3px;line-height:1.7}
.dx-bad{background:#A3241B;color:#fff;text-decoration:line-through;text-decoration-thickness:1px;border-radius:3px;padding:1px 2px}
.dx-good{background:#D4F0E1;color:#08402A;text-decoration:underline;text-decoration-thickness:1.5px;text-underline-offset:3px;border-radius:3px;padding:1px 2px;font-weight:800}
.dx-miss{display:inline-block;background:#A3241B;color:#fff;border-radius:3px;padding:0 4px;margin:0 1px;font-weight:800;font-size:14px;line-height:1.35;vertical-align:1px;text-decoration:none}
.dx-none{font-style:italic;font-weight:400;color:var(--soft)}
.dx-note{font-size:13.5px!important;font-weight:700}

@media (prefers-reduced-motion: reduce){.face,.bar i{transition:none}}
.tag.dico{background:var(--dico-wash);color:var(--dico);border:1px solid var(--dico)}
.def.dico{border-left:4px solid var(--dico);background:var(--dico-wash);padding:9px 10px 9px 12px;border-radius:0 14px 14px 0}
.tbl td.k{font-weight:600}
.def-term{font-family:var(--display)}
.score-n,.stat b{font-family:var(--display)}
.read sup{font-size:.7em}
a.cta.vlink{display:block;text-align:center;text-decoration:none}

.media{display:grid;grid-template-columns:1fr 1fr;gap:10px}.media.one{grid-template-columns:1fr}
.mbtn{display:flex;gap:10px;align-items:center;min-width:0;text-align:left;padding:10px;border:0;border-radius:4px;background:var(--board);color:#E9EEF2;cursor:pointer;font:inherit}
.mbtn-i{flex:none;width:40px;height:40px;border-radius:50%;background:var(--crane);color:var(--crane-ink);display:flex;align-items:center;justify-content:center;font-size:16px}
.mbtn-x{min-width:0}.mbtn b{display:block;font-family:var(--display);font-size:19px;line-height:1.1;color:#fff}.mbtn small{display:block;font-size:12.5px;color:#C9D3E0}
.mbtn.a{background:var(--box)}.mbtn.a .mbtn-i{background:var(--sheet);color:var(--box)}.mbtn.a small{color:var(--on-box);opacity:.85}.mbtn.a b{color:var(--on-box)}
.mbtn.a.on{box-shadow:inset 0 0 0 3px var(--crane)}
.mbtn.off{background:var(--gen-wash);border:1px dashed var(--gen);cursor:default}.mbtn.off b,.mbtn.off small{color:var(--gen)}.mbtn.off .mbtn-i{background:var(--rule);color:var(--soft)}
.aud-btn{display:flex;gap:12px;align-items:center;width:100%;text-align:left;padding:10px 12px;border:1px solid var(--box);border-radius:4px;background:var(--box-wash);color:var(--ink);cursor:pointer}
.aud-btn b{display:block;font-size:15.5px;color:var(--box)}.aud-btn small{display:block;font-size:12.5px;color:var(--soft)}
.aud-i{flex:none;width:38px;height:38px;border-radius:50%;background:var(--box);color:var(--on-box);display:flex;align-items:center;justify-content:center;font-size:17px}
.aud{border:1px solid var(--box);background:var(--box-wash);border-radius:4px;padding:10px 12px;display:flex;flex-direction:column;gap:8px}
.aud-t{margin:0;font-weight:700;font-size:15px;color:var(--box)}
.aud audio{width:100%;max-width:100%}
.aud-links{display:flex;flex-wrap:wrap;gap:8px}.aud-links .ghost{width:auto;flex:1 1 auto;text-align:center;text-decoration:none}
.aud-links .ghost.on{border-color:var(--box);box-shadow:inset 0 0 0 1px var(--box)}
a.aud-ext,.aud-links a.ghost{text-align:center;text-decoration:none;color:var(--ink)}
.caps-btns{display:flex;gap:6px}
.toc-v.toc-aud{background:var(--box);color:var(--on-box)}
.caps-play.aud{background:var(--box);color:var(--on-box);padding-left:0;font-size:17px;border-radius:50%}

:root{--p-ok:#3C9A44;--p-okdark:#1B5E20;--p-mid:#D07A00;--p-midsoft:#E8B35C;--p-low:#C62828;--p-lowsoft:#F1A9A0}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--p-ok:#7BD486;--p-okdark:#3FA34D;--p-mid:#F0A43A;--p-midsoft:#8A6A2E;--p-low:#FF8A80;--p-lowsoft:#7A3A35}}
:root[data-theme="dark"]{--p-ok:#7BD486;--p-okdark:#3FA34D;--p-mid:#F0A43A;--p-midsoft:#8A6A2E;--p-low:#FF8A80;--p-lowsoft:#7A3A35}
.toc-item{grid-template-columns:auto minmax(0,1fr) auto}
.pst{display:flex;flex-direction:column;align-items:center;gap:1px;min-width:62px}
.pring-t{font-family:var(--ui);font-size:11px;font-weight:700;fill:var(--ink)}
.pst-l{font-size:11px;font-weight:700;color:var(--soft);white-space:nowrap}
.pst-was{font-size:10.5px;color:var(--soft);white-space:nowrap}.pdrop{margin:2px 0 0;font-size:13.5px;border-left:3px solid var(--p-mid);padding:2px 0 2px 8px;border-radius:0}
.pst-ok{color:var(--p-okdark)}.pst-win{color:var(--p-ok)}.pst-low{color:var(--p-low)}.pst-mid{color:var(--p-mid)}
.pglob{display:flex;gap:14px;align-items:center;background:var(--sheet);border:1px solid var(--rule);border-radius:4px;padding:12px 14px}
.pglob .pring-t{font-size:13px}.pglob-x{display:flex;flex-direction:column;gap:2px;min-width:0}.pglob-x b{font-family:var(--display);font-size:19px;line-height:1.15}.pglob-x span{font-size:13px;color:var(--soft)}
.plegend{background:var(--sheet);border:1px solid var(--rule);border-radius:4px;padding:6px 12px;font-size:14px}.plegend p{margin:6px 0}
.pchap .pring,.pglob .pring,.pst .pring{flex:none}
.pchap{display:flex;gap:12px;align-items:center;border:1px solid var(--rule);border-radius:4px;padding:10px 12px;background:var(--dock)}
.pchap-x{display:flex;flex-direction:column;gap:4px;min-width:0}.pchap-x b{font-size:15px}.pchap-x span{font-size:13px;color:var(--soft)}.pchap-x .ghost{width:auto;align-self:flex-start}
.suivi{background:var(--sheet);border:1px solid var(--rule);border-radius:4px;padding:12px;display:flex;flex-direction:column;gap:10px}
.suivi h3{font-family:var(--display);font-size:20px;margin:4px 0 0}
.suivi-ctl{display:flex;flex-direction:column;gap:6px}.suivi-sel{font:inherit;font-size:15px;padding:8px;border:1px solid var(--rule);border-radius:4px;background:var(--dock);color:var(--ink);max-width:100%}
.suivi .ghost.on{border-color:var(--box);box-shadow:inset 0 0 0 1px var(--box);background:var(--box-wash)}
.ch-legend{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:12.5px;color:var(--soft)}.ch-legend span{display:flex;align-items:center;gap:5px}
.lg-line{display:inline-block;width:20px;height:2px;background:var(--box)}.lg-ring{display:inline-block;width:9px;height:9px;border-radius:50%;border:2px solid var(--good)}
.ch-wrap{overflow-x:auto;max-width:100%}.ch-svg{display:block}
.ch-t{font-family:var(--ui);font-size:11px;fill:var(--soft)}.ch-b{fill:var(--ink);font-weight:700;font-size:12px}.ch-g{fill:var(--good);font-weight:700}
.ch-pt{cursor:pointer}.ch-pt:focus{outline:none}.ch-pt:focus-visible circle,.ch-pt:focus-visible polygon,.ch-pt:focus-visible rect{stroke:var(--crane)}
.ch-detail{display:flex;flex-direction:column;gap:3px;border-left:3px solid var(--crane);padding:6px 10px;font-size:14px;border-radius:0}.ch-detail .ghost{width:auto;align-self:flex-start;margin-top:4px}
.heat table{font-size:13px}.heat th,.heat td{text-align:center;padding:5px 4px}.heat td.k{text-align:left;font-weight:700}
.hc{font-variant-numeric:tabular-nums;font-weight:700}.hc-ok{background:color-mix(in srgb,var(--p-ok) 18%,transparent)}.hc-mid{background:color-mix(in srgb,var(--p-mid) 18%,transparent)}.hc-low{background:color-mix(in srgb,var(--p-low) 18%,transparent)}.hc-0{color:var(--st)}
.resist p{margin:4px 0;font-size:14.5px;display:flex;gap:8px;align-items:baseline;flex-wrap:wrap}.resist .code{font-size:12px;min-width:0;padding:1px 6px}.resist small{color:var(--soft)}

.draft{border:2px solid var(--box);background:var(--box-wash);border-radius:14px;padding:12px 14px;margin:0 0 16px;display:grid;gap:10px}
.draft p{margin:0}.draft p b{display:block;font-size:18px}.draft p span{display:block;color:var(--soft);margin-top:2px}
.draft-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}.draft-row .cta{flex:1 1 180px;margin:0}
.draft.block{border-color:var(--bad)}.draft-stop b{color:var(--bad)}
.quitbox{margin-top:8px}.quitbox .cta,.quitbox .ghost{width:100%;margin:0}
.vframe video{position:absolute;inset:0;width:100%;height:100%;background:#000}
/* raccord avec les noms de couleurs du noyau (base.css) */
.head p{color:inherit}
:root{ --paper:var(--dock); --court:var(--box); --court-wash:var(--box-wash); --score:var(--crane); --jersey:var(--crane); --on-court:var(--on-box);
  --body:var(--ui); --focus:var(--crane); --scorebox-border:var(--box); --r-xl:4px; --r-l:4px; --r:4px; --r-m:4px; --r-s:4px; --r-xs:2px; }
`;

/* ============================================================
   LCA — TE 1 « Les Romains en Suisse » (Introduction du fascicule NEoLCA, éd. 2018-2019)
   Outil de révision de Livio — 10e HarmoS. Épreuve : vendredi 20 novembre 2026 (agenda : « LCA TE 1 CH romaine »).
   Onglet « Dossier » : un chapitre par objectif de la feuille « Objectifs TE LCA 1 » (11 objectifs),
   rangés dans les deux parties du manuel : 1.3 Les Romains en Suisse (objectifs 1 à 3), 1.4 Les voies de communication (4 à 11).
   ============================================================ */

const QUIZ_ID = "livio-quiz-lca-romains-suisse";
const DUE = { iso:"2026-11-20", long:"vendredi 20 novembre", short:"20.11" };
const THEME = "Les Romains en Suisse";
const BRANCHE = "LCA";
const HEAD = { code:"TE LCA", num:"I", titre:"Les Romains en Suisse", sous:"TE 1 · épreuve : " };
const SUBJECT_LONG = "LCA, TE 1 : les Romains en Suisse et les voies de communication";
const FILE_SLUG = "lca-romains-suisse-livio";
const VERSION = { n:1, date:"14.11.2026" };   /* v1 : 14.11.2026, première version : Dossier rangé comme la feuille d'objectifs (11 objectifs), fil rouge, 11 paquets de cartes, deux cartes schématiques, la Table de Peutinger dessinée */

/* ---------- SOURCES ----------
   Photos envoyées par le papa le 13.11.2026. Les pages du fascicule sans numéro visible sur la photo sont identifiées
   grâce à la feuille d'objectifs (« p. 8 », « p. 11 », « p. 14 ») : la source le dit (« déduit de la feuille d'objectifs »). */
const SOURCES = [
  { titre:"Feuille « Objectifs TE LCA 1 » (FFLO / LCA 10FR)", recue:"13.11.2026", contenu:"Les 11 objectifs, avec les pages du manuel ; notes de Livio : Alpes, Rhône, Rhin, Jura (obj. 2), « parce que ça entre dans la collection de M. Peutinger » (obj. 9), « navigation sur les lacs » (obj. 11). Chaque chapitre du Dossier recopie un objectif tel quel." },
  { titre:"Manuel p. 3 — panneau routier et borne milliaire", recue:"13.11.2026", contenu:"Photos 1 (panneau Bern, Lausanne, Neuchâtel) et 2 (borne milliaire) ; réponse de Livio corrigée : deux panneaux routiers, nom du créateur-sponsor de la route, nom d'une ville, chiffres en milliers de pas romains, 1 mille = 1,47 km. Le haut de la page (consigne a) est coupé sur la photo." },
  { titre:"Manuel p. 8 (déduit de la feuille d'objectifs) — Jeu de cartes, la Table de Peutinger", recue:"13.11.2026", contenu:"Konrad Peutinger, copie du XIIIe siècle, original du Ve siècle d'après Agrippa, 12 parchemins dont 11 restants, 6,80 m sur 34 cm, plus de 200'000 km de routes, itinéraires et distances, symboles. Note de classe : « humaniste »." },
  { titre:"Manuel p. 9 — 1.3 Les Romains en Suisse", recue:"13.11.2026", contenu:"58 av. J.-C. (« Étape 1 »), hypothèses du départ, texte de César sur les barrières naturelles (Guerre des Gaules 1, 2) avec la note « + les Alpes », César à Genève, Bibracte, texte de César sur ses raisons (Guerre des Gaules 1, 28, note « Bouclier »), Info-flash Jules César, note sur les Allobroges." },
  { titre:"Manuel p. 10 — Les Romains en Suisse (suite) et Bilan", recue:"13.11.2026", contenu:"52 av. J.-C., Vercingétorix, Alésia ; les deux colonies (« Étape 2 ») ; exercice 1 (vide) ; Pax Romana ; fin du IIIe siècle (« Étape 4 ») ; Ammien Marcellin ; Bilan, intégration dès 15 av. J.-C. (« Étape 3 », note « par l'empereur Auguste »)." },
  { titre:"Manuel p. 11 (déduit de la feuille d'objectifs) — tableau des sites et carte « La Suisse sous l'Empire romain »", recue:"13.11.2026", contenu:"Tableau nom actuel / nom ancien / spécificité, rempli et corrigé en classe (Martigny et Lausanne : lecture de la flèche rouge confirmée par le papa le 14.11.2026). Carte de Marco Zanoli (2006), annotée par Livio : JURA, ALPES, col Saint-Bernard (Summus Poeninus)." },
  { titre:"Manuel p. 12 — 1.4 Les voies de communication", recue:"13.11.2026", contenu:"Réseau performant, nœud routier nord-sud et est-ouest, les trois rôles des routes (note « 3 rôles des routes »), via Appia, via strata et sterno, note « Via, viae (f) = la route ; via = en passant par », illustration « Construction d'une voie romaine »." },
  { titre:"Manuel p. 13 — routes des Helvètes, Pierre Pertuis, exercice 1", recue:"13.11.2026", contenu:"Routes de gravier sur un lit de cailloux, gués, ponts, roche creusée au col de Pierre Pertuis. L'exercice 1 (inscription) et la case « Petra pertusa » sont vides : aucune question." },
  { titre:"Manuel p. 14 (déduit de la feuille d'objectifs) — col du Grand-Saint-Bernard et grandes voies", recue:"13.11.2026", contenu:"Col du Grand-Saint-Bernard aménagé pour les légions ; deux grandes voies d'est en ouest, l'axe nord-sud par Aventicum, la route Genève-Bâle au pied du Jura ; encadré Vy d'Etraz et voie de Bevaix (mis de côté)." },
  { titre:"Manuel p. 15 — itineraria, bornes milliaires, voies navigables", recue:"13.11.2026", contenu:"Exercice 2, itineraria, relais et gîtes, Table de Peutinger, bornes milliaires et caput viae, Info-flash cursus publicus, voies navigables (Rhin, Rhône), chalands (note « chalands = bateau à fond plat »), port d'Avenches, nautes." },
];
const SOURCES_NOTE = "Les pages dont le numéro n'est pas visible sur la photo (p. 8, p. 11, p. 14) sont identifiées grâce à la feuille d'objectifs. Manque : la p. 7 (l'image de la Table de Peutinger, objectif 9) et la p. 2 (carte citée par l'exercice 2 de la p. 15) ; le haut de la p. 3 est coupé. Mis de côté (pas dans les objectifs) : les premiers contacts près d'Aix-en-Provence, la liste des apports romains du Bilan, l'inscription de Pierre Pertuis, la Vy d'Etraz, le canal d'Avenches. Aucune question sur les cases vides (exercice 1 p. 10, exercice 1 et « Petra pertusa » p. 13). La feuille d'objectifs appelle la via Appia « la plus ancienne voie romaine », le livre « la mieux conservée et la plus célèbre » : les deux sont donnés, chacun avec sa source.";
const PHOTOS = [];

/* Capsules : pas encore réalisées (le papa les fera à partir de l'export JSON). null = « Vidéo bientôt disponible ». */
const VIDEOS = { LIENS:null, O1:null, O2:null, O3:null, O4:null, O5:null, O6:null, O7:null, O8:null, O9:null, O10:null, O11:null };
const AUDIOS = {};
const CAPSULES = { titre:THEME, controle:DUE.long, consigne:"", diffusion:"", chapitres:[] };

const CHAPTERS = [
  { key:"R", titre:"Les Romains en Suisse", sous:"Objectifs 1 à 3 · manuel pp. 9 à 11", objLabel:"Objectifs TE LCA 1" },
  { key:"V", titre:"Les voies de communication", sous:"Objectifs 4 à 11 · manuel pp. 3, 8, 11 à 15", objLabel:"Objectifs TE LCA 1" },
];

/* ---------- SCHÉMAS SVG (dessinés pour le Dossier, d'après la carte de la p. 11 ; pas à l'échelle) ---------- */
const P_PAGE = { ink:"var(--ink)", soft:"var(--soft)", rule:"var(--rule)", sheet:"var(--sheet)", box:"var(--box)", wash:"var(--box-wash)",
  crane:"var(--crane)", land:"var(--land)", lake:"var(--r2)", road:"var(--box)", font:"'Fira Sans', system-ui, sans-serif" };
/* P_FIXE : couleurs fixes pour l'export JSON (export-dossier.py) */
const P_FIXE = { ink:"#24211D", soft:"#5F5850", rule:"#CFC9BE", sheet:"#FFFFFF", box:"#8A3324", wash:"#F3E2DC",
  crane:"#C8962E", land:"#E9E4D6", lake:"#2F5D8C", road:"#8A3324", font:"Arial, Helvetica, sans-serif" };
const svgEsc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const mX = lon => +(18 + (lon - 5.9) * 72).toFixed(1), mY = lat => +(14 + (47.9 - lat) * 105).toFixed(1);
const mPath = pts => "M" + pts.map(([lo, la]) => mX(lo) + "," + mY(la)).join("L");
const LACS = [
  [[6.15,46.21],[6.3,46.38],[6.5,46.45],[6.63,46.51],[6.9,46.46],[6.93,46.4],[6.75,46.4],[6.5,46.37],[6.3,46.3]],
  [[6.64,46.79],[6.95,47.03],[7.0,47.0],[6.68,46.76]],
  [[7.05,46.93],[7.1,46.96],[7.13,46.92],[7.08,46.9]],
  [[9.0,47.75],[9.5,47.56],[9.72,47.5],[9.6,47.46],[9.2,47.62],[9.0,47.7]],
];
const RHIN = [[9.0,47.69],[8.6,47.6],[8.22,47.58],[7.72,47.55],[7.59,47.57],[7.56,47.9]];
const RHONE_HAUT = [[8.4,46.55],[7.9,46.3],[7.35,46.22],[7.07,46.11],[6.95,46.25],[6.92,46.39]];
const RHONE_BAS = [[6.14,46.2],[5.98,46.14],[5.9,46.1]];
const SITES = [
  ["Nyon",6.24,46.38,-6,-6,"end"],["Genève",6.14,46.2,4,13,"middle"],["Lausanne",6.63,46.52,0,-8,"middle"],["Orbe",6.53,46.72,-6,3,"end"],
  ["Yverdon",6.64,46.78,-6,-5,"end"],["Colombier",6.86,46.97,5,-6,"start"],["Avenches",7.04,46.88,7,4,"start"],["Augst",7.72,47.53,0,-8,"middle"],
  ["Windisch",8.22,47.48,6,10,"start"],["Martigny",7.07,46.1,7,4,"start"],
];
function svgBase(P, titre, H = 262){
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 ${H}" role="img" aria-label="${svgEsc(titre)}">`;
  s += `<rect x="0" y="0" width="360" height="${H}" rx="4" style="fill:${P.sheet};stroke:${P.rule}"/>`;
  /* les Alpes (zone hachurée) et le Jura (bande) */
  s += `<defs><pattern id="alp" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" style="stroke:${P.soft};stroke-width:1;opacity:.35"/></pattern></defs>`;
  s += `<path d="${mPath([[7.0,46.62],[8.0,46.78],[9.2,46.95],[10.4,46.95],[10.4,45.78],[6.8,45.78],[6.85,46.3]])}Z" style="fill:url(#alp)"/>`;
  s += `<path d="${mPath([[5.95,46.32],[6.3,46.64],[6.75,46.98],[7.2,47.24],[7.7,47.37],[8.15,47.43]])}" style="fill:none;stroke:${P.land};stroke-width:16;stroke-linecap:round;stroke-linejoin:round"/>`;
  s += `<path d="${mPath([[5.95,46.32],[6.3,46.64],[6.75,46.98],[7.2,47.24],[7.7,47.37],[8.15,47.43]])}" style="fill:none;stroke:${P.soft};stroke-width:1;stroke-dasharray:2 3"/>`;
  LACS.forEach(l => { s += `<path d="${mPath(l)}Z" style="fill:${P.lake};opacity:.55"/>`; });
  [RHIN, RHONE_HAUT, RHONE_BAS].forEach(r => { s += `<path d="${mPath(r)}" style="fill:none;stroke:${P.lake};stroke-width:2.4;stroke-linecap:round"/>`; });
  const t = (x, y, txt, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || "middle"}" style="font-family:${P.font};font-size:${o.size || 10}px;font-weight:${o.w || 400};fill:${o.c || P.ink};${o.it ? "font-style:italic;" : ""}${o.sp ? "letter-spacing:" + o.sp + "px;" : ""}">${svgEsc(txt)}</text>`;
  s += t(10, mY(47.15), "JURA", { a:"start", size:11, w:700, c:P.soft, sp:3 });
  s += t(mX(8.7), mY(46.35), "ALPES", { size:13, w:700, c:P.soft, sp:4 });
  s += t(mX(8.4), mY(47.1), "Plateau", { size:10, c:P.soft, it:true });
  s += t(mX(8.6), mY(47.6) - 6, "Rhin", { size:10, c:P.lake, w:700, it:true });
  s += t(mX(7.75), mY(46.3) - 4, "Rhône", { size:10, c:P.lake, w:700, it:true });
  s += t(mX(6.55), mY(46.43) + 2, "Léman", { size:8.5, c:P.sheet, it:true });
  return { s, t };
}
function svgSites(P){
  let { s, t } = svgBase(P, "Carte schématique : les quatre barrières naturelles et les dix sites romains");
  SITES.forEach(([n, lo, la, dx, dy, a]) => { const x = mX(lo), y = mY(la);
    s += `<rect x="${x - 3}" y="${y - 3}" width="6" height="6" style="fill:${P.road};stroke:${P.sheet};stroke-width:1"/>` + t(x + dx, y + dy, n, { a, size:9.5, w:700 }); });
  s += t(8, 244, "Schéma d'après la carte p. 11, pas à l'échelle.", { a:"start", size:9, c:P.soft }) + t(8, 255, "Hachures : les Alpes ; bande grise : le Jura.", { a:"start", size:9, c:P.soft });
  return s + `</svg>`;
}
const ROUTES = [
  { nom:"Tarnaiae → Genava, le long du Léman", pts:[[6.99,46.24],[6.92,46.42],[6.63,46.52],[6.24,46.38],[6.14,46.2]], dash:"" },
  { nom:"Brigantium → Augusta Raurica", pts:[[9.75,47.5],[9.4,47.47],[8.75,47.5],[8.22,47.48],[7.72,47.53]], dash:"" },
  { nom:"Axe nord-sud par Aventicum", pts:[[7.72,47.53],[7.25,47.15],[7.04,46.88],[6.8,46.66],[6.86,46.46],[7.07,46.1],[7.17,45.87]], dash:"6 3" },
  { nom:"Route plus modeste Genève → Bâle, au pied du Jura", pts:[[6.14,46.2],[6.53,46.72],[6.64,46.78],[7.0,47.05],[7.45,47.22],[7.59,47.56]], dash:"1.5 3" },
];
function svgVoies(P){
  let { s, t } = svgBase(P, "Carte schématique : les grandes voies, le col du Grand-Saint-Bernard et les voies navigables", 304);
  ROUTES.forEach(r => { s += `<path d="${mPath(r.pts)}" style="fill:none;stroke:${P.road};stroke-width:2;stroke-linecap:round;stroke-linejoin:round${r.dash ? ";stroke-dasharray:" + r.dash : ""}"/>`; });
  [["Genava",6.14,46.2,4,13,"middle"],["Aventicum",7.04,46.88,7,4,"start"],["Augusta Raurica",7.72,47.53,-4,-7,"end"],["Tarnaiae",6.99,46.24,6,8,"start"],["Brigantium",9.75,47.5,-2,12,"end"]].forEach(([n, lo, la, dx, dy, a]) => {
    const x = mX(lo), y = mY(la); s += `<circle cx="${x}" cy="${y}" r="3" style="fill:${P.sheet};stroke:${P.ink};stroke-width:1.2"/>` + t(x + dx, y + dy, n, { a, size:9, w:700, it:true }); });
  const gx = mX(7.17), gy = mY(45.87);
  s += `<polygon points="${gx},${gy - 6} ${gx + 6},${gy + 4} ${gx - 6},${gy + 4}" style="fill:${P.crane};stroke:${P.ink};stroke-width:1"/>` + t(gx + 9, gy + 3, "col du Grand-Saint-Bernard", { a:"start", size:9, w:700 });
  s += `<path d="M${mX(7.56)},${mY(47.62)} L${mX(7.56)},18" style="stroke:${P.lake};stroke-width:2"/><polygon points="${mX(7.56) - 4},22 ${mX(7.56) + 4},22 ${mX(7.56)},14" style="fill:${P.lake}"/>` + t(mX(7.56) + 6, 22, "vers la mer du Nord", { a:"start", size:9, c:P.lake, w:700 });
  s += `<polygon points="10,${mY(46.1) - 4} 10,${mY(46.1) + 4} 3,${mY(46.1)}" style="fill:${P.lake}"/>` + t(6, mY(46.1) + 14, "vers la Méditerranée", { a:"start", size:9, c:P.lake, w:700 });
  ROUTES.forEach((r, i) => { const y = 252 + i * 12;
    s += `<line x1="10" y1="${y - 3}" x2="36" y2="${y - 3}" style="stroke:${P.road};stroke-width:2${r.dash ? ";stroke-dasharray:" + r.dash : ""}"/>` + t(40, y, ["Tarnaiae → Genava", "Brigantium → Aug. Raurica", "nord-sud par Aventicum", "Genève → Bâle (pied du Jura)"][i], { a:"start", size:8.5 }); });
  s += t(8, 298, "D'après le livre pp. 14-15 et la carte p. 11, pas à l'échelle.", { a:"start", size:8.5, c:P.soft });
  return s + `</svg>`;
}
function svgPeutinger(P){
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 118" role="img" aria-label="Les douze parchemins de la Table de Peutinger, dont le premier a disparu">`;
  const w = 27, x0 = 8;
  for (let i = 0; i < 12; i++){
    const x = x0 + i * (w + 1.5);
    s += `<rect x="${x}" y="30" width="${w}" height="30" rx="2" style="fill:${i ? P.wash : P.sheet};stroke:${i ? P.box : P.soft};stroke-width:1.2${i ? "" : ";stroke-dasharray:3 2"}"/>`;
    s += `<text x="${x + w / 2}" y="49" text-anchor="middle" style="font-family:${P.font};font-size:10px;font-weight:700;fill:${i ? P.ink : P.soft}">${i + 1}</text>`;
  }
  s += `<line x1="${x0}" y1="30" x2="${x0 + w}" y2="60" style="stroke:${P.soft};stroke-width:1.2"/><line x1="${x0 + w}" y1="30" x2="${x0}" y2="60" style="stroke:${P.soft};stroke-width:1.2"/>`;
  s += `<text x="${x0}" y="22" style="font-family:${P.font};font-size:10px;fill:${P.soft}">1er parchemin (extrémité ouest) : disparu</text>`;
  const a = x0 + w + 1.5, b = x0 + 12 * (w + 1.5) - 1.5;
  s += `<line x1="${a}" y1="72" x2="${b}" y2="72" style="stroke:${P.ink};stroke-width:1"/><line x1="${a}" y1="67" x2="${a}" y2="77" style="stroke:${P.ink}"/><line x1="${b}" y1="67" x2="${b}" y2="77" style="stroke:${P.ink}"/>`;
  s += `<text x="${(a + b) / 2}" y="90" text-anchor="middle" style="font-family:${P.font};font-size:11px;font-weight:700;fill:${P.ink}">11 parchemins : 6,80 m de long, 34 cm de large</text>`;
  s += `<text x="${(a + b) / 2}" y="106" text-anchor="middle" style="font-family:${P.font};font-size:10px;fill:${P.soft}">plus de 200'000 km de routes · dessin pas à l'échelle</text>`;
  return s + `</svg>`;
}
const SVGS = { sites:svgSites, voies:svgVoies, peutinger:svgPeutinger };

/* ---------- Petits gabarits HTML (repris du modèle d'histoire) ---------- */
const tbl = (head, rows, note) => `<div class="tbl"><table><thead><tr>${head.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map((c, i) => `<td${i === 0 ? ' class="k"' : ""}>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>${note ? `<p class="fine">${note}</p>` : ""}`;
const chain = steps => `<div class="chain">${steps.map(([b, t, c]) => `<div class="step"><span class="step-bar" style="background:${c}"></span><div class="step-body"><b>${b}</b><span>${t}</span></div></div>`).join("")}</div>`;
const tiles = (items, note) => `<div class="sect6">${items.map(([b, t]) => `<div class="sx"><b>${b}</b><span>${t}</span></div>`).join("")}</div>${note ? `<p class="fine">${note}</p>` : ""}`;

/* ============================================================
   DOSSIER — un chapitre par objectif de la feuille « Objectifs TE LCA 1 »
   ============================================================ */
const PAGES = [
/* ---------------- FIL ROUGE ---------------- */
{ id:"LIENS", ch:"", titre:"Le fil rouge de l'épreuve", court:"Rome arrête les Helvètes, s'installe chez eux, puis relie tout par ses routes",
  pre:[{ q:"Pourquoi César renvoie-t-il les Helvètes chez eux au lieu de les laisser partir ?", a:"Pour que les Germains ne viennent pas s'installer sur leurs terres et devenir les voisins des Romains : les Helvètes servent de « bouclier ».", s:"Livre p. 9 · note de classe « Bouclier »" }, { q:"Selon ton livre, quel « précieux héritage romain » a rendu la romanisation possible ?", a:"Les voies de communication.", s:"Livre p. 12, première phrase" }],
  blank:{ consigne:"Sur une feuille blanche, raconte toute l'histoire en cinq phrases, avec une date ou un nom dans chacune.", points:["58 av. J.-C. : César arrête les Helvètes (Genève, Bibracte) et les renvoie chez eux, comme un bouclier contre les Germains", "César fonde deux colonies : Julia Equestris (Nyon) et Raurica (Augst)", "15 av. J.-C. : les Helvètes sont intégrés dans l'Empire romain (Auguste)", "Les routes, les relais, les bornes, les lacs et les fleuves font du territoire un carrefour nord-sud et est-ouest", "Dès la fin du IIIe siècle : invasions, épidémies, catastrophes, le territoire est dévasté"], s:"Livre pp. 9-10, 12, 15 · notes de classe" },
  blocks:[
  { t:"p", s:"Livre pp. 9-10 et p. 12 · feuille d'objectifs", h:"Tout ton TE raconte une seule histoire, en deux temps. <b>D'abord Rome s'installe</b> : César arrête les Helvètes, les renvoie chez eux, fonde des colonies, puis Auguste les intègre dans l'Empire. <b>Ensuite Rome relie</b> : routes pavées, cols, relais, bornes, cartes, lacs et fleuves. Ton livre le dit en une phrase : la romanisation n'aurait pas été possible sans un « précieux héritage romain : les voies de communication »." },
  { t:"html", s:"Feuille d'objectifs · livre pp. 9-15", h:`<div class="trio">
    <div class="trio-s"><span class="trio-k">1</span><div><b>Rome s'installe chez les Helvètes</b><p>Les 4 étapes, les 4 barrières naturelles, les 10 sites romains.</p><div class="chips"><button data-act="page" data-v="O1">O1 étapes</button><button data-act="page" data-v="O2">O2 barrières</button><button data-act="page" data-v="O3">O3 sites</button></div></div></div>
    <div class="trio-s"><span class="trio-k">2</span><div><b>Rome relie : les routes</b><p>Le carrefour nord-sud et est-ouest, le Grand-Saint-Bernard, les rôles des routes, la via Appia.</p><div class="chips"><button data-act="page" data-v="O4">O4 carrefour</button><button data-act="page" data-v="O5">O5 col</button><button data-act="page" data-v="O6">O6 rôles</button><button data-act="page" data-v="O7">O7 via Appia</button></div></div></div>
    <div class="trio-s"><span class="trio-k">3</span><div><b>Se repérer et voyager</b><p>Relais et bornes milliaires, la Table de Peutinger, et l'eau : Rhin, Rhône, chalands.</p><div class="chips"><button data-act="page" data-v="O8">O8 relais, bornes</button><button data-act="page" data-v="O9">O9 Peutinger</button><button data-act="page" data-v="O10">O10 fleuves</button><button data-act="page" data-v="O11">O11 chaland</button></div></div></div></div>` },
  { t:"h3", h:"Les liens à savoir faire" },
  { t:"links", s:"Livre pp. 9, 10, 12, 14, 15 · tableau des sites", items:[
    [["O1","O2"], "César peut bloquer les Helvètes parce que leur territoire est fermé par la nature : il coupe le seul pont sur le Rhône, à Genève."],
    [["O1","O3"], "Les deux colonies de l'étape 2 sont deux de tes dix sites : Julia Equestris (Nyon) et Augusta Raurica (Augst)."],
    [["O2","O4"], "Les mêmes montagnes qui enferment les Helvètes obligent à passer par des cols : c'est pour cela que le territoire devient un lieu de passage."],
    [["O5","O3"], "Le col du Grand-Saint-Bernard débouche à Martigny (Forum Claudii Vallensium)."],
    [["O10","O3"], "Genève, Lausanne et Yverdon sont des ports : ils sont sur les voies navigables du Léman et du lac de Neuchâtel."]] },
  { t:"pause", q:"Quels sont les deux temps de l'histoire de ton TE ?", a:"D'abord Rome s'installe chez les Helvètes (étapes, colonies, intégration), ensuite Rome relie tout par ses voies de communication.", s:"Livre pp. 9-10 et p. 12" },
  { t:"svg", k:"sites", titre:"Les barrières naturelles et les dix sites", alt:"Carte schématique : le Rhin au nord, le Jura au nord-ouest, le Léman et le Rhône au sud-ouest, les Alpes au sud et à l'est ; les dix sites sur le Plateau, au bord des lacs et près du Rhin.", s:"Carte « La Suisse sous l'Empire romain », p. 11 (déduit de la feuille d'objectifs) · tableau des sites" },
  { t:"tip", h:"Si une question te surprend à l'épreuve, demande-toi d'abord dans quel temps elle se trouve : « Rome s'installe » (dates, colonies, sites) ou « Rome relie » (routes, bornes, cartes, eau). Tu retrouveras plus vite le bon chapitre dans ta tête." },
]},

/* ---------------- O1 ---------------- */
{ id:"O1", ch:"R", titre:"Les 4 étapes de la romanisation", court:"58 av. J.-C., les colonies de César, 15 av. J.-C., la fin du IIIe siècle",
  obj:"Décrire les 4 étapes importantes de la romanisation de la Suisse (manuel p. 9-10 (éléments soulignés et rajoutés)).",
  pre:[{ q:"Où César bat-il les Helvètes en 58 av. J.-C. : à Bibracte ou à Alésia ?", a:"À Bibracte. Alésia, c'est en 52 av. J.-C., contre Vercingétorix.", s:"Livre p. 9 et p. 10" }, { q:"Quel empereur intègre les Helvètes dans l'Empire en 15 av. J.-C. ?", a:"L'empereur Auguste.", s:"Livre p. 10, Bilan · note de classe" }],
  blank:{ consigne:"Écris les 4 étapes dans l'ordre, chacune avec sa date et un fait.", points:["Étape 1 : 58 av. J.-C., 368'000 Helvètes partent ; César coupe le pont de Genève, les bat à Bibracte et les renvoie chez eux", "Étape 2 : César, qui se méfie de leur loyauté, fonde deux colonies (Julia Equestris, Raurica)", "Étape 3 : dès 15 av. J.-C., intégration dans l'Empire romain, par l'empereur Auguste", "Étape 4 : dès la fin du IIIe siècle, invasions barbares, épidémies, catastrophes naturelles : le territoire est dévasté"], s:"Livre pp. 9-10 · notes « Étape 1 à 4 »" },
  blocks:[
  { t:"html", s:"Livre pp. 9-10, passages surlignés et notes « Étape 1 » à « Étape 4 »", h:chain([
    ["Étape 1 · 58 av. J.-C.", "Les Helvètes partent vers le sud ; César les bat à Bibracte et les renvoie chez eux.", "var(--r1)"],
    ["Étape 2 · colonies", "César, méfiant, fonde deux colonies : Julia Equestris et Raurica.", "var(--r2)"],
    ["Étape 3 · 15 av. J.-C.", "Les Helvètes sont intégrés dans l'Empire romain (l'empereur Auguste).", "var(--r3)"],
    ["Étape 4 · fin du IIIe siècle", "Invasions barbares, épidémies, catastrophes naturelles : le territoire est dévasté.", "var(--r4)"]]) },
  { t:"h3", h:"Étape 1 : 58 av. J.-C., César renvoie les Helvètes" },
  { t:"p", s:"Livre p. 9", h:"En <b>58 av. J.-C.</b>, <b>368'000 Helvètes</b> brûlent leurs villes et partent vers le sud. Pourquoi ? Deux hypothèses : la <b>pression de peuples germaniques</b> ou l'<b>exiguïté</b> (= le territoire est trop serré). <b>César</b> arrive avant eux à <b>Genève</b> et <b>coupe le seul pont qui permet de franchir le Rhône</b>. Après quelques batailles, il les <b>vainc à Bibracte</b> et renvoie les survivants chez eux." },
  { t:"p", s:"Livre p. 9, César, Guerre des Gaules 1, 28 · note de classe « Bouclier »", h:"Pourquoi ? César ne veut pas laisser ce territoire vide : il craint que les <b>Germains</b>, attirés par la qualité des terres, s'y installent et deviennent les <b>voisins des Romains</b>. Les Helvètes servent donc de <b>bouclier</b>." },
  { t:"p", s:"Livre p. 10 · note « Guerre des Gaules de -58 à -52 »", h:"En <b>52 av. J.-C.</b>, quelques Helvètes suivent <b>Vercingétorix</b> ; vaincus devant <b>Alésia</b>, ils sont renvoyés chez eux pour les mêmes raisons. C'est la fin de la <i>Guerre des Gaules</i> (58-52 av. J.-C.), racontée par César lui-même." },
  { t:"pause", q:"Pourquoi dit-on que les Helvètes servent de « bouclier » ?", a:"César les renvoie chez eux pour que les Germains ne s'installent pas sur leurs terres et ne deviennent pas les voisins des Romains.", s:"Livre p. 9 · note « Bouclier »" },
  { t:"h3", h:"Étape 2 : deux colonies" },
  { t:"p", s:"Livre p. 10, passages surlignés", h:"<b>Se méfiant de leur loyauté, César fonde deux colonies</b> : la <b>Colonia Julia Equestris</b>, sur le territoire de <b>Nyon</b>, et <b>Raurica</b>, qui bloque le passage entre le Rhin et le Jura. Sous Auguste, elle devient la <b>Colonia Augusta Raurica</b> (Augst)." },
  { t:"h3", h:"Étape 3 : l'intégration, dès 15 av. J.-C." },
  { t:"p", s:"Livre p. 10, Bilan · note « par l'empereur Auguste »", h:"<b>Dès 15 av. J.-C.</b>, les Helvètes et leurs voisins sont <b>intégrés dans l'Empire romain</b>, par l'<b>empereur Auguste</b>. Aux II<sup>e</sup> et III<sup>e</sup> siècles, c'est la <i>Pax Romana</i>." },
  { t:"h3", h:"Étape 4 : la fin du IIIe siècle" },
  { t:"p", s:"Livre p. 10, passages surlignés", h:"<b>Dès la fin du III<sup>e</sup> siècle</b>, les <b>invasions barbares</b>, des <b>épidémies</b> et des <b>catastrophes naturelles</b> font vaciller l'Empire : le territoire est <b>petit à petit dévasté</b>." },
  { t:"pause", q:"Quelles sont les deux dates à ne pas confondre : 58 et 52 av. J.-C. ?", a:"58 av. J.-C. : départ des Helvètes, défaite à Bibracte. 52 av. J.-C. : quelques Helvètes suivent Vercingétorix, défaite à Alésia.", s:"Livre p. 9 et p. 10" },
  { t:"tip", h:"Phrase-modèle : « Étape 1 : en 58 av. J.-C., César bat les Helvètes à Bibracte et les renvoie chez eux comme un bouclier contre les Germains. » Pour chaque étape, donne le numéro, la date, qui agit et ce qui se passe. Attention : dans ton livre, l'étape 4 est écrite avant l'étape 3 ; à l'épreuve, raconte-les dans l'ordre des dates." },
  { t:"see", ids:["O2","O3"] },
  { t:"src", h:"Livre pp. 9-10 (passages surlignés, notes « Étape 1 » à « Étape 4 », « Bouclier », « Guerre des Gaules de -58 à -52 », « par l'empereur Auguste »)" },
]},

/* ---------------- O2 ---------------- */
{ id:"O2", ch:"R", titre:"Les 4 barrières naturelles", court:"Le Rhin, le Jura, le Rhône avec le Léman, et les Alpes",
  obj:"Présenter les 4 barrières naturelles du territoire des Helvètes et savoir les placer sur une carte (manuel p. 9 et 11).",
  pre:[{ q:"Selon César, quelle barrière sépare les Helvètes des Germains ?", a:"Le Rhin, « très large et très profond ».", s:"Livre p. 9, César, Guerre des Gaules 1, 2" }, { q:"Quelle barrière la classe a-t-elle ajoutée au texte de César ?", a:"Les Alpes.", s:"Livre p. 9, note « + les Alpes !!! » · feuille d'objectifs" }],
  blank:{ consigne:"Dessine un rectangle pour le territoire des Helvètes et place les 4 barrières autour, avec ce qu'elles séparent.", points:["Au nord : le Rhin, très large et très profond, sépare les Helvètes des Germains", "Au nord-ouest : le Jura, une montagne très élevée, entre les Helvètes et les Séquanes", "Au sud-ouest : le lac Léman et le Rhône, entre la province romaine et les Helvètes", "Au sud et à l'est : les Alpes (ajoutées en classe)"], s:"Livre p. 9 · carte annotée p. 11" },
  blocks:[
  { t:"p", s:"Livre p. 9, César, Guerre des Gaules 1, 2 (titre noté en classe : « Barrières naturelles du territoire »)", h:"César écrit que les Helvètes sont « de toutes parts enfermés par la nature des lieux ». Il cite trois barrières, et ta classe en a ajouté une quatrième." },
  { t:"html", s:"Livre p. 9 (texte de César, mots soulignés) · note « + les Alpes !!! » · feuille d'objectifs (Alpes, Rhône, Rhin, Jura)", h:tbl(["Barrière","Ce que dit le texte"], [
    ["<b>Le Rhin</b>","Son cours très large et très profond sépare le territoire helvète des <b>Germains</b>."],
    ["<b>Le Jura</b>","Une montagne très élevée, entre les Helvètes et les <b>Séquanes</b>."],
    ["<b>Le lac Léman et le Rhône</b>","Ils séparent la <b>province romaine</b> du territoire des Helvètes."],
    ["<b>Les Alpes</b>","Ajoutées en classe : elles ne sont pas dans le texte de César."]]) },
  { t:"pause", q:"Entre quels peuples se dresse le Jura ?", a:"Entre les Helvètes et les Séquanes.", s:"Livre p. 9, texte de César" },
  { t:"h3", h:"Les placer sur la carte" },
  { t:"svg", k:"sites", titre:"Les quatre barrières autour du Plateau", alt:"Le Rhin au nord, le Jura au nord-ouest, le Léman et le Rhône au sud-ouest, les Alpes au sud et à l'est.", s:"Carte p. 11 (déduit de la feuille d'objectifs), annotée « JURA » et « ALPES »" },
  { t:"p", s:"Carte p. 11 annotée par Livio", h:"Sur ta carte, tu as écrit <b>JURA</b> au nord-ouest et <b>ALPES</b> au centre et au sud. Le <b>Rhin</b> coule au nord (Augusta Raurica, Vindonissa sont tout près). Le <b>Rhône</b> traverse le Léman à <b>Genava</b> (Genève), au sud-ouest." },
  { t:"pause", q:"Sur la carte, où se trouve le Rhin par rapport au territoire des Helvètes ?", a:"Au nord.", s:"Carte p. 11" },
  { t:"tip", h:"Phrase-modèle : « Au nord, le Rhin sépare les Helvètes des Germains ; au nord-ouest, le Jura les sépare des Séquanes ; au sud-ouest, le Léman et le Rhône les séparent de la province romaine ; au sud et à l'est, les Alpes. » Une barrière = un lieu sur la carte + ce qu'elle sépare." },
  { t:"see", ids:["O1","O10"] },
  { t:"src", h:"Livre p. 9 (texte de César) · carte p. 11 · feuille d'objectifs" },
]},

/* ---------------- O3 ---------------- */
{ id:"O3", ch:"R", titre:"Les 10 sites romains", court:"Nom actuel, nom latin et spécificité de chaque site",
  obj:"Mentionner les 10 sites romains vus au cours (manuel p. 11). Pouvoir : associer les noms actuels à des points sur une carte ; associer les noms actuels à leur noms latins (donnés au TE) ; dire « la spécificité » de chaque site (noté en cours).",
  pre:[{ q:"Quel site était la capitale de l'Helvétie romaine ?", a:"Avenches, Aventicum.", s:"Tableau des sites, corrigé en classe" }, { q:"Combien de tes dix sites sont des ports ?", a:"Trois : Lausanne, Genève et Yverdon.", s:"Tableau des sites, corrigé en classe" }],
  blank:{ consigne:"Recopie le tableau de mémoire : nom actuel, nom latin, spécificité, pour les dix sites.", points:["Nyon · Colonia Julia Equestris · colonie", "Augst · Colonia Augusta Raurica · colonie", "Avenches · Aventicum · capitale de l'Helvétie romaine", "Martigny · Forum Claudii Vallensium · débouché du col du Grand-Saint-Bernard", "Lausanne · Lousonna · port ; Genève · Genava · port ; Yverdon · Eburodunum · port", "Orbe · Urba · mosaïque", "Villa de Colombier · villa (= ferme)", "Windisch · Vindonissa · camp militaire romain"], s:"Tableau des sites, p. 11 (déduit de la feuille d'objectifs)" },
  blocks:[
  { t:"p", s:"Feuille d'objectifs, objectif 3", h:"Au TE, les <b>noms latins te seront donnés</b> : tu dois savoir les relier aux noms actuels, placer les sites sur une carte et donner la <b>spécificité</b> de chacun, celle notée en cours." },
  { t:"html", s:"Tableau des sites, p. 11 (déduit de la feuille d'objectifs), rempli et corrigé en classe ; Martigny et Lausanne : lecture de la flèche rouge confirmée par le papa", h:tbl(["Nom actuel","Nom ancien · spécificité"], [
    ["Nyon","<b>Colonia Julia Equestris</b> · colonie"],
    ["Augst","<b>Colonia Augusta Raurica</b> · colonie"],
    ["Avenches","<b>Aventicum</b> · capitale de l'Helvétie romaine"],
    ["Martigny","<b>Forum Claudii Vallensium</b> · débouché du col du Grand-Saint-Bernard"],
    ["Lausanne","<b>Lousonna</b> · port"],
    ["Genève","<b>Genava</b> · port"],
    ["Orbe","<b>Urba</b> · mosaïque"],
    ["Yverdon","<b>Eburodunum</b> · port"],
    ["Villa de Colombier","<b>Villa de Colombier</b> · villa (= ferme)"],
    ["Windisch","<b>Vindonissa</b> · camp militaire romain"]]) },
  { t:"pause", q:"Quel site est un camp militaire romain ?", a:"Windisch, Vindonissa.", s:"Tableau des sites" },
  { t:"h3", h:"Les placer sur la carte" },
  { t:"svg", k:"sites", titre:"Les dix sites", alt:"Genève, Nyon et Lausanne au bord du Léman ; Orbe, Yverdon, Colombier et Avenches près des lacs du pied du Jura ; Augst et Windisch près du Rhin ; Martigny au sud, sous le col.", s:"Carte p. 11 · tableau des sites" },
  { t:"p", s:"Carte p. 11 · livre p. 10 et p. 15", h:"Trois repères : <b>au bord du Léman</b>, Genève, Nyon et Lausanne ; <b>près du Rhin</b>, au nord, Augst et Windisch ; <b>au sud, dans les Alpes</b>, Martigny. Les autres sont sur le Plateau, près des lacs du pied du Jura. Les deux colonies sont celles de l'étape 2 : Nyon au sud-ouest, Augst au nord." },
  { t:"pause", q:"Quels sont les deux sites qui sont des colonies, et où sont-ils sur la carte ?", a:"Nyon (Colonia Julia Equestris), au bord du Léman au sud-ouest, et Augst (Colonia Augusta Raurica), au nord près du Rhin.", s:"Tableau des sites · carte p. 11 · livre p. 10" },
  { t:"tip", h:"Apprends par groupes : les 2 colonies (Nyon, Augst), les 3 ports (Lausanne, Genève, Yverdon), puis les 5 sites uniques (Avenches capitale, Martigny col, Orbe mosaïque, Colombier villa, Windisch camp militaire). Ne mélange pas Nyon et Augst : Julia Equestris = Nyon, Augusta Raurica = Augst." },
  { t:"see", ids:["O1","O5","O10"] },
  { t:"src", h:"Tableau des sites et carte, p. 11 (déduit de la feuille d'objectifs) · livre p. 10 et p. 15" },
]},

/* ---------------- O4 ---------------- */
{ id:"O4", ch:"V", titre:"Un carrefour nord-sud et est-ouest", court:"Le rôle du territoire des Helvètes, et de la Suisse actuelle, dans les communications",
  obj:"Expliquer le rôle du territoire des Helvètes (et de la Suisse actuelle) dans les communications nord-sud et est-ouest (manuel p. 12).",
  pre:[{ q:"La Suisse est-elle encore aujourd'hui un lieu de passage entre le nord et le sud ?", a:"Oui : le livre dit qu'elle l'est « encore aujourd'hui ».", s:"Livre p. 12" }, { q:"Par quelle ville passe l'axe routier nord-sud ?", a:"Par Aventicum (Avenches).", s:"Livre p. 14 (déduit de la feuille d'objectifs)" }],
  blank:{ consigne:"Explique en trois phrases pourquoi le territoire des Helvètes est un carrefour, et nomme les grandes voies.", points:["Le réseau romain de voies de communication est extrêmement performant", "Dès son intégration dans l'Empire, le territoire des Helvètes fait partie de ce réseau", "Il devient le nœud routier et le lieu de passage entre le nord et le sud, l'est et l'ouest, comme la Suisse aujourd'hui", "D'est en ouest : de Tarnaiae à Genava le long du Léman ; de Brigantium à Augusta Raurica", "Du nord au sud : l'axe par Aventicum ; plus modeste : Genève-Bâle au pied du Jura"], s:"Livre p. 12 et p. 14" },
  blocks:[
  { t:"p", s:"Livre p. 12, passages surlignés", h:"<b>Le réseau romain de voies de communication est extrêmement performant.</b> Dès son intégration dans l'Empire romain, le territoire des Helvètes fait partie de ce réseau. Il devient <b>le nœud routier et le lieu de passage entre le nord et le sud, l'est et l'ouest</b> que la <b>Suisse actuelle est encore aujourd'hui</b>." },
  { t:"pause", q:"Avec tes mots : quel rôle le livre donne-t-il au territoire des Helvètes ?", a:"C'est le nœud routier, le lieu de passage entre le nord et le sud, et entre l'est et l'ouest, comme la Suisse aujourd'hui.", s:"Livre p. 12" },
  { t:"h3", h:"Les grandes voies" },
  { t:"p", s:"Livre p. 14 (déduit de la feuille d'objectifs)", h:"<b>D'est en ouest</b>, le Plateau est traversé par deux grandes voies : l'une va de <i>Tarnaiae</i> à <i>Genava</i> en <b>longeant le lac Léman</b> ; l'autre part de <i>Brigantium</i> et va à <i>Augusta Raurica</i>. <b>Dans le sens nord-sud</b>, l'axe routier passe par <i>Aventicum</i>. Une route plus modeste relie <b>Genève à Bâle</b> par le pied du Jura." },
  { t:"svg", k:"voies", titre:"Les grandes voies à travers le territoire des Helvètes", alt:"Quatre routes : le long du Léman, de Brigantium à Augusta Raurica, l'axe nord-sud par Aventicum jusqu'au Grand-Saint-Bernard, et Genève-Bâle au pied du Jura.", s:"Livre p. 14 et p. 15 · carte p. 11" },
  { t:"pause", q:"Quelles sont les deux grandes voies d'est en ouest ?", a:"De Tarnaiae à Genava, le long du Léman, et de Brigantium à Augusta Raurica.", s:"Livre p. 14" },
  { t:"ex", s:"Livre p. 15, exercice 2", items:[["Ex. 2","Repérer les quatre routes nommées p. 14 sur les cartes des pages 2 et 11.","Une route se décrit par son départ, son arrivée et ce qu'elle longe ou traverse."]] },
  { t:"tip", h:"Phrase-modèle : « Le territoire des Helvètes est le nœud routier de l'Empire entre le nord et le sud et entre l'est et l'ouest ; par exemple, l'axe nord-sud passe par Aventicum et la voie est-ouest longe le Léman. C'est encore le cas de la Suisse aujourd'hui. » N'oublie pas la partie « et de la Suisse actuelle » de l'objectif." },
  { t:"see", ids:["O5","O6","O2"] },
  { t:"src", h:"Livre p. 12, p. 14 et p. 15 (ex. 2) · carte p. 11" },
]},

/* ---------------- O5 ---------------- */
{ id:"O5", ch:"V", titre:"Le col du Grand-Saint-Bernard", court:"Aménagé pour le passage des légions ; débouché à Martigny",
  obj:"Mentionner et placer le col du Grand-Saint-Bernard (p. 14 et 11).",
  pre:[{ q:"Pour qui le col du Grand-Saint-Bernard a-t-il été aménagé ?", a:"Pour permettre aux légions d'y passer.", s:"Livre p. 14" }, { q:"Quel de tes dix sites se trouve au débouché du col ?", a:"Martigny (Forum Claudii Vallensium).", s:"Tableau des sites" }],
  blank:{ consigne:"Écris trois informations sur le col du Grand-Saint-Bernard et dessine où il se trouve.", points:["Il a été aménagé pour permettre aux légions d'y passer", "Il est dans les Alpes, au sud du territoire, au-dessus de Martigny", "Martigny (Forum Claudii Vallensium) est au débouché du col", "Sur la carte, il s'appelle Summus Poeninus"], s:"Livre p. 14 · carte p. 11 · tableau des sites" },
  blocks:[
  { t:"p", s:"Livre p. 14 (déduit de la feuille d'objectifs), passage surligné", h:"<b>Un autre col à avoir été aménagé pour permettre aux légions d'y passer est le col du Grand-Saint-Bernard.</b> « Un autre », parce que le livre vient de parler du col de Pierre Pertuis, dans le Jura (p. 13)." },
  { t:"pause", q:"Pourquoi les Romains ont-ils aménagé le col du Grand-Saint-Bernard ?", a:"Pour permettre aux légions d'y passer.", s:"Livre p. 14" },
  { t:"h3", h:"Le placer" },
  { t:"svg", k:"voies", titre:"Le col au bout de l'axe nord-sud", alt:"Le col du Grand-Saint-Bernard, au sud dans les Alpes, au bout de l'axe nord-sud qui passe par Aventicum et Martigny.", s:"Carte p. 11 (annotée « col Saint-Bernard ») · livre p. 14" },
  { t:"p", s:"Carte p. 11, note de Livio « col Saint-Bernard » · tableau des sites", h:"Sur ta carte, le col porte le nom latin <b><i>Summus Poeninus</i></b> : tu l'as annoté « col Saint-Bernard ». Il est <b>dans les Alpes, au sud</b>, juste au-dessus de <b>Martigny</b> (<i>Forum Claudii Vallensium</i>), le site qui est au <b>débouché du col</b>." },
  { t:"pause", q:"Pierre Pertuis ou Grand-Saint-Bernard : lequel est dans les Alpes ?", a:"Le Grand-Saint-Bernard. Pierre Pertuis permet de passer du Plateau au Jura.", s:"Livre p. 13 et p. 14" },
  { t:"tip", h:"Phrase-modèle : « Le col du Grand-Saint-Bernard, dans les Alpes au-dessus de Martigny, a été aménagé par les Romains pour permettre aux légions d'y passer. » Sur une carte muette, cherche d'abord le Léman, suis le Rhône vers l'est jusqu'au coude de Martigny, puis monte au sud." },
  { t:"see", ids:["O3","O4","O6"] },
  { t:"src", h:"Livre p. 13 et p. 14 · carte p. 11 · tableau des sites" },
]},

/* ---------------- O6 ---------------- */
{ id:"O6", ch:"V", titre:"Les rôles des routes, et des routes pavées", court:"Légions, nouvelles, marchandises ; via strata = route pavée",
  obj:"Présenter les rôles des routes dans l'Empire romain (manuel p. 12) et savoir qu'elles sont pavées.",
  pre:[{ q:"Cite un des trois rôles des routes romaines.", a:"Déplacer rapidement les légions, faciliter la transmission des nouvelles, acheminer les marchandises.", s:"Livre p. 12 · note « 3 rôles des routes »" }, { q:"Que veut dire « via strata » ?", a:"Une route pavée.", s:"Livre p. 12" }],
  blank:{ consigne:"Écris les 3 rôles des routes, puis dessine une coupe de la route romaine avec ses couches.", points:["Déplacer rapidement les légions", "Faciliter la transmission des nouvelles", "Acheminer les marchandises", "Via strata = route pavée ; strata vient de sterno, « je pave »", "Couches de l'illustration : chaussée pavée, sable, gravier, pierres, mortier (sable et chaux) ; au bord : fossés et borne milliaire"], s:"Livre p. 12" },
  blocks:[
  { t:"p", s:"Livre p. 12 · note « 3 rôles des routes »", h:"Plus Rome contrôle de territoires, plus elle doit pouvoir <b>administrer les provinces</b>. Il lui faut alors des routes pour trois rôles :" },
  { t:"html", s:"Livre p. 12, note de classe « 3 rôles des routes »", h:tiles([["1. Les légions","les déplacer rapidement"],["2. Les nouvelles","faciliter leur transmission"],["3. Les marchandises","les acheminer"]], "Le réseau est donc sans cesse amélioré et attentivement entretenu.") },
  { t:"pause", q:"Quels sont les trois rôles des routes ?", a:"Déplacer rapidement les légions, faciliter la transmission des nouvelles, acheminer les marchandises.", s:"Livre p. 12" },
  { t:"h3", h:"Des routes pavées" },
  { t:"p", s:"Livre p. 12, passages surlignés", h:"Les Romains <b>apportent beaucoup de soins</b> à la construction de leurs voies. Une <b><i>via strata</i> est une route pavée</b> : <i>strata</i> est le participe passé passif féminin du verbe <i>sterno</i>, « je pave »." },
  { t:"html", s:"Livre p. 12, illustration « Construction d'une voie romaine » [10], légendes dans leur ordre", h:chain([
    ["Chaussée pavée","la couche du dessus", "var(--r6)"],
    ["Sable","", "var(--r4)"],
    ["Gravier","", "var(--soft)"],
    ["Pierres","", "var(--r1)"],
    ["Mortier","sable et chaux", "var(--st)"]]) + `<p class="fine">Au bord de la route, l'illustration montre aussi des fossés et une borne milliaire.</p>` },
  { t:"pause", q:"De quoi est fait le mortier, selon l'illustration ?", a:"De sable et de chaux.", s:"Livre p. 12, illustration" },
  { t:"h3", h:"Et chez les Helvètes ?" },
  { t:"p", s:"Livre p. 13, passages surlignés", h:"Les routes du territoire des Helvètes sont <b>un peu moins soignées</b> : souvent des couches de gravier sur un lit de cailloux. Le trafic lourd roule au centre, piétons et cavaliers sur les bords. Pour passer, on traverse certaines rivières à gué, on construit de <b>nombreux ponts</b> et on ose <b>creuser la roche</b>, comme au col de <b>Pierre Pertuis</b>, entre le Plateau et le Jura." },
  { t:"tip", h:"Phrase-modèle : « Les routes servent à déplacer rapidement les légions, à transmettre les nouvelles et à acheminer les marchandises ; les grandes voies romaines sont pavées (via strata = route pavée). » Retiens les trois rôles avec trois mots : soldats, nouvelles, marchandises." },
  { t:"see", ids:["O7","O8","O4"] },
  { t:"src", h:"Livre p. 12 (texte, note « 3 rôles des routes », illustration) et p. 13" },
]},

/* ---------------- O7 ---------------- */
{ id:"O7", ch:"V", titre:"La via Appia, et le mot « via »", court:"Rome-Capoue dès 312 av. J.-C. ; via = la route, « via » = en passant par",
  obj:"Nommer la plus ancienne voie romaine : la via Appia et indiquer que via = la route en latin, ce qui est resté dans notre langage → en passant par… (manuel p. 12).",
  pre:[{ q:"Quelles villes la via Appia relie-t-elle d'abord ?", a:"Rome et Capoue.", s:"Livre p. 12" }, { q:"Que veut dire « via » dans « Paris-Rome via Milan » ?", a:"En passant par.", s:"Note de classe p. 12 · feuille d'objectifs" }],
  blank:{ consigne:"Écris tout ce que tu sais sur la via Appia et sur le mot « via ».", points:["Feuille d'objectifs : la plus ancienne voie romaine", "Livre : aujourd'hui la mieux conservée et la plus célèbre", "Construction dès 312 av. J.-C., par Appius Claudius Caecus ; relie Rome à Capoue, plus tard Brindes", "Elle porte le nom du magistrat qui l'a fait construire", "Via, viae (f) = la route ; en français, « via » = en passant par"], s:"Livre p. 12 · feuille d'objectifs · note de classe" },
  blocks:[
  { t:"p", s:"Feuille d'objectifs, objectif 7 · livre p. 12, passages surlignés", h:"Ta feuille d'objectifs l'appelle <b>la plus ancienne voie romaine</b>. Ton livre dit qu'elle est aujourd'hui <b>la voie romaine la mieux conservée et la plus célèbre</b>. Les deux sont à savoir." },
  { t:"p", s:"Livre p. 12", h:"En Italie, sa construction commence en <b>312 av. J.-C.</b> Le commanditaire, <i>Appius Claudius Caecus</i>, fait rectifier, élargir et prolonger une route qui existait déjà, pour qu'elle <b>relie Rome à Capoue</b> ; plus tard, elle va jusqu'à Brindes. Les routes payées par l'État portent le nom du <b>magistrat</b> ou de l'empereur au pouvoir : d'où <i>via Appia</i>, la route d'Appius." },
  { t:"pause", q:"Pourquoi la via Appia s'appelle-t-elle ainsi ?", a:"Les routes payées par l'État portent le nom du magistrat au pouvoir : ici Appius Claudius Caecus, qui l'a fait construire.", s:"Livre p. 12" },
  { t:"h3", h:"Via : un mot latin resté en français" },
  { t:"def", term:"via, viae (f)", h:"La route. Cela est resté en français : « via » = en passant par.", s:"Note de classe, livre p. 12 · feuille d'objectifs, objectif 7" },
  { t:"p", s:"Note de classe p. 12 · livre p. 12", h:"<i>Via</i> est un nom <b>féminin</b> (f), comme le montre aussi <i>strata</i>, au féminin. Quand on dit « un train Genève-Rome <b>via</b> Milan », on garde le sens latin : on passe par la route de Milan." },
  { t:"pause", q:"Que veut dire « via » en latin, et que veut-il dire en français ?", a:"En latin : la route. En français : « en passant par ».", s:"Note de classe p. 12" },
  { t:"tip", h:"Phrase-modèle : « La via Appia, la plus ancienne voie romaine, relie Rome à Capoue dès 312 av. J.-C. ; via veut dire « la route » en latin, et en français « via » veut dire « en passant par ». » Ne confonds pas via (la route) et via strata (la route pavée)." },
  { t:"see", ids:["O6","O8"] },
  { t:"src", h:"Livre p. 12 (texte et note de classe) · feuille d'objectifs" },
]},

/* ---------------- O8 ---------------- */
{ id:"O8", ch:"V", titre:"Les relais et les bornes milliaires", court:"Des gîtes tous les 10 à 50 km, des bornes en milliers de pas ; 1 mille = 1,47 km",
  obj:"Indiquer et expliquer la présence de relais et de bornes milliaires le long des routes (manuel p. 3 et 15). La valeur d'un mille est connue.",
  pre:[{ q:"Combien vaut un mille romain en kilomètres ?", a:"1,47 km.", s:"Livre p. 3, réponse de Livio corrigée" }, { q:"À quoi servaient les relais et les gîtes ?", a:"Au cursus publicus, la poste impériale.", s:"Livre p. 15, Info-flash" }],
  blank:{ consigne:"Explique ce qu'est un relais et ce qu'est une borne milliaire, à quoi chacun sert, et donne la valeur d'un mille.", points:["Relais et gîtes : distants de 10 à 15 km ou de 25 à 50 km, indiqués dans les itineraria", "Ils servent au cursus publicus, la poste impériale (César, puis Auguste) : messages, marchandises, personnes de l'administration", "Borne milliaire : le nombre de milliers de pas romains à partir d'une ville importante (caput viae, « tête de voie »)", "Sur la borne : le nom du créateur-sponsor de la route, le nom d'une ville, les chiffres en milliers de pas", "1 mille = 1,47 km"], s:"Livre p. 3 et p. 15" },
  blocks:[
  { t:"h3", h:"Les relais et les gîtes" },
  { t:"p", s:"Livre p. 15, passages surlignés", h:"Les routes principales sont décrites dans des <b>guides</b> appelés <i>itineraria</i> (nom pluriel), où sont indiqués les distances et <b>les relais et les gîtes, distants de 10 à 15 km ou de 25 à 50 km</b>. Les voyageurs se déplacent à pied, à mulet, à cheval ou en char, selon leurs moyens." },
  { t:"p", s:"Livre p. 15, Info-flash", h:"Les relais et gîtes servaient surtout au <b><i>cursus publicus</i>, la poste impériale</b> : un service mis en place par <b>Jules César</b>, institutionnalisé par <b>Auguste</b>, pour les messages, les marchandises et les personnes de l'administration centrale." },
  { t:"pause", q:"Tous les combien de kilomètres trouve-t-on un relais ou un gîte ?", a:"Tous les 10 à 15 km, ou tous les 25 à 50 km.", s:"Livre p. 15" },
  { t:"h3", h:"Les bornes milliaires" },
  { t:"p", s:"Livre p. 15, passages surlignés", h:"Les routes principales sont jalonnées de <b>bornes milliaires</b>, qui <b>indiquent le nombre de milliers de pas romains à partir d'une ville importante</b>. En Suisse, les milliaires donnent comme point de départ, <i>caput viae</i> (« tête de voie »), <i>Aventicum</i>, <i>Augusta Raurica</i> ou <i>Colonia Julia Equestris</i>." },
  { t:"mine", s:"Livre p. 3, ta réponse corrigée (photos 1 et 2)", titre:"Ta réponse de la p. 3 : un panneau d'aujourd'hui et une borne milliaire", items:["Ce sont 2 panneaux routiers !", "La borne milliaire comporte : 1) le nom du « créateur-sponsor » de la route ; 2) le nom d'une ville ; 3) les chiffres en milliers de pas romains.", "1 mille = 1,47 km (tu avais d'abord écrit 1,48 km, corrigé en 1,47 km)."] },
  { t:"pause", q:"Qu'indique une borne milliaire ?", a:"Le nombre de milliers de pas romains à partir d'une ville importante, la « tête de voie ».", s:"Livre p. 15" },
  { t:"tip", h:"Phrase-modèle : « Le long des routes, des relais et des gîtes (tous les 10 à 15 km ou 25 à 50 km) servent au cursus publicus, la poste impériale ; des bornes milliaires indiquent la distance en milliers de pas depuis une ville importante. 1 mille = 1,47 km. » Relais = s'arrêter ; borne = se repérer." },
  { t:"see", ids:["O9","O6"] },
  { t:"src", h:"Livre p. 3 (ta réponse corrigée) et p. 15 (texte et Info-flash)" },
]},

/* ---------------- O9 ---------------- */
{ id:"O9", ch:"V", titre:"La Table de Peutinger", court:"Une copie du XIIIe siècle d'une carte routière romaine du Ve siècle",
  obj:"Présenter et reconnaître la Table de Peutinger (pourquoi ce nom, date, ce que c'est, ce qu'elle montre, etc). (manuel p. 7 (l'image) + 8)",
  pre:[{ q:"Pourquoi s'appelle-t-elle la Table de Peutinger ?", a:"Du nom de Konrad Peutinger, qui l'a reçue en cadeau au début du XVIe siècle.", s:"Livre p. 8 (déduit de la feuille d'objectifs)" }, { q:"Montre-t-elle les paysages de façon réaliste ?", a:"Non : elle indique les itinéraires d'un point à un autre, avec les distances.", s:"Livre p. 8" }],
  blank:{ consigne:"Présente la Table de Peutinger en répondant à : pourquoi ce nom ? quelles dates ? qu'est-ce que c'est ? que montre-t-elle ?", points:["Le nom : Konrad Peutinger (1465-1547), humaniste, juriste et amateur d'antiquités allemand, qui l'a reçue en cadeau au début du XVIe siècle", "C'est une copie du XIIIe siècle d'une carte routière romaine", "L'original : sans doute la première moitié du Ve siècle ap. J.-C., d'après une carte dressée sur les indications d'Agrippa, ami d'Auguste", "12 parchemins, le 1er a disparu ; les 11 restants : 6,80 m sur 34 cm, plus de 200'000 km de routes", "Pas réaliste : les itinéraires et les distances ; villes, bâtiments et forêts en symboles"], s:"Livre p. 8 et p. 15" },
  blocks:[
  { t:"p", s:"Livre p. 8 (déduit de la feuille d'objectifs), passages surlignés", h:"<b>La Table de Peutinger, du nom de Konrad Peutinger</b>, un humaniste, juriste et amateur d'antiquités allemand (1465-1547) qui l'a <b>reçue en cadeau</b> au début du XVI<sup>e</sup> siècle, est une <b>copie du XIII<sup>e</sup> siècle d'une carte routière romaine</b>. L'original est une carte du monde réalisée, sans doute, durant la première moitié du <b>V<sup>e</sup> siècle ap. J.-C.</b>, d'après une carte dressée sur les indications d'<b>Agrippa</b>, un ami intime de l'empereur Auguste." },
  { t:"pause", q:"La Table que l'on connaît est-elle l'original romain ?", a:"Non : c'est une copie du XIIIe siècle. L'original date sans doute de la première moitié du Ve siècle ap. J.-C.", s:"Livre p. 8" },
  { t:"svg", k:"peutinger", titre:"Les parchemins de la Table de Peutinger", alt:"Douze parchemins : le premier a disparu, les onze autres forment une bande de 6,80 mètres sur 34 centimètres.", s:"Livre p. 8" },
  { t:"p", s:"Livre p. 8, passages surlignés", h:"<b>La carte ne donne pas une représentation réaliste des paysages : elle indique les itinéraires</b> permettant d'aller d'un point à un autre, avec les <b>distances</b>. Villes et bâtiments importants (phares, sanctuaires) sont dessinés par des <b>symboles</b>, comme les forêts. Elle montre aussi une partie de la Suisse actuelle (extrait de la p. 7)." },
  { t:"p", s:"Livre p. 15", h:"La p. 15 la cite comme exemple de <b>schéma</b> : parfois, les routes sont dessinées dans un schéma, comme sur la Table de Peutinger, au lieu d'être décrites dans un guide (<i>itineraria</i>)." },
  { t:"todo", h:"La p. 7 (l'image de la Table) n'est pas dans tes photos : regarde-la dans ton fascicule, pour savoir la reconnaître. Une longue bande étroite, des routes en traits, des villes en petits symboles." },
  { t:"pause", q:"Comment les villes et les bâtiments sont-ils représentés sur la Table ?", a:"Par des symboles.", s:"Livre p. 8" },
  { t:"tip", h:"Phrase-modèle : « La Table de Peutinger porte le nom de Konrad Peutinger, qui l'a reçue en cadeau au XVIe siècle ; c'est une copie du XIIIe siècle d'une carte routière romaine du Ve siècle, qui montre les itinéraires et les distances, pas les paysages réels. » Trois siècles à ne pas mélanger : Ve (l'original), XIIIe (la copie), XVIe (le cadeau à Peutinger)." },
  { t:"see", ids:["O8","O4"] },
  { t:"src", h:"Livre p. 8 et p. 15 · p. 7 manquante" },
]},

/* ---------------- O10 ---------------- */
{ id:"O10", ch:"V", titre:"Les 2 grandes voies fluviales", court:"Le Rhin vers la mer du Nord, le Rhône vers la Méditerranée",
  obj:"Indiquer les 2 grandes voies fluviales (Rhin et Rhône) liées à l'Helvétie romaine et savoir les placer sur une carte (manuel p. 15).",
  pre:[{ q:"Vers quelle mer mène le Rhin ?", a:"Vers la mer du Nord.", s:"Livre p. 15" }, { q:"Pour le commerce en gros, préfère-t-on la route ou l'eau ?", a:"L'eau : le commerce en gros recourt le plus souvent aux voies navigables.", s:"Livre p. 15" }],
  blank:{ consigne:"Dessine les deux voies fluviales sur une carte simple, avec leurs lacs et leur mer.", points:["La voie rhénane (le Rhin) : vers la mer du Nord, à partir des lacs de Neuchâtel et de Morat", "La voie de la Méditerranée : par le lac Léman et le Rhône", "Le commerce en gros utilise le plus souvent ces voies navigables", "Avenches a un port sur le lac de Morat dès la fin du Ier siècle av. J.-C. ; les nautes (bateliers) sont puissants à Avenches et à Lousonna"], s:"Livre p. 15" },
  blocks:[
  { t:"p", s:"Livre p. 15, passages surlignés", h:"<b>Le trafic ne se limite cependant pas au réseau routier.</b> Une marchandise, même très lourde, peut voyager à dos d'animaux de bât ou sur des chars tirés par des bœufs, mais le <b>commerce en gros</b> recourt le plus souvent <b>aux voies navigables</b> :" },
  { t:"html", s:"Livre p. 15, passages surlignés (note « Rhin » au-dessus de « rhénane »)", h:tbl(["Voie","D'où, par où, vers où"], [
    ["<b>La voie rhénane</b> (le Rhin)","à partir des <b>lacs de Neuchâtel et de Morat</b>, vers la <b>mer du Nord</b>"],
    ["<b>La voie de la Méditerranée</b> (le Rhône)","par le <b>lac Léman</b> et le <b>Rhône</b>, vers la <b>Méditerranée</b>"]]) },
  { t:"pause", q:"Par quel lac et quel fleuve passe la voie de la Méditerranée ?", a:"Par le lac Léman et le Rhône.", s:"Livre p. 15" },
  { t:"svg", k:"voies", titre:"Le Rhin vers la mer du Nord, le Rhône vers la Méditerranée", alt:"Le Rhin au nord, vers la mer du Nord ; le Rhône par le Léman, vers la Méditerranée.", s:"Livre p. 15 · carte p. 11" },
  { t:"p", s:"Livre p. 15", h:"L'eau est très utilisée : Avenches possède un port sur le lac de Morat dès la fin du I<sup>er</sup> siècle av. J.-C., et la corporation des <b>nautes</b>, les bateliers, est très puissante à Avenches et à <i>Lousonna</i>. C'est pour cela que trois de tes sites sont des ports (Lausanne, Genève, Yverdon)." },
  { t:"tip", h:"Phrase-modèle : « Les deux grandes voies fluviales sont le Rhin, qui mène des lacs de Neuchâtel et de Morat vers la mer du Nord, et le Rhône, qui mène par le Léman vers la Méditerranée. » Sur la carte : Rhin au nord, Rhône au sud-ouest. Ce sont aussi deux de tes barrières naturelles (O2)." },
  { t:"see", ids:["O11","O2","O3"] },
  { t:"src", h:"Livre p. 15 · carte p. 11" },
]},

/* ---------------- O11 ---------------- */
{ id:"O11", ch:"V", titre:"Le chaland", court:"Un bateau à fond plat, pour transporter les marchandises sur l'eau",
  obj:"Indiquer ce qu'est un chaland et à quoi il servait. (manuel p. 15)",
  pre:[{ q:"Qu'est-ce qu'un chaland ?", a:"Un bateau à fond plat.", s:"Livre p. 15 · note « chalands = bateau à fond plat »" }, { q:"Où a-t-on découvert plusieurs chalands ?", a:"Entre autres à Yverdon et à Avenches.", s:"Livre p. 15" }],
  blank:{ consigne:"Écris ce qu'est un chaland, à quoi il servait et ce que prouvent les découvertes.", points:["Un chaland est un bateau à fond plat", "Il sert à la navigation sur les lacs (et les fleuves) : le commerce en gros y transporte les marchandises", "On en a découvert plusieurs, entre autres à Yverdon et à Avenches", "Ces découvertes prouvent que le réseau de transport aquatique est fortement exploité"], s:"Livre p. 15 · feuille d'objectifs (note « navigation sur les lacs »)" },
  blocks:[
  { t:"def", book:"Livre p. 15", term:"Chaland", h:"Un bateau à fond plat.", s:"Livre p. 15, texte (« des chalands, des bateaux à fond plat ») · note de classe « chalands = bateau à fond plat »" },
  { t:"p", s:"Livre p. 15, passages surlignés", h:"Comme l'atteste <b>la découverte de plusieurs chalands, des bateaux à fond plat</b>, entre autres à <b>Yverdon</b> et à <b>Avenches</b>, et celles d'autres embarcations plus petites, le <b>réseau de transport aquatique est fortement exploité</b>." },
  { t:"mine", s:"Feuille d'objectifs, objectif 11, ta note", titre:"Ce que tu as noté", items:["Le chaland sert à la navigation sur les lacs."] },
  { t:"p", s:"Livre p. 15", h:"Il sert au <b>commerce en gros</b> : sur les lacs et les fleuves, on transporte des marchandises, même très lourdes, plus facilement que sur les routes." },
  { t:"pause", q:"À quoi servait le chaland ?", a:"À naviguer sur les lacs et les fleuves pour transporter des marchandises (le commerce en gros).", s:"Livre p. 15 · ta note sur la feuille d'objectifs" },
  { t:"tip", h:"Phrase-modèle : « Un chaland est un bateau à fond plat ; il servait à transporter des marchandises sur les lacs et les fleuves. On en a trouvé à Yverdon et à Avenches. » Le fond plat est la clé : il permet de naviguer là où l'eau est peu profonde, au bord des lacs." },
  { t:"see", ids:["O10","O3"] },
  { t:"src", h:"Livre p. 15 · feuille d'objectifs" },
]},
];

const LEXIQUE = [
  { t:"Exiguïté", h:"Le fait d'être trop petit, trop serré (le territoire des Helvètes).", ref:"O1", lab:"Ton dossier", s:"Livre p. 9 · note de classe « = serré »" },
  { t:"Bourg", h:"Une ville (les bourgs que les Helvètes reconstruisent : Berne, Yverdon, Zurich, Windisch).", ref:"O1", lab:"Ton dossier", s:"Livre p. 9 · note de classe « = ville »" },
  { t:"Allobroges", h:"Peuple gaulois dont le territoire se trouve entre l'Isère, le Rhône et les Alpes du nord ; avant d'être conquise par les Romains, Genève leur avait appartenu.", ref:"O1", lab:"Livre p. 9", book:true, s:"Livre p. 9, note 1 en bas du texte de César" },
  { t:"Pax Romana", h:"La paix romaine : aux IIe et IIIe siècles, la région qui correspond à la Suisse actuelle en profite, comme le reste de l'Empire.", ref:"O1", lab:"Livre p. 10", book:true, s:"Livre p. 10" },
  { t:"Colonie", h:"Spécificité de Nyon (Colonia Julia Equestris) et d'Augst (Colonia Augusta Raurica), fondées par César.", ref:"O3", lab:"Ton dossier", s:"Tableau des sites · livre p. 10" },
  { t:"Villa", h:"Une ferme (la villa de Colombier).", ref:"O3", lab:"Ton dossier", s:"Tableau des sites, « Villa (= Ferme) »" },
  { t:"Via, viae (f)", h:"La route ; en français, « via » = en passant par.", ref:"O7", lab:"Ton dossier", s:"Note de classe, livre p. 12" },
  { t:"Via strata", h:"Une route pavée ; strata est le participe passé passif féminin de sterno, « je pave ».", ref:"O6", lab:"Livre p. 12", book:true, s:"Livre p. 12" },
  { t:"Borne milliaire", h:"Borne qui indique le nombre de milliers de pas romains à partir d'une ville importante.", ref:"O8", lab:"Livre p. 15", book:true, s:"Livre p. 15" },
  { t:"Mille", h:"Mille pas romains : 1 mille = 1,47 km.", ref:"O8", lab:"Ton dossier", s:"Livre p. 3, ta réponse corrigée · p. 15" },
  { t:"Caput viae", h:"Littéralement « tête de voie » : la ville de départ ou d'arrivée d'une voie sur les milliaires.", ref:"O8", lab:"Livre p. 15", book:true, s:"Livre p. 15" },
  { t:"Itineraria", h:"(nom pluriel) Les guides qui décrivent les routes principales, avec les distances, les relais et les gîtes.", ref:"O8", lab:"Livre p. 15", book:true, s:"Livre p. 15" },
  { t:"Cursus publicus", h:"La poste impériale, mise en place par Jules César et institutionnalisée par Auguste, pour les messages, les marchandises et les personnes de l'administration centrale.", ref:"O8", lab:"Livre p. 15", book:true, s:"Livre p. 15, Info-flash" },
  { t:"Chaland", h:"Un bateau à fond plat.", ref:"O11", lab:"Livre p. 15", book:true, s:"Livre p. 15 · note de classe" },
  { t:"Nautes", h:"Les bateliers ; leur corporation est très puissante à Avenches et à Lousonna.", ref:"O10", lab:"Livre p. 15", book:true, s:"Livre p. 15" },
];

/* ============================================================
   PAQUETS — un paquet par objectif (code = id du chapitre).
   ============================================================ */
const AV = ["58 av. J.-C.","52 av. J.-C.","15 av. J.-C."];
const BARR = ["le Rhin","le Jura","le lac Léman et le Rhône","les Alpes"];
const SIECLES = ["du Ve siècle ap. J.-C.","du XIIIe siècle","du XVIe siècle"];
const SITE_ROWS = [
  ["Nyon","Colonia Julia Equestris",["Colonia Julia Equestris","Julia Equestris"],"une colonie",["colonie","une colonie","colonie romaine"]],
  ["Augst","Colonia Augusta Raurica",["Colonia Augusta Raurica","Augusta Raurica"],"une colonie",["colonie","une colonie","colonie romaine"]],
  ["Avenches","Aventicum",["Aventicum"],"la capitale de l'Helvétie romaine",["capitale de l'Helvétie romaine","la capitale","capitale","capitale de l'Helvetie romaine"]],
  ["Martigny","Forum Claudii Vallensium",["Forum Claudii Vallensium"],"le débouché du col du Grand-Saint-Bernard",["débouché du col du Grand-Saint-Bernard","débouché du col du Grand Saint Bernard","debouche du col du grand saint bernard","col du Grand-Saint-Bernard"]],
  ["Lausanne","Lousonna",["Lousonna"],"un port",["port","un port"]],
  ["Genève","Genava",["Genava"],"un port",["port","un port"]],
  ["Orbe","Urba",["Urba"],"la mosaïque",["mosaïque","mosaïques","mosaique","la mosaïque"]],
  ["Yverdon","Eburodunum",["Eburodunum"],"un port",["port","un port"]],
  ["Villa de Colombier","Villa de Colombier",null,"une villa (= ferme)",["villa","une villa","ferme","une ferme","villa (= ferme)"]],
  ["Windisch","Vindonissa",["Vindonissa"],"un camp militaire romain",["camp militaire romain","camp militaire","camp romain","un camp militaire"]],
];
const SRC_SITES = "tableau des sites, p. 11 (déduit de la feuille d'objectifs)";
function siteItems(){
  const out = [];
  SITE_ROWS.forEach(([act, lat, latAcc, spec, specAcc]) => {
    if (latAcc){
      out.push({ front:`Quel est le nom latin de ${act} ?`, back:latAcc, grp:"latin", ans:`${act} = ${lat} ; spécificité : ${spec}.`, src:SRC_SITES });
      out.push({ front:`Quelle ville actuelle s'appelait ${lat} ?`, back:[act], grp:"actuel", ans:`${lat} = ${act} ; spécificité : ${spec}.`, src:SRC_SITES });
    }
    out.push({ front:`Quelle est la spécificité de ${act} (${lat}), notée en cours ?`, back:[spec, ...specAcc], grp:"spec", ans:`${act} (${lat}) : ${spec}.`, src:SRC_SITES + (act === "Martigny" || act === "Lausanne" ? " ; lecture de la flèche rouge confirmée par le papa" : "") });
  });
  return out;
}
const DECKS = [
  { key:"etapes", code:"O1", title:"Les 4 étapes de la romanisation", src:"livre pp. 9-10", items:[
    { front:"En quelle année 368'000 Helvètes quittent-ils leurs villes pour partir vers le sud ?", back:["58 av. J.-C.","58","-58","58 avant J.-C."], opts:AV, keepOrder:true, ans:"En 58 av. J.-C. : c'est l'étape 1.", src:"livre p. 9" },
    { front:"Combien d'Helvètes partent vers le sud en 58 av. J.-C., selon le livre ?", back:["368'000","368 000","368000"], opts:["36'800","368'000","3'680'000"], keepOrder:true, ans:"368'000 Helvètes, avec des membres d'autres tribus celtes ; ils brûlent leurs villes avant de partir.", src:"livre p. 9" },
    { front:"Quelles hypothèses le livre donne-t-il pour expliquer le départ des Helvètes ?", back:["La pression de peuples germaniques ou l'exiguïté de leur territoire"], wrong:["L'appel de Vercingétorix","Une épidémie et des catastrophes naturelles","L'arrivée des colonies romaines"], mcqOnly:true, ans:"La pression de peuples germaniques ou l'exiguïté (= territoire trop serré) du territoire des Helvètes.", src:"livre p. 9 · note « = serré »" },
    { front:"Quel mot du livre veut dire que le territoire des Helvètes est trop serré ?", back:["exiguïté","l'exiguïté","exiguite"], wrong:["Pax Romana","bourg","caput viae"], ans:"L'exiguïté (noté en classe : « = serré »).", src:"livre p. 9 · note de classe" },
    { front:"Que fait César à Genève pour arrêter les Helvètes ?", back:["Il coupe le seul pont qui permet de franchir le Rhône"], wrong:["Il construit un mur le long du Léman","Il fonde la colonie de Nyon","Il creuse un tunnel à Pierre Pertuis"], mcqOnly:true, ans:"Il précède les Helvètes à Genève et coupe le seul pont qui permet de franchir le Rhône : ils doivent faire un grand détour.", src:"livre p. 9" },
    { front:"Où César vainc-il les Helvètes en 58 av. J.-C. ?", back:["Bibracte","à Bibracte"], wrong:["Alésia","Genève","Aventicum"], ans:"À Bibracte. (Alésia, c'est en 52 av. J.-C., avec Vercingétorix.)", src:"livre p. 9" },
    { front:"Après sa victoire de 58 av. J.-C., que fait César des Helvètes survivants ?", back:["Il les renvoie dans leur territoire"], wrong:["Il les emmène à Rome","Il les installe en Gaule","Il les envoie au-delà du Rhin"], mcqOnly:true, ans:"Il renvoie les survivants dans leur territoire, pour qu'ils servent de bouclier contre les Germains.", src:"livre p. 9" },
    { front:"Pourquoi César renvoie-t-il les Helvètes chez eux, comme un « bouclier » ?", back:["Pour que les Germains ne s'installent pas chez eux et ne deviennent pas voisins des Romains"], wrong:["Pour qu'ils construisent des routes pour Rome","Parce qu'il a peur des Alpes","Pour qu'ils paient un impôt à Rome"], mcqOnly:true, ans:"Il ne veut pas laisser leur territoire désert : il craint que les Germains, attirés par la qualité des terres, s'y installent et deviennent les voisins de la province romaine.", src:"livre p. 9, Guerre des Gaules 1, 28 · note « Bouclier »" },
    { front:"En 52 av. J.-C., quel chef gaulois quelques Helvètes suivent-ils ?", back:["Vercingétorix"], wrong:["Jules César","Auguste","Lucius Munatius Plancus"], ans:"Vercingétorix ; vaincus devant Alésia, ils sont renvoyés chez eux.", src:"livre p. 10" },
    { front:"Devant quelle ville sont vaincus les Helvètes qui suivent Vercingétorix en 52 av. J.-C. ?", back:["Alésia","à Alésia"], wrong:["Bibracte","Genève","Nyon"], ans:"Devant Alésia. Ne confonds pas : Bibracte en 58, Alésia en 52 av. J.-C.", src:"livre p. 10" },
    { front:"Quel livre de Jules César raconte la guerre de 58 à 52 av. J.-C. ?", back:["la Guerre des Gaules","Guerre des Gaules"], wrong:["la Guerre civile","la Table de Peutinger","les itineraria"], ans:"La Guerre des Gaules (58-52 av. J.-C.).", src:"livre p. 9, Info-flash · note p. 10" },
    { front:"Quelle est l'étape 2 de la romanisation ?", back:["César fonde deux colonies, car il se méfie de la loyauté des Helvètes"], wrong:["Auguste intègre les Helvètes dans l'Empire","Les Helvètes partent vers le sud","Les invasions barbares dévastent le territoire"], mcqOnly:true, ans:"Se méfiant de leur loyauté, César fonde deux colonies : Colonia Julia Equestris (Nyon) et Raurica (Augst).", src:"livre p. 10 · note « Étape 2 »" },
    { front:"Pourquoi la colonie de Raurica est-elle établie entre le Rhin et le Jura ?", back:["Pour bloquer le passage entre le Rhin et le Jura"], wrong:["Pour surveiller le col du Grand-Saint-Bernard","Pour avoir un port sur le Léman","Pour être près de Rome"], mcqOnly:true, ans:"Elle est établie sur le territoire des Rauraques, alliés des Romains, afin de bloquer le passage entre le Rhin et le Jura.", src:"livre p. 10" },
    { front:"Depuis quelle date les Helvètes sont-ils intégrés dans l'Empire romain (étape 3) ?", back:["15 av. J.-C.","15","-15","15 avant J.-C."], opts:AV, keepOrder:true, ans:"Dès 15 av. J.-C. : c'est l'étape 3.", src:"livre p. 10, Bilan · note « Étape 3 »" },
    { front:"Quel empereur intègre les Helvètes dans l'Empire romain en 15 av. J.-C. ?", back:["Auguste","l'empereur Auguste"], wrong:["Jules César","Vercingétorix","Agrippa"], ans:"L'empereur Auguste (noté en classe).", src:"livre p. 10, Bilan · note « par l'empereur Auguste »" },
    { front:"Dès quand l'Empire romain commence-t-il à vaciller (étape 4) ?", back:["dès la fin du IIIe siècle"], opts:["au Ier siècle av. J.-C.","aux IIe et IIIe siècles","dès la fin du IIIe siècle"], keepOrder:true, ans:"Dès la fin du IIIe siècle. Aux IIe et IIIe siècles, c'est au contraire la Pax Romana.", src:"livre p. 10 · note « Étape 4 »" },
    { front:"Quelles sont les trois causes qui font vaciller l'Empire à la fin du IIIe siècle ?", back:["Les invasions barbares, des épidémies et des catastrophes naturelles"], wrong:["La pression des Germains, l'exiguïté et Vercingétorix","Les routes, les ponts et les cols","Les colonies, les camps et les ports"], mcqOnly:true, ans:"Les invasions barbares, des épidémies et des catastrophes naturelles : le territoire est petit à petit dévasté.", src:"livre p. 10" },
    { front:"Quelle période de paix la région vit-elle aux IIe et IIIe siècles ?", back:["la Pax Romana","Pax Romana","la paix romaine"], wrong:["la Guerre des Gaules","le cursus publicus","la romanisation"], ans:"La Pax Romana, comme le reste de l'Empire.", src:"livre p. 10" },
    { front:"Dans quel ordre se suivent ces étapes de la romanisation ?", back:["Bibracte (58 av. J.-C.), colonies de César, intégration (15 av. J.-C.), invasions (fin du IIIe siècle)"], wrong:["Colonies de César, Bibracte (58 av. J.-C.), invasions (fin du IIIe siècle), intégration (15 av. J.-C.)","Intégration (15 av. J.-C.), Bibracte (58 av. J.-C.), colonies de César, invasions (fin du IIIe siècle)","Bibracte (58 av. J.-C.), intégration (15 av. J.-C.), invasions (fin du IIIe siècle), colonies de César"], mcqOnly:true, ans:"Étape 1 : 58 av. J.-C. ; étape 2 : les colonies ; étape 3 : 15 av. J.-C. ; étape 4 : fin du IIIe siècle.", src:"livre pp. 9-10 · notes « Étape 1 » à « Étape 4 »" },
  ]},
  { key:"barrieres", code:"O2", title:"Les 4 barrières naturelles", src:"livre p. 9 · carte p. 11", items:[
    { front:"Quelles sont les 4 barrières naturelles du territoire des Helvètes ?", back:["Le Rhin, le Jura, le Rhône (avec le Léman) et les Alpes"], wrong:["Le Rhin, le Danube, le Jura et la mer du Nord","Le Jura, les Alpes, le lac de Neuchâtel et le Plateau","Le Rhône, la Méditerranée, les Alpes et le Léman"], mcqOnly:true, ans:"Le Rhin, le Jura, le Rhône avec le lac Léman (dans le texte de César), et les Alpes (ajoutées en classe).", src:"livre p. 9 · feuille d'objectifs (Alpes, Rhône, Rhin, Jura)" },
    { front:"Selon César, quelle barrière sépare le territoire helvète des Germains ?", back:["le Rhin","Rhin"], opts:BARR, keepOrder:true, ans:"Le Rhin, dont le cours très large et très profond sépare les Helvètes des Germains.", src:"livre p. 9, texte de César" },
    { front:"Quelle barrière est « une montagne très élevée » entre les Helvètes et les Séquanes ?", back:["le Jura","Jura"], opts:BARR, keepOrder:true, ans:"Le Jura.", src:"livre p. 9, texte de César" },
    { front:"Quelle barrière sépare la province romaine du territoire des Helvètes ?", back:["le lac Léman et le Rhône","le Rhône","Rhône","le Léman et le Rhône","le lac Léman"], opts:BARR, keepOrder:true, ans:"Le lac Léman et le Rhône.", src:"livre p. 9, texte de César" },
    { front:"Quelle barrière naturelle n'est pas dans le texte de César, mais a été ajoutée en classe ?", back:["les Alpes","Alpes"], opts:BARR, keepOrder:true, ans:"Les Alpes (« + les Alpes !!! »).", src:"livre p. 9, note de classe" },
    { front:"Comment César décrit-il le Rhin ?", back:["Un cours très large et très profond"], wrong:["Un petit ruisseau facile à traverser","Une montagne très élevée","Un lac immense"], mcqOnly:true, ans:"« Le Rhin, dont le cours très large et très profond sépare le territoire helvète des Germains. »", src:"livre p. 9, texte de César" },
    { front:"Quel peuple vit de l'autre côté du Jura, selon César ?", back:["les Séquanes","Séquanes","Sequanes"], wrong:["les Germains","les Allobroges","les Rauraques"], ans:"Les Séquanes. (Les Germains sont de l'autre côté du Rhin.)", src:"livre p. 9, texte de César" },
    { front:"Sur la carte, où se trouve le Jura par rapport au Plateau ?", back:["au nord-ouest"], opts:["au nord-ouest","au sud","à l'est"], keepOrder:true, ans:"Au nord-ouest : sur ta carte, tu as écrit JURA le long des lacs de Neuchâtel et de Bienne.", src:"carte p. 11, annotée par Livio" },
    { front:"Sur la carte, où se trouvent les Alpes par rapport au Plateau ?", back:["au sud et à l'est"], opts:["au nord","au nord-ouest","au sud et à l'est"], keepOrder:true, ans:"Au sud et à l'est : sur ta carte, tu as écrit ALPES au centre et au sud.", src:"carte p. 11, annotée par Livio" },
  ]},
  { key:"sites", code:"O3", title:"Les 10 sites romains", src:SRC_SITES, items:[
    ...siteItems(),
    { front:"Quels sont les trois sites dont la spécificité est d'être un port ?", back:["Lausanne, Genève et Yverdon"], wrong:["Nyon, Augst et Avenches","Martigny, Orbe et Windisch","Genève, Nyon et Martigny"], mcqOnly:true, ans:"Lausanne (Lousonna), Genève (Genava) et Yverdon (Eburodunum).", src:SRC_SITES },
    { front:"Quels sont les deux sites qui sont des colonies ?", back:["Nyon et Augst"], wrong:["Avenches et Windisch","Genève et Lausanne","Martigny et Orbe"], mcqOnly:true, ans:"Nyon (Colonia Julia Equestris) et Augst (Colonia Augusta Raurica), fondées par César (étape 2).", src:SRC_SITES + " · livre p. 10" },
    { front:"Sur la carte, quels sites sont au nord, près du Rhin ?", back:["Augst et Windisch"], wrong:["Nyon et Genève","Martigny et Lausanne","Orbe et Yverdon"], mcqOnly:true, ans:"Augst (Augusta Raurica) et Windisch (Vindonissa).", src:"carte p. 11" },
    { front:"Sur la carte, quel site est au sud, dans la vallée du Rhône, sous le col ?", back:["Martigny","Forum Claudii Vallensium"], wrong:["Avenches","Augst","Colombier"], ans:"Martigny (Forum Claudii Vallensium), au débouché du col du Grand-Saint-Bernard.", src:"carte p. 11 · " + SRC_SITES },
  ]},
  { key:"carrefour", code:"O4", title:"Le carrefour nord-sud et est-ouest", src:"livre p. 12 et p. 14", items:[
    { front:"Selon le livre, que devient le territoire des Helvètes dans le réseau romain ?", back:["Le nœud routier et le lieu de passage entre le nord et le sud, l'est et l'ouest"], wrong:["Une région isolée, sans routes","Le port principal de l'Empire","La capitale de l'Empire romain"], mcqOnly:true, ans:"Il devient le nœud routier et le lieu de passage entre le nord et le sud, l'est et l'ouest.", src:"livre p. 12" },
    { front:"La Suisse actuelle est-elle encore un lieu de passage entre le nord et le sud, l'est et l'ouest ?", back:["Oui"], opts:["Oui","Non"], keepOrder:true, ans:"Oui : le livre dit que la Suisse actuelle l'est « encore aujourd'hui ».", src:"livre p. 12" },
    { front:"Depuis quand le territoire des Helvètes fait-il partie du réseau romain ?", back:["Dès son intégration dans l'Empire romain"], wrong:["Seulement depuis le Moyen Âge","Depuis le XXe siècle","Il n'en a jamais fait partie"], mcqOnly:true, ans:"Dès son intégration dans l'Empire romain.", src:"livre p. 12" },
    { front:"Quelles sont les deux grandes voies qui traversent le Plateau d'est en ouest ?", back:["De Tarnaiae à Genava le long du Léman, et de Brigantium à Augusta Raurica"], wrong:["De Rome à Capoue, et de Capoue à Brindes","De Genève à Bâle, et de Bâle au Grand-Saint-Bernard","D'Aventicum à Alésia, et d'Alésia à Bibracte"], mcqOnly:true, ans:"L'une va de Tarnaiae à Genava en longeant le lac Léman ; l'autre part de Brigantium et va à Augusta Raurica.", src:"livre p. 14 (déduit de la feuille d'objectifs)" },
    { front:"Par quelle ville passe l'axe routier nord-sud ?", back:["Aventicum","Avenches"], wrong:["Genava","Brigantium","Vindonissa"], ans:"Par Aventicum (Avenches), la capitale de l'Helvétie romaine.", src:"livre p. 14" },
    { front:"Quelle grande voie longe le lac Léman ?", back:["Celle de Tarnaiae à Genava"], wrong:["Celle de Brigantium à Augusta Raurica","La route de Genève à Bâle","La via Appia"], mcqOnly:true, ans:"La voie qui va de Tarnaiae à Genava, en longeant le lac Léman.", src:"livre p. 14" },
    { front:"Quelle route plus modeste relie Genève à Bâle ?", back:["Une route qui passe au pied du Jura"], wrong:["Une route qui passe par le Grand-Saint-Bernard","Une route qui longe le Rhin","Une route qui traverse les Alpes"], mcqOnly:true, ans:"Une route plus modeste relie Genève à Bâle par le pied du Jura.", src:"livre p. 14" },
    { front:"Vers quelle ville va la grande voie qui part de Brigantium ?", back:["Augusta Raurica","Augst"], wrong:["Genava","Tarnaiae","Aventicum"], ans:"Vers Augusta Raurica.", src:"livre p. 14" },
  ]},
  { key:"col", code:"O5", title:"Le col du Grand-Saint-Bernard", src:"livre p. 14 · carte p. 11", items:[
    { front:"Pourquoi les Romains ont-ils aménagé le col du Grand-Saint-Bernard ?", back:["Pour permettre aux légions d'y passer"], wrong:["Pour y construire une colonie","Pour y installer un port","Pour y faire passer le Rhin"], mcqOnly:true, ans:"Pour permettre aux légions d'y passer.", src:"livre p. 14" },
    { front:"Quel site romain se trouve au débouché du col du Grand-Saint-Bernard ?", back:["Martigny","Forum Claudii Vallensium"], wrong:["Avenches","Augst","Yverdon"], ans:"Martigny, Forum Claudii Vallensium.", src:SRC_SITES },
    { front:"Sur la carte, quel nom latin porte le col du Grand-Saint-Bernard ?", back:["Summus Poeninus"], wrong:["Petra pertusa","Caput viae","Forum Claudii Vallensium"], ans:"Summus Poeninus : tu l'as annoté « col Saint-Bernard » sur ta carte.", src:"carte p. 11, annotée par Livio" },
    { front:"Dans quelles montagnes se trouve le col du Grand-Saint-Bernard ?", back:["les Alpes","dans les Alpes","Alpes"], wrong:["le Jura","les Vosges","les Andes"], ans:"Dans les Alpes, au sud du territoire, au-dessus de Martigny.", src:"carte p. 11" },
    { front:"Pierre Pertuis ou Grand-Saint-Bernard : lequel de ces cols est dans les Alpes ?", back:["le Grand-Saint-Bernard"], opts:["le Grand-Saint-Bernard","Pierre Pertuis"], keepOrder:true, ans:"Le Grand-Saint-Bernard. Pierre Pertuis permet de passer du Plateau au Jura.", src:"livre p. 13 et p. 14" },
  ]},
  { key:"roles", code:"O6", title:"Les rôles des routes", src:"livre p. 12-13", items:[
    { front:"Quels sont les trois rôles des routes dans l'Empire romain ?", back:["Déplacer rapidement les légions, transmettre les nouvelles, acheminer les marchandises"], wrong:["Décorer les villes, attirer les touristes, relier les fermes","Arrêter les Germains, protéger les cols, creuser la roche","Transporter l'eau, l'huile et le vin"], mcqOnly:true, ans:"Déplacer rapidement les légions, faciliter la transmission des nouvelles, acheminer les marchandises (« 3 rôles des routes »).", src:"livre p. 12 · note de classe" },
    { front:"Pourquoi Rome a-t-elle besoin de plus en plus de routes ?", back:["Parce que ses territoires deviennent nombreux et grands, et qu'il faut administrer les provinces"], wrong:["Parce que les Romains n'ont pas de bateaux","Parce que les Helvètes le demandent","Parce que la via Appia est trop étroite"], mcqOnly:true, ans:"Plus les territoires contrôlés par Rome deviennent nombreux et grands, plus il faut pouvoir administrer les provinces.", src:"livre p. 12" },
    { front:"Le réseau des voies est-il construit une fois pour toutes ?", back:["Non : il est sans cesse amélioré et attentivement entretenu"], wrong:["Oui : on ne le touche plus","Oui : il est abandonné après la conquête","Non : il est détruit chaque hiver"], mcqOnly:true, ans:"Le réseau est sans cesse amélioré et attentivement entretenu.", src:"livre p. 12" },
    { front:"Que veut dire « via strata » ?", back:["une route pavée","route pavée"], wrong:["une route de gravier","un chemin de terre","une route privée"], ans:"Une via strata est une route pavée.", src:"livre p. 12" },
    { front:"De quel verbe latin vient le mot « strata » ?", back:["sterno"], wrong:["via","caput","struo"], ans:"De sterno, « je pave » : strata est son participe passé passif féminin.", src:"livre p. 12" },
    { front:"Que veut dire le verbe latin « sterno » ?", back:["je pave"], wrong:["je marche","je construis","la route"], ans:"« Je pave ».", src:"livre p. 12" },
    { front:"Sur l'illustration p. 12, quelle est la couche du dessus de la voie romaine ?", back:["la chaussée pavée","chaussée pavée"], wrong:["le mortier","les pierres","le sable"], ans:"La chaussée pavée.", src:"livre p. 12, illustration « Construction d'une voie romaine »" },
    { front:"Quelles couches de la route sont nommées sur l'illustration p. 12 ?", back:["Chaussée pavée, sable, gravier, pierres, mortier"], wrong:["Goudron, béton, sable","Terre, herbe, cailloux","Bois, paille, terre"], mcqOnly:true, ans:"Chaussée pavée, sable, gravier, pierres et mortier (sable et chaux) ; au bord, des fossés et une borne milliaire.", src:"livre p. 12, illustration" },
    { front:"De quoi est fait le mortier, selon l'illustration p. 12 ?", back:["de sable et de chaux","sable et chaux"], wrong:["de gravier et d'eau","de pierres et de bois","de chaux et de paille"], ans:"De sable et de chaux.", src:"livre p. 12, illustration" },
    { front:"Les routes du territoire des Helvètes sont-elles aussi soignées que la via Appia ?", back:["Un peu moins : souvent des couches de gravier sur un lit de cailloux"], wrong:["Oui, toutes sont pavées de grandes dalles","Elles sont plus soignées qu'en Italie","Il n'y a aucune route chez les Helvètes"], mcqOnly:true, ans:"La construction des routes des Helvètes est un peu moins soignée : la plupart sont faites de couches de gravier sur un lit de cailloux.", src:"livre p. 13" },
    { front:"Comment les Romains franchissent-ils les obstacles sur le territoire des Helvètes ?", back:["Par des gués, de nombreux ponts, et en creusant la roche"], wrong:["Uniquement en bateau","En évitant toutes les montagnes","Avec des ascenseurs"], mcqOnly:true, ans:"Certaines rivières se passent à gué, de nombreux ponts sont aménagés et, si nécessaire, les Romains creusent la roche.", src:"livre p. 13" },
    { front:"Où les Romains ont-ils creusé la roche pour passer du Plateau au Jura ?", back:["au col de Pierre Pertuis","Pierre Pertuis","col de Pierre Pertuis"], wrong:["au col du Grand-Saint-Bernard","à Bibracte","à Alésia"], ans:"Au col de Pierre Pertuis, sur la voie d'Aventicum à Augusta Raurica.", src:"livre p. 13" },
  ]},
  { key:"appia", code:"O7", title:"La via Appia et le mot « via »", src:"livre p. 12", items:[
    { front:"Selon ta feuille d'objectifs, quelle est la plus ancienne voie romaine ?", back:["la via Appia","via Appia","Appia"], wrong:["la via strata","la voie de Tarnaiae à Genava","la route de Genève à Bâle"], ans:"La via Appia.", src:"feuille d'objectifs, objectif 7" },
    { front:"Selon ton livre, comment est la via Appia aujourd'hui ?", back:["La voie romaine la mieux conservée et la plus célèbre"], wrong:["Une autoroute moderne","Complètement détruite","Une route de gravier"], mcqOnly:true, ans:"Aujourd'hui la voie romaine la mieux conservée et la plus célèbre.", src:"livre p. 12" },
    { front:"En quelle année commence la construction de la via Appia ?", back:["312 av. J.-C.","312","-312"], opts:["312 av. J.-C.","58 av. J.-C.","15 av. J.-C."], keepOrder:true, ans:"En 312 av. J.-C.", src:"livre p. 12" },
    { front:"Quelles villes la via Appia relie-t-elle ?", back:["Rome et Capoue, puis plus tard Brindes"], wrong:["Rome et Genève","Aventicum et Augusta Raurica","Rome et Alésia"], mcqOnly:true, ans:"Elle relie Rome à Capoue ; plus tard, elle va jusqu'à Brindes.", src:"livre p. 12" },
    { front:"Qui est le commanditaire de la via Appia ?", back:["Appius Claudius Caecus","Appius Claudius"], wrong:["Marcus Dunius Paternus","Jules César","Auguste"], ans:"Appius Claudius Caecus. (Marcus Dunius Paternus, c'est le commanditaire des travaux de Pierre Pertuis.)", src:"livre p. 12 · p. 13" },
    { front:"Pourquoi la via Appia porte-t-elle ce nom ?", back:["Les routes de l'État portent le nom du magistrat ou de l'empereur au pouvoir à leur inauguration"], wrong:["Elle passe par la ville d'Appia","Appia veut dire « pavée » en latin","Elle a été construite par des pommiers"], mcqOnly:true, ans:"Les routes aménagées aux frais de l'État portent le nom du magistrat ou de l'empereur au pouvoir lors de leur inauguration : ici Appius.", src:"livre p. 12" },
    { front:"Que veut dire « via » en latin ?", back:["la route","route"], wrong:["en passant par","la ville","le pont"], ans:"Via, viae (f) = la route.", src:"note de classe p. 12 · feuille d'objectifs" },
    { front:"Que veut dire « via » en français, dans « Genève-Rome via Milan » ?", back:["en passant par"], wrong:["la route","pavé","tête de voie"], ans:"« En passant par » : le mot latin est resté dans notre langage.", src:"note de classe p. 12 · feuille d'objectifs" },
    { front:"Quel est le genre du nom latin « via, viae » ?", back:["féminin"], opts:["masculin","féminin","neutre"], keepOrder:true, ans:"Féminin : « via, viae (f) ».", src:"note de classe p. 12" },
    { front:"À côté des routes publiques, quelles autres routes existent ?", back:["Des routes secondaires entre les agglomérations et des voies privées vers les domaines agricoles"], wrong:["Des autoroutes et des tunnels","Seulement des chemins de montagne","Aucune autre route"], mcqOnly:true, ans:"Des routes secondaires qui relient les agglomérations entre elles et des voies privées qui desservent les domaines d'exploitation agricole.", src:"livre p. 12" },
  ]},
  { key:"bornes", code:"O8", title:"Relais et bornes milliaires", src:"livre p. 3 et p. 15", items:[
    { front:"Qu'indique une borne milliaire ?", back:["Le nombre de milliers de pas romains à partir d'une ville importante"], wrong:["Le nom de l'empereur seulement","L'heure qu'il est","La hauteur de la montagne"], mcqOnly:true, ans:"Les bornes milliaires indiquent le nombre de milliers de pas romains à partir d'une ville importante.", src:"livre p. 15" },
    { front:"Combien vaut un mille romain en kilomètres ?", back:["1,47 km","1.47 km","1,47","1.47","1,47 kilomètre"], opts:["0,47 km","1,47 km","14,7 km"], keepOrder:true, ans:"1 mille = 1,47 km (tu avais d'abord écrit 1,48, corrigé en 1,47).", src:"livre p. 3, ta réponse corrigée" },
    { front:"Combien de pas romains y a-t-il dans un mille ?", back:["mille pas","1000 pas","1000","mille","1'000"], opts:["cent pas","mille pas","dix mille pas"], keepOrder:true, ans:"Mille pas : la borne compte en « milliers de pas romains ».", src:"livre p. 3 et p. 15" },
    { front:"Quelles informations trouve-t-on sur la borne milliaire de la p. 3 ?", back:["Le nom du créateur-sponsor de la route, le nom d'une ville, les chiffres en milliers de pas"], wrong:["Le prix du voyage et l'heure","Le nom du voyageur et sa ville","Seulement une date"], mcqOnly:true, ans:"Ta réponse corrigée : 1) le nom du « créateur-sponsor » de la route ; 2) le nom d'une ville ; 3) les chiffres en milliers de pas romains.", src:"livre p. 3, ta réponse corrigée" },
    { front:"Qu'ont en commun la borne milliaire et le panneau routier d'aujourd'hui de la p. 3 ?", back:["Ce sont deux panneaux routiers : ils indiquent des distances jusqu'à des villes"], wrong:["Ils sont tous les deux en pierre","Ils sont tous les deux en latin","Ils indiquent le prix de l'essence"], mcqOnly:true, ans:"« Ce sont 2 panneaux routiers ! » : tous deux donnent des distances vers des villes (en km pour le panneau, en milliers de pas pour la borne).", src:"livre p. 3, ta réponse corrigée" },
    { front:"Que veut dire « caput viae » ?", back:["tête de voie","la tête de voie"], wrong:["route pavée","en passant par","poste impériale"], ans:"Littéralement « tête de voie » : la ville de départ ou d'arrivée d'une voie.", src:"livre p. 15" },
    { front:"Quelles villes sont caput viae sur les milliaires trouvés en Suisse ?", back:["Aventicum, Augusta Raurica et Colonia Julia Equestris"], wrong:["Rome, Capoue et Brindes","Genava, Lousonna et Urba","Bibracte, Alésia et Genava"], mcqOnly:true, ans:"Aventicum, Augusta Raurica et Colonia Julia Equestris.", src:"livre p. 15" },
    { front:"Comment s'appellent les guides qui décrivent les routes principales ?", back:["itineraria","les itineraria"], wrong:["la Table de Peutinger","le cursus publicus","les caput viae"], ans:"Les itineraria (nom pluriel), avec les distances, les relais et les gîtes. (La Table de Peutinger, elle, est un schéma.)", src:"livre p. 15" },
    { front:"Quelle distance sépare les relais et les gîtes ?", back:["10 à 15 km, ou 25 à 50 km"], wrong:["1 à 2 km","100 à 200 km","1,47 km"], mcqOnly:true, ans:"Ils sont distants de 10 à 15 km ou de 25 à 50 km.", src:"livre p. 15" },
    { front:"À quoi servaient surtout les relais et les gîtes ?", back:["Au cursus publicus, la poste impériale"], wrong:["Aux légions en guerre seulement","Aux marchands de chalands","Aux touristes"], mcqOnly:true, ans:"Ils servaient essentiellement au cursus publicus, la poste impériale.", src:"livre p. 15, Info-flash" },
    { front:"Qu'est-ce que le cursus publicus ?", back:["La poste impériale, pour les messages, les marchandises et les personnes de l'administration"], wrong:["Une course de chars","Un guide des routes","Une borne au bord de la route"], mcqOnly:true, ans:"La poste impériale, destinée aux messages, aux marchandises et aux personnes de l'administration centrale.", src:"livre p. 15, Info-flash" },
    { front:"Qui a mis en place le cursus publicus, et qui l'a institutionnalisé ?", back:["Jules César l'a mis en place, Auguste l'a institutionnalisé"], wrong:["Auguste l'a mis en place, César l'a institutionnalisé","Agrippa et Konrad Peutinger","Vercingétorix et César"], mcqOnly:true, ans:"Mis en place par Jules César, institutionnalisé par Auguste.", src:"livre p. 15, Info-flash" },
    { front:"Comment se déplacent les voyageurs sur les routes helvètes ?", back:["À pied, à mulet, à cheval ou en char, selon leurs moyens"], wrong:["Seulement en bateau","Seulement à cheval","En chaise à porteurs seulement"], mcqOnly:true, ans:"À pied, à mulet, à cheval ou en char, selon leurs moyens.", src:"livre p. 15" },
  ]},
  { key:"peutinger", code:"O9", title:"La Table de Peutinger", src:"livre p. 8 (déduit de la feuille d'objectifs)", items:[
    { front:"Pourquoi s'appelle-t-elle la Table de Peutinger ?", back:["Du nom de Konrad Peutinger, qui l'a reçue en cadeau au début du XVIe siècle"], wrong:["Du nom du Romain qui l'a dessinée","Du nom de la ville où on l'a trouvée","Du nom d'un empereur romain"], mcqOnly:true, ans:"Du nom de Konrad Peutinger, humaniste, juriste et amateur d'antiquités allemand (1465-1547), qui l'a reçue en cadeau.", src:"livre p. 8" },
    { front:"Qui était Konrad Peutinger ?", back:["Un humaniste, juriste et amateur d'antiquités allemand"], wrong:["Un empereur romain","Un général de César","Un batelier d'Avenches"], mcqOnly:true, ans:"Un humaniste, juriste et amateur d'antiquités allemand (1465-1547).", src:"livre p. 8" },
    { front:"La Table de Peutinger que l'on connaît est-elle l'original romain ?", back:["Non : c'est une copie du XIIIe siècle d'une carte routière romaine"], wrong:["Oui : c'est l'original de l'époque d'Auguste","Oui : elle a été peinte par Agrippa","Non : c'est une carte moderne"], mcqOnly:true, ans:"C'est une copie du XIIIe siècle d'une carte routière romaine.", src:"livre p. 8" },
    { front:"De quel siècle date la copie connue de la Table de Peutinger ?", back:["du XIIIe siècle"], opts:SIECLES, keepOrder:true, ans:"Du XIIIe siècle. L'original : Ve siècle ; le cadeau à Peutinger : XVIe siècle.", src:"livre p. 8" },
    { front:"De quand date sans doute l'original de la Table de Peutinger ?", back:["du Ve siècle ap. J.-C."], opts:SIECLES, keepOrder:true, ans:"De la première moitié du Ve siècle ap. J.-C.", src:"livre p. 8" },
    { front:"En quel siècle Konrad Peutinger reçoit-il la Table en cadeau ?", back:["du XVIe siècle"], opts:SIECLES, keepOrder:true, ans:"Au début du XVIe siècle.", src:"livre p. 8" },
    { front:"Sur quelle carte plus ancienne l'original est-il basé ?", back:["Une carte du monde dressée d'après les indications d'Agrippa, ami d'Auguste"], wrong:["Une carte dessinée par Jules César","La carte de Marco Zanoli","Une carte des Helvètes"], mcqOnly:true, ans:"Sur une carte du monde dressée à partir des indications d'Agrippa (64-12 av. J.-C.), ami intime de l'empereur Auguste, peinte sur les murs du portique d'Agrippa à Rome.", src:"livre p. 8" },
    { front:"Combien de parchemins composaient le manuscrit, et combien en reste-t-il ?", back:["12 ; il en reste 11, le premier a disparu"], wrong:["11 ; il en reste 12","6 ; il en reste 3","200 ; il en reste 34"], mcqOnly:true, ans:"Douze parchemins ; le premier, l'extrémité occidentale, a disparu ; il en reste onze.", src:"livre p. 8" },
    { front:"Quelle est la taille de la bande formée par les 11 parchemins ?", back:["6,80 m de long et 34 cm de large"], wrong:["34 m de long et 6,80 cm de large","1,47 m de long et 1 m de large","200 m de long"], mcqOnly:true, ans:"Une bande de 6,80 m de long et 34 cm de large.", src:"livre p. 8" },
    { front:"Combien de kilomètres de routes montre la Table de Peutinger ?", back:["plus de 200'000 km"], opts:["plus de 2000 km","plus de 20'000 km","plus de 200'000 km"], keepOrder:true, ans:"Plus de 200'000 km de route, ainsi que des villes, forêts, cours d'eau, montagnes.", src:"livre p. 8" },
    { front:"La Table de Peutinger montre-t-elle les paysages de façon réaliste ?", back:["Non : elle indique les itinéraires d'un point à un autre, avec les distances"], wrong:["Oui : c'est comme une photo","Oui : chaque montagne est à la bonne taille","Non : elle ne montre que les mers"], mcqOnly:true, ans:"La carte ne donne pas une représentation réaliste des paysages : elle indique les itinéraires et les distances.", src:"livre p. 8" },
    { front:"Comment sont représentés les villes et les bâtiments importants sur la Table ?", back:["par des symboles","des symboles","symboles"], wrong:["par des photos","par des mots en grec","ils ne sont pas représentés"], ans:"Par des symboles (phares, sanctuaires), tout comme des éléments naturels, telles les forêts.", src:"livre p. 8" },
  ]},
  { key:"fleuves", code:"O10", title:"Les 2 grandes voies fluviales", src:"livre p. 15", items:[
    { front:"Quelles sont les deux grandes voies fluviales liées à l'Helvétie romaine ?", back:["Le Rhin et le Rhône"], wrong:["Le Rhin et le lac de Morat","Le Léman et le lac de Neuchâtel","La via Appia et le Rhône"], mcqOnly:true, ans:"Le Rhin (voie rhénane, vers la mer du Nord) et le Rhône (voie de la Méditerranée).", src:"livre p. 15 · feuille d'objectifs" },
    { front:"Vers quelle mer mène la voie rhénane ?", back:["la mer du Nord","mer du Nord"], opts:["la mer du Nord","la Méditerranée"], keepOrder:true, ans:"Vers la mer du Nord (« rhénane » = du Rhin).", src:"livre p. 15" },
    { front:"Vers quelle mer mène le Rhône ?", back:["la Méditerranée","Méditerranée","mer Méditerranée"], opts:["la mer du Nord","la Méditerranée"], keepOrder:true, ans:"Vers la Méditerranée, par le lac Léman et le Rhône.", src:"livre p. 15" },
    { front:"À partir de quels lacs part la voie rhénane ?", back:["Les lacs de Neuchâtel et de Morat"], wrong:["Le lac Léman","Le lac de Constance","Les lacs des Alpes"], mcqOnly:true, ans:"À partir des lacs de Neuchâtel et de Morat.", src:"livre p. 15" },
    { front:"Par quel lac passe la voie de la Méditerranée ?", back:["le lac Léman","Léman","le Léman"], wrong:["le lac de Neuchâtel","le lac de Morat","le lac de Constance"], ans:"Par le lac Léman, puis le Rhône.", src:"livre p. 15" },
    { front:"Pour le commerce en gros, quelles voies utilise-t-on le plus souvent ?", back:["les voies navigables","voies navigables"], wrong:["les routes pavées","les cols alpins","le cursus publicus"], ans:"Le commerce en gros recourt le plus souvent aux voies navigables.", src:"livre p. 15" },
    { front:"Comment transporte-t-on une marchandise lourde sur la route ?", back:["Avec des animaux de bât ou des chars tirés par des bœufs"], wrong:["Avec des chalands","Avec le cursus publicus","À la main"], mcqOnly:true, ans:"À l'aide d'animaux de bât ou de chars tirés par des bœufs ; mais pour le commerce en gros, on préfère l'eau.", src:"livre p. 15" },
    { front:"Comment s'appellent les bateliers, très puissants à Avenches et à Lousonna ?", back:["les nautes","nautes"], wrong:["les légions","les Séquanes","les itineraria"], ans:"Les nautes : leur corporation est très puissante à Avenches et à Lousonna.", src:"livre p. 15" },
    { front:"Sur la carte, où coule le Rhin par rapport au territoire des Helvètes ?", back:["au nord"], opts:["au nord","au sud-ouest"], keepOrder:true, ans:"Au nord (Augusta Raurica, Vindonissa sont tout près).", src:"carte p. 11" },
    { front:"Sur la carte, où coule le Rhône par rapport au Plateau ?", back:["au sud-ouest"], opts:["au nord","au sud-ouest"], keepOrder:true, ans:"Au sud-ouest : il traverse le Léman et sort à Genava (Genève).", src:"carte p. 11" },
  ]},
  { key:"chaland", code:"O11", title:"Le chaland", src:"livre p. 15", items:[
    { front:"Qu'est-ce qu'un chaland ?", back:["un bateau à fond plat","bateau à fond plat"], wrong:["un char tiré par des bœufs","un relais pour les voyageurs","une borne au bord de la route"], ans:"Un bateau à fond plat.", src:"livre p. 15 · note « chalands = bateau à fond plat »" },
    { front:"Quel mot du livre désigne un bateau à fond plat ?", back:["chaland","un chaland","chalands"], wrong:["nautes","caput viae","itineraria"], ans:"Un chaland.", src:"livre p. 15" },
    { front:"À quoi servait le chaland ?", back:["À transporter des marchandises sur les lacs et les fleuves"], wrong:["À faire la guerre en mer","À pêcher en haute mer","À traverser les Alpes"], mcqOnly:true, ans:"À naviguer sur les lacs (et les fleuves) pour le commerce en gros, c'est-à-dire transporter des marchandises.", src:"livre p. 15 · ta note « navigation sur les lacs »" },
    { front:"Où a-t-on découvert plusieurs chalands ?", back:["Entre autres à Yverdon et à Avenches"], wrong:["À Martigny et à Windisch","À Rome et à Capoue","Au col du Grand-Saint-Bernard"], mcqOnly:true, ans:"Entre autres à Yverdon et à Avenches.", src:"livre p. 15" },
    { front:"Que prouve la découverte de ces chalands ?", back:["Que le réseau de transport aquatique était fortement exploité"], wrong:["Que les Romains n'avaient pas de routes","Que les Helvètes vivaient sur l'eau","Que la mer arrivait jusqu'à Avenches"], mcqOnly:true, ans:"Le réseau de transport aquatique est également fortement exploité.", src:"livre p. 15" },
  ]},
];

/* Sommaire du Dossier : même rendu que la couche, avec une introduction et une légende propres à ce TE. */
const COUCHE_CONTENU = {
  vueFiche(){
    if (S.page) return viewPage(S.page);
    let h = draftBanner() + `<p class="intro">Ton cours complet, rangé exactement comme ta feuille « Objectifs TE LCA 1 » : un chapitre par objectif. Commence par le fil rouge, lis un chapitre, puis teste-toi avec ses cartes.</p>${globalPastille()}
    <div class="legend"><p><span class="tag book">Livre p. 15</span> phrase ou définition de ton fascicule, à savoir.</p><p><span class="tag mine">Ton dossier</span> ce que tu as noté en classe ou répondu sur tes pages.</p><p><span class="tag gen">À vérifier</span> explication générale, pas dans tes pages : jamais interrogée.</p></div>`;
    const intro = pageById("LIENS");
    h += `<section class="toc-ch"><h2>Avant de commencer <span>Le fil rouge de l'épreuve</span></h2><button class="toc-item" data-act="page" data-v="LIENS"><span class="code">LIENS</span><span class="toc-t">${esc(intro.titre)}<span class="toc-s">${esc(intro.court)}</span></span></button></section>`;
    CHAPTERS.forEach(c => {
      h += `<section class="toc-ch"><h2>${c.titre} <span>${esc(c.sous)}</span></h2>` + PAGES.filter(p => p.ch === c.key).map(p =>
        `<button class="toc-item" data-act="page" data-v="${p.id}"><span class="code">${p.id}</span><span class="toc-t">${esc(p.titre)}<span class="toc-s">${esc(p.court)}</span></span>${dPastille(p.id)}</button>`).join("") + `</section>`;
    });
    h += `<section class="toc-ch"><h2>Pour finir</h2>
      <button class="toc-item" data-act="page" data-v="lex"><span class="code">ABC</span><span class="toc-t">Lexique<span class="toc-s">Les ${LEXIQUE.length} mots à connaître, en une ligne chacun</span></span></button>
      <button class="toc-item" data-act="page" data-v="src"><span class="code">SRC</span><span class="toc-t">D'où viennent les questions<span class="toc-s">Les photos qui ont servi et ce qui manque</span></span></button></section>`;
    return h + `<button class="cta" data-act="page" data-v="LIENS">Commencer la lecture</button><p class="version">Version ${VERSION.n} · mise à jour le ${VERSION.date}</p>`;
  },
};

const OUTIL = {
  eleve:"Livio", classe:"10e HarmoS", branche:BRANCHE,
  titre:HEAD.titre, sousTitre:"LCA · TE 1",
  jersey:"LCA 10",
  ongletFiche:["📖","Dossier"],
  badgeHtml:`<div class="head-code" aria-hidden="true">${HEAD.code}<b>${HEAD.num}</b></div>`,
  polices:"https://fonts.googleapis.com/css2?family=Marcellus&family=Spectral:ital,wght@0,400;0,600;0,700;1,400&family=Fira+Sans:wght@400;500;700;800&display=swap",
  introFiche:"",
  labelTout:"Tout le Dossier",
  motPaquet:"Objectif", motPaquets:"objectifs", cePaquet:"Cet objectif",
  compte:"questions",
  sousNiveaux:{ easy:"Je choisis parmi plusieurs réponses", hard:"J'écris tout ce qui peut s'écrire" },
  conseilSetup:"Les questions « pourquoi » restent toujours à choix, même au niveau épreuve. Au TE, les noms latins des sites sont donnés : entraîne-toi surtout à les relier aux noms actuels. En épreuve blanche, tu ne vois aucune réponse avant la fin.",
  papier:{ titre:"LCA — Les Romains en Suisse (TE 1)", court:"LCA", fichier:FILE_SLUG, code:"#PDF-LCA" },
  copie:{ titre:"RÉSULTAT — " + SUBJECT_LONG },
  analyse:{
    role:"un professeur de LCA (langues et cultures de l'Antiquité) suisse",
    sujet:"le TE 1 de LCA : les Romains en Suisse (les 4 étapes de la romanisation, les barrières naturelles, les 10 sites romains) et les voies de communication (carrefour, col du Grand-Saint-Bernard, routes pavées, via Appia, relais et bornes milliaires, Table de Peutinger, Rhin et Rhône, chalands)",
    etiquettes:"l'étiquette est la clé du paquet, qui correspond à un objectif de la feuille (O1 à O11)",
    pistes:"des dates confondues (58 et 52 av. J.-C., 15 av. J.-C., fin du IIIe siècle), Bibracte et Alésia mélangés, des noms latins ou des spécificités de sites inversés (Nyon et Augst), des siècles mélangés pour la Table de Peutinger, Rhin et Rhône inversés",
  },
};

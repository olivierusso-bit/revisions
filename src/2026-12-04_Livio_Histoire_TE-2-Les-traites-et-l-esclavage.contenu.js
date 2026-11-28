/* ============================================================
   CONTENU — Histoire, TE HIS n° 2 « Les traites et l'esclavage »
   Outil de révision de Livio — 10e HarmoS. Épreuve : vendredi 4 décembre 2026.
   Ce fichier est la seule partie propre à cet outil. Il est assemblé avec
   claude/couche-dossier.js et claude/noyau-quiz.js par claude/assembler.py (--couche dossier).
   Modèle : claude/2026-10-27_Livio_Histoire_L-Europe-a-la-rencontre-du-monde.contenu.js (CSS du Dossier reprise, palette changée).
   ============================================================ */

/* Thème « papier d'archive » : registre jauni, bleu de l'Atlantique, ocre.
   Palette et CSS propres au Dossier (pages, capsules, audio, revue) ; la CSS commune vient du noyau (base.css). */
const CSS_THEME = `
/* Papier d'archive : registre jauni, bleu de l'Atlantique, ocre ; le cours se lit en Source Serif, l'outil se manie en Atkinson Hyperlegible. */
:root{
  --dock:#F1ECE3; --sheet:#FFFDF8; --ink:#231C17; --soft:#5E544B; --st:#9A8F84; --rule:#D6CCBF;
  --box:#1F4E6B; --box-wash:#E1EAF0; --crane:#C8902E; --crane-ink:#2E1D00; --board:#2A2420; --on-box:#FFFFFF;
  --good:#1F6E4E; --good-wash:#DDF1E6; --bad:#A3243B; --bad-wash:#F7E1E5;
  --gen:#5E5850; --gen-wash:#EFEBE5; --book-wash:#FFF1B8; --book-ink:#5A4500; --dico:#6A3D8F; --dico-wash:#EFE6F7;
  --land:#E8DFCF; --r1:#B3261E; --r2:#6B3FA0; --r3:#1E7A46; --r4:#7A6A12; --r5:#8E2A2A; --r6:#2361A8;
  --display:'Source Serif 4',Georgia,serif;
  --ui:'Atkinson Hyperlegible',system-ui,-apple-system,'Segoe UI',sans-serif;
  --read:'Source Serif 4',Georgia,'Times New Roman',serif;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --dock:#16120F; --sheet:#211B17; --ink:#EEE6DC; --soft:#B3A797; --st:#6E645A; --rule:#3A322B;
  --box:#7FB3D5; --box-wash:#1C2A33; --crane:#E0A84A; --crane-ink:#1E1300; --board:#0F0C0A; --on-box:#0B1A24;
  --good:#5FD3A0; --good-wash:#14332A; --bad:#FF8FA0; --bad-wash:#3A1D23;
  --gen:#B5AC9F; --gen-wash:#2A241F; --book-wash:#3A3110; --book-ink:#F4D46A; --dico:#C9A3EC; --dico-wash:#2B2136;
  --land:#2E2823; --r1:#FF8A80; --r2:#C3A6F0; --r3:#7FD6A4; --r4:#E2CF6A; --r5:#F0A0A0; --r6:#8DB8F2; color-scheme:dark}}
:root[data-theme="dark"]{
  --dock:#16120F; --sheet:#211B17; --ink:#EEE6DC; --soft:#B3A797; --st:#6E645A; --rule:#3A322B;
  --box:#7FB3D5; --box-wash:#1C2A33; --crane:#E0A84A; --crane-ink:#1E1300; --board:#0F0C0A; --on-box:#0B1A24;
  --good:#5FD3A0; --good-wash:#14332A; --bad:#FF8FA0; --bad-wash:#3A1D23;
  --gen:#B5AC9F; --gen-wash:#2A241F; --book-wash:#3A3110; --book-ink:#F4D46A; --dico:#C9A3EC; --dico-wash:#2B2136;
  --land:#2E2823; --r1:#FF8A80; --r2:#C3A6F0; --r3:#7FD6A4; --r4:#E2CF6A; --r5:#F0A0A0; --r6:#8DB8F2; color-scheme:dark}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
body{background:var(--dock);color:var(--ink);font-family:var(--ui);font-size:16px;line-height:1.5}
.wrap{max-width:640px;margin:0 auto;padding-block:18px 110px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
button{font:inherit;color:inherit}
button:focus-visible,input:focus-visible,textarea:focus-visible{outline:3px solid var(--crane);outline-offset:2px}

/* en-tête : un conteneur vu de côté (ondulations de la tôle) */
.head{position:relative;overflow:hidden;display:flex;gap:14px;align-items:center;margin-bottom:18px;padding:16px 14px 16px 16px;border-radius:4px;color:#fff;background:repeating-conic-gradient(from 3deg at 92% 30%,rgba(255,255,255,0) 0deg 10.5deg,rgba(255,255,255,.22) 10.5deg 11.25deg),#1F4E6B}
.head-code{flex:none;background:#C8902E;color:#2E1D00;font-family:var(--display);font-weight:800;font-size:15px;padding:4px 8px;border-radius:2px;letter-spacing:.5px;line-height:1.1;text-align:center}
.head-code b{display:block;font-size:24px}
.head h1{font-family:var(--display);font-weight:800;font-size:clamp(25px,7.4vw,34px);line-height:1;margin:0;text-wrap:balance}
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
   HISTOIRE — TE HIS n° 2 : les traites et l'esclavage
   Outil de révision de Livio — 10e HarmoS
   Onglet « Dossier » : rangé exactement comme la feuille d'objectifs (objectifs généraux, définitions, dates,
   personnages, lieux), plus un chapitre pour les exercices de contextualisation du cahier (p. 69).
   Date de l'épreuve : vendredi 4 décembre 2026 (agenda : « His TE 2 Traité Esclavage »).
   ============================================================ */

const QUIZ_ID = "livio-quiz-histoire-traites-esclavage";
const DUE = { iso:"2026-12-04", long:"vendredi 4 décembre", short:"04.12" };
const THEME = "Les traites et l'esclavage";
const BRANCHE = "Histoire";
const HEAD = { code:"HIS", num:"TE2", titre:"Les traites et l'esclavage", sous:"TE HIS n° 2 · épreuve : " };
const SUBJECT_LONG = "Histoire, TE HIS n° 2 : les traites et l'esclavage";
const FILE_SLUG = "histoire-traites-esclavage-livio";
const VERSION = { n:1, date:"28.11.2026" };   /* v1 : 28.11.2026, première version : Dossier rangé comme la feuille d'objectifs (6 objectifs généraux, définitions, dates, personnages, lieux) + exercices de contextualisation (cahier p. 69), fil rouge, 11 paquets de cartes, deux schémas dessinés (le commerce triangulaire, la frise des abolitions) */

/* ---------- SOURCES ----------
   Feuille « TE HIS no 2 : les traites et l'esclavage » (10FR, 23.11.2026).
   Manuel p. 148 et p. 149 (thème 10, « L'esclavage ») ; p. 48 (photographiée le 24.10.2026 pour le Dossier
   « L'Europe à la rencontre du monde » : texte sur la traite atlantique, doc. 29) et la définition « Esclavage / esclave » du lexique.
   Cahier pp. 69, 70, 71 (exercices 1 à 5 du thème 10) ; notes de classe de Livio (deux pages « His »).
   « Affranchi », « cauris » et « golfe de Guinée » ne sont pas dans les photos : dictionnaire Larousse, à la demande du papa.
   Les cartes et les tests ne reprennent que ces documents. */
const SOURCES = [
  { titre:"Feuille « TE HIS no 2 : les traites et l'esclavage »", recue:"28.11.2026", contenu:"Pages à répéter (48, 148, 149), 6 définitions, 6 lignes de dates, 2 personnages, 5 lieux, 6 objectifs généraux. Chaque chapitre du Dossier recopie une rubrique de la feuille telle quelle." },
  { titre:"Manuel p. 148 — « L'esclavage » (thème 10)", recue:"28.11.2026", contenu:"Texte d'introduction, deux traites, commerce triangulaire ; doc. 1 (carte de la traite atlantique), doc. 2 (rythme de la traite atlantique), bulle jaune « Traite », « Un système à grande échelle », doc. 3 (armateurs vaudois), doc. 4 (marchand d'esclaves de Gorée, 1796) ; glossaires armateur et Mascareignes. Numéro de page caché sur la photo : c'est la p. 148 citée par l'exercice 3 du cahier." },
  { titre:"Manuel p. 149", recue:"28.11.2026", contenu:"Doc. 5 (Olaudah Equiano), « Un sujet qui fait débat », doc. 6 (Condorcet), doc. 7 (affiche de Charleston, 1769), « Abolition : des paroles et des actes ? », doc. 8 (Albert Londres, 1929) ; glossaires abolitionniste et chaland." },
  { titre:"Manuel p. 48 et lexique (photos du 24.10.2026)", recue:"24.10.2026", contenu:"Texte sur la traite atlantique (main-d'œuvre cherchée en Afrique, esclaves vendus en Amérique, produits rares vers l'Europe) ; doc. 29 (l'Afrique fournit des esclaves) ; lexique « Esclavage / esclave »." },
  { titre:"Cahier p. 69 — contextualisation", recue:"28.11.2026", contenu:"Ex. 1 (pays européens sans colonies, changements entre le XIXe et le XXe siècle, deux principaux pays colonisateurs) et ex. 2 (dates de la frise, hypothèse industrialisation – colonies), corrigés en rouge." },
  { titre:"Cahier p. 70 — exercices 3 et 4", recue:"28.11.2026", contenu:"Ex. 3 (étapes du commerce triangulaire C-A-D-B, carte du trajet du doc. 3, propriétaires des navires, différence avec le doc. 1) ; ex. 4 (Condorcet, mots d'Albert Londres), corrigés en rouge." },
  { titre:"Cahier p. 71 — exercice 5", recue:"28.11.2026", contenu:"Les Passagers du vent (doc. d), plan du Marie-Séraphique (doc. b), texte de Frossard (doc. c) ; éléments trouvés dans les documents et difficultés de l'illustrateur." },
  { titre:"Notes de classe de Livio (deux pages « His »)", recue:"28.11.2026", contenu:"« Traite des Noirs ≠ esclavage », dates d'abolition (1807, 1833, 1848, 1865, 1888, et 1845 Brésil, fin de la traite), Charleston, canne à sucre, 60 millions en 8 ans, prix d'un esclave, vendeurs d'esclaves. Repris tels qu'écrits, avec l'étiquette « Tes notes de classe », à la demande du papa (chiffres dictés en classe)." },
  { titre:"Dictionnaire Larousse — « affranchi », « cauri / cauris », « Guinée »", recue:"28.11.2026", contenu:"Définitions prises à la demande du papa, parce que ces mots de la feuille ne sont pas définis dans les photos." },
];
const SOURCES_NOTE = "Les définitions marquées « Livre » sont les bulles jaunes, les glossaires en bas de page ou le lexique de fin de manuel, mot pour mot. « Affranchi », « cauris » et le golfe de Guinée viennent du dictionnaire Larousse (étiquette violette), à la demande du papa. Les notes de classe de Livio sont reprises telles quelles (étiquette « Tes notes de classe ») : « plus de 60 millions en 8 ans » et « 1845 : Brésil, abolition de la traite » sont les chiffres donnés en classe (décision du papa). Les valeurs du doc. 2 (graphique) sont lues sur le graphique, donc arrondies (« environ »). Le golfe de Guinée n'a pas de carte (décision du papa).";
const PHOTOS = [
  { titre:"Feuille « TE HIS no 2 »", url:"/_blob/531eba9472fbe97714f657edb98db47f" },
  { titre:"Livre p. 148", url:"/_blob/d2292c2a8651f8d2ec8d59d6c3b6d3ce" },
  { titre:"Livre p. 149", url:"/_blob/99707e75345416e9b9aab9c9a97a8592" },
  { titre:"Cahier p. 69", url:"/_blob/f14233e6f92573b48bb9a7a49f1b813c" },
  { titre:"Cahier p. 70", url:"/_blob/c5c56a1b38733cbd69276afeda2033db" },
  { titre:"Cahier p. 71", url:"/_blob/83c99a41be2ccd2861ef85ed3650f785" },
  { titre:"Notes de classe : les dates", url:"/_blob/166229947884bf5bc2b3b1aa3615a3ef" },
  { titre:"Notes de classe : le cours", url:"/_blob/82950027a25e4be42a3de252d9091bea" },
];

const VIDEOS = {};
const AUDIOS = {};
const CAPSULES = { titre:THEME, controle:DUE.long, consigne:"", diffusion:"", chapitres:[] };

/* Chapitres du Dossier = les rubriques de la feuille d'objectifs, dans son ordre, puis les exercices du thème. */
const CHAPTERS = [
  { key:"G", titre:"Objectifs généraux", sous:"Les 6 objectifs de ta feuille", objLabel:"Objectifs généraux" },
  { key:"T", titre:"Définitions à connaître", sous:"Les 6 mots de ta feuille", objLabel:"Définitions à connaître" },
  { key:"D", titre:"Dates à connaître", sous:"Les dates de ta feuille et de tes notes", objLabel:"Dates à connaître" },
  { key:"P", titre:"Personnages à connaître", sous:"Equiano et Condorcet", objLabel:"Personnages à connaître" },
  { key:"L", titre:"Lieux à connaître", sous:"Les 5 lieux de ta feuille", objLabel:"Lieux à connaître" },
  { key:"X", titre:"Les exercices du thème", sous:"Cahier p. 69 : la colonisation au XIXe siècle", objLabel:"Ta feuille : « les exercices du thème »" },
];

/* Définitions (manuel, mot pour mot ; affranchi, cauris : Larousse). lab = étiquette visible, s = source. */
const DEFS = [
  { k:"arm", term:"Armateur", h:"Propriétaire d'un ou plusieurs navires marchands ou de pêche.", lab:"Livre p. 148", s:"Livre p. 148, glossaire en bas de page", ch:"T", acc:["armateur","un armateur","armateurs"] },
  { k:"abo", term:"Abolitionniste", h:"Partisan de la suppression de l'esclavage.", lab:"Livre p. 149", s:"Livre p. 149, glossaire en bas de page", ch:"T", acc:["abolitionniste","un abolitionniste","abolitionnistes"] },
  { k:"escl", term:"Esclavage", h:"Esclavage / esclave : état de personnes non libres, propriété d'un maître qu'elles servent, pouvant être vendues et achetées.", short:"État de personnes non libres, propriété d'un maître qu'elles servent, pouvant être vendues et achetées.", lab:"Livre, lexique", s:"Lexique en fin de manuel, « Esclavage / esclave » (photo du 24.10.2026)", ch:"T", acc:["esclavage","l'esclavage","esclave","esclaves"] },
  { k:"traite", term:"Traite", h:"Commerce ou trafic régulier dans lequel des captifs sont considérés comme de la marchandise.", lab:"Livre p. 148", s:"Livre p. 148, bulle jaune « Traite »", ch:"T", acc:["traite","la traite","une traite","traites"] },
  { k:"affr", term:"Affranchi", h:"Se disait de l'esclave, du serf qui recevait de son maître la liberté.", lab:"Dictionnaire Larousse", dico:true, s:"Dictionnaire Larousse, « affranchi », sens 1 (le mot n'est pas défini dans tes photos)", ch:"T", acc:["affranchi","un affranchi","affranchie","affranchis","esclave affranchi"] },
  { k:"cauri", term:"Cauris", h:"Coquillage du groupe des cyprées (ou porcelaines), qui a servi longtemps de monnaie à diverses populations, notamment en Afrique subsaharienne et en Inde.", short:"Coquillage qui a servi longtemps de monnaie, notamment en Afrique subsaharienne et en Inde.", lab:"Dictionnaire Larousse", dico:true, s:"Dictionnaire Larousse, « cauri » ou « cauris » (le mot n'est pas défini dans tes photos)", ch:"T", acc:["cauris","cauri","les cauris","des cauris","un cauri"] },
  { k:"masc", term:"Mascareignes", h:"Archipel de l'océan Indien formé de trois îles principales : La Réunion, l'île Maurice et Rodrigues.", lab:"Livre p. 148", s:"Livre p. 148, glossaire en bas de page", ch:"L", acc:["Mascareignes","les Mascareignes"] },
  { k:"chaland", term:"Chaland", h:"Bateau à fond plat, normalement destiné au transport des marchandises.", lab:"Livre p. 149", s:"Livre p. 149, glossaire en bas de page", ch:"G2", acc:["chaland","chalands","un chaland"] },
];
const DEF = Object.fromEntries(DEFS.map(d => [d.k, d]));
const bookDef = k => ({ t:"def", book:DEF[k].lab, dico:!!DEF[k].dico, term:DEF[k].term, h:DEF[k].h, s:DEF[k].s });

/* ---------- SCHÉMAS SVG (dessinés pour le Dossier, jamais tirés du livre) ---------- */
const P_PAGE = { ink:"var(--ink)", soft:"var(--soft)", rule:"var(--rule)", sheet:"var(--sheet)", box:"var(--box)", wash:"var(--box-wash)",
  crane:"var(--crane)", craneInk:"var(--crane-ink)", land:"var(--land)", red:"var(--bad)", font:"'Atkinson Hyperlegible', system-ui, sans-serif" };
const P_FIXE = { ink:"#231C17", soft:"#5E544B", rule:"#D6CCBF", sheet:"#FFFDF8", box:"#1F4E6B", wash:"#E1EAF0",
  crane:"#C8902E", craneInk:"#2E1D00", land:"#E8DFCF", red:"#A3243B", font:"Arial, Helvetica, sans-serif" };
const svgEsc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
function svgLines(P, x, y, lines, o = {}){
  const size = o.size || 11, lh = size * 1.25, anchor = o.anchor || "start";
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" style="font-family:${P.font};font-size:${size}px">` +
    lines.map((t, i) => `<tspan x="${x}" dy="${i ? lh : 0}" style="fill:${i === 0 && o.bold ? (o.c1 || P.ink) : (o.c2 || P.ink)};font-weight:${i === 0 && o.bold ? 700 : 400}">${svgEsc(t)}</tspan>`).join("") + `</text>`;
}
function svgArrow(P, x1, y1, x2, y2, c, dash){
  const a = Math.atan2(y2 - y1, x2 - x1), h = 7;
  const p1 = [x2 - h*Math.cos(a - 0.45), y2 - h*Math.sin(a - 0.45)], p2 = [x2 - h*Math.cos(a + 0.45), y2 - h*Math.sin(a + 0.45)];
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:${c};stroke-width:2${dash ? ";stroke-dasharray:" + dash : ""}"/>` +
    `<polygon points="${x2},${y2} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" style="fill:${c}"/>`;
}
/* 1. Le commerce triangulaire (G1, G6) — d'après le livre p. 148 (texte, doc. 1), p. 48 et le cahier ex. 3a (étapes C, A, D, B). */
function svgTriangle(P){
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 330" role="img" aria-label="Le commerce triangulaire en quatre étapes">`;
  const node = (x, y, t, sub) => `<rect x="${x - 60}" y="${y - 19}" width="120" height="38" rx="4" style="fill:${P.wash};stroke:${P.box};stroke-width:1.5"/>` +
    `<text x="${x}" y="${y - 2}" text-anchor="middle" style="font-family:${P.font};font-size:13.5px;font-weight:700;fill:${P.ink}">${svgEsc(t)}</text>` +
    `<text x="${x}" y="${y + 13}" text-anchor="middle" style="font-family:${P.font};font-size:10px;fill:${P.soft}">${svgEsc(sub)}</text>`;
  const badge = (x, y, t) => `<circle cx="${x}" cy="${y}" r="11" style="fill:${P.crane};stroke:${P.ink};stroke-width:1"/><text x="${x}" y="${y + 4.5}" text-anchor="middle" style="font-family:${P.font};font-size:13px;font-weight:700;fill:${P.craneInk}">${t}</text>`;
  s += node(272, 34, "Europe", "port de départ") + node(272, 236, "Afrique", "côte, ports") + node(74, 136, "Amérique", "colonies, Antilles");
  s += svgArrow(P, 300, 55, 300, 214, P.box);
  s += svgArrow(P, 212, 232, 118, 158, P.red);
  s += svgArrow(P, 118, 115, 212, 40, P.box);
  s += badge(272, 34 - 30, "C") + badge(318, 135, "A") + badge(150, 210, "D") + badge(150, 62, "B");
  s += svgLines(P, 288, 100, ["tissus, armes,", "alcool…"], { size:10.5, anchor:"end" });
  s += svgLines(P, 8, 214, ["esclaves", "vendus à des", "colons blancs"], { size:10.5, bold:true, c1:P.red });
  s += svgLines(P, 8, 24, ["coton, sucre, café,", "tabac… vendus", "en Europe"], { size:10.5 });
  s += svgLines(P, 4, 290, ["C : un armateur prépare le chargement · A : en Afrique, échange", "avec les rois locaux contre des esclaves · D : vente des esclaves", "en Amérique · B : marchandises coloniales rapportées en Europe."], { size:10, c2:P.soft });
  return s + `</svg>`;
}
/* 2. La frise des abolitions (D) — feuille d'objectifs, livre p. 149, notes de classe. Pas à l'échelle. */
const FRISE = [
  ["1500 à 1850 env.","Période de la traite atlantique","f"],
  ["1794","1re abolition de l'esclavage en France","f"],
  ["1802","Napoléon annule le décret","f"],
  ["1807","Grande-Bretagne : abolition de la traite","f"],
  ["1815","France : abolition de la traite","f"],
  ["1829","Le trafic culmine : 100 000 esclaves embarqués",""],
  ["1833","Grande-Bretagne : abolition de l'esclavage","f"],
  ["1845","Brésil : abolition de la traite (tes notes)","n"],
  ["1848","France : abolition de l'esclavage","f"],
  ["1865","USA : fin de la guerre civile, abolition, Lincoln assassiné","f"],
  ["1885","Conférence de Berlin : interdiction renouvelée",""],
  ["1888","Brésil : abolition de l'esclavage","f"],
];
function svgFrise(P){
  const top = 14, row = 28, H = top + FRISE.length * row + 50;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 ${H}" role="img" aria-label="Frise des dates à connaître, de la traite atlantique aux abolitions">`;
  s += `<line x1="104" y1="${top}" x2="104" y2="${top + FRISE.length * row - 12}" style="stroke:${P.box};stroke-width:3;stroke-linecap:round"/>`;
  FRISE.forEach(([y, t, k], i) => {
    const cy = top + i * row + 8;
    s += `<text x="94" y="${cy + 4}" text-anchor="end" style="font-family:${P.font};font-size:11.5px;font-weight:700;fill:${P.ink}">${svgEsc(y)}</text>`;
    if (k === "f") s += `<polygon points="104,${cy - 8} 112,${cy} 104,${cy + 8} 96,${cy}" style="fill:${P.crane};stroke:${P.ink};stroke-width:1"/>`;
    else if (k === "n") s += `<rect x="97" y="${cy - 7}" width="14" height="14" style="fill:${P.sheet};stroke:${P.ink};stroke-width:1.2"/>`;
    else s += `<circle cx="104" cy="${cy}" r="4" style="fill:${P.box}"/>`;
    const words = t.split(" "), lines = []; let cur = "";
    words.forEach(w => { if ((cur + " " + w).trim().length > 36){ lines.push(cur.trim()); cur = w; } else cur += " " + w; }); lines.push(cur.trim());
    s += `<text x="120" y="${cy + 4 - (lines.length - 1) * 6}" style="font-family:${P.font};font-size:11.5px;fill:${P.ink}">` + lines.map((l, j) => `<tspan x="120" dy="${j ? 12 : 0}">${svgEsc(l)}</tspan>`).join("") + `</text>`;
  });
  const ly = top + FRISE.length * row + 6;
  s += `<polygon points="10,${ly - 7} 17,${ly} 10,${ly + 7} 3,${ly}" style="fill:${P.crane};stroke:${P.ink};stroke-width:1"/><text x="24" y="${ly + 4}" style="font-family:${P.font};font-size:10.5px;fill:${P.ink}">dates de ta feuille d'objectifs</text>`;
  s += `<rect x="4" y="${ly + 13}" width="12" height="12" style="fill:${P.sheet};stroke:${P.ink};stroke-width:1.2"/><text x="24" y="${ly + 23}" style="font-family:${P.font};font-size:10.5px;fill:${P.ink}">date de tes notes de classe · rond : livre p. 149</text>`;
  s += `<text x="4" y="${ly + 40}" style="font-family:${P.font};font-size:10px;fill:${P.soft}">Frise pas à l'échelle.</text>`;
  return s + `</svg>`;
}
const SVGS = { triangle:svgTriangle, frise:svgFrise };

/* ============================================================
   DOSSIER — rangé exactement comme la feuille d'objectifs.
   Blocs : p, h3, def, mine, html, tip, ex, links, see, src, pause, svg
   ============================================================ */
const tbl = (head, rows, note) => `<div class="tbl"><table><thead><tr>${head.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map((c, i) => `<td${i === 0 ? ' class="k"' : ""}>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>${note ? `<p class="fine">${note}</p>` : ""}`;
const NOTES = "Tes notes de classe (cahier, pages « His »)";

const PAGES = [
/* ---------------- FIL ROUGE ---------------- */
{ id:"LIENS", ch:"", titre:"Le fil rouge de l'épreuve", court:"Capturer, transporter, vendre, puis débattre et abolir",
  pre:[{ q:"La traite et l'esclavage, est-ce la même chose ?", a:"Non. La traite, c'est le commerce des captifs ; l'esclavage, c'est l'état de personnes non libres, propriété d'un maître. Tes notes le disent en gros : « Traite des Noirs ≠ Esclavage ».", s:"Tes notes de classe · livre p. 148, bulle jaune · lexique" }, { q:"Pourquoi la Grande-Bretagne abolit-elle la traite en 1807, mais l'esclavage seulement en 1833 ?", a:"Parce que ce sont deux choses différentes : on arrête d'abord le commerce des captifs, puis on libère les personnes déjà esclaves.", s:"Feuille d'objectifs, dates 1807 et 1833 · tes notes de classe" }],
  blank:{ consigne:"Sur une feuille blanche, raconte le thème en quatre étapes, avec une date ou un nom pour chacune.", points:["Pourquoi : les plantations d'Amérique ont besoin d'une main-d'œuvre abondante et bon marché, on se tourne vers l'Afrique","Comment : le commerce triangulaire en 4 étapes (C, A, D, B) ; les armateurs, même vaudois","Le calvaire : 307 captifs entassés sur le Marie-Séraphique, Equiano étouffe presque","Le débat et les abolitions : Condorcet (1781), 1794 puis 1802, 1807/1815 la traite, 1833/1848/1865/1888 l'esclavage ; le travail forcé continue (Albert Londres)"], s:"Feuille d'objectifs · livre pp. 148-149 · cahier ex. 3 à 5" },
  blocks:[
  { t:"p", s:"Livre p. 148, texte d'introduction (en gras)", h:"Ton thème raconte une seule histoire. <b>Pratiqué depuis l'Antiquité, l'esclavage à grande échelle n'est pas propre à la période coloniale.</b> Mais les anciennes colonies d'Amérique et les empires coloniaux du XIX<sup>e</sup> siècle n'ont pu fonctionner que grâce aux esclaves africains, <b>une main-d'œuvre abondante et bon marché</b>." },
  { t:"mine", s:NOTES, titre:"⚠ Le premier mot de tes notes", items:["Traite des Noirs ≠ Esclavage.","La traite, c'est le commerce des captifs ; l'esclavage, c'est l'état de la personne qui n'est pas libre. Les deux ne s'arrêtent pas en même temps : 1807 traite, 1833 esclavage en Grande-Bretagne."] },
  { t:"h3", h:"Les quatre temps du thème" },
  { t:"html", s:"Feuille d'objectifs · livre pp. 148-149", h:`<div class="trio">
    <div class="trio-s"><span class="trio-k">1</span><div><b>Pourquoi des esclaves ?</b><p>Les plantations du Nouveau-Monde demandent énormément de main-d'œuvre ; les bénéfices sont énormes.</p><div class="chips"><button data-act="page" data-v="G3">G3 motiver</button><button data-act="page" data-v="G5">G5 justifier</button></div></div></div>
    <div class="trio-s"><span class="trio-k">2</span><div><b>Comment ?</b><p>Capture en Afrique, commerce triangulaire, traversée de l'Atlantique, vente en Amérique.</p><div class="chips"><button data-act="page" data-v="G1">G1 organisation</button><button data-act="page" data-v="G4">G4 Afrique</button><button data-act="page" data-v="G6">G6 acteurs, lieux</button><button data-act="page" data-v="L">L lieux</button></div></div></div>
    <div class="trio-s"><span class="trio-k">3</span><div><b>Qui témoigne, qui dénonce ?</b><p>Equiano raconte sa capture ; Condorcet et les abolitionnistes dénoncent.</p><div class="chips"><button data-act="page" data-v="P">P personnages</button><button data-act="page" data-v="G2">G2 débats</button></div></div></div>
    <div class="trio-s"><span class="trio-k">4</span><div><b>Les abolitions</b><p>D'abord la traite, puis l'esclavage, pays par pays ; le travail forcé continue jusqu'à la fin de l'époque coloniale.</p><div class="chips"><button data-act="page" data-v="D">D dates</button><button data-act="page" data-v="X">X exercices</button></div></div></div></div>` },
  { t:"h3", h:"Les liens à savoir faire" },
  { t:"links", s:"Livre p. 48, p. 148, p. 149 · cahier ex. 3 et 4", items:[
    [["G3","G1"], "Les plantations ont besoin de bras ; les colons et les populations locales ne suffisent pas : on se tourne vers l'Afrique. C'est la traite atlantique, intégrée dans le commerce triangulaire."],
    [["G4","G6"], "En Afrique, des marchands africains capturent et vendent ; dans les ports, les marchands européens viennent se « ravitailler ». Les navires viennent d'Europe, même de Suisse."],
    [["G5","G2"], "On disait qu'on « sauvait » des condamnés en les achetant ; Condorcet répond que c'est quand même un crime de les acheter pour les revendre."],
    [["G2","D"], "Les abolitions arrivent au XIX<sup>e</sup> siècle, mais le trafic continue jusqu'en 1829 et le travail forcé jusqu'à la fin de l'époque coloniale."]] },
  { t:"pause", q:"Pourquoi les colonies d'Amérique ont-elles besoin des esclaves africains, selon le livre ?", a:"Ce sont une main-d'œuvre abondante et bon marché ; les immenses plantations demandent beaucoup de bras, et les colons et les populations locales ne sont pas assez nombreux.", s:"Livre p. 148, introduction et texte" },
  { t:"h3", h:"Les dates de l'épreuve" },
  { t:"svg", k:"frise", titre:"Les dates à connaître, dans l'ordre", alt:"La frise suit le thème dans l'ordre. De 1500 à 1850 environ, période de la traite atlantique. En 1794, première abolition de l'esclavage en France ; en 1802, Napoléon annule le décret. En 1807, la Grande-Bretagne abolit la traite ; en 1815, la France. En 1829, le trafic culmine avec 100 000 esclaves embarqués. En 1833, la Grande-Bretagne abolit l'esclavage. En 1845, selon tes notes de classe, le Brésil abolit la traite. En 1848, la France abolit l'esclavage. En 1865, fin de la guerre civile aux États-Unis, abolition de l'esclavage et assassinat d'Abraham Lincoln. En 1885, la conférence de Berlin renouvelle l'interdiction. En 1888, le Brésil abolit l'esclavage. Les dates de ta feuille d'objectifs sont marquées d'un losange.", s:"Feuille d'objectifs, dates · livre p. 149 · tes notes de classe" },
  { t:"pause", q:"Dans chaque pays, qu'est-ce qui est aboli en premier : la traite ou l'esclavage ?", a:"La traite : Grande-Bretagne 1807 puis 1833, France 1815 puis 1848, Brésil 1845 (tes notes) puis 1888.", s:"Feuille d'objectifs · tes notes de classe" },
  { t:"tip", h:"Ta feuille dit aussi de revoir les documents, cartes, chiffres et textes des pp. 48, 148 et 149, tes notes de classe et les exercices du thème. Chaque chapitre de ce Dossier se termine par une phrase-modèle à recopier : apprends-la, elle t'aide pour les réponses rédigées." },
]},

/* ---------------- G1 ---------------- */
{ id:"G1", ch:"G", titre:"Comment s'organisent la traite et l'esclavage", court:"Deux traites, le commerce triangulaire, le rythme, la traversée",
  obj:"Savoir comment s'organise la traite et l'esclavage",
  pre:[{ q:"Combien de traites le livre décrit-il, et vers où vont les esclaves ?", a:"Deux : la traite atlantique, vers l'Amérique, et la traite orientale, vers les empires musulmans.", s:"Livre p. 148, texte" }, { q:"Quelle est la première étape du commerce triangulaire ?", a:"C : un armateur prépare le chargement d'un navire avec des marchandises européennes (tissus, armes, alcool).", s:"Cahier p. 70, ex. 3a (corrigé)" }],
  blank:{ consigne:"Dessine de mémoire le commerce triangulaire : trois continents, quatre étapes, ce que transporte le navire à chaque fois.", points:["C : en Europe, un armateur charge des marchandises européennes (tissus, armes, alcool)","A : en Afrique, le capitaine les échange avec les rois locaux contre des esclaves","D : en Amérique, les esclaves sont vendus à des colons blancs","B : le navire rapporte des marchandises coloniales (coton, sucre, café, tabac) vendues en Europe","Le rythme : environ 5 millions d'esclaves embarqués au XVIIIe siècle (doc. 2) ; 100 000 en 1829"], s:"Livre p. 148 · cahier ex. 3a" },
  blocks:[
  { t:"p", s:"Livre p. 148, texte", h:"Le système qui s'est mis en place dès le XVI<sup>e</sup> siècle connaît, aux XVIII<sup>e</sup> et XIX<sup>e</sup> siècles, une ampleur sans précédent. <b>Deux traites ont coexisté</b> : une <b>traite atlantique</b> dirigeant les esclaves vers l'Amérique et une <b>traite orientale</b> conduisant les esclaves vers les empires musulmans. La traite atlantique s'intègre dans un vaste système d'échanges nommé <b>« commerce triangulaire »</b>." },
  bookDef("traite"),
  { t:"h3", h:"Le commerce triangulaire en quatre étapes" },
  { t:"svg", k:"triangle", titre:"Le commerce triangulaire (étapes de ton exercice 3)", alt:"Le schéma relie trois continents. Étape C, en Europe : un armateur prépare le chargement d'un navire avec des marchandises européennes, tissus, armes, alcool. Le navire va en Afrique. Étape A : le capitaine échange ses marchandises avec les rois locaux contre des esclaves africains. Le navire traverse l'Atlantique. Étape D : en Amérique, les esclaves sont vendus à des colons blancs. Étape B : le navire remplit ses cales de marchandises coloniales, coton, sucre, café, tabac, qui seront vendues en Europe.", s:"Cahier p. 70, ex. 3a (corrigé) · livre p. 148, doc. 1" },
  { t:"mine", s:"Cahier p. 70, ex. 3a (corrigé)", titre:"Ton exercice 3a, dans l'ordre", items:["Étape 1 = C : un armateur prépare le chargement d'un navire avec des marchandises européennes (tissus, armes, alcool, etc.).","Étape 2 = A : le navire accoste en Afrique ; le capitaine échange ses marchandises avec les rois locaux contre des esclaves africains.","Étape 3 = D : le navire se dirige vers les colonies d'Amérique, où les esclaves sont vendus à des colons blancs.","Étape 4 = B : le capitaine remplit ses cales de marchandises coloniales (coton, sucre, café, tabac, etc.) qui seront vendues en Europe."] },
  { t:"p", s:"Livre p. 148, doc. 1 « La traite atlantique » (légende)", h:"La carte du doc. 1 montre deux circuits : le <b>commerce triangulaire</b> (Europe → Afrique → Amérique → Europe, trait plein) et le <b>commerce entre colonies portugaises</b>, directement entre l'Angola et le Brésil (trait pointillé)." },
  { t:"pause", q:"Remets les étapes dans l'ordre : vente en Amérique, chargement en Europe, retour avec du sucre, échange en Afrique.", a:"Chargement en Europe (C), échange en Afrique (A), vente en Amérique (D), retour avec du sucre, du coton, du café (B).", s:"Cahier p. 70, ex. 3a" },
  { t:"h3", h:"Le rythme de la traite (doc. 2)" },
  { t:"html", s:"Livre p. 148, doc. 2 « Le rythme de la traite atlantique » (valeurs lues sur le graphique, donc arrondies)", h:tbl(["Période","Ce que montre le graphique"], [
    ["1563-1600","presque rien"],
    ["1601-1700","moins d'un demi-million d'esclaves embarqués"],
    ["<b>1701-1800</b>","<b>le sommet : environ 5 millions d'esclaves embarqués</b>, près de 15 000 expéditions"],
    ["1801-1866","moins, mais encore beaucoup : un peu moins de 3 millions"]], "Le graphique a deux échelles : à gauche les esclaves embarqués (en millions, les barres), à droite le nombre d'expéditions (la ligne rouge).") },
  { t:"p", s:"Livre p. 149, « Abolition : des paroles et des actes ? »", h:"Le trafic se poursuit tout au long du XIX<sup>e</sup> siècle et <b>culmine en 1829 avec 100 000 esclaves embarqués</b>." },
  { t:"mine", s:NOTES, titre:"Tes notes de classe", items:["XVIIIe siècle : commerce triangulaire ; les bateaux arrivent très fréquemment au port de Charleston (Caroline du Sud, Amérique du Nord).","Trafic de masse d'esclaves : en 8 ans, plus de 60 000 000 de Noirs ont été transférés."] },
  { t:"pause", q:"Selon le doc. 2, pendant quelle période la traite atlantique est-elle la plus forte ?", a:"De 1701 à 1800 (le XVIIIe siècle) : environ 5 millions d'esclaves embarqués.", s:"Livre p. 148, doc. 2" },
  { t:"h3", h:"La traversée : le calvaire des esclaves" },
  { t:"p", s:"Cahier p. 71, doc. b (« Plan du pont et de l'entrepont du Marie-Séraphique », aquarelle, 1769) et doc. c (Frossard, 1784)", h:"Sur le <b>Marie-Séraphique</b>, navire négrier nantais (1769), <b>307 hommes, femmes et enfants</b> sont entassés dans l'entrepont selon une organisation très précise ; le plan a sans doute été réalisé à la demande de l'armateur. Benjamin Frossard (1784) décrit un navire destiné à transporter <b>140 esclaves</b> : la pièce mesurait <b>12 m de long, 3 m de large et 1,20 m de haut</b> ; ils n'ont pu se tenir qu'assis ou couchés, et ont été ferrés pendant toute la traversée." },
  { t:"p", s:"Livre p. 149, doc. 5 (Equiano)", h:"Olaudah Equiano raconte que le bateau était si encombré que chacun avait à peine l'espace pour se retourner ; l'étroitesse, la chaleur et le monde « nous étouffaient presque ». Deux de ses compatriotes enchaînés, préférant la mort à une telle vie de misère, sautèrent à la mer." },
  { t:"mine", s:"Cahier p. 71, ex. 5 (corrigé)", titre:"Ton exercice 5", items:["Doc. 5 : prix en coquillages, esclave qui se fait vendre, vie de misère, peine à se retourner, étouffé, chaînes, « suicide ».","Doc. c : un navire qui transporte 140 esclaves ; pièce de 12 m × 3 m × 1,20 m = l'intérieur où sont les esclaves ; position des esclaves.","Doc. b : on voit la longueur, la largeur, un trou qui fait office de cage, les esclaves en dessous ; 307 esclaves couchés, serrés de façon organisée pour gagner un maximum de place.","Difficulté de l'illustrateur : la hauteur en dessous du bateau (l'endroit des esclaves)."] },
  { t:"pause", q:"Combien de captifs sont entassés sur le Marie-Séraphique, et pourquoi de façon si organisée ?", a:"307 hommes, femmes et enfants, serrés de façon organisée pour gagner un maximum de place.", s:"Cahier p. 71, doc. b et ex. 5" },
  { t:"tip", h:"Phrase-modèle : « La traite atlantique fait partie du commerce triangulaire : un navire part d'Europe avec des marchandises, les échange en Afrique contre des esclaves, vend les esclaves en Amérique et rapporte en Europe du sucre, du coton, du café ou du tabac. » N'oublie pas de distinguer la traite (le commerce) et l'esclavage (l'état de la personne)." },
  { t:"see", ids:["G6","G4","T"] },
  { t:"src", h:"Livre p. 148 (texte, doc. 1, doc. 2, bulle jaune), p. 149 (doc. 5, abolition) · cahier ex. 3a et 5 · tes notes de classe" },
]},

/* ---------------- G2 ---------------- */
{ id:"G2", ch:"G", titre:"Les débats autour de la traite et de l'esclavage", court:"Abolitionnistes, Condorcet, des paroles et des actes, Albert Londres",
  obj:"Savoir quels sont les débats autour de la pratique de la traite et de l'esclavage",
  pre:[{ q:"À l'époque, pourquoi semble-t-il impossible de remettre l'esclavage en cause ?", a:"Parce que ses bénéfices sont énormes. Au mieux, on cherche à limiter les abus.", s:"Livre p. 149, « Un sujet qui fait débat »" }, { q:"Une loi d'abolition suffit-elle à faire disparaître l'esclavage ?", a:"Non : le trafic continue au XIXe siècle et le travail forcé persiste jusqu'à la fin de l'époque coloniale.", s:"Livre p. 149, « Abolition : des paroles et des actes ? »" }],
  blank:{ consigne:"Écris les deux camps du débat et ce qui se passe après les abolitions.", points:["Pour : les bénéfices sont tels que l'esclavage semble impossible à remettre en cause ; au mieux, on limite les abus","Contre : au XVIIIe siècle, les abolitionnistes, proches des penseurs des Lumières (Condorcet, 1781)","1794 abolition en France, 1802 Napoléon annule ; le trafic culmine en 1829","Après les abolitions : la conférence de Berlin (1885) renouvelle l'interdiction, mais le travail forcé continue (Albert Londres, 1929)"], s:"Livre p. 149" },
  blocks:[
  { t:"h3", h:"Un sujet qui fait débat" },
  { t:"p", s:"Livre p. 149, « Un sujet qui fait débat »", h:"<b>Les bénéfices de l'esclavage sont tels qu'il semble, à l'époque, impossible de le remettre en cause.</b> Au mieux cherche-t-on à limiter les abus. Au XVIII<sup>e</sup> siècle, des <b>abolitionnistes</b>, proches des penseurs des <b>Lumières</b>, commencent à dénoncer l'esclavage." },
  bookDef("abo"),
  { t:"p", s:"Livre p. 149, doc. 6 (Condorcet, Réflexions sur l'esclavage des Nègres, 1781)", h:"<b>Condorcet</b> rapporte ce que disaient les défenseurs de la traite : ceux qu'on achète en Afrique seraient des criminels condamnés à mort ou des prisonniers de guerre, qu'on tuerait s'ils n'étaient pas achetés ; certains écrivains présentaient donc la traite comme « presque un acte d'humanité ». Condorcet répond : même si on leur sauve la vie, on commet quand même un crime en les achetant, si c'est pour les revendre ou les réduire en esclavage." },
  { t:"mine", s:"Cahier p. 70, ex. 4a et 4b (corrigés)", titre:"Ton exercice 4", items:["a) L'argument que Condorcet conteste : on sauve la vie des « Nègres » criminels condamnés à mort ou prisonniers de guerre.","b) Sa réponse : c'est un crime d'acheter d'autres humains et de les vendre."] },
  { t:"pause", q:"Que répond Condorcet à ceux qui disent qu'acheter des esclaves leur sauve la vie ?", a:"Que même en leur sauvant la vie, on commet un crime en les achetant, si c'est pour les revendre ou les réduire en esclavage.", s:"Livre p. 149, doc. 6 · cahier ex. 4b" },
  { t:"h3", h:"Abolition : des paroles et des actes ?" },
  { t:"p", s:"Livre p. 149, « Abolition : des paroles et des actes ? »", h:"<b>En 1794</b>, la France abolit une première fois l'esclavage, au nom des idéaux révolutionnaires. <b>Napoléon annule le décret en 1802.</b> Le trafic se poursuit tout au long du XIX<sup>e</sup> siècle et culmine en 1829 avec 100 000 esclaves embarqués. Malgré l'abolition officielle (1833 au Royaume-Uni, 1848 en France, 1865 aux États-Unis), la pratique perdure : la <b>conférence de Berlin</b> renouvelle l'interdiction en <b>1885</b>. Mais sur le terrain, on recense de nombreux cas de <b>travail forcé</b>, jusqu'à la fin de l'époque coloniale : hommes, femmes et enfants sont réquisitionnés pour des travaux exténuants, pas ou à peine payés ; toute fuite ou désobéissance est punie de manière violente et disproportionnée." },
  { t:"pause", q:"Pourquoi le titre du livre dit-il « des paroles et des actes ? »", a:"Parce que les lois d'abolition (les paroles) n'arrêtent pas tout de suite la pratique (les actes) : le trafic continue et le travail forcé persiste.", s:"Livre p. 149" },
  { t:"h3", h:"Albert Londres dénonce le travail forcé (1929)" },
  { t:"p", s:"Livre p. 149, doc. 8 (Albert Londres, Terre d'ébène : la traite des noirs, 1929)", h:"Le journaliste <b>Albert Londres</b> décrit la construction de la ligne de chemin de fer Congo-Océan : il parle de « matériel humain » qui « n'était plus de première qualité », d'un « déchet » qui augmente ; les chalands « auraient pu s'appeler des corbillards » et les chantiers « des fosses communes ». Un détachement perd 75 % de son effectif. Un responsable disait qu'il fallait « accepter le sacrifice de 8000 à 10 000 hommes » ; le sacrifice fut plus considérable, jusqu'à 17 000." },
  bookDef("chaland"),
  { t:"mine", s:"Cahier p. 70, ex. 4c et 4d (corrigés)", titre:"Ton exercice 4 (suite)", items:["c) Les mots qu'Albert Londres utilise pour dénoncer : matériel humain, déchet, corbillards, fosses communes, sacrifice.","d) Ce texte laisse entendre qu'on parle d'esclaves : le titre « la traite des Noirs » et « matériel humain »."] },
  { t:"pause", q:"Quels mots d'Albert Londres montrent que les travailleurs sont traités comme des objets ?", a:"« Matériel humain », « déchet » ; et les chalands comparés à des corbillards, les chantiers à des fosses communes.", s:"Livre p. 149, doc. 8 · cahier ex. 4c" },
  { t:"tip", h:"Phrase-modèle : « Au XVIIIe siècle, l'esclavage rapporte tant qu'on le remet peu en cause ; les abolitionnistes comme Condorcet le dénoncent. Les abolitions arrivent au XIXe siècle, mais le trafic et le travail forcé continuent : ce sont des paroles, pas encore des actes. »" },
  { t:"see", ids:["G5","P","D"] },
  { t:"src", h:"Livre p. 149 (texte, doc. 6, doc. 8, glossaires) · cahier ex. 4" },
]},

/* ---------------- G3 ---------------- */
{ id:"G3", ch:"G", titre:"Ce qui motive et justifie ces pratiques", court:"Main-d'œuvre, plantations, bénéfices",
  obj:"Savoir ce qui motive et justifie ces pratiques par les Européens",
  pre:[{ q:"Pourquoi les Européens vont-ils chercher la main-d'œuvre en Afrique et pas en Amérique ?", a:"La population amérindienne est décimée par les maladies, et les colons et les populations locales ne sont pas assez nombreux.", s:"Livre p. 48 et p. 148" }, { q:"Selon tes notes, quel « mariage » donne le maximum de bénéfice ?", a:"Le mariage de l'homme noir et de la canne à sucre.", s:"Tes notes de classe" }],
  blank:{ consigne:"Écris trois raisons qui poussent les Européens à pratiquer la traite, avec un mot ou un chiffre pour chacune.", points:["Besoin de main-d'œuvre : les immenses plantations du Nouveau-Monde (canne à sucre, coton) et les mines","Les Amérindiens sont décimés ; les colons et les populations locales ne suffisent pas","Une main-d'œuvre abondante et bon marché : environ 8 à 12 livres sterling (tes notes)","Les bénéfices sont si grands qu'on ne remet pas l'esclavage en cause"], s:"Livre p. 48, p. 148, p. 149 · tes notes de classe" },
  blocks:[
  { t:"h3", h:"Le besoin de main-d'œuvre" },
  { t:"p", s:"Livre p. 148, texte", h:"Les immenses <b>plantations du Nouveau-Monde</b> (Amériques et Caraïbes) nécessitent une main-d'œuvre très importante. Les colons européens et les populations locales n'étant pas en nombre suffisant, <b>on se tourne vers l'Afrique</b>." },
  { t:"p", s:"Livre p. 48, texte (photo du 24.10.2026)", h:"La population amérindienne étant décimée par les maladies, c'est en Afrique que les puissances coloniales vont chercher l'importante main-d'œuvre nécessaire à l'exploitation des <b>mines</b>, des <b>plantations de canne à sucre ou de coton</b>." },
  { t:"pause", q:"Pour quelles exploitations les puissances coloniales ont-elles besoin de cette main-d'œuvre ?", a:"Les mines, les plantations de canne à sucre ou de coton.", s:"Livre p. 48" },
  { t:"h3", h:"Une main-d'œuvre abondante et bon marché" },
  { t:"p", s:"Livre p. 148, introduction (en gras)", h:"Les colonies d'Amérique et les empires coloniaux du XIX<sup>e</sup> siècle n'ont pu fonctionner que grâce aux esclaves africains, <b>une main-d'œuvre abondante et bon marché</b>." },
  { t:"mine", s:NOTES, titre:"Tes notes de classe", items:["Le mariage de l'homme noir et de la canne à sucre = maximum de bénéfice.","Les esclaves coûtaient environ 8 à 12 livres sterling, ce qui équivaut à 950 à 1500 euros."] },
  { t:"h3", h:"Des bénéfices énormes" },
  { t:"p", s:"Livre p. 149, « Un sujet qui fait débat »", h:"Les bénéfices de l'esclavage sont tels qu'il semble, à l'époque, impossible de le remettre en cause." },
  { t:"pause", q:"Pourquoi, à l'époque, presque personne ne remet l'esclavage en cause ?", a:"Parce que ses bénéfices sont énormes ; au mieux, on cherche à limiter les abus.", s:"Livre p. 149" },
  { t:"p", s:"Livre p. 149, doc. 7 (affiche, Charleston, 1769)", h:"L'affiche de Charleston annonce la vente « d'une cargaison de 94 nègres » (« A cargo of ninety-four prime, healthy negroes ») : des êtres humains présentés comme une marchandise de bonne qualité. C'est exactement la définition de la traite : des captifs considérés comme de la marchandise." },
  { t:"tip", h:"Phrase-modèle : « Les Européens pratiquent la traite parce que les plantations et les mines d'Amérique ont besoin d'une main-d'œuvre très nombreuse et bon marché, et parce que ce commerce rapporte d'énormes bénéfices. » Pour la justification par un argument, voir G5." },
  { t:"see", ids:["G5","G1","G6"] },
  { t:"src", h:"Livre p. 48 (texte), p. 148 (introduction, texte), p. 149 (débat, doc. 7) · tes notes de classe" },
]},

/* ---------------- G4 ---------------- */
{ id:"G4", ch:"G", titre:"Les caractéristiques de la traite en Afrique", court:"Réseaux de capture, ports, rois locaux, coquillages",
  obj:"Savoir quelles sont les principales caractéristiques de la traite en Afrique",
  pre:[{ q:"Qui capture les captifs en Afrique et les amène jusqu'aux ports ?", a:"Des réseaux de capture et de vente organisés par des marchands africains.", s:"Livre p. 148, « Un système à grande échelle »" }, { q:"Contre quoi Equiano a-t-il été vendu ?", a:"Contre 172 coquillages.", s:"Livre p. 149, doc. 5" }],
  blank:{ consigne:"Raconte le chemin d'un captif en Afrique, de la capture jusqu'au navire.", points:["Capture par des réseaux de capture et de vente organisés par des marchands africains","Le captif est vendu (Equiano : pour 172 coquillages), parfois plusieurs fois","Il marche jusqu'à la côte (Equiano : six ou sept mois après sa capture)","Dans les ports (Gorée), les marchands européens viennent se « ravitailler » ; le capitaine échange ses marchandises avec les rois locaux"], s:"Livre pp. 148-149 · cahier ex. 3a" },
  blocks:[
  { t:"p", s:"Livre p. 148, « Un système à grande échelle »", h:"En Afrique, des <b>réseaux de capture et de vente organisés par des marchands africains</b> conduisent les captifs jusqu'aux <b>ports</b> dans lesquels les marchands européens viennent se « ravitailler »." },
  { t:"p", s:"Cahier p. 70, ex. 3a, étape A", h:"Étape A du commerce triangulaire : le navire accoste en Afrique ; le capitaine échange ses marchandises avec les <b>rois locaux</b> contre des esclaves africains." },
  { t:"mine", s:NOTES, titre:"Tes notes de classe", items:["Ceux qui vendent les esclaves sont des mafieux, trafiquants de Noirs."] },
  { t:"pause", q:"Dans les ports africains, que viennent faire les marchands européens ?", a:"Ils viennent se « ravitailler » : acheter les captifs amenés par les réseaux de marchands africains.", s:"Livre p. 148" },
  { t:"h3", h:"Le témoignage d'Equiano" },
  { t:"p", s:"Livre p. 149, doc. 5 (Equiano, 1789)", h:"Equiano raconte qu'un marchand le vendit <b>pour 172 coquillages</b> à une riche veuve, et que <b>six ou sept mois après sa capture</b>, il arriva à la côte maritime." },
  bookDef("cauri"),
  { t:"pause", q:"Combien de temps Equiano met-il pour arriver à la côte après sa capture ?", a:"Six ou sept mois.", s:"Livre p. 149, doc. 5" },
  { t:"h3", h:"Les ports et les régions" },
  { t:"p", s:"Livre p. 148, doc. 4 (« Marchand d'esclaves de Gorée (Sénégal) », gravure de Jacques Grasset de Saint-Sauveur, Encyclopédie des voyages, 1796) · cahier p. 69, ex. 2b", h:"Le doc. 4 montre un <b>marchand d'esclaves de Gorée</b>, au Sénégal (gravure de 1796, l'événement A de ton exercice 2)." },
  { t:"p", s:"Livre p. 148, doc. 3 · cahier p. 70, ex. 3e et 3f", h:"Les armateurs vaudois vont s'approvisionner en esclaves au <b>Mozambique</b>, sur la côte de l'océan Indien. Ton exercice 3e compare avec la carte du doc. 1 : <b>ils sont allés chercher des esclaves plus loin</b> ; et pourquoi ? Ta réponse : un <b>prix inférieur</b>." },
  { t:"p", s:"Livre p. 148, texte · doc. 1", h:"Il ne faut pas oublier la <b>traite orientale</b>, qui conduisait les esclaves vers les empires musulmans, et le commerce direct entre l'Angola et le Brésil (doc. 1)." },
  { t:"tip", h:"Phrase-modèle : « En Afrique, des réseaux de marchands africains capturent et vendent les captifs ; ils les conduisent jusqu'aux ports, comme Gorée, où les Européens les achètent contre des marchandises. Equiano, par exemple, a été vendu pour 172 coquillages. »" },
  { t:"see", ids:["L","P","G1"] },
  { t:"src", h:"Livre p. 148 (texte, doc. 1, 3, 4), p. 149 (doc. 5) · cahier ex. 2b, 3 · Larousse (cauris) · tes notes de classe" },
]},

/* ---------------- G5 ---------------- */
{ id:"G5", ch:"G", titre:"Les arguments des Européens pour justifier l'esclavage", court:"« On leur sauve la vie », des marchandises, le sacrifice",
  obj:"Connaître les arguments des Européens pour justifier l'esclavage",
  pre:[{ q:"Quel argument donnait-on, selon Condorcet, pour excuser l'esclavage des Africains achetés ?", a:"Ce seraient des criminels condamnés à mort ou des prisonniers de guerre, qu'on tuerait s'ils n'étaient pas achetés par les Européens.", s:"Livre p. 149, doc. 6" }, { q:"Comment certains écrivains présentaient-ils alors la traite ?", a:"Comme « presque un acte d'humanité ».", s:"Livre p. 149, doc. 6" }],
  blank:{ consigne:"Écris les arguments des défenseurs de l'esclavage, puis la réponse de Condorcet.", points:["Ceux qu'on achète seraient des criminels condamnés au dernier supplice ou des prisonniers de guerre","Ils seraient mis à mort s'ils n'étaient pas achetés : la traite serait « presque un acte d'humanité »","Les bénéfices sont si grands qu'on ne remet pas l'esclavage en cause","Les captifs sont considérés comme de la marchandise (« a cargo » à Charleston)","Condorcet : c'est quand même un crime de les acheter pour les revendre ou les réduire en esclavage"], s:"Livre pp. 148-149 · cahier ex. 4" },
  blocks:[
  { t:"h3", h:"« On leur sauve la vie »" },
  { t:"p", s:"Livre p. 149, doc. 6 (Condorcet, 1781)", h:"Condorcet rapporte l'argument : on dit, pour excuser l'esclavage des Africains achetés, qu'ils sont <b>ou des criminels condamnés au dernier supplice</b> (à la mort), <b>ou des prisonniers de guerre</b>, qui seraient mis à mort s'ils n'étaient pas achetés par les Européens. D'après ce raisonnement, quelques écrivains présentent la traite comme <b>« presque un acte d'humanité »</b>." },
  { t:"pause", q:"Qui seraient, selon cet argument, les Africains achetés ?", a:"Des criminels condamnés à mort ou des prisonniers de guerre.", s:"Livre p. 149, doc. 6 · cahier ex. 4a" },
  { t:"h3", h:"Des êtres humains vus comme une marchandise" },
  { t:"p", s:"Livre p. 148 (bulle jaune) · p. 149 (doc. 7) · cahier ex. 4", h:"Dans la traite, les captifs sont <b>considérés comme de la marchandise</b>. L'affiche de Charleston (1769) annonce « une cargaison » de 94 personnes « de première qualité, en bonne santé ». Plus tard encore, Albert Londres entend parler de « matériel humain » et d'un « sacrifice » de 8000 à 10 000 hommes « à accepter » pour construire un chemin de fer." },
  { t:"h3", h:"Les bénéfices" },
  { t:"p", s:"Livre p. 149, « Un sujet qui fait débat »", h:"Les bénéfices de l'esclavage sont tels qu'il semble, à l'époque, impossible de le remettre en cause ; au mieux cherche-t-on à limiter les abus." },
  { t:"h3", h:"La réponse de Condorcet" },
  { t:"p", s:"Livre p. 149, doc. 6 · cahier ex. 4b", h:"En supposant qu'on sauve la vie de ceux qu'on achète, <b>on ne commet pas moins un crime</b> en les achetant, si c'est pour les revendre ou les réduire en esclavage. Ta réponse à l'exercice 4b : c'est un crime d'acheter d'autres humains et de les vendre." },
  { t:"pause", q:"Pourquoi l'argument « on leur sauve la vie » ne tient-il pas, selon Condorcet ?", a:"Parce qu'acheter un être humain pour le revendre ou le réduire en esclavage reste un crime, même si on lui sauve la vie.", s:"Livre p. 149, doc. 6" },
  { t:"tip", h:"Phrase-modèle : « Pour justifier l'esclavage, on disait que les Africains achetés étaient des condamnés ou des prisonniers de guerre qu'on sauvait de la mort ; Condorcet répond que les acheter pour les revendre reste un crime. » Cite toujours l'argument, puis la réponse." },
  { t:"see", ids:["G2","G3","P"] },
  { t:"src", h:"Livre p. 148 (bulle jaune), p. 149 (débat, doc. 6, 7, 8) · cahier ex. 4" },
]},

/* ---------------- G6 ---------------- */
{ id:"G6", ch:"G", titre:"Acteurs, lieux et marchandises du commerce triangulaire", court:"Les armateurs vaudois, le trajet du doc. 3, la Suisse",
  obj:"Identifier les acteurs, les lieux et les marchandises du commerce triangulaire",
  pre:[{ q:"Qui sont les propriétaires des navires du doc. 3 ?", a:"Trois armateurs vaudois.", s:"Cahier p. 70, ex. 3c · livre p. 148, doc. 3" }, { q:"La Suisse, qui n'a pas de colonies, a-t-elle participé à ce commerce ?", a:"Oui : en produisant des marchandises destinées à l'Afrique, en organisant des transports ou en investissant.", s:"Livre p. 148, « Un système à grande échelle »" }],
  blank:{ consigne:"Fais trois colonnes : les acteurs, les lieux, les marchandises du commerce triangulaire.", points:["Acteurs : l'armateur (même vaudois), le capitaine, les rois locaux et les marchands africains, les colons blancs","Lieux du doc. 3 : Marseille, Mascareignes, Mozambique, le Cap, les Antilles","Aller : tissus, armes, alcool (ex. 3) ; vin, tabac, pommades, tissus (doc. 3)","Afrique → Amérique : les esclaves ; retour : coton, sucre, café, tabac, cacao"], s:"Livre p. 148 · cahier ex. 3" },
  blocks:[
  { t:"html", s:"Livre p. 148 (texte, doc. 3) · cahier p. 70, ex. 3", h:tbl(["Qui ?","Son rôle"], [
    ["l'armateur","propriétaire du navire ; prépare le chargement (étape C) — dans le doc. 3, trois armateurs vaudois"],
    ["le capitaine","échange les marchandises en Afrique, remplit ses cales au retour (étapes A et B)"],
    ["les rois locaux, les marchands africains","capturent, vendent, échangent les captifs contre des marchandises"],
    ["les colons blancs","achètent les esclaves en Amérique (étape D)"],
    ["la Suisse","produit des marchandises destinées à l'Afrique, organise des transports, investit"]]) },
  bookDef("arm"),
  { t:"pause", q:"Comment la Suisse, sans politique coloniale, participe-t-elle à ce « commerce » ?", a:"En produisant des marchandises spécialement destinées à l'Afrique, en organisant des transports ou en investissant dans ce commerce.", s:"Livre p. 148" },
  { t:"h3", h:"Le trajet des armateurs vaudois (doc. 3)" },
  { t:"p", s:"Livre p. 148, doc. 3 (adapté d'Olivier Pavillon, « Un commerce maritime à capitaux suisses », Passé simple, 2019)", h:"Les bâtiments des trois armateurs vaudois appareillent de <b>Marseille</b> vers les <b>Mascareignes</b>. Là, ils vendent leur cargaison (<b>vin, tabac, pommades, tissus</b>, etc.) avant de s'approvisionner en esclaves au <b>Mozambique</b>. Lors d'une escale au <b>Cap</b>, le navire <i>Ville de Lausanne</i> arrive avec 550 Noirs, le <i>Pays de Vaud</i> lui succède avec 485 esclaves. Ces captifs seront vendus aux <b>Antilles</b>. De ces îles, les navires ramènent <b>café, cacao et sucre</b> en Europe." },
  { t:"mine", s:"Cahier p. 70, ex. 3b, 3c, 3d, 3e (corrigés)", titre:"Ta carte de l'exercice 3", items:["Tu as placé les initiales : Mas. (Marseille), C (le Cap), Moz. (Mozambique), Mas. (Mascareignes) ; les flèches montrent l'aller autour de l'Afrique, avec tissus, vin, tabac, pommades.","Étape A à côté du Mozambique (achat des esclaves), D aux Antilles (vente), B sur le retour vers l'Europe (tabac, etc.).","c) Les propriétaires des navires : 3 armateurs vaudois.","e) Différence avec la carte du doc. 1 : ils sont allés chercher des esclaves plus loin (f : pourquoi ? prix inférieur)."] },
  { t:"pause", q:"Quels sont les noms des deux navires vaudois, et combien de captifs transportent-ils ?", a:"La Ville de Lausanne, avec 550 Noirs, et le Pays de Vaud, avec 485 esclaves.", s:"Livre p. 148, doc. 3" },
  { t:"h3", h:"Les marchandises à chaque étape" },
  { t:"html", s:"Cahier p. 70, ex. 3a · livre p. 148, doc. 3 · p. 48, doc. 29", h:tbl(["Trajet","Ce qui est transporté"], [
    ["Europe → Afrique (ou Mascareignes)","tissus, armes, alcool (ex. 3) ; vin, tabac, pommades, tissus (doc. 3)"],
    ["Afrique → Amérique","des esclaves"],
    ["Amérique → Europe","coton, sucre, café, tabac (ex. 3) ; café, cacao, sucre (doc. 3)"]]) },
  { t:"pause", q:"Que ramènent les navires des Antilles en Europe, selon le doc. 3 ?", a:"Du café, du cacao et du sucre.", s:"Livre p. 148, doc. 3" },
  { t:"tip", h:"Phrase-modèle : « Les acteurs du commerce triangulaire sont l'armateur, le capitaine, les marchands et rois africains et les colons ; les navires partent d'un port d'Europe avec des tissus, des armes ou de l'alcool, chargent des esclaves en Afrique, les vendent en Amérique et rapportent du sucre, du café, du coton ou du tabac. »" },
  { t:"see", ids:["G1","L","T"] },
  { t:"src", h:"Livre p. 148 (texte, doc. 3, glossaire), p. 48 (doc. 29) · cahier ex. 3" },
]},

/* ---------------- T ---------------- */
{ id:"T", ch:"T", titre:"Les 6 définitions de ta feuille", court:"Armateur, abolitionniste, esclavage, traite, affranchi, cauris",
  obj:"Armateur, abolitionniste, esclavage, traite, affranchi, cauris",
  pre:[{ q:"Quelle est la différence entre la traite et l'esclavage ?", a:"La traite est un commerce de captifs traités comme de la marchandise ; l'esclavage est l'état de personnes non libres, propriété d'un maître.", s:"Livre p. 148, bulle jaune · lexique · tes notes" }, { q:"Que signifie « esclave affranchi » dans le titre du livre d'Equiano ?", a:"Un esclave qui a reçu de son maître la liberté.", s:"Livre p. 149, doc. 5 · Larousse" }],
  blank:{ consigne:"Écris les 6 mots de ta feuille avec leur définition et un exemple du thème.", points:["Armateur : propriétaire d'un ou plusieurs navires marchands ou de pêche (les trois armateurs vaudois)","Abolitionniste : partisan de la suppression de l'esclavage (Condorcet)","Esclavage : état de personnes non libres, propriété d'un maître, pouvant être vendues et achetées","Traite : commerce ou trafic régulier où des captifs sont considérés comme de la marchandise (traite atlantique)","Affranchi : esclave qui a reçu de son maître la liberté (Equiano)","Cauris : coquillage qui a servi de monnaie (Equiano vendu pour 172 coquillages)"], s:"Livre pp. 148-149 · lexique · Larousse" },
  blocks:[
  { t:"p", s:"Feuille d'objectifs, « Définitions à connaître »", h:"Voici les 6 mots de ta feuille, avec la définition de ton livre (bulle jaune, glossaire ou lexique) et un exemple du thème. « Affranchi » et « cauris » ne sont pas définis dans tes photos : leur définition vient du dictionnaire Larousse." },
  bookDef("arm"),
  { t:"p", s:"Livre p. 148, doc. 3 · cahier ex. 3c", h:"Exemple : les trois armateurs vaudois dont les navires partent de Marseille." },
  bookDef("abo"),
  { t:"p", s:"Livre p. 149, « Un sujet qui fait débat », doc. 6", h:"Exemple : au XVIII<sup>e</sup> siècle, des abolitionnistes proches des Lumières, comme Condorcet, dénoncent l'esclavage." },
  { t:"pause", q:"Quelle différence entre un armateur et un abolitionniste ?", a:"L'armateur est propriétaire de navires (il peut faire la traite) ; l'abolitionniste veut supprimer l'esclavage.", s:"Livre p. 148 et p. 149, glossaires" },
  bookDef("escl"),
  bookDef("traite"),
  { t:"p", s:"Livre p. 148, texte · tes notes de classe", h:"Exemples : la traite atlantique (vers l'Amérique) et la traite orientale (vers les empires musulmans). Rappelle-toi : traite ≠ esclavage." },
  { t:"pause", q:"Donne les deux traites décrites par ton livre.", a:"La traite atlantique, vers l'Amérique, et la traite orientale, vers les empires musulmans.", s:"Livre p. 148" },
  bookDef("affr"),
  { t:"p", s:"Livre p. 149, doc. 5 (titre du livre d'Equiano)", h:"Exemple : Equiano a écrit « La passionnante autobiographie d'un esclave affranchi » (1789)." },
  bookDef("cauri"),
  { t:"p", s:"Livre p. 149, doc. 5 · cahier ex. 5a", h:"Exemple : Equiano raconte qu'un marchand l'a vendu « pour 172 coquillages » ; ton exercice 5 dit « prix en coquillages »." },
  { t:"tip", h:"Une définition complète = la phrase du livre (ou du dictionnaire) + un exemple du thème : « Un armateur est le propriétaire d'un ou plusieurs navires marchands, par exemple les trois armateurs vaudois du doc. 3. »" },
  { t:"see", ids:["G1","P","L"] },
  { t:"src", h:"Livre p. 148 (bulle jaune, glossaire), p. 149 (glossaire, doc. 5) · lexique · Larousse (affranchi, cauris) · tes notes de classe" },
]},

/* ---------------- D ---------------- */
{ id:"D", ch:"D", titre:"Les dates à connaître", court:"De la traite atlantique aux abolitions",
  obj:"1500 à 1850 environ : période de la traite atlantique · 1794 et 1802 : première tentative d'abolition en France, puis annulation du décret · 1807 et 1815 : abolition de la traite en Grande-Bretagne, puis en France · 1833 et 1848 : abolition de l'esclavage en Grande-Bretagne, puis en France · 1865 : fin de la guerre civile aux USA et abolition de l'esclavage. Assassinat d'Abraham Lincoln · 1888 : abolition de l'esclavage au Brésil",
  pre:[{ q:"Quel pays abolit en premier la traite : la Grande-Bretagne ou la France ?", a:"La Grande-Bretagne, en 1807 ; la France en 1815.", s:"Feuille d'objectifs" }, { q:"Quel est le dernier pays de ta liste à abolir l'esclavage, et en quelle année ?", a:"Le Brésil, en 1888.", s:"Feuille d'objectifs" }],
  blank:{ consigne:"Sans regarder, écris les dates de ta feuille dans l'ordre, avec le pays et ce qui est aboli.", points:["1500 à 1850 environ : période de la traite atlantique","1794 : première abolition en France ; 1802 : Napoléon annule le décret","1807 : Grande-Bretagne, traite ; 1815 : France, traite","1833 : Grande-Bretagne, esclavage ; 1848 : France, esclavage","1865 : USA, fin de la guerre civile, abolition, assassinat de Lincoln","1888 : Brésil, esclavage (1845 : Brésil, traite, dans tes notes)"], s:"Feuille d'objectifs · tes notes de classe" },
  blocks:[
  { t:"h3", h:"Les dates de ta feuille" },
  { t:"html", s:"Feuille d'objectifs, « Dates à connaître » · livre p. 149", h:tbl(["Date","Ce qui se passe"], [
    ["<b>1500 à 1850 env.</b>","période de la traite atlantique"],
    ["<b>1794 et 1802</b>","première tentative d'abolition en France (au nom des idéaux révolutionnaires), puis Napoléon annule le décret"],
    ["<b>1807 et 1815</b>","abolition de la <b>traite</b> en Grande-Bretagne, puis en France"],
    ["<b>1833 et 1848</b>","abolition de l'<b>esclavage</b> en Grande-Bretagne, puis en France"],
    ["<b>1865</b>","fin de la guerre civile aux USA et abolition de l'esclavage ; assassinat d'Abraham Lincoln"],
    ["<b>1888</b>","abolition de l'esclavage au Brésil"]]) },
  { t:"pause", q:"Que se passe-t-il en France en 1794, puis en 1802 ?", a:"En 1794, la France abolit une première fois l'esclavage ; en 1802, Napoléon annule le décret.", s:"Feuille d'objectifs · livre p. 149" },
  { t:"mine", s:NOTES, titre:"Le tableau de tes notes", items:["1807 : UK → abolition de la traite.","1833 : UK → abolition de l'esclavage.","1848 : FR → abolition de l'esclavage.","1865 : USA → abolition de l'esclavage.","1888 : Brésil, abolition de l'esclavage.","1845 : Brésil, abolition de la traite."] },
  { t:"h3", h:"Toutes les dates, dans l'ordre" },
  { t:"svg", k:"frise", titre:"Les dates à connaître, dans l'ordre", alt:"La frise suit le thème dans l'ordre. De 1500 à 1850 environ, période de la traite atlantique. En 1794, première abolition de l'esclavage en France ; en 1802, Napoléon annule le décret. En 1807, la Grande-Bretagne abolit la traite ; en 1815, la France. En 1829, le trafic culmine avec 100 000 esclaves embarqués. En 1833, la Grande-Bretagne abolit l'esclavage. En 1845, selon tes notes de classe, le Brésil abolit la traite. En 1848, la France abolit l'esclavage. En 1865, fin de la guerre civile aux États-Unis, abolition de l'esclavage et assassinat d'Abraham Lincoln. En 1885, la conférence de Berlin renouvelle l'interdiction. En 1888, le Brésil abolit l'esclavage.", s:"Feuille d'objectifs · livre p. 149 · tes notes de classe" },
  { t:"pause", q:"Combien d'années séparent l'abolition de la traite et celle de l'esclavage en Grande-Bretagne ?", a:"26 ans : la traite en 1807, l'esclavage en 1833.", s:"Feuille d'objectifs" },
  { t:"h3", h:"D'autres dates du thème" },
  { t:"html", s:"Livre p. 149 · livre p. 148, doc. 4 · cahier p. 69, ex. 2b", h:tbl(["Date","Ce qui se passe"], [
    ["1769","affiche de Charleston ; plan du Marie-Séraphique"],
    ["1781","Condorcet, Réflexions sur l'esclavage des Nègres"],
    ["1789","autobiographie d'Olaudah Equiano"],
    ["1796","gravure « Marchand d'esclaves de Gorée » (ex. 2, événement A)"],
    ["1829","le trafic culmine : 100 000 esclaves embarqués"],
    ["1885","conférence de Berlin : l'interdiction est renouvelée (et partage de l'Afrique, ex. 2)"],
    ["1929","Albert Londres, Terre d'ébène"]]) },
  { t:"tip", h:"Accroche les dates par paires, comme ta feuille : 1794 / 1802 (la France abolit puis annule), 1807 / 1815 (la traite), 1833 / 1848 (l'esclavage) ; la Grande-Bretagne est toujours en premier. Puis 1865 (USA, Lincoln) et 1888 (Brésil), le dernier." },
  { t:"see", ids:["G2","LIENS","X"] },
  { t:"src", h:"Feuille d'objectifs · livre p. 148 (doc. 4), p. 149 · cahier ex. 2b · tes notes de classe" },
]},

/* ---------------- P ---------------- */
{ id:"P", ch:"P", titre:"Les 2 personnages de ta feuille", court:"Olaudah Equiano (Gustavus Vassa l'Africain) et Nicolas de Condorcet",
  obj:"Olaudah Equiano (Gustavus Vassa l'Africain) (doc 5) · Nicolas de Condorcet (doc 6)",
  pre:[{ q:"Lequel des deux personnages a lui-même été esclave ?", a:"Olaudah Equiano, aussi appelé Gustavus Vassa l'Africain.", s:"Livre p. 149, doc. 5" }, { q:"Quel ouvrage de Condorcet est cité dans ton livre ?", a:"Réflexions sur l'esclavage des Nègres (1781).", s:"Livre p. 149, doc. 6" }],
  blank:{ consigne:"Pour chacun des deux personnages, écris : qui il est, son ouvrage et sa date, ce qu'il raconte ou défend.", points:["Olaudah Equiano, ou Gustavus Vassa l'Africain : esclave affranchi","La passionnante autobiographie d'un esclave affranchi, 1789","Vendu pour 172 coquillages, arrivé à la côte 6 ou 7 mois après sa capture, bateau étouffant, deux compatriotes sautent à la mer","Nicolas de Condorcet : Réflexions sur l'esclavage des Nègres, 1781","Il conteste l'argument « on leur sauve la vie » : les acheter pour les revendre reste un crime"], s:"Livre p. 149, doc. 5 et 6" },
  blocks:[
  { t:"h3", h:"Olaudah Equiano (Gustavus Vassa l'Africain)" },
  { t:"p", s:"Livre p. 149, doc. 5 (adapté de Olaudah Equiano ou Gustavus Vassa l'Africain, La passionnante autobiographie d'un esclave affranchi, 1789) · feuille d'objectifs (portrait)", h:"Equiano est un <b>esclave affranchi</b> qui raconte sa propre vie dans <i>La passionnante autobiographie d'un esclave affranchi</i> (<b>1789</b>). Son portrait figure sur ta feuille d'objectifs. Il raconte : un marchand le vendit pour <b>172 coquillages</b> à une riche veuve ; <b>six ou sept mois après sa capture</b>, il arriva à la côte ; dans le bateau, chacun avait à peine l'espace pour se retourner, l'étroitesse et la chaleur les étouffaient presque ; deux compatriotes enchaînés, préférant la mort à une telle vie de misère, sautèrent à la mer." },
  { t:"pause", q:"Quels sont les deux noms d'Equiano, et que veut dire « affranchi » ?", a:"Olaudah Equiano et Gustavus Vassa l'Africain ; affranchi = esclave qui a reçu de son maître la liberté.", s:"Livre p. 149, doc. 5 · Larousse" },
  { t:"mine", s:"Cahier p. 71, ex. 5a (corrigé)", titre:"Ce que tu as relevé dans le doc. 5", items:["Prix en coquillages, esclave qui se fait vendre, vie de misère, peine à se retourner, étouffé, chaînes, « suicide »."] },
  { t:"h3", h:"Nicolas de Condorcet" },
  { t:"p", s:"Livre p. 149, doc. 6 (adapté de Nicolas de Condorcet, Réflexions sur l'esclavage des Nègres, 1781) · « Un sujet qui fait débat »", h:"<b>Condorcet</b> écrit <i>Réflexions sur l'esclavage des Nègres</i> en <b>1781</b>. C'est un <b>abolitionniste</b>, proche des penseurs des Lumières. Il conteste l'argument de ceux qui disent qu'on sauve la vie des Africains achetés (des criminels condamnés à mort ou des prisonniers de guerre) : même ainsi, on commet un crime en les achetant, si c'est pour les revendre ou les réduire en esclavage." },
  { t:"pause", q:"En quelle année Condorcet écrit-il ses Réflexions, et Equiano son autobiographie ?", a:"Condorcet en 1781, Equiano en 1789.", s:"Livre p. 149, doc. 5 et 6" },
  { t:"html", s:"Livre p. 149, doc. 5 et 6", h:tbl(["","Equiano · Condorcet"], [
    ["Qui ?","esclave affranchi, témoin · abolitionniste proche des Lumières"],
    ["Ouvrage","La passionnante autobiographie d'un esclave affranchi, 1789 · Réflexions sur l'esclavage des Nègres, 1781"],
    ["Ce qu'il apporte","raconte de l'intérieur la capture et la traversée · répond à l'argument des défenseurs de la traite"]]) },
  { t:"tip", h:"Phrase-modèle : « Olaudah Equiano, esclave affranchi, raconte en 1789 sa capture et la traversée ; Condorcet, abolitionniste, dénonce en 1781 l'achat d'êtres humains comme un crime. » L'un témoigne, l'autre argumente." },
  { t:"see", ids:["G2","G5","T"] },
  { t:"src", h:"Livre p. 149 (doc. 5, doc. 6, débat) · feuille d'objectifs · cahier ex. 4 et 5" },
]},

/* ---------------- L ---------------- */
{ id:"L", ch:"L", titre:"Les 5 lieux de ta feuille", court:"Mascareignes, Charleston, Gorée, golfe de Guinée, Mozambique",
  obj:"Mascareignes, Charleston, Gorée, Golfe de Guinée, Mozambique",
  pre:[{ q:"Dans quel océan se trouvent les Mascareignes ?", a:"Dans l'océan Indien (La Réunion, l'île Maurice, Rodrigues).", s:"Livre p. 148, glossaire" }, { q:"Dans quelle région d'Amérique se trouve Charleston ?", a:"En Caroline du Sud, en Amérique du Nord (USA).", s:"Tes notes de classe · livre p. 149, doc. 7" }],
  blank:{ consigne:"Pour chaque lieu de ta feuille, écris où il se trouve et ce qui s'y passe dans le thème.", points:["Mascareignes : archipel de l'océan Indien (La Réunion, Maurice, Rodrigues) ; les Vaudois y vendent leur cargaison","Charleston : port de Caroline du Sud (USA) ; vente aux enchères de 94 esclaves en 1769","Gorée : Sénégal ; gravure d'un marchand d'esclaves (1796)","Golfe de Guinée : partie de l'océan Atlantique le long de la Guinée, où la traite se développe après l'arrivée des Portugais","Mozambique : les Vaudois s'y approvisionnent en esclaves, plus loin que sur la carte du doc. 1"], s:"Livre pp. 148-149 · tes notes · Larousse" },
  blocks:[
  { t:"h3", h:"Les Mascareignes" },
  bookDef("masc"),
  { t:"p", s:"Livre p. 148, doc. 3", h:"Les navires des armateurs vaudois partent de Marseille vers les Mascareignes, où ils vendent leur cargaison (vin, tabac, pommades, tissus)." },
  { t:"h3", h:"Charleston" },
  { t:"p", s:"Livre p. 149, doc. 7 (affiche, Charleston, 1769) · tes notes de classe", h:"<b>Charleston</b> est un port de <b>Caroline du Sud</b>, en Amérique du Nord (USA). Tes notes : au XVIII<sup>e</sup> siècle, les bateaux du commerce triangulaire y arrivent très fréquemment. Le doc. 7 est une affiche de Charleston (1769) qui annonce une vente aux enchères de <b>94 esclaves</b> (39 hommes, 15 garçons, 24 femmes, 16 filles), arrivés de Sierra Leone sur le navire <i>Dembia</i>." },
  { t:"pause", q:"Que montre l'affiche de Charleston de 1769 ?", a:"La vente aux enchères de 94 esclaves arrivés de Sierra Leone sur le navire Dembia, présentés comme une « cargaison ».", s:"Livre p. 149, doc. 7" },
  { t:"h3", h:"Gorée" },
  { t:"p", s:"Livre p. 148, doc. 4 (gravure de Jacques Grasset de Saint-Sauveur, 1796)", h:"<b>Gorée</b> se trouve au <b>Sénégal</b>, en Afrique de l'Ouest. Le doc. 4 montre un « Marchand d'esclaves de Gorée » (gravure de 1796)." },
  { t:"h3", h:"Le golfe de Guinée" },
  { t:"def", book:"Dictionnaire Larousse", dico:true, term:"Golfe de Guinée", h:"Partie de l'océan Atlantique qui baigne la côte de l'Afrique de l'Ouest (la Guinée est « baignée à l'ouest par l'océan Atlantique (golfe de Guinée) »). En Guinée, après l'arrivée des Portugais (1461-1462), la traite des Noirs se développe.", s:"Dictionnaire Larousse, encyclopédie « Guinée » et dictionnaire collège « Guinée » (le lieu n'est pas expliqué dans tes photos ; pas de carte, décision du papa)" },
  { t:"pause", q:"Le golfe de Guinée fait-il partie de l'océan Atlantique ou de l'océan Indien ?", a:"De l'océan Atlantique, le long de la côte de l'Afrique de l'Ouest.", s:"Dictionnaire Larousse, « Guinée »" },
  { t:"h3", h:"Le Mozambique" },
  { t:"p", s:"Livre p. 148, doc. 3 · cahier p. 70, ex. 3e", h:"Le <b>Mozambique</b> se trouve sur la côte est de l'Afrique, face à l'océan Indien. Les armateurs vaudois s'y approvisionnent en esclaves. Ton exercice 3e : par rapport à la carte du doc. 1, ils sont allés chercher des esclaves plus loin." },
  { t:"html", s:"Livre p. 148 (doc. 3, 4, glossaire), p. 149 (doc. 7) · tes notes de classe · Larousse", h:tbl(["Lieu","Où ? · Ce qui s'y passe"], [
    ["Mascareignes","océan Indien · les Vaudois y vendent leur cargaison"],
    ["Charleston","Caroline du Sud (USA) · vente aux enchères de 94 esclaves (1769)"],
    ["Gorée","Sénégal · marchand d'esclaves (gravure de 1796)"],
    ["Golfe de Guinée","océan Atlantique, Afrique de l'Ouest · la traite s'y développe après l'arrivée des Portugais"],
    ["Mozambique","côte est de l'Afrique · les Vaudois y achètent les esclaves"]]) },
  { t:"tip", h:"Pour chaque lieu, retiens deux choses : où il se trouve (continent, océan, pays) et le document du livre qui en parle (Gorée doc. 4, Charleston doc. 7, Mascareignes et Mozambique doc. 3)." },
  { t:"see", ids:["G6","G4","G1"] },
  { t:"src", h:"Livre p. 148 (doc. 3, 4, glossaire), p. 149 (doc. 7) · cahier ex. 3 · tes notes de classe · Larousse (Guinée)" },
]},

/* ---------------- X ---------------- */
{ id:"X", ch:"X", titre:"Contextualisation : la colonisation au XIXe siècle", court:"Cahier p. 69, exercices 1 et 2",
  obj:"Les notes prises en classe, ainsi que les exercices du thème (cahier p. 69, « Contextualisation »)",
  pre:[{ q:"Quels sont les deux principaux pays colonisateurs européens au début du XXe siècle ?", a:"La Grande-Bretagne (n° 1) et la France (n° 2).", s:"Cahier p. 69, ex. 1c" }, { q:"En quelle année l'Afrique est-elle partagée à Berlin ?", a:"En 1885.", s:"Cahier p. 69, ex. 2b" }],
  blank:{ consigne:"Écris les changements entre le début du XIXe et le début du XXe siècle, puis les six dates de l'exercice 2.", points:["Indépendance des colonies en Amérique ; colonisation presque totale de l'Afrique ; Japon et États-Unis, nouvelles puissances coloniales","Grande-Bretagne n° 1, France n° 2 ; pas de colonies : Grèce, Suède, Suisse","1796 marchands d'esclaves ; 1848 abolition en France ; 1885 Berlin ; 1904 travail forcé en Guinée ; 1917 Sculptures nègres ; 1950 Césaire","Industrialisation : nouveaux débouchés, nouvelles matières premières → colonisation"], s:"Cahier p. 69, ex. 1 et 2" },
  blocks:[
  { t:"p", s:"Feuille d'objectifs (encadré) · cahier p. 69", h:"Ta feuille dit de revoir aussi « les exercices du thème ». La première page du thème 10 dans ton cahier (« Regards sur la colonisation : l'exemple de l'Afrique ») replace l'esclavage dans l'histoire de la colonisation." },
  { t:"h3", h:"Exercice 1 : les empires coloniaux" },
  { t:"mine", s:"Cahier p. 69, ex. 1 (corrigé en rouge)", titre:"Tes réponses corrigées", items:["a) Pays européens sans colonies au début du XXe siècle (biffés) : la Grèce, la Suède, la Suisse.","b) Changements par rapport au début du XIXe siècle : indépendance des colonies en Amérique ; colonisation presque totale de l'Afrique ; le Japon et les États-Unis sont de nouvelles puissances coloniales.","c) Les deux principaux pays colonisateurs européens : la Grande-Bretagne (n° 1) et la France (n° 2)."] },
  { t:"pause", q:"Cite deux changements entre le début du XIXe et le début du XXe siècle.", a:"Par exemple : l'indépendance des colonies en Amérique, la colonisation presque totale de l'Afrique (et le Japon et les États-Unis comme nouvelles puissances coloniales).", s:"Cahier p. 69, ex. 1b" },
  { t:"h3", h:"Exercice 2 : la frise" },
  { t:"html", s:"Cahier p. 69, ex. 2b (dates écrites et corrigées)", h:tbl(["Événement","Date"], [
    ["A. Marchands d'esclaves (doc. 4)","1796"],
    ["B. Abolition de l'esclavage, France","1848"],
    ["C. Partage de l'Afrique, Berlin","1885"],
    ["D. Travail forcé en Guinée","1904"],
    ["E. Publication du livre Sculptures nègres","1917"],
    ["F. Critique de la colonisation par A. Césaire","1950"]]) },
  { t:"pause", q:"Quel événement de l'exercice 2 a lieu en 1885 ?", a:"Le partage de l'Afrique, à Berlin.", s:"Cahier p. 69, ex. 2b" },
  { t:"mine", s:"Cahier p. 69, ex. 2c (corrigé en rouge)", titre:"Ton hypothèse : industrialisation et colonies", items:["Recherche de nouveaux débouchés et recherche de nouvelles matières premières → colonisation.","Plus de nourriture et d'hygiène → plus de population → plus de demande → mécanisation → produire plus et plus vite → création de stocks à écouler."] },
  { t:"pause", q:"Selon ton hypothèse, quelles deux recherches mènent l'Europe industrielle à coloniser ?", a:"La recherche de nouveaux débouchés et la recherche de nouvelles matières premières.", s:"Cahier p. 69, ex. 2c" },
  { t:"tip", h:"Phrase-modèle : « Au XIXe siècle, l'Europe industrielle cherche de nouveaux débouchés et de nouvelles matières premières : elle colonise presque toute l'Afrique, et la Grande-Bretagne et la France deviennent les deux premières puissances coloniales. »" },
  { t:"see", ids:["D","G2","LIENS"] },
  { t:"src", h:"Cahier p. 69, ex. 1 et 2 · feuille d'objectifs" },
]},
];

const LEXIQUE = [
  ...DEFS.map(d => ({ t:d.term, h:d.short || d.h, ref:d.ch, lab:d.lab, dico:!!d.dico, book:true, s:d.s })),
  { t:"Golfe de Guinée", h:"Partie de l'océan Atlantique qui baigne la côte de l'Afrique de l'Ouest.", ref:"L", lab:"Dictionnaire Larousse", dico:true, book:true, s:"Dictionnaire Larousse, « Guinée »" },
  { t:"Commerce triangulaire", h:"Vaste système d'échanges entre l'Europe, l'Afrique et l'Amérique, dans lequel s'intègre la traite atlantique.", ref:"G1", lab:"Livre p. 148", book:true, s:"Livre p. 148, texte" },
  { t:"Abolition", h:"Suppression de la traite ou de l'esclavage par une loi (1794 et 1848 en France, 1807 et 1833 en Grande-Bretagne…).", ref:"D", lab:"Livre p. 149", book:true, s:"Livre p. 149 · feuille d'objectifs" },
];

/* ============================================================
   PAQUETS (cartes et tests) — un paquet par chapitre de la feuille d'objectifs.
   Item : front, back[] (1re = affichée), opts (choix fixes), wrong[] (distracteurs), grp, mcqOnly, keepOrder, ans/expl, src
   ============================================================ */
function defItems(keys){
  const out = [];
  keys.forEach(k => { const d = DEF[k];
    out.push({ front:"Quel mot correspond à cette définition : « " + (d.short || d.h) + " » ?", back:[d.term, ...d.acc], grp:"mot", expl:d.term + " : " + d.h, src:d.s });
    out.push({ front:"Quelle est la définition de « " + d.term + " »" + (d.dico ? " (dictionnaire)" : " dans ton livre") + " ?", back:[d.short || d.h], grp:"def", mcqOnly:true, expl:d.term + " : " + d.h, src:d.s });
  });
  return out;
}
const ETAPES = ["un armateur prépare le chargement en Europe","échange en Afrique contre des esclaves","vente des esclaves en Amérique","retour en Europe avec des marchandises coloniales"];
const PAYS = ["la Grande-Bretagne","la France","les USA","le Brésil"];
const DECKS = [
  { key:"orga", code:"G1", title:"L'organisation de la traite", src:"livre p. 148 · cahier ex. 3 et 5", items:[
    { front:"Combien de traites ont coexisté, selon ton livre ?", back:["deux","2"], opts:["une","deux","trois"], keepOrder:true, ans:"Deux : la traite atlantique, vers l'Amérique, et la traite orientale, vers les empires musulmans.", src:"livre p. 148, texte" },
    { front:"Vers où la traite orientale conduit-elle les esclaves ?", back:["vers les empires musulmans","les empires musulmans"], wrong:["vers l'Amérique","vers l'Europe","vers la Chine"], ans:"Vers les empires musulmans ; la traite atlantique, elle, dirige les esclaves vers l'Amérique.", src:"livre p. 148, texte" },
    { front:"Dans quel vaste système d'échanges s'intègre la traite atlantique ?", back:["le commerce triangulaire","commerce triangulaire"], wrong:["la route de la soie","l'échange colombien","la traite orientale"], ans:"Le commerce triangulaire, entre l'Europe, l'Afrique et l'Amérique.", src:"livre p. 148, texte" },
    { front:"Quelle est la première étape du commerce triangulaire (ex. 3a) ?", back:["C : un armateur prépare le chargement d'un navire en Europe"], wrong:["A : le navire accoste en Afrique","D : les esclaves sont vendus en Amérique","B : le navire rapporte des marchandises coloniales"], mcqOnly:true, ans:"Étape 1 = C : un armateur prépare le chargement d'un navire avec des marchandises européennes (tissus, armes, alcool).", src:"cahier p. 70, ex. 3a (corrigé)" },
    { front:"Quel est le bon ordre des étapes du commerce triangulaire ?", back:["C, A, D, B"], opts:["A, C, D, B","C, A, D, B","C, D, A, B","B, C, A, D"], keepOrder:true, ans:"C (chargement en Europe), A (échange en Afrique), D (vente en Amérique), B (retour avec des marchandises coloniales). Attention : tu avais d'abord écrit D avant A, puis tu as corrigé.", src:"cahier p. 70, ex. 3a (corrigé)" },
    { front:"À l'étape D, à qui les esclaves sont-ils vendus en Amérique ?", back:["à des colons blancs","colons blancs","des colons"], wrong:["à des rois locaux","à des armateurs vaudois","à des marchands chinois"], ans:"À des colons blancs, dans les colonies d'Amérique.", src:"cahier p. 70, ex. 3a, étape D" },
    { front:"Selon le doc. 2, pendant quelle période la traite atlantique est-elle la plus forte ?", back:["1701-1800"], opts:["1563-1600","1601-1700","1701-1800","1801-1866"], keepOrder:true, ans:"De 1701 à 1800 : environ 5 millions d'esclaves embarqués et près de 15 000 expéditions (valeurs lues sur le graphique).", src:"livre p. 148, doc. 2" },
    { front:"Que mesure la ligne rouge du doc. 2, avec l'échelle de droite ?", back:["Le nombre d'expéditions"], wrong:["Le nombre d'esclaves embarqués","Le prix des esclaves","Le nombre de morts pendant la traversée"], mcqOnly:true, ans:"Le nombre d'expéditions (échelle de droite) ; les barres vertes montrent les esclaves embarqués, en millions (échelle de gauche).", src:"livre p. 148, doc. 2" },
    { front:"En quelle année le trafic culmine-t-il avec 100 000 esclaves embarqués ?", back:["1829"], opts:["1794","1807","1829","1888"], keepOrder:true, ans:"En 1829, alors que la traite était déjà abolie en Grande-Bretagne (1807) et en France (1815).", src:"livre p. 149, « Abolition : des paroles et des actes ? »" },
    { front:"Selon tes notes de classe, combien de Noirs ont été transférés en 8 ans ?", back:["plus de 60 millions","plus de 60 000 000","60 millions","60 000 000"], wrong:["plus de 6 000","plus de 600 000","plus de 6 millions"], ans:"Tes notes : « Trafic de masse d'esclaves. En 8 ans, plus de 60 000 000 de Noirs ont été transférés. »", src:"tes notes de classe" },
    { front:"Combien de captifs sont entassés dans l'entrepont du Marie-Séraphique (1769) ?", back:["307"], opts:["140","307","485","550"], keepOrder:true, ans:"307 hommes, femmes et enfants, entassés selon une organisation très précise pour gagner un maximum de place.", src:"cahier p. 71, doc. b · ex. 5a" },
    { front:"Selon Frossard (doc. c), quelles étaient les dimensions de la pièce réservée aux 140 esclaves ?", back:["12 m de long, 3 m de large, 1,20 m de haut"], wrong:["40 m de long, 10 m de large, 3 m de haut","5 m de long, 2 m de large, 2 m de haut","12 m de long, 12 m de large, 12 m de haut"], mcqOnly:true, ans:"12 m de long sur 3 m, sur une hauteur de 1,20 m : ils n'ont pu se tenir qu'assis ou couchés, ferrés pendant toute la traversée.", src:"cahier p. 71, doc. c (Frossard, 1784)" },
    { front:"Selon tes notes, la traite des Noirs et l'esclavage sont-ils la même chose ?", back:["Non"], opts:["Oui","Non"], keepOrder:true, ans:"Non : « Traite des Noirs ≠ Esclavage ». La traite est le commerce des captifs, l'esclavage l'état de personnes non libres.", src:"tes notes de classe · livre p. 148, bulle jaune" },
  ]},
  { key:"debats", code:"G2", title:"Les débats", src:"livre p. 149 · cahier ex. 4", items:[
    { front:"Pourquoi semble-t-il, à l'époque, impossible de remettre l'esclavage en cause ?", back:["Ses bénéfices sont énormes"], wrong:["Les esclaves le demandent","Le pape l'impose","Il n'existe qu'en Afrique"], mcqOnly:true, ans:"Les bénéfices de l'esclavage sont tels qu'il semble impossible de le remettre en cause ; au mieux cherche-t-on à limiter les abus.", src:"livre p. 149, « Un sujet qui fait débat »" },
    { front:"Au XVIIIe siècle, de quels penseurs les abolitionnistes sont-ils proches ?", back:["des penseurs des Lumières","les Lumières","Lumières"], wrong:["des conquistadors","des armateurs","des missionnaires"], ans:"Des penseurs des Lumières.", src:"livre p. 149" },
    { front:"Quel argument des défenseurs de la traite Condorcet conteste-t-il ?", back:["On sauverait la vie de criminels condamnés à mort ou de prisonniers de guerre"], wrong:["Les esclaves seraient bien payés","Les Africains l'auraient demandé","Les navires seraient confortables"], mcqOnly:true, ans:"On dit que ceux qu'on achète sont des criminels condamnés au dernier supplice ou des prisonniers de guerre, qu'on tuerait s'ils n'étaient pas achetés.", src:"livre p. 149, doc. 6 · cahier ex. 4a" },
    { front:"Que répond Condorcet à cet argument ?", back:["C'est quand même un crime de les acheter pour les revendre ou les réduire en esclavage"], wrong:["Il a raison, c'est un acte d'humanité","Il faut seulement mieux les nourrir","Il faut les envoyer en Europe"], mcqOnly:true, ans:"En supposant qu'on leur sauve la vie, on ne commet pas moins un crime en les achetant, si c'est pour les revendre ou les réduire en esclavage.", src:"livre p. 149, doc. 6 · cahier ex. 4b" },
    { front:"Qui annule en 1802 l'abolition de l'esclavage décidée en France en 1794 ?", back:["Napoléon","Napoléon Bonaparte","Bonaparte"], wrong:["Louis XIV","Abraham Lincoln","Condorcet"], ans:"Napoléon annule le décret en 1802.", src:"livre p. 149 · feuille d'objectifs" },
    { front:"Au nom de quoi la France abolit-elle l'esclavage une première fois en 1794 ?", back:["Au nom des idéaux révolutionnaires"], wrong:["Au nom du roi","Au nom de l'Église","Au nom du commerce"], mcqOnly:true, ans:"Au nom des idéaux révolutionnaires.", src:"livre p. 149" },
    { front:"En quelle année la conférence de Berlin renouvelle-t-elle l'interdiction de l'esclavage ?", back:["1885"], opts:["1848","1865","1885","1888"], keepOrder:true, ans:"En 1885 : la pratique perdure malgré les abolitions officielles.", src:"livre p. 149" },
    { front:"Après les abolitions, que recense-t-on encore sur le terrain jusqu'à la fin de l'époque coloniale ?", back:["De nombreux cas de travail forcé"], wrong:["Plus aucun travail pénible","Des salaires élevés","Des écoles pour tous"], mcqOnly:true, ans:"De nombreux cas de travail forcé : hommes, femmes et enfants réquisitionnés, pas ou à peine payés, punis violemment s'ils fuient.", src:"livre p. 149" },
    { front:"Quels mots Albert Londres utilise-t-il pour dénoncer les conditions de travail (ex. 4c) ?", back:["Matériel humain, déchet, corbillards, fosses communes, sacrifice"], wrong:["Ouvriers, salaire, vacances, repos","Esclaves heureux, fête, danse","Machines, vapeur, usine, progrès"], mcqOnly:true, ans:"Matériel humain, déchet, corbillards, fosses communes, sacrifice.", src:"livre p. 149, doc. 8 · cahier ex. 4c" },
    { front:"Pour construire quelle ligne de chemin de fer les travailleurs décrits par Albert Londres sont-ils recrutés ?", back:["Congo-Océan","la ligne Congo-Océan"], wrong:["Paris-Lyon","Le Caire-Le Cap","Dakar-Niger"], ans:"La ligne de chemin de fer Congo-Océan (Terre d'ébène, 1929).", src:"livre p. 149, doc. 8" },
    { front:"Pourquoi le texte d'Albert Londres laisse-t-il entendre qu'on parle d'esclaves (ex. 4d) ?", back:["Le titre « la traite des noirs » et l'expression « matériel humain »"], wrong:["Il parle de chaînes et de navires négriers","Il cite Condorcet","Il parle de coton et de sucre"], mcqOnly:true, ans:"Le titre « Terre d'ébène : la traite des noirs » et « matériel humain ».", src:"cahier ex. 4d · livre p. 149, doc. 8" },
  ]},
  { key:"motiv", code:"G3", title:"Ce qui motive ces pratiques", src:"livre p. 48, p. 148, p. 149 · tes notes", items:[
    { front:"Comment le livre décrit-il les esclaves africains, du point de vue des colonies ?", back:["Une main-d'œuvre abondante et bon marché"], wrong:["Une main-d'œuvre rare et chère","Des soldats pour les colonies","Des marchands"], mcqOnly:true, ans:"Les colonies d'Amérique n'ont pu fonctionner que grâce aux esclaves africains, une main-d'œuvre abondante et bon marché.", src:"livre p. 148, introduction" },
    { front:"Qu'est-ce qui, dans le Nouveau-Monde, nécessite une main-d'œuvre très importante ?", back:["Les immenses plantations"], wrong:["Les églises","Les ports d'Europe","Les universités"], mcqOnly:true, ans:"Les immenses plantations du Nouveau-Monde (Amériques et Caraïbes).", src:"livre p. 148, texte" },
    { front:"Pourquoi se tourne-t-on vers l'Afrique pour trouver de la main-d'œuvre ?", back:["Les colons européens et les populations locales ne sont pas assez nombreux"], wrong:["Les Africains l'ont demandé","L'Afrique est plus proche de l'Amérique que l'Europe","Les Européens refusent de partir"], mcqOnly:true, ans:"Les colons européens et les populations locales n'étant pas en nombre suffisant, on se tourne vers l'Afrique ; la population amérindienne est décimée par les maladies (p. 48).", src:"livre p. 148 · p. 48" },
    { front:"Pour l'exploitation de quoi les puissances coloniales cherchent-elles cette main-d'œuvre (p. 48) ?", back:["Des mines et des plantations de canne à sucre ou de coton"], wrong:["Des usines et des chemins de fer","Des forêts et des pêcheries","Des châteaux et des églises"], mcqOnly:true, ans:"L'exploitation des mines, des plantations de canne à sucre ou de coton.", src:"livre p. 48, texte" },
    { front:"Selon tes notes, quel « mariage » donne le maximum de bénéfice ?", back:["L'homme noir et la canne à sucre"], wrong:["Le café et le cacao","Le navire et l'armateur","Le coton et la laine"], mcqOnly:true, ans:"« Le mariage de l'homme noir et de la canne à sucre = maximum de bénéfice. »", src:"tes notes de classe" },
    { front:"Selon tes notes, combien coûtait environ un esclave ?", back:["8 à 12 livres sterling","8-12 livres sterling"], wrong:["1 à 2 livres sterling","100 à 120 livres sterling","1000 livres sterling"], ans:"Environ 8 à 12 livres sterling, ce qui équivaut à 950 à 1500 euros.", src:"tes notes de classe" },
    { front:"Selon tes notes, à combien d'euros correspondent ces 8 à 12 livres sterling ?", back:["950 à 1500 euros","950-1500 euros","950 à 1500"], wrong:["9 à 15 euros","95 à 150 euros","9500 à 15 000 euros"], ans:"À environ 950 à 1500 euros.", src:"tes notes de classe" },
    { front:"Comment l'affiche de Charleston (doc. 7) présente-t-elle les 94 personnes à vendre ?", back:["Comme une cargaison"], wrong:["Comme des invités","Comme des soldats","Comme des marins"], mcqOnly:true, ans:"« A cargo of ninety-four prime, healthy negroes » : une cargaison, comme de la marchandise.", src:"livre p. 149, doc. 7" },
  ]},
  { key:"afrique", code:"G4", title:"La traite en Afrique", src:"livre pp. 148-149 · cahier ex. 3", items:[
    { front:"Qui organise, en Afrique, les réseaux de capture et de vente des captifs ?", back:["des marchands africains","marchands africains"], wrong:["des armateurs vaudois","des colons blancs","des missionnaires"], ans:"Des réseaux de capture et de vente organisés par des marchands africains conduisent les captifs jusqu'aux ports.", src:"livre p. 148, « Un système à grande échelle »" },
    { front:"Où les réseaux africains conduisent-ils les captifs ?", back:["jusqu'aux ports","aux ports","les ports"], wrong:["jusqu'aux plantations","jusqu'en Europe","jusqu'aux mines d'or"], ans:"Jusqu'aux ports dans lesquels les marchands européens viennent se « ravitailler ».", src:"livre p. 148" },
    { front:"À l'étape A, avec qui le capitaine échange-t-il ses marchandises contre des esclaves ?", back:["avec les rois locaux","les rois locaux","rois locaux"], wrong:["avec les colons blancs","avec les armateurs","avec le pape"], ans:"Avec les rois locaux.", src:"cahier p. 70, ex. 3a, étape A" },
    { front:"Contre combien de coquillages Equiano a-t-il été vendu ?", back:["172"], opts:["17","172","307","1720"], keepOrder:true, ans:"Pour 172 coquillages, à une riche veuve.", src:"livre p. 149, doc. 5" },
    { front:"Combien de temps après sa capture Equiano arrive-t-il à la côte ?", back:["Six ou sept mois"], opts:["Deux jours","Deux semaines","Six ou sept mois","Dix ans"], keepOrder:true, ans:"Six ou sept mois après sa capture.", src:"livre p. 149, doc. 5" },
    { front:"Que montre le doc. 4, gravure de 1796 ?", back:["Un marchand d'esclaves de Gorée (Sénégal)"], wrong:["Un navire négrier nantais","Une vente aux enchères à Charleston","Un armateur à Marseille"], mcqOnly:true, ans:"« Marchand d'esclaves de Gorée (Sénégal) », gravure de Jacques Grasset de Saint-Sauveur, 1796.", src:"livre p. 148, doc. 4" },
    { front:"Où les armateurs vaudois s'approvisionnent-ils en esclaves ?", back:["au Mozambique","Mozambique"], wrong:["à Gorée","à Charleston","aux Antilles"], ans:"Au Mozambique.", src:"livre p. 148, doc. 3" },
    { front:"Ex. 3e : quelle est la principale différence entre le trajet du doc. 3 et la carte du doc. 1 ?", back:["Ils sont allés chercher des esclaves plus loin"], wrong:["Ils ne sont pas allés en Afrique","Ils sont partis d'Amérique","Ils n'ont transporté aucun esclave"], mcqOnly:true, ans:"Ils sont allés chercher des esclaves plus loin (au Mozambique, sur l'océan Indien) ; ta réponse à « pourquoi ? » : un prix inférieur.", src:"cahier p. 70, ex. 3e et 3f" },
    { front:"Selon ta réponse à l'exercice 3f, pourquoi aller chercher des esclaves plus loin ?", back:["Pour un prix inférieur"], wrong:["Parce qu'il n'y avait plus de bateaux","Parce que le pape l'ordonnait","Pour éviter les tempêtes"], mcqOnly:true, ans:"Ta réponse : prix inférieur.", src:"cahier p. 70, ex. 3f" },
    { front:"Entre quelles colonies portugaises le doc. 1 montre-t-il un commerce direct ?", back:["L'Angola et le Brésil"], wrong:["Le Mozambique et l'Inde","Gorée et Charleston","Le Cap et les Antilles"], mcqOnly:true, ans:"Entre l'Angola et le Brésil (trait pointillé du doc. 1).", src:"livre p. 148, doc. 1" },
  ]},
  { key:"argum", code:"G5", title:"Les arguments des Européens", src:"livre pp. 148-149 · cahier ex. 4", items:[
    { front:"Selon l'argument rapporté par Condorcet, qui seraient les Africains achetés ?", back:["Des criminels condamnés à mort ou des prisonniers de guerre"], wrong:["Des volontaires","Des marchands","Des marins"], mcqOnly:true, ans:"Des criminels condamnés au dernier supplice ou des prisonniers de guerre.", src:"livre p. 149, doc. 6 · cahier ex. 4a" },
    { front:"Que leur arriverait-il, selon cet argument, s'ils n'étaient pas achetés par les Européens ?", back:["Ils seraient mis à mort"], wrong:["Ils deviendraient rois","Ils partiraient en Europe","Ils seraient libérés"], mcqOnly:true, ans:"Ils seraient mis à mort s'ils n'étaient pas achetés.", src:"livre p. 149, doc. 6" },
    { front:"Comment quelques écrivains présentent-ils la traite, d'après ce raisonnement ?", back:["Presque un acte d'humanité"], wrong:["Un crime","Un commerce honteux","Une erreur"], mcqOnly:true, ans:"Comme « presque un acte d'humanité ».", src:"livre p. 149, doc. 6" },
    { front:"Selon la définition de la traite, comment les captifs sont-ils considérés ?", back:["Comme de la marchandise"], wrong:["Comme des invités","Comme des soldats","Comme des citoyens"], mcqOnly:true, ans:"Commerce ou trafic régulier dans lequel des captifs sont considérés comme de la marchandise.", src:"livre p. 148, bulle jaune" },
    { front:"Selon le livre, que cherche-t-on « au mieux » à faire, à l'époque, face à l'esclavage ?", back:["Limiter les abus"], wrong:["L'abolir tout de suite","Le développer encore","L'interdire en Afrique"], mcqOnly:true, ans:"Au mieux cherche-t-on à limiter les abus, car ses bénéfices sont énormes.", src:"livre p. 149" },
    { front:"Selon Albert Londres (doc. 8), quel « sacrifice » fallait-il accepter, d'après M. Antonietti, pour le chemin de fer ?", back:["8000 à 10 000 hommes"], wrong:["80 à 100 hommes","800 à 1000 hommes","80 000 à 100 000 hommes"], mcqOnly:true, ans:"« Il faut accepter le sacrifice de 8000 à 10 000 hommes, ou renoncer au chemin de fer. » Le sacrifice fut plus considérable, jusqu'à 17 000.", src:"livre p. 149, doc. 8" },
  ]},
  { key:"acteurs", code:"G6", title:"Acteurs, lieux, marchandises", src:"livre p. 148 · cahier ex. 3", items:[
    { front:"Qui sont les propriétaires des navires du doc. 3 ?", back:["Trois armateurs vaudois","3 armateurs vaudois","des armateurs vaudois"], wrong:["Trois rois africains","Trois colons des Antilles","Trois capitaines anglais"], ans:"Trois armateurs vaudois (Suisse).", src:"livre p. 148, doc. 3 · cahier ex. 3c" },
    { front:"De quel port partent les navires des armateurs vaudois ?", back:["Marseille"], wrong:["Lausanne","Nantes","Lisbonne"], ans:"De Marseille, vers les Mascareignes.", src:"livre p. 148, doc. 3" },
    { front:"Que vendent les Vaudois aux Mascareignes ?", back:["Vin, tabac, pommades, tissus"], wrong:["Café, cacao, sucre","Des esclaves","Or et argent"], mcqOnly:true, ans:"Leur cargaison : vin, tabac, pommades, tissus, etc.", src:"livre p. 148, doc. 3" },
    { front:"Quels sont les deux navires vaudois qui font escale au Cap ?", back:["La Ville de Lausanne et le Pays de Vaud"], wrong:["Le Marie-Séraphique et le Dembia","La Victoria et la Santa Maria","Le Genève et le Neuchâtel"], mcqOnly:true, ans:"La Ville de Lausanne (550 Noirs) et le Pays de Vaud (485 esclaves).", src:"livre p. 148, doc. 3" },
    { front:"Combien de captifs le navire Ville de Lausanne transporte-t-il ?", back:["550"], opts:["140","307","485","550"], keepOrder:true, ans:"550 Noirs ; le Pays de Vaud, lui, en transporte 485.", src:"livre p. 148, doc. 3" },
    { front:"Où les captifs des navires vaudois sont-ils vendus ?", back:["aux Antilles","Antilles"], wrong:["à Marseille","au Mozambique","aux Mascareignes"], ans:"Aux Antilles.", src:"livre p. 148, doc. 3" },
    { front:"Que ramènent les navires vaudois des Antilles en Europe ?", back:["Café, cacao et sucre"], wrong:["Vin, tabac, pommades","Des esclaves","Tissus, armes, alcool"], mcqOnly:true, ans:"Café, cacao et sucre.", src:"livre p. 148, doc. 3" },
    { front:"Quelles marchandises européennes l'armateur charge-t-il à l'étape C (ex. 3) ?", back:["Tissus, armes, alcool"], wrong:["Coton, sucre, café","Esclaves","Or, argent, épices"], mcqOnly:true, ans:"Des marchandises européennes : tissus, armes, alcool, etc.", src:"cahier p. 70, ex. 3a, étape C" },
    { front:"Quelles marchandises coloniales le navire rapporte-t-il en Europe à l'étape B (ex. 3) ?", back:["Coton, sucre, café, tabac"], wrong:["Tissus, armes, alcool","Esclaves","Vin, pommades"], mcqOnly:true, ans:"Coton, sucre, café, tabac, etc., vendus en Europe.", src:"cahier p. 70, ex. 3a, étape B" },
    { front:"Comment la Suisse, sans politique coloniale, participe-t-elle à ce « commerce » ?", back:["En produisant des marchandises pour l'Afrique, en organisant des transports ou en investissant"], wrong:["Elle n'y participe pas du tout","En envoyant des soldats","En fondant des colonies aux Antilles"], mcqOnly:true, ans:"La plupart des pays européens, y compris ceux qui n'ont pas de politique coloniale comme la Suisse, participent en produisant des marchandises destinées à l'Afrique, en organisant des transports ou en investissant.", src:"livre p. 148, « Un système à grande échelle »" },
  ]},
  { key:"defs", code:"T", title:"Les 6 définitions", src:"livre pp. 148-149 · lexique · Larousse", items:[
    ...defItems(["arm","abo","escl","traite","affr","cauri"]),
    { front:"Quelle est la différence entre la traite et l'esclavage ?", back:["La traite est un commerce de captifs ; l'esclavage est l'état de personnes non libres"], wrong:["Ce sont deux mots pour la même chose","L'esclavage est un commerce ; la traite est un pays","La traite existe seulement en Asie"], mcqOnly:true, ans:"Traite : commerce ou trafic régulier de captifs considérés comme de la marchandise. Esclavage : état de personnes non libres, propriété d'un maître. Tes notes : « Traite des Noirs ≠ Esclavage ».", src:"livre p. 148, bulle jaune · lexique · tes notes" },
    { front:"Quel personnage de ta feuille est un esclave affranchi ?", back:["Olaudah Equiano","Equiano","Gustavus Vassa"], wrong:["Nicolas de Condorcet","Albert Londres","Napoléon"], ans:"Olaudah Equiano : La passionnante autobiographie d'un esclave affranchi (1789).", src:"livre p. 149, doc. 5" },
  ]},
  { key:"dates", code:"D", title:"Les dates", src:"feuille d'objectifs · livre p. 149 · tes notes", items:[
    { front:"Quelle est, environ, la période de la traite atlantique ?", back:["De 1500 à 1850 environ","1500 à 1850","1500-1850"], wrong:["De 1000 à 1200","De 1789 à 1815","De 1900 à 1950"], ans:"De 1500 à 1850 environ.", src:"feuille d'objectifs" },
    { front:"En quelle année la France abolit-elle une première fois l'esclavage ?", back:["1794"], wrong:["1802","1815","1848"], ans:"1794 ; Napoléon annule le décret en 1802.", src:"feuille d'objectifs · livre p. 149" },
    { front:"En quelle année Napoléon annule-t-il le décret d'abolition ?", back:["1802"], wrong:["1794","1807","1833"], ans:"1802.", src:"feuille d'objectifs · livre p. 149" },
    { front:"En quelle année la Grande-Bretagne abolit-elle la traite ?", back:["1807"], wrong:["1815","1833","1848"], ans:"1807 ; la France abolit la traite en 1815.", src:"feuille d'objectifs · tes notes de classe" },
    { front:"En quelle année la France abolit-elle la traite ?", back:["1815"], wrong:["1794","1807","1848"], ans:"1815, après la Grande-Bretagne (1807).", src:"feuille d'objectifs" },
    { front:"En quelle année la Grande-Bretagne abolit-elle l'esclavage ?", back:["1833"], wrong:["1807","1848","1865"], ans:"1833 ; la France en 1848.", src:"feuille d'objectifs · tes notes de classe" },
    { front:"En quelle année la France abolit-elle l'esclavage ?", back:["1848"], wrong:["1794","1815","1833"], ans:"1848.", src:"feuille d'objectifs · tes notes de classe" },
    { front:"Que se passe-t-il aux USA en 1865 ?", back:["Fin de la guerre civile, abolition de l'esclavage, assassinat d'Abraham Lincoln"], wrong:["Abolition de la traite seulement","Début de la guerre civile","Indépendance des USA"], mcqOnly:true, ans:"Fin de la guerre civile aux USA et abolition de l'esclavage ; assassinat d'Abraham Lincoln.", src:"feuille d'objectifs" },
    { front:"Quel président américain est assassiné en 1865 ?", back:["Abraham Lincoln","Lincoln"], wrong:["George Washington","Napoléon","Thomas Jefferson"], ans:"Abraham Lincoln.", src:"feuille d'objectifs" },
    { front:"En quelle année le Brésil abolit-il l'esclavage ?", back:["1888"], wrong:["1845","1865","1885"], ans:"1888 : le dernier pays de ta liste.", src:"feuille d'objectifs · tes notes de classe" },
    { front:"Selon tes notes, en quelle année le Brésil abolit-il la traite ?", back:["1845"], wrong:["1807","1848","1888"], ans:"Tes notes de classe : « 1845 : Brésil, abolition de la traite ».", src:"tes notes de classe" },
    { front:"Quel pays abolit l'esclavage en premier : la Grande-Bretagne, la France, les USA ou le Brésil ?", back:["la Grande-Bretagne","Grande-Bretagne"], opts:PAYS, keepOrder:true, ans:"La Grande-Bretagne (1833), puis la France (1848), les USA (1865), le Brésil (1888).", src:"feuille d'objectifs" },
    { front:"Remets dans l'ordre : France esclavage, Grande-Bretagne traite, Brésil esclavage, USA esclavage ?", back:["Grande-Bretagne traite, France esclavage, USA esclavage, Brésil esclavage"], wrong:["France esclavage, Grande-Bretagne traite, Brésil esclavage, USA esclavage","Brésil esclavage, USA esclavage, France esclavage, Grande-Bretagne traite","USA esclavage, Grande-Bretagne traite, France esclavage, Brésil esclavage"], mcqOnly:true, ans:"1807 Grande-Bretagne (traite), 1848 France (esclavage), 1865 USA, 1888 Brésil.", src:"feuille d'objectifs" },
  ]},
  { key:"perso", code:"P", title:"Equiano et Condorcet", src:"livre p. 149, doc. 5 et 6", items:[
    { front:"Quel autre nom porte Olaudah Equiano ?", back:["Gustavus Vassa l'Africain","Gustavus Vassa"], wrong:["Albert Londres","Benjamin Frossard","Abraham Lincoln"], ans:"Gustavus Vassa l'Africain.", src:"livre p. 149, doc. 5 · feuille d'objectifs" },
    { front:"Comment s'appelle le livre d'Olaudah Equiano ?", back:["La passionnante autobiographie d'un esclave affranchi"], wrong:["Réflexions sur l'esclavage des Nègres","Terre d'ébène","Les Passagers du vent"], mcqOnly:true, ans:"La passionnante autobiographie d'un esclave affranchi (1789).", src:"livre p. 149, doc. 5" },
    { front:"En quelle année paraît l'autobiographie d'Equiano ?", back:["1789"], opts:["1769","1781","1789","1929"], keepOrder:true, ans:"1789.", src:"livre p. 149, doc. 5" },
    { front:"Que font deux compatriotes d'Equiano, préférant la mort à une telle vie de misère ?", back:["Ils sautent à la mer"], wrong:["Ils s'enfuient en Europe","Ils deviennent marins","Ils achètent leur liberté"], mcqOnly:true, ans:"Enchaînés l'un à l'autre, ils passent à travers les filets et sautent à la mer.", src:"livre p. 149, doc. 5" },
    { front:"Selon Equiano, pourquoi les captifs étouffaient-ils presque dans le bateau ?", back:["L'étroitesse, la chaleur et le monde : chacun avait à peine la place de se retourner"], wrong:["Parce qu'il y avait de la fumée","Parce qu'on les enfermait dans des tonneaux","Parce qu'il faisait trop froid"], mcqOnly:true, ans:"L'étroitesse de l'endroit et la chaleur, avec un bateau si encombré que chacun avait à peine l'espace pour se retourner.", src:"livre p. 149, doc. 5" },
    { front:"Quel est l'ouvrage de Nicolas de Condorcet cité dans ton livre ?", back:["Réflexions sur l'esclavage des Nègres"], wrong:["La passionnante autobiographie d'un esclave affranchi","Terre d'ébène","Le Livre des Merveilles du Monde"], mcqOnly:true, ans:"Réflexions sur l'esclavage des Nègres (1781).", src:"livre p. 149, doc. 6" },
    { front:"En quelle année Condorcet écrit-il ses Réflexions sur l'esclavage des Nègres ?", back:["1781"], opts:["1769","1781","1789","1802"], keepOrder:true, ans:"1781.", src:"livre p. 149, doc. 6" },
    { front:"Lequel des deux personnages est un abolitionniste qui argumente, et lequel un témoin de la traite ?", back:["Condorcet argumente, Equiano témoigne"], wrong:["Equiano argumente, Condorcet témoigne","Les deux sont des armateurs","Les deux sont des esclaves affranchis"], mcqOnly:true, ans:"Condorcet, abolitionniste, répond aux arguments des défenseurs de la traite ; Equiano, esclave affranchi, raconte ce qu'il a vécu.", src:"livre p. 149, doc. 5 et 6" },
  ]},
  { key:"lieux", code:"L", title:"Les 5 lieux", src:"livre pp. 148-149 · tes notes · Larousse", items:[
    { front:"De quelles îles principales sont formées les Mascareignes ?", back:["La Réunion, l'île Maurice et Rodrigues"], wrong:["Cuba, Haïti et la Jamaïque","Madagascar, Zanzibar et les Comores","Gorée, le Cap-Vert et Madère"], mcqOnly:true, ans:"Archipel de l'océan Indien formé de La Réunion, l'île Maurice et Rodrigues.", src:"livre p. 148, glossaire" },
    { front:"Dans quel océan se trouvent les Mascareignes ?", back:["l'océan Indien","océan Indien"], opts:["l'océan Atlantique","l'océan Indien","l'océan Pacifique"], keepOrder:true, ans:"L'océan Indien.", src:"livre p. 148, glossaire" },
    { front:"Dans quel État d'Amérique du Nord se trouve le port de Charleston ?", back:["la Caroline du Sud","Caroline du Sud"], wrong:["la Floride","la Virginie","le Texas"], ans:"La Caroline du Sud (Amérique du Nord), selon tes notes de classe.", src:"tes notes de classe · livre p. 149, doc. 7" },
    { front:"Combien d'esclaves l'affiche de Charleston (1769) annonce-t-elle à vendre ?", back:["94"], opts:["39","94","140","307"], keepOrder:true, ans:"94 : 39 hommes, 15 garçons, 24 femmes et 16 filles, arrivés de Sierra Leone sur le Dembia.", src:"livre p. 149, doc. 7" },
    { front:"Dans quel pays se trouve Gorée ?", back:["au Sénégal","Sénégal"], wrong:["au Mozambique","au Brésil","en Angola"], ans:"Au Sénégal (doc. 4, « Marchand d'esclaves de Gorée (Sénégal) »).", src:"livre p. 148, doc. 4" },
    { front:"Le golfe de Guinée fait-il partie de l'océan Atlantique ou de l'océan Indien ?", back:["de l'océan Atlantique","océan Atlantique"], opts:["de l'océan Atlantique","de l'océan Indien"], keepOrder:true, ans:"De l'océan Atlantique, le long de la côte de l'Afrique de l'Ouest ; en Guinée, la traite des Noirs se développe après l'arrivée des Portugais.", src:"Dictionnaire Larousse, « Guinée »" },
    { front:"Selon le Larousse, après l'arrivée de quels Européens la traite des Noirs se développe-t-elle en Guinée ?", back:["les Portugais","Portugais"], wrong:["les Anglais","les Français","les Vaudois"], ans:"Après l'arrivée des Portugais (1461-1462), la traite des Noirs s'y développe.", src:"Dictionnaire Larousse, dictionnaire collège « Guinée »" },
    { front:"Sur quelle côte de l'Afrique se trouve le Mozambique, où les Vaudois achètent des esclaves ?", back:["la côte est, face à l'océan Indien"], wrong:["la côte ouest, face à l'Atlantique","la côte nord, face à la Méditerranée","au centre, loin de la mer"], mcqOnly:true, ans:"La côte est de l'Afrique, face à l'océan Indien : plus loin que les régions de la carte du doc. 1.", src:"livre p. 148, doc. 3 · cahier ex. 3b et 3e" },
    { front:"Quel lieu de ta feuille correspond au doc. 4 du livre ?", back:["Gorée"], opts:["Mascareignes","Charleston","Gorée","Mozambique"], keepOrder:true, ans:"Gorée (doc. 4) ; Charleston correspond au doc. 7, les Mascareignes et le Mozambique au doc. 3.", src:"livre p. 148, doc. 4" },
  ]},
  { key:"contexte", code:"X", title:"Contextualisation (cahier p. 69)", src:"cahier p. 69, ex. 1 et 2", items:[
    { front:"Quels pays européens n'ont pas de colonies au début du XXe siècle (ex. 1a) ?", back:["La Grèce, la Suède et la Suisse"], wrong:["La France, la Belgique et l'Italie","L'Allemagne, l'Espagne et les Pays-Bas","La Grande-Bretagne, la Suisse et la France"], mcqOnly:true, ans:"La Grèce, la Suède et la Suisse (biffées dans ton exercice).", src:"cahier p. 69, ex. 1a (corrigé)" },
    { front:"Quel est le principal pays colonisateur européen (n° 1) au début du XXe siècle ?", back:["la Grande-Bretagne","Grande-Bretagne"], opts:["la Grande-Bretagne","la France","l'Allemagne","la Belgique"], keepOrder:true, ans:"La Grande-Bretagne (n° 1), puis la France (n° 2).", src:"cahier p. 69, ex. 1c (corrigé)" },
    { front:"Ex. 1b : quels pays non européens deviennent de nouvelles puissances coloniales ?", back:["Le Japon et les États-Unis"], wrong:["La Chine et l'Inde","Le Brésil et le Mexique","L'Égypte et le Maroc"], mcqOnly:true, ans:"Le Japon et les États-Unis.", src:"cahier p. 69, ex. 1b (corrigé)" },
    { front:"Ex. 1b : que devient l'Afrique entre le début du XIXe et le début du XXe siècle ?", back:["Elle est presque totalement colonisée"], wrong:["Elle devient indépendante","Elle colonise l'Europe","Elle n'est pas touchée"], mcqOnly:true, ans:"La colonisation presque totale de l'Afrique ; en Amérique, au contraire, les colonies deviennent indépendantes.", src:"cahier p. 69, ex. 1b (corrigé)" },
    { front:"Ex. 2 : en quelle année l'Afrique est-elle partagée à Berlin ?", back:["1885"], opts:["1848","1885","1904","1917"], keepOrder:true, ans:"1885.", src:"cahier p. 69, ex. 2b" },
    { front:"Ex. 2 : en quelle année date la gravure des marchands d'esclaves (doc. 4) ?", back:["1796"], opts:["1769","1781","1796","1848"], keepOrder:true, ans:"1796.", src:"cahier p. 69, ex. 2b · livre p. 148, doc. 4" },
    { front:"Ex. 2 : en quelle année y a-t-il du travail forcé en Guinée ?", back:["1904"], opts:["1885","1904","1917","1950"], keepOrder:true, ans:"1904.", src:"cahier p. 69, ex. 2b" },
    { front:"Ex. 2 : qui critique la colonisation en 1950 ?", back:["Aimé Césaire","Césaire","A. Césaire"], wrong:["Condorcet","Albert Londres","Napoléon"], ans:"A. Césaire, en 1950.", src:"cahier p. 69, ex. 2b" },
    { front:"Ex. 2c : quelles deux recherches mènent l'Europe industrielle à la colonisation ?", back:["De nouveaux débouchés et de nouvelles matières premières"], wrong:["De l'or et des épices","De nouveaux esclaves et du sucre","Des savants et des artistes"], mcqOnly:true, ans:"La recherche de nouveaux débouchés et la recherche de nouvelles matières premières.", src:"cahier p. 69, ex. 2c (corrigé)" },
  ]},
];

/* Réglages du noyau (OUTIL). Jamais d'âge en dur : le noyau le déduit de la classe. */
const OUTIL = {
  eleve:"Livio", classe:"10e HarmoS", branche:BRANCHE,
  titre:HEAD.titre, sousTitre:"Histoire · TE HIS n° 2",
  jersey:"HIS 10",
  ongletFiche:["📖","Dossier"],
  badgeHtml:`<div class="head-code" aria-hidden="true">${HEAD.code}<b>${HEAD.num}</b></div>`,
  polices:"https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,800;1,8..60,400&family=Atkinson+Hyperlegible:wght@400;700&display=swap",
  introFiche:"",
  labelTout:"Tout le Dossier",
  motPaquet:"Chapitre", motPaquets:"chapitres", cePaquet:"Ce chapitre",
  compte:"questions",
  sousNiveaux:{ easy:"Je choisis parmi plusieurs réponses", hard:"J'écris tout ce qui peut s'écrire" },
  conseilSetup:"Les questions « pourquoi » restent toujours à choix, même au niveau épreuve. En épreuve blanche, tu ne vois aucune réponse avant la fin.",
  papier:{ titre:"Histoire — Les traites et l'esclavage (TE HIS n° 2)", court:"Histoire TE 2", fichier:FILE_SLUG, code:"#PDF-HIS-TE2" },
  copie:{ titre:"RÉSULTAT — " + SUBJECT_LONG },
  analyse:{
    role:"un professeur d'histoire suisse",
    sujet:"le TE d'histoire « Les traites et l'esclavage » : l'organisation de la traite et le commerce triangulaire, les débats et les abolitions, ce qui motive et justifie ces pratiques, la traite en Afrique, les acteurs, lieux et marchandises, les définitions, les dates, Equiano et Condorcet, les lieux",
    etiquettes:"l'étiquette est la clé du paquet, qui correspond à un chapitre du Dossier (G1 à G6 : objectifs généraux, T : définitions, D : dates, P : personnages, L : lieux, X : exercices de contextualisation)",
    pistes:"la traite et l'esclavage confondus, des dates d'abolition mélangées (traite / esclavage, Grande-Bretagne / France), l'ordre des étapes du commerce triangulaire, des marchandises placées sur le mauvais trajet, des chiffres des documents oubliés",
  },
};

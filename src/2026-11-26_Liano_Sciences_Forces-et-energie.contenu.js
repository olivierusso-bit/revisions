/* ============================================================
   SCIENCES DE LA NATURE — « Forces et énergie » 7H : les objectifs des fiches 42, 47 et 50
   Outil de révision de Liano — 7e HarmoS. Épreuve : jeudi 26.11.2026 (agenda : « Eval : énergie SCN », objectifs f. 50 + 47 + 42).
   Assemblé avec claude/couche-dossier.js et claude/noyau-quiz.js par claude/assembler.py (--couche dossier).
   Demande du parent (21.11.2026) : seulement ce qui sert les objectifs des trois listes « je dois être capable… »,
   condensé, un seul exemple par idée ; rien d'inventé. Pas de capsule vidéo ni d'audio.
   Les fiches 49 et 50 n'ont pas été faites en classe (fiche 50 barrée) : la partie roues dentées vient de l'enquête
   Odysséo 7H n° 64 et des pages 57-58 de la fiche Bordas 28 « La bicyclette », travaillées en classe (parent, 21.11.2026).
   ============================================================ */

const CSS_THEME = `
/* Énergie : vert feuille du fichier « Forces et énergie », jaune électrique, ardoise ; les 5 couleurs des mascottes d'énergie (fiche 38) en bande sous l'en-tête et en pastilles. Titres en Bricolage Grotesque, texte en Atkinson Hyperlegible (très lisible pour un élève de 7e). */
:root{
  --dock:#EDF2EE; --sheet:#FFFFFF; --ink:#16222A; --soft:#4F5E66; --st:#8A989C; --rule:#C8D3CF;
  --box:#2E6B3F; --box-wash:#DFEDE2; --crane:#F2B92E; --crane-ink:#3A2A00; --board:#22313A; --on-box:#FFFFFF;
  --good:#1F6E4E; --good-wash:#DDF1E6; --bad:#A3243B; --bad-wash:#F7E1E5;
  --gen:#55616B; --gen-wash:#EEF1F4; --book-wash:#FFF1B8; --book-ink:#5A4500; --dico:#6A3D8F; --dico-wash:#EFE6F7;
  --e-chim:#D9452F; --e-ray:#8E9AA1; --e-elec:#2D7FC1; --e-meca:#3A4247; --e-therm:#F2B92E;
  --land:#E7E1D2; --r1:#B3261E; --r2:#6B3FA0; --r3:#1E7A46; --r4:#7A6A12; --r5:#8E2A2A; --r6:#2361A8;
  --display:'Bricolage Grotesque',system-ui,sans-serif;
  --ui:'Atkinson Hyperlegible',system-ui,-apple-system,'Segoe UI',sans-serif;
  --read:'Atkinson Hyperlegible',system-ui,sans-serif;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --dock:#0F1613; --sheet:#17211C; --ink:#E4EEE8; --soft:#9DB2A7; --st:#5E7068; --rule:#2B3A33;
  --box:#7CC48F; --box-wash:#1B3324; --crane:#F2C14E; --crane-ink:#1F1600; --board:#0B1210; --on-box:#06180C;
  --good:#5FD3A0; --good-wash:#14332A; --bad:#FF8FA0; --bad-wash:#3A1D23;
  --gen:#A9B6BF; --gen-wash:#1D2830; --book-wash:#3A3110; --book-ink:#F4D46A; --dico:#C9A3EC; --dico-wash:#2B2136;
  --e-chim:#FF7A62; --e-ray:#B8C3C9; --e-elec:#6FB3EC; --e-meca:#C9D2D6; --e-therm:#F2C14E;
  --land:#2C3430; --r1:#FF8A80; --r2:#C3A6F0; --r3:#7FD6A4; --r4:#E2CF6A; --r5:#F0A0A0; --r6:#8DB8F2; color-scheme:dark}}
:root[data-theme="dark"]{
  --dock:#0F1613; --sheet:#17211C; --ink:#E4EEE8; --soft:#9DB2A7; --st:#5E7068; --rule:#2B3A33;
  --box:#7CC48F; --box-wash:#1B3324; --crane:#F2C14E; --crane-ink:#1F1600; --board:#0B1210; --on-box:#06180C;
  --good:#5FD3A0; --good-wash:#14332A; --bad:#FF8FA0; --bad-wash:#3A1D23;
  --gen:#A9B6BF; --gen-wash:#1D2830; --book-wash:#3A3110; --book-ink:#F4D46A; --dico:#C9A3EC; --dico-wash:#2B2136;
  --e-chim:#FF7A62; --e-ray:#B8C3C9; --e-elec:#6FB3EC; --e-meca:#C9D2D6; --e-therm:#F2C14E;
  --land:#2C3430; --r1:#FF8A80; --r2:#C3A6F0; --r3:#7FD6A4; --r4:#E2CF6A; --r5:#F0A0A0; --r6:#8DB8F2; color-scheme:dark}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
body{background:var(--dock);color:var(--ink);font-family:var(--ui);font-size:16px;line-height:1.5}
.wrap{max-width:640px;margin:0 auto;padding-block:18px 110px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
button{font:inherit;color:inherit}
button:focus-visible,input:focus-visible,textarea:focus-visible{outline:3px solid var(--crane);outline-offset:2px}

/* en-tête : un conteneur vu de côté (ondulations de la tôle) */
.head{position:relative;overflow:hidden;display:flex;gap:14px;align-items:center;margin-bottom:18px;padding:16px 14px 16px 16px;border-radius:4px;color:#fff;background:repeating-conic-gradient(from 3deg at 92% 30%,rgba(255,255,255,0) 0deg 10.5deg,rgba(255,255,255,.22) 10.5deg 11.25deg),#0E5A63}
.head-code{flex:none;background:#E3A923;color:#3A2700;font-family:var(--display);font-weight:800;font-size:15px;padding:4px 8px;border-radius:2px;letter-spacing:.5px;line-height:1.1;text-align:center}
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

/* en-tête de l'outil Énergie (remplace celui de la carte marine) */
.head{background:#22313A;border-bottom:7px solid transparent;border-image:linear-gradient(90deg,#D9452F 0 20%,#8E9AA1 20% 40%,#2D7FC1 40% 60%,#5A646A 60% 80%,#F2B92E 80%) 1}
.head-code{background:#F2B92E;color:#3A2A00}

/* transformations en 3 cases et pastilles de couleur des 5 énergies */
.enw{white-space:nowrap}
.hc-bolt{display:block;font-size:20px;line-height:1}
.en{display:inline-block;width:11px;height:11px;border-radius:50%;margin-right:6px;vertical-align:0;flex:none;box-shadow:0 0 0 1.5px var(--sheet),0 0 0 2.5px var(--rule)}
.en-chim{background:var(--e-chim)}.en-ray{background:var(--e-ray)}.en-elec{background:var(--e-elec)}.en-meca{background:var(--e-meca)}.en-therm{background:var(--e-therm)}
.tx{display:flex;flex-direction:column;gap:8px}
.tx-r{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);gap:6px;align-items:center;font-size:14.5px}
.tx-e{background:var(--dock);border:1px solid var(--rule);border-radius:6px;padding:7px 9px;font-weight:700;line-height:1.3}
.tx-m{position:relative;text-align:center;font-size:12.5px;color:var(--soft);padding:0 14px;max-width:118px;line-height:1.25}
.tx-m::before{content:"→";display:block;font-size:20px;line-height:1;color:var(--box);font-weight:700}
.tbl td small{display:block;color:var(--soft);font-size:13px;margin-top:3px}

/* roues dentées : petite / grande, effort et vitesse (lisible sans couleur : flèches et mots) */
.gear{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.gear-c{border:2px solid var(--board);border-radius:4px;padding:10px;display:flex;flex-direction:column;gap:4px;min-width:0;background:var(--dock)}
.gear-c b{font-family:var(--display);font-size:16px;line-height:1.2}
.gear-w{display:flex;align-items:flex-end;gap:2px;font-size:30px;line-height:1;color:var(--box)}
.gear-w .s{font-size:18px}
.gear-c span{font-size:14px}
.gear-x{grid-column:1/-1;margin:0;padding:8px 10px;border:2px dashed var(--bad);border-radius:4px;font-weight:700;font-size:14.5px}
.bike{display:flex;flex-wrap:wrap;gap:4px;align-items:center;font-weight:700;font-size:14px}
.bike span{background:var(--dock);border:1px solid var(--rule);border-radius:4px;padding:5px 8px}
.bike i{font-style:normal;color:var(--box)}
`;

const QUIZ_ID = "liano-quiz-sciences-energie-objectifs";   /* nouvel historique : le noyau v16 plante sur l'onglet Scores quand l'historique contient une carte d'un paquet retiré (paquet « centrales » de la v1) */
const DUE = { iso:"2026-11-26", long:"jeudi 26 novembre", short:"jeu 26.11" };
const THEME = "Forces et énergie";
const BRANCHE = "Sciences de la nature";
const SUBJECT_LONG = "Sciences de la nature, Forces et énergie (objectifs des fiches 42, 47 et 50)";
const FILE_SLUG = "2026-11-26_Liano_Sciences_Forces-et-energie";
const VERSION = { n:2, date:"21.11.2026" };
/* v1 : 12.11.2026, fiches 36 à 47, 5 chapitres, 63 questions (nom provisoire 2026-11-12)
   v2 : 21.11.2026, recentrée sur les 10 objectifs des fiches 42, 47 et 50 (un chapitre par objectif, un exemple par idée) ;
        ajout de la question de chaque enquête, de « se renseigner sur une source » (fiche 48) et des roues dentées
        (Odysséo 64, Bordas 28) ; retrait des 8 sources et des usages de la fiche 46, des centrales thermique, nucléaire et
        éolienne, des exemples en double ; date de l'épreuve : jeudi 26.11.2026 */

/* ---------- SOURCES ----------
   Fichier « Sciences de la nature — Forces et énergie, 7H » (HEP-Valais, version 2020), fiches 36 à 50 ;
   enquête Odysséo 7H n° 64 « À quoi servent les roues dentées ? » (2 pages) ; fiche Bordas 28 « Un objet très courant :
   la bicyclette », pages 57 et 58. Les fiches imprimées font foi ; les réponses de Liano ne sont reprises que quand
   une fiche imprimée dit la même chose, ou quand c'est un texte écrit en classe (fiches 45, 47) ou sa fiche de recherche (fiche 48). */
const SOURCES = [
  { titre:"Fiche 42 — liste « je dois être capable… » (module 1)", recue:"21.11.2026", contenu:"Les 3 premiers objectifs ; l'encadré « L'énergie ne se perd pas, elle se transforme. » ; les lignes imprimées « Four à raclette » et « Vélo »." },
  { titre:"Fiche 47 — liste « je dois être capable… » (module 2)", recue:"21.11.2026", contenu:"Les 4 objectifs suivants ; les deux définitions écrites en classe (renouvelables, non renouvelables)." },
  { titre:"Fiche 50 — liste « je dois être capable… » (module 3)", recue:"21.11.2026", contenu:"Les 3 derniers objectifs, seulement. Le reste de la fiche est barré : pas fait en classe." },
  { titre:"Fiche 38 — Les types d'énergie", recue:"11.11.2026", contenu:"Les 5 définitions et un exemple par type." },
  { titre:"Fiche 39 — l'énergie au quotidien", recue:"11.11.2026", contenu:"La télécommande et la voiture (page des réponses imprimée)." },
  { titre:"Fiche 40 — Comment l'énergie se transforme-t-elle ?", recue:"11.11.2026", contenu:"La question de l'enquête ; l'expérience de la manivelle (énergie mécanique → alternateur → énergie électrique, ampoule allumée)." },
  { titre:"Fiche 41 — d'autres expériences", recue:"11.11.2026", contenu:"Le tableau du bas : rayonnement → panneau photovoltaïque → électrique. Le schéma du haut est écarté." },
  { titre:"Fiche 43 — centrales", recue:"11.11.2026", contenu:"Seulement le barrage : l'eau sous pression fait tourner la turbine, qui entraîne l'alternateur." },
  { titre:"Fiche 44 — Mission spéciale", recue:"11.11.2026", contenu:"La voiture (imprimé) : chimique → chaleur et mouvement." },
  { titre:"Fiche 45 — D'où provient l'énergie utilisée par le corps humain ?", recue:"11.11.2026", contenu:"La question ; photosynthèse, glucose, digestion, mouvement et chaleur (37 °C)." },
  { titre:"Fiche 46 — D'où proviennent les énergies utilisées dans les activités humaines ?", recue:"11.11.2026", contenu:"La question et l'encadré « Les hommes transforment les énergies pour pouvoir les utiliser. » ; « géothermique : avec les forages et les pompes à chaleur »." },
  { titre:"Fiche 48 — Mission spéciale : l'énergie géothermique", recue:"21.11.2026", contenu:"Les questions imprimées pour se renseigner sur une source ; la recherche de Liano (chaleur du sous-sol, eau chaude, chauffer des maisons, électricité, se transporte difficilement). La ligne des avantages, en partie cachée par un papillon, n'est pas reprise." },
  { titre:"Odysséo 7H, enquête 64, page 1 — le moulin à vent", recue:"21.11.2026", contenu:"Le schéma du mécanisme (rouet, lanterne, meules) ; la meule tourne plus vite que les ailes. La chaîne « ailes → … → meule » n'est pas reprise (pas de corrigé)." },
  { titre:"Odysséo 7H, enquête 64, page 2 — bilan", recue:"21.11.2026", contenu:"Le texte à compléter avec les mots proposés (roues dentées, dents, grandes, diminue, augmente, possible). Les deux premières réponses de Liano sont fausses et non corrigées : seule la règle imprimée du bilan est reprise. Le tableau des objets n'est pas repris." },
  { titre:"Bordas, fiche 28, page 57 — La transmission du mouvement dans une bicyclette", recue:"21.11.2026", contenu:"Page corrigée en classe : roues dentées (plateau, pignon), transmission par la chaîne, roue arrière plus rapide que les pédales ; définition du développement." },
  { titre:"Bordas, fiche 28, page 58 — Des essais pour tester des hypothèses", recue:"21.11.2026", contenu:"Les résultats imprimés (chaîne : toujours 2 tours ; montages : 2, 5 et 1,5 tours) et le texte « Pour faire le point ». Les calculs du développement ne sont pas repris." },
];
const SOURCES_NOTE = "Les étiquettes « Livre, fiche … » reprennent le texte imprimé. « Ton dossier » reprend ce qui a été écrit en classe (fiches 45, 47), la recherche de Liano sur la géothermie (fiche 48) et les réponses corrigées. Écartés pour rester sur les objectifs : fiches 36 et 37 (réponses personnelles), les 8 sources et les usages de la fiche 46, les centrales thermique, nucléaire et éolienne, la mission de la fiche 44 (sauf la voiture), le tableau des objets et les deux premières réponses de l'enquête Odysséo (fausses, non corrigées), les calculs de la page 58. Fiche 49 : pas faite en classe.";
const PHOTOS = [
  { titre:"Fiche 38", url:"/_blob/fa00608293a4639713a3bfcda471d6c4" },
  { titre:"Fiche 39 — réponses", url:"/_blob/7884dd9b776f407b9eb090967f0c8111" },
  { titre:"Fiche 40", url:"/_blob/7326471738d8dfc3bb73b65597656f29" },
  { titre:"Fiche 41", url:"/_blob/8d44860d00e462578da7851689704468" },
  { titre:"Fiche 42", url:"/_blob/2a5213ad83edd37d9e4fa621dbb80d33" },
  { titre:"Fiche 43", url:"/_blob/c4e96985b400c5dd0341e8e7b01b2207" },
  { titre:"Fiche 44", url:"/_blob/6511807db9a7ae6f651df19fd425b134" },
  { titre:"Fiche 45", url:"/_blob/1079a890773ee3af38aedb26ab47954e" },
  { titre:"Fiche 46", url:"/_blob/3267a49520fc76b89165269e8059c8b5" },
  { titre:"Fiche 47", url:"/_blob/fc894df09597ab4d7aa91ea066bc341e" },
  { titre:"Fiche 48", url:"/_blob/4207f5b7fd2ba26c9261b4d9d52ad014" },
  { titre:"Fiche 50", url:"/_blob/aa44f41acaf8997bac054cb87278f05f" },
  { titre:"Odysséo 64, page 1", url:"/_blob/20f0f70468540c5e59eaf0d7399e1eb6" },
  { titre:"Odysséo 64, page 2", url:"/_blob/12fb45bd406c661ff22a513a9a9a2f44" },
  { titre:"Bordas 28, page 57", url:"/_blob/2f3d25b41f9232e2169965e440ab6dae" },
  { titre:"Bordas 28, page 58", url:"/_blob/01dd45acc1b0d5de46e578fefc63273f" },
];

const VIDEOS = {};
const AUDIOS = {};
const CAPSULES = { titre:THEME, controle:DUE.long, consigne:"", diffusion:"", chapitres:[] };
const SVGS = {};
const P_PAGE = {};

const CAP = "À la fin de cette enquête scientifique, je dois être capable…";
const CHAPTERS = [
  { key:"M1", titre:"L'énergie se transforme", sous:"Objectifs de la fiche 42", objLabel:CAP + " (fiche 42)" },
  { key:"M2", titre:"Les sources d'énergie", sous:"Objectifs de la fiche 47", objLabel:CAP + " (fiche 47)" },
  { key:"M3", titre:"Les roues dentées", sous:"Objectifs de la fiche 50", objLabel:CAP + " (fiche 50)" },
];

const tbl = (head, rows, note) => `<div class="tbl"><table><thead><tr>${head.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map((c, i) => `<td${i === 0 ? ' class="k"' : ""}>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>${note ? `<p class="fine">${note}</p>` : ""}`;
/* une transformation en 3 cases : énergie avant → moyen → énergie obtenue */
const trio = (rows) => `<div class="tx">${rows.map(([a, m, b]) => `<div class="tx-r"><span class="tx-e">${a}</span><span class="tx-m">${m}</span><span class="tx-e">${b}</span></div>`).join("")}</div>`;
const EN = { chim:`<span class="enw"><i class="en en-chim"></i>chimique</span>`, ray:`<span class="enw"><i class="en en-ray"></i>rayonnement</span>`, elec:`<span class="enw"><i class="en en-elec"></i>électrique</span>`, meca:`<span class="enw"><i class="en en-meca"></i>mécanique</span>`, therm:`<span class="enw"><i class="en en-therm"></i>thermique</span>` };

const PAGES = [
/* ---------------- FIL ROUGE ---------------- */
{ id:"LIENS", ch:"", titre:"Le fil rouge", court:"Les 10 objectifs de l'épreuve et la phrase à retenir",
  pre:[{ q:"Quelle est la phrase la plus importante de ta fiche 42 ?", a:"L'énergie ne se perd pas, elle se transforme.", s:"Fiche 42, encadré" }],
  blank:{ consigne:"Sur une feuille blanche, écris la question de chaque enquête, puis la phrase la plus importante.", points:["Comment l'énergie se transforme-t-elle ?","D'où proviennent les énergies utilisées dans les activités humaines ?","À quoi servent les roues dentées ?","L'énergie ne se perd pas, elle se transforme."], s:"Fiches 40, 46 et 42 · Odysséo 64" },
  blocks:[
  { t:"p", s:"Agenda : « Eval : énergie SCN », objectifs des fiches 42, 47 et 50", h:"Ton épreuve du <b>jeudi 26 novembre</b> porte sur les trois listes « je dois être capable… » des fiches 42, 47 et 50 : <b>10 objectifs</b>, un chapitre chacun." },
  { t:"p", s:"Fiche 42, encadré", h:"La phrase à retenir avant toutes les autres : <b>l'énergie ne se perd pas, elle se transforme.</b>" },
  { t:"h3", h:"Les questions de tes enquêtes" },
  { t:"html", s:"Titres des fiches 40, 45, 46 et de l'enquête Odysséo 64", h:tbl(["Partie","La question travaillée"], [
    ["Fiche 42","Comment l'énergie se transforme-t-elle ?"],
    ["Fiche 47","D'où proviennent les énergies utilisées dans les activités humaines ? (et par le corps humain ?)"],
    ["Fiche 50","À quoi servent les roues dentées ?"]]) },
  { t:"links", s:"Fiches 40, 43, 45 · Odysséo 64 · Bordas 28", items:[
    [["E3","E9"], "La manivelle tourne et fait tourner l'alternateur ; les pédales tournent et font tourner le plateau : dans les deux cas, un mouvement de rotation est transmis."],
    [["E7","E6"], "Le soleil donne l'énergie aux plantes, puis à toi. Les hommes, eux, utilisent des sources d'énergie : certaines se renouvellent, d'autres non."]] },
  { t:"tip", h:"Ordre conseillé : lis un chapitre, puis « Teste-toi » en Échauffement. Les jours suivants, Entraînement, puis Niveau épreuve. Mercredi, une épreuve blanche sur tout le Dossier." },
]},

/* ================= FICHE 42 ================= */
{ id:"E1", ch:"M1", titre:"La question de l'enquête", court:"Comment l'énergie se transforme-t-elle ?",
  obj:"de dire quelle est la question travaillée durant l'enquête et ce qui a été réalisé (fiches 37 et 40).",
  pre:[{ q:"Qu'as-tu fait tourner pour allumer l'ampoule ?", a:"Une manivelle, reliée à un alternateur.", s:"Fiche 40" }],
  blank:{ consigne:"Écris la question de l'enquête et, en une phrase, ce que tu as réalisé.", points:["Comment l'énergie se transforme-t-elle ?","J'ai tourné une manivelle : l'alternateur a produit de l'électricité et l'ampoule s'est allumée.","L'énergie ne se perd pas, elle se transforme."], s:"Fiches 40 et 42" },
  blocks:[
  { t:"def", term:"La question", book:"Livre, fiche 40", s:"Fiche 40, titre", h:"Comment l'énergie se transforme-t-elle ?" },
  { t:"p", s:"Fiche 37, titre", h:"Avant, ta classe s'était demandé : « Quelles énergies utilise-t-on ? »" },
  { t:"h3", h:"Ce que tu as réalisé" },
  { t:"p", s:"Fiche 40, ton schéma", h:"Tu as tourné une <b>manivelle</b> reliée à un <b>alternateur</b> : l'<b>ampoule s'est allumée</b>." },
  { t:"html", s:"Fiche 40", h:trio([[EN.meca + " (manivelle)", "alternateur", EN.elec + " (ampoule allumée)"]]) },
  { t:"p", s:"Fiche 42, encadré", h:"Ce que l'enquête a montré : <b>l'énergie ne se perd pas, elle se transforme.</b>" },
  { t:"pause", q:"Avec la manivelle, quel est le moyen de transformation ?", a:"L'alternateur.", s:"Fiche 40" },
  { t:"tip", h:"Si on te demande « la question et ce que tu as réalisé », réponds en deux phrases : la question, puis l'expérience de la manivelle." },
  { t:"src", h:"Fiches 37, 40 et 42" },
]},

{ id:"E2", ch:"M1", titre:"Les 5 types d'énergie", court:"Chimique, rayonnement, électrique, mécanique, thermique",
  obj:"d'utiliser les 5 types d'énergie pour parler de ce qui se passe au quotidien (fiches 38 et 39).",
  pre:[{ q:"Une voiture qui roule : quelle énergie vois-tu ?", a:"L'énergie mécanique (de mouvement).", s:"Fiche 38" }],
  blank:{ consigne:"Ferme le Dossier. Écris les 5 types d'énergie avec un exemple chacun.", points:["Chimique : le bois, la nourriture","Rayonnement : la lumière du soleil, d'une lampe","Électrique : les piles, les prises, la foudre","Mécanique : une voiture qui roule, un caillou qui tombe","Thermique : la chaleur du feu, du corps (37 °C)"], s:"Fiche 38" },
  blocks:[
  { t:"html", s:"Fiche 38, tableau « Les types d'énergie »", h:tbl(["Énergie","Définition · un exemple"], [
    [EN.chim,"Elle est contenue dans la matière (herbe, bois…). Elle se libère lors d'une réaction chimique.<small>Le bois, la nourriture</small>"],
    [EN.ray,"Tous les objets émettent des rayonnements. Les hommes ne les perçoivent pas tous, mais ils existent pourtant.<small>La lumière du soleil, d'une lampe</small>"],
    [EN.elec,"Elle est contenue dans un courant électrique.<small>Les piles, les prises, la foudre</small>"],
    [EN.meca,"Elle est contenue dans un objet en mouvement.<small>Une voiture qui roule, un caillou qui tombe</small>"],
    [EN.therm,"Elle se trouve dans toutes les matières. Plus la température est élevée, plus la matière contient de chaleur.<small>La chaleur du feu, du corps humain (37 °C)</small>"]]) },
  { t:"pause", q:"Quelle énergie est contenue dans un objet en mouvement ?", a:"L'énergie mécanique.", s:"Fiche 38" },
  { t:"tip", h:"Un truc pour ne pas confondre : la lumière, c'est du rayonnement ; la chaleur, c'est du thermique ; ce qui bouge, c'est du mécanique ; ce qu'on mange ou qu'on brûle, c'est du chimique." },
  { t:"see", ids:["E3"] },
  { t:"src", h:"Fiche 38" },
]},

{ id:"E3", ch:"M1", titre:"Trouver la transformation", court:"Énergie avant → moyen de transformation → énergie obtenue",
  obj:"de déterminer la transformation d'énergie dans une situation observée (fiches 42 et 43).",
  pre:[{ q:"La télécommande : quelle énergie au début, quelle énergie à la fin ?", a:"Électrique (les piles) au début, rayonnement (infrarouges) à la fin.", s:"Fiche 39" }],
  blank:{ consigne:"Dessine 3 cases (énergie avant · moyen · énergie obtenue) et remplis-les pour la manivelle, la télécommande et le barrage.", points:["Manivelle : mécanique → alternateur → électrique","Télécommande : électrique (piles) → télécommande → rayonnement","Barrage : l'eau sous pression fait tourner la turbine, qui entraîne l'alternateur → électricité"], s:"Fiches 39, 40 et 43" },
  blocks:[
  { t:"p", s:"Fiches 40 à 42, tableaux", h:"Pour décrire une transformation, tu remplis toujours <b>3 cases dans cet ordre</b> : l'<b>énergie avant</b> la transformation, le <b>moyen de transformation</b>, l'<b>énergie obtenue</b>." },
  { t:"html", s:"Fiche 40 · fiche 41, tableau du bas · fiche 39 · fiche 44 (voiture, imprimé)", h:trio([
    [EN.meca + " (manivelle)", "alternateur", EN.elec],
    [EN.ray, "panneau photovoltaïque", EN.elec],
    [EN.elec + " (piles)", "télécommande", EN.ray + " (infrarouges)"],
    [EN.chim, "voiture", EN.therm + " et " + EN.meca]]) },
  { t:"p", s:"Fiche 39 · fiche 44", h:"Attention au sens : la télécommande <b>commence</b> avec l'électricité des piles. Et parfois on obtient <b>deux</b> énergies : la voiture avance, mais elle chauffe aussi." },
  { t:"pause", q:"La voiture transforme l'énergie chimique en quelles énergies ?", a:"En chaleur (thermique) et en mouvement (mécanique).", s:"Fiche 44" },
  { t:"h3", h:"Dans la réalité : le barrage" },
  { t:"p", s:"Fiche 43, centrale hydroélectrique", h:"L'<b>eau sous pression</b> fait tourner une <b>turbine</b> (énergie mécanique), qui entraîne l'<b>alternateur</b> et produit l'<b>électricité</b>. C'est ta manivelle, en très grand." },
  { t:"pause", q:"Quelle pièce entraîne l'alternateur ?", a:"La turbine.", s:"Fiche 43" },
  { t:"tip", h:"À l'épreuve : 1. énergie au début, 2. l'objet qui transforme, 3. énergie à la fin. Puis vérifie : y a-t-il aussi de la chaleur ?" },
  { t:"see", ids:["E2","E1"] },
  { t:"src", h:"Fiches 39 à 44" },
]},

/* ================= FICHE 47 ================= */
{ id:"E4", ch:"M2", titre:"La question de l'enquête", court:"D'où proviennent les énergies ?",
  obj:"de dire quelle est la question travaillée dans l'enquête (fiches 45 et 46).",
  pre:[{ q:"D'où vient l'énergie de ton corps ?", a:"De la nourriture, qui tient son énergie du soleil grâce aux plantes.", s:"Fiche 45" }],
  blank:{ consigne:"Écris les deux questions de l'enquête et la phrase de l'encadré de la fiche 46.", points:["D'où provient l'énergie utilisée par le corps humain ?","D'où proviennent les énergies utilisées dans les activités humaines ?","Les hommes transforment les énergies pour pouvoir les utiliser."], s:"Fiches 45 et 46" },
  blocks:[
  { t:"def", term:"Les questions", book:"Livre, fiches 45 et 46", s:"Fiches 45 et 46, titres", h:"D'où provient l'énergie utilisée par le corps humain ? — D'où proviennent les énergies utilisées dans les activités humaines ?" },
  { t:"def", term:"À retenir", book:"Livre, fiche 46", s:"Fiche 46, encadré", h:"Les hommes transforment les énergies pour pouvoir les utiliser." },
  { t:"pause", q:"Pourquoi les hommes transforment-ils les énergies ?", a:"Pour pouvoir les utiliser.", s:"Fiche 46" },
  { t:"see", ids:["E7","E5"] },
  { t:"src", h:"Fiches 45 et 46" },
]},

{ id:"E5", ch:"M2", titre:"Se renseigner sur une source", court:"La fiche d'identité d'une source : l'exemple de la géothermie",
  obj:"de me renseigner sur une source d'énergie (fiches 46 et 48).",
  pre:[{ q:"Que veut dire « géothermie » ?", a:"La chaleur de la terre.", s:"Fiche 47" }],
  blank:{ consigne:"Sans regarder, refais la fiche d'identité de la géothermie : d'où elle vient, comment on l'utilise, un inconvénient.", points:["Elle vient de la chaleur du sous-sol (la chaleur de la terre)","On utilise l'eau chaude du sous-sol (forages, pompes à chaleur)","Pour chauffer des maisons ou produire de l'électricité","Inconvénient : elle se transporte difficilement, on l'utilise sur place"], s:"Fiche 48 · fiches 46 et 47" },
  blocks:[
  { t:"p", s:"Fiche 48, questions imprimées", h:"Pour te renseigner sur une source d'énergie, ta fiche 48 te fait répondre à <b>trois questions</b> : <b>1.</b> Quelle est cette source ? De quoi provient-elle ? <b>2.</b> Comment est-elle transformée pour être utilisée par les hommes ? <b>3.</b> Quels sont ses avantages et ses inconvénients ?" },
  { t:"h3", h:"Ta recherche : l'énergie géothermique" },
  { t:"html", s:"Fiche 48, ta recherche · fiche 46 (étiquette) · fiche 47 (« chaleur de la terre »)", h:tbl(["Question","Ta réponse"], [
    ["D'où vient-elle ?","De la <b>chaleur du sous-sol</b> (la chaleur de la terre)."],
    ["Comment l'utilise-t-on ?","On utilise l'<b>eau chaude</b> du sous-sol (forages, pompes à chaleur) pour <b>chauffer des maisons</b> ou même <b>produire de l'électricité</b>."],
    ["Un inconvénient","Elle se <b>transporte difficilement</b> : il faut l'utiliser sur place, juste à côté de la maison à chauffer."]]) },
  { t:"pause", q:"Pourquoi faut-il utiliser la géothermie sur place ?", a:"Parce qu'elle se transporte difficilement.", s:"Fiche 48" },
  { t:"tip", h:"Si on te donne une autre source à l'épreuve, réponds avec les mêmes trois questions : d'où elle vient, comment on la transforme, un avantage et un inconvénient." },
  { t:"see", ids:["E6"] },
  { t:"src", h:"Fiche 48 · fiches 46 et 47" },
]},

{ id:"E6", ch:"M2", titre:"Renouvelable ou pas ?", court:"Ce qui se renouvelle, ce qui existe en quantité limitée",
  obj:"de citer quelques sources d'énergie et d'expliquer pourquoi elles sont renouvelables/non renouvelables (fiche 47).",
  pre:[{ q:"Le pétrole existera-t-il toujours ?", a:"Non : il se trouve en quantité limitée dans le sous-sol. Il n'est pas renouvelable.", s:"Fiche 47" }],
  blank:{ consigne:"Écris les deux définitions, puis cite 3 sources renouvelables et les 3 énergies fossiles.", points:["Renouvelables : le soleil, le vent, l'eau qui coule sans cesse, les arbres et les plantes qui se renouvellent, la géothermie","Non renouvelables : en quantité limitée sur la Terre","Énergies fossiles : pétrole, charbon, gaz naturel, dans le sous-sol"], s:"Fiche 47" },
  blocks:[
  { t:"def", term:"Énergies renouvelables", s:"Fiche 47, définition écrite en classe", h:"Les sources d'énergie : le soleil, le vent, l'eau qui coule sans cesse, les arbres et les plantes qui se renouvellent, la géothermie (chaleur de la terre)." },
  { t:"def", term:"Énergies non renouvelables", s:"Fiche 47, définition écrite en classe", h:"Les énergies qui se trouvent en quantité limitée sur la Terre, par exemple les énergies fossiles : pétrole, charbon, gaz naturel, qui se trouvent dans le sous-sol." },
  { t:"html", s:"Fiche 47, définitions", h:tbl(["Renouvelables ✓","Non renouvelables ✗"], [
    ["solaire (soleil) · éolienne (vent) · hydraulique (eau qui coule) · biomasse (arbres, plantes) · géothermique (chaleur de la terre)","énergies fossiles : pétrole, charbon, gaz naturel"]]) },
  { t:"pause", q:"Pourquoi le charbon n'est-il pas renouvelable ?", a:"Parce qu'il se trouve en quantité limitée sur la Terre (dans le sous-sol).", s:"Fiche 47" },
  { t:"tip", h:"Pour expliquer « pourquoi », reprends les mots de ta définition : une énergie renouvelable se renouvelle (le soleil, le vent, l'eau qui coule sans cesse) ; une énergie non renouvelable existe en quantité limitée." },
  { t:"see", ids:["E5"] },
  { t:"src", h:"Fiche 47" },
]},

{ id:"E7", ch:"M2", titre:"L'énergie de ton corps", court:"Du soleil à la plante, de la plante à toi",
  obj:"d'expliquer d'où le corps humain et tous les animaux tirent leur énergie (fiche 45).",
  pre:[{ q:"Comment s'appelle ce que fait une feuille au soleil ?", a:"La photosynthèse.", s:"Fiche 45" }],
  blank:{ consigne:"Dessine de mémoire la chaîne de la fiche 45, du soleil jusqu'à ton corps, avec le nom de chaque énergie.", points:["Rayonnement du soleil","Photosynthèse","Glucose (sucre) dans la plante : énergie chimique","Digestion, oxydation dans les cellules","Mouvement du corps et chaleur (37 °C)"], s:"Fiche 45" },
  blocks:[
  { t:"html", s:"Fiche 45, schéma du haut", h:trio([[EN.ray + " du soleil", "photosynthèse", EN.chim + " : le glucose (sucre)"]]) },
  { t:"def", term:"Photosynthèse", s:"Fiche 45, encadré complété en classe", h:"Cette transformation d'énergie de rayonnement en énergie chimique est à la base de toute vie sur Terre. Elle procure de l'énergie à tous les animaux herbivores et carnivores." },
  { t:"pause", q:"La photosynthèse transforme quelle énergie en quelle énergie ?", a:"L'énergie de rayonnement (du soleil) en énergie chimique.", s:"Fiche 45" },
  { t:"html", s:"Fiche 45, schéma du bas", h:trio([[EN.chim + " : la plante", "digestion, oxydation dans les cellules", EN.meca + " (mouvement du corps) et " + EN.therm + " (37 °C)"]]) },
  { t:"tip", h:"Si on te demande d'où vient l'énergie d'un animal, remonte la chaîne : il mange une plante (ou un animal qui a mangé une plante), et la plante a pris son énergie au soleil." },
  { t:"see", ids:["E2"] },
  { t:"src", h:"Fiche 45" },
]},

/* ================= FICHE 50 ================= */
{ id:"E8", ch:"M3", titre:"Une hypothèse, un test", court:"Tester une hypothèse sur la rotation des roues dentées, puis la corriger",
  obj:"de formuler une hypothèse sur la rotation des roues dentées, la tester et la corriger si nécessaire (fiche 49).",
  pre:[{ q:"Si on met une chaîne plus longue, la petite roue tourne-t-elle plus vite ?", a:"Non : la petite roue fait toujours 2 tours. La longueur de la chaîne n'a pas d'importance.", s:"Bordas p. 58" }],
  blank:{ consigne:"Écris les deux tests de la page 58 : ce qu'on a changé, le résultat, ce qu'on en conclut.", points:["Chaîne plus longue : la petite roue fait toujours 2 tours → la longueur de la chaîne n'a pas d'importance","Roues de tailles différentes : 1 tour → 1,5 / 2 / 5 tours","Plus la différence de taille est grande, plus la petite roue fait de tours"], s:"Bordas p. 58" },
  blocks:[
  { t:"p", s:"Fiche 50, objectifs · Bordas p. 58, titre « Des essais pour tester des hypothèses »", h:"Un scientifique <b>formule une hypothèse</b> (ce qu'il pense), la <b>teste</b> par un essai, puis la <b>corrige si le résultat dit autre chose</b>." },
  { t:"h3", h:"Test 1 : la longueur de la chaîne" },
  { t:"p", s:"Bordas p. 58, résultat imprimé · ton hypothèse", h:"Deux chaînes, une courte et une longue. <b>Résultat</b> : quand la grande roue fait 1 tour, la petite roue fait <b>toujours 2 tours</b>. Donc <b>la longueur de la chaîne n'a pas d'importance</b>." },
  { t:"h3", h:"Test 2 : la taille des roues" },
  { t:"html", s:"Bordas p. 58, les trois montages", h:tbl(["Montage","Quand la grande roue fait 1 tour…"], [["roues presque pareilles","la petite fait 1,5 tour"],["différence moyenne","la petite fait 2 tours"],["très grande différence","la petite fait 5 tours"]]) },
  { t:"p", s:"Bordas p. 58 · ton hypothèse", h:"Ce que le test confirme : <b>plus la différence de taille entre les deux roues est grande, plus la petite roue fait de tours.</b>" },
  { t:"pause", q:"Dans quel montage la petite roue fait-elle le plus de tours ?", a:"Celui où la différence de taille est la plus grande : 1 tour → 5 tours.", s:"Bordas p. 58" },
  { t:"tip", h:"Pour une hypothèse : 1. ce que tu penses, 2. l'essai, 3. le résultat, 4. « mon hypothèse est juste » ou « je la corrige : … »." },
  { t:"see", ids:["E9","E10"] },
  { t:"src", h:"Bordas p. 58 · fiche 50 (objectifs)" },
]},

{ id:"E9", ch:"M3", titre:"Le vélo et le moulin", court:"Deux montages de roues dentées",
  obj:"d'utiliser les constats effectués pour réfléchir à de nouveaux montages (fiches 49 et 50).",
  pre:[{ q:"Quelles sont les roues dentées sur un vélo ?", a:"Le plateau et le pignon.", s:"Bordas p. 57" }],
  blank:{ consigne:"Écris la chaîne de transmission du vélo, puis explique pourquoi la roue arrière tourne plus vite que les pédales.", points:["Pédales → plateau → chaîne → pignon → roue arrière","Le plateau est plus grand que le pignon : le pignon fait plus de tours","Développement = distance parcourue pour un tour de pédales"], s:"Bordas p. 57 et 58" },
  blocks:[
  { t:"h3", h:"La bicyclette" },
  { t:"html", s:"Bordas p. 57, corrigée en classe", h:`<div class="bike"><span>pédales</span><i>→</i><span>plateau</span><i>→</i><span>chaîne</span><i>→</i><span>pignon</span><i>→</i><span>roue arrière</span></div>` },
  { t:"p", s:"Bordas p. 57 · p. 58, « Pour faire le point »", h:"Les deux <b>roues dentées</b> du vélo sont le <b>plateau</b> et le <b>pignon</b>. Elles tournent dans le même sens et sont reliées par la <b>chaîne</b>, qui transmet le mouvement." },
  { t:"p", s:"Bordas p. 57, corrigée en classe", h:"La roue arrière tourne <b>plus vite</b> que les pédales, parce que <b>le plateau est plus grand que le pignon</b> : le pignon fait plus de tours." },
  { t:"def", term:"Le développement", book:"Livre, Bordas p. 57", s:"Bordas p. 57, encadré", h:"La distance parcourue par la bicyclette pour un tour de pédales." },
  { t:"pause", q:"Qu'est-ce qui relie le plateau au pignon ?", a:"La chaîne.", s:"Bordas p. 57" },
  { t:"h3", h:"Le moulin à vent" },
  { t:"p", s:"Odysséo 64, p. 1, schéma du mécanisme · règle du bilan p. 2", h:"Dans le moulin, la grande roue (le <b>rouet</b>) entraîne une roue bien plus petite (la <b>lanterne</b>). Donc la <b>meule tourne plus vite que les ailes</b>." },
  { t:"p", s:"Odysséo 64, p. 2, bilan", h:"Dans un engrenage, les deux roues <b>n'ont pas le même nombre de dents</b>." },
  { t:"tip", h:"Devant un nouveau montage, cherche quelle roue entraîne l'autre, et laquelle est la plus grande. Le chapitre suivant te dit ce que ça change." },
  { t:"see", ids:["E10","E8"] },
  { t:"src", h:"Bordas p. 57 et 58 · Odysséo 64" },
]},

{ id:"E10", ch:"M3", titre:"Ralentir ou accélérer", court:"Petite roue, grande roue : l'effort et la vitesse",
  obj:"d'expliquer comment ralentir ou accélérer un mouvement de rotation (fiche 50).",
  pre:[{ q:"Pour diminuer l'effort, quelle roue doit entraîner l'autre ?", a:"La petite roue entraîne la grande.", s:"Odysséo 64, bilan" }],
  blank:{ consigne:"Sans regarder, recopie les trois règles du bilan de l'enquête Odysséo.", points:["Petite roue entraîne grande roue : on diminue l'effort, mais aussi la vitesse","Grande roue entraîne petite roue : on augmente la vitesse, mais aussi l'effort","Il n'est pas possible de réduire l'effort tout en augmentant la vitesse"], s:"Odysséo 64, bilan" },
  blocks:[
  { t:"def", term:"À quoi servent les roues dentées ?", book:"Livre, Odysséo 64", s:"Odysséo 64, p. 2, bilan", h:"Les roues dentées servent à rendre un mouvement plus facile ou plus rapide. C'est en utilisant des roues plus ou moins grandes qu'on réussit à transformer le mouvement." },
  { t:"html", s:"Odysséo 64, p. 2, bilan", h:`<div class="gear">
    <div class="gear-c"><span class="gear-w" aria-hidden="true"><span class="s">⚙</span>→⚙</span><b>La petite entraîne la grande</b><span>↓ on <b>diminue l'effort</b>, mais aussi la vitesse</span><span>→ pour <b>ralentir</b>, plus facile</span></div>
    <div class="gear-c"><span class="gear-w" aria-hidden="true">⚙→<span class="s">⚙</span></span><b>La grande entraîne la petite</b><span>↑ on <b>augmente la vitesse</b>, mais aussi l'effort</span><span>→ pour <b>accélérer</b></span></div>
    <p class="gear-x">✗ Il n'est pas possible de réduire l'effort tout en augmentant la vitesse.</p></div>` },
  { t:"pause", q:"Pour augmenter la vitesse, quelle roue doit entraîner l'autre ?", a:"La grande roue entraîne la petite (mais l'effort augmente).", s:"Odysséo 64, bilan" },
  { t:"h3", h:"Sur le vélo" },
  { t:"p", s:"Bordas p. 58, « Pour faire le point »", h:"Le <b>pignon</b>, plus petit que le plateau, <b>tourne plus vite</b>. Plus le pignon est petit et plus le plateau est grand, <b>plus le développement est grand</b> (le vélo va plus loin à chaque tour de pédales)." },
  { t:"tip", h:"Attention au piège : pour moins d'effort, c'est la PETITE roue qui entraîne la grande. Pour plus de vitesse, c'est la GRANDE qui entraîne la petite. Et jamais les deux à la fois." },
  { t:"see", ids:["E9","E8"] },
  { t:"src", h:"Odysséo 64, p. 2 · Bordas p. 58" },
]},
];

const LEXIQUE = [
  { t:"Énergie chimique", h:"Contenue dans la matière (herbe, bois…) ; elle se libère lors d'une réaction chimique.", ref:"E2", lab:"Livre, fiche 38", book:true, s:"Fiche 38" },
  { t:"Énergie de rayonnement", h:"Tous les objets émettent des rayonnements ; les hommes ne les perçoivent pas tous.", ref:"E2", lab:"Livre, fiche 38", book:true, s:"Fiche 38" },
  { t:"Énergie électrique", h:"Contenue dans un courant électrique.", ref:"E2", lab:"Livre, fiche 38", book:true, s:"Fiche 38" },
  { t:"Énergie mécanique", h:"Contenue dans un objet en mouvement.", ref:"E2", lab:"Livre, fiche 38", book:true, s:"Fiche 38" },
  { t:"Énergie thermique", h:"Se trouve dans toutes les matières ; plus la température est élevée, plus la matière contient de chaleur.", ref:"E2", lab:"Livre, fiche 38", book:true, s:"Fiche 38" },
  { t:"Alternateur", h:"Transforme un mouvement (énergie mécanique) en électricité.", ref:"E3", lab:"Livre, fiche 43", book:true, s:"Fiche 43 · fiche 40" },
  { t:"Turbine", h:"Tourne (énergie mécanique) et entraîne l'alternateur.", ref:"E3", lab:"Livre, fiche 43", book:true, s:"Fiche 43" },
  { t:"Photosynthèse", h:"Transformation de l'énergie de rayonnement du soleil en énergie chimique (glucose) par les végétaux.", ref:"E7", lab:"Livre, fiche 45", book:true, s:"Fiche 45" },
  { t:"Énergies renouvelables", h:"Le soleil, le vent, l'eau qui coule sans cesse, les arbres et les plantes qui se renouvellent, la géothermie.", ref:"E6", lab:"Ton dossier", s:"Fiche 47" },
  { t:"Énergies non renouvelables", h:"Elles se trouvent en quantité limitée sur la Terre, par exemple les énergies fossiles (pétrole, charbon, gaz naturel).", ref:"E6", lab:"Ton dossier", s:"Fiche 47" },
  { t:"Géothermie", h:"La chaleur de la terre (du sous-sol).", ref:"E5", lab:"Ton dossier", s:"Fiches 47 et 48" },
  { t:"Roues dentées (engrenage)", h:"Elles servent à rendre un mouvement plus facile ou plus rapide.", ref:"E10", lab:"Livre, Odysséo 64", book:true, s:"Odysséo 64, bilan" },
  { t:"Plateau, pignon", h:"Les deux roues dentées du vélo, reliées par la chaîne ; le pignon est le plus petit.", ref:"E9", lab:"Livre, Bordas p. 57", book:true, s:"Bordas p. 57 et 58" },
  { t:"Développement", h:"La distance parcourue par la bicyclette pour un tour de pédales.", ref:"E9", lab:"Livre, Bordas p. 57", book:true, s:"Bordas p. 57" },
];

/* ============================================================
   PAQUETS — un par objectif (code = chapitre). Item : front, back[] (1re = affichée), opts / wrong, mcqOnly, ans, src
   Les cartes reprises de la v1 gardent leur recto mot pour mot.
   ============================================================ */
const TYPES = ["chimique","rayonnement","électrique","mécanique (mouvement)","thermique (chaleur)"];
const A = { chim:["chimique","énergie chimique","l'énergie chimique"], ray:["rayonnement","énergie de rayonnement","l'énergie de rayonnement","le rayonnement"],
  elec:["électrique","énergie électrique","l'énergie électrique"], meca:["mécanique (mouvement)","mécanique","mouvement","énergie mécanique","énergie de mouvement","l'énergie mécanique"],
  therm:["thermique (chaleur)","thermique","chaleur","énergie thermique","l'énergie thermique"] };
const RN = ["renouvelable","non renouvelable"];
const DECKS = [
  /* ---------- fiche 42 ---------- */
  { key:"question42", code:"E1", title:"La question de l'enquête (fiche 42)", src:"fiches 37, 40 et 42", items:[
    { front:"Quelle question l'enquête des fiches 40 à 42 a-t-elle travaillée ?", back:["Comment l'énergie se transforme-t-elle ?"], wrong:["D'où provient l'énergie utilisée par le corps humain ?","Est-ce une source d'énergie renouvelable ?","À quoi servent les roues dentées ?"], mcqOnly:true, ans:"« Comment l'énergie se transforme-t-elle ? » (avant, ta classe s'était demandé : « Quelles énergies utilise-t-on ? »).", src:"fiche 40, titre · fiche 37" },
    { front:"Qu'as-tu réalisé pour répondre à cette question ?", back:["J'ai tourné une manivelle reliée à un alternateur : l'ampoule s'est allumée"], wrong:["J'ai fait brûler du bois pour cuire une grillade","J'ai fait pousser une plante au soleil","J'ai mesuré la chaleur de mon corps"], mcqOnly:true, ans:"Une manivelle reliée à un alternateur : l'énergie mécanique est devenue électrique et l'ampoule s'est allumée.", src:"fiche 40" },
    { front:"Selon ta fiche 42, l'énergie se perd-elle ?", back:["Non : l'énergie ne se perd pas, elle se transforme"], wrong:["Oui : elle disparaît quand on l'utilise","Oui : elle se perd dans les machines"], mcqOnly:true, ans:"L'énergie ne se perd pas, elle se transforme.", src:"fiche 42, encadré" },
  ]},
  { key:"types", code:"E2", title:"Les 5 types d'énergie", src:"fiche 38", items:[
    { front:"Quelle énergie est contenue dans la matière (herbe, bois…) et se libère lors d'une réaction chimique ?", back:A.chim, opts:TYPES, keepOrder:true, ans:"L'énergie chimique.", src:"fiche 38" },
    { front:"Tous les objets en émettent, même si les hommes ne les perçoivent pas tous : quelle énergie est-ce ?", back:A.ray, opts:TYPES, keepOrder:true, ans:"Le rayonnement.", src:"fiche 38" },
    { front:"Quelle énergie est contenue dans un courant électrique ?", back:A.elec, opts:TYPES, keepOrder:true, ans:"L'énergie électrique.", src:"fiche 38" },
    { front:"Quelle énergie est contenue dans un objet en mouvement ?", back:A.meca, opts:TYPES, keepOrder:true, ans:"L'énergie mécanique, ou énergie de mouvement.", src:"fiche 38" },
    { front:"Quelle énergie se trouve dans toutes les matières, et d'autant plus que la température est élevée ?", back:A.therm, opts:TYPES, keepOrder:true, ans:"L'énergie thermique (la chaleur).", src:"fiche 38" },
    { front:"Le bois et la nourriture : quelle énergie contiennent-ils ?", back:A.chim, opts:TYPES, keepOrder:true, ans:"De l'énergie chimique : elle est libérée par la combustion (bois) ou la digestion (nourriture).", src:"fiche 38" },
    { front:"La lumière du soleil ou d'une lampe : quelle énergie est-ce ?", back:A.ray, opts:TYPES, keepOrder:true, ans:"De l'énergie de rayonnement.", src:"fiche 38" },
    { front:"Les piles, les prises et la foudre : quelle énergie contiennent-elles ?", back:A.elec, opts:TYPES, keepOrder:true, ans:"De l'énergie électrique.", src:"fiche 38" },
    { front:"Une voiture qui roule ou un caillou qui tombe : quelle énergie ont-ils ?", back:A.meca, opts:TYPES, keepOrder:true, ans:"De l'énergie mécanique : ils sont en mouvement.", src:"fiche 38" },
    { front:"La chaleur de ton corps (37 °C) : quelle énergie est-ce ?", back:A.therm, opts:TYPES, keepOrder:true, ans:"De l'énergie thermique.", src:"fiche 38" },
  ]},
  { key:"transfo", code:"E3", title:"Trouver la transformation", src:"fiches 39 à 44", items:[
    { front:"Quelles sont les 3 cases pour décrire une transformation d'énergie ?", back:["énergie avant → moyen de transformation → énergie obtenue"], wrong:["moyen de transformation → énergie avant → énergie obtenue","énergie obtenue → énergie avant → moyen de transformation"], mcqOnly:true, ans:"L'énergie avant la transformation, le moyen de transformation, l'énergie obtenue.", src:"fiches 40, 41, 42 (tableaux)" },
    { front:"Quand tu tournes la manivelle pour allumer l'ampoule, quelle est l'énergie avant la transformation ?", back:A.meca, opts:TYPES, keepOrder:true, ans:"L'énergie mécanique (ton mouvement).", src:"fiche 40" },
    { front:"Avec la manivelle, quel est le moyen de transformation ?", back:["l'alternateur","alternateur","un alternateur"], wrong:["l'ampoule","la pile","le panneau photovoltaïque"], ans:"L'alternateur : il transforme un mouvement en électricité.", src:"fiche 40 · fiche 43" },
    { front:"Avec la manivelle, quelle énergie obtiens-tu après la transformation ?", back:A.elec, opts:TYPES, keepOrder:true, ans:"L'énergie électrique : l'ampoule s'allume.", src:"fiche 40" },
    { front:"Le panneau photovoltaïque transforme quelle énergie en énergie électrique ?", back:A.ray, opts:TYPES, keepOrder:true, ans:"L'énergie de rayonnement (du soleil).", src:"fiche 41, tableau du bas" },
    { front:"La télécommande allume la télé : quelle est l'énergie AVANT la transformation ?", back:A.elec, opts:TYPES, keepOrder:true, ans:"L'énergie électrique (les piles). Elle devient de l'énergie de rayonnement (des rayons infrarouges) : électrique → télécommande → rayonnement.", src:"fiche 39" },
    { front:"La voiture transforme l'énergie chimique en quelles énergies ?", back:["chaleur et mouvement"], wrong:["électricité et lumière","seulement en chaleur","rayonnement et électricité"], mcqOnly:true, ans:"En chaleur et en mouvement.", src:"fiche 44 (imprimé) · fiche 39" },
    { front:"Dans un barrage, l'eau sous pression fait tourner la turbine : qu'est-ce que la turbine entraîne pour produire l'électricité ?", back:["l'alternateur","alternateur","un alternateur"], wrong:["la chaudière","le lac de retenue","la ligne à haute tension"], ans:"L'alternateur : la turbine (énergie mécanique) entraîne l'alternateur, qui produit l'électricité.", src:"fiche 43" },
  ]},
  /* ---------- fiche 47 ---------- */
  { key:"question47", code:"E4", title:"La question de l'enquête (fiche 47)", src:"fiches 45 et 46", items:[
    { front:"Quelle question la fiche 46 travaille-t-elle ?", back:["D'où proviennent les énergies utilisées dans les activités humaines ?"], wrong:["Comment l'énergie se transforme-t-elle ?","À quoi servent les roues dentées ?","Quelles énergies utilise-t-on ?"], mcqOnly:true, ans:"« D'où proviennent les énergies utilisées dans les activités humaines ? »", src:"fiche 46, titre" },
    { front:"Quelle question la fiche 45 travaille-t-elle ?", back:["D'où provient l'énergie utilisée par le corps humain ?"], wrong:["Comment l'énergie se transforme-t-elle ?","À quoi servent les roues dentées ?","Est-ce une source d'énergie renouvelable ?"], mcqOnly:true, ans:"« D'où provient l'énergie utilisée par le corps humain ? »", src:"fiche 45, titre" },
    { front:"Selon ta fiche 46, pourquoi les hommes transforment-ils les énergies ?", back:["pour pouvoir les utiliser"], wrong:["pour les faire disparaître","pour les ranger","pour les compter"], mcqOnly:true, ans:"Les hommes transforment les énergies pour pouvoir les utiliser.", src:"fiche 46, encadré" },
  ]},
  { key:"renseigner", code:"E5", title:"Se renseigner sur une source", src:"fiche 48", items:[
    { front:"Pour te renseigner sur une source d'énergie, à quelles questions réponds-tu ?", back:["D'où vient-elle ? Comment est-elle transformée ? Quels avantages et inconvénients ?"], wrong:["Quelle est sa couleur ? Combien pèse-t-elle ?","Qui l'a inventée ? En quelle année ?","Combien coûte-t-elle ? Où l'acheter ?"], mcqOnly:true, ans:"Quelle est cette source et de quoi provient-elle ? Comment est-elle transformée pour être utilisée ? Quels sont ses avantages et ses inconvénients ?", src:"fiche 48, questions imprimées" },
    { front:"L'énergie géothermique : de quoi provient-elle ?", back:["de la chaleur du sous-sol","chaleur du sous-sol","la chaleur du sous-sol","chaleur de la terre","la chaleur de la terre","de la chaleur de la terre"], wrong:["du vent","de la lumière du soleil","du pétrole"], ans:"De la chaleur du sous-sol, la chaleur de la terre.", src:"fiche 48 · fiche 47" },
    { front:"Comment l'homme utilise-t-il la géothermie ?", back:["Il utilise l'eau chaude du sous-sol pour chauffer des maisons ou produire de l'électricité"], wrong:["Il brûle des roches pour faire un feu","Il capte la lumière du soleil avec des panneaux","Il construit un barrage sur une rivière"], mcqOnly:true, ans:"Il utilise l'eau chaude du sous-sol (forages, pompes à chaleur) pour chauffer des maisons, alimenter des sources thermales ou même produire de l'électricité.", src:"fiche 48 · fiche 46" },
    { front:"Quel inconvénient de la géothermie as-tu trouvé ?", back:["Elle se transporte difficilement : il faut l'utiliser sur place"], wrong:["Elle va bientôt s'épuiser","Elle ne marche que la nuit","Elle ne peut pas chauffer une maison"], mcqOnly:true, ans:"Elle se transporte difficilement et doit être utilisée sur place : il faut creuser juste à côté de la maison à chauffer, et ce n'est pas toujours possible.", src:"fiche 48" },
  ]},
  { key:"sources", code:"E6", title:"Renouvelable ou pas ?", src:"fiche 47", items:[
    { front:"Que sont les énergies renouvelables ?", back:["le soleil, le vent, l'eau qui coule sans cesse, les plantes qui se renouvellent, la géothermie"], wrong:["les énergies en quantité limitée sur la Terre","le pétrole, le charbon et le gaz naturel"], mcqOnly:true, ans:"Les sources d'énergie : le soleil, le vent, l'eau qui coule sans cesse, les arbres et les plantes qui se renouvellent, la géothermie (chaleur de la terre).", src:"fiche 47" },
    { front:"Que sont les énergies non renouvelables ?", back:["les énergies qui se trouvent en quantité limitée sur la Terre"], wrong:["les énergies qui ne s'arrêtent jamais","le soleil et le vent"], mcqOnly:true, ans:"Les énergies qui se trouvent en quantité limitée sur la Terre, par exemple les énergies fossiles.", src:"fiche 47" },
    { front:"Quelles sont les énergies fossiles ?", back:["le pétrole, le charbon, le gaz naturel"], wrong:["le soleil, le vent, l'eau","le bois, le compost","la chaleur de la terre"], mcqOnly:true, ans:"Le pétrole, le charbon, le gaz naturel, qui se trouvent dans le sous-sol.", src:"fiche 47" },
    { front:"Les énergies fossiles sont-elles renouvelables ou non renouvelables ?", back:["non renouvelable"], opts:RN, keepOrder:true, ans:"Non renouvelables : elles existent en quantité limitée.", src:"fiche 47" },
    { front:"Pourquoi le charbon n'est-il pas renouvelable ?", back:["Parce qu'il se trouve en quantité limitée sur la Terre"], wrong:["Parce qu'il coule sans cesse","Parce qu'il vient du soleil","Parce qu'il se renouvelle chaque année"], mcqOnly:true, ans:"Parce qu'il se trouve en quantité limitée sur la Terre, dans le sous-sol.", src:"fiche 47" },
    { front:"L'énergie solaire est-elle renouvelable ou non renouvelable ?", back:["renouvelable"], opts:RN, keepOrder:true, ans:"Renouvelable : le soleil fait partie des sources renouvelables.", src:"fiche 47" },
    { front:"Pourquoi l'énergie hydraulique (les barrages) est-elle renouvelable ?", back:["Parce que l'eau coule sans cesse"], wrong:["Parce qu'elle se trouve dans le sous-sol","Parce qu'elle existe en quantité limitée","Parce qu'elle vient du pétrole"], mcqOnly:true, ans:"Parce que l'eau coule sans cesse : elle fait partie des sources renouvelables.", src:"fiche 47 · fiche 46" },
  ]},
  { key:"corps", code:"E7", title:"L'énergie de ton corps", src:"fiche 45", items:[
    { front:"Comment s'appelle la transformation d'énergie que font les végétaux grâce au soleil ?", back:["la photosynthèse","photosynthèse"], wrong:["la digestion","la combustion","l'oxydation"], ans:"La photosynthèse.", src:"fiche 45" },
    { front:"La photosynthèse transforme le rayonnement du soleil en quelle énergie ?", back:A.chim, opts:TYPES, keepOrder:true, ans:"En énergie chimique : le glucose (sucre) de la plante.", src:"fiche 45" },
    { front:"Pourquoi la photosynthèse est-elle si importante ?", back:["Elle est à la base de toute vie sur Terre"], wrong:["Elle produit l'électricité des maisons","Elle fait tomber la pluie","Elle réchauffe la Terre"], mcqOnly:true, ans:"Cette transformation de rayonnement en énergie chimique est à la base de toute vie sur Terre : elle procure de l'énergie à tous les animaux herbivores et carnivores.", src:"fiche 45" },
    { front:"En quelles énergies ton corps transforme-t-il l'énergie chimique de la nourriture ?", back:["mouvement du corps et chaleur"], wrong:["électricité et lumière","rayonnement et électricité","seulement en chaleur"], mcqOnly:true, ans:"Après la digestion (oxydation dans les cellules) : en mouvement du corps et en chaleur (37 °C).", src:"fiche 45" },
    { front:"D'où vient, au départ, l'énergie de ton corps ?", back:["du soleil, grâce aux plantes"], wrong:["de l'électricité","du pétrole","de la pluie"], mcqOnly:true, ans:"Du soleil : les plantes transforment son rayonnement en énergie chimique, que tu manges (directement, ou en mangeant un animal qui a mangé des plantes).", src:"fiche 45" },
  ]},
  /* ---------- fiche 50 ---------- */
  { key:"hypothese", code:"E8", title:"Une hypothèse, un test", src:"Bordas p. 58", items:[
    { front:"Que fait un scientifique après avoir formulé une hypothèse ?", back:["Il la teste, puis la corrige si nécessaire"], wrong:["Il l'écrit au propre et n'y touche plus","Il demande la réponse à un camarade","Il la garde, même si le test dit le contraire"], mcqOnly:true, ans:"Il la teste par un essai, puis il la corrige si le résultat dit autre chose.", src:"fiche 50, objectifs · Bordas p. 58" },
    { front:"Avec une chaîne courte puis une chaîne longue, la petite roue fait toujours 2 tours quand la grande en fait 1. Que montre ce test ?", back:["La longueur de la chaîne n'a pas d'importance"], wrong:["Une chaîne longue fait tourner la petite roue plus vite","Une chaîne courte fait tourner la petite roue plus vite","On ne peut rien conclure"], mcqOnly:true, ans:"La longueur de la chaîne n'a pas d'importance : le résultat est toujours 2 tours.", src:"Bordas p. 58, résultat imprimé" },
    { front:"Trois montages : quand la grande roue fait 1 tour, la petite fait 1,5, 2 ou 5 tours. Dans lequel la différence de taille est-elle la plus grande ?", back:["1 tour → 5 tours"], opts:["1 tour → 1,5 tour","1 tour → 2 tours","1 tour → 5 tours"], keepOrder:true, mcqOnly:true, ans:"1 tour → 5 tours : plus la différence de taille est grande, plus la petite roue fait de tours.", src:"Bordas p. 58" },
    { front:"Quelle hypothèse ces trois montages confirment-ils ?", back:["Plus la différence de taille entre les deux roues est grande, plus la petite roue fait de tours"], wrong:["Plus la chaîne est longue, plus la petite roue fait de tours","La taille des roues ne change rien","Plus les roues sont petites, moins elles tournent"], mcqOnly:true, ans:"Plus la différence de taille entre les deux roues est grande, plus la petite roue fait de tours (et plus la distance parcourue est longue).", src:"Bordas p. 58 · ton hypothèse" },
  ]},
  { key:"montages", code:"E9", title:"Le vélo et le moulin", src:"Bordas p. 57 · Odysséo 64", items:[
    { front:"Quelles sont les roues dentées sur la bicyclette ?", back:["le plateau et le pignon","plateau et pignon","le pignon et le plateau","pignon et plateau","plateau pignon","pignons et plateau","les pignons et le plateau"], wrong:["la roue avant et la roue arrière","les pédales et le cadre","la chaîne et le cadre"], ans:"Le plateau et le pignon.", src:"Bordas p. 57, corrigée" },
    { front:"Sur le vélo, avec quoi se fait la transmission du mouvement entre le plateau et le pignon ?", back:["la chaîne","chaîne","avec la chaîne","une chaîne"], wrong:["le cadre","les pédales","la roue avant"], ans:"Avec la chaîne : les deux roues dentées tournent dans le même sens.", src:"Bordas p. 57 et 58" },
    { front:"Dans quel ordre le mouvement passe-t-il dans le vélo ?", back:["pédales → plateau → chaîne → pignon → roue arrière"], wrong:["pédales → pignon → chaîne → plateau → roue arrière","pédales → chaîne → roue avant → plateau","roue arrière → pignon → chaîne → plateau → pédales"], mcqOnly:true, ans:"Pédales → plateau → chaîne → pignon → roue arrière.", src:"Bordas p. 57, schéma corrigé" },
    { front:"La roue arrière tourne-t-elle plus vite que les pédales ? Pourquoi ?", back:["Oui, car le plateau est plus grand que le pignon"], wrong:["Non, car la roue arrière est plus grande que le pignon","Non, elles tournent toujours à la même vitesse","Oui, car la chaîne est très longue"], mcqOnly:true, ans:"Oui : le plateau est plus grand que le pignon, donc le pignon (et la roue arrière) fait plus de tours.", src:"Bordas p. 57, corrigée" },
    { front:"Qu'est-ce que le développement d'une bicyclette ?", back:["La distance parcourue par la bicyclette pour un tour de pédales"], wrong:["Le nombre de vitesses du vélo","La taille de la roue avant","Le temps pour faire un tour de pédales"], mcqOnly:true, ans:"La distance parcourue par la bicyclette pour un tour de pédales.", src:"Bordas p. 57, encadré" },
    { front:"Dans le moulin, la grande roue (le rouet) entraîne une roue bien plus petite (la lanterne). La meule tourne-t-elle plus vite ou moins vite que les ailes ?", back:["plus vite"], opts:["plus vite","moins vite","à la même vitesse"], keepOrder:true, ans:"Plus vite : quand une grande roue entraîne une petite roue, la vitesse augmente.", src:"Odysséo 64, p. 1 · bilan p. 2" },
    { front:"Dans un engrenage, les deux roues ont-elles le même nombre de dents ?", back:["non"], opts:["oui","non"], keepOrder:true, ans:"Non : dans un engrenage, les deux roues n'ont pas le même nombre de dents.", src:"Odysséo 64, bilan" },
  ]},
  { key:"vitesse", code:"E10", title:"Ralentir ou accélérer", src:"Odysséo 64, bilan · Bordas p. 58", items:[
    { front:"À quoi servent les roues dentées ?", back:["À rendre un mouvement plus facile ou plus rapide"], wrong:["À produire de l'électricité","À chauffer une machine","À arrêter un mouvement"], mcqOnly:true, ans:"Les roues dentées servent à rendre un mouvement plus facile ou plus rapide.", src:"Odysséo 64, bilan" },
    { front:"Une petite roue entraîne une grande roue : que se passe-t-il ?", back:["On diminue l'effort, mais aussi la vitesse"], wrong:["On augmente la vitesse, mais aussi l'effort","On diminue l'effort et on augmente la vitesse","Rien ne change"], mcqOnly:true, ans:"On diminue l'effort, mais aussi la vitesse.", src:"Odysséo 64, bilan" },
    { front:"Une grande roue entraîne une petite roue : que se passe-t-il ?", back:["On augmente la vitesse, mais aussi l'effort"], wrong:["On diminue l'effort, mais aussi la vitesse","On diminue l'effort et on augmente la vitesse","Rien ne change"], mcqOnly:true, ans:"On augmente la vitesse, mais aussi l'effort.", src:"Odysséo 64, bilan" },
    { front:"Dans quel ordre mettre les roues pour diminuer l'effort ?", back:["La petite roue en premier (elle entraîne la grande)"], opts:["La petite roue en premier (elle entraîne la grande)","La grande roue en premier (elle entraîne la petite)"], keepOrder:true, mcqOnly:true, ans:"La petite roue en premier : quand une petite roue entraîne une grande, on diminue l'effort (mais aussi la vitesse).", src:"Odysséo 64, bilan" },
    { front:"Dans quel ordre mettre les roues pour augmenter la vitesse ?", back:["La grande roue en premier (elle entraîne la petite)"], opts:["La petite roue en premier (elle entraîne la grande)","La grande roue en premier (elle entraîne la petite)"], keepOrder:true, mcqOnly:true, ans:"La grande roue en premier : quand une grande roue entraîne une petite, on augmente la vitesse (mais aussi l'effort).", src:"Odysséo 64, bilan" },
    { front:"Peut-on diminuer l'effort tout en augmentant la vitesse ?", back:["Non, ce n'est pas possible"], opts:["Oui, avec le bon ordre des roues","Non, ce n'est pas possible"], keepOrder:true, mcqOnly:true, ans:"Non : il n'est pas possible de réduire l'effort tout en augmentant la vitesse.", src:"Odysséo 64, bilan" },
    { front:"Sur le vélo, quelle roue dentée tourne le plus vite ?", back:["le pignon","pignon"], wrong:["le plateau","la pédale"], ans:"Le pignon, plus petit que le plateau, tourne plus vite.", src:"Bordas p. 58, « Pour faire le point »" },
    { front:"Sur le vélo, avec quelles roues dentées le développement est-il le plus grand ?", back:["Un grand plateau et un petit pignon"], wrong:["Un petit plateau et un grand pignon","Un petit plateau et un petit pignon","Un grand plateau et un grand pignon"], mcqOnly:true, ans:"Plus le pignon est petit et plus le plateau est grand, plus le développement est grand.", src:"Bordas p. 58, « Pour faire le point »" },
  ]},
];

/* Textes du sommaire propres à cet outil (la couche Dossier parle d'une feuille d'objectifs d'histoire et de capsules) :
   seuls des mots affichés sont remplacés, rien ne change dans le fonctionnement. */
const COUCHE_CONTENU = {
  vueFiche(){
    let h = S.page ? viewPage(S.page) : viewToc();
    h = h.replace(/<p class="intro">Ton cours complet[\s\S]*?<\/p>/, `<p class="intro">Ton cours de sciences, rangé comme les trois listes « je dois être capable… » des fiches 42, 47 et 50 : un chapitre par objectif. Lis un chapitre, puis teste-toi avec ses questions.</p>`)
      .replace(/<p><span class="tag book">Livre p\. 48<\/span>[\s\S]*?<\/p>/, `<p><span class="tag book">Livre, fiche 38</span> texte imprimé de tes fiches : à savoir.</p>`)
      .replace(/<p><span class="tag dico">Dictionnaire<\/span>[\s\S]*?<\/p>/, "")
      .replace("Le fil rouge et la frise de l'épreuve", "Les 10 objectifs et les questions de tes enquêtes")
      .replace("🤔 Avant la capsule : essaie de répondre", "🤔 Avant de lire : essaie de répondre")
      .replace("Voir les réponses (après la capsule)", "Voir la réponse (après la lecture)")
      .replace("Chercher la réponse t'aide à la retenir quand elle arrive.", "Chercher la réponse t'aide à la retenir quand tu la lis.");
    return h;
  },
};

const OUTIL = {
  eleve:"Liano", classe:"7e HarmoS", branche:BRANCHE,
  titre:"Forces et énergie", sousTitre:"Sciences · objectifs des fiches 42, 47 et 50",
  jersey:"ÉNERGIE",
  ongletFiche:["📖","Dossier"],
  badgeHtml:`<div class="head-code" aria-hidden="true"><span class="hc-bolt">⚡</span><b>7H</b></div>`,
  polices:"https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap",
  introFiche:"",
  labelTout:"Tout le Dossier",
  motPaquet:"Objectif", motPaquets:"objectifs", cePaquet:"Cet objectif",
  compte:"questions",
  sousNiveaux:{ easy:"Je choisis parmi plusieurs réponses", hard:"J'écris tout ce qui peut s'écrire" },
  conseilSetup:"Les questions « pourquoi » restent toujours à choix, même au niveau épreuve. En épreuve blanche, tu ne vois aucune réponse avant la fin.",
  papier:{ titre:"Sciences — Forces et énergie", court:"Sciences", fichier:FILE_SLUG, code:"#PDF-SCIENCES-ENERGIE" },
  copie:{ titre:"RÉSULTAT — " + SUBJECT_LONG },
  analyse:{
    role:"un maître de sciences de la nature suisse",
    sujet:"les sciences de la nature, « Forces et énergie » (les 5 types d'énergie, les transformations d'énergie, les sources renouvelables ou non, la photosynthèse et l'énergie du corps, les roues dentées : effort et vitesse, le vélo)",
    etiquettes:"l'étiquette est la clé de l'objectif (question42 et question47 : la question de l'enquête, types : les 5 types d'énergie, transfo : transformations, renseigner : se renseigner sur une source (géothermie), sources : renouvelables ou non, corps : photosynthèse et énergie du corps, hypothese : hypothèse et test des roues dentées, montages : le vélo et le moulin, vitesse : ralentir ou accélérer)",
    pistes:"des types d'énergie confondus, l'énergie avant et l'énergie obtenue inversées, la petite roue et la grande roue inversées (effort et vitesse), une définition pas sue",
  },
};

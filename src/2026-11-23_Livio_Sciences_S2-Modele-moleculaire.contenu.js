/* ============================================================
   CONTENU — Sciences de la nature, TE S2 « Modèle moléculaire »
   Outil de révision de Livio — 10e HarmoS. Épreuve : lundi 23 novembre 2026.
   Ce fichier est la seule partie propre à cet outil. Il est assemblé avec
   claude/couche-dossier.js et claude/noyau-quiz.js par claude/assembler.py (--couche dossier).
   CSS du Dossier recopiée depuis le contenu de LCA (lui-même repris de l'histoire, fiche construction, « Couche Dossier »), palette et polices propres à ce thème.
   ============================================================ */

/* Thème « labo » : paillasse, bleu de méthylène, flamme du bec Bunsen, cahier quadrillé. */
const CSS_THEME = `
/* Labo de sciences : paillasse gris-bleu, bleu de méthylène, orange de la flamme du bec Bunsen, cahier quadrillé ; titres en Bricolage Grotesque, cours en Literata, outil en IBM Plex Sans. */
:root{
  --dock:#E4EAEE; --sheet:#FFFFFF; --ink:#18232B; --soft:#53616B; --st:#8995A0; --rule:#C6D1D9;
  --box:#1D5FA6; --box-wash:#E0EBF7; --crane:#E8762C; --crane-ink:#2B1100; --board:#1C2831; --on-box:#FFFFFF;
  --good:#22704A; --good-wash:#DCF1E5; --bad:#A3241B; --bad-wash:#F8E1DE;
  --gen:#5B6670; --gen-wash:#EDF0F2; --book-wash:#FFF0D6; --book-ink:#6B3A00; --dico:#6A3D8F; --dico-wash:#EFE6F7;
  --land:#DCE6EC; --r1:#1D5FA6; --r2:#E8762C; --r3:#22704A; --r4:#8A5A00; --r5:#6A3D8F; --r6:#1C2831;
  --display:'Bricolage Grotesque',system-ui,sans-serif;
  --ui:'IBM Plex Sans',system-ui,-apple-system,'Segoe UI',sans-serif;
  --read:'Literata',Georgia,'Times New Roman',serif;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --dock:#11171B; --sheet:#1A2329; --ink:#E6EDF2; --soft:#9EADB8; --st:#5F6D77; --rule:#2F3B44;
  --box:#7DB3EE; --box-wash:#1A2C40; --crane:#F4A15F; --crane-ink:#2B1100; --board:#0B1013; --on-box:#08182A;
  --good:#6FD39B; --good-wash:#14301F; --bad:#FF8F86; --bad-wash:#3A1B18;
  --gen:#A3AFB8; --gen-wash:#222B31; --book-wash:#3A2A12; --book-ink:#F6C98A; --dico:#C9A3EC; --dico-wash:#2B2136;
  --land:#223039; --r1:#7DB3EE; --r2:#F4A15F; --r3:#6FD39B; --r4:#E2C66A; --r5:#C9A3EC; --r6:#E6EDF2; color-scheme:dark}}
:root[data-theme="dark"]{
  --dock:#11171B; --sheet:#1A2329; --ink:#E6EDF2; --soft:#9EADB8; --st:#5F6D77; --rule:#2F3B44;
  --box:#7DB3EE; --box-wash:#1A2C40; --crane:#F4A15F; --crane-ink:#2B1100; --board:#0B1013; --on-box:#08182A;
  --good:#6FD39B; --good-wash:#14301F; --bad:#FF8F86; --bad-wash:#3A1B18;
  --gen:#A3AFB8; --gen-wash:#222B31; --book-wash:#3A2A12; --book-ink:#F6C98A; --dico:#C9A3EC; --dico-wash:#2B2136;
  --land:#223039; --r1:#7DB3EE; --r2:#F4A15F; --r3:#6FD39B; --r4:#E2C66A; --r5:#C9A3EC; --r6:#E6EDF2; color-scheme:dark}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
body{background:var(--dock);color:var(--ink);font-family:var(--ui);font-size:16px;line-height:1.5}
.wrap{max-width:640px;margin:0 auto;padding-block:18px 110px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
button{font:inherit;color:inherit}
button:focus-visible,input:focus-visible,textarea:focus-visible{outline:3px solid var(--crane);outline-offset:2px}

/* en-tête : un conteneur vu de côté (ondulations de la tôle) */
.head{position:relative;overflow:hidden;display:flex;gap:14px;align-items:center;margin-bottom:18px;padding:16px 14px 16px 16px;border-radius:4px;color:#fff;background:linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px) 0 0/12px 12px,linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px) 0 0/12px 12px,linear-gradient(135deg,#1C2831,#13425F)}
.head-code{flex:none;width:64px;height:64px;border-radius:50%;background:radial-gradient(circle at 35% 32%,#FFC08A 0 14%,#E8762C 15% 100%);color:#2B1100;font-family:var(--display);font-size:11px;font-weight:700;letter-spacing:1px;line-height:1.05;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 0 0 4px rgba(255,255,255,.12),14px 10px 0 -6px #7DB3EE,-10px 14px 0 -8px #7DB3EE}
.head-code b{display:block;font-size:22px;font-weight:800}
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
   Sciences de la nature 10 — Séquence 2 « Modèle moléculaire » (TE S2)
   Outil de révision de Livio — 10e HarmoS. Épreuve : lundi 23 novembre 2026 (agenda : « SCN : TE S2 Modèle Moléculaire »).
   Onglet « Dossier » : un chapitre par objectif de la feuille « Objectifs du travail écrit sur la séquence 2 » (11 objectifs,
   le 10 en quatre parties a, b, c, d), rangés en quatre parties.
   ============================================================ */

const QUIZ_ID = "livio-quiz-sciences-modele-moleculaire";
const DUE = { iso:"2026-11-23", long:"lundi 23 novembre", short:"23.11" };
const THEME = "Modèle moléculaire";
const BRANCHE = "Sciences";
const HEAD = { code:"SCN", num:"S2", titre:"Modèle moléculaire", sous:"TE S2 · épreuve : " };
const SUBJECT_LONG = "Sciences de la nature, TE S2 : le modèle moléculaire";
const FILE_SLUG = "sciences-modele-moleculaire-livio";
const VERSION = { n:1, date:"21.11.2026" };   /* v1 : 21.11.2026, première version : Dossier rangé comme la feuille d'objectifs (14 chapitres : objectifs 1 à 9, 10a à 10d, 11), fil rouge, 14 paquets de cartes, trois schémas dessinés (les 3 états, la dilatation, le gaz comprimé) */

/* ---------- SOURCES ----------
   Photos envoyées par le papa le 20.11.2026 (19 photos). Les numéros de page « S2-… » sont ceux imprimés en bas des fiches.
   La page « Les gaz » n'a pas de numéro visible : c'est la suite de S2-8 (tableau des liaisons). Les quatre pages du résumé
   théorique et la feuille d'objectifs n'ont pas de numéro : elles sont désignées par leur titre. */
const SOURCES = [
  { titre:"Feuille « Objectifs du travail écrit sur la séquence 2 « Modèle moléculaire » »", recue:"20.11.2026", contenu:"Les 11 objectifs (le 10 en quatre parties a à d, « dispersion » corrigé en « diffusion »), notes de Livio (« Résumé théorique », 78 % azote, 21 % oxygène, zéro absolu −273, conduction thermique) et les trois dessins des états (solide, liquide, gazeux). Chaque chapitre du Dossier recopie un objectif tel quel." },
  { titre:"Résumé théorique — Masse et volume, Air, États de la matière", recue:"20.11.2026", contenu:"Textes à trous remplis par Livio et corrigés (mots barrés et remplacés : matière, quantité de matière, place qu'il occupe dans l'espace, mélange, ordonnées, rapprochées, fortement liées, vibrent, faiblement liées, espacées). Les ✓ et ✗ bleus marquent les erreurs à reprendre en priorité (décision du papa, 21.11.2026)." },
  { titre:"Résumé théorique — Propriétés des états, Notion de température, Pression", recue:"20.11.2026", contenu:"Tableau des propriétés (forme propre, volume propre, surface lisse / plane, comprimer ou dilater un gaz), définition de la température, thermomètre, degrés (°C), zéro absolu (écrit « 273 » : −273 °C d'après la feuille d'objectifs, confirmé par le papa), pression, densité, pascal, baromètre." },
  { titre:"Résumé théorique — gaz chauffé et gaz comprimé", recue:"20.11.2026", contenu:"Augmentation de la pression d'un gaz emprisonné qu'on chauffe (vitesse, violence et fréquence des chocs), images (a) et (b) du ballon, gaz comprimé (volume, molécules aussi nombreuses et aussi rapides, espace plus petit, chocs plus fréquents) et dessins du piston." },
  { titre:"Résumé théorique — Dilatation, Conduction thermique, Diffusion des liquides", recue:"20.11.2026", contenu:"Dilatation et contraction, distance entre les molécules, dessin froid / chaud ; conduction thermique ; diffusion d'un liquide dans un autre (« dispertion » écrit par Livio : le Dossier dit « diffusion », décision du papa)." },
  { titre:"Fiche S2-3 — Où y a-t-il le plus de matière ? (sable)", recue:"20.11.2026", contenu:"Deux cylindres identiques, niveau de sable plus haut dans le cylindre 1 ; réponse de Livio corrigée : volume plus grand, « pour connaître la vérité je dois connaître la masse à l'aide d'une balance ». « Hypothèses retenues par la classe » vide : aucune question." },
  { titre:"Fiche S2-4 — 2e situation (bouteilles) et « Je retiens »", recue:"20.11.2026", contenu:"Bouteille d'eau ambiante et bouteille sortie du congélateur ; réponse de Livio (« la bouteille gelée pèse plus ») ; hypothèse de la classe (même masse) ; « Je retiens » : la masse ne dépend pas des transformations (tassement du sable, congélation de l'eau), toute chose qui pèse est de la matière, grammes, balance, kilogramme." },
  { titre:"Fiche S2-5 — L'air est-il de la matière ? (ballon de basket)", recue:"20.11.2026", contenu:"Gonfler le ballon, « plus lourd » (« léger » barré), les deux expériences, « Je retiens » : l'air est pesant, 1 litre d'air ≈ 1,3 g, 78 % d'azote, 21 % d'oxygène, 1 % d'autres gaz dont le gaz carbonique, souvent de la vapeur d'eau (pas barré : le trait est le cadre, confirmé par le papa)." },
  { titre:"Fiche S2-7 — Échantillons de gaz et de liquide, « Je retiens »", recue:"20.11.2026", contenu:"Rectangles du gaz et du liquide dessinés, caractéristiques d'une molécule (ne se déforme pas, garde le même volume), « Je retiens » : gaz compressibles (molécules éloignées), liquides et solides incompressibles (très rapprochées), dessins gaz, gaz comprimé, liquide, solide. La situation des seringues (S2-6) n'est pas dans les photos : continuer sans elle (papa)." },
  { titre:"Fiche S2-8 et page « Les gaz » (suite) — Comment les molécules sont-elles liées entre elles ?", recue:"20.11.2026", contenu:"Observations corrigées en classe : solides liés fortement, liquides liés faiblement, gaz non liés. La partie « fortement ou faiblement » des gaz est barrée : aucune question." },
  { titre:"Fiches S2-12 et S2-13 — Récipient fermé sous une cloche à vide", recue:"20.11.2026", contenu:"Situation (cloche à vide, pompe), question 2 « Comment expliquer que le bouchon a sauté ? », réponse de Livio à l'échelle humaine, « Je retiens » (pression, chocs, échelle humaine et échelle moléculaire). Cases vides ou barrées : aucune question." },
  { titre:"Fiches S2-14 et S2-15 — Air chauffé dans un tube fermé (bouchon de patate)", recue:"20.11.2026", contenu:"Situation (tube à essais, bouchon de patate, bec Bunsen), réponses de Livio à la question 1, « Je retiens » à l'échelle humaine et moléculaire. La question 2 est vide : aucune question." },
  { titre:"Fiche S2-16 — Goutte de colorant dans l'eau froide et l'eau chaude", recue:"20.11.2026", contenu:"Situation, réponses de Livio, « Je retiens » (diffusion plus rapide quand la température est plus élevée, molécules plus agitées)." },
  { titre:"Fiche S2-17 — Pourquoi le manche d'une cuillère chauffe-t-il ?", recue:"20.11.2026", contenu:"Cuillère au-dessus d'une flamme ; réponses de Livio (« la flamme traverse le bout de cuivre », corrigé : conduction thermique) ; « Je retiens » à l'échelle humaine et moléculaire." },
  { titre:"Fiches S2-18 et S2-19 — Volume d'une boule en acier chauffée", recue:"20.11.2026", contenu:"Rappel du modèle avec agitation (solides, liquides, gaz, environ 500 m/s, température = agitation moyenne), réponses de Livio, « Je retiens » : dilatation à l'échelle humaine et moléculaire." },
];
const SOURCES_NOTE = "Les pages S2-6 (seringues), S2-10 et S2-11 ne sont pas dans les photos : le papa a dit de continuer sans elles. L'objectif 10a parle aussi des liquides chauffés : aucune page ne montre un liquide qui se dilate, le chapitre s'appuie sur la boule en acier et sur la règle générale du résumé théorique (décision du papa). Zéro absolu : −273 °C (feuille d'objectifs, le résumé dit « 273 » sans le signe). Le mot « diffusion » est gardé partout, comme dans la correction de l'objectif 10d. Les exemples de la vie quotidienne (objectif 11) sont seulement ceux des fiches et du résumé : rien n'est ajouté. Aucune question sur les cases vides (« Hypothèses retenues » de S2-3, question 2 de S2-14/15, partie barrée des gaz sur S2-8).";
const PHOTOS = [];

/* Capsules : pas prévues pour ce TE (décision du papa, 21.11.2026). null = « Vidéo bientôt disponible ». */
const VIDEOS = {};
const AUDIOS = {};
const CAPSULES = { titre:THEME, controle:DUE.long, consigne:"", diffusion:"", chapitres:[] };

const OBJ_LABEL = "Objectifs du travail écrit S2";
const CHAPTERS = [
  { key:"M", titre:"La matière : masse, volume, air", sous:"Objectifs 1 à 3 · fiches S2-3 à S2-5, résumé théorique", objLabel:OBJ_LABEL },
  { key:"E", titre:"Les trois états de la matière", sous:"Objectifs 4 à 6 · fiches S2-7 et S2-8, résumé théorique", objLabel:OBJ_LABEL },
  { key:"T", titre:"L'agitation : température et pression", sous:"Objectifs 7 à 9 · fiches S2-12, S2-13, S2-18, résumé théorique", objLabel:OBJ_LABEL },
  { key:"X", titre:"Expliquer avec le modèle moléculaire", sous:"Objectifs 10 et 11 · fiches S2-14 à S2-19, résumé théorique", objLabel:OBJ_LABEL },
];

/* ---------- SCHÉMAS SVG (dessinés pour le Dossier, d'après les dessins de la feuille d'objectifs et du résumé théorique) ---------- */
const P_PAGE = { ink:"var(--ink)", soft:"var(--soft)", rule:"var(--rule)", sheet:"var(--sheet)", box:"var(--box)", wash:"var(--box-wash)",
  crane:"var(--crane)", land:"var(--land)", font:"'IBM Plex Sans', system-ui, sans-serif" };
/* P_FIXE : couleurs fixes pour l'export JSON (export-dossier.py) */
const P_FIXE = { ink:"#18232B", soft:"#53616B", rule:"#C6D1D9", sheet:"#FFFFFF", box:"#1D5FA6", wash:"#E0EBF7",
  crane:"#E8762C", land:"#DCE6EC", font:"Arial, Helvetica, sans-serif" };
const svgEsc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
function svgTxt(P, x, y, txt, o = {}){ return `<text x="${x}" y="${y}" text-anchor="${o.a || "middle"}" style="font-family:${P.font};font-size:${o.size || 11}px;font-weight:${o.w || 400};fill:${o.c || P.ink}">${svgEsc(txt)}</text>`; }
const mol = (P, x, y, r = 8, extra = "") => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" style="fill:${P.wash};stroke:${P.box};stroke-width:1.6${extra}"/>`;
function fleche(P, x, y, dx, dy){
  const x2 = x + dx, y2 = y + dy, a = Math.atan2(dy, dx), L = 5;
  const p1 = (x2 - L * Math.cos(a - 0.5)).toFixed(1) + "," + (y2 - L * Math.sin(a - 0.5)).toFixed(1), p2 = (x2 - L * Math.cos(a + 0.5)).toFixed(1) + "," + (y2 - L * Math.sin(a + 0.5)).toFixed(1);
  return `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" style="stroke:${P.crane};stroke-width:1.6"/><polygon points="${x2.toFixed(1)},${y2.toFixed(1)} ${p1} ${p2}" style="fill:${P.crane}"/>`;
}
/* positions du liquide : serrées mais en désordre (fixes, pour que le dessin ne change pas d'une fois à l'autre) */
const LIQ = [[14,16],[33,13],[51,19],[70,14],[90,18],[22,34],[42,36],[61,33],[80,37],[97,35],[13,53],[31,55],[50,52],[69,56],[88,53],[22,73],[41,71],[60,75],[79,72],[97,74],[13,92],[32,94],[51,90],[70,94],[89,91],[24,111],[45,110],[66,112],[86,109]];
const GAZ = [[22,22,14,-9],[78,18,-12,10],[50,52,15,8],[18,82,10,12],[86,70,-14,-6],[60,104,-10,-12]];
function svgEtats(P){
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 182" role="img" aria-label="Les trois états de la matière dessinés avec le modèle moléculaire">`;
  s += `<rect x="0" y="0" width="360" height="182" rx="4" style="fill:${P.sheet};stroke:${P.rule}"/>`;
  [5, 125, 245].forEach(x0 => { s += `<rect x="${x0}" y="8" width="110" height="124" style="fill:none;stroke:${P.ink};stroke-width:1.2;stroke-dasharray:4 3"/>`; });
  for (let r = 0; r < 6; r++) for (let c = 0; c < 5; c++) s += mol(P, 5 + 15 + c * 20, 8 + 12 + r * 20, 9);
  LIQ.forEach(([x, y]) => { s += mol(P, 125 + x, 8 + y, 9); });
  GAZ.forEach(([x, y, dx, dy]) => { s += mol(P, 245 + x, 8 + y, 9) + fleche(P, 245 + x + (dx > 0 ? 9 : -9), 8 + y + (dy > 0 ? 4 : -4), dx, dy); });
  s += svgTxt(P, 60, 150, "Solide", { size:13, w:700 }) + svgTxt(P, 180, 150, "Liquide", { size:13, w:700 }) + svgTxt(P, 300, 150, "Gazeux", { size:13, w:700 });
  s += svgTxt(P, 60, 165, "ordonné, rapprochées", { size:9.5, c:P.soft }) + svgTxt(P, 60, 177, "fortement liées, vibrent", { size:9.5, c:P.soft });
  s += svgTxt(P, 180, 165, "désordre, rapprochées", { size:9.5, c:P.soft }) + svgTxt(P, 180, 177, "faiblement liées, glissent", { size:9.5, c:P.soft });
  s += svgTxt(P, 300, 165, "désordre, très espacées", { size:9.5, c:P.soft }) + svgTxt(P, 300, 177, "pas liées, tous les sens", { size:9.5, c:P.soft });
  return s + `</svg>`;
}
function svgDilat(P){
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 176" role="img" aria-label="Dilatation : les mêmes molécules, plus éloignées quand l'objet est chaud">`;
  s += `<rect x="0" y="0" width="360" height="176" rx="4" style="fill:${P.sheet};stroke:${P.rule}"/><line x1="180" y1="12" x2="180" y2="128" style="stroke:${P.rule}"/>`;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) s += mol(P, 62 + c * 19, 46 + r * 19, 8);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++){ const x = 228 + c * 28, y = 36 + r * 28;
    s += `<circle cx="${x}" cy="${y}" r="12" style="fill:none;stroke:${P.crane};stroke-width:1;stroke-dasharray:2 2"/>` + mol(P, x, y, 8); }
  s += svgTxt(P, 90, 146, "Froid : rapprochées", { size:12, w:700 }) + svgTxt(P, 270, 146, "Chaud : elles vibrent plus", { size:12, w:700 });
  s += svgTxt(P, 270, 159, "et s'éloignent", { size:12, w:700 });
  s += svgTxt(P, 180, 172, "Même taille de molécule : seule la distance change.", { size:10, c:P.soft });
  return s + `</svg>`;
}
const CYL = [[0.08,0.25],[0.2,0.7],[0.31,0.35],[0.43,0.8],[0.52,0.2],[0.62,0.55],[0.72,0.3],[0.8,0.78],[0.9,0.45],[0.37,0.58]];
function svgCompr(P){
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 206" role="img" aria-label="Gaz comprimé : même nombre de molécules dans un espace plus petit">`;
  s += `<rect x="0" y="0" width="360" height="206" rx="4" style="fill:${P.sheet};stroke:${P.rule}"/>`;
  const cyl = (y, L, lab) => {
    let t = `<path d="M12 ${y} L${12 + L} ${y} M12 ${y + 56} L${12 + L} ${y + 56} M12 ${y} L12 ${y + 56}" style="fill:none;stroke:${P.ink};stroke-width:2"/>`;
    t += `<rect x="${12 + L}" y="${y + 2}" width="9" height="52" style="fill:${P.soft}"/><line x1="${21 + L}" y1="${y + 28}" x2="350" y2="${y + 28}" style="stroke:${P.soft};stroke-width:4"/>`;
    CYL.forEach(([fx, fy]) => { t += mol(P, 12 + 8 + fx * (L - 16), y + 8 + fy * 40, 5.5); });
    return t + svgTxt(P, 16, y - 6, lab, { a:"start", size:11, w:700 });
  };
  s += cyl(26, 214, "Avant : grand volume, 10 molécules");
  s += cyl(116, 104, "Comprimé : petit volume, toujours 10 molécules");
  s += svgTxt(P, 8, 194, "Aussi nombreuses, aussi rapides : les chocs sur les parois sont plus fréquents.", { a:"start", size:9.5, c:P.soft });
  return s + `</svg>`;
}
const SVGS = { etats:svgEtats, dilat:svgDilat, compr:svgCompr };

/* ---------- Petits gabarits HTML ---------- */
const tbl = (head, rows, note) => `<div class="tbl"><table><thead><tr>${head.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map((c, i) => `<td${i === 0 ? ' class="k"' : ""}>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>${note ? `<p class="fine">${note}</p>` : ""}`;
const chain = steps => `<div class="chain">${steps.map(([b, t, c]) => `<div class="step"><span class="step-bar" style="background:${c}"></span><div class="step-body"><b>${b}</b><span>${t}</span></div></div>`).join("")}</div>`;
/* définition du résumé théorique : à savoir mot pour mot (fond jaune) */
const rdef = (term, h) => `<div class="def book"><span class="def-term">${term} <span class="tag book">Résumé théorique</span></span><p class="read">${h}</p></div>`;
/* les deux échelles des fiches : 🧍 humaine (ce qu'on voit) et ⚛ moléculaire (ce que font les molécules) */
const deux = (hum, mo) => `<div class="tbl"><table><tbody><tr><td class="k">🧍 Échelle humaine</td><td>${hum}</td></tr><tr><td class="k">⚛ Échelle moléculaire</td><td>${mo}</td></tr></tbody></table></div>`;

/* ============================================================
   DOSSIER — un chapitre par objectif de la feuille d'objectifs
   ============================================================ */
const PAGES = [
/* ---------------- FIL ROUGE ---------------- */
{ id:"LIENS", ch:"", titre:"Le fil rouge de l'épreuve", court:"Des molécules qui ne changent jamais ; seules changent leur distance, leurs liaisons et leur agitation",
  pre:[{ q:"Quand on chauffe une boule en acier, ses molécules grossissent-elles ?", a:"Non. Une molécule garde toujours le même volume : c'est la distance entre les molécules qui augmente.", s:"Résumé théorique, Dilatation" }, { q:"Que mesure un thermomètre, à l'échelle des molécules ?", a:"L'agitation des molécules.", s:"Résumé théorique, Notion de température" }],
  blank:{ consigne:"Sur une feuille blanche, écris les trois choses qui peuvent changer entre les molécules, puis une chose qui ne change jamais.", points:["La distance entre les molécules (rapprochées ou espacées)", "Les liaisons (fortement liées, faiblement liées, pas liées)", "L'agitation (elles vibrent, glissent ou se déplacent ; plus ou moins vite)", "Ce qui ne change jamais : une molécule ne se déforme pas et garde le même volume"], s:"Résumé théorique · fiche S2-7" },
  blocks:[
  { t:"p", s:"Résumé théorique, États de la matière · fiche S2-7", h:"Tout ton TE repose sur une seule idée : <b>la matière est un assemblage de molécules</b>, et une molécule <b>ne se déforme pas</b> et <b>garde le même volume</b>. Ce qui change, c'est seulement <b>la distance</b> entre les molécules, <b>leurs liaisons</b> et <b>leur agitation</b>. Avec ces trois mots, tu expliques tout le reste." },
  { t:"html", s:"Feuille d'objectifs · résumé théorique", h:`<div class="trio">
    <div class="trio-s"><span class="trio-k">1</span><div><b>La matière</b><p>Masse, volume, et l'air qui pèse.</p><div class="chips"><button data-act="page" data-v="O1">O1 masse</button><button data-act="page" data-v="O2">O2 volume</button><button data-act="page" data-v="O3">O3 air</button></div></div></div>
    <div class="trio-s"><span class="trio-k">2</span><div><b>Les trois états</b><p>Le dessin, le comportement des molécules, les propriétés.</p><div class="chips"><button data-act="page" data-v="O4">O4 dessin</button><button data-act="page" data-v="O5">O5 molécules</button><button data-act="page" data-v="O6">O6 propriétés</button></div></div></div>
    <div class="trio-s"><span class="trio-k">3</span><div><b>L'agitation</b><p>Température, zéro absolu, pression.</p><div class="chips"><button data-act="page" data-v="O7">O7 température</button><button data-act="page" data-v="O8">O8 zéro absolu</button><button data-act="page" data-v="O9">O9 pression</button></div></div></div>
    <div class="trio-s"><span class="trio-k">4</span><div><b>Expliquer</b><p>Dilatation, pression qui monte, conduction, diffusion, exemples.</p><div class="chips"><button data-act="page" data-v="O10A">10a</button><button data-act="page" data-v="O10B">10b</button><button data-act="page" data-v="O10C">10c</button><button data-act="page" data-v="O10D">10d</button><button data-act="page" data-v="O11">O11</button></div></div></div></div>` },
  { t:"h3", h:"Deux échelles pour chaque explication" },
  { t:"p", s:"Fiches S2-12 à S2-19, rubriques « Donne une explication à l'échelle humaine » et « Trouve une réponse à l'aide du modèle moléculaire »", h:"Tes fiches demandent toujours deux réponses. <b>À l'échelle humaine</b> : ce qu'on voit ou mesure (la boule grossit, le bouchon saute). <b>À l'échelle moléculaire</b> : ce que font les molécules (elles vibrent plus, elles frappent plus souvent les parois)." },
  { t:"pause", q:"Le bouchon saute : est-ce une explication à l'échelle humaine ou à l'échelle moléculaire ?", a:"À l'échelle humaine : c'est ce qu'on voit.", s:"Fiche S2-13, « Je retiens »" },
  { t:"h3", h:"Les liens à savoir faire" },
  { t:"links", s:"Résumé théorique · fiches S2-7, S2-8, S2-16, S2-19", items:[
    [["O5","O6"], "Les liaisons expliquent les propriétés : fortement liées → forme propre ; espacées → compressible."],
    [["O7","O10A"], "Chauffer, c'est augmenter l'agitation : les molécules vibrent plus et s'éloignent, le volume augmente."],
    [["O7","O9","O10B"], "Plus d'agitation dans un gaz enfermé → chocs plus violents et plus fréquents → pression plus forte."],
    [["O5","O10D"], "Les molécules d'un liquide sont faiblement liées : elles glissent, et le colorant se diffuse."],
    [["O1","O3"], "L'air pèse : c'est donc de la matière."]] },
  { t:"svg", k:"etats", titre:"Les trois états, avec le modèle moléculaire", alt:"Trois cadres. Solide : molécules rangées en ordre et serrées. Liquide : molécules serrées mais en désordre. Gazeux : peu de molécules, très espacées, avec des flèches dans tous les sens.", s:"Dessins de la feuille d'objectifs · résumé théorique, États de la matière" },
  { t:"tip", h:"À chaque question, commence par te demander : est-ce que je dois décrire ce qu'on voit (échelle humaine), ou ce que font les molécules (échelle moléculaire) ? Puis utilise un des trois mots : distance, liaisons, agitation." },
]},

/* ---------------- O1 ---------------- */
{ id:"O1", ch:"M", titre:"La masse", court:"La quantité de matière ; balance ; kilogramme (kg)",
  obj:"Définir la masse, citer son unité (kg) et son outil de mesure.",
  pre:[{ q:"Deux bouteilles identiques, pleines de la même quantité d'eau, l'une sort du congélateur : laquelle pèse le plus ?", a:"Aucune : elles pèsent la même chose. La congélation ne change pas la masse.", s:"Fiche S2-4, hypothèses de la classe et « Je retiens »" }, { q:"Avec quel outil mesure-t-on une masse ?", a:"Avec une balance.", s:"Résumé théorique, Masse et volume" }],
  blank:{ consigne:"Écris la définition de la masse, son unité, son symbole et son outil, puis l'exemple des deux bouteilles.", points:["La masse d'un objet représente la quantité de matière qui le compose", "Toute chose qui pèse est de la matière", "Outil : la balance ; unité du Système international : le kilogramme (kg) ; en classe, on a mesuré en grammes (g)", "La masse ne dépend pas des transformations (tassement du sable, congélation de l'eau) : les deux bouteilles pèsent la même chose"], s:"Résumé théorique · fiche S2-4" },
  blocks:[
  { t:"html", s:"Résumé théorique, Masse et volume (mots corrigés : « matière », « la quantité de matière »)", h:rdef("Masse", "La masse d'un objet représente <b>la quantité de matière</b> qui le compose.") + rdef("Matière", "En physique, on convient de dire que <b>toute chose qui pèse est de la matière</b>.") },
  { t:"p", s:"Résumé théorique, Masse et volume · fiche S2-4, « Je retiens »", h:"La masse se mesure avec une <b>balance</b>. L'unité de la masse dans le Système international est le <b>kilogramme</b> (symbole <b>kg</b>). En classe, vous avez mesuré la masse en <b>grammes (g)</b>. La masse et le volume sont <b>deux grandeurs physiques distinctes</b>." },
  { t:"mine", s:"Résumé théorique, Masse et volume (mots barrés)", titre:"Attention à tes erreurs du résumé", items:["Ce qui pèse est de la « matière », pas de la « masse ».", "La masse représente « la quantité de matière », pas « les molécules »."] },
  { t:"pause", q:"Que représente la masse d'un objet ?", a:"La quantité de matière qui le compose.", s:"Résumé théorique, Masse et volume" },
  { t:"h3", h:"Pourquoi la masse, et pas le niveau ?" },
  { t:"ex", s:"Fiches S2-3 et S2-4", items:[
    ["S2-3", "Deux cylindres de sable : le niveau est plus haut dans le cylindre 1.", "Le niveau ne suffit pas : « pour connaître la vérité, je dois connaître la masse à l'aide d'une balance »."],
    ["S2-4", "Une bouteille d'eau et une bouteille sortie du congélateur.", "Elles pèsent la même chose : elles contiennent la même quantité d'eau. Tu avais répondu « la gelée pèse plus » : c'est le piège."]] },
  { t:"p", s:"Fiche S2-4, « Je retiens »", h:"La masse est une grandeur appropriée pour caractériser une quantité de matière, car <b>elle ne dépend pas des transformations</b> que subit cette matière (tassement du sable, congélation de l'eau, etc.)." },
  { t:"pause", q:"L'eau gèle et la bouteille gonfle : sa masse change-t-elle ?", a:"Non. La masse ne dépend pas des transformations comme la congélation.", s:"Fiche S2-4, « Je retiens »" },
  { t:"tip", h:"Phrase-modèle : « La masse représente la quantité de matière qui compose un objet ; elle se mesure avec une balance, en kilogrammes (kg). » Ne confonds pas : kg pour la masse, m³ pour le volume." },
  { t:"see", ids:["O2","O3"] },
  { t:"src", h:"Résumé théorique (Masse et volume) · fiches S2-3 et S2-4" },
]},

/* ---------------- O2 ---------------- */
{ id:"O2", ch:"M", titre:"Le volume", court:"La place qu'un objet occupe dans l'espace ; mètre cube (m³)",
  obj:"Définir le volume, citer son unité (m3).",
  pre:[{ q:"Le volume, est-ce la « taille » d'un objet ?", a:"Le résumé dit plus précisément : la place qu'il occupe dans l'espace.", s:"Résumé théorique, Masse et volume (« sa taille » barré)" }, { q:"Quelle est l'unité du volume ?", a:"Le mètre cube (m³).", s:"Résumé théorique, Masse et volume" }],
  blank:{ consigne:"Écris la définition du volume et son unité, puis explique en une phrase la différence avec la masse.", points:["Le volume d'un objet représente la place qu'il occupe dans l'espace", "Unité du Système international : le mètre cube (m³)", "Masse et volume sont deux grandeurs distinctes : la masse = quantité de matière (kg, balance), le volume = place occupée (m³)"], s:"Résumé théorique, Masse et volume" },
  blocks:[
  { t:"html", s:"Résumé théorique, Masse et volume (« sa taille » barré, remplacé par « sa place qu'il occupe dans l'espace »)", h:rdef("Volume", "Le volume d'un objet représente <b>la place qu'il occupe dans l'espace</b>. L'unité du volume dans le Système international est le <b>mètre cube</b> (symbole <b>m³</b>).") },
  { t:"mine", s:"Résumé théorique, Masse et volume (mots barrés)", titre:"Attention à ton erreur du résumé", items:["Tu avais écrit « sa taille » : il faut écrire « la place qu'il occupe dans l'espace »."] },
  { t:"pause", q:"Que représente le volume d'un objet, et quelle est son unité ?", a:"La place qu'il occupe dans l'espace ; le mètre cube (m³).", s:"Résumé théorique, Masse et volume" },
  { t:"p", s:"Résumé théorique · fiche S2-3", h:"<b>Masse et volume sont deux grandeurs distinctes.</b> Dans les deux cylindres de sable, le volume de sable est plus grand dans le cylindre 1, mais pour savoir où il y a le plus de matière, il faut mesurer la <b>masse</b>. Plus loin, tu verras que le volume peut changer : il <b>diminue</b> quand on comprime un gaz, il <b>augmente</b> quand on chauffe un objet (dilatation)." },
  { t:"pause", q:"Quand on comprime un gaz, que devient son volume ?", a:"Il diminue.", s:"Résumé théorique, gaz comprimé" },
  { t:"tip", h:"Phrase-modèle : « Le volume d'un objet représente la place qu'il occupe dans l'espace ; son unité est le mètre cube (m³). » Écris bien le petit 3 du m³." },
  { t:"see", ids:["O1","O10A","O10B"] },
  { t:"src", h:"Résumé théorique (Masse et volume, gaz comprimé) · fiche S2-3" },
]},

/* ---------------- O3 ---------------- */
{ id:"O3", ch:"M", titre:"L'air", court:"Un mélange qui pèse : 78 % d'azote, 21 % d'oxygène",
  obj:"Citer le nom des deux gaz principaux composant l'air sec et leurs proportions.",
  pre:[{ q:"Un ballon de basket mou : si on le gonfle, devient-il plus lourd, plus léger ou garde-t-il la même masse ?", a:"Plus lourd : ajouter de l'air change la masse.", s:"Fiche S2-5" }, { q:"Quel gaz est le plus abondant dans l'air sec ?", a:"L'azote (78 %).", s:"Fiche S2-5 · résumé théorique, Air" }],
  blank:{ consigne:"Écris la composition de l'air sec avec les pourcentages, puis prouve que l'air est de la matière.", points:["L'air sec est un mélange : 78 % d'azote, 21 % d'oxygène, 1 % d'autres gaz (dont le gaz carbonique)", "L'air contient souvent de la vapeur d'eau", "Ajouter ou enlever de l'air change la masse : l'air est pesant, il est donc une matière", "L'air est pesant, qu'il soit comprimé ou non : 1 litre d'air non comprimé pèse environ 1,3 g"], s:"Fiche S2-5, « Je retiens » · résumé théorique, Air" },
  blocks:[
  { t:"html", s:"Résumé théorique, Air (« gaz » barré, remplacé par « mélange ») · fiche S2-5, « Je retiens »", h:rdef("Air sec", "L'air sec est un <b>mélange</b> qui se compose de <b>78 % d'azote</b>, de <b>21 % d'oxygène</b> et de <b>1 % d'autres gaz</b> (dont le gaz carbonique).") + tbl(["Gaz","Part de l'air sec"], [["Azote","<b>78 %</b>"],["Oxygène","<b>21 %</b>"],["Autres gaz, dont le gaz carbonique","1 %"]], "L'air contient aussi souvent de la vapeur d'eau.") },
  { t:"mine", s:"Résumé théorique, Air (mot barré)", titre:"Attention à ton erreur du résumé", items:["L'air sec n'est pas « un gaz » : c'est un mélange de gaz."] },
  { t:"pause", q:"Quels sont les deux gaz principaux de l'air sec, et leurs proportions ?", a:"L'azote (78 %) et l'oxygène (21 %).", s:"Résumé théorique, Air" },
  { t:"h3", h:"L'air est de la matière" },
  { t:"ex", s:"Fiche S2-5", items:[
    ["S2-5 · 1", "Peser le ballon, le gonfler, peser à nouveau le ballon.", "Le ballon gonflé est plus lourd (tu avais d'abord écrit « léger », puis corrigé en « lourd »)."],
    ["S2-5 · 2", "Expérience avec un ballon en verre indéformable et une pompe aspirante.", "Enlever de l'air change aussi la masse."]] },
  { t:"p", s:"Fiche S2-5, « Je retiens » · résumé théorique, Air", h:"<b>Ajouter de l'air ou enlever de l'air change la masse</b> : l'air est donc pesant. <b>Comme l'air pèse, il est une matière.</b> L'air est pesant, qu'il soit comprimé ou non : <b>un litre d'air non comprimé pèse environ 1,3 g</b>." },
  { t:"pause", q:"Pourquoi peut-on dire que l'air est de la matière ?", a:"Parce qu'il pèse : ajouter ou enlever de l'air change la masse.", s:"Fiche S2-5, « Je retiens »" },
  { t:"tip", h:"Phrase-modèle : « L'air sec est un mélange de 78 % d'azote et de 21 % d'oxygène ; comme l'air pèse, il est une matière. » Astuce : l'azote est le plus gros chiffre, l'oxygène celui qu'on respire, et 78 + 21 + 1 = 100." },
  { t:"see", ids:["O1","O11"] },
  { t:"src", h:"Fiche S2-5 · résumé théorique (Air)" },
]},

/* ---------------- O4 ---------------- */
{ id:"O4", ch:"E", titre:"Dessiner les trois états", court:"Ordonné et serré · serré en désordre · très espacé",
  obj:"Schématiser (dessin) les 3 états principaux de la matière à l'aide du modèle moléculaire.",
  pre:[{ q:"Quand tu dessines un gaz comprimé, dois-tu dessiner des molécules plus grosses ?", a:"Non : les molécules gardent toujours la même taille, elles sont seulement plus rapprochées.", s:"Fiche S2-7 · résumé théorique, États de la matière" }, { q:"Dans quel état les molécules sont-elles rangées en ordre ?", a:"Dans l'état solide.", s:"Résumé théorique, États de la matière" }],
  blank:{ consigne:"Dessine trois rectangles et remplis-les : solide, liquide, gazeux. Sous chaque dessin, écris deux mots.", points:["Solide : molécules rangées en ordre, serrées les unes contre les autres (ordonné)", "Liquide : molécules serrées, mais en désordre (non ordonné)", "Gazeux : peu de molécules, très espacées, avec des flèches dans tous les sens (non ordonné)", "Toutes les molécules ont la même taille dans les trois dessins"], s:"Dessins de la feuille d'objectifs · fiche S2-7, « Je retiens »" },
  blocks:[
  { t:"svg", k:"etats", titre:"Ce que tu dois savoir dessiner", alt:"Solide : un quadrillage régulier de molécules qui se touchent. Liquide : des molécules qui se touchent, mais placées en désordre. Gazeux : six molécules très éloignées, chacune avec une flèche qui part dans une direction différente.", s:"Dessins de la feuille d'objectifs · résumé théorique, États de la matière" },
  { t:"html", s:"Fiche S2-7 · résumé théorique, États de la matière", h:rdef("Molécule (dans le modèle)", "Une molécule <b>ne se déforme pas</b> (elle ne s'aplatit pas) et <b>garde le même volume</b> (elle ne « grossit » pas et ne « maigrit » pas).") },
  { t:"pause", q:"Une molécule peut-elle s'aplatir ou grossir ?", a:"Non : elle ne se déforme pas et garde le même volume.", s:"Fiche S2-7" },
  { t:"h3", h:"Trois règles pour un bon dessin" },
  { t:"p", s:"Fiche S2-7, « Je retiens » · résumé théorique, États de la matière · dessins de la feuille d'objectifs", h:"1. <b>Même taille de cercle</b> partout. 2. <b>Solide et liquide : très rapprochées</b>, les cercles se touchent ; le solide est <b>en ordre</b>, le liquide <b>en désordre</b>. 3. <b>Gaz : très espacées</b>, avec des <b>flèches</b> pour montrer qu'elles se déplacent dans tous les sens." },
  { t:"mine", s:"Fiche S2-7, ton dessin « Gaz comprimé »", titre:"À corriger dans ton dessin", items:["Dans ton dessin du gaz comprimé, les cercles sont plus gros que ceux du gaz : garde la même taille, rapproche-les seulement."] },
  { t:"pause", q:"Qu'est-ce qui distingue le dessin du solide de celui du liquide ?", a:"Les deux sont serrés, mais le solide est rangé en ordre et le liquide en désordre.", s:"Résumé théorique, États de la matière" },
  { t:"tip", h:"À l'épreuve, dessine d'abord au crayon, avec des cercles de même taille. Écris sous chaque rectangle : « ordonné, rapprochées », « désordre, rapprochées », « très espacées, tous les sens »." },
  { t:"see", ids:["O5","O6"] },
  { t:"src", h:"Feuille d'objectifs (dessins) · fiche S2-7 · résumé théorique (États de la matière)" },
]},

/* ---------------- O5 ---------------- */
{ id:"O5", ch:"E", titre:"Mouvements et liaisons des molécules", court:"Solide : vibrent, fortement liées · liquide : glissent, faiblement liées · gaz : libres",
  obj:"Décrire le comportement des particules dans les 3 états de la matière (mouvements des molécules, liaisons entre elles).",
  pre:[{ q:"Dans un solide, les molécules bougent-elles ?", a:"Elles vibrent sur place.", s:"Résumé théorique, États de la matière (« bouge » corrigé en « vibre ») · fiche S2-18, Rappel" }, { q:"À quelle vitesse vont les molécules de l'air de la salle de classe ?", a:"Environ 500 m/s.", s:"Fiche S2-18, Rappel" }],
  blank:{ consigne:"Fais un tableau à trois colonnes (solide, liquide, gaz) avec deux lignes : « mouvement » et « liaisons ».", points:["Solide : vibrent (oscillent) sur place ; fortement liées ; rapprochées ; état ordonné", "Liquide : vibrent et glissent les unes sur les autres ; faiblement liées ; rapprochées ; état non ordonné", "Gaz : libres de se déplacer dans tous les sens, à très grande vitesse (environ 500 m/s), s'entrechoquent ; pas liées ; très espacées ; état non ordonné"], s:"Résumé théorique, États de la matière · fiche S2-18, Rappel" },
  blocks:[
  { t:"html", s:"Résumé théorique, États de la matière (mots corrigés) · fiche S2-18, Rappel", h:tbl(["État","Mouvement · liaisons · distance"], [
    ["<b>Solide</b>","<b>vibrent</b> (oscillent) sur place · <b>fortement liées</b> · rapprochées, disposées de manière parfaitement <b>ordonnée</b> · état ordonné"],
    ["<b>Liquide</b>","<b>vibrent et glissent</b> les unes sur les autres · <b>faiblement liées</b> · rapprochées · état non ordonné"],
    ["<b>Gaz</b>","<b>libres</b> de se déplacer à très grande vitesse et dans tous les sens, elles s'entrechoquent continuellement · <b>pas liées</b> · très espacées · état non ordonné"]]) },
  { t:"mine", s:"Résumé théorique, États de la matière (mots barrés, marqués ✗)", titre:"Tes erreurs du résumé, à ne plus refaire", items:["Solide : « ordonnées » (pas « alignées »), « rapprochées » (pas « collées »), « fortement liées », les molécules « vibrent » (pas « bougent »).", "Liquide : « rapprochées » (pas « attachées »), « faiblement liées » (pas seulement « liées »)."] },
  { t:"pause", q:"Pourquoi les molécules d'un liquide peuvent-elles glisser les unes sur les autres ?", a:"Parce qu'elles sont faiblement liées.", s:"Résumé théorique, États de la matière" },
  { t:"h3", h:"Les observations qui le prouvent" },
  { t:"html", s:"Fiche S2-8 et page « Les gaz », corrigées en classe", h:tbl(["État","Ce qu'on observe"], [
    ["Solide · liées","ne se désagrège pas seul au cours du temps ; son volume ne change pas selon le récipient"],
    ["Solide · fortement","peut être saisi entièrement ; ne s'étale pas ; ne prend pas la forme du récipient"],
    ["Liquide · liées","peut former des gouttes ; ne se vaporise pas facilement ; volume qui ne change pas selon le récipient"],
    ["Liquide · faiblement","s'écoule ; s'étale ; prend la forme du récipient ; on peut le traverser"],
    ["Gaz · non liées","se répand, se diffuse, prend toute la place à disposition ; on peut le traverser sans peine"]]) },
  { t:"pause", q:"Quelle observation montre que les molécules d'un liquide sont liées ?", a:"Un liquide peut former des gouttes (et il ne se vaporise pas facilement).", s:"Fiche S2-8" },
  { t:"tip", h:"Phrase-modèle : « Dans un solide, les molécules sont rapprochées, fortement liées et vibrent sur place ; dans un liquide, elles sont rapprochées, faiblement liées et glissent les unes sur les autres ; dans un gaz, elles sont très espacées, pas liées, et se déplacent dans tous les sens à grande vitesse. »" },
  { t:"see", ids:["O4","O6","O10D"] },
  { t:"src", h:"Résumé théorique (États de la matière) · fiche S2-8 et page « Les gaz » · fiche S2-18 (Rappel)" },
]},

/* ---------------- O6 ---------------- */
{ id:"O6", ch:"E", titre:"Forme, volume, compressibilité", court:"Forme propre, volume propre, compressible ou pas",
  obj:"Présenter les propriétés de chaque état de la matière (forme, volume, compressibilité).",
  pre:[{ q:"Quel état peut-on comprimer ?", a:"Le gaz.", s:"Fiche S2-7, « Je retiens »" }, { q:"Un liquide a-t-il une forme propre ?", a:"Non : il prend la forme du récipient qui le contient.", s:"Résumé théorique, Propriétés des états" }],
  blank:{ consigne:"Recopie de mémoire le tableau : forme propre ? volume propre ? compressible ? pour les trois états, avec la raison de la compressibilité.", points:["Solide : forme propre (ne prend pas la forme du récipient), volume propre, pratiquement incompressible", "Liquide : pas de forme propre, surface lisse / plane au contact de l'air, volume propre, pratiquement incompressible", "Gaz : pas de forme propre, pas de volume propre (occupe tout l'espace offert), on peut le comprimer ou le dilater", "Gaz compressibles : molécules éloignées, de l'espace entre elles ; liquides et solides : très rapprochées, trop peu d'espace"], s:"Résumé théorique, Propriétés des états · fiche S2-7, « Je retiens »" },
  blocks:[
  { t:"html", s:"Résumé théorique, Propriétés des états", h:tbl(["État","Forme · volume · compressibilité"], [
    ["<b>Solide</b>","ne prend pas la forme du récipient : <b>forme propre</b> · pratiquement incompressible : <b>volume propre</b>"],
    ["<b>Liquide</b>","prend la forme du récipient : <b>pas de forme propre</b> ; surface au contact de l'air <b>lisse / plane</b> · pratiquement incompressible : <b>volume propre</b>"],
    ["<b>Gaz</b>","prend la forme du récipient : <b>pas de forme propre</b> · occupe tout l'espace offert : <b>pas de volume propre</b> · on peut le <b>comprimer</b> ou le <b>dilater</b>"]]) },
  { t:"pause", q:"Quel état n'a ni forme propre, ni volume propre ?", a:"Le gaz.", s:"Résumé théorique, Propriétés des états" },
  { t:"h3", h:"Pourquoi un gaz se comprime" },
  { t:"p", s:"Fiche S2-7, « Je retiens »", h:"<b>Les gaz sont compressibles car leurs molécules sont éloignées</b> : il y a donc un espace entre elles. Lorsqu'un gaz est comprimé, <b>les molécules se rapprochent</b>. <b>Les liquides et les solides sont incompressibles car leurs molécules sont très rapprochées</b> : il y a donc trop peu d'espace entre elles." },
  { t:"svg", k:"compr", titre:"Comprimer un gaz : les molécules se rapprochent", alt:"Deux cylindres fermés par un piston. En haut, un grand volume avec dix molécules espacées. En bas, le piston est enfoncé : le volume est plus petit, il y a toujours dix molécules, plus rapprochées.", s:"Résumé théorique, gaz comprimé (dessins du piston) · fiche S2-7" },
  { t:"pause", q:"Pourquoi ne peut-on presque pas comprimer un liquide ?", a:"Ses molécules sont très rapprochées : il y a trop peu d'espace entre elles.", s:"Fiche S2-7, « Je retiens »" },
  { t:"tip", h:"Phrase-modèle : « Le gaz est compressible car ses molécules sont éloignées : on peut les rapprocher. Le liquide et le solide sont incompressibles car leurs molécules sont déjà très rapprochées. » Lien avec O5 : « forme propre » = molécules fortement liées." },
  { t:"see", ids:["O5","O10B"] },
  { t:"src", h:"Résumé théorique (Propriétés des états, gaz comprimé) · fiche S2-7" },
]},

/* ---------------- O7 ---------------- */
{ id:"O7", ch:"T", titre:"La température", court:"Une mesure de l'agitation des molécules ; thermomètre ; °C",
  obj:"Définir la température avec le modèle moléculaire, citer son unité (°C) et son outil de mesure.",
  pre:[{ q:"Si les molécules s'agitent plus, la température monte-t-elle ou baisse-t-elle ?", a:"Elle s'élève (elle augmente).", s:"Résumé théorique, Notion de température" }, { q:"Chaque molécule a-t-elle exactement la même agitation ?", a:"Non : chaque molécule a une agitation propre ; la température mesure l'agitation moyenne.", s:"Fiche S2-18, Rappel" }],
  blank:{ consigne:"Écris la définition de la température avec le modèle moléculaire, son outil et son unité.", points:["La température est une mesure de l'agitation des molécules d'un corps (l'agitation moyenne)", "Agitation qui augmente → la température s'élève ; agitation qui diminue → la température chute", "Elle se mesure avec un thermomètre, en degrés (°C)"], s:"Résumé théorique, Notion de température · fiche S2-18, Rappel" },
  blocks:[
  { t:"html", s:"Résumé théorique, Notion de température · fiche S2-18, Rappel", h:rdef("Température", "Par définition, la température est une mesure de <b>l'agitation des molécules</b> d'un corps. Lorsque l'agitation de ses particules augmente, la température <b>s'élève</b> ; lorsqu'elle diminue, la température <b>chute</b>.") },
  { t:"p", s:"Résumé théorique, Notion de température", h:"La température se mesure à l'aide d'un <b>thermomètre</b>, en <b>degrés (°C)</b>." },
  { t:"pause", q:"Avec quel outil et dans quelle unité mesure-t-on la température ?", a:"Avec un thermomètre, en degrés (°C).", s:"Résumé théorique, Notion de température" },
  { t:"p", s:"Fiche S2-18, Rappel", h:"Dans le modèle, <b>chaque molécule a une agitation propre</b> : certaines vont plus vite que d'autres. La température mesure <b>l'agitation moyenne</b> des molécules." },
  { t:"pause", q:"Que mesure exactement la température : l'agitation d'une molécule ou l'agitation moyenne ?", a:"L'agitation moyenne des molécules.", s:"Fiche S2-18, Rappel" },
  { t:"tip", h:"Phrase-modèle : « La température mesure l'agitation des molécules ; elle se mesure avec un thermomètre, en degrés Celsius (°C). » Ne mélange pas les outils : thermomètre (température), baromètre (pression), balance (masse)." },
  { t:"see", ids:["O8","O9","O10A"] },
  { t:"src", h:"Résumé théorique (Notion de température) · fiche S2-18 (Rappel)" },
]},

/* ---------------- O8 ---------------- */
{ id:"O8", ch:"T", titre:"Le zéro absolu", court:"−273 °C : les molécules sont quasi immobiles",
  obj:"Expliquer le zéro absolu et donner sa température.",
  pre:[{ q:"À quelle température se situe le zéro absolu ?", a:"À −273 °C (avec le signe moins).", s:"Feuille d'objectifs, note « −273 » · résumé théorique" }, { q:"Au zéro absolu, que font les molécules ?", a:"Elles sont quasi immobiles.", s:"Résumé théorique, Notion de température" }],
  blank:{ consigne:"Écris en une phrase ce qu'est le zéro absolu et donne sa température.", points:["Le zéro absolu est la température à laquelle les molécules sont quasi immobiles", "Il se situe à −273 °C"], s:"Résumé théorique, Notion de température · feuille d'objectifs" },
  blocks:[
  { t:"html", s:"Résumé théorique, Notion de température · feuille d'objectifs (note « zéro absolu −273 »)", h:rdef("Zéro absolu", "La température à laquelle les molécules sont <b>quasi immobiles</b>. Le zéro absolu se situe à <b>−273 °C</b>.") },
  { t:"p", s:"Résumé théorique, Notion de température", h:"C'est la suite logique de la définition de la température : moins les molécules s'agitent, plus la température chute. Au zéro absolu, elles ne s'agitent <b>presque plus du tout</b>." },
  { t:"mine", s:"Résumé théorique (« 273 ») · feuille d'objectifs (« −273 »)", titre:"Attention au signe", items:["Dans ton résumé, tu as écrit « 273 » sans le signe moins : c'est −273 °C, bien en dessous de 0 °C."] },
  { t:"pause", q:"Pourquoi le zéro absolu est-il la température la plus basse dont parle ton cours ?", a:"Parce que les molécules y sont quasi immobiles : leur agitation est presque nulle.", s:"Résumé théorique, Notion de température" },
  { t:"tip", h:"Phrase-modèle : « Le zéro absolu est la température à laquelle les molécules sont quasi immobiles ; il se situe à −273 °C. »" },
  { t:"see", ids:["O7"] },
  { t:"src", h:"Résumé théorique (Notion de température) · feuille d'objectifs" },
]},

/* ---------------- O9 ---------------- */
{ id:"O9", ch:"T", titre:"La pression d'un gaz", court:"Les chocs des molécules sur une surface ; pascal (Pa) ; baromètre",
  obj:"Définir la pression d'un gaz à l'aide du modèle moléculaire, citer son unité (Pa) et son outil de mesure.",
  pre:[{ q:"D'où vient la pression d'un gaz, à l'échelle moléculaire ?", a:"Des chocs des molécules du gaz sur une surface.", s:"Fiche S2-13, « Je retiens » · résumé théorique, Pression" }, { q:"Sous la cloche à vide, pourquoi le bouchon saute-t-il ?", a:"La pompe retire l'air : la pression autour diminue, alors qu'elle reste la même à l'intérieur.", s:"Fiche S2-13, « Je retiens »" }],
  blank:{ consigne:"Écris la définition de la pression, ce dont elle dépend, son unité et son outil, puis explique la cloche à vide aux deux échelles.", points:["La pression d'un gaz est associée aux chocs des molécules du gaz sur une surface", "Elle dépend de la densité du gaz et de sa température", "Unité : le pascal (Pa) ; outil : le baromètre", "Humaine : la pompe retire l'air, la pression autour de l'erlenmeyer diminue, elle reste la même à l'intérieur, le bouchon saute", "Moléculaire : les chocs des molécules de l'intérieur poussent le bouchon vers l'extérieur"], s:"Résumé théorique, Pression · fiche S2-13" },
  blocks:[
  { t:"html", s:"Résumé théorique, Pression · fiche S2-13, « Je retiens »", h:rdef("Pression d'un gaz", "Grandeur associée aux <b>chocs des molécules</b> du gaz <b>sur une surface</b>. Elle dépend de la <b>densité</b> du gaz et de sa <b>température</b>. L'unité de mesure de la pression est le <b>pascal (Pa)</b>. La pression se mesure à l'aide d'un <b>baromètre</b>.") },
  { t:"pause", q:"Quelle est l'unité de la pression, et avec quel outil la mesure-t-on ?", a:"Le pascal (Pa), avec un baromètre.", s:"Résumé théorique, Pression" },
  { t:"h3", h:"L'expérience de la cloche à vide" },
  { t:"p", s:"Fiche S2-12, La situation", h:"Un récipient (un erlenmeyer) fermé par un bouchon est placé sous une <b>cloche à vide</b>, étanche à l'air. La <b>pompe</b> retire, par l'orifice à la base du plateau, l'air emprisonné sous la cloche. Le bouchon finit par sauter." },
  { t:"html", s:"Fiche S2-13, « Je retiens » · ta réponse à l'échelle humaine", h:deux("La pompe retire l'air : la pression autour de l'erlenmeyer <b>diminue</b>, alors qu'elle <b>reste la même à l'intérieur</b>. Le bouchon saute.", "Les <b>chocs des molécules de l'intérieur</b> vers l'extérieur poussent le bouchon vers l'extérieur, qui finit par sauter.") },
  { t:"pause", q:"Dans la cloche à vide, la pression change-t-elle à l'intérieur de l'erlenmeyer ?", a:"Non : elle reste la même à l'intérieur ; c'est la pression autour qui diminue.", s:"Fiche S2-13, « Je retiens »" },
  { t:"tip", h:"Phrase-modèle : « La pression d'un gaz est due aux chocs de ses molécules sur une surface ; elle se mesure en pascals (Pa) avec un baromètre. » Pour la cloche, compare toujours l'intérieur et l'extérieur : c'est la différence qui fait sauter le bouchon." },
  { t:"see", ids:["O10B","O7"] },
  { t:"src", h:"Résumé théorique (Pression) · fiches S2-12 et S2-13" },
]},

/* ---------------- O10A ---------------- */
{ id:"O10A", ch:"X", titre:"La dilatation", court:"Chauffé, un objet prend plus de place : ses molécules s'éloignent",
  obj:"À l'aide du modèle moléculaire : a. Expliquer la dilatation des solides et des liquides lorsqu'on les chauffe.",
  pre:[{ q:"Une boule en acier chauffée passe-t-elle encore dans l'anneau ?", a:"Non : son volume a augmenté.", s:"Fiche S2-19, « Je retiens »" }, { q:"Dans la dilatation, qu'est-ce qui grandit : les molécules ou la distance entre elles ?", a:"La distance entre elles. Ce n'est pas la taille des molécules qui augmente.", s:"Résumé théorique, Dilatation" }],
  blank:{ consigne:"Explique la dilatation de la boule en acier aux deux échelles, puis donne le nom du phénomène inverse.", points:["Humaine : la température de la boule augmente ; elle ne passe plus à travers l'anneau car son volume a augmenté : c'est la dilatation", "Moléculaire : chaque molécule vibre plus, la distance entre les molécules grandit, elles occupent un plus grand espace", "Ce n'est pas la taille des molécules qui augmente, seulement la distance qui les sépare", "Phénomène inverse : la contraction, quand l'objet se refroidit"], s:"Fiche S2-19, « Je retiens » · résumé théorique, Dilatation" },
  blocks:[
  { t:"html", s:"Résumé théorique, Dilatation (« volume » barré, remplacé par « température »)", h:rdef("Dilatation", "L'augmentation de la <b>température</b> d'un objet s'accompagne d'une augmentation du <b>volume</b>. Ce phénomène porte le nom de dilatation. Le phénomène inverse porte le nom de <b>contraction</b> et a lieu lorsque l'objet se <b>refroidit</b>.") },
  { t:"pause", q:"Comment s'appelle le contraire de la dilatation, et quand a-t-il lieu ?", a:"La contraction, quand l'objet se refroidit.", s:"Résumé théorique, Dilatation" },
  { t:"h3", h:"La boule en acier" },
  { t:"html", s:"Fiche S2-19, « Je retiens »", h:deux("La température de la boule augmente. Elle <b>ne passe plus à travers l'anneau</b>, car son <b>volume</b> a aussi augmenté. Ce phénomène se nomme <b>dilatation</b>.", "Lorsque la boule se réchauffe, chaque molécule <b>vibre plus</b>. <b>La distance entre les molécules grandit.</b> Les nombreuses molécules composant la boule occupent donc un plus grand espace.") },
  { t:"svg", k:"dilat", titre:"Froid, puis chaud : même molécules, plus d'espace", alt:"À gauche, douze molécules serrées : l'objet est froid. À droite, les mêmes douze molécules, de la même taille, plus éloignées et entourées d'un petit cercle qui montre qu'elles vibrent plus : l'objet est chaud.", s:"Résumé théorique, Dilatation (dessin froid / chaud)" },
  { t:"p", s:"Résumé théorique, Dilatation (phrase avec un point d'exclamation)", h:"<b>Ce n'est pas la taille des molécules qui augmente, mais uniquement la distance qui les sépare !</b> Ton résumé dit « un objet » : la règle vaut pour les solides comme pour les liquides." },
  { t:"pause", q:"Pourquoi le volume de la boule augmente-t-il, à l'échelle moléculaire ?", a:"Chaque molécule vibre plus, la distance entre elles grandit, donc elles occupent plus d'espace.", s:"Fiche S2-19, « Je retiens »" },
  { t:"tip", h:"Phrase-modèle : « Quand on chauffe un objet, ses molécules s'agitent plus et s'éloignent les unes des autres : elles occupent plus de place, le volume augmente. C'est la dilatation. » Ne dis jamais que les molécules « grossissent »." },
  { t:"see", ids:["O7","O4","O11"] },
  { t:"src", h:"Résumé théorique (Dilatation) · fiches S2-18 et S2-19" },
]},

/* ---------------- O10B ---------------- */
{ id:"O10B", ch:"X", titre:"La pression d'un gaz chauffé ou comprimé", court:"Plus de chocs, plus forts ou plus fréquents : la pression monte",
  obj:"À l'aide du modèle moléculaire : b. Expliquer l'augmentation de la pression d'un gaz lorsqu'on le chauffe ou lorsqu'on le comprime.",
  pre:[{ q:"On chauffe un tube fermé par un bouchon de patate : que fait le bouchon ?", a:"Il finit par sauter : la pression de l'air dans le tube augmente.", s:"Fiche S2-15, « Je retiens »" }, { q:"Quand on comprime un gaz, les molécules vont-elles plus vite ?", a:"Non : elles vont toujours aussi vite, mais dans un espace plus petit.", s:"Résumé théorique, gaz comprimé" }],
  blank:{ consigne:"Explique deux cas où la pression d'un gaz augmente : quand on le chauffe, quand on le comprime.", points:["Gaz chauffé : la vitesse des molécules augmente, la violence et la fréquence des chocs sur les parois augmentent : la pression augmente", "Bouchon de patate : la température de l'air dans le tube augmente, la pression augmente, le bouchon saute ; les molécules vont plus vite et frappent plus fort et plus souvent les parois", "Gaz comprimé : le volume diminue, les molécules sont aussi nombreuses et aussi rapides, mais dans un espace plus petit : les chocs sont plus fréquents, la pression augmente"], s:"Résumé théorique, gaz chauffé et gaz comprimé · fiche S2-15" },
  blocks:[
  { t:"h3", h:"1. On chauffe le gaz" },
  { t:"p", s:"Résumé théorique, gaz chauffé", h:"L'augmentation de la température d'un gaz emprisonné dans un récipient entraîne une <b>augmentation de sa pression</b>. En effet, l'augmentation de la <b>vitesse</b> des molécules a pour effet d'augmenter <b>la violence et la fréquence des chocs</b> sur les parois du récipient." },
  { t:"html", s:"Fiche S2-14, La situation · fiche S2-15, « Je retiens » · résumé théorique, gaz chauffé", h:deux("Le tube (et l'air qu'il contient) est chauffé : la température de l'air à l'intérieur augmente, donc <b>la pression de l'air dans le tube augmente</b>. Le bouchon de patate finit par sauter.", "Les molécules d'air dans le tube <b>vont plus vite</b> et <b>frappent plus fortement et plus fréquemment</b> les parois.") },
  { t:"pause", q:"Quand on chauffe un gaz enfermé, quelles sont les deux choses qui changent pour les chocs ?", a:"Leur violence et leur fréquence augmentent.", s:"Résumé théorique, gaz chauffé" },
  { t:"h3", h:"2. On comprime le gaz" },
  { t:"p", s:"Résumé théorique, gaz comprimé", h:"Quand on comprime un gaz, son volume <b>diminue</b>. Les molécules sont <b>toujours aussi nombreuses</b> et se déplacent <b>toujours aussi vite</b>, mais comme elles se déplacent dans un <b>espace plus petit</b>, les chocs avec les parois sont <b>plus fréquents</b>. Ainsi, la pression augmente." },
  { t:"svg", k:"compr", titre:"Même nombre de molécules, espace plus petit", alt:"En haut, dix molécules dans un grand cylindre. En bas, le piston est enfoncé : les mêmes dix molécules dans un petit cylindre ; elles touchent plus souvent les parois.", s:"Résumé théorique, gaz comprimé (dessins du piston)" },
  { t:"pause", q:"Comprimé ou chauffé : dans quel cas les chocs deviennent-ils aussi plus violents ?", a:"Quand on chauffe : les molécules vont plus vite. Quand on comprime, elles vont aussi vite, les chocs sont seulement plus fréquents.", s:"Résumé théorique, gaz chauffé et gaz comprimé" },
  { t:"tip", h:"Phrase-modèle : « Chauffé, le gaz a des molécules plus rapides : chocs plus violents et plus fréquents. Comprimé, ses molécules ont moins de place : chocs plus fréquents. Dans les deux cas, la pression augmente. »" },
  { t:"see", ids:["O9","O6","O11"] },
  { t:"src", h:"Résumé théorique (gaz chauffé, gaz comprimé) · fiches S2-14 et S2-15" },
]},

/* ---------------- O10C ---------------- */
{ id:"O10C", ch:"X", titre:"La conduction thermique", court:"La chaleur passe de proche en proche, par les chocs des molécules",
  obj:"À l'aide du modèle moléculaire : c. Expliquer la transmission de la chaleur (conduction) dans les solides.",
  pre:[{ q:"Une cuillère tenue au-dessus d'une flamme : est-ce la flamme qui traverse le métal ?", a:"Non : c'est l'agitation des molécules qui se transmet de proche en proche. C'est la conduction thermique.", s:"Fiche S2-17, « Je retiens »" }, { q:"À l'occasion de quoi l'agitation se transmet-elle d'une molécule à l'autre ?", a:"À l'occasion de leurs chocs.", s:"Résumé théorique, Conduction thermique" }],
  blank:{ consigne:"Explique la cuillère chauffée aux deux échelles et donne le nom du phénomène.", points:["Humaine : la flamme chauffe le bout de la cuillère ; l'augmentation de la température progresse de l'extrémité chauffée à l'autre", "Ce phénomène s'appelle la conduction thermique : la transmission de proche en proche de la chaleur", "Moléculaire : la flamme augmente l'agitation des molécules du bout ; elles transmettent leur agitation de proche en proche, par leurs chocs"], s:"Fiche S2-17 · résumé théorique, Conduction thermique" },
  blocks:[
  { t:"html", s:"Résumé théorique, Conduction thermique", h:rdef("Conduction thermique", "On appelle « conduction thermique » la <b>transmission de proche en proche de la chaleur</b>. L'agitation des molécules se transmet de proche en proche à l'occasion de leurs <b>chocs</b>.") },
  { t:"html", s:"Fiche S2-17, « Je retiens »", h:deux("La flamme chauffe le bout de la cuillère. L'augmentation de la température <b>progresse de l'extrémité chauffée à l'autre</b>. On appelle ce phénomène la conduction thermique.", "La flamme <b>augmente l'agitation</b> des molécules du bout de la cuillère, qui transmettent ensuite leur agitation <b>de proche en proche</b> en se tapant (leurs chocs).") },
  { t:"pause", q:"Par quel moyen l'agitation passe-t-elle d'une molécule à sa voisine ?", a:"Par leurs chocs : elles se tapent de proche en proche.", s:"Fiche S2-17 · résumé théorique" },
  { t:"html", s:"Fiche S2-17, « Je retiens »", h:chain([["Le bout chauffe","la flamme augmente l'agitation des molécules du bout","var(--r2)"],["Les voisines","elles reçoivent des chocs et s'agitent plus à leur tour","var(--r4)"],["Le manche","l'agitation arrive de proche en proche jusqu'à l'autre extrémité","var(--r1)"]]) },
  { t:"mine", s:"Fiche S2-17, tes réponses corrigées", titre:"À ne plus écrire", items:["« La flamme traverse le bout de cuivre et sort de l'autre côté » : la flamme ne traverse rien, c'est l'agitation qui passe d'une molécule à l'autre."] },
  { t:"pause", q:"Pourquoi le manche d'une cuillère trempée dans la soupe chauffe-t-il ?", a:"Par conduction thermique : l'agitation des molécules se transmet de proche en proche jusqu'au manche.", s:"Fiche S2-17, titre et « Je retiens »" },
  { t:"tip", h:"Phrase-modèle : « La flamme augmente l'agitation des molécules du bout ; par leurs chocs, elles la transmettent de proche en proche jusqu'à l'autre extrémité : c'est la conduction thermique. »" },
  { t:"see", ids:["O7","O11"] },
  { t:"src", h:"Résumé théorique (Conduction thermique) · fiche S2-17" },
]},

/* ---------------- O10D ---------------- */
{ id:"O10D", ch:"X", titre:"La diffusion dans un liquide", court:"Plus le liquide est chaud, plus le colorant se diffuse vite",
  obj:"À l'aide du modèle moléculaire : d. Expliquer l'influence de la température sur la diffusion d'un liquide dans un autre.",
  pre:[{ q:"Une goutte de colorant dans l'eau froide et dans l'eau bouillante : où se mélange-t-elle le plus vite ?", a:"Dans l'eau chaude (bouillante).", s:"Fiche S2-16" }, { q:"Pourquoi un liquide peut-il se diffuser dans un autre ?", a:"Leurs molécules sont faiblement liées : elles glissent les unes sur les autres et s'éparpillent.", s:"Résumé théorique, Diffusion des liquides" }],
  blank:{ consigne:"Explique l'expérience du colorant aux deux échelles, avec le rôle des liaisons et de la température.", points:["La diffusion s'explique par les faibles liaisons entre les molécules des liquides : elles glissent les unes sur les autres et s'éparpillent", "Humaine : plus la température du liquide est élevée, plus la diffusion du colorant est rapide", "Moléculaire : les molécules du liquide chaud sont plus agitées ; elles éparpillent plus vite les molécules du colorant"], s:"Fiche S2-16, « Je retiens » · résumé théorique, Diffusion des liquides" },
  blocks:[
  { t:"html", s:"Résumé théorique, Diffusion des liquides (« séparent » barré, remplacé par « glissent »)", h:rdef("Diffusion d'un liquide dans un autre", "Elle s'explique par les <b>faibles liaisons</b> entre les molécules des liquides, qui permettent qu'elles <b>glissent</b> les unes sur les autres et <b>s'éparpillent</b>. Plus la température d'un liquide est élevée, plus la diffusion est <b>rapide</b>.") },
  { t:"pause", q:"Quelle propriété des molécules d'un liquide permet la diffusion ?", a:"Elles sont faiblement liées : elles peuvent glisser les unes sur les autres et s'éparpiller.", s:"Résumé théorique, Diffusion des liquides" },
  { t:"h3", h:"La goutte de colorant" },
  { t:"p", s:"Fiche S2-16, La situation", h:"Deux verres : l'un contient de l'eau <b>froide</b>, l'autre de l'eau <b>bouillante</b>. On met une goutte de colorant dans chaque verre." },
  { t:"html", s:"Fiche S2-16, « Je retiens » · résumé théorique, Diffusion des liquides", h:deux("Plus la température du liquide est élevée, <b>plus la diffusion du colorant est rapide</b>.", "Les molécules du liquide chaud sont <b>plus agitées</b> et éparpillent plus rapidement les molécules du colorant.") },
  { t:"pause", q:"Pourquoi le colorant se diffuse-t-il plus vite dans l'eau chaude ?", a:"Les molécules de l'eau chaude sont plus agitées : elles éparpillent plus vite les molécules du colorant.", s:"Fiche S2-16, « Je retiens »" },
  { t:"tip", h:"Phrase-modèle : « Les molécules d'un liquide sont faiblement liées : elles glissent et s'éparpillent. Dans un liquide chaud, elles sont plus agitées, donc la diffusion est plus rapide. » Le mot à utiliser est « diffusion »." },
  { t:"see", ids:["O5","O7","O11"] },
  { t:"src", h:"Résumé théorique (Diffusion des liquides) · fiche S2-16" },
]},

/* ---------------- O11 ---------------- */
{ id:"O11", ch:"X", titre:"Des exemples de la vie quotidienne", court:"La soupe, le ballon, la bouteille au congélateur…",
  obj:"Donner des exemples de la vie quotidienne illustrant les phénomènes ci-dessus.",
  pre:[{ q:"Pourquoi le manche de ta cuillère chauffe-t-il quand elle est dans la soupe ?", a:"Par conduction thermique.", s:"Fiche S2-17, titre" }, { q:"Pourquoi un ballon de basket mou rebondit-il mieux une fois gonflé, et pèse-t-il alors plus lourd ?", a:"On ajoute de l'air ; l'air pèse, donc le ballon est plus lourd.", s:"Fiche S2-5" }],
  blank:{ consigne:"Pour chaque phénomène (masse de l'air, masse et congélation, dilatation, pression, conduction, diffusion), écris un exemple tiré de tes fiches.", points:["Masse de l'air : le ballon de basket gonflé est plus lourd", "La masse ne change pas : la bouteille sortie du congélateur pèse autant", "Dilatation : la boule en acier chauffée ne passe plus dans l'anneau", "Pression d'un gaz chauffé : le bouchon de patate saute ; le ballon est plus gonflé au chaud qu'au froid", "Conduction : le manche de la cuillère chauffe dans la soupe", "Diffusion : le colorant se mélange plus vite dans l'eau chaude"], s:"Fiches S2-4, S2-5, S2-15, S2-16, S2-17, S2-19 · résumé théorique" },
  blocks:[
  { t:"p", s:"Feuille d'objectifs, objectif 11", h:"Ton cours donne ces exemples. Pour chacun, sache nommer le phénomène, puis l'expliquer avec les molécules (voir le chapitre indiqué)." },
  { t:"html", s:"Fiches S2-4, S2-5, S2-15, S2-16, S2-17, S2-19 · résumé théorique, gaz chauffé (images a et b)", h:tbl(["Exemple","Phénomène · chapitre"], [
    ["Le manche d'une cuillère trempée dans la soupe chauffe","conduction thermique · <button class=\"back\" data-act=\"page\" data-v=\"O10C\" style=\"display:inline\">10c</button>"],
    ["Une goutte de colorant se mélange plus vite dans l'eau chaude","diffusion · <button class=\"back\" data-act=\"page\" data-v=\"O10D\" style=\"display:inline\">10d</button>"],
    ["Une boule en acier chauffée ne passe plus dans l'anneau","dilatation · <button class=\"back\" data-act=\"page\" data-v=\"O10A\" style=\"display:inline\">10a</button>"],
    ["Le bouchon d'un tube chauffé saute","pression d'un gaz chauffé · <button class=\"back\" data-act=\"page\" data-v=\"O10B\" style=\"display:inline\">10b</button>"],
    ["Un ballon dans le froid est ratatiné, au chaud il est bien rond","pression d'un gaz chauffé · <button class=\"back\" data-act=\"page\" data-v=\"O10B\" style=\"display:inline\">10b</button>"],
    ["Un ballon de basket gonflé pèse plus lourd","l'air pèse, c'est de la matière · <button class=\"back\" data-act=\"page\" data-v=\"O3\" style=\"display:inline\">O3</button>"],
    ["Une bouteille d'eau sortie du congélateur pèse autant","la masse ne dépend pas des transformations · <button class=\"back\" data-act=\"page\" data-v=\"O1\" style=\"display:inline\">O1</button>"]]) },
  { t:"pause", q:"Quel phénomène explique que la boule en acier chauffée ne passe plus dans l'anneau ?", a:"La dilatation.", s:"Fiche S2-19" },
  { t:"p", s:"Résumé théorique, gaz chauffé (images a et b)", h:"Les deux images de ton résumé montrent le même ballon : dans le froid, ses molécules ont des flèches courtes et le ballon est ratatiné ; au chaud, les flèches sont longues et le ballon est bien rond. Plus d'agitation, plus de chocs sur la paroi : plus de pression." },
  { t:"pause", q:"Pourquoi le ballon est-il plus gonflé au chaud qu'au froid ?", a:"Au chaud, les molécules vont plus vite : les chocs sur la paroi sont plus violents et plus fréquents, la pression augmente.", s:"Résumé théorique, gaz chauffé" },
  { t:"tip", h:"À l'épreuve, pour un exemple : 1. nomme le phénomène ; 2. dis ce qu'on voit (échelle humaine) ; 3. dis ce que font les molécules (échelle moléculaire). Exemple : « Conduction : le manche chauffe ; l'agitation des molécules passe de proche en proche par leurs chocs. »" },
  { t:"see", ids:["O10A","O10B","O10C","O10D"] },
  { t:"src", h:"Fiches S2-4, S2-5, S2-15, S2-16, S2-17, S2-19 · résumé théorique" },
]},
];

const LEXIQUE = [
  { t:"Masse", h:"La quantité de matière qui compose un objet ; balance ; kilogramme (kg).", ref:"O1", lab:"Résumé théorique", book:true, s:"Résumé théorique, Masse et volume" },
  { t:"Matière", h:"Toute chose qui pèse.", ref:"O1", lab:"Résumé théorique", book:true, s:"Résumé théorique, Masse et volume" },
  { t:"Volume", h:"La place qu'un objet occupe dans l'espace ; mètre cube (m³).", ref:"O2", lab:"Résumé théorique", book:true, s:"Résumé théorique, Masse et volume" },
  { t:"Air sec", h:"Un mélange : 78 % d'azote, 21 % d'oxygène, 1 % d'autres gaz (dont le gaz carbonique).", ref:"O3", lab:"Résumé théorique", book:true, s:"Résumé théorique, Air · fiche S2-5" },
  { t:"Molécule", h:"Dans le modèle, elle ne se déforme pas et garde le même volume.", ref:"O4", lab:"Résumé théorique", book:true, s:"Fiche S2-7 · résumé théorique" },
  { t:"Forme propre", h:"Ne prend pas la forme du récipient (le solide).", ref:"O6", lab:"Résumé théorique", book:true, s:"Résumé théorique, Propriétés des états" },
  { t:"Volume propre", h:"Le volume ne change pas en fonction du récipient (solide, liquide).", ref:"O6", lab:"Ton dossier", s:"Fiche S2-8 · résumé théorique" },
  { t:"Compressible", h:"Qu'on peut comprimer : le gaz, car ses molécules sont éloignées.", ref:"O6", lab:"Ton dossier", s:"Fiche S2-7, « Je retiens »" },
  { t:"Température", h:"Une mesure de l'agitation des molécules ; thermomètre ; degrés (°C).", ref:"O7", lab:"Résumé théorique", book:true, s:"Résumé théorique, Notion de température" },
  { t:"Zéro absolu", h:"La température à laquelle les molécules sont quasi immobiles : −273 °C.", ref:"O8", lab:"Résumé théorique", book:true, s:"Résumé théorique · feuille d'objectifs" },
  { t:"Pression d'un gaz", h:"Associée aux chocs des molécules du gaz sur une surface ; pascal (Pa) ; baromètre.", ref:"O9", lab:"Résumé théorique", book:true, s:"Résumé théorique, Pression" },
  { t:"Dilatation", h:"L'augmentation du volume d'un objet quand sa température augmente.", ref:"O10A", lab:"Résumé théorique", book:true, s:"Résumé théorique, Dilatation" },
  { t:"Contraction", h:"Le phénomène inverse de la dilatation, quand l'objet se refroidit.", ref:"O10A", lab:"Résumé théorique", book:true, s:"Résumé théorique, Dilatation" },
  { t:"Conduction thermique", h:"La transmission de proche en proche de la chaleur, par les chocs des molécules.", ref:"O10C", lab:"Résumé théorique", book:true, s:"Résumé théorique, Conduction thermique" },
  { t:"Diffusion", h:"Un liquide qui s'éparpille dans un autre ; plus rapide quand la température est plus élevée.", ref:"O10D", lab:"Résumé théorique", book:true, s:"Résumé théorique, Diffusion des liquides" },
];

/* ============================================================
   PAQUETS — un paquet par objectif (code = id du chapitre).
   ============================================================ */
const ETATS = ["l'état solide","l'état liquide","l'état gazeux"];
const PHEN = ["la dilatation","l'augmentation de la pression d'un gaz","la conduction thermique","la diffusion"];
const R_MV = "résumé théorique, Masse et volume", R_ET = "résumé théorique, États de la matière", R_PR = "résumé théorique, Propriétés des états";
const R_TP = "résumé théorique, Notion de température", R_PS = "résumé théorique, Pression", R_CH = "résumé théorique, gaz chauffé", R_CO = "résumé théorique, gaz comprimé";
const R_DI = "résumé théorique, Dilatation", R_CD = "résumé théorique, Conduction thermique", R_DF = "résumé théorique, Diffusion des liquides";
const DECKS = [
  { key:"masse", code:"O1", title:"La masse", src:"résumé théorique · fiches S2-3, S2-4", items:[
    { front:"Que représente la masse d'un objet ?", back:["la quantité de matière qui le compose","la quantité de matière","quantité de matière"], wrong:["les molécules qui le composent","la place qu'il occupe dans l'espace","sa température"], ans:"La masse d'un objet représente la quantité de matière qui le compose. Tu avais d'abord écrit « les molécules » dans ton résumé.", src:R_MV },
    { front:"En physique, comment appelle-t-on toute chose qui pèse ?", back:["de la matière","la matière","matière"], wrong:["de la masse","du volume","de la pression"], ans:"Toute chose qui pèse est de la matière (et pas « de la masse », comme tu l'avais écrit).", src:R_MV },
    { front:"Avec quel outil mesure-t-on la masse ?", back:["une balance","balance","avec une balance"], wrong:["un thermomètre","un baromètre","une règle"], ans:"Avec une balance.", src:R_MV },
    { front:"Quelle est l'unité de la masse dans le Système international ?", back:["le kilogramme","kilogramme","kg"], wrong:["le gramme","le mètre cube","le pascal"], ans:"Le kilogramme (kg). En classe, vous avez mesuré en grammes, mais l'unité de base du Système international est le kilogramme.", src:R_MV + " · fiche S2-4" },
    { front:"Quel est le symbole du kilogramme ?", back:["kg"], wrong:["g","m³","Pa"], ans:"kg.", src:R_MV },
    { front:"La masse et le volume sont-ils la même grandeur ?", back:["Non : ce sont deux grandeurs physiques distinctes"], opts:["Oui : c'est la même chose","Non : ce sont deux grandeurs physiques distinctes"], keepOrder:true, ans:"Non : la masse et le volume sont deux grandeurs physiques distinctes.", src:R_MV },
    { front:"Deux bouteilles identiques avec la même quantité d'eau, l'une sort du congélateur : laquelle pèse le plus ?", back:["Elles pèsent la même chose"], opts:["La bouteille gelée","La bouteille à température ambiante","Elles pèsent la même chose"], keepOrder:true, ans:"Elles pèsent la même chose, car elles contiennent la même quantité d'eau. Tu avais répondu « la bouteille gelée pèse plus » : c'est le piège de cette fiche.", src:"fiche S2-4, hypothèses de la classe et « Je retiens »" },
    { front:"Pourquoi la masse est-elle une bonne grandeur pour caractériser une quantité de matière ?", back:["Elle ne dépend pas des transformations que subit la matière"], wrong:["Elle change quand on congèle l'eau","Elle dépend du niveau dans le récipient","Elle augmente quand on tasse le sable"], mcqOnly:true, ans:"Elle ne dépend pas des transformations que subit la matière (tassement du sable, congélation de l'eau, etc.).", src:"fiche S2-4, « Je retiens »" },
    { front:"Le niveau de sable est plus haut dans un des deux cylindres : comment savoir vraiment lequel contient le plus de sable ?", back:["En mesurant la masse avec une balance"], wrong:["En comparant le niveau du sable","En mesurant la température","En regardant la couleur du sable"], mcqOnly:true, ans:"« Pour connaître la vérité, je dois connaître la masse à l'aide d'une balance. »", src:"fiche S2-3, ta réponse corrigée" },
    { front:"En quelle unité avez-vous mesuré la masse en classe ?", back:["en grammes (g)"], opts:["en grammes (g)","en mètres cubes (m³)","en pascals (Pa)"], keepOrder:true, ans:"En grammes (g), à l'aide d'une balance.", src:"fiche S2-4, « Je retiens »" },
  ]},
  { key:"volume", code:"O2", title:"Le volume", src:"résumé théorique", items:[
    { front:"Que représente le volume d'un objet ?", back:["la place qu'il occupe dans l'espace","la place qu'il occupe","sa place dans l'espace"], wrong:["la quantité de matière qui le compose","sa masse","l'agitation de ses molécules"], ans:"Le volume d'un objet représente la place qu'il occupe dans l'espace. Tu avais écrit « sa taille » : ce mot a été barré.", src:R_MV },
    { front:"Quelle est l'unité du volume dans le Système international ?", back:["le mètre cube","mètre cube","m³","m3"], wrong:["le kilogramme","le pascal","le degré"], ans:"Le mètre cube (m³).", src:R_MV },
    { front:"Quel est le symbole du mètre cube ?", back:["m³","m3"], wrong:["kg","m²","Pa"], ans:"m³ (avec un petit 3).", src:R_MV },
    { front:"Quelle grandeur dit quelle place un objet occupe dans l'espace ?", back:["le volume","volume"], wrong:["la masse","la température","la pression"], ans:"Le volume.", src:R_MV },
    { front:"Quand on comprime un gaz, que devient son volume ?", back:["il diminue"], opts:["il augmente","il diminue","il reste le même"], keepOrder:true, ans:"Il diminue.", src:R_CO },
  ]},
  { key:"air", code:"O3", title:"L'air", src:"fiche S2-5 · résumé théorique", items:[
    { front:"L'air sec est-il un seul gaz ou un mélange ?", back:["un mélange"], opts:["un seul gaz","un mélange"], keepOrder:true, ans:"Un mélange (tu avais écrit « gaz », corrigé en « mélange »).", src:"résumé théorique, Air" },
    { front:"Quel gaz forme 78 % de l'air sec ?", back:["l'azote","azote"], wrong:["l'oxygène","le gaz carbonique","la vapeur d'eau"], ans:"L'azote : 78 %.", src:"résumé théorique, Air · fiche S2-5" },
    { front:"Quel gaz forme 21 % de l'air sec ?", back:["l'oxygène","oxygène"], wrong:["l'azote","le gaz carbonique","la vapeur d'eau"], ans:"L'oxygène : 21 %.", src:"résumé théorique, Air · fiche S2-5" },
    { front:"Quelles sont les proportions d'azote et d'oxygène dans l'air sec ?", back:["78 % d'azote et 21 % d'oxygène"], wrong:["21 % d'azote et 78 % d'oxygène","50 % d'azote et 50 % d'oxygène","78 % d'oxygène et 1 % d'azote"], mcqOnly:true, ans:"78 % d'azote, 21 % d'oxygène, et 1 % d'autres gaz.", src:"résumé théorique, Air" },
    { front:"Que forme le dernier 1 % de l'air sec ?", back:["D'autres gaz, dont le gaz carbonique"], wrong:["De la poussière","De l'eau liquide","De l'azote"], mcqOnly:true, ans:"1 % d'autres gaz, dont le gaz carbonique.", src:"fiche S2-5, « Je retiens »" },
    { front:"Que contient souvent l'air, en plus de ses gaz ?", back:["de la vapeur d'eau","vapeur d'eau"], wrong:["du sable","de l'huile","du sel"], ans:"De la vapeur d'eau.", src:"fiche S2-5, « Je retiens »" },
    { front:"L'air est-il de la matière, et pourquoi ?", back:["Oui, car il pèse"], wrong:["Non, car on ne le voit pas","Non, car il n'a pas de masse","Oui, car il prend la forme du récipient"], mcqOnly:true, ans:"Ajouter de l'air ou enlever de l'air change la masse : l'air est pesant. Comme l'air pèse, il est une matière.", src:"fiche S2-5, « Je retiens »" },
    { front:"Si on gonfle un ballon de basket mou, sera-t-il plus léger, plus lourd ou de même masse ?", back:["plus lourd"], opts:["plus léger","plus lourd","de même masse"], keepOrder:true, ans:"Plus lourd : ajouter de l'air change la masse. Tu avais d'abord écrit « léger », puis corrigé en « lourd ».", src:"fiche S2-5" },
    { front:"Quelle expérience montre que l'air pèse ?", back:["Peser le ballon, le gonfler, le peser à nouveau"], wrong:["Mesurer la température du ballon","Faire rebondir le ballon","Mesurer la taille du ballon avec une règle"], mcqOnly:true, ans:"Peser le ballon, le gonfler, peser à nouveau le ballon (aussi : le ballon en verre indéformable et la pompe aspirante).", src:"fiche S2-5, expériences" },
    { front:"Combien pèse environ un litre d'air non comprimé ?", back:["environ 1,3 g"], opts:["0 g","environ 1,3 g","environ 1,3 kg"], keepOrder:true, ans:"Environ 1,3 g.", src:"fiche S2-5, « Je retiens »" },
    { front:"L'air ne pèse-t-il que lorsqu'il est comprimé ?", back:["Non : il est pesant, qu'il soit comprimé ou non"], wrong:["Oui : seulement comprimé","Oui : seulement quand il est chaud","Non : il ne pèse jamais"], mcqOnly:true, ans:"L'air est pesant, qu'il soit comprimé ou non.", src:"fiche S2-5, « Je retiens »" },
  ]},
  { key:"dessin", code:"O4", title:"Dessiner les trois états", src:"feuille d'objectifs · fiche S2-7", items:[
    { front:"Dans quel état les molécules sont-elles rangées en ordre et serrées ?", back:["l'état solide"], opts:ETATS, keepOrder:true, ans:"Dans l'état solide : les molécules sont disposées de manière parfaitement ordonnée et rapprochées.", src:R_ET + " · dessins de la feuille d'objectifs" },
    { front:"Dans quel état les molécules sont-elles serrées, mais en désordre ?", back:["l'état liquide"], opts:ETATS, keepOrder:true, ans:"Dans l'état liquide : rapprochées, état non ordonné.", src:R_ET },
    { front:"Dans quel état dessine-t-on des molécules très espacées, avec des flèches dans tous les sens ?", back:["l'état gazeux"], opts:ETATS, keepOrder:true, ans:"Dans l'état gazeux : les molécules sont très espacées et se déplacent dans tous les sens.", src:R_ET },
    { front:"Dans le dessin d'un gaz comprimé, les molécules doivent-elles être plus grosses ?", back:["Non : même taille, seulement plus rapprochées"], wrong:["Oui : elles grossissent quand on comprime","Oui : elles s'aplatissent","Non : elles doivent être plus petites"], mcqOnly:true, ans:"Une molécule garde le même volume : dessine-la de la même taille, plus rapprochée. Dans ton dessin de la fiche S2-7, elles étaient plus grosses.", src:"fiche S2-7, « Je retiens »" },
    { front:"Dans le modèle moléculaire, une molécule peut-elle s'aplatir ?", back:["Non, elle ne se déforme pas"], opts:["Oui, si on la comprime","Non, elle ne se déforme pas"], keepOrder:true, ans:"Une molécule ne se déforme pas (elle ne s'aplatit pas).", src:"fiche S2-7 · " + R_ET },
    { front:"Dans le modèle moléculaire, une molécule peut-elle grossir ou maigrir ?", back:["Non, elle garde le même volume"], opts:["Oui, quand on la chauffe","Non, elle garde le même volume"], keepOrder:true, ans:"Une molécule garde le même volume : elle ne « grossit » pas et ne « maigrit » pas.", src:"fiche S2-7 · " + R_ET },
    { front:"Pourquoi dessine-t-on beaucoup d'espace entre les molécules d'un gaz ?", back:["Parce que ses molécules sont éloignées les unes des autres"], wrong:["Parce que ses molécules sont plus petites","Parce qu'il y a moins de matière dans le dessin","Parce que ses molécules sont fortement liées"], mcqOnly:true, ans:"Les molécules d'un gaz sont éloignées : il y a donc un espace entre elles.", src:"fiche S2-7, « Je retiens »" },
    { front:"Dans le dessin du liquide, comment placer les molécules ?", back:["Très rapprochées, qui se touchent, mais en désordre"], wrong:["Très espacées, avec des flèches","Rangées en lignes parfaites","Plus grosses que dans le solide"], mcqOnly:true, ans:"Rapprochées les unes des autres, état non ordonné.", src:R_ET + " · fiche S2-7" },
  ]},
  { key:"comportement", code:"O5", title:"Mouvements et liaisons", src:"résumé théorique · fiches S2-8, S2-18", items:[
    { front:"Dans un solide, comment bougent les molécules ?", back:["elles vibrent sur place","elles vibrent","vibrent sur place","elles oscillent sur place"], wrong:["elles se déplacent dans tous les sens","elles glissent les unes sur les autres","elles sont parfaitement immobiles"], ans:"Elles vibrent (oscillent) sur place. Tu avais écrit « bougent » : le mot juste est « vibrent ».", src:R_ET + " · fiche S2-18, Rappel" },
    { front:"Dans un liquide, comment bougent les molécules ?", back:["Elles vibrent et glissent les unes sur les autres"], wrong:["Elles vibrent sur place sans glisser","Elles se déplacent à très grande vitesse dans tous les sens","Elles sont immobiles"], mcqOnly:true, ans:"Les liquides sont représentés par des molécules vibrant et glissant les unes sur les autres.", src:"fiche S2-18, Rappel" },
    { front:"Dans un gaz, comment bougent les molécules ?", back:["Elles se déplacent librement, très vite, dans toutes les directions"], wrong:["Elles vibrent sur place","Elles glissent les unes sur les autres","Elles restent collées"], mcqOnly:true, ans:"Libres de se déplacer dans toutes les directions, à très grande vitesse ; elles s'entrechoquent continuellement.", src:"fiche S2-18, Rappel · " + R_ET },
    { front:"À quelle vitesse environ vont les molécules de l'air de la salle de classe ?", back:["environ 500 m/s"], opts:["environ 5 m/s","environ 50 m/s","environ 500 m/s"], keepOrder:true, ans:"Environ 500 m/s.", src:"fiche S2-18, Rappel" },
    { front:"Comment sont liées les molécules d'un solide ?", back:["fortement liées"], opts:["fortement liées","faiblement liées","pas liées"], keepOrder:true, ans:"Fortement liées.", src:R_ET },
    { front:"Comment sont liées les molécules d'un liquide ?", back:["faiblement liées"], opts:["fortement liées","faiblement liées","pas liées"], keepOrder:true, ans:"Faiblement liées : elles peuvent donc glisser les unes sur les autres. Tu avais écrit seulement « liées ».", src:R_ET },
    { front:"Comment sont liées les molécules d'un gaz ?", back:["pas liées"], opts:["fortement liées","faiblement liées","pas liées"], keepOrder:true, ans:"Pas liées : elles sont libres.", src:R_ET + " · page « Les gaz »" },
    { front:"Quel mot du résumé décrit la distance entre les molécules d'un solide ?", back:["rapprochées","rapprochées les unes des autres"], wrong:["collées","espacées","détachées"], ans:"Rapprochées les unes des autres (tu avais écrit « collées »).", src:R_ET },
    { front:"Quel mot du résumé décrit la façon dont les molécules d'un solide sont disposées ?", back:["ordonnées","parfaitement ordonnées","de manière parfaitement ordonnée"], wrong:["alignées","en désordre","espacées"], ans:"De manière parfaitement ordonnée (tu avais écrit « alignées »).", src:R_ET },
    { front:"Dans quel état les molécules forment-elles un état ordonné ?", back:["l'état solide"], opts:ETATS, keepOrder:true, ans:"Seul l'état solide est ordonné ; liquide et gaz sont des états non ordonnés.", src:R_ET },
    { front:"Quelle observation montre que les molécules d'un solide sont liées ?", back:["Un objet solide ne se désagrège pas seul au cours du temps"], wrong:["Un liquide peut former des gouttes","On peut traverser un gaz sans peine","Un liquide s'écoule"], mcqOnly:true, ans:"Un objet solide ne se désagrège pas seul au cours du temps ; son volume ne change pas selon le récipient.", src:"fiche S2-8" },
    { front:"Quelle observation montre que les molécules d'un liquide sont liées ?", back:["Un liquide peut former des gouttes"], wrong:["Un objet solide peut être saisi entièrement","Un gaz se répand partout","Un solide ne s'étale pas"], mcqOnly:true, ans:"Un liquide peut former des gouttes ; il ne se vaporise pas facilement.", src:"fiche S2-8" },
    { front:"Quelle observation montre que les molécules d'un liquide ne sont que faiblement liées ?", back:["Un liquide s'écoule et s'étale"], wrong:["Un liquide peut former des gouttes","Un objet solide ne s'étale pas","Un solide garde sa forme"], mcqOnly:true, ans:"Un liquide s'écoule, s'étale, prend la forme du récipient ; on peut traverser un liquide.", src:"fiche S2-8" },
    { front:"Quelle observation montre que les molécules d'un gaz ne sont pas liées ?", back:["Un gaz se répand et prend toute la place à disposition"], wrong:["Un gaz peut former des gouttes","Un gaz garde sa forme","Un gaz ne se diffuse pas"], mcqOnly:true, ans:"Une substance gazeuse se répand, se diffuse, prend toute la place à disposition ; on peut traverser un gaz sans peine.", src:"page « Les gaz » (suite de S2-8)" },
  ]},
  { key:"proprietes", code:"O6", title:"Forme, volume, compressibilité", src:"résumé théorique · fiche S2-7", items:[
    { front:"Quel état a une forme propre ?", back:["l'état solide"], opts:ETATS, keepOrder:true, ans:"Le solide : il ne prend pas la forme du récipient qui le contient.", src:R_PR },
    { front:"Un liquide a-t-il une forme propre ?", back:["Non : il prend la forme du récipient"], opts:["Oui : il garde sa forme","Non : il prend la forme du récipient"], keepOrder:true, ans:"Non : un liquide prend la forme du récipient qui le contient ; il n'a pas de forme propre.", src:R_PR },
    { front:"Quel état n'a ni forme propre, ni volume propre ?", back:["l'état gazeux"], opts:ETATS, keepOrder:true, ans:"Le gaz : il prend la forme du récipient et occupe tout l'espace qui lui est offert.", src:R_PR },
    { front:"Quels états ont un volume propre ?", back:["Le solide et le liquide"], wrong:["Seulement le gaz","Le liquide et le gaz","Aucun"], mcqOnly:true, ans:"Le solide et le liquide : ils sont pratiquement incompressibles.", src:R_PR },
    { front:"Quel état peut-on comprimer ou dilater ?", back:["l'état gazeux"], opts:ETATS, keepOrder:true, ans:"Le gaz : on peut le comprimer ou le dilater.", src:R_PR },
    { front:"Quel état occupe tout l'espace qui lui est offert ?", back:["l'état gazeux"], opts:ETATS, keepOrder:true, ans:"Le gaz : il n'a pas de volume propre.", src:R_PR },
    { front:"Pourquoi les gaz sont-ils compressibles ?", back:["Leurs molécules sont éloignées : il y a de l'espace entre elles"], wrong:["Leurs molécules peuvent rapetisser","Leurs molécules sont fortement liées","Ils n'ont pas de masse"], mcqOnly:true, ans:"Les gaz sont compressibles car leurs molécules sont éloignées : il y a donc un espace entre elles.", src:"fiche S2-7, « Je retiens »" },
    { front:"Pourquoi les liquides et les solides sont-ils incompressibles ?", back:["Leurs molécules sont très rapprochées : il y a trop peu d'espace entre elles"], wrong:["Leurs molécules sont trop grosses","Ils sont trop lourds","Leurs molécules ne bougent pas du tout"], mcqOnly:true, ans:"Leurs molécules sont très rapprochées : il y a donc trop peu d'espace entre elles.", src:"fiche S2-7, « Je retiens »" },
    { front:"Quand on comprime un gaz, que font ses molécules ?", back:["elles se rapprochent","se rapprochent"], wrong:["elles rapetissent","elles s'aplatissent","elles disparaissent"], ans:"Lorsqu'un gaz est comprimé, les molécules se rapprochent (elles ne changent pas de taille).", src:"fiche S2-7, « Je retiens »" },
    { front:"Comment est la surface d'un liquide au contact de l'air ?", back:["lisse","plane","lisse / plane"], wrong:["bombée","en escalier","pointue"], ans:"Lisse / plane.", src:R_PR },
    { front:"Que veut dire « volume propre » pour un solide ou un liquide ?", back:["Son volume ne change pas en fonction du récipient"], wrong:["Il prend la forme du récipient","Il occupe tout l'espace offert","Il est propre, sans saleté"], mcqOnly:true, ans:"Le volume ne change pas en fonction du récipient : on dit qu'il a un volume propre.", src:"fiche S2-8 · " + R_PR },
  ]},
  { key:"temperature", code:"O7", title:"La température", src:"résumé théorique · fiche S2-18", items:[
    { front:"Par définition, que mesure la température ?", back:["l'agitation des molécules","l'agitation des molécules d'un corps","l'agitation moyenne des molécules","agitation des molécules"], wrong:["la taille des molécules","les chocs des molécules sur une surface","la quantité de matière"], ans:"La température est une mesure de l'agitation des molécules d'un corps.", src:R_TP },
    { front:"Si l'agitation des molécules augmente, que fait la température ?", back:["elle augmente","elle s'élève","augmente"], opts:["elle augmente","elle chute","elle ne change pas"], keepOrder:true, ans:"Elle s'élève (augmente).", src:R_TP },
    { front:"Si l'agitation des molécules diminue, que fait la température ?", back:["elle chute","elle diminue","chute"], opts:["elle augmente","elle chute","elle ne change pas"], keepOrder:true, ans:"Elle chute.", src:R_TP },
    { front:"Avec quel outil mesure-t-on la température ?", back:["un thermomètre","thermomètre","avec un thermomètre"], wrong:["une balance","un baromètre","une règle"], ans:"Avec un thermomètre.", src:R_TP },
    { front:"Quelle est l'unité de la température dans ton cours ?", back:["le degré","degrés","°C","degré Celsius"], wrong:["le pascal","le kilogramme","le mètre cube"], ans:"Le degré (°C).", src:R_TP },
    { front:"Toutes les molécules d'un corps ont-elles la même agitation ?", back:["Non : chacune a sa propre agitation, la température mesure la moyenne"], wrong:["Oui : elles vont toutes exactement à la même vitesse","Non : seules celles du bord bougent","Oui : sauf au zéro absolu"], mcqOnly:true, ans:"Chaque molécule a une agitation propre. La température mesure l'agitation moyenne des molécules.", src:"fiche S2-18, Rappel" },
    { front:"Les molécules d'un liquide chaud sont-elles plus ou moins agitées que celles d'un liquide froid ?", back:["plus agitées"], opts:["plus agitées","moins agitées","pareil"], keepOrder:true, ans:"Plus agitées.", src:"fiche S2-16, « Je retiens » · " + R_DF },
  ]},
  { key:"zero", code:"O8", title:"Le zéro absolu", src:"résumé théorique · feuille d'objectifs", items:[
    { front:"Comment appelle-t-on la température à laquelle les molécules sont quasi immobiles ?", back:["le zéro absolu","zéro absolu"], wrong:["0 °C","la température ambiante","la contraction"], ans:"Le zéro absolu.", src:R_TP },
    { front:"À quelle température se situe le zéro absolu ?", back:["−273 °C","-273 °C","-273","−273","moins 273"], opts:["0 °C","−100 °C","−273 °C"], keepOrder:true, ans:"À −273 °C.", src:R_TP + " · feuille d'objectifs" },
    { front:"Au zéro absolu, comment sont les molécules ?", back:["quasi immobiles","presque immobiles","immobiles"], wrong:["très agitées","plus grosses","libres et très rapides"], ans:"Quasi immobiles : elles ne s'agitent presque plus.", src:R_TP },
    { front:"Le zéro absolu est-il à 273 °C ou à −273 °C ?", back:["−273 °C"], opts:["273 °C","−273 °C"], keepOrder:true, ans:"−273 °C, avec le signe moins : dans ton résumé, tu as écrit « 273 » sans le signe.", src:R_TP + " · feuille d'objectifs" },
  ]},
  { key:"pression", code:"O9", title:"La pression d'un gaz", src:"résumé théorique · fiches S2-12, S2-13", items:[
    { front:"À quoi est associée la pression d'un gaz ?", back:["aux chocs des molécules du gaz sur une surface","aux chocs des molécules","chocs des molécules sur une surface"], wrong:["à la taille des molécules","à la couleur du gaz","à l'agitation moyenne mesurée par un thermomètre"], ans:"La pression d'un gaz est une grandeur associée aux chocs des molécules du gaz sur une surface.", src:R_PS + " · fiche S2-13" },
    { front:"Quelle est l'unité de la pression ?", back:["le pascal","pascal","Pa"], wrong:["le kilogramme","le degré","le mètre cube"], ans:"Le pascal (Pa).", src:R_PS },
    { front:"Quel est le symbole du pascal ?", back:["Pa"], wrong:["P","kg","°C"], ans:"Pa.", src:R_PS },
    { front:"Avec quel outil mesure-t-on la pression ?", back:["un baromètre","baromètre","avec un baromètre"], wrong:["un thermomètre","une balance","une règle"], ans:"Avec un baromètre.", src:R_PS },
    { front:"De quoi dépend la pression d'un gaz ?", back:["De sa densité et de sa température"], wrong:["De sa couleur et de son odeur","Seulement de la taille de ses molécules","De la forme du récipient seulement"], mcqOnly:true, ans:"Elle dépend de la densité du gaz et de sa température.", src:R_PS },
    { front:"Sous la cloche à vide, que devient la pression autour de l'erlenmeyer quand la pompe retire l'air ?", back:["elle diminue"], opts:["elle augmente","elle diminue","elle reste la même"], keepOrder:true, ans:"Elle diminue.", src:"fiche S2-13, « Je retiens »" },
    { front:"Sous la cloche à vide, que devient la pression à l'intérieur de l'erlenmeyer ?", back:["elle reste la même"], opts:["elle augmente","elle diminue","elle reste la même"], keepOrder:true, ans:"Elle reste la même à l'intérieur : c'est pour cela que le bouchon saute.", src:"fiche S2-13, « Je retiens »" },
    { front:"Sous la cloche à vide, pourquoi le bouchon saute-t-il, à l'échelle moléculaire ?", back:["Les chocs des molécules de l'intérieur poussent le bouchon vers l'extérieur"], wrong:["Les molécules de l'intérieur grossissent","La pompe aspire le bouchon avec ses molécules","Les molécules de l'intérieur s'arrêtent de bouger"], mcqOnly:true, ans:"Les chocs des molécules de l'intérieur vers l'extérieur poussent le bouchon vers l'extérieur, qui finit par sauter.", src:"fiche S2-13, « Je retiens »" },
  ]},
  { key:"dilatation", code:"O10A", title:"La dilatation", src:"résumé théorique · fiches S2-18, S2-19", items:[
    { front:"Comment s'appelle l'augmentation du volume d'un objet quand sa température augmente ?", back:["la dilatation","dilatation"], wrong:["la contraction","la conduction","la diffusion"], ans:"La dilatation.", src:R_DI + " · fiche S2-19" },
    { front:"Comment s'appelle le phénomène inverse de la dilatation ?", back:["la contraction","contraction"], wrong:["la conduction","la diffusion","la pression"], ans:"La contraction.", src:R_DI },
    { front:"Quand a lieu la contraction ?", back:["quand l'objet se refroidit"], opts:["quand l'objet se réchauffe","quand l'objet se refroidit"], keepOrder:true, ans:"Lorsque l'objet se refroidit.", src:R_DI },
    { front:"Une boule en acier est chauffée : sa taille va-t-elle diminuer, augmenter ou rester la même ?", back:["augmenter"], opts:["diminuer","augmenter","rester la même"], keepOrder:true, ans:"Elle augmente : c'est la dilatation.", src:"fiches S2-18 et S2-19" },
    { front:"Pourquoi la boule chauffée ne passe-t-elle plus à travers l'anneau ?", back:["Parce que son volume a augmenté"], wrong:["Parce que l'anneau a rétréci","Parce qu'elle est devenue plus lourde","Parce que ses molécules ont grossi"], mcqOnly:true, ans:"Sa température augmente et son volume a aussi augmenté : c'est la dilatation.", src:"fiche S2-19, « Je retiens »" },
    { front:"À l'échelle moléculaire, que font les molécules de la boule quand elle se réchauffe ?", back:["Chaque molécule vibre plus et la distance entre elles grandit"], wrong:["Chaque molécule grossit","Les molécules s'arrêtent de vibrer","De nouvelles molécules apparaissent"], mcqOnly:true, ans:"Chaque molécule vibre plus. La distance entre les molécules grandit : elles occupent un plus grand espace.", src:"fiche S2-19, « Je retiens »" },
    { front:"Dans la dilatation, qu'est-ce qui augmente : la taille des molécules ou la distance entre elles ?", back:["la distance entre elles"], opts:["la taille des molécules","la distance entre elles"], keepOrder:true, ans:"Ce n'est pas la taille des molécules qui augmente, mais uniquement la distance qui les sépare !", src:R_DI },
    { front:"Dans une substance froide, comment sont les particules par rapport à une substance chaude ?", back:["plus rapprochées"], opts:["plus rapprochées","plus éloignées","plus grosses"], keepOrder:true, ans:"Dans une substance froide, les particules sont plus rapprochées ; elles s'éloignent quand la température augmente.", src:R_DI + " (dessin froid / chaud)" },
  ]},
  { key:"pressiongaz", code:"O10B", title:"Gaz chauffé ou comprimé", src:"résumé théorique · fiches S2-14, S2-15", items:[
    { front:"Quand on chauffe un gaz enfermé dans un récipient, que fait sa pression ?", back:["elle augmente"], opts:["elle augmente","elle diminue","elle reste la même"], keepOrder:true, ans:"L'augmentation de la température d'un gaz emprisonné entraîne une augmentation de sa pression.", src:R_CH },
    { front:"Pourquoi la pression d'un gaz chauffé augmente-t-elle, à l'échelle moléculaire ?", back:["Les molécules vont plus vite : les chocs sur les parois sont plus violents et plus fréquents"], wrong:["Les molécules grossissent et prennent plus de place","Il y a plus de molécules dans le récipient","Les molécules s'arrêtent contre les parois"], mcqOnly:true, ans:"L'augmentation de la vitesse des molécules augmente la violence et la fréquence des chocs sur les parois du récipient.", src:R_CH },
    { front:"On chauffe un tube fermé par un bouchon de patate : pourquoi le bouchon saute-t-il, à l'échelle humaine ?", back:["La température de l'air dans le tube augmente, donc sa pression augmente"], wrong:["La flamme pousse directement le bouchon","Le bouchon devient plus léger en chauffant","L'air sort du tube par le verre"], mcqOnly:true, ans:"La température de l'air à l'intérieur augmente ; ainsi, la pression de l'air dans le tube augmente. Le bouchon finit par sauter.", src:"fiche S2-15, « Je retiens »" },
    { front:"Dans le tube chauffé, que font les molécules d'air ?", back:["Elles vont plus vite et frappent plus fortement et plus fréquemment les parois"], wrong:["Elles grossissent et poussent le bouchon","Elles ralentissent et se collent au verre","Elles sortent à travers le verre"], mcqOnly:true, ans:"Les molécules d'air dans le tube vont plus vite et frappent plus fortement et plus fréquemment les parois.", src:"fiche S2-15, « Je retiens »" },
    { front:"Quand on comprime un gaz, ses molécules sont-elles plus nombreuses ?", back:["Non : elles sont toujours aussi nombreuses"], opts:["Oui : il y en a plus","Non : elles sont toujours aussi nombreuses"], keepOrder:true, ans:"Les molécules sont toujours aussi nombreuses.", src:R_CO },
    { front:"Quand on comprime un gaz, ses molécules vont-elles plus vite ?", back:["Non : elles vont toujours aussi vite"], opts:["Oui : elles accélèrent","Non : elles vont toujours aussi vite"], keepOrder:true, ans:"Elles se déplacent toujours aussi vite.", src:R_CO },
    { front:"Pourquoi la pression augmente-t-elle quand on comprime un gaz ?", back:["Les molécules sont dans un espace plus petit : les chocs sur les parois sont plus fréquents"], wrong:["Les molécules vont plus vite","Les molécules deviennent plus grosses","On ajoute des molécules"], mcqOnly:true, ans:"Comme les molécules se déplacent dans un espace plus petit, les chocs avec les parois sont plus fréquents. Ainsi, la pression augmente.", src:R_CO },
    { front:"Comprimer un gaz rend les chocs sur les parois… ?", back:["plus fréquents seulement"], opts:["plus violents seulement","plus fréquents seulement","plus violents et plus fréquents"], keepOrder:true, ans:"Plus fréquents seulement : les molécules vont toujours aussi vite. Chauffer, lui, rend les chocs plus violents et plus fréquents.", src:R_CO + " · " + R_CH },
  ]},
  { key:"conduction", code:"O10C", title:"La conduction thermique", src:"résumé théorique · fiche S2-17", items:[
    { front:"Comment s'appelle la transmission de proche en proche de la chaleur ?", back:["la conduction thermique","conduction thermique","la conduction"], wrong:["la dilatation","la diffusion","la contraction"], ans:"La conduction thermique.", src:R_CD },
    { front:"À l'occasion de quoi l'agitation des molécules se transmet-elle de proche en proche ?", back:["de leurs chocs","leurs chocs","chocs"], wrong:["de leur grossissement","de leur couleur","de leur immobilité"], ans:"À l'occasion de leurs chocs.", src:R_CD },
    { front:"Une cuillère tenue au-dessus d'une flamme : que se passe-t-il, à l'échelle humaine ?", back:["La flamme chauffe le bout, et la température monte peu à peu jusqu'à l'autre extrémité"], wrong:["La flamme traverse la cuillère et sort de l'autre côté","Le gaz de la flamme se pose sur le manche","La cuillère se refroidit"], mcqOnly:true, ans:"La flamme chauffe le bout de la cuillère. L'augmentation de la température progresse de l'extrémité chauffée à l'autre : c'est la conduction thermique.", src:"fiche S2-17, « Je retiens »" },
    { front:"Une cuillère tenue au-dessus d'une flamme : que se passe-t-il, à l'échelle moléculaire ?", back:["La flamme agite les molécules du bout, qui transmettent cette agitation de proche en proche par leurs chocs"], wrong:["Les molécules de la flamme voyagent dans la cuillère","Les molécules du métal grossissent jusqu'au manche","Les molécules du manche s'arrêtent de bouger"], mcqOnly:true, ans:"La flamme augmente l'agitation des molécules du bout de la cuillère, qui transmettent ensuite leur agitation de proche en proche en se tapant.", src:"fiche S2-17, « Je retiens »" },
    { front:"Est-ce que la flamme traverse le métal de la cuillère ?", back:["Non : c'est l'agitation des molécules qui se transmet"], opts:["Oui : elle traverse et sort de l'autre côté","Non : c'est l'agitation des molécules qui se transmet"], keepOrder:true, ans:"Non. Tu avais écrit « la flamme traverse le bout de cuivre » : c'est la conduction thermique, l'agitation passe de molécule en molécule.", src:"fiche S2-17, tes réponses corrigées" },
    { front:"Pourquoi le manche d'une cuillère trempée dans la soupe chauffe-t-il ?", back:["par conduction thermique","conduction thermique","la conduction thermique"], wrong:["par dilatation","par diffusion","par contraction"], ans:"Par conduction thermique : l'agitation des molécules se transmet de proche en proche jusqu'au manche.", src:"fiche S2-17, titre" },
  ]},
  { key:"diffusion", code:"O10D", title:"La diffusion", src:"résumé théorique · fiche S2-16", items:[
    { front:"Dans quel verre le colorant se diffuse-t-il le plus vite ?", back:["dans l'eau chaude"], opts:["dans l'eau froide","dans l'eau chaude","pareil dans les deux"], keepOrder:true, ans:"Dans l'eau chaude (bouillante).", src:"fiche S2-16" },
    { front:"Plus la température d'un liquide est élevée, plus la diffusion est… ?", back:["rapide"], opts:["rapide","lente"], keepOrder:true, ans:"Plus rapide.", src:R_DF + " · fiche S2-16" },
    { front:"Qu'est-ce qui permet à un liquide de se diffuser dans un autre ?", back:["Les faibles liaisons entre ses molécules, qui glissent et s'éparpillent"], wrong:["Les fortes liaisons entre ses molécules","La taille plus grande de ses molécules","Le fait que ses molécules sont immobiles"], mcqOnly:true, ans:"La diffusion s'explique par les faibles liaisons entre les molécules des liquides, qui permettent qu'elles glissent les unes sur les autres et s'éparpillent.", src:R_DF },
    { front:"Pourquoi le colorant se diffuse-t-il plus vite dans l'eau chaude, à l'échelle moléculaire ?", back:["Les molécules du liquide chaud sont plus agitées : elles éparpillent plus vite celles du colorant"], wrong:["Les molécules d'eau chaude sont plus grosses","L'eau chaude a moins de molécules","Le colorant chauffé grossit"], mcqOnly:true, ans:"Les molécules du liquide chaud sont plus agitées et éparpillent plus rapidement les molécules du colorant.", src:"fiche S2-16, « Je retiens »" },
    { front:"Quel mot du résumé dit ce que font les molécules d'un liquide les unes sur les autres pendant la diffusion ?", back:["elles glissent","glissent"], wrong:["elles se séparent","elles s'arrêtent","elles se collent"], ans:"Elles glissent les unes sur les autres (« séparent » avait été barré).", src:R_DF },
  ]},
  { key:"exemples", code:"O11", title:"Exemples de la vie quotidienne", src:"fiches S2-4 à S2-19 · résumé théorique", items:[
    { front:"Le manche d'une cuillère trempée dans la soupe chauffe : quel phénomène est-ce ?", back:["la conduction thermique"], opts:PHEN, keepOrder:true, ans:"La conduction thermique.", src:"fiche S2-17" },
    { front:"Une goutte de colorant se mélange plus vite dans l'eau chaude : quel phénomène est-ce ?", back:["la diffusion"], opts:PHEN, keepOrder:true, ans:"La diffusion, plus rapide quand la température est plus élevée.", src:"fiche S2-16" },
    { front:"Une boule en acier chauffée ne passe plus dans l'anneau : quel phénomène est-ce ?", back:["la dilatation"], opts:PHEN, keepOrder:true, ans:"La dilatation.", src:"fiche S2-19" },
    { front:"Le bouchon d'un tube à essais chauffé saute : quel phénomène est-ce ?", back:["l'augmentation de la pression d'un gaz"], opts:PHEN, keepOrder:true, ans:"L'augmentation de la pression d'un gaz chauffé.", src:"fiche S2-15" },
    { front:"Pourquoi un ballon est-il ratatiné dans le froid et bien rond au chaud ?", back:["Au chaud, les molécules vont plus vite : les chocs sur la paroi augmentent la pression"], wrong:["Au chaud, les molécules grossissent","Au froid, de l'air sort du ballon par la paroi","Au chaud, le ballon fabrique de l'air"], mcqOnly:true, ans:"Plus la température est élevée, plus les molécules vont vite : chocs plus violents et plus fréquents sur la paroi, la pression augmente.", src:R_CH + " (images a et b)" },
    { front:"Pourquoi un ballon de basket gonflé pèse-t-il plus lourd ?", back:["Parce qu'on a ajouté de l'air, et que l'air pèse"], wrong:["Parce que le caoutchouc devient plus lourd","Parce que l'air comprimé grossit","Il ne pèse pas plus lourd"], mcqOnly:true, ans:"Ajouter de l'air change la masse : l'air est pesant.", src:"fiche S2-5, « Je retiens »" },
    { front:"Une bouteille d'eau qui sort du congélateur pèse-t-elle plus que la même bouteille à température ambiante ?", back:["Non : elle pèse la même chose"], opts:["Oui : elle pèse plus","Non : elle pèse la même chose"], keepOrder:true, ans:"Non : la masse ne dépend pas des transformations comme la congélation.", src:"fiche S2-4, « Je retiens »" },
  ]},
];

/* Sommaire du Dossier : même rendu que la couche, avec une introduction et une légende propres à ce TE. */
const COUCHE_CONTENU = {
  vueFiche(){
    if (S.page) return viewPage(S.page);
    let h = draftBanner() + `<p class="intro">Ton cours complet, rangé exactement comme ta feuille d'objectifs du TE S2 : un chapitre par objectif (le 10 en quatre parties). Commence par le fil rouge, lis un chapitre, puis teste-toi avec ses cartes.</p>${globalPastille()}
    <div class="legend"><p><span class="tag book">Résumé théorique</span> phrase de ton résumé théorique, à savoir mot pour mot.</p><p><span class="tag mine">Ton dossier</span> tes fiches S2, tes réponses et tes erreurs corrigées.</p><p><span class="tag gen">À vérifier</span> explication générale, pas dans tes pages : jamais interrogée.</p></div>`;
    const intro = pageById("LIENS");
    h += `<section class="toc-ch"><h2>Avant de commencer <span>Le fil rouge de l'épreuve</span></h2><button class="toc-item" data-act="page" data-v="LIENS"><span class="code">LIENS</span><span class="toc-t">${esc(intro.titre)}<span class="toc-s">${esc(intro.court)}</span></span></button></section>`;
    CHAPTERS.forEach(c => {
      h += `<section class="toc-ch"><h2>${c.titre} <span>${esc(c.sous)}</span></h2>` + PAGES.filter(p => p.ch === c.key).map(p =>
        `<button class="toc-item" data-act="page" data-v="${p.id}"><span class="code">${p.id.replace(/^O10/, "10").replace(/A$/,"a").replace(/B$/,"b").replace(/C$/,"c").replace(/D$/,"d")}</span><span class="toc-t">${esc(p.titre)}<span class="toc-s">${esc(p.court)}</span></span>${dPastille(p.id)}</button>`).join("") + `</section>`;
    });
    h += `<section class="toc-ch"><h2>Pour finir</h2>
      <button class="toc-item" data-act="page" data-v="lex"><span class="code">ABC</span><span class="toc-t">Lexique<span class="toc-s">Les ${LEXIQUE.length} mots à connaître, en une ligne chacun</span></span></button>
      <button class="toc-item" data-act="page" data-v="src"><span class="code">SRC</span><span class="toc-t">D'où viennent les questions<span class="toc-s">Les photos qui ont servi et ce qui manque</span></span></button></section>`;
    return h + `<button class="cta" data-act="page" data-v="LIENS">Commencer la lecture</button><p class="version">Version ${VERSION.n} · mise à jour le ${VERSION.date}</p>`;
  },
};

const OUTIL = {
  eleve:"Livio", classe:"10e HarmoS", branche:BRANCHE,
  titre:HEAD.titre, sousTitre:"Sciences · TE S2",
  jersey:"SCN 10",
  ongletFiche:["📖","Dossier"],
  badgeHtml:`<div class="head-code" aria-hidden="true">${HEAD.code}<b>${HEAD.num}</b></div>`,
  polices:"https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;0,7..72,700;1,7..72,400&family=IBM+Plex+Sans:wght@400;500;700&display=swap",
  introFiche:"",
  labelTout:"Tout le Dossier",
  motPaquet:"Objectif", motPaquets:"objectifs", cePaquet:"Cet objectif",
  compte:"questions",
  sousNiveaux:{ easy:"Je choisis parmi plusieurs réponses", hard:"J'écris tout ce qui peut s'écrire" },
  conseilSetup:"Les questions « pourquoi » restent toujours à choix, même au niveau épreuve : lis bien chaque proposition, les pièges ressemblent à tes anciennes erreurs. En épreuve blanche, tu ne vois aucune réponse avant la fin.",
  papier:{ titre:"Sciences — Modèle moléculaire (TE S2)", court:"Sciences S2", fichier:FILE_SLUG, code:"#PDF-SCN" },
  copie:{ titre:"RÉSULTAT — " + SUBJECT_LONG },
  analyse:{
    role:"un professeur de sciences de la nature suisse",
    sujet:"le TE S2 « Modèle moléculaire » : masse, volume, air, les trois états (dessin, mouvements, liaisons, propriétés), température, zéro absolu, pression, dilatation, pression d'un gaz chauffé ou comprimé, conduction thermique, diffusion, exemples de la vie quotidienne",
    etiquettes:"l'étiquette est la clé du paquet, qui correspond à un objectif de la feuille (O1 à O11, 10a à 10d)",
    pistes:"des molécules qui « grossissent » (au lieu d'une distance qui augmente), masse et volume confondus, les mots du résumé remplacés par d'autres (bougent au lieu de vibrent, collées au lieu de rapprochées, liées au lieu de faiblement liées), échelle humaine et échelle moléculaire mélangées, les unités et les outils inversés (thermomètre, baromètre, balance ; kg, m³, °C, Pa), le signe de −273 °C oublié",
  },
};

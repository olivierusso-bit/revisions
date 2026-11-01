#!/usr/bin/env python3
"""Export JSON du Dossier, produit à partir de l'outil lui-même (publication-github.md § 10).
25.10.2026 : durée estimée à 120 mots par minute (rythme de référence des capsules), champ « mots » et alerte au-delà de 450 mots
par chapitre (publication-github.md § 10.3), liens vidéo MP4 acceptés en plus des identifiants YouTube.
25.10.2026 (2) : siècles en chiffres romains lus en toutes lettres, années « 1519-1521 » lues « 1519 à 1521 », étiquette « dictionnaire »,
intitulé de la rubrique de la feuille d'objectifs (objLabel), champ « audio » (pistes MP3, AUDIOS), titre « Le fil rouge de l'épreuve ».
01.11.2026 (contrôle qualité) : branche, classe et prénom lus dans l'outil (OUTIL.branche, OUTIL.classe, OUTIL.eleve) ; les arguments
facultatifs ne servent plus qu'à les remplacer. Pour un outil d'avant le noyau, repli sur BRANCHE et le prénom de QUIZ_ID.
Usage : python3 export-dossier.py <page.html> <sortie.json> [branche] [classe]
<page.html> = l'outil enveloppé dans <!doctype html><html><head><meta charset=utf8></head><body>…</body></html>."""
import json, sys
from playwright.sync_api import sync_playwright

SRC, OUT = sys.argv[1], sys.argv[2]
BR_ARG = sys.argv[3] if len(sys.argv) > 3 else ""
CL_ARG = sys.argv[4] if len(sys.argv) > 4 else ""
JS = r"""([BR_ARG, CL_ARG])=>{
const OUT_BR = BR_ARG || (typeof OUTIL !== "undefined" && OUTIL.branche) || (typeof BRANCHE !== "undefined" && BRANCHE) || "";
const OUT_CL = CL_ARG || (typeof OUTIL !== "undefined" && OUTIL.classe ? OUTIL.classe + " (Neuchâtel)" : "");
const OUT_EL = (typeof OUTIL !== "undefined" && OUTIL.eleve) || QUIZ_ID.split('-')[0].replace(/^./, c=>c.toUpperCase());
const strip = h => { const d=document.createElement('div'); d.innerHTML=String(h); return d.textContent.replace(/\s+/g,' ').trim(); };
const SIECLES = { II:'deuxième', III:'troisième', IV:'quatrième', V:'cinquième', VI:'sixième', VII:'septième', VIII:'huitième', IX:'neuvième', X:'dixième', XI:'onzième', XII:'douzième', XIII:'treizième', XIV:'quatorzième', XV:'quinzième', XVI:'seizième', XVII:'dix-septième', XVIII:'dix-huitième', XIX:'dix-neuvième', XX:'vingtième', XXI:'vingt-et-unième' };
const say = t => String(t)
  .replace(/R&D/g,'R et D').replace(/\b(XXI|XX|XIX|XVIII|XVII|XVI|XV|XIV|XIII|XII|XI|X|IX|VIII|VII|VI|V|IV|III|II)e\b/g, (m, r) => SIECLES[r] || m)
  .replace(/\bav\. J\.-C\./g,'avant Jésus-Christ').replace(/\bapr\. J\.-C\./g,'après Jésus-Christ').replace(/\bex\. /gi,'exercice ').replace(/1re /g,'première ').replace(/\b(\d{4})-(\d{2,4})\b/g,'$1 à $2').replace(/⚠️ ?/g,'')
  .replace(/\bpp\. /g,'pages ').replace(/\bp\. /g,'page ').replace(/\bdoc\. /g,'document ').replace(/\bdocs /g,'documents ').replace(/\bact\. /g,'activité ')
  .replace(/CHF\/t/g,'francs par tonne').replace(/\bCHF\b/g,'francs').replace(/m³/g,'mètres cubes').replace(/(\d) ?km\b/g,'$1 kilomètres').replace(/(\d) m\b/g,'$1 mètres')
  .replace(/(\d) ?%/g,'$1 pour cent').replace(/×/g,'fois').replace(/≈/g,'environ').replace(/N° ?/g,'numéro ').replace(/–/g,'-')
  .replace(/\b([1-4])\.0\b/g,'$1 point 0').replace(/< ?1/g,'moins de 1').replace(/ ?→ ?/g,', ').replace(/ ?↓ ?/g,' ').replace(/ — /g,', ').replace(/[«»]/g,'"').replace(/\s+/g,' ').trim();
const dot = t => /[.!?:]$/.test(t) ? t : t + '.';
const lc = t => t.charAt(0).toLowerCase() + t.slice(1);
const srcOf = b => {
  if (!["p","def","html","mine","ex","links","tip","pause","svg"].includes(b.t)) return null;
  return b.s || (b.t === "def" && b.gen ? "Pas dans tes photos : à vérifier dans le livre" : b.t === "tip" ? "Conseil de méthode (pas une page du livre)" : b.t === "def" ? "Fiches d'exercices" : null);
};
const tableOf = el => { const head=[...el.querySelectorAll('thead th')].map(x=>x.textContent.trim()); const rows=[...el.querySelectorAll('tbody tr')].map(tr=>[...tr.children].map(td=>td.innerText.replace(/\s*\n\s*/g,' — ').trim())); return {colonnes:head, lignes:rows}; };
function visual(h){
  const d=document.createElement('div'); d.innerHTML=h; document.body.appendChild(d);
  const out=[];
  d.querySelectorAll('table').forEach(t=>out.push({schema:'tableau', ...tableOf(t)}));
  if(d.querySelector('.chain')) out.push({schema:'chaine', etapes:[...d.querySelectorAll('.step')].map(s=>({etape:s.querySelector('b').textContent, detail:s.querySelector('span:not(.step-bar)')?.textContent||'', stockage:s.classList.contains('st')}))});
  if(d.querySelector('.rev4')) out.push({schema:'frise', elements:[...d.querySelectorAll('.rv')].map(r=>({revolution:r.querySelector('.rv-n').textContent, date:r.querySelector('.rv-d')?.textContent||'', innovations:r.querySelector('.rv-i').textContent, critere:r.querySelector('.rv-c')?.textContent||'', symbole:{'1.0':'engrenages','2.0':'tapis roulant de la chaîne','3.0':'puce électronique','4.0':'signal wifi'}[r.querySelector('.rv-n').textContent]}))});
  if(d.querySelector('.sect6')) out.push({schema:'tuiles', elements:[...d.querySelectorAll('.sx')].map(x=>({titre:x.querySelector('b').textContent, texte:x.querySelector('span').textContent}))});
  if(d.querySelector('.trio')) out.push({schema:'trois_questions', elements:[...d.querySelectorAll('.trio-s')].map(x=>({chapitre:x.querySelector('.trio-k').textContent, question:x.querySelector('b').textContent, texte:x.querySelector('p').textContent, objectifs:[...x.querySelectorAll('button')].map(b=>b.textContent)}))});
  if(d.querySelector('.nike')) out.push({schema:'barres_doubles', titre:'Nike 2015 : part des employés et des ventes par région', elements:[...d.querySelectorAll('.nk')].map(x=>{const v=[...x.querySelectorAll('.bar-v')].map(e=>e.textContent); return {region:x.querySelector('.nk-r').textContent, employes:v[0], ventes:v[1]};})});
  else if(d.querySelector('.bars')) out.push({schema:'barres', titre:'Conteneurs par moyen de transport', elements:[{moyen:'Cargo',valeur:'plus de 1000'},{moyen:'Péniche',valeur:'environ 30'},{moyen:'Train',valeur:'environ 20 à 30'},{moyen:'Camion',valeur:'1 (ou 2)'}]});
  if(d.querySelector('.box3d')) out.push({schema:'encadre_calcul', texte:strip(d.querySelector('.box3d').innerHTML.replace('<small>',' — '))});
  const notes=[...d.querySelectorAll('p.fine')].map(p=>p.textContent.trim());
  d.remove();
  return {visuels:out, notes};
}
const tableSay = t => t.lignes.map(r=>r.join(' : ')).join('. ');
const chapterOf = id => CHAPTERS.find(c=>c.key===(PAGES.find(p=>p.id===id)||{}).ch);
const pages = PAGES.map(pg=>{
  const sections=[], segs=[], manques=[];
  const add = (texte, role, source, section) => { const t = say(texte); if (t) segs.push({ id:`${pg.id}-S${String(segs.length+1).padStart(2,'0')}`, role, texte:dot(t), source:source||null, section:section==null?null:section }); };
  const c=chapterOf(pg.id);
  add(pg.id==='LIENS' ? "Le fil rouge de l'épreuve." : `${c.titre}, objectif ${pg.id} : ${pg.titre}.`, 'titre', null, null);
  if(pg.obj) add((c.objLabel || 'Je suis capable de').replace(/…$/,'') + ' : ' + pg.obj, 'objectif', c.objLabel ? "Feuille d'objectifs" : "Feuille d'objectifs « Je suis capable de »", null);
  if(pg.pre){
    add("Avant de commencer, essaie de répondre à deux questions, même si tu ne sais pas encore. Chercher la réponse t'aidera à la retenir quand elle arrivera.", 'avant_capsule', null, null);
    pg.pre.forEach((x,i)=>add((i?'Deuxième question : ':'Première question : ')+x.q, 'avant_capsule', x.s, null));
  }
  pg.blocks.forEach(b=>{
    const S = srcOf(b), k = sections.length;
    switch(b.t){
      case 'p': { const t=strip(b.h); sections.push({type:'texte', texte:t, source:S}); add(t,'contenu',S,k); break; }
      case 'h3': { const t=strip(b.h); sections.push({type:'titre', texte:t, source:null}); add(t,'intertitre',null,k); break; }
      case 'def': { const st=b.dico?'dictionnaire':b.book?'livre':b.gen?'a_verifier':'dossier'; const t=strip(b.h);
        sections.push({type:'definition', statut:st, page_livre:st==='livre'?b.book:null, mot:b.term, texte:t, source:S});
        if(st!=='a_verifier') add(`${b.term}${st==='livre'?', définition du livre':st==='dictionnaire'?', définition du dictionnaire':''} : ${t}`,'contenu',S,k); break; }
      case 'mine': sections.push({type:'ton_dossier', titre:b.titre, items:b.items, source:S}); add(b.titre+' : '+b.items.join('. '),'contenu',S,k); break;
      case 'ex': sections.push({type:'exercices', items:b.items.map(([code,fait,montre])=>({exercice:code, ce_que_tu_as_fait:strip(fait), ce_que_ca_montre:strip(montre)})), source:S});
        add("Ce que tes exercices t'ont montré : " + b.items.map(([c2,f,m])=>strip(f)+' Cela montre que : '+strip(m)).join(' '),'contenu',S,k); break;
      case 'links': sections.push({type:'liens', items:b.items.map(([ids,t])=>({objectifs:ids, texte:strip(t)})), source:S}); add(b.items.map(([ids,t])=>strip(t)).join(' '),'contenu',S,k); break;
      case 'html': { const v=visual(b.h); v.visuels.forEach(x=>{ const kk=sections.length; sections.push({type:'schema', ...x, source:S});
          if(x.schema==='tableau') add(tableSay(x),'schema',S,kk);
          else if(x.schema==='chaine') add(x.etapes.map(e=>e.etape+', '+e.detail).join('. Puis : '),'schema',S,kk);
          else if(x.schema==='frise') add(x.elements.map(e=>`Révolution ${e.revolution}, en ${e.date}, symbole : ${e.symbole}. ${e.innovations}. ${e.critere}.`).join(' '),'schema',S,kk);
          else if(x.schema==='tuiles') add(x.elements.map(e=>e.titre+' : '+e.texte).join(' '),'schema',S,kk);
          else if(x.schema==='trois_questions') add(x.elements.map(e=>`Chapitre ${e.chapitre} : ${e.question} ${e.texte}`).join(' '),'schema',S,kk);
          else if(x.schema==='barres_doubles') add(x.elements.map(e=>`${e.region} : ${e.employes}, ${e.ventes}`).join('. '),'schema',S,kk);
          else if(x.schema==='barres') add(x.elements.map(e=>e.moyen+' : '+e.valeur+' conteneurs').join('. '),'schema',S,kk);
          else if(x.schema==='encadre_calcul') add(x.texte,'schema',S,kk); });
        if(v.notes.length) sections.push({type:'note', texte:v.notes.join(' '), source:S}); break; }
      case 'svg': sections.push({type:'schema', schema:'image_svg', cle:b.k, titre:b.titre, description:b.alt, svg:SVGS[b.k](P_FIXE), source:S}); add(b.alt,'schema',S,k); break;
      case 'pause': sections.push({type:'pause', question:b.q, reponse:b.a, secondes_reflexion:5, source:S});
        add('Mets la vidéo sur pause et réponds : ' + b.q, 'pause_question', S, k); add('La réponse : ' + b.a, 'pause_reponse', S, k); break;
      case 'tip': { const t=strip(b.h); sections.push({type:'pour_l_epreuve', texte:t, source:S}); add("Pour l'épreuve : "+t,'contenu',S,k); break; }
      case 'todo': manques.push(strip(b.h)); break;
      case 'see': sections.push({type:'voir_aussi', objectifs:b.ids, source:null}); break;
      case 'src': sections.push({type:'source', texte:b.h, source:null}); break;
    }
  });
  if(pg.pre) pg.pre.forEach((x,i)=>add((i?'Et la deuxième : ':'Retour aux questions du début. La première : ')+x.a, 'reponses_avant_capsule', x.s, null));
  if(pg.blank){
    add('Pour finir, la feuille blanche. Arrête la vidéo, prends une feuille et ' + lc(pg.blank.consigne), 'feuille_blanche', pg.blank.s, null);
    add('Ensuite, vérifie que tu as bien écrit : ' + pg.blank.points.join(' ; '), 'feuille_blanche', pg.blank.s, null);
  }
  const narration = segs.map(x=>x.texte).join('\n\n');
  return { id:pg.id, chapitre:pg.ch||null, titre:pg.titre, resume:pg.court||null, objectif:pg.obj||null,
    video: VIDEOS[pg.id] ? (/^https?:/.test(VIDEOS[pg.id]) ? VIDEOS[pg.id] : 'https://www.youtube.com/watch?v=' + VIDEOS[pg.id]) : null,
    audio: (typeof AUDIOS !== 'undefined' && AUDIOS[pg.id] && AUDIOS[pg.id].length) ? AUDIOS[pg.id] : null,
    avant_capsule: (pg.pre||[]).map(x=>({question:x.q, reponse:x.a, source:x.s})),
    sections,
    feuille_blanche: pg.blank ? { consigne:pg.blank.consigne, points:pg.blank.points, source:pg.blank.s } : null,
    mots:narration.split(/\s+/).length,
    narration, narration_segments:segs, duree_estimee_secondes:Math.round(narration.split(/\s+/).length/120*60) + segs.filter(s=>s.role==='pause_question').length*5,
    a_completer:manques };
});
return {
  meta:{ titre:THEME, branche:OUT_BR, eleve:OUT_EL, classe:OUT_CL, controle:DUE.long,
    version_outil:VERSION.n, mis_a_jour:VERSION.date, langue:"fr-CH", tutoiement:true,
    note_sources:SOURCES_NOTE,
    statuts:{ livre:"Définition du manuel (bulle jaune, glossaire ou lexique), mot pour mot : à présenter comme la définition officielle.",
      dictionnaire:"Définition d'un dictionnaire (mot absent du manuel, retenu avec l'accord du parent) : à présenter comme telle.",
      dossier:"Tiré des fiches et des réponses de l'élève.", a_verifier:"Explication générale, absente des photos : à ne pas présenter comme le cours (exclue de la narration)." },
    narration:"Le champ « narration » de chaque objectif est prêt pour une voix de synthèse : abréviations développées (page, document, R et D, pour cent, francs par tonne), encadrés « à vérifier » exclus, paragraphes séparés par une ligne vide.",
    segments:"Chaque segment de narration_segments a un id stable (A3-S07), un rôle, sa source et l'indice de la section qu'il illustre (champ section) : quand cette section est un schéma, c'est le visuel à afficher pendant ce segment.",
    roles:{ titre:"annonce de l'objectif", objectif:"phrase de la feuille d'objectifs, avec l'intitulé de sa rubrique", avant_capsule:"questions posées avant le contenu : afficher la question, ne pas donner la réponse", intertitre:"titre de partie", contenu:"texte du Dossier", schema:"description d'un schéma : afficher la section indiquée", pause_question:"afficher la question en grand avec « ⏸ Mets sur pause », puis laisser secondes_reflexion (5 s) de silence", pause_reponse:"afficher la réponse", reponses_avant_capsule:"réponses aux questions du début", feuille_blanche:"consigne de rappel final, puis les points clés à vérifier" },
    image_svg:"Les sections de type schema avec schema « image_svg » contiennent un dessin SVG complet, en couleurs fixes, à afficher tel quel. Il est dessiné pour le Dossier (aucune image du livre)." },
  introduction: pages.find(p=>p.id==='LIENS'),
  chapitres: CHAPTERS.map(c=>({ code:c.key, titre:c.titre, question:c.sous, objectifs:pages.filter(p=>p.chapitre===c.key) })),
  lexique: LEXIQUE.map(x=>({ mot:x.t, definition:x.h, statut:x.dico?'dictionnaire':x.book?'livre':x.gen?'a_verifier':'dossier', page_livre:x.dico?null:(x.lab||x.book||null), source:x.s||(x.book?'Livre '+x.book:null), objectif:x.ref })),
  sources: SOURCES.map(x=>({ photo:x.titre, recue:x.recue, contenu:x.contenu })),
  a_completer: pages.flatMap(p=>p.a_completer.map(t=>({objectif:p.id, manque:t})))
};
}"""
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width":390,"height":844})
    pg.route("**/fonts.googleapis.com/**", lambda r: r.abort()); pg.route("**/i.ytimg.com/**", lambda r: r.abort())
    errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto("file://" + SRC); pg.wait_for_timeout(300)
    data = pg.evaluate(JS, [BR_ARG, CL_ARG])
    # contrôle : chaque bloc du Dossier se retrouve dans le JSON
    sigs = pg.evaluate(r"""()=>{ const strip=h=>{const d=document.createElement('div');d.innerHTML=String(h);return d.textContent.replace(/\s+/g,' ').trim();};
      const out=[]; PAGES.forEach(pg=>{ (pg.pre||[]).forEach(x=>out.push([pg.id,'pre',x.q],[pg.id,'pre',x.a]));
        if(pg.blank){ out.push([pg.id,'blank',pg.blank.consigne]); pg.blank.points.forEach(x=>out.push([pg.id,'blank',x])); }
        pg.blocks.forEach(b=>{ if(['p','h3','tip'].includes(b.t)) out.push([pg.id,b.t,strip(b.h)]); else if(b.t==='def') out.push([pg.id,'def',strip(b.h)]);
          else if(b.t==='pause') out.push([pg.id,'pause',b.q],[pg.id,'pause',b.a]); else if(b.t==='svg') out.push([pg.id,'svg',b.alt]);
          else if(b.t==='mine') b.items.forEach(x=>out.push([pg.id,'mine',x])); else if(b.t==='ex') b.items.forEach(x=>out.push([pg.id,'ex',strip(x[1])])); }); });
      return out; }""")
    b.close()
dump = json.dumps(data, ensure_ascii=False)
miss = [s for s in sigs if json.dumps(s[2], ensure_ascii=False)[1:-1] not in dump]
json.dump(data, open(OUT, "w"), ensure_ascii=False, indent=2)
pages = [data["introduction"]] + [o for c in data["chapitres"] for o in c["objectifs"]]
segs = [s for o in pages for s in o["narration_segments"]]
print("erreurs JS:", errs)
print("blocs vérifiés:", len(sigs), "manquants:", len(miss), miss[:5])
print("objectifs:", len(pages), "segments:", len(segs), "sans source (hors titres):", sum(1 for s in segs if not s["source"] and s["role"] not in ("titre","intertitre","avant_capsule")))
print("pauses:", sum(1 for s in segs if s["role"]=="pause_question"), "svg:", sum(1 for o in pages for x in o["sections"] if x.get("schema")=="image_svg"))
print("durée totale (min):", round(sum(o["duree_estimee_secondes"] for o in pages)/60, 1))
MAX_MOTS = 450   # maximum par chapitre, publication-github.md § 10.3
for o in pages: print(" ", o["id"], o["mots"], "mots,", o["duree_estimee_secondes"], "s", "  ⚠ au-dessus de %d mots : décision du parent (plus long, deux chapitres ou détails retirés)" % MAX_MOTS if o["mots"] > MAX_MOTS else "")

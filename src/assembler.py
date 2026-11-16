#!/usr/bin/env python3
"""
assembler.py — assemble un outil de révision en un seul fichier HTML autonome.

    python3 assembler.py <outil>.contenu.js [--couche langues] [--sortie <outil>.html] [--sans-controles]

Entrées (dans le même dossier que ce script, sauf --src) : gabarit.html, base.css, noyau-quiz.js, couche-<nom>.js.
Sortie : <nom du contenu sans .contenu.js>.html, à côté du contenu (ou --sortie).

Après l'assemblage, sauf --sans-controles :
  1. node --check sur le script assemblé (syntaxe) ;
  2. controle-outil.py --runtime (fonctions obligatoires, prénom dans les clés, âge jamais en dur, ouverture à 390 px) ;
  3. un test complet dans Chromium : 300 tests générés par script (chaque bonne réponse est dans les choix et acceptée
     par la correction, identités de cartes uniques et complètes), puis un test joué de bout en bout (toutes les questions, première réponse acceptée tapée), aucune erreur JavaScript.
  4. Dossier seulement : chaque carte a une explication écrite (ans ou expl, jamais le texte de secours de la couche) et un recto
     qui se termine par « ? » (éventuellement suivi d'un guillemet fermant).
  5. Taille : un test sur tous les paquets, terminé, et le test en cours correspondant, mesurés en JSON (limite d'un document
     Claude : 256 Kio) ; erreur au-delà de 248 Kio (marge pour le bilan), avertissement dès 224 Kio.
  6. « Réviser mes erreurs » (noyau v11) : historique simulé sur une carte — erreur (elle entre), une réussite (elle reste),
     une deuxième réussite le même jour (elle reste), une réussite un autre jour (elle sort), une erreur dans un rattrapage
     (rien ne change), une nouvelle erreur (elle revient) ; bouton présent sur l'écran Paquets (avec le bon N) et dans
     l'onglet Scores, grisé « Aucune erreur à réviser 👍 » sans erreur ; le test lancé est en « Je m'entraîne », contient
     la carte, tirée à nouveau (autre énoncé quand la carte en a plusieurs, p. ex. une autre personne en conjugaison), se termine
     et garde revErreurs et la mention « Révision des erreurs » ; bloqué quand un test est en cours.
Le code de sortie est 0 seulement si tout passe.

Le contenu porte sa palette CSS et ses retouches de style dans la constante CSS_THEME (gabarit de chaîne, sans accent grave), appliquée
après base.css, et ses métadonnées (titre, polices, date) dans OUTIL et DUE, lus avec node.
"""
# Versions : 1 (01.11.2026, C1) · 2 (01.11.2026, C2 : identités de cartes uniques et complètes, test joué avec la première réponse acceptée, nombre de questions « toutes »)
# · 3 (01.11.2026, C3 : couche maths, buildTest reçoit aussi l'ordre)
# · 4 (01.11.2026, contrôle qualité : cartes du Dossier vérifiées (explication au verso, recto terminé par « ? ») ; taille d'un test
#   complet mesurée contre la limite de 256 Kio d'un document Claude (erreur au-delà de 248 Kio, avertissement dès 224 Kio))
# · 5 (14.11.2026, noyau v10 : le test joué vérifie que le temps de révision est enregistré — actif, morceaux, ms de chaque question)
# · 6 (15.11.2026, noyau v11 : contrôle 6, « Réviser mes erreurs » sur un historique simulé)
# · 7 (16.11.2026, noyau v14 : contrôle 6 complété — sortie de la liste au niveau de l'erreur ou plus haut (une réussite plus facile
#   ne compte pas), test lancé au niveau choisi sous le bouton (Niveau épreuve) sans toucher au niveau des réglages, « Refaire ces
#   cartes » ne change plus les réglages)
import json, os, re, subprocess, sys, tempfile, datetime

ICI = os.path.dirname(os.path.abspath(__file__))

def lire(p):
    with open(p, encoding="utf-8") as f: return f.read()

def css_du_contenu(js):
    m = re.search(r"const CSS_THEME = `(.*?)`;", js, re.S)
    if not m: raise SystemExit("contenu : constante CSS_THEME introuvable")
    return m.group(1).strip("\n")

def meta_du_contenu(chemin):
    """Évalue le contenu avec node (données seulement) et renvoie OUTIL, DUE, VERSION, QUIZ_ID."""
    script = lire(chemin) + "\nconsole.log(JSON.stringify({OUTIL, DUE, VERSION, QUIZ_ID, nDecks: DECKS.length}));"
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as t:
        t.write("const esc=s=>s, shuffle=a=>a, pickOptions=()=>[];\n" + script); nom = t.name
    p = subprocess.run(["node", nom], capture_output=True, text=True); os.unlink(nom)
    if p.returncode: raise SystemExit("contenu : erreur à l'évaluation\n" + p.stderr[:800])
    return json.loads(p.stdout.strip().splitlines()[-1])

def assembler(contenu, couche="langues", sortie=None, src=ICI):
    js_contenu = lire(contenu)
    js_couche = lire(os.path.join(src, f"couche-{couche}.js"))
    js_noyau = lire(os.path.join(src, "noyau-quiz.js"))
    gabarit = lire(os.path.join(src, "gabarit.html"))
    base = lire(os.path.join(src, "base.css"))
    meta = meta_du_contenu(contenu)
    O, D = meta["OUTIL"], meta["DUE"]
    rempl = {
        "TITRE": O["titre"], "DUE_LONG": D["long"], "POLICES": O["polices"],
        "CSS_CONTENU": css_du_contenu(js_contenu), "CSS_BASE": base,
        "DATE_ASSEMBLAGE": datetime.date.today().strftime("%d.%m.%Y"),
        "FICHIER_CONTENU": os.path.basename(contenu), "FICHIER_COUCHE": f"couche-{couche}.js",
        "JS_CONTENU": js_contenu, "JS_COUCHE": js_couche, "JS_NOYAU": js_noyau,
    }
    html = gabarit
    for k, v in rempl.items(): html = html.replace("{{" + k + "}}", v)
    reste = re.findall(r"\{\{[A-Z_]+\}\}", html)
    if reste: raise SystemExit("gabarit : repères non remplis " + ", ".join(reste))
    if not sortie: sortie = re.sub(r"\.contenu\.js$", ".html", contenu)
    with open(sortie, "w", encoding="utf-8") as f: f.write(html)
    return sortie, meta

def controles(sortie, src=ICI):
    ok = True
    html = lire(sortie)
    js = html[html.index("<script>") + 8 : html.rindex("</script>")]
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as t:
        t.write(js); nom = t.name
    p = subprocess.run(["node", "--check", nom], capture_output=True, text=True); os.unlink(nom)
    print("syntaxe JavaScript :", "OK" if p.returncode == 0 else "ERREUR " + p.stderr[:300]); ok &= p.returncode == 0
    ctrl = os.path.join(src, "controle-outil.py")
    if not os.path.exists(ctrl): ctrl = os.path.join(os.path.dirname(src), "controle-outil.py")
    if os.path.exists(ctrl):
        p = subprocess.run([sys.executable, ctrl, sortie, "--runtime"], capture_output=True, text=True)
        print(p.stdout.strip()); ok &= p.returncode == 0
    else:
        print("controle-outil.py introuvable : contrôle de dérive sauté"); ok = False
    ok &= test_navigateur(sortie)
    return ok

def test_navigateur(sortie):
    try:
        from playwright.sync_api import sync_playwright
    except Exception:
        print("Playwright indisponible : test dans Chromium sauté"); return False
    erreurs = []
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(viewport={"width": 390, "height": 844})
        pg.on("pageerror", lambda e: erreurs.append(str(e)[:160]))
        pg.goto("file://" + os.path.abspath(sortie)); pg.wait_for_timeout(600)
        gen = pg.evaluate("""() => {
          let n = 0, bad = [];
          const keys = DECKS.map(d => d.key);
          for (let t = 0; t < 300; t++){
            const diff = ["easy","normal","hard"][t % 3];
            const qs = buildTest(keys, diff, 0, ORDRES ? Object.keys(ORDRES)[t % 2] : "");
            qs.forEach(q => { n++;
              if (q.type === "mcq"){ if (!q.options.includes(q.answer)) bad.push("choix sans la réponse : " + q.prompt); if (!isRight(q, q.answer)) bad.push("réponse refusée : " + q.prompt); }
              else { const acc = q.accept || [q.answer]; if (!acc.some(a => isRight(q, a))) bad.push("réponse écrite refusée : " + q.prompt); }
              if (!q.card || !CARD[q.card]) bad.push("carte inconnue : " + q.prompt);
              if (!q.expl) bad.push("sans explication : " + q.prompt);
            });
          }
          const uniq = new Set(CARDS.map(c => c.k)); if (uniq.size !== CARDS.length) bad.push("identités de cartes en double : " + (CARDS.length - uniq.size));
          if (CARDS.some(c => /undefined|null/.test(c.k))) bad.push("identité de carte incomplète : " + CARDS.find(c => /undefined|null/.test(c.k)).k);
          return { n, bad: bad.slice(0, 5), nbad: bad.length, cards: CARDS.length };
        }""")
        print(f"questions générées : {gen['n']} ({gen['cards']} cartes) ; problèmes : {gen['nbad']}", gen["bad"] if gen["nbad"] else "")
        dos = pg.evaluate("""() => {
          if (typeof dExplain !== "function") return null;   /* pas un Dossier */
          const sans = [], recto = [];
          DECKS.forEach(d => d.items.forEach(it => {
            const ex = String(it.ans || it.expl || "").trim();
            if (!ex) sans.push(d.key + " : " + String(it.front).slice(0, 70));
            if (!/\\?\\s*[»"”']?\\s*$/.test(String(it.front))) recto.push(d.key + " : " + String(it.front).slice(0, 70));
          }));
          return { n: DECKS.reduce((s, d) => s + d.items.length, 0), sans, recto };
        }""")
        dos_ok = True
        if dos is not None:
            dos_ok = not dos["sans"] and not dos["recto"]
            print(f"cartes du Dossier : {dos['n']} ; sans explication : {len(dos['sans'])} ; recto sans « ? » : {len(dos['recto'])}",
                  (dos["sans"][:5] + dos["recto"][:5]) if not dos_ok else "")
        taille = pg.evaluate("""() => {
          const keys = DECKS.map(d => d.key), tailles = [];
          ["easy","normal","hard"].forEach(diff => {
            const qs = buildTest(keys, diff, 0, ORDRES ? Object.keys(ORDRES)[0] : "");
            const detail = qs.map(q => ({ num:q.num, ex:q.ex, ref:q.ref || q.exTitle, prompt:q.prompt, user:q.answer, answer:q.answer,
              correct:false, expl:q.expl, tag:q.tag, question:q, liveFixed:false, liveSnap:"", ms:120000 }));
            const att = { id:String(Date.now()), quiz:QUIZ_ID, date:Date.now(), branche:OUTIL.branche, theme:THEME, deck:OUTIL.labelTout,
              difficulty:"Niveau épreuve", mode:"Épreuve blanche", rattrapage:false, parent:null, score:0, total:qs.length, note:1, actif:120000*qs.length, morceaux:[[Date.now()-1e7, Date.now()],[Date.now()-1e7, Date.now()],[Date.now()-1e7, Date.now()]], questions:detail };
            const draft = { v:2, questions:qs, i:qs.length - 1, answers:qs.map(q => ({ u:q.answer, c:false, ms:120000 })), qms:120000, mc:[[Date.now()-1e7, Date.now()],[Date.now()-1e7, Date.now()]], picked:null, typed:"", checked:false,
              ok:false, liveFixed:false, errSnap:"", label:OUTIL.labelTout, start:Date.now(), saved:Date.now(), rattrapage:false, rattrLabel:"",
              rattrParent:null, selected:keys, difficulty:diff, mode:"exam", order:"" };
            tailles.push({ diff, essai:new Blob([JSON.stringify(att)]).size, encours:new Blob([JSON.stringify(draft)]).size });
          });
          return tailles;
        }""")
        maxi = max(max(t["essai"], t["encours"]) for t in taille)
        print("taille d'un test complet (Kio) :", " · ".join(f"{t['diff']} essai {t['essai']/1024:.0f} / en cours {t['encours']/1024:.0f}" for t in taille),
              "→ TROP GROS (limite 256 Kio, marge 8 Kio)" if maxi > 248*1024 else ("→ attention, proche de la limite de 256 Kio" if maxi > 224*1024 else "→ OK"))
        taille_ok = maxi <= 248*1024
        # un test joué de bout en bout (Entraînement, Je m'entraîne), réponses justes
        pg.evaluate("""() => { S.screen = "setup"; S.difficulty = "normal"; S.mode = "train"; S.count = 0; render(); }""")
        pg.click("[data-act=start]"); pg.wait_for_timeout(200)
        for _ in range(400):
            fini = pg.evaluate("() => S.screen === 'results'")
            if fini: break
            pg.evaluate("""() => { const Q = S.quiz, q = Q.questions[Q.i];
              if (Q.checked){ document.querySelector('[data-act=next]').click(); return; }
              if (q.type === "mcq"){ const k = q.options.indexOf(q.answer); document.querySelector('[data-act=pick][data-v="'+k+'"]').click(); }
              else { const inp = document.getElementById("answer-input"); inp.value = (q.accept && q.accept.length) ? q.accept[0] : q.answer; inp.dispatchEvent(new Event("input", {bubbles:true})); document.getElementById("validate-btn").click(); } }""")
            pg.wait_for_timeout(15)
        res = pg.evaluate("() => S.lastResult ? { score:S.lastResult.score, total:S.lastResult.total, note:S.lastResult.note, temps: typeof S.lastResult.actif === 'number' && Array.isArray(S.lastResult.morceaux) && S.lastResult.morceaux.length > 0 && S.lastResult.questions.every(x => typeof x.ms === 'number') } : null")
        print("test joué :", res)
        pg.evaluate("() => { S.screen = 'scores'; render(); }"); pg.wait_for_timeout(200)
        pastilles = pg.evaluate("() => { S.screen = 'home'; render(); return document.querySelectorAll('.deck-pst svg').length; }")
        print("pastilles affichées :", pastilles)
        rev_ok = controle_revision(pg)
        b.close()
    erreurs = [e for e in erreurs if "Failed to load" not in e]
    print("erreurs JavaScript :", erreurs or "aucune")
    if res and not res.get("temps"): print("temps de révision : MANQUE (actif, morceaux ou ms par question absents du test terminé)")
    return gen["nbad"] == 0 and dos_ok and taille_ok and bool(res) and res["score"] == res["total"] and res.get("temps") and rev_ok and not erreurs

def repondre_juste(pg, fin="results"):
    """Joue le test affiché jusqu'au bout, en donnant la première réponse acceptée."""
    for _ in range(600):
        if pg.evaluate("() => S.screen !== 'quiz'"): break
        pg.evaluate("""() => { const Q = S.quiz, q = Q.questions[Q.i];
          if (Q.checked){ document.querySelector('[data-act=next]').click(); return; }
          if (q.type === "mcq"){ const k = q.options.indexOf(q.answer); document.querySelector('[data-act=pick][data-v="'+k+'"]').click(); }
          else { const inp = document.getElementById("answer-input"); inp.value = (q.accept && q.accept.length) ? q.accept[0] : q.answer; inp.dispatchEvent(new Event("input", {bubbles:true})); document.getElementById("validate-btn").click(); } }""")
        pg.wait_for_timeout(15)
    pg.wait_for_timeout(300)

def controle_revision(pg):
    """Contrôle 6 : « Réviser mes erreurs » (noyau v11) sur un historique simulé, puis le bouton et le test qu'il lance."""
    r = pg.evaluate("""() => {
      if (typeof cartesEnErreur !== "function") return { absent:true };
      const k = CARDS[0].k, c = CARD[k];
      let q = null;
      for (const diff of ["normal", "hard", "easy"]){ q = buildTest([c.dk], diff, 0, ORDRES ? Object.keys(ORDRES)[0] : "").find(x => x.card === k); if (q) break; }
      if (!q) return { erreur:"aucune question pour la carte " + k };
      window.__garde = S.attempts;
      const j0 = new Date(); j0.setHours(10, 0, 0, 0); const J = n => j0.getTime() - (10 - n) * 864e5;
      let id = 1;
      const essai = (t, ok, ratt, niv) => ({ id:"sim" + (id++), quiz:QUIZ_ID, date:t, branche:OUTIL.branche, theme:THEME, deck:"historique simulé",
        difficulty:niv || "Entraînement", mode:"Je m'entraîne", rattrapage:!!ratt, parent:null, score:ok ? 1 : 0, total:1, note:ok ? 6 : 1, actif:1000, morceaux:[[t, t + 1000]],
        questions:[{ num:1, ex:1, ref:"", prompt:q.prompt, user:ok ? q.answer : "", answer:q.answer, correct:ok, expl:q.expl, tag:q.tag, question:q, liveFixed:false, liveSnap:"", ms:1000 }] });
      const pas = [];
      const etape = (nom, att, attendu) => { if (att) S.attempts = [att, ...S.attempts]; const obtenu = cartesEnErreur().includes(k); pas.push({ nom, attendu, obtenu, ok:obtenu === attendu }); };
      S.attempts = [];
      etape("aucun test", null, false);
      etape("erreur (Je ne sais pas)", essai(J(1), false), true);
      etape("1re réussite", essai(J(2), true), true);
      etape("2e réussite le même jour", essai(J(2) + 3600e3, true), true);
      etape("réussite un autre jour", essai(J(3), true), false);
      etape("erreur dans un rattrapage (ne compte pas)", essai(J(3) + 7200e3, false, true), false);
      etape("nouvelle erreur", essai(J(4), false), true);
      const v14 = typeof NIV_SYMB !== "undefined";
      if (v14){
        etape("réussite en Échauffement un autre jour (plus facile : ne compte pas)", essai(J(5), true, false, "Échauffement"), true);
        etape("réussite en Échauffement encore un autre jour (ne compte pas)", essai(J(6), true, false, "Échauffement"), true);
        etape("réussite au Niveau épreuve (plus difficile : compte)", essai(J(7), true, false, "Niveau épreuve"), true);
        etape("réussite à l'Entraînement un autre jour (même niveau : sort)", essai(J(8), true), false);
        etape("erreur au Niveau épreuve", essai(J(8) + 3600e3, false, false, "Niveau épreuve"), true);
        etape("réussite à l'Entraînement un autre jour (plus facile : reste)", essai(J(9), true), true);
        etape("réussite à l'Entraînement encore un autre jour (plus facile : reste)", essai(J(10) - 3600e3, true), true);
      }
      const n = cartesEnErreur().length;
      S.difficulty = "easy"; S.revNiv = "hard";
      S.draft = null; S.screen = "home"; render();
      const bt = document.querySelector("[data-act=reviserErreurs]");
      const paquets = !!bt && bt.textContent.includes("Réviser mes erreurs (" + n + ")");
      S.screen = "scores"; render();
      const scores = !!document.querySelector(".suivi [data-act=reviserErreurs]");
      S.screen = "home"; render(); document.querySelector("[data-act=reviserErreurs]").click();
      const lance = S.screen === "quiz" && !!S.quiz && S.quiz.questions.some(x => x.card === k) && S.quiz.questions.length === n
        && S.mode === "train" && S.quiz.label.startsWith(REV_LABEL) && (!v14 || (S.qDiff === "hard" && S.difficulty === "easy"));
      /* sans rejouer à l'identique : quand la carte peut changer d'énoncé (conjugaison : autre personne), il change */
      const nouveau = lance ? S.quiz.questions.find(x => x.card === k).prompt : "";
      let possible = false;
      for (let t = 0; t < 20 && !possible; t++) possible = buildTest([c.dk], v14 ? S.revNiv : S.difficulty, 0, ORDRES ? Object.keys(ORDRES)[0] : "").some(x => x.card === k && x.prompt !== q.prompt);
      const autre = !possible || nouveau !== q.prompt;
      return { k, pas, n, paquets, scores, lance, autre, possible, v14 };
    }""")
    if r.get("absent"):
        print("réviser mes erreurs : MANQUE (cartesEnErreur absente du noyau)"); return False
    if r.get("erreur"):
        print("réviser mes erreurs :", r["erreur"]); return False
    ok = all(x["ok"] for x in r["pas"]) and r["paquets"] and r["scores"] and r["lance"] and r["autre"]
    if r["lance"]: repondre_juste(pg)
    fin = pg.evaluate("""() => {
      const a = S.lastResult, fini = !!a && a.revErreurs === true && !a.rattrapage && a.deck.startsWith(REV_LABEL) && a.score === a.total;
      const histo = fini && S.attempts[0] && S.attempts[0].id === a.id;
      /* v14 : la révision est enregistrée au niveau choisi, les réglages n'ont pas bougé ; « Refaire ces cartes » non plus */
      let niveaux = true;
      if (typeof NIV_SYMB !== "undefined"){
        niveaux = !!a && a.difficulty === "Niveau épreuve" && S.difficulty === "easy";
        S.screen = "scores"; render(); const rc = document.querySelector("[data-act=redoCards][data-v=resist]");
        if (rc){ rc.click(); niveaux = niveaux && S.screen === "quiz" && S.qDiff === "hard" && S.difficulty === "easy"; draftClear(); S.quiz = null; }
        S.difficulty = "normal";
      }
      /* un seul test à la fois : un test gardé pour plus tard bloque le bouton */
      S.screen = "setup"; render(); document.querySelector("[data-act=start]").click();
      document.querySelector("[data-act=quit]").click(); document.querySelector("[data-act=quitKeep]").click();
      S.screen = "home"; render(); const b2 = document.querySelector("[data-act=reviserErreurs]");
      if (b2) b2.click();
      const bloque = !!S.draft && S.draftBlock === true && S.screen === "home";
      draftClear();
      /* sans erreur : bouton grisé */
      S.attempts = []; S.screen = "home"; render();
      const gris = [...document.querySelectorAll("button[disabled]")].some(x => x.textContent.includes("Aucune erreur à réviser 👍"));
      S.attempts = window.__garde || []; S.lastResult = null; S.screen = "home"; render();
      return { fini, histo, bloque, gris, niveaux };
    }""")
    ok = ok and fin["fini"] and fin["histo"] and fin["bloque"] and fin["gris"] and fin["niveaux"]
    print("réviser mes erreurs (historique simulé) :", " · ".join(f"{x['nom']} → {'dans la liste' if x['obtenu'] else 'hors liste'}{'' if x['ok'] else ' ✗'}" for x in r["pas"]))
    print(f"réviser mes erreurs (bouton) : Paquets {'OK' if r['paquets'] else 'MANQUE'} (N = {r['n']}) · Scores {'OK' if r['scores'] else 'MANQUE'} · test lancé {'OK' if r['lance'] else 'MANQUE'}"
          f" · question tirée à nouveau {('OK, autre énoncé' if r['possible'] else 'OK (la carte a un seul énoncé)') if r['autre'] else 'MANQUE (même énoncé)'}"
          f"{(' · niveau choisi sous le bouton, réglages intacts ' + ('OK' if fin['niveaux'] else 'MANQUE')) if r.get('v14') else ''}"
          f" · terminé et marqué {'OK' if fin['fini'] and fin['histo'] else 'MANQUE'} · un seul test à la fois {'OK' if fin['bloque'] else 'MANQUE'} · grisé sans erreur {'OK' if fin['gris'] else 'MANQUE'}"
          f" → {'OK' if ok else 'ÉCHEC'}")
    return ok

def main(argv):
    args = [a for a in argv if not a.startswith("--")]
    if not args: print(__doc__); return 2
    couche = argv[argv.index("--couche") + 1] if "--couche" in argv else "langues"
    sortie = argv[argv.index("--sortie") + 1] if "--sortie" in argv else None
    src = argv[argv.index("--src") + 1] if "--src" in argv else ICI
    out, meta = assembler(args[0], couche, sortie, src)
    print(f"assemblé : {out} ({os.path.getsize(out)} octets) — {meta['OUTIL']['titre']}, v{meta['VERSION']['n']}, {meta['nDecks']} paquets")
    if "--sans-controles" in argv: return 0
    return 0 if controles(out, src) else 1

if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))

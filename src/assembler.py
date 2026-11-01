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
     par la correction), puis un test joué de bout en bout, aucune erreur JavaScript.
Le code de sortie est 0 seulement si tout passe.

Le contenu porte sa palette CSS dans la constante CSS_THEME (gabarit de chaîne, sans accent grave), et ses métadonnées (titre, polices, date) dans OUTIL et DUE, lus avec node.
"""
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
            const qs = buildTest(keys, diff);
            qs.forEach(q => { n++;
              if (q.type === "mcq"){ if (!q.options.includes(q.answer)) bad.push("choix sans la réponse : " + q.prompt); if (!isRight(q, q.answer)) bad.push("réponse refusée : " + q.prompt); }
              else { const acc = q.accept || [q.answer]; if (!acc.some(a => isRight(q, a))) bad.push("réponse écrite refusée : " + q.prompt); }
              if (!q.card || !CARD[q.card]) bad.push("carte inconnue : " + q.prompt);
              if (!q.expl) bad.push("sans explication : " + q.prompt);
            });
          }
          return { n, bad: bad.slice(0, 5), nbad: bad.length, cards: CARDS.length };
        }""")
        print(f"questions générées : {gen['n']} ({gen['cards']} cartes) ; problèmes : {gen['nbad']}", gen["bad"] if gen["nbad"] else "")
        # un test joué de bout en bout (Entraînement, Je m'entraîne), réponses justes
        pg.evaluate("""() => { S.screen = "setup"; S.difficulty = "normal"; S.mode = "train"; render(); }""")
        pg.click("[data-act=start]"); pg.wait_for_timeout(200)
        for _ in range(400):
            fini = pg.evaluate("() => S.screen === 'results'")
            if fini: break
            pg.evaluate("""() => { const Q = S.quiz, q = Q.questions[Q.i];
              if (Q.checked){ document.querySelector('[data-act=next]').click(); return; }
              if (q.type === "mcq"){ const k = q.options.indexOf(q.answer); document.querySelector('[data-act=pick][data-v="'+k+'"]').click(); }
              else { const inp = document.getElementById("answer-input"); inp.value = q.answer; inp.dispatchEvent(new Event("input", {bubbles:true})); document.getElementById("validate-btn").click(); } }""")
            pg.wait_for_timeout(15)
        res = pg.evaluate("() => S.lastResult ? { score:S.lastResult.score, total:S.lastResult.total, note:S.lastResult.note } : null")
        print("test joué :", res)
        pg.evaluate("() => { S.screen = 'scores'; render(); }"); pg.wait_for_timeout(200)
        pastilles = pg.evaluate("() => { S.screen = 'home'; render(); return document.querySelectorAll('.deck-pst svg').length; }")
        print("pastilles affichées :", pastilles)
        b.close()
    erreurs = [e for e in erreurs if "Failed to load" not in e]
    print("erreurs JavaScript :", erreurs or "aucune")
    return gen["nbad"] == 0 and bool(res) and res["score"] == res["total"] and not erreurs

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

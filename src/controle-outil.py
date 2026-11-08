#!/usr/bin/env python3
"""
controle-outil.py — contrôle de dérive d'un outil de révision (HTML autonome).

Dit ce qui manque à un outil par rapport aux fiches (claude/prompt-artefact-revision.md,
claude/publication-github.md). Ne modifie jamais l'outil.

Usage :
    python3 controle-outil.py outil.html [autre.html ...] [--runtime] [--json] [--synthese]

    --runtime   ouvre chaque outil dans Chromium (390 px) et relève les erreurs JavaScript
                (Playwright requis ; sinon cette partie est sautée et signalée)
    --json      sortie JSON au lieu du texte
    --synthese  une ligne par outil + tableau des écarts, au lieu du détail

Code de sortie : 0 = aucun écart bloquant ; 1 = au moins un écart bloquant (sert à l'assembleur).

Niveaux : OK · MANQUE (bloquant) · AVERTISSEMENT (à regarder) · SANS OBJET (ne concerne pas la famille).
Les outils n'utilisent pas tous les mêmes noms de fonctions : chaque fonctionnalité est donc
reconnue par plusieurs écritures (alias). Une écriture inconnue donne « MANQUE » à tort ; dans ce cas,
ajouter l'alias dans ALIAS plutôt que d'ignorer l'écart.

Versions : 1 (01.11.2026, B1) · 2 (01.11.2026, C3 : pour un outil assemblé sur le noyau commun, le nombre d'anneaux et la
correction en direct se lisent dans ce que la couche déclare, pas dans le code du noyau).
"""
import json, os, re, subprocess, sys, tempfile

# ---------------------------------------------------------------- lecture
def lire(chemin):
    with open(chemin, encoding="utf-8") as f:
        return f.read()

def prenom_de(chemin):
    m = re.search(r"_(Livio|Liano)_", os.path.basename(chemin))
    return m.group(1).lower() if m else None

def branche_de(chemin):
    m = re.search(r"_(?:Livio|Liano)_([A-Za-zéèÉ]+)_", os.path.basename(chemin))
    return m.group(1) if m else ""

def famille_de(chemin, src):
    b = branche_de(chemin).lower()
    if b.startswith("math"): return "maths"
    if b.startswith(("histoire", "geographie", "géographie", "sciences")): return "dossier"
    if b.startswith(("allemand", "anglais", "francais", "français")): return "langues"
    # nom de fichier inconnu : on déduit du contenu
    if re.search(r"\bconst\s+CHAPTERS\b", src): return "dossier"
    if "mcqOnly" in src and re.search(r"Combien de questions|Comme la feuille papier", src): return "maths"
    return "langues"

def scripts_de(src):
    return re.findall(r"<script(?![^>]*\bsrc=)(?![^>]*type=\"application/json\")[^>]*>(.*?)</script>", src, re.S)

# ---------------------------------------------------------------- alias
# Chaque clé = une fonctionnalité ; chaque alias = une écriture déjà vue dans un outil.
ALIAS = {
    "test_en_cours_cle":   [r"test-en-cours"],
    "test_en_cours_ecrit": [r"\bdraftSave\b", r"\bdraftWrite\b", r"\bsaveDraft\b"],
    "test_en_cours_reprise": [r"\bdraftResume\b", r"\bresumeDraft\b", r"\bdraftBanner\b"],
    "un_seul_test":        [r"Un seul test à la fois", r"\bblockedTest\b"],
    "garder_plus_tard":    [r"Garder pour plus tard", r"\bkeepForLater\b"],
    "courbe":              [r"\bsuiviChart\b", r"\bcurveSVG\b"],
    "jour_par_jour":       [r"\bsuiviHeat\b", r"\bheatHTML\b"],
    "cartes_resistent":    [r"\bresistant\(", r"\bresistantHTML\b", r"cartes qui résistent"],
    "pastille":            [r"\bpastille\w*\(", r"\bpastilleFull\b", r"\bringSvg\b", r"\bring3Svg\b", r"\bglobalPastille\w*\b"],
    "trois_anneaux":       [r"\bring3Svg\b", r"deckRingLevel\([^)]*\"echauff\""],
    "verrou_fin":          [r"if\s*\(\s*[\w.]*(finishing|finished|ending|isFinishing)\s*\)\s*return", r"\bfinishing\s*=\s*true"],
    "bilan_def":           [r"function\s+(bilanBlock|bilanHTML)\b"],
    "bilan_appel":         [r"(?<!function )\b(bilanBlock|bilanHTML)\s*\("],
    "erreurs_vue":         [r"function\s+errView\b"],
    "erreurs_carte":       [r"function\s+errCard\b"],
    "voir_erreurs_texte":  [r"Voir mes erreurs"],
    "refaire_erreurs":     [r"Refaire mes erreurs"],
    "rattrapage_parent":   [r"\bparent\b\s*[:=]", r"\.parent\b"],
    "analyse_sample":      [r"Analyser mes résultats"],
    "copier_chat":         [r"Copier pour le chat"],
    "version_papier":      [r"Version papier"],
    "correction_direct":   [r"Correction en direct"],
    "has_claude":          [r"\bHAS_CLAUDE\b"],
    "note_suisse":         [r"Math\.round\(\(1\s*\+\s*5"],
    "couleurs_pastille":   [r"--p-okdark"],
}

def a(src, cle):
    """Nombre d'occurrences de la fonctionnalité `cle` (tous alias confondus)."""
    return sum(len(re.findall(p, src)) for p in ALIAS[cle])

def a_une(src, cle):
    return a(src, cle) > 0

# ---------------------------------------------------------------- contrôles
class R:
    def __init__(s): s.l = []
    def add(s, niveau, code, texte, detail=""):
        s.l.append({"niveau": niveau, "code": code, "texte": texte, "detail": detail})
    def ok(s, c, t, d=""): s.add("OK", c, t, d)
    def manque(s, c, t, d=""): s.add("MANQUE", c, t, d)
    def avert(s, c, t, d=""): s.add("AVERTISSEMENT", c, t, d)
    def sans(s, c, t): s.add("SANS OBJET", c, t)
    def test(s, cond, c, t, d="", niveau="MANQUE"):
        s.add("OK" if cond else niveau, c, t, "" if cond else d)

def controle(chemin, runtime=False):
    src = lire(chemin)
    pre = prenom_de(chemin)
    fam = famille_de(chemin, src)
    r = R()
    if len(src) < 2000 and "http-equiv=\"refresh\"" in src.replace("'", '"'):
        r.add("SANS OBJET", "redirection", "page de redirection (ancienne adresse), rien à contrôler", "")
        return {"fichier": os.path.basename(chemin), "prenom": pre, "famille": "redirection", "resultats": r.l}

    # 1. Syntaxe JavaScript
    ok_syntaxe, detail = True, ""
    for i, js in enumerate(scripts_de(src)):
        if len(js.strip()) < 50: continue
        with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as t:
            t.write(js); nom = t.name
        p = subprocess.run(["node", "--check", nom], capture_output=True, text=True)
        os.unlink(nom)
        if p.returncode:
            ok_syntaxe = False; detail = (p.stderr.strip().splitlines() or ["erreur"])[0][:160]; break
    r.test(ok_syntaxe, "syntaxe", "JavaScript sans erreur de syntaxe", detail)

    # 2. Règles techniques de la fiche construction § 2
    r.test("<form" not in src.lower(), "form", "aucune balise <form>", "balise <form> trouvée")
    r.test(not re.search(r"window\.(confirm|alert|prompt)\s*\(|[^.\w]alert\s*\(|[^.\w]confirm\s*\(", src),
           "dialogues", "ni window.confirm ni alert (confirmations dans la page)", "confirm() ou alert() trouvé")
    r.test(not re.search(r"sk-ant-|x-api-key|api[_-]?key\s*[:=]", src, re.I),
           "cle_api", "aucune clé d'API dans la page", "clé d'API possible : le site est public", )
    r.test(bool(re.search(r"<meta[^>]+name=[\"']viewport", src)) or "<title>" in src, "titre", "balise <title> présente", "pas de <title>")

    # 3. Prénom et clés de stockage (fiche construction, « Règles techniques » ; ancien construction § 2)
    m = re.search(r"\bQUIZ_ID\s*=\s*[\"']([^\"']+)[\"']", src)
    if not m:
        r.manque("cle_prenom", "clé de stockage QUIZ_ID présente", "QUIZ_ID introuvable")
    else:
        quiz = m.group(1)
        if pre and quiz.startswith(pre + "-quiz-"):
            r.ok("cle_prenom", f"clé de stockage préfixée par le prénom ({quiz})")
        else:
            r.manque("cle_prenom", "clé de stockage préfixée par le prénom (« <prénom>-quiz-… »)",
                     f"QUIZ_ID = {quiz} ; prénom du fichier : {pre}")
    autre = {"livio": "liano", "liano": "livio"}.get(pre or "", "")
    r.test(not autre or not re.search(rf"[\"']{autre}-quiz-", src), "cle_autre_prenom",
           "aucune clé de l'autre frère (historiques jamais mélangés)", f"clé « {autre}-quiz- » trouvée")

    # 4. Version et sources
    mv = re.search(r"\bVERSION\s*=\s*\{\s*n\s*:\s*(\d+)\s*,\s*date\s*:\s*[\"']([^\"']+)", src)
    r.test(bool(mv), "version", "constante VERSION { n, date }" + (f" (v{mv.group(1)}, {mv.group(2)})" if mv else ""), "VERSION introuvable")
    r.test(bool(re.search(r"\bSOURCES\b\s*=|const\s+SOURCES\b", src)) and "D'où viennent les questions" in src,
           "sources", "SOURCES + section « D'où viennent les questions »", "SOURCES ou section « D'où viennent les questions » absent")
    r.test(a_une(src, "has_claude"), "has_claude", "détection de l'environnement (HAS_CLAUDE)", "HAS_CLAUDE absent")

    # 5. Âge jamais écrit en dur (socle : « Public et ton »)
    ages = []
    for i, ligne in enumerate(src.splitlines(), 1):
        for mm in re.finditer(r"(enfant|élève|eleve|garçon|il a|elle a)[^.\n]{0,25}?\b(\d{1,2})\s*ans\b", ligne, re.I):
            ages.append(f"l.{i} « {mm.group(0)[:50]} »")
    r.test(not ages, "age", "aucun âge écrit en dur", "; ".join(ages[:3]) + (f" (+{len(ages)-3})" if len(ages) > 3 else ""))

    # 6. Note suisse et couleurs
    r.test(a_une(src, "note_suisse"), "note", "note suisse sur 6 (arrondie au demi-point)", "formule de la note absente")

    # 7. Fin de test, Bilan, erreurs, rattrapage
    r.test(a_une(src, "verrou_fin"), "verrou_fin", "verrou de fin de test (une seule fois)", "aucun « if(finishing) return » ni « finishing = true »")
    nb_bilan = a(src, "bilan_appel")
    r.test(a_une(src, "bilan_def") and nb_bilan >= 2, "bilan", "bloc Bilan unique, appelé aux deux endroits",
           f"fonction Bilan : {a(src,'bilan_def')} ; appels : {nb_bilan} (≥ 2 attendus)")
    r.test(a_une(src, "analyse_sample") and a_une(src, "copier_chat"), "bilan_boutons", "« Analyser mes résultats » + « Copier pour le chat »", "bouton absent")
    r.test(a_une(src, "erreurs_vue") and a_une(src, "erreurs_carte") and a_une(src, "voir_erreurs_texte"),
           "voir_erreurs", "« Voir mes erreurs » (errView + errCard)", "errView, errCard ou le libellé manque")
    r.test(a_une(src, "refaire_erreurs") and a_une(src, "rattrapage_parent"), "rattrapage", "rattrapage rattaché à son test (parent)", "« Refaire mes erreurs » ou champ parent absent")
    r.test(a_une(src, "version_papier"), "papier", "version papier du test", "bouton absent")

    # 8. Test en cours gardé (construction § 2)
    tec = [a_une(src, "test_en_cours_cle"), a_une(src, "test_en_cours_ecrit"), a_une(src, "test_en_cours_reprise")]
    r.test(all(tec), "test_en_cours", "test en cours gardé (clé test-en-cours, enregistrement, reprise)",
           "manque : " + ", ".join(n for n, v in zip(["clé test-en-cours", "enregistrement", "reprise"], tec) if not v))
    r.test(a_une(src, "un_seul_test"), "un_seul_test", "un seul test à la fois", "message « Un seul test à la fois » absent")
    r.test(a_une(src, "garder_plus_tard"), "garder_plus_tard", "✕ → « Garder pour plus tard »", "libellé absent")

    # 9. Suivi graphique (construction § 6 quater)
    r.test(a_une(src, "courbe"), "courbe", "courbe des notes", "suiviChart / curveSVG absent")
    r.test(a_une(src, "jour_par_jour"), "jour_par_jour", "chapitres jour après jour", "suiviHeat / heatHTML absent")
    r.test(a_une(src, "cartes_resistent"), "resistent", "cartes qui résistent", "resistant absent")
    r.test(a_une(src, "pastille"), "pastille", "pastilles de maîtrise", "aucune fonction de pastille")
    r.test(a_une(src, "couleurs_pastille"), "couleurs", "variables de couleur des pastilles (--p-okdark…)", "variables --p-* absentes")

    # 10. Anneaux selon la famille
    # Outil assemblé (noyau commun, refonte 2026) : le noyau contient les deux moteurs ; ce qui compte est ce que la couche déclare.
    m_rings = re.search(r"const COUCHE = \{\s*rings:\s*(\d)", src)
    if m_rings:
        n_rings = int(m_rings.group(1)); live = bool(re.search(r"const COUCHE = \{[^}]*?hasLive:\s*true", src, re.S))
        if fam == "langues":
            r.test(n_rings == 3, "anneaux", "pastille à trois anneaux (langues et français)", "la couche déclare %d anneau(x)" % n_rings)
            r.ok("anneau_niveau", "un anneau = un niveau (noyau commun)")
            r.test(live, "correction_direct", "mode « Correction en direct »", "la couche ne déclare pas la correction en direct")
        else:
            r.test(n_rings == 1, "anneaux", "un seul anneau (Dossier et maths)", "la couche déclare %d anneaux" % n_rings)
            r.sans("anneau_niveau", "un anneau = un niveau (langues seulement)")
            r.test(not live, "correction_direct", "pas de « Correction en direct » (langues seulement)",
                   "la couche déclare la correction en direct", niveau="AVERTISSEMENT")
    elif fam == "langues":
        r.test(a_une(src, "trois_anneaux"), "anneaux", "pastille à trois anneaux (langues et français)", "pas de rendu à trois anneaux")
        # un anneau = un niveau (v21 de la fiche construction)
        if re.search(r"lvl\s*===\s*ringLvl|Un anneau\s*=\s*un niveau|const\s+levels\s*=\s*\[\s*lv\s*\]", src):
            r.ok("anneau_niveau", "un anneau = un niveau")
        elif a_une(src, "trois_anneaux"):
            r.manque("anneau_niveau", "un anneau = un niveau (v21)", "l'ancienne règle compte encore les niveaux plus difficiles")
        else:
            r.sans("anneau_niveau", "un anneau = un niveau (pas de trois anneaux)")
        r.test(a_une(src, "correction_direct"), "correction_direct", "mode « Correction en direct »", "mode absent (obligatoire en langues)")
    else:
        r.test(not a_une(src, "trois_anneaux"), "anneaux", "un seul anneau (Dossier et maths)", "trois anneaux dans un outil Dossier ou maths")
        r.sans("anneau_niveau", "un anneau = un niveau (langues seulement)")
        r.test(not a_une(src, "correction_direct"), "correction_direct", "pas de « Correction en direct » (langues seulement)",
               "mode présent dans un outil qui n'est pas de langues", niveau="AVERTISSEMENT")

    # 10 bis. Allemand : Umlaute contrôlés (fiche construction v32, « Couche Langues »), outils assemblés sur le noyau seulement
    if branche_de(chemin).lower().startswith("allemand"):
        if m_rings:
            r.test(bool(re.search(r"\bumlautsStricts\s*:\s*true\b", src)), "umlauts",
                   "allemand : OUTIL.umlautsStricts: true (ä ≠ a à la correction, en correction en direct et dans « Voir mes erreurs »)",
                   "réglage absent : une réponse sans Umlaut serait acceptée")
        else:
            r.sans("umlauts", "allemand : umlautsStricts (outil d'avant le noyau)")

    # 11. Spécificités maths et Dossier
    if fam == "maths":
        r.test("mcqOnly" in src, "maths_mcqonly", "mcqOnly pour les questions de règle", "mcqOnly absent")
        r.test(bool(re.search(r"Combien de questions", src)) and bool(re.search(r"Comme la feuille papier", src)), "maths_reglages",
               "réglages « Combien de questions » et « Ordre des questions »", "un des deux réglages manque")
    if fam == "dossier":
        for cle, motif, txt in [("dossier_chapitres", r"\bconst\s+CHAPTERS\b", "chapitres (CHAPTERS)"),
                                ("dossier_videos", r"\bconst\s+VIDEOS\b", "capsules (VIDEOS)"),
                                ("dossier_teste", r"Teste-toi sur ce chapitre", "« Teste-toi sur ce chapitre »"),
                                ("dossier_lexique", r"Lexique", "lexique"),
                                ("dossier_etiquettes", r"À vérifier", "étiquette « À vérifier »")]:
            r.test(bool(re.search(motif, src)), cle, txt, "absent")

    # 12. Exécution réelle (facultative)
    if runtime:
        r.add(*executer(chemin))
    return {"fichier": os.path.basename(chemin), "prenom": pre, "famille": fam, "resultats": r.l}

def executer(chemin):
    try:
        from playwright.sync_api import sync_playwright
    except Exception:
        return ("AVERTISSEMENT", "execution", "ouverture dans Chromium", "Playwright indisponible : partie sautée")
    erreurs = []
    try:
        with sync_playwright() as p:
            nav = p.chromium.launch()
            page = nav.new_page(viewport={"width": 390, "height": 844})
            page.on("pageerror", lambda e: erreurs.append(str(e)[:140]))
            # les ressources externes (polices Google…) sont refusées par le bac à sable : ce n'est pas une erreur de l'outil
            page.on("console", lambda m: erreurs.append("console: " + m.text[:120]) if (m.type == "error" and "Failed to load resource" not in m.text) else None)
            page.goto("file://" + os.path.abspath(chemin)); page.wait_for_timeout(1200)
            onglets = page.locator("nav button, .tabbar button, [role=tab]").count()
            nav.close()
    except Exception as e:
        return ("AVERTISSEMENT", "execution", "ouverture dans Chromium", f"échec : {str(e)[:120]}")
    if erreurs:
        return ("MANQUE", "execution", "ouverture à 390 px sans erreur JavaScript", " | ".join(erreurs[:2]))
    return ("OK", "execution", f"ouverture à 390 px sans erreur JavaScript ({onglets} boutons de navigation)", "")

# ---------------------------------------------------------------- sortie
def texte(res):
    ecarts = [x for x in res["resultats"] if x["niveau"] in ("MANQUE", "AVERTISSEMENT")]
    ok = sum(1 for x in res["resultats"] if x["niveau"] == "OK")
    tot = sum(1 for x in res["resultats"] if x["niveau"] != "SANS OBJET")
    bloq = sum(1 for x in ecarts if x["niveau"] == "MANQUE")
    l = [f"== {res['fichier']}  ({res['famille']}, {res['prenom']})  {ok}/{tot} conformes"
         + (f", {bloq} écart(s) bloquant(s)" if bloq else "")]
    for x in ecarts:
        l.append(f"   {'✗' if x['niveau']=='MANQUE' else '!'} {x['texte']}" + (f" — {x['detail']}" if x["detail"] else ""))
    return "\n".join(l)

def synthese(tous):
    codes = []
    for res in tous:
        for x in res["resultats"]:
            if x["niveau"] in ("MANQUE", "AVERTISSEMENT") and x["code"] not in codes: codes.append(x["code"])
    l = ["| Outil | Famille | Conformes | Écarts |", "|---|---|---|---|"]
    for res in tous:
        ok = sum(1 for x in res["resultats"] if x["niveau"] == "OK")
        tot = sum(1 for x in res["resultats"] if x["niveau"] != "SANS OBJET")
        ec = [x["code"] for x in res["resultats"] if x["niveau"] in ("MANQUE", "AVERTISSEMENT")]
        l.append(f"| {res['fichier'][:58]} | {res['famille']} | {ok}/{tot} | {', '.join(ec) or '—'} |")
    return "\n".join(l)

def main(argv):
    args = [x for x in argv if not x.startswith("--")]
    opts = {x for x in argv if x.startswith("--")}
    if not args:
        print(__doc__); return 2
    tous = [controle(c, runtime="--runtime" in opts) for c in args]
    if "--json" in opts: print(json.dumps(tous, ensure_ascii=False, indent=1))
    elif "--synthese" in opts: print(synthese(tous))
    else: print("\n\n".join(texte(r) for r in tous))
    return 1 if any(x["niveau"] == "MANQUE" for r in tous for x in r["resultats"]) else 0

if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))

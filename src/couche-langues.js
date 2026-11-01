/* ============================================================
   COUCHE LANGUES — allemand, anglais, français de grammaire
   (prompt-artefact-revision.md § 11.4). Assemblée entre le contenu et le noyau.

   Ce que la couche attend du CONTENU :
     DECKS[]  : paquets { key, title, emoji, unit, gen, src, items[] }
     GENS     : un générateur par valeur de `gen` : { cards, kinds, fill, pool?, face }
     KINDS    : types de questions { type:"mcq"|"type", tag, aspect, consigne }
     KIND_ORDER, TAG_LABEL
   Ce que la couche fournit au NOYAU (contrat COUCHE) :
     COUCHE.rings      : 3 (Échauffement / Entraînement / Niveau épreuve)
     COUCHE.allCards() : toutes les cartes { dk, word, aspect, mcqOnly, levels, k }
     COUCHE.buildTest(deckKeys, difficulty, limit) : les questions d'un test (limit = nombre de questions, 0 = toutes)
     COUCHE.isRight(q, val) : correction d'une réponse
     COUCHE.cardFace(d, it) : recto / verso d'une carte, ou un tableau de faces (une par aspect)
     COUCHE.liveCands(q)    : candidats pour la correction en direct
     COUCHE.hasLive         : le mode « Correction en direct » existe (langues : oui)
   Les utilitaires (esc, norm, matchAnswer, shuffle, pickOptions, dxN…) viennent du noyau.
   Versions : 1 (01.11.2026, C1) · 2 (01.11.2026, C2 : limite de questions équilibrée entre paquets, label/lang/prompt/consigne posés par fill,
   plusieurs faces par élément, article allemand facultatif en correction en direct)
   · 3 (01.11.2026, D6 : cards() peut donner k (identité de carte d'un ancien outil, à reprendre telle quelle dans q.card par fill)
   et label (libellé de la carte pour « les cartes qui résistent » quand la question enregistrée n'a pas de label) ; le contenu peut aussi fournir COUCHE_CONTENU, ajouté à COUCHE (accroches
   facultatives du noyau ou remplacement d'une fonction de la couche) ; sans eux, rien ne change).

   Ce que fill(q, kind, it, d, pool) peut poser sur la question (étape C2) :
     q.word, q.options | q.accept, q.answer, q.expl, q.hint, q.keep (défaut true)
     q.lang   : "fr" (défaut) ou "de" — touches ä ö ü, article der/die/das facultatif si keep est faux
     q.consigne : remplace la consigne du type de question pour cet élément
     q.prompt : énoncé complet gardé dans l'historique (défaut : consigne « mot »)
     q.label  : libellé court de la carte pour « les cartes qui résistent » (défaut : q.word)
     q.card   : identité de la carte (défaut : paquet | it.front | aspect ; à poser si l'élément n'a pas de front)
   ============================================================ */

/* cartes : identité stable = paquet | énoncé | aspect ; une phrase peut donner deux cartes (type / forme) */
function cardKey(dk, word, aspect){ return dk + "|" + word + "|" + aspect; }
/* énoncé d'un élément : it.front, ou ce que le générateur donne (label) */
function itemFront(g, d, it){ return g.label ? g.label(d, it) : it.front; }

const COUCHE = {
  rings: 3,
  hasLive: true,

  allCards(){
    const out = [];
    DECKS.forEach(d => d.items.forEach(it => {
      const g = GENS[d.gen]; if (!g) throw new Error("Générateur inconnu : " + d.gen);
      const front = itemFront(g, d, it);
      g.cards(d, it).forEach(c => out.push({ dk:d.key, word:front, aspect:c.aspect, mcqOnly:!!c.mcqOnly, levels:c.levels, k:c.k || cardKey(d.key, front, c.aspect), ...(c.label ? { label:c.label } : {}) }));
    }));
    return out;
  },

  /* un exercice par paquet et par type de question, dans l'ordre de KIND_ORDER ; numéros uniques (§ 11.6).
     Avec limit > 0 : on ne garde que limit questions, prises dans chaque paquet coché à tour de rôle. */
  buildTest(deckKeys, difficulty, limit){
    const sel = DECKS.filter(d => deckKeys.includes(d.key));
    /* 1. toutes les (élément, type de question) de chaque paquet */
    let parDeck = sel.map(d => {
      const g = GENS[d.gen];
      return shuffle(d.items.flatMap(it => g.kinds(d, it, difficulty).map(kind => ({ d, g, it, kind }))));
    });
    if (limit && limit > 0 && parDeck.reduce((n, l) => n + l.length, 0) > limit){
      const kept = sel.map(() => []); let i = 0, total = 0;
      while (total < limit && parDeck.some(l => l.length)){ const l = parDeck[i % parDeck.length]; if (l.length){ kept[i % parDeck.length].push(l.shift()); total++; } i++; }
      parDeck = kept;
    }
    /* 2. regroupement par paquet puis par type de question */
    const qs = []; let num = 0, ex = 0;
    parDeck.forEach((list, di) => {
      const d = sel[di], g = GENS[d.gen];
      const buckets = {}; KIND_ORDER.forEach(k => buckets[k] = []);
      list.forEach(x => buckets[x.kind].push(x.it));
      const pool = g.pool ? g.pool(d) : [];
      KIND_ORDER.forEach(kind => {
        const items = buckets[kind]; if (!items.length) return;
        ex++; const K = KINDS[kind];
        items.forEach(it => {
          num++;
          const q = { id:"q"+num, num, ex, exTitle:d.title, deckKey:d.key, kind, type:K.type, tag:K.tag, aspect:K.aspect, lang:"fr", consigne:K.consigne, keep:true, hint:"" };
          g.fill(q, kind, it, d, pool);
          if (!q.card) q.card = cardKey(d.key, itemFront(g, d, it), K.aspect);
          if (!q.prompt) q.prompt = `${q.consigne} « ${q.word} »`;
          qs.push(q);
        });
      });
    });
    return qs;
  },

  isRight(q, val){ return q.type === "mcq" ? val === q.answer : matchAnswer(val, q.accept, q.lang, q.keep); },

  cardFace(d, it){ return GENS[d.gen].face(d, it); },

  /* candidats de la correction en direct : réponses acceptées, sans parenthèses, article facultatif (fr : le/la… ; de : der/die/das) */
  liveCands(q){
    const out = new Set();
    (q.accept || [q.answer]).forEach(a => {
      [a, a.replace(/\s*\([^)]*\)\s*/g, " "), a.replace(/[()]/g, "")].forEach(v => {
        out.add(v);
        if (q.lang === "fr" && !q.keep) out.add(v.trim().replace(/^(le |la |les |l'|l’|un |une |des |du |de la |d'|d’)/i, ""));
        if (q.lang === "de" && !q.keep) out.add(v.trim().replace(/^(der |die |das )/i, ""));
      });
    });
    return [...out].map(v => [...v].map(lvUnit).join("")).filter(Boolean);
  },
};

/* réglages propres à un outil (version 3) : le contenu peut déclarer COUCHE_CONTENU = { … } (ex. charger, isRight, liveCands, allCards) */
if (typeof COUCHE_CONTENU !== "undefined") Object.assign(COUCHE, COUCHE_CONTENU);

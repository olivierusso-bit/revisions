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
     COUCHE.buildTest(deckKeys, difficulty) : les questions d'un test
     COUCHE.isRight(q, val) : correction d'une réponse
     COUCHE.cardFace(d, it) : recto / verso d'une carte
     COUCHE.liveCands(q)    : candidats pour la correction en direct
     COUCHE.hasLive         : le mode « Correction en direct » existe (langues : oui)
   Les utilitaires (esc, norm, matchAnswer, shuffle, pickOptions, dxN…) viennent du noyau.
   ============================================================ */

/* cartes : identité stable = paquet | énoncé | aspect ; une phrase peut donner deux cartes (type / forme) */
function cardKey(dk, word, aspect){ return dk + "|" + word + "|" + aspect; }

const COUCHE = {
  rings: 3,
  hasLive: true,

  allCards(){
    const out = [];
    DECKS.forEach(d => d.items.forEach(it => {
      const g = GENS[d.gen]; if (!g) throw new Error("Générateur inconnu : " + d.gen);
      g.cards(d, it).forEach(c => out.push({ dk:d.key, word:it.front, aspect:c.aspect, mcqOnly:!!c.mcqOnly, levels:c.levels, k:cardKey(d.key, it.front, c.aspect) }));
    }));
    return out;
  },

  /* un exercice par paquet et par type de question, dans l'ordre de KIND_ORDER ; numéros uniques (§ 11.6) */
  buildTest(deckKeys, difficulty){
    const sel = DECKS.filter(d => deckKeys.includes(d.key));
    const qs = []; let num = 0, ex = 0;
    sel.forEach(d => {
      const g = GENS[d.gen];
      const buckets = {}; KIND_ORDER.forEach(k => buckets[k] = []);
      shuffle(d.items).forEach(it => g.kinds(d, it, difficulty).forEach(k => buckets[k].push(it)));
      const pool = g.pool ? g.pool(d) : [];
      KIND_ORDER.forEach(kind => {
        const items = buckets[kind]; if (!items.length) return;
        ex++; const K = KINDS[kind];
        items.forEach(it => {
          num++;
          const q = { id:"q"+num, num, ex, exTitle:d.title, deckKey:d.key, kind, type:K.type, tag:K.tag, aspect:K.aspect, lang:"fr", consigne:K.consigne, keep:true, hint:"" };
          g.fill(q, kind, it, d, pool);
          q.card = cardKey(d.key, q.word, K.aspect);
          q.prompt = `${K.consigne} « ${q.word} »`;
          qs.push(q);
        });
      });
    });
    return qs;
  },

  isRight(q, val){ return q.type === "mcq" ? val === q.answer : matchAnswer(val, q.accept, q.lang, q.keep); },

  cardFace(d, it){ return GENS[d.gen].face(d, it); },

  /* candidats de la correction en direct : réponses acceptées, sans parenthèses, article français facultatif */
  liveCands(q){
    const out = new Set();
    (q.accept || [q.answer]).forEach(a => {
      [a, a.replace(/\s*\([^)]*\)\s*/g, " "), a.replace(/[()]/g, "")].forEach(v => {
        out.add(v);
        if (q.lang === "fr" && !q.keep) out.add(v.trim().replace(/^(le |la |les |l'|l’|un |une |des |du |de la |d'|d’)/i, ""));
      });
    });
    return [...out].map(v => [...v].map(lvUnit).join("")).filter(Boolean);
  },
};

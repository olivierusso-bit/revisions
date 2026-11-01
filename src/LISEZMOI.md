# src/ — sources des outils de révision (refonte 2026)

Un outil = contenu + couche + noyau, assemblés en un seul fichier HTML autonome.

| Fichier | Rôle |
|---|---|
| `noyau-quiz.js` | code commun à tous les outils (stockage, test en cours, anneaux, courbe, Bilan, erreurs, papier, écrans) |
| `couche-langues.js` | ce qui est propre aux langues et au français (questions, correction, correction en direct, 3 anneaux) |
| `gabarit.html`, `base.css` | squelette HTML et CSS de base |
| `<outil>.contenu.js` | tout ce qui est propre à un outil (élève, paquets, fiche, sources, palette) |
| `assembler.py` | assemble et contrôle : `python3 assembler.py <outil>.contenu.js` |
| `controle-outil.py` | contrôle de dérive d'un outil assemblé |

Ce dossier n'est pas une page du site : il est là pour l'historique git. La copie de référence est dans le projet Claude (`claude/`).

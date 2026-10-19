# Portfolio de Hamza Lakrad

## Version actuelle — Full Stack Orbit Universe

`orbit-theme.css` et `orbit-universe.js` : univers sombre, Terre WebGL tournant en 34 secondes, dix technologies en orbite (six sur mobile), reflets ambre, timeline et cartes coordonnées. Aperçu local : http://127.0.0.1:4173/?theme=orbit-universe. Détails et source de la texture dans `docs/orbit-universe.md`. Les fonctions et informations existantes sont conservées.

## Historique — 3D Creative / Modern

`creative-modern.css` et `creative-modern.js` ajoutent un écosystème abstrait original en CSS 3D : six cartes interactives (React, Django, JavaScript, Python, Java, SQL), volumes avec reflets, animations indépendantes, parallax par profondeur et navigation clavier. Aucun dépôt GitHub n’est inventé. Aperçu : http://127.0.0.1:4173/?theme=creative-modern.

## Base — Light Minimal + Purple

Identité claire, accents violets, scène de travail composée de deux objets générés et de détails SVG animés. `light-minimal.css` et `light-minimal.js` pilotent cette version. Les huit projets, dix-neuf technologies et deux stages sont conservés. Aperçu local : http://127.0.0.1:4173/?theme=light-purple. Les anciennes directions décrites ci-dessous constituent l’historique.

Les animations du bureau sont suspendues hors écran et respectent la préférence de réduction des mouvements. Les sources des visuels figurent dans `docs/light-workspace-assets.md`.

Site statique : tous les fichiers publiables sont dans `dist/`.

## Direction artistique et référence vidéo

La vidéo de référence (46,4 s) utilise un environnement continu, des objets en mouvement, une navigation flottante et une alternance entre parcours, projets et contact. Cette version reprend la continuité, le rythme et l’interactivité dans une identité différente : graphite/cuivre, typographie éditoriale, repères techniques et architecture filaire à trois niveaux. Aucun élément visuel de la vidéo n’est réutilisé.

`experience.css` et `experience.js` pilotent la direction artistique, le dock à sept chapitres, la scène Canvas réactive, l’introduction, les boutons magnétiques et la galerie qui se déploie au scroll. Le scroll reste natif, sans interception de la molette. La galerie devient verticale sur tablette/mobile, petits écrans en hauteur et avec `prefers-reduced-motion`. La scène est redessinée à la demande via requestAnimationFrame, sans boucle permanente.

Le site reste uniquement local, conformément au choix de son propriétaire.

## Typography and interaction refinements

`refinements.css` and `refinements.js` preserve the graphite/copper identity and existing content. Each of the eleven hero letters independently lights and moves by at most 2.5px on pointer interaction, then returns to rest. A thin amber navigation underline follows hover, focus and the active section. Body text, labels, metadata and form inputs have been enlarged; navigation collapses earlier on narrow displays. The rotating ornament is now still at rest, while the creative-process loop remains available. Touch and reduced-motion preferences disable pointer motion. The native pointer is retained alongside the decorative cursor ring.

## Creative-process motion system

`process.css` / `process.js` implement the IDEA → LOGIC → INTERFACE → EXPERIENCE scene. Identical measured cycles cover the viewport; a modulo translation makes wrapping seamless. A requestAnimationFrame loop applies time-based velocity, damped scroll impulses and direction reversal. Word emphasis is calculated from its distance to the viewport center. Pointer hover slows the flow, and the Pause motion control freezes it. The loop stops offscreen and when the tab is hidden. On mobile the scene is unpinned and simplified; reduced-motion preferences produce a static, readable sequence. No GSAP dependency was present, so the implementation uses native browser APIs.

## Lancer l’aperçu

`python -m http.server 4173 --bind 127.0.0.1 --directory dist`

Ouvrir http://127.0.0.1:4173/.

## Ajouter un projet

Ajouter un objet dans `dist/projects.js`. Les filtres acceptent `fullstack`, `gestion`, `web`. Les compteurs se mettent à jour automatiquement. Renseigner `github` et `demo` uniquement avec des liens réels. Les visuels actuels sont des illustrations HTML/CSS explicitement identifiées. Les fiches distinguent les informations fournies des détails non disponibles.

## Contact et CV

Le formulaire valide les champs et prépare un e-mail avec `mailto:`. Le visiteur finalise l’envoi dans sa messagerie : aucune API d’envoi n’est configurée. LinkedIn est renseigné ; le lien GitHub reste à fournir.

`dist/CV_Hamza_LAKRAD.pdf` est utilisé pour la visionneuse et le téléchargement ; `dist/cv-preview.png` pour la miniature.

## Accessibilité et performance

Navigation clavier, dialogues natifs, menu mobile, thème persistant, erreurs de formulaire et respect de `prefers-reduced-motion`. Animations avec transform/opacity, IntersectionObserver et requestAnimationFrame. Aucun framework ni dépendance JavaScript.


## Rabat City — octobre 2026

Direction actuelle : bleu nuit #07111C, ambre #E8A45C et champagne #F2C078. La Hero utilise un panorama original généré avec ImageGen (et non une photographie documentaire), optimisé en WebP dans `dist/images/rabat-blue-hour.webp`. L’image reste limitée à la Hero. `rabat-theme.css` et `rabat-city.js` pilotent la mise en page, les reflets, la navigation vitrée, le parallaxe limité au curseur/scroll, la timeline et les actions visuelles des projets. Toutes les compétences d’origine, les huit projets, les deux expériences et les fonctions mailto/CV sont conservés. Le lien GitHub reste à fournir.

Prompt de génération : panorama réaliste original de Rabat au coucher du soleil / heure bleue, vu depuis le Bouregreg, évocation de la Kasbah des Oudayas et de la tour Hassan dans le lointain, architecture marocaine, lumières chaudes et reflets sur le fleuve ; palette bleu nuit et champagne, partie gauche calme pour la typographie, détails architecturaux à droite ; sans texte, logo ni interface.

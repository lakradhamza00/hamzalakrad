# HL Orbit Premium signature

Only the top-left home logo is replaced. A custom connected H/L SVG path remains stationary while three elliptical groups turn at 12/18/24 seconds, with attached amber particles. Logo SVG is 68px desktop, 58px tablet, 50px mobile. The link retains the old H. layout footprint (30.5625×38px desktop) so navbar coordinates stay identical.

CSS drives all continuous motion. A short demand-driven requestAnimationFrame ramp changes Web Animation playback rates to 1.4 on hover/focus without resetting phase. No canvas, WebGL or additional frameworks. Hidden tabs pause; reduced-motion shows static angled ellipses. Focus ring and existing home-link accessible name retained.

Browser checks: fixed monogram transform none, orbit durations 12/18/24s, hover scale 1.05, home link #accueil, no console errors, 320px mobile has no overflow or control collision. Desktop nav bounds remain exactly x286.1125–793.375 at 1280px. Source comparison verifies all other markup unchanged. Snapshot tmp/hl-orbit-logo-before.

Preview: http://127.0.0.1:4173/?theme=orbit-universe&logo=hl-orbit-1

# Bottom dock — organic liquid skin

Only the existing .chapter-dock is decorated. index.html only adds two local assets. Every original link/icon/action and the legacy active-state logic are retained. The top navbar/header and all section markup are unchanged, verified against tmp/liquid-dock-before/index.html.

The silhouette is a real organic SVG path and matching clipped dark glass surface, not a rounded rectangle. Smooth top/bottom cubic segments include an asymmetric base profile plus a small Gaussian bulge centered on the active icon, with a weaker hover reaction. One existing-style active circle translates between icons. Low-opacity orange outline and localized gradient highlights, fixed16px backdrop blur, black floating shadow. No particles.

State-based rendering only: ResizeObserver, active aria-current mutation, hover/focus/click. No permanent JS animation loop or per-mousemove tracking. CSS interpolates matching path/clip-path commands in460ms; icon/circle interactions use transforms. Reduced-motion removes interpolation. Existing dock auto-hide, keyboard reveal and anchor scrolling remain. Tiny screens use36px icon slots to retain all seven icons without scrolling/clipping.

Browser QA: desktop true SVG path visible, CV click updates existing #cv route and active state, morph transition .46s, no console errors. At320px all7 icons fit in~282px dock, silhouette~292px, no overflow; mobile CV click works. Original icon order: Intro, About, Stack, Parcours, Works, CV, Contact.

Preview: http://127.0.0.1:4173/?theme=orbit-universe&dock=liquid-14#apropos

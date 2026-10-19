# Creative Process — signal / Design 05

Only the #creative-process region is replaced. It remains a div region so the seven existing navigation chapters are not affected. New scoped CSS/JS: process-signal.css and process-signal.js. The legacy process initializer in stack-streams.js is bypassed for this region; the skills initializer is unchanged byte for byte. Snapshot: tmp/process-signal-before.

Desktop: 66svh (410–570px), centered title, four aligned words (white / orange outline / white / orange outline), orange Bézier signal, four keyboard-accessible nodes and numbered French labels. Intro sequence lasts ~2.3 seconds, initial path uses normalized stroke-dasharray/dashoffset. A single visible energy particle travels for 6 seconds with opacity fades at endpoints. Mobile uses a vertical path and four aligned steps. Hover/focus illuminates the corresponding word and scales the node to 1.15.

No per-frame JS, pointer tracking, canvas, WebGL, third-party framework or dependency. IntersectionObserver and tab visibility pause CSS animations; reduced-motion displays a fully drawn static sequence with no traveling particle.

Verified browser: 1280×720 (475px region), 390×844, 320×740; no horizontal overflow, mobile path visible, LOGIC node highlights LOGIC, particle moves along path, 7 chapter sections retained, projects and skills still render, no console errors. Source scope comparison verifies all other markup unchanged except local asset links/cache key. No card design reference image was attached to this request; the implementation follows the supplied detailed Design 05 specification.

Preview: http://127.0.0.1:4173/?theme=orbit-universe&process=signal-5#creative-process

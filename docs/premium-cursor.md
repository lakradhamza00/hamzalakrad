# Premium cursor system

Scope: only cursor decoration/input interactions. No section markup or content changed. New assets premium-cursor.css and premium-cursor.js, plus an HTML feature flag. Legacy experience.js cursor/magnet block is gated off, legacy cursor label callbacks are bypassed, and the hidden global spotlight's pointer writes are skipped in app.js. Existing project-tilt logic is retained. Snapshot tmp/premium-cursor-before.

Pointer: 5px theme-orange dot and36px ring, a short42ms damped ring follow, interactive ring54px, exploration/project ring~67px. EXPLORE only for Hero name/large titles/process words; VIEW arrow over project cards; tiny external-link arrow. One reused380ms ripple. No particles. Main Hero/CV actions and navbar CV link have a capped4px magnetic effect with cached button geometry.

One demand-driven requestAnimationFrame loop updates transforms. It sleeps after settling, on pointer leave, blur or hidden tab. No React/render state, live blur, per-move layout reads or large particle system. Hover detection uses closest() on event targets. No measured FPS guarantee is claimed.

Only enabled for hover+fine pointer, viewport above1024px and no touch points. Smaller/touch devices retain native cursor. Reduced-motion uses direct dot/ring position, no trailing, ripple or magnetic motion. Text fields keep native I-beam; dialog/embedded content uses native cursor to remain compatible with top-layer CV viewer. Keyboard Tab hides decoration, native focus indicators unchanged.

Browser QA: desktop EXPLORE and VIEW states verified, legacy cursor hidden, no console errors. CV modal opens with cursor:auto; contact name field has cursor:text and hidden custom layer. At390px cursor disabled and native button pointer preserved, no horizontal overflow. Other page markup verified identical after normalizing the new cursor asset references/flag/cache keys.

Preview: http://127.0.0.1:4173/?theme=orbit-universe&cursor=premium-1

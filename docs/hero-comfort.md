# Hero: scale and performance correction

Only Hero composition is optically reduced: text group 88%, Earth/orbit group 85% on desktop/tablet. Mobile retains readable body copy and controls with a slightly smaller name and orbital composition. Navbar and every section below the Hero are preserved.

Earth shader, texture assets, lighting and 40-second rotation remain unchanged. Five technologies retain their logos, paths and skill navigation. Rendering uses one shared orbit/WebGL frame loop with cached shader uniform locations, capped resolution (720px desktop / 420px mobile), offscreen/hidden-tab pause and reduced-motion support. Pointer parallax targets one parent (maximum 4px each axis), with one transform-positioned ambient light. Reflection geometry is cached and only the hovered letter updates. Legacy Hero pointer paths are bypassed; existing interactions outside Hero are retained. Stars and duplicate orbit trails are reduced; badge backdrop blurs removed.

Verification: JavaScript syntax checks; browser desktop 1280×720 and mobile 390×844/320×740; globe textures loaded, five badges, orange role text, project navigation and offscreen pause. Sections below Hero and globe fragment shader compared against pre-change snapshot. No hardware FPS guarantee or measured 60-FPS claim.

Snapshot: tmp/hero-optimize-before. Preview: http://127.0.0.1:4173/?theme=orbit-universe&hero=comfort-8

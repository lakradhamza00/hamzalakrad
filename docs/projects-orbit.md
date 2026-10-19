# Projects — closed 3D orbit

Only #projets is replaced. Every other section's HTML is byte-identical after normalizing this feature's asset links/cache keys. Backup tmp/projects-orbit-before. Original projects.js data, all8 projects, real covers, conceptual mockups, categories, filters and existing detailed dialogs are retained. Both card actions use the existing project dialog; no absent live/demo/repository URL is invented.

New files projects-orbit.css/js. Two tightly scoped legacy guards in experience.js stop the old gallery setup/prev-next handling only for .orbit-projects. An app.js guard skips the obsolete per-art mouse tilt only in this section, which now owns one subtle active-card tilt.

Desktop positions follow a closed ellipse: x=-sin(theta)*radius, z=(cos(theta)-1)*160. Phase advances continuously without restart; after one18-second revolution all transforms repeat naturally. Cards remain forward-facing with only±12deg side inclination, active cursor tilt limited to±2/±3deg. Fixed background class blur. Scale/opacity/depth distinguish the foreground from the return leg. Real rendered Z values range from0 to-320px, verified in browser. Rear cards are inert/aria-hidden; visible cards can receive focus, pausing motion while reading actions.

A single requestAnimationFrame loop caches geometry and updates only8 card transforms/opacity. It pauses offscreen/hidden, on explicit pause, card hover, focused card or open project dialog. Section hover slows to65%. Drag/touch pointer capture, keyboard arrows/Home/End, numeric project buttons, prev/next and horizontal/Shift-wheel navigation are supported. Normal vertical page scrolling stays native. Manual input snaps smoothly and resumes after a short idle interval. Pause control provided. Reduced-motion disables automatic orbit, blur and parallax; manual navigation remains.

Mobile uses a flat horizontal wrap carousel, one82%-width main card plus next preview. Invisible wrap occurs outside the viewport. Pointer pan-y preserves vertical scrolling. Cards and8 indicators fit390px/320px without document overflow. No Three.js/WebGL/library, no new external assets.

Browser verification:8 cards,3D front/rear transforms, numeric active state, pause/resume, next button, keyboard ArrowRight,4-card Gestion filter thenall8, original Application météo detail dialog opens correctly, no console errors. Mobile390px/320px screenshot/layout checked. Offscreen orbit-running class clears. Physical touch drag/wheel gestures and hardware60FPS were not instrumented; handlers and transform-only motion reviewed.

Preview: http://127.0.0.1:4173/?theme=orbit-universe&projects=orbit-1#projets

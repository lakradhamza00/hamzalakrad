# Design 07 — Professional Journey

Experience-only redesign based on the supplied reference. The surrounding portfolio, including Hero, Skills, Contact and footer, is retained.

## Data

The latest user-provided Martech information supersedes the previous task-management wording: Gestion électronique des documents, 16/07/2025–17/08/2025, Rabat, Java / Spring / MySQL. CMR retains its existing July–September 2026 Full Stack task-management experience, React / Django, description, missions and result. Its additional missions are available in an expandable disclosure.

No company-logo assets were available, so neutral building symbols are used rather than invented brand marks. Technology logos retain their original colors; Spring is from Devicon 2.17.0 (MIT), consistent with the other technology assets.

## Terrain asset

Mode: built-in ImageGen. Final project asset: `dist/images/journey-terrain.webp` (1672 × 941). Original output: `C:/Users/hamza/.codex/generated_images/01a14b1f-40e4-70c0-9bc3-07ffb7faac94/exec-1720fc10-23e4-4d96-9ebb-a6e0d729fd48.png`.

Final prompt:

Use case: photorealistic-natural. Asset type: wide cinematic terrain background for a premium software developer career roadmap section. Create a realistic very dark rocky mountainous planetary landscape viewed from a low aerial three-quarter perspective, near-black midnight navy (#020609, #04090D, #071018), rough dark rock ridges and distant layered silhouettes, subtle mist. The central visual is ONE continuous luminous amber-golden mountain road with elegant multiple S-curves. Match this exact composition: blank dark quiet negative space in the upper LEFT 0–42% width and top 0–40% height for an editorial heading; blank nearly black lower LEFT 0–38% width and bottom 40% for an overlaid experience card; another calm dark region at RIGHT 70–98% width and 25–60% height for a second card. The road STARTS near x43%, y75%, then curves right to x67%,y60%, bends left to x54%,y45%, sweeps right toward x78%,y32%, then curves back slightly to x73%,y23%, and finally recedes toward x90%,y10% on a distant ridge. Narrow at the distant end, wider toward the foreground. It must look like a real illuminated road integrated into the rock terrain, with a brilliant warm orange-gold center, subtly luminous edges and local warm reflections on adjacent rocks, not a floating neon line. Keep 85 percent of the scene extremely dark. Foreground layered black ridges along the bottom, with selective silver-blue edge detail; orange reflection only close to road. Premium cinematic realism, controlled bloom, sophisticated industrial/editorial aesthetic. Landscape composition 16:9. No text, no dates, no company logos, no cards, no labels, no pins, no flag, no people, no cars, no buildings, no Earth globe, no starscape, no gaming HUD. All UI markers will be added independently in code.

## Motion

A lightweight image supplies terrain and integrated road reflections. SVG paths follow the visible road and reveal in 2.7 seconds after the starting milestone appears. The two pins, cards and final flag use a staged reveal. Two small data pulses continue along the road. Hover/focus relates each card to its pin and road segment. The road is stable while terrain and foreground respond by a few pixels to pointer movement.

Mobile replaces the desktop composition with chronological vertical cards and a measured curved SVG route. Opening the CMR disclosure updates the path and final flag positions. Offscreen/hidden document motion is paused; reduced motion presents the complete static journey.

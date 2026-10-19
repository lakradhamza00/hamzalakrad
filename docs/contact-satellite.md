# Satellite Message Transmission

Contact-only redesign inspired by the user-supplied Concept 05 image. The footer markup is retained unchanged. The original personal information, links and email preparation behavior remain.

## Assets

Satellite generated with built-in ImageGen, transparent background, saved in the project as `dist/images/contact-satellite.webp` (1536 × 1024). Original output: `C:/Users/hamza/.codex/generated_images/01a14b1f-40e4-70c0-9bc3-07ffb7faac94/exec-7eca2ff6-6a1b-4a76-a5fb-b68417986caa.png`.

Final prompt:

Use case: premium cinematic website asset. Generate ONE realistic sophisticated communications satellite, isolated on a fully transparent background, for a dark navy and amber software developer portfolio. Three-quarter view, diagonal composition: a dark cylindrical metallic central body, circular communications dish/antenna facing toward the LOWER RIGHT of the image, the dish rim softly illuminated warm amber/orange. Two or three compact rectangular articulated solar panels on thin supports, midnight-blue photovoltaic cells with fine silver grid, one panel subtly warm golden from directional light. Small antenna rods and physically believable mechanical details. Dark graphite brushed metal, realistic depth, restrained warm gold rim light, subtle cold blue fill on shadow edges, high-end aerospace product visualization. Satellite occupies most of image with a clean transparent margin; complete solar panels and all antennas visible. The glowing circular dish is at roughly 60 percent from left and 55 percent from top. No Earth, no stars, no background, no beams, no text, no logos, no interface, no people. Not cartoon, not toy, not a sci-fi weapon. The asset will float independently above a partial Earth in an interactive contact section.

`dist/images/contact-earth.webp` is a lightweight pre-rendered sphere made from the same geographic day/night textures used by the Hero, with its warm lighting model. It adds no second WebGL context. Texture sources remain documented in orbit-universe.md.

## Interaction

The satellite floats on an 8-second CSS animation. The thin SVG path carries three small packets and follows the antenna/receiver anchors. Scene motion is suspended offscreen and while the document is hidden. Reduced motion removes floating and travel animation. The form remains stable during pointer parallax.

The valid form plays a local preparation animation, then invokes the existing mailto submission handler. That handler opens a draft in the visitor's email client; the website cannot confirm actual delivery. No successful-send claim is shown. Invalid fields use the original error handling, now including the subject select. The message limit and counter are 500 characters.

For local QA only, `?transmission-preview=1#contact` plays the animation without opening an email client or sending a message. Its final status explicitly identifies the preview.

Only the Contact fragment, its scoped assets and the Contact field selector in app.js are changed.

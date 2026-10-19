# Profile badge correction

Only the existing Developer ID card area was replaced. Left About content and all other sections are unchanged (source comparison). Small dark clip, two H. monograms, larger cover portrait, name and roles, understated gray-blue barcode. Extra technology logos, availability, serial text, scan and reflection layers removed. Hover rise 4px; tilt limited to 1.2/1.5 degrees, reduced-motion respected.

New supplied portrait copied unchanged to dist/images/about-hamza-full.png. CSS uses object-fit:cover and centered crop; no facial/clothing alteration, generated content or image processing. Verified desktop and 320px mobile: photo loads, no horizontal overflow, clip remains visible, no console errors. Desktop badge approximately 350×567px. Snapshot: tmp/profile-badge-before.

The latest supplied image is a portrait, not a badge design reference; implementation follows the written badge specifications without claiming pixel-perfect comparison to an unavailable second card image.

Preview: http://127.0.0.1:4173/?theme=orbit-universe&about=badge-2#apropos

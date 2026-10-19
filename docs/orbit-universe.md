# Full Stack Orbit Universe

## Implementation

The globe is rendered using a custom WebGL sphere shader with geographic texture mapping, a 34-second linear rotation, directional light, blue atmospheric rim and stylized amber city lights. It is a rotating 3D render, not a rotating flat image. The ten DOM capsules retain upright text, follow independent trigonometric trajectories and change stacking order, scale, opacity and subtle blur according to depth. Mobile shows six capsules. Hover never pauses orbital motion; clicking navigates to the corresponding existing skill.

Animation work is suspended offscreen and while the document is hidden. Reduced motion produces a static globe and orbital constellation. Canvas resolution is capped; no heavy post-processing or third-party rendering framework is required. If WebGL is unavailable, the texture uses a lightweight animated fallback.

## Asset

`dist/images/earth-atmosphere.jpg` — public Earth texture from the official Three.js examples:
https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg

City lights are a stylized procedural layer, not a satellite night-light dataset.

## Content

The existing eight projects, nineteen skills and two work experiences are retained. No GitHub repository, completion status or unfamiliar technology has been invented.

## Scoped warm-Earth correction

The surrounding stylesheet was restored from the snapshot before the global brightness change. Only selectors inside `.orbit-universe` were appended. Planet lighting now uses a fixed upper-left amber source, an asymmetric warm atmospheric edge and a dark right hemisphere. City clusters contain approximately 4,900 stylized warm points around the existing populated-area coordinates. Capsule logos retain individual technology colors. Rotation remains 34 seconds; orbital speeds, depth and interactions are preserved.

## Five-capsule composition correction

The globe is reduced to 61% of the component width, with more breathing space and five capsules only: React, JavaScript, Python, Node.js, Django. Earth rotation is 40 seconds. Capsule orbits remain continuous, now 58–76 seconds for a calmer composition. The initial positions correspond to the written specification; an exact image comparison awaits the missing second reference image.

The procedural city-cluster layer was replaced by `images/earth-city-lights.png`, from https://threejs.org/examples/textures/planets/earth_lights_2048.png . City light brightness is extracted from the geographic night texture and shaded amber, removing the previous square cluster artifacts.

Technology logo SVGs are from Devicon 2.17.0 (MIT), https://github.com/devicons/devicon ; local copies are stored as `images/orbit-*.svg`. Django's wordmark is tinted off-white to match the written request.

Only component CSS rules were appended; the surrounding UI stylesheet is preserved.

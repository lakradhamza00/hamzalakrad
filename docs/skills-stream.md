# Infinite Tech Stack Stream

This component replaces only the contents of the existing Skills panel. The existing 19 technology names, roles and descriptions are read from the original panel; no skill is added or removed. The Hero globe can still navigate to each technology.

Each category contains two identical groups. A complete source sequence is repeated until one group is wider than its viewport, then duplicated. Translating the track by exactly 50% produces a seamless join in either direction. Durations are 24 / 32 / 27 / 30 / 25 / 34 seconds.

CSS masks fade both edges. Intersection observers control entrances, visibility and subtle pill depth; CSS transforms animate the tracks. Offscreen and hidden-document animations are paused. Keyboard focus presents the unique technologies as a stationary horizontal list; leaving the category resumes its loop. Reduced motion uses the same stationary list. Decorative duplicates are hidden from assistive technologies and skipped by keyboard navigation.

Brand assets: Devicon 2.17.0 (MIT), https://github.com/devicons/devicon . Existing orbit logos are reused; additional local SVGs are stored as images/skill-*.svg. SQL/SGBD and Agile use small semantic SVG icons where no universal official brand logo applies.

The new CSS is scoped to #competences. Existing application, Earth, project and contact files are not changed.

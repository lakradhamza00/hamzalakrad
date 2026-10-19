# CV Document Scanner

Only the #cv preview button interior and its local presentation are changed. Original cv-preview.png and CV_Hamza_LAKRAD.pdf remain untouched. All existing labels, actions, viewer trigger and download links remain intact. Four thin orange corner brackets replace the heavy rotated preview border; full-page image is displayed without the old max-height crop.

A full-height absolute light layer translates from 0 to calc(100% - 2px), ensuring the 2px scan core traverses the entire paper. 3.6 seconds per direction, alternate infinite, smooth easing, no endpoint jump or layout animation. Static gradient halo and localized paper highlight move with the line; controlled shadow bloom and corner glow increase on hover. Preview hover scales to 1.015. Animated SCANNING dots are decorative, excluded from screen-reader announcements.

IntersectionObserver/tab visibility pause the CSS animation offscreen/hidden. Reduced-motion uses a static faint line and CV / PREVIEW label. No animation frame loop, canvas, WebGL or dependencies.

Verified desktop 1280×720 and mobile 390×844 / 320×740: image natural width1082, no crop or overflow, moving beam full height equals paper height, alternate3.6s, actual CV viewer opens/closes, original PDF download link retained, offscreen CSS animation pauses, no browser errors. Source comparison verifies everything except the preview markup and its two asset references is identical to tmp/cv-scanner-before/index.html.

Preview: http://127.0.0.1:4173/?theme=orbit-universe&cv=scanner-1#cv

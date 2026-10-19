# Header sliding active capsule

Scope: navbar only. Existing header, logo, CV button, text, link destinations, heights and spacing retained. One persistent decorative nav-active-pill replaces the old moving underline. Old motion.js positionNav returns early only for this feature; its smooth-scroll/arrival behavior is untouched. Source comparison verifies all other markup unchanged, apart from local asset references and motion.js cache key. Snapshot tmp/nav-pill-before.

The pill uses translate3d and scaleX, a420ms cubic-bezier(.22,1,.36,1) animation with3.5% horizontal stretch. On interruption its current computed matrix becomes the next starting point, avoiding fade/reset. Rounded corners compensate for scaleX. Labels are measured with Range only on active/layout changes; mobile pills fit text rather than full-width rows. Hover affects text only. The existing HL monogram is retained, with a tiny additional warm accent highlight.

Click destination is retained during smooth section scrolling, avoiding chasing intermediate active sections. It releases on scroll settlement, user wheel/touch/key interruption, or a bounded timeout. Normal scrolling observes existing active classes. Resize/font loading/mobile menu changes recalculate geometry. Reduced-motion moves immediately. No continuous rendering loop or per-pointer-position handlers.

Browser QA: one pill; Projets then Contact selected;77px desktop header height retained; no console errors. Mobile menu pill56px for Projets and no overflow. Original logo and separate CV download button unchanged. No other sections modified.

Preview: http://127.0.0.1:4173/?theme=orbit-universe&nav=pill-1

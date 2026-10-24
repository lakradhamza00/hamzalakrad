/* Vercel's same-origin visitor tracking. Never load on the local preview. */
(()=>{
 const host=location.hostname;
 if(host==='localhost'||host==='127.0.0.1'||host==='::1'||location.protocol!=='https:')return;
 if(document.querySelector('script[data-portfolio-analytics]'))return;
 window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};
 const script=document.createElement('script');
 script.defer=true;script.src='/_vercel/insights/script.js';
 script.dataset.portfolioAnalytics='true';
 document.head.append(script);
})();

(() => {
 const mobile=matchMedia('(max-width:700px)');
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{rootMargin:'-30px'});
 document.querySelectorAll('main>section[id]:not(#accueil)').forEach(section=>{const eyebrow=section.querySelector('.section-top .eyebrow');if(!eyebrow)return;const connector=document.createElement('div');connector.className='section-connector';connector.setAttribute('aria-hidden','true');const label=document.createElement('span');label.textContent=eyebrow.textContent;connector.append(label);section.prepend(connector);observer.observe(connector)});
 let previousY=scrollY,scrollFrame=0;
 function updateDock(){scrollFrame=0;const delta=scrollY-previousY;if(mobile.matches&&Math.abs(delta)>5){document.body.classList.toggle('dock-resting',delta>0&&scrollY>180);previousY=scrollY}else if(!mobile.matches){document.body.classList.remove('dock-resting');previousY=scrollY}}
 addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(updateDock)},{passive:true});
 document.addEventListener('focusin',e=>{if(mobile.matches&&e.target.matches('input,textarea,select'))document.body.classList.add('mobile-input-active')});
 document.addEventListener('focusout',e=>{if(!e.relatedTarget?.matches?.('input,textarea,select'))document.body.classList.remove('mobile-input-active')});
 document.querySelector('.chapter-dock').addEventListener('click',()=>document.body.classList.remove('dock-resting'));
})();

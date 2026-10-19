/* About-only motion: cached bounds and one demand-driven animation frame. */
(()=>{
 const root=document.querySelector('#apropos.developer-about');if(!root)return;
 const card=root.querySelector('.developer-id'),surface=root.querySelector('.developer-id-perspective'),reduced=matchMedia('(prefers-reduced-motion:reduce)'),fine=matchMedia('(hover:hover) and (pointer:fine)');
 let visible=false,frame=0,rect=null,tx=0,ty=0,x=0,y=0;
 function update(){frame=0;if(!visible||document.hidden||reduced.matches)return;x+=(tx-x)*.11;y+=(ty-y)*.11;card.style.setProperty('--id-rotate-x',`${(-y*1.2).toFixed(3)}deg`);card.style.setProperty('--id-rotate-y',`${(x*1.5).toFixed(3)}deg`);card.style.setProperty('--id-light-x',`${(x*(rect?.width||0)*.5).toFixed(2)}px`);card.style.setProperty('--id-light-y',`${(y*(rect?.height||0)*.5).toFixed(2)}px`);if(Math.abs(tx-x)>.001||Math.abs(ty-y)>.001)frame=requestAnimationFrame(update)}
 function schedule(){if(!frame&&visible&&!document.hidden&&!reduced.matches)frame=requestAnimationFrame(update)}
 function reset(){tx=ty=0;card.classList.remove('is-hovered');schedule()}
 function stop(){cancelAnimationFrame(frame);frame=0;tx=ty=x=y=0;['--id-rotate-x','--id-rotate-y','--id-light-x','--id-light-y'].forEach(n=>card.style.removeProperty(n));card.classList.remove('is-hovered')}
 if(fine.matches){surface.addEventListener('pointerenter',()=>{rect=surface.getBoundingClientRect()},{passive:true});surface.addEventListener('pointermove',e=>{if(reduced.matches||e.pointerType==='touch'||!rect)return;tx=Math.max(-1,Math.min(1,2*(e.clientX-rect.left)/rect.width-1));ty=Math.max(-1,Math.min(1,2*(e.clientY-rect.top)/rect.height-1));card.classList.add('is-hovered');schedule()},{passive:true});surface.addEventListener('pointerleave',reset)}
 root.classList.add('identity-animated');
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;root.classList.toggle('identity-visible',visible&&!document.hidden);if(visible){root.classList.add('identity-revealed')}else stop()},{threshold:.08});observer.observe(root);
 document.addEventListener('visibilitychange',()=>{root.classList.toggle('identity-visible',visible&&!document.hidden);if(document.hidden)stop()});addEventListener('resize',()=>{rect=null;stop()},{passive:true});addEventListener('scroll',()=>{if(card.classList.contains('is-hovered')){rect=surface.getBoundingClientRect();reset()}},{passive:true});reduced.addEventListener('change',stop);
})();

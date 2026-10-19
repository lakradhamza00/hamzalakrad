/* Smooth playback-rate changes preserve CSS orbit phase on hover. */
(()=>{const logo=document.querySelector('.header .hl-orbit-logo');if(!logo)return;const reduced=matchMedia('(prefers-reduced-motion:reduce)');let frame=0,rate=1,target=1,last=0;
const tracks=()=>[...logo.querySelectorAll('.hl-orbit-track')].flatMap(el=>el.getAnimations());
function tick(now){frame=0;if(reduced.matches||document.hidden)return;const dt=Math.min(40,now-last||16);last=now;rate+=(target-rate)*(1-Math.exp(-dt/85));if(Math.abs(rate-target)<.002)rate=target;tracks().forEach(a=>a.updatePlaybackRate(rate));if(rate!==target)frame=requestAnimationFrame(tick)}
function change(){target=logo.matches(':hover,:focus-visible')?1.4:1;if(!frame&&!reduced.matches&&!document.hidden){last=performance.now();frame=requestAnimationFrame(tick)}}
logo.addEventListener('pointerenter',change);logo.addEventListener('pointerleave',change);logo.addEventListener('focus',change);logo.addEventListener('blur',change);
document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(frame);frame=0;tracks().forEach(a=>document.hidden?a.pause():a.play());if(!document.hidden)change()});reduced.addEventListener('change',()=>{cancelAnimationFrame(frame);frame=0;rate=target=1;change()});})();

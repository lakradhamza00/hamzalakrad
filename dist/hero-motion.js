/* Entrance runs after the existing loading screen, once per page load. */
(() => {
  const hero=document.querySelector('#accueil'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const role=hero.querySelector('.hero-position h1>span:not(.sr-only)');
  const roles=['Full Stack Developer','Web Developer','Software Engineer'];
  const accessible=document.createElement('span');accessible.className='sr-only';accessible.textContent=roles.join(' ');role.before(accessible);role.setAttribute('aria-hidden','true');role.classList.add('dynamic-role');
  hero.classList.add('hero-motion-ready');
  role.classList.add('job-reel');
  const sizer=document.createElement('span');sizer.className='job-reel-sizer';sizer.textContent=roles[0];
  const frame=document.createElement('span');frame.className='job-reel-frame';const viewport=document.createElement('span');viewport.className='job-reel-window';const flash=document.createElement('span');flash.className='job-reel-stop';frame.append(viewport,flash);role.replaceChildren(sizer,frame);
  let begun=false,index=0,timer=0,visible=false,generation=0;
  function syncMaterial(){const source=hero.querySelector('.outline-name .hero-letter');if(!source)return;const material=getComputedStyle(source);role.style.setProperty('--reel-metal-image',material.backgroundImage);role.style.setProperty('--reel-metal-size',material.backgroundSize)}
  requestAnimationFrame(()=>requestAnimationFrame(syncMaterial));addEventListener('resize',syncMaterial,{passive:true});
  function paint(){viewport.replaceChildren();for(let i=-1;i<=1;i++){const row=document.createElement('span');row.className='job-reel-row';const label=roles[(index+i+roles.length)%roles.length];row.textContent=label;const ink=document.createElement('span');ink.className='job-reel-ink';ink.textContent=label;ink.style.opacity=i===0?'1':'0';row.append(ink);row.style.transform=`translate3d(0,${i*32}px,0)`;row.style.opacity=i===0?'1':'0';viewport.append(row)}}
  function cancel(){clearTimeout(timer);timer=0;generation++;viewport.querySelectorAll('*').forEach(row=>row.getAnimations().forEach(a=>a.cancel()));flash.getAnimations().forEach(a=>a.cancel());paint()}
  function queue(delay=3000){if(begun&&visible&&!document.hidden&&!timer)timer=setTimeout(change,delay)}
  async function change(){timer=0;const version=generation;if(!visible||document.hidden)return;syncMaterial();
    const motion=reduced.matches,animations=[];
    [...viewport.children].forEach((row,j)=>{const i=j-1,active=i===0,next=i===1;
      if(motion)row.style.transform='translate3d(0,0,0)';
      animations.push(row.animate(motion?[{opacity:active?1:0},{opacity:next?1:0}]:[{transform:`translate3d(0,${i*32}px,0)`,opacity:active?1:0},{transform:`translate3d(0,${(i-1)*32}px,0)`,opacity:next?1:0}],{duration:motion?250:650,easing:motion?'ease-in-out':'cubic-bezier(.65,0,.35,1)',fill:'forwards'}));
      animations.push(row.lastElementChild.animate([{opacity:active?1:0},{opacity:next?1:0}],{duration:motion?250:650,easing:'cubic-bezier(.65,0,.35,1)',fill:'forwards'}));
    });
    try{await Promise.all(animations.map(a=>a.finished))}catch{return}if(version!==generation)return;index=(index+1)%roles.length;paint();if(!motion)flash.animate([{opacity:0},{opacity:.45,offset:.4},{opacity:0}],{duration:200,easing:'ease-out'});queue(motion?2750:2350);
  }
  paint();
  function begin(){if(begun)return;begun=true;hero.classList.add('hero-motion-start');queue(3000)}
  if(document.body.classList.contains('intro-finished')||reduced.matches)begin();
  else {const observer=new MutationObserver(()=>{if(document.body.classList.contains('intro-finished')){begin();observer.disconnect()}});observer.observe(document.body,{attributes:true,attributeFilter:['class']});setTimeout(begin,3000)}
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)queue();else cancel()},{threshold:.1}).observe(hero);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();else queue()});
  reduced.addEventListener('change',()=>{cancel();queue()});
})();

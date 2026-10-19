(() => {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const nav=document.querySelector('#nav');
  const header=document.querySelector('.header');
  const glide=document.createElement('span');glide.className='nav-glide';glide.setAttribute('aria-hidden','true');nav.append(glide);
  let frame=0,run=0,hovered=null;
  const animated=new WeakSet();
  function positionNav(){
    if(nav.dataset.slidingPill==='true')return;
    const link=hovered||nav.querySelector('a.active')||nav.querySelector('a');
    if(!link||nav.offsetWidth===0){glide.style.opacity='0';return}
    glide.style.opacity='1';glide.style.width=`${link.offsetWidth}px`;glide.style.height='1.5px';
    glide.style.transform=`translate(${link.offsetLeft}px,${link.offsetTop+link.offsetHeight+5}px)`;
  }
  nav.addEventListener('pointerover',e=>{const a=e.target.closest('a');if(a){hovered=a;positionNav()}});
  nav.addEventListener('pointerleave',()=>{hovered=null;positionNav()});
  nav.addEventListener('focusin',e=>{if(e.target.matches('a')){hovered=e.target;positionNav()}});
  nav.addEventListener('focusout',()=>{hovered=null;positionNav()});
  new MutationObserver(positionNav).observe(nav,{subtree:true,attributes:true,attributeFilter:['class']});
  addEventListener('resize',positionNav,{passive:true});document.fonts.ready.then(positionNav);positionNav();
  const sectionObserver=new IntersectionObserver(positionNav,{rootMargin:'-20% 0px -65% 0px'});
  document.querySelectorAll('main>section[id]').forEach(section=>sectionObserver.observe(section));
  function stop(){run++;cancelAnimationFrame(frame);frame=0;document.documentElement.classList.remove('navigation-running')}
  ['wheel','touchstart','pointerdown'].forEach(type=>addEventListener(type,stop,{passive:true}));
  addEventListener('keydown',e=>{if(['Escape','ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(e.key))stop()});
  function arrival(target){
    const hadTabindex=target.hasAttribute('tabindex');
    if(!hadTabindex)target.setAttribute('tabindex','-1');
    target.classList.add('navigation-target');target.focus({preventScroll:true});
    target.addEventListener('blur',()=>{target.classList.remove('navigation-target');if(!hadTabindex)target.removeAttribute('tabindex')},{once:true});
    if(!reduced.matches){
      const heading=target.querySelector('h1,h2')||target;
      heading.animate([{opacity:.45,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:480,easing:'cubic-bezier(.2,.7,.2,1)'});
      const eyebrow=target.querySelector('.section-top');
      if(eyebrow)eyebrow.animate([{opacity:.3,transform:'translateX(-12px)'},{opacity:1,transform:'translateX(0)'}],{duration:450,easing:'ease-out'});
    }
  }
  document.addEventListener('click',e=>{
    const link=e.target.closest('a[href^="#"]');
    if(!link||e.defaultPrevented||e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||link.classList.contains('skip'))return;
    const id=link.getAttribute('href').slice(1);if(!id)return;
    const target=document.getElementById(id);if(!target)return;
    e.preventDefault();stop();
    if(location.hash!==`#${id}`)history.pushState(null,'',`#${id}`);
    const offset=()=>id==='accueil'?0:Math.max(0,scrollY+target.getBoundingClientRect().top-header.offsetHeight-24);
    if(reduced.matches){scrollTo({top:offset(),behavior:'instant'});arrival(target);return}
    const token=run,start=scrollY,initialEnd=offset();
    const duration=Math.min(1150,Math.max(550,Math.abs(initialEnd-start)*.13));
    const began=performance.now();document.documentElement.classList.add('navigation-running');
    const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
    function tick(now){
      if(token!==run)return;
      const t=Math.min(1,(now-began)/duration),end=offset();
      scrollTo({top:start+(end-start)*ease(t),behavior:'instant'});
      if(t<1)frame=requestAnimationFrame(tick);
      else{frame=0;document.documentElement.classList.remove('navigation-running');arrival(target)}
    }
    frame=requestAnimationFrame(tick);
  });
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    observer.unobserve(entry.target);
    if(reduced.matches||animated.has(entry.target))return;
    animated.add(entry.target);
    entry.target.animate([{opacity:.25,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:600,delay:Number(entry.target.dataset.motionDelay||0),easing:'cubic-bezier(.2,.7,.2,1)'});
  }),{threshold:.14});
  function observeContent(){
    document.querySelectorAll('.section-heading h2,.experience,.tech,.project-info,.facts>div,.portrait-statement').forEach((el,i)=>{if(!animated.has(el)){el.dataset.motionDelay=String(el.classList.contains('tech')?(i%4)*55:0);observer.observe(el)}});
  }
  observeContent();
  new MutationObserver(observeContent).observe(document.querySelector('#stack-panel'),{childList:true});
  addEventListener('portfolio:projects',observeContent);
  reduced.addEventListener('change',()=>{stop();if(reduced.matches)document.getAnimations().forEach(a=>{if(a.effect?.getComputedTiming().endTime!==Infinity)a.finish()})});
})();

/* Entrance runs after the existing loading screen, once per page load. */
(() => {
  const hero=document.querySelector('#accueil'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const role=hero.querySelector('.hero-position h1>span:not(.sr-only)');
  const roles=['Full Stack Developer.','Software Engineer.','Web Developer.'];
  const accessible=document.createElement('span');accessible.className='sr-only';accessible.textContent=roles.join(' ');role.before(accessible);role.setAttribute('aria-hidden','true');role.classList.add('dynamic-role');
  hero.classList.add('hero-motion-ready');
  let begun=false,index=0,timer=0,visible=false,animation=null,generation=0;
  function cancel(){clearTimeout(timer);timer=0;generation++;animation?.cancel();animation=null;role.style.opacity='';role.style.transform=''}
  function queue(delay=4000){if(begun&&visible&&!document.hidden&&!reduced.matches&&!timer)timer=setTimeout(change,delay)}
  async function change(){timer=0;const version=generation;if(!visible||document.hidden||reduced.matches)return;
    animation=role.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-7px)'}],{duration:320,easing:'ease-in',fill:'forwards'});
    try{await animation.finished}catch{return}if(version!==generation)return;
    index=(index+1)%roles.length;role.textContent=roles[index];animation.cancel();
    animation=role.animate([{opacity:0,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:450,easing:'ease-out'});
    try{await animation.finished}catch{return}if(version===generation)queue();
  }
  function begin(){if(begun)return;begun=true;hero.classList.add('hero-motion-start');queue(6200)}
  if(document.body.classList.contains('intro-finished')||reduced.matches)begin();
  else {const observer=new MutationObserver(()=>{if(document.body.classList.contains('intro-finished')){begin();observer.disconnect()}});observer.observe(document.body,{attributes:true,attributeFilter:['class']});setTimeout(begin,3000)}
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)queue();else cancel()},{threshold:.1}).observe(hero);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();else queue()});
  reduced.addEventListener('change',()=>{cancel();if(reduced.matches){index=0;role.textContent=roles[0];begin()}else queue()});
})();

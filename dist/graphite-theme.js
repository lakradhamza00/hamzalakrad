(() => {
  const cursor=document.querySelector('.cursor-follower'),label=cursor.querySelector('span'),hero=document.querySelector('.hero-title'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
  document.addEventListener('pointerover',e=>{
    if(e.pointerType==='touch')return;
    const target=e.target.closest('a,button,.work-visual');
    if(!target){delete cursor.dataset.action;label.textContent='EXPLORE';return}
    const action=target.matches('[download],#view-cv')||target.hasAttribute('download')?'DOWNLOAD ↓':target.matches('.work-visual,.open-project')?'VIEW':target.matches('a[href^="http"],a[href^="mailto"]')?'OPEN ↗':null;
    if(action){cursor.dataset.action=action;label.textContent=action}else{delete cursor.dataset.action;label.textContent='EXPLORE'}
  },{passive:true});
  hero.addEventListener('pointermove',e=>{if(reduced.matches||e.pointerType==='touch')return;const r=hero.getBoundingClientRect();hero.style.setProperty('--silver-x',`${45+(e.clientX-r.left)/r.width*10}%`)},{passive:true});
  hero.addEventListener('pointerleave',()=>hero.style.removeProperty('--silver-x'));
})();

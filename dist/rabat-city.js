/* Rabat City: event-driven parallax and existing functionality retained. */
(() => {
 const hero=document.querySelector('#accueil'),header=document.querySelector('.header'),city=hero.querySelector('.rabat-city img'),timeline=document.querySelector('.timeline'),cursor=document.querySelector('.cursor-follower'),reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(pointer:fine)');
 let frame=0,px=0,py=0,tx=0,ty=0,view=true;
 function update(){frame=0;header.classList.toggle('is-scrolled',scrollY>36);document.body.classList.toggle('rabat-in-hero',scrollY<hero.offsetHeight*.65);const r=hero.getBoundingClientRect();
  if(!reduced.matches&&view){px+=(tx-px)*.12;py+=(ty-py)*.12;const scroll=Math.max(0,Math.min(hero.offsetHeight,scrollY));city.style.setProperty('--city-x',`${px*7}px`);city.style.setProperty('--city-y',`${py*5+scroll*.12}px`);if(Math.abs(tx-px)>.005||Math.abs(ty-py)>.005)frame=requestAnimationFrame(update)}
  const t=timeline.getBoundingClientRect(),line=innerHeight*.68,progress=Math.max(0,Math.min(1,(line-t.top)/Math.max(1,t.height)));timeline.style.setProperty('--timeline-progress',`${(progress*100).toFixed(2)}%`);timeline.querySelectorAll('.experience').forEach(el=>el.classList.toggle('experience-active',el.getBoundingClientRect().top<line));
 }
 function schedule(){if(!frame&&!document.hidden)frame=requestAnimationFrame(update)}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});
 if(fine.matches){hero.addEventListener('pointermove',e=>{if(reduced.matches||e.pointerType==='touch')return;const r=hero.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5;hero.style.setProperty('--city-light-x',`${e.clientX-r.left}px`);hero.style.setProperty('--city-light-y',`${e.clientY-r.top}px`);schedule()},{passive:true});hero.addEventListener('pointerleave',()=>{tx=ty=0;schedule()});
  document.addEventListener('pointerover',e=>{const target=e.target.closest('a,button,.work-visual');if(!target){delete cursor.dataset.action;return}const action=target.matches('[download]')?'CV ↓':target.matches('.open-project,.rabat-project-action,.work-visual')?'VOIR ↗':target.matches('a[href^="http"],a[href^="mailto"]')?'OUVRIR ↗':null;if(action){cursor.dataset.action=action;cursor.querySelector('span').textContent=action}else delete cursor.dataset.action},{passive:true});
 }
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.target===hero){view=entry.isIntersecting;hero.classList.toggle('rabat-out-of-view',!view);if(view)schedule()}entry.target.querySelectorAll('.rabat-spark').forEach(el=>el.classList.toggle('is-paused',!entry.isIntersecting))}),{threshold:0});
 [hero,document.querySelector('#apropos'),document.querySelector('#contact')].forEach((section,j)=>{for(let i=0;i<(j===0?12:6);i++){const dot=document.createElement('i');dot.className='rabat-spark';dot.setAttribute('aria-hidden','true');dot.style.setProperty('--spark-x',`${(i*23.7+9)%96}%`);dot.style.setProperty('--spark-y',`${15+(i*17.3)%70}%`);dot.style.setProperty('--spark-delay',`${-i*1.1}s`);section.append(dot)}observer.observe(section)});
 function projectActions(){document.querySelectorAll('#projects .work-slide').forEach(article=>{const visual=article.querySelector('.work-visual');if(visual.querySelector('.rabat-project-action'))return;const original=article.querySelector('.open-project');const button=document.createElement('button');button.type='button';button.className='rabat-project-action';button.dataset.project=original.dataset.project;button.innerHTML='Voir le projet <span>→</span>';visual.append(button)})}
 projectActions();addEventListener('portfolio:projects',projectActions);
 document.addEventListener('visibilitychange',()=>{hero.classList.toggle('rabat-out-of-view',document.hidden||!view);if(document.hidden){cancelAnimationFrame(frame);frame=0}else schedule()});
 reduced.addEventListener('change',()=>{tx=ty=px=py=0;city.style.removeProperty('--city-x');city.style.removeProperty('--city-y');schedule()});
 document.fonts.ready.then(schedule);update();
})();

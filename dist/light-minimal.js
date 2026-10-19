/* Rabat City: event-driven parallax and existing functionality retained. */
(() => {
 const hero=document.querySelector('#accueil'),header=document.querySelector('.header'),city=hero.querySelector('.light-workspace'),timeline=document.querySelector('.timeline'),cursor=document.querySelector('.cursor-follower'),reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(pointer:fine)');
 let frame=0,px=0,py=0,tx=0,ty=0,view=true;
 function update(){frame=0;header.classList.toggle('is-scrolled',scrollY>36);document.body.classList.toggle('rabat-in-hero',scrollY<hero.offsetHeight*.65);const r=hero.getBoundingClientRect();
  const t=timeline.getBoundingClientRect(),line=innerHeight*.68,progress=Math.max(0,Math.min(1,(line-t.top)/Math.max(1,t.height)));timeline.style.setProperty('--timeline-progress',`${(progress*100).toFixed(2)}%`);timeline.querySelectorAll('.experience').forEach(el=>el.classList.toggle('experience-active',el.getBoundingClientRect().top<line));
 }
 function schedule(){if(!frame&&!document.hidden)frame=requestAnimationFrame(update)}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});
 if(fine.matches){
  document.addEventListener('pointerover',e=>{if(document.documentElement.hasAttribute('data-premium-cursor'))return;const target=e.target.closest('a,button,.work-visual');if(!target){delete cursor.dataset.action;return}const action=target.matches('[download]')?'CV ↓':target.matches('.open-project,.rabat-project-action,.work-visual')?'VOIR ↗':target.matches('a[href^="http"],a[href^="mailto"]')?'OUVRIR ↗':null;if(action){cursor.dataset.action=action;cursor.querySelector('span').textContent=action}else delete cursor.dataset.action},{passive:true});
 }
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.target===hero){view=entry.isIntersecting;hero.classList.toggle('workspace-paused',!view);if(view)schedule()}entry.target.querySelectorAll('.rabat-spark').forEach(el=>el.classList.toggle('is-paused',!entry.isIntersecting))}),{threshold:0});
 [hero,document.querySelector('#apropos'),document.querySelector('#contact')].forEach((section,j)=>{for(let i=0;i<(j===0?5:6);i++){const dot=document.createElement('i');dot.className='rabat-spark';dot.setAttribute('aria-hidden','true');dot.style.setProperty('--spark-x',`${(i*23.7+9)%96}%`);dot.style.setProperty('--spark-y',`${15+(i*17.3)%70}%`);dot.style.setProperty('--spark-delay',`${-i*1.1}s`);section.append(dot)}observer.observe(section)});
 function projectActions(){document.querySelectorAll('#projects .work-slide').forEach(article=>{const visual=article.querySelector('.work-visual');if(visual.querySelector('.rabat-project-action'))return;const original=article.querySelector('.open-project');const button=document.createElement('button');button.type='button';button.className='rabat-project-action';button.dataset.project=original.dataset.project;button.innerHTML='Voir le projet <span>→</span>';visual.append(button)})}
 projectActions();addEventListener('portfolio:projects',projectActions);
 document.addEventListener('visibilitychange',()=>{hero.classList.toggle('workspace-paused',document.hidden||!view);if(document.hidden){cancelAnimationFrame(frame);frame=0}else schedule()});
 reduced.addEventListener('change',()=>{tx=ty=px=py=0;city.style.removeProperty('--work-x');city.style.removeProperty('--work-y');schedule()});
 document.fonts.ready.then(schedule);update();
})();

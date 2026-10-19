/* Stable experience centerpiece and independently periodic technology rows. */
(() => {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),mobile=matchMedia('(max-width:700px)');
  const root=document.querySelector('#creative-process');
  if(!root.classList.contains('signal-process')){
  root.classList.add('stable-process');
  root.querySelector('.process-window').removeAttribute('aria-hidden');
  const concepts=['IDEA','LOGIC','INTERFACE','EXPERIENCE'];
  const captions=['Concept / Vision','Architecture / Thinking','Design / Interaction','Result / Emotion'];
  root.querySelector('.process-track').innerHTML='<div class="concept-row">'+concepts.map((word,i)=>`<div class="concept-unit"><span class="concept-word" data-word="${word}"><span class="concept-base">${word}</span><span class="concept-light" aria-hidden="true">${word}</span><small aria-hidden="true">${captions[i]}</small></span></div>${i<3?'<span class="concept-arrow" aria-hidden="true">→<i></i></span>':''}`).join('')+'</div>';
  root.querySelector('.process-coordinate').textContent='X 034.00 / Y 006.00';
  root.querySelector('.process-hint').textContent='CONCEPT / SYSTEM / INTERACTION';
  root.querySelector('.process-toggle').remove();
  const conceptWords=[...root.querySelectorAll('.concept-word')];
  const arrows=[...root.querySelectorAll('.concept-arrow')];
  let active=null,previous=-1;
  function clearWord(){active?.classList.remove('is-active');active=null}
  root.querySelector('.concept-row').addEventListener('pointermove',e=>{
    if(e.pointerType==='touch')return;
    const word=e.target.closest('.concept-word');
    if(word!==active){clearWord();if(word){active=word;word.classList.add('is-active');const index=conceptWords.indexOf(word);if(previous>=0&&Math.abs(index-previous)===1&&!reduced.matches){const arrow=arrows[Math.min(index,previous)];arrow.getAnimations().forEach(a=>a.cancel());arrow.animate([{color:'#ff8a00',textShadow:'none'},{color:'#ffb547',textShadow:'0 0 12px #ff8a0026'},{color:'#ff8a00',textShadow:'none'}],{duration:650});arrow.querySelector('i').animate([{transform:`translateX(${index>previous?-10:10}px)`,opacity:0},{opacity:.8,offset:.4},{transform:`translateX(${index>previous?10:-10}px)`,opacity:0}],{duration:650})}previous=index}}
    if(word){const r=word.getBoundingClientRect();word.style.setProperty('--light-x',`${e.clientX-r.left}px`);word.style.setProperty('--light-y',`${e.clientY-r.top}px`)}
  },{passive:true});
  root.querySelector('.concept-row').addEventListener('pointerleave',()=>{clearWord();previous=-1});
  }
  const panel=document.querySelector('#stack-panel');if(panel.dataset.rabatStack==='true')return;
  const detail=panel.nextElementSibling;
  const defaultDetail=detail.textContent;
  let hoveredTech=null,focusedTech=null,touchedTech=null;
  function selectTech(){
    const selected=hoveredTech||focusedTech||touchedTech;
    panel.querySelectorAll('.tech.is-selected').forEach(el=>el.classList.remove('is-selected'));
    selected?.classList.add('is-selected');panel.classList.toggle('has-selected-tech',Boolean(selected));
    detail.textContent=selected?selected.dataset.detail:defaultDetail;
  }
  panel.addEventListener('pointerover',e=>{if(e.pointerType==='touch')return;hoveredTech=e.target.closest('.tech');selectTech()});
  panel.addEventListener('pointerout',e=>{if(e.pointerType==='touch')return;hoveredTech=e.relatedTarget instanceof Element?e.relatedTarget.closest('#stack-panel .tech'):null;selectTech()});
  panel.addEventListener('focusin',e=>{focusedTech=e.target.matches(':focus-visible')?e.target.closest('.tech'):null;selectTech()});
  panel.addEventListener('focusout',e=>{focusedTech=e.relatedTarget instanceof Element?e.relatedTarget.closest('#stack-panel .tech'):null;selectTech()});
  panel.addEventListener('pointerdown',e=>{if(e.pointerType!=='touch')return;const tech=e.target.closest('.tech');touchedTech=touchedTech===tech?null:tech;selectTech()});
  document.addEventListener('pointerdown',e=>{if(!panel.contains(e.target)){hoveredTech=focusedTech=touchedTech=null;selectTech()}});
  panel.addEventListener('keydown',e=>{if(e.key==='Escape'){hoveredTech=focusedTech=touchedTech=null;selectTech()}});
  const toggle=document.createElement('button');toggle.type='button';toggle.className='stream-toggle';toggle.textContent='Pause motion Ⅱ';toggle.setAttribute('aria-pressed','false');panel.before(toggle);
  let paused=false,frame=0,last=0;
  const rows=[...panel.querySelectorAll('.tech-stream')].map(el=>({el,viewport:el.querySelector('.tech-viewport'),track:el.querySelector('.tech-track'),cycle:el.querySelector('.tech-cycle'),width:1,view:1,phase:0,visible:false,hover:false,speed:1,items:[]}));
  function layout(row){
    row.track.querySelectorAll('.tech-cycle:not(:first-child)').forEach(el=>el.remove());
    row.width=row.cycle.getBoundingClientRect().width||1;row.view=row.viewport.clientWidth;
    if(!reduced.matches)for(let i=0;i<Math.ceil(row.view/row.width)+1;i++){const clone=row.cycle.cloneNode(true);clone.setAttribute('aria-hidden','true');clone.querySelectorAll('button').forEach(b=>b.tabIndex=-1);row.track.append(clone)}
    row.items=[...row.track.querySelectorAll('.tech')].map(el=>({el,center:el.offsetLeft+el.offsetWidth/2}));render(row);
  }
  function render(row){
    const offset=reduced.matches?0:row.phase*row.width;
    row.track.style.transform=`translate3d(${-offset}px,0,0)`;
    row.items.forEach(({el,center})=>{const focus=reduced.matches?1:Math.max(0,1-Math.abs(center-offset-row.view/2)/(row.view*.6));el.style.setProperty('--focus',focus.toFixed(3))});
  }
  function stop(){cancelAnimationFrame(frame);frame=0;last=0}
  function start(){if(!frame&&!paused&&!reduced.matches&&!document.hidden&&rows.some(r=>r.visible))frame=requestAnimationFrame(tick)}
  function tick(now){frame=0;const dt=last?Math.min((now-last)/1000,.05):0;last=now;for(const row of rows){if(!row.visible)continue;row.speed+=((row.hover?.3:1)-row.speed)*(1-Math.exp(-dt*5));row.phase=((row.phase+Number(row.el.dataset.direction)*(mobile.matches?14:24)*row.speed*dt/row.width)%1+1)%1;render(row)}start()}
  const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{rows.find(r=>r.el===e.target).visible=e.isIntersecting});if(rows.some(r=>r.visible))start();else stop()});
  rows.forEach(row=>{observer.observe(row.el);row.viewport.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')row.hover=true});row.viewport.addEventListener('pointerleave',()=>row.hover=false);row.viewport.addEventListener('focusin',e=>{paused=true;toggle.setAttribute('aria-pressed','true');toggle.textContent='Resume motion ▶';stop();const button=e.target.closest('.tech');if(button){const center=button.offsetLeft+button.offsetWidth/2;row.phase=Math.max(0,center-row.view/2)/row.width;render(row)}});new ResizeObserver(()=>layout(row)).observe(row.viewport)});
  toggle.addEventListener('click',()=>{paused=!paused;toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=paused?'Resume motion ▶':'Pause motion Ⅱ';if(paused)stop();else start()});
  document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
  reduced.addEventListener('change',()=>{stop();rows.forEach(layout);start()});
  document.fonts.ready.then(()=>{rows.forEach(layout);start()});
})();

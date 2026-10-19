/* A periodic track: modulo changes the coordinate, never the visible sequence. */
(() => {
  const root=document.querySelector('#creative-process');if(!root)return;
  const scene=root.querySelector('.process-scene'),track=root.querySelector('.process-track');
  const toggle=root.querySelector('.process-toggle'),steps=[...root.querySelectorAll('.process-steps>span')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),mobile=matchMedia('(max-width:700px)'),fine=matchMedia('(pointer:fine)');
  const concepts=['IDEA','LOGIC','INTERFACE','EXPERIENCE'];
  let words=[],centers=[],cycle=1,view=innerWidth,distance=0,velocity=0,impulse=0,direction=1,lastY=scrollY;
  let frame=0,lastTime=0,visible=false,paused=false,hover=null,ready=false,active=-1,resizeFrame=0;
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v)),mod=(v,n)=>(v%n+n)%n;
  function group(){const g=document.createElement('div');g.className='process-cycle';concepts.forEach((label,i)=>{const unit=document.createElement('div');unit.className='process-unit';const word=document.createElement('span');word.className='process-word';word.textContent=label;word.dataset.concept=String(i);const arrow=document.createElement('span');arrow.className='process-arrow';arrow.textContent='→';unit.append(word,arrow);g.append(unit)});return g}
  function layout(){
    const oldCycle=cycle,phase=ready?mod(distance,oldCycle)/oldCycle:0;
    track.replaceChildren(group());view=scene.clientWidth;
    const first=track.firstElementChild;cycle=first.getBoundingClientRect().width||1;
    centers=[...first.querySelectorAll('.process-word')].map(w=>({x:w.offsetLeft+w.offsetWidth/2,width:w.offsetWidth}));
    const copies=reduced.matches?1:Math.ceil(view/cycle)+3;
    for(let i=1;i<copies;i++)track.append(group());
    words=[...track.querySelectorAll('.process-word')].map((el,i)=>({el,index:i%4,base:Math.floor(i/4)*cycle+centers[i%4].x}));
    distance=ready?phase*cycle:centers[0].x-view/2;
    ready=true;hover=null;render();start();
  }
  function render(){
    if(reduced.matches){track.style.transform='none';return}
    const offset=mod(distance,cycle);track.style.transform=`translate3d(${-offset}px,0,0)`;
    let nearest=Infinity,next=0;
    const range=view*.53;
    words.forEach(({el,index,base})=>{
      const delta=base-offset-view/2,abs=Math.abs(delta);
      if(abs<nearest){nearest=abs;next=index}
      if(abs>view*.85+250){el.style.opacity='0';return}
      let focus=Math.pow(clamp(1-abs/range,0,1),1.7);
      if(hover===el)focus=Math.max(.92,focus);
      el.style.opacity=String(.19+.81*focus);
      el.style.transform=`translate3d(0,${(1-focus)*5}px,0) scale(${.86+.14*focus})`;
      el.style.filter=mobile.matches?'none':`blur(${((1-focus)*1.3).toFixed(2)}px)`;
      el.style.color=focus>.62?'#f5f5f5':'#a3a3a3';
      el.style.textShadow=focus>.8?'0 0 36px #d4d4d412':'none';
    });
    if(active!==next){active=next;steps.forEach((el,i)=>el.classList.toggle('is-active',i===active))}
    root.querySelector('.process-coordinate b').textContent=(offset/cycle*100).toFixed(2).padStart(6,'0');
    root.querySelector('.process-coordinate em').textContent=direction>0?'→':'←';
    const r=root.getBoundingClientRect();
    scene.style.setProperty('--process-progress',String(clamp((innerHeight*.4-r.top)/Math.max(1,r.height-innerHeight*.2),0,1)));
  }
  function tick(now){
    frame=0;if(!visible||document.hidden||paused||reduced.matches){lastTime=0;return}
    const dt=lastTime?Math.min((now-lastTime)/1000,.04):1/60;lastTime=now;
    const speed=mobile.matches?20:31;
    const target=(direction*speed+clamp(impulse,-560,560))*(hover?.24:1);
    velocity+=(target-velocity)*(1-Math.exp(-dt*4.2));
    impulse*=Math.exp(-dt*3.1);
    distance+=velocity*dt;render();frame=requestAnimationFrame(tick);
  }
  function start(){if(ready&&visible&&!paused&&!reduced.matches&&!document.hidden&&!frame){lastTime=0;frame=requestAnimationFrame(tick)}}
  function stop(){cancelAnimationFrame(frame);frame=0;lastTime=0}
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;root.classList.toggle('process-offscreen',!visible);lastY=scrollY;if(visible)start();else stop()},{threshold:0,rootMargin:'60px'}).observe(root);
  addEventListener('scroll',()=>{const delta=scrollY-lastY;lastY=scrollY;if(!visible||reduced.matches||Math.abs(delta)<.1)return;direction=delta>0?1:-1;impulse=clamp(impulse+delta*2.8,-800,800);start()},{passive:true});
  if(fine.matches){scene.addEventListener('pointermove',e=>{
    if(reduced.matches||mobile.matches)return;
    const r=scene.getBoundingClientRect();scene.style.setProperty('--process-px',`${(e.clientX/r.width-.5)*13}px`);scene.style.setProperty('--process-py',`${((e.clientY-r.top)/r.height-.5)*10}px`);
    hover=e.target.closest('.process-word');
  },{passive:true});scene.addEventListener('pointerleave',()=>{hover=null;scene.style.setProperty('--process-px','0px');scene.style.setProperty('--process-py','0px')})}
  toggle.addEventListener('click',()=>{paused=!paused;root.classList.toggle('process-paused',paused);toggle.setAttribute('aria-pressed',String(paused));toggle.setAttribute('aria-label',paused?'Resume creative process animation':'Pause creative process animation');toggle.innerHTML=paused?'Resume motion <span>▶</span>':'Pause motion <span>Ⅱ</span>';if(paused)stop();else start()});
  document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
  new ResizeObserver(()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(layout)}).observe(scene);
  reduced.addEventListener('change',()=>{stop();velocity=impulse=0;layout()});
  document.fonts.ready.then(layout);
})();

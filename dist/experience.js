/* Scroll is native. This layer maps scroll position to the scene and gallery. */
(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(pointer:fine)');
  const chapters = [...document.querySelectorAll('main > section[id]')];
  const names = ['INTRODUCTION','ABOUT ME','TECH STACK','EXPERIENCE','SELECTED WORKS','CURRICULUM VITAE','CONTACT'];
  const dock = document.querySelector('.chapter-dock');
  const links = [...dock.querySelectorAll('a')];
  const canvas = document.querySelector('#engineering-canvas');
  const ctx = canvas.getContext('2d');
  const work = document.querySelector('#projets');
  const track = document.querySelector('#projects');
  const bridge = document.querySelector('.story-bridge');
  const follower = document.querySelector('.cursor-follower');
  let width=innerWidth,height=innerHeight,chapter=0,frame=0,scrollGallery=false,workIndex=0,workCount=8;
  let pointerX=width*.7,pointerY=height*.4,lastScroll=scrollY;
  let sceneX=pointerX,sceneY=pointerY,sceneTime=0;
  const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
  document.querySelectorAll('.button, .download-link').forEach(el=>el.classList.add('magnetic'));
  const hiddenName=document.createElement('span');hiddenName.className='sr-only';hiddenName.textContent='Hamza Lakrad — ';document.querySelector('h1').prepend(hiddenName);
  document.querySelector('.intro-screen').addEventListener('animationend',e=>{if(e.animationName==='intro-exit')document.body.classList.add('intro-finished')});
  // Returning to the page should not make the user wait through the intro again.
  try {if(sessionStorage.getItem('hl-intro'))document.body.classList.add('intro-finished');sessionStorage.setItem('hl-intro','1')}catch{}
  function gallerySetup(){
    if(work.classList.contains('orbit-projects')){workCount=track.children.length;scrollGallery=false;return;}
    workCount=track.children.length;
    scrollGallery=false;
    work.classList.toggle('scroll-gallery',scrollGallery);
    work.style.height=scrollGallery?`${height+(workCount-1)*height*.64}px`:'';
    document.querySelector('#work-total').textContent=String(workCount).padStart(2,'0');
    document.querySelector('.work-title-dot').parentElement.querySelector('small').textContent=`01—${String(workCount).padStart(2,'0')}`;
    if(!scrollGallery)track.style.transform='';
    schedule();
  }
  function resize(){
    width=innerWidth;height=innerHeight;
    const ratio=Math.min(devicePixelRatio||1,1.5);
    canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);
    gallerySetup();
  }
  function drawScene(pageProgress){
    if(document.querySelector('#terminal-code'))return;
    ctx.clearRect(0,0,width,height);
    const light=document.documentElement.dataset.theme==='light';
    const copper=light?'138,138,138':'163,163,163';
    const neutral=light?'115,115,115':'212,212,212';
    const t=motion.matches?.35:pageProgress*6.5;
    const px=motion.matches?0:(sceneX/width-.5)*.12,py=motion.matches?0:(sceneY/height-.5)*.1;
    const cx=width*(width<700?.77:.80)+Math.sin(t)*width*.035;
    const cy=height*(.42+Math.cos(t*.5)*.06);
    const radius=Math.min(width*.23,height*.29);
    const project=(x,y,z)=>{
      const a=t*.55+px+.4,b=t*.28+py+.38;
      const x1=x*Math.cos(a)-z*Math.sin(a),z1=x*Math.sin(a)+z*Math.cos(a);
      const y1=y*Math.cos(b)-z1*Math.sin(b),z2=y*Math.sin(b)+z1*Math.cos(b);
      const perspective=3.8/(3.8+z2);
      return [cx+x1*radius*perspective,cy+y1*radius*perspective,z2];
    };
    // Three connected layers: interface, application, data.
    const points=[];
    for(let layer=0;layer<3;layer++){
      const y=(layer-1)*.72;
      for(let i=0;i<12;i++){
        const a=i/12*Math.PI*2;
        const squareMix=.45+.35*Math.sin(t*.7+layer*.4);
        const circleX=Math.cos(a),circleZ=Math.sin(a),m=Math.max(Math.abs(circleX),Math.abs(circleZ));
        points.push(project(circleX*(1-squareMix)+circleX/m*squareMix,y,circleZ*(1-squareMix)+circleZ/m*squareMix));
      }
    }
    const line=(a,b,alpha,color=copper)=>{ctx.strokeStyle=`rgba(${color},${alpha})`;ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke()};
    ctx.lineWidth=.65;
    for(let layer=0;layer<3;layer++)for(let i=0;i<12;i++){
      const index=layer*12+i,p=points[index];
      const opacity=clamp((p[2]+2)/5,.08,.3);
      line(p,points[layer*12+(i+1)%12],opacity);
      if(layer<2)line(p,points[index+12],opacity*.45,neutral);
      if(i%3===0){ctx.fillStyle=`rgba(${copper},.45)`;ctx.fillRect(p[0]-1.5,p[1]-1.5,3,3)}
    }
    // Technical registration marks persist between chapters instead of a star field.
    ctx.strokeStyle=`rgba(${neutral},.11)`;ctx.lineWidth=.6;
    const gap=width<700?90:125;
    for(let x=gap;x<width;x+=gap)for(let y=110;y<height-70;y+=gap){ctx.beginPath();ctx.moveTo(x-2,y);ctx.lineTo(x+2,y);ctx.moveTo(x,y-2);ctx.lineTo(x,y+2);ctx.stroke()}
    if(width>700){ctx.font='7px Consolas, monospace';ctx.fillStyle=`rgba(${neutral},.38)`;ctx.fillText(`SYS.${String(chapter+1).padStart(2,'0')} / ${names[chapter]}`,width-260,height-110);ctx.fillText(`EXPLORATION ${String(Math.round(pageProgress*100)).padStart(3,'0')}%`,width-260,height-96)}
  }
  function update(){
    frame=0;
    const max=document.documentElement.scrollHeight-height;
    const progress=clamp(scrollY/Math.max(1,max));
    let next=0;
    chapters.forEach((s,i)=>{if(s.getBoundingClientRect().top<height*.4)next=i});
    if(next!==chapter||!dock.dataset.ready){
      chapter=next;dock.dataset.ready='true';
      document.querySelector('#chapter-number').textContent=String(chapter+1).padStart(2,'0');
      document.querySelector('#chapter-name').textContent=names[chapter];
      links.forEach((a,i)=>{if(i===chapter)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
      const active=links[chapter];document.querySelector('.dock-position').style.transform=`translateX(${active.offsetLeft-links[0].offsetLeft}px)`;
    }
    // The creative-process scene owns its independent motion system.
    if(scrollGallery){
      const rect=work.getBoundingClientRect();
      const distance=Math.max(1,work.offsetHeight-height);
      const p=clamp((77-rect.top)/distance);
      const slideWidth=work.querySelector('.work-viewport').clientWidth;
      track.style.transform=`translate3d(${-p*(workCount-1)*slideWidth}px,0,0)`;
      workIndex=Math.round(p*(workCount-1));
      document.querySelector('#work-current').textContent=String(workIndex+1).padStart(2,'0');
      document.querySelector('.work-meter').style.setProperty('--work-progress',String((p*(workCount-1)+1)/workCount));
      document.querySelector('#work-prev').disabled=workIndex===0;
      document.querySelector('#work-next').disabled=workIndex===workCount-1;
    }
    const now=performance.now(),dt=sceneTime?Math.min((now-sceneTime)/1000,.05):1/60;sceneTime=now;
    const ease=1-Math.exp(-dt*7);
    sceneX+=(pointerX-sceneX)*ease;sceneY+=(pointerY-sceneY)*ease;
    drawScene(progress);lastScroll=scrollY;
    if(!motion.matches&&!document.hidden&&chapter===0&&(Math.abs(pointerX-sceneX)>.2||Math.abs(pointerY-sceneY)>.2))schedule();
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(update)}
  function goToWork(index){
    if(work.classList.contains('orbit-projects'))return;
    index=clamp(index,0,workCount-1);
    if(!scrollGallery){track.children[index]?.scrollIntoView({behavior:motion.matches?'auto':'smooth',block:'center'});return}
    const top=scrollY+work.getBoundingClientRect().top;
    const distance=work.offsetHeight-height;
    scrollTo({top:top-77+(index/Math.max(1,workCount-1))*distance,behavior:motion.matches?'auto':'smooth'});
  }
  document.querySelector('#work-prev').addEventListener('click',()=>goToWork(workIndex-1));
  document.querySelector('#work-next').addEventListener('click',()=>goToWork(workIndex+1));
  track.addEventListener('focusin',e=>{const slide=e.target.closest('.work-slide');if(slide&&scrollGallery){const index=Number(slide.dataset.workIndex);if(index!==workIndex)goToWork(index)}});
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',resize,{passive:true});
  addEventListener('portfolio:projects',gallerySetup);
  motion.addEventListener('change',resize);
  document.querySelector('#theme').addEventListener('click',schedule);
  if(fine.matches&&!motion.matches&&!document.documentElement.hasAttribute('data-premium-cursor')){
    let heroCursorFrame=0,heroPointer=null;
    document.addEventListener('pointermove',e=>{
      if(e.target.closest('#accueil')){heroPointer=e;if(!heroCursorFrame)heroCursorFrame=requestAnimationFrame(()=>{heroCursorFrame=0;follower.style.left='0px';follower.style.top='0px';follower.style.transform=`translate3d(${heroPointer.clientX}px,${heroPointer.clientY}px,0)`;follower.style.opacity='1';follower.classList.remove('over-project')});return}
      cancelAnimationFrame(heroCursorFrame);heroCursorFrame=0;follower.style.removeProperty('transform');

      pointerX=e.clientX;pointerY=e.clientY;
      follower.style.left=`${pointerX}px`;follower.style.top=`${pointerY}px`;follower.style.opacity='1';
      follower.classList.toggle('over-project',Boolean(e.target.closest('.work-visual')));
      const target=e.target.closest('.magnetic');
      if(target){const r=target.getBoundingClientRect();target.style.setProperty('--mag-x',`${(pointerX-r.left-r.width/2)*.12}px`);target.style.setProperty('--mag-y',`${(pointerY-r.top-r.height/2)*.16}px`)}
      schedule();
    },{passive:true});
    document.addEventListener('pointerout',e=>{const target=e.target.closest('.magnetic');if(target&&!target.contains(e.relatedTarget)){target.style.setProperty('--mag-x','0px');target.style.setProperty('--mag-y','0px')}});
    document.documentElement.addEventListener('pointerleave',()=>{follower.style.opacity='0';pointerX=width*.7;pointerY=height*.4;schedule()});
  }
  resize();
})();

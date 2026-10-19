/* Parametric ribbon fabric: static SVG geometry, compositor-only movement. */
(()=>{
 const root=document.querySelector('#projets.orbit-projects');if(!root)return;
 const environment=document.createElement('div');environment.className='fluid-environment';environment.setAttribute('aria-hidden','true');
 const ns='http://www.w3.org/2000/svg';
 function wave(secondary){
  const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 1440 1100');svg.setAttribute('preserveAspectRatio','none');svg.classList.add('fluid-wave');if(secondary)svg.classList.add('wave-secondary');
  const suffix=secondary?'b':'a';
  svg.innerHTML=`<defs><linearGradient id="fabric-${suffix}" x1="0" y1="0" x2="1" y2=".25"><stop stop-color="#14212c" stop-opacity="0"/><stop offset=".32" stop-color="#52606e" stop-opacity=".14"/><stop offset=".66" stop-color="#bb500d" stop-opacity=".3"/><stop offset=".84" stop-color="#ff8a00" stop-opacity=".64"/><stop offset="1" stop-color="#d9843d" stop-opacity=".06"/></linearGradient></defs>`;
  // One continuous fabric, folded in perspective along three broad curves.
  const groups=secondary?[[1440,730,-1,.72],[0,360,1,.8]]:[[0,-55,1,1],[1440,400,-1,.86],[0,820,1,.88]];
  groups.forEach(([x,y,direction,scale])=>{
   const g=document.createElementNS(ns,'g');g.setAttribute('transform',`translate(${x} ${y}) scale(${direction} ${scale})`);
   for(let i=0;i<27;i++){
    const t=i/26,k=t*t;
    const path=document.createElementNS(ns,'path');
    const d=`M -120 ${130+t*110} C 420 ${-80+t*320} 655 ${430-t*190} 990 ${220-t*45} S 1320 ${70-k*310} 1550 ${-100+t*80}`;
    path.setAttribute('d',d);path.setAttribute('fill','none');path.setAttribute('stroke',`url(#fabric-${suffix})`);path.setAttribute('stroke-width',i%8===0?'1.1':'.55');g.append(path);
    if(i<26){const ribbon=document.createElementNS(ns,'path');ribbon.setAttribute('d',d+` L 1550 ${-98+t*80} C 1320 ${72-k*310} 1320 ${72-k*310} 990 ${222-t*45} C 655 ${432-t*190} 420 ${-78+t*320} -120 ${132+t*110} Z`);ribbon.setAttribute('fill',`url(#fabric-${suffix})`);ribbon.setAttribute('opacity','.065');g.append(ribbon)}
   }
   svg.append(g);
  });
  if(!secondary){['M 30 140 C 420 50 700 350 990 220 S 1320 70 1490 -90','M 1410 590 C 1030 540 700 800 440 620 S 80 470 -80 520'].forEach((d,i)=>{const spark=document.createElementNS(ns,'circle');spark.setAttribute('r','1.5');spark.setAttribute('class',`fabric-spark ${i?'spark-two':''}`);spark.style.offsetPath=`path('${d}')`;svg.append(spark)})}
  return svg;
 }
 const depth=document.createElement('div');depth.className='fluid-depth';depth.append(wave(false),wave(true));environment.append(depth);root.prepend(environment);
 const reduced=matchMedia('(prefers-reduced-motion:reduce)'),mobile=matchMedia('(max-width:700px)'),fine=matchMedia('(hover:hover) and (pointer:fine)');
 let visible=false,frame=0,top=0,height=1,x=0,y=0;
 function measure(){const r=root.getBoundingClientRect();top=r.top+scrollY;height=r.height}
 function render(){frame=0;if(!visible||document.hidden||reduced.matches||mobile.matches)return;const scroll=Math.max(-1,Math.min(1,(scrollY+innerHeight/2-top)/height-.5))*22;depth.style.setProperty('--fluid-x',`${x.toFixed(2)}px`);depth.style.setProperty('--fluid-y',`${(y+scroll).toFixed(2)}px`)}
 function schedule(){if(!frame&&visible&&!document.hidden&&!reduced.matches&&!mobile.matches)frame=requestAnimationFrame(render)}
 function configure(){root.classList.toggle('fluid-running',visible&&!document.hidden&&!reduced.matches);if(reduced.matches||mobile.matches){depth.style.removeProperty('--fluid-x');depth.style.removeProperty('--fluid-y')}schedule()}
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;configure()},{rootMargin:'80px'}).observe(root);
 new ResizeObserver(()=>{measure();schedule()}).observe(root);
 root.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||!fine.matches||reduced.matches||mobile.matches)return;x=(e.clientX/innerWidth-.5)*6;y=((e.clientY+scrollY-top)/height-.5)*6;schedule()},{passive:true});
 root.addEventListener('pointerleave',()=>{x=y=0;schedule()});addEventListener('scroll',schedule,{passive:true});document.addEventListener('visibilitychange',configure);reduced.addEventListener('change',configure);mobile.addEventListener('change',configure);measure();
})();

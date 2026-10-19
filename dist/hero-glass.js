/* Refracted sampling of the actual background canvas, clipped to the existing glyphs. */
(() => {
 const title=document.querySelector('.hero-title'),source=document.querySelector('#terminal-code');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(pointer:fine)');
 const words=[...title.querySelectorAll('.name-word')].map(el=>{
   const letters=[...el.querySelectorAll('.hero-letter')];letters.forEach(l=>{l.dataset.glassChar=l.textContent;const reflection=document.createElement('span');reflection.className='glass-caustic';reflection.dataset.char=l.textContent;reflection.setAttribute('aria-hidden','true');l.append(reflection)});
   const canvas=document.createElement('canvas');canvas.className='glass-refraction';canvas.setAttribute('aria-hidden','true');el.append(canvas);
   return {el,letters,canvas,ctx:canvas.getContext('2d'),mask:document.createElement('canvas')};
 });
 let frame=0,visible=false,last=0,pointer=.48,activeGlass=null,activeWord=null,localX=0,localY=0;
 const trails=new Map();
 function draw(){
  words.forEach(({el,letters,canvas,ctx,mask})=>{
   const r=el.getBoundingClientRect();if(!r.width||!r.height||!source.width)return;
   const ratio=Math.min(devicePixelRatio||1,1.25),w=Math.ceil(r.width*ratio),h=Math.ceil(r.height*ratio);
   if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;mask.width=w;mask.height=h}
   const pen=mask.getContext('2d');pen.setTransform(ratio,0,0,ratio,0,0);pen.clearRect(0,0,r.width,r.height);pen.fillStyle='#fff';
   letters.forEach(l=>{const b=l.getBoundingClientRect(),style=getComputedStyle(l);pen.font=`${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;pen.textBaseline='alphabetic';const m=pen.measureText(l.textContent),ascent=m.fontBoundingBoxAscent||parseFloat(style.fontSize)*.8,descent=m.fontBoundingBoxDescent||parseFloat(style.fontSize)*.2;pen.fillText(l.textContent,b.left-r.left,b.top-r.top+(b.height-ascent-descent)/2+ascent)});
   ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,r.width,r.height);
   const sx=source.width/innerWidth,sy=source.height/innerHeight;
   // Narrow bands bend and magnify the real code texture, instead of using a flat transparent fill.
   for(let x=0;x<r.width;x+=6){const local=activeWord===el&&activeGlass?Math.max(0,1-Math.abs(x-localX)/Math.max(24,activeGlass.offsetWidth*.7)):0;const shift=Math.sin(x/r.width*Math.PI*5+.96)*5+Math.sin(x*.12+localY*.02)*2.2*local;
    const dx=Math.max(0,Math.min(innerWidth-10,r.left+x+shift));const dy=Math.max(0,Math.min(innerHeight-r.height,r.top-3));
    ctx.drawImage(source,dx*sx,dy*sy,Math.min(8*sx,source.width-dx*sx),Math.min(r.height*sy*.94,source.height-dy*sy),x,0,6,r.height);
   }
   ctx.globalCompositeOperation='destination-in';ctx.drawImage(mask,0,0,w,h,0,0,r.width,r.height);ctx.globalCompositeOperation='source-over';
  });
 }
 function tick(now){frame=0;if(!visible||document.hidden||reduced.matches)return;if(now-last>(activeGlass?33:100)){draw();last=now}frame=requestAnimationFrame(tick)}
 function start(){if(visible&&!document.hidden&&!reduced.matches&&!frame)frame=requestAnimationFrame(tick)}
 function stop(){cancelAnimationFrame(frame);frame=0}
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){draw();start()}else stop()}).observe(title);
 new ResizeObserver(()=>draw()).observe(title);document.fonts.ready.then(draw);
 function release(){
  if(activeGlass){const previous=activeGlass;previous.classList.remove('glass-active');previous.classList.add('glass-releasing');clearTimeout(trails.get(previous));trails.set(previous,setTimeout(()=>{previous.classList.remove('glass-releasing');trails.delete(previous)},300))}
  activeGlass=null;activeWord=null;
 }
 if(fine.matches){
  title.addEventListener('pointermove',e=>{
   if(reduced.matches||e.pointerType==='touch')return;
   const letter=e.target.closest('.hero-letter');
   if(letter!==activeGlass){release();if(letter){activeGlass=letter;activeWord=letter.closest('.name-word');clearTimeout(trails.get(letter));trails.delete(letter);letter.classList.remove('glass-releasing');letter.classList.add('glass-active')}}
   if(!letter)return;
   const r=letter.getBoundingClientRect(),word=activeWord.getBoundingClientRect();
   localX=e.clientX-word.left;localY=e.clientY-r.top;
   letter.style.setProperty('--spec-x',`${e.clientX-r.left}px`);letter.style.setProperty('--spec-y',`${e.clientY-r.top}px`);
  },{passive:true});
  title.addEventListener('pointerleave',release);
  document.documentElement.addEventListener('pointerleave',release);
 }

 reduced.addEventListener('change',()=>{release();stop();draw();start()});document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
})();

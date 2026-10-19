/* Cached code strips: bounded draw count, slow periodic drift, no per-frame text layout. */
(() => {
  const canvas=document.querySelector('#terminal-code'),ctx=canvas.getContext('2d',{alpha:true}),root=canvas.parentElement;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),mobile=matchMedia('(max-width:700px)'),fine=matchMedia('(pointer:fine)');
  const fragments=['const','0x08','{ }','</>','await','0101','=>','null','[ ]','return','::','let','01','fn()','/api','git','++','type','0.01','async','&&','int','data',';','//','010'];
  let width=1,height=1,columns=[],frame=0,last=0,time=0,px=0,py=0,tx=0,ty=0,resizeFrame=0;
  let seed=2026;function random(){seed=(seed*16807)%2147483647;return(seed-1)/2147483646}
  function layout(){
    width=innerWidth;height=innerHeight;const ratio=mobile.matches?1:Math.min(devicePixelRatio||1,1.25);canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);seed=2026;
    const count=mobile.matches?5:Math.min(28,Math.ceil(width/110));
    columns=Array.from({length:count},(_,i)=>{const depth=.35+random()*.65,size=9+depth*3,step=23+random()*13,stripHeight=Math.ceil((height+260)/step)*step;
      const strip=document.createElement('canvas');strip.width=72;strip.height=stripHeight;const pen=strip.getContext('2d');pen.font=`${size}px Consolas, monospace`;pen.textBaseline='top';
      const light=document.documentElement.dataset.theme==='light';
      for(let y=0;y<stripHeight;y+=step){if(random()<.32)continue;const accent=random()<.065;pen.fillStyle=light?(accent?'rgba(138,138,138,.18)':'rgba(60,60,60,.13)'):(accent?'rgba(239,68,68,.16)':`rgba(212,212,212,${.035+random()*.035})`);if(accent){pen.shadowColor='rgba(239,68,68,.12)';pen.shadowBlur=5}else{pen.shadowBlur=0}pen.fillText(fragments[Math.floor(random()*fragments.length)],0,y)}
      return {strip,height:stripHeight,x:(i+.25+random()*.5)*width/count,depth,speed:(mobile.matches?.5:1)+random()*1.5,phase:random()*stripHeight};
    });draw();
  }
  function draw(){ctx.clearRect(0,0,width,height);const scroll=reduced.matches?0:scrollY;
    for(const col of columns){const offset=reduced.matches?col.phase:(col.phase+time*col.speed+scroll*.012*col.depth)%col.height;const x=col.x+px*col.depth*4,y=offset-col.height+py*col.depth*3;
      // Keep the central reading column calmer than the outer technical margins.
      ctx.globalAlpha=.45+.55*Math.pow(Math.abs(col.x/width-.5)*2,.7);ctx.drawImage(col.strip,x,y);ctx.drawImage(col.strip,x,y+col.height);
    }ctx.globalAlpha=1;
  }
  function tick(now){frame=0;if(document.hidden||reduced.matches)return;const limit=mobile.matches?1000/24:1000/30;if(last&&now-last<limit){frame=requestAnimationFrame(tick);return}const dt=last?Math.min((now-last)/1000,.1):0;last=now;time+=dt;const damping=1-Math.exp(-dt*3);px+=(tx-px)*damping;py+=(ty-py)*damping;draw();frame=requestAnimationFrame(tick)}
  function stop(){cancelAnimationFrame(frame);frame=0;last=0}
  function start(){if(!document.hidden&&!reduced.matches&&!frame)frame=requestAnimationFrame(tick)}
  addEventListener('resize',()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(layout)},{passive:true});
  document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
  reduced.addEventListener('change',()=>{stop();px=py=tx=ty=0;layout();start()});
  new MutationObserver(layout).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  if(fine.matches){document.addEventListener('pointermove',e=>{if(reduced.matches||e.pointerType==='touch')return;tx=e.clientX/width*2-1;ty=e.clientY/height*2-1;root.style.setProperty('--terminal-x',`${e.clientX}px`);root.style.setProperty('--terminal-y',`${e.clientY}px`)},{passive:true});document.documentElement.addEventListener('pointerleave',()=>{tx=ty=0;root.style.removeProperty('--terminal-x');root.style.removeProperty('--terminal-y')})}
  layout();start();
})();

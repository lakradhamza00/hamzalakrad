(() => {
  const root=document.querySelector('#contact'),canvas=root.querySelector('.contact-mesh'),ctx=canvas.getContext('2d');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(pointer:fine)'),cta=root.querySelector('.contact-submit');
  let visible=false,frame=0,last=0,time=0,px=0,py=0,tx=0,ty=0,width=640;
  const vertices=Array.from({length:48},(_,i)=>{const y=1-2*(i+.5)/48,a=i*Math.PI*(3-Math.sqrt(5)),r=Math.sqrt(1-y*y);return [Math.cos(a)*r,y,Math.sin(a)*r]});
  const edges=[];vertices.forEach((a,i)=>vertices.forEach((b,j)=>{if(j>i&&Math.hypot(...a.map((n,k)=>n-b[k]))<.57)edges.push([i,j])}));
  function draw(){ctx.clearRect(0,0,width,width);const angle=time*.045+px*.08,tilt=.25+py*.06,radius=width*.36;
    const points=vertices.map(([x,y,z])=>{const rx=x*Math.cos(angle)-z*Math.sin(angle),rz=x*Math.sin(angle)+z*Math.cos(angle),ry=y*Math.cos(tilt)-rz*Math.sin(tilt),depth=y*Math.sin(tilt)+rz*Math.cos(tilt),scale=3.8/(3.8+depth);return [width*.48+rx*radius*scale+px*5,width*.5+ry*radius*scale+py*5,depth]});
    ctx.lineWidth=.6;edges.forEach(([a,b])=>{ctx.strokeStyle=`rgba(163,163,163,${.04+(points[a][2]+1)*.035})`;ctx.beginPath();ctx.moveTo(points[a][0],points[a][1]);ctx.lineTo(points[b][0],points[b][1]);ctx.stroke()});
    points.forEach(([x,y,z],i)=>{const light=(Math.sin(time*.35+i*1.7)+1)/2;ctx.fillStyle=`rgba(163,163,163,${.08+light*.22})`;ctx.beginPath();ctx.arc(x,y,i%7===0?1.8:1,0,Math.PI*2);ctx.fill()});
  }
  function tick(now){frame=0;if(!visible||document.hidden)return;const dt=last?Math.min((now-last)/1000,.05):0;last=now;time+=dt;const ease=1-Math.exp(-dt*5);px+=(tx-px)*ease;py+=(ty-py)*ease;draw();if(!reduced.matches)frame=requestAnimationFrame(tick)}
  function start(){if(document.querySelector('#terminal-code'))return;if(!frame&&visible&&!document.hidden&&!reduced.matches){last=0;frame=requestAnimationFrame(tick)}}
  function stop(){cancelAnimationFrame(frame);frame=0;last=0}
  function resize(){width=canvas.clientWidth;const ratio=Math.min(devicePixelRatio||1,1.5);canvas.width=width*ratio;canvas.height=width*ratio;ctx.setTransform(ratio,0,0,ratio,0,0);draw()}
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;document.body.classList.toggle('contact-in-view',visible&&entries[0].intersectionRatio>.2);if(visible){root.classList.add('contact-entered');start()}else stop()},{threshold:[0,.2,.5]}).observe(root);
  if(fine.matches){root.addEventListener('pointermove',e=>{if(reduced.matches||e.pointerType==='touch')return;const r=root.getBoundingClientRect();tx=(e.clientX-r.left)/r.width*2-1;ty=(e.clientY-r.top)/r.height*2-1;root.style.setProperty('--glow-x',`${e.clientX-r.left}px`);root.style.setProperty('--glow-y',`${e.clientY-r.top}px`)} ,{passive:true});root.addEventListener('pointerleave',()=>{tx=ty=0});
    cta.addEventListener('pointermove',e=>{if(reduced.matches||e.pointerType==='touch')return;const r=cta.getBoundingClientRect();cta.style.setProperty('--cta-x',`${(e.clientX-r.left-r.width/2)*.025}px`);cta.style.setProperty('--cta-y',`${(e.clientY-r.top-r.height/2)*.08}px`)});cta.addEventListener('pointerleave',()=>{cta.style.setProperty('--cta-x','0px');cta.style.setProperty('--cta-y','0px')});
  }
  reduced.addEventListener('change',()=>{stop();px=py=tx=ty=0;draw();start()});document.addEventListener('visibilitychange',()=>document.hidden?stop():start());resize();
})();

/* Shared clock with the existing background: low-resolution curved metallic bands. */
(() => {
  const root=document.querySelector('.terminal-background'),canvas=document.createElement('canvas');
  canvas.className='bronze-ribbons';canvas.setAttribute('aria-hidden','true');root.prepend(canvas);
  const ctx=canvas.getContext('2d');let oldWidth=0,oldHeight=0;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  window.portfolioBronzeDraw=({time,px,py,scroll,width,height})=>{
    if(width!==oldWidth||height!==oldHeight){oldWidth=width;oldHeight=height;const ratio=Math.min(.6,900/width);canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio)}
    const w=canvas.width,h=canvas.height,t=reduced.matches?0:time*.045;
    ctx.clearRect(0,0,w,h);ctx.lineCap='round';ctx.lineJoin='round';
    const drift=reduced.matches?0:Math.sin(scroll/2400)*h*.07;
    const layers=width<700?2:3;
    for(let layer=0;layer<layers;layer++){
      const depth=1-layer*.25,phase=t+layer*1.6;
      ctx.save();ctx.translate(px*4*depth,py*3*depth+drift*depth);
      const base=h*(.44+layer*.29),sway=Math.sin(phase)*h*.035;
      const gradient=ctx.createLinearGradient(0,base-h*.25,w,base);
      gradient.addColorStop(0,'rgba(15,10,7,0)');gradient.addColorStop(.2,'rgba(74,42,22,.12)');gradient.addColorStop(.44,'rgba(184,115,51,.28)');gradient.addColorStop(.58,'rgba(217,138,69,.32)');gradient.addColorStop(.68,'rgba(240,180,106,.22)');gradient.addColorStop(.86,'rgba(74,42,22,.12)');gradient.addColorStop(1,'rgba(5,5,5,0)');
      const bands=width<700?10:15;
      for(let band=0;band<bands;band++){
        const f=band/(bands-1),offset=(f-.5)*h*.07;
        ctx.beginPath();ctx.moveTo(-w*.15,base+h*.28+offset);
        ctx.bezierCurveTo(w*.15,base-h*.5+sway+offset,w*.28,base+h*.30-offset,w*.55,base+offset);
        ctx.bezierCurveTo(w*.76,base-h*.30+sway+offset,w*.85,base-h*.42-offset,w*1.15,base-h*.22+offset);
        ctx.strokeStyle=gradient;ctx.globalAlpha=(.18+Math.sin(f*Math.PI)*.5)*depth;
        ctx.lineWidth=(1-f)*h*.035+1;ctx.stroke();
      }
      ctx.restore();
    }ctx.globalAlpha=1;
    // Sparse warm specks, distributed deterministically without frame allocations.
    for(let i=0;i<(width<700?10:24);i++){const x=((i*173.27)%997)/997*w,y=(((i*97.13)%613)/613*h+Math.sin(t*.5+i)*3+h)%h;ctx.fillStyle=`rgba(217,138,69,${.06+(Math.sin(t+i)+1)*.025})`;ctx.fillRect(x,y,i%7===0?1.2:.6,.6)}
  };
})();

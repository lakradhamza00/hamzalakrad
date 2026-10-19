/* Scroll color progression without changing timeline geometry or content. */
(() => {
  const timeline=document.querySelector('.timeline');if(!timeline)return;
  const experiences=[...timeline.querySelectorAll('.experience')];
  let frame=0,visible=false;
  function update(){frame=0;const r=timeline.getBoundingClientRect(),line=innerHeight*.68;
    const progress=Math.max(0,Math.min(1,(line-r.top)/Math.max(1,r.height)));
    timeline.style.setProperty('--timeline-progress',`${(progress*100).toFixed(2)}%`);
    experiences.forEach(el=>el.classList.toggle('experience-active',el.getBoundingClientRect().top<=line));
  }
  function schedule(){if(visible&&!frame)frame=requestAnimationFrame(update)}
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)update()},{rootMargin:'80px'}).observe(timeline);
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});update();
})();

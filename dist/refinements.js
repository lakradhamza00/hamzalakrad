(() => {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(pointer:fine)');
  const title=document.querySelector('.hero-title');
  const follower=document.querySelector('.cursor-follower');
  let activeLetter=null,pointerFrame=0,x=0,y=0;
  title.querySelectorAll('.name-word').forEach(word=>{
    const name=word.textContent.trim();word.setAttribute('aria-label',name);
    word.replaceChildren(...Array.from(name,char=>{const letter=document.createElement('span');letter.className='hero-letter';letter.textContent=char;letter.setAttribute('aria-hidden','true');return letter}));
  });
  const spotlight=document.createElement('span');spotlight.className='name-spotlight';spotlight.setAttribute('aria-hidden','true');title.prepend(spotlight);
  function clearLetter(){
    if(activeLetter){activeLetter.classList.remove('is-lit');activeLetter.style.setProperty('--letter-x','0px');activeLetter.style.setProperty('--letter-y','0px');activeLetter=null}
    title.classList.remove('has-letter-hover');follower.classList.remove('is-name');
  }
  function followLetter(){
    pointerFrame=0;if(!activeLetter||reduced.matches)return;
    const r=activeLetter.getBoundingClientRect(),t=title.getBoundingClientRect();
    activeLetter.style.setProperty('--letter-x',`${Math.max(-2.5,Math.min(2.5,(x-r.left-r.width/2)*.055))}px`);
    activeLetter.style.setProperty('--letter-y',`${Math.max(-2,Math.min(2,(y-r.top-r.height/2)*.035))}px`);
    spotlight.style.transform=`translate3d(${x-t.left}px,${y-t.top}px,0)`;
  }
  if(fine.matches){
    title.addEventListener('pointermove',e=>{
      if(e.pointerType==='touch'||title.closest('.hero-comfort'))return;
      const letter=e.target.closest('.hero-letter');
      if(letter!==activeLetter){clearLetter();if(letter){activeLetter=letter;letter.classList.add('is-lit');title.classList.add('has-letter-hover');follower.classList.add('is-name')}}
      x=e.clientX;y=e.clientY;if(activeLetter&&!pointerFrame)pointerFrame=requestAnimationFrame(followLetter);
    },{passive:true});
    title.addEventListener('pointerleave',clearLetter);
    document.addEventListener('pointerover',e=>!document.documentElement.hasAttribute('data-premium-cursor')&&follower.classList.toggle('is-interactive',Boolean(e.target.closest('a,button,input,textarea,[role="tab"]'))),{passive:true});
    document.documentElement.addEventListener('pointerleave',()=>{clearLetter();follower.classList.remove('is-interactive')});
  }
  const detail=document.querySelector('.stack-detail');let detailAnimation,lastTech;
  function animateDetail(e){const tech=e.target.closest('.tech');if(!tech||tech===lastTech||reduced.matches)return;lastTech=tech;detailAnimation?.cancel();detailAnimation=detail.animate([{opacity:.3,transform:'translateY(3px)'},{opacity:1,transform:'translateY(0)'}],{duration:220,easing:'ease-out'})}
  document.querySelector('#stack-panel').addEventListener('pointerover',animateDetail);
  document.querySelector('#stack-panel').addEventListener('focusin',animateDetail);
  reduced.addEventListener('change',()=>{clearLetter();cancelAnimationFrame(pointerFrame);pointerFrame=0});
})();

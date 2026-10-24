(()=>{
 const section=document.querySelector('#competences');if(!section)return;
 const layer=document.createElement('div');layer.className='skills-architecture';layer.setAttribute('aria-hidden','true');
 const icons=[
  '<rect x="-13" y="-11" width="26" height="18" rx="1.5"/><path d="M-17 12h34l-4-5h-26z"/>',
  '<rect x="-14" y="-12" width="28" height="25" rx="2"/><path d="M-14-6h28M-8-9h1m3 0h1m-1 8-5 5 5 5m8-10 5 5-5 5m-2-12-4 14"/>',
  '<path d="M-9 10h20a8 8 0 0 0 0-16 11 11 0 0 0-21-1 8.5 8.5 0 0 0 1 17zM-5-1-9 3l4 4m10-8 4 4-4 4M2-2-2 8"/>',
  '<rect x="-13" y="-13" width="26" height="8" rx="1.5"/><rect x="-13" y="-2" width="26" height="8" rx="1.5"/><rect x="-13" y="9" width="26" height="8" rx="1.5"/><path d="M-8-9h1m4 0h10M-8 2h1m4 0h10M-8 13h1m4 0h10"/>',
  '<ellipse cy="-10" rx="13" ry="5"/><path d="M-13-10v23c0 7 26 7 26 0v-23M-13 1c0 7 26 7 26 0M-13 8c0 7 26 7 26 0"/>'
 ];
 const labels=['Client','UI','API','Serveur','Base de données'];
 const node=(i,x)=>`<g class="architecture-node" style="--node-delay:${i*1.6}s" transform="translate(${x} 32)">${icons[i]}<text class="architecture-label" y="29">${labels[i]}</text></g>`;
 layer.innerHTML=`<svg class="architecture-desktop" viewBox="0 0 390 78" fill="none" xmlns="http://www.w3.org/2000/svg"><g class="architecture-route"><path d="M49 32h30m-4-2 4 2-4 2M126 32h30m-4-2 4 2-4 2M204 32h29m-4-2 4 2-4 2M281 32h42m-4-2 4 2-4 2"/></g><path class="architecture-detail" d="M10 74h134l8 7h100m36-68h56l8-8h82M25 4h32m-16-3v6M475 70h14m-7-3v6"/>${labels.map((_,i)=>node(i,[26,103,180,257,347][i])).join('')}<circle class="architecture-pulse" r="1.5"/><text class="architecture-context" x="20" y="87">FRONTEND</text><text class="architecture-context" x="350" y="87">BACKEND</text></svg><svg class="architecture-mobile" viewBox="0 0 300 88" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="architecture-route" d="M63 32h66m-5-3 5 3-5 3m44 0h64m-5-3 5 3-5 3"/>${node(0,42)}${node(2,150)}${node(3,258)}</svg>`;
 section.prepend(layer);
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');let visible=false;
 const svg=layer.querySelector('.architecture-desktop'),pulse=svg.querySelector('.architecture-pulse'),animations=[];
 pulse.style.animation='none';
 const travel=pulse.animate([{transform:'translate3d(26px,32px,0)',opacity:.85,offset:0},{transform:'translate3d(347px,32px,0)',opacity:.85,offset:.82},{transform:'translate3d(347px,32px,0)',opacity:0,offset:.86},{transform:'translate3d(347px,32px,0)',opacity:0,offset:1}],{duration:8000,iterations:Infinity,easing:'linear'});animations.push(travel);
 const positions=[26,103,180,257,347];
 svg.querySelectorAll('.architecture-node').forEach((node,i)=>{
   node.style.animation='none';
   const flash=node.cloneNode(true);flash.setAttribute('class','architecture-flash');flash.removeAttribute('style');svg.append(flash);
   const peak=(positions[i]-26)/(347-26)*.82;
   const keys=i===0?[{opacity:1,offset:0},{opacity:0,offset:.065},{opacity:0,offset:1}]:[{opacity:0,offset:0},{opacity:0,offset:peak-.035},{opacity:1,offset:peak},{opacity:0,offset:peak+.065},{opacity:0,offset:1}];
   animations.push(flash.animate(keys,{duration:8000,iterations:Infinity,easing:'linear'}));
 });
 // All visual events use the same animation clock, including after pause/resume.
 animations.forEach(a=>{a.pause();a.currentTime=0});
 const sync=()=>{const running=visible&&!document.hidden&&!reduced.matches;section.classList.toggle('architecture-running',running);const time=animations[0].currentTime||0;animations.forEach(a=>{a.currentTime=time;if(running)a.play();else a.pause()});pulse.style.visibility=reduced.matches?'hidden':''};
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{threshold:0}).observe(layer);
 document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
})();

/* Dependency-free GPU terrain. Geometry stays on the GPU; only uniforms change. */
(() => {
 const canvas=document.querySelector('#terminal-code'),root=canvas.parentElement,hero=document.querySelector('#accueil'),title=document.querySelector('.hero-title');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),mobile=matchMedia('(max-width:700px)'),fine=matchMedia('(pointer:fine)');
 const gl=canvas.getContext('webgl',{alpha:true,antialias:true,preserveDrawingBuffer:true,powerPreference:'low-power',depth:false,stencil:false});
 if(!gl){root.dataset.meshStatus='webgl-unavailable';root.classList.add('mesh-fallback');return}
 const vertex=`precision highp float;
 attribute vec3 aPosition; uniform float uTime,uAspect,uScroll,uPointerStrength; uniform vec2 uPointer,uResolution; uniform float uParticle;
 varying mediump float vDepth,vHot;
 void main(){
 float x=aPosition.x,z=aPosition.z,t=uTime;
 float y=sin(x*.37+z*.19+t*.16)*.68+cos(z*.41-x*.21+t*.11)*.44+sin(x*.67+z*.77-t*.075)*.18;
 y+=pow(abs(x)/15.,1.6)*.62;
 float depth=z+5.5+uScroll*4.;
 vec2 screen=vec2(x*1.72/uAspect/depth,(y-1.85)*1.72/depth+.13);
 vec2 css=vec2((screen.x*.5+.5)*uResolution.x,(.5-screen.y*.5)*uResolution.y);
 float nearLight=exp(-pow(length(css-uPointer)/260.,2.))*uPointerStrength;
 y-=nearLight*.16;
 x+=(uPointer.x/uResolution.x-.5)*.30*(1.-z/36.)*uPointerStrength;
 y+=(uPointer.y/uResolution.y-.5)*.12*uPointerStrength;
 if(uParticle>.5){y+=1.3+sin(t*.13+aPosition.y)*.16; x+=sin(t*.08+aPosition.y)*.10;}
 gl_Position=vec4(x*1.72/uAspect,(y-1.85)*1.72+depth*.13,depth*.8,depth);
 gl_PointSize=uParticle>.5?max(1.,2.2-z*.035):1.4;
 vDepth=z;vHot=.5+.5*sin(x*.24-z*.17+t*.06);
 }`;
 const fragment=`precision highp float;
 uniform vec2 uResolution,uPointer;uniform float uDpr,uPointerStrength,uFade,uParticle;uniform vec4 uTitle;
 varying mediump float vDepth,vHot;
 void main(){
 vec2 css=vec2(gl_FragCoord.x/uDpr,uResolution.y-gl_FragCoord.y/uDpr);
 float light=exp(-pow(length(css-uPointer)/275.,2.))*uPointerStrength;
 float side=pow(abs(css.x/uResolution.x-.5)*2.,1.2);
 float lower=smoothstep(.42,.95,css.y/uResolution.y);
 float selectLight=pow(vHot,5.)*(.10+.25*side+.16*lower);
 vec2 outside=max(max(uTitle.xy-css,css-uTitle.zw),vec2(0.));
 float clean= mix(.22,1.,smoothstep(0.,100.,length(outside)));
 float fog=exp(-vDepth*.065);
 float vignette=1.-.55*pow(length((css/uResolution-.5)*1.35),2.);
 vec3 neutral=vec3(.20,.20,.21);vec3 crimson=vec3(.937,.267,.267);
 vec3 color=mix(neutral,crimson,min(.9,selectLight+light*.85));
 float alpha=(.38+selectLight*.32+light*.48)*fog*clean*vignette*uFade;
 if(uParticle>.5){float d=length(gl_PointCoord-.5);if(d>.5)discard;color=crimson;alpha*=.48*(1.-d*2.);}
 gl_FragColor=vec4(color,alpha);
 }`;
 function shader(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s}
 let program;try{program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program)||'Terrain shader linking failed')}catch(e){root.dataset.meshStatus=e.message;root.classList.add('mesh-fallback');return}
 gl.useProgram(program);const position=gl.getAttribLocation(program,'aPosition'),uniforms={};['Time','Aspect','Scroll','PointerStrength','Pointer','Resolution','Dpr','Fade','Particle','Title'].forEach(n=>uniforms[n]=gl.getUniformLocation(program,'u'+n));
 const lines=gl.createBuffer(),particles=gl.createBuffer();let lineCount=0,particleCount=0,width=1,height=1,dpr=1,frame=0,last=0,time=0,px=0,py=0,tx=0,ty=0,strength=0,targetStrength=0,scrollDepth=0,targetScroll=0,fade=1,lost=false,titleBox=[0,0,0,0];
 function geometry(){const nx=mobile.matches?38:82,nz=mobile.matches?30:58,data=[];const point=(i,j)=>[-16+i/nx*32,0,Math.pow(j/nz,1.4)*32];
 for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){const p=point(i,j);if(i<nx)data.push(...p,...point(i+1,j));if(j<nz)data.push(...p,...point(i,j+1))}
 gl.bindBuffer(gl.ARRAY_BUFFER,lines);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);lineCount=data.length/3;
 const dots=[];for(let i=0;i<(mobile.matches?16:38);i++)dots.push(Math.sin(i*71.19)*15,i*2.31,(i*13.71)%30);gl.bindBuffer(gl.ARRAY_BUFFER,particles);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(dots),gl.STATIC_DRAW);particleCount=dots.length/3;
 }
 function measure(){const r=title.getBoundingClientRect();titleBox=[r.left-15,r.top-10,r.right+15,r.bottom+10];targetScroll=Math.max(0,scrollY/Math.max(1,hero.offsetHeight));}
 function resize(){width=innerWidth;height=innerHeight;dpr=Math.min(devicePixelRatio||1,mobile.matches?1:1.5);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);gl.viewport(0,0,canvas.width,canvas.height);if(!px){px=tx=width*.75;py=ty=height*.65}geometry();measure();render();start()}
 function render(){gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.useProgram(program);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.uniform1f(uniforms.Time,time);gl.uniform1f(uniforms.Aspect,width/height);gl.uniform1f(uniforms.Scroll,scrollDepth);gl.uniform1f(uniforms.PointerStrength,strength);gl.uniform2f(uniforms.Pointer,px,py);gl.uniform2f(uniforms.Resolution,width,height);gl.uniform1f(uniforms.Dpr,dpr);gl.uniform1f(uniforms.Fade,fade);gl.uniform4fv(uniforms.Title,titleBox);gl.enableVertexAttribArray(position);
 gl.bindBuffer(gl.ARRAY_BUFFER,lines);gl.vertexAttribPointer(position,3,gl.FLOAT,false,0,0);gl.uniform1f(uniforms.Particle,0);gl.drawArrays(gl.LINES,0,lineCount);
 gl.bindBuffer(gl.ARRAY_BUFFER,particles);gl.vertexAttribPointer(position,3,gl.FLOAT,false,0,0);gl.uniform1f(uniforms.Particle,1);gl.drawArrays(gl.POINTS,0,particleCount);
 }
 function tick(now){frame=0;if(document.hidden||lost)return;const dt=last?Math.min((now-last)/1000,.05):1/30;if(mobile.matches&&dt<.025){frame=requestAnimationFrame(tick);return}last=now;if(!reduced.matches)time+=dt;
 const ease=1-Math.exp(-dt*3.8);px+=(tx-px)*ease;py+=(ty-py)*ease;strength+=(targetStrength-strength)*ease;scrollDepth+=(targetScroll-scrollDepth)*ease;fade=Math.exp(-scrollDepth*2.3);
 render();if(!reduced.matches&&(fade>.004||Math.abs(targetScroll-scrollDepth)>.003))frame=requestAnimationFrame(tick);else last=0;
 }
 function stop(){cancelAnimationFrame(frame);frame=0;last=0}
 function start(){if(!frame&&!document.hidden&&!lost&&!reduced.matches)frame=requestAnimationFrame(tick)}
 addEventListener('scroll',()=>{measure();if(reduced.matches){scrollDepth=targetScroll;fade=Math.exp(-scrollDepth*2.3);render()}else start()},{passive:true});
 addEventListener('resize',resize,{passive:true});document.fonts.ready.then(()=>{measure();render()});
 if(fine.matches){document.addEventListener('pointermove',e=>{if(reduced.matches||e.pointerType==='touch')return;tx=e.clientX;ty=e.clientY;targetStrength=1;start()},{passive:true});document.documentElement.addEventListener('pointerleave',()=>{targetStrength=0;start()})}
 document.addEventListener('visibilitychange',()=>document.hidden?stop():start());reduced.addEventListener('change',()=>{stop();strength=targetStrength=0;time=0;scrollDepth=targetScroll;fade=Math.exp(-scrollDepth*2.3);render();start()});
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true;stop();root.classList.add('mesh-fallback')});
 resize();
})();

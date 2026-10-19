(()=>{
 const dialog=document.querySelector('#certificate-dialog'),collection=document.querySelector('#certifications');if(!dialog||!collection)return;
 const image=dialog.querySelector('#certificate-full-image'),title=dialog.querySelector('#certificate-dialog-title');let opener=null;
 collection.addEventListener('click',e=>{const button=e.target.closest('[data-certificate]');if(!button)return;opener=button;title.textContent=button.dataset.certificateTitle;image.alt=`Certificat de Hamza Lakrad — ${button.dataset.certificateTitle}`;image.src=`images/certificates/${button.dataset.certificate}.png`;dialog.showModal();document.body.classList.add('modal-open')});
 dialog.querySelector('.certificate-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()});
 dialog.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('modal-open');opener?.focus({preventScroll:true})});
})();

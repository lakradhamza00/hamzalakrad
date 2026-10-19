/* Color-only browser chrome integration; existing theme switch remains available. */
(() => {
 const root=document.documentElement,meta=document.querySelector('meta[name="theme-color"]');
 const sync=()=>meta.content=root.dataset.theme==='light'?'#f1f5f9':'#041014';
 new MutationObserver(sync).observe(root,{attributes:true,attributeFilter:['data-theme']});sync();
})();

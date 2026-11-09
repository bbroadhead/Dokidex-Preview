/* Remove only edge-connected, near-uniform dark matte from legacy opaque sprites.
   Original image files remain untouched. */
(() => {
  const selector = '#dex-grid img.monster-image, .yanoverse-profile .yv-profile-art > img, .yanoverse-profile .chain-stage img';
  const cache = new Map();
  function process(img) {
    const src = img.currentSrc || img.src;
    if (!src || src.startsWith('data:') || img.dataset.yvMatteSource === src) return;
    if (!img.complete || !img.naturalWidth) return;
    img.dataset.yvMatteSource = src;
    if (cache.has(src)) { if (cache.get(src)) img.src = cache.get(src); return; }
    try {
      const w = img.naturalWidth, h = img.naturalHeight;
      if (w*h > 1500000) return;
      const canvas = document.createElement('canvas');
      canvas.width=w; canvas.height=h;
      const ctx=canvas.getContext('2d',{willReadFrequently:true});
      ctx.drawImage(img,0,0);
      const frame=ctx.getImageData(0,0,w,h), a=frame.data;
      const corners=[0,(w-1)*4,(w*(h-1))*4,(w*h-1)*4];
      const samples=corners.map(i=>[a[i],a[i+1],a[i+2],a[i+3]]);
      const [r,g,b,alpha]=samples[0];
      // Never touch artwork that already has transparent edges or colored backdrops.
      if(alpha<250 || Math.max(r,g,b)-Math.min(r,g,b)>14 || Math.max(r,g,b)>85 ||
         !samples.every(c=>c[3]>249 && Math.max(Math.abs(c[0]-r),Math.abs(c[1]-g),Math.abs(c[2]-b))<12)) {
        cache.set(src,null);return;
      }
      const visited=new Uint8Array(w*h), stack=[];
      for(let x=0;x<w;x++){stack.push(x,(h-1)*w+x)}
      for(let y=0;y<h;y++){stack.push(y*w,y*w+w-1)}
      let cleared=0;
      while(stack.length) {
        const n=stack.pop();if(visited[n])continue;visited[n]=1;
        const i=n*4;
        if(a[i+3]<245 || Math.max(Math.abs(a[i]-r),Math.abs(a[i+1]-g),Math.abs(a[i+2]-b))>18)continue;
        a[i+3]=0;cleared++;
        const x=n%w,y=(n/w)|0;
        if(x>0)stack.push(n-1);
        if(x<w-1)stack.push(n+1);
        if(y>0)stack.push(n-w);
        if(y<h-1)stack.push(n+w);
      }
      if(cleared < w*h*.08){cache.set(src,null);return}
      ctx.putImageData(frame,0,0);
      const output=canvas.toDataURL('image/png');
      cache.set(src,output);
      img.src=output;
    } catch(e) { cache.set(src,null); }
  }
  function scan(){document.querySelectorAll(selector).forEach(img=>{
    if(img.complete)process(img);
    else if(!img.dataset.yvMatteListener){img.dataset.yvMatteListener='1';img.addEventListener('load',()=>process(img))}
  })}
  document.addEventListener('DOMContentLoaded',()=>{
    scan();
    const root=document.querySelector('#dex-grid, .yanoverse-profile');
    if(root)new MutationObserver(scan).observe(root,{subtree:true,childList:true,attributes:true,attributeFilter:['src']});
  });
})();

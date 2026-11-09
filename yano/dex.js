(() => {
const root='/Yanoverse-Multidex/yano/';
const params=new URLSearchParams(location.search);
const game=params.get('game')==='nuumonsters'?'nuumonsters':'yami-kids';
const title=game==='yami-kids'?'Yami Kids':'Nuumonsters';
const heading=document.getElementById('heading'),cards=document.getElementById('cards'),profile=document.getElementById('profile'),search=document.getElementById('search'),type=document.getElementById('type'),stage=document.getElementById('stage'),shiny=document.getElementById('shiny'),count=document.getElementById('count');
heading.textContent=title+' Dex';document.title=title+' Dex | Yanoverse Multi-Dex';
document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.href.includes('game='+game)));
document.getElementById('shiny-label').hidden=game!=='yami-kids';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const image=p=>p?root.replace(/\/$/,'')+p.replace(/^\/yano/,''):'';
const img=(p,alt,klass='')=>'<img class="'+klass+'" src="'+esc(image(p))+'" alt="'+esc(alt)+'" loading="lazy">';
const stats=['Health','Attack','Defense','Mgk. Atk','Mgk. Def','Speed'];
let data=[];
function tile(m){const pic=shiny.checked&&m.shiny_sprite?m.shiny_sprite:m.sprite;return '<a class="tile" href="?game='+game+'&monster='+encodeURIComponent(m.slug)+'">'+img(pic,m.name)+'<span class="num">#'+String(m.number).padStart(3,'0')+'</span><strong>'+esc(m.name)+'</strong><small>'+m.type.map(esc).join(' · ')+'</small></a>'}
function render(){
 const q=search.value.trim().toLowerCase();
 const filtered=data.filter(m=>(m.name.toLowerCase().includes(q)||String(m.number).includes(q))&&(!type.value||m.type.includes(type.value))&&(!stage.value||String(m.stage)===stage.value));
 count.textContent=filtered.length+' of '+data.length+' '+(game==='yami-kids'?'Oni':'Nuu');
 cards.innerHTML=filtered.map(tile).join('');
}
function show(m){
 if(!m){profile.hidden=true;cards.hidden=false;return}
 cards.hidden=true;profile.hidden=false;
 const pic=shiny.checked&&m.shiny_sprite?m.shiny_sprite:m.sprite;
 const evol=[...(m.evolves_from?[m.evolves_from]:[]),m.name,...(m.evolves_to||[])];
 profile.innerHTML='<a class="back" href="?game='+game+'">← All '+esc(title)+'</a><div class="hero">'+img(pic,m.name,'hero-image')+'<div><p>#'+String(m.number).padStart(3,'0')+'</p><h2>'+esc(m.name)+'</h2><p>'+m.type.map(t=>'<span class="pill">'+esc(t)+'</span>').join(' ')+'</p><p>'+esc(m.classification||'')+'</p>'+(m.sin?'<p>Sin: '+esc(m.sin)+'</p>':'')+'<p>'+esc(m.dex_entry||'')+'</p></div></div><h3>Base stats</h3><div class="stats">'+stats.map(s=>'<div><span>'+esc(s)+'</span><meter min="0" max="255" value="'+Number(m.base_stats?.[s]||0)+'"></meter><b>'+Number(m.base_stats?.[s]||0)+'</b></div>').join('')+'</div>'+(evol.length>1?'<h3>Evolution chain</h3><div class="evo">'+evol.map(n=>{const e=data.find(x=>x.name===n);return e?'<a href="?game='+game+'&monster='+encodeURIComponent(e.slug)+'">'+img(e.mini_sprite,e.name)+esc(e.name)+'</a>':'<span>'+esc(n)+'</span>'}).join('<span>→</span>')+'</div>':'')+(m.evolves_at?'<p>Evolution level: '+m.evolves_at+'</p>':'');
}
fetch(root+game+'/_data/'+game+'.json').then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json()}).then(rows=>{
 data=rows.sort((a,b)=>a.number-b.number);
 [...new Set(data.flatMap(m=>m.type))].sort().forEach(t=>type.add(new Option(t,t)));
 const selected=data.find(m=>m.slug===params.get('monster'));
 show(selected);render();
 shiny.addEventListener('change',()=>{show(selected);render()});
 [search,type,stage].forEach(el=>el.addEventListener('input',render));
}).catch(e=>{count.textContent='Data not installed yet. Upload the supplied yano/ game folders to this branch. ('+e.message+')';});
})();
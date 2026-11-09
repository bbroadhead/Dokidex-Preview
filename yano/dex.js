(() => {
'use strict';
const root='/Yanoverse-Multidex/yano/';
const params=new URLSearchParams(location.search);
const game=params.get('game')==='nuumonsters'?'nuumonsters':'yami-kids';
const title=game==='yami-kids'?'Yami Kids':'Nuumonsters';
const $=id=>document.getElementById(id);
const grid=$('dex-grid'),profile=$('profile'),search=$('search'),stage=$('stage'),shiny=$('shiny'),summary=$('yv-visible-count'),typeFilters=$('type-filters');
document.title=title+' Dex | Yanoverse Multi-Dex';
$('dex-home').href='?game='+game;
document.querySelectorAll('[data-game]').forEach(a=>{const active=a.dataset.game===game;a.classList.toggle('is-selected',active);if(active)a.setAttribute('aria-current','page')});
$('shiny-label').hidden=game!=='yami-kids';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const image=p=>p?'/Yanoverse-Multidex'+(p.startsWith('/')?p:'/'+p):'';
const img=(p,alt,klass='')=>'<img class="'+klass+'" src="'+esc(image(p))+'" alt="'+esc(alt)+'" loading="lazy">';
const url=m=>'?game='+game+'&monster='+encodeURIComponent(m.slug);
const typePalette={Astral:'#a18be8',Living:'#64b873',Nature:'#55b990',Fire:'#e97848',Water:'#468fd1',Earth:'#bd9363',Air:'#76b6d4',Light:'#e5c667',Dark:'#8968b8',Electric:'#e6bd49',Ice:'#74c5d4',Ghost:'#8c7bd0',Poison:'#a16ac1',Metal:'#9da8b6',Construct:'#9aa8bd',Celestial:'#f2cc7e',Spirit:'#aa83db',Beast:'#c68a55',Magic:'#aa85dc',Shadow:'#7765a9',Normal:'#98a5b6',Dragon:'#647fc6',Fighting:'#c7765d'};\nconst typeColor=t=>typePalette[t]||'#789bc2';\nconst palette=m=>{const colors=(m.type||[]).map(typeColor);return '--type-glow:'+ (colors[0]||'#789bc2')+';--type-glow-secondary:'+(colors[1]||colors[0]||'#789bc2')};\nconst stats=['Health','Attack','Defense','Mgk. Atk','Mgk. Def','Speed'];
let data=[],activeTypes=new Set(),selected=null;
function tile(m){
 const pic=shiny.checked&&m.shiny_sprite?m.shiny_sprite:m.sprite;
 return '<article class="dex-entry" data-name="'+esc(m.name)+'"><a href="'+url(m)+'"><div class="img-wrapper">'+img(pic,m.name,'monster-image small')+'</div><div class="dex-card-details"><span class="dex-card-number">#'+m.number+'</span><strong class="dex-card-name">'+esc(m.name)+'</strong><span class="dex-card-stage">Stage '+esc(m.stage||'?')+'</span><span class="dex-card-types">'+(m.type||[]).map(t=>'<span class="dex-card-type" style="--type-color:'+typeColor(t)+'">'+esc(t)+'</span>').join('')+'</span></div></a></article>';
}
function render(){
 const q=search.value.trim().toLowerCase();
 const filtered=data.filter(m=>(m.name.toLowerCase().includes(q)||String(m.number).includes(q))&&[...activeTypes].every(t=>(m.type||[]).includes(t))&&(!stage.value||String(m.stage)===stage.value));
 summary.textContent=filtered.length;grid.innerHTML=filtered.map(tile).join('');
}
function navigate(){
 const m=data.find(x=>x.slug===new URLSearchParams(location.search).get('monster'));
 selected=m||null;
 $('dex-list').hidden=!!m;profile.hidden=!m;
 if(!m){render();return}
 const pic=shiny.checked&&m.shiny_sprite?m.shiny_sprite:m.sprite;
 const evol=[...(m.evolves_from?[m.evolves_from]:[]),m.name,...(m.evolves_to||[])];
 const statTotal=stats.reduce((a,k)=>a+Number(m.base_stats?.[k]||0),0);
 const statRows=stats.map(s=>'<div class="stat-row"><span>'+esc(s)+'</span><div class="stat-track"><span style="width:'+Math.min(100,Number(m.base_stats?.[s]||0)/255*100)+'%"></span></div><b>'+Number(m.base_stats?.[s]||0)+'</b></div>').join('');
 profile.innerHTML='<div class="profile-top"><a class="return-link" href="?game='+game+'">← Return to Dex</a><span class="profile-number">#'+String(m.number).padStart(3,'0')+'</span></div><h2 class="profile-title">'+esc(m.name)+'</h2><div class="monster-layout-row"><div class="monster-image-container">'+img(pic,m.name,'hero-image')+'</div><div class="monster-info"><h3>'+esc(m.classification||m.name)+'</h3><p class="profile-types">'+(m.type||[]).map(t=>'<span class="dex-card-type">'+esc(t)+'</span>').join(' ')+'</p>'+(m.sin?'<p><strong>Sin:</strong> '+esc(m.sin)+'</p>':'')+'<p>'+esc(m.dex_entry||'')+'</p></div><div class="stats-side"><h3>Base Stats</h3><div class="monster-stats">'+statRows+'<p class="stat-total">Total: '+statTotal+'</p></div></div></div>'+(evol.length>1?'<div class="evolution-wrapper"><h3>Evolution Chain</h3><div class="evo">'+evol.map(n=>{const e=data.find(x=>x.name===n);return e?'<a href="'+url(e)+'">'+img(e.mini_sprite||e.sprite,e.name)+esc(e.name)+'</a>':'<span>'+esc(n)+'</span>'}).join('<span aria-hidden="true">→</span>')+'</div></div>':'')+(m.evolves_at?'<p class="evolution-level">Evolution level: '+esc(m.evolves_at)+'</p>':'');
}
$('filter-toggle').addEventListener('click',()=>{const collapsed=$('dex-filter-controls').classList.toggle('collapsed');$('filter-toggle').textContent=collapsed?'Show Filters':'Hide Filters';$('filter-toggle').setAttribute('aria-expanded',String(!collapsed))});
$('clear-filters').addEventListener('click',()=>{activeTypes.clear();typeFilters.querySelectorAll('button').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});search.value='';stage.value='';shiny.checked=false;render()});
[search,stage].forEach(el=>el.addEventListener('input',render));
shiny.addEventListener('change',()=>{render();if(selected)navigate()});
function centerSelectedGame(){
 const track=$('yanoverse-game-track'),selected=track?.querySelector('.is-selected');
 if(!track||!selected)return;
 track.style.transition='none';
 track.style.transform='translateX(-50%)';
 const rect=selected.getBoundingClientRect();
 const offset=innerWidth/2-(rect.left+rect.width/2);
 track.style.transform='translateX(calc(-50% + '+offset+'px))';
}
window.addEventListener('resize',()=>requestAnimationFrame(centerSelectedGame));
window.addEventListener('load',centerSelectedGame);
if(document.fonts?.ready)document.fonts.ready.then(centerSelectedGame);
requestAnimationFrame(()=>requestAnimationFrame(centerSelectedGame));
fetch(root+game+'/_data/'+game+'.json').then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json()}).then(rows=>{
 data=rows.sort((a,b)=>a.number-b.number);
 [...new Set(data.flatMap(m=>m.type||[]))].sort().forEach(t=>{const b=document.createElement('button');b.type='button';b.className='type-btn';b.textContent=t;b.dataset.type=t;b.style.setProperty('--type-color',typeColor(t));b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>{if(activeTypes.has(t))activeTypes.delete(t);else activeTypes.add(t);b.classList.toggle('active',activeTypes.has(t));b.setAttribute('aria-pressed',String(activeTypes.has(t)));render()});typeFilters.appendChild(b)});
 navigate();render();
}).catch(e=>{summary.textContent='Unable to load Dex data: '+e.message});
})();
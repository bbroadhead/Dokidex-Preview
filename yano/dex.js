(() => {
'use strict';
const root='/Yanoverse-Multidex/yano/';
const params=new URLSearchParams(location.search);
const game=params.get('game')==='nuumonsters'?'nuumonsters':'yami-kids';
const title=game==='yami-kids'?'Yami Kids':'Nuumonsters';
const $=id=>document.getElementById(id);
const heading=$('heading'),grid=$('dex-grid'),profile=$('profile'),search=$('search'),stage=$('stage'),shiny=$('shiny'),summary=$('yv-visible-count'),typeFilters=$('type-filters');
if(heading)heading.textContent=title+' Dex';document.title=title+' Dex | Yanoverse Multi-Dex';
$('dex-home').href='?game='+game;
document.querySelectorAll('[data-game]').forEach(a=>{const active=a.dataset.game===game;a.classList.toggle('is-selected',active);if(active)a.setAttribute('aria-current','page')});
$('shiny-label').hidden=game!=='yami-kids';
$('stage-filter').hidden=game==='nuumonsters';

function centerSelectedGame(){
 const track=document.getElementById('yanoverse-game-track');
 const selected=track?.querySelector('.yanoverse-game.is-selected');
 const picker=track?.closest('.yanoverse-game-picker');
 if(!selected||!picker)return;
 picker.style.setProperty('position','relative','important');
 picker.style.setProperty('left','50%','important');
 picker.style.setProperty('width','100vw','important');
 picker.style.setProperty('max-width','100vw','important');
 picker.style.setProperty('margin-left','-50vw','important');
 picker.style.setProperty('overflow','hidden','important');
 track.style.setProperty('position','relative','important');
 track.style.setProperty('left','50%','important');
 track.style.setProperty('display','flex','important');
 track.style.setProperty('width','max-content','important');
 track.style.setProperty('max-width','none','important');
 track.style.setProperty('margin','0','important');
 track.style.setProperty('transition','none','important');
 track.style.setProperty('transform','translateX(-50%)','important');
 void track.offsetWidth;
 const rect=selected.getBoundingClientRect();
 const shift=window.innerWidth/2-(rect.left+rect.width/2);
 track.style.setProperty('transform','translateX(calc(-50% + '+shift+'px))','important');
}
const scheduleCenter=()=>requestAnimationFrame(()=>requestAnimationFrame(centerSelectedGame));
window.addEventListener('resize',scheduleCenter);
window.addEventListener('orientationchange',scheduleCenter);
window.addEventListener('load',scheduleCenter);
if(document.fonts?.ready)document.fonts.ready.then(scheduleCenter);
scheduleCenter();

const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const image=p=>p?'/Yanoverse-Multidex'+(p.startsWith('/')?p:'/'+p):'';
const img=(p,alt,klass='')=>'<img class="'+klass+'" src="'+esc(image(p))+'" alt="'+esc(alt)+'" loading="lazy">';
const url=m=>'?game='+game+'&monster='+encodeURIComponent(m.slug);
const colors={Astral:'#a18be8',Living:'#64b873',Nature:'#55b990',Demon:'#a35b9d',Earth:'#bb9461',Holy:'#e8d47b',Inferno:'#ed6044',Sea:'#398fbe',Sky:'#80b9df',Undead:'#8379ad',Fairy:'#dc8fca',Ghoul:'#7964a5',Mimic:'#c49b68',Neutral:'#9da9b5',Fire:'#e97848',Water:'#468fd1',Earth:'#bd9363',Air:'#76b6d4',Light:'#e5c667',Dark:'#8968b8',Electric:'#e6bd49',Ice:'#74c5d4',Ghost:'#8c7bd0',Poison:'#a16ac1',Metal:'#9da8b6',Construct:'#9aa8bd',Celestial:'#f2cc7e',Spirit:'#aa83db',Beast:'#c68a55',Magic:'#aa85dc',Shadow:'#7765a9',Normal:'#98a5b6',Dragon:'#647fc6',Fighting:'#c7765d'};
const color=t=>colors[t]||'#789bc2';
const style=m=>'--yv-type-one:'+color((m.type||[])[0])+';--yv-type-two:'+color((m.type||[])[1]||(m.type||[])[0]);
const badge=t=>'<span class="dex-card-type" style="--type-color:'+color(t)+'">'+esc(t)+'</span>';
const stats=['Health','Attack','Defense','Mgk. Atk','Mgk. Def','Speed'];
function statRadar(m){
 const values=stats.map(k=>Math.max(0,Number(m.base_stats?.[k])||0));
 const max=Math.max(150,...values);
 const cx=150,cy=150,r=104;
 const point=(i,ratio)=>{const a=-Math.PI/2+i*Math.PI/3;return [(cx+Math.cos(a)*r*ratio).toFixed(1),(cy+Math.sin(a)*r*ratio).toFixed(1)].join(',')};
 const ring=ratio=>stats.map((_,i)=>point(i,ratio)).join(' ');
 const axes=stats.map((_,i)=>'<line x1="150" y1="150" x2="'+point(i,1).replace(',','" y2="')+'" stroke="#71849c" stroke-opacity=".65"/>').join('');
 const grid=[.25,.5,.75,1].map(n=>'<polygon points="'+ring(n)+'" fill="none" stroke="#8297b1" stroke-opacity=".48"/>').join('');
 const polygon=values.map((n,i)=>point(i,n/max)).join(' ');
 const dots=values.map((n,i)=>'<circle cx="'+point(i,n/max).replace(',','" cy="')+'" r="4" fill="'+['#ff7777','#ffac55','#e6d36b','#aaa1ff','#77d8f2','#7edb95'][i]+'"/>').join('');
 const labels=['HP','ATK','DEF','M.ATK','M.DEF','SPD'].map((label,i)=>{const a=-Math.PI/2+i*Math.PI/3;const x=(cx+Math.cos(a)*129).toFixed(1),y=(cy+Math.sin(a)*125+4).toFixed(1);return '<text x="'+x+'" y="'+y+'" text-anchor="middle" font-size="12" font-weight="700" fill="'+['#ff7777','#ffac55','#e6d36b','#aaa1ff','#77d8f2','#7edb95'][i]+'">'+label+'</text>'}).join('');
 return '<svg class="stat-radar" viewBox="0 0 300 300" role="img" aria-label="Base stats radar chart: '+esc(stats.map((k,i)=>k+' '+values[i]).join(', '))+'">'+grid+axes+'<polygon points="'+polygon+'" fill="#80b9ff" fill-opacity=".24" stroke="#a5d0ff" stroke-width="2.5"/>'+dots+labels+'</svg>';
}
let data=[],activeTypes=new Set(),selected=null;
function tile(m){
 const pic=shiny.checked&&m.shiny_sprite?m.shiny_sprite:m.sprite;
 return '<article class="dex-entry" style="'+style(m)+'" data-name="'+esc(m.name)+'"><a href="'+url(m)+'"><div class="img-wrapper">'+img(pic,m.name,'monster-image small')+'</div><div class="dex-card-details"><span class="dex-card-number">#'+m.number+'</span><strong class="dex-card-name">'+esc(m.name)+'</strong></div></a></article>';
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
 const position=data.findIndex(x=>x.slug===m.slug);
 const previous=data[(position+data.length-1)%data.length];
 const next=data[(position+1)%data.length];
 const statTotal=stats.reduce((a,k)=>a+Number(m.base_stats?.[k]||0),0);
 const statRows=stats.map(s=>'<div class="stat-row"><span>'+esc(s)+'</span><div class="stat-track"><span style="width:'+Math.min(100,Number(m.base_stats?.[s]||0)/255*100)+'%"></span></div><b>'+Number(m.base_stats?.[s]||0)+'</b></div>').join('');
 profile.innerHTML='<div class="profile-top"><a class="return-link" href="?game='+game+'">← Return to Dex</a><h2 class="profile-title">'+esc(m.name)+'</h2><span class="profile-number">#'+String(m.number).padStart(3,'0')+'</span></div><div class="profile-navigation"><a class="nav-arrow" aria-label="Previous monster" href="'+url(previous)+'">‹</a><div class="monster-layout-row"><div class="monster-image-container">'+img(pic,m.name,'hero-image')+'</div><div class="monster-info"><h3>'+esc(m.classification||m.name)+'</h3><p class="profile-types">'+(m.type||[]).map(badge).join(' ')+'</p>'+(m.sin?'<p><strong>Sin:</strong> '+esc(m.sin)+'</p>':'')+'<p>'+esc(m.dex_entry||'')+'</p></div><div class="stats-side"><h3>Base Stats</h3><div class="monster-stats">'+statRadar(m)+'<p class="stat-total">Total: '+statTotal+'</p></div></div></div><a class="nav-arrow" aria-label="Next monster" href="'+url(next)+'">›</a></div>'+(evol.length>1?'<div class="evolution-wrapper"><div class="evo">'+evol.map(n=>{const e=data.find(x=>x.name===n);return e?'<a href="'+url(e)+'">'+img(e.mini_sprite||e.sprite,e.name)+esc(e.name)+'</a>':'<span>'+esc(n)+'</span>'}).join('<span aria-hidden="true">→</span>')+'</div></div>':'')+(m.evolves_at?'<p class="evolution-level">Evolution level: '+esc(m.evolves_at)+'</p>':'');
 const chain=profile.querySelector('.evolution-wrapper');
 if(chain)profile.insertBefore(chain,profile.querySelector('.profile-navigation'));
}
$('filter-toggle').addEventListener('click',()=>{const collapsed=$('dex-filter-controls').classList.toggle('collapsed');$('filter-toggle').textContent=collapsed?'Show Filters':'Hide Filters';$('filter-toggle').setAttribute('aria-expanded',String(!collapsed))});
$('clear-filters').addEventListener('click',()=>{activeTypes.clear();typeFilters.querySelectorAll('button').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});search.value='';stage.value='';shiny.checked=false;render()});
[search,stage].forEach(el=>el.addEventListener('input',render));
shiny.addEventListener('change',()=>{render();if(selected)navigate()});
fetch(root+game+'/_data/'+game+'.json').then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json()}).then(rows=>{
 data=rows.sort((a,b)=>a.number-b.number);
 [...new Set(data.flatMap(m=>m.type||[]))].sort().forEach(t=>{const b=document.createElement('button');b.type='button';b.className='type-btn';b.textContent=t;b.dataset.type=t;b.style.setProperty('--type-color',color(t));b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>{if(activeTypes.has(t))activeTypes.delete(t);else activeTypes.add(t);b.classList.toggle('active',activeTypes.has(t));b.setAttribute('aria-pressed',String(activeTypes.has(t)));render()});typeFilters.appendChild(b)});
 navigate();render();
}).catch(e=>{summary.textContent='Unable to load Dex data: '+e.message});
})();
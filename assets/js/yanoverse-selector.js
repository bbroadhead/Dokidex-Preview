(() => {
  const games = [
    {id:'dokimon2',name:'Dokimon Quest 2',status:'In development'},
    {id:'quest',name:'Dokimon: Quest',status:''},
    {id:'yami',name:'Yami Kids',status:'Data coming soon'},
    {id:'nuumonsters',name:'Nuumonsters',status:'Data coming soon'}
  ];
  const track=document.getElementById('yanoverse-game-track');
  const notice=document.getElementById('yanoverse-game-notice');
  if(!track || !notice) return;
  const buttons=[...track.querySelectorAll('[data-game]')];
  function applyBrandColors() {
    const brand=document.querySelector('.yanoverse-brand');
    if(!brand) return;
    brand.style.setProperty('color','#aab8ce','important');
    brand.style.setProperty('-webkit-text-fill-color','#aab8ce','important');
    brand.style.setProperty('background','transparent','important');
    brand.style.setProperty('background-image','none','important');
    brand.style.setProperty('filter','none','important');
    brand.style.setProperty('mix-blend-mode','normal','important');
    const accent=brand.querySelector('span');
    if(accent){
      accent.style.setProperty('color','#7487a2','important');
      accent.style.setProperty('-webkit-text-fill-color','#7487a2','important');
      accent.style.setProperty('background','transparent','important');
      accent.style.setProperty('background-image','none','important');
      accent.style.setProperty('background-clip','border-box','important');
      accent.style.setProperty('-webkit-background-clip','border-box','important');
      accent.style.setProperty('filter','none','important');
      accent.style.setProperty('mix-blend-mode','normal','important');
    }
  }

  function centerSelected() {
    const selected=track.querySelector('.yanoverse-game.is-selected');
    const picker=track.closest('.yanoverse-game-picker');
    if(!selected || !picker) return;

    // Normalize the same viewport-anchored geometry on every page.
    picker.style.setProperty('position','relative','important');
    picker.style.setProperty('left','50%','important');
    picker.style.setProperty('width','100vw','important');
    picker.style.setProperty('max-width','100vw','important');
    picker.style.setProperty('margin-left','-50vw','important');
    picker.style.setProperty('margin-right','0','important');
    picker.style.setProperty('overflow','hidden','important');
    picker.style.setProperty('box-sizing','border-box','important');

    track.style.setProperty('position','relative','important');
    track.style.setProperty('left','50%','important');
    track.style.setProperty('display','flex','important');
    track.style.setProperty('width','max-content','important');
    track.style.setProperty('max-width','none','important');
    track.style.setProperty('margin','0','important');
    track.style.setProperty('overflow','visible','important');
    track.style.setProperty('scroll-snap-type','none','important');

    // A transition on the track makes measurements depend on the previous
    // animation frame, which creates cumulative drift. Measure from a truly
    // neutral, non-animated position every time.
    track.style.setProperty('transition','none','important');
    track.scrollLeft=0;
    track.style.setProperty('transform','translateX(-50%)','important');
    void track.offsetWidth; // force layout after clearing the old transform

    const rect=selected.getBoundingClientRect();
    const shift=(window.innerWidth/2)-(rect.left+rect.width/2);
    track.style.setProperty('transform','translateX(calc(-50% + '+shift+'px))','important');
  }
  function scheduleCenter() {
    requestAnimationFrame(()=>requestAnimationFrame(centerSelected));
  }
  function select(id) {
    const game=games.find(g=>g.id===id)||games[1];
    buttons.forEach(btn=>{
      const selected=btn.dataset.game===game.id;
      btn.classList.toggle('is-selected',selected);
      btn.setAttribute('aria-pressed',String(selected));
    });
    scheduleCenter();
    const main=document.querySelector('main.page-content');
    if(main) main.hidden=game.id!=='quest';
    notice.hidden=game.id==='quest';
    if(game.id!=='quest') {
      notice.textContent=game.name+' — '+game.status+'. This game’s dedicated Dex will appear here when its data is available.';
    }
    document.title=game.id==='quest'?'Dokimon: Quest | Yanoverse Multi-Dex':game.name+' | Yanoverse Multi-Dex';
    try { sessionStorage.setItem('yanoverse-game',game.id); } catch(e) {}
  }
  buttons.forEach(btn=>btn.addEventListener('click',()=>{
    const id=btn.dataset.game;
    // A second tap on the active game acts as a Home shortcut.
    if(btn.classList.contains('is-selected')){
      const home='/Dokidex-Preview/'; 
      window.location.assign(home);
      return;
    }
    select(id);
  }));
  applyBrandColors();
  window.addEventListener('resize',scheduleCenter);
  window.addEventListener('orientationchange',scheduleCenter);
  window.addEventListener('load',scheduleCenter);
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(scheduleCenter);
  if('ResizeObserver' in window){
    const selectorObserver=new ResizeObserver(scheduleCenter);
    selectorObserver.observe(track);
    buttons.forEach(button=>selectorObserver.observe(button));
  }
  let saved='quest';
  try {saved=sessionStorage.getItem('yanoverse-game')||'quest';} catch(e) {}
  select(saved);
})();
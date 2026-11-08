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
  let trackShift=0;
  function centerSelected() {
    const selected=track.querySelector('.yanoverse-game.is-selected');
    if(!selected) return;
    const rect=selected.getBoundingClientRect();
    trackShift += (window.innerWidth / 2) - (rect.left + rect.width / 2);
    track.style.transform=`translateX(calc(-50% + ${trackShift}px))`;
  }
  function select(id) {
    const game=games.find(g=>g.id===id)||games[1];
    buttons.forEach(btn=>{
      const selected=btn.dataset.game===game.id;
      btn.classList.toggle('is-selected',selected);
      btn.setAttribute('aria-pressed',String(selected));
    });
    const selected=buttons.find(btn=>btn.dataset.game===game.id);
    trackShift=0;
    track.style.transform='translateX(-50%)';
    requestAnimationFrame(centerSelected);
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
  window.addEventListener('resize',()=>{
    trackShift=0;
    track.style.transform='translateX(-50%)';
    requestAnimationFrame(centerSelected);
  });
  let saved='quest';
  try {saved=sessionStorage.getItem('yanoverse-game')||'quest';} catch(e) {}
  select(saved);
})();
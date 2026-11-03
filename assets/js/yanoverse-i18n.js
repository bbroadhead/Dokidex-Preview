/* Yanoverse English / Japanese interface localization.
   Keeps original English strings so switching languages is reversible. */
(()=>{'use strict';
const pairs=[
['Hide Filters','フィルターを隠す'],['Show Filters','フィルターを表示'],['Search Location','出現場所を検索'],['Search Name','名前を検索'],['Palettes','カラーパターン'],['Palettes:','カラーパターン：'],['Stage:','進化段階：'],['Type:','タイプ：'],['Location:','出現場所：'],['Name:','名前：'],['Rare Form 4','レアフォーム4'],['Rare Form 5','レアフォーム5'],['Rare Form 6','レアフォーム6'],['Rare Form 7','レアフォーム7'],['Bound','束縛'],['Unique','ユニーク'],['Stage 1','第1段階'],['Stage 2','第2段階'],['Stage 3','第3段階'],['Stage 4','第4段階'],['Stage 5','第5段階'],['Stage 6','第6段階'],['Return to Dex','図鑑に戻る'],['← Return to Dex','← 図鑑に戻る'],['Evolves at:','進化レベル：'],['Type Effectiveness Tool','タイプ相性表'],['Row=Attack Move Type,','行＝攻撃わざのタイプ、'],['Col=Defend Mon Type ➤','列＝防御側のタイプ ➤'],['Click a type to highlight','タイプを選択して強調表示'],['Fight','かくとう'],['Half','半減'],['Null','無効'],['2x','2倍'],['1x','等倍'],['IN DEVELOPMENT','開発中'],['YANOVERSE MULTI-DEX','ヤノバース・マルチ図鑑'],
['Theme','テーマ'],['Dex','図鑑'],['World','ワールド'],['Tracker','捕獲記録'],['Links','リンク'],['Type Effectiveness Tool','タイプ相性表'],
['Toggle Filters','フィルターを表示・非表示'],['Palettes:','カラーパターン：'],['Common','通常'],['Rare Form 1','レアフォーム1'],['Rare Form 2','レアフォーム2'],['Rare Form 3','レアフォーム3'],
['Stage','進化段階'],['Stages','進化段階'],['Type','タイプ'],['Types','タイプ'],['Location','出現場所'],['Locations','出現場所'],['Search','検索'],['Search by name','名前で検索'],['Search monsters','モンスターを検索'],['All','すべて'],['All Types','すべてのタイプ'],['All Stages','すべての段階'],['All Locations','すべての場所'],['Clear Filters','フィルターを解除'],['Reset Filters','フィルターをリセット'],
['Evolution Chain','進化系統'],['Evolution','進化'],['Base Stats','基本ステータス'],['Stats','ステータス'],['Moves','わざ'],['Move List','わざ一覧'],['Moveset','わざ一覧'],['Abilities','特性'],['Ability','特性'],['Description','説明'],['Evolves at','進化レベル'],['Return to Dex','図鑑に戻る'],['Back to Index','図鑑に戻る'],['Back to Dex','図鑑に戻る'],
['Dokimon caught:','捕獲したドキモン：'],['Rare forms caught:','捕獲したレアフォーム：'],['Caught?','捕獲済み？'],['Rare Forms','レアフォーム'],['Caught','捕獲済み'],['Not caught','未捕獲'],['Settings','設定'],['Mark all as caught','すべて捕獲済みにする'],['Remove all as caught','捕獲記録をすべて解除'],['Remove all rare forms','レアフォームの記録をすべて解除'],['Export as CSV','CSVにエクスポート'],['Filter out caught Dokimon','捕獲済みを非表示'],['Restore filtered Dokimon','非表示を解除'],['Image','画像'],['Name','名前'],['Dex Number','図鑑番号'],
['Fire','ほのお'],['Grass','くさ'],['Water','みず'],['Electric','でんき'],['Dark','あく'],['Light','ひかり'],['Flying','ひこう'],['fight','かくとう'],['Fighting','かくとう'],['Poison','どく'],['Dragon','ドラゴン'],['Fairy','フェアリー'],['Ghost','ゴースト'],['Ice','こおり'],
['Attack','こうげき'],['Defense','ぼうぎょ'],['Speed','すばやさ'],['HP','HP'],['Sp. Atk','とくこう'],['Sp. Def','とくぼう'],
['Row=Attack Move Type,','行＝攻撃わざのタイプ、'],['Col=Defend Mon Type','列＝防御側のタイプ'],['Click a type to highlight','タイプをタップして強調表示'],['(click to open panel)','（タップして詳細を表示）'],['(double-click to remove)','（ダブルタップで削除）'],
['Data coming soon','データは準備中です'],['In development','開発中'],['No monsters found','モンスターが見つかりません'],['Loading...','読み込み中…'],['Level','レベル'],['Lv.','Lv.'],['Half','半減']
];
const dict=new Map(pairs);const originals=new WeakMap();const attrOriginals=new WeakMap();
function translateText(value){
  if(!value||!value.trim())return value;
  const trim=value.trim();
  if(dict.has(trim))return value.replace(trim,dict.get(trim));
  // Translate longer UI phrases while avoiding partial matches inside names.
  let translated=trim;
  for(const [en,ja] of pairs.filter(([key])=>key.length>8 && key.includes(' ')).sort((a,b)=>b[0].length-a[0].length)){
    if(translated.includes(en))translated=translated.split(en).join(ja);
  }
  return translated===trim?value:value.replace(trim,translated);
}
function apply(lang){document.documentElement.lang=lang;document.documentElement.dataset.language=lang;document.querySelectorAll('.lang-flag[data-lang]').forEach(f=>{const active=f.dataset.lang===lang;f.setAttribute('aria-pressed',String(active));f.classList.toggle('active-language',active)});
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement?.closest('script,style,textarea,code,pre,svg')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});let n;while(n=walker.nextNode()){if(!originals.has(n))originals.set(n,n.nodeValue);const original=originals.get(n);const target=lang==='ja'?translateText(original):original;if(n.nodeValue!==target)n.nodeValue=target}
document.querySelectorAll('[placeholder],[title],[aria-label]').forEach(el=>{let orig=attrOriginals.get(el);if(!orig){orig={};for(const k of ['placeholder','title','aria-label'])if(el.hasAttribute(k))orig[k]=el.getAttribute(k);attrOriginals.set(el,orig)}for(const [k,v] of Object.entries(orig))el.setAttribute(k,lang==='ja'?translateText(v):v)})}
let current='en',scheduled=false;function refresh(){scheduled=false;apply(current)}function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(refresh)}}
document.addEventListener('DOMContentLoaded',()=>{try{current=localStorage.getItem('yanoverse-language')==='ja'?'ja':'en'}catch{}document.querySelectorAll('.lang-flag[data-lang]').forEach(flag=>{const lang=flag.dataset.lang;if(!['en','ja'].includes(lang))return;flag.setAttribute('role','button');flag.setAttribute('tabindex','0');flag.setAttribute('aria-label',lang==='ja'?'日本語に切り替え':'Switch to English');const select=()=>{current=lang;try{localStorage.setItem('yanoverse-language',lang)}catch{}apply(lang)};flag.addEventListener('click',select);flag.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select()}})});apply(current);const observer=new MutationObserver(schedule);observer.observe(document.body,{subtree:true,childList:true})});
})();

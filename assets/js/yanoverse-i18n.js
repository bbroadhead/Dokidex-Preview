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

// Additional interface strings used in profile panels, world navigation and tracker dialogs.
const additionalPairs=[
['Close','閉じる'],['Close panel','パネルを閉じる'],['Open','開く'],['Back','戻る'],['Next','次へ'],['Previous','前へ'],
['Home','ホーム'],['Map','マップ'],['World Map','ワールドマップ'],['View Map','マップを見る'],
['Select a monster','モンスターを選択'],['Select a type','タイプを選択'],['No results','結果がありません'],
['No results found','検索結果がありません'],['No matching monsters','該当するモンスターがいません'],
['Search by location','出現場所で検索'],['Search by type','タイプで検索'],
['All monsters','すべてのモンスター'],['All forms','すべてのフォーム'],['Normal','通常'],
['Rare','レア'],['Rare Form','レアフォーム'],['Base Form','通常フォーム'],
['Health','HP'],['Physical Attack','物理攻撃'],['Physical Defense','物理防御'],
['Special Attack','特殊攻撃'],['Special Defense','特殊防御'],['Total','合計'],
['Base Stats:','基本ステータス：'],['Evolution Chain:','進化系統：'],
['Level:','レベル：'],['Level Up','レベルアップ'],['Evolves From','進化前'],['Evolves Into','進化先'],
['Weakness','弱点'],['Weaknesses','弱点'],['Resistance','耐性'],['Resistances','耐性'],
['Effective','効果あり'],['Not Very Effective','効果はいまひとつ'],['No Effect','効果なし'],
['Attack Move Type','攻撃わざのタイプ'],['Defend Mon Type','防御側のタイプ'],
['Show All','すべて表示'],['Show More','もっと見る'],['Show Less','閉じる'],
['Caught Dokimon','捕獲したドキモン'],['Caught Dokimon:','捕獲したドキモン：'],
['Rare forms caught','捕獲したレアフォーム'],['Capture Progress','捕獲進捗'],
['Export CSV','CSVを書き出す'],['Import CSV','CSVを読み込む'],
['Save','保存'],['Cancel','キャンセル'],['Confirm','確認'],['Delete','削除'],
['Yes','はい'],['No','いいえ'],['None','なし'],['Unknown','不明'],
['Loading','読み込み中'],['Error','エラー'],['Retry','再試行'],
['Dokimon: Quest','ドキモン：クエスト'],['Yami Kids','ヤミキッズ'],
['In Development','開発中'],['Coming Soon','近日公開'],['Coming soon','近日公開']
];
for(const [en,ja] of additionalPairs)dict.set(en,ja);

const koreanPairs=[
['Hide Filters','필터 숨기기'],['Show Filters','필터 표시'],['Toggle Filters','필터 표시/숨기기'],['Clear Filters','필터 초기화'],
['Search Location','출현 장소 검색'],['Search Name','이름 검색'],['Palettes:','색상 변형:'],['Palettes','색상 변형'],['Common','일반'],['Bound','속박'],['Unique','특별'],
['Rare Form 1','희귀 형태 1'],['Rare Form 2','희귀 형태 2'],['Rare Form 3','희귀 형태 3'],['Rare Form 4','희귀 형태 4'],['Rare Form 5','희귀 형태 5'],['Rare Form 6','희귀 형태 6'],['Rare Form 7','희귀 형태 7'],
['Stage 1','1단계'],['Stage 2','2단계'],['Stage 3','3단계'],['Stage 4','4단계'],['Stage 5','5단계'],['Stage 6','6단계'],
['Stage:','진화 단계:'],['Type:','타입:'],['Location:','출현 장소:'],['Name:','이름:'],['Evolves at:','진화 레벨:'],
['Dex','도감'],['World','월드'],['Tracker','포획 기록'],['Links','링크'],['Home','홈'],['Map','지도'],['World Map','월드 지도'],
['Type Effectiveness Tool','타입 상성표'],['Row=Attack Move Type,','행=공격 기술 타입,'],['Col=Defend Mon Type ➤','열=방어 몬스터 타입 ➤'],['Col=Defend Mon Type','열=방어 몬스터 타입'],['Click a type to highlight','타입을 눌러 강조 표시'],
['Fire','불꽃'],['Water','물'],['Grass','풀'],['Electric','전기'],['Dark','악'],['Light','빛'],['Flying','비행'],['Fight','격투'],['fight','격투'],['Fighting','격투'],['Fairy','페어리'],['Ghost','고스트'],['Poison','독'],['Dragon','드래곤'],['Ice','얼음'],
['All','전체'],['All Types','모든 타입'],['All Stages','모든 단계'],['All Locations','모든 장소'],['Stage','단계'],['Stages','단계'],['Type','타입'],['Types','타입'],['Location','출현 장소'],['Locations','출현 장소'],['Name','이름'],['Image','이미지'],['Search','검색'],
['Evolution Chain','진화 계보'],['Evolution','진화'],['Base Stats','기본 능력치'],['Stats','능력치'],['Moves','기술'],['Move List','기술 목록'],['Moveset','기술 목록'],['Abilities','특성'],['Ability','특성'],['Description','설명'],
['Return to Dex','도감으로 돌아가기'],['← Return to Dex','← 도감으로 돌아가기'],['Back to Dex','도감으로 돌아가기'],['Back to Index','도감으로 돌아가기'],
['Attack','공격'],['Defense','방어'],['Speed','스피드'],['HP','HP'],['Sp. Atk','특수공격'],['Sp. Def','특수방어'],['Level','레벨'],['Lv.','Lv.'],['Half','반감'],['Null','무효'],['2x','2배'],['1x','1배'],
['Dokimon caught:','포획한 도키몬:'],['Rare forms caught:','포획한 희귀 형태:'],['Caught?','포획 여부'],['Rare Forms','희귀 형태'],['Caught','포획함'],['Not caught','미포획'],
['Settings','설정'],['Mark all as caught','모두 포획으로 표시'],['Remove all as caught','전체 포획 기록 삭제'],['Remove all rare forms','희귀 형태 기록 모두 삭제'],['Export as CSV','CSV로 내보내기'],['Filter out caught Dokimon','포획한 도키몬 숨기기'],['Restore filtered Dokimon','숨긴 도키몬 다시 표시'],
['(click to open panel)','(눌러서 상세 정보 열기)'],['(double-click to remove)','(두 번 눌러 삭제)'],['Loading...','불러오는 중…'],['Data coming soon','데이터 준비 중'],['In development','개발 중'],['IN DEVELOPMENT','개발 중'],['Coming Soon','곧 공개'],['No monsters found','몬스터를 찾을 수 없습니다'],
['Close','닫기'],['Open','열기'],['Next','다음'],['Previous','이전'],['Save','저장'],['Cancel','취소'],['Confirm','확인'],['Delete','삭제'],['Yes','예'],['No','아니요'],['None','없음'],['Unknown','알 수 없음'],
['YANOVERSE MULTI-DEX','야노버스 멀티 도감']
];
const koreanDict=new Map(koreanPairs);

function translateText(value,lang){
  if(!value||!value.trim())return value;
  const trim=value.trim();
  const source=lang==='ko'?koreanDict:dict;
  if(source.has(trim))return value.replace(trim,source.get(trim));
  // Translate longer UI phrases while avoiding partial matches inside names.
  let translated=trim;
  for(const [en,ja] of [...source].filter(([key])=>key.length>8 && key.includes(' ')).sort((a,b)=>b[0].length-a[0].length)){
    if(translated.includes(en))translated=translated.split(en).join(ja);
  }
  return translated===trim?value:value.replace(trim,translated);
}
function apply(lang){document.documentElement.lang=lang;document.documentElement.dataset.language=lang;document.querySelectorAll('.lang-flag[data-lang]').forEach(f=>{const active=f.dataset.lang===lang;f.setAttribute('aria-pressed',String(active));f.classList.toggle('active-language',active)});
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement?.closest('script,style,textarea,code,pre,svg')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});let n;while(n=walker.nextNode()){if(!originals.has(n))originals.set(n,n.nodeValue);const original=originals.get(n);const target=lang==='en'?original:translateText(original,lang);if(n.nodeValue!==target)n.nodeValue=target}
document.querySelectorAll('[placeholder],[title],[aria-label]').forEach(el=>{let orig=attrOriginals.get(el);if(!orig){orig={};for(const k of ['placeholder','title','aria-label'])if(el.hasAttribute(k))orig[k]=el.getAttribute(k);attrOriginals.set(el,orig)}for(const [k,v] of Object.entries(orig))el.setAttribute(k,lang==='en'?v:translateText(v,lang))})}
let current='en',scheduled=false;function refresh(){scheduled=false;apply(current)}function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(refresh)}}
document.addEventListener('DOMContentLoaded',()=>{try{current=['en','ja','ko'].includes(localStorage.getItem('yanoverse-language'))?localStorage.getItem('yanoverse-language'):'en'}catch{}document.querySelectorAll('.lang-flag[data-lang]').forEach(flag=>{const lang=flag.dataset.lang;if(!['en','ja','ko'].includes(lang))return;flag.setAttribute('role','button');flag.setAttribute('tabindex','0');flag.setAttribute('aria-label',lang==='ja'?'日本語に切り替え':lang==='ko'?'한국어로 전환':'Switch to English');const select=()=>{current=lang;try{localStorage.setItem('yanoverse-language',lang)}catch{}apply(lang)};flag.addEventListener('click',select);flag.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select()}})});apply(current);const observer=new MutationObserver(schedule);observer.observe(document.body,{subtree:true,childList:true,characterData:true})});
})();

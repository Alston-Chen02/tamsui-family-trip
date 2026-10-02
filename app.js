const packing=['入住者證件與壽星核對證件','訂房信、現場尾款 NT$6,384','牙刷、牙膏、梳子','水壺（樓層有飲水機）','雨具','薄外套','防曬用品','小朋友換洗衣物','泳衣、泳帽（想游泳時）','確認蛋糕與紅酒領取方式'];
let state={day:0,weather:'sun',checked:[]};
try{const saved=JSON.parse(localStorage.getItem('tamsui-2026-packing')||'[]');if(Array.isArray(saved))state.checked=saved.filter(x=>Number.isInteger(x)&&x>=0&&x<packing.length)}catch{}
const days=[[
 ['08:00<br>–09:00','在家吃早餐，準備出門','先讓孩子慢慢吃飽，再確認行李與證件，09:00 準備出發。','建議安排'],
 ['09:00','中和住家出發','自行開車前往淡水福容。預留約 90 分鐘作為交通與假日緩衝，以 10:30 抵達為目標；這是規劃預留時間，非即時導航車程。當天若路況較塞，請提早出門。 <a href="https://www.google.com/maps/dir/?api=1&amp;destination=%E7%A6%8F%E5%AE%B9%E5%A4%A7%E9%A3%AF%E5%BA%97%E6%B7%A1%E6%B0%B4%E6%BC%81%E4%BA%BA%E7%A2%BC%E9%A0%AD&amp;travelmode=driving" target="_blank" rel="noopener">開啟飯店導航</a>','建議出發'],
 ['10:30','抵達飯店，停車與寄放行李','先停車、寄放行李、讓孩子上洗手間，預留約 30 分鐘銜接玩球。房客停車位不保留；客滿時請向櫃台確認替代停車方式。 <a href="https://www.fullon-hotels.com.tw/fw/tw/location/" target="_blank" rel="noopener">飯店交通資訊</a>','目標抵達'],
 ['11:00<br>–12:30','POPA 玩球時間','先寄放行李，再依孩子狀況參加。暫按聊天內容銜接此場次，需確認名額與入場條件。','暫定・另收費'],
 ['12:30 後','看體力，找地方午睡','累了就先休息，附近逛逛也可以。尚未到入住時間，午睡地點視現場情況安排。','孩子優先'],
 ['15:00','入住海景房，留白一下','入住海景豪華客房 B，放下行李、補眠，讓孩子慢慢恢復體力。','入住'],
 ['下午空檔','走到海邊，吹吹風','依午睡時間彈性穿插：木棧道、情人橋、漁人碼頭，情人塔可視狀況另行安排。','晴天備案'],
 ['17:30','田園西餐廳吃晚餐','前往 2 樓享用方案晚餐。訂房信標示晚餐時段為 17:30–21:00。','固定安排'],
 ['晚餐後','散散步，回房吃蛋糕','看孩子體力決定散步長短，再回房享用蛋糕。領取方式先向櫃台確認。','生日小時光']
],[
 ['早餐','慢慢吃早餐','早餐時間與用餐地點於抵達時向櫃台確認。','依飯店安排'],
 ['早餐後','整理行李，再逛一下','可在館內或碼頭走走，把時間留給喜歡的角落。','輕鬆收尾'],
 ['11:00','辦理退房','確認個人物品與訂房方案贈品都已處理，再辦理退房。','固定安排'],
 ['午餐後','帶著海風回家','午餐依當天狀況安排，用餐後回程。','彈性安排']
]];
function renderSchedule(){const events=days[state.day].map(e=>[...e]);if(state.weather==='rain'){if(state.day===0){events[6]=['下午空檔','下雨就留在館內玩','3 樓免費兒童遊戲室是雨天備案；1 樓 POPA 親子體能館另收費，依孩子體力與場次安排。','雨天備案'];events[8][2]='下雨就留在館內或直接回房休息、吃蛋糕；領取方式先向櫃台確認。'}else{events[1][2]='整理好行李，在館內輕鬆走走；雨天不用特地到碼頭。'}}
document.querySelector('#timeline').innerHTML=events.map((e,i)=>`<article class="event ${e[3]==='固定安排'||e[3]==='入住'?'highlight':''}" style="animation-delay:${i*25}ms"><time>${e[0]}</time><div class="event-content"><span class="tag">${e[3]}</span><h3>${e[1]}</h3><p>${e[2]}</p></div></article>`).join('');
document.querySelector('.plan-note').textContent=state.day===0?'建議 09:00 自行開車出發，目標 10:30 抵達，11:00 玩球。':'早餐後輕鬆收行李，記得 11:00 退房。';
document.querySelectorAll('[data-day]').forEach(b=>{const on=Number(b.dataset.day)===state.day;b.classList.toggle('active',on);b.setAttribute('aria-pressed',on)});document.querySelectorAll('[data-weather]').forEach(b=>{const on=b.dataset.weather===state.weather;b.classList.toggle('active',on);b.setAttribute('aria-pressed',on)})}
function updateProgress(){document.querySelector('#progress').textContent=`${state.checked.length} / ${packing.length} 已準備`;document.querySelector('#progress-fill').style.width=state.checked.length/packing.length*100+'%'}
function setChecked(index,checked){if(!Number.isInteger(index)||index<0||index>=packing.length||typeof checked!=='boolean')throw Error('無效的清單項目');state.checked=state.checked.filter(x=>x!==index);if(checked)state.checked.push(index);document.querySelector(`#pack-${index}`).checked=checked;try{localStorage.setItem('tamsui-2026-packing',JSON.stringify(state.checked))}catch{}updateProgress();return{completed:state.checked.length,total:packing.length}}
document.querySelector('#packing').innerHTML=packing.map((text,i)=>`<label class="check-item"><input type="checkbox" id="pack-${i}" ${state.checked.includes(i)?'checked':''}><span>${text}</span></label>`).join('');
packing.forEach((_,i)=>document.querySelector(`#pack-${i}`).addEventListener('change',e=>setChecked(i,e.target.checked)));
document.querySelectorAll('[data-day]').forEach(b=>b.addEventListener('click',()=>{state.day=Number(b.dataset.day);renderSchedule()}));document.querySelectorAll('[data-weather]').forEach(b=>b.addEventListener('click',()=>{state.weather=b.dataset.weather;renderSchedule()}));renderSchedule();updateProgress();
if(document.modelContext?.registerTool){try{Promise.resolve(document.modelContext.registerTool({name:'set_packing_item',description:'勾選或取消此裝置的旅行準備項目，編號從 0 到 9。',inputSchema:{type:'object',properties:{index:{type:'integer',minimum:0,maximum:9},checked:{type:'boolean'}},required:['index','checked'],additionalProperties:false},annotations:{readOnlyHint:false},execute:input=>setChecked(input.index,input.checked)})).catch(()=>{})}catch{}}

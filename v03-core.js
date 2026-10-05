
function v03Today(){return new Date().toLocaleDateString("sv-SE")}
function v03Migrate(){
 state.equipped={halter:null,blanket:null,pad:null,saddle:null,...(state.equipped||{})};
 state.horses=Array.isArray(state.horses)?state.horses:["luna"]; if(!state.horses.includes("luna"))state.horses.unshift("luna");
 state.activeHorse=state.activeHorse||"luna";
 state.daily={date:"",care:false,lesson:false,shop:false,claimed:false,...(state.daily||{})};
 if(state.daily.date!==v03Today())state.daily={date:v03Today(),care:false,lesson:false,shop:false,claimed:false};
 localStorage.setItem(STORE_KEY,JSON.stringify(state));
}
function v03Greeting(){const h=new Date().getHours();if(h<11)return["Buenos días","Aamu tallilla"];if(h<18)return["Buenas tardes","Iltapäivä tallilla"];return["Buenas noches","Ilta tallilla"]}
function v03Horse(){return HORSES.find(h=>h.id===state.activeHorse)||HORSES[0]}
const v02RenderAll=renderAll;
renderAll=function(){
 v02RenderAll();
 const h=v03Horse(),g=v03Greeting();
 const set=(id,val)=>{const e=document.getElementById(id);if(e)e.textContent=val};
 set("activeHorseName",h.name);set("greetingEs",g[0]);set("greetingFi",g[1]);set("greetingEsCopy",g[0]);
 renderDailyQuestV03();renderHorsesV03();renderGearV03();
};
function renderDailyQuestV03(){
 const root=byId("dailyTasks"); if(!root)return;
 const d=state.daily,done=[d.care,d.lesson,d.shop].filter(Boolean).length;
 byId("dailyProgress").style.width=`${done/3*100}%`;byId("dailyCount").textContent=`${done}/3`;
 root.innerHTML=[["care","🪮","Hoida hevosta",d.care],["lesson","📚","Tee yksi oppimistehtävä",d.lesson],["shop","🎒","Tarkista varusteet",d.shop]].map(x=>`<div class="daily-task ${x[3]?"done":""}"><span>${x[3]?"✅":x[1]}</span><b>${x[2]}</b></div>`).join("");
 const btn=byId("dailyClaim");btn.disabled=done<3||d.claimed;btn.textContent=d.claimed?"Päiväpalkinto saatu ✓":"Lunasta 60 🪙";
}
function renderHorsesV03(){
 const root=byId("horseGrid");if(!root)return;
 root.innerHTML=HORSES.map(h=>{const owned=state.horses.includes(h.id),active=state.activeHorse===h.id,can=state.xp>=(h.xp||0)&&state.coins>=h.price;return `<article class="horse-card ${active?"active":""}"><div class="horse-portrait">${h.icon}</div><div><span class="eyebrow">${owned?"OMISTAT":"LUKITTU"}</span><h3>${h.name}</h3><p>${h.desc}</p><small>${h.unlock}</small></div>${owned?`<button class="btn ${active?"primary":"soft"}" data-horse="${h.id}">${active?"Aktiivinen ✓":"Valitse"}</button>`:`<button class="btn ${can?"primary":"soft"}" data-unlock-horse="${h.id}" ${can?"":"disabled"}>${can?`Osta ${h.price} 🪙`:"Ei vielä"}</button>`}</article>`}).join("");
}
function renderGearV03(){
 const list=[];Object.values(state.equipped||{}).forEach(id=>{if(id){const item=SHOP_ITEMS.find(x=>x.id===id);if(item)list.push(`${item.icon} ${item.name}`)}});
 const el=byId("equippedList");if(el)el.textContent=list.length?list.join(" · "):"Ei valittuja varusteita";
 const grid=byId("shopGrid");if(grid)grid.innerHTML=SHOP_ITEMS.map(item=>{const owned=state.owned.includes(item.id),equipped=Object.values(state.equipped).includes(item.id);return `<article class="shop-item"><div><div class="shop-item-icon">${item.icon}</div><h3>${item.name}</h3><small>${item.desc}</small></div><div class="price-row">${owned?(item.slot==="care"?'<span class="owned">✓ Omistat</span>':`<button class="btn ${equipped?"primary":"soft"}" data-equip="${item.id}">${equipped?"Käytössä ✓":"Ota käyttöön"}</button>`):`<span class="price">🪙 ${item.price}</span><button class="btn soft" data-buy="${item.id}">Osta</button>`}</div></article>`}).join("");
}
const v02BuyItem=buyItem;
buyItem=function(id,el){v02BuyItem(id,el);state.daily.shop=true;localStorage.setItem(STORE_KEY,JSON.stringify(state));renderAll()};
const v02CareAction=careAction;
careAction=function(type){v02CareAction(type);state.daily.care=true;localStorage.setItem(STORE_KEY,JSON.stringify(state));renderAll()};
function equipV03(id){const item=SHOP_ITEMS.find(x=>x.id===id);if(!item||!state.owned.includes(id)||item.slot==="care")return;state.equipped[item.slot]=state.equipped[item.slot]===id?null:id;state.daily.shop=true;saveState();toast(state.equipped[item.slot]?item.name+" käytössä":item.name+" poistettu käytöstä")}
function claimDailyV03(){const d=state.daily;if(d.claimed||![d.care,d.lesson,d.shop].every(Boolean))return;d.claimed=true;state.coins+=60;state.trust=clamp(state.trust+3,0,100);saveState();confetti();toast("Päiväpalkinto +60 🪙")}
function chooseHorseV03(id){if(!state.horses.includes(id))return;state.activeHorse=id;saveState();toast(v03Horse().name+" on nyt aktiivinen hevonen")}
function unlockHorseV03(id){const h=HORSES.find(x=>x.id===id);if(!h||state.horses.includes(id)||state.xp<(h.xp||0)||state.coins<h.price)return;state.coins-=h.price;state.horses.push(id);state.activeHorse=id;saveState();confetti();toast(h.name+" liittyi talliisi!")}
v03Migrate();

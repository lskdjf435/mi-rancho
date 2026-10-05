
const v02FinishQuiz=finishQuiz;
finishQuiz=function(){state.daily.lesson=true;v02FinishQuiz();localStorage.setItem(STORE_KEY,JSON.stringify(state));renderAll()};
document.addEventListener("click",e=>{
 const equip=e.target.closest("[data-equip]");if(equip){equipV03(equip.dataset.equip);return}
 const horse=e.target.closest("[data-horse]");if(horse){chooseHorseV03(horse.dataset.horse);return}
 const unlock=e.target.closest("[data-unlock-horse]");if(unlock){unlockHorseV03(unlock.dataset.unlockHorse);return}
});
const dailyClaim=byId("dailyClaim");if(dailyClaim)dailyClaim.addEventListener("click",claimDailyV03);
const gearBtn=byId("checkGearBtn");if(gearBtn)gearBtn.addEventListener("click",()=>{state.daily.shop=true;localStorage.setItem(STORE_KEY,JSON.stringify(state));showScreen("shop");renderAll()});
renderAll();

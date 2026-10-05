/* Mi Rancho 0.4 — care magic + illustrated story missions */
const V04_SCENES={
  u1b:{src:"./assets/stable-people.webp",kicker:"TALLIN VÄKI",title:"¡Hola! Tutustu tallin ihmisiin"},
  u2a:{src:"./assets/stable-people.webp",kicker:"TALLIN VÄKI",title:"Tallilla jokaisella on oma tarinansa"}
};

function sparkleBurstV04(type){
  const root=byId("careMagic"),photo=document.querySelector("#screen-care .care-photo");
  if(!root||!photo)return;
  root.innerHTML="";
  const palette=type==="feed"?"rose":type==="water"?"aqua":"gold";
  const glyphs=type==="feed"?["♥","✦","♡","✧"]:type==="water"?["✦","✧","•","✦"]:["✦","✧","⋆","✦"];
  for(let i=0;i<16;i++){
    const s=document.createElement("span");
    s.className="magic-particle "+palette;
    s.textContent=glyphs[i%glyphs.length];
    s.style.fontSize=(14+Math.random()*19)+"px";
    s.style.left=(35+Math.random()*38)+"%";
    s.style.top=(25+Math.random()*48)+"%";
    s.style.setProperty("--dx",(Math.random()*180-90)+"px");
    s.style.setProperty("--dy",(-35-Math.random()*135)+"px");
    s.style.setProperty("--rot",(Math.random()*160-80)+"deg");
    s.style.animationDelay=(Math.random()*.16)+"s";
    root.appendChild(s);
  }
  const glow="care-glow-"+palette;
  photo.classList.remove("care-glow-gold","care-glow-rose","care-glow-aqua");
  void photo.offsetWidth; photo.classList.add(glow);
  setTimeout(()=>photo.classList.remove(glow),950);
  const msg=byId("careMessage");if(msg){msg.classList.remove("v04-highlight");void msg.offsetWidth;msg.classList.add("v04-highlight")}
}

const v03CareActionV04=careAction;
careAction=function(type){
  v03CareActionV04(type);
  sparkleBurstV04(type);
  const msg=byId("careMessage");
  if(msg){
    const texts={
      brush:"✨ Luna rentoutuu harjauksessa. Cepillar = harjata.",
      feed:"♥ Luna ottaa herkun. Le gusta la zanahoria.",
      water:"💧 Luna juo rauhassa. El agua = vesi."
    };
    msg.textContent=texts[type]||msg.textContent;
  }
};

function renderStorySceneV04(){
  const wrap=byId("quizScene"),img=byId("quizSceneImage"),kick=byId("quizSceneKicker"),title=byId("quizSceneTitle");
  if(!wrap)return;
  const scene=session&&V04_SCENES[session.source];
  if(!scene){wrap.hidden=true;return}
  img.src=scene.src;kick.textContent=scene.kicker;title.textContent=scene.title;wrap.hidden=false;
}
const v03RenderQuestionV04=renderQuestion;
renderQuestion=function(){v03RenderQuestionV04();renderStorySceneV04()};

const v03StartMissionV04=startMission;
startMission=function(id){
  v03StartMissionV04(id);
  renderStorySceneV04();
};

const v03StartUnitV04=startUnit;
startUnit=function(u){v03StartUnitV04(u);if(session)session.source="unit-"+u;renderStorySceneV04()};
const v03StartAdaptiveV04=startAdaptive;
startAdaptive=function(){v03StartAdaptiveV04();if(session)session.source="adaptive";renderStorySceneV04()};

const v03RenderMissionsV04=renderMissions;
renderMissions=function(){
  v03RenderMissionsV04();
  document.querySelectorAll("[data-start-mission='u1b'],[data-start-mission='u2a']").forEach(btn=>{
    const row=btn.closest(".mission-row");if(row)row.classList.add("scene-mission");
  });
};

function initV04Care(){
  const p=document.querySelector("#screen-care .care-photo");
  if(p&&!byId("careMagic")){
    const m=document.createElement("div");m.id="careMagic";m.className="care-magic";p.appendChild(m);
  }
}
initV04Care();renderAll();

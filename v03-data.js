
DEFAULT_STATE.equipped={halter:null,blanket:null,pad:null,saddle:null};
DEFAULT_STATE.horses=["luna"]; DEFAULT_STATE.activeHorse="luna";
DEFAULT_STATE.daily={date:"",care:false,lesson:false,shop:false,claimed:false};

const HORSES=[
{id:"luna",name:"Luna",icon:"🐴",desc:"Rauhallinen ja ystävällinen tamma. Ensimmäinen hoitohevosesi.",unlock:"Aloitushevonen",price:0,xp:0},
{id:"estrella",name:"Estrella",icon:"🐎",desc:"Energinen ja rohkea estehevonen.",unlock:"300 XP + 900 🪙",price:900,xp:300},
{id:"nube",name:"Nube",icon:"🤍",desc:"Nuori ja herkkä hevonen. Luottamus kasvaa hitaasti mutta varmasti.",unlock:"600 XP + 1 600 🪙",price:1600,xp:600}
];

QUESTIONS.push(
{id:"u3_cafe",u:3,topic:"Kahvilassa",prompt:"Mitä «un café, por favor» tarkoittaa?",answer:"Yksi kahvi, kiitos",choices:["Yksi kahvi, kiitos","Kahvi on hyvää","Haluan vettä","Missä kahvila on?"],speak:"Un café, por favor"},
{id:"u3_agua",u:3,topic:"Ruoka ja juoma",prompt:"Mikä on espanjaksi «vesi»?",answer:"el agua",choices:["el agua","el pan","la leche","el zumo"],speak:"el agua"},
{id:"u3_pan",u:3,topic:"Ruoka ja juoma",prompt:"Mitä «el pan» tarkoittaa?",answer:"leipä",choices:["leipä","maito","omena","juusto"],speak:"el pan"},
{id:"u3_manzana",u:3,topic:"Ruoka ja juoma",prompt:"Mikä on espanjaksi «omena»?",answer:"la manzana",choices:["la manzana","la naranja","la pera","la zanahoria"],speak:"la manzana"},
{id:"u3_articulo",u:3,topic:"Artikkelit",prompt:"Valitse oikea artikkeli: ___ caballo.",answer:"el",choices:["el","la","los","unas"],speak:"el caballo"},
{id:"u3_ar",u:3,topic:"-ar-verbit",prompt:"Täydennä: «Yo ___ español.» (estudiar)",answer:"estudio",choices:["estudio","estudias","estudia","estamos"],speak:"Yo estudio español"},
{id:"u3_hablar",u:3,topic:"-ar-verbit",prompt:"Mitä «hablar» tarkoittaa?",answer:"puhua",choices:["puhua","syödä","juoda","mennä"],speak:"hablar"},
{id:"u3_quiero",u:3,topic:"Kahvilassa",prompt:"Mitä «Quiero un zumo» tarkoittaa?",answer:"Haluan mehun",choices:["Haluan mehun","Juon mehua","Mehu maksaa paljon","En pidä mehusta"],speak:"Quiero un zumo"},
{id:"u4_lunes",u:4,topic:"Viikonpäivät",prompt:"Mitä «lunes» tarkoittaa?",answer:"maanantai",choices:["maanantai","tiistai","perjantai","sunnuntai"],speak:"lunes"},
{id:"u4_miercoles",u:4,topic:"Viikonpäivät",prompt:"Mikä on espanjaksi «keskiviikko»?",answer:"miércoles",choices:["miércoles","jueves","martes","domingo"],speak:"miércoles"},
{id:"u4_hora",u:4,topic:"Kellonajat",prompt:"Mitä «Son las cinco» tarkoittaa?",answer:"Kello on viisi",choices:["Kello on viisi","Kello on neljä","On viides päivä","Viisi hevosta"],speak:"Son las cinco"},
{id:"u4_ir",u:4,topic:"Ir-verbi",prompt:"Täydennä: «Yo ___ al establo.»",answer:"voy",choices:["voy","vas","va","hago"],speak:"Yo voy al establo"},
{id:"u4_hacer",u:4,topic:"Hacer-verbi",prompt:"Mitä «¿Qué haces?» tarkoittaa?",answer:"Mitä teet?",choices:["Mitä teet?","Minne menet?","Mitä haluat?","Mitä syöt?"],speak:"Qué haces"},
{id:"u4_mes",u:4,topic:"Kuukaudet",prompt:"Mikä on espanjaksi «lokakuu»?",answer:"octubre",choices:["octubre","abril","agosto","enero"],speak:"octubre"},
{id:"u4_invierno",u:4,topic:"Vuodenajat",prompt:"Mitä «invierno» tarkoittaa?",answer:"talvi",choices:["talvi","kevät","kesä","syksy"],speak:"invierno"},
{id:"u4_comer",u:4,topic:"-er-verbit",prompt:"Täydennä: «Yo ___ a las dos.» (comer)",answer:"como",choices:["como","comes","come","comemos"],speak:"Yo como a las dos"},
{id:"u4_vivir",u:4,topic:"-ir-verbit",prompt:"Mitä «vivir» tarkoittaa?",answer:"asua / elää",choices:["asua / elää","mennä","tehdä","ratsastaa"],speak:"vivir"}
);

MISSIONS.push(
{id:"u3a",u:3,title:"Aamukahvila",desc:"Ruoka, juoma ja kohtelias tilaaminen",ids:["u3_cafe","u3_agua","u3_pan","u3_quiero"],bonus:70,icon:"☕"},
{id:"u3b",u:3,title:"Hevosten välipalat",desc:"Sanasto, artikkelit ja -ar-verbit",ids:["u3_manzana","u3_articulo","u3_ar","u3_hablar"],bonus:75,icon:"🍎"},
{id:"u4a",u:4,title:"Tallin viikko",desc:"Viikonpäivät, kuukaudet ja vuodenajat",ids:["u4_lunes","u4_miercoles","u4_mes","u4_invierno"],bonus:80,icon:"📅"},
{id:"u4b",u:4,title:"Ratsastustunti klo 17",desc:"Kellonajat, ir, hacer ja tavalliset verbit",ids:["u4_hora","u4_ir","u4_hacer","u4_comer","u4_vivir"],bonus:90,icon:"🕔"}
);

CHAPTERS.forEach(c=>{ if(c.u===3||c.u===4)c.open=true; });
SHOP_ITEMS.forEach(i=>{ if(i.id==="halter")i.slot="halter"; else if(i.id==="blanket")i.slot="blanket"; else if(i.id==="pad")i.slot="pad"; else if(i.id==="saddle")i.slot="saddle"; else i.slot="care"; });

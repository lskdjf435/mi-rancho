
const STORE_KEY = "mir01";
const DEFAULT_STATE = {coins:120,xp:0,trust:25,care:55,skill:8,owned:["brush"],mastery:{},done:{},careUses:{brush:0,feed:0,water:0}};
const QUESTIONS = [
{id:"u1_hola",u:1,topic:"Tervehdykset",prompt:"Tallinomistaja tervehtii: «¡Hola!». Mitä se tarkoittaa?",answer:"Hei!",choices:["Hei!","Kiitos!","Näkemiin!","Hyvää yötä!"],speak:"Hola"},
{id:"u1_gracias",u:1,topic:"Tervehdykset",prompt:"Saat lainata harjaa. Miten sanot «kiitos» espanjaksi?",answer:"Gracias",choices:["Gracias","Adiós","Hola","Buenas noches"],speak:"Gracias"},
{id:"u1_adios",u:1,topic:"Tervehdykset",prompt:"Tallipäivä loppuu. Valitse espanjaksi «näkemiin».",answer:"Adiós",choices:["Buenos días","Adiós","Gracias","Hola"],speak:"Adiós"},
{id:"u1_buenos",u:1,topic:"Tervehdykset",prompt:"On aamu. Mikä tervehdys sopii parhaiten?",answer:"Buenos días",choices:["Buenos días","Buenas noches","Adiós","Gracias"],speak:"Buenos días"},
{id:"u1_llamo",u:1,topic:"Esittäytyminen",prompt:"Mitä «Me llamo Nuppu» tarkoittaa?",answer:"Nimeni on Nuppu",choices:["Nimeni on Nuppu","Asun Nupussa","Olen 14-vuotias","Minulla on hevonen"],speak:"Me llamo Nuppu"},
{id:"u1_como",u:1,topic:"Esittäytyminen",prompt:"Miten kysyt espanjaksi «Mikä sinun nimesi on?»",answer:"¿Cómo te llamas?",choices:["¿Cómo te llamas?","¿Dónde estás?","¿Qué quieres?","¿Cuántos años tienes?"],speak:"Cómo te llamas"},
{id:"u1_soy",u:1,topic:"Ser-verbi",prompt:"Täydennä: «Yo ___ de Finlandia.»",answer:"soy",choices:["soy","eres","es","está"],speak:"Yo soy de Finlandia"},
{id:"u1_es",u:1,topic:"Ser-verbi",prompt:"Täydennä Lunasta: «Luna ___ tranquila.»",answer:"es",choices:["es","soy","eres","estoy"],speak:"Luna es tranquila"},
{id:"u1_bonita",u:1,topic:"Ser-verbi",prompt:"Mitä «Luna es bonita» tarkoittaa?",answer:"Luna on kaunis",choices:["Luna on kaunis","Luna on tallissa","Luna on nopea","Luna syö"],speak:"Luna es bonita"},
{id:"u1_finlandia",u:1,topic:"Esittäytyminen",prompt:"Mitä «Soy de Finlandia» tarkoittaa?",answer:"Olen Suomesta",choices:["Olen Suomesta","Asun Suomessa","Menen Suomeen","Pidän Suomesta"],speak:"Soy de Finlandia"},
{id:"u2_madre",u:2,topic:"Perhe",prompt:"Mikä on espanjaksi «äiti»?",answer:"la madre",choices:["la madre","el padre","la hermana","el abuelo"],speak:"la madre"},
{id:"u2_padre",u:2,topic:"Perhe",prompt:"Mitä «el padre» tarkoittaa?",answer:"isä",choices:["isä","veli","isoisä","setä"],speak:"el padre"},
{id:"u2_hermana",u:2,topic:"Perhe",prompt:"Mikä on espanjaksi «sisko»?",answer:"la hermana",choices:["la hermana","el hermano","la madre","la abuela"],speak:"la hermana"},
{id:"u2_hermano",u:2,topic:"Perhe",prompt:"Mitä «el hermano» tarkoittaa?",answer:"veli",choices:["veli","sisko","isä","serkku"],speak:"el hermano"},
{id:"u2_mi",u:2,topic:"Omistus",prompt:"Mitä «mi caballo» tarkoittaa?",answer:"minun hevoseni",choices:["minun hevoseni","sinun hevosesi","hänen hevosensa","meidän hevosemme"],speak:"mi caballo"},
{id:"u2_mis",u:2,topic:"Omistus",prompt:"Mitä «mis caballos» tarkoittaa?",answer:"minun hevoseni (monikko)",choices:["minun hevoseni (monikko)","sinun hevosesi","hänen tallinsa","meidän hevoset"],speak:"mis caballos"},
{id:"u2_tengo",u:2,topic:"Tener-verbi",prompt:"Täydennä: «Yo ___ un caballo.»",answer:"tengo",choices:["tengo","tienes","tiene","estoy"],speak:"Yo tengo un caballo"},
{id:"u2_tiene",u:2,topic:"Tener-verbi",prompt:"Täydennä: «Luna ___ hambre.»",answer:"tiene",choices:["tiene","tengo","eres","está"],speak:"Luna tiene hambre"},
{id:"u2_donde",u:2,topic:"Estar-verbi",prompt:"Mitä «¿Dónde está Luna?» tarkoittaa?",answer:"Missä Luna on?",choices:["Missä Luna on?","Kuka Luna on?","Mitä Luna syö?","Millainen Luna on?"],speak:"Dónde está Luna"},
{id:"u2_establo",u:2,topic:"Estar-verbi",prompt:"Mitä «Luna está en el establo» tarkoittaa?",answer:"Luna on tallissa",choices:["Luna on tallissa","Luna menee talliin","Luna on ulkona","Tallissa on Luna"],speak:"Luna está en el establo"},
{id:"u2_estoy",u:2,topic:"Estar-verbi",prompt:"Täydennä: «Yo ___ en el establo.»",answer:"estoy",choices:["estoy","soy","está","tengo"],speak:"Yo estoy en el establo"},
{id:"u2_plural",u:2,topic:"Monikko",prompt:"Valitse sanan «caballo» monikko.",answer:"caballos",choices:["caballos","caballes","caballo","caballas"],speak:"caballos"}
];
const MISSIONS = [
{id:"u1a",u:1,title:"Saapuminen Rancho Lunaan",desc:"Tervehdykset tallin pihalla",ids:["u1_hola","u1_buenos","u1_gracias"],bonus:40,icon:"🌅"},
{id:"u1b",u:1,title:"Tapaa tallin väki",desc:"Esittäytyminen ja ser-verbi",ids:["u1_llamo","u1_como","u1_soy","u1_es"],bonus:55,icon:"🤝"},
{id:"u1c",u:1,title:"Ensimmäinen tallivuoro",desc:"Unidad 1 -kertaus",ids:["u1_hola","u1_adios","u1_llamo","u1_bonita","u1_finlandia"],bonus:70,icon:"🪮"},
{id:"u2a",u:2,title:"Tallin ihmiset",desc:"Perhesanasto ja omistus",ids:["u2_madre","u2_padre","u2_hermana","u2_mi"],bonus:45,icon:"👨‍👩‍👧‍👦"},
{id:"u2b",u:2,title:"Missä Luna on?",desc:"Tener ja estar tallissa",ids:["u2_tengo","u2_tiene","u2_donde","u2_establo"],bonus:60,icon:"🔎"},
{id:"u2c",u:2,title:"Talliperheen päivä",desc:"Unidad 2 -kertaus",ids:["u2_hermano","u2_mis","u2_estoy","u2_plural","u2_establo"],bonus:75,icon:"🐎"}];
const SHOP_ITEMS = [
{id:"brush",icon:"🪮",name:"Perusharja",price:0,desc:"Lunan ensimmäinen hoitotarvike"},
{id:"carrots",icon:"🥕",name:"Porkkanapussi",price:35,desc:"Pieni palkinto onnistuneen tallipäivän jälkeen"},
{id:"halter",icon:"🎀",name:"Vihreä riimu",price:90,desc:"Tyylikäs riimu tallikäyttöön"},
{id:"kit",icon:"🧺",name:"Hoitopakki",price:160,desc:"Pidä harjat ja tarvikkeet järjestyksessä"},
{id:"pad",icon:"🟩",name:"Oliivinvihreä satulahuopa",price:220,desc:"Avautuu visuaaliseksi varusteeksi myöhemmin"},
{id:"blanket",icon:"🧥",name:"Kevyt loimi",price:280,desc:"Suojaa Lunaa viileinä päivinä"},
{id:"saddle",icon:"🏇",name:"Nahkasatula",price:480,desc:"Suuri tavoite ennen ratsastusseikkailuja"},
{id:"treats",icon:"🍎",name:"Omenaherkut",price:70,desc:"Lunan suosikki porkkanoiden rinnalle"}];
const CHAPTERS = [
{u:1,title:"Ruta Tucán",desc:"Tervehtiminen · esittäytyminen · ser",open:true,icon:"🌴"},
{u:2,title:"Mi familia",desc:"Perhe · omistus · tener · estar",open:true,icon:"🏡"},
{u:3,title:"¡Qué rico!",desc:"Ruoka · kahvila · -ar-verbit",open:false,icon:"☕"},
{u:4,title:"Mi día",desc:"Päivät · kellonajat · ir · hacer",open:false,icon:"🕰️"},
{u:6,title:"¿Dónde estás?",desc:"Kaupunki · suunnat · hay / estar",open:false,icon:"🗺️"},
{u:7,title:"De tapas",desc:"Ruoka · ravintola · gustar",open:false,icon:"🍽️"},
{u:8,title:"¡Te queda muy bien!",desc:"Vaatteet · värit · adjektiivit",open:false,icon:"🧥"},
{u:9,title:"Nuevos vientos",desc:"Sää · ver · saber · omistus",open:false,icon:"🌬️"}];

// HTML darkmode Elements
const Elbody = document.getElementById("body");
const ElmodeImg = document.getElementById("js-modeImg");
const ElmodeText = document.getElementById("js-mode_text");
const Elbtn = document.getElementById("js-btn");

// HTM LDate changes Elements 
const Eldate = document.getElementById("js-site-time");

// HTML Day Elements
const Elservices = document.getElementById("js-services");
const Eltime = document.getElementById("js-service-time");
const Elday = document.getElementById("js-service-day");

// HTML template Elements
const ElbigInner = document.getElementById("html");
const Elinner = document.getElementById("js-inner");
const Eltemp = document.getElementById("js-template").content;
const docFrg = document.createDocumentFragment();
const tempClone = Eltemp.cloneNode(true);


// Other variables
const now = new Date();
let mode_data = localStorage.getItem("data") === "true";


// Dark mode
if (mode_data) {
    ElbigInner.style.colorScheme = "dark"
    Elbody.classList.add("active");
    ElmodeImg.src = "./assets/icons/moon_dark.svg";
    ElmodeText.textContent = "Yorug' rejim";
    Elbtn.title = "Yorug' rejim yorqinlikni yoqtiradiganlar uchun"
  } else {
    ElbigInner.style.colorScheme = "unset"
    Elbody.classList.remove("active");
    ElmodeImg.src = "./assets/icons/moon_light.svg";
    ElmodeText.textContent = "Qorong'i rejim";
    Elbtn.title = "Qorong'i rejim ko'zingiz uchun qulayroq bo'lishi mumkin"
  }
  
  Elbtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    mode_data = !mode_data; 
  
    if (mode_data) {
        ElbigInner.style.colorScheme = "dark"
        Elbody.classList.add("active");
        ElmodeImg.src = "./assets/icons/moon_dark.svg";
        ElmodeText.textContent = "Yorug' rejim";
        Elbtn.title = "Yorug' rejim yorqinlikni yoqtiradiganlar uchun"
    } else {
        ElbigInner.style.colorScheme = "unset"
        Elbody.classList.remove("active");
        ElmodeImg.src = "./assets/icons/moon_light.svg";
        ElmodeText.textContent = "Qorong'i rejim";
        Elbtn.title = "Qorong'i rejim ko'zingiz uchun qulayroq bo'lishi mumkin"
    }
  
    localStorage.setItem("data", mode_data); 
  });

// Date change
setInterval(() => {
  
  const time = new Date();
    
    let hours = time.getHours();
    let minuts = time.getMinutes();
    let seconds = time.getSeconds();  
    
    if(hours < 10){
        hours = "0" + hours;
    }
    
    if(minuts < 10){
        minuts = "0" + minuts;
    }
    
    if(seconds < 10){
        seconds = "0" + seconds;
    }
    
    Eldate.textContent = `${hours}:${minuts}:${seconds}`
    
},1000);

// RenderDayFn
function RenderDay(piece) {
    Eltime.innerHTML = "";
    Elday.innerHTML = "";
    Eltime.textContent = piece.date;
    Elday.textContent = piece.weekday;
}

// GetDatFn
async function getData(url) {
  try {
      const res = await fetch(url)
      const data = await res.json(); 
      RenderDay(data)
      RenderList(data, Elinner)
  } catch (error) {
      Elservices.innerHTML = "Not found 404"
      console.log(error);
    
}};

getData(`https://islomapi.uz/api/present/day?region=Toshkent`);

// RenderListFn
function RenderList(piece, inner) {
    inner.innerHTML = ""
    try {
      tempClone.querySelector(".js-pray-time-first").textContent = piece.times.tong_saharlik;
      tempClone.querySelector(".js-pray-time-second").textContent = piece.times.peshin;
      tempClone.querySelector(".js-pray-time-third").textContent = piece.times.asr;
      tempClone.querySelector(".js-pray-time-fourth").textContent = piece.times.shom_iftor;
      tempClone.querySelector(".js-pray-time-fifth").textContent = piece.times.hufton;
      docFrg.appendChild(tempClone)
      inner.appendChild(docFrg)
    }
    catch (error) {
      inner.innerHTML = "";
    }
}
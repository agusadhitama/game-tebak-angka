// ===============================
// NEURAL NETWORK BACKGROUND
// ===============================

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let nodes = [];

for (let i = 0; i < 70; i++) {
nodes.push({
x: Math.random() * canvas.width,
y: Math.random() * canvas.height,
vx: (Math.random() - 0.5) * 0.6,
vy: (Math.random() - 0.5) * 0.6
});
}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

nodes.forEach(n=>{

n.x += n.vx;
n.y += n.vy;

if(n.x < 0 || n.x > canvas.width) n.vx *= -1;
if(n.y < 0 || n.y > canvas.height) n.vy *= -1;

let size = 2 + Math.sin(Date.now()*0.002 + n.x) * 1.5;

ctx.beginPath();
ctx.arc(n.x,n.y,size,0,Math.PI*2);
ctx.fillStyle="#00ffd5";
ctx.fill();

});

// draw connections
for(let i=0;i<nodes.length;i++){

for(let j=i+1;j<nodes.length;j++){

let dx = nodes[i].x - nodes[j].x;
let dy = nodes[i].y - nodes[j].y;
let dist = Math.sqrt(dx*dx + dy*dy);

if(dist < 120){

ctx.beginPath();
ctx.moveTo(nodes[i].x,nodes[i].y);
ctx.lineTo(nodes[j].x,nodes[j].y);

ctx.strokeStyle="rgba(0,255,213,"+(1-dist/120)+")";
ctx.stroke();

}

}

}

requestAnimationFrame(animate);

}

animate();


// ===============================
// AI EYE FOLLOW CURSOR
// ===============================

const pupils = document.querySelectorAll(".pupil");

document.addEventListener("mousemove",(e)=>{

pupils.forEach(p=>{

const eye = p.parentElement;
const rect = eye.getBoundingClientRect();

const x = rect.left + rect.width/2;
const y = rect.top + rect.height/2;

const angle = Math.atan2(e.clientY - y, e.clientX - x);

const radius = 12;

p.style.transform =
`translate(${Math.cos(angle)*radius}px,${Math.sin(angle)*radius}px)`;

});

});


// ===============================
// ADVANCED AI SYSTEM
// ===============================

let transitions = {};
let frequency = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0};

let history = [];

let percobaan = 0;
let menang = 0;
let kalah = 0;


// ===============================
// AI PREDICTION ENGINE
// ===============================

function predictNext(last){

let candidates = {};

// MARKOV TRANSITION
if(transitions[last]){

Object.entries(transitions[last]).forEach(([num,count])=>{

candidates[num] = (candidates[num] || 0) + count * 2;

});

}

// GLOBAL FREQUENCY
Object.entries(frequency).forEach(([num,count])=>{

candidates[num] = (candidates[num] || 0) + count;

});

// RANDOM BIAS
for(let i=1;i<=10;i++){

candidates[i] = (candidates[i] || 0) + Math.random()*0.3;

}

let sorted =
Object.entries(candidates).sort((a,b)=>b[1]-a[1]);

return parseInt(sorted[0][0]);

}


// ===============================
// AI SCANNING ANIMATION
// ===============================

function aiScan(callback){

const result = document.getElementById("result");

const scan = [
"MENGAKSES NEURAL NETWORK...",
"MENGANALISIS POLA OTAK...",
"MENGHITUNG PROBABILITAS...",
"PREDIKSI SIAP..."
];

let i = 0;

const interval = setInterval(()=>{

result.innerHTML = scan[i];

i++;

if(i === scan.length){

clearInterval(interval);
callback();

}

},200);

}


// ===============================
// GAME LOGIC
// ===============================

function analyzeNumber(){

const input = document.getElementById("angkaInput");
const result = document.getElementById("result");

const number = parseInt(input.value);

if(!number || number>10 || number<1){

result.innerHTML="MASUKKAN ANGKA 1-10";
return;

}

percobaan++;

let prediction;

if(history.length>0){

prediction = predictNext(history[history.length-1]);

}else{

prediction = Math.floor(Math.random()*10)+1;

}

aiScan(()=>{

result.innerHTML =
"ANGKA KAMU : "+number+
"<br>PREDIKSI AKU : "+prediction;

if(number == prediction){

kalah++;

result.innerHTML +=
"<br>AKU BERHASIL MEMBACA POLAMU 😈";

}else{

menang++;

result.innerHTML +=
"<br>KAMU BERHASIL MENGECOH AKU 🎉";

}

let confidence = Math.floor(Math.random()*40)+60;

result.innerHTML +=
"<br>CONFIDENCE LEVEL : "+confidence+"%";

document.getElementById("percobaan").innerText=percobaan;
document.getElementById("menang").innerText=menang;
document.getElementById("kalah").innerText=kalah;

});


// ===============================
// AI LEARNING
// ===============================

frequency[number]++;

if(history.length>0){

let last = history[history.length-1];

if(!transitions[last]) transitions[last]={};

if(!transitions[last][number])
transitions[last][number]=0;

transitions[last][number]++;

}

history.push(number);

input.value="";

}

document
.getElementById("tebakBtn")
.addEventListener("click",analyzeNumber);


// ===============================
// RESET GAME
// ===============================

document
.getElementById("resetBtn")
.addEventListener("click",()=>{

history=[];
transitions={};

frequency={1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0};

percobaan=0;
menang=0;
kalah=0;

document.getElementById("percobaan").innerText=0;
document.getElementById("menang").innerText=0;
document.getElementById("kalah").innerText=0;

document.getElementById("result").innerHTML =
"MOUZA MEMORY DI RESET";

});

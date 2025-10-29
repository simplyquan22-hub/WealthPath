// TYPING HERO EFFECT
const heroText="Your Journey Starts Today";
const typingElement=document.querySelector('.typing-text');
let index=0;
function typeHero(){ if(index<heroText.length){ typingElement.textContent+=heroText[index]; index++; setTimeout(typeHero,100); } }
typeHero();

// SCROLL REVEAL
const reveals=document.querySelectorAll('.reveal');
window.addEventListener('scroll',()=>{
  for(let i=0;i<reveals.length;i++){
    const windowHeight=window.innerHeight;
    const revealTop=reveals[i].getBoundingClientRect().top;
    const revealPoint=150;
    if(revealTop<windowHeight-revealPoint){ reveals[i].classList.add('active'); }
  }
});

// FAQ ACCORDION
document.querySelectorAll('.accordion-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{ btn.parentElement.classList.toggle('active'); });
});

// PARTICLES
const canvas=document.getElementById('particleCanvas');
const ctx=canvas.getContext('2d');
let particles=[];
function resizeCanvas(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight; }
resizeCanvas(); window.addEventListener('resize',resizeCanvas);

let particleCount=window.innerWidth<768?50:100;
for(let i=0;i<particleCount;i++){
  particles.push({ x:Math.random()*canvas.width, y:Math.random()*canvas.height, size:Math.random()*2+1, speedX:(Math.random()-0.5)*0.3, speedY:(Math.random()-0.5)*0.3, alpha:Math.random()*0.5+0.3 });
}
function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let p of particles){
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fillStyle=`rgba(212,175,55,${p.alpha})`; ctx.fill();
    p.x+=p.speedX; p.y+=p.speedY;
    if(p.x<0)p.x=canvas.width; if(p.x>canvas.width)p.x=0;
    if(p.y<0)p.y=canvas.height; if(p.y>canvas.height)p.y=0;
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();
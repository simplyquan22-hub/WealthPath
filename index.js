// Scroll Reveal
const reveals = document.querySelectorAll('.reveal');
window.addEventListener('scroll', ()=>{
  for(const element of reveals){
    const windowHeight = window.innerHeight;
    const revealTop = element.getBoundingClientRect().top;
    const revealPoint = 120;
    if(revealTop < windowHeight - revealPoint){
      element.classList.add('active');
    }
  }
});

// Difference List Stagger
const diffItems = document.querySelectorAll('.difference-list li');
diffItems.forEach((item, index)=>{
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        setTimeout(()=> item.classList.add('active'), index*200);
      }
    });
  });
  observer.observe(item);
});

// Hero Dynamic Word Typing
const words = ["Starts", "Begins", "Unfolds"];
let i = 0;
const dynamicWord = document.getElementById('dynamic-word');
setInterval(()=>{
  i = (i+1)%words.length;
  dynamicWord.textContent = words[i];
},2500);

// Floating Particles
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particlesArray;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', ()=>{ 
  canvas.width=window.innerWidth; 
  canvas.height=window.innerHeight; 
  init(); 
});

class Particle{
  constructor(){
    this.x=Math.random()*canvas.width;
    this.y=Math.random()*canvas.height;
    this.size=Math.random()*1.5+0.5;
    this.speedX=Math.random()*0.2-0.1;
    this.speedY=Math.random()*0.2-0.1;
    this.opacity=Math.random()*0.6+0.2;
  }
  update(){
    this.x+=this.speedX;
    this.y+=this.speedY;
    if(this.x>canvas.width||this.x<0) this.speedX*=-1;
    if(this.y>canvas.height||this.y<0) this.speedY*=-1;
  }
  draw(){
    ctx.fillStyle = `rgba(212,175,55,${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
  }
}

function init(){
  particlesArray=[];
  const numParticles = Math.floor(window.innerWidth/8);
  for(let i=0;i<numParticles;i++){
    particlesArray.push(new Particle());
  }
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p=>{p.update();p.draw();});
  requestAnimationFrame(animate);
}
init(); 
animate();

// Glass Card Tilt Effect
document.querySelectorAll('.glass-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const rect=card.getBoundingClientRect();
    const x=e.clientX-rect.left;
    const y=e.clientY-rect.top;
    const centerX=rect.width/2;
    const centerY=rect.height/2;
    const rotateX=(y-centerY)/centerY*6;
    const rotateY=(x-centerX)/centerX*-6;
    card.style.transform=`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });
  card.addEventListener('mouseleave',()=>{ 
    card.style.transform='rotateX(0deg) rotateY(0deg) scale(1)'; 
  });
});

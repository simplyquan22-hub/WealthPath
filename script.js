// Scroll reveal animation
const reveals = document.querySelectorAll('.reveal');
window.addEventListener('scroll', () => {
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const revealTop = el.getBoundingClientRect().top;
    const revealPoint = 150;
    if(revealTop < windowHeight - revealPoint) {
      el.classList.add('active');
    }
  });
});

// Floating gold particles
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

for(let i=0; i<60; i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    size: Math.random()*2+0.5,
    speedX: (Math.random()-0.5)*0.3,
    speedY: (Math.random()-0.5)*0.3,
    opacity: Math.random()*0.6+0.2
  });
}

function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
    ctx.fillStyle = `rgba(212,175,55,${p.opacity})`;
    ctx.fill();
    p.x += p.speedX;
    p.y += p.speedY;
    if(p.x<0)p.x=canvas.width;
    if(p.x>canvas.width)p.x=0;
    if(p.y<0)p.y=canvas.height;
    if(p.y>canvas.height)p.y=0;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
// -------------------- SCROLL FADE-IN --------------------
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100){
      section.style.opacity = 1;
      section.style.transform = 'translateY(0)';
    }
  });
});

// Initial state
sections.forEach(section => {
  section.style.opacity = 0;
  section.style.transform = 'translateY(50px)';
  section.style.transition = 'all 0.8s ease-out';
});

// -------------------- FLOATING PARTICLES --------------------
const particleCount = 50;
const bg = document.querySelector('.animated-bg');

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  particle.style.left = Math.random() * 100 + 'vw';
  particle.style.top = Math.random() * 100 + 'vh';
  particle.style.width = Math.random() * 4 + 2 + 'px';
  particle.style.height = particle.style.width;
  particle.style.animationDuration = 5 + Math.random() * 5 + 's';
  particle.style.animationDelay = Math.random() * 5 + 's';
  bg.appendChild(particle);
}

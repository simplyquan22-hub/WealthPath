document.addEventListener('DOMContentLoaded', () => {

  /* ===================== HERO DYNAMIC WORD ===================== */
  const words = ["Starts", "Begins", "Unfolds"];
  let i = 0;
  const dynamicWord = document.getElementById('dynamic-word');
  if (dynamicWord) {
    setInterval(() => {
      i = (i + 1) % words.length;
      dynamicWord.textContent = words[i];
    }, 2500);
  }

  /* ===================== SCROLL REVEAL ===================== */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    window.addEventListener('scroll', () => {
      for (const element of reveals) {
        const windowHeight = window.innerHeight;
        const revealTop = element.getBoundingClientRect().top;
        const revealPoint = 120;
        if (revealTop < windowHeight - revealPoint) {
          element.classList.add('active');
        }
      }
    });
    // Trigger reveal on load in case some elements are visible immediately
    window.dispatchEvent(new Event('scroll'));
  }

  /* ===================== DIFFERENCE LIST STAGGER ===================== */
  const diffItems = document.querySelectorAll('.difference-list li');
  if (diffItems.length > 0) {
    diffItems.forEach((item, index) => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => item.classList.add('active'), index * 200);
          }
        });
      });
      observer.observe(item);
    });
  }

  /* ===================== GLASS CARD TILT ===================== */
  const glassCards = document.querySelectorAll('.glass-card');
  if (glassCards.length > 0) {
    glassCards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * 6;
        const rotateY = (x - centerX) / centerX * -6;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      });
    });
  }

  /* ===================== PARTICLES CANVAS ===================== */
  const canvas = document.getElementById('particles');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    }
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        this.opacity = Math.random() * 0.6 + 0.2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = `rgba(212,175,55,${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particlesArray = [];
      const numParticles = Math.floor(window.innerWidth / 8);
      for (let i = 0; i < numParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    animateParticles();
  }

});
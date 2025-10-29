document.addEventListener('DOMContentLoaded', () => {

  /* ====== HERO DYNAMIC WORD ====== */
  const words = ["Starts", "Begins", "Unfolds"];
  let i = 0;
  const dynamicWord = document.getElementById('dynamic-word');
  if (dynamicWord) {
    setInterval(() => {
      i = (i + 1) % words.length;
      dynamicWord.textContent = words[i];
    }, 2500);
  }

  /* ====== SCROLL REVEAL ====== */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      reveals.forEach(el => {
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 120) el.classList.add('active');
      });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // trigger on load
  }

  /* ====== DIFFERENCE LIST STAGGER ====== */
  const diffItems = document.querySelectorAll('.difference-list li');
  if (diffItems.length) {
    diffItems.forEach((item, idx) => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setTimeout(() => item.classList.add('active'), idx * 200);
        });
      });
      observer.observe(item);
    });
  }

  /* ====== GLASS CARD TILT (DESKTOP ONLY) ====== */
  if (window.innerWidth >= 768) {
    document.querySelectorAll('.glass-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height/2) / (rect.height/2)) * 6;
        const rotateY = ((x - rect.width/2) / (rect.width/2)) * -6;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      });
      card.addEventListener('mouseleave', () => card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)');
    });
  }

  /* ====== PARTICLES CANVAS ====== */
  const canvas = document.getElementById('particles');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    const isMobile = window.innerWidth < 768;
    const numParticles = isMobile ? 20 : Math.floor(window.innerWidth / 8);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

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
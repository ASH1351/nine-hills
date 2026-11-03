/**
 * Nine Hills Family Salon - Fairy Lights & Ambient Sparkle Canvas
 * Lightweight, GPU-friendly incandescent bokeh and twinkling light particles.
 * Automatically halts when out of viewport or when prefers-reduced-motion is detected.
 */

(function () {
  const canvas = document.getElementById('fairy-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let isRunning = false;

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    canvas.style.display = 'none';
    return;
  }

  let width = (canvas.width = canvas.offsetWidth);
  let height = (canvas.height = canvas.offsetHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    initParticles();
  });

  const particleCount = window.innerWidth < 768 ? 22 : 45;
  const particles = [];

  class FairyParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.radius = Math.random() * 2.5 + 1.2;
      this.baseAlpha = Math.random() * 0.45 + 0.25;
      this.alpha = this.baseAlpha;
      this.twinkleSpeed = Math.random() * 0.025 + 0.01;
      this.twinklePhase = Math.random() * Math.PI * 2;
      this.speedY = -(Math.random() * 0.45 + 0.15);
      this.speedX = (Math.random() - 0.5) * 0.3;
      // Gold & Warm Fairy Light Hues
      const hues = [
        { r: 255, g: 242, b: 189 }, // Warm cream light
        { r: 243, g: 226, b: 160 }, // Shimmer champagne
        { r: 212, g: 175, b: 55 },  // Regal gold
        { r: 255, g: 215, b: 120 }  // Amber glow
      ];
      this.color = hues[Math.floor(Math.random() * hues.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.twinklePhase += this.twinkleSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.twinklePhase) * 0.28;
      if (this.alpha < 0.05) this.alpha = 0.05;

      if (this.y < -15 || this.x < -15 || this.x > width + 15) {
        this.reset();
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`;
      ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * 1.2})`;
      ctx.shadowBlur = this.radius * 7;
      ctx.fill();
      ctx.restore();
    }
  }

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new FairyParticle());
    }
  }

  function animate() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(ctx);
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  // Optimize performance: only run when visible in viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isRunning) {
            isRunning = true;
            animate();
          }
        } else {
          isRunning = false;
          cancelAnimationFrame(animationFrameId);
        }
      });
    },
    { threshold: 0.1 }
  );

  initParticles();
  isRunning = true;
  animate();
  observer.observe(canvas);
})();

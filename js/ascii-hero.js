document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'hero-canvas';
  hero.insertBefore(canvas, hero.firstChild);

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const chars = '01{}[]/\\|<>#';
  
  // Mouse position relative to canvas
  let mouse = { x: -1000, y: -1000 };
  let isHovering = false;

  function init() {
    resize();
    createParticles();
    animate();
  }

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    width = hero.clientWidth;
    height = hero.clientHeight;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }

  function createParticles() {
    particles = [];
    // Particle count scales with screen width
    const count = Math.floor(width / 20);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        char: chars[Math.floor(Math.random() * chars.length)],
        speed: 0.2 + Math.random() * 0.5,
        opacity: 0.1 + Math.random() * 0.3,
        size: 10 + Math.random() * 10,
        baseX: 0,
        baseY: 0
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.font = '14px "JetBrains Mono"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    particles.forEach(p => {
      // Move upwards slowly
      p.y -= p.speed;
      
      // Reset at top
      if (p.y < -20) {
        p.y = height + 20;
        p.x = Math.random() * width;
      }

      // Repulsion logic
      let dx = mouse.x - p.x;
      let dy = mouse.y - p.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      
      let drawX = p.x;
      let drawY = p.y;

      if (dist < 150) {
        // Push away
        const force = (150 - dist) / 150;
        drawX -= (dx / dist) * force * 20;
        drawY -= (dy / dist) * force * 20;
        ctx.fillStyle = `rgba(200, 184, 154, ${p.opacity + 0.2})`; // var(--color-accent)
      } else {
        ctx.fillStyle = `rgba(240, 240, 238, ${p.opacity})`; // var(--color-text-primary)
      }

      ctx.font = `${p.size}px "JetBrains Mono"`;
      ctx.fillText(p.char, drawX, drawY);
    });

    requestAnimationFrame(animate);
  }

  hero.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  hero.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  init();
});

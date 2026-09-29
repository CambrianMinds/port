document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('diaclectics-demo-container');
  if (!container) return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  container.appendChild(canvas);

  let width, height;
  
  function resize() {
    // Fit parent width, maintain fixed height
    width = container.clientWidth;
    height = 250;
    
    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    draw();
  }

  // State
  // Dot position in logical space (0 to 1)
  let dot = { x: 0.2, y: 0.2 }; 
  let isDragging = false;
  let intercepted = false;

  // Math config
  const alpha = 4.0;
  const beta = 5.0;
  const evidenceWeight = 0.5; // Constant for this demo
  
  // RCI Formula: RCI = sqrt(T) * sigmoid(alpha*C - beta*We)
  // Tension (T) is Y-axis, Concession (C) is X-axis
  function calculateRCI(c, t) {
    const sigmoid = 1 / (1 + Math.exp(-(alpha * c - beta * evidenceWeight)));
    return Math.sqrt(t) * sigmoid;
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    
    // Colors based on theme tokens
    const colorMuted = '#444440';
    const colorAccent = '#c8b89a';
    const colorRed = '#ef4444'; // Intercept warning
    const colorText = '#f0f0ee';

    // 1. Draw Grid
    ctx.strokeStyle = '#1e1e22'; // var(--color-border)
    ctx.lineWidth = 1;
    for(let i=0; i<=10; i++) {
      // vertical
      ctx.beginPath();
      ctx.moveTo(i*(width/10), 0);
      ctx.lineTo(i*(width/10), height);
      ctx.stroke();
      // horizontal
      ctx.beginPath();
      ctx.moveTo(0, i*(height/10));
      ctx.lineTo(width, i*(height/10));
      ctx.stroke();
    }

    // 2. Draw Danger Zone Shading (RCI >= 0.5)
    // We sample a grid to create a visual contour
    ctx.fillStyle = 'rgba(239, 68, 68, 0.05)';
    const resolution = 20;
    for(let x=0; x<width; x+=resolution) {
      for(let y=0; y<height; y+=resolution) {
        // Map pixel to 0..1 space (Y is inverted physically vs mathematically, let's treat top as high tension)
        const mathX = x / width;
        const mathY = 1.0 - (y / height); // Bottom is 0, Top is 1
        
        if (calculateRCI(mathX, mathY) >= 0.5) {
          ctx.fillRect(x, y, resolution, resolution);
        }
      }
    }

    // 3. Draw Labels
    ctx.fillStyle = colorMuted;
    ctx.font = '10px "JetBrains Mono"';
    ctx.fillText("TENSION (T)", 10, 20);
    ctx.fillText("CONCESSION (C)", width - 100, height - 10);

    // Calculate current RCI based on physical dot position
    const mathDotX = dot.x;
    const mathDotY = 1.0 - dot.y;
    const currentRCI = calculateRCI(mathDotX, mathDotY);
    intercepted = currentRCI >= 0.5;

    // 4. Draw Status Text
    ctx.fillStyle = intercepted ? colorRed : colorAccent;
    ctx.font = '14px "JetBrains Mono"';
    ctx.fillText(`RCI: ${currentRCI.toFixed(2)}`, 10, height - 10);
    
    if (intercepted) {
      ctx.font = 'bold 16px "JetBrains Mono"';
      ctx.fillText("[ PRE-EMISSION INTERCEPTED ]", width / 2 - 120, 30);
    }

    // 5. Draw the Dot
    const physicalX = dot.x * width;
    const physicalY = dot.y * height;

    // Draw pulse if intercepted
    if (intercepted) {
      ctx.beginPath();
      ctx.arc(physicalX, physicalY, 12 + Math.sin(Date.now()/100)*4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(physicalX, physicalY, 8, 0, Math.PI * 2);
    ctx.fillStyle = intercepted ? colorRed : colorAccent;
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Loop if intercepted for pulse animation
    if(intercepted) {
      requestAnimationFrame(draw);
    }
  }

  // Mouse Interaction
  function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / width,
      y: (e.clientY - rect.top) / height
    };
  }

  canvas.addEventListener('mousedown', (e) => {
    const pos = getMousePos(e);
    // Check if clicked near dot
    const dist = Math.hypot((pos.x - dot.x) * width, (pos.y - dot.y) * height);
    if (dist < 20) {
      isDragging = true;
      document.body.style.cursor = 'grabbing';
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const pos = getMousePos(e);
      // Clamp to 0..1
      dot.x = Math.max(0, Math.min(1, pos.x));
      dot.y = Math.max(0, Math.min(1, pos.y));
      draw(); // Render loop
    }
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      document.body.style.cursor = 'default';
      draw(); // Render one last time in case pulse was active
    }
  });

  // Touch support
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const pos = getMousePos(touch);
    const dist = Math.hypot((pos.x - dot.x) * width, (pos.y - dot.y) * height);
    if (dist < 30) isDragging = true;
  });
  
  window.addEventListener('touchmove', (e) => {
    if (isDragging) {
      const pos = getMousePos(e.touches[0]);
      dot.x = Math.max(0, Math.min(1, pos.x));
      dot.y = Math.max(0, Math.min(1, pos.y));
      draw();
    }
  }, { passive: false });
  
  window.addEventListener('touchend', () => { isDragging = false; });

  // Init
  window.addEventListener('resize', resize);
  resize(); // Calls draw()
});

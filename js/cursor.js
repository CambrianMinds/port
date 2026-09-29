document.addEventListener('DOMContentLoaded', () => {
  // Only enable custom cursor if on a non-touch device and reduced-motion is not requested
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (isTouchDevice || prefersReduced) return;

  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  document.body.appendChild(cursor);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  // Smoothing factor
  const speed = 0.15;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Show cursor on first move
    if (cursor.style.opacity === '') {
      cursor.style.opacity = '1';
    }
  });

  // Animation loop
  function animate() {
    // LERP (Linear Interpolation) for smooth trailing effect
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    // Offset by half the width/height to center (cursor is 32x32, so -16)
    cursor.style.transform = `translate(${cursorX - 16}px, ${cursorY - 16}px)`;
    
    requestAnimationFrame(animate);
  }
  
  requestAnimationFrame(animate);

  // Add hover state for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, details summary');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
});

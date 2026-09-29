document.addEventListener('DOMContentLoaded', () => {
  // Only enable on non-touch devices and if reduced motion is not preferred
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouchDevice || prefersReduced) return;

  const magneticElements = document.querySelectorAll('.nav-cta, .btn-text');

  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const h = rect.width / 2;
      const v = rect.height / 2;
      
      // Calculate distance from center
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - v;
      
      // Magnetic pull strength (lower is weaker)
      const pull = 0.3;
      
      el.style.transform = `translate(${x * pull}px, ${y * pull}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = `translate(0px, 0px)`;
      // Optional: Add a transition for snapping back smoothly
      el.style.transition = `transform var(--duration-normal) var(--ease-out-expo)`;
      
      // Remove transition after it completes so mousemove is instantaneous
      setTimeout(() => {
        el.style.transition = '';
      }, 240); // matches --duration-normal
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Only run if user hasn't requested reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReduced) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.revealed = 'true';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
  } else {
    // If reduced motion is on, reveal everything immediately
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.dataset.revealed = 'true';
    });
  }

  // Scroll indicator hide on first scroll
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    const hideIndicator = () => {
      if (window.scrollY > 50) {
        scrollIndicator.classList.add('hidden');
        window.removeEventListener('scroll', hideIndicator);
      }
    };
    window.addEventListener('scroll', hideIndicator, { passive: true });
  }
});

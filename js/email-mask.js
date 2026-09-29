document.addEventListener('DOMContentLoaded', () => {
  const emailLinks = document.querySelectorAll('.email-mask');
  
  emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const user = link.getAttribute('data-e1');
      const domain = link.getAttribute('data-e2');
      if (user && domain) {
        window.location.href = `mailto:${user}@${domain}`;
      }
    });
  });
});

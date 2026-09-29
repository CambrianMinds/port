document.addEventListener('DOMContentLoaded', () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|:;"<>,.?/~';
  
  document.querySelectorAll('.stack-tag').forEach(tag => {
    // Store the original text content
    const originalText = tag.textContent;
    let scrambleInterval;
    let isHovering = false;

    tag.addEventListener('mouseenter', () => {
      isHovering = true;
      let iteration = 0;
      
      clearInterval(scrambleInterval);
      
      scrambleInterval = setInterval(() => {
        tag.textContent = originalText
          .split('')
          .map((letter, index) => {
            if(index < iteration) {
              return originalText[index];
            }
            // Preserve spaces
            if (letter === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        
        // Adjust speed of resolving characters
        if(iteration >= originalText.length) {
          clearInterval(scrambleInterval);
          tag.textContent = originalText;
        }
        
        iteration += 1 / 2; // Decrypts 1 character every 2 ticks
      }, 30);
    });

    tag.addEventListener('mouseleave', () => {
      isHovering = false;
      clearInterval(scrambleInterval);
      tag.textContent = originalText;
    });
  });
});

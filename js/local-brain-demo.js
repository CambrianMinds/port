document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn-load-model');
  const vramFill = document.getElementById('vram-fill');
  const sramFill = document.getElementById('sram-fill');
  
  if (!btn || !vramFill || !sramFill) return;

  let isLoaded = false;

  btn.addEventListener('click', () => {
    if (isLoaded) {
      // Reset
      vramFill.style.width = '0%';
      sramFill.style.width = '0%';
      vramFill.classList.remove('warning');
      btn.textContent = 'Load Gemma-4 E2B';
      isLoaded = false;
    } else {
      // Load Sequence
      btn.textContent = 'Allocating Tensors...';
      
      // Step 1: VRAM fills rapidly
      setTimeout(() => {
        vramFill.style.width = '100%';
        vramFill.classList.add('warning'); // Flashes orange/red to indicate saturation
      }, 100);

      // Step 2: Spillover to SRAM
      setTimeout(() => {
        sramFill.style.width = '35%'; // Arbitrary fill level to represent overflow
        btn.textContent = 'Unload Engine';
        isLoaded = true;
      }, 800);
    }
  });
});

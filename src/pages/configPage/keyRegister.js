document.querySelectorAll('.input-section').forEach(function(input) {
    input.addEventListener('keydown', function(event) {
      const keyCombination = [];
      
      if (event.ctrlKey) {
        keyCombination.push('Ctrl');
      }
      if (event.altKey) {
        keyCombination.push('Alt');
      }
      if (event.shiftKey) {
        keyCombination.push('Shift');
      }

      const key = event.key.toUpperCase();
      if (!['CONTROL', 'ALT', 'SHIFT'].includes(key)) {
        keyCombination.push(key);
      }

      this.value = keyCombination.join('+');
      event.preventDefault();
    });
  });
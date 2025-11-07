document.getElementById('mobile-menu-button').addEventListener('click', function () {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', function (e) {
  const menu = document.getElementById('mobile-menu');
  const button = document.getElementById('mobile-menu-button');
  if (!button.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.add('hidden');
  }
});

tailwind.config = {
  theme: {
    extend: {
      colors: {
        navy: '#0f172a',      // Azul marino oscuro
        primary: '#0b6bc5',   // Azul institucional (opcional)
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'xl': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    }
  }
}
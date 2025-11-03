  // Script para efecto de scroll en la navbar
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Script para marcar la página actual como activa
  document.addEventListener("DOMContentLoaded", function () {
    const currentLocation = location.pathname;
    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach((item) => {
      const navLink = item.querySelector(".nav-link");
      if (navLink && navLink.getAttribute("href") === currentLocation) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  });
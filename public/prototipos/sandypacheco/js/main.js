/* Menú móvil: abre y cierra la navegación principal */
(function () {
  var menu = document.querySelector('[data-menu]');
  var button = document.querySelector('[data-menu-btn]');
  if (!menu || !button) return;

  button.addEventListener('click', function () {
    var isOpen = menu.classList.toggle('open');
    button.setAttribute('aria-expanded', isOpen);
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
    });
  });
})();

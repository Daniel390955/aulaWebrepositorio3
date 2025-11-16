(function (window, document) {
  var app = document.getElementById('app');
  var hamb = document.getElementById('hamburger-btn');
  var menu = document.getElementById('main-menu');

  function ajustarMenuInicial() {
    if (!menu) return;
    if (window.innerWidth <= 768) {
      menu.classList.remove('mobile-open');
      menu.style.display = 'none';
    } else {
      menu.style.display = 'flex';
    }
  }

  function alternarMenu(evento) {
    if (!menu) return;
    evento.stopPropagation();
    if (menu.classList.contains('mobile-open')) {
      menu.classList.remove('mobile-open');
      menu.style.display = 'none';
    } else {
      menu.classList.add('mobile-open');
      menu.style.display = 'flex';
    }
  }

  function fecharMenu(evento) {
    if (!menu || !hamb) return;
    if (
      window.innerWidth <= 768 &&
      !menu.contains(evento.target) &&
      !hamb.contains(evento.target)
    ) {
      menu.classList.remove('mobile-open');
      menu.style.display = 'none';
    }
  }

  function marcarLinkAtivo(rota) {
    if (!menu) return;
    Array.prototype.forEach.call(
      menu.querySelectorAll('a'),
      function (link) {
        link.classList.remove('ativo');
        var href = link.getAttribute('href') || '';
        if (
          (rota === 'inicio' && href.indexOf('#inicio') !== -1) ||
          (rota === 'projetos' && href.indexOf('#projetos') !== -1) ||
          (rota === 'cadastro' && href.indexOf('#cadastro') !== -1)
        ) {
          link.classList.add('ativo');
        }
      }
    );
  }

  function renderizarRota(rota) {
    if (!app || !window.Templates) return;

    if (rota === 'projetos') {
      app.innerHTML = window.Templates.projetos;
    } else if (rota === 'cadastro') {
      app.innerHTML = window.Templates.cadastro;
      if (window.inicializarFormularioCadastro) {
        window.inicializarFormularioCadastro();
      }
    } else {
      app.innerHTML = window.Templates.inicio;
    }

    marcarLinkAtivo(rota);
  }

  function obterRotaAtual() {
    var hash = window.location.hash || '#inicio';
    hash = hash.replace('#', '');
    if (hash === 'projetos') return 'projetos';
    if (hash === 'cadastro') return 'cadastro';
    return 'inicio';
  }

  function aoMudarHash() {
    renderizarRota(obterRotaAtual());
  }

  function configurarEventosMenu() {
    if (!menu) return;

    Array.prototype.forEach.call(
      document.querySelectorAll('.menu a'),
      function (link) {
        link.addEventListener('click', function () {
          if (window.innerWidth <= 768 && menu) {
            menu.classList.remove('mobile-open');
            menu.style.display = 'none';
          }
        });
      }
    );
  }

  function iniciar() {
    ajustarMenuInicial();
    configurarEventosMenu();
    renderizarRota(obterRotaAtual());

    if (hamb) {
      hamb.addEventListener('click', alternarMenu);
    }
    document.addEventListener('click', fecharMenu);
    window.addEventListener('resize', ajustarMenuInicial);
    window.addEventListener('hashchange', aoMudarHash);
  }

  document.addEventListener('DOMContentLoaded', iniciar);
})(window, document);

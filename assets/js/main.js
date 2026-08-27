// Fecha as outras perguntas do FAQ quando uma abre.
document.addEventListener('DOMContentLoaded', function () {
  var itens = document.querySelectorAll('.item-faq');
  itens.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        itens.forEach(function (outro) {
          if (outro !== item) outro.open = false;
        });
      }
    });
  });
});

// Hero split: as duas fotos se abrem conforme rola a pagina.
(function () {
  var secao = document.querySelector('.hero-split');
  if (!secao) return;
  var esq = secao.querySelector('.painel-esq');
  var dir = secao.querySelector('.painel-dir');
  var reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ativo() {
    return !reduzido && window.innerWidth > 720;
  }

  function atualizar() {
    if (!ativo()) {
      esq.style.transform = '';
      dir.style.transform = '';
      return;
    }
    var alturaScroll = secao.offsetHeight - window.innerHeight;
    var topo = secao.getBoundingClientRect().top;
    var progresso = alturaScroll > 0 ? Math.min(Math.max(-topo / alturaScroll, 0), 1) : 0;
    var deslocamento = (progresso * 24).toFixed(2);
    esq.style.transform = 'translateX(-' + deslocamento + 'vw)';
    dir.style.transform = 'translateX(' + deslocamento + 'vw)';
  }

  document.addEventListener('scroll', atualizar, { passive: true });
  window.addEventListener('resize', atualizar);
  atualizar();
})();

// Header: vidro escuro sobre o hero, vidro claro depois que rola.
(function () {
  var header = document.querySelector('.header');
  if (!header) return;
  function atualizar() {
    header.classList.toggle('header-solido', window.scrollY > 40);
  }
  document.addEventListener('scroll', atualizar, { passive: true });
  atualizar();
})();

// Menu mobile: abre/fecha o painel de navegacao.
(function () {
  var botao = document.getElementById('botao-menu');
  var menu = document.getElementById('menu-nav');
  if (!botao || !menu) return;

  function fechar() {
    menu.classList.remove('aberto');
    botao.setAttribute('aria-expanded', 'false');
  }
  function alternar() {
    var aberto = menu.classList.toggle('aberto');
    botao.setAttribute('aria-expanded', String(aberto));
  }

  botao.addEventListener('click', alternar);
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', fechar);
  });
  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape') fechar();
  });
})();

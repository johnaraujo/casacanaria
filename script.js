/* ==========================================================================
   Casa Canária — interações da página
   ========================================================================== */

/* --------------------------------------------------------------------------
   CONFIGURAÇÃO — edite apenas estas duas linhas
   -------------------------------------------------------------------------- */

// WhatsApp de contato, formato internacional só com números: 55 + DDD + número.
const WHATSAPP = '5582999767094';

const MENSAGEM_WHATSAPP = 'Olá! Vi o site da Casa Canária e gostaria de saber sobre a disponibilidade.';

/* --------------------------------------------------------------------------
   Fotos da galeria
   -------------------------------------------------------------------------- */

const FOTOS = [
  ['03-area-gourmet',        'Área gourmet com vista para a piscina'],
  ['01-piscina-coqueiros',   'Piscina cercada de coqueiros'],
  ['02-jardim-arvore',       'Jardim com árvore frondosa e piscina'],
  ['04-piscina-jardim',      'Piscina em meio ao jardim tropical'],
  ['05-espreguicadeiras',    'Espreguiçadeiras e guarda-sol na beira da piscina'],
  ['06-area-lazer',          'Área de lazer coberta ao lado da piscina'],
  ['07-varanda-coberta',     'Varanda coberta ligada à sala'],
  ['08-estar-externo',       'Estar externo com poltronas de vime'],
  ['09-churrasqueira',       'Churrasqueira da área de lazer'],
  ['10-varanda-jantar',      'Mesa de jantar na varanda'],
  ['11-mesa-externa',        'Mesa externa de madeira'],
  ['12-mesa-posta',          'Mesa posta na área externa'],
  ['13-varanda',             'Varanda com mesa de madeira'],
  ['14-estar-externo-2',     'Ambiente de estar na área externa'],
  ['15-sala-vista-piscina',  'Sala com vista para a piscina'],
  ['16-sala-tv',             'Sala de estar com TV'],
  ['17-sala-ampla',          'Sala ampla integrada à varanda'],
  ['18-sala-sofa',           'Sofá da sala junto à porta da varanda'],
  ['19-sala-jantar',         'Mesa de jantar para seis pessoas'],
  ['20-sala-jantar-2',       'Sala de jantar integrada'],
  ['21-cozinha',             'Cozinha completa com bancada'],
  ['22-cozinha-bancada',     'Bancada da cozinha com banquetas'],
  ['23-cozinha-equipada',    'Cozinha equipada com geladeira e fogão'],
  ['24-cozinha-2',           'Cozinha com micro-ondas e utensílios'],
  ['25-quarto-casal',        'Quarto com cama de casal'],
  ['26-quarto-casal-2',      'Quarto de casal com janelas amplas'],
  ['27-quarto-casal-3',      'Quarto de casal com ar-condicionado'],
  ['28-quarto-solteiro',     'Quarto com camas de solteiro'],
  ['29-quarto-solteiro-2',   'Quarto com duas camas de solteiro'],
  ['30-banheiro',            'Banheiro com box e bancada de granito'],
  ['31-banheiro-2',          'Banheiro social'],
  ['32-lavabo',              'Lavabo'],
  ['33-entrada-jardim',      'Entrada com jardim e vista para o verde']
];

const VISIVEIS_INICIALMENTE = 8;

/* --------------------------------------------------------------------------
   Comodidades
   -------------------------------------------------------------------------- */

const ICONES = {
  piscina:  '<path d="M2 17c2 0 2 1.5 4 1.5S8 17 10 17s2 1.5 4 1.5S16 17 18 17s2 1.5 4 1.5"/><path d="M2 12.5c2 0 2 1.5 4 1.5s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5"/><path d="M7 14V5a2 2 0 0 1 4 0M13 14V5a2 2 0 0 1 4 0"/>',
  fogo:     '<path d="M3.5 6.5h17l-2.4 7.5H5.9z"/><path d="M7.6 14L5.5 21M16.4 14l2.1 7M6.6 17.5h10.8M8 3.5c0 1-1 1.3-1 2.3M12 3c0 1-1 1.3-1 2.3M16 3.5c0 1-1 1.3-1 2.3"/>',
  wifi:     '<path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M2 9a15 15 0 0 1 20 0"/><circle cx="12" cy="19.5" r="1"/>',
  ar:       '<rect x="2" y="4" width="20" height="9" rx="2"/><path d="M6 16.5v1.5M10 16.5v3M14 16.5v3M18 16.5v1.5M5.5 9h13"/>',
  cozinha:  '<path d="M7 3v8M4.5 3v4a2.5 2.5 0 0 0 5 0V3M7 11v10"/><path d="M16.5 3c-1.4 1-2 3-2 5.5s.8 3.5 2 3.5 2-1 2-3.5S17.9 4 16.5 3z"/><path d="M16.5 12v9"/>',
  tv:       '<rect x="2.5" y="4" width="19" height="12.5" rx="2"/><path d="M8 20.5h8M12 16.5v4"/>',
  lavar:    '<rect x="4" y="2.5" width="16" height="19" rx="2.5"/><circle cx="12" cy="14" r="4"/><circle cx="8" cy="6" r=".8"/><circle cx="11" cy="6" r=".8"/>',
  carro:    '<path d="M5 17h14M3.5 17v-4.5L5.5 7h13l2 5.5V17M3.5 17v2h3v-2M17.5 19h3v-2"/><path d="M3.5 12.5h17"/><circle cx="7.5" cy="14.5" r="1"/><circle cx="16.5" cy="14.5" r="1"/>',
  praia:    '<path d="M2 20c2 0 2-1.2 4-1.2s2 1.2 4 1.2 2-1.2 4-1.2 2 1.2 4 1.2 2-1.2 4-1.2"/><path d="M12.5 20V9"/><path d="M4 9h17c0-4-4-7-8.5-7C9 2 5.8 4.6 4 9z"/>',
  pet:      '<circle cx="7" cy="8" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="17" cy="8" r="2"/><path d="M12 11c-2.8 0-5 2.5-5 5 0 2 1.5 3 3 3 .9 0 1.4-.5 2-.5s1.1.5 2 .5c1.5 0 3-1 3-3 0-2.5-2.2-5-5-5z"/>',
  cerca:    '<path d="M4 21V9l3-3 3 3v12M14 21V9l3-3 3 3v12"/><path d="M2 12h20M2 16h20"/>',
  mesa:     '<path d="M3 9h18M4.5 9l-1 12M19.5 9l1 12M7.5 9v6M16.5 9v6"/><path d="M5 6h14a2 2 0 0 1 0 3H5a2 2 0 0 1 0-3z"/>',
  rede:     '<path d="M3.5 4v5.5M20.5 4v5.5"/><path d="M3.5 9c0 6.5 3.8 9.5 8.5 9.5s8.5-3 8.5-9.5"/><path d="M3.5 9h17M8 9.6v5.4M12 9.6v7M16 9.6v5.4"/>',
  chuveiro: '<path d="M12 3.5v3"/><path d="M6 10.5a6 6 0 0 1 12 0z"/><path d="M8 14v1.8M12 14v3M16 14v1.8M9.8 18.5v1.6M14.2 18.5v1.6"/>',
  cama:     '<path d="M2 18v-6.5A2.5 2.5 0 0 1 4.5 9H20a2 2 0 0 1 2 2v7"/><path d="M2 14.5h20M2 18v2M22 18v2"/><path d="M6 9V7a1.5 1.5 0 0 1 1.5-1.5h9A1.5 1.5 0 0 1 18 7v2"/>',
  ferro:    '<path d="M2.5 16.5c0-4.4 3.6-8 8-8h11v3c0 2.8-2.2 5-5 5h-14z"/><path d="M2.5 20h19"/><path d="M13 8.5V6a1.5 1.5 0 0 0-1.5-1.5h-3"/>',
  geladeira:'<rect x="5.5" y="2.5" width="13" height="19" rx="2.5"/><path d="M5.5 10h13M8.5 6v2M8.5 13v3"/>',
  porta:    '<path d="M5 21V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17"/><path d="M3 21h18"/><circle cx="15.5" cy="12.5" r="1"/>',
  planta:   '<path d="M12 21v-8"/><path d="M12 13c0-3.5-2.5-6-6-6 0 3.5 2.5 6 6 6z"/><path d="M12 13c0-4 2.8-7 6.5-7 0 4-2.8 7-6.5 7z"/><path d="M8 21h8"/>',
  banheiro: '<path d="M3.5 12.5h17v2a5 5 0 0 1-5 5h-7a5 5 0 0 1-5-5z"/><path d="M6.5 12.5V5.2A2.2 2.2 0 0 1 8.7 3c1.2 0 2.2 1 2.2 2.2"/><path d="M9 6.2h3.8M6 19.5l-1 1.7M18 19.5l1 1.7"/>',
  lavabo:   '<path d="M6 10.5h12v4.5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4z"/><path d="M12 19v2.2M9.5 21.5h5"/><path d="M12 10.5V7a2.5 2.5 0 0 1 2.5-2.5h1.8a1.7 1.7 0 0 1 1.7 1.7V8"/>',
  sol:      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/>'
};

const COMODIDADES = [
  ['piscina',   'Piscina privativa'],
  ['fogo',      'Churrasqueira e utensílios'],
  ['ar',        'Ar-condicionado em todos os quartos'],
  ['wifi',      'Wi-Fi'],
  ['cozinha',   'Cozinha completa e equipada'],
  ['geladeira', 'Geladeira, freezer e micro-ondas'],
  ['mesa',      'Mesa de jantar interna e externa'],
  ['tv',        'TV na sala'],
  ['lavar',     'Máquina de lavar'],
  ['ferro',     'Ferro de passar e varal'],
  ['cama',      'Roupa de cama, toalhas e itens básicos'],
  ['banheiro',  'Banheiro privativo em cada suíte'],
  ['lavabo',    'Lavabo com mictório na área externa'],
  ['carro',     'Estacionamento gratuito no local'],
  ['praia',     'Acesso à praia a 400 m'],
  ['cerca',     'Quintal privativo totalmente cercado'],
  ['rede',      'Rede e móveis na área externa'],
  ['chuveiro',  'Chuveiro externo'],
  ['planta',    'Vista para o jardim'],
  ['porta',     'Entrada privativa'],
  ['pet',       'Animais de estimação são bem-vindos'],
  ['sol',       'Área de jantar ao ar livre']
];

/* --------------------------------------------------------------------------
   Montagem da página
   -------------------------------------------------------------------------- */

document.querySelectorAll('[data-whatsapp]').forEach(function (a) {
  if (!WHATSAPP) { a.remove(); return; }
  a.href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(MENSAGEM_WHATSAPP);
  a.target = '_blank';
  a.rel = 'noopener';
});

// --- Comodidades ---
const listaComodidades = document.getElementById('comodidades-lista');
if (listaComodidades) {
  listaComodidades.innerHTML = COMODIDADES.map(function (c) {
    return '<li><svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONES[c[0]] || '') + '</svg><span>' + c[1] + '</span></li>';
  }).join('');
}

// --- Galeria ---
const galeria = document.getElementById('galeria');
const botaoVerMais = document.getElementById('verMaisFotos');

if (galeria) {
  galeria.innerHTML = FOTOS.map(function (f, i) {
    const oculto = i >= VISIVEIS_INICIALMENTE ? ' oculto' : '';
    return '<button class="galeria__item' + oculto + '" type="button" data-i="' + i + '" aria-label="Ampliar: ' + f[1] + '">' +
             '<img src="fotos/' + f[0] + '-sm.jpg" alt="' + f[1] + '" loading="' + (i < 4 ? 'eager' : 'lazy') + '" decoding="async">' +
           '</button>';
  }).join('');
}

if (botaoVerMais) {
  botaoVerMais.addEventListener('click', function () {
    const ocultos = galeria.querySelectorAll('.galeria__item.oculto');
    if (ocultos.length) {
      ocultos.forEach(function (el) { el.classList.remove('oculto'); });
      botaoVerMais.textContent = 'Mostrar menos';
    } else {
      galeria.querySelectorAll('.galeria__item').forEach(function (el, i) {
        if (i >= VISIVEIS_INICIALMENTE) el.classList.add('oculto');
      });
      botaoVerMais.textContent = 'Ver todas as fotos';
      document.getElementById('fotos').scrollIntoView({ block: 'start' });
    }
  });
}

/* --------------------------------------------------------------------------
   Lightbox
   -------------------------------------------------------------------------- */

const lightbox   = document.getElementById('lightbox');
const lbImagem   = document.getElementById('lbImagem');
const lbLegenda  = document.getElementById('lbLegenda');
const lbContador = document.getElementById('lbContador');
let indiceAtual  = 0;

function mostrarFoto(i) {
  indiceAtual = (i + FOTOS.length) % FOTOS.length;
  const foto = FOTOS[indiceAtual];
  lbImagem.src = 'fotos/' + foto[0] + '.jpg';
  lbImagem.alt = foto[1];
  lbLegenda.textContent = foto[1];
  lbContador.textContent = (indiceAtual + 1) + ' / ' + FOTOS.length;
  // pré-carrega vizinhas
  [indiceAtual + 1, indiceAtual - 1].forEach(function (n) {
    const v = FOTOS[(n + FOTOS.length) % FOTOS.length];
    new Image().src = 'fotos/' + v[0] + '.jpg';
  });
}

function abrirLightbox(i) {
  mostrarFoto(i);
  lightbox.hidden = false;
  document.body.classList.add('travado');
  requestAnimationFrame(function () { lightbox.classList.add('aberto'); });
  document.getElementById('lbFechar').focus();
}

function fecharLightbox() {
  lightbox.classList.remove('aberto');
  document.body.classList.remove('travado');
  setTimeout(function () { lightbox.hidden = true; lbImagem.src = ''; }, 250);
}

if (galeria) {
  galeria.addEventListener('click', function (e) {
    const item = e.target.closest('.galeria__item');
    if (item) abrirLightbox(Number(item.dataset.i));
  });
}

document.getElementById('lbFechar').addEventListener('click', fecharLightbox);
document.getElementById('lbAnterior').addEventListener('click', function () { mostrarFoto(indiceAtual - 1); });
document.getElementById('lbProxima').addEventListener('click', function () { mostrarFoto(indiceAtual + 1); });

lightbox.addEventListener('click', function (e) {
  if (e.target === lightbox || e.target.classList.contains('lightbox__palco')) fecharLightbox();
});

document.addEventListener('keydown', function (e) {
  if (lightbox.hidden) return;
  if (e.key === 'Escape') fecharLightbox();
  if (e.key === 'ArrowRight') mostrarFoto(indiceAtual + 1);
  if (e.key === 'ArrowLeft') mostrarFoto(indiceAtual - 1);
});

// deslizar com o dedo
let toqueX = 0, toqueY = 0;
lightbox.addEventListener('touchstart', function (e) {
  toqueX = e.changedTouches[0].clientX;
  toqueY = e.changedTouches[0].clientY;
}, { passive: true });

lightbox.addEventListener('touchend', function (e) {
  const dx = e.changedTouches[0].clientX - toqueX;
  const dy = e.changedTouches[0].clientY - toqueY;
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) {
    mostrarFoto(indiceAtual + (dx < 0 ? 1 : -1));
  } else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) {
    fecharLightbox();
  }
}, { passive: true });

/* --------------------------------------------------------------------------
   Topo fixo e barra mobile
   -------------------------------------------------------------------------- */

const topo = document.getElementById('topo');
const barraMobile = document.querySelector('.barra-mobile');
const hero = document.querySelector('.hero');

const observadorHero = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    const passou = !entrada.isIntersecting;
    topo.classList.toggle('visivel', passou);
    barraMobile.classList.toggle('visivel', passou);
  });
}, { rootMargin: '-70% 0px 0px 0px' });

if (hero) observadorHero.observe(hero);

/* --------------------------------------------------------------------------
   Animação de entrada das seções
   -------------------------------------------------------------------------- */

const alvos = document.querySelectorAll('.secao .envelope > *, .cta__caixa');
alvos.forEach(function (el) { el.classList.add('aparece'); });

const observadorEntrada = new IntersectionObserver(function (entradas, obs) {
  entradas.forEach(function (entrada) {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visto');
      obs.unobserve(entrada.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

alvos.forEach(function (el) { observadorEntrada.observe(el); });

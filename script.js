/* ==========================================================================
   Casa Canária — interações da página
   Um único script serve as três versões (pt-BR, en, es). O idioma vem do
   atributo lang do <html> e o prefixo dos arquivos, de data-base no <body>.
   ========================================================================== */

/* --------------------------------------------------------------------------
   CONFIGURAÇÃO — edite apenas esta linha
   -------------------------------------------------------------------------- */

// WhatsApp de contato, formato internacional só com números: 55 + DDD + número.
const WHATSAPP = '5582999767094';

/* -------------------------------------------------------------------------- */

const IDIOMA = (document.documentElement.lang || 'pt').slice(0, 2).toLowerCase();
const BASE = document.body.getAttribute('data-base') || '';
const L = ['pt', 'en', 'es'].indexOf(IDIOMA) >= 0 ? IDIOMA : 'pt';

/* --------------------------------------------------------------------------
   Textos da interface
   -------------------------------------------------------------------------- */

const UI = {
  pt: {
    verTodas: 'Ver todas as fotos',
    mostrarMenos: 'Mostrar menos',
    ampliar: 'Ampliar: ',
    mensagem: 'Olá! Vi o site da Casa Canária e gostaria de saber sobre a disponibilidade.'
  },
  en: {
    verTodas: 'See all photos',
    mostrarMenos: 'Show fewer',
    ampliar: 'Enlarge: ',
    mensagem: "Hi! I saw the Casa Canária website and I'd like to check availability."
  },
  es: {
    verTodas: 'Ver todas las fotos',
    mostrarMenos: 'Mostrar menos',
    ampliar: 'Ampliar: ',
    mensagem: '¡Hola! Vi el sitio de Casa Canária y me gustaría consultar la disponibilidad.'
  }
};

const T = UI[L];

/* --------------------------------------------------------------------------
   Fotos da galeria (arquivo + legenda em cada idioma)
   -------------------------------------------------------------------------- */

const ARQUIVOS = [
  '03-area-gourmet', '01-piscina-coqueiros', '02-jardim-arvore',
  '34-praia-areia', '35-praia-recifes',
  '04-piscina-jardim', '05-espreguicadeiras', '06-area-lazer',
  '07-varanda-coberta', '08-estar-externo', '09-churrasqueira',
  '10-varanda-jantar', '11-mesa-externa', '12-mesa-posta',
  '13-varanda', '14-estar-externo-2', '15-sala-vista-piscina',
  '16-sala-tv', '17-sala-ampla', '18-sala-sofa',
  '19-sala-jantar', '20-sala-jantar-2', '21-cozinha',
  '22-cozinha-bancada', '23-cozinha-equipada', '24-cozinha-2',
  '25-quarto-casal', '26-quarto-casal-2', '27-quarto-casal-3',
  '28-quarto-solteiro', '29-quarto-solteiro-2', '30-banheiro',
  '31-banheiro-2', '32-lavabo', '33-entrada-jardim'
];

const LEGENDAS = {
  pt: [
    'Área gourmet com vista para a piscina',
    'Piscina cercada de coqueiros',
    'Jardim com árvore frondosa e piscina',
    'A praia de Barra de São Miguel, a 400 m da casa',
    'Mar calmo protegido pelos recifes, em frente à casa',
    'Piscina em meio ao jardim tropical',
    'Espreguiçadeiras e guarda-sol na beira da piscina',
    'Área de lazer coberta ao lado da piscina',
    'Varanda coberta ligada à sala',
    'Estar externo com poltronas de vime',
    'Churrasqueira da área de lazer',
    'Mesa de jantar na varanda',
    'Mesa externa de madeira',
    'Mesa posta na área externa',
    'Varanda com mesa de madeira',
    'Ambiente de estar na área externa',
    'Sala com vista para a piscina',
    'Sala de estar com TV',
    'Sala ampla integrada à varanda',
    'Sofá da sala junto à porta da varanda',
    'Mesa de jantar para seis pessoas',
    'Sala de jantar integrada',
    'Cozinha completa com bancada',
    'Bancada da cozinha com banquetas',
    'Cozinha equipada com geladeira e fogão',
    'Cozinha com micro-ondas e utensílios',
    'Quarto com cama de casal',
    'Quarto de casal com janelas amplas',
    'Quarto de casal com ar-condicionado',
    'Quarto com camas de solteiro',
    'Quarto com duas camas de solteiro',
    'Banheiro com box e bancada de granito',
    'Banheiro social',
    'Lavabo',
    'Entrada com jardim e vista para o verde'
  ],
  en: [
    'Outdoor lounge overlooking the pool',
    'Pool surrounded by coconut palms',
    'Garden with a large shade tree and the pool',
    'Barra de São Miguel beach, 400 m from the house',
    'Calm sea sheltered by the reefs, right in front',
    'Pool set in the tropical garden',
    'Sun loungers and umbrella by the pool',
    'Covered lounge area next to the pool',
    'Covered veranda opening off the living room',
    'Outdoor sitting area with wicker armchairs',
    'Barbecue grill in the leisure area',
    'Dining table on the veranda',
    'Outdoor wooden table',
    'Table set in the outdoor area',
    'Veranda with a wooden table',
    'Sitting area outdoors',
    'Living room with a view of the pool',
    'Living room with TV',
    'Spacious living room opening onto the veranda',
    'Sofa by the veranda door',
    'Dining table for six',
    'Open-plan dining room',
    'Fully equipped kitchen with counter',
    'Kitchen counter with stools',
    'Kitchen with fridge and stove',
    'Kitchen with microwave and cookware',
    'Bedroom with a double bed',
    'Double bedroom with large windows',
    'Double bedroom with air conditioning',
    'Bedroom with single beds',
    'Bedroom with two single beds',
    'Bathroom with shower box and granite counter',
    'Guest bathroom',
    'Powder room',
    'Entrance with garden and greenery'
  ],
  es: [
    'Zona gourmet con vista a la piscina',
    'Piscina rodeada de cocoteros',
    'Jardín con árbol frondoso y piscina',
    'La playa de Barra de São Miguel, a 400 m de la casa',
    'Mar tranquilo protegido por los arrecifes, frente a la casa',
    'Piscina en medio del jardín tropical',
    'Tumbonas y sombrilla junto a la piscina',
    'Zona de ocio cubierta al lado de la piscina',
    'Terraza cubierta conectada al salón',
    'Zona de estar exterior con sillones de mimbre',
    'Parrilla de la zona de ocio',
    'Mesa de comedor en la terraza',
    'Mesa exterior de madera',
    'Mesa puesta en la zona exterior',
    'Terraza con mesa de madera',
    'Zona de estar al aire libre',
    'Salón con vista a la piscina',
    'Salón con televisión',
    'Salón amplio integrado a la terraza',
    'Sofá del salón junto a la puerta de la terraza',
    'Mesa de comedor para seis personas',
    'Comedor integrado',
    'Cocina completa con barra',
    'Barra de la cocina con taburetes',
    'Cocina equipada con nevera y cocina',
    'Cocina con microondas y utensilios',
    'Habitación con cama de matrimonio',
    'Habitación de matrimonio con ventanales',
    'Habitación de matrimonio con aire acondicionado',
    'Habitación con camas individuales',
    'Habitación con dos camas individuales',
    'Baño con ducha y encimera de granito',
    'Baño social',
    'Aseo',
    'Entrada con jardín y vista al verde'
  ]
};

const FOTOS = ARQUIVOS.map(function (arquivo, i) {
  return [arquivo, LEGENDAS[L][i]];
});

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
  banheiro: '<path d="M3.5 12.5h17v2a5 5 0 0 1-5 5h-7a5 5 0 0 1-5-5z"/><path d="M6.5 12.5V5.2A2.2 2.2 0 0 1 8.7 3c1.2 0 2.2 1 2.2 2.2"/><path d="M9 6.2h3.8M6 19.5l-1 1.7M18 19.5l1 1.7"/>',
  lavabo:   '<path d="M6 10.5h12v4.5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4z"/><path d="M12 19v2.2M9.5 21.5h5"/><path d="M12 10.5V7a2.5 2.5 0 0 1 2.5-2.5h1.8a1.7 1.7 0 0 1 1.7 1.7V8"/>',
  cama:     '<path d="M2 18v-6.5A2.5 2.5 0 0 1 4.5 9H20a2 2 0 0 1 2 2v7"/><path d="M2 14.5h20M2 18v2M22 18v2"/><path d="M6 9V7a1.5 1.5 0 0 1 1.5-1.5h9A1.5 1.5 0 0 1 18 7v2"/>',
  ferro:    '<path d="M2.5 16.5c0-4.4 3.6-8 8-8h11v3c0 2.8-2.2 5-5 5h-14z"/><path d="M2.5 20h19"/><path d="M13 8.5V6a1.5 1.5 0 0 0-1.5-1.5h-3"/>',
  geladeira:'<rect x="5.5" y="2.5" width="13" height="19" rx="2.5"/><path d="M5.5 10h13M8.5 6v2M8.5 13v3"/>',
  porta:    '<path d="M5 21V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17"/><path d="M3 21h18"/><circle cx="15.5" cy="12.5" r="1"/>',
  planta:   '<path d="M12 21v-8"/><path d="M12 13c0-3.5-2.5-6-6-6 0 3.5 2.5 6 6 6z"/><path d="M12 13c0-4 2.8-7 6.5-7 0 4-2.8 7-6.5 7z"/><path d="M8 21h8"/>',
  sol:      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/>'
};

const ORDEM_COMODIDADES = [
  'piscina', 'fogo', 'ar', 'wifi', 'cozinha', 'geladeira', 'mesa', 'tv',
  'lavar', 'ferro', 'cama', 'banheiro', 'lavabo', 'carro', 'praia',
  'cerca', 'rede', 'chuveiro', 'planta', 'porta', 'pet', 'sol'
];

const COMODIDADES = {
  pt: [
    'Piscina privativa', 'Churrasqueira e utensílios', 'Ar-condicionado em todos os quartos',
    'Wi-Fi', 'Cozinha completa e equipada', 'Geladeira, freezer e micro-ondas',
    'Mesa de jantar interna e externa', 'TV na sala', 'Máquina de lavar',
    'Ferro de passar e varal', 'Roupa de cama, toalhas e itens básicos',
    'Banheiro privativo em cada suíte', 'Lavabo com mictório na área externa',
    'Estacionamento gratuito no local', 'Acesso à praia a 400 m',
    'Quintal privativo totalmente cercado',
    'Rede e móveis na área externa', 'Chuveiro externo', 'Vista para o jardim',
    'Entrada privativa', 'Animais de estimação são bem-vindos', 'Área de jantar ao ar livre'
  ],
  en: [
    'Private pool', 'Barbecue grill and utensils', 'Air conditioning in every bedroom',
    'Wi-Fi', 'Fully equipped kitchen', 'Fridge, freezer and microwave',
    'Indoor and outdoor dining tables', 'TV in the living room', 'Washing machine',
    'Iron and drying rack', 'Linens, towels and basics',
    'Private bathroom in every bedroom', 'Outdoor powder room with urinal',
    'Free parking on site', 'Beach access 400 m away',
    'Fully fenced private yard',
    'Hammock and outdoor furniture', 'Outdoor shower', 'Garden view',
    'Private entrance', 'Pets are welcome', 'Outdoor dining area'
  ],
  es: [
    'Piscina privada', 'Parrilla y utensilios', 'Aire acondicionado en todas las habitaciones',
    'Wi-Fi', 'Cocina completa y equipada', 'Nevera, congelador y microondas',
    'Mesa de comedor interior y exterior', 'Televisión en el salón', 'Lavadora',
    'Plancha y tendedero', 'Ropa de cama, toallas y artículos básicos',
    'Baño privado en cada habitación', 'Aseo exterior con urinario',
    'Aparcamiento gratuito en el lugar', 'Acceso a la playa a 400 m',
    'Patio privado totalmente vallado',
    'Hamaca y muebles en el exterior', 'Ducha exterior', 'Vista al jardín',
    'Entrada privada', 'Se admiten mascotas', 'Zona de comedor al aire libre'
  ]
};

/* --------------------------------------------------------------------------
   Montagem da página
   -------------------------------------------------------------------------- */

document.querySelectorAll('[data-whatsapp]').forEach(function (a) {
  if (!WHATSAPP) { a.remove(); return; }
  a.href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(T.mensagem);
  a.target = '_blank';
  a.rel = 'noopener';
});

// --- Comodidades ---
const listaComodidades = document.getElementById('comodidades-lista');
if (listaComodidades) {
  listaComodidades.innerHTML = ORDEM_COMODIDADES.map(function (icone, i) {
    return '<li><svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONES[icone] || '') +
           '</svg><span>' + COMODIDADES[L][i] + '</span></li>';
  }).join('');
}

// --- Galeria ---
const galeria = document.getElementById('galeria');
const botaoVerMais = document.getElementById('verMaisFotos');

if (galeria) {
  galeria.innerHTML = FOTOS.map(function (f, i) {
    const oculto = i >= VISIVEIS_INICIALMENTE ? ' oculto' : '';
    return '<button class="galeria__item' + oculto + '" type="button" data-i="' + i + '" aria-label="' + T.ampliar + f[1] + '">' +
             '<img src="' + BASE + 'fotos/' + f[0] + '-sm.jpg" alt="' + f[1] + '" loading="' + (i < 4 ? 'eager' : 'lazy') + '" decoding="async">' +
           '</button>';
  }).join('');
}

if (botaoVerMais) {
  botaoVerMais.textContent = T.verTodas;
  botaoVerMais.addEventListener('click', function () {
    const ocultos = galeria.querySelectorAll('.galeria__item.oculto');
    if (ocultos.length) {
      ocultos.forEach(function (el) { el.classList.remove('oculto'); });
      botaoVerMais.textContent = T.mostrarMenos;
    } else {
      galeria.querySelectorAll('.galeria__item').forEach(function (el, i) {
        if (i >= VISIVEIS_INICIALMENTE) el.classList.add('oculto');
      });
      botaoVerMais.textContent = T.verTodas;
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
  lbImagem.src = BASE + 'fotos/' + foto[0] + '.jpg';
  lbImagem.alt = foto[1];
  lbLegenda.textContent = foto[1];
  lbContador.textContent = (indiceAtual + 1) + ' / ' + FOTOS.length;
  [indiceAtual + 1, indiceAtual - 1].forEach(function (n) {
    const v = FOTOS[(n + FOTOS.length) % FOTOS.length];
    new Image().src = BASE + 'fotos/' + v[0] + '.jpg';
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

// Marca como visto tudo que já está na tela (ou acima dela) — evita que um
// link de âncora deixe as seções puladas presas em opacidade zero.
function revelarOQuePassou() {
  alvos.forEach(function (el) {
    if (el.classList.contains('visto')) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
      el.classList.add('visto');
      observadorEntrada.unobserve(el);
    }
  });
}

alvos.forEach(function (el) { observadorEntrada.observe(el); });
revelarOQuePassou();

let esperaScroll;
window.addEventListener('scroll', function () {
  clearTimeout(esperaScroll);
  esperaScroll = setTimeout(revelarOQuePassou, 160);
}, { passive: true });
window.addEventListener('hashchange', function () { setTimeout(revelarOQuePassou, 400); });

#!/usr/bin/env python3
"""Gera as versões em inglês e espanhol a partir do index.html em português.

O index.html na raiz é a fonte da verdade. Depois de editá-lo, rode:

    python3 traduzir.py

e as pastas en/ e es/ são recriadas com o mesmo layout e os textos traduzidos.
Se você adicionar um texto novo ao index.html, acrescente a tradução ao
dicionário TRADUCOES abaixo — o script avisa quando alguma entrada não é
encontrada, para nada passar despercebido.
"""

import os
import re
import sys

RAIZ = os.path.dirname(os.path.abspath(__file__))
SITE = "https://casacanaria.com.br"
AIRBNB = "https://www.airbnb.com/rooms/33034679"

# Cada entrada: trecho em português -> (inglês, espanhol).
# A ordem importa: trechos mais longos são substituídos primeiro.
TRADUCOES = {
    # ---------------------------------------------------------------- <head>
    "Casa Canária | Casa de praia com piscina em Barra de São Miguel - AL": (
        "Casa Canária | Beach house with pool in Barra de São Miguel, Brazil",
        "Casa Canária | Casa de playa con piscina en Barra de São Miguel, Brasil",
    ),
    "Alugue a Casa Canária por temporada em Barra de São Miguel (AL): casa de praia com piscina privativa, churrasqueira e 4 suítes com ar-condicionado split, em condomínio fechado com segurança 24h a 400 m da praia. Até 10 hóspedes, aceita pets.": (
        "Rent Casa Canária in Barra de São Miguel, Alagoas, Brazil: beach house with a private pool, barbecue and 4 air-conditioned en-suite bedrooms, in a gated community with 24/7 security, 400 m from the beach. Sleeps 10, pets welcome.",
        "Alquile Casa Canária en Barra de São Miguel, Alagoas, Brasil: casa de playa con piscina privada, parrilla y 4 habitaciones en suite con aire acondicionado, en un condominio cerrado con seguridad 24 h, a 400 m de la playa. Hasta 10 huéspedes, se admiten mascotas.",
    ),
    "Piscina privativa, churrasqueira e 400 m da praia. Condomínio fechado com segurança 24h, 4 suítes e até 10 hóspedes. Aluguel por temporada em Alagoas.": (
        "Private pool, barbecue and 400 m from the beach. Gated community with 24/7 security, 4 en-suite bedrooms, sleeps 10. Holiday rental in Alagoas, Brazil.",
        "Piscina privada, parrilla y a 400 m de la playa. Condominio cerrado con seguridad 24 h, 4 habitaciones en suite y hasta 10 huéspedes. Alquiler vacacional en Alagoas, Brasil.",
    ),
    "Piscina privativa, churrasqueira e 400 m da praia, em condomínio fechado com segurança 24h. Até 10 hóspedes.": (
        "Private pool, barbecue and 400 m from the beach, in a gated community with 24/7 security. Sleeps 10.",
        "Piscina privada, parrilla y a 400 m de la playa, en un condominio cerrado con seguridad 24 h. Hasta 10 huéspedes.",
    ),
    "Casa Canária: jardim, piscina e área gourmet": (
        "Casa Canária: garden, pool and outdoor lounge",
        "Casa Canária: jardín, piscina y zona gourmet",
    ),
    "Barra de São Miguel, Alagoas": (
        "Barra de São Miguel, Alagoas, Brazil",
        "Barra de São Miguel, Alagoas, Brasil",
    ),

    # ------------------------------------------------------------- JSON-LD
    "Casa de praia por temporada com piscina privativa em Barra de São Miguel, Alagoas.": (
        "Holiday beach house with a private pool in Barra de São Miguel, Alagoas, Brazil.",
        "Casa de playa vacacional con piscina privada en Barra de São Miguel, Alagoas, Brasil.",
    ),
    "Casa de praia para aluguel por temporada em Barra de São Miguel (AL): piscina privativa, churrasqueira, 4 suítes com ar-condicionado split e banheiro privativo, e até 10 hóspedes, em condomínio fechado com segurança 24 horas a 400 metros da praia.": (
        "Beach house for holiday rental in Barra de São Miguel, Alagoas, Brazil: private pool, barbecue, 4 en-suite bedrooms with air conditioning, sleeping up to 10 guests, in a gated community with 24-hour security, 400 metres from the beach.",
        "Casa de playa para alquiler vacacional en Barra de São Miguel, Alagoas, Brasil: piscina privada, parrilla, 4 habitaciones en suite con aire acondicionado y hasta 10 huéspedes, en un condominio cerrado con seguridad 24 horas, a 400 metros de la playa.",
    ),
    '"unitText": "hóspedes"': ('"unitText": "guests"', '"unitText": "huéspedes"'),
    '"knowsLanguage": "pt-BR"': ('"knowsLanguage": "en"', '"knowsLanguage": "es"'),

    # ----------------------------------------------------------- perguntas
    "Quantas pessoas cabem na Casa Canária?": (
        "How many people does Casa Canária sleep?",
        "¿Cuántas personas caben en Casa Canária?",
    ),
    "A casa acomoda até 10 hóspedes em 4 suítes, com 8 camas no total. Todos os quartos têm ar-condicionado split e banheiro privativo, e ainda há um lavabo com mictório na área externa.": (
        "The house sleeps up to 10 guests in 4 en-suite bedrooms, with 8 beds in total. Every bedroom has air conditioning and its own bathroom, and there is an extra powder room with a urinal outdoors.",
        "La casa aloja hasta 10 huéspedes en 4 habitaciones en suite, con 8 camas en total. Todas las habitaciones tienen aire acondicionado y baño privado, y además hay un aseo con urinario en la zona exterior.",
    ),
    "A casa fica a que distância da praia?": (
        "How far is the house from the beach?",
        "¿A qué distancia está la casa de la playa?",
    ),
    "São apenas 400 metros até a praia de Barra de São Miguel, uma caminhada de poucos minutos. A casa fica em condomínio fechado com segurança 24 horas.": (
        "Just 400 metres to Barra de São Miguel beach, a walk of a few minutes. The house is in a gated community with 24-hour security.",
        "Solo 400 metros hasta la playa de Barra de São Miguel, una caminata de pocos minutos. La casa está en un condominio cerrado con seguridad las 24 horas.",
    ),
    "A Casa Canária tem piscina?": (
        "Does Casa Canária have a pool?",
        "¿Casa Canária tiene piscina?",
    ),
    "Sim. A casa tem piscina privativa, além de ampla área de lazer com churrasqueira, varanda coberta, quintal cercado e garagem.": (
        "Yes. The house has a private pool, plus a large leisure area with a barbecue, covered veranda, fenced yard and garage.",
        "Sí. La casa tiene piscina privada, además de una amplia zona de ocio con parrilla, terraza cubierta, patio vallado y garaje.",
    ),
    "Posso levar meu pet?": ("Can I bring my pet?", "¿Puedo llevar a mi mascota?"),
    "Sim, animais de estimação são bem-vindos na Casa Canária.": (
        "Yes, pets are welcome at Casa Canária.",
        "Sí, las mascotas son bienvenidas en Casa Canária.",
    ),
    "Como faço a reserva?": ("How do I book?", "¿Cómo hago la reserva?"),
    "A reserva é feita direto com a gente pelo WhatsApp (82) 99976-7094. É só chamar com as datas desejadas que confirmamos a disponibilidade e as condições.": (
        "You book directly with us on WhatsApp at +55 82 99976-7094. Just message us with your dates and we will confirm availability and terms.",
        "La reserva se hace directamente con nosotros por WhatsApp al +55 82 99976-7094. Escríbanos con sus fechas y le confirmamos la disponibilidad y las condiciones.",
    ),
    "Qual o horário de check-in e checkout?": (
        "What are the check-in and check-out times?",
        "¿Cuál es el horario de entrada y salida?",
    ),
    "Check-in a partir das 12:00 e checkout até as 12:00.": (
        "Check-in from 12:00 and check-out by 12:00.",
        "Entrada a partir de las 12:00 y salida hasta las 12:00.",
    ),
    "Qual a distância até Maceió e a Praia do Gunga?": (
        "How far are Maceió and Praia do Gunga?",
        "¿A qué distancia están Maceió y la Praia do Gunga?",
    ),
    "Barra de São Miguel fica a cerca de 35 km de Maceió e do aeroporto Zumbi dos Palmares, e a poucos minutos da Praia do Gunga, acessível por barco ou buggy.": (
        "Barra de São Miguel is about 35 km from Maceió and its Zumbi dos Palmares airport, and a few minutes from Praia do Gunga, reached by boat or buggy.",
        "Barra de São Miguel está a unos 35 km de Maceió y del aeropuerto Zumbi dos Palmares, y a pocos minutos de la Praia do Gunga, a la que se llega en barco o buggy.",
    ),

    # ------------------------------------------------------------ interface
    "Pular para o conteúdo": ("Skip to content", "Saltar al contenido"),
    ">A casa<": (">The house<", ">La casa<"),
    ">Fotos<": (">Photos<", ">Fotos<"),
    ">Comodidades<": (">Amenities<", ">Servicios<"),
    ">Localização<": (">Location<", ">Ubicación<"),
    ">O que fazer<": (">What to do<", ">Qué hacer<"),
    ">Avaliações<": (">Reviews<", ">Opiniones<"),
    ">Dúvidas<": (">FAQ<", ">Preguntas<"),
    ">Reservar</a>": (">Book now</a>", ">Reservar</a>"),
    'aria-label="Idioma"': ('aria-label="Language"', 'aria-label="Idioma"'),

    # ---------------------------------------------------------------- hero
    "Barra de São Miguel · Alagoas": (
        "Barra de São Miguel · Alagoas, Brazil",
        "Barra de São Miguel · Alagoas, Brasil",
    ),
    "Casa&nbsp;Canária": ("Casa&nbsp;Canária", "Casa&nbsp;Canária"),
    "Sua casa de praia com piscina, a 400&nbsp;m do mar — em condomínio fechado com segurança 24&nbsp;h.": (
        "Your beach house with a pool, 400&nbsp;m from the sea — in a gated community with 24-hour security.",
        "Tu casa de playa con piscina, a 400&nbsp;m del mar — en un condominio cerrado con seguridad 24&nbsp;h.",
    ),
    "<li>10 hóspedes</li>": ("<li>Sleeps 10</li>", "<li>10 huéspedes</li>"),
    "<li>4 suítes</li>": ("<li>4 en-suite bedrooms</li>", "<li>4 habitaciones en suite</li>"),
    "<li>8 camas</li>": ("<li>8 beds</li>", "<li>8 camas</li>"),
    "<li>4,5 banheiros</li>": ("<li>4.5 bathrooms</li>", "<li>4,5 baños</li>"),
    ">Consultar disponibilidade</a>": (">Check availability</a>", ">Consultar disponibilidad</a>"),
    ">Ver as fotos</a>": (">See the photos</a>", ">Ver las fotos</a>"),
    "4,79 · 19 avaliações de hóspedes": (
        "4.79 · 19 guest reviews",
        "4,79 · 19 opiniones de huéspedes",
    ),
    'aria-label="Rolar para baixo"': ('aria-label="Scroll down"', 'aria-label="Desplazarse hacia abajo"'),

    # ------------------------------------------------------------- a casa
    ">Bem-vindo<": (">Welcome<", ">Bienvenido<"),
    "Uma casa inteira só para a sua turma": (
        "The whole house, just for your group",
        "Una casa entera solo para tu grupo",
    ),
    "Excelente casa em condomínio fechado com segurança 24 horas por dia e apenas 400 metros da praia. Ampla área de lazer com <strong>piscina privativa</strong>, churrasqueira, varanda coberta e garagem — e o condomínio ainda tem quadra poliesportiva e campo na área comum.": (
        "A great house in a gated community with 24-hour security, just 400 metres from the beach. Large leisure area with a <strong>private pool</strong>, barbecue, covered veranda and garage — and the community also has a sports court and a football field in its shared grounds.",
        "Excelente casa en un condominio cerrado con seguridad las 24 horas y a solo 400 metros de la playa. Amplia zona de ocio con <strong>piscina privada</strong>, parrilla, terraza cubierta y garaje — y el condominio cuenta además con cancha polideportiva y campo en la zona común.",
    ),
    "<strong>Todos os quartos são suítes</strong>, com ar-condicionado split e banheiro privativo com chuveiro elétrico. Na área externa há ainda um lavabo com mictório, para quem está na piscina. A cozinha é completa, com utensílios para você cozinhar à vontade. Cabem até 10 pessoas com conforto — e os pets são bem-vindos.": (
        "<strong>Every bedroom is en suite</strong>, with air conditioning and its own bathroom. Outdoors there is an extra powder room with a urinal, handy for whoever is by the pool. The kitchen is fully equipped, with everything you need to cook. It sleeps up to 10 people comfortably — and pets are welcome.",
        "<strong>Todas las habitaciones son en suite</strong>, con aire acondicionado y baño privado. En la zona exterior hay además un aseo con urinario, práctico para quien está en la piscina. La cocina está totalmente equipada, con todo lo necesario para cocinar. Caben hasta 10 personas con comodidad — y las mascotas son bienvenidas.",
    ),
    "Condomínio fechado, portaria 24 h": (
        "Gated community, 24-hour gatehouse",
        "Condominio cerrado, portería 24 h",
    ),
    "400 m da praia, a pé": ("400 m from the beach, on foot", "A 400 m de la playa, a pie"),
    "Área comum com quadra e campo": (
        "Shared grounds with court and field",
        "Zona común con cancha y campo",
    ),
    "Aceita animais de estimação": ("Pets allowed", "Se admiten mascotas"),
    "Estacionamento gratuito no local": ("Free parking on site", "Aparcamiento gratuito"),
    "Jardim com árvore frondosa e piscina ao fundo": (
        "Garden with a large shade tree and the pool behind",
        "Jardín con árbol frondoso y la piscina al fondo",
    ),
    "Espreguiçadeiras e guarda-sol à beira da piscina": (
        "Sun loungers and umbrella by the pool",
        "Tumbonas y sombrilla junto a la piscina",
    ),

    # ------------------------------------------------------------- números
    "<span>hóspedes</span>": ("<span>guests</span>", "<span>huéspedes</span>"),
    "<span>suítes</span>": ("<span>en-suite rooms</span>", "<span>suites</span>"),
    "<span>camas</span>": ("<span>beds</span>", "<span>camas</span>"),
    "<span>banheiros</span>": ("<span>bathrooms</span>", "<span>baños</span>"),
    "<span>da praia</span>": ("<span>to the beach</span>", "<span>a la playa</span>"),
    "<span>de segurança</span>": ("<span>security</span>", "<span>de seguridad</span>"),

    # ------------------------------------------------------------- galeria
    ">Galeria<": (">Gallery<", ">Galería<"),
    "Conheça cada canto": ("Take a look around", "Conoce cada rincón"),
    "Da piscina à cozinha equipada: toque em qualquer foto para ampliar.": (
        "From the pool to the fully equipped kitchen: tap any photo to enlarge.",
        "De la piscina a la cocina equipada: toca cualquier foto para ampliarla.",
    ),
    ">Ver todas as fotos</button>": (">See all photos</button>", ">Ver todas las fotos</button>"),

    # ------------------------------------------------------------- quartos
    ">Onde você vai dormir<": (">Where you will sleep<", ">Dónde vas a dormir<"),
    "Quatro suítes, espaço de sobra": (
        "Four en-suite bedrooms, room to spare",
        "Cuatro suites, espacio de sobra",
    ),
    "<h3>Quarto 1</h3>": ("<h3>Bedroom 1</h3>", "<h3>Habitación 1</h3>"),
    "<h3>Quarto 2</h3>": ("<h3>Bedroom 2</h3>", "<h3>Habitación 2</h3>"),
    "<h3>Quarto 3</h3>": ("<h3>Bedroom 3</h3>", "<h3>Habitación 3</h3>"),
    "<h3>Quarto 4</h3>": ("<h3>Bedroom 4</h3>", "<h3>Habitación 4</h3>"),
    "<p>1 cama de casal · 1 cama de solteiro<br>Ar-condicionado split · banheiro privativo</p>": (
        "<p>1 double bed · 1 single bed<br>Air conditioning · private bathroom</p>",
        "<p>1 cama de matrimonio · 1 cama individual<br>Aire acondicionado · baño privado</p>",
    ),
    "<p>2 camas de solteiro<br>Ar-condicionado split · banheiro privativo</p>": (
        "<p>2 single beds<br>Air conditioning · private bathroom</p>",
        "<p>2 camas individuales<br>Aire acondicionado · baño privado</p>",
    ),
    "<p>3 camas de solteiro<br>Ar-condicionado split · banheiro privativo</p>": (
        "<p>3 single beds<br>Air conditioning · private bathroom</p>",
        "<p>3 camas individuales<br>Aire acondicionado · baño privado</p>",
    ),
    "<p>1 cama de casal<br>Ar-condicionado split · banheiro privativo</p>": (
        "<p>1 double bed<br>Air conditioning · private bathroom</p>",
        "<p>1 cama de matrimonio<br>Aire acondicionado · baño privado</p>",
    ),
    "<strong>Todos os quartos são suítes, com ar-condicionado split e banheiro privativo</strong> com chuveiro elétrico. Na área externa há ainda um lavabo com mictório, junto à piscina.": (
        "<strong>Every bedroom is en suite, with air conditioning and a private bathroom.</strong> Outdoors there is also a powder room with a urinal, next to the pool.",
        "<strong>Todas las habitaciones son en suite, con aire acondicionado y baño privado.</strong> En la zona exterior hay además un aseo con urinario, junto a la piscina.",
    ),
    "Quarto com cama de casal e ar-condicionado": (
        "Bedroom with a double bed and air conditioning",
        "Habitación con cama de matrimonio y aire acondicionado",
    ),
    "Quarto com duas camas de solteiro": (
        "Bedroom with two single beds",
        "Habitación con dos camas individuales",
    ),
    "Quarto com camas de solteiro": (
        "Bedroom with single beds",
        "Habitación con camas individuales",
    ),
    "Quarto com cama de casal e janelas amplas": (
        "Bedroom with a double bed and large windows",
        "Habitación con cama de matrimonio y ventanales",
    ),

    # --------------------------------------------------------- comodidades
    "Tudo pronto para a sua estadia": (
        "Everything ready for your stay",
        "Todo listo para tu estancia",
    ),

    # --------------------------------------------------------- localização
    "Uma das praias mais bonitas do litoral sul alagoano, com mar calmo protegido por recifes e piscinas naturais na maré baixa — perfeito para quem viaja com crianças.": (
        "One of the prettiest beaches on the southern coast of Alagoas, with calm water sheltered by reefs and natural pools at low tide — ideal for families with children.",
        "Una de las playas más bonitas del litoral sur de Alagoas, con mar tranquilo protegido por arrecifes y piscinas naturales en marea baja — ideal para quien viaja con niños.",
    ),
    "A poucos minutos da casa você encontra restaurantes de frutos do mar, barracas de praia, passeios de barco até a <strong>Praia do Gunga</strong> e a foz do rio São Miguel. É a base ideal para conhecer o litoral sul de Alagoas sem abrir mão do sossego de um condomínio fechado.": (
        "A few minutes from the house you will find seafood restaurants, beach bars, boat trips to <strong>Praia do Gunga</strong> and the mouth of the São Miguel river. It is the ideal base for exploring the southern coast of Alagoas without giving up the quiet of a gated community.",
        "A pocos minutos de la casa hay restaurantes de mariscos, chiringuitos, paseos en barco hasta la <strong>Praia do Gunga</strong> y la desembocadura del río São Miguel. Es la base ideal para conocer el litoral sur de Alagoas sin renunciar a la tranquilidad de un condominio cerrado.",
    ),
    "<b>400 m</b> da praia de Barra de São Miguel": (
        "<b>400 m</b> from Barra de São Miguel beach",
        "<b>400 m</b> de la playa de Barra de São Miguel",
    ),
    "<b>~10 min</b> da Praia do Gunga, por barco ou buggy": (
        "<b>~10 min</b> to Praia do Gunga, by boat or buggy",
        "<b>~10 min</b> de la Praia do Gunga, en barco o buggy",
    ),
    "<b>~35 km</b> de Maceió e do aeroporto Zumbi dos Palmares": (
        "<b>~35 km</b> from Maceió and Zumbi dos Palmares airport",
        "<b>~35 km</b> de Maceió y del aeropuerto Zumbi dos Palmares",
    ),
    "<b>~20 km</b> da Praia do Francês": (
        "<b>~20 km</b> from Praia do Francês",
        "<b>~20 km</b> de la Praia do Francês",
    ),
    "O endereço exato é informado pelo anfitrião após a confirmação da reserva.": (
        "The exact address is shared by the host once the booking is confirmed.",
        "La dirección exacta se facilita tras confirmar la reserva.",
    ),
    'title="Mapa de Barra de São Miguel, Alagoas"': (
        'title="Map of Barra de São Miguel, Alagoas"',
        'title="Mapa de Barra de São Miguel, Alagoas"',
    ),

    # ------------------------------------------------------------ o que fazer
    ">O que fazer por perto<": (">What to do nearby<", ">Qué hacer cerca<"),
    "Um destino de encontros": ("A place where waters meet", "Un destino de encuentros"),
    "Barra de São Miguel é o lugar onde a Lagoa do Roteiro, o Rio Niquim e o Oceano Atlântico se encontram. Dá para passar o dia inteiro na água — e ainda sobra roteiro para a semana toda.": (
        "Barra de São Miguel is where the Roteiro lagoon, the Niquim river and the Atlantic Ocean meet. You can spend all day in the water — and still have plenty left to fill a week.",
        "Barra de São Miguel es el lugar donde la Laguna del Roteiro, el río Niquim y el Océano Atlántico se encuentran. Puedes pasar el día entero en el agua — y aún queda plan para toda la semana.",
    ),
    "A praia de Barra de São Miguel, com areia clara e o mar protegido pelos recifes": (
        "Barra de São Miguel beach, with pale sand and sea sheltered by the reefs",
        "La playa de Barra de São Miguel, de arena clara y mar protegido por los arrecifes",
    ),
    "A praia fica a 400 m da casa — dá para ir a pé.": (
        "The beach is 400 m from the house — an easy walk.",
        "La playa está a 400 m de la casa — se llega a pie.",
    ),
    "<h3>Praia do Gunga</h3>": ("<h3>Praia do Gunga</h3>", "<h3>Praia do Gunga</h3>"),
    "O cartão-postal do litoral sul, entre a falésia e a foz do rio. Vá de barco ou de buggy pelas dunas.": (
        "The postcard of the southern coast, between the cliffs and the river mouth. Go by boat or by buggy across the dunes.",
        "La postal del litoral sur, entre el acantilado y la desembocadura del río. Ve en barco o en buggy por las dunas.",
    ),
    "<h3>Encontro das Três Águas</h3>": (
        "<h3>Meeting of the Three Waters</h3>",
        "<h3>Encuentro de las Tres Aguas</h3>",
    ),
    "O ponto onde o Rio Niquim, a Lagoa do Roteiro e o mar aberto se misturam. Águas calmas, cristalinas e rasas.": (
        "Where the Niquim river, the Roteiro lagoon and the open sea mix. Calm, clear, shallow water.",
        "El punto donde el río Niquim, la Laguna del Roteiro y el mar abierto se mezclan. Aguas tranquilas, cristalinas y poco profundas.",
    ),
    "<h3>Reserva Palateia</h3>": ("<h3>Palateia Reserve</h3>", "<h3>Reserva Palateia</h3>"),
    "Ecossistema de manguezal preservado, que abriga o maior criatório de ostras do Nordeste.": (
        "A preserved mangrove ecosystem, home to the largest oyster farm in northeastern Brazil.",
        "Ecosistema de manglar preservado, que alberga el mayor criadero de ostras del Nordeste de Brasil.",
    ),
    "<h3>Piscinas naturais</h3>": ("<h3>Natural pools</h3>", "<h3>Piscinas naturales</h3>"),
    "Na maré baixa, os recifes formam piscinas de água morna a poucos metros da areia — perfeitas com crianças.": (
        "At low tide the reefs form warm-water pools a few metres from the sand — perfect with children.",
        "En marea baja, los arrecifes forman piscinas de agua tibia a pocos metros de la arena — perfectas con niños.",
    ),
    "<h3>Esportes aquáticos</h3>": ("<h3>Water sports</h3>", "<h3>Deportes acuáticos</h3>"),
    "Kitesurf, mergulho e stand-up paddle. O mar aberto tem ondas; a lagoa, água lisa o ano inteiro.": (
        "Kitesurfing, diving and stand-up paddleboarding. The open sea has waves; the lagoon stays flat all year.",
        "Kitesurf, buceo y stand-up paddle. El mar abierto tiene olas; la laguna, agua lisa todo el año.",
    ),
    "<h3>Sabores do mar</h3>": ("<h3>Flavours of the sea</h3>", "<h3>Sabores del mar</h3>"),
    "Ostras da reserva, peixes frescos e a cozinha alagoana nos restaurantes e barracas à beira-mar.": (
        "Oysters from the reserve, fresh fish and Alagoas cooking in the restaurants and beach bars by the sea.",
        "Ostras de la reserva, pescado fresco y la cocina de Alagoas en los restaurantes y chiringuitos junto al mar.",
    ),
    "<h3>Guia completo do destino</h3>": (
        "<h3>Full guide to the destination</h3>",
        "<h3>Guía completa del destino</h3>",
    ),
    "Roteiros, restaurantes, eventos e a melhor época para visitar estão reunidos no <strong>Destino BSM</strong>, o guia oficial de turismo de Barra de São Miguel.": (
        "Itineraries, restaurants, events and the best time to visit are all gathered on <strong>Destino BSM</strong>, the official tourism guide for Barra de São Miguel.",
        "Rutas, restaurantes, eventos y la mejor época para visitar están reunidos en <strong>Destino BSM</strong>, la guía oficial de turismo de Barra de São Miguel.",
    ),
    ">Visitar o Destino BSM</a>": (">Visit Destino BSM</a>", ">Visitar Destino BSM</a>"),

    # ------------------------------------------------------------ avaliações
    "4,79 · 19 avaliações</h2>": ("4.79 · 19 reviews</h2>", "4,79 · 19 opiniones</h2>"),
    "<span>19 avaliações</span>": ("<span>19 reviews</span>", "<span>19 opiniones</span>"),
    "<b><span class=\"estrela\">★</span> 4,79</b>": ("<b><span class=\"estrela\">★</span> 4.79</b>", "<b><span class=\"estrela\">★</span> 4,79</b>"),
    "<span>Check-in</span>": ("<span>Check-in</span>", "<span>Entrada</span>"),
    "<span>Comunicação</span>": ("<span>Communication</span>", "<span>Comunicación</span>"),
    "<span>Localização</span>": ("<span>Location</span>", "<span>Ubicación</span>"),
    "<span>Limpeza</span>": ("<span>Cleanliness</span>", "<span>Limpieza</span>"),
    "<span>Exatidão</span>": ("<span>Accuracy</span>", "<span>Exactitud</span>"),
    "<span>Custo-benefício</span>": ("<span>Value</span>", "<span>Relación calidad-precio</span>"),
    "“Casa confortável, com tudo que se precisa, dentro de um condomínio com várias opções de lazer. Anfitriã super solícita e rápida nas respostas.”": (
        "“A comfortable house with everything you need, inside a community with plenty to do. The host was very helpful and quick to reply.”",
        "“Casa cómoda, con todo lo necesario, dentro de un condominio con muchas opciones de ocio. La anfitriona, muy atenta y rápida al responder.”",
    ),
    "“Comunicação maravilhosa antes e durante a estadia! Casa impecável e ótima localização.”": (
        "“Wonderful communication before and during the stay! Spotless house and a great location.”",
        "“¡Comunicación estupenda antes y durante la estancia! Casa impecable y excelente ubicación.”",
    ),
    "“Vale muito a pena! Casa muito aconchegante! Ótima anfitriã, sempre rápida nas respostas. Exatamente como no anúncio! Localizada em um condomínio seguro e com opções de lazer para criança.”": (
        "“Absolutely worth it! Such a cosy house. Great host, always quick to reply. Exactly as described! In a safe community with things for children to do.”",
        "“¡Vale mucho la pena! ¡Casa muy acogedora! Excelente anfitriona, siempre rápida al responder. ¡Exactamente como en el anuncio! En un condominio seguro y con opciones de ocio para niños.”",
    ),
    "“A estadia foi ótima!! A casa é muito agradável! Pretendo voltar!!!”": (
        "“The stay was great!! The house is very pleasant! I plan to come back!!!”",
        "“¡La estancia fue estupenda! ¡La casa es muy agradable! ¡Pienso volver!”",
    ),
    "“Excelente custo-benefício!”": ("“Excellent value for money!”", "“¡Excelente relación calidad-precio!”"),
    "“Casa bem localizada e nascente!”": (
        "“Well located house, and it gets the morning sun!”",
        "“¡Casa bien ubicada y con sol de mañana!”",
    ),
    "fevereiro de 2026": ("February 2026", "febrero de 2026"),
    "janeiro de 2026": ("January 2026", "enero de 2026"),
    "janeiro de 2025": ("January 2025", "enero de 2025"),
    "abril de 2026": ("April 2026", "abril de 2026"),

    # ----------------------------------------------------------------- regras
    "<h3>Regras da casa</h3>": ("<h3>House rules</h3>", "<h3>Normas de la casa</h3>"),
    "<li>Check-in a partir das 12:00</li>": (
        "<li>Check-in from 12:00</li>",
        "<li>Entrada a partir de las 12:00</li>",
    ),
    "<li>Checkout até as 12:00</li>": (
        "<li>Check-out by 12:00</li>",
        "<li>Salida hasta las 12:00</li>",
    ),
    "<li>Máximo de 10 hóspedes</li>": (
        "<li>Maximum 10 guests</li>",
        "<li>Máximo de 10 huéspedes</li>",
    ),
    "<li>Animais de estimação são bem-vindos</li>": (
        "<li>Pets are welcome</li>",
        "<li>Las mascotas son bienvenidas</li>",
    ),
    "<h3>Reserva e cancelamento</h3>": (
        "<h3>Booking and cancellation</h3>",
        "<h3>Reserva y cancelación</h3>",
    ),
    "<li>Reserva direta com os proprietários, pelo WhatsApp</li>": (
        "<li>Book directly with the owners on WhatsApp</li>",
        "<li>Reserva directa con los propietarios, por WhatsApp</li>",
    ),
    "<li>Cancelamento gratuito dentro do prazo do anúncio</li>": (
        "<li>Free cancellation within the agreed window</li>",
        "<li>Cancelación gratuita dentro del plazo acordado</li>",
    ),
    "<li>Parcelamento disponível no cartão</li>": (
        "<li>Card payment in instalments available</li>",
        "<li>Pago a plazos con tarjeta disponible</li>",
    ),
    "<li>Anfitriões: Flávio e Camila</li>": (
        "<li>Hosts: Flávio and Camila</li>",
        "<li>Anfitriones: Flávio y Camila</li>",
    ),

    # -------------------------------------------------------------------- CTA
    "Vamos combinar a sua temporada?": (
        "Shall we plan your stay?",
        "¿Organizamos tu estancia?",
    ),
    "Chame a gente no WhatsApp para consultar as datas livres e o valor da diária. Respondemos rápido.": (
        "Message us on WhatsApp to check available dates and nightly rates. We reply fast.",
        "Escríbenos por WhatsApp para consultar las fechas libres y el precio por noche. Respondemos rápido.",
    ),
    ">Falar no WhatsApp</a>": (">Chat on WhatsApp</a>", ">Escribir por WhatsApp</a>"),
    "Atendimento direto com os proprietários, sem taxa de plataforma.": (
        "You deal directly with the owners — no platform fees.",
        "Atención directa con los propietarios, sin comisiones de plataforma.",
    ),

    # ----------------------------------------------------------------- rodapé
    ">Perguntas frequentes<": (">Frequently asked questions<", ">Preguntas frecuentes<"),
    "Dúvidas comuns sobre a Casa Canária": (
        "Common questions about Casa Canária",
        "Dudas frecuentes sobre Casa Canária",
    ),
    "Barra de São Miguel · Alagoas · Brasil": (
        "Barra de São Miguel · Alagoas · Brazil",
        "Barra de São Miguel · Alagoas · Brasil",
    ),
    "Casa Canária · Barra de São Miguel, Alagoas · Contato pelo WhatsApp (82) 99976-7094": (
        "Casa Canária · Barra de São Miguel, Alagoas, Brazil · WhatsApp +55 82 99976-7094",
        "Casa Canária · Barra de São Miguel, Alagoas, Brasil · WhatsApp +55 82 99976-7094",
    ),
    'aria-label="Galeria de fotos"': ('aria-label="Photo gallery"', 'aria-label="Galería de fotos"'),
    'aria-label="Fechar galeria"': ('aria-label="Close gallery"', 'aria-label="Cerrar galería"'),
    'aria-label="Foto anterior"': ('aria-label="Previous photo"', 'aria-label="Next photo"'),
    'aria-label="Próxima foto"': ('aria-label="Next photo"', 'aria-label="Foto siguiente"'),
}

# Ajustes de aria-label do espanhol que não seguem o padrão acima
TRADUCOES['aria-label="Foto anterior"'] = ('aria-label="Previous photo"', 'aria-label="Foto anterior"')

IDIOMAS = {
    "en": {"indice": 0, "lang": "en", "locale": "en_US", "nome": "English"},
    "es": {"indice": 1, "lang": "es", "locale": "es_ES", "nome": "Español"},
}


def gerar(codigo, cfg):
    origem = open(os.path.join(RAIZ, "index.html"), encoding="utf-8").read()
    html = origem
    i = cfg["indice"]

    # Duas passadas com marcadores: a primeira troca cada trecho em português
    # por um marcador único, a segunda troca o marcador pela tradução. Sem isso,
    # uma regra curta acabaria reescrevendo texto que outra já traduziu.
    faltando = []
    marcadores = {}
    for n, (pt, traducoes) in enumerate(sorted(TRADUCOES.items(), key=lambda kv: -len(kv[0]))):
        if pt not in html:
            faltando.append(pt[:60])
            continue
        marca = "\x00T%d\x00" % n
        marcadores[marca] = traducoes[i]
        html = html.replace(pt, marca)
    for marca, texto in marcadores.items():
        html = html.replace(marca, texto)

    # idioma do documento e prefixo dos arquivos
    html = html.replace('<html lang="pt-BR">', '<html lang="%s">' % cfg["lang"])
    html = html.replace('<body data-base="">', '<body data-base="../">')

    # caminhos relativos
    html = html.replace('href="style.css"', 'href="../style.css"')
    html = html.replace('src="script.js"', 'src="../script.js"')
    html = html.replace('src="fotos/', 'src="../fotos/')
    html = html.replace('srcset="fotos/', 'srcset="../fotos/')
    html = html.replace('srcset="../fotos/34-praia-areia-larga-sm.jpg 900w, fotos/',
                        'srcset="../fotos/34-praia-areia-larga-sm.jpg 900w, ../fotos/')

    # canonical, og:url e locale
    html = html.replace('rel="canonical" href="%s/"' % SITE,
                        'rel="canonical" href="%s/%s/"' % (SITE, codigo))
    html = html.replace('<meta property="og:url" content="%s/">' % SITE,
                        '<meta property="og:url" content="%s/%s/">' % (SITE, codigo))
    html = html.replace('<meta property="og:locale" content="pt_BR">',
                        '<meta property="og:locale" content="%s">' % cfg["locale"])
    html = html.replace('"url": "%s/"' % SITE, '"url": "%s/%s/"' % (SITE, codigo))
    html = html.replace('"@id": "%s/#' % SITE, '"@id": "%s/%s/#' % (SITE, codigo))
    html = html.replace('"inLanguage": "pt-BR"', '"inLanguage": "%s"' % cfg["lang"])

    # seletor de idioma: marca o idioma corrente e corrige os caminhos
    html = html.replace('class="idiomas__atual" href="./"', 'href="../"')
    html = html.replace('href="%s/"' % codigo, 'CURRENT_PLACEHOLDER')
    html = html.replace('href="en/"', 'href="../en/"')
    html = html.replace('href="es/"', 'href="../es/"')
    html = html.replace('CURRENT_PLACEHOLDER', 'class="idiomas__atual" aria-current="page" href="./"')
    html = html.replace('lang="pt-BR" aria-current="page"', 'lang="pt-BR"')

    # Nas versões internacionais, o Airbnb entra como segunda via de contato:
    # quem vem de fora costuma preferir reservar pela plataforma.
    rotulo = "Book on Airbnb" if codigo == "en" else "Reservar en Airbnb"
    rodape = "Airbnb listing" if codigo == "en" else "Anuncio en Airbnb"
    link = ('<a class="btn btn--fantasma btn--grande" href="%s" target="_blank" rel="noopener">%s</a>'
            % (AIRBNB, rotulo))
    marca_cta = '<a class="btn btn--grande btn--zap" data-whatsapp href="#">'
    pos = html.find(marca_cta)
    assert pos >= 0, "botão do WhatsApp do CTA não encontrado"
    fim = html.index("</a>", pos) + 4
    html = html[:fim] + "\n      " + link + html[fim:]

    html = html.replace('<a data-whatsapp href="#">WhatsApp</a>',
                        '<a data-whatsapp href="#">WhatsApp</a>\n      '
                        '<a href="%s" target="_blank" rel="noopener">%s</a>' % (AIRBNB, rodape))

    destino = os.path.join(RAIZ, codigo)
    os.makedirs(destino, exist_ok=True)
    open(os.path.join(destino, "index.html"), "w", encoding="utf-8").write(html)

    restante = len(re.findall(r"[ãõçáéíóúâêô]", html.lower()))
    print("%s/index.html gerado — %d trechos não encontrados" % (codigo, len(faltando)))
    for f in faltando:
        print("   sem correspondência: %s" % f)
    return len(faltando)


if __name__ == "__main__":
    problemas = 0
    for codigo, cfg in IDIOMAS.items():
        problemas += gerar(codigo, cfg)
    sys.exit(1 if problemas else 0)

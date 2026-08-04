export const primerMesData = {
  header: {
    title: "Primer mes",
    subtitle: "Un pequeño capítulo de todo lo que aún nos falta vivir.",
    openingQuote: "¿Qué son mil poemas contra uno solo de tus besos?"
  },
  counter: {
    title: "Nuestra historia comenzó hace…",
    startDateIso: "2026-07-04T11:38:00-06:00"
  },
  audio: "/multimedia-1-mes/audio-primer-mes.mp3",
  items: [
    // 1. Video 1 (Apertura)
    {
      id: "video-1",
      type: "video",
      src: "/multimedia-1-mes/video-1.mov",
      title: "El inicio de este nuevo capítulo",
      orientation: "vertical"
    },
    // Texto breve 1 + Doodle Holding Hands
    {
      id: "text-1",
      type: "text",
      styleType: "quote-card",
      text: "El mundo es más bonito si voy contigo de la mano.",
      doodle: "holding-hands"
    },
    // 2. Foto 1
    {
      id: "photo-1",
      type: "photo",
      src: "/multimedia-1-mes/1.jpg",
      alt: "Recuerdo 1",
      orientation: "vertical",
      rotation: "1.5deg"
    },
    // Frase 2
    {
      id: "text-2",
      type: "text",
      styleType: "serif-quote",
      text: "Amor, no tengas miedo. Esto no será efímero…"
    },
    // 3. Foto 2
    {
      id: "photo-2",
      type: "photo",
      src: "/multimedia-1-mes/2.jpg",
      alt: "Recuerdo 2",
      orientation: "vertical",
      rotation: "-2deg"
    },
    // Fragmento de texto 3 + Doodle Open Book
    {
      id: "text-3",
      type: "text",
      styleType: "handwritten-note",
      text: "Si pudiera elegir un capítulo favorito de mi vida, sería en el que apareciste tú.",
      doodle: "open-book"
    },
    // 4. Foto 3
    {
      id: "photo-3",
      type: "photo",
      src: "/multimedia-1-mes/3.jpg",
      alt: "Recuerdo 3",
      orientation: "square",
      rotation: "1deg"
    },
    // Frase 4 + Doodle Kiss
    {
      id: "text-4",
      type: "text",
      styleType: "quote-card",
      text: "Te quiero así como eres, con todo lo bueno que no ves y con todo lo malo que dices tener.",
      doodle: "kiss"
    },
    // 5. Foto 4
    {
      id: "photo-4",
      type: "photo",
      src: "/multimedia-1-mes/4.jpg",
      alt: "Recuerdo 4",
      orientation: "vertical",
      rotation: "-1.5deg"
    },
    // 6. Video 2 (Intermedio ~15s, Pausa Emocional)
    {
      id: "video-2",
      type: "video",
      src: "/multimedia-1-mes/video-2.mp4",
      title: "Una pausa en nuestro camino",
      orientation: "vertical"
    },
    // Poema largo ("Moría por saber qué significaba amar...") + Doodle Compass Moon
    {
      id: "text-5",
      type: "text",
      styleType: "poem-block",
      paragraphs: [
        "Moría por saber qué significaba amar…",
        "Hasta que encontré en tu mirada la calma que nunca antes había sentido, y entendí que amar es una decisión diaria de cuidar tu sonrisa, de abrazar tus silencios y de elegirte una y otra vez."
      ],
      doodle: "compass-moon"
    },
    // 7. Foto 5
    {
      id: "photo-5",
      type: "photo",
      src: "/multimedia-1-mes/5.jpg",
      alt: "Recuerdo 5",
      orientation: "vertical",
      rotation: "-1.8deg"
    },
    // Fragmento ("Escribirte es recordar que el amor verdadero no tiene prisa, pero sí memoria...")
    {
      id: "text-6",
      type: "text",
      styleType: "prose-block",
      paragraphs: [
        "Escribirte es recordar que el amor verdadero no tiene prisa, pero sí memoria…",
        "Recuerda las primeras miradas, las risas interminables y la certeza de que a tu lado todo tiene más sentido."
      ]
    },
    // 8. Foto 6
    {
      id: "photo-6",
      type: "photo",
      src: "/multimedia-1-mes/6.jpg",
      alt: "Recuerdo 6",
      orientation: "vertical",
      rotation: "2deg"
    },
    // Texto sobre el futuro / Construir un hogar + Doodle Home Coffee
    {
      id: "text-7",
      type: "text",
      styleType: "handwritten-note",
      paragraphs: [
        "Quiero construir un hogar lleno de amor…",
        "De calma, de risas compartidas y de cafés por la mañana donde cada día sea un motivo para celebrar lo que somos."
      ],
      doodle: "home-coffee"
    },
    // 9. Foto 7
    {
      id: "photo-7",
      type: "photo",
      src: "/multimedia-1-mes/7.jpg",
      alt: "Recuerdo 7",
      orientation: "square",
      rotation: "-1deg"
    },
    // Texto emotivo (Dedicatoria larga: "Amarte me enseñó que coincidir en esta vida no fue una casualidad...")
    {
      id: "text-8",
      type: "text",
      styleType: "dedication-card",
      paragraphs: [
        "Amarte me enseñó que coincidir en esta vida no fue una casualidad…",
        "Sino el más hermoso de los destinos. Gracias por cada instante de este primer mes y por hacerme sentir en casa cada vez que me miras."
      ]
    },
    // 10. Foto 8
    {
      id: "photo-8",
      type: "photo",
      src: "/multimedia-1-mes/8.jpg",
      alt: "Recuerdo 8",
      orientation: "vertical",
      rotation: "1.5deg"
    },
    // Texto previo al cierre
    {
      id: "text-9",
      type: "text",
      styleType: "serif-quote",
      text: "Gracias por este primer mes lleno de magia, risas y momentos que guardaré para siempre."
    },
    // 11. Video 3 (Cierre audiovisual)
    {
      id: "video-3",
      type: "video",
      src: "/multimedia-1-mes/video-3.mp4",
      title: "Nuestro cierre audiovisual",
      orientation: "vertical"
    }
  ],
  closing: {
    message: "Y esto es solo el primer capítulo de una historia que apenas comienza a escribirse.",
    dedication: "Te amo demasiado. ❤️",
    doodle: "hugging"
  }
};

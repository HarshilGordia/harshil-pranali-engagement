import "./style.css";


/* =========================================================
   HARSHIL & PRANALI
   Canvas + Language + Music + Scroll Animation
   ========================================================= */


/* =========================================================
   CANVAS SETUP
   ========================================================= */

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

const canvas = document.getElementById("ambientCanvas");

const ctx = canvas?.getContext("2d", {
  alpha: true,
  desynchronized: true,
});

let width = 0;
let height = 0;
let dpr = 1;

let particles = [];

let animationFrame = 0;
let resizeFrame = 0;

let previousTime = performance.now();


const COLORS = {

  petals: [
    "#D98991",
    "#C86D7B",
    "#E6A0A6",
    "#B95769",
  ],

  gold: [
    "#C5A059",
    "#E5C989",
    "#F0DDAF",
  ],

};


function random(min, max) {

  return min +
    Math.random() *
    (max - min);

}


/* =========================================================
   PARTICLE CREATION
   ========================================================= */

function createParticle(
  type,
  anywhere = true
) {

  const petal =
    type === "petal";


  return {

    type,

    x: random(
      0,
      width
    ),

    y: anywhere
      ? random(0, height)
      : petal
        ? random(-100, -20)
        : random(
            height + 10,
            height + 80
          ),

    size: petal
      ? random(5, 11)
      : random(0.8, 2),

    speed: petal
      ? random(12, 24)
      : random(5, 11),

    drift: petal
      ? random(-10, 10)
      : random(-4, 4),

    phase: random(
      0,
      Math.PI * 2
    ),

    rotation: random(
      0,
      Math.PI * 2
    ),

    rotationSpeed: petal
      ? random(-0.8, 0.8)
      : 0,

    tilt: random(
      0.45,
      1
    ),

    opacity: petal
      ? random(0.22, 0.48)
      : random(0.22, 0.52),

    color: petal

      ? COLORS.petals[
          Math.floor(
            Math.random() *
            COLORS.petals.length
          )
        ]

      : COLORS.gold[
          Math.floor(
            Math.random() *
            COLORS.gold.length
          )
        ],

  };

}


/* =========================================================
   CREATE PARTICLES
   ========================================================= */

function resetParticles() {

  const mobile =
    width < 769;


  const lowPower =
    navigator.hardwareConcurrency &&
    navigator.hardwareConcurrency <= 4;


  const multiplier =
    lowPower
      ? 0.7
      : 1;


  const petalCount =
    Math.round(
      (mobile ? 18 : 30) *
      multiplier
    );


  const goldCount =
    Math.round(
      (mobile ? 22 : 38) *
      multiplier
    );


  particles = [

    ...Array.from(
      { length: petalCount },
      () =>
        createParticle(
          "petal"
        )
    ),

    ...Array.from(
      { length: goldCount },
      () =>
        createParticle(
          "gold"
        )
    ),

  ];

}


/* =========================================================
   CANVAS RESIZE
   ========================================================= */

function resizeCanvas() {

  if (
    !canvas ||
    !ctx
  ) {
    return;
  }


  width =
    Math.max(
      1,
      window.innerWidth
    );


  height =
    Math.max(
      1,
      window.innerHeight
    );


  dpr =
    Math.min(
      window.devicePixelRatio || 1,
      1.5
    );


  canvas.width =
    Math.round(
      width * dpr
    );


  canvas.height =
    Math.round(
      height * dpr
    );


  canvas.style.width =
    `${width}px`;


  canvas.style.height =
    `${height}px`;


  ctx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );


  resetParticles();

}


function scheduleResize() {

  cancelAnimationFrame(
    resizeFrame
  );


  resizeFrame =
    requestAnimationFrame(
      resizeCanvas
    );

}


/* =========================================================
   DRAW PETAL
   ========================================================= */

function drawPetal(
  particle,
  time
) {

  const flip =
    0.55 +
    Math.abs(
      Math.sin(
        time * 0.001 +
        particle.phase
      )
    ) *
    0.45;


  ctx.save();


  ctx.translate(
    particle.x,
    particle.y
  );


  ctx.rotate(
    particle.rotation
  );


  ctx.scale(
    particle.tilt,
    flip
  );


  ctx.globalAlpha =
    particle.opacity;


  ctx.fillStyle =
    particle.color;


  ctx.beginPath();


  ctx.moveTo(
    0,
    -particle.size
  );


  ctx.bezierCurveTo(

    particle.size * 0.95,
    -particle.size * 0.55,

    particle.size * 0.72,
    particle.size * 0.65,

    0,
    particle.size

  );


  ctx.bezierCurveTo(

    -particle.size * 0.72,
    particle.size * 0.65,

    -particle.size * 0.95,
    -particle.size * 0.55,

    0,
    -particle.size

  );


  ctx.fill();

  ctx.restore();

}


/* =========================================================
   DRAW GOLD DUST
   ========================================================= */

function drawGold(
  particle,
  time
) {

  const pulse =
    0.55 +
    Math.sin(
      time * 0.0015 +
      particle.phase
    ) *
    0.3;


  ctx.save();


  ctx.globalAlpha =
    Math.max(
      0.06,
      particle.opacity *
      pulse
    );


  ctx.fillStyle =
    particle.color;


  ctx.shadowColor =
    particle.color;


  ctx.shadowBlur = 6;


  ctx.beginPath();


  ctx.arc(
    particle.x,
    particle.y,
    particle.size,
    0,
    Math.PI * 2
  );


  ctx.fill();

  ctx.restore();

}


/* =========================================================
   ANIMATION LOOP
   ========================================================= */

function animate(time) {

  if (
    !ctx ||
    reducedMotion.matches
  ) {
    return;
  }


  const delta =
    Math.min(
      (time - previousTime) /
      1000,
      0.034
    );


  previousTime = time;


  ctx.clearRect(
    0,
    0,
    width,
    height
  );


  for (
    const particle
    of particles
  ) {


    /* PETAL */

    if (
      particle.type ===
      "petal"
    ) {

      const sway =
        Math.sin(
          time * 0.0008 +
          particle.phase
        );


      particle.y +=
        particle.speed *
        delta;


      particle.x +=
        (
          particle.drift +
          sway * 7
        ) *
        delta;


      particle.rotation +=
        particle.rotationSpeed *
        delta;


      drawPetal(
        particle,
        time
      );


      if (

        particle.y >
        height + 30 ||

        particle.x <
        -40 ||

        particle.x >
        width + 40

      ) {

        Object.assign(

          particle,

          createParticle(
            "petal",
            false
          )

        );

      }

    }


    /* GOLD */

    else {

      particle.y -=
        particle.speed *
        delta;


      particle.x +=

        (
          particle.drift +

          Math.sin(
            time * 0.0006 +
            particle.phase
          ) *

          2.5

        ) *

        delta;


      drawGold(
        particle,
        time
      );


      if (

        particle.y <
        -20 ||

        particle.x <
        -30 ||

        particle.x >
        width + 30

      ) {

        Object.assign(

          particle,

          createParticle(
            "gold",
            false
          )

        );

      }

    }

  }


  animationFrame =
    requestAnimationFrame(
      animate
    );

}


/* =========================================================
   START / STOP CANVAS
   ========================================================= */

function startCanvas() {

  if (
    !canvas ||
    !ctx ||
    reducedMotion.matches
  ) {
    return;
  }


  resizeCanvas();


  cancelAnimationFrame(
    animationFrame
  );


  previousTime =
    performance.now();


  animationFrame =
    requestAnimationFrame(
      animate
    );

}


function stopCanvas() {

  cancelAnimationFrame(
    animationFrame
  );


  if (ctx) {

    ctx.clearRect(
      0,
      0,
      width,
      height
    );

  }

}


/* =========================================================
   SCROLL REVEALS
   ========================================================= */

const revealElements = [
  ...document.querySelectorAll(
    ".reveal"
  ),
];


if (

  "IntersectionObserver"
  in window &&

  !reducedMotion.matches

) {

  const observer =
    new IntersectionObserver(

      (
        entries,
        revealObserver
      ) => {

        entries.forEach(
          (entry) => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }


            entry.target
              .classList
              .add(
                "is-visible"
              );


            revealObserver
              .unobserve(
                entry.target
              );

          }
        );

      },

      {

        threshold: 0.12,

        rootMargin:
          "0px 0px -8% 0px",

      }

    );


  revealElements.forEach(
    (element) =>
      observer.observe(
        element
      )
  );

}

else {

  revealElements.forEach(
    (element) =>
      element
        .classList
        .add(
          "is-visible"
        )
  );

}


/* Hero visible immediately */

requestAnimationFrame(
  () => {

    document
      .querySelectorAll(
        ".hero .reveal"
      )
      .forEach(
        (element) =>
          element
            .classList
            .add(
              "is-visible"
            )
      );

  }
);


/* =========================================================
   SMOOTH INTERNAL LINKS
   ========================================================= */

document.addEventListener(
  "click",
  (event) => {

    const link =
      event.target.closest(
        'a[href^="#"]'
      );


    if (!link) {
      return;
    }


    const href =
      link.getAttribute(
        "href"
      );


    if (
      !href ||
      href === "#"
    ) {
      return;
    }


    const target =
      document.querySelector(
        href
      );


    if (!target) {
      return;
    }


    event.preventDefault();


    target.scrollIntoView({

      behavior:
        reducedMotion.matches
          ? "auto"
          : "smooth",

      block:
        "start",

    });

  }
);


/* =========================================================
   LANGUAGE SYSTEM
   ========================================================= */

const languageGate =
  document.getElementById(
    "languageGate"
  );


const languageButtons =
  document.querySelectorAll(
    "[data-language]"
  );


const translations = {

  en: {

    story:
      "Our Story",

    celebration:
      "Celebration",

    venue:
      "Venue",

    invocation:
      "॥ श्री गणेशाय नमः ॥",

    kicker:
      "With full hearts, a new chapter begins",

    subtitle:
      "invite you to celebrate their engagement",

    family:
      "With the blessings of our families",

    familyTitle:
      "Two families. One beautiful beginning.",

    storyTitle:
      "Our Story",

    celebrationTitle:
      "The Celebration",

    dress:
      "Dress Code",

    maps:
      "Open in Google Maps",

    calendar:
      "Add to Calendar",

    music:
      "Music",

  },


  hi: {

    story:
      "हमारी कहानी",

    celebration:
      "समारोह",

    venue:
      "स्थान",

    invocation:
      "॥ श्री गणेशाय नमः ॥",

    kicker:
      "भरे दिलों के साथ, एक नया अध्याय शुरू होता है",

    subtitle:
      "आपको अपनी सगाई के उत्सव में आमंत्रित करते हैं",

    family:
      "हमारे परिवारों के आशीर्वाद के साथ",

    familyTitle:
      "दो परिवार। एक खूबसूरत शुरुआत।",

    storyTitle:
      "हमारी कहानी",

    celebrationTitle:
      "उत्सव",

    dress:
      "पोशाक",

    maps:
      "Google Maps में खोलें",

    calendar:
      "कैलेंडर में जोड़ें",

    music:
      "संगीत",

  },


  gu: {

    story:
      "અમારી કહાની",

    celebration:
      "ઉજવણી",

    venue:
      "સ્થળ",

    invocation:
      "॥ શ્રી ગણેશાય નમઃ ॥",

    kicker:
      "હૃદયપૂર્વક, એક નવો અધ્યાય શરૂ થાય છે",

    subtitle:
      "અમારી સગાઈની ઉજવણીમાં આપને હાર્દિક આમંત્રણ",

    family:
      "અમારા પરિવારોના આશીર્વાદ સાથે",

    familyTitle:
      "બે પરિવાર. એક સુંદર શરૂઆત.",

    storyTitle:
      "અમારી કહાની",

    celebrationTitle:
      "ઉજવણી",

    dress:
      "ડ્રેસ કોડ",

    maps:
      "Google Maps માં ખોલો",

    calendar:
      "કેલેન્ડરમાં ઉમેરો",

    music:
      "સંગીત",

  },


  mr: {

    story:
      "आमची गोष्ट",

    celebration:
      "सोहळा",

    venue:
      "स्थळ",

    invocation:
      "॥ श्री गणेशाय नमः ॥",

    kicker:
      "मनापासून, एका नव्या अध्यायाची सुरुवात",

    subtitle:
      "आमच्या साखरपुड्याच्या आनंदसोहळ्यास आपले प्रेमळ आमंत्रण",

    family:
      "आमच्या कुटुंबीयांच्या आशीर्वादाने",

    familyTitle:
      "दोन कुटुंबे. एक सुंदर सुरुवात.",

    storyTitle:
      "आमची गोष्ट",

    celebrationTitle:
      "सोहळा",

    dress:
      "पोशाख",

    maps:
      "Google Maps मध्ये उघडा",

    calendar:
      "कॅलेंडरमध्ये जोडा",

    music:
      "संगीत",

  },

};


function setText(
  selector,
  value
) {

  const element =
    document.querySelector(
      selector
    );


  if (
    element &&
    value
  ) {

    element.textContent =
      value;

  }

}


function applyLanguage(
  language
) {

  const text =
    translations[language] ||
    translations.en;


  document.documentElement.lang =
    language;


  setText(
    '.topbar a[href="#story"]',
    text.story
  );


  setText(
    '.topbar a[href="#celebrations"]',
    text.celebration
  );


  setText(
    '.topbar a[href="#venue"]',
    text.venue
  );


  setText(
    ".invocation",
    text.invocation
  );


  setText(
    ".hero-copy > .eyebrow",
    text.kicker
  );


  setText(
    ".hero-subtitle",
    text.subtitle
  );


  setText(
    ".family .eyebrow",
    text.family
  );


  setText(
    ".family h2",
    text.familyTitle
  );


  setText(
    "#story .section-heading .eyebrow",
    text.storyTitle
  );


  setText(
    "#celebrations .section-heading .eyebrow",
    text.celebrationTitle
  );


  setText(
    "#dress .section-heading .eyebrow",
    text.dress
  );


  setText(
    "#venue .eyebrow",
    text.venue
  );


  setText(
    '#venue a[href*="maps.app"]',
    text.maps
  );


  setText(
    '#venue a[download]',
    text.calendar
  );


  setText(
    ".music-toggle__label",
    text.music
  );


  localStorage.setItem(
    "engagement-language",
    language
  );

}


/* =========================================================
   MUSIC
   ========================================================= */

const music =
  document.getElementById(
    "engagementMusic"
  );


const musicToggle =
  document.getElementById(
    "musicToggle"
  );


async function playMusic() {

  if (!music) {
    return;
  }


  music.volume =
    0.42;


  try {

    await music.play();


    musicToggle
      ?.classList
      .remove(
        "is-paused"
      );


    musicToggle
      ?.setAttribute(
        "aria-label",
        "Pause music"
      );

  }

  catch {

    musicToggle
      ?.classList
      .add(
        "is-paused"
      );


    musicToggle
      ?.setAttribute(
        "aria-label",
        "Play music"
      );

  }

}


function closeLanguageGate() {

  if (!languageGate) {
    return;
  }


  languageGate
    .classList
    .add(
      "is-closing"
    );


  window.setTimeout(
    () => {

      languageGate.hidden =
        true;

    },
    430
  );

}


/* Language selection also starts music.
   This user click allows audio playback on iPhone Safari. */

languageButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      async () => {

        const language =
          button.dataset.language ||
          "en";


        applyLanguage(
          language
        );


        await playMusic();


        closeLanguageGate();

      }
    );

  }
);


/* Music button */

musicToggle?.addEventListener(
  "click",
  async () => {

    if (!music) {
      return;
    }


    if (music.paused) {

      await playMusic();

    }

    else {

      music.pause();


      musicToggle
        .classList
        .add(
          "is-paused"
        );


      musicToggle
        .setAttribute(
          "aria-label",
          "Play music"
        );

    }

  }
);


/* Remember previous language */

const savedLanguage =
  localStorage.getItem(
    "engagement-language"
  );


if (
  savedLanguage &&
  translations[
    savedLanguage
  ]
) {

  applyLanguage(
    savedLanguage
  );

}


/* =========================================================
   PERFORMANCE EVENTS
   ========================================================= */

document.addEventListener(
  "visibilitychange",
  () => {

    if (
      document.hidden
    ) {

      stopCanvas();

    }

    else {

      startCanvas();

    }

  }
);


window.addEventListener(
  "resize",
  scheduleResize,
  {
    passive: true,
  }
);


window.addEventListener(
  "orientationchange",
  scheduleResize,
  {
    passive: true,
  }
);


reducedMotion
  .addEventListener?.(
    "change",
    (event) => {

      if (
        event.matches
      ) {

        stopCanvas();

        revealElements.forEach(
          (element) =>
            element
              .classList
              .add(
                "is-visible"
              )
        );

      }

      else {

        startCanvas();

      }

    }
  );


/* =========================================================
   START CANVAS
   ========================================================= */

startCanvas();
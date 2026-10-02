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


const pageTranslations = {
  hi: {
    "Two hearts, a beautiful journey": "दो दिल, एक खूबसूरत सफ़र",
    "Choose your language": "अपनी भाषा चुनें",
    "Let’s begin our story together.": "आइए, हमारी कहानी साथ शुरू करें।",
    "English": "अंग्रेज़ी",
    "Hindi": "हिन्दी",
    "Gujarati": "गुजराती",
    "Marathi": "मराठी",
    "How would you like to enter?": "आप कैसे प्रवेश करना चाहेंगे?",
    "♫ Enter with music": "♫ संगीत के साथ प्रवेश करें",
    "Start the celebration with sound": "संगीत के साथ उत्सव की शुरुआत करें",
    "Enter quietly": "बिना संगीत के प्रवेश करें",
    "You can turn music on anytime": "आप कभी भी संगीत चालू कर सकते हैं",
    "Same Souls, New Beginnings ♥": "वही दो दिल, एक नई शुरुआत ♥",
    "Music": "संगीत",
    "Our Story": "हमारी कहानी",
    "Celebration": "उत्सव",
    "Dress Code": "पोशाक",
    "Venue": "स्थान",
    "With full hearts, a new chapter begins": "भरे दिलों के साथ, एक नया अध्याय शुरू होता है",
    "invite you to celebrate their engagement": "आपको अपनी सगाई के उत्सव में आमंत्रित करते हैं",
    "Sunday, 27 December 2026": "रविवार, 27 दिसंबर 2026",
    "Sai Palace, Mira Road": "साई पैलेस, मीरा रोड",
    "Same souls. A beautiful new beginning.": "वही दो दिल। एक खूबसूरत नई शुरुआत।",
    "Meet our families": "हमारे परिवारों से मिलिए",
    "With the blessings of our families": "हमारे परिवारों के आशीर्वाद के साथ",
    "Two families.": "दो परिवार।",
    "One beautiful beginning.": "एक खूबसूरत शुरुआत।",
    "The Goradia Family": "गोराडिया परिवार",
    "The Parab Family": "परब परिवार",
    "Joyfully inviting you to celebrate this beautiful new beginning with Harshil & Pranali.": "हर्षिल और प्रणाली की इस खूबसूरत नई शुरुआत का जश्न मनाने के लिए आपको सप्रेम आमंत्रण।",
    "A love that crossed": "एक प्यार जिसने पार की",
    "every distance.": "हर दूरी।",
    "What began close to home grew into a love that carried us through every season, every distance and every dream.": "घर के पास शुरू हुई हमारी कहानी ऐसे प्यार में बदली, जिसने हर मौसम, हर दूरी और हर सपने में हमारा साथ निभाया।",
    "From neighbours to forever ♥": "पड़ोसी से हमसफ़र तक ♥",
    "10+ years": "10+ साल",
    "of us": "हमारे साथ के",
    "6 years": "6 साल",
    "of long distance": "लॉन्ग डिस्टेंस के",
    "One forever": "एक साथ, हमेशा के लिए",
    "Across different countries and changing routines, we found our way back to one another in countless calls, little traditions and memories that made the miles feel smaller.": "अलग-अलग देशों और बदलती दिनचर्या के बीच, अनगिनत कॉल्स, छोटी-छोटी परंपराओं और यादों ने हमें हमेशा एक-दूसरे के करीब रखा और दूरियों को छोटा बना दिया।",
    "Now, after more than a decade of growing together, we cannot wait to bring our families, traditions and favourite people into one room to celebrate the beginning of forever.": "अब, एक दशक से भी अधिक समय साथ बढ़ने के बाद, हम अपने परिवारों, परंपराओं और प्रियजनों के साथ हमेशा के इस नए सफ़र की शुरुआत का जश्न मनाने के लिए उत्साहित हैं।",
    "The distance ends here. The next chapter begins together. ♥": "दूरी यहीं समाप्त होती है। अगला अध्याय अब साथ शुरू होता है। ♥",
    "The Celebration": "उत्सव",
    "Three beautiful ceremonies.": "तीन खूबसूरत रस्में।",
    "One unforgettable celebration.": "एक अविस्मरणीय उत्सव।",
    "Two families. Two traditions.": "दो परिवार। दो परंपराएँ।",
    "Parab family tradition": "परब परिवार की परंपरा",
    "A cherished beginning filled with sweetness, family blessings and the joy of two families coming closer.": "मिठास, परिवार के आशीर्वाद और दो परिवारों के करीब आने की खुशी से भरी एक प्यारी शुरुआत।",
    "Discover the ceremony →": "रस्म के बारे में जानें →",
    "Goradia family tradition": "गोराडिया परिवार की परंपरा",
    "Celebrating the joining of two families with warmth, colour and heartfelt blessings.": "स्नेह, रंग और दिल से दिए आशीर्वादों के साथ दो परिवारों के मिलन का उत्सव।",
    "Our celebration": "हमारा उत्सव",
    "The rings, the music, the dancing and everyone we love celebrating beside us.": "अंगूठियाँ, संगीत, नृत्य और हमारे प्रियजनों के साथ जश्न का खूबसूरत पल।",
    "27 December 2026": "27 दिसंबर 2026",
    "We begin with Sakharpuda, a cherished Maharashtrian tradition filled with sweetness, family blessings and the joy of two families coming closer.": "हम साखरपुडा से शुरुआत करेंगे—एक प्रिय महाराष्ट्रीयन परंपरा, जो मिठास, परिवार के आशीर्वाद और दो परिवारों के करीब आने की खुशी से भरी है।",
    "A graceful beginning to the day, honouring tradition and the blessings that will carry us into our life together.": "परंपरा और उन आशीर्वादों का सम्मान करते हुए दिन की एक सुंदर शुरुआत, जो हमारे साथ के जीवन में हमारा मार्गदर्शन करेंगे।",
    "Our Gujarati traditions follow with Gol Dhana and Chunari, celebrating the joining of two families with warmth, colour and heartfelt blessings.": "इसके बाद गोल धाणा और चुनरी की हमारी गुजराती परंपराएँ होंगी, जिनमें स्नेह, रंग और दिल से दिए आशीर्वादों के साथ दो परिवारों के मिलन का उत्सव मनाया जाएगा।",
    "A meaningful moment where family, heritage and love come together in one beautifully shared tradition.": "एक अर्थपूर्ण पल, जहाँ परिवार, विरासत और प्यार एक सुंदर साझा परंपरा में एक साथ आते हैं।",
    "As evening arrives, we move into the moment we have been waiting for: the rings, the music, the dancing and everyone we love celebrating beside us.": "शाम ढलते ही वह पल आएगा जिसका हमें इंतज़ार था—अंगूठियाँ, संगीत, नृत्य और हमारे सभी प्रियजनों के साथ जश्न।",
    "Come ready for romance, music, joyful dancing and just the right touch of Bollywood magic.": "प्यार, संगीत, खुशी भरे नृत्य और बॉलीवुड के जादू के साथ जश्न मनाने के लिए तैयार होकर आइए।",
    "Dress for every": "हर खूबसूरत पल के लिए",
    "beautiful chapter.": "खास अंदाज़ में सजें।",
    "Traditional Indian": "पारंपरिक भारतीय",
    "Women": "महिलाएँ",
    "Saree, lehenga or elegant traditional wear": "साड़ी, लहंगा या सुरुचिपूर्ण पारंपरिक परिधान",
    "Men": "पुरुष",
    "Kurta, bandhgala or traditional Indian wear": "कुर्ता, बंदगला या पारंपरिक भारतीय परिधान",
    "08 PM onwards": "रात 08 बजे से आगे",
    "Bollywood Glam": "बॉलीवुड ग्लैम",
    "Glamorous Indian or Indo-Western evening wear": "ग्लैमरस भारतीय या इंडो-वेस्टर्न ईवनिंग वियर",
    "Indo-Western, bandhgalas or sharp evening looks": "इंडो-वेस्टर्न, बंदगला या स्टाइलिश ईवनिंग लुक",
    "A special request from us": "हमारी ओर से एक खास अनुरोध",
    "Come ready for": "तैयार होकर आइए",
    "There is one song we would love everyone to share with us. Give it a listen before the evening and come ready to sing along.": "एक गीत है जिसे हम आप सभी के साथ साझा करना चाहते हैं। शाम से पहले इसे सुन लें और हमारे साथ गाने के लिए तैयार होकर आइए।",
    "Listen on YouTube →": "YouTube पर सुनें →",
    "Latest Update": "नवीनतम जानकारी",
    "Everything is set for our": "हमारी",
    "beautiful beginning.": "खूबसूरत शुरुआत के लिए सब तैयार है।",
    "Our celebration remains on Sunday, 27 December 2026 at Sai Palace, Mira Road. Keep this invitation handy for timings, dress code and directions.": "हमारा उत्सव रविवार, 27 दिसंबर 2026 को साई पैलेस, मीरा रोड में ही होगा। समय, पोशाक और रास्ते की जानकारी के लिए इस निमंत्रण को संभालकर रखें।",
    "Share this invitation": "यह निमंत्रण साझा करें",
    "The Venue": "समारोह स्थल",
    "A beautiful setting for a celebration we will remember forever.": "एक खूबसूरत जगह, जहाँ हम ऐसा उत्सव मनाएँगे जिसे हमेशा याद रखेंगे।",
    "Open in Google Maps": "Google Maps में खोलें",
    "Add to Calendar": "कैलेंडर में जोड़ें",
    "More than a decade of memories, now gathered into one unforgettable celebration.": "एक दशक से भी अधिक यादें, अब एक अविस्मरणीय उत्सव में साथ।",
    "♡ Share your favourite moments": "♡ अपने पसंदीदा पल साझा करें",
    "♬ Dance like nobody is watching": "♬ दिल खोलकर नाचें",
    "✦ Make memories with us": "✦ हमारे साथ यादें बनाएँ"
  },
  gu: {
    "Two hearts, a beautiful journey": "બે દિલ, એક સુંદર સફર",
    "Choose your language": "તમારી ભાષા પસંદ કરો",
    "Let’s begin our story together.": "ચાલો, અમારી કહાની સાથે શરૂ કરીએ.",
    "English": "અંગ્રેજી", "Hindi": "હિન્દી", "Gujarati": "ગુજરાતી", "Marathi": "મરાઠી",
    "How would you like to enter?": "તમે કેવી રીતે પ્રવેશ કરવા માંગો છો?",
    "♫ Enter with music": "♫ સંગીત સાથે પ્રવેશ કરો",
    "Start the celebration with sound": "સંગીત સાથે ઉજવણીની શરૂઆત કરો",
    "Enter quietly": "શાંતિથી પ્રવેશ કરો",
    "You can turn music on anytime": "તમે ગમે ત્યારે સંગીત ચાલુ કરી શકો છો",
    "Same Souls, New Beginnings ♥": "એ જ બે દિલ, એક નવી શરૂઆત ♥",
    "Music": "સંગીત", "Our Story": "અમારી કહાની", "Celebration": "ઉજવણી", "Dress Code": "પોશાક", "Venue": "સ્થળ",
    "With full hearts, a new chapter begins": "હૃદયપૂર્વક, એક નવો અધ્યાય શરૂ થાય છે",
    "invite you to celebrate their engagement": "અમારી સગાઈની ઉજવણીમાં આપને હાર્દિક આમંત્રણ",
    "Sunday, 27 December 2026": "રવિવાર, 27 ડિસેમ્બર 2026",
    "Sai Palace, Mira Road": "સાઈ પેલેસ, મીરા રોડ",
    "Same souls. A beautiful new beginning.": "એ જ બે દિલ. એક સુંદર નવી શરૂઆત.",
    "Meet our families": "અમારા પરિવારોને મળો",
    "With the blessings of our families": "અમારા પરિવારોના આશીર્વાદ સાથે",
    "Two families.": "બે પરિવાર.", "One beautiful beginning.": "એક સુંદર શરૂઆત.",
    "The Goradia Family": "ગોરાડિયા પરિવાર", "The Parab Family": "પરબ પરિવાર",
    "Joyfully inviting you to celebrate this beautiful new beginning with Harshil & Pranali.": "હર્ષિલ અને પ્રણાલીની આ સુંદર નવી શરૂઆતની ઉજવણીમાં આપને પ્રેમભર્યું આમંત્રણ.",
    "A love that crossed": "એક પ્રેમ જેણે પાર કર્યું", "every distance.": "દરેક અંતર.",
    "What began close to home grew into a love that carried us through every season, every distance and every dream.": "ઘરની નજીક શરૂ થયેલી અમારી કહાની એવા પ્રેમમાં ખીલી, જેણે દરેક ઋતુ, દરેક અંતર અને દરેક સપનામાં અમારો સાથ આપ્યો.",
    "From neighbours to forever ♥": "પાડોશીથી જીવનસાથી સુધી ♥",
    "10+ years": "10+ વર્ષ", "of us": "અમારા સાથના", "6 years": "6 વર્ષ", "of long distance": "લાંબા અંતરના", "One forever": "એક સાથ, હંમેશા માટે",
    "Across different countries and changing routines, we found our way back to one another in countless calls, little traditions and memories that made the miles feel smaller.": "અલગ દેશો અને બદલાતી દિનચર્યાઓ વચ્ચે, અસંખ્ય કૉલ્સ, નાની પરંપરાઓ અને યાદોએ અમને હંમેશા એકબીજાની નજીક રાખ્યા અને અંતરને નાનું બનાવી દીધું.",
    "Now, after more than a decade of growing together, we cannot wait to bring our families, traditions and favourite people into one room to celebrate the beginning of forever.": "હવે, એક દાયકાથી વધુ સમય સાથે આગળ વધ્યા પછી, અમારા પરિવારો, પરંપરાઓ અને પ્રિયજનો સાથે હંમેશાના આ નવા સફરની શરૂઆત ઉજવવા અમે આતુર છીએ.",
    "The distance ends here. The next chapter begins together. ♥": "અંતર અહીં પૂરું થાય છે. આગળનો અધ્યાય હવે સાથે શરૂ થાય છે. ♥",
    "The Celebration": "ઉજવણી", "Three beautiful ceremonies.": "ત્રણ સુંદર વિધિઓ.", "One unforgettable celebration.": "એક અવિસ્મરણીય ઉજવણી.", "Two families. Two traditions.": "બે પરિવાર. બે પરંપરાઓ.",
    "Parab family tradition": "પરબ પરિવારની પરંપરા",
    "A cherished beginning filled with sweetness, family blessings and the joy of two families coming closer.": "મીઠાશ, પરિવારના આશીર્વાદ અને બે પરિવારો નજીક આવવાની ખુશીથી ભરેલી એક પ્રિય શરૂઆત.",
    "Discover the ceremony →": "વિધિ વિશે જાણો →",
    "Goradia family tradition": "ગોરાડિયા પરિવારની પરંપરા",
    "Celebrating the joining of two families with warmth, colour and heartfelt blessings.": "હૂંફ, રંગ અને હૃદયપૂર્વકના આશીર્વાદ સાથે બે પરિવારોના મિલનની ઉજવણી.",
    "Our celebration": "અમારી ઉજવણી",
    "The rings, the music, the dancing and everyone we love celebrating beside us.": "અંગૂઠીઓ, સંગીત, નૃત્ય અને અમારા પ્રિયજનો સાથે ઉજવણીનો સુંદર પળ.",
    "27 December 2026": "27 ડિસેમ્બર 2026",
    "We begin with Sakharpuda, a cherished Maharashtrian tradition filled with sweetness, family blessings and the joy of two families coming closer.": "અમે સાખરપુડાથી શરૂઆત કરીશું—મીઠાશ, પરિવારના આશીર્વાદ અને બે પરિવારો નજીક આવવાની ખુશીથી ભરેલી પ્રિય મહારાષ્ટ્રીયન પરંપરા.",
    "A graceful beginning to the day, honouring tradition and the blessings that will carry us into our life together.": "પરંપરા અને અમારા સહજીવનમાં સાથ આપનારા આશીર્વાદોને માન આપતી દિવસની સુંદર શરૂઆત.",
    "Our Gujarati traditions follow with Gol Dhana and Chunari, celebrating the joining of two families with warmth, colour and heartfelt blessings.": "ત્યારબાદ ગોળ ધાણા અને ચૂંદડીની અમારી ગુજરાતી પરંપરાઓ, જેમાં હૂંફ, રંગ અને હૃદયપૂર્વકના આશીર્વાદ સાથે બે પરિવારોના મિલનની ઉજવણી થશે.",
    "A meaningful moment where family, heritage and love come together in one beautifully shared tradition.": "એક અર્થસભર પળ, જ્યાં પરિવાર, વારસો અને પ્રેમ એક સુંદર સહિયારી પરંપરામાં સાથે આવે છે.",
    "As evening arrives, we move into the moment we have been waiting for: the rings, the music, the dancing and everyone we love celebrating beside us.": "સાંજ પડતાં જ તે પળ આવશે જેની અમે રાહ જોઈ રહ્યા હતા—અંગૂઠીઓ, સંગીત, નૃત્ય અને અમારા બધા પ્રિયજનો સાથે ઉજવણી.",
    "Come ready for romance, music, joyful dancing and just the right touch of Bollywood magic.": "પ્રેમ, સંગીત, આનંદભર્યા નૃત્ય અને બોલિવૂડના જાદુ સાથે ઉજવણી કરવા તૈયાર થઈને આવજો.",
    "Dress for every": "દરેક સુંદર પળ માટે", "beautiful chapter.": "ખાસ અંદાજમાં સજ્જ થાઓ.",
    "Traditional Indian": "પરંપરાગત ભારતીય", "Women": "મહિલાઓ", "Saree, lehenga or elegant traditional wear": "સાડી, લહેંગા અથવા ભવ્ય પરંપરાગત પોશાક", "Men": "પુરુષો", "Kurta, bandhgala or traditional Indian wear": "કુર્તા, બંધગળા અથવા પરંપરાગત ભારતીય પોશાક",
    "08 PM onwards": "રાત્રે 08 વાગ્યાથી આગળ", "Bollywood Glam": "બોલિવૂડ ગ્લેમ",
    "Glamorous Indian or Indo-Western evening wear": "ગ્લેમરસ ભારતીય અથવા ઇન્ડો-વેસ્ટર્ન ઈવનિંગ વેર",
    "Indo-Western, bandhgalas or sharp evening looks": "ઇન્ડો-વેસ્ટર્ન, બંધગળા અથવા સ્ટાઇલિશ ઈવનિંગ લુક",
    "A special request from us": "અમારી તરફથી એક ખાસ વિનંતી", "Come ready for": "તૈયાર થઈને આવજો",
    "There is one song we would love everyone to share with us. Give it a listen before the evening and come ready to sing along.": "એક ગીત છે જે અમે આપ સૌ સાથે માણવા માંગીએ છીએ. સાંજ પહેલાં તેને સાંભળી લેજો અને અમારી સાથે ગાવા તૈયાર થઈને આવજો.",
    "Listen on YouTube →": "YouTube પર સાંભળો →",
    "Latest Update": "નવીનતમ માહિતી", "Everything is set for our": "અમારી", "beautiful beginning.": "સુંદર શરૂઆત માટે બધું તૈયાર છે.",
    "Our celebration remains on Sunday, 27 December 2026 at Sai Palace, Mira Road. Keep this invitation handy for timings, dress code and directions.": "અમારી ઉજવણી રવિવાર, 27 ડિસેમ્બર 2026ના રોજ સાઈ પેલેસ, મીરા રોડ ખાતે જ રહેશે. સમય, પોશાક અને દિશાઓ માટે આ આમંત્રણ સાચવી રાખજો.",
    "Share this invitation": "આ આમંત્રણ શેર કરો", "The Venue": "સમારોહ સ્થળ",
    "A beautiful setting for a celebration we will remember forever.": "એક સુંદર સ્થળ, જ્યાંની ઉજવણી અમે હંમેશા યાદ રાખીશું.",
    "Open in Google Maps": "Google Maps માં ખોલો", "Add to Calendar": "કૅલેન્ડરમાં ઉમેરો",
    "More than a decade of memories, now gathered into one unforgettable celebration.": "એક દાયકાથી વધુ યાદો, હવે એક અવિસ્મરણીય ઉજવણીમાં સાથે.",
    "♡ Share your favourite moments": "♡ તમારી મનપસંદ પળો શેર કરો", "♬ Dance like nobody is watching": "♬ મન મૂકીને નાચો", "✦ Make memories with us": "✦ અમારી સાથે યાદો બનાવો"
  },
  mr: {
    "Two hearts, a beautiful journey": "दोन मने, एक सुंदर प्रवास",
    "Choose your language": "तुमची भाषा निवडा",
    "Let’s begin our story together.": "चला, आमची गोष्ट एकत्र सुरू करूया.",
    "English": "इंग्रजी", "Hindi": "हिंदी", "Gujarati": "गुजराती", "Marathi": "मराठी",
    "How would you like to enter?": "तुम्हाला कसे प्रवेश करायचे आहे?",
    "♫ Enter with music": "♫ संगीतासह प्रवेश करा", "Start the celebration with sound": "संगीतासह सोहळ्याची सुरुवात करा",
    "Enter quietly": "शांतपणे प्रवेश करा", "You can turn music on anytime": "तुम्ही कधीही संगीत सुरू करू शकता",
    "Same Souls, New Beginnings ♥": "तीच दोन मने, एक नवी सुरुवात ♥",
    "Music": "संगीत", "Our Story": "आमची गोष्ट", "Celebration": "सोहळा", "Dress Code": "पोशाख", "Venue": "स्थळ",
    "With full hearts, a new chapter begins": "मनापासून, एका नव्या अध्यायाची सुरुवात",
    "invite you to celebrate their engagement": "आमच्या साखरपुड्याच्या आनंदसोहळ्यास आपले प्रेमळ आमंत्रण",
    "Sunday, 27 December 2026": "रविवार, 27 डिसेंबर 2026", "Sai Palace, Mira Road": "साई पॅलेस, मीरा रोड",
    "Same souls. A beautiful new beginning.": "तीच दोन मने. एक सुंदर नवी सुरुवात.", "Meet our families": "आमच्या कुटुंबीयांना भेटा",
    "With the blessings of our families": "आमच्या कुटुंबीयांच्या आशीर्वादाने", "Two families.": "दोन कुटुंबे.", "One beautiful beginning.": "एक सुंदर सुरुवात.",
    "The Goradia Family": "गोराडिया परिवार", "The Parab Family": "परब परिवार",
    "Joyfully inviting you to celebrate this beautiful new beginning with Harshil & Pranali.": "हर्षिल आणि प्रणालीच्या या सुंदर नव्या सुरुवातीचा आनंद साजरा करण्यासाठी आपले प्रेमळ आमंत्रण.",
    "A love that crossed": "एक प्रेम ज्याने पार केले", "every distance.": "प्रत्येक अंतर.",
    "What began close to home grew into a love that carried us through every season, every distance and every dream.": "घराच्या जवळ सुरू झालेली आमची गोष्ट अशा प्रेमात फुलली, ज्याने प्रत्येक ऋतू, प्रत्येक अंतर आणि प्रत्येक स्वप्नात आमची साथ दिली.",
    "From neighbours to forever ♥": "शेजाऱ्यांपासून आयुष्यभराच्या सोबतीपर्यंत ♥",
    "10+ years": "10+ वर्षे", "of us": "आमच्या सोबतीची", "6 years": "6 वर्षे", "of long distance": "दूर राहूनही सोबत", "One forever": "एक साथ, कायमची",
    "Across different countries and changing routines, we found our way back to one another in countless calls, little traditions and memories that made the miles feel smaller.": "वेगवेगळ्या देशांत आणि बदलत्या दिनक्रमातही, असंख्य कॉल्स, छोट्या परंपरा आणि आठवणींनी आम्हाला नेहमी एकमेकांच्या जवळ ठेवले आणि अंतर कमी वाटू दिले.",
    "Now, after more than a decade of growing together, we cannot wait to bring our families, traditions and favourite people into one room to celebrate the beginning of forever.": "आता, दशकाहून अधिक काळ एकत्र वाढल्यानंतर, आमचे कुटुंब, परंपरा आणि आवडती माणसे एका ठिकाणी आणून कायमच्या या नव्या प्रवासाची सुरुवात साजरी करण्यासाठी आम्ही उत्सुक आहोत.",
    "The distance ends here. The next chapter begins together. ♥": "अंतर इथे संपते. पुढचा अध्याय आता एकत्र सुरू होतो. ♥",
    "The Celebration": "सोहळा", "Three beautiful ceremonies.": "तीन सुंदर विधी.", "One unforgettable celebration.": "एक अविस्मरणीय सोहळा.", "Two families. Two traditions.": "दोन कुटुंबे. दोन परंपरा.",
    "Parab family tradition": "परब परिवाराची परंपरा",
    "A cherished beginning filled with sweetness, family blessings and the joy of two families coming closer.": "गोडवा, कुटुंबीयांचे आशीर्वाद आणि दोन कुटुंबे जवळ येण्याच्या आनंदाने भरलेली एक सुंदर सुरुवात.",
    "Discover the ceremony →": "विधी जाणून घ्या →", "Goradia family tradition": "गोराडिया परिवाराची परंपरा",
    "Celebrating the joining of two families with warmth, colour and heartfelt blessings.": "आपुलकी, रंग आणि मनापासूनच्या आशीर्वादांसह दोन कुटुंबांच्या मिलनाचा आनंदसोहळा.",
    "Our celebration": "आमचा सोहळा",
    "The rings, the music, the dancing and everyone we love celebrating beside us.": "अंगठ्या, संगीत, नृत्य आणि आमच्या प्रियजनांसोबत साजरा होणारा सुंदर क्षण.",
    "27 December 2026": "27 डिसेंबर 2026",
    "We begin with Sakharpuda, a cherished Maharashtrian tradition filled with sweetness, family blessings and the joy of two families coming closer.": "आम्ही साखरपुड्याने सुरुवात करू—गोडवा, कुटुंबीयांचे आशीर्वाद आणि दोन कुटुंबे जवळ येण्याच्या आनंदाने भरलेली एक जिव्हाळ्याची महाराष्ट्रीयन परंपरा.",
    "A graceful beginning to the day, honouring tradition and the blessings that will carry us into our life together.": "परंपरा आणि आमच्या सहजीवनाला लाभणाऱ्या आशीर्वादांचा सन्मान करत दिवसाची सुंदर सुरुवात.",
    "Our Gujarati traditions follow with Gol Dhana and Chunari, celebrating the joining of two families with warmth, colour and heartfelt blessings.": "यानंतर गोल धाणा आणि चुनरीच्या आमच्या गुजराती परंपरा—आपुलकी, रंग आणि मनापासूनच्या आशीर्वादांसह दोन कुटुंबांच्या मिलनाचा सोहळा.",
    "A meaningful moment where family, heritage and love come together in one beautifully shared tradition.": "एक अर्थपूर्ण क्षण, जिथे कुटुंब, वारसा आणि प्रेम एका सुंदर सामायिक परंपरेत एकत्र येतात.",
    "As evening arrives, we move into the moment we have been waiting for: the rings, the music, the dancing and everyone we love celebrating beside us.": "संध्याकाळ होताच तो क्षण येईल ज्याची आम्ही वाट पाहत होतो—अंगठ्या, संगीत, नृत्य आणि आमच्या सर्व प्रियजनांसोबतचा आनंदसोहळा.",
    "Come ready for romance, music, joyful dancing and just the right touch of Bollywood magic.": "प्रेम, संगीत, आनंदी नृत्य आणि बॉलिवूडच्या जादूसह उत्सवासाठी तयार होऊन या.",
    "Dress for every": "प्रत्येक सुंदर क्षणासाठी", "beautiful chapter.": "खास अंदाजात सजून या.",
    "Traditional Indian": "पारंपरिक भारतीय", "Women": "महिला", "Saree, lehenga or elegant traditional wear": "साडी, लेहेंगा किंवा देखणा पारंपरिक पोशाख", "Men": "पुरुष", "Kurta, bandhgala or traditional Indian wear": "कुर्ता, बंदगला किंवा पारंपरिक भारतीय पोशाख",
    "08 PM onwards": "रात्री 08 वाजल्यापासून", "Bollywood Glam": "बॉलिवूड ग्लॅम",
    "Glamorous Indian or Indo-Western evening wear": "ग्लॅमरस भारतीय किंवा इंडो-वेस्टर्न ईव्हनिंग वेअर",
    "Indo-Western, bandhgalas or sharp evening looks": "इंडो-वेस्टर्न, बंदगला किंवा स्टायलिश ईव्हनिंग लुक",
    "A special request from us": "आमच्याकडून एक खास विनंती", "Come ready for": "तयार होऊन या",
    "There is one song we would love everyone to share with us. Give it a listen before the evening and come ready to sing along.": "एक गाणे आहे जे आम्हाला तुम्हा सर्वांसोबत अनुभवायचे आहे. संध्याकाळपूर्वी ते ऐका आणि आमच्यासोबत गाण्यासाठी तयार होऊन या.",
    "Listen on YouTube →": "YouTube वर ऐका →",
    "Latest Update": "नवीनतम माहिती", "Everything is set for our": "आमच्या", "beautiful beginning.": "सुंदर सुरुवातीसाठी सर्व काही तयार आहे.",
    "Our celebration remains on Sunday, 27 December 2026 at Sai Palace, Mira Road. Keep this invitation handy for timings, dress code and directions.": "आमचा सोहळा रविवार, 27 डिसेंबर 2026 रोजी साई पॅलेस, मीरा रोड येथेच होईल. वेळा, पोशाख आणि दिशांसाठी हे निमंत्रण जवळ ठेवा.",
    "Share this invitation": "हे निमंत्रण शेअर करा", "The Venue": "समारंभ स्थळ",
    "A beautiful setting for a celebration we will remember forever.": "एक सुंदर ठिकाण, जिथला सोहळा आम्ही कायम लक्षात ठेवू.",
    "Open in Google Maps": "Google Maps मध्ये उघडा", "Add to Calendar": "कॅलेंडरमध्ये जोडा",
    "More than a decade of memories, now gathered into one unforgettable celebration.": "दशकाहून अधिक आठवणी, आता एका अविस्मरणीय सोहळ्यात एकत्र.",
    "♡ Share your favourite moments": "♡ तुमचे आवडते क्षण शेअर करा", "♬ Dance like nobody is watching": "♬ मनसोक्त नाचा", "✦ Make memories with us": "✦ आमच्यासोबत आठवणी तयार करा"
  }
};

const textNodes = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
let node;
while ((node = walker.nextNode())) {
  const original = node.nodeValue.replace(/\s+/g, " ").trim();
  if (original) textNodes.push({ node, original });
}

function applyLanguage(language) {
  const dictionary = pageTranslations[language] || {};

  textNodes.forEach(({ node, original }) => {
    const translated = dictionary[original];
    if (!translated) {
      node.nodeValue = node.nodeValue.replace(/\S[\s\S]*\S|\S/, original);
      return;
    }

    const leading = node.nodeValue.match(/^\s*/)?.[0] || "";
    const trailing = node.nodeValue.match(/\s*$/)?.[0] || "";
    node.nodeValue = leading + translated + trailing;
  });

  document.documentElement.lang = language;
  localStorage.setItem("engagement-language", language);
}

/* =========================================================
   MUSIC + ENTRY CHOICE
   ========================================================= */

const music = document.getElementById("engagementMusic");
const musicToggle = document.getElementById("musicToggle");
const entryOptions = document.getElementById("entryOptions");
const entryButtons = document.querySelectorAll("[data-entry-mode]");

let selectedLanguage =
  localStorage.getItem("engagement-language") || "en";

/* One soundtrack for every language for now. */
const soundtrack = "/music/engagement.mp3";

function setMusicTrack() {
  if (!music) return;
  if (!music.src.endsWith(soundtrack)) {
    music.src = soundtrack;
    music.load();
  }
}

async function playMusic() {
  if (!music) return;
  music.volume = 0.42;

  try {
    await music.play();
    musicToggle?.classList.remove("is-paused");
    musicToggle?.setAttribute("aria-label", "Pause music");
  } catch {
musicToggle?.classList.add("is-paused");
    musicToggle?.setAttribute("aria-label", "Play music");
  }
}

function closeLanguageGate() {
  if (!languageGate) return;
  languageGate.classList.add("is-closing");
  window.setTimeout(() => {
    languageGate.hidden = true;
  }, 430);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedLanguage = button.dataset.language || "en";
    applyLanguage(selectedLanguage);
    setMusicTrack();

    document.querySelector(".language-options")?.setAttribute("hidden", "");
    document.querySelector(".language-gate__lead")?.setAttribute("hidden", "");
    document.querySelector("#languageTitle").textContent =
      selectedLanguage === "hi" ? "आप कैसे प्रवेश करना चाहेंगे?" :
      selectedLanguage === "gu" ? "તમે કેવી રીતે પ્રવેશ કરવા માંગો છો?" :
      selectedLanguage === "mr" ? "तुम्हाला कसे प्रवेश करायचे आहे?" :
      "How would you like to enter?";

    if (entryOptions) entryOptions.hidden = false;
  });
});

entryButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    if (button.dataset.entryMode === "music") {
      await playMusic();
    } else {
      music?.pause();
      musicToggle?.classList.add("is-paused");
    }
    closeLanguageGate();
  });
});

musicToggle?.addEventListener("click", async () => {
  if (!music) return;

  if (music.paused) {
    setMusicTrack();
    await playMusic();
  } else {
    music.pause();
    musicToggle.classList.add("is-paused");
    musicToggle.setAttribute("aria-label", "Play music");
  }
});

const savedLanguage = localStorage.getItem("engagement-language");
if (savedLanguage && translations[savedLanguage]) {
  selectedLanguage = savedLanguage;
  applyLanguage(savedLanguage);
}


/* =========================================================
   SHARE INVITATION
   ========================================================= */

const shareInvitation = document.getElementById("shareInvitation");
const shareStatus = document.getElementById("shareStatus");

shareInvitation?.addEventListener("click", async () => {
  const shareMessages = {
    en: "Join us for Harshil & Pranali's engagement celebration on 27 December 2026.",
    hi: "27 दिसंबर 2026 को हर्षिल और प्रणाली की सगाई के उत्सव में हमारे साथ शामिल हों।",
    gu: "27 ડિસેમ્બર 2026ના રોજ હર્ષિલ અને પ્રણાલીની સગાઈની ઉજવણીમાં અમારી સાથે જોડાઓ.",
    mr: "27 डिसेंबर 2026 रोजी हर्षिल आणि प्रणालीच्या साखरपुड्याच्या सोहळ्यात आमच्यासोबत सहभागी व्हा."
  };

  const shareData = {
    title: "Harshil & Pranali | Engagement",
    text: shareMessages[selectedLanguage] || shareMessages.en,
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      if (shareStatus) shareStatus.textContent =
        selectedLanguage === "hi" ? "निमंत्रण लिंक कॉपी हो गई।" :
        selectedLanguage === "gu" ? "આમંત્રણની લિંક કૉપી થઈ ગઈ." :
        selectedLanguage === "mr" ? "निमंत्रणाची लिंक कॉपी झाली." :
        "Invitation link copied.";
    }
  } catch (error) {
    if (error?.name !== "AbortError" && shareStatus) {
      shareStatus.textContent =
        selectedLanguage === "hi" ? "कृपया ब्राउज़र से निमंत्रण लिंक कॉपी करें।" :
        selectedLanguage === "gu" ? "કૃપા કરીને બ્રાઉઝરમાંથી આમંત્રણની લિંક કૉપી કરો." :
        selectedLanguage === "mr" ? "कृपया ब्राउझरमधून निमंत्रणाची लिंक कॉपी करा." :
        "Please copy the invitation link from your browser.";
    }
  }
});


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
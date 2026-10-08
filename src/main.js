import "./style.css";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

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

function readSavedLanguage() {
  try { return localStorage.getItem("engagement-language"); } catch { return null; }
}

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
    "Change language": "भाषा बदलें",
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
    "beautiful beginning.": "खूबसूरत शुरुआत के लिए सब तैयार है।",
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
    "Change language": "ભાષા બદલો",
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
    "beautiful beginning.": "સુંદર શરૂઆત માટે બધું તૈયાર છે.",
    "The Venue": "સમારોહ સ્થળ",
    "A beautiful setting for a celebration we will remember forever.": "એક સુંદર સ્થળ, જ્યાંની ઉજવણી અમે હંમેશા યાદ રાખીશું.",
    "Open in Google Maps": "Google Maps માં ખોલો", "Add to Calendar": "કૅલેન્ડરમાં ઉમેરો",
    "More than a decade of memories, now gathered into one unforgettable celebration.": "એક દાયકાથી વધુ યાદો, હવે એક અવિસ્મરણીય ઉજવણીમાં સાથે.",
    "♡ Share your favourite moments": "♡ તમારી મનપસંદ પળો શેર કરો", "♬ Dance like nobody is watching": "♬ મન મૂકીને નાચો", "✦ Make memories with us": "✦ અમારી સાથે યાદો બનાવો"
  },
  mr: {
    "Change language": "भाषा बदला",
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
    "beautiful beginning.": "सुंदर सुरुवातीसाठी सर्व काही तयार आहे.",
    "The Venue": "समारंभ स्थळ",
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
  try { localStorage.setItem("engagement-language", language); } catch { /* Storage may be unavailable in private browsing. */ }
}

/* =========================================================
   MUSIC + ENTRY CHOICE
   ========================================================= */

const music = document.getElementById("engagementMusic");
const musicToggle = document.getElementById("musicToggle");
const entryOptions = document.getElementById("entryOptions");
const entryButtons = document.querySelectorAll("[data-entry-mode]");

let selectedLanguage =
  readSavedLanguage() || "en";

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
    musicToggle?.setAttribute("aria-pressed", "true");
  } catch {
musicToggle?.classList.add("is-paused");
    musicToggle?.setAttribute("aria-label", "Play music");
    musicToggle?.setAttribute("aria-pressed", "false");
  }
}

function closeLanguageGate() {
  if (!languageGate) return;
  languageGate.classList.add("is-closing");
  window.setTimeout(() => {
    languageGate.hidden = true;
    document.querySelector(".site-shell")?.removeAttribute("inert");
    musicToggle?.removeAttribute("inert");
    document.body.classList.remove("entry-open");
    document.getElementById("invitationTitle")?.focus({ preventScroll: true });
  }, 430);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedLanguage = button.dataset.language || "en";
    applyLanguage(selectedLanguage);

    document.querySelector(".language-options")?.setAttribute("hidden", "");
    document.querySelector(".language-gate__lead")?.setAttribute("hidden", "");
    document.querySelector("#languageTitle").textContent =
      selectedLanguage === "hi" ? "आप कैसे प्रवेश करना चाहेंगे?" :
      selectedLanguage === "gu" ? "તમે કેવી રીતે પ્રવેશ કરવા માંગો છો?" :
      selectedLanguage === "mr" ? "तुम्हाला कसे प्रवेश करायचे आहे?" :
      "How would you like to enter?";

    if (entryOptions) entryOptions.hidden = false;
    entryButtons[0]?.focus();
  });
});

entryButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    if (button.dataset.entryMode === "music") {
      void playMusic();
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
    musicToggle.setAttribute("aria-pressed", "false");
  }
});


// Keep background controls out of the dialog's keyboard and accessibility flow.
if (languageGate && !languageGate.hidden) {
  document.querySelector(".site-shell")?.setAttribute("inert", "");
  musicToggle?.setAttribute("inert", "");
  document.body.classList.add("entry-open");
  languageButtons[0]?.focus();
}

languageGate?.addEventListener("keydown", (event) => {
  if (event.key !== "Tab") return;
  const controls = [...languageGate.querySelectorAll("button")]
    .filter(button => !button.disabled && button.getClientRects().length);
  const first = controls[0];
  const last = controls.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault(); last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault(); first?.focus();
  }
});

document.getElementById("changeLanguage")?.addEventListener("click", () => {
  if (entryOptions) entryOptions.hidden = true;
  document.querySelector(".language-options")?.removeAttribute("hidden");
  document.querySelector(".language-gate__lead")?.removeAttribute("hidden");
  document.getElementById("languageTitle").textContent =
    pageTranslations[selectedLanguage]?.["Choose your language"] || "Choose your language";
  languageButtons[0]?.focus();
});

const savedLanguage = readSavedLanguage();
if (savedLanguage && (savedLanguage === "en" || pageTranslations[savedLanguage])) {
  selectedLanguage = savedLanguage;
  applyLanguage(savedLanguage);
}


/* Royal motion: independent reveal, scroll depth, tilt, and particle layers. */
const canvas = document.getElementById('ambientCanvas');
const ctx = canvas?.getContext('2d', { alpha: true, desynchronized: true });
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const depthLayers = [...document.querySelectorAll('[data-depth]')];
const surfaces = [...document.querySelectorAll('[data-tilt]')];
const revealElements = [...document.querySelectorAll('.reveal')];
const visibleDepth = new Set();
let width = 1, height = 1, particles = [], animationFrame = 0, resizeFrame = 0;
let previousTime = 0, depthDirty = true;
let pointer = { x: .5, y: .5, active: false };
let activeSurface = null;
let tiltFrame = 0;
const rand = (a, b) => a + Math.random() * (b - a);

function makeParticle(petal, initial = true) {
  const depth = rand(.3, 1);
  return {
    petal, depth, x: rand(-20, width + 20),
    y: initial ? rand(0, height) : petal ? -24 : height + 24,
    size: petal ? rand(3, 7) * depth : rand(.7, 1.8) * depth,
    speed: (petal ? rand(12, 27) : rand(5, 12)) * depth,
    phase: rand(0, Math.PI * 2), rotation: rand(0, Math.PI * 2),
    spin: rand(-.5, .5), opacity: rand(.16, .4) * depth,
    color: petal ? ['#da8097', '#bd5979', '#f3b7b2'][Math.floor(rand(0, 3))] : '#f6dba4',
  };
}
function resizeCanvas() {
  width = Math.max(1, document.documentElement.clientWidth || window.innerWidth);
  height = Math.max(1, window.innerHeight);
  if (canvas && ctx) {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const lowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    const count = Math.round((width < 769 ? 32 : 58) * (lowPower ? .7 : 1));
    if (!particles.length || Math.abs(particles.length - count) > 8) {
      particles = Array.from({ length: count }, (_, i) => makeParticle(i % 3 === 0));
    } else {
      particles.forEach(p => { p.x = Math.min(p.x, width + 20); p.y = Math.min(p.y, height + 20); });
    }
  }
  depthDirty = true;
}
function updateDepth() {
  const viewHeight = window.innerHeight;
  visibleDepth.forEach(layer => {
    // Measure the stable wrapper, not the transformed child, to avoid feedback.
    const rect = layer.parentElement.getBoundingClientRect();
    const progress = Math.max(-1, Math.min(1, (viewHeight / 2 - rect.top - rect.height / 2) / viewHeight));
    const amount = Number(layer.dataset.depth) * (finePointer.matches ? 1 : .55);
    layer.style.setProperty('--parallax-y', `${(progress * amount).toFixed(2)}px`);
  });
  depthDirty = false;
}
function drawParticle(p, time, delta) {
  const sway = Math.sin(time * .00065 + p.phase);
  p.y += (p.petal ? 1 : -1) * p.speed * delta;
  p.x += (sway * 10 + (pointer.active ? (pointer.x - .5) * 12 * p.depth : 0)) * delta;
  p.rotation += p.spin * delta;
  if (p.y > height + 30 || p.y < -30 || p.x < -40 || p.x > width + 40) {
    Object.assign(p, makeParticle(p.petal, false));
  }
  ctx.save();
  ctx.globalAlpha = p.opacity * (p.petal ? 1 : .65 + Math.sin(time * .001 + p.phase) * .25);
  ctx.fillStyle = p.color;
  ctx.translate(p.x, p.y);
  if (p.petal) {
    ctx.rotate(p.rotation);
    ctx.scale(.65 + .35 * Math.abs(Math.sin(time * .0008 + p.phase)), 1);
    ctx.beginPath();
    ctx.moveTo(0, -p.size);
    ctx.bezierCurveTo(p.size, -p.size * .6, p.size, p.size * .6, 0, p.size);
    ctx.bezierCurveTo(-p.size * .7, p.size * .4, -p.size, -p.size * .5, 0, -p.size);
    ctx.fill();
  } else {
    // A flat translucent halo avoids expensive per-particle shadow blur.
    ctx.globalAlpha *= .25;
    ctx.beginPath(); ctx.arc(0, 0, p.size * 3, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha *= 4;
    ctx.beginPath(); ctx.arc(0, 0, p.size, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}
function tick(time) {
  animationFrame = 0;
  if (document.hidden || reducedMotion.matches) return;
  const delta = previousTime ? Math.min((time - previousTime) / 1000, .034) : 0;
  previousTime = time;
  if (depthDirty) updateDepth();
  if (ctx) {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => drawParticle(p, time, delta));
  }
  animationFrame = requestAnimationFrame(tick);
}
function stopMotion() {
  cancelAnimationFrame(animationFrame); animationFrame = 0; previousTime = 0;
  cancelAnimationFrame(tiltFrame); tiltFrame = 0;
  surfaces.forEach(resetTilt);
  pointer.active = false;
  ctx?.clearRect(0, 0, width, height);
}
function startMotion() {
  if (document.hidden || reducedMotion.matches || animationFrame) return;
  resizeCanvas();
  previousTime = 0;
  animationFrame = requestAnimationFrame(tick);
}
function resetTilt(surface) {
  surface.classList.remove('is-interacting');
  surface.style.setProperty('--rx', '0deg');
  surface.style.setProperty('--ry', '0deg');
  surface.style.setProperty('--light-x', '50%');
  surface.style.setProperty('--light-y', '35%');
  if (activeSurface === surface) activeSurface = null;
}
surfaces.forEach(surface => {
  let touchStart = null;
  surface.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch') touchStart = { x: event.clientX, y: event.clientY };
  }, { passive: true });
  surface.addEventListener('pointermove', event => {
    if (reducedMotion.matches || (!finePointer.matches && event.pointerType !== 'touch')) return;
    if (event.pointerType === 'touch') {
      if (!touchStart) return;
      if (Math.abs(event.clientY - touchStart.y) > 14) { touchStart = null; resetTilt(surface); return; }
    }
    const rect = surface.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    const limit = event.pointerType === 'touch' ? 3 : surface.dataset.tilt === 'art' ? 5 : 3.5;
    if (activeSurface && activeSurface !== surface) resetTilt(activeSurface);
    activeSurface = surface;
    cancelAnimationFrame(tiltFrame);
    tiltFrame = requestAnimationFrame(() => {
      tiltFrame = 0;
      if (activeSurface !== surface || reducedMotion.matches || document.hidden) return;
      surface.classList.add('is-interacting');
      surface.style.setProperty('--rx', `${((.5 - y) * limit * 2).toFixed(2)}deg`);
      surface.style.setProperty('--ry', `${((x - .5) * limit * 2).toFixed(2)}deg`);
      surface.style.setProperty('--light-x', `${(x * 100).toFixed(1)}%`);
      surface.style.setProperty('--light-y', `${(y * 100).toFixed(1)}%`);
    });
  }, { passive: true });
  for (const name of ['pointerleave', 'pointerup', 'pointercancel']) {
    surface.addEventListener(name, () => { touchStart = null; resetTilt(surface); }, { passive: true });
  }
});
window.addEventListener('pointermove', event => {
  if (!finePointer.matches || reducedMotion.matches) return;
  pointer = { x: event.clientX / width, y: event.clientY / height, active: true };
}, { passive: true });
window.addEventListener('blur', () => { pointer.active = false; surfaces.forEach(resetTilt); });
window.addEventListener('scroll', () => { depthDirty = true; }, { passive: true });
window.addEventListener('resize', () => {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(resizeCanvas);
}, { passive: true });
if ('IntersectionObserver' in window) {
  const depthObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting ? visibleDepth.add(entry.target) : visibleDepth.delete(entry.target));
    depthDirty = true;
  }, { rootMargin: '100px' });
  depthLayers.forEach(layer => depthObserver.observe(layer));
  if (!reducedMotion.matches) {
    document.documentElement.classList.add('motion-ready');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
      });
    }, { threshold: .05 });
    revealElements.forEach(el => revealObserver.observe(el));
  }
} else {
  depthLayers.forEach(layer => visibleDepth.add(layer));
}
document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('is-visible'));
document.addEventListener('visibilitychange', () => document.hidden ? stopMotion() : startMotion());
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) {
    stopMotion();
    depthLayers.forEach(layer => layer.style.removeProperty('--parallax-y'));
    revealElements.forEach(el => el.classList.add('is-visible'));
  } else startMotion();
});
window.addEventListener('pagehide', stopMotion);
window.addEventListener('pageshow', startMotion);
startMotion();

window.studyDays = [
  {
    id: "pirmdiena",
    title: "Pirmdiena",
    subtitle: "Lekcijas, transports un vakara darbs",
    imageCaption: "Smags pirmdienas rīts",
    image: "images/pirm.jpg",
    alt: "Pirmdienas mācību galds ar pierakstu kladi un datoru",
    transportToStudy: [
      { time: "07:35", activity: "Autobuss līdz centram" },
      { time: "08:05", activity: "Trolejbuss līdz universitātei" },
      { time: "08:25", activity: "Ierašanās pie universitātes" }
    ],
    transportStudyHome: [
      { time: "15:20", activity: "No universitātes līdz pieturai" },
      { time: "15:35", activity: "Trolejbuss no universitātes uz centru" },
      { time: "16:05", activity: "Autobuss no centra uz mājām" }
    ],
    transportToWork: [
      { time: "16:20", activity: "Autobuss no mājām uz darbu" },
      { time: "16:45", activity: "Ierašanās darbā" }
    ],
    study: [
      { time: "10:30-12:10", activity: "ORACLE projektēšanas rīki, 345. telpa, Raiņa bulvāris 19 - 001" },
      { time: "12:30-14:10", activity: "ORACLE projektēšanas rīki, 345. telpa, Raiņa bulvāris 19 - 001" },
      { time: "16:30-18:05", activity: "DBPS Oracle, 14. aud., Raiņa bulvāris 19 - 001" },
      { time: "18:15-19:45", activity: "DBPS Oracle, 345. telpa, Raiņa bulvāris 19 - 001" }
    ],
    work: [
      { time: "17:00-21:00", activity: "Darbs pēc studijām" }
    ],
    transportWorkHome: [
      { time: "21:10", activity: "Autobuss no darba uz mājām" },
      { time: "21:40", activity: "Ierašanās mājās" }
    ]
  },
  {
    id: "otrdiena",
    title: "Otrdiena",
    subtitle: "Algoritmi un brīvs vakars",
    imageCaption: "Otrdiena bez kafijas nav dzīvojama",
    image: "images/otrdiena.jpg",
    alt: "Datora ekrāns ar koda redaktoru un algoritma pierakstiem",
    transportToStudy: [
      { time: "07:50", activity: "Autobuss no mājām" },
      { time: "08:18", activity: "Pārsēšanās uz trolejbusu" },
      { time: "08:40", activity: "Ierašanās universitātē" }
    ],
    transportStudyHome: [
      { time: "16:20", activity: "No universitātes līdz pieturai" },
      { time: "16:35", activity: "Trolejbuss no universitātes uz centru" },
      { time: "17:05", activity: "Autobuss no centra uz mājām" }
    ],
    transportToWork: [],
    study: [
      { time: "14:30-16:10", activity: "Algoritmu teorija, 415. aud., Raiņa bulvāris 19 - 001" }
    ],
    work: [],
    transportWorkHome: []
  },
  {
    id: "tresdiena",
    title: "Trešdiena",
    subtitle: "Tīmekļa dizains un kultūras vēsture",
    imageCaption: "Trešdiena jau pusceļā uz nedēļas nogali",
    image: "images/tresd.jpg",
    alt: "Pieraksti ar datubāzes tabulu shēmu blakus klēpjdatoram",
    transportToStudy: [
      { time: "07:40", activity: "Autobuss līdz centram" },
      { time: "08:05", activity: "Trolejbuss līdz universitātei" },
      { time: "08:20", activity: "Ierašanās pie auditorijas" }
    ],
    transportStudyHome: [
      { time: "19:55", activity: "No universitātes līdz pieturai" },
      { time: "20:10", activity: "Trolejbuss no universitātes uz centru" },
      { time: "20:40", activity: "Autobuss no centra uz mājām" }
    ],
    transportToWork: [],
    study: [
      { time: "08:30-10:10", activity: "Tīmekļa dizaina pamati, 13. aud., Raiņa bulvāris 19 - 001" },
      { time: "14:30-16:00", activity: "Seno Austrumu kultūru vēsture, 205. aud., Visvalža iela 4A - 001" },
      { time: "16:30-18:05", activity: "Tīmekļa dizaina pamati, 345. telpa, Raiņa bulvāris 19 - 001" },
      { time: "16:30-18:00", activity: "Veselības traucējumi bērniem" },
      { time: "18:15-19:45", activity: "Tīmekļa dizaina pamati, 345. telpa, Raiņa bulvāris 19 - 001" }
    ],
    work: [],
    transportWorkHome: []
  },
  {
    id: "ceturtdiena",
    title: "Ceturtdiena",
    subtitle: "Attālinātas studijas no mājām un darba maiņa",
    imageCaption: "Ceturtdiena, gandrīz piektdiena",
    image: "images/ceturdien.jpg",
    alt: "Tīmekļa lapas makets ar HTML un CSS pierakstiem",
    transportToStudy: [],
    transportStudyHome: [],
    transportToWork: [],
    study: [
      { time: "16:30-18:05", activity: "Objektorientētā programmēšana, attālināti no mājām" },
      { time: "18:15-19:45", activity: "Objektorientētā programmēšana, attālināti no mājām" }
    ],
    work: [],
    transportWorkHome: []
  },
  {
    id: "piektdiena",
    title: "Piektdiena",
    subtitle: "Darba diena bez studijām",
    imageCaption: "Piektdiena = brīvdienu priekšnojauta",
    image: "images/piekd.jpg",
    alt: "Piektdienas kopsavilkuma pieraksti un atvērts klēpjdators",
    transportToStudy: [],
    transportStudyHome: [],
    transportToWork: [
      { time: "15:25", activity: "Autobuss no mājām uz darbu" },
      { time: "15:50", activity: "Ierašanās darbā" }
    ],
    study: [],
    work: [
      { time: "16:00-20:00", activity: "Darbs pēc mācībām" }
    ],
    transportWorkHome: [
      { time: "20:10", activity: "Autobuss no darba uz mājām" },
      { time: "20:45", activity: "Ierašanās mājās" }
    ]
  },
  {
    id: "sestdiena",
    title: "Sestdiena",
    subtitle: "Darba diena bez studijām",
    imageCaption: "Sestdiena - atpūtas diena",
    image: "images/sesd.jpg",
    alt: "Sestdienas darba grafika attēls ar pierakstiem",
    transportToStudy: [],
    transportStudyHome: [],
    transportToWork: [
      { time: "08:15", activity: "Autobuss no mājām uz darbu" },
      { time: "08:45", activity: "Ierašanās darbā" }
    ],
    study: [],
    work: [
      { time: "09:00-17:00", activity: "Darba maiņa" }
    ],
    transportWorkHome: [
      { time: "17:10", activity: "Autobuss no darba uz mājām" },
      { time: "17:45", activity: "Ierašanās mājās" }
    ]
  },
  {
    id: "svetdiena",
    title: "Svētdiena",
    subtitle: "Darba maiņa un sagatavošanās jaunai nedēļai",
    imageCaption: "Svētdiena - sagatavošanās pirmdienai",
    image: "images/svetdie.jpg",
    alt: "Svētdienas darba grafika attēls ar klēpjdatoru",
    transportToStudy: [],
    transportStudyHome: [],
    transportToWork: [
      { time: "09:15", activity: "Autobuss no mājām uz darbu" },
      { time: "09:45", activity: "Ierašanās darbā" }
    ],
    study: [],
    work: [
      { time: "10:00-18:00", activity: "Darba maiņa" }
    ],
    transportWorkHome: [
      { time: "18:10", activity: "Autobuss no darba uz mājām" },
      { time: "18:45", activity: "Ierašanās mājās" }
    ]
  }
];

window.friendBirthdays = [
  {
    id: "anna",
    name: "Anna",
    date: "06-03",
    note: "Kursa biedrene no programmēšanas nodarbībām.",
    image: "images/schedule1.jpg",
    alt: "Dzimšanas dienas atgādinājuma kartīte Annai"
  },
  {
    id: "maksims",
    name: "Maksims",
    date: "06-12",
    note: "Draugs, ar kuru bieži strādāju pie praktiskajiem uzdevumiem.",
    image: "images/schedule2.jpg",
    alt: "Dzimšanas dienas atgādinājuma kartīte Maksimam"
  },
  {
    id: "elina",
    name: "Elīna",
    date: "06-21",
    note: "Draudzene, kurai jānosūta apsveikums pirms nodarbībām.",
    image: "images/schedule3.jpg",
    alt: "Dzimšanas dienas atgādinājuma kartīte Elīnai"
  }
];

window.transportSchedules = [
  {
    id: "18-tallinas-iela-darbdienas",
    type: "Autobuss",
    routeNumber: "18",
    route: "Maršruts 18",
    stop: "Tallinas iela",
    walkToStop: "10-15 minūtes",
    direction: "Darba dienas",
    validFrom: "11.05.2026",
    departures: [
      { hour: "06", minutes: ["11", "32", "52"] },
      { hour: "07", minutes: ["12", "28", "46", "59"] },
      { hour: "08", minutes: ["14", "27", "40", "52"] },
      { hour: "09", minutes: ["05", "18", "34", "51"] },
      { hour: "10", minutes: ["12", "27", "40", "54"] },
      { hour: "11", minutes: ["07", "20", "32", "45", "59"] },
      { hour: "12", minutes: ["12", "25", "37", "50"] },
      { hour: "13", minutes: ["03", "16", "29", "42", "54"] },
      { hour: "14", minutes: ["08", "20", "33", "47"] },
      { hour: "15", minutes: ["00", "13", "25", "37", "52"] },
      { hour: "16", minutes: ["05", "19", "32", "46"] },
      { hour: "17", minutes: ["00", "14", "28", "41", "54"] },
      { hour: "18", minutes: ["07", "22", "37", "51"] },
      { hour: "19", minutes: ["07", "19", "24", "40", "42", "59"] },
      { hour: "20", minutes: ["15", "27", "29", "43", "58"] },
      { hour: "21", minutes: ["14", "23", "37", "50"] },
      { hour: "22", minutes: ["02", "14", "27", "51"] },
      { hour: "23", minutes: ["15", "37"] },
      { hour: "00", minutes: ["01", "10", "25", "51"] }
    ]
  },
  {
    id: "23-tallinas-iela-darbdienas",
    type: "Autobuss",
    routeNumber: "23",
    route: "Purvciems - Centrālā stacija",
    stop: "Tallinas iela",
    walkToStop: "10-15 minūtes",
    direction: "Darba dienas",
    validFrom: "11.05.2026",
    departures: [
      { hour: "05", minutes: ["48"] },
      { hour: "06", minutes: ["00", "14", "29", "43", "53", "59"] },
      { hour: "07", minutes: ["08", "16", "24", "32", "39", "47", "54"] },
      { hour: "08", minutes: ["02", "09", "18", "26", "33", "41", "49", "57"] },
      { hour: "09", minutes: ["06", "14", "22", "30", "42", "54"] },
      { hour: "10", minutes: ["04", "08", "15", "26", "37", "43", "48", "59"] },
      { hour: "11", minutes: ["10", "19", "29", "40", "51"] },
      { hour: "12", minutes: ["01", "11", "21", "31", "41", "52"] },
      { hour: "13", minutes: ["02", "11", "21", "31", "41", "51"] },
      { hour: "14", minutes: ["01", "11", "22", "32", "42", "51"] },
      { hour: "15", minutes: ["01", "11", "21", "31", "41", "49", "58"] },
      { hour: "16", minutes: ["08", "18", "27", "35", "44", "52"] },
      { hour: "17", minutes: ["01", "08", "16", "25", "33", "41", "49", "56"] },
      { hour: "18", minutes: ["05", "14", "25", "38", "44", "52"] },
      { hour: "19", minutes: ["03", "09", "16", "29", "40", "51"] },
      { hour: "20", minutes: ["05", "16", "22", "28", "38", "48"] },
      { hour: "21", minutes: ["01", "10", "22", "32", "51"] },
      { hour: "22", minutes: ["09", "28", "46"] },
      { hour: "23", minutes: ["03", "21", "39", "55"] },
      { hour: "00", minutes: ["12"] }
    ]
  },
  {
    id: "35-tallinas-iela-darbdienas",
    type: "Autobuss",
    routeNumber: "35",
    route: "Mežciems - Centrāltirgus",
    stop: "Tallinas iela",
    walkToStop: "10-15 minūtes",
    direction: "Darba dienas",
    validFrom: "11.05.2026",
    departures: [
      { hour: "05", minutes: ["52"] },
      { hour: "06", minutes: ["17", "42"] },
      { hour: "07", minutes: ["02", "21", "40", "58"] },
      { hour: "08", minutes: ["16", "37", "58"] },
      { hour: "09", minutes: ["20", "41"] },
      { hour: "10", minutes: ["13", "53"] },
      { hour: "11", minutes: ["43"] },
      { hour: "12", minutes: ["33"] },
      { hour: "13", minutes: ["23"] },
      { hour: "14", minutes: ["13"] },
      { hour: "15", minutes: ["03", "50"] },
      { hour: "16", minutes: ["13", "36", "59"] },
      { hour: "17", minutes: ["22", "45"] },
      { hour: "18", minutes: ["08", "32"] },
      { hour: "19", minutes: ["01", "31"] },
      { hour: "20", minutes: ["20"] },
      { hour: "21", minutes: ["08", "56"] },
      { hour: "22", minutes: ["41"] },
      { hour: "23", minutes: ["30"] }
    ]
  },
  {
    id: "3-varnu-iela-darbdienas",
    type: "Autobuss",
    routeNumber: "3",
    route: "Pļavnieki - Daugavgrīva",
    stop: "Vārnu iela",
    walkToStop: "5 minūtes",
    direction: "Darba dienas",
    validFrom: "11.05.2026",
    departures: [
      { hour: "05", minutes: ["43", "58"] },
      { hour: "06", minutes: ["13", "23", "33", "43", "53"] },
      { hour: "07", minutes: ["01", "09", "16", "23", "30", "38", "45", "51", "57"] },
      { hour: "08", minutes: ["03", "09", "15", "22", "28", "34", "40", "47", "54"] },
      { hour: "09", minutes: ["01", "07", "13", "19", "25", "32", "38", "44", "52"] },
      { hour: "10", minutes: ["01", "09", "19", "28", "37", "46", "55"] },
      { hour: "11", minutes: ["04", "13", "22", "31", "40", "48", "57"] },
      { hour: "12", minutes: ["07", "15", "23", "31", "40", "49", "57"] },
      { hour: "13", minutes: ["05", "13", "22", "31", "40", "49", "57"] },
      { hour: "14", minutes: ["05", "14", "23", "31", "40", "49", "58"] },
      { hour: "15", minutes: ["08", "18", "28", "37", "46", "55"] },
      { hour: "16", minutes: ["03", "10", "17", "23", "29", "35", "41", "47", "53"] },
      { hour: "17", minutes: ["00", "07", "14", "20", "26", "32", "38", "44", "50", "56"] },
      { hour: "18", minutes: ["02", "08", "14", "20", "26", "33", "40", "47", "55"] },
      { hour: "19", minutes: ["05", "15", "26", "38", "50"] },
      { hour: "20", minutes: ["02", "12", "22", "32", "44", "56"] },
      { hour: "21", minutes: ["08", "21", "36", "51"] },
      { hour: "22", minutes: ["08", "28", "49"] },
      { hour: "23", minutes: ["11", "33"] }
    ]
  },
  {
    id: "6-varnu-iela-darbdienas",
    type: "Autobuss",
    routeNumber: "6",
    route: "Biķeri - Abrenes iela",
    stop: "Vārnu iela",
    walkToStop: "5 minūtes",
    direction: "Darba dienas",
    validFrom: "23.03.2026",
    departures: [
      { hour: "05", minutes: ["37"] },
      { hour: "06", minutes: ["07", "36"] },
      { hour: "07", minutes: ["06", "31", "58"] },
      { hour: "08", minutes: ["26", "56"] },
      { hour: "09", minutes: ["24", "55"] },
      { hour: "10", minutes: ["35"] },
      { hour: "11", minutes: ["05", "30"] },
      { hour: "12", minutes: ["03", "30", "59"] },
      { hour: "13", minutes: ["30"] },
      { hour: "14", minutes: ["00", "29"] },
      { hour: "15", minutes: ["01", "26", "57"] },
      { hour: "16", minutes: ["27", "55"] },
      { hour: "17", minutes: ["24", "53"] },
      { hour: "18", minutes: ["24"] },
      { hour: "19", minutes: ["00", "35"] },
      { hour: "20", minutes: ["04", "29"] },
      { hour: "21", minutes: ["00", "47"] },
      { hour: "22", minutes: ["23", "53"] }
    ]
  },
  {
    id: "6-brivibas-bulvaris-darbdienas",
    type: "Autobuss",
    routeNumber: "6",
    route: "Abrenes iela - Biķeri",
    stop: "Brīvības bulvāris",
    direction: "Darba dienas, no institūta uz mājām",
    validFrom: "23.03.2026",
    departures: [
      { hour: "05", minutes: ["59"] },
      { hour: "06", minutes: ["24", "48"] },
      { hour: "07", minutes: ["15", "44"] },
      { hour: "08", minutes: ["12", "44"] },
      { hour: "09", minutes: ["24", "54"] },
      { hour: "10", minutes: ["19", "52"] },
      { hour: "11", minutes: ["19", "48"] },
      { hour: "12", minutes: ["19", "49"] },
      { hour: "13", minutes: ["18", "50"] },
      { hour: "14", minutes: ["15", "46"] },
      { hour: "15", minutes: ["16", "44"] },
      { hour: "16", minutes: ["12", "38"] },
      { hour: "17", minutes: ["09", "45"] },
      { hour: "18", minutes: ["20", "51"] },
      { hour: "19", minutes: ["19", "53"] },
      { hour: "20", minutes: ["40"] },
      { hour: "21", minutes: ["16", "46"] },
      { hour: "22", minutes: ["21"] },
      { hour: "23", minutes: ["00", "40"] }
    ]
  },
  {
    id: "3-brivibas-bulvaris-darbdienas",
    type: "Autobuss",
    routeNumber: "3",
    route: "Daugavgrīva - Pļavnieki",
    stop: "Brīvības bulvāris",
    direction: "Darba dienas, no institūta uz mājām",
    validFrom: "11.05.2026",
    departures: [
      { hour: "06", minutes: ["04", "19", "29", "39", "48", "57"] },
      { hour: "07", minutes: ["03", "09", "14", "20", "25", "30", "36", "45", "50", "55"] },
      { hour: "08", minutes: ["00", "05", "10", "15", "20", "25", "30", "33", "38", "43", "47", "53", "59"] },
      { hour: "09", minutes: ["05", "11", "19", "26", "33", "40", "47", "55"] },
      { hour: "10", minutes: ["03", "11", "19", "27", "36", "45", "54"] },
      { hour: "11", minutes: ["03", "12", "22", "32", "42", "52"] },
      { hour: "12", minutes: ["02", "12", "22", "31", "41", "51"] },
      { hour: "13", minutes: ["01", "11", "21", "31", "43", "55"] },
      { hour: "14", minutes: ["07", "18", "28", "38", "46", "54"] },
      { hour: "15", minutes: ["02", "10", "19", "27", "35", "43", "51", "59"] },
      { hour: "16", minutes: ["07", "12", "18", "25", "30", "37", "44", "50", "56"] },
      { hour: "17", minutes: ["02", "08", "14", "20", "26", "32", "38", "44", "50", "56"] },
      { hour: "18", minutes: ["01", "08", "14", "19", "26", "32", "38", "44", "50"] },
      { hour: "19", minutes: ["00", "10", "21", "33", "43", "55"] },
      { hour: "20", minutes: ["07", "19", "31", "43", "55"] },
      { hour: "21", minutes: ["07", "19", "34", "49"] },
      { hour: "22", minutes: ["07", "27", "47"] },
      { hour: "23", minutes: ["07", "27", "48"] }
    ]
  },
  {
    id: "23-centrala-stacija-darbdienas",
    type: "Autobuss",
    routeNumber: "23",
    route: "Centrālā stacija - Purvciems",
    stop: "Centrālā stacija",
    direction: "Darba dienas, no darba vai institūta uz mājām",
    validFrom: "11.05.2026",
    departures: [
      { hour: "05", minutes: ["55"] },
      { hour: "06", minutes: ["07", "21", "36", "50"] },
      { hour: "07", minutes: ["00", "06", "15", "23", "32", "42", "49", "57"] },
      { hour: "08", minutes: ["04", "12", "19", "28", "36", "43", "51", "59"] },
      { hour: "09", minutes: ["07", "16", "24", "32", "39", "51"] },
      { hour: "10", minutes: ["03", "13", "24", "35", "46", "57"] },
      { hour: "11", minutes: ["08", "19", "28", "38", "49"] },
      { hour: "12", minutes: ["00", "10", "20", "30", "40", "50"] },
      { hour: "13", minutes: ["01", "11", "20", "30", "40", "50"] },
      { hour: "14", minutes: ["00", "10", "20", "31", "41", "51"] },
      { hour: "15", minutes: ["00", "10", "20", "30", "40", "50", "58"] },
      { hour: "16", minutes: ["07", "17", "27", "36", "45", "54"] },
      { hour: "17", minutes: ["02", "11", "18", "26", "35", "43", "51", "59"] },
      { hour: "18", minutes: ["06", "15", "24", "35", "48"] },
      { hour: "19", minutes: ["02", "13", "26", "37", "47", "58"] },
      { hour: "20", minutes: ["12", "23", "35", "45", "55"] },
      { hour: "21", minutes: ["17", "39", "58"] },
      { hour: "22", minutes: ["16", "35", "53"] },
      { hour: "23", minutes: ["10", "28"] }
    ]
  },
  {
    id: "18-centrala-stacija-darbdienas",
    type: "Autobuss",
    routeNumber: "18",
    route: "Centrālā stacija - Mežciems",
    stop: "Centrālā stacija",
    direction: "Darba dienas, no darba vai institūta uz mājām",
    validFrom: "11.05.2026",
    departures: [
      { hour: "06", minutes: ["18", "40", "59"] },
      { hour: "07", minutes: ["19", "36", "56"] },
      { hour: "08", minutes: ["09", "24", "37", "50"] },
      { hour: "09", minutes: ["02", "15", "28", "43"] },
      { hour: "10", minutes: ["00", "21", "36", "49"] },
      { hour: "11", minutes: ["03", "16", "29", "41", "54"] },
      { hour: "12", minutes: ["08", "21", "34", "46", "59"] },
      { hour: "13", minutes: ["12", "25", "38", "51"] },
      { hour: "14", minutes: ["03", "17", "29", "43", "56"] },
      { hour: "15", minutes: ["09", "22", "34", "46"] },
      { hour: "16", minutes: ["01", "14", "28", "42", "56"] },
      { hour: "17", minutes: ["10", "24", "38", "51"] },
      { hour: "18", minutes: ["04", "17", "32", "47"] },
      { hour: "19", minutes: ["01", "17", "33", "49"] },
      { hour: "20", minutes: ["06", "22", "36", "50"] },
      { hour: "21", minutes: ["05", "21", "44"] },
      { hour: "22", minutes: ["09", "34", "58"] },
      { hour: "23", minutes: ["22"] }
    ]
  },
  {
    id: "3-autoosta-darbdienas",
    type: "Autobuss",
    routeNumber: "3",
    route: "Daugavgrīva - Pļavnieki",
    stop: "Autoosta",
    direction: "Darba dienas, no darba vai institūta uz mājām",
    validFrom: "11.05.2026",
    departures: [
      { hour: "06", minutes: ["01", "16", "26", "36", "45", "54"] },
      { hour: "07", minutes: ["00", "06", "11", "17", "22", "27", "32", "41", "46", "51", "56"] },
      { hour: "08", minutes: ["01", "06", "11", "16", "21", "26", "29", "34", "39", "43", "49", "55"] },
      { hour: "09", minutes: ["01", "07", "15", "22", "29", "37", "44", "52"] },
      { hour: "10", minutes: ["00", "08", "16", "24", "33", "42", "51"] },
      { hour: "11", minutes: ["00", "09", "19", "29", "39", "49", "59"] },
      { hour: "12", minutes: ["09", "19", "28", "38", "48", "58"] },
      { hour: "13", minutes: ["08", "18", "28", "40", "52"] },
      { hour: "14", minutes: ["04", "15", "25", "35", "43", "51", "59"] },
      { hour: "15", minutes: ["07", "16", "24", "32", "40", "48", "56"] },
      { hour: "16", minutes: ["04", "09", "15", "22", "27", "33", "40", "46", "52", "58"] },
      { hour: "17", minutes: ["04", "10", "16", "22", "28", "34", "40", "46", "52", "57"] },
      { hour: "18", minutes: ["04", "10", "15", "22", "28", "34", "40", "46", "56"] },
      { hour: "19", minutes: ["06", "17", "29", "40", "52"] },
      { hour: "20", minutes: ["04", "16", "28", "40", "52"] },
      { hour: "21", minutes: ["04", "16", "31", "46"] },
      { hour: "22", minutes: ["04", "24", "44"] },
      { hour: "23", minutes: ["04", "24", "45"] }
    ]
  }
];

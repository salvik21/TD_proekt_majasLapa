window.studyDays = [
  {
    id: "pirmdiena",
    title: "Pirmdiena",
    subtitle: "Lekcijas, transports un vakara darbs",
    image: "images/day1.jpg",
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
      { time: "09:00", activity: "Lekcija: programmēšanas pamati" },
      { time: "11:00", activity: "Praktiskais darbs ar JavaScript" },
      { time: "14:00", activity: "Patstāvīgā mācīšanās bibliotēkā" }
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
    image: "images/day2.jpg",
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
      { time: "08:30", activity: "Seminārs: algoritmu analīze" },
      { time: "12:00", activity: "Uzdevumu risināšana grupā" },
      { time: "16:00", activity: "Mājasdarba sagatavošana" }
    ],
    work: [],
    transportWorkHome: []
  },
  {
    id: "tresdiena",
    title: "Trešdiena",
    subtitle: "Brīva diena bez lekcijām un darba",
    image: "images/weekend.jpg",
    alt: "Brīvas dienas attēls ar pierakstiem un atpūtas noskaņu",
    transportToStudy: [],
    transportStudyHome: [],
    transportToWork: [],
    study: [],
    work: [],
    transportWorkHome: []
  },
  {
    id: "ceturtdiena",
    title: "Ceturtdiena",
    subtitle: "Tīmekļa izstrāde un darba maiņa",
    image: "images/day4.jpg",
    alt: "Tīmekļa lapas makets ar HTML un CSS pierakstiem",
    transportToStudy: [
      { time: "08:45", activity: "Autobuss no mājām" },
      { time: "09:08", activity: "Trolejbuss līdz universitātei" },
      { time: "09:25", activity: "Ierašanās pie auditorijas" }
    ],
    transportStudyHome: [
      { time: "16:20", activity: "No universitātes līdz pieturai" },
      { time: "16:35", activity: "Trolejbuss no universitātes uz centru" },
      { time: "17:10", activity: "Autobuss no centra uz mājām" }
    ],
    transportToWork: [
      { time: "17:25", activity: "Autobuss no mājām uz darbu" },
      { time: "17:50", activity: "Ierašanās darbā" }
    ],
    study: [
      { time: "09:30", activity: "Darbnīca: HTML un semantika" },
      { time: "12:30", activity: "CSS izkārtojumi un adaptivitāte" },
      { time: "15:30", activity: "Mini projekta izstrāde" }
    ],
    work: [
      { time: "18:00-22:00", activity: "Vakara darba maiņa" }
    ],
    transportWorkHome: [
      { time: "22:10", activity: "Autobuss no darba uz mājām" },
      { time: "22:45", activity: "Ierašanās mājās" }
    ]
  },
  {
    id: "piektdiena",
    title: "Piektdiena",
    subtitle: "Darbu nodošana un nedēļas noslēgums",
    image: "images/day5.jpg",
    alt: "Piektdienas kopsavilkuma pieraksti un atvērts klēpjdators",
    transportToStudy: [
      { time: "08:10", activity: "Autobuss līdz centram" },
      { time: "08:38", activity: "Trolejbuss līdz universitātei" },
      { time: "08:55", activity: "Ierašanās universitātē" }
    ],
    transportStudyHome: [
      { time: "14:30", activity: "No universitātes līdz pieturai" },
      { time: "14:45", activity: "Trolejbuss no universitātes uz centru" },
      { time: "15:15", activity: "Autobuss no centra uz mājām" }
    ],
    transportToWork: [
      { time: "15:25", activity: "Autobuss no mājām uz darbu" },
      { time: "15:50", activity: "Ierašanās darbā" }
    ],
    study: [
      { time: "09:00", activity: "Koda pārskatīšana" },
      { time: "11:30", activity: "Darbu nodošana e-studijās" },
      { time: "14:00", activity: "Refleksija un nākamās nedēļas plāns" }
    ],
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
    image: "images/day6.jpg",
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
    image: "images/day7.jpg",
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

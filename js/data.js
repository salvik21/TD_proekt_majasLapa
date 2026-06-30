const dayInfo = [
  {
    id: "ponedelnik",
    title: "Понедельник",
    subtitle: "Лекции и практические занятия",
    imageCaption: "Тяжелое утро понедельника",
    image: "images/pirmdiena.jpeg",
    alt: "Рабочее место с двумя включенными мониторами и кружкой кофе на столе"
  },
  {
    id: "vtornik",
    title: "Вторник",
    subtitle: "Алгоритмы и самостоятельная работа",
    imageCaption: "Вторник без кофе невозможен",
    image: "images/oterdiena.jpeg",
    alt: "Учебные заметки и рабочий план"
  },
  {
    id: "sreda",
    title: "Среда",
    subtitle: "Веб-дизайн и история культуры",
    imageCaption: "Среда уже на полпути к концу недели",
    image: "images/tresdiena.jpeg",
    alt: "Рабочее место с двумя мониторами и открытым сайтом на экране"
  },
  {
    id: "chetverg",
    title: "Четверг",
    subtitle: "Дистанционная учеба из дома",
    imageCaption: "Четверг, почти пятница",
    image: "images/ceturdiena.jpeg",
    alt: "Компьютерный стол с мониторами, ноутбуком и открытым кодом"
  },
  {
    id: "pyatnica",
    title: "Пятница",
    subtitle: "Рабочий день без учебы",
    imageCaption: "Пятница - предчувствие выходных",
    image: "images/piekdiena.jpeg",
    alt: "Рабочее место с PlayStation, мониторами и игровым экраном"
  },
  {
    id: "subbota",
    title: "Суббота",
    subtitle: "Рабочая смена",
    imageCaption: "Суббота - день отдыха",
    image: "images/sesdiena.jpeg",
    alt: "Маленькая собака на прогулке с поводком на зеленой траве"
  },
  {
    id: "voskresenye",
    title: "Воскресенье",
    subtitle: "Рабочая смена и подготовка к новой неделе",
    imageCaption: "Воскресенье - подготовка к понедельнику",
    image: "images/svetdiena.jpeg",
    alt: "Общее фото в солнечный день у воды"
  }
];

const vacationMode = true;

const dayIndexById = {
  ponedelnik: 1,
  vtornik: 2,
  sreda: 3,
  chetverg: 4,
  pyatnica: 5,
  subbota: 6,
  voskresenye: 0
};

function getDateForWeekday(dayId) {
  const today = new Date();
  const currentDay = today.getDay();
  const targetDay = dayIndexById[dayId];
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
  const date = new Date(today);

  date.setHours(0, 0, 0, 0);
  date.setDate(today.getDate() + mondayOffset + ((targetDay + 6) % 7));

  return date;
}

function getWorkScheduleForDate(date) {
  const period = window.workSchedulePeriod || {};
  const isSelectedPeriod =
    date.getFullYear() === period.year &&
    date.getMonth() + 1 === period.month;

  if (!isSelectedPeriod) {
    return [];
  }

  return window.workSchedules?.[date.getDate()] || [];
}

function formatDateLabel(date) {
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long"
  });
}

window.studyDays = dayInfo.map((day) => {
  const studySchedule = window.studySchedules?.[day.id] || {};
  const date = getDateForWeekday(day.id);

  return {
    ...day,
    date,
    dateLabel: formatDateLabel(date),
    isVacation: vacationMode,
    study: vacationMode ? [] : studySchedule.study || [],
    work: getWorkScheduleForDate(date)
  };
});

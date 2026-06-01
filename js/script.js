document.addEventListener("DOMContentLoaded", () => {
  const navList = document.querySelector("#nav-list");
  const cardsContainer = document.querySelector("#cards");
  const birthdayContainer = document.querySelector("#birthday-cards");
  const themeToggle = document.querySelector("#theme-toggle");
  const days = Array.isArray(window.studyDays) ? window.studyDays : [];
  const birthdays = Array.isArray(window.friendBirthdays) ? window.friendBirthdays : [];
  const birthdayTrackingDays = 5;
  const transportSchedules = Array.isArray(window.transportSchedules) ? window.transportSchedules : [];

  function readSavedTheme() {
    try {
      return localStorage.getItem("theme");
    } catch {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // The page still works if localStorage is unavailable for local files.
    }
  }

  const savedTheme = readSavedTheme();
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const startTheme = savedTheme || (prefersDark ? "dark" : "light");
  const currentDayId = {
    1: "pirmdiena",
    2: "otrdiena",
    3: "tresdiena",
    4: "ceturtdiena",
    5: "piektdiena",
    6: "sestdiena",
    0: "svetdiena"
  }[new Date().getDay()];

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
    themeToggle.textContent = theme === "dark" ? "Gaišā tēma" : "Tumšā tēma";
  }

  function createNav() {
    const homeItem = document.createElement("li");
    const homeLink = document.createElement("a");
    homeLink.href = "#sakums";
    homeLink.textContent = "Sākums";
    homeItem.append(homeLink);
    navList.append(homeItem);

    const birthdayItem = document.createElement("li");
    const birthdayLink = document.createElement("a");
    birthdayLink.href = "#dzimsanas-dienas";
    birthdayLink.textContent = "Dzimšanas dienas";
    birthdayItem.append(birthdayLink);
    navList.append(birthdayItem);

    days.forEach((day) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = `#${day.id}`;
      link.textContent = day.title;
      if (day.id === currentDayId) {
        link.classList.add("is-today");
        link.setAttribute("aria-label", `${day.title}, šodiena`);
      }
      item.append(link);
      navList.append(item);
    });
  }

  function createScheduleRows(schedule) {
    return schedule
      .map((entry) => `
        <tr>
          <th scope="row">${entry.time}</th>
          <td>${entry.activity}</td>
        </tr>
      `)
      .join("");
  }

  function createTableBlock(title, caption, rows) {
    if (!rows || rows.length === 0) {
      return "";
    }

    return `
      <div class="day-block">
        <h3>${title}</h3>
        <div class="table-wrap">
          <table>
            <caption>${caption}</caption>
            <tbody>
              ${createScheduleRows(rows)}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function parseTimeToMinutes(timeValue, useEndTime = false) {
    const parts = timeValue.split("-");
    const selected = useEndTime && parts[1] ? parts[1] : parts[0];
    const [hours, minutes] = selected.trim().split(":").map(Number);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return null;
    }

    return hours * 60 + minutes;
  }

  function formatMinutes(totalMinutes) {
    const normalized = ((totalMinutes % 1440) + 1440) % 1440;
    const hours = String(Math.floor(normalized / 60)).padStart(2, "0");
    const minutes = String(normalized % 60).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  function getDepartures(schedule) {
    return schedule.departures.flatMap((entry) =>
      entry.minutes.map((minute) => ({
        minutes: Number(entry.hour) * 60 + Number(minute),
        time: `${entry.hour}:${minute}`,
        routeNumber: schedule.routeNumber,
        route: schedule.route,
        stop: schedule.stop
      }))
    );
  }

  function findDepartures(schedules, targetMinutes, windowMinutes) {
    return schedules
      .flatMap(getDepartures)
      .filter((departure) => Math.abs(departure.minutes - targetMinutes) <= windowMinutes)
      .sort((first, second) => Math.abs(first.minutes - targetMinutes) - Math.abs(second.minutes - targetMinutes));
  }

  function getCurrentMinutes() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }

  function getClosestNowIndex(departures) {
    const currentMinutes = getCurrentMinutes();
    let closestIndex = 0;
    let closestDistance = Infinity;

    departures.forEach((departure, index) => {
      const distance = Math.abs(departure.minutes - currentMinutes);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }

  function isStudyRoute(schedule) {
    return schedule.walkToStop && schedule.direction === "Darba dienas";
  }

  function isInstituteHomeRoute(schedule) {
    return schedule.direction.includes("no institūta uz mājām");
  }

  function isWorkHomeRoute(schedule) {
    return schedule.direction.includes("no darba");
  }

  function createTransportRecommendationBlock(title, targetText, departures) {
    if (!departures || departures.length === 0) {
      return `
        <div class="day-block">
          <h3>${title}</h3>
          <p class="recommendation-empty">${targetText}: nav atrasts piemērots transports.</p>
        </div>
      `;
    }

    const closestNowIndex = getClosestNowIndex(departures);
    const items = departures.map((departure, index) => `
      <span class="recommendation-pill ${index === closestNowIndex ? "is-best" : ""}">
        <strong>${departure.time}</strong>
        <em>${departure.routeNumber}</em>
      </span>
    `).join("");

    return `
      <div class="day-block">
        <h3>${title}</h3>
        <p class="recommendation-target">${targetText}</p>
        <div class="recommendation-list" aria-label="${title}">
          ${items}
        </div>
      </div>
    `;
  }

  function createDayCard(day) {
    const section = document.createElement("section");
    section.className = "diary-card";
    section.id = day.id;
    section.setAttribute("aria-labelledby", `${day.id}-title`);
    const hasStudy = day.study && day.study.length > 0;
    const hasWork = day.work && day.work.length > 0;
    const image = hasStudy || hasWork ? day.image : "images/weekend.jpg";
    const alt = hasStudy || hasWork ? day.alt : "Brīvas dienas attēls bez studijām un darba";

    let timeline = "";

    if (!hasStudy && !hasWork) {
      timeline = `
        <div class="free-day">
          <strong>Brīva diena</strong>
          <span>Šajā dienā nav ne studiju, ne darba grafika.</span>
        </div>
      `;
    }

    if (hasStudy) {
      if (day.transportToStudy && day.transportToStudy.length > 0) {
        const firstStudyStart = parseTimeToMinutes(day.study[0].time);
        const target = firstStudyStart - 45;
        const departures = findDepartures(transportSchedules.filter(isStudyRoute), target, 10);

        timeline += createTransportRecommendationBlock(
          "Transports uz studijām",
          `Mērķis: pieturā ap ${formatMinutes(target)} (45 min pirms lekcijas)`,
          departures
        );
      }

      timeline += createTableBlock("Studiju grafiks", `${day.title} studiju grafiks`, day.study);

      if (day.transportStudyHome && day.transportStudyHome.length > 0) {
        const lastStudyEnd = parseTimeToMinutes(day.study[day.study.length - 1].time, true);
        const departures = findDepartures(transportSchedules.filter(isInstituteHomeRoute), lastStudyEnd, 15);

        timeline += createTransportRecommendationBlock(
          "Transports no institūta uz mājām",
          `Mērķis: ap ${formatMinutes(lastStudyEnd)} (±15 min pēc nodarbībām)`,
          departures
        );
      }
    }

    if (hasWork) {
      timeline += createTableBlock("Transports uz darbu", `${day.title} transports uz darbu`, day.transportToWork);
      timeline += createTableBlock("Darba grafiks", `${day.title} darba grafiks`, day.work);

      const workEnd = parseTimeToMinutes(day.work[day.work.length - 1].time, true);
      const departures = findDepartures(transportSchedules.filter(isWorkHomeRoute), workEnd, 30);

      timeline += createTransportRecommendationBlock(
        "Transports no darba uz mājām",
        `Mērķis: ap ${formatMinutes(workEnd)} (±30 min pēc darba)`,
        departures
      );
    }

    section.innerHTML = `
      <div class="card-image-wrap">
        <img src="${image}" alt="${alt}" loading="lazy">
      </div>
      <div class="card-content">
        <p class="card-label">Studiju diena</p>
        <h2 id="${day.id}-title">${day.title}</h2>
        <p class="card-subtitle">${day.subtitle}</p>
        ${timeline}
      </div>
    `;

    return section;
  }

  function getBirthdayInfo(dateValue) {
    const [month, day] = dateValue.split("-").map(Number);
    const today = new Date();
    const currentYear = today.getFullYear();
    const birthday = new Date(currentYear, month - 1, day);
    birthday.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (birthday < today) {
      birthday.setFullYear(currentYear + 1);
    }

    const daysLeft = Math.round((birthday - today) / 86400000);
    const formattedDate = birthday.toLocaleDateString("lv-LV", {
      day: "numeric",
      month: "long"
    });

    return { daysLeft, formattedDate };
  }

  function formatDaysLeft(daysLeft) {
    if (daysLeft === 0) {
      return "Šodien";
    }

    if (daysLeft === 1) {
      return "Rīt";
    }

    return `Pēc ${daysLeft} dienām`;
  }

  function createBirthdayCard(item, birthday = getBirthdayInfo(item.date)) {
    const article = document.createElement("article");
    article.className = "schedule-card birthday-card";

    article.innerHTML = `
      <div class="schedule-card-body">
        <p class="card-label">Dzimšanas diena</p>
        <h3>${item.name}</h3>
        <p class="card-subtitle">${birthday.formattedDate}</p>
        <div class="birthday-badge">${formatDaysLeft(birthday.daysLeft)}</div>
        <p>${item.note}</p>
      </div>
    `;

    return article;
  }

  function createBirthdayEmptyCard() {
    const article = document.createElement("article");
    article.className = "schedule-card birthday-card birthday-empty";

    article.innerHTML = `
      <div class="schedule-card-body">
        <p class="card-label">Dzimšanas dienas</p>
        <h3>Nav tuvāko datumu</h3>
        <p>Tuvākajās ${birthdayTrackingDays} dienās draugu dzimšanas dienas nav atrastas.</p>
      </div>
    `;

    return article;
  }

  function renderBirthdayCards() {
    const fragment = document.createDocumentFragment();
    const upcomingBirthdays = birthdays
      .map((item) => ({ item, birthday: getBirthdayInfo(item.date) }))
      .filter(({ birthday }) => birthday.daysLeft <= birthdayTrackingDays)
      .sort((first, second) => first.birthday.daysLeft - second.birthday.daysLeft);

    if (upcomingBirthdays.length === 0) {
      fragment.append(createBirthdayEmptyCard());
    } else {
      upcomingBirthdays.forEach(({ item, birthday }) => {
        fragment.append(createBirthdayCard(item, birthday));
      });
    }

    birthdayContainer.append(fragment);
  }

  function renderCards() {
    const fragment = document.createDocumentFragment();
    days.forEach((day) => fragment.append(createDayCard(day)));
    cardsContainer.append(fragment);
  }

  function setActiveNavLink() {
    const links = [...document.querySelectorAll(".main-nav a")];
    const sections = [
      document.querySelector("#sakums"),
      document.querySelector("#dzimsanas-dienas"),
      ...days.map((day) => document.querySelector(`#${day.id}`))
    ];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        links.forEach((link) => link.classList.remove("is-active"));
        const activeLink = links.find((link) => link.getAttribute("href") === `#${entry.target.id}`);
        activeLink?.classList.add("is-active");
      });
    }, {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0.01
    });

    sections.filter(Boolean).forEach((section) => observer.observe(section));
  }

  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });

  setTheme(startTheme);
  createNav();
  renderBirthdayCards();
  renderCards();
  setActiveNavLink();
});

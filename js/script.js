document.addEventListener("DOMContentLoaded", () => {
  const navList = document.querySelector("#nav-list");
  const cardsContainer = document.querySelector("#cards");
  const mobileBackToTop = document.querySelector(".mobile-back-to-top");
  const themeToggle = document.querySelector("#theme-toggle");
  const themeToggleLabel = document.querySelector("#theme-toggle-label");
  let days = window.getStudyDays();
  let selectedWeek = new Date();
  let navObserver;

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
    1: "ponedelnik",
    2: "vtornik",
    3: "sreda",
    4: "chetverg",
    5: "pyatnica",
    6: "subbota",
    0: "voskresenye"
  }[new Date().getDay()];

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Переключить светлую тему" : "Переключить темную тему"
    );
    themeToggleLabel.textContent = theme === "dark" ? "Светлая тема" : "Темная тема";
  }

  function updateMobileBackToTop() {
    mobileBackToTop?.classList.toggle("is-visible", window.scrollY > 160);
  }

  function createNav() {
    const shortDayNames = {
      ponedelnik: "Пн",
      vtornik: "Вт",
      sreda: "Ср",
      chetverg: "Чт",
      pyatnica: "Пт",
      subbota: "Сб",
      voskresenye: "Вс"
    };

    const homeItem = document.createElement("li");
    const homeLink = document.createElement("a");
    homeLink.href = "#glavnaya";
    homeLink.textContent = "Главная";
    homeLink.dataset.short = "Глав";
    homeItem.append(homeLink);
    navList.append(homeItem);

    const scheduleItem = document.createElement("li");
    const scheduleLink = document.createElement("a");
    scheduleLink.href = "schedule.html";
    scheduleLink.textContent = "Расписание";
    scheduleLink.dataset.short = "Рас";
    scheduleItem.append(scheduleLink);
    navList.append(scheduleItem);

    days.forEach((day) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = `#${day.id}`;
      link.textContent = day.title;
      link.dataset.short = shortDayNames[day.id] || day.title;
      if (day.id === currentDayId) {
        link.classList.add("is-today");
        link.setAttribute("aria-label", `${day.title}, сегодня`);
      }
      item.append(link);
      navList.append(item);
    });
  }

  function createScheduleRows(schedule, hasActivity) {
    return schedule
      .map((entry) => `
        <tr>
          <th scope="row">${entry.time}</th>
          ${hasActivity ? `<td>${entry.activity}</td>` : ""}
        </tr>
      `)
      .join("");
  }

  function createTableBlock(title, caption, rows) {
    if (!rows || rows.length === 0) {
      return "";
    }

    const hasActivity = rows.some((entry) => entry.activity);

    return `
      <div class="day-block">
        <h3>${title}</h3>
        <div class="table-wrap">
          <table class="${hasActivity ? "" : "time-only-table"}">
            <caption>${caption}</caption>
            <tbody>
              ${createScheduleRows(rows, hasActivity)}
            </tbody>
          </table>
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
    const hasVacation = Boolean(day.isVacation);

    let timeline = "";

    if (!hasStudy && !hasWork && !hasVacation) {
      timeline = `
        <div class="free-day">
          <strong>Нет учебных занятий</strong>
          <span>${window.hasWorkData(day.date) ? "Рабочей смены нет." : "Рабочий график на этот месяц еще не добавлен."}</span>
        </div>
      `;
    }

    if (hasVacation) {
      timeline += `
        <div class="free-day vacation-block">
          <strong>Каникулы</strong>
          <span>Учебного графика пока нет.</span>
        </div>
      `;
    }

    if (hasStudy) {
      timeline += createTableBlock("Учебный график", `${day.title}: учебный график`, day.study);
    }

    if (hasWork) {
      timeline += createTableBlock("Рабочий график", `${day.title}: рабочий график`, day.work);
    }
    if (hasStudy && !window.hasWorkData(day.date)) {
      timeline += `<p class="schedule-note">Рабочий график на этот месяц еще не добавлен.</p>`;
    }

    section.innerHTML = `
      <div class="card-content">
        <h2 id="${day.id}-title">${day.title}</h2>
        <p class="card-date">${day.dateLabel}</p>
        <p class="card-subtitle">${day.subtitle}</p>
        ${timeline}
      </div>
    `;

    return section;
  }

  function renderCards() {
    navObserver?.disconnect();
    days = window.getStudyDays(selectedWeek);
    document.querySelector("#week-label").textContent = `${days[0].dateLabel} — ${days[6].dateLabel} ${days[6].date.getFullYear()}`;
    const fragment = document.createDocumentFragment();
    days.forEach((day) => fragment.append(createDayCard(day)));
    cardsContainer.replaceChildren(fragment);
    setActiveNavLink();
  }

  function setActiveNavLink() {
    const links = [...document.querySelectorAll(".main-nav a")];
    const sections = [
      document.querySelector("#glavnaya"),
      ...days.map((day) => document.querySelector(`#${day.id}`))
    ];

    navObserver = new IntersectionObserver((entries) => {
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

    sections.filter(Boolean).forEach((section) => navObserver.observe(section));
  }

  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });
  window.addEventListener("scroll", updateMobileBackToTop, { passive: true });
  document.querySelector("#week-prev").addEventListener("click", () => {
    selectedWeek.setDate(selectedWeek.getDate() - 7);
    renderCards();
  });
  document.querySelector("#week-next").addEventListener("click", () => {
    selectedWeek.setDate(selectedWeek.getDate() + 7);
    renderCards();
  });
  document.querySelector("#week-current").addEventListener("click", () => {
    selectedWeek = new Date();
    renderCards();
  });

  setTheme(startTheme);
  updateMobileBackToTop();
  createNav();
  renderCards();
});

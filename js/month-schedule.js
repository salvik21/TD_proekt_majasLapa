document.addEventListener("DOMContentLoaded", () => {
  const monthTitle = document.querySelector("#month-title");
  const monthSchedule = document.querySelector("#month-schedule");
  const themeToggle = document.querySelector("#theme-toggle");
  const themeToggleLabel = document.querySelector("#theme-toggle-label");
  const period = window.workSchedulePeriod || {};
  const schedules = window.workSchedules || {};

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

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
    themeToggle?.setAttribute("aria-pressed", String(theme === "dark"));
    themeToggle?.setAttribute(
      "aria-label",
      theme === "dark" ? "Переключить светлую тему" : "Переключить темную тему"
    );

    if (themeToggleLabel) {
      themeToggleLabel.textContent = theme === "dark" ? "Светлая тема" : "Темная тема";
    }
  }

  function getMonthName(year, month) {
    return new Date(year, month - 1, 1).toLocaleDateString("ru-RU", {
      month: "long",
      year: "numeric"
    });
  }

  function formatIsoDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function isSameDate(firstDate, secondDate) {
    return formatIsoDate(firstDate) === formatIsoDate(secondDate);
  }

  function createDayCell(date) {
    const isCurrentMonth = date.getFullYear() === period.year && date.getMonth() + 1 === period.month;
    const dayNumber = date.getDate();
    const items = isCurrentMonth ? schedules[dayNumber] || [] : [];
    const hasItems = items.length > 0;
    const today = new Date();
    const classes = [
      "calendar-day",
      isCurrentMonth ? "is-current-month" : "is-other-month",
      hasItems ? "has-data" : "is-day-off",
      isSameDate(date, today) ? "is-selected" : ""
    ].filter(Boolean).join(" ");

    return `
      <article class="${classes}" aria-label="${date.toLocaleDateString("ru-RU")}">
        <strong>${dayNumber}</strong>
        ${
          isCurrentMonth && hasItems
            ? `<ul>${items.map((item) => `<li>${item.time}</li>`).join("")}</ul>`
            : isCurrentMonth ? `<p>Выходной</p>` : ""
        }
      </article>
    `;
  }

  function createCalendarCells() {
    const firstDate = new Date(period.year, period.month - 1, 1);
    const mondayBasedWeekday = (firstDate.getDay() + 6) % 7;
    const startDate = new Date(firstDate);

    startDate.setDate(firstDate.getDate() - mondayBasedWeekday);

    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + index);
      return createDayCell(date);
    }).join("");
  }

  function renderMonth() {
    if (!monthTitle || !monthSchedule || !period.year || !period.month) {
      if (monthSchedule) {
        monthSchedule.innerHTML = `<p class="month-empty-message">Пока данных нет</p>`;
      }
      return;
    }

    monthTitle.textContent = `Расписание на ${getMonthName(period.year, period.month)}`;
    monthSchedule.innerHTML = `
      <div class="calendar-weekdays" aria-hidden="true">
        ${["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => `<span>${day}</span>`).join("")}
      </div>
      <div class="calendar-grid">
        ${createCalendarCells()}
      </div>
    `;
  }

  const savedTheme = readSavedTheme();
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(savedTheme || (prefersDark ? "dark" : "light"));
  themeToggle?.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });
  renderMonth();
});

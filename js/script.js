document.addEventListener("DOMContentLoaded", () => {
  const navList = document.querySelector("#nav-list");
  const cardsContainer = document.querySelector("#cards");
  const weekTaskSummary = document.querySelector("#week-task-summary");
  const floatingTaskProgress = document.querySelector("#floating-task-progress");
  const mobileBackToTop = document.querySelector(".mobile-back-to-top");
  const themeToggle = document.querySelector("#theme-toggle");
  const themeToggleLabel = document.querySelector("#theme-toggle-label");
  const days = Array.isArray(window.studyDays) ? window.studyDays : [];
  const dayTasks = window.dayTasks && typeof window.dayTasks === "object" ? window.dayTasks : {};
  const transportSchedules = Array.isArray(window.transportSchedules) ? window.transportSchedules : [];
  const taskStorageKey = "study-week-completed-tasks";

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

  function readCompletedTasks() {
    try {
      return JSON.parse(localStorage.getItem(taskStorageKey)) || {};
    } catch {
      return {};
    }
  }

  function saveCompletedTasks(tasks) {
    try {
      localStorage.setItem(taskStorageKey, JSON.stringify(tasks));
    } catch {
      // The task list still works if localStorage is unavailable.
    }
  }

  const completedTasks = readCompletedTasks();
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
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Pārslēgt gaišo tēmu" : "Pārslēgt tumšo tēmu"
    );
    themeToggleLabel.textContent = theme === "dark" ? "Gaišā tēma" : "Tumšā tēma";
  }

  function updateMobileBackToTop() {
    mobileBackToTop?.classList.toggle("is-visible", window.scrollY > 160);
  }

  function createNav() {
    const shortDayNames = {
      pirmdiena: "P",
      otrdiena: "O",
      tresdiena: "T",
      ceturtdiena: "C",
      piektdiena: "Pk",
      sestdiena: "S",
      svetdiena: "Sv"
    };

    const homeItem = document.createElement("li");
    const homeLink = document.createElement("a");
    homeLink.href = "#sakums";
    homeLink.textContent = "Sākums";
    homeLink.dataset.short = "Sāk";
    homeItem.append(homeLink);
    navList.append(homeItem);

    const aboutItem = document.createElement("li");
    const aboutLink = document.createElement("a");
    aboutLink.href = "#par-projektu";
    aboutLink.textContent = "Par projektu";
    aboutLink.dataset.short = "Par";
    aboutItem.append(aboutLink);
    navList.append(aboutItem);

    days.forEach((day) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = `#${day.id}`;
      link.textContent = day.title;
      link.dataset.short = shortDayNames[day.id] || day.title;
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

  function isStudyRoute(schedule) {
    return schedule.walkToStop && schedule.direction === "Darba dienas";
  }

  function isInstituteHomeRoute(schedule) {
    return schedule.direction.includes("no institūta uz mājām");
  }

  function isWorkHomeRoute(schedule) {
    return schedule.direction.includes("no darba");
  }

  function createTransportRecommendationBlock(title, departures) {
    if (!departures || departures.length === 0) {
      return `
        <div class="day-block">
          <h3>${title}</h3>
          <p class="recommendation-empty">Nav atrasts piemērots transports.</p>
        </div>
      `;
    }

    const items = departures.map((departure) => `
      <span class="recommendation-pill">
        <strong>${departure.time}</strong>
        <em class="${["23", "18", "35"].includes(String(departure.routeNumber)) ? "route-blue" : "route-yellow"}">${departure.routeNumber}</em>
      </span>
    `).join("");

    return `
      <div class="day-block">
        <h3>${title}</h3>
        <div class="transport-legend" aria-label="Transporta krāsu apzīmējumi">
          <span><i class="route-yellow" aria-hidden="true"></i> autobuss</span>
          <span><i class="route-blue" aria-hidden="true"></i> trolejbuss</span>
        </div>
        <div class="recommendation-list" aria-label="${title}">
          ${items}
        </div>
      </div>
    `;
  }

  function getTaskKey(dayId, taskId) {
    return `${dayId}:${taskId}`;
  }

  function getTaskCounts(dayId) {
    const tasks = dayTasks[dayId] || [];
    const countType = (type) => {
      const typeTasks = tasks.filter((task) => task.type === type);
      const completed = typeTasks.filter((task) => completedTasks[getTaskKey(dayId, task.id)]).length;
      return { completed, total: typeTasks.length };
    };

    const totalCompleted = tasks.filter((task) => completedTasks[getTaskKey(dayId, task.id)]).length;

    return {
      all: { completed: totalCompleted, total: tasks.length },
      homework: countType("homework"),
      test: countType("test")
    };
  }

  function getWeekTaskCounts() {
    const dayOrder = days.map((day) => day.id);
    const tasks = dayOrder.flatMap((dayId) =>
      (dayTasks[dayId] || []).map((task) => ({ ...task, dayId }))
    );
    const homework = tasks.filter((task) => task.type === "homework");
    const tests = tasks.filter((task) => task.type === "test");
    const homeworkCompleted = homework.filter(
      (task) => completedTasks[getTaskKey(task.dayId, task.id)]
    ).length;
    const testsCompleted = tests.filter(
      (task) => completedTasks[getTaskKey(task.dayId, task.id)]
    ).length;

    return {
      homeworkTotal: homework.length,
      homeworkCompleted,
      homeworkRemaining: homework.length - homeworkCompleted,
      testsTotal: tests.length,
      testsPast: testsCompleted,
      testsUpcoming: tests.length - testsCompleted,
      allCompleted: homeworkCompleted + testsCompleted,
      allTotal: homework.length + tests.length
    };
  }

  function createProgressButton(type, label, tasks) {
    const completed = tasks.filter(
      (task) => completedTasks[getTaskKey(task.dayId, task.id)]
    ).length;
    const segments = tasks.map((task, index) => {
      const isCompleted = Boolean(completedTasks[getTaskKey(task.dayId, task.id)]);

      return `
        <button
          class="floating-progress-segment ${isCompleted ? "is-completed" : ""}"
          type="button"
          data-task-target="task-${task.dayId}-${task.id}"
          aria-label="${label} ${index + 1}: ${task.title}"
          title="${task.title}"
        ></button>
      `;
    }).join("");

    return `
      <div class="floating-progress-item">
        <button class="floating-progress-label" type="button" data-progress-type="${type}">
          <span>${label}</span>
          <strong>${completed} / ${tasks.length}</strong>
        </button>
        <span class="floating-progress-track">
          ${segments}
        </span>
      </div>
    `;
  }

  function renderFloatingTaskProgress(counts) {
    if (!floatingTaskProgress) {
      return;
    }

    const allTasks = days.flatMap((day) =>
      (dayTasks[day.id] || []).map((task) => ({ ...task, dayId: day.id }))
    );
    const homework = allTasks.filter((task) => task.type === "homework");
    const tests = allTasks.filter((task) => task.type === "test");

    floatingTaskProgress.innerHTML = `
      <h2>Uzdevumu progress</h2>
      ${createProgressButton("homework", "Mājasdarbi", homework)}
      ${createProgressButton("test", "Kontroldarbi", tests)}
    `;
  }

  function renderWeekTaskSummary() {
    if (!weekTaskSummary) {
      return;
    }

    const counts = getWeekTaskCounts();
    const items = [
      { label: "Mājasdarbi kopā", value: counts.homeworkTotal },
      { label: "Mājasdarbi atlikuši", value: counts.homeworkRemaining },
      { label: "Kontroldarbi bija", value: counts.testsPast },
      { label: "Kontroldarbi būs", value: counts.testsUpcoming }
    ];

    weekTaskSummary.innerHTML = items.map((item) => `
      <div class="week-summary-item">
        <strong>${item.value}</strong>
        <span>${item.label}</span>
      </div>
    `).join("");
    renderFloatingTaskProgress(counts);
  }

  function createTaskCounter(label, counterName, count) {
    return `
      <span class="task-counter">
        ${label}: <strong data-task-counter="${counterName}">${count.completed} / ${count.total}</strong>
      </span>
    `;
  }

  function createTasksBlock(day) {
    const tasks = dayTasks[day.id] || [];

    if (tasks.length === 0) {
      return "";
    }

    const counts = getTaskCounts(day.id);
    const items = tasks.map((task) => {
      const taskKey = getTaskKey(day.id, task.id);
      const isCompleted = Boolean(completedTasks[taskKey]);
      const typeLabel = task.type === "test" ? "Kontroldarbs" : "Mājasdarbs";

      return `
        <li
          class="task-item ${isCompleted ? "is-completed" : ""}"
          id="task-${day.id}-${task.id}"
          data-task-type="${task.type}"
        >
          <label>
            <input
              type="checkbox"
              data-day-id="${day.id}"
              data-task-id="${task.id}"
              ${isCompleted ? "checked" : ""}
            >
            <span class="task-text">
              <strong>${typeLabel}:</strong>
              <span>${task.title}</span>
            </span>
            <span class="task-status">Izpildīts</span>
          </label>
        </li>
      `;
    }).join("");

    return `
      <div class="day-block tasks-block" data-tasks-day="${day.id}">
        <h3>Dienas uzdevumi</h3>
        <div class="task-panel">
          <div class="task-counters" aria-label="${day.title} uzdevumu progress">
            ${createTaskCounter("Kopā", "all", counts.all)}
            ${createTaskCounter("Mājasdarbi", "homework", counts.homework)}
            ${createTaskCounter("Kontroldarbi", "test", counts.test)}
          </div>
          <ul class="task-list">
            ${items}
          </ul>
        </div>
      </div>
    `;
  }

  function updateTaskCounters(dayId) {
    const taskBlock = document.querySelector(`[data-tasks-day="${dayId}"]`);
    const counts = getTaskCounts(dayId);

    Object.entries(counts).forEach(([name, count]) => {
      const counter = taskBlock?.querySelector(`[data-task-counter="${name}"]`);
      if (counter) {
        counter.textContent = `${count.completed} / ${count.total}`;
      }
    });

  }

  function handleTaskChange(event) {
    const checkbox = event.target.closest(".task-item input[type='checkbox']");

    if (!checkbox) {
      return;
    }

    const taskKey = getTaskKey(checkbox.dataset.dayId, checkbox.dataset.taskId);
    completedTasks[taskKey] = checkbox.checked;
    checkbox.closest(".task-item").classList.toggle("is-completed", checkbox.checked);
    saveCompletedTasks(completedTasks);
    updateTaskCounters(checkbox.dataset.dayId);
    renderWeekTaskSummary();
  }

  function handleProgressNavigation(event) {
    const segment = event.target.closest("[data-task-target]");

    if (segment) {
      highlightTask(document.getElementById(segment.dataset.taskTarget));
      return;
    }

    const button = event.target.closest("[data-progress-type]");

    if (!button) {
      return;
    }

    const type = button.dataset.progressType;
    const selector = type === "all" ? ".task-item" : `.task-item[data-task-type="${type}"]`;
    const tasks = [...document.querySelectorAll(selector)];
    const target = tasks.find((task) => !task.classList.contains("is-completed")) || tasks[0];

    highlightTask(target);
  }

  function highlightTask(target) {
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.classList.add("is-highlighted");
    window.setTimeout(() => target.classList.remove("is-highlighted"), 1600);
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
          departures
        );
      }

      timeline += createTableBlock("Studiju grafiks", `${day.title} studiju grafiks`, day.study);

      if (day.transportStudyHome && day.transportStudyHome.length > 0) {
        const lastStudyEnd = parseTimeToMinutes(day.study[day.study.length - 1].time, true);
        const departures = findDepartures(transportSchedules.filter(isInstituteHomeRoute), lastStudyEnd, 15);

        timeline += createTransportRecommendationBlock(
          "Transports no institūta uz mājām",
          departures
        );
      }
    }

    if (hasWork) {
      if (day.transportToWork && day.transportToWork.length > 0) {
        const workStart = parseTimeToMinutes(day.work[0].time);
        const target = workStart - 30;
        const departures = findDepartures(transportSchedules.filter(isStudyRoute), target, 15);

        timeline += createTransportRecommendationBlock(
          "Transports uz darbu",
          departures
        );
      }

      timeline += createTableBlock("Darba grafiks", `${day.title} darba grafiks`, day.work);

      const workEnd = parseTimeToMinutes(day.work[day.work.length - 1].time, true);
      const departures = findDepartures(transportSchedules.filter(isWorkHomeRoute), workEnd, 30);

      timeline += createTransportRecommendationBlock(
        "Transports no darba uz mājām",
        departures
      );
    }

    timeline += createTasksBlock(day);

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

  function renderCards() {
    const fragment = document.createDocumentFragment();
    days.forEach((day) => fragment.append(createDayCard(day)));
    cardsContainer.append(fragment);
  }

  function setActiveNavLink() {
    const links = [...document.querySelectorAll(".main-nav a")];
    const sections = [
      document.querySelector("#sakums"),
      document.querySelector("#par-projektu"),
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
  cardsContainer.addEventListener("change", handleTaskChange);
  floatingTaskProgress?.addEventListener("click", handleProgressNavigation);
  window.addEventListener("scroll", updateMobileBackToTop, { passive: true });

  setTheme(startTheme);
  updateMobileBackToTop();
  createNav();
  renderWeekTaskSummary();
  renderCards();
  setActiveNavLink();
});

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector("#site-menu");
  const toggles = [...document.querySelectorAll(".menu-toggle")];
  const isHome = Boolean(document.querySelector("#cards"));
  const items = [
    ["Главная", isHome ? "#page-top" : "index.html"],
    ["Понедельник", "ponedelnik"], ["Вторник", "vtornik"],
    ["Среда", "sreda"], ["Четверг", "chetverg"],
    ["Пятница", "pyatnica"], ["Суббота", "subbota"],
    ["Воскресенье", "voskresenye"]
  ];
  const list = document.createElement("ul");
  const dayLinks = [];
  const shortNames = ["Глав", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  items.forEach(([title, target], index) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = shortNames[index];
    link.setAttribute("aria-label", title);
    link.title = title;
    link.href = index === 0 ? target : `${isHome ? "" : "index.html"}#${target}`;
    if (index > 0) {
      const badge = document.createElement("span");
      badge.className = "menu-today-badge";
      badge.textContent = "Сегодня";
      badge.hidden = true;
      link.append(badge);
      dayLinks.push({ link, badge, title, weekday: index % 7 });
    }
    item.append(link);
    list.append(item);
  });
  menu.append(list);
  if (!isHome) {
    const navList = document.querySelector(".main-nav ul");
    items.slice(1).forEach(([title, target], index) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = `index.html#${target}`;
      link.textContent = title;
      link.dataset.short = shortNames[index + 1];
      item.append(link);
      navList.append(item);
    });
  }
  function updateToday() {
    const weekday = new Date().getDay();
    dayLinks.forEach(({ link, badge, title, weekday: day }) => {
      const isToday = day === weekday;
      link.classList.toggle("is-today", isToday);
      badge.hidden = !isToday;
      link.setAttribute("aria-label", `${title}${isToday ? ", сегодня" : ""}`);
    });
    document.querySelectorAll(".main-nav a").forEach(link => {
      const index = items.findIndex(([, target], i) => i > 0 && link.hash === `#${target}`);
      if (index < 1) return;
      const isToday = index % 7 === weekday;
      link.classList.toggle("is-today", isToday);
      link.setAttribute("aria-label", `${items[index][0]}${isToday ? ", сегодня" : ""}`);
    });
  }
  updateToday();
  setInterval(updateToday, 60000);
  let opener;
  function close(restoreFocus = false) {
    menu.hidden = true;
    toggles.forEach(button => {
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Открыть меню");
    });
    if (restoreFocus) opener?.focus();
  }
  toggles.forEach(button => button.addEventListener("click", () => {
    if (!menu.hidden) return close();
    opener = button;
    updateToday();
    menu.hidden = false;
    toggles.forEach(toggle => {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Закрыть меню");
    });
    menu.querySelector("a").focus({ preventScroll: true });
  }));
  menu.addEventListener("click", event => {
    const link = event.target.closest("a");
    if (!link) return;
    close();
    if (link.hash && isHome) {
      const target = document.querySelector(link.hash);
      if (target) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    }
  });
  document.addEventListener("click", event => {
    if (!menu.contains(event.target) && !toggles.some(button => button.contains(event.target))) close();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !menu.hidden) close(true);
  });
  document.addEventListener("focusin", event => {
    if (!menu.hidden && !menu.contains(event.target) && !toggles.some(button => button.contains(event.target))) close();
  });
});

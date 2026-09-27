document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#today-summary");
  if (!container) return;
  function renderToday() {
    const now = new Date();
    container.replaceChildren();
    const heading = document.createElement("h2");
    heading.id = "today-title";
    heading.textContent = `Сегодня · ${now.toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })}`;
    container.append(heading);
    const grid = document.createElement("div");
    grid.className = "today-grid";
    const events = window.getDayEvents(now);
    function block(title, lines) {
      const section = document.createElement("div");
      const label = document.createElement("h3");
      label.textContent = title;
      section.append(label);
      lines.forEach(line => {
        const p = document.createElement("p");
        p.textContent = line;
        section.append(p);
      });
      grid.append(section);
    }
    const describe = event => `${event.time}${event.activity ? ` · ${event.activity}` : ""}`;
    block("Учеба", events.filter(e => e.kind === "Учеба").map(describe).length
      ? events.filter(e => e.kind === "Учеба").map(describe) : ["Сегодня занятий нет"]);
    const work = events.filter(e => e.kind === "Работа");
    block("Работа", work.length ? work.map(describe) : [window.hasWorkData(now) ? "Сегодня смены нет" : "Рабочий график на этот месяц еще не добавлен"]);
    const next = window.getNextEvent(now);
    block(next && next.start <= now ? "Сейчас идет" : "Ближайшее событие", next
      ? [`${next.kind} · ${next.start.toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}`, describe(next)]
      : ["На ближайшие 7 дней событий нет"]);
    container.append(grid);
    const note = document.createElement("p");
    note.className = "schedule-note";
    note.textContent = "Время по часам устройства. Ближайшее событие — из добавленного расписания.";
    container.append(note);
  }
  renderToday();
  setInterval(renderToday, 60000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) renderToday(); });
});

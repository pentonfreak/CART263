const panels = document.querySelectorAll(".panel");

panels.forEach(panel => {
  panel.style.setProperty("--mouse-x", "50%");
  panel.style.setProperty("--mouse-y", "50%");

  panel.addEventListener("mousemove", (e) => {
    const r = panel.getBoundingClientRect();
    panel.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
    panel.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
  });

  panel.addEventListener("mouseleave", () => {
    panel.style.setProperty("--mouse-x", "50%");
    panel.style.setProperty("--mouse-y", "50%");
  });
});
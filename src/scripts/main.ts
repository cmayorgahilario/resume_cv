const root = document.documentElement;

const toggle = document.getElementById("theme-toggle");
toggle?.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem(
    "theme-v12",
    root.classList.contains("dark") ? "dark" : "light",
  );
});

const fi = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in");
        fi.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.1 },
);
document.querySelectorAll<HTMLElement>("[data-fi]").forEach((el) => fi.observe(el));

const animateTo = (el: HTMLElement, n: number, dur = 1500) => {
  const t0 = performance.now();
  const step = (t: number) => {
    const p = Math.min(1, (t - t0) / dur);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = String(Math.round(n * e));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const cio = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement;
        const n = parseInt(el.dataset.counter ?? "0", 10);
        animateTo(el, n);
        cio.unobserve(el);
      }
    }
  },
  { threshold: 0.3 },
);
document
  .querySelectorAll<HTMLElement>("[data-counter]")
  .forEach((el) => cio.observe(el));

const bio = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement;
        const v = parseInt(el.dataset.bar ?? "0", 10) / 100;
        el.style.transform = `scaleX(${v})`;
        bio.unobserve(el);
      }
    }
  },
  { threshold: 0.3 },
);
document.querySelectorAll<HTMLElement>("[data-bar]").forEach((el) => bio.observe(el));

const progress = document.getElementById("progress");
window.addEventListener(
  "scroll",
  () => {
    if (!progress) return;
    const st = window.scrollY;
    const sh = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${sh > 0 ? st / sh : 0})`;
  },
  { passive: true },
);

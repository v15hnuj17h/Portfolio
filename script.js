const MAX_TRAIL_DOTS = 24;
let lastX = -100;
let lastY = -100;
let dotCount = 0;
const THEME_KEY = "portfolio-theme";
const revealTimeouts = new WeakMap();
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const themeToggle = document.getElementById("theme-toggle");

function applyTheme(mode) {
  const isLight = mode === "light";
  document.body.classList.toggle("light-mode", isLight);
  if (themeToggle) {
    themeToggle.textContent = isLight ? "Dark Mode" : "Light Mode";
    themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  }
}

const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme === "light" || savedTheme === "dark") {
  applyTheme(savedTheme);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextMode = document.body.classList.contains("light-mode") ? "dark" : "light";
    applyTheme(nextMode);
    localStorage.setItem(THEME_KEY, nextMode);
  });
}

const revealSections = document.querySelectorAll("main section:not(#about)");
revealSections.forEach((section) => {
  section.classList.add("scroll-reveal-on-scroll");
});

if (prefersReducedMotion) {
  revealSections.forEach((section) => {
    section.classList.add("revealed");
  });
} else {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const section = entry.target;
        const revealDelay = Number(section.dataset.revealDelay || "0");
        const pendingTimeout = revealTimeouts.get(section);

        if (entry.isIntersecting) {
          if (pendingTimeout) {
            return;
          }
          const timeoutId = window.setTimeout(() => {
            section.classList.add("revealed");
            revealTimeouts.delete(section);
          }, revealDelay);
          revealTimeouts.set(section, timeoutId);
          return;
        }

        if (pendingTimeout) {
          window.clearTimeout(pendingTimeout);
          revealTimeouts.delete(section);
        }
        section.classList.remove("revealed");
      });
    },
    {
      threshold: 0.25,
      rootMargin: "0px 0px -5% 0px",
    }
  );

  revealSections.forEach((section, index) => {
    section.dataset.revealDelay = String(index * 150);
    sectionObserver.observe(section);
  });
}

function createTrailDot(x, y) {
  if (dotCount >= MAX_TRAIL_DOTS) {
    return;
  }
  const dot = document.createElement("span");
  dot.className = "trail-dot";
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
  document.body.appendChild(dot);

  dot.addEventListener("animationend", () => {
    dot.remove();
    dotCount = Math.max(0, dotCount - 1);
  }, { once: true });
}

let pendingMouseEvent = null;
let trailFramePending = false;

function processMouseMove(event) {
  const deltaX = Math.abs(event.clientX - lastX);
  const deltaY = Math.abs(event.clientY - lastY);
  const movedEnough = deltaX + deltaY > 8;

  if (!movedEnough || dotCount >= MAX_TRAIL_DOTS) {
    return;
  }

  createTrailDot(event.clientX, event.clientY);
  dotCount += 1;
  lastX = event.clientX;
  lastY = event.clientY;
}

if (!prefersReducedMotion) {
  window.addEventListener("mousemove", (event) => {
    pendingMouseEvent = event;
    if (trailFramePending) {
      return;
    }
    trailFramePending = true;
    window.requestAnimationFrame(() => {
      trailFramePending = false;
      if (pendingMouseEvent) {
        processMouseMove(pendingMouseEvent);
      }
      pendingMouseEvent = null;
    });
  }, { passive: true });
}

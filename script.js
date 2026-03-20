const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".site-nav__toggle");
const navLinks = document.querySelector(".site-nav__links");
const navLinkItems = document.querySelectorAll(".site-nav__links a");
const heroShaderFrame = document.querySelector(".hero__shader");
let headerTicking = false;

function syncHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 18);
}

function scheduleHeaderSync() {
  if (headerTicking) return;
  headerTicking = true;
  window.requestAnimationFrame(() => {
    headerTicking = false;
    syncHeader();
  });
}

function closeMenu() {
  if (!navToggle || !navLinks) return;
  navToggle.setAttribute("aria-expanded", "false");
  navLinks.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  navLinkItems.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      closeMenu();
    }
    scheduleHeaderSync();
  });
}

function setHeroShaderRunning(isRunning) {
  if (!heroShaderFrame || !heroShaderFrame.contentWindow) return;
  heroShaderFrame.contentWindow.postMessage(
    {
      type: "visibility",
      running: isRunning
    },
    "*"
  );
}

if (heroShaderFrame) {
  heroShaderFrame.addEventListener("load", () => {
    const rect = heroShaderFrame.getBoundingClientRect();
    setHeroShaderRunning(
      !document.hidden && rect.bottom > 0 && rect.top < window.innerHeight
    );
  });

  if ("IntersectionObserver" in window) {
    const shaderObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setHeroShaderRunning(!document.hidden && entry.isIntersecting);
        });
      },
      { threshold: 0.02 }
    );

    shaderObserver.observe(heroShaderFrame);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      setHeroShaderRunning(false);
      return;
    }

    const rect = heroShaderFrame.getBoundingClientRect();
    setHeroShaderRunning(rect.bottom > 0 && rect.top < window.innerHeight);
  });
}

window.addEventListener("scroll", scheduleHeaderSync, { passive: true });
syncHeader();

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

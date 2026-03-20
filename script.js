const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".site-nav__toggle");
const navLinks = document.querySelector(".site-nav__links");
const navLinkItems = document.querySelectorAll(".site-nav__links a");
const heroShaderHost = document.querySelector("[data-hero-shader]");

function syncHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 18);
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
  });
}

window.addEventListener("scroll", syncHeader, { passive: true });
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

  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      item.classList.add("is-visible");
      return;
    }
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

function loadHeroShader() {
  if (!heroShaderHost) return;
  if (window.innerWidth < 960) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (navigator.connection && navigator.connection.saveData) return;

  const shaderFrame = document.createElement("iframe");
  shaderFrame.src = "assets/hero-shader.html";
  shaderFrame.title = "Dekorativer Hintergrund";
  shaderFrame.loading = "lazy";
  shaderFrame.setAttribute("aria-hidden", "true");
  heroShaderHost.appendChild(shaderFrame);
  heroShaderHost.classList.add("is-ready");
}

if (heroShaderHost) {
  const startShader = () => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(loadHeroShader, { timeout: 1800 });
    } else {
      window.setTimeout(loadHeroShader, 1200);
    }
  };

  if (document.readyState === "complete") {
    startShader();
  } else {
    window.addEventListener("load", startShader, { once: true });
  }
}

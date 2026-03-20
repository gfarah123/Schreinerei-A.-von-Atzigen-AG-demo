(function () {
  function initScrollLinks(lenisInstance) {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        var targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;
        var target = document.querySelector(targetId);
        if (!target) return;
        event.preventDefault();
        if (lenisInstance && typeof lenisInstance.scrollTo === "function") {
          lenisInstance.scrollTo(target, { offset: -90 });
        } else {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  function initMotion() {
    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    var lenis = null;
    try {
      if (window.Lenis) {
        lenis = new window.Lenis({
          duration: 1.15,
          wheelMultiplier: 0.95,
          touchMultiplier: 1.2,
          smoothWheel: true
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        lenis.on("scroll", ScrollTrigger.update);
        requestAnimationFrame(raf);
      }
    } catch (error) {
      console.warn("Lenis konnte lokal nicht gestartet werden.", error);
    }

    initScrollLinks(lenis);

    try {
      gsap.from(".motion-hero-eyebrow, .motion-hero-title, .motion-hero-copy", {
        y: 54,
        opacity: 0,
        duration: 0.95,
        stagger: 0.12,
        ease: "power3.out"
      });

      gsap.from(".motion-hero-actions > *", {
        y: 34,
        opacity: 0,
        delay: 0.45,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });

      gsap.from(".motion-hero-card", {
        y: 70,
        opacity: 0,
        duration: 1,
        delay: 0.25,
        ease: "power3.out"
      });

      gsap.utils.toArray(".reveal").forEach(function (element) {
        gsap.from(element, {
          y: 72,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 84%",
            once: true
          }
        });
      });

      gsap.utils.toArray(".stagger-group").forEach(function (group) {
        var items = group.querySelectorAll(".stagger-item");
        if (!items.length) return;
        gsap.from(items, {
          y: 56,
          opacity: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: group,
            start: "top 80%",
            once: true
          }
        });
      });

      gsap.utils.toArray(".parallax-media").forEach(function (element) {
        gsap.to(element, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      gsap.from(".panel-quote", {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".panel-quote",
          start: "top 78%",
          once: true
        }
      });

      gsap.to(".scroll-progress__fill", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });
    } catch (error) {
      console.warn("GSAP-Animationen konnten nicht vollständig initialisiert werden.", error);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMotion);
  } else {
    initMotion();
  }
})();

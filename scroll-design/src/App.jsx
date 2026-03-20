import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./App.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const highlights = [
  {
    value: "1928",
    label: "Als Familienbetrieb gegründet, heute in dritter Generation geführt.",
  },
  {
    value: "Massarbeit",
    label: "Möbel, Einbauten und Anpassungen für Wohnen, Bad, Essen und Stauraum.",
  },
  {
    value: "Tür & Schloss",
    label: "Mechanische Schliessanlagen, Reparaturen und Türnotöffnungen.",
  },
  {
    value: "Camping",
    label: "Umbauten, Verkleidungen und Vorbauten unter Berücksichtigung der Vorgaben.",
  },
];

const services = [
  {
    title: "Möbel nach Mass",
    body: "Schränke, Tische, Ergänzungen und individuelle Lösungen, exakt auf Raum und Nutzung abgestimmt.",
    image: "raumteiler.jpg",
  },
  {
    title: "Schliessanlagen & Türen",
    body: "Mechanische Schliesssysteme, Reparaturen, Ersatz und Türnotöffnungen bei Bedarf.",
    image: "tueren.jpg",
  },
  {
    title: "Spezialaufträge",
    body: "Umbauten und Auskleidungen für Camping-Häuser und Vorbauten, praxisgerecht umgesetzt.",
    image: "camping-haus.jpg",
  },
];

const projects = [
  {
    tag: "Massivholz",
    title: "Tisch nach Wunsch",
    body: "Einzelstücke mit ruhiger Formensprache und Augenmerk auf Materialcharakter und Gebrauch.",
    image: "baumkantentisch.jpg",
  },
  {
    tag: "Spezialauftrag",
    title: "Umbau und Auskleidung",
    body: "Holzkonstruktionen und Verkleidungen für Campinganlagen, angepasst an Vorgaben und Platzverhältnisse.",
    image: "camping-umbau.jpg",
  },
  {
    tag: "Nach Mass",
    title: "Einbau im Bestand",
    body: "Passgenaue Lösungen für Räume, in denen Millimeter und saubere Anschlüsse wichtig sind.",
    image: "waschtisch.jpg",
  },
];

const timeline = [
  {
    year: "1928",
    text: "Gründung als Wagnerei in Alpnach. Der Betrieb war von Anfang an lokal verankert.",
  },
  {
    year: "Später",
    text: "Ausbau zum kleinen Schreinerbetrieb mit Fokus auf praktische, individuelle Arbeiten.",
  },
  {
    year: "Heute",
    text: "Weiterführung in der dritten Generation mit Werkstatt, Erfahrung und direktem Kundenkontakt.",
  },
];

const asset = (name) => `${import.meta.env.BASE_URL}design-assets/${name}`;

function App() {
  const appRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    lenis.on("scroll", ScrollTrigger.update);
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useGSAP(
    () => {
      gsap.from(".motion-hero-eyebrow, .motion-hero-title, .motion-hero-copy", {
        y: 54,
        opacity: 0,
        duration: 0.95,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(".motion-hero-actions > *", {
        y: 34,
        opacity: 0,
        delay: 0.45,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".motion-hero-card", {
        y: 70,
        opacity: 0,
        duration: 1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.from(element, {
          y: 72,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 84%",
            once: true,
          },
        });
      });

      gsap.utils.toArray(".stagger-group").forEach((group) => {
        const items = group.querySelectorAll(".stagger-item");
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
            once: true,
          },
        });
      });

      gsap.utils.toArray(".parallax-media").forEach((element) => {
        gsap.to(element, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.from(".panel-quote", {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".panel-quote",
          start: "top 78%",
          once: true,
        },
      });

      gsap.to(".scroll-progress__fill", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: appRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    },
    { scope: appRef }
  );

  return (
    <div className="scroll-app" ref={appRef}>
      <div className="scroll-progress" aria-hidden="true">
        <div className="scroll-progress__fill" />
      </div>

      <header className="motion-nav">
        <a className="motion-nav__brand" href="#home">
          <img src={asset("logo-atzigen.png")} alt="Logo A. von Atzigen AG" />
          <span>
            <strong>A. von Atzigen AG</strong>
            <small>Scroll Design</small>
          </span>
        </a>
        <nav className="motion-nav__links" aria-label="Seitennavigation">
          <a href="#home">Home</a>
          <a href="#leistungen">Leistungen</a>
          <a href="#spezial">Spezialaufträge</a>
          <a href="#ueber-uns">Über uns</a>
          <a href="#kontakt">Kontakt</a>
        </nav>
        <a className="motion-nav__switch" href="../../index.html">
          Klassische Website
        </a>
      </header>

      <main>
        <section className="motion-hero" id="home">
          <iframe
            className="motion-hero__shader"
            src={asset("hero-shader.html")}
            title="Dekorativer Hintergrund"
          />
          <div className="motion-hero__overlay" />
          <div className="motion-hero__inner">
            <div className="motion-hero__copy-wrap">
              <span className="motion-hero-eyebrow">Seit 1928 in Alpnach Dorf</span>
              <h1 className="motion-hero-title">
                Möbel, Ausbau und Spezialarbeiten aus Holz.
              </h1>
              <p className="motion-hero-copy">
                Wir planen und fertigen Lösungen nach Mass. Ob Innenausbau,
                Ergänzungen zu bestehendem Mobiliar, Türen und
                Schliessanlagen oder Ausbauten für Camping-Häuser: Wir
                arbeiten sauber, direkt und mit Blick auf das Praktische.
              </p>
              <div className="motion-hero-actions">
                <a href="#kontakt">Projekt besprechen</a>
                <a href="#leistungen">Leistungen ansehen</a>
              </div>
            </div>

            <aside className="motion-hero-card">
              <img src={asset("baumkantentisch.jpg")} alt="Massivholztisch" />
              <div className="motion-hero-card__meta">
                <span>Individuelle Ausführung</span>
                <strong>Möbel nach Mass, passend zum Raum und zum Alltag.</strong>
              </div>
            </aside>
          </div>
        </section>

        <section className="motion-strip stagger-group">
          {highlights.map((item) => (
            <article className="motion-strip__item stagger-item" key={item.value}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </section>

        <section className="motion-section motion-section--intro" id="leistungen">
          <div className="motion-heading reveal">
            <span>Was wir machen</span>
            <h2>Ein kleiner Betrieb mit klarer Arbeit.</h2>
          </div>
          <div className="motion-copy reveal">
            <p>
              Die Schreinerei A. von Atzigen AG übernimmt Aufträge, bei denen
              Erfahrung, Sorgfalt und eine gute Werkstatt gefragt sind. Wir
              nehmen Mass vor Ort, beraten nüchtern und fertigen so, dass das
              Ergebnis langfristig passt.
            </p>
            <ul className="motion-list">
              <li>Möbel nach Mass für bestehende Räume und schwierige Grundrisse.</li>
              <li>Innenausbau und Einbauten für Wohnen, Bad, Essen und Stauraumlösungen.</li>
              <li>Mechanische Schliessanlagen, Zylinderwechsel, Reparaturen und Notöffnungen.</li>
              <li>Spezialaufträge für Camping-Häuser, Vorbauten und individuelle Holzkonstruktionen.</li>
            </ul>
          </div>
        </section>

        <section className="motion-grid stagger-group">
          {services.map((service) => (
            <article className="motion-card motion-card--service stagger-item" key={service.title}>
              <div className="motion-card__image-wrap">
                <img
                  className="parallax-media"
                  src={asset(service.image)}
                  alt={service.title}
                />
              </div>
              <div className="motion-card__body">
                <span>{service.title}</span>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="motion-section motion-section--split" id="spezial">
          <div className="motion-copy reveal">
            <span className="motion-label">Spezialaufträge</span>
            <h2>Camping-Häuser, Vorbauten und Holzarbeiten mit Augenmass.</h2>
            <p>
              Wir haben uns bei Campingplatz-Bewohnern einen Namen gemacht.
              Ob Umbau, Auskleidung oder Vorbau: Wir setzen die Wünsche so um,
              dass das Ergebnis zum Ort, zum Reglement und zum Alltag auf dem
              Platz passt.
            </p>
          </div>
          <div className="panel-quote">
            Gerade auf engem Raum braucht es gute Proportionen und saubere Details.
          </div>
        </section>

        <section className="motion-grid motion-grid--projects stagger-group">
          {projects.map((project) => (
            <article className="motion-card motion-card--project stagger-item" key={project.title}>
              <div className="motion-card__image-wrap">
                <img
                  className="parallax-media"
                  src={asset(project.image)}
                  alt={project.title}
                />
              </div>
              <div className="motion-card__body">
                <span>{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.body}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="motion-section motion-section--process">
          <div className="motion-copy reveal">
            <span className="motion-label">Arbeitsweise</span>
            <h2>Beratung, Aufnahme, saubere Ausführung.</h2>
            <p>
              Viele Arbeiten beginnen mit einer Besichtigung vor Ort. So
              stimmen die Masse, Anschlüsse und Übergänge. Wir halten den
              Ablauf übersichtlich und setzen lieber auf gute Vorbereitung
              als auf grosse Versprechen.
            </p>
          </div>
          <div className="motion-steps stagger-group">
            <article className="motion-step stagger-item">
              <strong>1</strong>
              <p>Vor-Ort-Termin für Massaufnahme und Abklärung der Details.</p>
            </article>
            <article className="motion-step stagger-item">
              <strong>2</strong>
              <p>Vorschlag mit praktikabler Lösung und passender Materialwahl.</p>
            </article>
            <article className="motion-step stagger-item">
              <strong>3</strong>
              <p>Fertigung in der eigenen Werkstatt und Einbau vor Ort.</p>
            </article>
          </div>
        </section>

        <section className="motion-section motion-section--story" id="ueber-uns">
          <div className="motion-heading reveal">
            <span>Über uns</span>
            <h2>Ein Familienbetrieb, der in Alpnach geblieben ist.</h2>
          </div>
          <div className="motion-copy reveal">
            <p>
              Die Firma wurde 1928 vom Grossvater als Wagnerei gegründet.
              Später führte der Vater den Betrieb weiter und baute ihn zur
              Schreinerei aus. Heute wird die A. von Atzigen AG in dritter
              Generation von gelernten Schreinern weitergeführt.
            </p>
          </div>
        </section>

        <section className="motion-grid motion-grid--timeline stagger-group">
          {timeline.map((entry) => (
            <article className="motion-card motion-card--timeline stagger-item" key={entry.year}>
              <div className="motion-card__body">
                <span>{entry.year}</span>
                <h3>{entry.year}</h3>
                <p>{entry.text}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="motion-section motion-section--contact" id="kontakt">
          <div className="motion-contact-card reveal">
            <span className="motion-label">Kontakt</span>
            <h2>Direkt erreichbar für Besichtigung und Ausführung.</h2>
            <p>
              Termine sind nach Vereinbarung auch ausserhalb der regulären
              Öffnungszeiten möglich.
            </p>
            <dl className="motion-contact-list">
              <div>
                <dt>Adresse</dt>
                <dd>A. von Atzigen AG, Brünigstrasse 13, 6055 Alpnach Dorf</dd>
              </div>
              <div>
                <dt>Telefon</dt>
                <dd>041 670 16 23</dd>
              </div>
              <div>
                <dt>E-Mail</dt>
                <dd>atzigen@gmail.com</dd>
              </div>
              <div>
                <dt>Öffnungszeiten</dt>
                <dd>Mo-Fr 07:15-12:00 / 13:15-17:15</dd>
              </div>
            </dl>
            <div className="motion-hero-actions">
              <a href="tel:+41416701623">Jetzt anrufen</a>
              <a href="mailto:atzigen@gmail.com">E-Mail schreiben</a>
            </div>
          </div>

          <div className="motion-contact-visual reveal">
            <img
              className="parallax-media"
              src={asset("ferienhaus-fertig.jpg")}
              alt="Spezialauftrag Ferienhaus"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

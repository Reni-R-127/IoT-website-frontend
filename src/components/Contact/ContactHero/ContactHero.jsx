import { useEffect, useRef, useState } from "react";
import "./ContactHero.css";

import contactHeroImage from "../../../assets/Contact/ContactHero/contact-hero.png";

export default function ContactHero() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
      prefersReducedMotion ||
      typeof IntersectionObserver === "undefined"
    ) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`contact-hero ${
        visible ? "contact-hero-visible" : ""
      }`}
      aria-labelledby="contact-hero-title"
    >
      {/* Background decorations */}
      <div
        className="contact-hero-decoration contact-decoration-purple"
        aria-hidden="true"
      />

      <div
        className="contact-hero-decoration contact-decoration-cyan"
        aria-hidden="true"
      />

      <div
        className="contact-hero-decoration contact-decoration-yellow"
        aria-hidden="true"
      />

      <div className="contact-hero-container">
        {/* Heading and description */}
        <div className="contact-hero-content">
          <div className="contact-hero-eyebrow" aria-label="Contact">
            <span
              className="contact-hero-eyebrow-line"
              aria-hidden="true"
            />
            <span className="contact-hero-eyebrow-text">CONTACT</span>
            <span
              className="contact-hero-eyebrow-line"
              aria-hidden="true"
            />
          </div>

          <h1 id="contact-hero-title">
            Have questions
            <span>about our courses?</span>
          </h1>

          <p className="contact-hero-description">
            Talk to our team. For the fastest response,
            <br className="contact-hero-desktop-break" /> use WhatsApp.
          </p>
        </div>

        {/* Hero illustration */}
        <div className="contact-hero-visual">
          <div
            className="contact-hero-image-glow"
            aria-hidden="true"
          />

          <img
            src={contactHeroImage}
            alt="Friendly robot with books, a laptop, and contact icons"
            className="contact-hero-image"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}

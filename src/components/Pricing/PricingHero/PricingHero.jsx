import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  GraduationCap,
  BookOpen,
  Lightbulb,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

import pricingHeroImage from "../../../assets/Pricing/PricingHero/pricing-hero.png";
import "./PricingHero.css";

const benefits = [
  {
    title: "Age-wise",
    subtitle: "Learning Paths",
    Icon: GraduationCap,
    theme: "purple",
  },
  {
    title: "Hands-on",
    subtitle: "Projects",
    Icon: BookOpen,
    theme: "blue",
  },
  {
    title: "Practical",
    subtitle: "Skills",
    Icon: Lightbulb,
    theme: "green",
  },
  {
    title: "Flexible",
    subtitle: "Plans",
    Icon: Star,
    theme: "yellow",
  },
];

export default function PricingHero() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return undefined;
    }

    if (typeof IntersectionObserver === "undefined") {
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
      { threshold: 0.1 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`pricing-hero ${visible ? "pricing-hero-visible" : ""}`}
      aria-labelledby="pricing-hero-title"
    >
      <div
        className="pricing-hero-decoration pricing-hero-decoration-one"
        aria-hidden="true"
      />
      <div
        className="pricing-hero-decoration pricing-hero-decoration-two"
        aria-hidden="true"
      />
      <div
        className="pricing-hero-decoration pricing-hero-decoration-three"
        aria-hidden="true"
      />
      <div
        className="pricing-hero-decoration pricing-hero-decoration-four"
        aria-hidden="true"
      />

      <div className="pricing-hero-container">
        {/* Heading and description */}
        <div className="pricing-hero-content">
          <div className="pricing-hero-eyebrow">
            <span className="pricing-hero-eyebrow-line" aria-hidden="true" />
            <span>PRICING</span>
            <span className="pricing-hero-eyebrow-line" aria-hidden="true" />
          </div>

          <h1 id="pricing-hero-title">
            Simple plans for
            <br className="pricing-desktop-break" /> every stage of
            <br className="pricing-desktop-break" /> <span>learning.</span>
          </h1>

          <p className="pricing-hero-description">
            Keep pricing easy to understand. Replace the placeholders with your
            actual course and program prices.
          </p>
        </div>

        {/* Illustration */}
        <div className="pricing-hero-visual">
          <div className="pricing-hero-image-glow" aria-hidden="true" />

          <img
            src={pricingHeroImage}
            alt="Children's technology learning plans with robotics, books, and a friendly robot"
            className="pricing-hero-image"
            fetchPriority="high"
          />
        </div>

        {/* Benefits cards */}
        <div className="pricing-hero-benefits">
          {benefits.map(({ title, subtitle, Icon, theme }, index) => (
            <div
              className={`pricing-benefit pricing-benefit-${theme}`}
              key={title}
              style={{ "--benefit-delay": `${index * 100}ms` }}
            >
              <div className="pricing-benefit-icon">
                <Icon size={29} strokeWidth={1.8} aria-hidden="true" />
              </div>

              <p>
                <span>{title}</span>
                <span>{subtitle}</span>
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link to="/courses" className="pricing-hero-cta">
          Explore Courses
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}

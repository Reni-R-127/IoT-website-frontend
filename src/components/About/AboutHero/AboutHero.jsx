import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import heroImage from "../../../assets/About/Hero/hero.png";
import "./AboutHero.css";

export default function AboutHero() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px",
      },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`about-hero${isVisible ? " is-visible" : ""}`}
      aria-labelledby="about-hero-title"
    >
      <div
        className="about-hero-decoration about-hero-blue"
        aria-hidden="true"
      />
      <div
        className="about-hero-decoration about-hero-purple"
        aria-hidden="true"
      />

      <div className="about-hero-container">
        <div className="about-hero-content">
          <div className="about-hero-eyebrow">
            <span className="about-hero-eyebrow-line" aria-hidden="true" />
            <span>ABOUT US</span>
            <span className="about-hero-eyebrow-line" aria-hidden="true" />
          </div>

          <h1 id="about-hero-title">
            <span className="about-hero-title-line">
              Technology learning
            </span>
            <span className="about-hero-title-line">
              that children can
            </span>
            <span className="about-hero-title-line">
              <strong>experience,</strong>
            </span>
            <span className="about-hero-title-line">
              not just watch.
            </span>
          </h1>

          <span className="about-hero-underline" aria-hidden="true" />

          <p className="about-hero-description">
            We are a technology education initiative focused on helping
            children understand and build with modern technology.
          </p>
        </div>

        <div className="about-hero-visual">
          <div className="about-hero-image-glow" aria-hidden="true" />
          <img
            src={heroImage}
            alt="Child building a robotics and electronics project"
            className="about-hero-image"
            fetchPriority="high"
          />
        </div>

        <div className="about-hero-actions">
          <Link to="/courses" className="about-hero-primary">
            Explore Courses
            <ArrowRight
              size={20}
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </Link>

          <Link to="/about" className="about-hero-secondary">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}

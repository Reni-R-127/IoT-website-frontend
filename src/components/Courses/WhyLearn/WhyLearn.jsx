import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import learnImage from "../../../assets/Courses/WhyLearn/Learn-1.png";
import ageImage from "../../../assets/Courses/WhyLearn/Learn-2.png";
import guidedImage from "../../../assets/Courses/WhyLearn/Learn-3.png";
import futureImage from "../../../assets/Courses/WhyLearn/Learn-4.png";

import "./WhyLearn.css";

const benefits = [
  {
    title: "Hands-on Projects",
    description: "Learn by actually building real projects.",
    image: learnImage,
    alt: "Hands-on electronics project with a light bulb",
    theme: "blue",
  },
  {
    title: "Age-Based Learning",
    description:
      "Courses matched to different age groups and experience levels.",
    image: ageImage,
    alt: "Graduation cap and colorful books",
    theme: "pink",
  },
  {
    title: "Guided Learning",
    description:
      "Clear explanations and expert support throughout every project.",
    image: guidedImage,
    alt: "Laptop and headphones for guided learning",
    theme: "green",
  },
  {
    title: "Future-Ready Skills",
    description:
      "Explore emerging technologies like IoT, AI, robotics and more.",
    image: futureImage,
    alt: "Rocket and stars representing future-ready skills",
    theme: "purple",
  },
];

export default function WhyLearn() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`why-learn ${
        isVisible ? "why-learn-visible" : ""
      }`}
      aria-labelledby="why-learn-title"
    >
      {/* Background decorations */}
      <div
        className="why-learn-decoration why-learn-decoration-left"
        aria-hidden="true"
      />

      <div
        className="why-learn-decoration why-learn-decoration-right"
        aria-hidden="true"
      />

      <div
        className="why-learn-dots why-learn-dots-left"
        aria-hidden="true"
      />

      <div
        className="why-learn-dots why-learn-dots-right"
        aria-hidden="true"
      />

      <div className="why-learn-container">
        {/* Section heading */}
        <header className="why-learn-heading">
          <div className="why-learn-eyebrow">
            <span aria-hidden="true" />
            <span>WHY LEARN WITH US?</span>
            <span aria-hidden="true" />
          </div>

          <h2 id="why-learn-title">
            More than just courses.
            <br />
            A better way <strong>to learn.</strong>
          </h2>

          <p>
            We make learning hands-on, fun and future-ready with
            practical projects and expert support.
          </p>
        </header>

        {/* Feature cards — no connecting line or paper aeroplane */}
        <div className="why-learn-grid">
          {benefits.map((item, index) => (
            <article
              key={item.title}
              className={`why-learn-card why-learn-${item.theme}`}
              style={{
                "--card-delay": `${index * 160}ms`,
                "--float-delay": `${index * -0.7}s`,
              }}
            >
              <div className="why-learn-image-stage">
                <div
                  className="why-learn-image-circle"
                  aria-hidden="true"
                />

                <img
                  src={item.image}
                  alt={item.alt}
                  className="why-learn-image"
                  loading="lazy"
                />
              </div>

              <div className="why-learn-card-content">
                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <Link
                  to="/courses"
                  className="why-learn-card-link"
                  aria-label={`Explore courses: ${item.title}`}
                >
                  <ArrowRight size={18} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

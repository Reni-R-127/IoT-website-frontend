import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Bot,
  Code2,
  Cpu,
  MessageCircle,
  Tag,
  UserRound,
  Wifi,
  Zap,
  Clock3,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { usePublicContent } from "../../../hooks/usePublicContent.js";
import { openTrackedWhatsApp } from "../../../utils/whatsapp.js";
import Reveal from "../Reveal.jsx";

import courseArduino from "../../../assets/course-arduino.png";
import courseIot from "../../../assets/course-iot.png";
import courseRobotics from "../../../assets/course-robotics.png";
import courseElectronics from "../../../assets/course-electronics.png";
import courseCoding from "../../../assets/course-coding.png";
import courseAI from "../../../assets/course-ai.png";

import "./PopularLearning.css";

const icons = {
  wifi: Wifi,
  cpu: Cpu,
  bot: Bot,
  zap: Zap,
  code: Code2,
  brain: Cpu,
  settings: Cpu,
};

const images = {
  iot: courseIot,
  arduino: courseArduino,
  robotics: courseRobotics,
  electronics: courseElectronics,
  coding: courseCoding,
  ai: courseAI,
  "iot-robotics": courseArduino,
};

const tones = {
  iot: "blue",
  arduino: "green",
  robotics: "purple",
  electronics: "yellow",
  coding: "pink",
  ai: "mint",
  "iot-robotics": "purple",
};

export default function PopularLearning() {
  const { items: apiCourses, loading, error } = usePublicContent("courses");
  const courses = apiCourses.map((item) => ({
    ...item,
    id: item.slug || item._id,
    name: item.title,
    age: item.ageRange || "Ask us",
    icon: (item.category || "iot").toLowerCase().replace(/[^a-z]/g, "") === "robotics" ? "bot" : "wifi",
    price: item.price || "Contact us",
  }));
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (
      location.pathname !== "/courses" ||
      location.hash !== "#popular-learning"
    ) {
      return undefined;
    }

    const frameId = requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => cancelAnimationFrame(frameId);
  }, [location.pathname, location.hash]);

  return (
    <section
      ref={sectionRef}
      id="popular-learning"
      className={`popular-learning${isVisible ? " popular-in-view" : ""}`}
      aria-labelledby="popular-learning-title"
    >
      <div className="popular-blob blob-one" aria-hidden="true" />
      <div className="popular-blob blob-two" aria-hidden="true" />

      <div className="popular-container">
        <Reveal>
          <header className="popular-heading">
            <div className="popular-eyebrow">
              <span className="popular-eyebrow-line" aria-hidden="true" />
              <span>POPULAR LEARNING</span>
              <span className="popular-eyebrow-line" aria-hidden="true" />
            </div>

            <h2 id="popular-learning-title">
              Courses built around <strong>making</strong>
            </h2>

            <p>
              Choose a starting point based on age, interest and experience.
            </p>
          </header>
        </Reveal>

        {loading ? <p className="popular-loading">Loading courses…</p> : error ? <p className="popular-loading">Courses are temporarily unavailable. Please try again soon.</p> : courses.length === 0 ? <p className="popular-loading">New courses will be announced here soon.</p> : <div className="popular-grid">
          {courses.slice(0, 6).map((course, index) => {
            const Icon = icons[course.icon] || Cpu;
            const courseImage = course.image || images[course.id] || courseArduino;
            const courseTone = tones[course.id] || "blue";

            return (
              <Reveal key={course.id} delay={index * 80}>
                <article className={`popular-card ${courseTone}`}>
                  <div className="popular-top">
                    <div className="popular-icon">
                      <Icon size={25} aria-hidden="true" />
                    </div>

                    <span>{course.level}</span>
                  </div>

                  <div className="popular-main">
                    <div className="popular-copy">
                      <h3>
                        {course.name === "Electronics & Sensors"
                          ? "Electronics Basics"
                          : course.name}
                      </h3>

                      <p>{course.description}</p>
                    </div>

                    <div className="popular-image">
                      <img
                        src={courseImage}
                        alt={course.name}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>

                  <div className="popular-meta">
                    <span title={course.age}>
                      <UserRound size={17} aria-hidden="true" />
                      {course.age}
                    </span>

                    <span title={course.duration}>
                      <Clock3 size={17} aria-hidden="true" />
                      {course.duration}
                    </span>

                    <span title={course.price}>
                      <Tag size={17} aria-hidden="true" />
                      {course.price}
                    </span>
                  </div>

                  <div className="popular-actions">
                    <Link
                      to={`/courses/${course.id}`}
                      aria-label={`View details for ${course.name}`}
                    >
                      <span>View Details</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => openTrackedWhatsApp({ source: "Popular learning course card", item: course.name, message: `Hello TechSprout Kids! I am interested in the ${course.name} course.` })}
                      aria-label={`Enquire about ${course.name} through WhatsApp`}
                    >
                      <MessageCircle size={17} aria-hidden="true" />
                      <span>Enroll</span>
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>}
      </div>
    </section>
  );
}

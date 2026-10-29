import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Bot,
  Cpu,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";

import { Link } from "react-router-dom";
import { trackedWhatsAppUrl, trackWhatsAppClick } from "../../../utils/whatsapp.js";

import "./HomeHero.css";

const highlights = [
  {
    title: "Hands-on Learning",
    text: "Learn by making and experimenting.",
    icon: Cpu,
    className: "highlight-blue",
  },
  {
    title: "Real Projects",
    text: "Turn concepts into working ideas.",
    icon: Wrench,
    className: "highlight-purple",
  },
  {
    title: "Expert Guidance",
    text: "Build with clear, supportive guidance.",
    icon: ShieldCheck,
    className: "highlight-cyan",
  },
  {
    title: "Future-Ready Skills",
    text: "Explore skills for tomorrow's technology.",
    icon: Sparkles,
    className: "highlight-yellow",
  },
];

function HeroActions({ mobile = false }) {
  return (
    <div
      className={`hero-actions${mobile ? " hero-actions-mobile" : ""}`}
      data-animate="fade-up"
    >
      <Link to="/courses" className="primary-btn">
        Explore Courses
        <ArrowRight size={17} />
      </Link>

      <a
        href={trackedWhatsAppUrl({ source: "Home hero", message: "Hello TechSprout Kids! I would like to know more about your programs." })}
        onClick={() => trackWhatsAppClick({ source: "Home hero" })}
        target="_blank"
        rel="noreferrer"
        className="secondary-btn"
      >
        Enroll Now
      </a>
    </div>
  );
}

export default function HomeHero() {
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = heroRef.current;

    if (!section || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.12,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className={`home-hero${isVisible ? " hero-in-view" : ""}`}
    >
      <div className="hero-edge-circle hero-blue-circle" aria-hidden="true" />

      <div className="hero-edge-circle hero-violet-circle" aria-hidden="true" />

      <div className="hero-content" data-animate="fade-left">
        <span className="hero-kicker-line" aria-hidden="true" />
        <span className="hero-kicker">Kids • STEM • Technology</span>
        <span className="hero-kicker-line" aria-hidden="true" />

        <h1 data-animate="fade-up" data-delay="2">
          Where Kids <em>Learn, Build</em> &amp; Create with Technology
        </h1>

        <p data-animate="fade-up" data-delay="3">
          Give your child hands-on experience with IoT, electronics, coding,
          robotics and emerging technologies through fun and practical projects.
        </p>

        <div className="hero-actions-desktop">
          <HeroActions />
        </div>
      </div>

      <div
        className="hero-visual"
        aria-label="Technology learning illustration"
        data-animate="zoom"
      >
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />

        <div className="hero-device">
          <div className="device-top">
            <span />
            <span />
            <span />
          </div>

          <div className="device-board">
            <Cpu size={38} />

            <div className="board-line line-a" />
            <div className="board-line line-b" />

            <div className="sensor-dot" />
            <div className="sensor-dot two" />
          </div>

          <div className="device-base" />
        </div>

        <div className="floating-chip chip-one">
          <Bot size={23} />
        </div>

        <div className="floating-chip chip-two">
          <Zap size={22} />
        </div>

        <div className="floating-chip chip-three">
          <Lightbulb size={21} />
        </div>

        <div className="hero-caption">
          <Sparkles size={16} />
          Build a real project
        </div>
      </div>

      <div className="hero-actions-below-visual">
        <HeroActions mobile />
      </div>

      <div className="hero-highlights">
        {highlights.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={`hero-highlight-card ${item.className}`}
              style={{ "--card-index": index }}
            >
              <div className="hero-highlight-icon">
                <Icon size={23} />
              </div>

              <div className="hero-highlight-content">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="hero-highlight-line" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

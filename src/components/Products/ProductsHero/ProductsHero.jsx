import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Box,
  Cpu,
  GraduationCap,
  Package,
  Send,
  Users,
  Wifi,
  Wrench,
} from "lucide-react";
import heroKit from "../../../assets/Products/hero-kit.jpg";
import "./ProductsHero.css";

const audience = [
  { icon: GraduationCap, title: "For Students", text: "School & College", tone: "violet" },
  { icon: Users, title: "For Colleges", text: "Workshops & Training", tone: "mint" },
  { icon: Cpu, title: "For Makers", text: "Build & Innovate", tone: "blue" },
];

const metrics = [
  { icon: Package, value: 10, suffix: "+", label: "Learning Kits", tone: "mint" },
  { icon: Box, value: 50, suffix: "+", label: "Project Ideas", tone: "blue" },
  { icon: Users, value: 1000, suffix: "+", label: "Happy Learners", tone: "violet" },
  { icon: GraduationCap, value: 50, suffix: "+", label: "College Workshops", tone: "yellow" },
];

function useSlowCount(target, active, duration = 4200) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return undefined;
    }

    let frameId;
    let startTime;
    const animate = (timestamp) => {
      if (startTime === undefined) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out smoothly without rushing through the final values.
      const eased = 1 - Math.pow(1 - progress, 2.2);
      setCount(Math.round(target * eased));
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [target, active, duration]);

  return count;
}

function MetricCard({ item, index, active }) {
  const Icon = item.icon;
  const count = useSlowCount(item.value, active);

  return (
    <article
      className={`hero-metric metric-card metric-${item.tone}`}
      style={{ "--metric-index": index }}
    >
      <span className={`metric-icon ${item.tone}`} aria-hidden="true">
        <Icon size={27} strokeWidth={2.2} />
      </span>
      <span className="metric-copy">
        <strong aria-label={`${item.value}${item.suffix}`}>
          {count.toLocaleString("en-IN")}{item.suffix}
        </strong>
        <small>{item.label}</small>
      </span>
    </article>
  );
}

export default function ProductsHero() {
  const metricsRef = useRef(null);
  const [metricsVisible, setMetricsVisible] = useState(false);

  useEffect(() => {
    const element = metricsRef.current;
    if (!element) return undefined;

    if (!("IntersectionObserver" in window)) {
      setMetricsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setMetricsVisible(entry.isIntersecting),
      { threshold: 0.25, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="products-hero products-shell" aria-labelledby="products-hero-title">
      <div className="products-hero-orb orb-left" aria-hidden="true" />
      <div className="products-hero-orb orb-right" aria-hidden="true" />

      <div className="products-hero-copy" data-animate="fade-left">
        <div className="products-eyebrow-pill">
          {/* <span className="products-heading-line" aria-hidden="true" /> */}
          {/* <Cpu size={19} aria-hidden="true" /> */}
          <span className="products-eyebrow-text">IoT · Robotics · Embedded Systems</span>
          {/* <span className="products-heading-line" aria-hidden="true" /> */}
        </div>

        <h1 id="products-hero-title">
          Turn Your Ideas Into <span>Real-World Technology</span>
        </h1>

        <p>
          Explore hands-on IoT kits and build-ready tools for{" "}
          <strong>school students, college innovators, and aspiring engineers.</strong>
        </p>

        <div className="products-hero-actions">
          <a className="products-btn products-btn-primary" href="#product-catalog">
            <Box size={22} aria-hidden="true" />
            <span>Explore Our Kits</span>
            <ArrowRight size={21} aria-hidden="true" />
          </a>
          <a className="products-btn products-btn-outline" href="#project-showcase">
            <span className="play-mark" aria-hidden="true">▶</span>
            <span>See What You Can Build</span>
          </a>
        </div>

        <div className="products-audience-row" aria-label="Who our kits are for">
          {audience.map(({ icon: Icon, title, text, tone }, index) => (
            <div
              className="products-audience"
              key={title}
              style={{ "--audience-index": index }}
            >
              <span className={`audience-icon ${tone}`} aria-hidden="true">
                <Icon size={25} />
              </span>
              <span className="audience-copy">
                <strong>{title}</strong>
                <small>{text}</small>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="products-hero-visual" data-animate="zoom">
        <div className="hero-visual-halo" aria-hidden="true" />
        <div className="hero-floating-tag tag-iot">
          <Wifi size={25} aria-hidden="true" /><span>IoT Projects</span>
        </div>
        <div className="hero-floating-tag tag-robot">
          <Wrench size={24} aria-hidden="true" /><span>Robotics</span>
        </div>
        <div className="hero-floating-tag tag-embedded">
          <Cpu size={25} aria-hidden="true" /><span>Embedded<br />Systems</span>
        </div>
        <img
          src={heroKit}
          alt="ProJenius IoT learning kit with robotics components and electronics"
          fetchPriority="high"
          decoding="async"
        />
        <span className="hero-doodle-plane" aria-hidden="true"><Send size={38} /></span>
      </div>

      <div className="products-hero-metrics-wrap" data-animate="fade-up">
        <div className="products-hero-metrics" ref={metricsRef} aria-label="ProJenius learning statistics">
          {metrics.map((item, index) => (
            <MetricCard
              key={item.label}
              item={item}
              index={index}
              active={metricsVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

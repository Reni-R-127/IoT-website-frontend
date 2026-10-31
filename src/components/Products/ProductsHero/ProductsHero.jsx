/**
 * File: website-frontend/src/components/Products/ProductsHero/ProductsHero.jsx
 *
 * Purpose:
 * Main hero section for the IoT products page.
 *
 * Features:
 * - Responsive hero layout
 * - IoT learning kit visual
 * - Audience highlights
 * - Product navigation
 * - Learning feature cards
 *
 * Dependencies:
 * React, lucide-react
 *
 * Assets:
 * src/assets/Products/hero-kit.jpg
 * src/assets/Products/hero-kit.webp
 */

import { useState } from "react";

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
import heroKitFallback from "../../../assets/Products/hero-kit.webp";

import "./ProductsHero.css";

// ======================================================
// TARGET AUDIENCE
// ======================================================

const audience = [
  {
    icon: GraduationCap,
    title: "For Students",
    text: "School & College",
    tone: "violet",
  },
  {
    icon: Users,
    title: "For Colleges",
    text: "Workshops & Training",
    tone: "mint",
  },
  {
    icon: Cpu,
    title: "For Makers",
    text: "Build & Innovate",
    tone: "blue",
  },
];

// ======================================================
// LEARNING HIGHLIGHTS
// No fabricated statistics.
// ======================================================

const highlights = [
  {
    icon: Package,
    title: "IoT Kits",
    description: "Sensor-based learning",
    tone: "mint",
  },
  {
    icon: Box,
    title: "Project Building",
    description: "Hands-on prototypes",
    tone: "blue",
  },
  {
    icon: Users,
    title: "Guided Learning",
    description: "Practical training",
    tone: "violet",
  },
  {
    icon: GraduationCap,
    title: "Robotics",
    description: "Build and program",
    tone: "yellow",
  },
];

// ======================================================
// HERO IMAGE
// ======================================================

function HeroImage() {
  const [imageSource, setImageSource] = useState(heroKit);
  const [imageFailed, setImageFailed] = useState(false);

  function handleImageError() {
    if (imageSource !== heroKitFallback) {
      setImageSource(heroKitFallback);
      return;
    }

    setImageFailed(true);
  }

  if (imageFailed) {
    return (
      <div className="hero-image-fallback">
        <Package size={60} aria-hidden="true" />
        <span>IoT Learning Kits</span>
      </div>
    );
  }

  return (
    <img
      src={imageSource}
      alt="ProJenius IoT learning kit with robotics components and electronics"
      loading="eager"
      decoding="async"
      onError={handleImageError}
    />
  );
}

// ======================================================
// AUDIENCE CARD
// ======================================================

function AudienceCard({ item, index }) {
  const Icon = item.icon;

  return (
    <div
      className="products-audience"
      style={{
        "--audience-index": index,
      }}
    >
      <span className={`audience-icon ${item.tone}`} aria-hidden="true">
        <Icon size={25} />
      </span>

      <span className="audience-copy">
        <strong>{item.title}</strong>
        <small>{item.text}</small>
      </span>
    </div>
  );
}

// ======================================================
// LEARNING HIGHLIGHT CARD
// ======================================================

function HighlightCard({ item, index }) {
  const Icon = item.icon;

  return (
    <article
      className={`hero-metric metric-card metric-${item.tone}`}
      style={{
        "--metric-index": index,
      }}
    >
      <span className={`metric-icon ${item.tone}`} aria-hidden="true">
        <Icon size={27} strokeWidth={2.2} />
      </span>

      <span className="metric-copy">
        <strong>{item.title}</strong>
        <small>{item.description}</small>
      </span>
    </article>
  );
}

// ======================================================
// MAIN PRODUCTS HERO
// ======================================================

export default function ProductsHero() {
  return (
    <section
      className="products-hero products-shell"
      aria-labelledby="products-hero-title"
    >
      {/* BACKGROUND DECORATION */}

      <div className="products-hero-orb orb-left" aria-hidden="true" />

      <div className="products-hero-orb orb-right" aria-hidden="true" />

      {/* ================================================
          HERO CONTENT
      ================================================= */}

      <div className="products-hero-copy" data-animate="fade-left">
        {/* EYEBROW */}

        <div className="products-eyebrow-pill">
          <span className="products-eyebrow-text">
            IoT · Robotics · Embedded Systems
          </span>
        </div>

        {/* MAIN HEADING */}

        <h1 id="products-hero-title">
          Turn Your Ideas Into <span>Real-World Technology</span>
        </h1>

        {/* DESCRIPTION */}

        <p>
          Explore hands-on IoT kits and build-ready tools for{" "}
          <strong>
            school students, college innovators, and aspiring engineers.
          </strong>
        </p>

        {/* CTA BUTTONS */}

        <div className="products-hero-actions">
          <a
            className="products-btn products-btn-primary"
            href="#product-catalog"
          >
            <Box size={22} aria-hidden="true" />

            <span>Explore Our Kits</span>

            <ArrowRight size={21} aria-hidden="true" />
          </a>

          <a
            className="products-btn products-btn-outline"
            href="#project-showcase"
          >
            <span className="play-mark" aria-hidden="true">
              ▶
            </span>

            <span>See What You Can Build</span>
          </a>
        </div>

        {/* TARGET AUDIENCE */}

        <div
          className="products-audience-row"
          aria-label="Who our kits are for"
        >
          {audience.map((item, index) => (
            <AudienceCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>

      {/* ================================================
          HERO VISUAL
      ================================================= */}

      <div className="products-hero-visual" data-animate="zoom">
        <div className="hero-visual-halo" aria-hidden="true" />

        {/* FLOATING TAGS */}

        <div className="hero-floating-tag tag-iot">
          <Wifi size={25} aria-hidden="true" />

          <span>IoT Projects</span>
        </div>

        <div className="hero-floating-tag tag-robot">
          <Wrench size={24} aria-hidden="true" />

          <span>Robotics</span>
        </div>

        <div className="hero-floating-tag tag-embedded">
          <Cpu size={25} aria-hidden="true" />

          <span>
            Embedded
            <br />
            Systems
          </span>
        </div>

        {/* HERO IMAGE */}

        <HeroImage />

        {/* DECORATIVE ICON */}

        <span className="hero-doodle-plane" aria-hidden="true">
          <Send size={38} />
        </span>
      </div>

      {/* ================================================
          LEARNING HIGHLIGHTS
      ================================================= */}

      <div className="products-hero-metrics-wrap" data-animate="fade-up">
        <div
          className="products-hero-metrics"
          aria-label="ProJenius learning highlights"
        >
          {highlights.map((item, index) => (
            <HighlightCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

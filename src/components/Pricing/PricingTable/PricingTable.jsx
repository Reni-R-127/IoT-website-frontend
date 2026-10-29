import { useEffect, useRef, useState } from "react";
import {
  GraduationCap,
  Rocket,
  ChartNoAxesCombined,
  Check,
  MessageCircle,
  ArrowRight,
  Crown,
} from "lucide-react";

import pricingBoy from "../../../assets/Pricing/PricingTable/pricing-table-1.png";
import pricingRobot from "../../../assets/Pricing/PricingTable/pricing-table-2.png";

import "./PricingTable.css";
import { usePublicContent } from "../../../hooks/usePublicContent.js";
import { openTrackedWhatsApp } from "../../../utils/whatsapp.js";

const WHATSAPP_NUMBER = "918925450473";

const planIcons = [GraduationCap, Rocket, ChartNoAxesCombined];
const themes = ["starter", "explorer", "innovator"];

export default function PricingTable() {
  const { items: pricingItems, loading, error } = usePublicContent("pricing");
  const plans = pricingItems.slice(0, 3).map((item, index) => ({ ...item, subtitle: item.subtitle || item.category || "Learning plan", features: Array.isArray(item.features) ? item.features : [], popular: index === 1, icon: planIcons[index] || GraduationCap, theme: themes[index] || "starter" }));
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
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
      { threshold: 0.08 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleEnroll = (plan) => {
    openTrackedWhatsApp({
      number: WHATSAPP_NUMBER,
      source: "Pricing table",
      item: plan.name,
      message: `Hello TechSprout Kids! I am interested in the ${plan.name} plan (${plan.price}, ${plan.duration}). Please share more details.`,
    });
  };

  return (
    <section
      ref={sectionRef}
      className={`pricing-table ${
        visible ? "pricing-table-visible" : ""
      }`}
      aria-labelledby="pricing-table-title"
    >
      <div
        className="pricing-table-decoration pricing-decoration-left"
        aria-hidden="true"
      />
      <div
        className="pricing-table-decoration pricing-decoration-right"
        aria-hidden="true"
      />
      <div
        className="pricing-table-decoration pricing-decoration-bottom"
        aria-hidden="true"
      />

      <div className="pricing-table-container">
        <header className="pricing-table-heading">
          <div className="pricing-table-eyebrow">
            <span className="pricing-table-eyebrow-line" aria-hidden="true" />
            CHOOSE A PLAN
            <span className="pricing-table-eyebrow-line" aria-hidden="true" />
          </div>

          <h2 id="pricing-table-title">
            Start small or <strong>go deeper</strong>
          </h2>

          <p>
            Every plan is designed around practical learning and project work.
          </p>
        </header>

        <div className="pricing-table-layout">
          {/* Boy illustration */}
          <div className="pricing-table-art pricing-art-left">
            <img
              src={pricingBoy}
              alt="Child learning technology on a laptop"
              loading="lazy"
            />
          </div>

          {/* Pricing cards */}
          <div className="pricing-table-grid">
            {loading ? <p>Loading pricing plans…</p> : error ? <p>Pricing is temporarily unavailable.</p> : plans.length === 0 ? <p>Pricing plans will be announced soon.</p> : plans.map((plan, index) => {
              const Icon = plan.icon;

              return (
                <article
                  key={plan.name}
                  className={`pricing-plan pricing-plan-${plan.theme}`}
                  style={{ "--plan-delay": `${index * 120}ms` }}
                >
                  {plan.popular && (
                    <div className="pricing-popular-label">
                      <Crown size={15} />
                      <span>Most Popular</span>
                    </div>
                  )}

                  <div className="pricing-plan-header">
                    <div className="pricing-plan-icon">
                      <Icon size={29} strokeWidth={2} />
                    </div>

                    <div className="pricing-plan-title">
                      <span className="pricing-plan-subtitle">
                        {plan.subtitle}
                      </span>

                      <h3>{plan.name}</h3>

                      <strong className="pricing-plan-price">
                        {plan.price}
                      </strong>

                      <span className="pricing-plan-duration">
                        {plan.duration}
                      </span>
                    </div>
                  </div>

                  <div className="pricing-plan-divider" />

                  <ul className="pricing-plan-features">
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <Check
                          size={18}
                          strokeWidth={3}
                          aria-hidden="true"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className="pricing-enroll-button"
                    type="button"
                    onClick={() => handleEnroll(plan)}
                    aria-label={`Enquire about the ${plan.name} plan`}
                  >
                    <MessageCircle size={18} />
                    <span>Enroll Now</span>
                    <ArrowRight size={19} />
                  </button>
                </article>
              );
            })}
          </div>

          {/* Robot illustration */}
          <div className="pricing-table-art pricing-art-right">
            <img
              src={pricingRobot}
              alt="Friendly robot with technology learning materials"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

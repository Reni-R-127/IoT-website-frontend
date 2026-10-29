import { ArrowRight, MessageCircle, Phone, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import "./FAQContact.css";

export default function FAQContact({
  phoneNumber = "",
  contactPath = "/contact",
}) {
  const formattedPhone = phoneNumber.replace(/[^\d+]/g, "");

  return (
    <section className="faq-contact-section" id="faq-contact">
      <div className="faq-contact-decoration faq-contact-decoration-left" />
      <div className="faq-contact-decoration faq-contact-decoration-right" />

      <div className="faq-contact-container">
        <div className="faq-contact-content">
          <div className="faq-contact-badge">
            <Sparkles size={16} aria-hidden="true" />
            <span>WE'RE HERE TO HELP</span>
          </div>

          <h2>
            Do you have more <span>questions?</span>
          </h2>

          <p className="faq-contact-description">
            Still looking for answers? Our team is happy to help you choose the
            right learning program for your child.
          </p>

          <div className="faq-contact-actions">
            <Link
              to={contactPath}
              className="faq-contact-button faq-contact-primary"
            >
              <MessageCircle size={19} aria-hidden="true" />
              <span>Contact Us</span>
              <ArrowRight
                size={18}
                className="faq-contact-button-arrow"
                aria-hidden="true"
              />
            </Link>

            <a
              href="tel:+918925450473"
              className="faq-contact-button faq-contact-secondary"
              aria-label="Call 89254 50473"
            >
              <Phone size={19} aria-hidden="true" />
              <span>Call Us</span>
            </a>
          </div>

          <div className="faq-contact-note">
            <span className="faq-contact-status-dot" />
            <span>
              Let&apos;s find the right learning journey for your child.
            </span>
          </div>
        </div>

        <div className="faq-contact-visual" aria-hidden="true">
          <div className="faq-contact-orbit faq-contact-orbit-one" />
          <div className="faq-contact-orbit faq-contact-orbit-two" />

          <div className="faq-contact-icon-card faq-contact-icon-card-top">
            <MessageCircle size={27} />
          </div>

          <div className="faq-contact-main-icon">
            <Phone size={43} strokeWidth={1.8} />
            <span className="faq-contact-icon-sparkle">
              <Sparkles size={19} />
            </span>
          </div>

          <div className="faq-contact-icon-card faq-contact-icon-card-bottom">
            <Sparkles size={24} />
          </div>

          <div className="faq-contact-floating-dot faq-contact-dot-one" />
          <div className="faq-contact-floating-dot faq-contact-dot-two" />
          <div className="faq-contact-floating-dot faq-contact-dot-three" />
        </div>
      </div>
    </section>
  );
}

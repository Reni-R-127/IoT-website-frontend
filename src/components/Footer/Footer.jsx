import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";

import { siteConfig } from "../../config/site.js";
import { trackedWhatsAppUrl, trackWhatsAppClick } from "../../utils/whatsapp.js";
import logo from "../../assets/logo.png";

import "./Footer.css";

const socialLinks = {
  instagram: "https://www.instagram.com/projenius_?stkn=OXEwaXF4Z3g4d3Zw",
  facebook: "https://www.facebook.com/share/1DMJDDqupb/",
  youtube: "https://youtube.com/@projenius-8?si=CXkflyhkB26A7jmT",
  linkedin: "https://www.linkedin.com/company/projenius/",
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">

        {/* LEFT - BRAND */}
        <div className="footer-about">

          <Link to="/" className="footer-brand">
            <img
              src={logo}
              alt={`${siteConfig.companyName} Logo`}
              className="footer-logo"
            />

            <div className="footer-brand-content">
              <span>{siteConfig.companyName}</span>
              <small>Learn · Build · Create</small>
            </div>
          </Link>

          <p>
            Hands-on technology learning for kids through IoT, electronics,
            coding, robotics and AI.
          </p>

          <a
            className="footer-whatsapp"
            href={trackedWhatsAppUrl({ source: "Website footer", message: "Hello TechSprout Kids! I would like to know more." })}
            onClick={() => trackWhatsAppClick({ source: "Website footer" })}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} />
            <span>Chat on WhatsApp</span>
            <ArrowRight size={18} />
          </a>

          <h4 className="social-title">Follow Us</h4>

          <div className="socials">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={19} />
            </a>

            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={19} />
            </a>

            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <Youtube size={19} />
            </a>

            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={19} />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-column">
          <h4>Quick Links</h4>

          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/faqs">FAQs</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        {/* COURSES */}
        <div className="footer-column">
          <h4>Courses</h4>

          <div className="footer-links">
            <Link to="/courses">IoT</Link>
            <Link to="/courses">Arduino</Link>
            <Link to="/courses">Robotics</Link>
            <Link to="/courses">Electronics</Link>
            <Link to="/courses">Coding</Link>
            <Link to="/courses">AI</Link>
          </div>
        </div>

        {/* CONTACT */}
        <div className="footer-column footer-contact">
          <h4>Contact</h4>

          <div className="footer-links-contact">

            <a
              href={`tel:${siteConfig.phone}`}
              aria-label={`Call ${siteConfig.phone}`}
            >
              <Phone size={17} />
              <span>{siteConfig.phone}</span>
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              aria-label={`Email ${siteConfig.email}`}
            >
              <Mail size={17} />
              <span>{siteConfig.email}</span>
            </a>

            <a
              href={siteConfig.locationUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open location in Google Maps"
              className="footer-location"
            >
              <MapPin size={17} />
              <span>{siteConfig.location}</span>
            </a>

            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.2279330775555!2d78.08984892445203!3d9.914965290186133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00cf7452485a8b%3A0x63e13154ff8741dd!2sVelmurugan%20Nagar%2C%20Namachivaya%20Nagar%2C%20Madakkulam%2C%20Madurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1791291106605!5m2!1sen!2sin"
                title="ProJenius Location"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">

        <span>
          © 2026 {siteConfig.companyName}. All Rights Reserved.
        </span>

        <span className="footer-policy">
          <Link to="/privacy">Privacy Policy</Link>

          <b>|</b>

          <Link to="/terms">Terms &amp; Conditions</Link>
        </span>

      </div>
    </footer>
  );
}
import {
  ArrowRight,
  Boxes,
  Building2,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  MessageCircle,
  Settings,
  Users,
} from "lucide-react";

import { wphone } from "../../../config/site.js";
import bulkImage from "../../../assets/Products/bulk-kits.webp";

import "./BulkOrders.css";

const benefits = [
  {
    icon: Boxes,
    title: "Bulk Kit Orders",
    text: "Special pricing for schools, colleges and training centres with customised kit options.",
    tone: "blue",
  },
  {
    icon: GraduationCap,
    title: "On-site Workshops",
    text: "Hands-on training sessions conducted at your campus by our expert team.",
    tone: "green",
  },
  {
    icon: Settings,
    title: "Customised Solutions",
    text: "Kits and training tailored to your curriculum, projects and specific requirements.",
    tone: "purple",
  },
  {
    icon: Users,
    title: "Faculty Support",
    text: "Training and learning resources for faculty members to continue hands-on learning.",
    tone: "orange",
  },
];

const wa = (text) =>
  `https://wa.me/${wphone}?text=${encodeURIComponent(text)}`;

export default function BulkOrders() {
  return (
    <section
      className="bulk-orders products-shell"
      aria-labelledby="bulk-title"
    >
      <div className="bulk-top">
        <div className="bulk-copy" data-animate="fade-left">
          <span className="section-kicker">
            <i aria-hidden="true" />
            <span>For Institutions</span>
            <i aria-hidden="true" />
          </span>

          <h2 id="bulk-title">
            Bulk Orders &amp; <em>Institutional Training</em>
          </h2>

          <p>
            Empowering schools, colleges and institutions with hands-on IoT,
            Robotics and Innovation learning through our kits and expert-led
            training programs.
          </p>

          <div className="bulk-actions">
            <a
              className="products-btn products-btn-primary"
              href={wa(
                "Hello ProJenius, I want to discuss bulk IoT kit orders and institutional training."
              )}
              target="_blank"
              rel="noreferrer"
            >
              <Building2 size={20} />
              Discuss Your Requirements
              <ArrowRight size={18} />
            </a>

            <a
              className="products-btn products-btn-outline"
              href={wa(
                "Hello ProJenius, please share your institutional training and IoT kit brochure."
              )}
              target="_blank"
              rel="noreferrer"
            >
              <CheckCircle2 size={19} />
              Request Brochure
            </a>
          </div>
        </div>

        <div className="bulk-visual" data-animate="zoom">
          <img
            src={bulkImage}
            alt="ProJenius IoT and robotics kits for institutional bulk orders"
            loading="lazy"
          />
          <div className="bulk-note">
            <span>✦</span>
            <strong>
              Customised Kits
              <br />
              for Your Needs!
            </strong>
          </div>
        </div>
      </div>

      <div className="bulk-benefits">
        {benefits.map(({ icon: Icon, title, text, tone }, index) => (
          <article
            className={`bulk-benefit benefit-${tone}`}
            key={title}
            data-animate="fade-up"
            data-delay={Math.min(index + 1, 5)}
          >
            <span className="bulk-benefit-icon">
              <Icon size={27} aria-hidden="true" />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
            <span className="bulk-benefit-arrow">
              <ArrowRight size={19} aria-hidden="true" />
            </span>
          </article>
        ))}
      </div>

      <div className="bulk-bottom-cta" data-animate="fade-up">
        <div className="bulk-collage">
          <img
            src={bulkImage}
            alt="IoT kits ready for workshops"
            loading="lazy"
          />
          <span className="collage-sticker">
            Build
            <br />
            Together
          </span>
        </div>

        <div className="bulk-bottom-copy">
          <span className="bulk-bottom-kicker">
            Bring Innovation to Your Campus
          </span>
          <h3>
            Let’s Build the Next Generation of <em>Innovators Together</em>
          </h3>
          <p>
            Partner with ProJenius for IoT kits, hands-on workshops, project
            training and customised solutions for your institution.
          </p>

          <div className="bulk-actions">
            <a
              className="products-btn products-btn-primary"
              href={wa(
                "Hello ProJenius, I would like to enquire about bulk orders."
              )}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} />
              Enquire for Bulk Orders
              <ArrowRight size={18} />
            </a>

            <a
              className="products-btn products-btn-outline"
              href={wa(
                "Hello ProJenius, I would like to request a workshop for our institution."
              )}
              target="_blank"
              rel="noreferrer"
            >
              <CalendarDays size={18} />
              Request a Workshop
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

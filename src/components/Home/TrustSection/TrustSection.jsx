import { ShieldCheck } from "lucide-react";

import "./TrustSection.css";

const trustItems = [
  "Safe Learning Environment",
  "Practical Education",
  "Age-appropriate Learning",
  "Project-based Learning",
];

export default function TrustSection() {
  return (
    <section className="home-section trust-section">

      <div
        className="trust-copy"
        data-animate="fade-left"
      >

        <span className="eyebrow">
          For parents
        </span>

        <h2>
          Fun for kids. Meaningful for parents.
        </h2>

        <p>
          Our learning experience is designed to be playful
          without becoming childish, and practical without
          becoming overwhelming.
        </p>

      </div>


      <div className="trust-grid">

        {trustItems.map((item, index) => (

          <div
            key={item}
            data-animate="pop"
            data-delay={index + 1}
          >

            <span>
              0{index + 1}
            </span>

            <ShieldCheck size={20} />

            <b>
              {item}
            </b>

          </div>

        ))}

      </div>

    </section>
  );
}
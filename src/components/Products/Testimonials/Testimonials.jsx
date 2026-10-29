import { useState } from "react";
import { ArrowLeft, ArrowRight, Play, Quote, Star } from "lucide-react";

import karthik from "../../../assets/Products/student-karthik.webp";
import harini from "../../../assets/Products/student-harini.webp";
import vignesh from "../../../assets/Products/student-vignesh.webp";
import divya from "../../../assets/Products/student-divya.webp";

import "./Testimonials.css";

const stories = [
  {
    name: "Karthik S",
    role: "II Year ECE Student",
    kit: "IoT Kit",
    image: karthik,
    quote:
      "The IoT kit helped me understand sensors and real-time data in a very practical way. The support was amazing!",
    duration: "02:18",
  },
  {
    name: "Harini P",
    role: "III Year ECE Student",
    kit: "Arduino Kit",
    image: harini,
    quote:
      "I built a Smart Irrigation System using the kit. The hands-on experience really boosted my confidence.",
    duration: "01:45",
  },
  {
    name: "Vignesh R",
    role: "Engineering Student",
    kit: "Robotics Kit",
    image: vignesh,
    quote:
      "The robotics kit was super easy to use and well-structured. I could build multiple projects and even customize it.",
    duration: "02:03",
  },
  {
    name: "Divya M",
    role: "Final Year Student",
    kit: "Advanced IoT Kit",
    image: divya,
    quote:
      "I loved how the kit made real-world projects simple. It is useful for both beginners and advanced learners!",
    duration: "01:52",
  },
];

export default function Testimonials() {
  const [offset, setOffset] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);

  const ordered = stories.map(
    (_, i) => stories[(i + offset + stories.length) % stories.length]
  );

  return (
    <section
      className="product-testimonials products-shell"
      aria-labelledby="testimonials-title"
    >
      <div className="products-section-heading" data-animate="fade-up">
        <span className="section-kicker">
          <i aria-hidden="true" />
          <span>Student Testimonials</span>
          <i aria-hidden="true" />
        </span>

        <h2 id="testimonials-title">
          Hear From Our <em>Students</em>
        </h2>

        <p>
          Real experiences from school students, college innovators, and
          aspiring engineers
          <br className="desktop-break" /> who built amazing projects with our
          learning kits.
        </p>
      </div>

      <div className="testimonial-controls">
        <button
          type="button"
          aria-label="Previous testimonials"
          onClick={() =>
            setOffset((value) => (value - 1 + stories.length) % stories.length)
          }
        >
          <ArrowLeft size={20} />
        </button>
        <button
          type="button"
          aria-label="Next testimonials"
          onClick={() => setOffset((value) => (value + 1) % stories.length)}
        >
          <ArrowRight size={20} />
        </button>
      </div>

      <div className="testimonial-grid">
        {ordered.map((story, index) => (
          <article
            className="testimonial-card"
            key={story.name}
            data-animate="fade-up"
            data-delay={Math.min(index + 1, 5)}
          >
            <div className="testimonial-media">
              <img
                src={story.image}
                alt={`${story.name} sharing a learning experience`}
                loading="lazy"
              />
              <span className="testimonial-duration">{story.duration}</span>
              <button
                type="button"
                className="testimonial-play"
                aria-label={`Show video status for ${story.name}`}
                onClick={() =>
                  setActiveVideo(
                    activeVideo === story.name ? null : story.name
                  )
                }
              >
                <Play size={22} fill="currentColor" />
              </button>
              {activeVideo === story.name && (
                <span className="testimonial-video-note">
                  Video link not added yet
                </span>
              )}
            </div>

            <div className="testimonial-body">
              <Quote className="testimonial-quote-icon" size={22} />
              <p>{story.quote}</p>

              <div className="testimonial-person">
                <img src={story.image} alt="" loading="lazy" />
                <div>
                  <strong>{story.name}</strong>
                  <small>{story.role}</small>
                </div>
                <span className="testimonial-kit">{story.kit}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="testimonial-summary" data-animate="fade-up">
        <div>
          <span className="summary-icon teal">
            <Star size={23} />
          </span>
          <strong>1000+</strong>
          <small>Happy Learners</small>
        </div>
        <div>
          <span className="summary-icon purple">
            <Quote size={23} />
          </span>
          <strong>50+</strong>
          <small>College Workshops</small>
        </div>
        <div>
          <span className="summary-icon green">
            <Play size={23} />
          </span>
          <strong>100+</strong>
          <small>Projects Built</small>
        </div>
        <div>
          <span className="summary-icon gold">
            <Star size={23} />
          </span>
          <strong>4.8/5</strong>
          <small>Student Satisfaction</small>
        </div>
      </div>
    </section>
  );
}

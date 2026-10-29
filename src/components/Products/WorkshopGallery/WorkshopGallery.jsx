import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, Camera, Images } from "lucide-react";

import "./WorkshopGallery.css";

import workshopImg from "../../../assets/Products/gallery-workshop.webp";
import mentorImg from "../../../assets/Products/gallery-mentor.webp";
import collegeImg from "../../../assets/Products/gallery-college.webp";
import roboticsImg from "../../../assets/Products/gallery-robotics.webp";
import teamImg from "../../../assets/Products/gallery-team.webp";
import trainingImg from "../../../assets/Products/gallery-training.webp";
import projectsImg from "../../../assets/Products/gallery-projects.webp";
import buildingImg from "../../../assets/Products/gallery-building.webp";

const photos = [
  {
    image: workshopImg,
    category: "Workshops",
    alt: "Trainer introducing IoT concepts to students",
  },
  {
    image: mentorImg,
    category: "Training Sessions",
    alt: "Students learning electronics with a mentor",
  },
  {
    image: collegeImg,
    category: "Training Sessions",
    alt: "College students collaborating on a project",
  },
  {
    image: roboticsImg,
    category: "Project Demonstrations",
    alt: "Students testing a robotics project",
  },
  {
    image: teamImg,
    category: "Events",
    alt: "Students working together during a workshop",
  },
  {
    image: trainingImg,
    category: "Workshops",
    alt: "Instructor explaining an electronics project",
  },
  {
    image: projectsImg,
    category: "Events",
    alt: "Students presenting completed project prototypes",
  },
  {
    image: buildingImg,
    category: "Project Demonstrations",
    alt: "Students assembling a robot kit",
  },
];

const categories = [
  "All",
  "Workshops",
  "Training Sessions",
  "Project Demonstrations",
  "Events",
];

export default function WorkshopGallery() {
  const [active, setActive] = useState("All");
  const [page, setPage] = useState(0);

  const shown = useMemo(
    () =>
      active === "All" ? photos : photos.filter((photo) => photo.category === active),
    [active]
  );

  const displayed = shown.length
    ? shown.map((_, index) => shown[(index + page * 2) % shown.length])
    : [];

  return (
    <section
      className="workshop-gallery products-shell"
      aria-labelledby="gallery-title"
    >
      <div className="products-section-heading" data-animate="fade-up">
        <span className="section-kicker">
          <i aria-hidden="true" />
          <span>Gallery</span>
          <i aria-hidden="true" />
        </span>

        <h2 id="gallery-title">
          Our Workshop <em>Gallery</em>
        </h2>

        <p>
          Hands-on learning. Real experiences. From schools to colleges —
          <br className="desktop-break" /> we bring innovation to life through
          workshops and training sessions.
        </p>
      </div>

      <div
        className="gallery-filter-row"
        role="group"
        aria-label="Filter gallery photos"
      >
        {categories.map((cat, index) => (
          <button
            key={cat}
            type="button"
            className={`gallery-filter ${active === cat ? "active" : ""}`}
            onClick={() => {
              setActive(cat);
              setPage(0);
            }}
            aria-pressed={active === cat}
          >
            {index === 0 ? (
              <Images size={18} aria-hidden="true" />
            ) : index === 1 ? (
              <CalendarDays size={18} aria-hidden="true" />
            ) : index === 2 ? (
              <Camera size={18} aria-hidden="true" />
            ) : index === 3 ? (
              <Images size={18} aria-hidden="true" />
            ) : (
              <CalendarDays size={18} aria-hidden="true" />
            )}
            {cat}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {displayed.map((photo, index) => (
          <figure
            className="gallery-photo"
            key={photo.image}
            data-animate="zoom"
            data-delay={Math.min(index + 1, 5)}
          >
            <img src={photo.image} alt={photo.alt} loading="lazy" />
            <span className="gallery-photo-overlay">
              <Camera size={20} aria-hidden="true" />
            </span>
          </figure>
        ))}
      </div>

      <div className="gallery-bottom">
        <div className="gallery-dots" aria-label="Gallery page">
          <button
            type="button"
            className={page === 0 ? "active" : ""}
            aria-label="Gallery page one"
            onClick={() => setPage(0)}
          />
          <button
            type="button"
            className={page === 1 ? "active" : ""}
            aria-label="Gallery page two"
            onClick={() => setPage(1)}
          />
          <button
            type="button"
            className={page === 2 ? "active" : ""}
            aria-label="Gallery page three"
            onClick={() => setPage(2)}
          />
        </div>

        <a
          className="products-btn products-btn-outline"
          href="https://www.instagram.com/projenius_?stkn=OXEwaXF4Z3g4d3Zw"
          target="_blank"
          rel="noreferrer"
        >
          <Images size={19} aria-hidden="true" />
          View More Photos
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

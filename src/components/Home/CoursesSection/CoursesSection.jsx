import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { usePublicContent } from "../../../hooks/usePublicContent.js";

import CourseCard from "../../CourseCard/CourseCard.jsx";
import SectionTitle from "../../SectionTitle/SectionTitle.jsx";

import "./CoursesSection.css";

export default function CoursesSection() {
  return (
    <section className="home-section courses-section soft-bg">

      <SectionTitle
        eyebrow="Popular learning"
        title="Courses built around making"
        text="Choose a starting point based on age, interest and experience."
      />

      <div className="course-grid">

        {loading ? <p>Loading courses…</p> : courses
          .slice(0, 6)
          .map((course, index) => (

            <CourseCard
              key={course.id}
              course={{...course, id: course.slug || course._id, name: course.title, age: course.ageRange, price: course.price || "Contact us"}}
              index={index}
            />

          ))}
        {!loading && courses.length === 0 && <p className="course-empty-state">New courses will be announced soon. Contact us to discuss learning options.</p>}

      </div>

      <div className="center-link">

        <Link to="/courses">
          View all courses
          <ArrowRight size={16} />
        </Link>

      </div>

    </section>
  );
}
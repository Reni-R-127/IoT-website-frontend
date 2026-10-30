import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { usePublicContent } from "../../../hooks/usePublicContent.js";
import CourseCard from "../../CourseCard/CourseCard.jsx";
import SectionTitle from "../../SectionTitle/SectionTitle.jsx";

import "./CoursesSection.css";

export default function CoursesSection() {
  const result = usePublicContent("courses");

  const loading = result?.loading ?? false;

  const courses = Array.isArray(result?.courses)
    ? result.courses
    : Array.isArray(result?.data)
      ? result.data
      : Array.isArray(result)
        ? result
        : [];

  return (
    <section className="home-section courses-section soft-bg">
      <div className="courses-section-inner">
        <SectionTitle
          eyebrow="LEARN • CREATE • INNOVATE"
          title="Explore Our Popular Courses"
          text="Choose a course that matches your interests and build practical skills through hands-on learning."
        />

        {/* Course Cards */}
        <div className="course-grid">
          {loading ? (
            <div className="course-section-message">
              <span className="course-loader" />
              <p>Loading courses...</p>
            </div>
          ) : courses.length > 0 ? (
            courses.slice(0, 6).map((course, index) => (
              <CourseCard
                key={course._id || course.id || course.slug || index}
                course={{
                  ...course,
                  id: course.slug || course._id || course.id,
                  title: course.title || course.name,
                  name: course.title || course.name,
                  ageRange: course.ageRange || course.age,
                  age: course.ageRange || course.age,
                  price: course.price ?? course.fee ?? "Contact us",
                }}
                index={index}
              />
            ))
          ) : (
            <div className="course-section-message">
              <h3>Courses Coming Soon</h3>
              <p>
                New courses will be announced soon. Contact ProJenius
                to explore upcoming learning opportunities.
              </p>
            </div>
          )}
        </div>

        {/* View All Courses */}
        {!loading && courses.length > 0 && (
          <div className="courses-view-all">
            <Link to="/courses">
              <span>Explore All Courses</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
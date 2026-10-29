
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Lightbulb,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { usePublicContent } from "../../hooks/usePublicContent.js";
import { openTrackedWhatsApp } from "../../utils/whatsapp.js";

import CTASection from "../../components/CTASection/CTASection.jsx";
import CourseHero from "../../components/Courses/CourseHero/CourseHero.jsx";
import WhyLearn from "../../components/Courses/WhyLearn/WhyLearn.jsx";
import PopularLearning from "../../components/Home/PopularLearning/PopularLearning.jsx";

import courseArduino from "../../assets/course-arduino.png";
import courseIot from "../../assets/course-iot.png";
import courseRobotics from "../../assets/course-robotics.png";
import courseElectronics from "../../assets/course-electronics.png";
import courseCoding from "../../assets/course-coding.png";
import courseSmartHome from "../../assets/course-smart-home.png";
import courseAI from "../../assets/course-ai.png";

import "./Courses.css";
//import "./CourseDetails.css";

const courseImages = {
  iot: courseIot,
  arduino: courseArduino,
  robotics: courseRobotics,
  electronics: courseElectronics,
  coding: courseCoding,
  ai: courseAI,
  "iot-robotics": courseArduino,
  smarthome: courseSmartHome,
};

const courseIcons = {
  wifi: Sparkles,
  cpu: Lightbulb,
  bot: Rocket,
  zap: Sparkles,
  code: GraduationCap,
  brain: Lightbulb,
  settings: ShieldCheck,
};

const learningPoints = [
  {
    icon: Lightbulb,
    title: "Understand the concepts",
    text: "Learn the basic ideas behind the technology through simple explanations and demonstrations.",
  },
  {
    icon: Rocket,
    title: "Build practical projects",
    text: "Apply what you learn by creating models, experimenting, and solving practical challenges.",
  },
  {
    icon: ShieldCheck,
    title: "Develop problem-solving skills",
    text: "Test ideas, identify mistakes, and improve your project step by step.",
  },
];

const curriculum = [
  {
    number: "01",
    title: "Discover",
    description:
      "Explore the technology, understand where it is used, and learn the basic concepts.",
  },
  {
    number: "02",
    title: "Learn by doing",
    description:
      "Work with relevant tools, components, or software through guided activities.",
  },
  {
    number: "03",
    title: "Build a project",
    description:
      "Use your new skills to develop a practical project with step-by-step guidance.",
  },
  {
    number: "04",
    title: "Test and improve",
    description:
      "Check how your project works, fix issues, and explain what you have created.",
  },
];

export function Courses() {
  return (
    <>
      <CourseHero />
      <WhyLearn />
      <PopularLearning />
      <CTASection />
    </>
  );
}

export function CourseDetails() {
  const { courseId } = useParams();
  const { items: apiCourses, loading } = usePublicContent("courses");
  const courses = apiCourses.map((item) => ({
    ...item,
    id: item.slug || item._id,
    name: item.title,
    age: item.ageRange || "Ask us",
    icon: "wifi",
    price: item.price || "Contact us",
  }));
  const course = courses.find((item) => item.id === courseId);
  if (loading) return <main className="course-detail-not-found"><h1>Loading course…</h1></main>;

  if (!course) {
    return (
      <main className="course-detail-not-found">
        <div className="course-not-found-icon">
          <GraduationCap size={38} />
        </div>
        <span>COURSE NOT FOUND</span>
        <h1>Let's find the right learning path.</h1>
        <p>
          This course may have moved or the link may be incorrect.
          Explore our available courses to find another option.
        </p>
        <Link to="/courses" className="course-not-found-link">
          <ArrowLeft size={18} />
          Explore All Courses
        </Link>
      </main>
    );
  }

  const image = course.image || courseImages[course.id] || courseArduino;
  const Icon = courseIcons[course.icon] || GraduationCap;

  const enrollmentUrl = "#course-enquiry";

  return (
    <main className="course-detail-page">
      {/* Breadcrumb */}
      {/* <div className="course-detail-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/courses">Courses</Link>
        <span>/</span>
        <span className="course-breadcrumb-current">{course.name}</span>
      </div> */}

      {/* Hero */}
      <section className="course-detail-hero">
        <div className="course-detail-hero-glow" aria-hidden="true" />

        <div className="course-detail-hero-inner">
          <div className="course-detail-hero-copy">
            <span className="course-detail-eyebrow">
              <Sparkles size={16} />
              LEARN · BUILD · CREATE
            </span>

            <span className="course-detail-level">
              {course.level || "Practical Learning"}
            </span>

            <h1>
              Explore.
              <br />
              Experiment.
              <br />
              <strong>{course.name}.</strong>
            </h1>

            <p className="course-detail-description">
              {course.description}
            </p>

            <div className="course-detail-hero-actions">
              <button
                type="button"
                onClick={() => openTrackedWhatsApp({ source: "Course detail page", item: course.name, message: `Hi TechSprout Kids! I would like to know more about the ${course.name} course.` })}
                className="course-detail-primary"
              >
                <MessageCircle size={19} />
                Enquire & Enroll
                <ArrowRight size={18} />
              </button>

              <a href="#course-curriculum" className="course-detail-secondary">
                Explore Curriculum
                <ArrowRight size={17} />
              </a>
            </div>

            <div className="course-detail-trust">
              <span>
                <CheckCircle2 size={16} />
                Hands-on activities
              </span>
              <span>
                <CheckCircle2 size={16} />
                Guided projects
              </span>
            </div>
          </div>

          <div className="course-detail-hero-art">
            {/* <div className="course-art-orbit course-art-orbit-one" /> */}
            {/* <div className="course-art-orbit course-art-orbit-two" /> */}

            <div className="course-art-label course-art-label-top">
              <span className="course-art-label-icon">
                <Icon size={20} />
              </span>
              <span>
                <strong>Learn by doing</strong>
                <small>Real-world concepts</small>
              </span>
            </div>

            <img
              src={image}
              alt={`${course.name} course`}
              className="course-detail-main-image"
            />

            <div className="course-art-label course-art-label-bottom">
              <Sparkles size={19} />
              <span>Ideas into projects</span>
            </div>
          </div>
        </div>
      </section>

      {/* Course information */}
      <section className="course-detail-info">
        <div className="course-detail-info-inner">
          <div className="course-info-item">
            <span className="course-info-icon">
              <Users size={21} />
            </span>
            <div>
              <small>Recommended age</small>
              <strong>{course.age || "Contact us"}</strong>
            </div>
          </div>

          <div className="course-info-item">
            <span className="course-info-icon">
              <Clock3 size={21} />
            </span>
            <div>
              <small>Course duration</small>
              <strong>{course.duration || "Contact us"}</strong>
            </div>
          </div>

          <div className="course-info-item">
            <span className="course-info-icon">
              <GraduationCap size={21} />
            </span>
            <div>
              <small>Learning approach</small>
              <strong>Practical learning</strong>
            </div>
          </div>

          <div className="course-info-item course-info-price">
            <span className="course-info-icon">
              <Sparkles size={21} />
            </span>
            <div>
              <small>Course fee</small>
              <strong>{course.price || "Contact us"}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="course-detail-section course-detail-overview">
        <div className="course-detail-section-heading">
          <span className="course-section-eyebrow">THE LEARNING EXPERIENCE</span>
          <h2>
            More than learning.
            <br />
            <strong>It's about creating.</strong>
          </h2>
          <p>
            Discover how technology works by exploring ideas, trying
            activities, and turning what you learn into something practical.
          </p>
        </div>

        <div className="course-learning-points">
          {learningPoints.map((point, index) => {
            const PointIcon = point.icon;

            return (
              <article className="course-learning-point" key={point.title}>
                <div className="course-learning-point-top">
                  <span className="course-learning-number">
                    0{index + 1}
                  </span>
                  <span className="course-learning-icon">
                    <PointIcon size={23} />
                  </span>
                </div>
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Curriculum */}
      <section
        className="course-detail-curriculum"
        id="course-curriculum"
      >
        <div className="course-curriculum-inner">
          <div className="course-curriculum-heading">
            <span className="course-section-eyebrow">YOUR LEARNING JOURNEY</span>
            <h2>
              From your first idea
              <br />
              to a <strong>working project.</strong>
            </h2>
            <p>
              A guided learning journey that helps learners understand,
              practise, build, and improve.
            </p>
          </div>

          <div className="course-curriculum-list">
            {curriculum.map((item) => (
              <article className="course-curriculum-item" key={item.number}>
                <span className="course-curriculum-number">
                  {item.number}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <CheckCircle2
                  className="course-curriculum-check"
                  size={22}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What learners gain */}
      <section className="course-detail-outcomes">
        <div className="course-outcomes-visual">
          <img src={image} alt={`${course.name} practical learning`} />
          <div className="course-outcomes-image-caption">
            <Lightbulb size={21} />
            <span>Think it. Build it. Improve it.</span>
          </div>
        </div>

        <div className="course-outcomes-copy">
          <span className="course-section-eyebrow">WHAT YOU WILL GAIN</span>
          <h2>
            Skills that grow
            <br />
            with <strong>every project.</strong>
          </h2>
          <p>
            This learning path encourages curiosity, creativity, and
            confidence through guided practical activities.
          </p>

          <ul>
            <li>
              <CheckCircle2 size={19} />
              Understand core concepts in a simple way
            </li>
            <li>
              <CheckCircle2 size={19} />
              Practise using relevant tools and technology
            </li>
            <li>
              <CheckCircle2 size={19} />
              Build and demonstrate a practical project
            </li>
            <li>
              <CheckCircle2 size={19} />
              Develop logical thinking and problem-solving skills
            </li>
          </ul>

          <a
            href={enrollmentUrl}
            target="_blank"
            rel="noreferrer"
            className="course-detail-primary course-outcomes-button"
          >
            <MessageCircle size={18} />
            Ask About This Course
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Final CTA */}
      <section className="course-detail-cta">
        <div className="course-detail-cta-decoration" aria-hidden="true" />
        <div className="course-detail-cta-copy">
          <span>YOUR NEXT STEP STARTS HERE</span>
          <h2>
            Ready to build something
            <br />
            <strong>amazing?</strong>
          </h2>
          <p>
            Contact our team to learn about the course, schedule,
            availability, and enrollment.
          </p>
        </div>

        <a
          href={enrollmentUrl}
          target="_blank"
          rel="noreferrer"
          className="course-detail-cta-button"
        >
          <MessageCircle size={20} />
          Enquire on WhatsApp
          <ArrowRight size={18} />
        </a>
      </section>

      <div className="course-detail-back">
        <Link to="/courses">
          <ArrowLeft size={17} />
          Browse all courses
        </Link>
      </div>
    </main>
  );
}

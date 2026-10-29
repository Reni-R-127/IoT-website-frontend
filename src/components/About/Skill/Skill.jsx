import {
  ArrowRight,
  Lightbulb,
  Palette,
  Wrench,
  Code2,
  Settings,
  FlaskConical,
  Rocket,
  Users,
} from "lucide-react";

import problemSolvingImage from "../../../assets/About/Skill/problem-solving.png";
import creativityImage from "../../../assets/About/Skill/creativity.png";
import handsOnBuildingImage from "../../../assets/About/Skill/hands-on-building.png";
import programmingSkillsImage from "../../../assets/About/Skill/programming-skills.png";
import automationRoboticsImage from "../../../assets/About/Skill/automation-robotics.png";
import experimentationImage from "../../../assets/About/Skill/experimentation.png";
import innovationMindsetImage from "../../../assets/About/Skill/innovation-mindset.png";
import teamworkCollaborationImage from "../../../assets/About/Skill/teamwork-collaboration.png";

import "./Skill.css";

const skills = [
  {
    title: "Problem Solving",
    description:
      "Identify problems, analyze challenges and find creative solutions.",
    image: problemSolvingImage,
    icon: Lightbulb,
    tone: "blue",
  },
  {
    title: "Creativity",
    description:
      "Turn your ideas into innovative designs and working prototypes.",
    image: creativityImage,
    icon: Palette,
    tone: "purple",
  },
  {
    title: "Hands-on Building",
    description:
      "Gain practical experience by working on real projects.",
    image: handsOnBuildingImage,
    icon: Wrench,
    tone: "yellow",
  },
  {
    title: "Programming Skills",
    description:
      "Learn to code and build real-world applications.",
    image: programmingSkillsImage,
    icon: Code2,
    tone: "violet",
  },
  {
    title: "Automation & Robotics",
    description:
      "Understand how robots work and create automated systems using real components.",
    image: automationRoboticsImage,
    icon: Settings,
    tone: "green",
  },
  {
    title: "Experimentation",
    description:
      "Try, test and learn through hands-on experiments and real-world scenarios.",
    image: experimentationImage,
    icon: FlaskConical,
    tone: "lavender",
  },
  {
    title: "Innovation Mindset",
    description:
      "Think differently, explore new possibilities and build solutions for a better tomorrow.",
    image: innovationMindsetImage,
    icon: Rocket,
    tone: "pink",
  },
  {
    title: "Teamwork & Collaboration",
    description:
      "Work together, share ideas and build amazing projects as a team.",
    image: teamworkCollaborationImage,
    icon: Users,
    tone: "cyan",
  },
];

export default function Skill() {
  return (
    <section className="skill-section" aria-labelledby="skill-title">
      <div
        className="skill-decoration skill-decoration-left"
        aria-hidden="true"
      />
      <div
        className="skill-decoration skill-decoration-right"
        aria-hidden="true"
      />
      <div className="skill-dots skill-dots-left" aria-hidden="true" />
      <div className="skill-dots skill-dots-right" aria-hidden="true" />

      <div className="skill-container">
        <header className="skill-heading">
          <div className="skill-eyebrow">
            <span className="skill-line" aria-hidden="true" />
            <span>SKILLS YOU'LL BUILD</span>
            <span className="skill-line" aria-hidden="true" />
          </div>

          <h2 id="skill-title">
            More than just learning,
            <br className="skill-desktop-break" />
            you'll build <strong>real skills for the future.</strong>
          </h2>

          <p>
            Develop practical skills that help you think, create, build and solve
            real-world problems.
          </p>
        </header>

        <div className="skill-grid">
          {skills.map((skill) => {
            const Icon = skill.icon;

            return (
              <article
                className={`skill-card skill-${skill.tone}`}
                key={skill.title}
              >
                <div className="skill-image-wrap">
                  <img
                    src={skill.image}
                    alt={`${skill.title} skill`}
                    className="skill-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="skill-content">
                  <div className="skill-badge" aria-hidden="true">
                    <Icon size={24} strokeWidth={2.3} />
                  </div>

                  <div className="skill-copy">
                    <h3>{skill.title}</h3>
                    <p>{skill.description}</p>
                  </div>

                  <span
                    className="skill-arrow"
                    aria-hidden="true"
                    title={skill.title}
                  >
                    <ArrowRight size={20} strokeWidth={2.5} />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

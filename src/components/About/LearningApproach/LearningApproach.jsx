import {
  ArrowRight,
  Lightbulb,
  Wrench,
  Settings,
  Rocket,
} from "lucide-react";

import learnImage from "../../../assets/About/LearningApproach/learn.png";
import exploreImage from "../../../assets/About/LearningApproach/explore.png";
import buildImage from "../../../assets/About/LearningApproach/build.png";
import createImage from "../../../assets/About/LearningApproach/create.png";

import "./LearningApproach.css";

const learningSteps = [
  {
    number: "01",
    title: "Learn",
    description: "Understand the core idea and the technology behind it.",
    image: learnImage,
    icon: Lightbulb,
    color: "blue",
  },
  {
    number: "02",
    title: "Explore",
    description: "Experiment with tools, components and different ideas.",
    image: exploreImage,
    icon: Wrench,
    color: "purple",
  },
  {
    number: "03",
    title: "Build",
    description: "Turn your idea into a working project.",
    image: buildImage,
    icon: Settings,
    color: "cyan",
  },
  {
    number: "04",
    title: "Create",
    description: "Improve, customise and make it your own.",
    image: createImage,
    icon: Rocket,
    color: "yellow",
  },
];

export default function LearningApproach() {
  return (
    <section className="learning-approach">
      {/* Background decoration */}
      <div className="learning-blob learning-blob-left" aria-hidden="true" />
      <div className="learning-blob learning-blob-right" aria-hidden="true" />

      <div className="learning-container">
        {/* Section heading */}
        <header className="learning-heading">
          <div className="learning-eyebrow">
            <span className="learning-line" aria-hidden="true" />
            <span>OUR LEARNING APPROACH</span>
            <span className="learning-line" aria-hidden="true" />
          </div>

          <h2>
            <span className="learn-word">Learn.</span>{" "}
            <span className="explore-word">Explore.</span>{" "}
            <span className="build-word">Build.</span>{" "}
            <span className="create-word">Create.</span>
          </h2>

          <p>
            A practical, project-based approach that takes you
            from ideas to real-world solutions.
          </p>
        </header>

        {/* Learning cards */}
        <div className="learning-steps">
          {learningSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div className="learning-step-wrapper" key={step.number}>
                <article className={`learning-card learning-${step.color}`}>
                  {/* Card top */}
                  <div className="learning-card-top">
                    <div className="learning-number">{step.number}</div>

                    <div className="learning-card-heading">
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>

                    <div className="learning-icon">
                      <Icon size={24} strokeWidth={2.3} />
                    </div>
                  </div>

                  {/* Card image */}
                  <div className="learning-image-wrapper">
                    <img
                      src={step.image}
                      alt={`${step.title} learning step`}
                      className="learning-image"
                    />
                  </div>
                </article>

                {/* Connector */}
                {index < learningSteps.length - 1 && (
                  <div
                    className={`learning-connector connector-${index + 1}`}
                    aria-hidden="true"
                  >
                    <ArrowRight size={32} strokeWidth={2.8} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

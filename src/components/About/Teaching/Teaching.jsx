import {
  ArrowRight,
  Cpu,
  Wifi,
  Bot,
  Code2,
  Brain,
  Settings,
  Radio,
} from "lucide-react";

import "./Teaching.css";

import iotImage from "../../../assets/About/Teaching/iot.png";
import electronicsImage from "../../../assets/About/Teaching/electronics.png";
import microcontrollersImage from "../../../assets/About/Teaching/microcontrollers.png";
import sensorsImage from "../../../assets/About/Teaching/sensors.png";
import actuatorsImage from "../../../assets/About/Teaching/actuators.png";
import roboticsImage from "../../../assets/About/Teaching/robotics.png";
import codingImage from "../../../assets/About/Teaching/coding.png";
import aiImage from "../../../assets/About/Teaching/artificial-intelligence.png";

const topics = [
  {
    title: "IoT",
    description:
      "Connect devices to the internet and build smart real-world solutions.",
    image: iotImage,
    icon: Wifi,
    className: "teaching-blue",
  },
  {
    title: "Electronics",
    description:
      "Learn the basics of circuits, components and prototyping.",
    image: electronicsImage,
    icon: Cpu,
    className: "teaching-purple",
  },
  {
    title: "Microcontrollers",
    description:
      "Program and control hardware using Arduino, ESP32 and more.",
    image: microcontrollersImage,
    icon: Code2,
    className: "teaching-cyan",
  },
  {
    title: "Sensors",
    description:
      "Measure and sense the world using a variety of sensors.",
    image: sensorsImage,
    icon: Radio,
    className: "teaching-yellow",
  },
  {
    title: "Actuators",
    description:
      "Control real-world actions using motors, servos, relays and more.",
    image: actuatorsImage,
    icon: Settings,
    className: "teaching-orange",
  },
  {
    title: "Robotics",
    description:
      "Design and build smart robots for real-world applications.",
    image: roboticsImage,
    icon: Bot,
    className: "teaching-violet",
  },
  {
    title: "Coding",
    description: "Learn programming to give life to your ideas.",
    image: codingImage,
    icon: Code2,
    className: "teaching-pink",
  },
  {
    title: "Artificial Intelligence",
    description:
      "Explore AI tools and build intelligent, real-world solutions.",
    image: aiImage,
    icon: Brain,
    className: "teaching-green",
  },
];

export default function Teaching() {
  return (
    <section className="teaching-section" aria-labelledby="teaching-title">
      <div
        className="teaching-decoration teaching-decoration-left"
        aria-hidden="true"
      />
      <div
        className="teaching-decoration teaching-decoration-right"
        aria-hidden="true"
      />

      <div className="teaching-container">
        <header className="teaching-heading">
          <div className="teaching-eyebrow">
            <span className="teaching-eyebrow-line" aria-hidden="true" />
            <span>WHAT WE TEACH</span>
            <span className="teaching-eyebrow-line" aria-hidden="true" />
          </div>

          <h2 id="teaching-title">
            Explore the technology behind
            <br className="teaching-heading-break" />
            <strong>everyday ideas</strong>
          </h2>
        </header>

        <div className="teaching-grid">
          {topics.map((topic) => {
            const Icon = topic.icon;

            return (
              <article
                key={topic.title}
                className={`teaching-card ${topic.className}`}
              >
                <div className="teaching-image-wrap">
                  <img
                    src={topic.image}
                    alt={`${topic.title} learning`}
                    className="teaching-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="teaching-card-content">
                  <div className="teaching-card-text">
                    <h3>{topic.title}</h3>
                    <p>{topic.description}</p>
                  </div>

                  <span
                    className="teaching-arrow"
                    aria-hidden="true"
                    title={`${topic.title} topic`}
                  >
                    <Icon className="teaching-topic-icon" size={20} strokeWidth={2.2} />
                    <ArrowRight className="teaching-arrow-icon" size={17} strokeWidth={2.5} />
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

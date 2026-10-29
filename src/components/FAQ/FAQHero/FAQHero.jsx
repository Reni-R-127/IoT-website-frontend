import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Search,
  Users,
  Settings,
  CreditCard,
  Package,
  Award,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

import faqHeroImage from "../../../assets/FAQ/FAQHero/faq-hero.png";
import "./FAQHero.css";

const categories = [
  {
    name: "Age & Levels",
    subtitle: "Who can join?",
    icon: Users,
    color: "orange",
  },
  {
    name: "Learning",
    subtitle: "Class format & support",
    icon: Settings,
    color: "purple",
  },
  {
    name: "Fees & Enrollment",
    subtitle: "Payments & registration",
    icon: CreditCard,
    color: "pink",
  },
  {
    name: "Kits & Materials",
    subtitle: "Components & kits",
    icon: Package,
    color: "green",
  },
  {
    name: "Certificates",
    subtitle: "Completion & recognition",
    icon: Award,
    color: "yellow",
  },
];

const questions = [
  // =========================================
  // AGE & LEVELS — 5 QUESTIONS
  // =========================================
  {
    category: "Age & Levels",
    question: "What age group can join?",
    answer:
      "Our courses are designed for students from 7–16 years. Age-based learning levels help students explore technology comfortably and build projects at their own pace.",
  },
  {
    category: "Age & Levels",
    question: "Does my child need previous coding experience?",
    answer:
      "No previous coding experience is required for beginner courses. Students can start with the fundamentals and gradually develop their skills through guided activities.",
  },
  {
    category: "Age & Levels",
    question: "How are students grouped by age?",
    answer:
      "Students are guided toward suitable learning levels based on their age, experience, and the requirements of the selected course.",
  },
  {
    category: "Age & Levels",
    question: "Can beginners join the programs?",
    answer:
      "Yes. Beginner-friendly programs introduce technology concepts step by step, allowing students to build their understanding before moving on to more advanced activities.",
  },
  {
    category: "Age & Levels",
    question: "Are the courses suitable for school students?",
    answer:
      "Yes. The programs are designed for school-age learners who want to explore coding, electronics, robotics, and IoT through practical activities.",
  },

  // =========================================
  // LEARNING — 5 QUESTIONS
  // =========================================
  {
    category: "Learning",
    question: "What will my child learn?",
    answer:
      "Students can explore coding, electronics, IoT, robotics, and other technology concepts through structured lessons and hands-on projects.",
  },
  {
    category: "Learning",
    question: "Are the classes practical?",
    answer:
      "The learning approach focuses on practical activities and project-based learning, helping students apply the concepts they learn.",
  },
  {
    category: "Learning",
    question: "Will students receive guidance?",
    answer:
      "Students receive guidance throughout their learning activities to help them understand concepts, solve problems, and work through their projects.",
  },
  {
    category: "Learning",
    question: "What projects will students work on?",
    answer:
      "Projects depend on the selected course and learning level. Activities may involve coding, electronic components, sensors, robotics, and IoT concepts.",
  },
  {
    category: "Learning",
    question: "How can parents track their child's progress?",
    answer:
      "Parents can contact the TechSprout Kids team to ask about their child's learning progress, completed activities, and project development.",
  },

  // =========================================
  // FEES & ENROLLMENT — 5 QUESTIONS
  // =========================================
  {
    category: "Fees & Enrollment",
    question: "How can I enroll?",
    answer:
      "Explore the available programs and contact our team to learn about enrollment, schedules, and the next steps.",
  },
  {
    category: "Fees & Enrollment",
    question: "How can I know the program fees?",
    answer:
      "Course fees can vary by program. Contact our team for the latest pricing and enrollment details.",
  },
  {
    category: "Fees & Enrollment",
    question: "How do I choose the right course?",
    answer:
      "Review the available courses and consider your child's age, interests, and experience. You can also contact our team for help choosing a suitable program.",
  },
  {
    category: "Fees & Enrollment",
    question: "How can I get enrollment assistance?",
    answer:
      "Contact our team through the website or the available contact channels. We can help explain the available programs and enrollment process.",
  },
  {
    category: "Fees & Enrollment",
    question: "Where can I find course schedules?",
    answer:
      "Course schedules and batch availability may vary by program. Contact our team to confirm the latest schedule before enrolling.",
  },

  // =========================================
  // KITS & MATERIALS — 5 QUESTIONS
  // =========================================
  {
    category: "Kits & Materials",
    question: "What materials are required?",
    answer:
      "Required materials depend on the selected course. Course-specific information can be shared before enrollment.",
  },
  {
    category: "Kits & Materials",
    question: "Do you provide learning kits?",
    answer:
      "Learning kit requirements depend on the course. Contact our team to confirm the components and kit options available for your selected program.",
  },
  {
    category: "Kits & Materials",
    question: "What components are used in the projects?",
    answer:
      "Depending on the course, projects may use sensors, electronic components, circuit boards, Arduino, ESP32, and other learning materials.",
  },
  {
    category: "Kits & Materials",
    question: "Does my child need to buy materials separately?",
    answer:
      "Material requirements and availability depend on the selected program. Please confirm with our team whether materials are included or need to be arranged separately.",
  },
  {
    category: "Kits & Materials",
    question: "Can students use the kits for practice?",
    answer:
      "Practice options depend on the course and kit arrangement. Contact our team for details about using the components for additional activities.",
  },

  // =========================================
  // CERTIFICATES — 5 QUESTIONS
  // =========================================
  {
    category: "Certificates",
    question: "Will students receive a certificate?",
    answer:
      "Certificate availability depends on the selected program. Please confirm the details with our team before enrolling.",
  },
  {
    category: "Certificates",
    question: "When will students receive their certificate?",
    answer:
      "Certificate timelines depend on the program's completion requirements. Contact our team to confirm the expected timeline for your course.",
  },
  {
    category: "Certificates",
    question: "Do students need to complete the course to receive a certificate?",
    answer:
      "Certificate eligibility may depend on completing the required course activities. Please check the specific requirements of your selected program.",
  },
  {
    category: "Certificates",
    question: "Will students receive recognition for their projects?",
    answer:
      "Recognition opportunities may vary by program. Contact our team to learn about any project showcases or recognition available for your course.",
  },
  {
    category: "Certificates",
    question: "Can I ask for certificate details before enrolling?",
    answer:
      "Yes. You can contact our team before enrollment to confirm certificate availability, eligibility requirements, and completion details.",
  },
];

const DEFAULT_CATEGORY = categories[0].name;

const getFirstQuestion = (category) =>
  questions.find((item) => item.category === category)?.question ?? null;

const matchesQuery = (item, query) =>
  !query ||
  item.question.toLowerCase().includes(query) ||
  item.answer.toLowerCase().includes(query) ||
  item.category.toLowerCase().includes(query);

export default function FAQHero() {
  const sectionRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY);
  const [openQuestion, setOpenQuestion] = useState(
    getFirstQuestion(DEFAULT_CATEGORY)
  );

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const query = searchText.trim().toLowerCase();

  const filteredQuestions = questions.filter(
    (item) =>
      item.category === activeCategory && matchesQuery(item, query)
  );

  const handleSearch = (event) => {
    event.preventDefault();

    if (!query) {
      setActiveCategory(DEFAULT_CATEGORY);
      setOpenQuestion(getFirstQuestion(DEFAULT_CATEGORY));

      document.querySelector("#faq-list")?.scrollIntoView({
        behavior: window.matchMedia?.(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block: "start",
      });

      return;
    }

    const matchingQuestion = questions.find((item) =>
      matchesQuery(item, query)
    );

    if (matchingQuestion) {
      setActiveCategory(matchingQuestion.category);
      setOpenQuestion(matchingQuestion.question);
    } else {
      setOpenQuestion(null);
    }

    document.querySelector("#faq-list")?.scrollIntoView({
      behavior: window.matchMedia?.(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  const handleCategoryChange = (category) => {
    if (!categories.some((item) => item.name === category)) return;

    setActiveCategory(category);
    setSearchText("");
    setOpenQuestion(getFirstQuestion(category));
  };

  const clearSearch = () => {
    setSearchText("");
    setActiveCategory(DEFAULT_CATEGORY);
    setOpenQuestion(getFirstQuestion(DEFAULT_CATEGORY));
  };

  return (
    <section
      ref={sectionRef}
      className={`faq-page ${visible ? "faq-page-visible" : ""}`}
      aria-label="Frequently asked questions"
    >
      <div
        className="faq-page-background-circle faq-circle-left"
        aria-hidden="true"
      />

      <div
        className="faq-page-background-circle faq-circle-right"
        aria-hidden="true"
      />

      <div className="faq-hero">
        <div className="faq-hero-container">
          <div className="faq-hero-content">
            <div className="faq-hero-eyebrow">
              <span
                className="faq-hero-eyebrow-line"
                aria-hidden="true"
              />
              <span>FAQS</span>
              <span
                className="faq-hero-eyebrow-line"
                aria-hidden="true"
              />
            </div>

            <h1 id="faq-hero-title">Have Questions?</h1>

            <p className="faq-hero-description">
              Find quick answers about our learning approach, age groups,
              enrollment, materials and more.
            </p>
          </div>

          <div className="faq-hero-visual">
            <div
              className="faq-hero-image-glow"
              aria-hidden="true"
            />

            <img
              src={faqHeroImage}
              alt="Friendly robot, question marks, books and technology projects"
              className="faq-hero-image"
              fetchPriority="high"
            />
          </div>

          <form
            className="faq-hero-search"
            onSubmit={handleSearch}
            role="search"
          >
            <Search
              className="faq-hero-search-icon"
              size={25}
              aria-hidden="true"
            />

            <input
              type="search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search for your question..."
              aria-label="Search frequently asked questions"
            />

            <button type="submit" aria-label="Search FAQs">
              <ArrowRight size={24} aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>

      <div className="faq-content-container" id="faq-list">
        <aside
          className="faq-category-panel"
          aria-label="FAQ categories"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const selected = activeCategory === category.name;

            return (
              <button
                type="button"
                key={category.name}
                className={`faq-category ${
                  selected ? "faq-category-active" : ""
                }`}
                onClick={() => handleCategoryChange(category.name)}
                aria-pressed={selected}
              >
                <span className={`faq-category-icon ${category.color}`}>
                  <Icon
                    size={25}
                    strokeWidth={2.3}
                    aria-hidden="true"
                  />
                </span>

                <span className="faq-category-copy">
                  <strong>{category.name}</strong>
                  <small>{category.subtitle}</small>
                </span>

                <ChevronRight
                  className="faq-category-arrow"
                  size={21}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </aside>

        <div className="faq-questions-panel">
          <div className="faq-questions-header">
            <div className="faq-questions-heading-copy">
              <span className="faq-panel-eyebrow">
                {activeCategory}
              </span>

              <h2>Frequently asked questions</h2>
            </div>

            <form
              className="faq-panel-search"
              onSubmit={handleSearch}
              role="search"
            >
              <Search size={20} aria-hidden="true" />

              <input
                type="search"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search your question..."
                aria-label="Filter questions"
              />
            </form>
          </div>

          <div className="faq-question-list">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((item) => {
                const isOpen = openQuestion === item.question;
                const answerId = `faq-answer-${questions.indexOf(item)}`;

                return (
                  <article
                    className={`faq-question ${
                      isOpen ? "faq-question-open" : ""
                    }`}
                    key={item.question}
                  >
                    <button
                      type="button"
                      className="faq-question-trigger"
                      onClick={() =>
                        setOpenQuestion(
                          isOpen ? null : item.question
                        )
                      }
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                    >
                      <span className="faq-question-mark">Q</span>

                      <span className="faq-question-title">
                        {item.question}
                      </span>

                      <ChevronDown
                        className="faq-question-chevron"
                        size={21}
                        aria-hidden="true"
                      />
                    </button>

                    {isOpen && (
                      <div className="faq-answer" id={answerId}>
                        <span className="faq-answer-mark">A</span>
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </article>
                );
              })
            ) : (
              <div className="faq-empty-state">
                <Search size={30} aria-hidden="true" />

                <h3>No matching questions found</h3>

                <p>
                  Try another search term or select a different category.
                </p>

                <button type="button" onClick={clearSearch}>
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
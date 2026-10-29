import HomeHero from "../../components/Home/HomeHero/HomeHero.jsx";
import LearningSection from "../../components/Home/LearningSection/LearningSection.jsx";
// import CoursesSection from "../../components/Home/CoursesSection/CoursesSection.jsx";
import ProjectLab from "../../components/Home/ProjectLab/ProjectLab.jsx";
import ParentSection from "../../components/Home/ParentSection/ParentSection.jsx";
import CTASection from "../../components/CTASection/CTASection.jsx";

import "./Home.css";
import PopularLearning from "../../components/Home/PopularLearning/PopularLearning.jsx";

export default function Home() {
  return (
    <main className="home-page">
      <HomeHero />

      <LearningSection />

      {/* <CoursesSection /> */}
      <PopularLearning />

      <ProjectLab />

      <ParentSection />

      <CTASection />
    </main>
  );
}
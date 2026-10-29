// import { faqs } from "../../data/content.js";
// import PageHero from "../../components/PageHero/PageHero.jsx";
// import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
// import FAQAccordion from "../../components/FAQAccordion/FAQAccordion.jsx";
import CTASection from "../../components/CTASection/CTASection.jsx";
import "./FAQs.css";
import FAQHero from "../../components/FAQ/FAQHero/FAQHero.jsx";

export default function FAQs() {
  return (
    <>
      {/* <PageHero
        eyebrow="FAQs"
        title="Questions parents usually ask."
        text="Open a question to see a simple answer. Update these answers with your actual policies before launch."
      /> */}
      <FAQHero />
      <CTASection />
      {/* <main className="faqs-page">
        <SectionTitle
          eyebrow="Need to know"
          title="Frequently asked questions"
        />
        <FAQAccordion items={faqs} />
      </main> */}
      
    </>
  );
}

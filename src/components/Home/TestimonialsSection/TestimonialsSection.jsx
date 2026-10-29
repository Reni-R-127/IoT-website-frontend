import { usePublicContent } from "../../../hooks/usePublicContent.js";
import TestimonialCard from "../../TestimonialCard/TestimonialCard.jsx";
import SectionTitle from "../../SectionTitle/SectionTitle.jsx";
import "./TestimonialsSection.css";

export default function TestimonialsSection() {
  const { items, loading } = usePublicContent("reviews");
  const reviews = items.slice(0, 3);
  return <section className="home-section testimonials-section">
    <SectionTitle eyebrow="Parent & student voices" title="What learners say" text="Approved reviews from TechSprout families." />
    {loading ? <p>Loading reviews…</p> : reviews.length ? <div className="testimonials-wrapper"><div className="testimonials-track">{reviews.map((item) => <TestimonialCard key={item._id} item={[item.name,item.message,item.role||"Parent"]}/>)}</div></div> : <p>Approved parent reviews will appear here soon.</p>}
  </section>;
}

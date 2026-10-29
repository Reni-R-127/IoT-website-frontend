import { ArrowRight, MessageCircle } from "lucide-react";
import { trackedWhatsAppUrl, trackWhatsAppClick } from "../../utils/whatsapp.js";
import "./CTASection.css";

export default function CTASection() {
  return (
    <section className="cta-section" data-animate="pop">
      <div data-animate="fade-left">
        <span className="cta-eyebrow">Start today</span>
        <h2>Let Your Child Start Building the Future</h2>
        <p>Give your child the opportunity to explore technology through real projects and hands-on learning.</p>
      </div>
      <a href={trackedWhatsAppUrl({ source: "Call-to-action section", message: "Hello TechSprout Kids! I would like to enquire about your programs." })} onClick={() => trackWhatsAppClick({ source: "Call-to-action section" })} target="_blank" rel="noreferrer" data-animate="fade-right"><MessageCircle size={18}/> Enroll Now <ArrowRight size={17}/></a>
    </section>
  );
}

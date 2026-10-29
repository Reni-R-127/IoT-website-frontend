import "./PageHero.css";
export default function PageHero({ eyebrow = "", title = "", text = "" }) {
  return <section className="page-hero"><div className="page-hero-inner">{eyebrow && <span className="page-hero-eyebrow">{eyebrow}</span>}<h1>{title}</h1>{text && <p>{text}</p>}</div></section>;
}

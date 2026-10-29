export default function SectionTitle({ eyebrow = "", title = "", text = "" }) {
  return <header className="section-title"><div className="section-title-eyebrow">{eyebrow}</div><h2>{title}</h2>{text&&<p>{text}</p>}</header>;
}

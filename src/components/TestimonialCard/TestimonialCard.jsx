export default function TestimonialCard({ item = [] }) {
  return <article className="testimonial-card"><div aria-label="5 out of 5 stars">★★★★★</div><p>{item[1]}</p><strong>{item[0]}</strong><span>{item[2]||"Parent"}</span></article>;
}

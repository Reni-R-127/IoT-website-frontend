import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./BlogCard.css";

export default function BlogCard({ post, slug, index = 0 }) {
  const delay = (index % 8) + 1;

  return (
    <article className="blog-card" data-animate="fade-up" data-delay={delay}>
      <div className="blog-image"><span>⚡</span></div>
      <div className="blog-body">
        <div className="blog-meta"><span>{post[0]}</span><time>{post[3]}</time></div>
        <h3>{post[1]}</h3>
        <p>{post[2]}</p>
        <Link to={`/blog/${slug}`}>Read More <ArrowRight size={15}/></Link>
      </div>
    </article>
  );
}

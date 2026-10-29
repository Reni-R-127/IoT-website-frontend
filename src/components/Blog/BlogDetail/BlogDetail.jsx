import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { usePublicContent } from "../../../hooks/usePublicContent.js";
import "./BlogDetail.css";

export default function BlogDetail() {
  const { id } = useParams();
  const { items, loading, error } = usePublicContent("blogs");
  const article = items.find(item => (item.slug || item._id) === id || item._id === id);
  if (loading) return <main className="blog-detail-page"><div className="blog-detail-article"><h1>Loading article…</h1></div></main>;
  if (error || !article) return <main className="blog-detail-page"><div className="blog-detail-article"><h1>Article not found</h1><p>This article may be unpublished or removed.</p><Link to="/blog"><ArrowLeft size={17}/> Back to blog</Link></div></main>;
  const date = article.publishedAt || article.createdAt;
  return <main className="blog-detail-page">
    <section className="blog-detail-hero" style={article.image?{backgroundImage:`linear-gradient(90deg,rgba(9,20,38,.84),rgba(9,20,38,.3)),url("${article.image}")`}:undefined}>
      <div className="blog-detail-hero-overlay"/><div className="blog-detail-hero-content">
        <span className="blog-detail-category">{article.category}</span><h1>{article.title}</h1><p>{article.excerpt}</p>
        <div className="blog-detail-meta-wrap"><span className="blog-detail-meta-item"><CalendarDays size={16}/>{date?new Date(date).toLocaleDateString():""}</span><span className="blog-detail-meta-item"><Clock3 size={16}/>TechSprout Kids</span></div>
      </div>
    </section>
    <div className="blog-detail-layout"><article className="blog-detail-article"><p className="blog-detail-intro">{article.excerpt}</p>{String(article.content||"").split(/\n{2,}/).filter(Boolean).map((paragraph,index)=><section className="blog-detail-section" key={index}><div className="blog-detail-section-copy">{index>0&&<h2>{index===1?"Explore the topic":index===2?"Why it matters":"Learn by building"}</h2>}<p>{paragraph}</p></div></section>)}<Link to="/blog" className="blog-detail-back"><ArrowLeft size={17}/> Back to all articles</Link></article></div>
  </main>;
}

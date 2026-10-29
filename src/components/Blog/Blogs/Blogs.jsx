import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { usePublicContent } from "../../../hooks/usePublicContent.js";
import "./Blogs.css";
import blogRobot from "../../../assets/Blog/Blogs/blog-robot.png";

const categories = ["All","IoT","Robotics","Coding","Electronics","AI","Kids Projects","STEM Education"];
const stemCategories = ["IoT","Electronics","Robotics","AI","Kids Projects"];

export default function Blogs() {
  const { items, loading, error } = usePublicContent("blogs");
  const [activeCategory,setActiveCategory]=useState("All");
  const [searchText,setSearchText]=useState("");
  const blogPosts=items.map(post=>({
    ...post,id:post.slug||post._id,description:post.excerpt||"",date:post.publishedAt?new Date(post.publishedAt).toLocaleDateString():new Date(post.createdAt).toLocaleDateString(),alt:post.title,
  }));
  const filteredPosts=useMemo(()=>{
    const query=searchText.trim().toLowerCase();
    return blogPosts.filter(post=>{
      const category=String(post.category||"IoT");
      const matchesCategory=activeCategory==="All"||category===activeCategory||(activeCategory==="STEM Education"&&stemCategories.includes(category));
      const matchesSearch=!query||[post.title,post.description,post.category,post.content].some(v=>String(v||"").toLowerCase().includes(query));
      return matchesCategory&&matchesSearch;
    });
  },[blogPosts,activeCategory,searchText]);
  const clearFilters=()=>{setSearchText("");setActiveCategory("All");};
  return <section className="blogs-section" aria-labelledby="blogs-title">
    <div className="blogs-decoration blogs-decoration-blue" aria-hidden="true"/><div className="blogs-decoration blogs-decoration-purple" aria-hidden="true"/><div className="blogs-decoration blogs-decoration-yellow" aria-hidden="true"/><div className="blogs-decoration blogs-decoration-cyan" aria-hidden="true"/>
    <div className="blogs-container">
      <header className="blogs-heading"><div className="blogs-eyebrow"><span className="blogs-eyebrow-line"/><span>TECHNOLOGY EDUCATION</span><span className="blogs-eyebrow-line"/></div><h1 id="blogs-title">Explore the blog</h1><p>Simple and practical articles about IoT, robotics, coding, electronics, AI and STEM education for curious minds.</p><img src={blogRobot} alt="" className="blogs-heading-robot" aria-hidden="true" loading="lazy"/></header>
      <div className="blogs-toolbar"><label className="blogs-search"><Search size={23}/><input type="search" value={searchText} onChange={e=>setSearchText(e.target.value)} placeholder="Search articles, topics or keywords..." aria-label="Search blog articles"/>{searchText&&<button type="button" className="blogs-clear-search" onClick={()=>setSearchText("")} aria-label="Clear search">×</button>}</label>
        <div className="blogs-categories" aria-label="Filter blog categories">{categories.map(category=><button type="button" key={category} className={`blogs-category ${activeCategory===category?"active":""}`} onClick={()=>setActiveCategory(category)} aria-pressed={activeCategory===category}>{category}</button>)}</div>
      </div>
      {loading?<div className="blogs-empty"><h2>Loading articles…</h2></div>:error?<div className="blogs-empty"><h2>Articles are temporarily unavailable</h2><p>Please try again in a moment.</p></div>:filteredPosts.length>0?<div className="blogs-grid" aria-live="polite">{filteredPosts.map((post,index)=><article className="blogs-card" key={post._id||post.id} style={{"--blogs-card-delay":`${index*90}ms`}}>
        <Link to={`/blog/${post.id}`} className="blogs-card-image-link" aria-label={`Read ${post.title}`}>{post.image?<img src={post.image} alt={post.alt} className="blogs-card-image" loading={index<3?"eager":"lazy"}/>:<div className="blogs-card-image blogs-image-empty">TechSprout Kids</div>}</Link>
        <div className="blogs-card-content"><div className="blogs-card-meta"><span className={`blogs-tag blogs-tag-${String(post.category||"iot").toLowerCase().replace(/\s+/g,"-")}`}>{post.category}</span><time>{post.date}</time></div><h2><Link to={`/blog/${post.id}`}>{post.title}</Link></h2><p>{post.description}</p><Link to={`/blog/${post.id}`} className="blogs-read-more" aria-label={`Read more about ${post.title}`}>Read More <ArrowRight size={19}/></Link></div>
      </article>)}</div>:<div className="blogs-empty" aria-live="polite"><Search size={34}/><h2>{items.length?"No articles found":"No published articles yet"}</h2><p>{items.length?"Try another keyword or select a different category.":"Published blogs added in the admin dashboard will appear here."}</p><button type="button" onClick={clearFilters}>Show all articles</button></div>}
    </div>
  </section>;
}

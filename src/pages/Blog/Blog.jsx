
import { Link } from "react-router-dom";

import CTASection from "../../components/CTASection/CTASection.jsx";
import BlogHero from "../../components/Blog/BlogHero/BlogHero.jsx";
import Blogs from "../../components/Blog/Blogs/Blogs.jsx";
import BlogDetail from "../../components/Blog/BlogDetail/BlogDetail.jsx";

import "./Blog.css";

export function Blog() {
  return (
    <>
      <BlogHero />
      <Blogs />
      <CTASection />
    </>
  );
}

export function BlogDetails() {
  return <BlogDetail />;
}

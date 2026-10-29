import { Link } from "react-router-dom";
export default function CourseCard({ course = {} }) {
  const title=course.title||course.name||"Course";
  return <article className="course-card">{course.image&&<img src={course.image} alt={title}/>}<h3>{title}</h3><p>{course.description}</p><Link to={`/courses/${course.slug||course.id}`}>View details</Link></article>;
}

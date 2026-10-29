import { useState } from "react";
import { ChevronDown } from "lucide-react";
export default function FAQAccordion({ items = [] }) {
  const [open,setOpen]=useState(-1);
  return <div className="faq-accordion">{items.map((item,index)=><article key={item[0]||index}><button type="button" aria-expanded={open===index} onClick={()=>setOpen(open===index?-1:index)}>{item[0]}<ChevronDown size={18}/></button>{open===index&&<p>{item[1]}</p>}</article>)}</div>;
}

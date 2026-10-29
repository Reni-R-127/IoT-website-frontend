import { useState } from "react";
// import { Clock3, Contact2Icon, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import {
  buildWhatsAppMessage,
  siteConfig,
  whatsappUrl,
} from "../../config/site.js";
// import PageHero from "../../components/PageHero/PageHero.jsx";
import "./Contact.css";
import ContactHero from "../../components/Contact/ContactHero/ContactHero.jsx";
import ContactForm from "../../components/Contact/ContactForm/ContactForm.jsx";

export default function Contact() {
  const [form, setForm] = useState({
    parentName: "",
    childName: "",
    childAge: "",
    phone: "",
    email: "",
    course: "",
    message: "",
  });
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    window.open(buildWhatsAppMessage(form), "_blank", "noopener,noreferrer");
  };

  return (
    <>
    <ContactHero />
    <ContactForm />        
    </>
  );
}

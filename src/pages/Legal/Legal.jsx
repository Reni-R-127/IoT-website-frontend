import PageHero from "../../components/PageHero/PageHero.jsx";
import "./Legal.css";

export function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy Policy"
        text="Placeholder legal content for your company. Replace this with your approved privacy policy before launch."
      />
      <main className="legal-page">
        <h2>Privacy Policy</h2>
        <p>
          This page is a placeholder. Add your organization's approved privacy
          policy covering contact forms, WhatsApp interactions, analytics,
          cookies and any information collected through the website.
        </p>
      </main>
    </>
  );
}
export function Terms() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="Terms & Conditions"
        text="Placeholder legal content for your company. Replace this with your approved terms before launch."
      />
      <main className="legal-page">
        <h2>Terms & Conditions</h2>
        <p>
          This page is a placeholder. Add your organization's approved terms
          covering course enrollment, payments, cancellations, materials,
          classes and website usage.
        </p>
      </main>
    </>
  );
}

import ProductsHero from "../../components/Products/ProductsHero/ProductsHero.jsx";
import ProductCatalog from "../../components/Products/ProductCatalog/ProductCatalog.jsx";
import ProjectShowcase from "../../components/Products/ProjectShowcase/ProjectShowcase.jsx";
import Testimonials from "../../components/Products/Testimonials/Testimonials.jsx";
import WorkshopGallery from "../../components/Products/WorkshopGallery/WorkshopGallery.jsx";
import BulkOrders from "../../components/Products/BulkOrders/BulkOrders.jsx";
import "./Products.css";

export default function Products() {
  return (
    <main className="products-page">
      <ProductsHero />
      <ProductCatalog />
      <ProjectShowcase />
      <Testimonials />
      <WorkshopGallery />
      <BulkOrders />
    </main>
  );
}

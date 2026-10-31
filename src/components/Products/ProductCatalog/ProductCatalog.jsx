/**
 * File: website-frontend/src/components/Products/ProductCatalog/ProductCatalog.jsx
 *
 * Purpose:
 * Display IoT kits and products from MongoDB.
 *
 * Public API:
 * GET /api/products
 *
 * MongoDB Model:
 * Product
 *
 * Features:
 * - Dynamic product fetching
 * - Dynamic category filters
 * - Product images from database
 * - Product features and audience details
 * - Dynamic WhatsApp enquiry links
 * - Loading, error and empty states
 * - No hardcoded dummy products
 *
 * Dependencies:
 * React, lucide-react
 */

import { useMemo, useState } from "react";

import {
  ArrowRight,
  BookOpen,
  Check,
  Flame,
  GraduationCap,
  Settings,
  ShoppingCart,
  Wifi,
  Wrench,
  Package,
} from "lucide-react";

import { wphone } from "../../../config/site.js";
import { usePublicContent } from "../../../hooks/usePublicContent.js";

import "./ProductCatalog.css";


// ======================================================
// API CONFIGURATION
// ======================================================

const API_BASE_URL = String(
  import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:5000/api"
).trim().replace(/\/+$/, "");

const API_ORIGIN = (() => {
  try {
    return new URL(
      API_BASE_URL,
      window.location.origin
    ).origin;
  } catch {
    return "http://localhost:5000";
  }
})();


// ======================================================
// CATEGORY ICON
// ======================================================

function getCategoryIcon(category = "") {
  const value = String(category).toLowerCase();

  if (value.includes("beginner")) {
    return GraduationCap;
  }

  if (value.includes("robot")) {
    return Wrench;
  }

  if (value.includes("iot")) {
    return Wifi;
  }

  if (value.includes("advanced")) {
    return Settings;
  }

  return ShoppingCart;
}


// ======================================================
// PRODUCT IMAGE URL
// ======================================================

function getProductImageUrl(product) {
  const image = String(
    product.image ||
      product.imageUrl ||
      product.thumbnailUrl ||
      ""
  ).trim();

  if (!image) return "";

  if (
    image.startsWith("data:image/") ||
    image.startsWith("blob:")
  ) {
    return image;
  }

  try {
    const resolved = new URL(
      image.startsWith("/") ? image : `/${image}`,
      API_ORIGIN
    );

    if (
      resolved.protocol !== "http:" &&
      resolved.protocol !== "https:"
    ) {
      return "";
    }

    return resolved.href;
  } catch {
    return "";
  }
}


// ======================================================
// WHATSAPP LINK
// ======================================================

function getWhatsAppLink(product) {
  const phone = String(wphone || "").replace(/\D/g, "");

  if (!phone) return "";

  const name = String(product.name || "IoT Kit").trim();

  const price = String(
    product.price || "Contact us for pricing"
  ).trim();

  const message =
    `Hello ProJenius,\n\n` +
    `I would like to know more about ${name}.\n` +
    `Price: ${price}\n` +
    `Please share more details and availability.`;

  return (
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  );
}


// ======================================================
// NORMALIZE PRODUCT DATA
// ======================================================

function normalizeProduct(product) {
  return {
    id: String(product._id || product.id || product.slug || product.name),

    name: String(product.name || "").trim(),

    category: String(
      product.category || "Other"
    ).trim(),

    badge: String(
      product.badge || product.category || "IoT Kit"
    ).trim(),

    tone: [
      "blue",
      "green",
      "purple",
      "orange",
    ].includes(product.tone)
      ? product.tone
      : "blue",

    image: getProductImageUrl(product),

    description: String(
      product.description || ""
    ).trim(),

    features: Array.isArray(product.features)
      ? product.features
          .filter((item) => typeof item === "string")
          .map((item) => item.trim())
          .filter(Boolean)
      : [],

    audience: String(
      product.audience || ""
    ).trim(),

    projects: String(
      product.projects || ""
    ).trim(),

    price: String(
      product.price || "Contact us"
    ).trim(),

    popular: product.popular === true,
  };
}


// ======================================================
// PRODUCT IMAGE COMPONENT
// ======================================================

function ProductImage({ product }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="kit-image-wrap">

      {product.popular && (
        <span className="kit-popular">
          <Flame size={17} />
          Most Popular
        </span>
      )}

      {!product.popular && (
        <span className="kit-level">
          <span className="kit-level-dot" />
          {product.badge}
        </span>
      )}

      {product.image && !imageFailed ? (
        <img
          src={product.image}
          alt={`${product.name} electronics kit`}
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="kit-image-placeholder">
          <Package size={42} />
          <span>
            {product.image
              ? "Image unavailable"
              : "Product image not available"}
          </span>
        </div>
      )}

    </div>
  );
}


// ======================================================
// PRODUCT CARD
// ======================================================

function ProductCard({ product, index }) {
  const whatsappLink = getWhatsAppLink(product);

  return (
    <article
      className={`kit-card kit-${product.tone} kit-card-enter`}
      style={{
        "--card-index": index,
      }}
    >

      {/* PRODUCT IMAGE */}

      <ProductImage product={product} />


      {/* PRODUCT DETAILS */}

      <div className="kit-card-body">

        <h3>{product.name}</h3>

        {product.description && (
          <p className="kit-description">
            {product.description}
          </p>
        )}

        {!product.description && (
          <p className="kit-description">
            Product description is not available.
          </p>
        )}


        {/* PRODUCT PRICE */}

        <p className="kit-price">
          <strong>Price:</strong> {product.price}
        </p>


        {/* PRODUCT FEATURES */}

        {product.features.length > 0 && (
          <ul className="kit-features">
            {product.features.map((feature, featureIndex) => (
              <li key={`${feature}-${featureIndex}`}>
                <Check size={16} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}


        {/* PRODUCT META */}

        {(product.audience || product.projects) && (
          <div className="kit-meta">

            {product.audience && (
              <div>
                <GraduationCap
                  className={`meta-${product.tone}`}
                  size={23}
                />

                <span>{product.audience}</span>
              </div>
            )}

            {product.projects && (
              <div>
                <BookOpen size={20} />

                <span>
                  <strong>{product.projects}</strong>
                  <small>Projects</small>
                </span>
              </div>
            )}

          </div>
        )}


        {/* WHATSAPP ACTIONS */}

        {whatsappLink && (
          <div className="kit-actions">

            <a
              className="kit-view-btn"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${product.name} details on WhatsApp`}
            >
              <ShoppingCart size={18} />
              View Kit
            </a>

            <a
              className="kit-enquire-btn"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enquire about ${product.name}`}
            >
              Enquire Now
            </a>

          </div>
        )}

      </div>

    </article>
  );
}


// ======================================================
// MAIN PRODUCT CATALOG
// ======================================================

export default function ProductCatalog() {
  const [active, setActive] = useState("All Kits");

  const {
    items = [],
    loading,
    error,
  } = usePublicContent("products");


  // ====================================================
  // NORMALIZE PRODUCTS
  // ====================================================

  const products = useMemo(() => {
    if (!Array.isArray(items)) {
      return [];
    }

    return items
      .filter(
        (product) =>
          product &&
          product.active !== false &&
          product.name
      )
      .map(normalizeProduct)
      .sort((a, b) => {
        const first = items.find(
          (item) =>
            String(item._id || item.id || item.slug || item.name) === a.id
        );

        const second = items.find(
          (item) =>
            String(item._id || item.id || item.slug || item.name) === b.id
        );

        return (
          Number(first?.sortOrder || 0) -
          Number(second?.sortOrder || 0)
        );
      });
  }, [items]);


  // ====================================================
  // DYNAMIC CATEGORY FILTERS
  // ====================================================

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];

    return [
      "All Kits",
      ...uniqueCategories,
    ];
  }, [products]);


  // ====================================================
  // ACTIVE CATEGORY VALIDATION
  // ====================================================

  const selectedCategory = categories.includes(active)
    ? active
    : "All Kits";


  // ====================================================
  // FILTER PRODUCTS
  // ====================================================

  const shown = useMemo(() => {
    if (selectedCategory === "All Kits") {
      return products;
    }

    return products.filter(
      (product) => product.category === selectedCategory
    );
  }, [products, selectedCategory]);


  // ====================================================
  // BENEFIT SECTION
  // ====================================================

  const benefits = [
    {
      icon: Wrench,
      title: (
        <>
          High Quality
          <br />
          Components
        </>
      ),
    },
    {
      icon: BookOpen,
      title: (
        <>
          Project Guides
          <br />
          Included
        </>
      ),
    },
    {
      icon: Package,
      title: (
        <>
          Pan India
          <br />
          Delivery
        </>
      ),
    },
    {
      icon: ArrowRight,
      title: (
        <>
          Expert
          <br />
          Support
        </>
      ),
    },
  ];


  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section
      className="product-catalog products-shell"
      id="product-catalog"
      aria-labelledby="catalog-title"
      aria-busy={loading}
    >

      {/* SECTION HEADING */}

      <div
        className="products-section-heading"
        data-animate="fade-up"
      >
        <span className="section-kicker">
          <i aria-hidden="true" />
          <span>Our Products</span>
          <i aria-hidden="true" />
        </span>

        <h2 id="catalog-title">
          Explore Our <em>Kits</em>
        </h2>

        <p>
          Hands-on learning kits for curious minds — from school students to
          college innovators.
          <br className="desktop-break" />
          Build real projects. Gain practical skills. Turn ideas into solutions.
        </p>
      </div>


      {/* CATEGORY FILTERS */}

      {!loading && !error && products.length > 0 && (
        <div
          className="product-filter-row"
          role="group"
          aria-label="Filter product kits"
          data-animate="fade-up"
        >
          {categories.map((category) => {
            const Icon =
              category === "All Kits"
                ? ShoppingCart
                : getCategoryIcon(category);

            return (
              <button
                type="button"
                key={category}
                className={`product-filter ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setActive(category)}
                aria-pressed={selectedCategory === category}
              >
                <Icon size={19} />
                {category}
              </button>
            );
          })}
        </div>
      )}


      {/* PRODUCT GRID */}

      <div
        className={`product-card-grid ${
          shown.length < 4 ? "filtered-grid" : ""
        }`}
        aria-live="polite"
      >

        {/* LOADING */}

        {loading && (
          <div className="catalog-message" role="status">
            Loading IoT kits...
          </div>
        )}


        {/* API ERROR */}

        {!loading && error && (
          <div className="catalog-message catalog-error" role="alert">
            <strong>Products could not be loaded.</strong>
            <span>
              Please check the website backend connection.
            </span>

            {import.meta.env.DEV && (
              <small>{error}</small>
            )}
          </div>
        )}


        {/* EMPTY DATABASE */}

        {!loading && !error && products.length === 0 && (
          <div className="catalog-message">
            <strong>No products available yet.</strong>
            <span>
              Products added from the Admin Dashboard will appear here.
            </span>
          </div>
        )}


        {/* FILTER EMPTY STATE */}

        {!loading &&
          !error &&
          products.length > 0 &&
          shown.length === 0 && (
            <div className="catalog-message">
              No products available in this category.
            </div>
          )}


        {/* DATABASE PRODUCTS */}

        {!loading &&
          !error &&
          shown.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}

      </div>


      {/* CATALOG BENEFITS */}

      <div
        className="catalog-benefits"
        data-animate="fade-up"
      >
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;

          return (
            <div key={index}>
              <span>
                <Icon size={23} />
              </span>

              <strong>{benefit.title}</strong>
            </div>
          );
        })}
      </div>

    </section>
  );
}
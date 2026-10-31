/**
 * File: website-frontend/src/components/Products/Testimonials/Testimonials.jsx
 *
 * Purpose:
 * Fetch and display approved student testimonials from MongoDB.
 *
 * API:
 * GET http://localhost:5000/api/testimonials
 *
 * Features:
 * - Dynamic testimonials
 * - Approved testimonial filtering
 * - Loading, error and empty states
 * - Image URL handling
 * - YouTube video embedding
 * - Previous / Next carousel navigation
 *
 * Dependencies:
 * React, lucide-react, Testimonials.css
 */

import { useEffect, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Play,
  Quote,
} from "lucide-react";

import "./Testimonials.css";


// ======================================================
// API CONFIGURATION
// ======================================================

const RAW_API_BASE_URL = String(
  import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:5000/api"
).trim().replace(/\/+$/, "");

if (RAW_API_BASE_URL.includes(",")) {
  throw new Error(
    "Invalid VITE_API_BASE_URL. Configure only one backend URL."
  );
}

const API_BASE_URL = /\/api$/i.test(RAW_API_BASE_URL)
  ? RAW_API_BASE_URL
  : `${RAW_API_BASE_URL}/api`;

const API_ORIGIN = new URL(API_BASE_URL).origin;

const API_URL = `${API_BASE_URL}/testimonials`;


// ======================================================
// RESPONSE HELPER
// ======================================================

function extractTestimonials(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.items)) {
    return data.items;
  }

  if (Array.isArray(data?.testimonials)) {
    return data.testimonials;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  throw new Error(
    "Invalid testimonials API response."
  );
}


// ======================================================
// APPROVAL FILTER
// ======================================================

function isApproved(item) {
  // Prefer approved field because the public
  // backend endpoint filters using approved: true.

  if (typeof item.approved === "boolean") {
    return item.approved;
  }

  if (typeof item.published === "boolean") {
    return item.published;
  }

  if (typeof item.isPublished === "boolean") {
    return item.isPublished;
  }

  return true;
}


// ======================================================
// IMAGE URL HELPER
// ======================================================

function getImageUrl(item) {
  const image = String(
    item.thumbnailUrl ||
    item.thumbnailImage ||
    item.thumbnail ||
    item.image ||
    ""
  ).trim();

  if (!image) {
    return "";
  }

  if (
    image.startsWith("data:image/") ||
    image.startsWith("blob:")
  ) {
    return image;
  }

  try {
    return new URL(image, `${API_ORIGIN}/`).href;
  } catch {
    return "";
  }
}


// ======================================================
// VIDEO URL HELPER
// ======================================================

function getVideoUrl(item) {
  return (
    item.videoUrl ||
    item.videoURL ||
    item.video ||
    item.videoLink ||
    ""
  );
}


// ======================================================
// YOUTUBE EMBED URL
// ======================================================

function getEmbedUrl(url) {
  if (!url || typeof url !== "string") {
    return "";
  }

  try {
    const parsed = new URL(url);

    const hostname = parsed.hostname.toLowerCase();

    let videoId = "";

    if (
      hostname === "youtu.be" ||
      hostname === "www.youtu.be"
    ) {
      videoId = parsed.pathname
        .split("/")
        .filter(Boolean)[0] || "";
    }

    if (
      hostname === "youtube.com" ||
      hostname === "www.youtube.com" ||
      hostname === "m.youtube.com"
    ) {
      videoId = parsed.searchParams.get("v") || "";

      if (!videoId) {
        const parts = parsed.pathname
          .split("/")
          .filter(Boolean);

        if (
          ["embed", "shorts", "live"].includes(parts[0])
        ) {
          videoId = parts[1] || "";
        }
      }
    }

    if (!videoId) {
      return "";
    }

    return (
      `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`
    );

  } catch {
    return "";
  }
}


// ======================================================
// MAIN COMPONENT
// ======================================================

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  const [offset, setOffset] = useState(0);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [activeVideo, setActiveVideo] = useState(null);


  // ====================================================
  // FETCH TESTIMONIALS FROM MONGODB
  // ====================================================

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTestimonials() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          method: "GET",

          headers: {
            Accept: "application/json",
          },

          signal: controller.signal,
        });

        const responseText = await response.text();

        let data = null;

        if (responseText) {
          try {
            data = JSON.parse(responseText);
          } catch {
            throw new Error(
              "Testimonials API returned invalid JSON."
            );
          }
        }

        if (!response.ok) {
          throw new Error(
            data?.message ||
            `Testimonials API failed with status ${response.status}.`
          );
        }

        if (!data) {
          throw new Error(
            "Testimonials API returned an empty response."
          );
        }

        const items = extractTestimonials(data);

        const visibleItems = items.filter(isApproved);

        if (!controller.signal.aborted) {
          setTestimonials(visibleItems);
          setOffset(0);
          setActiveVideo(null);
        }

      } catch (err) {
        if (
          err.name !== "AbortError" &&
          !controller.signal.aborted
        ) {
          console.error(
            "Testimonials API error:",
            err
          );

          setTestimonials([]);

          setError(err.message || "Unable to load testimonials.");
        }

      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchTestimonials();

    return () => {
      controller.abort();
    };

  }, []);


  // ====================================================
  // PREVIOUS TESTIMONIAL
  // ====================================================

  function showPrevious() {
    setOffset((current) => {
      return (
        current - 1 + testimonials.length
      ) % testimonials.length;
    });

    setActiveVideo(null);
  }


  // ====================================================
  // NEXT TESTIMONIAL
  // ====================================================

  function showNext() {
    setOffset((current) => {
      return (current + 1) % testimonials.length;
    });

    setActiveVideo(null);
  }


  // ====================================================
  // CAROUSEL ORDER
  // ====================================================

  const orderedTestimonials =
    testimonials.length > 0
      ? testimonials.map((_, index) => {
          return testimonials[
            (index + offset) % testimonials.length
          ];
        })
      : [];


  // ====================================================
  // LOADING STATE
  // ====================================================

  if (loading) {
    return (
      <section
        className="product-testimonials products-shell"
        aria-live="polite"
      >
        <p role="status">
          Loading student testimonials...
        </p>
      </section>
    );
  }


  // ====================================================
  // ERROR STATE
  // ====================================================

  if (error) {
    return (
      <section
        className="product-testimonials products-shell"
        aria-labelledby="testimonials-title"
      >
        <div className="products-section-heading">
          <span className="section-kicker">
            <i aria-hidden="true" />
            <span>Student Testimonials</span>
            <i aria-hidden="true" />
          </span>

          <h2 id="testimonials-title">
            Hear From Our <em>Students</em>
          </h2>
        </div>

        <p className="testimonial-error" role="alert">
          Testimonials could not be loaded.
          Please check the website backend connection.
        </p>

        {import.meta.env.DEV && (
          <small className="testimonial-error-details">
            {error}
          </small>
        )}
      </section>
    );
  }


  // ====================================================
  // EMPTY STATE
  // ====================================================

  if (testimonials.length === 0) {
    return (
      <section
        className="product-testimonials products-shell"
        aria-labelledby="testimonials-title"
      >
        <div className="products-section-heading">
          <span className="section-kicker">
            <i aria-hidden="true" />
            <span>Student Testimonials</span>
            <i aria-hidden="true" />
          </span>

          <h2 id="testimonials-title">
            Hear From Our <em>Students</em>
          </h2>

          <p>
            Student experiences and projects shared by our learners.
          </p>
        </div>

        <p className="testimonial-empty">
          No approved student testimonials available yet.
        </p>
      </section>
    );
  }


  // ====================================================
  // MAIN UI
  // ====================================================

  return (
    <section
      className="product-testimonials products-shell"
      aria-labelledby="testimonials-title"
    >

      {/* SECTION HEADING */}

      <div
        className="products-section-heading"
        data-animate="fade-up"
      >
        <span className="section-kicker">
          <i aria-hidden="true" />
          <span>Student Testimonials</span>
          <i aria-hidden="true" />
        </span>

        <h2 id="testimonials-title">
          Hear From Our <em>Students</em>
        </h2>

        <p>
          Student experiences and projects shared by our learners.
        </p>
      </div>


      {/* CAROUSEL CONTROLS */}

      {testimonials.length > 1 && (
        <div className="testimonial-controls">

          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={showPrevious}
          >
            <ArrowLeft size={20} />
          </button>

          <button
            type="button"
            aria-label="Next testimonials"
            onClick={showNext}
          >
            <ArrowRight size={20} />
          </button>

        </div>
      )}


      {/* TESTIMONIAL GRID */}

      <div className="testimonial-grid">

        {orderedTestimonials.map((item, index) => {
          const name =
            item.studentName ||
            item.name ||
            "Student";

          const role =
            item.role ||
            item.year ||
            "";

          const kit =
            item.course ||
            item.kit ||
            item.courseLabel ||
            "";

          const quote =
            item.quote ||
            item.message ||
            "";

          const duration =
            item.duration ||
            item.videoDuration ||
            "";

          const image = getImageUrl(item);

          const videoUrl = getVideoUrl(item);

          const embedUrl = getEmbedUrl(videoUrl);

          const itemId =
            item._id ||
            item.id ||
            `${name}-${index}`;


          return (
            <article
              className="testimonial-card"
              key={itemId}
              data-animate="fade-up"
              data-delay={Math.min(index + 1, 5)}
            >

              {/* TESTIMONIAL IMAGE */}

              <div className="testimonial-media">

                {image ? (
                  <img
                    src={image}
                    alt={`${name} testimonial thumbnail`}
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="testimonial-image-placeholder">
                    No thumbnail available
                  </div>
                )}

                {duration && (
                  <span className="testimonial-duration">
                    {duration}
                  </span>
                )}

                {videoUrl && (
                  <button
                    type="button"
                    className="testimonial-play"
                    aria-label={`Play testimonial from ${name}`}
                    onClick={() => {
                      setActiveVideo((current) =>
                        current === itemId
                          ? null
                          : itemId
                      );
                    }}
                  >
                    <Play
                      size={22}
                      fill="currentColor"
                    />
                  </button>
                )}

              </div>


              {/* VIDEO PLAYER */}

              {activeVideo === itemId && videoUrl && (
                <div className="testimonial-video-player">

                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={`${name} testimonial video`}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : (
                    <a
                      href={videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open testimonial video
                    </a>
                  )}

                </div>
              )}


              {/* TESTIMONIAL DETAILS */}

              <div className="testimonial-body">

                <Quote
                  className="testimonial-quote-icon"
                  size={22}
                  aria-hidden="true"
                />

                {quote && (
                  <p>{quote}</p>
                )}

                <div className="testimonial-person">

                  {image && (
                    <img
                      src={image}
                      alt=""
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  )}

                  <div>
                    <strong>{name}</strong>

                    {role && (
                      <small>{role}</small>
                    )}
                  </div>

                  {kit && (
                    <span className="testimonial-kit">
                      {kit}
                    </span>
                  )}

                </div>

              </div>

            </article>
          );
        })}

      </div>

    </section>
  );
}
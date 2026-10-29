const API = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace(/\/+$/, "");
const DEFAULT_NUMBER = "918925450473";

export function trackedWhatsAppUrl({ number = DEFAULT_NUMBER, source = "Website", item = "", message = "" } = {}) {
  const lines = [
    message || "Hello TechSprout Kids! I would like to know more.",
    `Source section: ${source}`,
    item ? `Interested in: ${item}` : "",
  ].filter(Boolean);
  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function trackWhatsAppClick({ source = "Website", item = "" } = {}) {
  fetch(`${API}/whatsapp-click`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source, item, page: window.location.pathname }),
    keepalive: true,
  }).catch(() => {});
}

export function openTrackedWhatsApp({ number = DEFAULT_NUMBER, source = "Website", item = "", message = "" } = {}) {
  const url = trackedWhatsAppUrl({ number, source, item, message });
  window.open(url, "_blank", "noopener,noreferrer");
  trackWhatsAppClick({ source, item });
}

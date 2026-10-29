export const siteConfig = {
  companyName: "IoT Web",
  phone: "+91 89254 50473",
  email: "teamprojenius@gmail.com",

  location:
    "Madurai, Tamil Nadu 625003",

  locationUrl:
    "https://maps.app.goo.gl/o4vV94YG8qt6AdMi9?g_st=ac",

  workingHours: "Mon - Sat, 10:00 AM - 7:00 PM",

  whatsappText:
    "Hello, I am interested in your Kids IoT courses.",
};

// WhatsApp number: country code + phone number
export const wphone = "918925450473";

// Default WhatsApp link
export const whatsappUrl = `https://wa.me/${wphone}?text=${encodeURIComponent(
  siteConfig.whatsappText
)}`;

export const buildWhatsAppMessage = (details = {}) => {
  const lines = [
    "Hello, I am interested in your Kids IoT courses.",
    details.parentName && `Parent Name: ${details.parentName}`,
    details.childName && `Child Name: ${details.childName}`,
    details.childAge && `Child Age: ${details.childAge}`,
    details.phone && `Phone: ${details.phone}`,
    details.email && `Email: ${details.email}`,
    details.course && `Interested Course: ${details.course}`,
    details.message && `Message: ${details.message}`,
  ].filter(Boolean);

  return `https://wa.me/${wphone}?text=${encodeURIComponent(
    lines.join("\n")
  )}`;
};
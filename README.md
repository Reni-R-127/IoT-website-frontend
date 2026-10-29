# Kids IoT Learning Website

A simple, colorful and professional React + Vite website for kids' IoT and technology learning.

## Tech
- React
- Vite
- React Router
- Lucide React
- Separate CSS files for components/pages
- No CSS variables
- No large global styling file

## Run

```bash
npm install
npm run dev
```

## Important configuration

Edit:

`src/config/site.js`

Replace:
- `companyName`
- `phone`
- `email`
- `location`
- `workingHours`
- `whatsappText`

Also replace placeholder course prices (`₹XXXX`) in:

`src/data/content.js`

## WhatsApp

All Enroll Now / Chat on WhatsApp actions use the number from `src/config/site.js`.

The Contact form prepares the entered details as a WhatsApp message.

## Pages

- Home
- About Us
- Courses
- Individual Course Details
- Pricing
- FAQs
- Blog
- Individual Blog Details
- Contact
- Privacy Policy placeholder
- Terms & Conditions placeholder

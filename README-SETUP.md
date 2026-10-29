# TechSprout Kids IoT website — full-stack setup

## Project layout
- `src/` — existing React/Vite public website, retained with its current visual structure and assets.
- `website-backend/` — public API, MongoDB models, course enquiry capture, SMTP notifications to admin and parent, public courses/blogs/reviews endpoints.
- `admin-frontend/` — responsive admin dashboard without a login page. The admin API key is required to connect; it is stored in the current browser only.
- `admin-backend/` — separate admin API service connected to the same MongoDB database; all write endpoints require `x-admin-key`.

## Important truth about “no login page”
A publicly writable admin dashboard is not safe. This implementation has no username/password login page, but the admin API remains protected by a long server-side `ADMIN_API_KEY`. Never put that key in the public website's `.env`, source control, or hosting build variables exposed to visitors. In production, also put the admin behind VPN/IP restrictions or a proper identity provider.

## 1. MongoDB
Use a local MongoDB instance or create a MongoDB Atlas database. Ensure the URI points to the database you intend to use. The API does not seed demo content; collections start empty.

## 2. Website API
```bash
cd website-backend
npm install
copy .env.example .env
# Edit .env and set MONGODB_URI, CLIENT_ORIGINS, ADMIN_API_KEY and mail settings
npm run dev
```
The API runs on `http://localhost:5000`. Check `http://localhost:5000/api/health`.

## 3. Admin API
```bash
cd admin-backend
npm install
copy .env.example .env
# Use the same MONGODB_URI and ADMIN_API_KEY as the website backend
npm run dev
```
The API runs on `http://localhost:5001`. Check `http://localhost:5001/api/health`.

## 4. Admin dashboard
```bash
cd admin-frontend
npm install
copy .env.example .env
npm run dev
```
Open `http://localhost:5174` if Vite chooses that port; otherwise use the URL printed by Vite. Enter the `ADMIN_API_KEY` value from `admin-backend/.env` into the connection field. This is a key prompt, not a login page.

## 5. Public website
In the project root:
```bash
npm install
copy src/.env.example .env
npm run dev
```
The original website's package file already has the required Vite scripts. The homepage course section and testimonials section now load live records from the API. The contact form stores enquiries in MongoDB and triggers notification emails to the admin and the person enquiring.

## Email configuration
For Gmail, enable 2-step verification and create a Google App Password. Put it in `MAIL_PASS`; do not use your normal Gmail password. Set `ADMIN_EMAIL`, `MAIL_USER`, `MAIL_FROM`, `MAIL_HOST`, and `MAIL_PORT`. If SMTP is not configured, the enquiry is still stored, but email sending will fail and be logged by the backend's `Promise.allSettled` flow.

## Admin features
- Dashboard metrics: courses, blog posts, enquiries, new enquiries, approved reviews and average approved rating.
- Courses: create and delete; records are stored in MongoDB and returned by the public courses endpoint.
- Blogs: create, publish/unpublish and delete; public endpoint only returns published blogs.
- Enquiries: inspect contact details and change status (`new`, `contacted`, `enrolled`, `closed`).
- Reviews: approve/unapprove and delete; public endpoint only returns approved reviews.
- Enquiry form: validates Indian mobile number and stores parent/child/course details; attempts email notification to admin and acknowledgement to user.

## API summary
Public service:
- `GET /api/courses`
- `GET /api/blogs`, `GET /api/blogs/:slug`
- `GET /api/reviews`
- `POST /api/enquiries`
- `POST /api/reviews` (submitted reviews require approval)

Admin service (send `x-admin-key` header):
- `GET /api/admin/overview`
- `GET/POST /api/admin/courses`, `PUT/DELETE /api/admin/courses/:id`
- `GET/POST /api/admin/blogs`, `PUT/DELETE /api/admin/blogs/:id`
- `GET/PATCH/DELETE /api/admin/reviews`, `PATCH /api/admin/reviews/:id`
- `GET /api/admin/enquiries`, `PATCH /api/admin/enquiries/:id`

## Demo content and remaining integration
No fake testimonials are preloaded and no seed script inserts sample records. The homepage course list and testimonial/review section are database-driven. The original blog listing, course detail/pricing content and some other marketing sections still contain presentation copy from the supplied project; replace or connect those remaining sections before production so every public-facing content surface is fully admin-managed. Course prices should be entered as actual prices in admin rather than `₹XXXX`.

## Production checklist
- Use HTTPS, strong unique secrets, a least-privilege MongoDB user and managed backups.
- Restrict admin API network access; do not rely on obscurity of the key alone.
- Add SMTP retry/queueing and monitoring for production.
- Add pagination/search for large enquiry and content collections.
- Configure exact deployed origins in `CLIENT_ORIGINS` and deployed API URLs in both frontend `.env` files.

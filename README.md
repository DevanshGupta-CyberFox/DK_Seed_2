# DK Seeds & Nursery

A responsive plant nursery website with a public catalog and an admin dashboard for full CRUD
management of products, including up to 5 images per product (stored on Cloudinary).

- **Frontend**: React + Vite + Tailwind CSS, React Router
- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **Auth**: JWT stored in an httpOnly cookie, single seeded admin account
- **Images**: Uploaded to Cloudinary; MongoDB stores product data + image URLs/public IDs

## Project Structure

```
nursery/
  server/   Express API, MongoDB models, Cloudinary integration
  client/   React frontend (public catalog + admin dashboard)
```

## Prerequisites

- Node.js 18+
- A MongoDB database (local install or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)
- A free [Cloudinary](https://cloudinary.com/) account (for image storage)

## 1. Backend Setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env` and fill in:

```
MONGODB_URI=your MongoDB connection string
JWT_SECRET=a long random string
CLOUDINARY_CLOUD_NAME=from your Cloudinary dashboard
CLOUDINARY_API_KEY=from your Cloudinary dashboard
CLOUDINARY_API_SECRET=from your Cloudinary dashboard
ADMIN_EMAIL=the email you'll use to log into the admin dashboard
ADMIN_PASSWORD=the password you'll use to log into the admin dashboard
PORT=5000
CLIENT_URL=http://localhost:5173
```

Create the admin account (run once, or again any time to reset the password):

```bash
npm run seed
```

Start the API server:

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

## 2. Frontend Setup

```bash
cd client
npm install
cp .env.example .env
```

`client/.env` should point at the API (default is already correct for local dev):

```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The site runs at `http://localhost:5173`.

## Using the Site

- Visit `/` or `/shop` to browse products as a guest.
- Visit `/admin/login` and sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from your `.env`.
- From `/admin`, create, edit, or delete products. Each product supports up to 5 images —
  drag/select multiple files in the product form, remove individual images, and save.

## Notes

- There is no public registration route — only the seeded admin account can manage products.
- All product mutation routes (`POST/PUT/DELETE /api/products`) require a valid admin session.
- Deleting a product also removes its images from Cloudinary.

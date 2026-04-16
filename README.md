# FAST TRACK: Industrial Logistics & Supply Chain Terminal

![Fast Track Demo](./frontend/public/favicon.svg) <!-- Assuming a favicon/logo exists, placeholder for aesthetics -->

**FAST TRACK** is a full-stack, multi-tenant SaaS application designed to manage industrial inventory, visualize supply chain analytics, and streamline logistics. Built on the MERN stack with a stunning neo-brutalist "dark luxury" industrial UI, it ensures highly secure operator sessions, dynamic data visualizations, and robust data persistence.

## 🚀 Features

- **Multi-Tenant SaaS Architecture**: Strict data isolation. Every operator (user) has a secure database partition for their unique inventory streams.
- **Real-Time Analytics Dashboard**: Fully dynamic `Recharts` graphs calculating live MoM revenue growth, active vendor counts, and category value distributions.
- **Rupee (₹) Localization**: Complete financial metric conversion tailored for the Indian market.
- **Enterprise Data Export**: Single-click Excel (`.xlsx`) report generation mapping both high-level analytics and raw inventory tables into distinct workbook sheets.
- **Dark Luxury Industrial UI**: Near-black backgrounds combined with deep amber accents, incorporating micro-animations, skeleton shimmers, and dynamic toasts for an immersive terminal experience.
- **Secure Authentication**: JWT-based session security with Bcrypt password hashing.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS + Lucide React + Recharts + SheetJS (XLSX)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Mongoose v9 API) + Cloud Atlas
- **Security**: JWT (JSON Web Tokens) + BcryptJS

---

## 💻 Local Development Setup

### 1. Database Configuration
You need a MongoDB connection. The project defaults to looking for a MongoDB Atlas Database.
1. Create an `.env` file in the `backend/` directory.
2. Add your secrets:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/inventorydb
JWT_SECRET=super_secure_secret_key
PORT=5000
```

### 2. Start the Backend API
The backend acts as the data API gateway and authenticates the terminal.
```bash
cd backend
npm install
npm run dev
```
*The server will start on `http://localhost:5000`*

### 3. Start the Frontend Terminal
The frontend uses Vite with an automatic proxy redirecting `/api` calls to your local backend.
```bash
cd frontend
npm install
npm run dev
```
*The interface will launch on `http://localhost:5173`*

---

## 🌍 Production Deployment Guide

This MERN stack application follows the industry-standard decoupled deployment architecture for maximum stability.

### Deploy the Backend (Render.com)
Vercel serverless functions will frequently drop MongoDB connections. Deploy the backend to Render to maintain a continuous database gateway.
1. Connect your repo to Render and spin up a **Web Service**.
2. Root directory: `backend` | Build Command: `npm install` | Start Command: `node server.js`
3. Add your `MONGO_URI` and `JWT_SECRET` environment variables.

### Deploy the Frontend (Vercel)
1. In `frontend/src/App.jsx`, ensure the global Axios BaseURL points to your Live Render URL before deploying:
   ```javascript
   axios.defaults.baseURL = import.meta.env.PROD ? 'https://your-backend.onrender.com' : '';
   ```
2. Connect your repo in Vercel.
3. Root directory: `frontend` | Framework: `Vite` | Build Command: `npm run build`
4. Deploy! Vercel will host your terminal on their lightning-fast global CDN.

---
*© 2026 Fast Track Systems Inc. | Secure Protocol X-45*
# INVNTRY — Product Inventory Management System

A full-stack MERN application with a stunning dark luxury industrial UI.

## Project Structure

- `backend/`: Node.js, Express, MongoDB
- `frontend/`: React, Vite, Axios

## Running Instructions

### 1. MongoDB
Make sure MongoDB is running locally on port 27017:
`mongodb://localhost:27017/inventorydb`

### 2. Backend
```bash
cd backend
npm install
npm run dev
```
Runs on `http://localhost:5000`

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173` (with proxy to port 5000)

## Features & UI
- **Dark Luxury Industrial Theme**: Near-black background with deep amber accents.
- **Micro-animations**: Page load transitions, row interactions, and skeleton shimmers.
- **Real-time Stats**: Live updates of total inventory count and value.
- **CRUD Operations**: Add, Edit (with pre-fill), and Delete (with confirm).
- **Responsive Design**: Optimized for Desktop, Tablet, and Mobile.
- **Custom Toast System**: Elegant notifications for all actions.
- **Typography**: Syne (headings), JetBrains Mono (numbers), DM Sans (body).
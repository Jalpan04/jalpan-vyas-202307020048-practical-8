# Practical 8: Full-Stack E-Commerce Boutique

A premium, full-stack e-commerce application developed as part of the FSD curriculum. This project implements secure authentication, cloud-based image management, and a luxury-themed frontend.

## 🚀 Features

- **JWT Authentication**: Secure user registration and login with hashed passwords (`bcryptjs`) and token-based protected routes.
- **Image Management**: Integrated with **Cloudinary** and **Multer** for reliable product image hosting and dynamic uploads.
- **Payment Mockup**: Simulated secure checkout with a deterministic failure/success rate and custom luxury animations.
- **Responsive Boutique UI**: A sleek, dark-themed frontend built with React and custom CSS, featuring:
  - Product catalog with sorting.
  - Interactive shopping bag (Cart).
  - Smooth SVG purchase animations.
- **API Documentation**: Follows standard REST practices with clear JSON responses.

## 📁 Project Structure

```text
Practical8/
├── backend/          # Express.js & MongoDB Server
│   ├── config/       # Database & Cloudinary configurations
│   ├── controllers/  # API business logic
│   ├── models/       # Mongoose Schemas (User, Product)
│   ├── middleware/   # JWT Auth & Multer setup
│   └── routes/       # API Endpoint definitions
└── frontend/         # React.js (Vite) Client
    ├── src/
    │   ├── api/      # Axios service integrations
    │   ├── components/ # Reusable UI components
    │   ├── context/  # Cart and Auth state management
    │   └── pages/    # Main routing views (Home, Checkout, etc.)
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account
- Cloudinary Account

### 1. Configuration
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### 2. Launch Backend
```bash
cd backend
npm install
npm run dev
```

### 3. Launch Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📝 Submission Details
- **AIM**: Authentication & Testing (Practical 8)
- **ID**: jalpan-vyas-202307020048
- **Platform**: Full-stack Integration

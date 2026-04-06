# Glam Store: Full-Stack E-Commerce Platform

A high-performance, full-stack e-commerce application featuring a luxury dark-themed UI, secure JWT authentication, and cloud-based media integration.

## Core Features

- Secure User Authentication: Implemented via JWT with bcrypt encryption for password security.
- Cloud Product Hosting: Integrated with Cloudinary and Multer for managed media storage.
- Interactive Shopping Experience: Dynamic product catalog with global cart state management.
- Secure Checkout: Simulated transactional workflow with a mock payment processor and custom purchase animations.
- Responsive Luxury Architecture: Sleek, high-fidelity UI built from the ground up to ensure aesthetic excellence.

---

## Tech Stack

- **Frontend**: React.js / Vite
- **Backend**: Node.js / Express.js
- **Database**: MongoDB Atlas
- **Cloud Media**: Cloudinary
- **State Management**: React Context API
- **Tooling**: Axios, JWT-Decode, Express-Validator

---

## Quick Start 

### Configuration
1. Clone the repository to your local environment.
2. Navigate to the backend directory and create a .env file with the following keys:
   - PORT
   - MONGO_URI
   - JWT_SECRET
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET

### Installation
Install dependencies for both the frontend and backend of the application:
```bash
# Backend setup
cd backend
npm install

# Frontend setup
cd frontend
npm install
```

### Development
Launch both the API and client-side application:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend development client
cd frontend
npm run dev
```

---

## Project Organization

- **backend/**: Contains the Express API, Mongoose models, and cloud configurations.
- **frontend/**: Contains the React source code, global state providers, and boutique style assets.

---

## Author
Jalpan Vyas
FSD Full-Stack E-Commerce Project
github.com/Jalpan04

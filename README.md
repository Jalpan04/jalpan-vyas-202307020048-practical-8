# Practical 8: Authentication and Testing - Full-Stack E-Commerce

## Aim
To implement and validate a secure, full-stack e-commerce application with user authentication, cloud-based media storage, payment processing simulations, and comprehensive API testing.

## Core Features and Implementation

### User Authentication (JWT)
- Registration and Login APIs with input validation via `express-validator`.
- Secure password storage using `bcryptjs` for multi-layered hashing.
- State-managed authentication using JSON Web Tokens (JWT) for session persistence across the React frontend and Express backend.

### Cloud Integration (Cloudinary & Multer)
- Integrated `multer-storage-cloudinary` for automated product image hosting on a cloud CDN.
- Products across the platform utilize high-resolution images served globally via Cloudinary.

### Payment System Mockup
- Simulated secure checkout and refund processing via a dedicated payment controller.
- Deterministic response handling for "Insufficient Funds" and "Success" states to allow testing of frontend error handling logic.
- Custom SVG animations to provide visual purchase confirmation upon successful transactions.

### Full-Stack Architecture
- **Frontend**: A high-performance React application built with Vite, leveraging Context API for global cart and authentication state.
- **Backend**: A modular Express.js server connected to a MongoDB Atlas cluster, adhering to a clear Route-Model-Controller (RMC) pattern.

---

## Technical Specifications

### Project Structure
- backend/ : Server logic, API routes, database schemas, and configuration.
- frontend/ : Client-side implementation, state management, and luxurious dark-themed UI.

---

## Installation & Deployment

### Local Setup
1. Clone the repository into your local workspace.
2. Complete the configuration by creating a `.env` file in the `backend/` directory with your MongoDB and Cloudinary credentials.
3. Install dependencies in both the `backend/` and `frontend/` directories via `npm install`.
4. Launch the application in development mode using `npm run dev` in both folders.

### Submission Links
- GitHub: [https://github.com/Jalpan04/jalpan-vyas-202307020048-practical-8](https://github.com/Jalpan04/jalpan-vyas-202307020048-practical-8)
- Deployed Project: (Pending deployment to Render/Vercel)

---

## Author
Jalpan Vyas
practical-8 (202307020048)
FSD Curriculum

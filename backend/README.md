# Practical 8: Authentication & Testing

## Overview
This project implements a secure E-Commerce Backend API featuring JWT-based authentication, product management with Cloudinary image uploads, and a simulated payment gateway.

## Features
- **JWT Authentication**: Secure user registration and login with bcrypt password hashing.
- **Image Upload**: Integration with Cloudinary via Multer for high-performance image storage.
- **Payment Mockup**: Simulated payment processing with success/failure scenarios.
- **Input Validation**: Robust data validation using `express-validator`.
- **Database**: MongoDB Atlas for persistent storage.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JSON Web Tokens (JWT), Bcrypt.js
- **Storage**: Cloudinary, Multer
- **Validation**: express-validator

## Project Structure
```text
Practical8/
├── config/             # Database & Cloudinary configuration
├── controllers/        # Business logic for auth, products, and payments
├── middleware/         # Authentication and Upload middlewares
├── models/             # Mongoose schemas (User, Product)
├── routes/             # API endpoint definitions
├── .env                # Environment variables (Secrets)
├── server.js           # Server entry point
└── README.md           # Documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-repo-link>
   cd practical-8-auth-testing
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=7d
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Run the server:**
   - Development mode: `npm run dev`
   - Production mode: `npm start`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create a new account
- `POST /api/auth/login` - Authenticate user and get token
- `GET /api/auth/profile` - Get current user data (Private)

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create a product with image (Private/Admin)
- `PUT /api/products/:id` - Update product (Private)
- `DELETE /api/products/:id` - Delete product (Private)

### Payments
- `POST /api/payment/checkout` - Process a secure payment (Mock)
- `POST /api/payment/refund` - Initiate a refund (Mock)

## License
MIT License

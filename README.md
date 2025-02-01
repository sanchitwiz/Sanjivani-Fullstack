# Sanjivani

Sanjivani is a full-stack web application designed to provide healthcare solutions. The project consists of a React-based frontend and a Node.js backend with Prisma as the ORM.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)

## Features
- User authentication and authorization
- Medical data management
- Wound classification using a Vision Transformer model
- Integration with Prisma ORM for database operations
- Responsive UI for easy navigation

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js, Prisma ORM
- **Database:** PostgreSQL / MySQL (depending on configuration)
- **Machine Learning Model:** Vision Transformer for wound classification
- **Deployment:** Render (for backend & model), Vercel (for frontend)

## Folder Structure
```
Sanjivani/
├── backend/      # Node.js server
│   ├── prisma/   # Prisma ORM schema and migrations
│   ├── routes/   # API routes
│   ├── models/   # Database models
│   ├── controllers/ # Request handlers
│   ├── server.js # Main server file
│   └── package.json
├── frontend/     # React client
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Application pages
│   │   ├── utils/      # Helper functions
│   │   ├── App.js      # Main app component
│   │   └── index.js    # React entry point
│   ├── package.json
│   ├── tailwind.config.js
└── README.md
```

## Setup Instructions

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file and set up your database connection:
   ```sh
   DATABASE_URL="your-database-url"
   PORT=5000
   ```
4. Run database migrations:
   ```sh
   npx prisma migrate dev
   ```
5. Start the server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm start
   ```

## API Endpoints
| Method | Endpoint          | Description |
|--------|------------------|-------------|
| POST   | /api/auth/login  | User login |
| POST   | /api/auth/signup | User registration |
| GET    | /api/user        | Get user details |
| POST   | /api/upload      | Upload wound images |
| GET    | /api/prediction  | Get model prediction |

## Deployment
- **Backend Deployment:** Render
- **Frontend Deployment:** Vercel
- **ML Model Weights:** Stored in Google Drive, loaded into the backend

To deploy, follow Render and Vercel documentation for respective services.

---

This README provides a structured overview of the project. Modify it as needed based on additional features or changes in the setup.


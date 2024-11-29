# LMS

## Description

This is a simple Learning Management System (LMS) application that allows students to select courses and view their selected courses on the dashboard. Admins can manage courses and lectures through CRUD operations.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Authentication and Roles](#authentication-and-roles)
  - [JWT-Based Authentication](#jwt-based-authentication)
  - [Roles](#roles)
- [Seeder Script](#seeder-script)
- [Admin Credentials](#admin-credentials)

---

## Features

- **Admin Capabilities**:
  - Create, update, delete courses and lectures.
  - View all courses and lectures.
- **Student Capabilities**:
  - Select up to 3 courses.
  - View their selected courses and associated lectures.

---

## Technologies Used

- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** React.js

---

## Installation

### Backend Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/lms.git
    cd backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

    ```env
    MONGOURL=your-mongodb-connection-string
    JWT_SECRET=your-jwt-secret-key
    ```

   - Replace `your-mongodb-connection-string` with your MongoDB connection string.
   - Replace `your-jwt-secret-key` with a secure secret key for signing JWTs.

4. **Run the backend server:**

    ```bash
    npm run server
    ```

   The backend server will be running at [http://localhost:8080](http://localhost:8080) by default.

### Frontend Setup

1. **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the frontend application:**

    ```bash
    npm start
    ```

   The frontend application will be running at [http://localhost:3000](http://localhost:3000).

---

## Authentication and Roles

### JWT-Based Authentication

This application uses **JWT (JSON Web Tokens)** for secure authentication and role-based access control.  

1. **Token Generation:**
   - On successful login, the server generates a JWT using the user's ID and role.
   - The token is signed with a secret key defined in the `.env` file (`JWT_SECRET`).

2. **Token Validation:**
   - Each request to a protected route requires the token in the `Authorization` header as `Bearer <token>`.
   - The server validates the token to allow or deny access.

3. **Token Expiration:**
   - The token includes an expiration time to ensure security. Users must log in again once the token expires.

### Roles

1. **Admin**:
   - Full access to all features.
   - Can manage (create, update, delete) courses and lectures.
   - Can view all courses, lectures, and student enrollments.

2. **Student**:
   - Limited access based on role.
   - Can select up to 3 courses and view their lectures.
   - Cannot modify or delete courses and lectures.

**Middleware**:
- Role-based access is implemented using custom middleware.
- Example: Admin-only routes require a valid token with the `Admin` role.

---

## Seeder Script

To populate the database with initial data (courses, users, lectures, etc.):

1. **Ensure the backend server is connected to the database.**

2. **Run the seeder script:**

    ```bash
    node seed.js
    ```

   The script will:
   - Create an admin user and sample student accounts.
   - Add predefined courses and lectures.
   - Link courses, lectures, and students.

3. **Verify Data:**
   Use tools like MongoDB Compass or a CLI to confirm that the data has been seeded successfully.

---

## Admin Credentials

To access the admin features of this project, use the following credentials:

- **Email:** `admin@example.com`
- **Password:** `Admin123`

> Passwords are securely hashed in the database using bcrypt. Use the `/user/login` endpoint to log in and receive a JWT token for authentication.

---

# 🏫 School Directory - Full-Stack Application

A complete full-stack web application for managing a directory of schools. Users can view, add, and delete school listings. The frontend is built with **React**, and the backend uses **Node.js**, **Express**, and **MySQL**.

This project showcases full-stack development skills including database design, REST API architecture, frontend state management, and user-centric features like notifications and error handling.

---

## 📚 Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Flow](#project-flow)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Database Setup](#database-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)

---

## 🚀 Live Demo

> _Link to your deployed Vercel application will go here once deployed._

---

## ✨ Features

- **View All Schools**: Displays all schools from the database in a responsive grid.
- **Add a New School**: Form to add school details with image upload.
- **Delete a School**: Remove a school listing by ID.
- **Image Uploads**: Efficient image handling with server-side storage.
- **Duplicate Prevention**: Prevents adding schools with duplicate names.
- **Orphan File Prevention**: Ensures images are saved only if DB entry succeeds.
- **User Notifications**: Animated alerts for success, errors, and warnings.
- **Responsive Design**: Works seamlessly across devices.

---

## 🛠 Tech Stack

### Frontend

- React
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express
- Multer (for image uploads)
- CORS
- dotenv

### Database

- MySQL

---

## 🔄 Project Flow

1. **Client (React)**: User interacts with the UI.
2. **API Request**: Axios sends HTTP requests to backend.
3. **Server (Express)**: Handles logic, validation, and file uploads.
4. **Database (MySQL)**: Stores and retrieves school data.
5. **API Response**: Sends JSON response back to frontend.
6. **UI Update**: React updates UI and shows notifications.

---

## 🧰 Getting Started

### ✅ Prerequisites

Make sure you have the following installed:

- Node.js (v18+)
- npm
- Git
- MySQL Server

---

### 🗃️ Database Setup

```sql
CREATE DATABASE school_directory;

USE school_directory;

CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    contact VARCHAR(20),
    image VARCHAR(255),
    email_id VARCHAR(255)
);
```

## Backend & Frontend Setup and API Endpoints

1. Clone the repository: `git clone <your-repo-url>`
2. Navigate to the backend directory: `cd Reno-Platforms/backend`
3. Install NPM packages: `npm install`
4. Create a `.env` file in the backend directory with your database credentials:

DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DATABASE=school_directory
DB_PORT=3306

5. Start the backend server: `node server.js`  
   Your backend should now be running on `http://localhost:5000`.
6. Open a new terminal and navigate to the frontend directory: `cd Reno-Platforms/frontend`
7. Install NPM packages: `npm install`
8. Create a `.env.local` file in the frontend directory with the following content:

9. Start the frontend development server: `npm run dev`  
   Your React application should now be running and accessible at `http://localhost:5173` (or another port if 5173 is in use).

### API Endpoints

| Method | Endpoint         | Description                          |
| ------ | ---------------- | ------------------------------------ |
| GET    | /api/schools     | Retrieves a list of all schools.     |
| POST   | /api/schools     | Adds a new school to the database.   |
| DELETE | /api/schools/:id | Deletes a specific school by its ID. |

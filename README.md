# AppDev Project

Full-stack web application built with Vue (Frontend) and Node.js + Express (Backend).

---

## 🛠 Tech Stack

### Frontend
- Vue 3
- Vite
- Axios
- Vue Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## 📂 Project Structure

project/
│
├── backend/        # Express API server
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── app.js
│
├── frontend/       # Vue application
│   ├── src/
│   └── vite.config.js
│
└── README.md

---

## ⚙️ Backend Overview

The backend provides RESTful APIs for:

- User authentication
- Product management
- Order handling

Base API URL:
http://localhost:5000/api

Example routes:

GET    /api/products  
POST   /api/auth/login  
POST   /api/orders  

---

## 🚀 How to Run

### 1️⃣ Clone Repository

git clone <repo-url>
cd project

---

### 2️⃣ Run Backend

cd backend
npm install
npm start

---

### 3️⃣ Run Frontend

cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

---


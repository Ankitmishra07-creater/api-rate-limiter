# API Rate Limiter Dashboard

A full-stack web application that demonstrates how an API Rate Limiter works.
It allows users to sign up, log in, and simulate API requests while limiting the number of allowed requests.
The dashboard also visualizes request activity in real time.

## 🚀 Features

* User **Signup and Login**
* **API Request Limiting** (maximum request threshold)
* **Live Request Log**
* **Real-time Chart Analytics**
* **Reset Request Counter**
* Interactive **Dashboard UI**

## 🛠 Technologies Used

### Frontend

* React (Vite)
* Recharts (for charts)
* CSS

### Backend

* Spring Boot
* Java
* REST APIs

### Tools

* Git
* GitHub
* Visual Studio Code

## 📂 Project Structure

api-rate-limiter
│
├── backend
│   ├── src
│   └── pom.xml
│
├── frontend
│   ├── src
│   ├── package.json
│   └── vite.config.js
│
└── README.md

## ⚙️ How to Run the Project

### 1. Clone the repository

git clone https://github.com/YOUR_USERNAME/api-rate-limiter.git

### 2. Run Backend (Spring Boot)

cd backend
mvn spring-boot:run

Backend runs on:
http://localhost:8081

### 3. Run Frontend (React + Vite)

cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

## 📊 How It Works

1. User signs up or logs in.
2. Dashboard allows sending API requests.
3. The backend counts the requests.
4. If the request limit is reached, further requests are blocked.
5. Logs and charts update in real time.

## 🎯 Learning Purpose

This project demonstrates:

* API rate limiting logic
* Full-stack development
* REST API communication
* Real-time UI updates using React

## 👨‍💻 Author

Ankit Kumar

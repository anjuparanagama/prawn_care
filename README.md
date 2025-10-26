# 🦐 Prawn Farming Management System

A modern, full-stack **smart aquaculture management platform** designed to streamline prawn farm operations — from water quality monitoring to order management and analytics. 🌊

---

## 🚀 Features

### 🌿 **Farm Management**
- Real-time monitoring of **water quality**, **temperature**, and **oxygen levels** using IoT sensors    
- Feeding schedules and inventory tracking

### 👨‍🌾 **Employee & Task Management**
- Assign and monitor worker tasks  
- Manage roles: **Owner**, **Manager**, **Workers**, **Suppliers**, **Customers**  
- Track performance and daily activities

### 💧 **Water Quality & IoT Integration**
- IoT-based sensor readings via ESP32  
- Data sent to backend every few hours  
- Visualization dashboard for trends and alerts  

### 🛒 **Order & Customer Management**
- View, approve, and track customer orders  
- Real-time order tracking and notifications  
- Payment options: **Online Gateway** & **Cash on Delivery**

### 📈 **Analytics & Reports**
- Monthly sales reports  
- Environmental condition summaries  
- Resource and workforce analytics  

---

## 🧱 System Architecture

```mermaid
graph TD;
A[IoT Sensors] -->|C language| B[Node.js Backend]
B --> C[MySQL Database]
B --> E[MongoDB]
C --> F[Next.js Web App]
D --> F
E --> G[Flutter Mobile App]


## Getting Started

First, run the development server:

```bash
yarn install
# and
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

Backend Code Repository Link :- https://github.com/anjuparanagama/prawncare_backend.git

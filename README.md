# Smart Meet - Premium Video Conferencing App

Smart Meet is a modern, secure, and feature-rich video conferencing application built with the MERN stack (MongoDB, Express, React, Node.js) and powered by Agora for real-time video/audio and Socket.io for signaling.

## 🚀 Features

- **High-Quality Video & Audio**: Crystal clear communication powered by Agora RTC.
- **Secure & Private**: Authentication and room protection.
- **Modern Glassmorphism UI**: Beautiful, responsive, and animated interface.
- **Instant & Scheduled Meetings**: Join with a code or plan for later.
- **Real-time Chat**: Integrated messaging within meeting rooms.
- **Screen Sharing**: Collaborative sharing capabilities.
- **Dashboard**: User-friendly dashboard to manage meetings.

## 🛠 Tech Stack

**Client:**
- React.js (Vite)
- Bootstrap 5 & Custom CSS (Glassmorphism)
- Framer Motion (Animations)
- Socket.io Client
- Agora RTC React SDK

**Server:**
- Node.js & Express
- MongoDB (Atlas)
- Socket.io
- JSON Web Token (JWT)

## 📂 Project Structure

```
/client       # React Frontend
/server       # Node.js Backend
```

## ⚡ Local Development Setup

To run the project locally without errors, follow these steps:

### Prerequisites
- Node.js (v16 or higher)
- npm or pnpm
- A MongoDB Atlas Account
- An Agora Account (App ID)

### 1. Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory and add your credentials:
   ```env
   PORT=6001
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:6001`.

### 2. Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update `src/AgoraSetup.js` with your Agora App ID:
   ```javascript
   const appId = "YOUR_AGORA_APP_ID"; 
   ```
4. Update `src/context/SocketContext.jsx` with your local server URL:
   ```javascript
   const WS = 'http://localhost:6001';
   ```
5. Start the client:
   ```bash
   npm run dev
   ```
   Client will run on `http://localhost:5173`.

---

## 🌍 Deployment Guide

We recommend deploying the **Frontend to Vercel** and the **Backend to Render** for the best experience and free tier availability.

### 🚀 Step 1: Deploy Backend (Render)

1. Push your code to a GitHub repository (root folder containing both client and server).
2. Go to [Render Dashboard](https://dashboard.render.com/) -> **New** -> **Web Service**.
3. Connect your GitHub repository.
4. **Settings**:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js` (or `npm start`)
5. **Environment Variables**:
   Add the following variables in the Render dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: Any secret string.
   - `PORT`: `10000` (Render default).
6. Click **Deploy**. Render will provide you a URL (e.g., `https://smart-meet-api.onrender.com`).

### 🚀 Step 2: Deploy Frontend (Vercel)

1. Go to [Vercel Dashboard](https://vercel.com/) -> **Add New** -> **Project**.
2. Import your GitHub repository.
3. **Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `client` (Edit this!)
4. **Environment Variables**:
   - You need to update the Socket URL in your code to point to your new Render Backend URL instead of localhost.
   - *Best Practice*: Create a `.env` in client and use `import.meta.env.VITE_SERVER_URL`.
   - Update `SocketContext.jsx`:
     ```javascript
     const WS = import.meta.env.VITE_SERVER_URL || 'http://localhost:6001';
     ```
   - Add `VITE_SERVER_URL` = `https://smart-meet-api.onrender.com` in Vercel.
5. Click **Deploy**.

**Congratulations! Your Premium Video App is now live!** 🎉

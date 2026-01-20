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

**Congratulations! Your Premium Video App is now live!** 🎉

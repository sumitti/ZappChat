# ZappChat 🚀

A modern, full-stack real-time chat application built with React, Express, MongoDB, Socket.IO, and TailwindCSS.

---

## Features

- 🔒 **Authentication:** Secure signup, login, and JWT-based session management.
- 💬 **Real-Time Messaging:** Instant messaging powered by Socket.IO.
- 🖼️ **Image Sharing:** Send and receive images in chat (Cloudinary integration).
- 🟢 **Online Status:** See which users are online in real time.
- 🧑‍🤝‍🧑 **User Sidebar:** Easily select users to chat with.
- 🎨 **Responsive UI:** Beautiful, mobile-friendly design with TailwindCSS and DaisyUI.
- ⚡ **State Management:** Fast and simple state management using Zustand.
- 🛡️ **Protected Routes:** Only authenticated users can access chat features.

---

## Live Demo 🌐

👉 [Try ZappChat Live](https://zappchat-1z4w.onrender.com)

---

## Tech Stack ⚙️

- **Frontend:** React, Vite, Zustand, TailwindCSS, DaisyUI, Axios, Socket.IO Client
- **Backend:** Express, MongoDB, Mongoose, Socket.IO, Cloudinary, JWT, bcryptjs
- **Deployment:** Render (or any cloud platform)

---

## Getting Started ⚒️

### 1. Clone the Repository

```bash
git clone https://github.com/sumitti/ZappChat.git
cd ZappChat
```

### 2. Create .env files

```bash
MONGODB_URI=your_mongodb_uri
PORT=5001
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

### 3. Install Dependencies

```bash
npm install --prefix backend
npm install --prefix frontend
```

### 4. Run the App Locally
#### Start Backend:
```bash
npm run dev --prefix backend
```
#### Start Frontend:
```bash
npm run dev --prefix frontend
```
----

### Folder Structure 🗃️
```bash
ZappChat/
├── backend/
│   ├── src/
│   │   ├── controller/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── lib/
│   │   └── index.js
│   ├── .env
│   └── [package.json]
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── store/
│   │   └── App.jsx
│   ├── .env
│   └── [package.json]
└── [README.md]
```
---
#### Contributing ✨
 Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

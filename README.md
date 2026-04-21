# Full Stack Experiments

**Name:** Sujal Gulati  
**UID:** 24BDA70318

---

## Exp 2.3.1 – MERN Stack Product Listing App

A full-stack MERN application that fetches and displays products from a MongoDB (in-memory) database via a REST API.

**Tech Stack:** MongoDB (MongoMemoryServer), Express.js, React (Vite), Node.js, Axios, Bootstrap

**Features:**
- Express REST API (`GET /api/products`, `POST /api/seed`)
- React frontend with loading spinner and error handling
- One-click database seeding from the UI

**Setup:**
```bash
# Backend
cd EXP\ 2.3.1
npm install
node server.js

# Frontend
cd mern-experiment/frontend
npm install
npm run dev
```

---

## Exp 2.3.2 – Redux Toolkit Shopping Cart

A React app demonstrating global state management using Redux Toolkit with localStorage persistence.

**Tech Stack:** React, Redux Toolkit, localStorage

**Features:**
- Add, remove, and update item quantity in cart
- Cart state persisted to `localStorage`
- Centralized store with `cartSlice`

**Setup:**
```bash
cd Exp\ 2.3.2
npm install
npm start
```

---

## Exp 2.3.3 – Real-Time Chat App (Socket.IO)

A real-time multi-user chat application using WebSockets.

**Tech Stack:** React, Node.js, Express, Socket.IO, Material UI

**Features:**
- Real-time messaging via Socket.IO
- Join/leave notifications
- Typing indicator
- Online users sidebar
- Auto-scroll to latest message

**Setup:**
```bash
# Backend
cd Exp\ 2.3.3/chat-app/backend
npm install
node server.js

# Frontend
cd Exp\ 2.3.3/frontend
npm install
npm start
```

---

## Repository Setup

```bash
echo "# fsexp7" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/sujalgulati8059-droid/fsexp7.git
git push -u origin main
```

# 💬 Firebase Chat Room App

A real-time chat application built with **React** and **Firebase**.  
Users can create or join chat rooms, authenticate using Firebase Auth, and chat with other users instantly.

---

## 🚀 Features

- 🔐 **User Authentication** (Sign In / Sign Out)
- 💬 **Real-time Chat** using Firebase Firestore
- 🏠 **Chat Rooms** — multiple users can join the same room
- 👥 **Chats sync instantly** when two different accounts are in the same room
- 📱 **Responsive UI** for smooth chatting experience
- 🟢 **Online/Active User Experience**

---

## 🛠️ Tech Stack

- **React.js**
- **Firebase**
  - Firebase Authentication
  - Firestore Database
- **CSS / Tailwind / Custom styles** (whichever you used)

---

## 🔧 Firebase Setup

Create a `.env.local` file in the project root and add your own Firebase web app values:

```bash
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

The app now reads Firebase settings from environment variables, so the previous project is no longer hardcoded in source.



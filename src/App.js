import React, { useState, useEffect } from "react";
import { Auth } from "./components/Auth";
import Chat from "./components/Chat"; 
import Cookies from "universal-cookie";
import { auth } from "./firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import "./App.css";

const cookies = new Cookies();

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  
  // FIX 1: Read from localStorage first so refreshing doesn't lose your room!
  const [room, setRoom] = useState(localStorage.getItem("activeRoom") || "general"); 
  const [roomsList, setRoomsList] = useState(["general", "react", "javascript", "projects", "soso"]);
  const [newRoom, setNewRoom] = useState("");
  
  // FIX 2: Create a state to wait for Firebase to load before rendering the UI
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  // FIX 3: Safely check auth state so the app doesn't crash on refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        cookies.set("auth-token", user.refreshToken);
      } else {
        cookies.remove("auth-token");
      }

      setIsAuth(!!user);
      setIsUserLoaded(true);
    });
    return () => unsubscribe();
  }, []);

  // FIX 4: Save the room to localStorage instantly every time you click a new room
  useEffect(() => {
    if (room) {
      localStorage.setItem("activeRoom", room);
    }
  }, [room]);

  const activeRoomLabel = room.charAt(0).toUpperCase() + room.slice(1);

  const handleLogout = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom("general");
    localStorage.removeItem("activeRoom"); // Clear memory on logout
  };

  const handleCreateRoom = () => {
    // FIX 5: Force strict lowercase so phones and laptops always match exactly
    const trimmedRoom = newRoom.trim().toLowerCase(); 
    if (trimmedRoom !== "") {
      if (!roomsList.includes(trimmedRoom)) {
        setRoomsList([...roomsList, trimmedRoom]);
      }
      setRoom(trimmedRoom);
      setNewRoom("");
    }
  };

  if (!isAuth) {
    return (
      <div className="auth-wrapper">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  // FIX 6: Show a quick loading screen so the profile pic doesn't break the app
  if (!isUserLoaded) {
    return (
      <div className="loading-state">
        <div className="loading-card">
          <span className="loading-kicker">Connecting securely</span>
          <h3>Loading your chat</h3>
          <p>Restoring your room and session.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-layout">
      
      {/* LEFT COLUMN: Sidebar Navigation */}
      <div className="sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-eyebrow">Workspace</span>
          <h2>Chat Rooms</h2>
          <p>Switch rooms or create a fresh space for the conversation.</p>
        </div>
        
        <div className="create-room-box">
          <input 
            type="text" 
            placeholder="Create or join a room" 
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
            className="create-room-input"
          />
          <button onClick={handleCreateRoom} className="create-room-btn">Create</button>
        </div>

        <div className="room-list">
          {roomsList.map((r) => (
            <button 
              key={r} 
              type="button"
              className={`room-item ${room === r ? "active" : ""}`}
              onClick={() => setRoom(r)}
            >
              <span className="room-hash">#</span>
              <span>{r.charAt(0).toUpperCase() + r.slice(1)}</span>
            </button>
          ))}
        </div>

        <div className="user-profile">
          {auth.currentUser?.photoURL && (
            <img src={auth.currentUser.photoURL} alt="Profile" className="profile-pic" />
          )}
          <div className="profile-info">
            <span className="profile-label">Signed in as</span>
            <span className="profile-name">{auth.currentUser?.displayName || "User"}</span>
            <span className="profile-email">{auth.currentUser?.email}</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      {/* RIGHT COLUMN: Active Chat Feed */}
      <div className="main-chat-area">
        <Chat room={room} roomLabel={activeRoomLabel} />
      </div>

    </div>
  );
}

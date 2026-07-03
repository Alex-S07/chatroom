import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import "../styles/Auth.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="auth">
      <div className="auth-card">
        <span className="auth-kicker">Realtime chat</span>
        <h1>Sign in to keep the room moving.</h1>
        <p>Use your Google account to join the live conversation, switch rooms, and keep your messages synced.</p>
        <button onClick={signInWithGoogle}>Continue with Google</button>
      </div>
    </div>
  );
};
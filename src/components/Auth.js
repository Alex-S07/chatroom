import { auth, provider } from "../firebase-config.js";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import "../styles/Auth.css";
import Cookies from "universal-cookie";
import { useState } from "react";

const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const [authError, setAuthError] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const signInWithGoogle = async () => {
    setAuthError("");
    setIsSigningIn(true);

    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
      if (err?.code === "auth/popup-blocked" || err?.code === "auth/cancelled-popup-request") {
        try {
          await signInWithRedirect(auth, provider);
          return;
        } catch (redirectErr) {
          console.error(redirectErr);
          setAuthError("Sign-in was blocked. Try allowing popups or use a browser where Google sign-in is enabled.");
        }
      } else if (err?.code === "auth/unauthorized-domain") {
        setAuthError("This domain is not authorized in Firebase Authentication. Add your current site URL in the Firebase console.");
      } else if (err?.code === "auth/configuration-not-found" || err?.code === "auth/operation-not-allowed") {
        setAuthError("Google sign-in is not enabled for this Firebase project. Turn on Google provider in Firebase Authentication.");
      } else {
        setAuthError("Sign-in failed. Check Firebase Authentication settings and the browser console for details.");
      }
    } finally {
      setIsSigningIn(false);
    }
  };
  return (
    <div className="auth">
      <div className="auth-card">
        <span className="auth-kicker">Realtime chat</span>
        <h1>Sign in to keep the room moving.</h1>
        <p>Use your Google account to join the live conversation, switch rooms, and keep your messages synced.</p>
        {authError && <p className="auth-error">{authError}</p>}
        <button onClick={signInWithGoogle} disabled={isSigningIn}>
          {isSigningIn ? "Signing in..." : "Continue with Google"}
        </button>
      </div>
    </div>
  );
};
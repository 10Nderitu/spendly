import React from "react";
import {auth, provider} from "../../config/firebase";
import {signInWithPopup} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
    const navigate = useNavigate();

    const signIn = async () => {
        const results = await signInWithPopup(auth, provider);
        console.log(results);
        const authInfo = {
            displayName: results.user.displayName,
            email: results.user.email,
            photoURL: results.user.photoURL,
            uid: results.user.uid,
        };
        localStorage.setItem("auth", JSON.stringify(authInfo));
        navigate("/dashboard");
    }
  return (
    <div className="login-page">
      <p>Sign In with Google to continue</p>
      <button className="login-button" onClick={signIn}>
        Sign In with Google
      </button>
    </div>
  );
};

import React from "react";
import { auth, provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
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
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome Back!</h1>
        <p className="mb-6 text-gray-600">
          Sign in with Google to access your dashboard
        </p>
        <button
          onClick={signIn}
          className="flex items-center justify-center gap-2 w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 transition rounded-lg shadow-md"
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
};


import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import myAuth from "../firebaseConfig";

function Authentication({onSuccess}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true); // Whether it's a sign-up or sign-in mode
  const [error, setError] = useState(null);

  const auth = getAuth(myAuth); // Get Firebase Auth instance

  const handleAuthentication = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        // Sign-up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up:", userCredential.user);
      } else {
        // Sign-in
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in:", userCredential.user);
      }
      onSuccess();
      // Handle successful sign-up/sign-in (e.g., navigate to the note-taking app)
    } catch (error) {
      setError(error.message); // Set error message in state
      console.error("Authentication error:", error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={handleAuthentication}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
      </p>
    </div>
  );
}

export default Authentication;

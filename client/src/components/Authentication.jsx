
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import myAuth from "../firebaseConfig";

function Authentication({onSuccess}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true); // Whether it's a sign-up or sign-in
  const [error, setError] = useState(null);

  const auth = getAuth(myAuth); // Get Firebase Auth instance

  const handleAuthentication = async (event) => {
    event.preventDefault();
    try {
      if (isSignUp) {
        // check console for success
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up:", userCredential.user);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in:", userCredential.user);
      }
      onSuccess();
      // checks to see if log-in worked. Gets routed back to App.jsx to see if we show this page or the App
    } catch (error) {
      setError(error.message); 
      console.error("Auth failed!", error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2> {/*took me an embarrassing amount of time to figure out I can write the conditional like this */}
      <form onSubmit={handleAuthentication}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
      </form>
      {error && <p className="error here">{error}</p>}
      <p onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Sign in here!" : "Don't have an account? Sign up"}
      </p>
    </div>
  );
}

export default Authentication;

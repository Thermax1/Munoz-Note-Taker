import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateNote from "./CreateNote";
import Authentication from "./Authentication";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import myAuth from "../firebaseConfig";

function App() {
  const [notes, setNotes] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false); // upon page opening, we check to see if the user has logged in to access the page
  const auth = getAuth(myAuth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        fetchNotes();
      } else {
        setLoggedIn(false);
        setNotes([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      setLoggedIn(false);
    }).catch((error) => {
      console.error("Logout error:", error);
    });
  };

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/notes"); // Fetch notes from the backend
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addNote = async (newNote) => {
    try {
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newNote)
      });

      const data = await response.json();
      setNotes([...notes, data]); // Update the notes state with the new note
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "DELETE"
      });

      setNotes(notes.filter((note) => note._id !== id)); // Update notes state after deletion
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div>
      <Header />

      {loggedIn ? (
      <div>
      <CreateNote onAdd={addNote} />
      {notes.map((note) => (
        <Note
          key={note._id}
          id={note._id}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  ) : (
    <Authentication onSuccess={handleSignIn} />
  )}
  </div>
  );
}

export default App;

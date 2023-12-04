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
  const [loggedIn, setLoggedIn] = useState(false); //able to see if user logged in or not
  const auth = getAuth(myAuth); //my firebase configuration

  useEffect(() => {
    const userOut = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);//person logged in
        fetchNotes(); //current notes get loaded
      } else {
        setLoggedIn(false);
        setNotes([]);
      }
    });

    return () => userOut();
  }, []);

  const handleSignIn = () => { //like handleEvent or handleClick
    setLoggedIn(true);
  };

  const handleLogout = () => { //what runs when logout is clicked
    signOut(auth).then(() => {
      setLoggedIn(false);
    }).catch((error) => {
      console.error("Logout error:", error);
    });
  };

  const fetchNotes = async () => {
    try {
      const response = await fetch("https://cs641-munoz.cyclic.app/api/notes"); // Fetch notes from the backend
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addNote = async (newNote) => {
    try {
      const response = await fetch("https://cs641-munoz.cyclic.app/api/notes", {
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
      await fetch(`https://cs641-munoz.cyclic.app/api/notes/${id}`, { //delete via ID to make sure its correct
        method: "DELETE"
      });

      setNotes(notes.filter((note) => note._id !== id)); // notes state is updated to reflect the deletions
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div>
      <Header />

      {loggedIn ? ( //use ternary operators like we did in class
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
    <Authentication onSuccess={handleSignIn} /> //render Authentication page otherwise until sign-in, making the notes app appear
  )}
  </div>
  );
}

export default App;

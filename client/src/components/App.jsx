import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateNote from "../components/CreateNote";

function App() {
  const [notes, setNotes] = useState([]); //using notes.js

  function addNote(myNote) {
    setNotes((lastNote) => {
      return [...lastNote, myNote];
    });
  }

  function deleteNote(id) {
    setNotes((lastNote) => {
      return lastNote.filter((note, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateNote onAdd={addNote} />
      {notes.map((note, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;

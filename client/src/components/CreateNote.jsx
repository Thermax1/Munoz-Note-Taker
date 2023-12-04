import React, { useState } from "react";

function CreateNote({ onAdd }) {
  const [newNote, setNewNote] = useState({
    title: "",
    content: ""
  });

  // Function to handle input changes and update state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewNote((prevNote) => ({
      ...prevNote,
      [name]: value
    }));
  };

  // adds the new note to the backend
  const submitNote = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://cs641-munoz.cyclic.app/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newNote) 
      });

      const data = await response.json();
      
      // use onAdd directly instead of props.
      onAdd(data);
      
      // Clear title and content after each add
      setNewNote({ title: "", content: "" });
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div>
      {/* Form to input new note details */}
      <form onSubmit={submitNote}>
        <input
          name="title"
          onChange={handleChange}
          value={newNote.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={newNote.content}
          placeholder="Enter note here!"
          rows="3"
        />
        {/* Button to submit the form and add the note */}
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateNote;

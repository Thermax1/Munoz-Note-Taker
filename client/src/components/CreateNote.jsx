import React, { useState } from "react";

function CreateNote({ onAdd }) {
  // State to manage the new note's title and content
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

  // Function to submit a new note to the backend
  const submitNote = async (event) => {
    event.preventDefault();
    try {
      // Send a POST request to the backend API '/api/notes' to add a new note
      const response = await fetch(`${backendURL}/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newNote) // Send the new note data in JSON format
      });

      // Get the response data (the newly added note) from the server
      const data = await response.json();
      
      // Update the UI with the newly added note by calling the onAdd function passed from the parent component
      onAdd(data);
      
      // Clear the input fields after adding the note
      setNewNote({ title: "", content: "" });
    } catch (error) {
      // Handle errors if the fetch or processing fails
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

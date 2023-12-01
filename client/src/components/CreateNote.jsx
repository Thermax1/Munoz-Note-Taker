import React, { useState } from "react";

function CreateNote(props) {
  const [newNote, setNewNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNewNote((lastNote) => {
      return {
        ...lastNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(newNote);
    setNewNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form>
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
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateNote;

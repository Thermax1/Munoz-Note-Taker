const express = require("express");
const app = express();
const mongoose = require("mongoose"); // a good practice for data validation, relationships, schemas, etc.
const cors = require('cors');

mongoose.connect(
  "mongodb+srv://thomas:tank@cluster0.techgt2.mongodb.net/?retryWrites=true&w=majority"
);

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model("Note", noteSchema);
const corsOptions = {
  origin: 'https://cs-641-final.vercel.app/',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json()); //parses JSON as it comes

// when we refresh the page, app.get retrieves the notes currently in the database.
app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find(); //uses the Note variable above using the Note model (schema) created anbove
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// when you click the add button on the front-end, it goes to the database.
app.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;
  //the note from front end gets created for mongodb here
  const note = new Note({ title, content });

  try {
    // the note created above gets saved here
    const newNote = await note.save();
    // 202 is a status code signifying success.
    res.status(201).json(newNote);
  } catch (err) {
    // 400 is a status  code showing the note didn't get added in case there was an error (like no connection)
    res.status(400).json({ message: err.message });
  }
});

// when you hit the delete button, the database wipes it 
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // using the id above, we can find the correct note and delete it
    await Note.findByIdAndDelete(id);
    // confirm deletion
    res.json({ message: "Note deleted" });
  } catch (err) {
    // 500 is a code that the server couldn't complete the request.
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT; //allows you to manually set your port. Otherwise, go with 5000. This is good in case 5000 is already taken
// Start the Express server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

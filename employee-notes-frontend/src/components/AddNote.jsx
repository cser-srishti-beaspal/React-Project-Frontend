import { useState } from "react";
import axios from "axios";

function AddNote({ fetchNotes }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ✅ LIVE BACKEND URL
  const API = "https://react-project-backend-ef5l.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/api/notes`, {
        title,
        description,
      });

      setTitle("");
      setDescription("");
      fetchNotes(); // refresh notes
    } catch (error) {
      console.log("Error adding note:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Add New Note</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <button type="submit">Add Note</button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    margin: "20px auto",
    gap: "10px",
  },
};

export default AddNote;
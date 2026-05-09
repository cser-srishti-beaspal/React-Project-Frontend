import { useState } from "react";
import axios from "axios";

function NoteCard({ note, fetchNotes, setSelectedNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);

  const date = new Date(note.createdAt).toLocaleDateString();

  const deleteNote = async () => {
    await axios.delete(`http://127.0.0.1:3000/api/notes/${note._id}`);
    fetchNotes();
  };

  const updateNote = async () => {
    await axios.put(`http://127.0.0.1:3000/api/notes/${note._id}`, {
      title,
      description,
    });
    setIsEditing(false);
    fetchNotes();
  };

  return (
    <div style={styles.card} onClick={() => setSelectedNote(note)}>
      
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              updateNote();
            }}
            style={styles.saveBtn}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h3>{note.title}</h3>
          <p>{note.description}</p>
          <small>Created At: {date}</small>
        </>
      )}

      <div style={styles.buttonRow}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(!isEditing);
          }}
          style={styles.editBtn}
        >
          Edit
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteNote();
          }}
          style={styles.deleteBtn}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: "260px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "15px",
    margin: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    textAlign: "left",
    cursor: "pointer",
    background: "white",
  },
  buttonRow: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
  editBtn: {
    background: "#3498db",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
  saveBtn: {
    marginTop: "8px",
    background: "green",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    marginBottom: "5px",
  },
  textarea: {
    width: "100%",
    marginBottom: "5px",
  },
};

export default NoteCard;
import NoteModal from "./components/NoteModal";
import Navbar from "./components/Navbar";
import AddNote from "./components/AddNote";
import { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "./components/NoteCard";

function App() {
  const [notes, setNotes] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedNote, setSelectedNote] = useState(null);

  // ✅ YOUR LIVE BACKEND URL
  const API = "https://react-project-backend-ef5l.onrender.com";

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${API}/api/notes`);
      setNotes(res.data);
    } catch (error) {
      console.log("Error fetching notes:", error.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const sortedNotes = [...notes].sort((a, b) => {
    if (sortOrder === "newest")
      return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOrder === "oldest")
      return new Date(a.createdAt) - new Date(b.createdAt);
    return 0;
  });

  return (
    <div style={styles.container}>
      <h1>Employee Notes Dashboard</h1>

      <Navbar sortOrder={sortOrder} setSortOrder={setSortOrder} />

      <NoteModal
        note={selectedNote}
        closeModal={() => setSelectedNote(null)}
      />

      <AddNote fetchNotes={fetchNotes} />

      <div style={styles.grid}>
        {sortedNotes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            fetchNotes={fetchNotes}
            setSelectedNote={setSelectedNote}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};

export default App;
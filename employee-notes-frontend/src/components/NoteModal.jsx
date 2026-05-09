function NoteModal({ note, closeModal }) {
  if (!note) return null;

  const date = new Date(note.createdAt).toLocaleDateString();

  return (
    <div style={styles.overlay} onClick={closeModal}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{note.title}</h2>
        <p>{note.description}</p>
        <small>Created At: {date}</small>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "400px"
  }
};

export default NoteModal;
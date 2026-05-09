function Navbar({ sortOrder, setSortOrder }) {
  return (
    <div style={styles.nav}>
      <h2>Employee Notes Dashboard</h2>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="all">Display All</option>
      </select>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 40px",
    background: "#282c34",
    color: "white",
    alignItems: "center"
  }
};

export default Navbar;
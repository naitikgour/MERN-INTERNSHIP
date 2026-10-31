import { Routes, Route, Link } from "react-router-dom";
import UserProfile from "./UserProfile";

function UserList() {
  const users = [
    { id: 10, name: "Rahul Sharma" },
    { id: 25, name: "Priya Patel" },
    { id: 55, name: "Amit Verma" }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Select a User Profile</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map(u => (
          <li key={u.id} style={{ margin: "10px 0" }}>
            <Link to={`/user/${u.id}`} style={{ color: "#2563eb", textDecoration: "none", fontSize: "18px" }}>
              View {u.name} (ID: {u.id})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;

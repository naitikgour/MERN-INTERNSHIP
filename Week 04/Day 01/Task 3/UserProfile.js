import { useParams, Link } from "react-router-dom";

function UserProfile() {
  const { id } = useParams();

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", maxWidth: "400px", margin: "20px auto" }}>
      <h2>User Profile</h2>
      <p><strong>User ID:</strong> {id}</p>
      <p>Loaded dynamic details for user #{id}.</p>
      <Link to="/" style={{ color: "#2563eb", textDecoration: "none" }}>&larr; Back to User List</Link>
    </div>
  );
}

export default UserProfile;

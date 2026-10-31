import ProfileCard from "./components/ProfileCard";

function App() {
  const users = [
    {
      id: 1,
      name: "Arjun Kumar",
      role: "Frontend Developer",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "Sneha Verma",
      role: "UI/UX Designer",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      name: "Rohan Sharma",
      role: "Full Stack Engineer",
      image: "https://randomuser.me/api/portraits/men/45.jpg"
    }
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px" }}>
      {users.map((user) => (
        <ProfileCard
          key={user.id}
          name={user.name}
          role={user.role}
          image={user.image}
        />
      ))}
    </div>
  );
}

export default App;

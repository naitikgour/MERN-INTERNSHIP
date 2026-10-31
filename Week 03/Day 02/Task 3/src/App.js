import ProfileCard from "./components/ProfileCard";

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ProfileCard
        name="Arjun Kumar"
        role="Frontend Developer"
        image="https://randomuser.me/api/portraits/men/32.jpg"
      />
      <ProfileCard
        name="Sneha Verma"
        role="UI/UX Designer"
        image="https://randomuser.me/api/portraits/women/44.jpg"
      />
    </div>
  );
}

export default App;

import Greeting from "./components/Greeting";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <Greeting name="Priya" topic="React Components" />
      <Greeting name="Rohan" topic="JSX & Props" />
    </div>
  );
}

export default App;

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <main style={{ padding: "20px", minHeight: "200px" }}>
        <h2>Welcome to My React App!</h2>
        <p>This is my first modular React layout.</p>
      </main>
      <Footer />
    </div>
  );
}

export default App;

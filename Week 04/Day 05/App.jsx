import React, { useState, Suspense } from "react";
import TimerGame from "./Task 1/MemoDemo";

const AboutLazy = React.lazy(() => import("./Task 2/AboutLazy"));

export default function App() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "30px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Week 4 Day 5 - React Performance & Optimization</h1>

      <section style={{ margin: "25px 0" }}>
        <TimerGame />
      </section>

      <section style={{ margin: "25px 0", borderTop: "1px solid #ddd", paddingTop: "20px" }}>
        <h2>Lazy Loading with Suspense</h2>
        <button
          onClick={() => setShowAbout(!showAbout)}
          style={{ padding: "8px 16px", backgroundColor: "#16a34a", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          {showAbout ? "Hide About" : "Load About Page Dynamically"}
        </button>

        {showAbout && (
          <Suspense fallback={<p style={{ color: "#888", fontStyle: "italic" }}>Loading module chunk...</p>}>
            <AboutLazy />
          </Suspense>
        )}
      </section>
    </div>
  );
}

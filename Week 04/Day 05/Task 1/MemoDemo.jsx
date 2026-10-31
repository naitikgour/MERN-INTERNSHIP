import React, { useState, useEffect } from "react";

// React.memo prevents Score from re-rendering unless 'value' changes
export const Score = React.memo(function Score({ value }) {
  console.log("Score component rendered (Optimized with React.memo)!");
  return (
    <div style={{ padding: "10px", background: "#e0f2fe", borderRadius: "8px", marginTop: "10px" }}>
      <h3>Current Score: {value}</h3>
      <p style={{ fontSize: "12px", color: "#0369a1" }}>Props didn't change, so this child component didn't re-render with timer.</p>
    </div>
  );
});

export default function TimerGame() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
      console.log("Timer ticked: time updated!");
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "10px", maxWidth: "450px" }}>
      <h2>Timer: {time}s</h2>
      <p style={{ fontSize: "14px", color: "#666" }}>Parent re-renders every second as timer ticks.</p>
      <Score value={100} />
    </div>
  );
}

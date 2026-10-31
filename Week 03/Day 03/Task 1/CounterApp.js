import { useState } from "react";

function CounterApp() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)} style={{ margin: "5px", padding: "8px 16px" }}>+</button>
      <button onClick={() => setCount(count - 1)} style={{ margin: "5px", padding: "8px 16px" }}>-</button>
    </div>
  );
}

export default CounterApp;

export default function AboutLazy() {
  return (
    <div style={{ padding: "15px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", marginTop: "15px" }}>
      <h3 style={{ color: "#166534" }}>Lazy Loaded About Page</h3>
      <p style={{ color: "#15803d", fontSize: "14px" }}>
        This component was loaded asynchronously on-demand using <code>React.lazy()</code> and <code>Suspense</code>, reducing initial bundle size!
      </p>
    </div>
  );
}

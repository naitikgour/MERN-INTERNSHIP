import { useState } from "react";

function BlogCard({ title, author, date, summary, content, category }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="blog-card">
      <span className="blog-category">{category}</span>
      <h3 className="blog-title">{title}</h3>
      <p className="blog-meta">By {author} | {date}</p>
      <p className="blog-summary">{summary}</p>

      {showDetails && (
        <div className="blog-details">
          <p>{content}</p>
        </div>
      )}

      <button
        className="read-more-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Read Less" : "Read More"}
      </button>
    </div>
  );
}

export default BlogCard;

import BlogCard from "./BlogCard";

function BlogList({ blogs }) {
  if (blogs.length === 0) {
    return <p className="no-blogs">No blog posts found matching your search.</p>;
  }

  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          title={blog.title}
          author={blog.author}
          date={blog.date}
          category={blog.category}
          summary={blog.summary}
          content={blog.content}
        />
      ))}
    </div>
  );
}

export default BlogList;

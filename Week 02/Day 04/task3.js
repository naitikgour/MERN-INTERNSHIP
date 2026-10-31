async function loadPosts() { 
try { 
const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5"); 
const posts = await response.json(); 
console.log("Latest Posts:", posts[0]
);
console.log(posts[1]); 
console.log(posts[2]);
console.log(posts[3]);
console.log(posts[4]);
} catch (error) { 
console.error("Error loading posts:", error); 
} 
}
loadPosts();
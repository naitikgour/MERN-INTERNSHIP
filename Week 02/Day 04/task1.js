function fakeAPICall() { 
console.log("Fetching user details..."); 
setTimeout(() => { 
console.log("User data received");  
}, 2000); 
} 
fakeAPICall(); 

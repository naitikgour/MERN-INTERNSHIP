var user = { name: "Aman", age: 22 };
function greet(user) {
    return ` hello ${user.name} ,you are ${user.age} years old.`
}
console.log(greet(user));
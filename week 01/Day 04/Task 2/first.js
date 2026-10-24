

// 1. Define the arrow function
const checkVote = (age) => {
    if (age >= 18) {
        return "You are eligible to vote!";
    } else {
        return "You are not eligible to vote yet.";
    }
};


let userAge = prompt("Please enter your age:");


userAge = Number(userAge);


let result = checkVote(userAge);
alert(result);

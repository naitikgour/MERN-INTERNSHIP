const scores = [45, 80, 90, 35, 60, 75];
// Filter passing scores (>=50)
const filteredScores = scores.filter(scores => scores >= 50);
console.log("passing scores--- ");
console.log(filteredScores);
const finalScores = filteredScores.map((score, index) => {
    return score + 10;
})
console.log("final scores--- ");
console.log(finalScores);
// Calculate total using reduce()
const totalScores = finalScores.reduce((total, score) => total + score, 0);
console.log("total scores--- ");
console.log(totalScores);
const students = [
    { name: "Aman", marks: 85 },
    { name: "Sara", marks: 42 },
    { name: "Riya", marks: 68 },
    { name: "John", marks: 49 }];
const passingStudents = students.filter(student => student.marks >= 50);
console.log("passing students");
console.log(passingStudents.map(student => student.name).join(","));
const bonusMarks = passingStudents.map(student => ({ name: student.name, marks: student.marks + 5 }));

console.log("Bonus Marks:");
console.log(bonusMarks[0].name + " - " + bonusMarks[0].marks);
console.log(bonusMarks[1].name + " - " + bonusMarks[1].marks);

const average = bonusMarks.reduce((sum, student) => sum + student.marks, 0) / bonusMarks.length;
console.log("class average", average);
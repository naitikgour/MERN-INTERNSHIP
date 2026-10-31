// Week 5 - Day 1 - Task 3: Script that logs system information
const os = require("os");

console.log("=== System Information ===");
console.log("Operating System:", os.platform());
console.log("Architecture:", os.arch());
console.log("Total Memory:", os.totalmem(), "bytes", `(${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB)`);
console.log("Free Memory:", os.freemem(), "bytes", `(${(os.freemem() / (1024 ** 3)).toFixed(2)} GB)`);
console.log("Home Directory:", os.homedir());
console.log("CPU Info:", os.cpus().length, "cores detected");
console.log("First Core Model:", os.cpus()[0]?.model || "N/A");

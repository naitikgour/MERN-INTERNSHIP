const prices = [120, 250, 300, 450, 600];
const greaterPrices = prices.filter(prices => prices >= 250);
console.log("orignal prices---")
console.log(prices);
console.log("greater prices---")
console.log(greaterPrices);
console.log("discounted prices---")
const discountedPrice = greaterPrices.map(prices => prices -(prices * 0.1));
console.log(discountedPrice);

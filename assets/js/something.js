// Subject:         Higher Order Functions
// Problem Prompt:  

function reverseNumber(num) {
    let reverseNum = [];
    let reverseNumString = String(num);

    for (let i = 0; i <= (reverseNumString.length - 1); i++) {
        reverseNum[i] = reverseNumString[reverseNumString.length - 1 - i];
    }

    return Number(reverseNum.join(""));
}

//console.log(reverseNumber(75647));



function isPalindrone(word) {
    let compactedWord = word.split(" ").join("").toLowerCase().replace(/[^a-zA-Z0-9]+/g, "");
    let reversedWord = "";
    reversedWord = word.split(" ").join("");
    reversedWord = reversedWord.split("").reverse().join("").toLowerCase().replace(/[^a-zA-Z0-9]+/g, "");
    if (compactedWord === reversedWord) {
        return true;
    } else {
        return false;
    }
}

//console.log(isPalindrone("dogg"));


let vehicles = [{
    "type": "truck",
    "color": "red",
    "doors": 4,
    "cost": 12000
}, {
    "type": "truck",
    "color": "blue",
    "doors": 2,
    "cost": 6000
}, {
    "type": "car",
    "color": "purple",
    "doors": 3,
    "cost": 18000
}, {
    "type": "car",
    "color": "yellow",
    "doors": 1,
    "cost": 3000
}, {
    "type": "truck",
    "color": "red",
    "doors": 4,
    "cost": 36000
}];

let trucks = vehicles.filter(x => x.type !== "truck");

//console.log(trucks);


const inventors = [
{ first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
{ first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
{ first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
{ first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
{ first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
{ first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
{ first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
];

const inventorsBefore1500 = inventors.filter(x => x.year < 1600 && x.year > 1499);

console.log(inventorsBefore1500);



































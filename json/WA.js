"use strict";

// Q1
function start() {
  var marks = [90, 85, 70, 99, 75];
  add5marks(marks);

  console.log(marks.join(":")); // 95:90:75:104:80
}

function add5marks(theArray) {
  for (var j in theArray) {
    // 0, 1, 2, 3, 4

    theArray[j] = theArray[j] + 5; // 95, 90, 75, 104, 80
  }
}

start();
// (2 Points)
// 90: $85: 70: 99: 75$
// 95: 90: $75: 104: 80$
// $80,104,75,90,95$
// $95,90,75,104,80$

// Q2

// What does the output of the following JavaScript code?

var phone = "0798rt45";

for (let i = 0; i < phone.length; i++) {
  if (
    !(
      (phone.charAt(i) >= "0" && phone.charAt(i) <= "9") ||
      phone.charAt(i) == ""
    )
  ) {
    console.log("error");
  }
}

// Q3
// What is the content of the variable res after executing the following JavaScript code?

var student = [
  [3, 1],
  [4, 5, 7],
  [8, 2, 3, 4],
];

var res = "",
  sum;

for (var row in student) {
  sum = 0;

  console.log(student[row]);

  for (var column in student[row]) {
    console.log(student[row][column]);

    sum += student[row][column];
  }

  console.log(sum);

  res += +sum;
  console.log(res);
}
console.log(res);

// (2 Points)

// 314578234

// 4 16 17

// 123344578

// 875443321

// 47

// Q4
// Whatdoes the following code do:

var pictures = [
  "petra1",
  "perta2",
  "petra3",
  "petra4",
  "Petra5",
  "petra6",
  "petra7",
];

console.log("<img src = " + pictures[Math.floor(Math.random() * 7)] + ".gif>");

// (1 Point)

// it displays on the screen the image that itsname saved in pictures[7].

// itpicks a random image from the pictures array and displays it

// it picks a random image from the pictures arrayand saves it in the current directory

// it displays on the screen all the seven images from the pictures array on the screen

// Q10
// What is the output of the following JavaScript code:

var a = new Array(10);

for (var i = 0; i < a.length; ++i) {
  a[i] = i + 2;
} // end for

console.log(a);
var answer = a.indexOf(30);

console.log(answer);

// (2 Points)

// 10

// 2

// 9

// 1

// 30

// Q12

// What is the output of the following javaScript Code:

var strng = "The city of Petra, capital of the Nabataean Arabs,";
console.log(strng);

// "COVID-19 is the infectious disease"

// capital of the Nabataean Arabs

// Nabataean

// Petra

// strng

// The city of Petra, capital of the Nabataean Arabs,

// Q100
// What is the result of the alert statement after executing the following JavaScript code:

var nm = "Ahmad";

var str = "";

str += nm.charCodeAt(0); // charCode(A) == 65

console.log(str);

// charAt(0) == 'A'
// charAt(1) == 'h
str += nm.charAt(2); // charAt(2) == 'm'

console.log(str);

// (2 Points)

// 65m

// 65h

// Am

// 90a

// Q221
// To create a new variablewith the initial value representing the current date/time of the client's computer we can use * (1 Point)

var datatime = new Date();
console.log(datatime);

// var datetime = current.getDay();
// console.log(datatime);

// datetime= date():
// console.log(datatime);

// var datetime = current.toLocalString();
// console.log(datatime);

// The JavaScript statement that will change the background color of the following div section to red is:

<div id="section1"> hello. I am here </div>;

// (1 Point)

document
  .getElementById("section1")
  .setAttribute("style", "background-color:red");

// section1.class="background-color:red;

// div.className="background-color: red";

// section1.className="classB"
<input type="text" id="kk"></input>;

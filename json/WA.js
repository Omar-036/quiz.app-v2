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

// {/* <div id="section1"> hello. I am here </div>; */}

// (1 Point)

// document
//   .getElementById("section1")
//   .setAttribute("style", "background-color:red");

// section1.class="background-color:red;

// div.className="background-color: red";

// section1.className="classB"
// {/* <input type="text" id="kk"></input>; */}
// Q123
// One of the following is considered a declaration of anarray of two dimensions in which there are three rows. There are two, one and three columns in the first, second and third rows respectively: * (1 Point)

var array2 = [
  [1, 2],
  [3, 5],
  [4, 5, 6],
];

// var array2 = {{ 1, 2), (4, 5, 6}};

console.log(array2);
var array2 = [[1, 2], [3], [4, 5, 6]];

console.log(array2);
var array2 = [
  [1, 2],
  [4, 5, 6],
];
console.log(array2);

// Q133
// What is the content of the array numb after executing the following JavaScript Code:

var numb = [2, 4, 6, 0, 1, 3];

numb.sort(comp);
console.log(numb);

function comp(x, y) {
  console.log(x);
  console.log(y);

  return parseInt(y) - parseInt(x);
}

// console.log(comp());

// (2 Points)

// 246013

// 246

// 012346

// 643210

// Q1232
// What is the output of thefollowing Javascript code:

var qpt = "Qualiyt Point Technologies";

var result = qpt.split(" ");
console.log(result);

console.log(result[0] + ", " + result[1] + ", " + result[2]);

// Q12093

var y = 0.1,
  x;

for (var ray = 2; ray <= 3; ++ray) {
  x = 10 * Math.pow(0.2 + y, ray);
  console.log(x);

  console.log(ray);
  console.log(x.toFixed(2), typeof x.toFixed(2));
  console.log(ray + x.toFixed(2));
  // .................... 2 + '0.90' = 20.90
}

// Q12903

var numb = [3, 9, 6, 2, 1, 3];

numb.sort(comp);

function comp(x, y) {
  return parseInt(x) - parseInt(y);
}

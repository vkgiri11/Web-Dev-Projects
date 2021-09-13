var diceNum1 = Math.floor(Math.random() * 6) + 1;
var diceNum2 = Math.floor(Math.random() * 6) + 1;

document.querySelector(".dice .img1").setAttribute("src", "images/dice" + diceNum1 + ".png");
document.querySelector(".dice .img2").setAttribute("src", "images/dice" + diceNum2 + ".png");

if (diceNum1 > diceNum2) document.querySelector("h1").innerHTML = "🚩 Player 1 Wins";
else if (diceNum2 > diceNum1) document.querySelector("h1").innerHTML = "Player 2 Wins 🚩";
else document.querySelector("h1").innerHTML = "Draw!!";

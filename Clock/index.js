let hrHand = document.querySelector("#hr");
let minHand = document.querySelector("#min");
let secHand = document.querySelector("#sec");

setInterval(() => {
    date = new Date();
    hourTime = date.getHours();
    minuteTime = date.getMinutes();
    secondTime = date.getSeconds();

    hourRotation = 30 * hourTime + minuteTime / 2;
    minuteRotation = 6 * minuteTime;
    secondRotation = 6 * secondTime;

    hrHand.style.transform = `rotate(${hourRotation}deg)`;
    minHand.style.transform = `rotate(${minuteRotation}deg)`;
    secHand.style.transform = `rotate(${secondRotation}deg)`;
}, 1000);

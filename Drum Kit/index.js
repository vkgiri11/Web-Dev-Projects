var numDrumButtons = document.querySelectorAll(".drum").length;

for (var i = 0; i < numDrumButtons; i++) {
    // Adds event listener to all the buttons
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        // registers which of the button was clicked on the screen
        var buttonType = this.innerHTML;
        makeSound(buttonType);
        animateButton(buttonType);
    });
}

//Adds event listener to the entire page for keyboard press
//this func listens to keypress, and calls the anonymous func with myEvent
//myEvent tells which event triggered the event listener  (CallBack Function)
document.addEventListener("keydown", function (myEvent) {
    // .key is a method which tells the code of the key pressed
    makeSound(myEvent.key);
    animateButton(myEvent.key);
});

function makeSound(button) {
    switch (button) {
        case "w":
            var sound = new Audio("sounds/tom-1.mp3");
            sound.play();
            break;

        case "a":
            var sound = new Audio("sounds/tom-2.mp3");
            sound.play();
            break;

        case "s":
            var sound = new Audio("sounds/tom-3.mp3");
            sound.play();
            break;

        case "d":
            var sound = new Audio("sounds/tom-4.mp3");
            sound.play();
            break;

        case "j":
            var sound = new Audio("sounds/crash.mp3");
            sound.play();
            break;

        case "k":
            var sound = new Audio("sounds/kick-bass.mp3");
            sound.play();
            break;

        case "l":
            var sound = new Audio("sounds/snare.mp3");
            sound.play();
            break;
    }
}

function animateButton(button) {
    //assigns the particular class
    var buttonPressed = document.querySelector("." + button);
    buttonPressed.classList.add("pressed");

    setTimeout(function () {
        buttonPressed.classList.remove("pressed");
    }, 100);
}

"use strict";

const scoreElement = document.getElementById("score--0");
const scoreElement1 = document.getElementById("score--1");

const rollDiceBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const newBtn = document.querySelector(".btn--new").classList.add("hidden");
const dice = document.querySelector(".dice");

const currentElement0 = document.getElementById("current--0");
const currentElement1 = document.getElementById("current--1");

const actualScores = [0, 0]; //actual scores of the two people
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(`.player--${activePlayer}`).classList.add("player--active");
};

rollDiceBtn.addEventListener("click", () => {
  if (playing) {
    const randomNo = Math.trunc(Math.random() * 6 + 1);
    dice.classList.remove("hidden");
    dice.src = `dice-${randomNo}.png`;

    // No need to do like below only when the content in changed you need to retrieve the element again
    //   document.querySelector(".dice").classList.remove("hidden");
    //   document.querySelector(".dice").src = `dice-${randomNo}.png`;

    if (randomNo !== 1) {
      currentScore += randomNo;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      //switch to next player and current score becomes zero
      switchPlayer();
    }
  }
});

//implementing the hold functionality
holdBtn.addEventListener("click", () => {
  if (playing) {
    actualScores[activePlayer] = actualScores[activePlayer] + Number(currentScore);
    document.getElementById(`score--${activePlayer}`).textContent = actualScores[activePlayer];
    dice.classList.add("hidden");
    if (actualScores[activePlayer] >= "50") {
      playing = false;
      console.log(document.querySelector(`player--${activePlayer}`));
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
      document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

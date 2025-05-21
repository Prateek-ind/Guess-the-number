(function () {
  const submitBtn = document.querySelector(".submit");
  const startBtn = document.querySelector(".start");
  const inputField = document.querySelector("input");
  const para = document.querySelector(".hint");
  const myGuesses = document.querySelector(".guesses");
  const form = document.querySelector("form");

  let inputs = [];
  let randomNumber = 0;
  let counter = 0;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!inputField.checkValidity()) {
      inputField.reportValidity();
      return;
    }
    handleGuess();
  });

  startBtn.addEventListener("click", () => {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    // console.log(randomNumber);
    startBtn.setAttribute("disabled", true);
    submitBtn.removeAttribute("disabled");
    inputField.disabled = false;
    inputField.value = "";
    para.innerText = "";
    myGuesses.innerText = "";
    inputs = [];
    counter = 0;
  });

  function handleGuess() {
    const value = parseInt(inputField.value.trim());

    if (isNaN(value) || value < 1 || value > 100) {
      return;
    }

    inputs.push(value);
    inputField.value = "";
    counter++;

    if (value === randomNumber) {
      para.innerText = "🎉 Correct! You guessed it!";
      myGuesses.innerText = `Your Guesses: ${inputs.join(", ")}`;
      endGame();
      return;
    }
    if (counter >= 10) {
      para.innerText = `You lost! The number was ${randomNumber}`;
      endGame();
      return;
    }

    if (Math.abs(randomNumber - value) <= 5) {
      para.innerText = "Very close!";
    } else if (randomNumber > value) {
      para.innerText = "Too low!";
    } else if (value > randomNumber) {
      para.innerText = "Too high!";
    }
    myGuesses.innerText = `Your Guesses: ${inputs.join(", ")}`;
  }

  function endGame() {
    submitBtn.setAttribute("disabled", true);
    inputField.setAttribute("disabled", true);
    startBtn.removeAttribute("disabled");
  }
})();

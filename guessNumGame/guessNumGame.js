document.addEventListener("DOMContentLoaded", function() {
//----------------------MARKUP----------------------------
	function createEl(tag, parentElem, text) {
		const el = document.createElement(tag);

		el.textContent = text;
		parentElem.appendChild(el);

		return el;
	}
	
	function createInputForm(parentElem, id, labelText, buttonText) {
		const form = createEl("form", parentElem);
		const label = createEl("label", form, labelText);

		label.setAttribute("for", id);

		const input = createEl("input", form);

		input.setAttribute("type", "text");
		input.setAttribute("id", id);

		const submitButton = createEl("button", form, buttonText);

		return [form, input, submitButton];
	}
	
	function addDefaultMarkup() {
		const main = createEl("main", document.body);
		const header = createEl("h1", main, "Number guessing game");
		const parText = "We have selected a random number between 1 and 100. See if you can guess it in 10 turns or fewer. We'll tell you if your guess was too high or too low.";
		const par = createEl("p", main, parText);
		const [form, input, submitButton] = createInputForm(main, "guessNum", "Enter a guess: ", "Submit guess");

		return [main, form, input, submitButton];
	}

	const [main, form, input, submitButton] = addDefaultMarkup();

	input.focus();

//----------------------LOGIC-----------------------------

	function randomNumberInRange(min, max) {
		const randomNum = Math.floor(Math.random()*(max - min + 1) + min);

		console.log("The number is: ", randomNum);

		return randomNum;
	}
	
	let failureText;
	let previousGuesses;
	let guessCounter = 0;
	let randomNum = randomNumberInRange(1, 100);

	function setEndGameState(gameResult) {
		function restart() {
			restartButton.remove();
			successText.remove();
			previousGuesses.remove();
			previousGuesses = null;
			guessCounter = 0;
			randomNum = randomNumberInRange(1, 100);
			submitButton.removeAttribute("disabled");
			input.removeAttribute("disabled");
			input.focus();
		}
		
		if (failureText) {
			failureText.remove();
		}
		
		submitButton.setAttribute("disabled", "");
		input.setAttribute("disabled", "");

		const successText = createEl("p", main, gameResult.text);

		successText.style.backgroundColor = gameResult.color;
		restartButton = createEl("button", main, "Start new game");
		restartButton.focus();
		restartButton.addEventListener("click", restart);
	}

	function checkInput(event) {
		event.preventDefault()

		const gameResult = {
			win: {
				text: "Congratulations! You got it right!",
				color: "green",
			},
			lose: {
				text: "You lose!",
				color: "red",
			}
		}

		const guessNum = Number(input.value);

		input.value = "";

		//Check for NaNs and not integers, guess count
		if (!(typeof guessNum === "number" && !isNaN(guessNum))) {
			alert("Not a number!");

			return;
		}

		if (!Number.isInteger(guessNum) || guessNum === 0) {
			alert("Not an integer!");

			return;
		}

		if (guessCounter >= 9) {
			setEndGameState(gameResult.lose);

			return;
		}
		
		if (failureText) {
			failureText.remove();
		}

		if (!previousGuesses) {
			previousGuesses = createEl("p", main, "Previous guesses: ");
		}

		previousGuesses.textContent += `${guessNum} `;

		if (guessNum === randomNum) {
			setEndGameState(gameResult.win)
			
			return;
		}

		input.focus();
		failureText = createEl("div", main);

		const wrongText = createEl("p", failureText, "Wrong!");

		wrongText.style.backgroundColor = "red";
		guessCounter++

		if (guessNum < randomNum) {
			const wrongTextLow = createEl("p", failureText, "Last guess was too low!");

			return;
		}

		const wrongTextHigh = createEl("p", failureText, "Last guess was too high!");

	}
	submitButton.addEventListener("click", checkInput);
});
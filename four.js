let randomnum = parseInt(Math.random() * 100 + 1);
console.log(randomnum);

const submit = document.querySelector('#sumt');
const userinput = document.querySelector('#guessField');
const guessslot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastresult');
const loworhi = document.querySelector('.loworhi');
const startover = document.querySelector('.result');

const p = document.createElement('p');

let prevguess = []; // to show user their previous guess
let numguess = 1;
let playgame = true;

if (playgame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(userinput.value);
        validguess(guess);
    });
}

function validguess(guess) {
    // to check number is between 1 to 100 or not
    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert('Please enter a valid number between 1 and 100');
    } else {
        prevguess.push(guess);
        if (numguess === 11) {
            displayguess(guess);
            displaymessage(`Game over. Correct number = ${randomnum}`);
            endgame();
        } else {
            displayguess(guess);
            checkguess(guess);
        }
    }
}

function checkguess(guess) {
    // check number is correct
    if (guess === randomnum) {
        displaymessage(`YOU WON`);
        endgame();
    } else if (guess < randomnum) {
        displaymessage(`Number is too low`);
    } else if (guess > randomnum) {
        displaymessage(`Number is too high`);
    }
}

function displayguess(guess) {
    // cleanup function
    userinput.value = '';
    guessslot.innerHTML += `${guess}, `;
    numguess++;
    remaining.innerHTML = `${11 - numguess}`;
}

function displaymessage(msg) {
    // give message to user about the game
    loworhi.innerHTML = `<h2>${msg}</h2>`;
}

function endgame() {
    userinput.value = '';
    userinput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newgame">Start New Game</h2>`;
    startover.appendChild(p);
    playgame = false;
    newgame();
}

function newgame() {
    const newgameButton = document.querySelector('#newgame');
    newgameButton.addEventListener('click', function () {
        randomnum = parseInt(Math.random() * 100 + 1);
        prevguess = [];
        numguess = 1;
        guessslot.innerHTML = '';
        remaining.innerHTML = `${11 - numguess}`;
        userinput.removeAttribute('disabled');
        startover.removeChild(p);
        playgame = true;
    });
}

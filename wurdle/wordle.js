// Initialize constants / variables
const totGuess   = 6;
const totLetter  = 5;

// Get guess and letter divs
// Arrange the letters into 2-D array
const guesses = document.querySelectorAll(".guess");
let letters = document.querySelectorAll(".letter");
letters = Array.from(letters);
const lettersArr = [];
while(letters.length) lettersArr.push(letters.splice(0,totLetter));


async function init() {

    // Initialize constants / variables
    let currGuessNo  = 0;
    let currLetterNo = 0;
    let currGuess = '';

    // Get the word of the day
    const wordURL = 'https://words.dev-apis.com/word-of-the-day';
    const promise = await fetch(wordURL);
    const wordJSON = await promise.json();
    const correctWord = wordJSON['word'].toUpperCase();
    
    console.log(correctWord);

    // Event listener for key presses, also routing
    document.addEventListener("keydown", function keyPressed(event){
        key = event.key.toUpperCase();
        if (isLetter(key)){
            if (currLetterNo < totLetter) {
                addLetter(key);
            }
        }
        else if (key === 'BACKSPACE') {
            if (currLetterNo > 0) {
                removeLetter();
            }
        }
        else if (key === 'ENTER') {
            if (currGuess.length === 5){
                submitGuess(currGuess);
            }
        }
    })
    
    function addLetter(key){
        lettersArr[currGuessNo][currLetterNo].innerText = key;
        currGuess += key;
        currLetterNo += 1;
    }
    
    function removeLetter(){
        lettersArr[currGuessNo][currLetterNo-1].innerText = '';
        currGuess = currGuess.slice(0, -1);
        currLetterNo -= 1;
    }
    
    function submitGuess(){
        currGuessNo += 1;
        currLetterNo = 0;
        currGuess = '';
    }

}

function isLetter(str) {
    return /^[a-zA-Z]$/.test(str);
}

init();
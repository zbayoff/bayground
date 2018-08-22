const HangmanModule = (function () {

    'use strict';

    // Read in text file of words


    // readTextFile('assets/text/hangmanWords.txt');
    const startGameBtn = document.querySelector('.project-hangman .start-btn-js');
    const keyboard = document.querySelector('.hangman-keyboard-container');
    const usedLettersContainer = document.querySelector('.used-letters-container');

    let chosenWord = '';
    let chosenLetters = [];
    let badLetters = []; // letters not found in chosen word
    let goodLetters = [];
    let numGuesses = 0;

    // start game button click event handler
    startGameBtn.addEventListener('click', () => {
        readTextFile().then((res) => {
            chosenWord = chooseRandomWord(res);
            keyboard.addEventListener('click', handleLetterSelection);
            console.log(chosenWord);
        });
    });

    function handleLetterSelection(e) {
        // check event target
        if (e.target.classList.contains('keyboard-letter-js')) {
            let selectedLetter = e.target.innerHTML;
            // check if letter has already been chosen
            if (!isLetterSelected(selectedLetter)) {
                // console.log('letter has not been selected');
                chosenLetters.push(selectedLetter);
                if (isLetterinChosenWord(selectedLetter)) {
                    numGuesses += 1;
                    // reveal character in final output of chosen word
                    e.target.classList.add('chosen-letter');

                    // add all matching characters to good Letters list
                    for (let i = 0; i < chosenWord.length; i += 1) {
                        if (selectedLetter === chosenWord[i]) {
                            goodLetters.push(selectedLetter);
                        }

                    }

                    console.log(areTwoStringEqual(goodLetters.join(''), chosenWord));

                    if (areTwoStringEqual(goodLetters.join(''), chosenWord)) {
                        console.log('YOU WIN!');
                        // stop game, output full chosen word, stop timer.
                    }


                    // if all characters in goodLettes are in chosen word, you win!


                    // TODO: check if entire word was chosen correctly.
                    // console.log(goodLetters);
                    // TODO: reveal chosen character in final word reveal area

                    console.log('Letter is in the chosen Word!');
                } else {
                    numGuesses += 1;
                    badLetters.push(selectedLetter);
                    chosenLetters.push(selectedLetter);
                    e.target.classList.add('chosen-letter');
                    // console.log('letter added to chosen and bad letter list');
                    // TODO: draw next limb
                    if (numGuesses === 9) {
                        console.log('YOU LOSE');
                        // TODO: stop game (remove event listeners, stop timer)

                    }
                }
            }
        }
    }

    function isLetterSelected(letter) {
        return chosenLetters.indexOf(letter) !== -1;
    }

    function isLetterinChosenWord(letter) {
        return chosenWord.indexOf(letter) !== -1;
    }

    function areTwoStringEqual(str1, str2) {

    }




    // read text file of words
    async function readTextFile() {
        try {
            let response = await fetch('assets/text/hangmanWords.txt');
            let text = await response.text();
            // console.log(text);
            return text;
        } catch (e) {
            console.log('Error!', e);
        }
    }

    // choose a random work for the game among the lsit of words
    function chooseRandomWord(words) {

        let wordArray = words.split("\n");
        // console.log(wordArray);
        // let promptPara = document.querySelector(".project-speedTest__prompt");
        let randWord = wordArray[Math.floor(Math.random() * wordArray.length)];
        return randWord;
        // promptPara.innerHTML = randPrompt;
    }




    // generate hangman post
    // start timer
    // clear timer
    // restart game
    // display result
    // check letter



})();
const HangmanModule = (function () {

    'use strict';

    let startGameBtn = document.querySelector('.project-hangman .start-btn-js');
    let playAgainBtn = document.querySelector('.project-hangman  .playagain-btn-js')
    let keyboard = document.querySelector('.hangman-keyboard-container');
    let usedLettersContainer = document.querySelector('.used-letters-container');
    let hangmanFinalPhraseContainer = document.querySelector('.hangman-final-phrase-container');
    let badLettersContainer = document.querySelector('.bad-letters-container');

    let chosenPhrase = '';
    let chosenLetters = [];
    let badLetters = []; // letters not found in chosen phrase
    let goodLetters = [];

    // start game button click event handler
    startGameBtn.addEventListener('click', () => {
        readTextFile().then((res) => {
            chosenPhrase = chooseRandomPhrase(res);
            // display "_" for each letter in phrase
            displayPhraseUnderscores(chosenPhrase);
            keyboard.addEventListener('click', handleLetterSelection);
        });
    });

    playAgainBtn.addEventListener('click', restartGame);

    function displayPhraseUnderscores(phrase) {
        let words = phrase.split(' ');
        let underscores = '';
        for (let i = 0; i < words.length; i += 1) {
            underscores += '<div class="word-block">';
            for (let j = 0; j < words[i].length; j += 1) {
                underscores += `<p class="letter-box"></p>`;
            }
            underscores += '</div>';
        }
        hangmanFinalPhraseContainer.innerHTML = underscores;
    }

    function displayBadLetters(arr) {
        let sortedBadLetters = arr.sort();
        badLettersContainer.innerHTML = sortedBadLetters.map((item) => {
            return `<p>${item}</p>`;
        }).join('');
    }

    function handleLetterSelection(e) {
        const wordBlocks = document.querySelectorAll('.project-hangman .word-block');
        // check event target
        if (e.target.classList.contains('keyboard-letter-js')) {
            let selectedLetter = e.target.innerHTML;
            let chosenPhraseSquashed = chosenPhrase.split("").filter(function (entry) {
                return entry.trim() != '';
            });
            // check if letter has already been chosen
            if (!isLetterSelected(selectedLetter)) {
                // console.log('letter has not been selected');
                chosenLetters.push(selectedLetter);
                if (isLetterinChosenPhrase(selectedLetter)) {
                    e.target.classList.add('chosen-letter');
                    // add all matching characters to good Letters list
                    for (let i = 0; i < chosenPhrase.length; i += 1) {
                        if (selectedLetter === chosenPhrase[i]) {
                            goodLetters.push(selectedLetter);
                        }
                    }

                    let count = 0;

                    for (let i = 0; i < wordBlocks.length; i += 1) {
                        let word = wordBlocks[i].children;
                        for (let j = 0; j < word.length; j += 1) {
                            if (chosenPhraseSquashed[count] === selectedLetter) {
                                word[j].innerHTML = selectedLetter;
                                word[j].style.borderBottom = 'none';
                            }
                            count += 1;
                        }
                    }
                    // reveal character in final output of chosen phrase
                    if (areTwoStringEqual(goodLetters.join(''), chosenPhrase)) {
                        console.log('YOU WIN!');
                        // stop game, output full chosen phrase, stop timer.
                    }

                    // TODO: reveal chosen character in final phrase reveal area

                } else {
                    badLetters.push(selectedLetter);
                    displayBadLetters(badLetters);
                    chosenLetters.push(selectedLetter);
                    e.target.classList.add('chosen-letter');
                    // TODO: draw next limb
                    if (badLetters.length === 9) {
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

    function isLetterinChosenPhrase(letter) {
        return chosenPhrase.indexOf(letter) !== -1;
    }

    function areTwoStringEqual(str1, str2) {
        let modStr1 = str1.split('').sort().join('');
        let modStr2 = str2.split("").filter(function (entry) {
            return entry.trim() != '';
        }).sort().join('');
        return modStr1 === modStr2;
    }

    function restartGame() {
        chosenPhrase = '';
        chosenLetters = [];
        badLetters = [];
        goodLetters = [];

        hangmanFinalPhraseContainer.innerHTML = '';
        badLettersContainer.innerHTML = '';

        keyboard.removeEventListener('click', handleLetterSelection);

        Array.prototype.forEach.call(keyboard.children, child => {
            child.classList.remove('chosen-letter');
          });
    }

    // read text file of phrases
    async function readTextFile() {
        try {
            let response = await fetch('assets/text/hangmanPhrases.txt');
            let text = await response.text();
            // console.log(text);
            return text;
        } catch (e) {
            console.log('Error!', e);
        }
    }

    // choose a random work for the game among the lsit of phrases
    function chooseRandomPhrase(phrases) {

        let phraseArray = phrases.split("\n");
        // console.log(phraseArray);
        // let promptPara = document.querySelector(".project-speedTest__prompt");
        let randPhrase = phraseArray[Math.floor(Math.random() * phraseArray.length)];
        return randPhrase;
        // promptPara.innerHTML = randPrompt;
    }




    // generate hangman post
    // start timer
    // clear timer
    // restart game
    // display result
    // check letter



})();
import 'svg.js';

const HangmanModule = (function () {

    'use strict';

    let startGameBtn = document.querySelector('.project-hangman .start-btn-js');
    let playAgainBtn = document.querySelector('.project-hangman  .playagain-btn-js')
    let keyboard = document.querySelector('.hangman-keyboard-container');
    let hangmanFinalPhraseContainer = document.querySelector('.hangman-final-phrase-container');
    let badLettersContainer = document.querySelector('.bad-letters-container');
    let hangmanGraphicContainer = document.querySelector('#hangman-graphic-container');
    let hangmanResultsContainer = document.querySelector('.hangman-results-container');
    let easyRadio = document.querySelector('#hangman-difficulty-easy-js');
    let hardRadio = document.querySelector('#hangman-difficulty-hard-js');
    let spanClose = document.querySelector(".project-hangman .close-js");

    let chosenPhrase = '';
    let chosenLetters = [];
    let badLetters = []; // letters not found in chosen phrase
    let goodLetters = [];

    // start game button click event listener
    startGameBtn.addEventListener('click', startGame);
    spanClose.addEventListener('click', restartGame);

    // play again button click event listener
    playAgainBtn.addEventListener('click', restartGame);

    // read text file of phrases
    async function readTextFile() {
        // read in different text files based on difficulty mode selected
        let textFile = '';
        // if easy mode
        if (easyRadio.checked === true) {
            textFile = 'assets/text/hangmanPhrasesEasy.txt';
        } else {
            textFile = 'assets/text/hangmanPhrasesHard.txt';
        }

        try {
            let response = await fetch(textFile);
            let text = await response.text();
            return text;
        } catch (e) {
            console.log('Error!', e);
        }
    }

    // choose a random work for the game among the lsit of phrases
    function chooseRandomPhrase(phrases) {
        let phraseArray = phrases.split("\n");
        let randPhrase = phraseArray[Math.floor(Math.random() * phraseArray.length)];
        return randPhrase;
    }

    // read text file, draw hangman, display hidden chosen word
    function startGame() {
        readTextFile().then((res) => {
            chosenPhrase = chooseRandomPhrase(res);
            displayPhraseUnderscores(chosenPhrase); // display "_" for each letter in phrase
            drawHangmanPost();
            drawFreeWilly();
            drawDeadWilly();
            keyboard.addEventListener('click', handleLetterSelection);
        });
        startGameBtn.removeEventListener('click', startGame);
        startGameBtn.addEventListener('click', restartGame);
        startGameBtn.innerHTML = "Restart";
    }

    function drawHangmanPost() {

        // create SVG document and set size
        const draw = SVG(hangmanGraphicContainer).size('100%', '100%');
        draw.viewbox(0, 0, 400, 400);

        const basePost = draw.polyline(`100,44 100,0 400,0 200,400 400,400 0,400`);
        basePost.fill('none');
        basePost.stroke({
            color: '#000',
            width: 12,
            linecap: 'round',
            linejoin: 'round'
        });

    }

    function drawFreeWilly() {
        const svgID = hangmanGraphicContainer.querySelector('svg').getAttribute('id');
        const draw = SVG.get(svgID);

        let freeWilly = draw.group().attr('id', 'freeWilly');

        // draw body parts
        freeWilly.circle(80).move(60, 50).attr('class', 'head');
        freeWilly.line(100, 130, 100, 220).attr('class', 'body');
        freeWilly.line(100, 220, 80, 280).attr('class', 'leg1');
        freeWilly.line(100, 220, 120, 280).attr('class', 'leg2');

        freeWilly.polyline('100,150 70,190, 140, 150').attr('class', 'arm1');
        freeWilly.polyline('100,150 200,100').attr('class', 'arm2');
        freeWilly.path('M 85,80 C 85,80 90,90 95,80').attr('class', 'eye1')
        freeWilly.path('M 115,80 C 115,80 110,90 105,80').attr('class', 'eye2')

        freeWilly.path('M 90,110 C 100,115 130,110 120,100').attr('class', 'mouth');

        freeWilly.stroke({
            color: '#000',
            width: 4,
            opacity: 1,
            linecap: 'round',
            linejoin: 'round'
        });
        freeWilly.fill('none');
        freeWilly.move(0, 120);
        SVG.select('#freeWilly').attr('display', 'none');
    }

    function drawDeadWilly() {
        const svgID = hangmanGraphicContainer.querySelector('svg').getAttribute('id');
        const draw = SVG.get(svgID);

        let deadWilly = draw.group().attr('id', 'deadWilly');

        // draw body parts
        deadWilly.circle(80).move(60, 50).attr('class', 'head');
        deadWilly.line(100, 130, 100, 220).attr('class', 'body');
        deadWilly.line(100, 220, 80, 280).attr('class', 'leg1');
        deadWilly.line(100, 220, 120, 280).attr('class', 'leg2');
        deadWilly.line(100, 150, 85, 210).attr('class', 'arm1');
        deadWilly.line(100, 150, 115, 210).attr('class', 'arm2');
        deadWilly.polyline('110,70 120,80').attr('class', 'eye1A');
        deadWilly.polyline('120,70 110,80').attr('class', 'eye1B');
        deadWilly.polyline('90,70 80,80').attr('class', 'eye2A');
        deadWilly.polyline('80,70 90,80').attr('class', 'eye2B');
        deadWilly.circle(20).attr('class', 'mouth').fill('none').move(90, 100);

        deadWilly.stroke({
            color: '#000',
            width: 4,
            opacity: 1,
            linecap: 'round',
            linejoin: 'round'
        });
        deadWilly.fill('none');

        // set opacity of all body parts to 0
        deadWilly.each(function (i, children) {
            this.stroke({
                opacity: 0
            });
        });

    }

    function displayPhraseUnderscores(phrase) {
        let words = phrase.trim().split(' ');
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
                            }
                            count += 1;
                        }
                    }
                    // reveal character in final output of chosen phrase
                    if (areTwoStringEqual(goodLetters.join(''), chosenPhrase)) {
                        hangmanResultsContainer.innerHTML = `<p>YOU JUST WON HANGMAN. WOW!!!</p>`;
                        drawLimb(status = 'won');
                        stopGame();
                    }

                } else {
                    badLetters.push(selectedLetter);
                    displayBadLetters(badLetters);
                    chosenLetters.push(selectedLetter);
                    e.target.classList.add('chosen-letter');
                    drawLimb();
                    if (badLetters.length === 7) {
                        hangmanResultsContainer.innerHTML = `<p>you just lost hangman.</p>`
                        revealRemainingCharacters();
                        stopGame();
                    }
                }
            }
        }
    }

    function revealRemainingCharacters() {
        const wordBlocks = document.querySelectorAll('.project-hangman .word-block');
        let chosenPhraseSquashed = chosenPhrase.split("").filter(function (entry) {
            return entry.trim() != '';
        });

        let remainingLetters = chosenPhraseSquashed.map((char) => {
            if (goodLetters.indexOf(char) === -1) {
                return char;
            } else {
                return '';
            }
        });

        // grab remaining characters and indexes from chosen phrase
        // display them as red characters in underscore DIV
        let count = 0;

        for (let i = 0; i < wordBlocks.length; i += 1) {
            let word = wordBlocks[i].children;
            for (let j = 0; j < word.length; j += 1) {
                if (remainingLetters[count] !== '') {
                    word[j].innerHTML = remainingLetters[count];
                    word[j].style.color = 'red';
                }
                count += 1;
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

    // reveal each limb when incorrect letter is selected.If won, reveal free Willy
    function drawLimb(status) {

        const deadWilly = hangmanGraphicContainer.querySelector('svg #deadWilly');

        if (badLetters.length === 1) {
            SVG.select('#deadWilly .head', deadWilly).animate(250, '<>', 250).stroke({
                opacity: 1,
            });
        } else if (badLetters.length === 2) {
            SVG.select('#deadWilly .body', deadWilly).animate(250, '<>', 250).stroke({
                opacity: 1,
            });
        } else if (badLetters.length === 3) {
            SVG.select('#deadWilly .leg1', deadWilly).animate(250, '<>', 250).stroke({
                opacity: 1,
            });
        } else if (badLetters.length === 4) {
            SVG.select('#deadWilly .leg2', deadWilly).animate(250, '<>', 250).stroke({
                opacity: 1,
            });
        } else if (badLetters.length === 5) {
            SVG.select('#deadWilly .arm1', deadWilly).animate(250, '<>', 250).stroke({
                opacity: 1,
            });
        } else if (badLetters.length === 6) {
            SVG.select('#deadWilly .arm2', deadWilly).animate(250, '<>', 250).stroke({
                opacity: 1,
            });
        } else if (badLetters.length === 7) {
            SVG.select('#deadWilly .eye1A, #deadWilly .eye2A,#deadWilly .eye1B, #deadWilly .eye2B, #deadWilly .mouth', deadWilly).animate(250, '<>', 250).stroke({
                opacity: 1,
            });
        }
        if (status === 'won') {
            SVG.select('#deadWilly').attr('display', 'none');
            SVG.select('#freeWilly').attr('display', 'block');
        }
    }

    function stopGame() {
        playAgainBtn.style.display = 'block';
        keyboard.removeEventListener('click', handleLetterSelection);
    }

    function restartGame() {

        chosenPhrase = '';
        chosenLetters = [];
        badLetters = [];
        goodLetters = [];

        hangmanFinalPhraseContainer.innerHTML = '';
        badLettersContainer.innerHTML = '';
        hangmanGraphicContainer.innerHTML = '';
        hangmanResultsContainer.innerHTML = '';

        playAgainBtn.style.display = 'none';

        Array.prototype.forEach.call(keyboard.children, child => {
            child.classList.remove('chosen-letter');
        });

        startGame();

    }

})();
import * as Svg from 'svg.js';

const HangmanModule = (function () {

    'use strict';




    let startGameBtn = document.querySelector('.project-hangman .start-btn-js');
    let playAgainBtn = document.querySelector('.project-hangman  .playagain-btn-js')
    let keyboard = document.querySelector('.hangman-keyboard-container');
    let usedLettersContainer = document.querySelector('.used-letters-container');
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

    // start game button click event handler
    startGameBtn.addEventListener('click', startGame);
    spanClose.addEventListener('click', restartGame);

    function startGame() {
        readTextFile().then((res) => {
            chosenPhrase = chooseRandomPhrase(res);
            displayPhraseUnderscores(chosenPhrase); // display "_" for each letter in phrase
            drawHangmanPost();
            keyboard.addEventListener('click', handleLetterSelection);
        });
        startGameBtn.removeEventListener('click', startGame);
        startGameBtn.addEventListener('click', restartGame);
        startGameBtn.innerHTML = "Restart";
    }

    playAgainBtn.addEventListener('click', restartGame);

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

    function stopGame() {
        playAgainBtn.style.display = 'block';
        keyboard.removeEventListener('click', handleLetterSelection);
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

    function drawHangmanPost() {

        // define width and height of SVG document
        const width = 400;
        const height = 300;

        // create SVG document and set size
        const draw = SVG(hangmanGraphicContainer).size('100%', '100%');
        draw.viewbox(0, 0, 400, 400);

        const basePost = draw.polyline(`100,44 100,0 ${width},0 200,400 400,400 0,400`);
        basePost.fill('none');
        basePost.stroke({
            color: '#000',
            width: 12,
            linecap: 'round',
            linejoin: 'round'
        });

    }

    // TODO: Draw two versions of Willy: lose (Dead Willy) and win (Free Willy) cases.

    function drawWilly() {

    }

    // TODO: Reveal each limb when incorrect letter is selected.If won, reveal free Willy
    function drawLimb(status) {
        const svgID = hangmanGraphicContainer.querySelector('svg').getAttribute('id');
        const draw = SVG.get(svgID);


        let body = '';
        let head = ''
        let mouth = '';
        let arm1, arm2 = '';
        let eye1A, eye1B, eye2A, eye2B = '';
        let leg1, leg2 = '';

        // draw head
        head = draw.circle(80);
        head.fill('none');
        head.stroke({
            color: '#000',
            width: 4,
            opacity: 0,
            linecap: 'round',
            linejoin: 'round'
        });
        head.move(60, 50);

        //draw body
        body = draw.line(100, 130, 100, 220);
        body.stroke({
            color: '#000',
            width: 4,
            opacity: 0,
            linecap: 'round',
            linejoin: 'round'
        });

        // draw first leg
        leg1 = draw.line(100, 220, 80, 280);
        leg1.stroke({
            color: '#000',
            width: 4,
            opacity: 0,
            linecap: 'round',
            linejoin: 'round'
        });

        // draw second leg
        leg2 = draw.line(100, 220, 120, 280);
        leg2.stroke({
            color: '#000',
            width: 4,
            opacity: 0,
            linecap: 'round',
            linejoin: 'round'
        });

        // draw first arm
        arm1 = draw.line(100, 150, 85, 210);
        arm1.stroke({
            color: '#000',
            width: 4,
            opacity: 0,
            linecap: 'round',
            linejoin: 'round'
        });

        // draw second arm
        arm2 = draw.line(100, 150, 115, 210);
        arm2.stroke({
            color: '#000',
            width: 4,
            opacity: 0,
            linecap: 'round',
            linejoin: 'round'
        });


        if (badLetters.length === 1) {
            head.animate(250, '<>', 250).stroke({
                opacity: 1,
            });
        } else if (badLetters.length === 2) {
            body.animate(250, '<>', 250).stroke({
                opacity: 1,
            });
        } else if (badLetters.length === 3) {
            leg1.animate(250, '<>', 250).stroke({
                opacity: 1,
            });
        } else if (badLetters.length === 4) {
            leg2.animate(250, '<>', 250).stroke({
                opacity: 1,
            });
        } else if (badLetters.length === 5) {
            arm1.animate(250, '<>', 250).stroke({
                opacity: 1,
            });
        } else if (badLetters.length === 6) {
            arm2.animate(250, '<>', 250).stroke({
                opacity: 1
            });
        } else if (badLetters.length === 7) {
            eye1A = draw.polyline('110,70 120,80');
            eye1B = draw.polyline('120,70 110,80');
            eye1A.animate(250, '<>', 250).stroke({
                color: '#000',
                width: 2,
                linecap: 'round',
                linejoin: 'round'
            });
            eye1B.animate(250, '<>', 250).stroke({
                color: '#000',
                width: 2,
                linecap: 'round',
                linejoin: 'round'
            });

            eye2A = draw.polyline('90,70 80,80');
            eye2B = draw.polyline('80,70 90,80');
            eye2A.animate(250, '<>', 250).stroke({
                color: '#000',
                width: 2,
                linecap: 'round',
                linejoin: 'round'
            });
            eye2B.animate(250, '<>', 250).stroke({
                color: '#000',
                width: 2,
                linecap: 'round',
                linejoin: 'round'
            });

            mouth = draw.circle(20);
            mouth.fill('none');
            mouth.animate(250, '<>', 250).stroke({
                color: '#000',
                width: 2,
                linecap: 'round',
                linejoin: 'round'
            });
            mouth.move(90, 100);
        }

        if (status === 'won') {
            // free Willy, change mouth expression, reveal all limbs

            // head.animate(250, '<>', 250).stroke({
            //     opacity: 1,
            // });
            // head.move(60, 400);
            // arm1.animate(250, '<>', 250).stroke({
            //     opacity: 1,
            // });
            // arm1.move(60, 400);
            // arm2.animate(250, '<>', 250).stroke({
            //     opacity: 1,
            // });
            // arm2.move(60, 400);


        }

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


    // generate hangman post
    // restart game
    // display result
    // check letter



})();
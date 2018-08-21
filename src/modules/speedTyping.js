const SpeedTypingModule = (function () {

    'use strict';

    let timerInterval;
    let elapsed = 0;
    let timerFired = false;
    let testComplete = false;
    let typingArea = document.querySelector(".project-speedType__textarea");
    let tryAgainBtn = document.querySelector(".project-speedType__tryagain-btn");
    let diffPromptBtn = document.querySelector(".project-speedType__diffprompt-btn");
    let speedtestSpanClose = document.querySelector(".project-speedType .close-js");
    let timerPara = document.querySelector(".project-speedType__timer");

    // Read in text file of prompts.
    readTextFile('assets/text/speedTestPrompts.txt');

    // Event listeners
    typingArea.addEventListener("keyup", function () {

        if (timerFired === false) {
            startTimer();
        }
        if (testComplete === false) {
            checkString();
        }
    });

    tryAgainBtn.addEventListener("click", function () {
        resetTimer();
        clearFields();
    });

    diffPromptBtn.addEventListener("click", function () {
        resetTimer();
        clearFields();
        readTextFile("assets/text/speedTestPrompts.txt");
    });

    speedtestSpanClose.addEventListener("click", function () {
        clearFields();
    });

    // Private Function definitions
    function readTextFile(file) {
        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", file);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var rawText = rawFile.responseText;
                    displayPrompt(rawText);
                }
            }
        };
        rawFile.send(null);
    }

    function displayPrompt(promptText) {
        let promptArray = promptText.split("\n");
        let promptPara = document.querySelector(".project-speedTest__prompt");
        let randPrompt = promptArray[Math.floor(Math.random() * promptArray.length)];
        promptPara.innerHTML = randPrompt;
    }

    function checkString() {
        let promptPara = document.querySelector(".project-speedTest__prompt");

        if (typingArea.value !== promptPara.innerText.slice(0, typingArea.value.length)) {
            typingArea.style.border = "5px solid red";
        } else {
            typingArea.style.border = "5px solid darkorange";
        }

        if (typingArea.value === promptPara.innerText) {

            testComplete = true;
            typingArea.style.border = "5px solid lightgreen";

            stopTimer();
        }
    }

    function startTimer() {
        timerFired = true;
        let start = new Date().getTime();
        timerInterval = setInterval(function () {

            let timer = new Date().getTime() - start;
            let totalSecs = Math.floor((timer / 100) / 10);
            let hundredthsSecs = Math.floor((timer / 10)) % 100;

            let secs = totalSecs % 60;
            let mins = Math.floor(totalSecs / 60);

            // add leading zero
            function pad(time) {
                let timeString = time + "";
                if (timeString.length < 2) {
                    return "0" + timeString;
                } else {
                    return timeString;
                }
            }

            elapsed = totalSecs;

            timerPara.innerHTML = pad(mins) + ":" + pad(secs) + ":" + pad(hundredthsSecs);

        }, 10);

    }

    function stopTimer() {
        clearInterval(timerInterval);
        displayResult();
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timerFired = false;
        testComplete = false;
        timerPara.innerHTML = "00:00:00";
    }

    function clearFields() {
        let resultWPM = document.querySelector(".project-speedType__result-WPM");
        let resultBlurb = document.querySelector(".project-speedType__result-blurb");

        resultWPM.innerHTML = "";
        resultBlurb.innerHTML = "";
        typingArea.value = "";

        elapsed = 0;

        typingArea.style.border = "1px solid #ced4da";

        resetTimer();
    }

    function displayResult() {

        let resultWPM = document.querySelector(".project-speedType__result-WPM");
        let resultBlurb = document.querySelector(".project-speedType__result-blurb");
        let promptPara = document.querySelector(".project-speedTest__prompt");

        let numWords = (promptPara.innerText).split(" ").length;

        let wordsPerMinute = Math.floor(numWords / (elapsed / 60));

        resultWPM.innerHTML = "Results: " + wordsPerMinute + " Words Per Minute.";

        if (wordsPerMinute < 20) {
            resultBlurb.innerHTML = "You didn't even try, did you...";
        } else if (wordsPerMinute >= 20 && wordsPerMinute < 30) {
            resultBlurb.innerHTML = "That was OK.";
        } else if (wordsPerMinute >= 30 && wordsPerMinute <= 60) {
            resultBlurb.innerHTML = "That was GOOD.";
        } else if (wordsPerMinute > 60) {
            resultBlurb.innerHTML = "That was MOST EXCELLENT.";
        }
    }
})();

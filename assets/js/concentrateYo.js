(function () {

    const createGridBtn = document.getElementById('project-concentrateYo__createGrid-btn');
    const modalContainer = document.getElementById('modal-container__project-concentrateYo');
    const modalColumn = document.getElementById('');
    const gridSizeInput = document.getElementById('project-concentrateYo__gridSizeInput');
    const gridContainer = document.querySelector('.project-concentrateYo__grid-container');
    const resultAccuracy = document.getElementById('project-concentrateYo__result-accuracy');
    const resultBlurb = document.getElementById('project-concentrateYo__result-blurb');
    const playAgainBtn = document.getElementById("project-concentrateYo__playagain-btn");
    const spanClose = document.getElementById("project-concentrateYo__span-close");
    const timerPara = document.getElementById("project-concentrateYo__timer");
    const gridError = document.querySelector('.project-concentrateYo__grid-error');

    let prevTile;
    let clickDisabled = false;
    let firstClick = true;
    let numMatched = 0;
    let numTries = 0;
    let numImages = 0;
    let timerInterval;
    let elapsed = 0;
    let timerFired = false;
    let testComplete = false;

    createGridBtn.addEventListener('click', function () {
        // error input handling type number
        if (gridSizeInput.value) {
            createGrid(parseInt(gridSizeInput.value));
        }
    });

    playAgainBtn.addEventListener("click", function () {
        resetTimer();
        clearFields();
    });

    spanClose.addEventListener("click", function () {
        clearFields();
    });

    function createGrid(gridSize) {

        clearFields();

        firstClick = true;
        numMatched = 0;
        numImages = 0;
        numTries = 0;
        prevTile = undefined;

        if (gridSize) {

            // validate number is ONLY 2, 4, 6, 8 or 10. 
            if (gridSize === 2 || gridSize === 4 || gridSize === 6 || gridSize === 8 || gridSize === 10) {

                gridError.innerHTML = "";

                let imgArray = [];
                imgArray = getImages(gridSize);

                let imgArrayShuffled = shuffle(imgArray);
                // Loop through shuffled image array and output to browser. 

                let columnSize = '';

                const imgTileContainer = document.querySelectorAll('.imgTile-container');

                if (gridSize === 2) {
                    columnSize = '0.25fr';
                } else if (gridSize === 4) {
                    columnSize = '12%';
                } else if (gridSize === 6) {
                    columnSize = '10%';
                } else if (gridSize === 8) {
                    columnSize = '10%';
                } else if (gridSize === 10) {
                    columnSize = '7%';
                    // gridContainer.style.maxWidth = `80%`;
                    for (let i = 0; i < imgTileContainer.length; i += 1) {
                        // imgTileContainer[i].style.minWidth = `50px`;
                    }
                }

                // gridContainer.style.gridTemplateColumns = `repeat(${gridSize},${columnSize})`;
                gridContainer.style.gridTemplateColumns = `repeat(${gridSize},${columnSize})`;


                imgArrayShuffled.map((item, index) => {
                    setTimeout(() => {
                        gridContainer.innerHTML += `<div class="imgTile-container"><div><p class="imgTile closed" data-tileid="${index}"></p><img src="assets/img/concentrateYo/${item}.png"></div></div>`
                    }, index * 50);
                }).join('')
            } else {
                gridError.innerHTML = "Grid size can only be 2, 4, 6, 8 or 10."
            }
        }
    }

    // function setVendor(element, property, value) {
    //     console.log(element.style);
    //     element.style["moz-" + property] = value;
    //     element.style["ms-" + property] = value;
    //     element.style["o-" + property] = value;
    //   }

    function getImages(gridSize) {

        let imgSrc = [];
        let imageArray = [];

        for (let i = 0; i < (gridSize * gridSize) / 2; i += 1) {

            imageArray.push(`tileImg-${i}`);
        }

        numImages = imageArray.length;

        imageArray.push(...imageArray);

        return imageArray;
    }

    function shuffle(array) {

        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    gridContainer.addEventListener('click', checkTile);

    function checkTile(e) {

        if (clickDisabled === false) {

            if ((e.target).classList.contains('imgTile')) {

                if (firstClick === true) {
                    startTimer();
                    firstClick = false;
                }

                let currentTile = e.target;

                // if tile is closed, make it open
                if (currentTile.classList.contains('closed')) {
                    currentTile.classList.add('open');
                    currentTile.classList.remove('closed');
                }

                // check if only one tile has been clicked/uncovered
                if (prevTile !== undefined) {
                    // if two tiles are the same image but not the exact tile, they are done!
                    if (currentTile.nextSibling.getAttribute('src') === prevTile.nextSibling.getAttribute('src') && currentTile.getAttribute('data-tileid') !== prevTile.getAttribute('data-tileid')) {
                        // make both tiles classes 'done'
                        currentTile.classList.remove('open');
                        currentTile.classList.add('done');
                        currentTile.setAttribute('disabled', true);
                        prevTile.classList.remove('open');
                        prevTile.classList.add('done');
                        prevTile.setAttribute('disabled', true);
                        prevTile = undefined;
                        currentTile = undefined;

                        numMatched += 1;
                        numTries += 1;

                        // if all tiles are matched, output DONE.
                        if (numMatched === numImages) {
                            stopTimer();
                            return;
                        }

                        // if exact same tile is clicked, do nothing.
                    } else if (currentTile.getAttribute('data-tileid') === prevTile.getAttribute('data-tileid')) {
                        return;
                    } else {
                        // tiles are unmatched, make both tiles classes 'closed'
                        clickDisabled = true;
                        setTimeout(function () {
                            currentTile.classList.remove('open');
                            currentTile.classList.add('closed');
                            prevTile.classList.remove('open');
                            prevTile.classList.add('closed');
                            prevTile = undefined;
                            currentTile = undefined;
                            clickDisabled = false;
                        }, 1000)
                        numTries += 1;
                        return;
                    }
                }
                prevTile = currentTile;
            }
            e.stopPropagation();
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
        // alert('Game Finished!');
        clearInterval(timerInterval);
        displayResult();
    }

    function displayResult() {

        let accuracy = Math.round((numImages / numTries) * 100);

        resultAccuracy.innerHTML = `<p>Results</p><p>Your accuracy was: ${accuracy}%</p>`;

        if (accuracy < 40) {
            resultBlurb.innerHTML = "<p>M'eh. I think you can do better.</p>";
        } else if (accuracy >= 40 && accuracy <= 80) {
            resultBlurb.innerHTML = "<p>Pretty good! Prettayyy, prettayyyy, pretty good!</p>";
        } else if (accuracy > 80 && accuracy < 100) {
            resultBlurb.innerHTML = "<p>You remember things well.</p>";
        } else if (accuracy === 100) {
            resultBlurb.innerHTML = "<p>Wow. That was unreal. Teach Me.</p>";
        }

    }

    function resetTimer() {
        clearInterval(timerInterval);
        timerFired = false;
        testComplete = false;
        timerPara.innerHTML = "00:00:00";
    }

    function clearFields() {

        gridError.innerHTML = "";
        resultAccuracy.innerHTML = "";
        resultBlurb.innerHTML = "";
        gridContainer.innerHTML = "";
        gridSizeInput.value = "";


        firstClick = true;

        elapsed = 0;

        resetTimer();
    }

})();
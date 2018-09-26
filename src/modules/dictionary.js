const DictionaryModule = (function () {

    'use strict';

    const wordInput = document.querySelector('.word-input-js');
    const dictionaryForm = document.querySelector('.dictionary-form');
    const definitionResultsContainer = document.querySelector('.definition-results-container-js');
    const definitionResultsLoader = document.querySelector('.definition-results-loader-js');
    const definitionListContainer = document.querySelector('.definition-list-js');
    const clearAllDefinitionsAllBtn = document.querySelector('.clear-definitions-all-js');

    let wordResults = [];
    let wordList = [];
    let word = '';
    // let selectedWord = {
    //     word: '',
    //     partOfSpeech: '',
    //     definition: ''
    // };

    // localStorage.clear();

    definitionResultsContainer.addEventListener('click', addDefinitiontoLocalStorage);
    definitionListContainer.addEventListener('click', removeDefinitionfromLocalStorage);
    dictionaryForm.addEventListener('submit', getDefinition);
    clearAllDefinitionsAllBtn.addEventListener('click', removeAllDefinitionsfromLocalStorage)

    function SelectedWord(word, partOfSpeech, definition) {

        this.word = word;
        this.partOfSpeech = partOfSpeech;
        this.definition = definition;



        // return {
        //     word: '',
        //     partOfSpeech: '',
        //     definition: ''
        // };
    }

    function getDefinition(e) {
        e.preventDefault();

        definitionResultsContainer.innerHTML = '';
        definitionResultsLoader.style.display = 'block';
        // selectedWord = {
        //     word: '',
        //     partOfSpeech: '',
        //     definition: ''
        // };

        let getRequest = {
            host: "od-api.oxforddictionaries.com",
            path: "https://od-api.oxforddictionaries.com/api/v1/entries/en/" + wordInput.value,
            port: "443",
            method: "GET",
            rejectUnauthorized: false,
            headers: {
                'Content-Type': 'text/html',
                'app_id': '5cbb2a70',
                'app_key': 'acde5f6aea82f24dddedd0665eb65233',
            }
        };

        fetch(`https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v1/entries/en/${wordInput.value}`, getRequest)
            .then(response => response.json())
            .then(data => {

                definitionResultsLoader.style.display = 'none';

                let num = 0;
                word = wordInput.value;

                // let selectedWord.word = wordInput.value;

                wordResults = data.results[0].lexicalEntries;
                console.log(wordResults);

                wordResults.forEach((lexicalEntry) => {
                    definitionResultsContainer.innerHTML += `
                        <div>
                            <h3>${lexicalEntry.lexicalCategory}</h3>
                            ${lexicalEntry.entries.map((entry) =>{
                                return entry.senses.map((sense) => {
                                    num += 1;
                                    if (sense.definitions) {
                                        return `<p class="definition definition-js" data-word-partofspeech="${lexicalEntry.lexicalCategory}">${sense.definitions[0]}<span class="plus-icon fas fa-plus"></span></p>`
                                    }
                                }).join('');
                            }).join('')
                        }
                        </div>
                    `;


                });
            })
            .catch(error => {
                definitionResultsLoader.style.display = 'none';
                console.log('error is', error)
                definitionResultsContainer.innerHTML += `<p>Cannot find word ${wordInput.value}</p><p>Please check your spelling.</p>`

            });




    }

    function clearDefinition() {

    }

    function addDefinitiontoLocalStorage(e) {
        if (e.target.classList.contains('definition-js')) {

            let selectWord = new SelectedWord(word, e.target.getAttribute('data-word-partofspeech'), e.target.textContent);

            wordList = JSON.parse(localStorage.getItem('definitions'));
            wordList.push(selectWord);
            localStorage.setItem('definitions', JSON.stringify(wordList));
            displayLocalStorage();
            // console.log(document.querySelector('.definition-list-js').lastElementChild);
            // scrollTo(document.querySelector('.definition-list-js').lastElementChild);
            scrollTo(document.querySelector('.modal'));
        }
    }

    function removeDefinitionfromLocalStorage(e) {
        if (e.target.classList.contains('definition-saved-js')) {

            let selectedWordID = Number(e.target.getAttribute('data-word-id'));

            wordList = JSON.parse(localStorage.getItem('definitions'));

            if (confirm('Are you sure you want to delete this definition?')) {
                wordList.splice(selectedWordID, 1);
                localStorage.setItem('definitions', JSON.stringify(wordList));
                displayLocalStorage();
            }
        }
    }

    function displayLocalStorage() {
        definitionListContainer.innerHTML = '';
        definitionListContainer.innerHTML +=
            `
        ${JSON.parse(localStorage.getItem('definitions')).map((item, index) => {
            return `<p class="definition-saved-js" data-word-id="${index}"><span>${index + 1}. </span>${item.word}, [${item.partOfSpeech}] -  ${item.definition}<span class="trash-icon fas fa-trash-alt"></span></p>`
        }).join('')}
        `


    }

    function removeAllDefinitionsfromLocalStorage() {
        if (confirm('Are you sure you want to delete all definitions?')) {
            wordList = [];
            localStorage.setItem('definitions', JSON.stringify(wordList));
            displayLocalStorage();
        }
    }

    displayLocalStorage();






    function scrollTo(element, to = 0, duration = 1000) {
        console.log(element);
        const start = element.scrollTop;
        const change = to - start;
        const increment = 20;
        let currentTime = 0;

        const animateScroll = (() => {

            currentTime += increment;

            const val = Math.easeInOutQuad(currentTime, start, change, duration);

            element.scrollTop = val;

            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        });

        animateScroll();
    };

    Math.easeInOutQuad = function (t, b, c, d) {

        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };




})();
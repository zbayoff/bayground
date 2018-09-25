const DictionaryModule = (function () {

    const wordInput = document.querySelector('.word-input-js');
    const dictionaryForm = document.querySelector('.dictionary-form');
    const definitionResultsContainer = document.querySelector('.definition-results-container-js');
    const definitionResultsLoader = document.querySelector('.definition-results-loader-js');
    let wordResults = [];
    let wordList = [];
    let selectedWord = {
        word: '',
        partOfSpeech:'',
        definition: ''
    };

    localStorage.clear();

    definitionResultsContainer.addEventListener('click', addDefinitiontoLocalStorage);
    dictionaryForm.addEventListener('submit', getDefinition);

    function getDefinition(e) {
        e.preventDefault();

        definitionResultsContainer.innerHTML = '';
        definitionResultsLoader.style.display = 'block';
        selectedWord = {
            word: '',
            partOfSpeech:'',
            definition: ''
        };

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

                selectedWord.word = wordInput.value;
                
                wordResults = data.results[0].lexicalEntries;
                console.log(wordResults);

                wordResults.forEach((lexicalEntry) => {
                    definitionResultsContainer.innerHTML += `
                        <div>
                            <h3>${lexicalEntry.lexicalCategory}</h3>
                            ${lexicalEntry.entries.map((entry) =>{
                                return entry.senses.map((sense) => {
                                    num += 1;
                                    return `<p class="definition definition-js" data-word-partofspeech="${lexicalEntry.lexicalCategory}">${sense.definitions[0]}<span class="plus-icon fas fa-plus"></span></p>`
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
        if(e.target.classList.contains('definition-js')) {
            
            selectedWord.definition = e.target.textContent;
            selectedWord.partOfSpeech = e.target.getAttribute('data-word-partofspeech');

            // console.log(selectedWord);
            
            // a = JSON.parse(localStorage.getItem('definitions'));
            // console.log(wordList);
            console.log(selectedWord);

            wordList.push(selectedWord);
            // localStorage.setItem('definitions', JSON.stringify(a));
            console.log(wordList);

            // a.push
            // let definition = e.target.textContent;
            // localStorage.setItem(wordInput.value, definition)
        }
    }

    function deleteDefinitions() {

    }

    function deleteDefinition() {

    }




})();
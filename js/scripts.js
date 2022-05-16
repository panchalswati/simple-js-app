const pokemonRepository = (function () {
    const pokemonList = [];
    // loading external data
    
    const searchInput = document.querySelector('#myInput');
    const prevBtn = document.getElementById("prevbtn");
    const nextBtn = document.getElementById("nextbtn");
    let PREV_URL = null;
    let NEXT_URL = null;

    searchInput.addEventListener('input', search);

    add = (pokemon) => pokemonList.push(pokemon);

    getAll = () => pokemonList;

    function addListItem(pokemon) {
        const list = document.querySelector('.pokemon-list');
        const listItem = document.createElement('li');
        listItem.classList.add('group-pokemon-list');
        const button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('highlights-name');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemonModal');
        listItem.append(button);
        list.append(listItem);
        addEvent(button, pokemon);
    }

    function addEvent(button, pokemon) {
        button.addEventListener('click', function () {
            showDetails(pokemon);
        })
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }
    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // add details 
            pokemon.imageUrlFront = details.sprites.front_default;
            pokemon.imageUrlBack = details.sprites.back_default;
            pokemon.height = details.height;
            pokemon.weight = details.weight;
            pokemon.types = details.types;
            pokemon.nextButton = details.next;
            pokemon.previousButton = details.previous;

        }).catch(function (e) {
            console.error(e);
        });
    }

    function loadList(apiUrl) {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            PREV_URL = json.previous;
            NEXT_URL = json.next;
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                }
                add(pokemon);
            })
        }).catch(function (e) {
            console.error(e);

        });
    }

    function clearList() {
        const list = document.querySelector('.pokemon-list');
        list.innerHTML = "";
        pokemonList.length = 0;
        
    }

    // If the prev or next url is null, then disable the button
    prevBtn.addEventListener('click', getPrev);
    function getPrev(e) {
       
        if(PREV_URL==null){
            prevBtn.disabled=true;
        }
        else{
            clearList()
            loadList(PREV_URL).then(function () {
                getAll().forEach(function (pokemon) {
                    addListItem(pokemon);
                })
            })

        }
    }


    nextBtn.addEventListener('click', getNext);
    function getNext(e) {
        if(NEXT_URL==null){
            nextBtn.disabled=true;
        }
        else{
            clearList()
            loadList(NEXT_URL).then(function () {
                getAll().forEach(function (pokemon) {
                    addListItem(pokemon);
                })
            })
        }
        
    }

    function search(e) {
        const keyword = e.target.value;
        const pokeList = document.querySelectorAll("li");
        pokeList.forEach(p => {
            if (p.innerText.toUpperCase().includes(keyword.toUpperCase())) {
                p.style.display = "block";
            }
            else {
                p.style.display = "none";
            }
        })
    }

    // showModal function
    function showModal(pokemon) {
        let modalTitle = $('.modal-title');
        let modalBody = $('.modal-body');
        let pokemonName = $('<h2>' + pokemon.name + '</h2>');
        let pokemonHeight = $('<p>' + "Height: " + pokemon.height + '</p>');
        let pokemonWeight = $('<p>' + "Weight: " + pokemon.weight + '</p>');
        let imageElementFront = $('<img class=\'pokemon-modal-image\'>');
        imageElementFront.attr("src", pokemon.imageUrlFront);
        let imageElementBack = $('<img class=\'pokemon-modal-image\'>');
        imageElementBack.attr("src", pokemon.imageUrlBack);
        let typeTextElement = $("<p>" + "Types: " + "</p>");
        let typeElement = document.createElement('p');
        pokemon.types.forEach((type, index) => {
            if (index === pokemon.types.length - 1) {
                typeElement.innerText += type.type.name;
            } else {
                typeElement.innerText += type.type.name + ", ";
            }
        })

        modalTitle.empty();
        modalBody.empty();;
        modalTitle.append(pokemonName);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(pokemonHeight);
        modalBody.append(pokemonWeight);
        modalBody.append(typeTextElement);
    }

    return {
        add, getAll, addListItem, showDetails, addEvent, loadList, loadDetails,
    }
})();

const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=28';
// This duplicating so create func and reuse
pokemonRepository.loadList(apiUrl).then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    })
})

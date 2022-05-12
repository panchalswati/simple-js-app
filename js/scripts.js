const pokemonRepository = (function () {
    const pokemonList = [];
    // loading external data
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');

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

        }).catch(function (e) {
            console.error(e);
        });
    }

    function loadList(pokemon) {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
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
        modalBody.append(typeElement);
    }

    return {
        add, getAll, addListItem, showDetails, addEvent, loadList, loadDetails,
    }
})();
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    })
})

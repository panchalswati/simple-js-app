const pokemonRepository = (function () {
    const pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    add = (pokemon) => pokemonList.push(pokemon);
    getAll = () => pokemonList;
    function addListItem(pokemon) {
        const list = document.querySelector('.pokemon-list');
        const listItem = document.createElement('li');
        const button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('highlights-name');
        listItem.appendChild(button);
        list.appendChild(listItem);
        addEvent(button, pokemon);
    }
    function addEvent(button, pokemon) {
        button.addEventListener('click', function () {
            showDetails(pokemon);
        })
    }
    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // add details 
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
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
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }
    return {
        add, getAll, addListItem, showDetails, addEvent, loadList, loadDetails
    };
})();
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    })
});


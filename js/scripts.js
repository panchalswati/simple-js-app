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
                }
                add(pokemon);
            })
        }).catch(function (e) {
            console.error(e);

        });
    }         

    // showModal function
    function showModal(pokemon) {
        modalContainer.innerText = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        // Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'X';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h2');
        titleElement.innerText = pokemon.name;

        let contentElement = document.createElement('p');
        contentElement.innerText = 'Height: ' + pokemon.height;

        let typeElement = document.createElement('p');
        typeElement.innerText = 'Types: ';
        pokemon.types.forEach((type, numberOfTypes) => {
            numberOfTypes = pokemon.types.pokemon;
            if (numberOfTypes === 1) {
                typrElement.innerText += type.type.name;
            } else {
                typeElement.innerText += type.type.name + " ";
            }
        })

        let imageElement = document.createElement('img');
        imageElement.classList.add('modal-image');
        imageElement.src = pokemon.imageUrl;

        //append to modal
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(typeElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
        document.querySelector('#show-modal').addEventListener('click', () => {
            showModal(pokemon);
        });

        //  event listener to window for keyboard input esc
        window.addEventListener('keydown', (e) => {
        //  if user esc and modal container is visible, executes hideModal function
            if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                hideModal();
            }
        });
        window.addEventListener('keydown', (e) => {
            let modalContainer = document.querySelector('#modal-container');
            if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                hideModal();
            }
        });

        modalContainer.addEventListener('click', (e) => {
            // We only want to close if the user clicks directly on the overlay
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
        // event listener to modal
        modal.addEventListener('click', (e) => {
            // We only want to close if the user clicks directly on the overlay
            let target = e.target;
            if (target === modal) {
                hideModal();
            }
        });

        // event listener when user clicks outside
        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }
    
        function hideModal() {
            modalContainer.classList.remove('is-visible');
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
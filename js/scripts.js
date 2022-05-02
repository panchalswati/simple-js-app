const pokemonRepository = (function () {
  const pokemonList = [
    {
      name: 'Bulbasaur',
      height: 2,
      types: ['grass', 'poison'],
      category: 'Seed'
    },
    {
      name: 'Ivysaur',
      height: 3,
      types: ['grass', 'poison'],
      category: 'Seed'
    },
    {
      name: 'Wartortle',
      height: 3,
      types: ['water'],
      category: 'Turtle'
    },
    {
      name: 'Caterpie',
      height: 1,
      types: ['bug'],
      category: 'Worm'
    },
    {
      name: 'Venusaur',
      height: 6,
      types: ['grass', 'poison'],
      category: 'Seed'
    },
    {
      name: 'Charmander',
      height: 2,
      types: ['fire'],
      category: 'Lizard'
    },
    {
      name: 'Charizard',
      height: 5,
      types: ['fire', 'flying'],
      category: 'Flame'
    }
  ]
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
        console.log(pokemon);
    }
    return {
        add, getAll, addListItem,showDetails,addEvent
    };
})();
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});


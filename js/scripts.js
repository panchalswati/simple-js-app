// Array of Pokemon objects
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
pokemonList.forEach(function (pokemon) {
  document.write('<p>' + pokemon.name, '(height: ' + pokemon.height + ')</p>')
})()

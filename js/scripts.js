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
  function add (pokemon) {
    pokemonList.push(pokemon)
  }

  function getAll () {
    return pokemonList
  }
  return {
    add: add,
    getAll: getAll
  }
})()
console.log(pokemonRepository.getAll())
pokemonRepository.add({ name: 'Butterfree', height: 3, types: ['bug', 'flying'], category: 'Butterfly' })
console.log(pokemonRepository.getAll())

pokemonRepository.getAll().forEach(function (pokemon) {
  if (pokemon.height > 5) {
    document.write('<p class="special">' + pokemon.name, '(height: ' + pokemon.height + ')-Wow!-that\'s big</p>')
  } else {
    document.write('<p>' + pokemon.name, '(height: ' + pokemon.height + ')</p>')
  }
})
// Bonus Task
Object.keys(pokemonRepository).forEach(function (item) {
  console.log(pokemonRepository[item])
})

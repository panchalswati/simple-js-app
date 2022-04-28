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

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 5) { // Highlighting the special big pokemon in the list
    document.write('<p class="special">' + pokemonList[i].name, '(height: ' + pokemonList[i].height + ')-Wow!-that\'s big</p>')
  } else {
    document.write('<p>' + pokemonList[i].name, '(height: ' + pokemonList[i].height + ')</p>')
  }
}

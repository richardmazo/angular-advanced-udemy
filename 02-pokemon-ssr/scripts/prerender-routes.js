const TOTAL_POKEMONS = 151;
const TOTAL_PAGES = 5;

( async()  => {

  const fs = require('fs');

  const pokemonsIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
  let fileContent = pokemonsIds.map(
    id => `/pokemons/${id}`
  ).join('\n');

  const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);
  fileContent += '\n' + pages.map(
    page => `/pokemons/page/${page}`
  ).join('\n');

  // Por nombres de Pokémons
  const pokemonNames = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`)
    .then(response => response.json())
    .then(data => data.results.map(pokemon => pokemon.name));

  fileContent += '\n' + pokemonNames.map(
    name => `/pokemons/${name}`
  ).join('\n');


  fs.writeFileSync('routes.txt', fileContent);

  console.log('Routes have been written to routes.txt');
})()

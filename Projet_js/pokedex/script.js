const listPoke = document.querySelector('.list-poke');
const searchForm = document.querySelector('.recherche-poke');
const searchInput = document.querySelector('.recherche-poke input');
const loader = document.querySelector('.loader');

let allPokemon = [];
let displayedPokemon = [];
const limit = 1010; // On récupère TOUS les Pokémon disponibles
const initialDisplay = 24;
let index = initialDisplay;
const increment = 24;

async function fetchPokemonBase() {
    loader.style.display = 'block';
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
    let response = await fetch(url);
    let data = await response.json();
    let promises = data.results.map(pokemon => fetchPokemonComplet(pokemon));
    allPokemon = await Promise.all(promises);
    displayedPokemon = allPokemon.slice(0, initialDisplay);
    createCard(displayedPokemon);
    loader.style.display = 'none';
}

async function fetchPokemonComplet(pokemon) {
    let response = await fetch(pokemon.url);
    let pokeData = await response.json();
    return {
        id: pokeData.id,
        name: pokeData.name,
        image: pokeData.sprites.front_default,
        types: pokeData.types.map(t => t.type.name)
    };
}

function createCard(pokemonArray) {
    pokemonArray.forEach(pokemon => {
        let li = document.createElement('li');
        li.classList.add('hoverableCarte');
        li.style.backgroundColor = getColorByType(pokemon.types[0]);
        
        li.innerHTML = `
            <h5>${pokemon.name}</h5>
            <p>#${pokemon.id}</p>
            <img src="${pokemon.image}" alt="${pokemon.name}">
        `;
        
        listPoke.appendChild(li);
    });
}

function getColorByType(type) {
    const colors = {
        fire: '#FDDFDF', water: '#DEF3FD', grass: '#DEFDE0', electric: '#FCF7DE', bug: '#F8D5A3',
        poison: '#E0A7F7', normal: '#F5F5F5', ground: '#F4E7DA', fairy: '#FCEAFF',
        fighting: '#E6E0D4', psychic: '#EAEDA1', rock: '#D5D5D4', ghost: '#705898',
        ice: '#96D9D6', dragon: '#97B3E6'
    };
    return colors[type] || '#F5F5F5';
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let filter = searchInput.value.toLowerCase();
    let filteredPokemon = allPokemon.filter(p => p.name.includes(filter));
    listPoke.innerHTML = '';
    createCard(filteredPokemon);
});

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        if (index < allPokemon.length) {
            let nextPokemon = allPokemon.slice(index, index + increment);
            index += increment;
            createCard(nextPokemon);
        }
    }
});

document.addEventListener('DOMContentLoaded', fetchPokemonBase);
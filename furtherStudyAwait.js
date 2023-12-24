const baseURL = "https://pokeapi.co/api/v2";
const pokemonDiv = document.querySelector('#pokemon');

async function getPokemon(){
    let pokemonList = await axios.get(`${baseURL}/pokemon/?limit=1000`);
    console.log(pokemonList)
    let randomUrls = [];
    for (let i=0; i<3; i++){
        let number = Math.floor(Math.random() * (1, pokemonList.data.results.length));
        randomUrls.push(pokemonList.data.results[number].url)
    }

    getRandomData(randomUrls)
}

let pokemon = {};

async function getRandomData(urls){
    for (let url of urls){
        let res = await axios.get(url);
        console.log(res.data)
        let name = res.data.name;
        let image = res.data.sprites.front_default;
        let flavor = await getSpeciesFlavor(res.data.species.url);
        showPokemon(name, image, flavor)
    }
}

async function getSpeciesFlavor(url){
    let species = await axios.get(url);
    console.log(species)
    for (let i=0; i<species.data.flavor_text_entries.length; i++){
        if(species.data.flavor_text_entries[i].language.name === 'en'){
            return species.data.flavor_text_entries[i].flavor_text
        } else {
            return "No description available"
        }
    }
}

function showPokemon(name, image, flavor) {
    pokemonDiv.innerHTML += `
      <div class="card">
        <h1>${name}</h1>
        <img src=${image} />
        <p>${flavor}</p>
      </div>`
    ;
  }

const url = 'http://numbersapi.com/1..3,10?json';
const urlFav = 'http://numbersapi.com/8?json';

const listDiv = document.querySelector('#trivia-list');
const favDiv = document.querySelector('#favorite-number');

// Part I
async function getFactFav(){
    let fact = await axios.get(`${urlFav}`)
    console.log(fact.data.text)
}

getFactFav()

// Part II
async function getFactMulti(){
    let facts = await axios.get(`${url}`);
    const factsData = Object.values(facts.data);
    factsData.forEach(fact => {
        let p = document.createElement('p');
        listDiv.append(fact, p);
    })
}

getFactMulti()

// Part III
async function getFactFour() {
    let fact = axios.get(`${urlFav}`);
    let facts = await Promise.all([
        axios.get(`${urlFav}`),
        axios.get(`${urlFav}`),
        axios.get(`${urlFav}`),
        axios.get(`${urlFav}`)
    ])
    for (i=0; i<facts.length; i++){
        let p = document.createElement('p');
        favDiv.append(facts[i].data.text, p);
    }
}

getFactFour()
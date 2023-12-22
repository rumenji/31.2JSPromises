const url = 'http://numbersapi.com/1..3,10?json';

const listDiv = document.querySelector('#trivia-list');
const favDiv = document.querySelector('#favorite-number');

axios
    .get(`${url}`)
    .then(p1 => {
        let listTrivia = Object.values(p1.data);
        listTrivia.forEach(fact => {
        let p = document.createElement('p');
        listDiv.append(fact, p);
    })})
    .catch(err => {console.log(err)})

const urlFav = 'http://numbersapi.com/8?json';
let favoriteList = [];   

for(let i = 1; i<5; i++){
    favoriteList.push(
        axios.get(`${urlFav}`)
    )
}

Promise.all(favoriteList)
    .then(list => (
        list.forEach(n => {
            let p = document.createElement('p');
            favDiv.append(n.data.text, p);
        }
    )))

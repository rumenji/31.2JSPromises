document.addEventListener("DOMContentLoaded", () => {
    shuffleDeck();
  });

const shuffleUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
const drawUrl = 'https://deckofcardsapi.com/api/deck';

const drawButton = document.querySelector('#draw-card');
const cardDiv = document.querySelector('#cards');
let deckId;
let remaining;


function shuffleDeck(){
    axios
    .get(`${shuffleUrl}`)
    .then(res => {
        deckId = res.data.deck_id;
        remaining = 52;
    })
    .catch(err => {console.log(err)})
}

function drawCard(){
    if (remaining > 0){
        axios
        .get(`${drawUrl}/${deckId}/draw/?count=1`)
        .then(res => {
            let p = document.createElement('p');
            cardDiv.append(`${res.data.cards[0].suit} of ${res.data.cards[0].value}`, p);
            remaining--;
            console.log(remaining)
        })
    }
    else{
        let p = document.createElement('p');
        cardDiv.append('No more cards left in the deck!', p)
    }
}



// axios
//     .get(`${shuffleUrl}`)
//     .then(res => {
//         deckId = res.data.deck_id;
//         return axios.get(`${drawUrl}/${deckId}/draw/?count=1`)})
//     .then(res2 => {
//         // console.log(res2.data.cards[0].suit, res2.data.cards[0].value)
//         listCards.push(`${res2.data.cards[0].suit} of ${res2.data.cards[0].value}`)
//         return axios.get(`${drawUrl}/${deckId}/draw/?count=1`)
//     })
//     .then(res3 => {
//             // console.log(res3.data.cards[0].suit, res3.data.cards[0].value)
//             listCards.push(`${res3.data.cards[0].suit} of ${res3.data.cards[0].value}`)
//             // console.log(listCards)
//     })
//     .catch(err => {console.log(err)})

// Promise.all(listCards)
//     .then(list => (
//         list.forEach(n => console.log(n)
//     )))
//     .catch(err => console.log(err));
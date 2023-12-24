document.addEventListener("DOMContentLoaded", () => {
    shuffleDeck();
  });


const drawButton = document.querySelector('#draw-card');
const cardDiv = document.querySelector('#cards');

const shuffleUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
const drawUrl = 'https://deckofcardsapi.com/api/deck';

// Part I
async function oneCard(){
    let deck = await axios.get(`${shuffleUrl}`)
    let card = await axios.get(`${drawUrl}/${deck.data.deck_id}/draw/?count=1`)
    console.log(card.data.cards[0].suit, card.data.cards[0].value)
}
oneCard()

// Part II
async function twoCard(){
    let deck = await axios.get(`${shuffleUrl}`)
    let card = await Promise.all([
        axios.get(`${drawUrl}/${deck.data.deck_id}/draw/?count=1`),
        axios.get(`${drawUrl}/${deck.data.deck_id}/draw/?count=1`)
    ])
    console.log(card[0].data.cards[0].suit, card[0].data.cards[0].value)
    console.log(card[1].data.cards[0].suit, card[1].data.cards[0].value)

}
twoCard()

// Part III


let deckId;
let remaining;


async function shuffleDeck(){
    let deck = await axios.get(`${shuffleUrl}`)
    deckId = deck.data.deck_id;
    remaining = deck.data.remaining;
}

async function drawCard(){
    if (remaining > 0){
        let card = await axios.get(`${drawUrl}/${deckId}/draw/?count=1`);
        let p = document.createElement('p');
        cardDiv.append(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`, p);
        remaining--;
    }
        else{
            let p = document.createElement('p');
            cardDiv.append('No more cards left in the deck!', p)
        }
    }
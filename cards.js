const shuffleUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
const drawUrl = 'https://deckofcardsapi.com/api/deck';

const cardDiv = document.querySelector('#cards');

// One card
axios
    .get(`${shuffleUrl}`)
    .then(res => {
        // console.log(res);
        return axios.get(`${drawUrl}/${res.data.deck_id}/draw/?count=1`)})
    .then(res2 => {
        // console.log(res2.data.cards[0].suit, res2.data.cards[0].value)
    })
    .catch(err => {console.log(err)})

// Two cards from the same deck
let listCards = [];
let deckId;
axios
    .get(`${shuffleUrl}`)
    .then(res => {
        deckId = res.data.deck_id;
        return axios.get(`${drawUrl}/${deckId}/draw/?count=1`)})
    .then(res2 => {
        // console.log(res2.data.cards[0].suit, res2.data.cards[0].value)
        listCards.push(`${res2.data.cards[0].suit} of ${res2.data.cards[0].value}`)
        return axios.get(`${drawUrl}/${deckId}/draw/?count=1`)
    })
    .then(res3 => {
            // console.log(res3.data.cards[0].suit, res3.data.cards[0].value)
            listCards.push(`${res3.data.cards[0].suit} of ${res3.data.cards[0].value}`)
            // console.log(listCards)
    })
    .catch(err => {console.log(err)})

Promise.all(listCards)
    .then(list => (
        list.forEach(n => console.log(n)
    )))
    .catch(err => console.log(err));
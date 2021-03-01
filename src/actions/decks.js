import { generateUID } from '../utils/_DATA';

export const RECEIVE_DECKS = '@decks/RECEIVE_DECKS';
export const ADD_DECK = '@decks/ADD_DECK';
export const ADD_CARD = '@decks/ADD_CARD';


export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function addDeck(decks, name, description) {
    const deck = {
        id: generateUID(),
        deckName: name,
        description,
        timestamp: Date.now(),
        cards: []
    }
    return {
        type: ADD_DECK,
        decks: {
            ...decks,
            [deck.id]: deck
        }
    }
}

export function addCard(decks, deckId, question, answer) {
    const card = {
        id: generateUID(),
        timestamp: Date.now(),
        question,
        answer,
    }
    return {
        type: ADD_CARD,
        decks: {
            ...decks,
            [deckId]: {
                ...decks[deckId],
                cards: {
                    ...decks[deckId].cards,
                    [card.id]: card
                }
            }
        }
    }
}
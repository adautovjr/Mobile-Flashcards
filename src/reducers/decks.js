import { RECEIVE_DECKS, ADD_CARD, ADD_DECK, SAVE_SCORE } from "../actions/decks";

export default function decks (state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                ...action.decks
            }
        case ADD_CARD:
            return {
                ...state,
                ...action.decks
            }
        case SAVE_SCORE:
            return {
                ...state,
                ...action.decks
            }
        default :
            return state
    }
}
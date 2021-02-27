import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import decks from './decks';

const createRootReducer = () => combineReducers({
    decks,
    loadingBar: loadingBarReducer
});

export default createRootReducer;
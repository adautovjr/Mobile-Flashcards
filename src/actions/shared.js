import { showLoading, hideLoading } from "react-redux-loading";
import { getInitialData } from '../utils/api';
import { receiveDecks } from "../actions/decks";

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialData()
            .then(({ decks }) => {
                dispatch(receiveDecks(decks));
                dispatch(hideLoading());
            });
    }
}
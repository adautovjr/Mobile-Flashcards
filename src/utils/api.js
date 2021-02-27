import { _getDecks } from "./_DATA";

export function getInitialData() {
    return Promise.all([
        _getDecks(),
    ]).then(([decks]) => ({
        decks,
    }));
}
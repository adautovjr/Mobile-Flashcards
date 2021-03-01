let decks = {
    '8xf0y6z34sdfk235fd53nd': {
        id: '8xf0y6z34sdfk235fd53nd',
        deckName: 'Math',
        description: 'Math test on thursday',
        timestamp: 1467166872632,
        cards: {
            "8xf0y6ziyjabvozdd253nd": {
                id: '8xf0y6ziyjabvozdd253nd',
                question: '9*7?',
                answer: '72',
                timestamp: 1467166872634
            },
            "6ni6ok3ym7mf1p33lnez": {
                id: '6ni6ok3ym7mf1p33lnez',
                question: '9*9?',
                answer: '81',
                timestamp: 1468479767190
            },
            "am8ehyc8byjqgar0jgpub9": {
                id: 'am8ehyc8byjqgar0jgpub9',
                question: '1+2?',
                answer: '3',
                timestamp: 1488579767190
            }
        }
    },
    'xj352vofupe1dqz9emx13r': {
        id: 'xj352vofupe1dqz9emx13r',
        deckName: 'Math 2',
        description: 'Math test on friday too',
        timestamp: 1467166872634,
        cards: {
            "vthrdm985a262al8qx3do": {
                id: 'vthrdm985a262al8qx3do',
                question: '9*7?',
                answer: '72',
                timestamp: 1467166872634
            },
        }
    }
}

export function generateUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getDecks() {
    return new Promise((res, rej) => {
        setTimeout(() => res({ ...decks }), 1000)
    })
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
    return {
        id: generateUID(),
        timestamp: Date.now(),
        author,
        optionOne: {
            votes: [],
            text: optionOneText,
        },
        optionTwo: {
            votes: [],
            text: optionTwoText,
        }
    }
}

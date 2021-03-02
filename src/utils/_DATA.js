let decks = {
    '8xf0y6z34sdfk235fd53nd': {
        id: '8xf0y6z34sdfk235fd53nd',
        deckName: 'Math',
        description: 'Math test on thursday',
        bestScore: 0,
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
        deckName: 'Portuguese',
        description: 'Chapter 3 from my Portuguese learning book',
        bestScore: 0,
        timestamp: 1467166871789,
        cards: {
            "2vem2al8qx3dv1dqz9": {
                id: '2vem2al8qx3dv1dqz9',
                question: 'Bom dia!',
                answer: 'Good morning!',
                timestamp: 1467166872222
            },
            "ofupe62al8dm985ado": {
                id: 'ofupe62al8dm985ado',
                question: 'Cansados',
                answer: 'Tired',
                timestamp: 1467166872555
            },
            "ml8qx3m9rda2852ado": {
                id: 'ml8qx3m9rda2852ado',
                question: 'Biggest brazilian football club',
                answer: 'Flamengo',
                timestamp: 1467166872111
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

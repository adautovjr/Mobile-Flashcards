import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button } from 'react-native-paper';
import AwesomeButton from "react-native-really-awesome-button";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    button: {
        backgroundColor: '#333',
        minWidth: 200,
        minHeight: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 10
    },
    outlined: {
        borderWidth: 2,
        borderColor: '#333',
        backgroundColor: 'white',
        color: '#333',
    },
    buttonText: {
        color: 'white',
    },
    deckName: {
        fontSize: 40,
        textAlign: 'left'
    },
    deckCardsQuantity: {
        textAlign: 'center',
    },
    deckDescription: {

    },
    deckBestScoreContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 50,
        height: 50,
        borderRadius: 100,
        margin: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    deckBestScore: {
        color: 'white'
    },
    deckInfo: {
        flex: 3,
        padding: 15,
        paddingRight: 70,
        position: 'relative'
    },
    deckCards: {
        flex: 1,
        justifyContent: 'center',
        borderTopColor: '#33333333',
        borderTopWidth: 1
    }
});

const returnScoreColor = (bestScore) => {
    const score = parseFloat(bestScore);
    return {
        backgroundColor: score >= 0.7 ? '#28a745' : ( score >= 0.4 ? '#de8e35' : '#dc3545')
    }
}

function DeckDetails({ deck, navigation }) {
    const onPressAddCard = () => navigation.navigate('New Card', { deckId: deck.id });
    const onPressQuiz = () => navigation.navigate('Quiz', { deckId: deck.id });

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={onPressAddCard} title="Update count">
                    <Icon name="plus" size={24} color="#333" />
                </Button>
            ),
        });
    }, [navigation]);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch' }}>
            <View style={{ flex: 4, margin: 15 }}>
                <Card style={styles.root}>
                    <View style={styles.deckInfo}>
                        <View>
                            <Text style={styles.deckName}>{ deck.deckName }</Text>
                            <Text style={styles.deckDescription}>{ deck.description }</Text>
                        </View>
                        <View style={{ ...styles.deckBestScoreContainer, ...returnScoreColor(deck.bestScore) }}>
                            <Text style={styles.deckBestScore}>{ (deck.bestScore*100).toFixed() }</Text>
                        </View>
                    </View>
                    <View style={styles.deckCards}>
                        <Text style={styles.deckCardsQuantity}>{ `${Object.keys(deck.cards).length} card${Object.keys(deck.cards).length !== 1 ? "s" : ""}` }</Text>
                    </View>
                </Card>
            </View>
            <View style={{ flex: 2 }} />
            <View style={{ flex: 1, alignItems: 'center' }}>
                <AwesomeButton width={120} height={50} style={{ marginBottom: 20 }} onPress={onPressQuiz}>
                    Quiz
                </AwesomeButton>
            </View>
        </SafeAreaView>
    );
}

function mapStateToProps({ decks }, { deckId, navigation }) {
    return {
        deck: decks[deckId],
        navigation
    }
}

export default connect(mapStateToProps)(DeckDetails);
import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
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
        fontSize: 40
    },
    deckCardsQuantity: {

    },
    deckDescription: {

    },
    deckBestScore: {

    }
});

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
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <Text style={styles.deckName}>{ deck.deckName }</Text>
                <Text style={styles.deckCardsQuantity}>{ `${Object.keys(deck.cards).length} card${Object.keys(deck.cards).length !== 1 ? "s" : ""}` }</Text>
            </View>
            <View>
                <Text style={styles.deckDescription}>{ deck.description }</Text>
                <Text style={styles.deckBestScore}>Best Score: { (deck.bestScore*100).toFixed() }%</Text>
            </View>
            <View style={{ margin: 20 }} />
            <View>
                <TouchableOpacity onPress={onPressAddCard} style={styles.button} title="Add Card">
                    <Text style={ styles.buttonText }> Add Card </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressQuiz} style={{ ...styles.button, ...styles.outlined}} title="Quiz">
                    <Text> Quiz </Text>
                </TouchableOpacity>
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
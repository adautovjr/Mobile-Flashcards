import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { saveScore } from '../actions/decks';

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
    }
});

function Score({ decks, deck, score, navigation, dispatch }) {
    const onPressQuiz = () => { 
        dispatch(saveScore(decks, deck.id, score));
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'Home' },
                    {
                        name: "Details",
                        params: { 
                            deckId: deck.id
                        }
                    }
                ],
            })
        );
        setTimeout(() => navigation.navigate('Quiz', { deckId: deck.id }), 1)
    };
    const onPressGoBack = () => {
        dispatch(saveScore(decks, deck.id, score));
        navigation.navigate('Details', { deckId: deck.id })
    };

    useEffect(() => {
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <Text>{ deck.deckName }</Text>
                <Text>Your Score: {(score*100).toFixed()}%</Text>
                <Text>Best Score: {(deck.bestScore*100).toFixed()}%</Text>
            </View>
            <View style={{ margin: 20 }} />
            <View>
                <TouchableOpacity onPress={onPressQuiz} style={{ ...styles.button, ...styles.outlined}} title="Quiz">
                    <Text> Try again </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressGoBack} style={styles.button} title="Go back">
                    <Text style={ styles.buttonText }> Go back </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

function mapStateToProps({ decks, dispatch }, { deckId, navigation, responses }) {
    const deck = decks[deckId];
    let score = 0;
    Object.values(responses).map(response => {
        if (response.isCorrect) score++;
    });
    score = (score/Object.keys(deck.cards).length);
    return {
        decks,
        deck,
        responses,
        score,
        dispatch,
        navigation
    }
}

export default connect(mapStateToProps)(Score);
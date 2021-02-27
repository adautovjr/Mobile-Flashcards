import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

function DeckDetails({ deck, navigation }) {
    const onPress = () => navigation.navigate('NewCard', { deckId: deck.id });

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <Text>{ deck.deckName }</Text>
                <Text>{ `${Object.keys(deck.cards).length} cards` }</Text>
            </View>
            <View>
                <Text>{ deck.description }</Text>
            </View>
            <View style={{ margin: 20 }} />
            <View>
                <TouchableOpacity onPress={onPress} style={styles.button} title="Add Card">
                    <Text style={ styles.buttonText }> Add Card </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress} style={{ ...styles.button, ...styles.outlined}} title="Quiz">
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
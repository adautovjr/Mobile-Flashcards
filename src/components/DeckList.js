import React from 'react';
import { FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Title } from 'react-native-paper';
import Deck from './Deck';

const DeckList = ({ decks, navigation }) => {
    const renderDeck = (deck) => (
        <Deck deckId={deck.item} navigation={navigation} />
    );

    return (
        <SafeAreaView style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 15, paddingRight: 15 }}>
            <Title>Available Decks</Title>
            {
                decks !== undefined && decks.length > 0
                ? <>
                    <FlatList
                        data={decks}
                        renderItem={renderDeck}
                        keyExtractor={id => id}
                    />
                </>
                : <Text>No decks Found!</Text>
            }
        </SafeAreaView>
    );
}

export default connect()(DeckList);
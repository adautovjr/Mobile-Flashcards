import React from 'react';
import { FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Title } from 'react-native-paper';
import Deck from './Deck';

const DeckList = ({ decksIds, navigation }) => {
    const renderDeck = (deckId) => (
        <Deck deckId={deckId.item} navigation={navigation} />
    );

    return (
        <SafeAreaView style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 15, paddingRight: 15 }}>
            <Title>Available Decks</Title>
            {
                decksIds !== undefined && decksIds.length > 0
                ? <>
                    <FlatList
                        data={decksIds}
                        renderItem={renderDeck}
                        keyExtractor={id => id}
                    />
                </>
                : <Text>No decks Found!</Text>
            }
        </SafeAreaView>
    );
}

function mapStateToProps({ decks }, { navigation, decksIds }){
    return {
        decksIds: Object.values(decksIds).sort((a, b) => decks[b].timestamp - decks[a].timestamp),
        navigation
    }
}

export default connect(mapStateToProps)(DeckList);
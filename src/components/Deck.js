import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Button, Card, Paragraph } from 'react-native-paper';

import { DeckListItem } from './Styles'; 

const LeftContent = props => <Avatar.Icon {...props} icon="animation-outline" />

function Deck({ deck, navigation }) {
    return (
        <View>
            <DeckListItem>
                <Card className="deck-card">
                    <Card.Title title={deck.deckName} subtitle={`${Object.keys(deck.cards).length} card${Object.keys(deck.cards).length !== 1 ? "s" : ""} / Best Score: ${(deck.bestScore*100).toFixed()}%`} left={LeftContent} />
                    <Card.Content>
                        <Paragraph>
                            {
                                deck.description
                            }
                        </Paragraph>
                    </Card.Content>
                    <Card.Actions style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }} >
                        <Button onPress={() => navigation.navigate('Details', { deckId: deck.id })} size="small">
                            <Text>
                                Details
                            </Text>
                        </Button>
                    </Card.Actions>
                </Card>
            </DeckListItem>
        </View>
    );
}

function mapStateToProps({ decks }, { deckId }) {
    return {
        deck: decks[deckId]
    };
}

export default connect(mapStateToProps)(Deck);

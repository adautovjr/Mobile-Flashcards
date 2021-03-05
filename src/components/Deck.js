import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { Avatar, Button, Card, Paragraph } from 'react-native-paper';

import { DeckListItem } from './Styles'; 

const LeftContent = props => <Avatar.Icon {...props} backgroundColor="#3186F6" icon="animation-outline" />

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    paragraph: {
        paddingLeft: 20
    }
});

function Deck({ deck, navigation }) {
    return (
        <View>
            <DeckListItem>
                <Card style={styles.root}>
                    <Card.Content style={styles.content}>
                        <View style={{ flex: 3 }}>
                            <Card.Title title={deck.deckName} subtitle={`${Object.keys(deck.cards).length} card${Object.keys(deck.cards).length !== 1 ? "s" : ""} / Best Score: ${(deck.bestScore*100).toFixed()}%`} left={LeftContent} />
                            <Paragraph style={styles.paragraph}>
                                {
                                    deck.description
                                }
                            </Paragraph>
                        </View>
                        <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }} >
                            <Button onPress={() => navigation.navigate('Details', { deckId: deck.id })} size="small">
                                <Icon color="#3186F6" name="arrow-right" size={24} />
                            </Button>
                        </View>
                    </Card.Content>
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

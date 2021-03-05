import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet, View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from 'react-native-progress/Bar';
import Carousel from 'react-native-snap-carousel';
import FlipCard from 'react-native-flip-card';
import AwesomeButton from "react-native-really-awesome-button";
import { CommonActions } from '@react-navigation/native';

const styles = StyleSheet.create({
    cardHolder: {
        flex: 1,
        justifyContent: 'space-between'
    },
    cardFace: {
        borderWidth: 3,
        borderColor: '#00000033',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    flipcard: {
        paddingTop: 30,
        paddingBottom: 20
    },
    flipHolder: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    whiteSpace: {
        minHeight: 80,
    },
    buttonDisabled: {
        opacity: 0.05
    },
    cardText: {
        fontSize: 30,
        textAlign: 'center'
    }
});

const Quiz = ({ deck, cards, navigation }) => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const [flipped, setFlipped] = React.useState(false);
    const [pressed, setPressed] = React.useState(false);
    const [responses, setResponses] = React.useState(false);
    const percentage = cards.length > 0 ? (Object.keys(responses).length / cards.length) : 0;

    useEffect(() => {
        if (cards.length === 0) {
            Alert.alert(
                'No cards on this deck',
                'Would you like do add new cards?',
                [
                    {
                        text: "Add cards", 
                        style: 'success', 
                        onPress: () =>
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
                                        },
                                        {
                                            name: "New Card",
                                            params: {
                                                deckId: deck.id
                                            }
                                        },
                                    ],
                                })
                            )
                    },
                    {
                        text: 'Back to decks',
                        style: 'destructive',
                        onPress: () => navigation.dispatch(
                            CommonActions.reset({
                                index: 1,
                                routes: [
                                    { name: 'Home' }
                                ],
                            })
                        ),
                    },
                ]
            );
        }
    }, []);

    useEffect(() => {
        if (percentage === 1) {
            setTimeout(() => navigation.navigate('Score', { deckId: deck.id, responses }), 1200);
        }
    }, [percentage]);

    const handleFlip = (id) => {
        setFlipped({
            ...flipped,
            [id]: !flipped[id]
        });
    }

    const handlePressButtons = (id, isCorrect) => {
        setResponses({
            ...responses,
            [id]: {
                isCorrect: isCorrect
            }
        });
    }

    const _renderItem = ({ item }) => {
        const isCorrectDisabled = responses[item.id] !== undefined && !responses[item.id].isCorrect;
        const isIncorrectDisabled = responses[item.id] !== undefined && responses[item.id].isCorrect;

        return (
            <View style={styles.cardHolder} key={item.id}>
                <FlipCard
                    style={styles.flipcard}
                    friction={6}
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={flipped[item.id]}
                    clickable={false}
                    onFlipEnd={() => {
                        setPressed({
                            ...pressed,
                            [item.id]: true
                        });
                    }}
                >
                    <View style={styles.cardFace}>
                        <Text style={styles.cardText}>{item.question}</Text>
                    </View>
                    <View style={styles.cardFace}>
                        <Text style={styles.cardText}>{item.answer}</Text>
                    </View>
                </FlipCard>
                <View style={styles.flipHolder}>
                    <AwesomeButton width={120} height={50} style={{ marginBottom: 20 }} onPress={() => handleFlip(item.id)}>
                        Flip
                    </AwesomeButton>
                </View>
                {
                    pressed[item.id]
                        ? <View style={styles.buttons}>
                            <AwesomeButton
                                disabled={isIncorrectDisabled}
                                style={isIncorrectDisabled ? { margin: 10, ...styles.buttonDisabled } : { margin: 10 }}
                                onPress={() => handlePressButtons(item.id, false)}
                                backgroundColor="#dc3545"
                                backgroundDarker="#A82935"
                                width={120}
                            >
                                Incorrect
                            </AwesomeButton>
                            <AwesomeButton
                                disabled={isCorrectDisabled}
                                style={isCorrectDisabled ? { margin: 10, ...styles.buttonDisabled } : { margin: 10 }}
                                onPress={() => handlePressButtons(item.id, true)}
                                backgroundColor="#28a745"
                                backgroundDarker="#22893A"
                                width={120}
                            >
                                Correct
                            </AwesomeButton>
                        </View>
                        : <View style={styles.whiteSpace} />
                }
            </View>
        )
    };

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 20, marginTop: 20 }}>
            <View>
                <View style={{ marginRight: 50, marginLeft: 50 }}>
                    <Text style={{ textAlign: 'right', fontSize: 12 }}>
                        {`${Object.keys(responses).length}/${cards.length}`}
                    </Text>
                    <ProgressBar progress={percentage} borderColor="#cccccc" color="#3186F6" width={null} useNativeDriver={true} />
                </View>
                {
                    (cards.length > 0) &&
                    <Carousel
                        data={cards}
                        renderItem={_renderItem}
                        sliderWidth={screenWidth}
                        itemWidth={screenWidth - 50}
                        style={{ flex: 1 }}
                    />
                }
            </View>
        </SafeAreaView >
    );
}

function mapStateToProps({ decks }, { deckId, navigation }) {
    return {
        deck: decks[deckId],
        cards: Object.values(decks[deckId].cards),
        navigation
    }
}

export default connect(mapStateToProps)(Quiz);
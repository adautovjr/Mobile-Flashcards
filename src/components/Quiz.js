import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProgressBar, Colors } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import FlipCard from 'react-native-flip-card';

const styles = StyleSheet.create({
    buttonCorrect: {
        backgroundColor: '#28a745',
        minWidth: 120,
        minHeight: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 10
    },
    buttonIncorrect: {
        backgroundColor: '#dc3545',
        minWidth: 120,
        minHeight: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
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
    tip: {
        opacity: 0.2,
        position: 'absolute',
        bottom: 5
    },
    whiteSpace: {
        minHeight: 80,
    },
    buttonDisabled: {
        opacity: 0.1
    }
});

const Quiz = ({ deck, cards, navigation }) => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const [pressed, setPressed] = React.useState(false);
    const [responses, setResponses] = React.useState(false);
    
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

        console.log("isCorrectDisabled: ", isCorrectDisabled);
        console.log("isIncorrectDisabled: ", isIncorrectDisabled);

        return (
            <View style={styles.cardHolder} key={item.id}>
                <FlipCard
                    style={styles.flipcard}
                    friction={6}
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={false}
                    clickable={true}
                    onFlipEnd={() => {
                        setPressed({
                            ...pressed,
                            [item.id]: true
                        });
                    }}
                >
                    <View style={styles.cardFace}>
                        <Text>{item.question}</Text>
                        {
                            !pressed[item.id] &&
                            <Text style={styles.tip}>Press to show answer</Text>
                        }
                    </View>
                    <View style={styles.cardFace}>
                        <Text>{item.answer}</Text>
                    </View>
                </FlipCard>
                {
                    pressed[item.id]
                    ?   <View style={styles.buttons}>
                            <TouchableOpacity disabled={isCorrectDisabled} style={isCorrectDisabled ? { ...styles.buttonCorrect, ...styles.buttonDisabled } : styles.buttonCorrect} onPress={() => handlePressButtons(item.id, true)}>
                                <Text style={styles.buttonText}>Correct</Text>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={isIncorrectDisabled} style={isIncorrectDisabled ? { ...styles.buttonIncorrect, ...styles.buttonDisabled } : styles.buttonIncorrect} onPress={() => handlePressButtons(item.id, false)}>
                                <Text style={styles.buttonText}>Incorrect</Text>
                            </TouchableOpacity>
                        </View>
                    :   <View style={styles.whiteSpace} />
                }
            </View>
        )
    };

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 50, marginTop: 50 }}>
            <View>
                <View style={{ marginRight: 50, marginLeft: 50 }}>
                    <ProgressBar progress={(Object.keys(responses).length/cards.length)} color="#cccccc"/>
                </View>
                <Carousel
                    data={cards}
                    renderItem={_renderItem}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth - 50}
                    style={{ flex: 1 }}
                />
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
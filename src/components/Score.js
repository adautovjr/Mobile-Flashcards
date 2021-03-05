import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from 'react-native-progress/Bar';
import { saveScore } from '../actions/decks';
import AwesomeButton from "react-native-really-awesome-button";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    deckNameContainer: { 
        flex: 1,
        display: 'flex',
        justifyContent: 'center'
    },
    deckName: { 
        textAlign: 'center',
        fontSize: 30
    },
    scoresContainer: { 
        flex: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    scoreContainer: {
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center'
    },
    userScoreContainer: { 
        flex: 2,
        backgroundColor: '#3186F6',
        alignSelf: 'stretch',
        marginRight: 20,
    },
    bestScoreContainer: { 
        flex: 1,
        backgroundColor: '#F5C518',
        minHeight: 180,
    },
    scoreInfo: { 
        textAlign: 'center',
        color: 'white'
    },
    actionsContainer: { 
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});

function Score({ decks, deck, score, percentage, navigation, dispatch }) {
    const onPressQuiz = () => { 
        dispatch(saveScore(decks, deck.id, percentage));
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
                        name: "Quiz",
                        params: { 
                            deckId: deck.id
                        }
                    }
                ],
            })
        );
    };
    
    React.useEffect(() =>
        navigation.addListener('beforeRemove', (e) => {
            if (e.data.action.type === "GO_BACK" || e.data.action.type === "POP") {
                e.preventDefault();
                setTimeout(() => 
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
                    ),
                    10
                );
            }
            setTimeout(() => {
                dispatch(saveScore(decks, deck.id, percentage));
            }, 10);
        }),
        [navigation]
    );

    const onPressGoBack = () => {
        dispatch(saveScore(decks, deck.id, percentage));
        navigation.navigate('Details', { deckId: deck.id })
    };

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.deckNameContainer}>
                <Text style={styles.deckName}>{ deck.deckName }</Text>
            </View>
            <View style={{ margin: 20 }}>
                <Text style={{ textAlign: 'center' }}>{score}/{Object.keys(deck.cards).length}</Text>
                <ProgressBar progress={percentage} borderColor="#cccccc" color="#3186F6" width={null} useNativeDriver={true} />
            </View>
            <View style={styles.scoresContainer}>
                <View style={{ ...styles.scoreContainer, ...styles.userScoreContainer}}>
                    <Icon style={styles.scoreInfo} size={50} name="diamond-stone" />
                    <Text style={styles.scoreInfo}>Your score</Text>
                    <Text style={styles.scoreInfo}>{(percentage*100).toFixed()}%</Text>
                </View>
                <View style={{ ...styles.scoreContainer, ...styles.bestScoreContainer}}>
                    <Icon style={styles.scoreInfo} size={50} name="trophy" />
                    <Text style={styles.scoreInfo}>Best score</Text>
                    <Text style={styles.scoreInfo}>{(deck.bestScore*100).toFixed()}%</Text>
                </View>
            </View>
            <View style={styles.actionsContainer}>
                <AwesomeButton
                    onPress={onPressQuiz}
                    backgroundColor="#3186F6"
                    backgroundDarker="#3679D1"
                    width={120}
                    style={{ marginBottom: 10 }}
                >
                    Try again
                </AwesomeButton>
                <AwesomeButton
                    onPress={onPressGoBack}
                    backgroundColor="#f2f2f2"
                    backgroundDarker="#f2f2f2"
                    backgroundShadow="#f2f2f2"
                    width={120}
                    textColor='#333333'
                >
                    Go back
                </AwesomeButton>
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
    const percentage = (score/Object.keys(deck.cards).length);
    return {
        decks,
        deck,
        responses,
        score,
        percentage,
        dispatch,
        navigation
    }
}

export default connect(mapStateToProps)(Score);
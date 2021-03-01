import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { TextInput, Title, FAB as Fab } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions } from '@react-navigation/native';
import { addCard } from '../actions/decks';

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    view: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 15
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: 'green'
    },
    inputField: {
        marginBottom: 20
    }
})

function NewCard({ navigation, decks, deckId, dispatch }) {
    const [question, setQuestion] = React.useState('');
    const [answer, setAnswer] = React.useState('');
    const [showSubmitButton, setShowSubmitButton] = React.useState(false);
    const ref_input2 = useRef();

    const handleChangeQuestion = (value) => {
        setQuestion(value);
        setShowSubmitButton(answer !== "" && value !== "");
    };
    const handleChangeAnswer = (value) => {
        setAnswer(value);
        setShowSubmitButton(question !== "" && value !== "");
    };

    const handleSubmitNewDeck = () => {
        dispatch(addCard(decks, deckId, question, answer));
        setQuestion("");
        setAnswer("");
        navigation.dispatch(CommonActions.goBack());
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={styles.root}>
            <SafeAreaView style={styles.view}>
                <Title>Create a Card</Title>
                <TextInput
                    label="Question"
                    mode="outlined"
                    autoFocus={true}
                    returnKeyType="next"
                    onSubmitEditing={() => ref_input2.current.focus()}
                    blurOnSubmit={false}
                    style={ styles.inputField }
                    value={question}
                    onChangeText={text => handleChangeQuestion(text)}
                />
                <TextInput
                    label="Answer"
                    mode="outlined"
                    ref={ref_input2}
                    style={ styles.inputField }
                    value={answer}
                    onChangeText={text => handleChangeAnswer(text)}
                    onSubmitEditing={handleSubmitNewDeck}
                />
                {
                    showSubmitButton &&
                    <Fab
                        style={styles.fab}
                        icon="check"
                        onPress={handleSubmitNewDeck}
                    />
                }
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

function mapStateToProps({ dispatch, decks }, { navigation, deckId }) {
    return {
        dispatch,
        decks,
        navigation,
        deckId
    }
}

export default connect(mapStateToProps)(NewCard);
import React, { useRef, } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { TextInput, Title, FAB as Fab } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions } from '@react-navigation/native';
import { addDeck } from '../actions/decks';

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

function NewDeck({ navigation, decks, dispatch }) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [showSubmitButton, setShowSubmitButton] = React.useState(false);
    const ref_input2 = useRef();

    const handleChangeName = (value) => {
        setName(value);
        setShowSubmitButton(description !== "" && value !== "");
    };
    const handleChangeDescription = (value) => {
        setDescription(value);
        setShowSubmitButton(name !== "" && value !== "");
    };

    const handleSubmitNewDeck = () => {
        dispatch(addDeck(decks, name, description));
        setName("");
        setDescription("");
        navigation.dispatch(CommonActions.goBack());
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={styles.root}>
            <SafeAreaView style={styles.view}>
                <Title>Create a Deck</Title>
                <TextInput
                    label="Deck name"
                    mode="outlined"
                    returnKeyType="next"
                    onSubmitEditing={() => ref_input2.current.focus()}
                    blurOnSubmit={false}
                    style={styles.inputField}
                    value={name}
                    onChangeText={handleChangeName}
                />
                <TextInput
                    label="Description"
                    mode="outlined"
                    ref={ref_input2}
                    style={styles.inputField}
                    value={description}
                    onChangeText={handleChangeDescription}
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

function mapStateToProps({ decks },{ navigation, dispatch }){
    return {
        navigation,
        dispatch,
        decks
    }
}

export default connect(mapStateToProps)(NewDeck);
import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, Title, FAB as Fab } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
    view: { 
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

export default function NewDeck({ navigation }) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const ref_input2 = useRef();

    const handleSubmitNewDeck = () => {
        console.log(name)
        console.log(description)
    }

    return (
        <>
            <SafeAreaView style={styles.view}>
                <Title>Create a Deck</Title>
                <TextInput
                    label="Deck name"
                    mode="outlined"
                    autoFocus={true}
                    returnKeyType="next"
                    onSubmitEditing={() => ref_input2.current.focus()}
                    blurOnSubmit={false}
                    style={ styles.inputField }
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    label="Description"
                    mode="outlined"
                    ref={ref_input2}
                    style={ styles.inputField }
                    value={description}
                    onChangeText={text => setDescription(text)}
                    onSubmitEditing={handleSubmitNewDeck}
                />
            </SafeAreaView>
            <Fab
                style={styles.fab}
                icon="check"
                onPress={handleSubmitNewDeck}
            />
        </>
    );
}
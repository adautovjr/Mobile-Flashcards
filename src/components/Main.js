import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DeckDetails from './DeckDetails';
import HomeStackScreen from './HomeStackScreen';
import NewCard from './NewCard';
import { handleInitialData } from "../actions/shared";

const MainStack = createStackNavigator();

class Main extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        const { decksIds } = this.props;

        return (
            <NavigationContainer>
                <StatusBar
                    animated={false}
                    backgroundColor="white"
                    barStyle="dark-content"
                    hidden={false} />
                <MainStack.Navigator>
                    <MainStack.Screen
                        name="Home"
                        options={{
                            headerShown: false
                        }}
                    >
                        {({ navigation }) => <HomeStackScreen decksIds={decksIds} navigation={navigation} />}
                    </MainStack.Screen>
                    <MainStack.Screen name="Details">
                        {({ route, navigation }) => <DeckDetails deckId={route.params.deckId} navigation={navigation} />}
                    </MainStack.Screen>
                    <MainStack.Screen name="NewCard">
                        {({ route, navigation }) => <NewCard deckId={route.params.deckId} navigation={navigation} />}
                    </MainStack.Screen>
                </MainStack.Navigator>
            </NavigationContainer>
        );
    }
}

function mapStateToProps({ decks }) {
    return {
        decksIds: Object.keys(decks)
    }
}

export default connect(mapStateToProps)(Main);
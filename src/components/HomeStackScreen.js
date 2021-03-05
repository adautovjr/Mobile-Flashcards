import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeckList from './DeckList';
import NewDeck from './NewDeck';

const Tab = Platform.select({
    ios: createBottomTabNavigator(),
    android: createMaterialTopTabNavigator()
});

export default function HomeStackScreen({ decksIds, navigation }) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Decks') {
                        iconName = focused
                            ? 'ios-list'
                            : 'ios-list';
                        color = focused
                            ? '#3186F6'
                            : '#333';
                    } else if (route.name === 'New Deck') {
                        iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
                        color = focused
                            ? '#3186F6'
                            : '#333';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                sceneContainerStyle: {
                    paddingBottom: 20
                }
            })}
            tabBarOptions={{
                activeTintColor: '#3186F6',
                inactiveTintColor: '#333',
            }}
        >
            <Tab.Screen name="Decks">
                {() => <DeckList decksIds={decksIds} navigation={navigation} />}
            </Tab.Screen>
            <Tab.Screen name="New Deck" component={NewDeck} />
        </Tab.Navigator>
    );
}
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStore } from 'redux';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

import createRootReducer from './src/reducers';
import middleware from './src/middleware';
import Main from './src/components/Main';

const store = createStore(createRootReducer(), middleware);

const theme = {
    ...DefaultTheme,
    dark: true,
    colors: {
      ...DefaultTheme.colors,
      primary: 'blue',
      accent: 'yellow',
    },
  };

export default function App() {
    return (
        <SafeAreaProvider>
            <StoreProvider store={store}>
                <PaperProvider theme={theme}>
                    <Main />
                </PaperProvider>
            </StoreProvider>
        </SafeAreaProvider>
    );
}
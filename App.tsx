import React from 'react';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'react-native';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/constants';

const theme = {
  colors: {
    ...COLORS.light,
  },
};

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar 
          barStyle="light-content" 
          backgroundColor={COLORS.light.primary} 
        />
        <AppNavigator />
      </PaperProvider>
    </Provider>
  );
}

export default App;

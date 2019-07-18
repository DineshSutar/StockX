import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { View, StatusBar } from 'react-native';

import AppNavigator from './AppNavigator';
import store from './store';
import COLORS from './utils/colors';

export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor={COLORS.BLUE_GREY_900} barStyle="light-content" />
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

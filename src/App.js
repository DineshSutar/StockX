// @flow
import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';

import AppNavigator from './AppNavigator';
import store from './store';

type Props = {};
export default class App extends PureComponent<Props> {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

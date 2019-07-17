// @flow
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Screen1 from './Screens/Screen1';
import Screen2 from './Screens/Screen2';

const AppNavigator = createStackNavigator(
    {
      Screen1: Screen1,
      Screen2: Screen2,
    },
    {
      initialRouteName: 'Screen1',
      headerMode: 'none',
    }
);

export default createAppContainer(AppNavigator);
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './Screens/HomeScreen';
import UpdatePriceScreen from './Screens/UpdatePriceScreen';

const AppNavigator = createStackNavigator(
    {
      HomeScreen: HomeScreen,
      UpdatePriceScreen: UpdatePriceScreen,
    },
    {
      initialRouteName: 'HomeScreen',
      headerMode: 'none',
    }
);

export default createAppContainer(AppNavigator);
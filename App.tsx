import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './src/screens/Loginscreen';
import HomeScreen from  './src/screens/Homescreen';
import HomeBuilt from  './src/screens/HomeBuilt';
import HomeTopics from  './src/screens/Hometopics';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    HomeBuilt:HomeBuilt,
    HomeTopics:HomeTopics
  },
  {
    initialRouteName: 'Login',
  },
);

export default createAppContainer(AppNavigator);
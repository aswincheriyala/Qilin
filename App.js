import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import Passbook from './src/screens/Passbook';
import colors from './src/styles/colors';
import DrawerButton from './src/common/HeaderLeft';
import Notification from './src/common/Notification';
import {Platform, UIManager} from 'react-native';

const Stack = createStackNavigator();

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerLeft: () => (
              <DrawerButton onPress={() => alert('Open drawer')} />
            ),
            headerRight: () => (
              <Notification onPress={() => alert('Open Notification')} />
            ),
            headerTitleStyle: {
              fontFamily: 'monospace',
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Passbook"
          component={Passbook}
          options={{
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerLeft: () => (
              <DrawerButton onPress={() => alert('Open drawer')} />
            ),
            headerRight: () => (
              <Notification onPress={() => alert('Open Notification')} />
            ),
            headerTitleStyle: {
              fontFamily: 'monospace',
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

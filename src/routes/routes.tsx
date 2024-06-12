import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types/TypesRoutes';
import Screen1 from '../views/Screen1';
import Screen2 from '../views/Screen2';

//const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator<RootStackParamList>();

function App() {

  return (
    <NavigationContainer>
      <RootStack.Navigator  initialRouteName='Screen1' screenOptions={{headerShown:false}}>
        <RootStack.Screen name="Screen1" component={Screen1} />
        <RootStack.Screen name="Screen2" component={Screen2} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;



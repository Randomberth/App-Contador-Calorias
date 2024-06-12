import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Routes from './src/routes';

const RootStack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (

    <SafeAreaProvider>
      <SafeAreaView style={{flex:1}}>
        <Routes/>
      </SafeAreaView>
    </SafeAreaProvider>

    
  );
}

export default App;



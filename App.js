import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import AddItemScreen from './screens/AddItemScreen';
import EditItemScreen from './screens/EditItemScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Mini Inventory Manager',
          }}
        />
        <Stack.Screen
          name="AddItem"
          component={AddItemScreen}
          options={{
            title: 'Add Item',
          }}
        />
        <Stack.Screen
          name="EditItem"
          component={EditItemScreen}
          options={{
            title: 'Edit Item',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

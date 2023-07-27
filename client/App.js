import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';


import Map from './routes/Map'
import Login from './routes/Login'
import Register from './routes/Register';
import VerifyEmail from './routes/VerifyEmail'
import Feed from './routes/Feed'
import Profile from './routes/Profile'
import Boarding from './routes/Boarding'
import { theme, darkTheme } from './Theme'
import CreatePost from './routes/CreatePost';
import RegisterFinal from './routes/RegisterFinal';

const Stack = createNativeStackNavigator();
export const ThemeContext = createContext({})

export default function App() {
  const [darkMode, setDarkMode] = useState(false)

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(async () => {
    const sessionId = await SecureStore.getItemAsync('sessionId')
    console.log(sessionId)

    setLoggedIn(() => {
      if (sessionId !== null || sessionId !== undefined || sessionId !== "")
        return true
      else return false;
    })

    console.log(loggedIn)
  }, [])

  return (
    <ThemeContext.Provider value={darkMode ? darkTheme : theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={loggedIn ? "map" : "boarding"} screenOptions={{ headerShown: false, cardStyleInterpolator: ({ current }) => ({ cardStyle: { opacity: current.progress } }) }}>
          <Stack.Screen name="boarding" component={Boarding} />
          <Stack.Screen name="createPost" component={CreatePost} />
          <Stack.Screen name="map" component={Map} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="register" component={Register} />
          <Stack.Screen name="registerFinal" component={RegisterFinal} />
          <Stack.Screen name="verifyEmail" component={VerifyEmail} />
          <Stack.Screen name="feed" component={Feed} />
          <Stack.Screen name="profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

// loggedIn? "map": "boarding"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useMemo } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "./context";
import SignUp from "./screens/SignUp";
import Game from "./screens/Game";
import Login from "./screens/Login";

const AuthStack = createNativeStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{ title: "Login" }}
    />
    <AuthStack.Screen
      name="SignUp"
      component={SignUp}
      options={{ title: "Sign Up" }}
    />
  </AuthStack.Navigator>
);

const RootStack = createNativeStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={Game}
        options={{ animation: "none" }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        // options={{ animation: "none" }}
      />
    )}
  </RootStack.Navigator>
);

export default function App() {
  const [userToken, setUserToken] = useState(null);
  const authContext = useMemo(() => {
    return {
      signIn: (userName, password) => {
        setUserToken(userName);
      },
      signUp: (userName, password) => {
        setUserToken(userName);
      },
      signOut: () => {
        setUserToken(null);
      },
    };
  }, []);
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

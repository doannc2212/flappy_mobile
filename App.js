import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useMemo, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "./context";
import SignUp from "./screens/SignUp";
import Game from "./screens/Game";
import Login from "./screens/Login";
import Splash from "./screens/Splash";

import { getUser, resetUserInfo, saveUser } from "./data";
import connection from "./Connection";
import pipes, { getPipes, numberOfPipes, resetPipes } from "./CreatePipes";
import { receivePlayer as listenerOtherPlayer } from "./OtherPlayer";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isConnect, setIsConnect] = useState(false);

  const authContext = useMemo(() => {
    return {
      signIn: (userName, password) => {
        saveUser(userName, password);
        setUserToken(userName);
      },
      signUp: (userName, password) => {
        saveUser(userName, password);
        setUserToken(userName);
      },
      signOut: () => {
        resetUserInfo();
        setUserToken(null);
        setIsConnect(true);
        resetPipes();

        connection.invoke("ExitGame").catch((e) => {
          console.log(e);
        });
      },
    };
  }, []);

  if (userToken !== null && isConnect) {
    setIsConnect(false);
    connection.invoke("startGame", userToken).catch((e) => {
      console.log(e);
    });
    connection.invoke("CallMap").catch((e) => {
      console.log(e);
    });
  }

  useEffect(() => {
    (async () => {
      const userInfo = await getUser();
      if (userInfo !== null) {
        setUserToken(userInfo.user);
      } else {
        setUserToken(null);
      }
    })();
    connection.start().then(() => {
      setIsConnect(true);
      setIsLoading(false);
      listenerOtherPlayer();
    });
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

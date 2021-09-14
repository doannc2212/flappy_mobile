import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

const Container = ({ children }) => (
  <View
    style={{
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <StatusBar style="auto" />
    {children}
  </View>
);

export default Container;

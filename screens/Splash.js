import { useFonts } from "expo-font";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Splash = () => {
  let [fontsLoaded] = useFonts({
    pressStart: require("../assets/fonts/PressStart2P.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  loadingText: {
    color: "#FCA048",
    fontSize: 20,
    textShadowColor: "white",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontFamily: "pressStart",
    textAlign: "center",
  },
});

export default Splash;

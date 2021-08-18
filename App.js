import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import { GameEngine } from "react-native-game-engine";
import Physics from "./Physics";
import setupWorld from "./World";
import { useFonts } from "expo-font";

export default function App() {
  let [fontsLoaded] = useFonts({
    "qahiri": require("./assets/fonts/Qahiri.ttf"),
  });

  const [running, setRunning] = useState(true);
  const [gameEngine, setGameEngine] = useState(null);
  const [score, setScore] = useState(0);
  let entities = setupWorld();

  const onEvent = (e) => {
    if (e.type === "game-over") {
      setRunning(false);
      gameEngine.stop();
    } else if (e.type === "score") {
      setScore(score + 1);
    }
  };

  const reset = () => {
    setRunning(true);
    setScore(0);
    gameEngine.swap(setupWorld());
  };
  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("./assets/images/bg.png")}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <GameEngine
            ref={(ref) => {
              setGameEngine(ref);
            }}
            style={styles.gameContainer}
            running={running}
            entities={entities}
            systems={[Physics]}
            onEvent={onEvent}
          ></GameEngine>
          {/* <Score score={score}/> */}
          <Text style={styles.score}>{score}</Text>
          {!running && (
            <TouchableOpacity onPress={reset} style={styles.fullScreen}>
              <Image
                source={require("./assets/images/flappybird_gameover.png")}
              />
            </TouchableOpacity>
          )}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gameContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreen: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    position: "absolute",
    color: "white",
    fontSize: 80,
    top: 50,
    textShadowColor: "#444444",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    fontFamily: "qahiri",
  },
});

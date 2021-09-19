import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import { AuthContext } from "../context";
import Container from "./Container";
import { GameEngine } from "react-native-game-engine";
import Physics from "../Physics";
import setupWorld from "../World";
import { useFonts } from "expo-font";
import { getScore, getUser, saveScore, topScoreList } from "../data";
import { TopScoreModel } from "../components/Modal";
import connection from "../Connection";
import { setAllPlayerInvisible } from "../OtherPlayer";

let bestScore = 0;

const Game = () => {
  let [fontsLoaded] = useFonts({
    qahiri: require("../assets/fonts/Qahiri.ttf"),
    pressStart: require("../assets/fonts/PressStart2P.ttf"),
  });

  const { signOut } = React.useContext(AuthContext);
  const [running, setRunning] = useState(true);
  const [gameEngine, setGameEngine] = useState(null);
  const [score, setScore] = useState(0);
  const [entities, setEntities] = useState(null);
  const [userName, setUserName] = useState("");
  const [topScoreVisible, setTopScoreVisible] = useState(false);

  useEffect(() => {
    getBestScore();
    setEntities(setupWorld());

    (async () => {
      const userInfo = await getUser();
      if (userInfo !== null) {
        setUserName(userInfo.user);
      }
    })();
  }, []);
  if (entities !== null) entities.physics.engine.gravity.y = 1;
  const onEvent = (e) => {
    switch (e.type) {
      case "game-over":
        if (score > bestScore) {
          bestScore = score;
          saveScore(score);
        }
        setRunning(false);
        gameEngine.stop();

        //
        connection.invoke("DeadStatus").catch((e) => {
          console.log(e);
        });

        setAllPlayerInvisible();
        break;
      case "score":
        setScore(score + 1);
        break;
      case "birdUp":
        connection.invoke("UpAction").catch((e) => {
          console.log(e);
        });
        break;
      default:
    }
  };

  const reset = () => {
    const en = setupWorld();
    setEntities(en);
    gameEngine.swap(en);
    setRunning(true);
    setScore(0);
  };

  if (!fontsLoaded) {
    return null;
  } else if (entities !== null) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/bg.png")}
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
          {running && <Text style={styles.scoreWhenPlaying}>{score}</Text>}
          {!running && (
            <View style={styles.gameOverContainer}>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>Score</Text>

                <Text style={styles.scoreWhenGameOver}>{score}</Text>

                <Text style={styles.scoreText}>Best</Text>
                <Text style={styles.scoreWhenGameOver}>{bestScore}</Text>
              </View>
              <TextButton
                style={{ margin: 10, marginTop: 30 }}
                onPress={() => {
                  setTopScoreVisible(true);
                }}
                text="Rank"
              />
              <TextButton
                onPress={reset}
                style={{ margin: 10, marginTop: 20 }}
                text="Play Again"
              />
              <TextButton
                text="Sign out"
                style={{ margin: 10, marginTop: 20 }}
                onPress={() => {
                  signOut();
                }}
              />
            </View>
          )}
          <TopScoreModel
            modalVisible={topScoreVisible}
            setModalVisible={setTopScoreVisible}
            data={topScoreList}
            userName={userName}
          />
        </ImageBackground>
      </View>
    );
  }
};

const getBestScore = async () => {
  bestScore = await getScore();
};
const TextButton = (props) => {
  return (
    <TouchableOpacity
      style={props.style}
      onPress={props.onPress}
      activeOpacity={0.8}
    >
      <View
        style={{
          borderColor: "#553000",
          backgroundColor: "white",
          borderWidth: 3,
          padding: 3,
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#E86101",
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 3,
            paddingBottom: 3,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 15,
              fontFamily: "pressStart",
              top: 3,
            }}
          >
            {props.text}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

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
  gameOverContainer: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    top: 150,
  },
  scoreContainer: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#808080",
    backgroundColor: "#DED895",
    padding: 20,
    alignItems: "center",
    flexDirection: "column",
  },
  scoreWhenPlaying: {
    position: "absolute",
    color: "white",
    fontSize: 80,
    top: 50,
    textShadowColor: "#444444",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    fontFamily: "qahiri",
  },
  scoreWhenGameOver: {
    color: "white",
    fontSize: 50,
    textShadowColor: "#444444",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    fontFamily: "qahiri",
  },
  scoreText: {
    color: "#FCA048",
    fontSize: 20,
    textShadowColor: "white",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontFamily: "pressStart",
  },
  playAgainText: {
    color: "#FCA048",
    fontSize: 20,
    top: 100,
    textShadowColor: "white",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontFamily: "pressStart",
  },
});
export default Game;

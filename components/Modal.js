import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
} from "react-native";
import { useFonts } from "expo-font";
import { MAX_WIDTH } from "../constants/Constants";

export const NameModal = (props) => {
  let [fontsLoaded] = useFonts({
    qahiri: require("../assets/fonts/Qahiri.ttf"),
    pressStart: require("../assets/fonts/PressStart2P.ttf"),
  });

  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setErrorMessage("");
  }, []);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Your scored</Text>
          <Text style={styles.modalScoreText}>{props.score}</Text>
          <TextInput
            onChangeText={(text) => {
              props.onTextChange(text);
              setErrorMessage("");
            }}
            value={props.textInput}
            style={styles.input}
            placeholder="Enter your name"
          />
          <Text
            style={{
              color: "red",
              alignContent: "flex-start",
              alignSelf: "stretch",
            }}
          >
            {errorMessage}
          </Text>
          <View
            style={{
              flexDirection: "row-reverse",
              alignContent: "flex-end",
              alignSelf: "stretch",
            }}
          >
            <Button
              title="Submit"
              style={styles.buttonSubmit}
              onPress={() => {
                if (props.textInput === "") {
                  setErrorMessage("Please enter your name");
                } else {
                  setErrorMessage("");
                  props.onSubmit();
                }
              }}
            />
            <Button
              title="Cancel"
              onPress={() => props.setModalVisible(!props.modalVisible)}
              style={styles.buttonCancel}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const TopScoreModel = (props) => {
  const renderItem = ({ item }) => <Item name={item.name} score={item.score} />;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.flatListView}>
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "#ff6f00" }}>
            Flappy Bird Leaderboard
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            Top 10 scores
          </Text>
          <View
            style={{
              backgroundColor: "#e0e0e0",
              alignSelf: "stretch",
              height: 1,
              marginBottom: 10,
              marginTop: 10,
            }}
          />
          <FlatList
            style={{ alignSelf: "stretch" }}
            data={props.data}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
          />
          <Button
            title="Back to game"
            onPress={() => props.setModalVisible(!props.modalVisible)}
            style={[
              styles.buttonCancel,
              { elevation: 1, alignSelf: "stretch", alignItems: "center" },
            ]}
          />
        </View>
      </View>
    </Modal>
  );
};

const Button = (props) => {
  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={props.onPress}
      activeOpacity={0.8}
    >
      <Text style={{ color: "#FCA048", fontWeight: "bold", fontSize: 15 }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const Item = ({ name, score }) => (
  <View
    style={{
      flex: 1,
      flexDirection: "row",
      alignSelf: "stretch",
    }}
  >
    <Text style={{ flex: 1, marginStart: 10, fontSize: 15 }}>{name}</Text>

    <Text style={{ marginEnd: 10, fontSize: 15 }}>{score}</Text>
  </View>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  flatListView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: MAX_WIDTH - 100,
  },
  button: {
    borderRadius: 5,
    padding: 8,
    // elevation: 1,
  },
  buttonSubmit: {
    // backgroundColor: "#F194FF",
    margin: 10,
  },
  buttonCancel: {
    // backgroundColor: "#2196F3",
    margin: 10,
  },
  modalText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalScoreText: {
    fontFamily: "qahiri",
    textAlign: "center",
    fontSize: 40,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: MAX_WIDTH - 100,
  },
});

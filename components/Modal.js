import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import { MAX_HEIGHT, MAX_WIDTH } from "../constants/Constants";

export const TopScoreModel = (props) => {
  const renderItem = ({ item }) => (
    <Item name={item.name} score={item.score} rank={item.id} />
  );

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
            Flappy Bird Rank
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 15 , marginTop: 10}}>
            Your name: {props.userName}
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

          <View
            style={{
              flexDirection: "row",
              alignSelf: "stretch",
              marginHorizontal: 10,
              marginBottom: 10,
            }}
          >
            <Text style={[{ width: 55 }, styles.textBold]}>Rank</Text>
            <Text style={[{ flex: 1, marginStart: 10 }, styles.textBold]}>
              Name
            </Text>
            <Text style={[{ marginEnd: 10 }, styles.textBold]}>Score</Text>
          </View>

          <FlatList
            style={{
              alignSelf: "stretch",
              maxHeight: MAX_HEIGHT - MAX_WIDTH,
            }}
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

const Item = ({ rank, name, score }) => (
  <View
    style={{
      flex: 1,
      flexDirection: "row",
      alignSelf: "stretch",
      marginHorizontal: 15,
    }}
  >
    <Text style={{ width: 50 }}>{rank}</Text>
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
    width: MAX_WIDTH - 50,
  },
  button: {
    borderRadius: 5,
    padding: 8,

    // elevation: 1,
  },

  buttonCancel: {
    // backgroundColor: "#2196F3",
    margin: 10,
  },

  textBold: {
    fontWeight: "bold",
    fontSize: 15,
  },
});

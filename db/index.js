import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem("best_score", `${value}`);
  } catch (e) {
    console.log("store data error");
  }
};

export const getScore = async () => {
  try {
    const value = await AsyncStorage.getItem("best_score");
    if (value !== null) {
      return parseInt(value);
    } else return 0;
  } catch (e) {
    return 0;
  }
};

export function saveScore(score) {
  storeData(score);
}
export const getPlayerName = async () => {
  try {
    const value = await AsyncStorage.getItem("player_name");
    if (value !== null) {
      return value
    } else return "";
  } catch (e) {
    return "";
  }
}
export const storePlayerName = async (value) => {
  try {
    await AsyncStorage.setItem("player_name", value);
  } catch (e) {
    console.log("store data error");
  }
};

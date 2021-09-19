import AsyncStorage from "@react-native-async-storage/async-storage";

const BEST_SCORE = "best_score";
const USER_NAME = "user_name";
const PASSWORD = "password";

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    alert("An error occurred");
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    // if (value !== null) {
    //   return value;
    // }
    return value;
  } catch (e) {
    return null;
  }
};
export const getScore = async () => {
  const value = await getData(BEST_SCORE);
  if (value !== null) {
    return parseInt(value);
  } else return 0;
};

export const saveScore = (score) => {
  storeData(BEST_SCORE, `${score}`);
};

export const saveUser = async (userName, password) => {
  storeData(USER_NAME, userName);
  storeData(PASSWORD, password);
};
export const getUser = async () => {
  const user = await getData(USER_NAME);
  const password = await getData(PASSWORD);

  if (user !== null && user !== "" && password !== null && password !== "") {
    return { user, password };
  }
  return null;
};

export const resetUserInfo = async () => {
  saveUser("", "");
};


export const topScoreList = [
  { id: 1, name: "Devin", score: 10 },
  { id: 2, name: "Dan", score: 10 },
  { id: 3, name: "Dominic", score: 10 },
  { id: 4, name: "Jackson", score: 10 },
  { id: 5, name: "James", score: 10 },
  { id: 6, name: "Joel", score: 10 },
  { id: 7, name: "John", score: 10 },
  { id: 8, name: "Jillian", score: 10 },
  { id: 9, name: "Jimmy", score: 10 },
  { id: 10, name: "hieu", score: 10 },
  { id: 11, name: "Devin", score: 10 },
  { id: 12, name: "Dan", score: 10 },
  { id: 13, name: "Dominic", score: 10 },
  { id: 14, name: "Jackson", score: 10 },
  { id: 15, name: "James", score: 10 },
  { id: 16, name: "Joel", score: 10 },
  { id: 17, name: "John", score: 10 },
  { id: 18, name: "Jillian", score: 10 },
  { id: 19, name: "Jimmy", score: 10 },
  { id: 20, name: "hieu", score: 10 },
  { id: 21, name: "Devin", score: 10 },
  { id: 22, name: "Dan", score: 10 },
  { id: 23, name: "Dominic", score: 10 },
  { id: 24, name: "Jackson", score: 10 },
  { id: 25, name: "James", score: 10 },
  { id: 26, name: "Joel", score: 10 },
  { id: 27, name: "John", score: 10 },
  { id: 28, name: "Jillian", score: 10 },
  { id: 29, name: "Jimmy", score: 10 },
  { id: 30, name: "hieu", score: 10 },
  { id: 31, name: "Devin", score: 10 },
  { id: 32, name: "Dan", score: 10 },
  { id: 33, name: "Dominic", score: 10 },
  { id: 34, name: "Jackson", score: 10 },
  { id: 35, name: "James", score: 10 },
  { id: 36, name: "Joel", score: 10 },
  { id: 37, name: "John", score: 10 },
  { id: 38, name: "Jillian", score: 10 },
  { id: 39, name: "Jimmy", score: 10 },
  { id: 40, name: "hieu", score: 10 },
  { id: 41, name: "Devin", score: 10 },
  { id: 42, name: "Dan", score: 10 },
  { id: 43, name: "Dominic", score: 10 },
  { id: 44, name: "Jackson", score: 10 },
  { id: 45, name: "James", score: 10 },
  { id: 46, name: "Joel", score: 10 },
  { id: 47, name: "John", score: 10 },
  { id: 48, name: "Jillian", score: 10 },
  { id: 49, name: "Jimmy", score: 10 },
  { id: 50, name: "hieu", score: 10 },
];

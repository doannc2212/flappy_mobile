import connection from "./Connection";

export let otherPlayer = [];

const deletePlayer = (name) => {
  return otherPlayer.filter((ele) => {
    return ele.name !== name;
  });
};

export function receivePlayer() {
  connection.on("newUser", (user) => {
    otherPlayer.push({ name: user, isPlaying: false, isVisible: false });
  });

  connection.on("Notify", (user) => {
    otherPlayer = deletePlayer(user);
  });
}

export const findPlayer = (user) => {
  return otherPlayer.find((ele) => {
    return ele.name === user;
  });
};

export const filterVisiblePlayingPlayers = () => {
  return otherPlayer.filter((ele) => {
    return ele.isPlaying === true && ele.isVisible === true;
  });
};

export const setAllPlayerInvisible = () => {
  otherPlayer.forEach((item) => {
    item.isVisible = false;
  });
};

export const createPlayer = (user) => {
  otherPlayer.push({ name: user, isPlaying: false, isVisible: false });
};

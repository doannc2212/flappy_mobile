import connection from "./Connection";
import {
  GAP_HEIGHT,
  GROUND_HEIGHT,
  MAX_HEIGHT,
  MIN_PIPE_HEIGHT,
} from "./constants/Constants";

export let pipes = [];

export let numberOfPipes = 0;

connection.on("UpdateMap", (top, bottom) => {
  const height = MAX_HEIGHT - GROUND_HEIGHT;
  const pipesTop = top
    .map(Math.round)
    .map((item) => Math.round((item * height) / 100));
  const pipesBottom = bottom
    .map(Math.round)
    .map((item) => Math.round((item * height) / 100));

  numberOfPipes += 10;

  const listOfPipes = [];
  for (let i = 0; i < 10; i++) {
    listOfPipes.push([pipesTop[i], pipesBottom[i]]);
  }
  pipes = [...pipes, ...listOfPipes];

  console.log("num of pipes: " + numberOfPipes);
});

export const getPipes = () => {
  connection.invoke("CallMap").catch((e) => {
    console.log(e);
  });
};
export const resetPipes = () => {
  numberOfPipes = 0;
  pipes = [];
};

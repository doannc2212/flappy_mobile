import {
  GAP_HEIGHT,
  GROUND_HEIGHT,
  MAX_HEIGHT,
  MIN_PIPE_HEIGHT,
} from "./constants/Constants";

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generatePipe = () => {
  const topPipeHeight = randomBetween(MIN_PIPE_HEIGHT, MAX_HEIGHT / 2);
  const bottomPipeHeight =
    MAX_HEIGHT - topPipeHeight - GAP_HEIGHT - GROUND_HEIGHT;
  const size = [topPipeHeight, bottomPipeHeight];

  if (Math.random() < 0.5) size.reverse;
  return size;
};
export const numberOfPipes = 100;
const createPipes = () => {
  const listOfPipes = [];
  for (let i = 0; i < numberOfPipes; i++) {
    listOfPipes.push(generatePipe());
  }
  return listOfPipes;
};

export default createPipes;

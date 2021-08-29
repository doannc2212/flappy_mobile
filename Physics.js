import Matter from "matter-js";
import { PipeBottom, PipeTop } from "./components/Pipe";
import React from "react";
import {
  GAP_WIDTH,
  GROUND_HEIGHT,
  MAX_HEIGHT,
  MAX_WIDTH,
  PIPE_WIDTH,
  SPEED,
} from "./constants/Constants";
import createPipes, { numberOfPipes } from "./CreatePipes";

let lastPipeVisible = 0;
let firstPipeVisible = 0;
let score = 0;
const listOfPipes = createPipes();
const addPipes = (x, world, entities) => {
  if (lastPipeVisible > numberOfPipes - 1) return;

  let [pipe1Height, pipe2Height] = listOfPipes[lastPipeVisible];

  const pipeBottom = Matter.Bodies.rectangle(
    x,
    MAX_HEIGHT - pipe2Height / 2 - GROUND_HEIGHT,
    PIPE_WIDTH,
    pipe2Height,
    { isStatic: true }
  );

  const pipeTop = Matter.Bodies.rectangle(
    x,
    pipe1Height / 2,
    PIPE_WIDTH,
    pipe1Height,
    { isStatic: true }
  );
  entities["pipeBottom" + lastPipeVisible] = {
    body: pipeBottom,
    renderer: <PipeBottom />,
  };
  entities["pipeTop" + lastPipeVisible] = {
    body: pipeTop,
    renderer: <PipeTop />,
  };

  Matter.Composite.add(world, [pipeBottom, pipeTop]);

  lastPipeVisible++;
};

const Physics = (entities, { touches, time, dispatch }) => {
  const engine = entities.physics.engine;
  const birdBody = entities.bird.body;
  const world = entities.physics.world;
  // update bird image
  // const state = getBirdState();
  // if (entities.bird.pose != state) {
  //   entities.bird.pose = state;
  // }


  let hasTouches = false;
  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      if (!hasTouches) {
        if (world.gravity.y === 0.0) {
          world.gravity.y = 0.7;

          //reset state
          lastPipeVisible = 0;
          firstPipeVisible = 0;
          score = 0;
          //add first pipe
          addPipes(MAX_WIDTH + PIPE_WIDTH / 2, world, entities);
          addPipes(
            MAX_WIDTH + PIPE_WIDTH / 2 + PIPE_WIDTH + GAP_WIDTH,
            world,
            entities
          );
        }
        hasTouches = true;
        Matter.Body.setVelocity(birdBody, {
          x: 0,
          y: -15,
        });
      }
    });

  if (world.gravity.y !== 0.0) {
    //delete pipe
    if (
      entities["pipeTop" + firstPipeVisible].body.position.x <=
      -PIPE_WIDTH / 2
    ) {
      Matter.Composite.remove(world, [
        entities["pipeTop" + firstPipeVisible].body,
        entities["pipeBottom" + firstPipeVisible].body,
      ]);

      // add new pipe
      const posX = entities["pipeTop" + (lastPipeVisible - 1)].body.position.x;
      addPipes(posX + PIPE_WIDTH + GAP_WIDTH, world, entities);

      delete entities["pipeTop" + firstPipeVisible];
      delete entities["pipeBottom" + firstPipeVisible];

      firstPipeVisible++;
    }
    //add pipe
    // if (
    //   entities["pipeTop" + (lastPipeVisible - 1)].body.position.x <=
    //   MAX_WIDTH - GAP_WIDTH - PIPE_WIDTH / 2
    // ) {
    //   addPipes(MAX_WIDTH + PIPE_WIDTH / 2, world, entities);
    // }
    // translate pipe, delete pipe
    for (let i = firstPipeVisible; i < lastPipeVisible; i++) {
      Matter.Body.translate(entities["pipeTop" + i].body, { x: -3, y: 0 });
      Matter.Body.translate(entities["pipeBottom" + i].body, { x: -3, y: 0 });
    }
    const pipeScore = entities["pipeTop" + score];
    if (
      pipeScore != undefined &&
      pipeScore.body.position.x <= birdBody.position.x &&
      birdBody.position.y >= 0
    ) {
      score++;
      dispatch({ type: "score" });
    }
  }

  // translate ground
  for (let i = 1; i <= 2; i++) {
    const body = entities["ground" + i].body;
    if (body.position.x <= -MAX_WIDTH / 2) {
      Matter.Body.setPosition(body, {
        x: MAX_WIDTH + MAX_WIDTH / 2,
        y: body.position.y,
      });
    } else {
      Matter.Body.translate(body, { x: -3, y: 0 });
    }
  }

  Matter.Events.on(engine, "collisionStart", (event) => {
    dispatch({ type: "game-over" });
  });

  Matter.Engine.update(engine, SPEED);

  return entities;
};

let tick = 0;
let isUp = true;
const totalTick = 15;
const getBirdState = () => {
  if (tick == totalTick - 1) {
    isUp = false;
    tick = totalTick - totalTick / 3;
  }
  if (tick == 0) {
    isUp = true;
    tick = totalTick / 3 - 1;
  }
  if (isUp) tick++;
  else tick--;
  const num = Math.floor(tick / (totalTick / 3));
  switch (num) {
    case 0:
      return "down";
    case 1:
      return "mid";
    case 2:
      return "up";
  }
};

export default Physics;

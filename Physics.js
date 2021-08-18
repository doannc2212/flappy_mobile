import Matter from "matter-js";
import { Pipe, PipeTop } from "./components/Pipe";
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
  const pipeTopWith = PIPE_WIDTH + Math.floor(PIPE_WIDTH / 5);
  const pipeTopHeight = (pipeTopWith * 12) / 26;
  pipe1Height = pipe1Height - pipeTopHeight;

  const pipe1Top = Matter.Bodies.rectangle(
    x,
    pipe1Height + pipeTopHeight / 2,
    pipeTopWith,
    pipeTopHeight,
    { isStatic: true }
  );
  const pipe1 = Matter.Bodies.rectangle(
    x,
    pipe1Height / 2,
    PIPE_WIDTH,
    pipe1Height,
    { isStatic: true }
  );

  pipe2Height = pipe2Height - pipeTopHeight;
  const pipe2Top = Matter.Bodies.rectangle(
    x,
    MAX_HEIGHT - GROUND_HEIGHT - pipe2Height - pipeTopHeight / 2,
    pipeTopWith,
    pipeTopHeight,
    { isStatic: true }
  );
  const pipe2 = Matter.Bodies.rectangle(
    x,
    MAX_HEIGHT - GROUND_HEIGHT - pipe2Height / 2,
    PIPE_WIDTH,
    pipe2Height,
    { isStatic: true }
  );

  Matter.Composite.add(world, [pipe1, pipe2, pipe1Top, pipe2Top]);

  entities["pipeUp" + lastPipeVisible] = {
    body: pipe1,
    renderer: <Pipe />,
  };
  entities["pipeDown" + lastPipeVisible] = {
    body: pipe2,
    renderer: <Pipe />,
  };
  entities["pipeUpTop" + lastPipeVisible] = {
    body: pipe1Top,
    renderer: <PipeTop />,
  };
  entities["pipeDownTop" + lastPipeVisible] = {
    body: pipe2Top,
    renderer: <PipeTop />,
  };
  lastPipeVisible++;
};

const Physics = (entities, { touches, time, dispatch }) => {
  const engine = entities.physics.engine;
  const birdBody = entities.bird.body;
  const world = entities.physics.world;
  //update bird image
  // const state = getBirdState();
  // if (entities.bird.pose != state) {
  //   entities.bird.pose = state;
  // }
  Matter.Engine.update(engine, time.delta);
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
      entities["pipeDownTop" + firstPipeVisible].body.position.x <=
      -PIPE_WIDTH / 2
    ) {
      delete entities["pipeUp" + firstPipeVisible];
      delete entities["pipeDown" + firstPipeVisible];
      delete entities["pipeUpTop" + firstPipeVisible];
      delete entities["pipeDownTop" + firstPipeVisible];
      firstPipeVisible++;
    }
    //add pipe
    if (
      entities["pipeDownTop" + (lastPipeVisible - 1)].body.position.x <=
      MAX_WIDTH - GAP_WIDTH - PIPE_WIDTH / 2
    ) {
      addPipes(MAX_WIDTH + PIPE_WIDTH / 2, world, entities);
    }
    // translate pipe, delete pipe
    for (let i = firstPipeVisible; i < lastPipeVisible; i++) {
      Matter.Body.translate(entities["pipeUp" + i].body, { x: -3, y: 0 });
      Matter.Body.translate(entities["pipeDown" + i].body, { x: -3, y: 0 });
      Matter.Body.translate(entities["pipeUpTop" + i].body, { x: -3, y: 0 });
      Matter.Body.translate(entities["pipeDownTop" + i].body, { x: -3, y: 0 });
    }
    const pipeScore = entities["pipeUpTop" + score];
    if (
      pipeScore != undefined &&
      pipeScore.body.position.x <= birdBody.position.x
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

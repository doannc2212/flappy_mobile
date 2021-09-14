import Matter from "matter-js";
import { PipeBottom, PipeTop } from "./components/Pipe";
import React from "react";
import {
  GAP_WIDTH,
  GROUND_HEIGHT,
  MAX_HEIGHT,
  MAX_WIDTH,
  PIPE_WIDTH,
  SERVER_URL,
  SPEED,
} from "./constants/Constants";
import createPipes, { numberOfPipes } from "./CreatePipes";
import connection from "./Connection";

let lastPipeVisible = 0;
let firstPipeVisible = 0;
let score = 0;

let entitiesGameEngine;
let playing = false;
let startSystems = false;
const listOfPipes = createPipes();
const numberOfPipesOnScreen = Math.ceil(MAX_WIDTH / GAP_WIDTH);

connection.on("UserDead", (user) => {
  console.log(user);
});

const Physics = (entities, { touches, time, dispatch, events }) => {
  const engine = entities.physics.engine;
  const birdBody = entities.bird.body;
  const world = entities.physics.world;
  // update bird image
  // const state = getBirdState();
  // if (entities.bird.pose != state) {
  //   entities.bird.pose = state;
  // }

  events
    .filter((t) => t.type === "started")
    .forEach((t) => {
      entitiesGameEngine = entities;
      startSystems = true;
    });
  let hasTouches = false;
  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      if (!hasTouches) {
        if (!playing) {
          // world.gravity.y = 1;

          //reset state
          lastPipeVisible = 0;
          firstPipeVisible = 0;
          score = 0;
          entitiesGameEngine = entities;
          playing = true;

          Matter.Body.setStatic(birdBody, false);
          // add pipe
          for (let i = 0; i < numberOfPipesOnScreen; i++) {
            addPipes(
              MAX_WIDTH + PIPE_WIDTH / 2 + i * (PIPE_WIDTH + GAP_WIDTH),
              world,
              entities
            );
          }
        }
        hasTouches = true;
        Matter.Body.setVelocity(birdBody, {
          x: 0,
          y: -10,
        });
      }
    });

  if (playing) {
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

  Matter.Events.on(engine, "collisionStart", (event) => {
    const pairs = event.pairs;
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i];
      if (pair.bodyA === entities["bird"].body && playing) {
        playing = false;
        startSystems = false;
        deleteAllPipe();
        Matter.Composite.remove(world, [birdBody]);
        dispatch({ type: "game-over" });
      }
    }
  });

  return entities;
};

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

let interval = setInterval(() => {
  if (entitiesGameEngine !== undefined && startSystems) {
    const engine = entitiesGameEngine.physics.engine;
    const world = entitiesGameEngine.physics.world;

    // translate ground
    for (let i = 1; i <= 2; i++) {
      const body = entitiesGameEngine["ground" + i].body;
      if (body.position.x <= -MAX_WIDTH / 2) {
        Matter.Body.setPosition(body, {
          x: MAX_WIDTH + MAX_WIDTH / 2,
          y: body.position.y,
        });
      } else {
        Matter.Body.translate(body, { x: -3, y: 0 });
      }
    }
    if (playing) {
      //delete pipe
      if (
        entitiesGameEngine["pipeTop" + firstPipeVisible].body.position.x <=
        -PIPE_WIDTH / 2
      ) {
        Matter.Composite.remove(world, [
          entitiesGameEngine["pipeTop" + firstPipeVisible].body,
          entitiesGameEngine["pipeBottom" + firstPipeVisible].body,
        ]);

        // add new pipe
        const posX =
          entitiesGameEngine["pipeTop" + (lastPipeVisible - 1)].body.position.x;
        addPipes(posX + PIPE_WIDTH + GAP_WIDTH, world, entitiesGameEngine);

        delete entitiesGameEngine["pipeTop" + firstPipeVisible];
        delete entitiesGameEngine["pipeBottom" + firstPipeVisible];

        firstPipeVisible++;
      }

      for (let i = firstPipeVisible; i < lastPipeVisible; i++) {
        Matter.Body.translate(entitiesGameEngine["pipeTop" + i].body, {
          x: -3,
          y: 0,
        });
        Matter.Body.translate(entitiesGameEngine["pipeBottom" + i].body, {
          x: -3,
          y: 0,
        });
      }
    }

    Matter.Engine.update(engine, SPEED);
  }
}, SPEED);

const deleteAllPipe = () => {
  const world = entitiesGameEngine.physics.world;
  for (let i = firstPipeVisible; i < lastPipeVisible; i++) {
    Matter.Composite.remove(world, [
      entitiesGameEngine["pipeTop" + i].body,
      entitiesGameEngine["pipeBottom" + i].body,
    ]);

    delete entitiesGameEngine["pipeTop" + i];
    delete entitiesGameEngine["pipeBottom" + i];
  }
  lastPipeVisible = 0;
  firstPipeVisible = 0;
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

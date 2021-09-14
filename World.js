import React from "react";
import Ground from "./components/Ground";
import Bird from "./components/Bird";
import BlueBird from "./components/BlueBird";
import {
  BIRD_HEIGHT,
  BIRD_WIDTH,
  GROUND_HEIGHT,
  MAX_HEIGHT,
  MAX_WIDTH,
} from "./constants/Constants";
import Matter from "matter-js";

const setupWorld = () => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  const world = engine.world;

  engine.gravity.y = 0.0;

  Matter.Composite.clear(world, false);

  const bird = Matter.Bodies.circle(
    MAX_WIDTH / 2,
    MAX_HEIGHT / 2,
    Math.floor(Math.min(BIRD_HEIGHT / 2, BIRD_WIDTH / 2)),
    { isStatic: true }
  );

  const ground1 = Matter.Bodies.rectangle(
    MAX_WIDTH / 2,
    MAX_HEIGHT - GROUND_HEIGHT / 2,
    MAX_WIDTH + 10,
    GROUND_HEIGHT,
    { isStatic: true }
  );
  const ground2 = Matter.Bodies.rectangle(
    MAX_WIDTH + MAX_WIDTH / 2,
    MAX_HEIGHT - GROUND_HEIGHT / 2,
    MAX_WIDTH + 10,
    GROUND_HEIGHT,
    { isStatic: true }
  );

  const result = {
    physics: { engine: engine, world: world },
  };
  result["bird"] = {
    body: bird,
    pose: "up",
    renderer: <Bird />,
  };
  result["ground1"] = {
    body: ground1,
    renderer: <Ground />,
  };
  result["ground2"] = {
    body: ground2,
    renderer: <Ground />,
  };

  //other bird
  // const bird2 = Matter.Bodies.circle(
  //   MAX_WIDTH / 2,
  //   MAX_HEIGHT / 2,
  //   Math.floor(Math.min(BIRD_HEIGHT / 2, BIRD_WIDTH / 2)),
  //   { isStatic: true }
  // );
  // result["bird2"] = {
  //   body: bird2,
  //   pose: "up",
  //   renderer: <BlueBird />,
  // };

  Matter.Composite.add(world, [bird, ground1, ground2]);

  return result;
};

export default setupWorld;

import React from "react";
import { View, Image, Animated } from "react-native";
import { BIRD_HEIGHT, BIRD_WIDTH } from "../constants/Constants";

export default Bird = (props) => {
  const width = BIRD_WIDTH;
  const height = BIRD_HEIGHT;
  const left = props.body.position.x - width / 2;
  const top = props.body.position.y - height / 2;

  let image;
  switch (props.pose) {
    case "up":
      image = require("../assets/images/yellowbird-upflap.png");
      break;
    case "mid":
      image = require("../assets/images/yellowbird-midflap.png");
      break;
    case "down":
      image = require("../assets/images/yellowbird-downflap.png");
      break;
  }

  let animatedValue = new Animated.Value(props.body.velocity.y);
  animatedValue.setValue(props.body.velocity.y);
  let rotation = animatedValue.interpolate({
    inputRange: [-15, -5, 0, 5, 15],
    outputRange: ["-50deg", "-25deg", "0deg", "20deg", "50deg"],
    extrapolate: "clamp",
  });
  return (
    <Animated.Image
      style={{
        position: "absolute",
        top: top,
        left: left,
        width: width,
        height: height,
        transform: [{ rotate: rotation }],
      }}
      resizeMode="stretch"
      source={image}
      fadeDuration={0}
    />
  );
};

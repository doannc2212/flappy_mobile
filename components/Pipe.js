import React from "react";
import { Image, View } from "react-native";

export const Pipe = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;
  return (
    <Image
      style={{
        position: "absolute",
        top: props.body.position.y - height / 2,
        left: props.body.position.x - width / 2,
        resizeMode: "stretch",
        width: width,
        height: height,
      }}
      source={require("../assets/images/pipe.png")}
    />
  );
}

export const PipeTop = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;
  return (
    <Image
      style={{
        position: "absolute",
        top: props.body.position.y - height / 2,
        left: props.body.position.x - width / 2,
        resizeMode: "stretch",
        width: width,
        height: height,
      }}
      source={require("../assets/images/pipe_top.png")}
    />
  );
};

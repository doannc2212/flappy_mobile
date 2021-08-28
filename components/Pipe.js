import React from "react";
import { Image, View } from "react-native";

export const PipeBottom = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;

  const pipeTopHeight = (width * 12) / 26;
  const pipeHeight = height - pipeTopHeight;
  return (
    <View>
      <Image
        style={{
          position: "absolute",
          top: props.body.position.y - height / 2 + pipeTopHeight,
          left: props.body.position.x - width / 2,
          resizeMode: "stretch",
          width: width,
          height: pipeHeight,
        }}
        source={require("../assets/images/pipe.png")}
      />
      <Image
        style={{
          position: "absolute",
          top: props.body.position.y - height / 2,
          left: props.body.position.x - width / 2 - 2,
          resizeMode: "stretch",
          width: width + 4,
          height: pipeTopHeight,
        }}
        source={require("../assets/images/pipe_top.png")}
      />
    </View>
  );
};

export const PipeTop = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;

  const pipeTopHeight = (width * 12) / 26;
  const pipeHeight = height - pipeTopHeight;
  return (
    <View>
      <Image
        style={{
          position: "absolute",
          top: props.body.position.y - height / 2,
          left: props.body.position.x - width / 2,
          resizeMode: "stretch",
          width: width,
          height: pipeHeight,
        }}
        source={require("../assets/images/pipe.png")}
      />
      <Image
        style={{
          position: "absolute",
          top: height - pipeTopHeight,
          left: props.body.position.x - width / 2 - 2,
          resizeMode: "stretch",
          width: width + 4,
          height: pipeTopHeight,
        }}
        source={require("../assets/images/pipe_top.png")}
      />
    </View>
  );
};

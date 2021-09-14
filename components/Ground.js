import React from "react";
import { Image } from "react-native";

const Ground = (props) => {
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
      source={require("../assets/images/flappybird-bg-brow.png")}
      fadeDuration={0}
    />
  );
};

export default Ground;

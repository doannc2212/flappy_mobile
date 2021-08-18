import React from "react";
import { Image, View } from "react-native";

const Score = (props) => {
  let num = 1;
  let score = props.score;
  let scoreItem = [];
  if (score === 0) {
    scoreItem.push(0);
  } else {
    num = Math.ceil(Math.log10(score));

    while (score !== 0) {
      scoreItem.push(score % 10);
      score = Math.floor(score / 10);
    }
  }

  scoreItem = scoreItem.reverse();

  return (
    <View
      style={{
        position: "absolute",
        alignItems: "center",
        top: 70,
        height: 36,
        overflow: "hidden",
        flexDirection: "row",
      }}
    >
      {Array.apply(null, Array(num)).map((el, indx) => {
        return <ScoreItem scoreItem={scoreItem[indx]} key={indx} />;
      })}
    </View>
  );
};

const ScoreItem = (props) => {
  let scoreItem = props.scoreItem;
  return (
    <Image
      style={{ width: 24, width: 36 , marginStart: 3}}
      resizeMode="stretch"
      source={getScoreSource(scoreItem)}
    />
  );
};

const getScoreSource = (scoreItem) => {
  switch (scoreItem) {
    case 0:
      return require("../assets/images/flappybird_00.png");
    case 1:
      return require("../assets/images/flappybird_01.png");
    case 2:
      return require("../assets/images/flappybird_02.png");
    case 3:
      return require("../assets/images/flappybird_03.png");
    case 4:
      return require("../assets/images/flappybird_04.png");
    case 5:
      return require("../assets/images/flappybird_05.png");
    case 6:
      return require("../assets/images/flappybird_06.png");
    case 7:
      return require("../assets/images/flappybird_07.png");
    case 8:
      return require("../assets/images/flappybird_08.png");
    case 9:
      return require("../assets/images/flappybird_09.png");
  }
};
export default Score;

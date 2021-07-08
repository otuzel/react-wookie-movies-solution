import React from "react";

import Star from "../../icons/star.svg";

import { $Rating } from "./styles";

type RatingProps = {
  score: number;
};

const Rating = (props: RatingProps) => {
  const { score } = props;

  const avgRating = Math.round(score / 2);
  const stars = new Array(5).fill(0);

  return (
    <$Rating>
      {stars.map((star: number, index: number) => (
        <Star
          key={index}
          style={{
            fill: avgRating > index ? "#cd8500" : "transparent",
            stroke: "#cd8500",
          }}
        />
      ))}
      <div>(IMDB Score: {score})</div>
    </$Rating>
  );
};

export default Rating;

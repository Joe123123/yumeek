import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
  text: number;
  name: string;
  amount: number;
}

export const CircularBar: React.FC<Props> = (props) => {
  const value = Math.round(props.text * 10000) / 100;

  return (
    <div style={{ width: "80%" }}>
      <CircularProgressbarWithChildren
        value={value}
        maxValue={100}
        styles={
          value > 100
            ? buildStyles({
                pathColor: "#f17e75",
              })
            : buildStyles({
                pathColor: "#72d1dc",
              })
        }
      >
        <div style={{ fontSize: 16, marginTop: -5 }}>
          <div>
            {props.name === "Calories" ? (
              <p>
                {props.amount} {props.name}
              </p>
            ) : (
              <p>{props.name}</p>
            )}
          </div>
          <strong>{`${value}% DV`}</strong>
          {props.name !== "Calories" ? (
            <p>{`${Math.round(props.amount)} g`}</p>
          ) : (
            <p></p>
          )}
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

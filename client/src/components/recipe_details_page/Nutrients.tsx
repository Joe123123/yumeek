import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container } from "@material-ui/core";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import nutrientsArray from "../../helper/nutrientsArray";
import { Recipes } from "../interfaces/Recipe.interface";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: "30px",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  title: {
    fontSize: "2.2rem",
    margin: "3%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "18px",
  },
}));

interface Props {
  recipe: Recipes;
}

export const Nutrients: React.FC<Props> = (props) => {
  const { recipe } = props;
  const classes = useStyles();
  const nutrients = nutrientsArray(recipe);

  return (
    <>
      <Typography className={classes.title}>Nutrition Facts</Typography>
      <div className={classes.root}>
        {nutrients.map((item, index) => {
          let value = item.value / 1000;
          let text = `${(item.value / 1000).toFixed(0)}g`;
          let pathColor = "#72d1dc";
          if (item.name === "Calories") {
            value = item.value;
            text = String(item.value);
          }
          if (value > item.maxValue) {
            pathColor = "#f17e75";
          }
          return (
            <Container key={index} className={classes.container}>
              <CircularProgressbar
                value={value}
                text={text}
                maxValue={item.maxValue}
                strokeWidth={6}
                background
                backgroundPadding={2}
                styles={buildStyles({
                  backgroundColor: "#dddddd9c",
                  textColor: "#606060",
                  pathColor: pathColor,
                  trailColor: "#f5f5f5",
                })}
              />
              <span>{item.name}</span>
            </Container>
          );
        })}
      </div>
      <div>
        * Percent Daily Values are based on a 2,400 calorie diet. Your Daily
        Values may be higher or lower depending on your calorie needs.
      </div>
    </>
  );
};

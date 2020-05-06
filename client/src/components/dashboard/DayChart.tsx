import React, { useState, useEffect } from "react";
import { CircularBar } from "./CicularBar";
import Grid from "@material-ui/core/Grid";
import { DashboardRecipe } from "../interfaces/Recipe.interface";

interface Props {
  chartRecipeData: DashboardRecipe[];
  selectDay: string;
}

export const DayChart: React.FC<Props> = (props) => {
  const [data, setData] = useState({
    energies: 0,
    carbs: 0,
    fiber: 0,
    protein: 0,
    fat: 0,
  });

  useEffect(() => {
    const newData = props.chartRecipeData.filter(
      (el) => el["weekday"] === props.selectDay
    );

    if (newData.length === 0 || newData === undefined) {
      const energies = 0;
      const carbs = 0;
      const fiber = 0;
      const protein = 0;
      const fat = 0;
      setData({
        energies: energies,
        carbs: carbs,
        fiber: fiber,
        protein: protein,
        fat: fat,
      });
    } else {
      const energies = newData[0]["energies"];
      const carbs = newData[0]["carbs"];
      const fiber = newData[0]["fiber"];
      const protein = newData[0]["protein"];
      const fat = newData[0]["fat"];
      setData({
        energies: energies,
        carbs: carbs,
        fiber: fiber,
        protein: protein,
        fat: fat,
      });
    }
  }, [props.selectDay, props.chartRecipeData]);

  return (
    <div>
      {props.selectDay ? (
        <Grid container spacing={6}>
          <Grid item xs={4}>
            <CircularBar
              text={data.energies / 2400}
              name="Calories"
              amount={data.energies}
            />
          </Grid>
          <Grid item xs={4}>
            <CircularBar
              text={data.carbs / 300}
              name="Carbs"
              amount={data.carbs}
            />
          </Grid>
          <Grid item xs={4}>
            <CircularBar
              text={data.protein / 50}
              name="Protein"
              amount={data.protein}
            />
          </Grid>
          <Grid item xs={4}>
            <CircularBar text={data.fat / 65} name="Fat" amount={data.fat} />
          </Grid>
          <Grid item xs={4}>
            <CircularBar
              text={data.fiber / 25}
              name="Fiber"
              amount={data.fiber}
            />
          </Grid>
        </Grid>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

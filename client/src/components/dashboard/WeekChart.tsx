import React from "react";
import Paper from "@material-ui/core/Paper";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import {
  Chart,
  BarSeries,
  LineSeries,
  ArgumentAxis,
  ValueAxis,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";

import { Animation, ValueScale, Stack } from "@devexpress/dx-react-chart";
import { DashboardRecipe } from "../interfaces/Recipe.interface";

const Label = (symbol: string) => (props: any) => {
  const { text } = props;
  return <ValueAxis.Label {...props} text={text + symbol} />;
};

const KCalLabel = Label(" kCal");
const GramLabel = Label(" g");

const modifyGramDomain = (domain: ReadonlyArray<number>) => [domain[0], 1000];
const modifyKCalDomain = () => [0, 10000];

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    backgroundColor: "transparent",
  },
}));

interface Props {
  chartRecipeData: DashboardRecipe[];
}

export const WeekChart: React.FC<Props> = (props) => {
  const { chartRecipeData } = props;
  const classes = useStyles();

  return (
    <div>
      {chartRecipeData ? (
        <div>
          <Paper className={classes.root}>
            <Chart data={chartRecipeData}>
              <ValueScale name="gram" modifyDomain={modifyGramDomain} />
              <ValueScale name="kCal" modifyDomain={modifyKCalDomain} />

              <ArgumentAxis />
              <ValueAxis scaleName="gram" labelComponent={GramLabel} />
              <ValueAxis
                scaleName="kCal"
                position="right"
                labelComponent={KCalLabel}
              />

              <Title text="Nutrients grams vs Energies kCal" />

              <BarSeries
                name="Carbs"
                valueField="carbs"
                argumentField="weekday"
                scaleName="gram"
              />
              <BarSeries
                name="Protein"
                valueField="protein"
                argumentField="weekday"
                scaleName="gram"
              />
              <BarSeries
                name="Fiber"
                valueField="fiber"
                argumentField="weekday"
                scaleName="gram"
              />
              <BarSeries
                name="Fat"
                valueField="fat"
                argumentField="weekday"
                scaleName="gram"
              />
              <LineSeries
                name="Energies"
                valueField="energies"
                scaleName="kCal"
              />
              <Stack
                stacks={[
                  {
                    series: ["Carbs", "Protein", "Fiber", "Fat"],
                  },
                ]}
              />
              <Animation />
              <Legend />
            </Chart>
          </Paper>
        </div>
      ) : (
        <div>
          <Skeleton variant="text" width={1200} height={100} animation="wave" />
          <Skeleton variant="rect" width={1200} height={400} animation="wave" />
          <Skeleton variant="text" width={1200} height={100} animation="wave" />
        </div>
      )}
    </div>
  );
};

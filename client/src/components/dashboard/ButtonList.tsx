import React from "react";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    color: "#41333B",
    paddingTop: "20px",
    paddingBottom: "10px",
  },
}));

interface Props {
  selectDay: (day: string) => void;
  selectWeek: () => void;
  selectOption: string;
}

export const ButtonList: React.FC<Props> = ({
  selectDay,
  selectWeek,
  selectOption,
}) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <Button
          size="large"
          onClick={() => selectDay("Sunday")}
          disabled={selectOption === "Sunday"}
        >
          Sunday
        </Button>
        <Button
          size="large"
          onClick={() => selectDay("Monday")}
          disabled={selectOption === "Monday"}
        >
          Monday
        </Button>
        <Button
          size="large"
          onClick={() => selectDay("Tuesday")}
          disabled={selectOption === "Tuesday"}
        >
          Tuesday
        </Button>
        <Button
          size="large"
          onClick={() => selectDay("Wednesday")}
          disabled={selectOption === "Wednesday"}
        >
          Wednesday
        </Button>
        <Button
          size="large"
          onClick={() => selectDay("Thursday")}
          disabled={selectOption === "Thursday"}
        >
          Thursday
        </Button>
        <Button
          size="large"
          onClick={() => selectDay("Friday")}
          disabled={selectOption === "Friday"}
        >
          Friday
        </Button>
        <Button
          size="large"
          onClick={() => selectDay("Saturday")}
          disabled={selectOption === "Saturday"}
        >
          Saturday
        </Button>
        <Button
          size="large"
          onClick={selectWeek}
          disabled={selectOption === "week"}
        >
          Week Overview
        </Button>
      </div>
      <Divider />
    </div>
  );
};

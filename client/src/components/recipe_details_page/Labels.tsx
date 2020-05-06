import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import icons from "../../helper/heathyTags";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "28%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      width: "30%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "33%",
    },
  },
  font: {
    fontSize: "1rem",
  },
  label: {
    display: "flex",
    margin: "10%",
  },
  icon: {
    [theme.breakpoints.down("sm")]: {
      width: "25 em",
    },
  },
}));

interface Props {
  labels: string[];
}

export const Labels: React.FC<Props> = (props) => {
  const { labels } = props;
  const classes = useStyles();
  let src = "";

  return (
    <section className={classes.root}>
      {labels.map((label, index) => {
        icons.forEach((item) => {
          if (label.toLowerCase() === item.name) {
            src = item.src;
          }
        });
        return (
          <div className={classes.label} key={index}>
            <img src={src} alt={label} className={classes.icon} />
            <p className={classes.font}>{label}</p>
          </div>
        );
      })}
    </section>
  );
};

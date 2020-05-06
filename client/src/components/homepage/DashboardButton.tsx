import React from "react";
import { useHistory } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { SessionUser } from "../interfaces/User.interface";

const useStyles = makeStyles({
  root: {
    background:
      "linear-gradient(83deg, rgba(217,158,31,1) 6%, rgba(211,155,93,0.9262079831932774) 91%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 43,
    padding: "0 18px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .2)",
  },
});

interface Props {
  sessionUser: SessionUser;
}

export const DashboardButton: React.FC<Props> = (props) => {
  const { sessionUser } = props;
  let history = useHistory();
  const classes = useStyles();

  const handleClickDashboard = (): void => {
    history.push(`/user/${sessionUser.id}/stats`);
  };

  return (
    <div>
      <Button
        classes={{
          root: classes.root,
        }}
        onClick={handleClickDashboard}
        startIcon={<DashboardIcon />}
      >
        My Dashboard
      </Button>
    </div>
  );
};

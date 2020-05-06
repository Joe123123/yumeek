import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import {
  SessionUser,
  SignupUser,
  LoginUser,
} from "../interfaces/User.interface";

const useStyles = makeStyles(
  (theme: Theme): Record<string, any> => ({
    margin: {
      margin: theme.spacing(5),
    },
    logo: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    infoContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
    },
    avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    userEmail: {
      height: theme.spacing(3),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      fontSize: "19px",
      color: "#edf2f6",
    },
    logout: {
      height: theme.spacing(3),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      color: "#edf2f6",
    },
    root: {
      background:
        "linear-gradient(83deg, rgba(217,158,31,1) 6%, rgba(211,155,93,0.9262079831932774) 91%)",
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 42,
      padding: "0 23px",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .2)",
    },
    label: {
      textTransform: "capitalized",
    },
  })
);

interface Props {
  user: SessionUser | null;
  handleSignup: (user: SignupUser) => void;
  handleLogin: (user: LoginUser) => void;
  handleLogout: () => void;
}

export const UserInfo: React.FC<Props> = (props) => {
  const { user, handleSignup, handleLogin, handleLogout } = props;
  const [open, setOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");

  let history = useHistory();

  const handleRedirect = (): void => {
    history.push("/");
  };

  const classes = useStyles();

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
    setEmail("");
    setPassword("");
    setPassword_confirmation("");
    setFirst_name("");
    setLast_name("");
  };

  return (
    <div>
      {user ? (
        <div className={classes.infoContainer}>
          <Avatar
            alt="logo"
            src={
              user.img_url ||
              "https://cpng.pikpng.com/pngl/s/286-2863405_original-png-clip-art-file-profile-icon-svg.png"
            }
            className={classes.avatar}
          />
          <Chip
            label={user.email.length > 30 ? user.first_name : user.email}
            className={classes.userEmail}
            variant="outlined"
          />
          <Chip
            label="logout"
            className={classes.logout}
            onClick={() => {
              handleLogout();
              handleRedirect();
            }}
            variant="outlined"
          />
        </div>
      ) : (
        <Button
          classes={{
            root: classes.root,
            label: classes.label,
          }}
          className={classes.margin}
          onClick={handleClickOpen}
        >
          Sign Up / Log In
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">SIGN UP / LOG IN</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you ready to start your yummeek?
          </DialogContentText>
          {showSignup && (
            <>
              <TextField
                margin="dense"
                id="firstname"
                label="firstname"
                type="text"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
              />
              <TextField
                margin="dense"
                id="lastname"
                label="lastname"
                type="text"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
              />
            </>
          )}

          <TextField
            margin="dense"
            id="email"
            label="email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showSignup && (
            <TextField
              margin="dense"
              id="confirm-password"
              label="confirm password"
              type="password"
              fullWidth
              value={password_confirmation}
              onChange={(e) => setPassword_confirmation(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          {!showSignup && (
            <>
              <Button
                onClick={() => {
                  setShowSignup(true);
                }}
                color="primary"
              >
                Sign up
              </Button>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleLogin({ email, password });
                  handleClose();
                }}
                color="primary"
              >
                Log in
              </Button>
            </>
          )}
          {showSignup && (
            <>
              <Button
                onClick={() => {
                  handleClose();
                  setShowSignup(false);
                }}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleSignup({
                    first_name,
                    last_name,
                    email,
                    password,
                    password_confirmation,
                  });
                  handleClose();
                }}
                color="primary"
              >
                Sign up
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

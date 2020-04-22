import React from "react";
import clsx from "clsx";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Sidebar from "./Sidebar";
import Home from "./Home";
import Dashboard from "./dashboard";
import Recipe from "./Recipe";
import useUserData from "../hooks/useUserData";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
    width: 200,
    background: "#453033", //"#DCDCD9",
    color: "#fff",
    [theme.breakpoints.up("md")]: {
      width: 240,
    },
  },
  appBar: {
    [theme.breakpoints.down("sm")]: {
      background: "#535454",
      color: "#fff",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    // paddingBottom: theme.spacing(4),
    backgroundColor: "#Fafafa",
  },
}));

export default function App(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const {
    savedRecipes,
    sessionUser,
    userSignup,
    userLogin,
    userLogout,
    deleteRecipe,
    handleAdd,
  } = useUserData();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <BrowserRouter>
      <div className={clsx("App", classes.root)}>
        <CssBaseline />
        <Hidden smUp>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Yummeek
              </Typography>
            </Toolbar>
          </AppBar>
        </Hidden>
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <Sidebar
              savedRecipes={savedRecipes}
              sessionUser={sessionUser}
              userSignup={(user) => {
                userSignup(user);
              }}
              userLogin={(user) => {
                userLogin(user);
              }}
              userLogout={userLogout}
            />
          </Drawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer
            variant="permanent"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Sidebar
              savedRecipes={savedRecipes}
              sessionUser={sessionUser}
              userSignup={(user) => userSignup(user)}
              userLogin={(user) => userLogin(user)}
              userLogout={userLogout}
              deleteRecipe={(recipe) => deleteRecipe(recipe)}
            />
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <Switch>
              <Route exact path="/user/:userid/stats" component={Dashboard} />
              <Route
                exact
                path="/"
                render={() => (
                  <Home handleAdd={(recipe) => handleAdd(recipe)} />
                )}
              />
              <Route
                exact
                path="/recipe"
                render={() => (
                  <Recipe
                    sessionUser={sessionUser}
                    handleAdd={(recipe) => handleAdd(recipe)}
                    savedRecipes={savedRecipes}
                    deleteRecipe={(recipe) => deleteRecipe(recipe)}
                  />
                )}
              />
            </Switch>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

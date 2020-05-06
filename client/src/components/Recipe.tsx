import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";

import { Labels } from "./recipe_details_page/Labels";
import { IngredientsList } from "./recipe_details_page/IngredientsList";
import SaveRecipeButton from "./recipe_details_page/SaveRecipeButton";
import Nutrients from "./recipe_details_page/Nutrients";
import RecipeInfo from "./recipe_details_page/RecipeInfo";
import { Recipes } from "./interfaces/Recipe.interface";
import { SessionUser } from "./interfaces/User.interface";

const useStyles = makeStyles((theme) => ({
  labels: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      margin: "5%",
    },
  },
  background: {
    width: "100 wh",
    height: "100 vh",
    background:
      "linear-gradient(0deg, rgba(115,190,119,1) 0%, rgba(254,254,246,0.9192051820728291) 20%)",
  },
  root: {
    background: "#fdd770",
    "&:hover": {
      background: "#f1d170",
    },
    borderRadius: 25,
    border: 0,
    height: 41,
    padding: "0 18px",
    marginTop: "3%",
    [theme.breakpoints.down("md")]: {
      marginTop: "3%",
      marginBottom: "3%",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "7%",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "2%",
    },
  },
}));

interface Props {
  savedRecipes: Recipes[];
  deleteRecipe: (recipe: Recipes) => void;
  handleAdd: (recipe: Recipes) => void;
  sessionUser: SessionUser | null;
}

export const Recipe: React.FC<Props> = (props) => {
  const location = useLocation<{ recipe: Recipes }>();
  const { savedRecipes, deleteRecipe, handleAdd, sessionUser } = props;
  const classes = useStyles();

  const history = useHistory();
  const handleClick = (): void => {
    history.push("/");
  };

  return (
    <Container className={classes.background}>
      <Button
        classes={{
          root: classes.root,
          label: classes.labels,
        }}
        onClick={handleClick}
      >
        Back To Search
      </Button>
      <RecipeInfo recipe={location.state.recipe} sessionUser={sessionUser} />
      <SaveRecipeButton
        handleAdd={handleAdd}
        recipe={location.state.recipe}
        savedRecipes={savedRecipes}
        deleteRecipe={deleteRecipe}
        sessionUser={sessionUser}
      />
      <div className={classes.labels}>
        <Labels labels={location.state.recipe.health_labels} />
        <IngredientsList ingredients={location.state.recipe.ingredients} />
      </div>
      <Nutrients recipe={location.state.recipe} />
    </Container>
  );
};

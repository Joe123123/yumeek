import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import checkIfRecipeInTheList from "../../helper/checkIfRecipeInTheList";
import { Recipes } from "../interfaces/Recipe.interface";

const useStyles = makeStyles(
  (theme: Theme): Record<string, any> => ({
    root: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "2%",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    style: { fontSize: 40 },
    addButton: {
      background: "#fdd770",
      "&:hover": {
        background: "#f1d170",
      },
      borderRadius: 3,
      color: "#51524e",
      border: 0,
      height: 43,
      padding: "0 18px",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .2)",
    },
    label: {
      textTransform: "capitalized",
    },
    deleteButton: {
      background: "#c9935a",
      "&:hover": {
        background: "#f1d180",
      },
      borderRadius: 3,
      border: 0,
      color: "#51524e",
      height: 43,
      padding: "0 18px",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .2)",
    },
  })
);

interface Props {
  recipe: Recipes;
  savedRecipes: Recipes[];
  handleAdd: (recipe: Recipes) => void;
  deleteRecipe: (recipe: Recipes) => void;
}

export const SaveRecipeButton: React.FC<Props> = (props) => {
  const { recipe, savedRecipes, handleAdd, deleteRecipe } = props;
  const classes = useStyles();

  const savedRecipe = checkIfRecipeInTheList(
    savedRecipes,
    recipe.src_url,
    recipe.label
  );

  return (
    <div className={classes.root}>
      {savedRecipe.length > 0 ? (
        <Button
          classes={{
            root: classes.deleteButton,
            label: classes.label,
          }}
          onClick={() => deleteRecipe(savedRecipe[0])}
        >
          Delete From List
        </Button>
      ) : (
        <Button
          classes={{
            root: classes.addButton,
            label: classes.label,
          }}
          onClick={() => handleAdd(recipe)}
        >
          Add To Saved Recipes
        </Button>
      )}
    </div>
  );
};

import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import { Recipes } from "../interfaces/Recipe.interface";

const useStyles = makeStyles(
  (theme: Theme): Record<string, any> => ({
    margin: {
      margin: theme.spacing(5),
    },
    chipsroot: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      padding: theme.spacing(0.5),
    },
    chip: {
      margin: theme.spacing(0.5),
    },
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
    label: {
      textTransform: "capitalized",
    },
  })
);

interface Props {
  savedRecipes: Recipes[];
  deleteRecipe: (recipe: Recipes) => void;
}

export const SavedRecipes: React.FC<Props> = (props) => {
  const { savedRecipes, deleteRecipe } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const history = useHistory();

  const handleRedirect = (recipe: Recipes): void => {
    history.push("/recipe", { recipe });
  };

  return (
    <div className={classes.margin}>
      <Badge color="secondary" badgeContent={savedRecipes.length || "Empty"}>
        <Button
          classes={{
            root: classes.root,
            label: classes.label,
          }}
          onClick={handleClickOpen}
          startIcon={<RestaurantMenuIcon />}
        >
          Saved Recipes
        </Button>
      </Badge>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Saved Recipes</DialogTitle>
        <DialogContent>
          <DialogContentText>Add recipes to your yumeek!</DialogContentText>
          <Paper className={classes.chipsroot}>
            {savedRecipes &&
              savedRecipes.map((recipe, index) => {
                return (
                  <Chip
                    key={index}
                    avatar={<Avatar alt={recipe.label} src={recipe.img_url} />}
                    label={recipe.label}
                    onDelete={() => deleteRecipe(recipe)}
                    className={classes.chip}
                    onClick={() => {
                      handleRedirect(recipe);
                      setOpen(false);
                    }}
                  />
                );
              })}
          </Paper>
        </DialogContent>
      </Dialog>
    </div>
  );
};

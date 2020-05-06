import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import ItemTypes from "./ItemTypes";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { useParams } from "react-router-dom";
import axios from "axios";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";
import { Recipes, PutRecipe } from "../interfaces/Recipe.interface";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    height: 130,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  icon: {
    height: 20,
    width: 20,
  },
}));

interface Props {
  recipe: Recipes;
  weekorday: string;
  handlePut: (item: PutRecipe) => void;
}

export const SavedItem: React.FC<Props> = ({
  recipe,
  weekorday,
  handlePut,
}) => {
  const classes = useStyles();

  const item = { recipe: recipe, type: ItemTypes.SAVED };
  let { userid } = useParams();
  const [, drag] = useDrag<
    {
      recipe: Recipes;
      type: string;
    },
    PutRecipe,
    DragSourceMonitor
  >({
    item,
    end(item, monitor) {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        const recipeid = item.recipe.id;
        axios
          .put(`/api/userrecipe/${userid}/recipe/${recipeid}`, {
            weekday: weekorday,
          })
          .then(() => {
            item.recipe.weekday = weekorday;
            handlePut(item);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  });

  let history = useHistory();

  const handleRedirect = (recipe: Recipes): void => {
    history.push("/recipe", { recipe });
  };

  return (
    <Card ref={drag} className={classes.root}>
      <div className={classes.details}>
        <CardContent>
          <Typography variant="subtitle1">{recipe.label}</Typography>
        </CardContent>

        <div className={classes.controls}>
          <Tooltip title="Detail">
            <IconButton
              onClick={() => {
                handleRedirect(recipe);
              }}
            >
              <VisibilityIcon className={classes.icon} />
            </IconButton>
          </Tooltip>
          <Typography variant="subtitle2">{recipe.energies} kCal</Typography>
        </div>
      </div>
      {recipe ? (
        <CardMedia
          className={classes.cover}
          image={recipe.img_url}
          title="Live from space album cover"
        />
      ) : (
        <Skeleton variant="text" className={classes.cover} animation="wave" />
      )}
    </Card>
  );
};

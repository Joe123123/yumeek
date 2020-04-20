import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import Grid from "@material-ui/core/Grid";
import Dustbin from "./Dustbin";
import SavedList from "./SavedList";

import axios from "axios";

import Skeleton from "@material-ui/lab/Skeleton";

export default function RecipeList(props) {
  const [dayRecipleList, setDayRecipeList] = useState({
    day: "",
    recipeList: [],
  });

  useEffect(() => {
    if (props.recipeList) {
      setDayRecipeList((prev) => ({
        ...prev,
        recipeList: props.recipeList,
      }));
    }
  }, [props.recipeList]);

  useEffect(() => {
    if (props.day) {
      setDayRecipeList((prev) => ({
        ...prev,
        day: props.day["weekday"],
      }));
    }
  }, [props.day]);

  const deleteRecipe = (recipe) => {
    const newList = dayRecipleList.recipeList.filter(
      (el) => el.id !== recipe.id
    );
    setDayRecipeList((prev) => ({
      ...prev,
      recipeList: newList,
    }));

    axios
      .delete(`/api/recipe/${recipe.id}`, recipe)
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {props.recipeList ? (
        <DndProvider backend={Backend}>
          <Grid container spacing={6} direction="row" alignItems="center">
            <Grid item xs={5}>
              <SavedList
                allowedDropEffect="any"
                recipeList={dayRecipleList.recipeList.filter(
                  (el) => el["weekday"] === null
                )}
                weekorday={props.weekorday}
                handlePut={props.handlePut}
                deleteRecipe={deleteRecipe}
              ></SavedList>
            </Grid>
            <Grid item xs={5}>
              {props.weekorday === "week" ? (
                <div></div>
              ) : (
                <Dustbin
                  allowedDropEffect="any"
                  recipeList={dayRecipleList.recipeList.filter(
                    (el) => el["weekday"] !== null
                  )}
                  weekorday={props.weekorday}
                  handlePut={props.handlePut}
                  deleteRecipe={deleteRecipe}
                ></Dustbin>
              )}
            </Grid>
          </Grid>
        </DndProvider>
      ) : (
        <Skeleton variant="rect" width={1000} height={400} animation="wave" />
      )}
    </div>
  );
}

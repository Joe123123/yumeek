import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import Grid from "@material-ui/core/Grid";
import { AddedList } from "./AddedList";
import { SavedList } from "./SavedList";

import axios from "axios";

import Skeleton from "@material-ui/lab/Skeleton";
import { Recipes, PutRecipe } from "../interfaces/Recipe.interface";

interface Props {
  recipeList: Recipes[];
  weekorday: string;
  handlePut: (item: PutRecipe) => void;
}

export const RecipeList: React.FC<Props> = (props) => {
  const [dayRecipleList, setDayRecipeList] = useState<{
    day: string;
    recipeList: Recipes[];
  }>({
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
  }, [props]);

  useEffect(() => {
    if (props.weekorday) {
      setDayRecipeList((prev) => ({
        ...prev,
        day: props.weekorday,
      }));
    }
  }, [props]);

  return (
    <div>
      {props.recipeList ? (
        <DndProvider backend={Backend}>
          <Grid container spacing={6} direction="row" alignItems="center">
            <Grid item xs={5}>
              <SavedList
                recipeList={dayRecipleList.recipeList.filter(
                  (el) => el["weekday"] === null
                )}
                weekorday={props.weekorday}
                handlePut={props.handlePut}
              ></SavedList>
            </Grid>
            <Grid item xs={5}>
              {props.weekorday === "week" ? (
                <div></div>
              ) : (
                <AddedList
                  recipeList={dayRecipleList.recipeList.filter(
                    (el) => el["weekday"] !== null
                  )}
                  weekorday={props.weekorday}
                  handlePut={props.handlePut}
                ></AddedList>
              )}
            </Grid>
          </Grid>
        </DndProvider>
      ) : (
        <Skeleton variant="rect" width={1000} height={400} animation="wave" />
      )}
    </div>
  );
};

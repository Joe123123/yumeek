import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";

import { RecipesCard } from "./RecipesCard";
import { Recipes } from "../interfaces/Recipe.interface";

const useStyles = makeStyles((theme) => ({
  gridList: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
}));

interface Props {
  searchResultRecipes: Recipes[];
  handleAdd: (recipe: Recipes) => void;
  clickRecipe: (recipe: Recipes) => void;
  searchInfo: string[] | null;
}

export const RecipesCardsLists: React.FC<Props> = (props) => {
  const { searchResultRecipes, handleAdd, clickRecipe, searchInfo } = props;
  const classes = useStyles();

  return (
    <div>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">
            {searchResultRecipes &&
              `${searchResultRecipes.length} Recipes For You!  `}
            {searchInfo!.length !== 0 && `(${searchInfo!.join(" + ")})`}
          </ListSubheader>
        </GridListTile>
        {searchResultRecipes &&
          searchResultRecipes.map((recipe, index) => (
            <RecipesCard
              key={index}
              recipe={recipe}
              handleAdd={handleAdd}
              clickRecipe={clickRecipe}
            />
          ))}
      </GridList>
    </div>
  );
};

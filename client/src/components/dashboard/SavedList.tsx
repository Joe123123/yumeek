import React, { useEffect } from "react";
import ItemTypes from "./ItemTypes";
import { SavedItem } from "./SavedItem";
import { useDrop } from "react-dnd";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import { Recipes, PutRecipe } from "../interfaces/Recipe.interface";

const style = {
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "#191A32",
  padding: "1rem",
  fontSize: "1rem",
  lineHeight: "normal",
  width: "100%",
  minHeight: "400px",
  borderRadius: "10px",
};
function selectBackgroundColor(isActive: boolean, canDrop: boolean): string {
  if (isActive) {
    return "#F17E75";
  } else if (canDrop) {
    return "#F59E7A";
  } else {
    return "#DCF3F3";
  }
}

interface Props {
  recipeList: Recipes[];
  weekorday: string;
  handlePut: (item: PutRecipe) => void;
}

export const SavedList: React.FC<Props> = ({
  recipeList,
  weekorday,
  handlePut,
}) => {
  useEffect(() => {
    if (recipeList) {
      console.log(recipeList);
    }
  }, []);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.ADDED,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = canDrop && isOver;
  const backgroundColor = selectBackgroundColor(isActive, canDrop);
  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      <Typography variant="h5">{`Saved Recipes`}</Typography>
      <br />
      {recipeList ? (
        <Grid container spacing={1} direction="column">
          {recipeList.map((el) => {
            return (
              <Grid key={el.id} item xs={12}>
                <SavedItem
                  recipe={el}
                  weekorday={weekorday}
                  handlePut={handlePut}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Skeleton variant="rect" width={440} height={400} animation="wave" />
      )}
    </div>
  );
};

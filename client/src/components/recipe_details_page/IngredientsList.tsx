import React from "react";
import { Box, Typography, makeStyles, Container } from "@material-ui/core";

const defaultProps = {
  bgcolor: "fefef6",
  borderColor: "fefef6",
  margin: "6%",
  p: 2,
  border: 1,
  boxShadow: 1,
  width: 1 / 2,
};

const useStyles = makeStyles((theme) => ({
  box: {
    border: "#9a8e6e",
    borderRadius: "10px",
    width: "500px",
    marginLeft: "15%",
    [theme.breakpoints.down("md")]: {
      width: "380px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "280px",
    },
  },
  font: {
    fontSize: "1.2rem",
  },
}));

interface Props {
  ingredients: string[];
}

export const IngredientsList: React.FC<Props> = (props) => {
  const { ingredients } = props;
  const classes = useStyles();

  return (
    <Container component={Container}>
      <Typography
        variant="body1"
        style={{
          height: 50,
          width: "60%",
          fontSize: "2.3rem",
          marginLeft: "15%",
        }}
      >
        Ingredients
      </Typography>
      <Box {...defaultProps} className={classes.box}>
        {ingredients.map((ingredient, index) => (
          <p key={index} className={classes.font}>
            {ingredient}
          </p>
        ))}
      </Box>
    </Container>
  );
};

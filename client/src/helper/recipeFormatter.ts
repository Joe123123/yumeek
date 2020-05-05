import {
  FormattedRecipe,
  Recipes,
} from "../components/interfaces/Recipe.interface";

const recipeFormatter = (recipe: Recipes) => {
  const obj: FormattedRecipe = {
    recipe: {
      label: "",
      steps: null,
      img_url: "",
      src_url: "",
      health_labels: [],
      ingredients: [],
    },
    nutrients: {
      protein: 0,
      fiber: 0,
      carbs: 0,
      fat: 0,
      energies: 0,
    },
  };
  obj.recipe.label = recipe.label;
  obj.recipe.steps = recipe.steps;
  obj.recipe.img_url = recipe.img_url;
  obj.recipe.src_url = recipe.src_url;
  obj.recipe.health_labels = recipe.health_labels;
  obj.recipe.ingredients = recipe.ingredients;

  obj.nutrients.protein = recipe.protein;
  obj.nutrients.fiber = recipe.fiber;
  obj.nutrients.carbs = recipe.carbs;
  obj.nutrients.fat = recipe.fat;
  obj.nutrients.energies = recipe.energies;

  return obj;
};

export default recipeFormatter;

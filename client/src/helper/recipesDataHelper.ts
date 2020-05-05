import { Recipes } from "../components/interfaces/Recipe.interface";

export default (response: any) => {
  const recipesArr = response.data.hits;
  const res: Recipes[] = [];
  for (let item of recipesArr) {
    const recipeObj = {
      id: null,
      steps: null,
      weekday: null,
      label: item.recipe.label,
      img_url: item.recipe.image,
      src_url: item.recipe.url,
      health_labels: item.recipe.healthLabels,
      ingredients: item.recipe.ingredientLines,
      protein: Math.round(item.recipe.totalNutrients.PROCNT.quantity * 1000), // unit mg
      fiber: Math.round(item.recipe.totalNutrients.FIBTG.quantity * 1000), // unit mg
      carbs: Math.round(item.recipe.totalNutrients.CHOCDF.quantity * 1000), // unit mg
      fat: Math.round(item.recipe.totalNutrients.FAT.quantity * 1000), // unit mg
      energies: Math.round(item.recipe.totalNutrients.ENERC_KCAL.quantity), // unit kcal
    };

    res.push(recipeObj);
  }
  return res;
};

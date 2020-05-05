import { Recipes } from "../components/interfaces/Recipe.interface";

export default (savedRecipes: Recipes[], newRecipe: Recipes) => {
  const uniqueURL = newRecipe.src_url;
  const duplicateRecipe = savedRecipes.find(
    (recipe) => recipe.src_url === uniqueURL
  );
  let res: Recipes[] = [];
  if (duplicateRecipe) {
    res = savedRecipes.filter((recipe) => recipe.src_url !== uniqueURL);
    res.unshift(duplicateRecipe);
  }
  return res;
};

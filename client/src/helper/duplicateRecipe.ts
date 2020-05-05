import { Recipes } from "../components/interfaces/Recipe.interface";

export default (savedRecipes: Recipes[], newRecipe: Recipes): boolean => {
  const uniqueURL = newRecipe.src_url;
  for (let recipe of savedRecipes) {
    if (recipe.src_url === uniqueURL) {
      return true;
    }
  }
  return false;
};

import { Recipes } from "../components/interfaces/Recipe.interface";

export default (savedRecipes: Recipes[], src: string, label: string) => {
  const recipes: Recipes[] = savedRecipes.filter(
    (item) => item.src_url === src && item.label === label
  );
  return recipes;
};

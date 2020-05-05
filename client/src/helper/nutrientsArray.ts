import { Recipes } from "../components/interfaces/Recipe.interface";

interface Nutrient {
  name: string;
  value: number;
  maxValue: number;
}

export default (recipe: Recipes): Nutrient[] => {
  const array = [
    { name: "Calories", value: recipe.energies, maxValue: 2400 },
    { name: "Protein", value: recipe.protein, maxValue: 51 },
    { name: "Fiber", value: recipe.fiber, maxValue: 25 },
    { name: "Carbs", value: recipe.carbs, maxValue: 300 },
    { name: "Fat", value: recipe.fat, maxValue: 65 },
  ];
  return array;
};

export interface Recipes {
  id: number | null;
  carbs: number;
  energies: number;
  fat: number;
  fiber: number;
  health_labels: string[];
  img_url: string;
  ingredients: string[];
  label: string;
  protein: number;
  src_url: string;
  steps: string | null;
  weekday: string | null;
}

export interface FormattedRecipe {
  recipe: {
    health_labels: string[];
    img_url: string;
    ingredients: string[];
    label: string;
    src_url: string;
    steps: string | null;
  };
  nutrients: {
    carbs: number;
    energies: number;
    fat: number;
    fiber: number;
    protein: number;
  };
}

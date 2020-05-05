export default interface Recipes {
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

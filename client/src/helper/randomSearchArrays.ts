export const keyeordList = [
  "apple",
  "lemon",
  "orange",
  "strawberry",
  "peach",
  "papaya",
  "pepper",
  "carrot",
  "paste",
  "french fries",
  "pancakes",
  "burger",
];

export const mealTypeList = ["breakfast", "lunch", "dinner", "snack"];

export const healthLabelList = [
  "vegetarian",
  "vegan",
  "alcohol-free",
  "tree-nut-free",
  "peanut-free",
  "sugar-conscious",
];

export const random = (arr: string[]): string => {
  return arr[Math.floor(Math.random() * arr.length)];
};

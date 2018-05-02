import { RecipeDisplayType } from './recipe-display-type.type';

export class RecipeIngredient {
  ingredientID: number;
  recipeID: string;
  ingredientName: string;
  quantity: number;
  displayQuantity: string;
  unitOfMeasure: string;
  displayType: RecipeDisplayType;
  notes: string;
  sortOrder: number;

  constructor() { }
}

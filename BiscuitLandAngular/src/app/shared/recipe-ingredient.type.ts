import { RecipeDisplayType } from './recipe-display-type.type';

export class RecipeIngredient {
  IngredientID: number;
  RecipeID: string;
  IngredientName: string;
  Quantity: number;
  DisplayQuantity: string;
  UnitOfMeasure: string;
  DisplayType: RecipeDisplayType;
  Notes: string;
  SortOrder: number;

  constructor() { }
}

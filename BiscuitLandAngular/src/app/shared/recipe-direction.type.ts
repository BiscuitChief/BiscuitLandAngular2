import { RecipeDisplayType } from './recipe-display-type.type';

export class RecipeDirection {
  directionID: number;
  recipeID: string;
  sortOrder: number;
  directionText: string;
  displayType: RecipeDisplayType;

  constructor() { }
}

import { RecipeDisplayType } from './recipe-display-type.type';

export class RecipeDirection {
  DirectionID: number;
  RecipeID: string;
  SortOrder: number;
  DirectionText: string;
  DisplayType: RecipeDisplayType;

  constructor() { }
}

import { RecipeIngredient } from './recipe-ingredient.type';
import { RecipeImage } from './recipe-image.type';
import { RecipeDirection } from './recipe-direction.type';
import { RecipeCategory } from './recipe-category.type';

export class Recipe {
  RecipeID: string;
  Title: string;
  Description: string;
  Quantity: number;
  IngredientList: RecipeIngredient[];
  DirectionList: RecipeDirection[];
  CategoryList: RecipeCategory[];
  ImageList: RecipeImage[];

  constructor() { }
}

import { RecipeIngredient } from './recipe-ingredient.type';
import { RecipeImage } from './recipe-image.type';
import { RecipeDirection } from './recipe-direction.type';
import { RecipeCategory } from './recipe-category.type';

export class Recipe {
  recipeID: string;
  title: string;
  description: string;
  quantity: number;
  ingredientList: RecipeIngredient[];
  directionList: RecipeDirection[];
  categoryList: RecipeCategory[];
  imageList: RecipeImage[];

  constructor() { }
}

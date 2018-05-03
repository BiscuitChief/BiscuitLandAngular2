import { RecipeCategory } from './recipe-category.type';
import { Recipe } from './recipe.type';

export class RecipeSearch {
  SearchText: string = '';
  SearchIngredientList: string[];
  SearchCategoryList: RecipeCategory[];
  SearchResults: Recipe[];
  SearchResultText: string;
  PageSize: number;
  PageNumber: number;
  PageCount: number;

  constructor() { }
}

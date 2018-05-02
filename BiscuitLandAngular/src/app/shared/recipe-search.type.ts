import { RecipeCategory } from './recipe-category.type';
import { Recipe } from './recipe.type';

export class RecipeSearch {
  searchText: string;
  searchIngredientList: string[];
  searchCategoryList: RecipeCategory[];
  searchResults: Recipe[];
  searchResultText: string;
  pageSize: number;
  pageNumber: number;
  pageCount: number;

  constructor() { }
}

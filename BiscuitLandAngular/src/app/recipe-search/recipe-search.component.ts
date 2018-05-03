import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RecipeService } from '../services/recipe.service';

import { RecipeSearch } from '../shared/recipe-search.type';


@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss']
})
export class RecipeSearchComponent implements OnInit {

  recipeSearch: RecipeSearch = new RecipeSearch();
  errMsg: string;
  return: string = '';
  canEdit: boolean = false;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.recipeService.canUserEditRecipes()
      .subscribe(data => this.canEdit = data,
      errMsg => this.errMsg = <any>errMsg);

    this.recipeService.getAllCategories()
      .subscribe(data => this.recipeSearch.SearchCategoryList = data,
      errMsg => this.errMsg = <any>errMsg);
  }

  SearchRecipes() {
    this.recipeService.search(this.recipeSearch)
      .subscribe(data => this.ProcessResults(data),
      errMsg => this.errMsg = <any>errMsg);
  }

  private ProcessResults(data: RecipeSearch) {
    this.recipeSearch = data;
  }

}

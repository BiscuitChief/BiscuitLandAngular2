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
  pageList: number[];

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
    this.recipeSearch.PageNumber = 1;
    this.GetRecipes();
  }

  SelectPage(pageNum: number) {
    this.recipeSearch.PageNumber = pageNum;
    this.GetRecipes();
  }

  private GetRecipes() {
    this.recipeService.search(this.recipeSearch)
      .subscribe(data => this.ProcessResults(data),
      errMsg => this.errMsg = <any>errMsg);
  }

  private ProcessResults(data: RecipeSearch) {
    this.recipeSearch = data;
    this.SetupPages();
  }

  private SetupPages() {
    this.pageList = [];

    var pagerStart: number;
    var pagerEnd: number;
    var pageSpread: number = 2;
    var pagesRight: number = 0;
    var pagesLeft: number = 0;

    pagerStart = 0;
    pagesRight = this.recipeSearch.PageCount - this.recipeSearch.PageNumber;
    pagesLeft = pageSpread;
    if (pagesRight < pageSpread) {
      pagesLeft = pagesLeft + pageSpread - pagesRight;
    }
    pagerStart = this.recipeSearch.PageNumber - pagesLeft;
    if (pagerStart <= 0) {
      pagerStart = 1;
    }

    pagerEnd = 0;
    pagesRight = pageSpread;
    pagesLeft = this.recipeSearch.PageNumber - 1;
    if (pagesLeft < pageSpread) {
      pagesRight = pagesRight + pageSpread - pagesLeft;
    }
    pagerEnd = this.recipeSearch.PageNumber + pagesRight;
    if (pagerEnd > this.recipeSearch.PageCount) {
      pagerEnd = this.recipeSearch.PageCount;
    }

    var i: number;
    for (i = pagerStart; i <= pagerEnd; i++) {
      this.pageList.push(i);
    }
  }
}

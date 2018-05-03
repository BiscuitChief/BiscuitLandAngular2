import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ServiceHelper } from '../shared/servicehelper';

import { Recipe } from '../shared/recipe.type';
import { RecipeSearch } from '../shared/recipe-search.type';
import { RecipeCategory } from '../shared/recipe-category.type';

@Injectable()
export class RecipeService {

  constructor(private http: HttpClient) { }

  canUserEditRecipes(): Observable<boolean> {
    return this.http
      .get(ServiceHelper.API_URL + 'api/recipes/canedit')
      .map(rsp => rsp as boolean)
      .catch(ServiceHelper.handleError);
  }

  getAllCategories(): Observable<RecipeCategory[]> {
    return this.http
      .get(ServiceHelper.API_URL + 'api/recipes/categories')
      .map(rsp => rsp as RecipeCategory[])
      .catch(ServiceHelper.handleError);
  }

  search(recipeSearch: RecipeSearch): Observable<RecipeSearch> {
    return this.http
      .post(ServiceHelper.API_URL + 'api/recipes/search', recipeSearch, ServiceHelper.httpOptions)
      .map(rsp => rsp as RecipeSearch)
      .catch(ServiceHelper.handleError);
  }
}

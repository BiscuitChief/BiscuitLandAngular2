import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

import { RecipeService } from '../services/recipe.service';

import { Recipe } from '../shared/recipe.type';
import { Path_Thumbnail, Path_Standard } from '../shared/recipe-image.type';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  recipe: Recipe = new Recipe();
  canEdit: boolean = false;
  errMsg: string;
  pathThumbnail: string = Path_Thumbnail;
  pathStandard: string = Path_Standard;

  constructor(private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadRecipe();
  }

  loadRecipe() {
    this.recipeService.canUserEditRecipes()
      .subscribe(data => this.canEdit = data,
      errMsg => this.errMsg = <any>errMsg);

    var recipeId = this.activatedRoute.snapshot.params['recipeid'] as string

    this.recipeService.getRecipe(recipeId)
      .subscribe(data => this.recipe = data,
      errMsg => this.errMsg = <any>errMsg);
  }

  updateQuantity() {
    this.recipeService.getRecipe(this.recipe.RecipeID, this.recipe.Quantity)
      .subscribe(data => this.recipe = data,
      errMsg => this.errMsg = <any>errMsg);
 }

  ShowImage(index: number) {
  }

}

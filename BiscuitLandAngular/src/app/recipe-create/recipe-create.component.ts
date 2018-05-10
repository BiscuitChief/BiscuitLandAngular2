import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { RecipeService } from '../services/recipe.service';

import { Recipe } from '../shared/recipe.type';
import { RecipeImage, Path_Thumbnail, Path_Standard, Path_TempStandard, Path_TempThumbnail } from '../shared/recipe-image.type';
import { RecipeDirection } from '../shared/recipe-direction.type';
import { RecipeIngredient } from '../shared/recipe-ingredient.type';
import { RecipeCategory } from '../shared/recipe-category.type';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss']
})
export class RecipeCreateComponent implements OnInit {

  recipe: Recipe = new Recipe();
  errMsg: string;
  pathThumbnail: string = Path_Thumbnail;
  pathStandard: string = Path_Standard;
  pathTempThumbnail: string = Path_TempThumbnail;
  pathTempStandard: string = Path_TempStandard;
  currentImageIndex: number = -1;
  pageHeading: string = "";

  constructor(private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.setupForm();
  }

  private setupForm() {
    var recipeId = this.activatedRoute.snapshot.params['recipeid'] as string

    if (recipeId) {
      this.pageHeading = "Edit Recipe";
      this.recipeService.getRecipe(recipeId)
        .subscribe(data => this.LoadRecipeData(data),
        errMsg => this.errMsg = <any>errMsg);
    } else {
      this.pageHeading = "New Recipe";
    }
  }

  private LoadRecipeData(rcp: Recipe) {
    this.recipe = rcp;

    this.recipeService.getAllCategories()
      .subscribe(data => this.SetupCategories(data),
      errMsg => this.errMsg = <any>errMsg);
  }

  private SetupCategories(catlist: RecipeCategory[]) {
    for (let cat of catlist.filter(x => this.recipe.CategoryList.filter(y => y.CategoryCode === x.CategoryCode).length > 0)) {
      cat.IsSelected = true;
    }
    this.recipe.CategoryList = catlist;
  }

  ShowImage(index: number, content) {
    this.ChangeImage(index);
    this.modalService.open(content, { size: 'lg', centered: true, });
  }

  ChangeImage(index) {
    if (index > this.recipe.ImageList.length - 1) {
      index = 0;
    }
    this.currentImageIndex = index;
  }

  Ingredient_AddNew() {
  }

  Image_MovePrevious(index: number) {
  }

  Image_Delete(index: number) {
  }

  Image_MoveNext(index: number) {
  }

}

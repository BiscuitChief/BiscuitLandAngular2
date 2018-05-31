import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

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

  public recipeForm: FormGroup;

  recipe: Recipe = new Recipe();
  categoryList: RecipeCategory[];
  errMsg: string;
  pathThumbnail: string = Path_Thumbnail;
  pathStandard: string = Path_Standard;
  pathTempThumbnail: string = Path_TempThumbnail;
  pathTempStandard: string = Path_TempStandard;
  currentImageIndex: number = -1;
  pageHeading: string = "";

  constructor(private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private _fb: FormBuilder) { }

  ngOnInit() {
    this.setupForm();
  }

  private setupForm() {

    this.recipeForm = this._fb.group({
      Title: ['', [Validators.required, Validators.minLength(5)]],
      Description: ['', [Validators.required, Validators.minLength(5)]],
      IngredientList: this._fb.array([this.GetIngredientForm()]),
      DirectionList: this._fb.array([this.GetDirectionForm()])
    });

    this.recipeService.getAllCategories()
      .subscribe(data => this.LoadFormData(data),
      errMsg => this.errMsg = <any>errMsg);
  }

  private LoadFormData(catlist: RecipeCategory[]) {
    this.categoryList = catlist;
    this.recipe.CategoryList = catlist;

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
    this.SetupCategories(this.categoryList);

    while (this.recipeForm.controls['IngredientList']['controls'].length < this.recipe.IngredientList.length) {
      (<FormArray>this.recipeForm.controls['IngredientList']).push(this.GetIngredientForm());
    }

    while (this.recipeForm.controls['DirectionList']['controls'].length < this.recipe.DirectionList.length) {
      (<FormArray>this.recipeForm.controls['DirectionList']).push(this.GetDirectionForm());
    }

    this.recipeForm.patchValue(this.recipe);
  }

  CategoryChange(catcode: string, isselected: boolean) {
    this.recipe.CategoryList.find(y => y.CategoryCode === catcode).IsSelected = isselected;
  }

  private GetIngredientForm() {
    return this._fb.group({
      IngredientID: [''],
      IngredientName: ['', [Validators.required]],
      DisplayQuantity: ['', [Validators.required]],
      UnitOfMeasure: [''],
      DisplayType: ['', [Validators.required]],
      Notes: ['']
    })
  }

  private GetDirectionForm() {
    return this._fb.group({
      DirectionID: [''],
      DirectionText: ['', [Validators.required, Validators.minLength(5)]],
      DisplayType: ['', [Validators.required]]
    })
  }

  //private AddCategoryForm(cat: RecipeCategory) {
  //  return this._fb.group({
  //    CategoryName: ["test label"],
  //    CategoryCode: ["TEST"],
  //    IsSelected: [false]
  //  })
  //}

  //private SetupCategoryForm(catlist: RecipeCategory[]) {
  //  for (let cat of this.categoryList) {
  //    (<FormArray>this.recipeForm.controls['CategoryList']).push(
  //      this._fb.group({
  //        CategoryName: [cat.CategoryName],
  //        CategoryCode: [cat.CategoryCode],
  //        IsSelected: [cat.IsSelected]
  //      })
  //    );
  //  }
  //}

  SubmitForm() {
  }

  SaveRecipe(rcp: Recipe) {
  }

  CancelRecipe() {
    if (this.recipe.RecipeID) {
      this.router.navigateByUrl("/recipes/recipe/" + this.recipe.RecipeID);
    } else {
      this.router.navigateByUrl("/recipes/search");
    }
  }

  private SetupCategories(catlist: RecipeCategory[]) {
    for (let cat of catlist.filter(x => this.recipe.CategoryList.filter(y => y.CategoryCode === x.CategoryCode).length > 0)) {
      cat.IsSelected = true;
    }
    this.recipe.CategoryList = catlist;
  }

  ChangeImage(index) {
    if (index > this.recipe.ImageList.length - 1) {
      index = 0;
    }
    this.currentImageIndex = index;
  }

  Ingredient_AddNew() {
    (<FormArray>this.recipeForm.controls['IngredientList']).push(this.GetIngredientForm());
  }

  Ingredient_MovePrevious(index: number) {
    if (index > 0) {
      let tempitem = this.recipeForm.controls['IngredientList']['controls'][index - 1];
      this.recipeForm.controls['IngredientList']['controls'][index - 1] = this.recipeForm.controls['IngredientList']['controls'][index];
      this.recipeForm.controls['IngredientList']['controls'][index] = tempitem;
    }
  }

  Ingredient_MoveNext(index: number) {
    if (index < this.recipeForm.controls['IngredientList']['controls'].length - 1) {
      let tempitem = this.recipeForm.controls['IngredientList']['controls'][index + 1];
      this.recipeForm.controls['IngredientList']['controls'][index + 1] = this.recipeForm.controls['IngredientList']['controls'][index];
      this.recipeForm.controls['IngredientList']['controls'][index] = tempitem;
    }
  }

  Ingredient_Delete(index: number) {
    this.recipeForm.controls['IngredientList']['controls'].splice(index, 1);
  }

  Direction_AddNew() {
    (<FormArray>this.recipeForm.controls['DirectionList']).push(this.GetDirectionForm());
  }

  Direction_MovePrevious(index: number) {
    if (index > 0) {
      let tempitem = this.recipeForm.controls['DirectionList']['controls'][index - 1];
      this.recipeForm.controls['DirectionList']['controls'][index - 1] = this.recipeForm.controls['DirectionList']['controls'][index];
      this.recipeForm.controls['DirectionList']['controls'][index] = tempitem;
    }
  }

  Direction_MoveNext(index: number) {
    if (index < this.recipeForm.controls['DirectionList']['controls'].length - 1) {
      let tempitem = this.recipeForm.controls['DirectionList']['controls'][index + 1];
      this.recipeForm.controls['DirectionList']['controls'][index + 1] = this.recipeForm.controls['DirectionList']['controls'][index];
      this.recipeForm.controls['DirectionList']['controls'][index] = tempitem;
    }
  }

  Direction_Delete(index: number) {
    this.recipeForm.controls['DirectionList']['controls'].splice(index, 1);
  }

  ShowImage(index: number, content) {
    this.ChangeImage(index);
    this.modalService.open(content, { size: 'lg', centered: true, });
  }

  Image_MovePrevious(index: number) {
    if (index > 0) {
      let tempimg: RecipeImage = this.recipe.ImageList[index - 1];
      this.recipe.ImageList[index - 1] = this.recipe.ImageList[index];
      this.recipe.ImageList[index] = tempimg;
    }
  }

  Image_MoveNext(index: number) {
    if (index < this.recipe.ImageList.length - 1) {
      let tempimg: RecipeImage = this.recipe.ImageList[index + 1];
      this.recipe.ImageList[index + 1] = this.recipe.ImageList[index];
      this.recipe.ImageList[index] = tempimg;
    }
 }

  Image_Delete(index: number) {
    this.recipe.ImageList.splice(index, 1);
    //ajax call here to remove any temp images
  }

}

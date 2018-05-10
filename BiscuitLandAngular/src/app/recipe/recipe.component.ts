import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { RecipeService } from '../services/recipe.service';

import { Recipe } from '../shared/recipe.type';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  recipe: Recipe = new Recipe();
  canEdit: boolean = false;
  errMsg: string;
  currentImageIndex: number = -1;

  constructor(private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal) { }

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

  //open(content) {
  //  this.modalService.open(content).result.then((result) => {
  //    this.closeResult = `Closed with: ${result}`;
  //  }, (reason) => {
  //    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //  });
  //}

  //private getDismissReason(reason: any): string {
  //  if (reason === ModalDismissReasons.ESC) {
  //    return 'by pressing ESC';
  //  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //    return 'by clicking on a backdrop';
  //  } else {
  //    return `with: ${reason}`;
  //  }
  //}
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cocktail } from '../../shared/cocktail.model';
import { CocktailService } from '../../shared/cocktail.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { amountValidator } from '../../validate-amount.directive';
import { imgUrlValidator } from '../../validate-imgUrl.directive';

@Component({
  selector: 'app-new-cocktail',
  templateUrl: './new-cocktail.component.html',
  styleUrls: ['./new-cocktail.component.css']
})
export class NewCocktailComponent implements OnInit, OnDestroy {
  cocktailForm!: FormGroup;
  cocktailUploadingSubscription!: Subscription;
  isUploading = false;

  constructor(private cocktailService: CocktailService, private router: Router) {
  }

  ngOnInit(): void {
    this.cocktailForm = new FormGroup({
      name: new FormControl('', Validators.required),
      imageUrl: new FormControl('', [Validators.required, imgUrlValidator]),
      type: new FormControl('', Validators.required),
      description: new FormControl(''),
      ingredients: new FormArray([], Validators.required),
      instructions: new FormControl('', Validators.required),
    });
    this.cocktailUploadingSubscription = this.cocktailService.cocktailUploading.subscribe(isUploading => {
      this.isUploading = isUploading;
    });
  }

  onSave() {
    const id = Math.random().toString();
    const cocktail = new Cocktail(id, this.cocktailForm.value.name,
      this.cocktailForm.value.imageUrl,
      this.cocktailForm.value.type,
      this.cocktailForm.value.description,
      this.cocktailForm.value.ingredients,
      this.cocktailForm.value.instructions);
    this.cocktailService.addCocktail(cocktail).subscribe(() => {
      this.cocktailService.fetchCocktails();
      void this.router.navigate(['']);
    });
  }

  getIngControls() {
    const ingredients = <FormArray>this.cocktailForm.get('ingredients');
    return ingredients.controls;
  }

  addIngredient() {
    const ingredients = <FormArray>this.cocktailForm.get('ingredients');
    const ingredient = new FormGroup({
      ingName: new FormControl('', Validators.required),
      ingAmount: new FormControl('', [Validators.required, amountValidator]),
      ingUnit: new FormControl('', Validators.required),
    });
    ingredients.push(ingredient);
  }

  removeIngredient(index: number) {
    const ingredients = <FormArray>this.cocktailForm.get('ingredients');
    ingredients.removeAt(index);
  }

  fieldHasError(fieldName: string, errorType: string, index?: number) {
    if (fieldName === 'ingName' || fieldName === 'ingAmount' || fieldName === 'ingUnit') {
      if (!index) {
        index = 0;
      }
      const ingredients = <FormArray>this.cocktailForm.get('ingredients');
      const field = ingredients.controls[index].get(fieldName);
      return field && field.touched && field.errors?.[errorType];
    }
    const field = this.cocktailForm.get(fieldName);
    return field && field.touched && field.errors?.[errorType];
  }

  ngOnDestroy(): void {
    this.cocktailUploadingSubscription.unsubscribe();
  }

}

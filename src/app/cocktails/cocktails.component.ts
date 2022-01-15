import { Component, OnDestroy, OnInit } from '@angular/core';
import { CocktailService } from '../shared/cocktail.service';
import { Subscription } from 'rxjs';
import { Cocktail } from '../shared/cocktail.model';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.css']
})
export class CocktailsComponent implements OnInit, OnDestroy {
  cocktails: Cocktail[] | undefined = undefined;
  cocktailsChangeSubscription!: Subscription;
  cocktailsFetchingSubscription!: Subscription;
  isFetching = false;

  constructor(private cocktailService: CocktailService) {
  }

  ngOnInit(): void {
    this.cocktailsChangeSubscription = this.cocktailService.cocktailsChange.subscribe(cocktails => {
      this.cocktails = cocktails;
    });
    this.cocktailsFetchingSubscription = this.cocktailService.cocktailsFetching.subscribe(isFetching => {
      this.isFetching = isFetching;
    });
    this.cocktailService.fetchCocktails();
  }

  ngOnDestroy(): void {
    this.cocktailsChangeSubscription.unsubscribe();
    this.cocktailsFetchingSubscription.unsubscribe();
  }

}

import { Injectable } from '@angular/core';
import { Cocktail } from './cocktail.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CocktailService {
  cocktails: Cocktail[] = [];
  cocktailsChange = new Subject<Cocktail[]>();
  cocktailsFetching = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  fetchCocktails() {
    this.cocktailsFetching.next(true);
    this.http.get<{ [id: string]: Cocktail }>('https://skosumbaeva2502-default-rtdb.firebaseio.com/cocktails.json').pipe(
      map(result => {
        return Object.keys(result).map(id => {
          const cocktail = result[id];
          return new Cocktail(id, cocktail.name, cocktail.imageUrl, cocktail.type, cocktail.description, cocktail.ingredients, cocktail.instructions);
        })
      })
    ).subscribe(cocktails => {
      this.cocktails = cocktails;
      this.cocktailsChange.next(this.cocktails);
      this.cocktailsFetching.next(false);
    }, () => {
      this.cocktailsFetching.next(false);
    });
  }
}

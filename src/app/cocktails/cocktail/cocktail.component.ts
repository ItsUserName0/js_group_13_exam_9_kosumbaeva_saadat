import { Component, Input } from '@angular/core';
import { Cocktail } from '../../shared/cocktail.model';

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.css']
})
export class CocktailComponent {
  @Input() cocktail!: Cocktail;

  typeHandler() {
    const type = this.cocktail.type.split('-').join(' ');
    return type[0].toUpperCase() + type.slice(1);
  }

}

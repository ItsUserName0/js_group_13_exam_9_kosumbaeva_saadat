import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cocktail } from '../../shared/cocktail.model';

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.css']
})
export class CocktailDetailsComponent {
  @Input() cocktail!: Cocktail;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  typeHandler() {
    const type = this.cocktail.type.split('-').join(' ');
    return type[0].toUpperCase() + type.slice(1);
  }

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocktailsComponent } from './cocktails/cocktails.component';
import { NewCocktailComponent } from './cocktails/new-cocktail/new-cocktail.component';

const routes: Routes = [
  {path: '', component: CocktailsComponent},
  {path: 'cocktails/new', component: NewCocktailComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

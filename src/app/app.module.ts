import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CocktailsComponent } from './cocktails/cocktails.component';
import { CocktailComponent } from './cocktails/cocktail/cocktail.component';
import { CocktailDetailsComponent } from './cocktails/cocktail-details/cocktail-details.component';
import { NewCocktailComponent } from './cocktails/new-cocktail/new-cocktail.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    CocktailsComponent,
    CocktailComponent,
    CocktailDetailsComponent,
    NewCocktailComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

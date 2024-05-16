import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokedleComponent} from "./pokedle/pokedle.component";
import {PokedexComponent} from "./pokedex/pokedex.component";
import {MostSearchComponent} from "./most-search/most-search.component";

const routes: Routes = [
  { path: '', component: PokedleComponent },
  { path: 'pokedex', component: PokedexComponent },
  { path: 'mostSearch', component: MostSearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

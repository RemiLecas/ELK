import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokedleComponent} from "./pokedle/pokedle.component";
import {PokedexComponent} from "./pokedex/pokedex.component";

const routes: Routes = [
  { path: 'pokedle', component: PokedleComponent },
  { path: 'pokedex', component: PokedexComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

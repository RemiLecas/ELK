import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApmErrorHandler, ApmModule, ApmService} from "@elastic/apm-rum-angular";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokedleComponent } from './pokedle/pokedle.component';
import {PokemonService} from "./service/pokemon.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PokedexComponent,
    PokedleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApmModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ApmErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

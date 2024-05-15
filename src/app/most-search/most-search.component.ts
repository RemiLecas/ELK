import {Component, OnInit} from '@angular/core';
import {PokemonService} from "../service/pokemon.service";
import {IPokemon} from "../interface/IPokemon.interface";

@Component({
  selector: 'app-most-search',
  templateUrl: './most-search.component.html',
  styleUrls: ['./most-search.component.scss']
})
export class MostSearchComponent implements OnInit {
  mostSerch: any;

  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.pokemonService.getMostSearchedPokemon().subscribe((data: any) => {
      this.mostSerch = data;
    });
  }
}

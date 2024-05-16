import {Component, OnInit} from '@angular/core';
import {PokemonService} from "../service/pokemon.service";
import {IPokemon} from "../interface/IPokemon.interface";

@Component({
  selector: 'app-most-search',
  templateUrl: './most-search.component.html',
  styleUrls: ['./most-search.component.scss']
})
export class MostSearchComponent implements OnInit {
  mostSerch: any[] = [];

  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.pokemonService.getMostSearchedPokemon().subscribe((mostSearched: any) => {
      this.mostSerch = mostSearched;
      this.getImage();
    });

  }

  getImage(){
    this.mostSerch.forEach((pokemon: any) => {
      this.pokemonService.findImage(pokemon.key.toLowerCase()).subscribe(
        (image: any) => {
          pokemon.imageUrl = image.sprites.front_default;
          this.mostSerch.push(pokemon);
        });
    })
  }
}

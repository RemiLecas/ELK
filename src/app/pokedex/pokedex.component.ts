import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IPokemon, IPokemonNew} from "../interface/IPokemon.interface";
import {HttpClient} from "@angular/common/http";
import {PokemonService} from "../service/pokemon.service";

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  allPokemon: any;
  filteredPokemon: IPokemon[] = [];
  currentPage: number = 1;
  pageSize: number = 20;
  totalPokemons: number = 0;
  selectedPokemon: IPokemon[] = [];
  pokemonOnCurrentPage: IPokemon[] = [];
  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private pokemonService: PokemonService) {
  }

  async ngOnInit() {
    this.form = this.formBuilder.group({
      pokemonName: ['', [Validators.required]]
    });
    await this.getAllPokemon();

  }

  async onSubmit() {
    if (this.form.invalid) {
      return;
    } else {
      this.onSearchPokemon()
    }
  }

  onSearchPokemon() {
    const pokemonName = this.form.value.pokemonName;
    this.pokemonService.getFuzzyPokemon(pokemonName)
      .subscribe((pokemonData: any) => {
        pokemonData.forEach((data: IPokemon) => {
          this.pokemonService.findImage(data.Name).subscribe((image: any) => {
            data.imageUrl = image.sprites.front_default;
            this.selectedPokemon.push(data);
          });
        });
      });
  }

  async getAllPokemon() {
    this.pokemonService.getPokemonsPagi()
      .subscribe((pokemonData: any) => {
        console.log('pokemonData', pokemonData)
        this.allPokemon = pokemonData;
        this.getPokemonImage(this.allPokemon[1]);
      });

  }

  async onNextPage() {
    this.currentPage++;
    this.pokemonOnCurrentPage = [];
    this.getPokemonImage(this.allPokemon[this.currentPage]);
  }

  async onPrevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pokemonOnCurrentPage = [];
      this.getPokemonImage(this.allPokemon[this.currentPage]);
    }
  }

  getPokemonImage(pokemons: []){
    pokemons.forEach((data: IPokemon) => {
      this.pokemonService.findImage(data.Name).subscribe((image: any) => {
        data.imageUrl = image.sprites.front_default;
        this.pokemonOnCurrentPage.push(data);
      });
    });
  }
}

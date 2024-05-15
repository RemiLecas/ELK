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
  currentPage: number = 1;
  selectedPokemon: IPokemon[] = [];
  pokemonOnCurrentPage: IPokemon[] = [];
  isLoading: boolean = true;
  constructor(private formBuilder: FormBuilder,
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
    const name = pokemonName.charAt(0).toUpperCase() + pokemonName.substring(1);
    this.selectedPokemon = [];
    this.pokemonService.getFuzzyPokemon(name)
      .subscribe((pokemonData: any) => {
        pokemonData.forEach((data: IPokemon) => {
          this.pokemonService.findImage(data.Name).subscribe((image: any) => {
            this.selectedPokemon.push(data);
          }, (error) => {
            data.imageUrl = '';
            this.selectedPokemon.push(data);
          });
        });
      });
  }

  async getAllPokemon() {
    this.pokemonService.getPokemonsPagi()
      .subscribe((pokemonData: any) => {
        this.isLoading = true;
        this.allPokemon = pokemonData;
        this.getPokemonImage(this.allPokemon[1]);
        this.isLoading = false;
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

  return() {
    this.selectedPokemon = [];
  }
}

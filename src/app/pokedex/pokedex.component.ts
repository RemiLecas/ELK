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
  isShowdown: boolean = false;
  currentGeneration: string = '';
  size: number = 20;
  page: number = 1;

  constructor(private formBuilder: FormBuilder,
              private pokemonService: PokemonService) {
  }

  async ngOnInit() {

    this.form = this.formBuilder.group({
      pokemonName: ['', [Validators.required]]
    });
    await this.getAllPokemon(1);
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
            data.imageUrl = image?.sprites?.front_default || ''; // If imageUrl doesn't exist, imageUrl = to empty string
            this.selectedPokemon.push(data);
          }, (error) => {
            console.error('Error fetching image:', error);
            data.imageUrl = ''; // If error, imageUrl = to empty string
            this.selectedPokemon.push(data);
          });
        });
      });
  }

  async getAllPokemon(page: number) {
    this.pokemonService.getPokemonsPagi(page, this.size)
      .subscribe((pokemonData: any) => {
        console.log('pokemonData', pokemonData)
        this.allPokemon = pokemonData;
        this.getPokemonImage(this.allPokemon);
      });

  }

  async onNextPage() {
    this.currentPage++;
    this.pokemonOnCurrentPage = [];
    await this.getAllPokemon(this.currentPage);
  }

  async onPrevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pokemonOnCurrentPage = [];
      await this.getAllPokemon(this.currentPage);
    }
  }

  getPokemonImage(pokemons: []) {
    console.log('pokemons', pokemons)
    pokemons.forEach((data: IPokemon) => {
      this.pokemonService.findImage(data.Name).subscribe((image: any) => {
        data.imageUrl = image.sprites.front_default;
        data.animated = image.sprites.other.showdown.front_default
        data.imageGen1 = image.sprites.versions['generation-i'].yellow.front_default;
        data.imageGen2 = image.sprites.versions['generation-ii'].crystal.front_default;
        data.imageGen3 = image.sprites.versions['generation-iii'].emerald.front_default;
        data.imageGen4 = image.sprites.versions['generation-iv'].platinum.front_default;
        data.imageGen5 = image.sprites.versions['generation-v']['black-white'].front_default;
        data.imageGen6 = image.sprites.versions['generation-vi']['x-y'].front_default;
        data.imageGen7 = image.sprites.versions['generation-vii']['ultra-sun-ultra-moon'].front_default;
        data.imageGen8 = image.sprites.versions['generation-viii'].icons.front_default;
        this.pokemonOnCurrentPage.push(data);
      });
    });
  }

  return() {
    this.selectedPokemon = [];
  }

  changeGeneration(generation: string) {
    this.currentGeneration = generation;
  }

  getGenerationImage(pokemon: IPokemon) {
      switch (this.currentGeneration) {
        case 'gen1':
          return pokemon.imageGen1 ? pokemon.imageGen1 : pokemon.imageUrl;
        case 'gen2':
          return pokemon.imageGen2 ? pokemon.imageGen2 : pokemon.imageUrl;
        case 'gen3':
          return pokemon.imageGen3 ? pokemon.imageGen3 : pokemon.imageUrl;
        case 'gen4':
          return pokemon.imageGen4 ? pokemon.imageGen4 : pokemon.imageUrl;
        case 'gen5':
          return pokemon.imageGen5 ? pokemon.imageGen5 : pokemon.imageUrl;
        case 'gen6':
          return pokemon.imageGen6 ? pokemon.imageGen6 : pokemon.imageUrl;
        case 'gen7':
          return pokemon.imageGen7 ? pokemon.imageGen7 : pokemon.imageUrl;
        case 'gen8':
          return pokemon.imageGen8 ? pokemon.imageGen8 : pokemon.imageUrl;
        default:
          return pokemon.imageUrl;
      }
  }

}

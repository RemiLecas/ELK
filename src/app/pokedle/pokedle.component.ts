import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IPokemon, IPokemonNew} from "../interface/IPokemon.interface";
import {HttpClient} from "@angular/common/http";
import {PokemonService} from "../service/pokemon.service";

@Component({
  selector: 'app-pokedle',
  templateUrl: './pokedle.component.html',
  styleUrls: ['./pokedle.component.scss']
})
export class PokedleComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  allPokemon: IPokemon[] = [];
  pokemonToFind!: IPokemon;
  isFind: boolean = false;
  filteredPokemon: IPokemon[] = [];
  searchTerm: string = '';
  pokemonSelected: IPokemonNew[] = [];
  dropdownOpen: boolean = false;
  count: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private pokemonService: PokemonService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      pokemonName: ['', [Validators.required]]
    });

    this.getAllPokemon();
    this.getRandomPokemon();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.checkIfPokemonIsValid(this.form.value.pokemonName);
    this.form.reset();
    this.filteredPokemon = [];
  }

  getAllPokemon() {
    this.pokemonService.getPokemons()
      .subscribe((data: any) => {
        this.allPokemon = data;
      });
  }

  async checkIfPokemonIsValid(Name: string) {
    this.count++;
    this.searchTerm = Name;
    const selectedPokemon = (this.allPokemon.find(pokemon => pokemon.Name === Name));
    if (selectedPokemon) {
      await this.fetchPokemonDetails(selectedPokemon.Name);
      if (Name === this.pokemonToFind.Name) {
        this.isFind = true;
      } else {
        this.isFind = false;
      }
    }
  }

  selectPokemon(pokemon: IPokemon): void {
    this.searchTerm = pokemon.Name;
    this.dropdownOpen = false;
    this.filteredPokemon = [];
  }

  onInputChange(newValue: string): void {
    if (newValue.length > 0) {
      this.dropdownOpen = true;
      this.filteredPokemon = this.filterUniquePokemon(
        this.allPokemon.filter(pokemon =>
          pokemon.Name.toLowerCase().includes(newValue.toLowerCase()) &&
          !this.pokemonSelected.some(selectedPokemon => selectedPokemon.Name === pokemon.Name)
        )
      );
      // this.filteredPokemon = this.allPokemon.filter(pokemon =>
      //   pokemon.Name.toLowerCase().includes(newValue.toLowerCase())
      //   && !this.pokemonSelected.some(selectedPokemon => selectedPokemon.Name === pokemon.Name)
      // );
    } else {
      this.dropdownOpen = false;
      this.filteredPokemon = [];
    }

  }

  fetchPokemonDetails(pokemonName: string) {
    this.pokemonService.getPokemon(pokemonName)
      .subscribe((pokemonData: any) => {
        this.pokemonSelected.push(pokemonData[0]);
        this.pokemonService.findImage(pokemonName).subscribe((image: any) => {
          this.pokemonSelected[this.pokemonSelected.length - 1].imageUrl = image.sprites.front_default;
        })
      });
  }

  rematch() {
    window.location.reload();
  }

  getRandomPokemon() {
    this.pokemonService.randomPokemon()
      .subscribe((data: any) => {
        this.pokemonToFind = data[0];
      });
  }

  filterUniquePokemon(pokemons: IPokemon[]): IPokemon[] {
    const uniqueNames = new Set();
    return pokemons.filter(pokemon => {
      if (uniqueNames.has(pokemon.Name)) {
        return false;
      } else {
        uniqueNames.add(pokemon.Name);
        return true;
      }
    });
  }
}


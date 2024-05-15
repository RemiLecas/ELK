import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IPokemon, IPokemonNew} from "../interface/IPokemon.interface";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-pokedle',
  templateUrl: './pokedle.component.html',
  styleUrls: ['./pokedle.component.scss']
})
export class PokedleComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  allPokemon: IPokemon[] = [];
  pokemonToFind: IPokemon = {
    id: 10,
    Name: 'Caterpie',
    variation: '',
    type1: 'Bug',
    type2: '',
  };
  isFind: boolean = false;
  filteredPokemon: IPokemon[] = [];
  searchTerm: string = '';
  pokemonSelected: IPokemonNew[] = [];
  dropdownOpen: boolean = false;
  count: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      pokemonName: ['', [Validators.required]]
    });

    this.getAllPokemon();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.checkIfPokemonIsValid(this.form.value.pokemonName);
    this.form.reset();
    this.filteredPokemon = [];
  }

  getAllPokemon(){
    this.allPokemon = [
      { id: 10, Name: 'Caterpie', type1: 'Bug' },
      { id: 25, Name: 'Pikachu', type1: 'Electric' },
      { id: 1, Name: 'Bulbasaur', type1: 'Grass', type2: 'Poison'},
      { id: 132, Name: 'Ditto', type1: 'Normal', type2: ''}
    ];
  }

  checkIfPokemonIsValid(Name: string) {
    this.count++;
    this.searchTerm = Name;
    const selectedPokemon = (this.allPokemon.find(pokemon => pokemon.Name === Name));
    if (selectedPokemon) {
      this.fetchPokemonDetails(selectedPokemon.Name);
    }
    if (Name === this.pokemonToFind.Name){
      this.isFind = true;
    }else {
      this.isFind = false;
    }
  }

  selectPokemon(pokemon: IPokemon): void {
    this.searchTerm = pokemon.Name;
    this.filteredPokemon = [];
    this.dropdownOpen = false;
  }

  onInputChange(newValue: string): void {
    this.dropdownOpen = true;
    this.filteredPokemon = this.allPokemon.filter(pokemon =>
      pokemon.Name.toLowerCase().includes(newValue.toLowerCase())
      && !this.pokemonSelected.some(selectedPokemon => selectedPokemon.Name === pokemon.Name)
    );
  }

  fetchPokemonDetails(pokemonName: string) {
    this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`).subscribe(
      (response: any) => {
        console.log('Pokemon details:', response);
        const selectedPokemon = {
          id: response.id,
          Name: response.Name,
          type1: response.types[0].type.Name,
          type2: response.types.length > 1 ? response.types[1].type.Name : null,
          imageUrl: response?.sprites?.front_default
        };

        if (selectedPokemon) {
          this.pokemonSelected.push(selectedPokemon);
        }

      },
      (error: any) => {
        console.error('Error fetching Pokemon details:', error);
      }
    );
  }
  rematch() {
    window.location.reload();
  }
}

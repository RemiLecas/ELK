import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {IPokemon} from "../interface/IPokemon.interface";
import {map, Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  apiUrl: string = '/api';

  constructor(private http: HttpClient) {
  }

  // Get All
  getPokemons() {
    return this.http.get(`${this.apiUrl}/pokemons`);
  }

  // Get pokemon with pagination
  getPokemonsPagi(page: number, size: number){
    return this.http.get<IPokemon>(`${this.apiUrl}/pokemons/pagination/${page}/${size}`)
  }

  // Get one pokemon with exact caract
  getPokemon(name: string) {
    return this.http.get<IPokemon>(`${this.apiUrl}/pokemon/${name}`);
  }

  // Get random pokemon
  randomPokemon(){
    return this.http.get<IPokemon>(`${this.apiUrl}/randomPokemon`)
  }

  // Get pokemon with fuzzy
  getFuzzyPokemon(name: string){
    return this.http.get<IPokemon>(`${this.apiUrl}/pokemonSelected/${name}`)
  }

  // Get Image on PokeApi
  findImage(name: string){
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
  }

  getMostSearchedPokemon() {
    return this.http.get<any>(`${this.apiUrl}/pokemonMostSearched`)
  }
}

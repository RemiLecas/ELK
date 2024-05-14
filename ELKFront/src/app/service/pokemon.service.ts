import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {IPokemon} from "../interface/IPokemon.interface";
import {map, Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  apiUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {
  }

  getPokemons(page: number, pageSize: number) {
    const offset = (page - 1) * pageSize;
    return this.http.get(`${this.apiUrl}?offset=${offset}&limit=${pageSize}`);
  }
  getPokemon(name: string) {
    return this.http.get(`${this.apiUrl}/${name}`);
  }
}

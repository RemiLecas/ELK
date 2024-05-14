export interface IPokemon {
  id: number;
  name: string;
  variation?: string;
  type1: string;
  type2?: string;

}

export interface IPokemonNew {
  id: number;
  name: string;
  variation?: string;
  type1: string;
  type2: string | null;
  imageUrl: string | null;

}

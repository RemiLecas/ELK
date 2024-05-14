export interface IPokemon {
  id: number;
  name: string;
  variation?: string;
  type1: string;
  type2?: string;
  Total?: number,
  HP?: number,
  Attack?: number,
  DefenseSp?: number,
  AtkSp?: number ,
  Def?: number,
  Speed?: number,
  imageUrl?: string,
}

export interface IPokemonNew {
  id: number;
  name: string;
  variation?: string;
  type1: string;
  type2: string | null;
  imageUrl: string | null;

}

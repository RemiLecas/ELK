export interface IPokemon {
  Id: number;
  Name: string;
  variation?: string;
  Type1: string;
  Type2?: string;
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
  Id: number;
  Name: string;
  variation?: string;
  Type1: string;
  Type2: string | null;
  imageUrl: string | null;

}

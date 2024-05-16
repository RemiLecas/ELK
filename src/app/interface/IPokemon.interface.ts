export interface IPokemon {
  Id: number;
  Name: string;
  Variation?: string;
  Type1: string;
  Type2?: string;
  Total?: number,
  HP?: number,
  Attack?: number,
  Sp_Def?: number,
  Sp_Atk?: number ,
  Defense?: number,
  Speed?: number,
  imageUrl?: string,
  animated?: string,
  imageGen1?: string,
  imageGen2?: string,
  imageGen3?: string,
  imageGen4?: string,
  imageGen5?: string,
  imageGen6?: string,
  imageGen7?: string,
  imageGen8?: string,
}

export interface IPokemonNew {
  Id: number;
  Name: string;
  variation?: string;
  Type1: string;
  Type2: string | null;
  imageUrl: string | null;

}

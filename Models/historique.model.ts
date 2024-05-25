export interface Historique {
  ab_client: AbClient;
  Mott: Mott | null;
  id: number;
  Proc: Proc | null;
  procedure: string;
  flag_trf: FlagTrf;
  VTRF: null;
  Trans: Trans | null;
  obs: string;
  dateobs: Date;
}

export interface Mott {
  codenv: number;
  libelle: string;
}

export interface Proc {
  codenv: number;
  libelle: string;
  created_at: Date;
}

export interface Trans {
  codenv: string;
  libelle: string;
}

export interface AbClient {
  nom: string;
  id: string;
  cli: string;
}

export enum FlagTrf {
  C = "C",
}

"use server";
import { Agence } from "@/Models/agence.model";
import axios from "axios";

export interface Main {
  result: Utilisateur[];
  totalCount: number;
  totalPages: number;
}

export interface Utilisateur {
  id: number;
  cli: string;
  usr_matricule: string;
  usr_nomprenom: string;
  email_chargee: null;
  affectation: number | null;
  AffecterA: AffecterA[];
  flgstatut: string;
  tel_chargee: null;
}

export interface AffecterA {
  Agence?: Agence;
  Zone?: Zone;
}

export interface Zone {
  codug: number;
  libelle: string;
}

export interface clientResult {
  result: Client[];
  totalCount: number;
  totalPages: number;
}

export interface Client {
  id: string;
  nom: string;
  Agence: Agence;
  nbre_imp: number;
  mnt_imp: string;
  nombre_jours: number;
  sd: string;
  ncp: string;
  depassement: string;
  nombre_jours_sdb: number;
  tel1: string;
  tel2: null;
  Zone: Agence;
}

export const getAllUsers = async (currentpage?: number, perpage?: number) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;

    //   console.log(
    //     `https://sprint2-two.vercel.app/client/listclientnoncontactes?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    //   );
    const res = await axios.get<Main>(
      `http://localhost:10001/users/all?perpage=5?page`
    );

    console.log(res.data);

    return (res.data as Main) || ({} as Main);
  } catch (error) {
    return {} as Main;
  }
};

export const getAllClient = async (currentpage?: number, perpage?: number) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;

    //   console.log(
    //     `https://sprint2-two.vercel.app/client/listclientnoncontactes?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    //   );
    const res = await axios.get<clientResult>(
      `http://localhost:10001/client/all?perpage=5?page`
    );

    console.log(res.data);

    return (res.data as clientResult) || ({} as clientResult);
  } catch (error) {
    return {} as clientResult;
  }
};

export interface compterenduResult {
  CompteRendu: CompteRendu[];
  totalCount: number;
  totalPages: number;
}

export interface CompteRendu {
  created_at: Date;
  id: number;
  cli: string;
  compte_rendu: string;
  usr_nom: string;
  ab_client: AbClient;
  compterendutype_compterendutype_compterenduidTosuivi_agenda: CompterendutypeCompterendutypeCompterenduidTosuiviAgendum[];
}

export interface AbClient {
  nom: string;
  cli: string;
}

export interface CompterendutypeCompterendutypeCompterenduidTosuiviAgendum {
  typeID: number;
  types: Types;
  clientInjoignable: ClientInjoignable | null;
  promesseregresse: Promesseregresse | null;
  ClientInjoignableId: number | null;
  promesseregresseID: number | null;
  visite: Visite | null;
  visiteId: number | null;
  nouvellecoordonnees: Nouvellecoordonnees | null;
  nouvellecoordonneesID: number | null;
  facilitePaimentId: null;
  FacilitePaiment: null;
  nonReconnaissanceID: number | null;
  nonreconaissance: Nonreconaissance | null;
}

export interface ClientInjoignable {
  lieu_ver: string;
}

export interface Nonreconaissance {
  observation: string;
}

export interface Nouvellecoordonnees {
  nouv_te2: string;
  nouv_tel: string;
  nouv_adresse: string;
}

export interface Promesseregresse {
  mnt_reg: string;
  lieu_ver: string;
  date_ver: null;
}

export interface Types {
  code: number;
  libelle: string;
}

export interface Visite {
  date_visite: null;
  h_rdv_visite_h_rdvToh_rdv: Agence;
  Agence: Agence;
  lieu_visite: number;
  h_rdv: number;
}

export const getAllCompteRendu = async (
  currentpage?: number,
  perpage?: number
) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;

    //   console.log(
    //     `https://sprint2-two.vercel.app/client/listclientnoncontactes?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    //   );
    const res = await axios.get<compterenduResult>(
      `http://localhost:10001/compterendu/all`
    );

    console.log(res.data);

    return (res.data as compterenduResult) || ({} as compterenduResult);
  } catch (error) {
    return {} as compterenduResult;
  }
};

export interface CompteResult {
  result: Compte[];
  totalCount: number;
  totalPages: number;
}

export interface Compte {
  id: number;
  cli: string;
  ab_client: AbClient | null;
  mnt_imp: string;
  mnt_sdb: string;
  Agence: Agence;
}

export interface AbClient {
  depassement: string;
  nom: string;
}

export const getAllAccount = async (currentpage?: number, perpage?: number) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;

    const res = await axios.get<CompteResult>(
      `http://localhost:10001/compte/all`
    );

    console.log(res.data);

    return (res.data as CompteResult) || ({} as CompteResult);
  } catch (error) {
    return {} as CompteResult;
  }
};

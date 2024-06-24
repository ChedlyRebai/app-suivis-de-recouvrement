"use server";
import { Agence } from "@/Models/agence.model";
import axios from "axios";
import { cookies } from "next/headers";

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
  id: number;
  usr_matricule: string;
  usr_nomprenom: string;
  email_chargee: string;
  affectation: number | null;
  fonction: Fonction;
  AffecterA: AffecterA[];
  flgstatut: string;
  tel_chargee: string;
}

export interface Zone {
  codug: number;
  libelle: string;
}

export interface Fonction {
  lib_fonction: string;
  departement: Departement;
}

export interface Departement {
  nom_depart: string;
}

export const getAllClient = async (
  currentpage?: number,
  perpage?: number,
  search?: string,
  agence?: string,
  group?: string
) => {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");
    axios.defaults.baseURL = `https://sprint2-two.vercel.app`;
    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;
    axios.defaults.baseURL = `${process.env.API_URL}`;

    //   console.log(
    //     `https://sprint2-two.vercel.app/client/listclientnoncontactes?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    //   );
    console.log(
      `https://release4.vercel.app/client/all?perpage=${perpage}&page=${currentpage}&search=${search}`
    );
    const res = await axios.get<clientResult>(
      `https://release4.vercel.app/client/all?perpage=${perpage}&page=${currentpage}&search=${search}&group=${group}&agence=${agence}`
    );

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
  Utilisateur: Utilisateur;

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
  perpage?: number,
  search?: string
) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;

    //   console.log(
    //     `https://sprint2-two.vercel.app/client/listclientnoncontactes?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    //   );
    console.log(
      `https://release4.vercel.app/compterendu/all?perpage=${perpage}&page=${currentpage}&search=${search}`
    );
    const res = await axios.get<compterenduResult>(
      `https://release4.vercel.app/compterendu/all?perpage=${perpage}&page=${currentpage}&search=${search}`
    );

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
  ncp: string;
  Agence: Agence;
}

export interface AbClient {
  depassement: string;
  nom: string;
  Agence: Agence;
}

export const getAllAccount = async (
  currentpage?: number,
  perpage?: number,
  search?: string
) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    console.log(
      `https://release4.vercel.app/compte/all?perpage=${perpage}&page=${currentpage}&search=${search}`
    );
    const res = await axios.get<CompteResult>(
      `https://release4.vercel.app/compte/all?perpage=${perpage}&page=${currentpage}&search=${search}`
    );

    return (res.data as CompteResult) || ({} as CompteResult);
  } catch (error) {
    return {} as CompteResult;
  }
};

export interface UserResult {
  result: usersAdmin[];
  totalCount: number;
  totalPages: number;
}

export interface usersAdmin {
  id: number;
  usr_matricule: string;
  usr_nomprenom: string;
  email_chargee: string;
  affectation: number | null;
  fonction: Fonction;
  AffecterA: AffecterA[];
  flgstatut: string;
  tel_chargee: string;
}

export interface Zone {
  codug: number;
  libelle: string;
}

export interface Fonction {
  lib_fonction: string;
  departement: Departement;
}

export interface Departement {
  nom_depart: string;
}

export const getAllUsers = async (
  currentpage?: number,
  perpage?: number,
  search?: string
) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    console.log(
      `https://sprint2-two.vercel.app/client/listclientnoncontactes?page=${currentpage}&perPage=${perpage}&search=${search}`
    );
    const res = await axios.get<UserResult>(
      `https://release4.vercel.app/users/all?perpage=${perpage}&page=${currentpage}&search=${search}`
    );

    return (res.data as UserResult) || ({} as UserResult);
  } catch (error) {
    return {} as UserResult;
  }
};

export const getUserStat = async (id: number) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    console.log(`http://localhost:10004/stat/userstat?id=${id}`);
    const res = await axios.get<any>(
      `https://release4.vercel.app/stat/userstat?id=${id}`
    );

    return (res.data as {}) || ({} as any);
  } catch (error) {
    return {} as any;
  }
};

export const getClientStat = async (id: number) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    console.log(`http://localhost:10004/stat/clientstat?id=${id}`);
    const res = await axios.get<any>(
      `https://release4.vercel.app/stat/clientstat?id=${id}`
    );

    return (res.data as {}) || ({} as any);
  } catch (error) {
    return {} as any;
  }
};

export const exportClient = async (search?: string) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    console.log(`http://localhost:10004/stat/clientstat?id=${search}`);
    const res = await axios.get<any>(
      `https://release4.vercel.app/client/exfclient?id=${search}`
    );
    return (res.data as {}) || ({} as any);
  } catch (error) {
    return {} as any;
  }
};

"use server ";

import { File } from "@/Models/file.model";
import axios from "axios";
import { Departement } from "./admin.action";

import { Zone } from "@/Models/zone.model";
import { Agence } from "@/Models/agence.model";

export const getUserBuMatricule = async (matricule: string) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get(
      `https://app-suivis-de-recouvrement-ser-git-69cf99-chedlyrebais-projects.vercel.app/users/getUsername?matricule=${matricule}`
    );
    return response.data.usr_nomprenom || "";
  } catch (error) {
    console.log(error);
    return "";
  }
};

export interface UserDetails {
  id: number;
  usr_matricule: string;
  usr_nomprenom: string;
  email_chargee: string;
  comptes: any[];
  affectation: number;
  fonction: Fonction;
  AffecterA: AffecterA[];
  Files: File[];
  flgstatut: string;
  tel_chargee: string;
  created_at: Date;
  suivi_agenda: SuiviAgendum[];
}

export interface SuiviAgendum {
  id: number;
  ab_client: AbClient;
  created_at: Date;
  compterendutype_compterendutype_compterenduidTosuivi_agenda: CompterendutypeCompterendutypeCompterenduidTosuiviAgendum[];
}

export interface CompterendutypeCompterendutypeCompterenduidTosuiviAgendum {
  id: number;
  created_at: Date;
  compterenduid: number;
  visiteId: number;
  facilitePaimentId: null;
  ClientInjoignableId: null;
  nouvellecoordonneesID: null;
  promesseregresseID: null;
  typeID: number;
  nonReconnaissanceID: null;
  types: Types;
  clientInjoignable: ClientInjoignable | null;
  FacilitePaiment: FacilitePaiment | null;
  nonreconaissance: Nonreconaissance | null;
  nouvellecoordonnees: null;
  promesseregresse: Promesseregresse | null;
  visite: Visite;
}

export interface FacilitePaiment {
  id: number;
  nb_ech: null;
  mnt_rec: string;
  lieu_rec: string;
  suiviagendaid: number;
  created_at: Date;
  updated_at: Date;
  montantFacilites: MontantFacilite[];
}

export interface MontantFacilite {
  id: number;
  mntech: string;
  date_ech: null;
  facilitePaimentId: number;
}

export interface Nonreconaissance {
  id: number;
  observation: string;
}

export interface Types {
  code: number;
  libelle: string;
}

export interface Visite {
  id: number;
  date_visite: null;
  lieu_visite: number;
  h_rdv: number;
}

export interface AffecterA {
  Agence: Agence;
  Zone: Zone;
}
export interface AbClient {
  id: string;
  nom: string;
  cli: string;
  Agence: Agence;
  Zone: Zone;
}

export interface Fonction {
  lib_fonction: string;
  departement: Departement;
}

export interface ClientInjoignable {
  id: number;
  lieu_ver: string;
}

export interface Promesseregresse {
  id: number;
  mnt_reg: string;
  date_ver: null;
  lieu_ver: string;
}
export const getUserDetails = async (
  id: string | number
): Promise<UserDetails> => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get<UserDetails>(
      `https://release4.vercel.app/users/byid?id=${id}`
    );
    return (response.data as UserDetails) || ({} as UserDetails);
  } catch (error) {
    console.log(error);
    return {} as UserDetails;
  }
};

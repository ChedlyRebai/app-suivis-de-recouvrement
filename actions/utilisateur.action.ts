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
}

export interface AffecterA {
  Agence: Agence;
  Zone: Zone;
}
export interface AbClient {
  id: string;
  nom: string;
  cli: string;
}

export interface Fonction {
  lib_fonction: string;
  departement: Departement;
}

export const getUserDetails = async (
  id: string | number
): Promise<UserDetails> => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get<UserDetails>(
      `http://localhost:10001/users/byid?id=${id}`
    );
    return (response.data as UserDetails) || ({} as UserDetails);
  } catch (error) {
    console.log(error);
    return {} as UserDetails;
  }
};

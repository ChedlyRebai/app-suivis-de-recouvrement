"use server"
import axios from "axios";
import { Zone } from "./admin.action";
import { Agence } from "@/Models/agence.model";
export interface Main {
  id:          number;
  ncp:         string;
  mnt_imp:     string;
  mnt_sdb:     string;
  Agence:      Agence;
  Zone:        Zone;
  depassement: null | string;
  tot_creance: string;
  tot_eng:     string;
  montant_aut: null | string;
  phase:       string;
}


export const getCompteByClientId = async (IdClient?: string | number) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const res = await axios.get<Main[]>(
      `http://localhost:10001/compte/byclientid?id=${IdClient}`
    );

    return res.data || ([] as Main[]);
  } catch (error) {
    return [] as Main[];
  }
};

"use server";
import { AbCompte } from "@/Models/AbCompte.model";
import { SuiviAgenda } from "@/Models/SuiviAgenda.model";
import { ab_client } from "@/Models/ab_client.model";
import { fonction } from "@/Models/fonction.model";
import axios from "axios";
import { group } from "console";
import { cookies } from "next/headers";

export interface Main {
  result: ab_client[];
  totalCount: number;
  totalPages: number;
  total: Total;
}

export interface Total {
  mnt_imp: string;
  depassement: string;
  tot_creance: string;
  engagement: string;
}

export const getClientContactes = async (
  IdClient?: string,
  currentpage?: number,
  perpage?: number,
  groupe?: string,
  agence?: string,
  dayfrom?: string,
  dayto?: string
) => {
  const cookieStore = cookies();
  const session = cookieStore.get("session");
  axios.defaults.baseURL = `http://localhost:10000`;
  axios.defaults.headers.common["Authorization"] = ` ${
    session?.value as string
  }`;


  console.log(
    `http://localhost:10001/client/listclientcontactes?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
  );
  const res = await axios.get<Main>(
    `http://localhost:10001/client/listclientcontactes?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
  );
  console.log(res.data);
  //console.log(res.data);
  return res.data;
};

export const getClientNonContactes = async (
  IdClient?: string,
  currentpage?: number,
  perpage?: number,
  groupe?: string,
  agence?: string,
  dayfrom?: string,
  dayto?: string
) => {
  //console.log(`${process.env.API_URL}/fonction`);
  const cookieStore = cookies();
  const session = cookieStore.get("session");
  axios.defaults.baseURL = `${process.env.API_URL}`;
  axios.defaults.headers.common["Authorization"] = ` ${
    session?.value as string
  }`;
  console.log(
    `http://localhost:10001/client/listclientnoncontactes?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
  );
  const res = await axios.get<Main>(
    `http://localhost:10001/client/listclientnoncontactes?page=${currentpage}&groupe=${groupe}&agence=${agence}&perPage=${perpage}&search=${IdClient}&from=${dayfrom}&to=${dayto}`
  );
  // console.log(res.data);
  return res.data;
};

export const getGroupes = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;

    const res = await axios.get<[]>(`http://localhost:10001/client/getgroupes`);
    return res.data;
  } catch (error) {
    return [];
  }
};

export const getAgences = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const res = await axios.get<[]>(`http://localhost:10001/client/getagences`);
    return res.data;
  } catch (error) {
    return [];
  }
};

export const getCompterendu = async (IdClient?: string) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    console.log(`http://localhost:10001/client/getcompterendu/${IdClient}`);
    const res = await axios.get<SuiviAgenda>(`http://localhost:10001/client/compteRendu?cli=${IdClient}`);
    return res.data;

  } catch (error) {
    return {} as SuiviAgenda;
  } 
};

export const getListCompte = async (IdClient?: string) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    console.log(`http://localhost:10001/client/listcompte?cli=049105812036`);
    const res = await axios.get<AbCompte[]>(`http://localhost:10001/client/listcompte?cli=${IdClient}`);
    return res.data;
  } catch (error) {
    return [] as AbCompte[];
  } 
}


export const getListCompteRenduHistorique = async (IdClient?: string) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    console.log(`http://localhost:10001/client/listhistorique?cli=${IdClient}`);
    const res = await axios.get<SuiviAgenda[]>(`http://localhost:10001/client/listhistorique?cli=${IdClient}`);
    return res.data;
  } catch (error) {
    return [] as SuiviAgenda[];
  }
}


export const createCompteRendu = async (compteRendu: SuiviAgenda) => {
  try {
    // axios.defaults.baseURL = `${process.env.API_URL}`;
    // const res = await axios.post(`http://localhost:10001/client/createcompterendu`, compteRendu);
    // return res.data;
    console.log(compteRendu)
  } catch (error) {
    return {} as SuiviAgenda;
  }
}
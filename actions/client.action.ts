"use server";
import { AbCompte } from "@/Models/AbCompte.model";
import { SuiviAgenda } from "@/Models/SuiviAgenda.model";
import { ab_client } from "@/Models/ab_client.model";
import { getSession } from "@/lib";
import axios from "axios";

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
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");
    axios.defaults.baseURL = `https://sprint2-two.vercel.app`;
    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;
    console.log(
      `https://sprint2-two.vercel.app/client/listclientcontactes?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    );
    const res = await axios.get<Main>(
      `https://sprint2-two.vercel.app/client/listclientcontactes?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    );
   
    //console.log(res.data);
    return res.data || {} as ab_client;
  } catch (error) {
    return {} as ab_client;
  }
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
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");
    axios.defaults.baseURL = `${process.env.API_URL}`;
    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;
    console.log(
      `https://sprint2-two.vercel.app/client/listclientnoncontactes?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    );
    const res = await axios.get<Main>(
      `https://sprint2-two.vercel.app/client/listclientnoncontactes?page=${currentpage}&groupe=${groupe}&agence=${agence}&perPage=${perpage}&search=${IdClient}&from=${dayfrom}&to=${dayto}`
    );

    console.log("revalidate");
    return res.data;
  } catch (error) {
    return {} as Main;
  }
};

export const getGroupes = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;

    const res = await axios.get<[]>(
      `https://sprint2-two.vercel.app/client/getgroupes`
    );
   
    return res.data;
  } catch (error) {
    return [];
  }
};

export const getAgences = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const res = await axios.get<[]>(
      `https://sprint2-two.vercel.app/client/getagences`
    );
    return res.data;
  } catch (error) {
    return [];
  }
};

export const getCompterendu = async (IdClient?: string) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    console.log(
      `https://sprint2-two.vercel.app/client/getcompterendu/${IdClient}`
    );
    const res = await axios.get<any>(
      `https://sprint2-two.vercel.app/client/compteRendu?cli=${IdClient}`
    );
    console.log(res.data);
    return res.data || {} as any;
  } catch (error) {
    return {} as any;
  }
};

export const getListCompte = async (IdClient?: string) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    console.log(
      `https://sprint2-two.vercel.app/client/listcompte?cli=049105812036`
    );
    const res = await axios.get<AbCompte[]>(
      `https://sprint2-two.vercel.app/client/listcompte?cli=${IdClient}`
    );
    return res.data;
  } catch (error) {
    return [] as AbCompte[];
  }
};

export const getListCompteRenduHistorique = async (IdClient?: string) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    console.log(
      `https://sprint2-two.vercel.app/client/listhistorique?cli=${IdClient}`
    );
    const res = await axios.get<SuiviAgenda[]>(
      `https://sprint2-two.vercel.app/client/listhistorique?cli=${IdClient}`
    );
    return res.data;
  } catch (error) {
    return [] as SuiviAgenda[];
  }
};

export const createCompteRendu = async (
  suiviAgenda: SuiviAgenda,
  compteRendu: any,
  cli: string
) => {
  try {
    console.log("suiviAgenda", suiviAgenda, "compterendu", compteRendu);
    const user = await getSession();
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const res = await axios.post(
      `https://sprint2-two.vercel.app/compterendu/createcompterendu`,
      { suiviAgenda, compteRendu, user, cli }
    );
    console.log(res.data)
    return res.data;
  } catch (error) {
    return {} as SuiviAgenda;
  }
};

export const getCompteRenduById = async (IdClient?: string | number) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const res = await axios.get<SuiviAgenda>(
      `https://sprint2-two.vercel.app/compterendu/getbyid/${IdClient}`
    );

    return res.data;
  } catch (error) {
    return {} as SuiviAgenda;
  }
};


export const demandeDeTransferAnticipe =  async (
  IdClient?: string,
  currentpage?: number,
  perpage?: number,
  groupe?: string,
  agence?: string,
  dayfrom?: string,
  dayto?: string
) =>{
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");
    axios.defaults.baseURL = `https://sprint2-two.vercel.app`;
    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;
    const res = await axios.get(` `)
    console.log(res.data);
    return res.data || {} as ab_client;
  } catch (error) {
    return {} as ab_client;
  }
}
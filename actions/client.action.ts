"use server";
import { ab_client } from "@/Models/ab_client.model";
import { fonction } from "@/Models/fonction.model";
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
  const cookieStore = cookies();
  const session = cookieStore.get("session");
  axios.defaults.baseURL = `https://sprint2-two.vercel.app`;
  axios.defaults.headers.common["Authorization"] = ` ${
    session?.value as string
  }`;
  console.log(
    `https://sprint2-two.vercel.app/client/listclientnoncontactes?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}$to=${dayto}`
  );
  const res = await axios.get<Main>(
    `https://sprint2-two.vercel.app/client/listclientnoncontactes?page=${currentpage}&perPage=${perpage}&search&from=30&to=40`
  );
  //console.log(res.data);
  return res.data;
};

export const getClientNonContactes = async (
  IdClient: number,
  currentpage?: number,
  perpage?: number,
  dayfrom?: number,
  dayto?: number
) => {
  //console.log(`${process.env.API_URL}/fonction`);
  const cookieStore = cookies();
  const session = cookieStore.get("session");
  axios.defaults.baseURL = `${process.env.API_URL}`;
  axios.defaults.headers.common["Authorization"] = ` ${
    session?.value as string
  }`;
  const res = await axios.get<Main[]>(
    `http://localhost:10001/client/listclientnoncontactes??page=${currentpage}&perPage=${perpage}&idclient=${IdClient}&from=${dayfrom}$to=${dayto}`
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

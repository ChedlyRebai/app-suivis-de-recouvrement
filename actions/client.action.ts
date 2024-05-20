"use server";
import { AbCompte } from "@/Models/AbCompte.model";
import { SuiviAgenda } from "@/Models/SuiviAgenda.model";
import { ab_client } from "@/Models/ab_client.model";
import { Agence } from "@/Models/agence.model";
import { Zone } from "@/Models/zone.model";
import { CompteRenduList } from "@/constants/types";
import { getSession } from "@/lib";
import axios from "axios";
import { revalidatePath } from "next/cache";

import { cookies } from "next/headers";
import { creteAcess } from "./acess.action";

export interface Main {
  result: client[];
  totalCount: number;
  totalPages: number;
  total: Total;
}

export interface client {
  nom: string;
  cli: string;
  flag_trt: string;
  phase: string;
  susp_crd: null;
  trt_agc: null;
  groupe: number;
  agence: number;
  nbre_imp: number;
  mnt_imp: string;
  nombre_jours: number;
  sd: string;
  depassement: string;
  nombre_jours_sdb: number;
  tot_creance: string;
  max_nbj: number;
  engagement: string;
  classe: number;
  tel1: string;
  tel2: null;
  Zone: Agence;
  Agence: Agence;
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
    axios.defaults.baseURL = `https://release2.vercel.app`;
    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;
    console.log(
      `https://sprint2-two.vercel.app/client/listclientcontactes?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    );
    const res = await axios.get<Main>(
      `https://sprint2-v2.vercel.app/client/listclientcontactes?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    );
    console.log(
      "dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      res.data.total
    );
    return res.data || ({} as Main);
  } catch (error) {
    return {} as Main;
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
      `https://sprint2-v2.vercel.app/client/listclientnoncontactes?page=${currentpage}&groupe=${groupe}&agence=${agence}&perPage=${perpage}&search=${IdClient}&from=${dayfrom}&to=${dayto}`
    );

    return res.data || ({} as Main);
  } catch (error) {
    return {} as Main;
  }
};

export const getGroupes = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;

    const res = await axios.get<any[]>(
      `https://release2.vercel.app/client/getgroupes`
    );

    return res.data || [];
  } catch (error) {
    return [];
  }
};

export const getAgences = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const res = await axios.get<Agence[]>(
      `https://release2.vercel.app/client/getagences`
    );
    return res.data || [];
  } catch (error) {
    return [];
  }
};

export const getCompterendu = async (IdClient?: string) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    console.log(
      `https://release2.vercel.app/client/getcompterendu/${IdClient}`
    );
    const res = await axios.get<any>(
      `https://release2.vercel.app/client/client?cli=${IdClient}`
    );
    console.log("res.data", res.data);
    return res.data || ({} as any);
  } catch (error) {
    return {} as any;
  }
};

export const getListCompte = async (IdClient?: string) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    console.log(
      `https://release2.vercel.app/client/listcompte?cli=049105812036`
    );
    const res = await axios.get<AbCompte[]>(
      `https://release2.vercel.app/client/listcompte?cli=${IdClient}`
    );
    return res.data;
  } catch (error) {
    return [] as AbCompte[];
  }
};

export const getListCompteRenduHistoriqu = async (
  IdClient?: string
): Promise<SuiviAgenda[]> => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    console.log(
      `https://release2.vercel.app/client/listhistorique?cli=${IdClient}`
    );
    const res = await axios.get<SuiviAgenda[]>(
      `https://release2.vercel.app/client/listhistorique?cli=${IdClient}`
    );
    return res.data || ([] as SuiviAgenda[]);
  } catch (error) {
    return [] as SuiviAgenda[];
  }
};

export const getListCompteRenduHistorique = async (IdClient?: string) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    console.log(
      `https://release2.vercel.app/client/getcompterendu/${IdClient}`
    );
    const res = await axios.get<CompteRenduList[]>(
      `https://release4.vercel.app/compterendu/getcompterendu?cli=${IdClient}`
    );
    revalidatePath("/");
    revalidatePath("/en/compte-rendu");
    revalidatePath("/compte-rendu");
    // revalidatePath("/en/compte-rendu?cli=049105812036");
    return res.data || ([] as CompteRenduList[]);
  } catch (error) {
    return [] as CompteRenduList[];
  }
};

export const createCompteRendu = async (
  suiviAgenda: SuiviAgenda,
  compteRendu: any,
  cli: string,
  type: string
) => {
  try {
    console.log("suiviAgenda", suiviAgenda, "compterendu", compteRendu);
    const user = await getSession();
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const cookieStore = cookies();
    const session = cookieStore.get("session");

    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;

    const createacess = await creteAcess("compte-rendu");
    console.log("createacess", createacess);
    const res = await axios.post(
      //release2
      `https://release2.vercel.app/compterendu/createcompterendu`,
      { suiviAgenda, compteRendu, user, cli, type: Number(type) }
    );
    revalidatePath("/");
    revalidatePath("/en/compte-rendu");
    revalidatePath("/compte-rendu");

    return res.data;
  } catch (error) {
    return {} as SuiviAgenda;
  }
};

export const demandeDeTransferAnticipe = async (
  cli?: string,
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

    const res = await axios.get(
      `https://release3-v2.vercel.app/client/demandedetransferanticipe?page&perPage&search&groupe&agence&from&to`
    );

    return (res.data as any) || ({} as any);
  } catch (error) {
    return {} as any;
  }
};

// https://release2.vercel.app/transfer/getvalidationpropsedetransfertanticipe?page=1&groupe&agence&perPage=2&search&from&to
export const getValidationProposeDeTransferAnticipe = async (
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
    axios.defaults.baseURL = `https://release3-v2.vercel.app`;
    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;
    const res = await axios.get(
      `https://release3-v2.vercel.app/transfer/getvalidationpropsedetransfertanticipe?page=${currentpage}&groupe=${groupe}&agence=${agence}&perPage=${perpage}&cli=${IdClient}&from=${dayfrom}&to=${dayto}`
    );

    console.log(res.data);
    return res.data || ([] as ab_client);
  } catch (error) {
    return [] as ab_client;
  }
};

export interface ClientDetails {
  id: string;
  created_at: Date;
  catl: string;
  nom: string;
  Agence: Agence;
  engagement: string;
  cli: string;
  tel: string;
  nbre_imp: number;
  mnt_imp: string;
  nombre_jours: number;
  sd: string;
  depassement: string;
  nombre_jours_sdb: number;
  tel1: string;
  tel2: null;
  Zone: Zone;
}

export const getClientById = async (IdClient?: string | number) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    console.log(`http://localhost:10001/client/byid?id=${IdClient}`);
    const res = await axios.get<ClientDetails>(
      `https://release4.vercel.app/client/byid?id=${IdClient}`
    );
    return res.data || ({} as ClientDetails);
  } catch (error) {
    return {} as ClientDetails;
  }
};

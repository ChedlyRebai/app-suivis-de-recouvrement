"use server";

import axios from "axios";
import { cookies } from "next/headers";
export interface Main {
  result: any[];
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
export const getHistoriqueDemandDeProlongation = async (
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
    console.log(
      `https://release3-v2.vercel.app/prolongation/historiquedemandeprolongation?page=${currentpage}&perPage=${perpage}&cli=${cli}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    );

    const res = await axios.get<Main>(
      `https://release3-v2.vercel.app/prolongation/historiquedemandeprolongation?page=${currentpage}&perPage=${perpage}&cli=${cli}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
      //`http://localhost:10001/prolongation/historiquedemandeprolongation?page&perPage&search&groupe&agence&from&to&cli=109101102315`
    );
    return res.data || ({} as any);
  } catch (error) {
    return [];
  }
};

export const getvalidationprpositiondeprolongation = async (
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
    console.log(
      `https://release3-v2.vercel.app/transfer/getvalidationpropsedetransfertanticipe?page=${currentpage}&perPage=${perpage}&search=${cli}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    );

    const res = await axios.get<any>(
      `https://release3-v2.vercel.app/prolongation/validationprolongation?page=${currentpage}&perPage=${perpage}&cli=${cli}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    );
    console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", res.data);
    return res.data || ({} as any);
  } catch (error) {
    return {} as any;
  }
};

export const getHistoriquevalidationpropsedetransfertanticipeByCli = async (
  IdClient?: string,
  currentpage?: number,
  perpage?: number,
  groupe?: string,
  agence?: string,
  dayfrom?: string,
  dayto?: string
): Promise<Main> => {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");
    axios.defaults.baseURL = `http://localhost:10001`;
    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;
    console.log(
      `http://localhost:10001/transfer/gethistoriquevalidationpropsedetransfertanticipeByCli?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    );

    const res = await axios.get<Main>(
      `https://release3-v2.vercel.app/transfer/gethistoriquevalidationpropsedetransfertanticipeByCli?page=${currentpage}&perPage=${perpage}&cli=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    );
    console.log("============================================");

    return res.data || ({} as Main);
  } catch (error) {
    return {} as Main;
  }
};

export const createhistoriquevalidationpropsedetransfertanticipe = async ({
  matricule,
  obs,
  numobs,
  cli,
  motif,
  flag_trf,
}: {
  matricule: string;
  obs: string;
  numobs: string;
  cli: string;
  motif: string;
  flag_trf: string;
}): Promise<Main> => {
  try {
    const res = await axios.put(
      `https://release3-v2.vercel.app/transfer/createhistoriquevalidationpropsedetransfertanticipe`,
      { matricule, obs, numobs, cli, motif, flag_trf }
    );
    return res.data || ({} as Main);
  } catch (error) {
    return {} as Main;
  }
};

export const getDemandeDeProlongation = async (
  IdClient?: string,
  currentpage?: number,
  perpage?: number,
  groupe?: string,
  agence?: string,
  dayfrom?: string,
  dayto?: string
) => {
  // http://localhost:10001/prolongation/demandeprolongation?cli&page&perPage&search&groupe&agence&from&to
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");
    axios.defaults.baseURL = `http://localhost:10001`;
    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;
    console.log(
      `https://release3-v2.vercel.app/transfer/gethistoriquevalidationpropsedetransfertanticipeByCli?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    );

    const res = await axios.get<Main>(
      `https://release3-v2.vercel.app/prolongation/demandeprolongation?page=${currentpage}&perPage=${perpage}&cli=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    );
    return res.data || ({} as Main);
  } catch (error) {
    return {} as Main;
  }
};

export const updatePro = async (
  motif_prol_c: string,
  obs: string,
  id: string | number | undefined
) => {
  try {
    //release3
    const cookieStore = cookies();
    const session = cookieStore.get("session");
    axios.defaults.baseURL = `https://release3-v2.vercel.app`;
    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;
    const res = await axios.put(
      `https://release3-v2.vercel.app/prolongation/update?id=${id}`,
      { motif_prol_c, obs, id }
    );
    console.log("res prolongationnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", res);
    return { data: res.data, status: res.status } || ({} as any);
  } catch (error) {
    return {} as any;
  }
};

export const validationprolongation = async (
  id: string | undefined,
  prol_c: string
) => {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");
    axios.defaults.baseURL = `https://release3-v2.vercel.app`;
    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;
    const res = await axios.put(
      `https://release3-v2.vercel.app/prolongation/validate?id=${id}`,
      { prol_c }
    );

    return { data: res.data, status: res.status } || ({} as any);
  } catch (error) {
    return {} as any;
  }
};

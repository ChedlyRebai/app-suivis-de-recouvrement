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
export const getHistoriqueDemandDeTransferAnticipe = async (
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
      `http://localhost:10001/transfer/gethistoriquetransferanticipe?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    );

    const res = await axios.get<Main>(
      `http://localhost:10001/transfer/gethistoriquetransferanticipe?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    );
    return res.data || ({} as any);
  } catch (error) {
    return [];
  }
};

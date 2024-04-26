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
export const getLettre = async (
  IdClient?: string,
  currentpage?: number,
  perpage?: number,
  groupe?: string,
  agence?: string,
  dayfrom?: string,
  dayto?: string
) => {
  try {
    //console.log(`${process.env.API_URL}/fonction`);
    const cookieStore = cookies();
    const session = cookieStore.get("session");
    axios.defaults.baseURL = `https://sprint2-two.vercel.app`;
    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;

    console.log(
      `https://sprint2-two.vercel.app/lettre/getlettre?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    );

    console.log("data lettre/////////////////////////////////////////////////////////////////////");
    const res = await axios.get<any>(
      `https://sprint2-two.vercel.app/lettre/getlettre?page&perPage&search&groupe&agence&from&to`
    );

    console.log("data lettre/////////////////////////////////////////////////////////////////////");
    console.log(res);
    return res.data as any;
  } catch (error) {
    return {} as Main;
  }
};

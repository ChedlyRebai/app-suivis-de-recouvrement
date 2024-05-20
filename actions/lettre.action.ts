"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";
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

    const res = await axios.get<any>(
      `http://localhost:10001/lettre/getlettre?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    );

    // revalidatePath("/lettre-recouvrement");
    return res.data as any;
  } catch (error) {
    return {} as Main;
  }
};

export const updateEtatLetttre = async (
  ncp: string,
  etat_lettre?: string
): Promise<any> => {
  try {
    const res = await axios.put(
      `http://localhost:10001/lettre/updatelettre?ncp=${ncp}`,
      { etat: etat_lettre }
    );
    console.log(res.data);

    revalidatePath("/lettre-recouvrement");
    return res.data as any;
  } catch (error) {
    console.log(error);
    return {} as any;
  }
};

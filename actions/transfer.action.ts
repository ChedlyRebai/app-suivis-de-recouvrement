"use server";

import { Cxuntges } from "@/Models/Cxuntges.model";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const getTypeTransfer = async (): Promise<Cxuntges[]> => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get<Cxuntges[]>(
      `https://release3-v2.vercel.app/client/typetransfer`
    );
    revalidatePath("/");
    return response.data || ([] as Cxuntges[]);
  } catch (error) {
    console.log(error);
    return [] as Cxuntges[];
  }
};

export const updateTransferAnti = async (
  cli: string,
  column: any,
  data: any
): Promise<any> => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const cookieStore = cookies();
    const session = cookieStore.get("session");
    axios.defaults.baseURL = `https://release3-v2.vercel.app`;
    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;

    const response = await axios.put<any>(
      `https://release3-v2.vercel.app/transfer/updatetrans?cli=${cli}`,
      { data: data, column: column }
    );

    return response.data || ([] as any);
  } catch (error) {
    console.log(error);
    return [] as any;
  }
};

export const updatedemandeprolongation = async (
  cli: string,
  column: any,
  data: any
): Promise<any> => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const cookieStore = cookies();
    const session = cookieStore.get("session");
    axios.defaults.baseURL = `http://localhost:10001`;
    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;
    const newdata = data == true ? "O" : "N";
    const response = await axios.put<any>(
      `https://release3-v2.vercel.app/prolongation/updateprolongation?cli=${cli}`,
      { data: newdata, column: column }
    );
    revalidatePath("/");
    return response.data || ([] as any);
  } catch (error) {
    console.log(error);
    return [] as any;
  }
};

export const updateTransfer = async (
  mott: string,
  obs: string,
  id: string | number | undefined,
  trf_a: string
) => {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");
    axios.defaults.baseURL = `https://release3-v2.vercel.app`;
    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;
    const res = await axios.put(
      `https://release3-v2.vercel.app/transfer/update?id=${id}`,
      { mott, obs, id, trf_a }
    );
    console.log("res prolongationnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", res);
    revalidatePath("/");
    return { data: res.data, status: res.status } || ({} as any);
  } catch (error) {
    return {} as any;
  }
};

export const validateTransfer = async (
  id: string | undefined,
  validation: string
) => {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");
    axios.defaults.baseURL = `https://release3-v2.vercel.app`;
    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;
    const res = await axios.put(
      `https://release3-v2.vercel.app/transfer/validate?id=${id}`,
      { id, trf_propose_v: validation }
    );
    revalidatePath("/");
    console.log("res prolongation validate", res);
    return { data: res.data, status: res.status } || ({} as any);
  } catch (error) {
    return {} as any;
  }
};

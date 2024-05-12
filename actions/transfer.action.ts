"use server";

import { Cxuntges } from "@/Models/Cxuntges.model";
import axios from "axios";
import { cookies } from "next/headers";

export const getTypeTransfer = async (): Promise<Cxuntges[]> => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get<Cxuntges[]>(
      `http://localhost:10001/client/typetransfer`
    );
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
    axios.defaults.baseURL = `http://localhost:10001`;
    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;

    const response = await axios.put<any>(
      `http://localhost:10001/transfer/updatetrans?cli=${cli}`,
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

    const response = await axios.put<any>(
      `http://localhost:10001/prolongation/updatedemandeprolongation?cli=${cli}`,
      { data: data, column: column }
    );

    return response.data || ([] as any);
  } catch (error) {
    console.log(error);
    return [] as any;
  }
};

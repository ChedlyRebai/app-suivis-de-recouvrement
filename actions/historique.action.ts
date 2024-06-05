"use server";
import { fonction } from "@/Models/fonction.model";
import { Historique } from "@/Models/historique.model";
import axios from "axios";
import { revalidatePath } from "next/cache";
export interface Main {
  result: Historique[];
  totalCount: number;
  totalPages: number;
}
export const getAllHistorique = async (
  currentpage?: number,
  perpage?: number,
  search?: string
): Promise<Main> => {
  try {
    const res = await axios.get<Main>(
      `https://release4.vercel.app/historique/all?perpage=${perpage}&page=${currentpage}&search=${search}`
    );
    console.log(res.data);
    revalidatePath("/files");
    return (res.data as Main) || ({} as Main);
  } catch (error) {
    console.log(error);
    return {} as Main;
  }
};

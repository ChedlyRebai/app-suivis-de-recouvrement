"use server";

import { droit_accees } from "@/Models/droit_accees.model";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const getAllDroitAccess = async () => {
  console.log(`${process.env.API_URL}/droit`);
  const res = await axios.get(`https://sprint2-v2.vercel.app/droit`);
  return res.data;
};

export const getDroitAccessByCodeFonction = async (
  code: string,
  currentpage?: number,
  perpage?: number,
  search?: string
) => {
  console.log(
    `${process.env.API_URL}/droit/getByCodeFunc?codeFunction=${code}&page=${currentpage}&perPage=${perpage}&search=${search}`
  );
  console.log(`${process.env.API_URL} `);
  const res = await axios.get(
    `https://sprint1-v2-beta.vercel.app/droit/getByCodeFunc?codeFunction=${code}&page=${currentpage}&perPage=${perpage}&search=${search}`
  );
  return res.data;
};
export const getFonctionName = async (codef: string) => {
  try {
    //console.log(`${process.env.API_URL}/droit/updateDroit`);
    const res = await axios.get(
      `https://sprint1-v2-beta.vercel.app/droit/getFonctionByCode?codef=${codef}`
    );
    return res.data || "";
  } catch (error) {
    return "";
  }
};
//localhost:10000/droit/updateDroit
export const updateDroitAction = async (
  id: number,
  codef: number,
  value: string,
  champ: string
) => {
  //console.log(`${process.env.API_URL}/droit/updateDroit`);
  const res = await axios.put(
    `https://sprint1-v2-beta.vercel.app/droit/updateDroit`,
    {
      id,
      codef,
      value,
      champ,
    }
  );
  // ;
  // console.log(id);
  // ;
  revalidatePath("/");
  return { data: res.data, ok: res.status };
};

export const createDroit = async (
  nom: string,
  nom_module: string,
  code_fonction: string,
  suppression: string,
  modification: string,
  creation: string,
  acces: string
) => {
  console.log(`${process.env.API_URL}/droit/addDroit`);
  try {
    const res = await axios.post(`${process.env.API_URL}/droit/addDroit`, {
      nom,
      nom_module,
      code_fonction,
      acces,
      creation,
      modification,
      suppression,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

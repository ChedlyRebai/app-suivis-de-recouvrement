"use server";

import { droit_accees } from "@/Models/droit_accees.model";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const getAllDroitAccess = async () => {
  console.log(`${process.env.API_URL}/droit`);
  const res = await axios.get(`https://amenbankapi.vercel.app/droit`);
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
    `https://amenbankapi.vercel.app/droit/getByCodeFunc?codeFunction=${code}&page=${currentpage}&perPage=${perpage}&search=${search}`
  );
  return res.data;
};

//localhost:10000/droit/updateDroit
export const updateDroitAction = async (
  id: number,
  codef: number,
  value: string,
  champ: string
) => {
  //console.log(`${process.env.API_URL}/droit/updateDroit`);
  const res = await axios.put(`${process.env.API_URL}/droit/updateDroit`, {
    id,
    codef,
    value,
    champ,
  });
  // console.log(res.data);
  // console.log(id);
  // console.log(res.data);
  return res.data;
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
    // console.log(
    //   nom,
    //   nom_module,
    //   suppression,
    //   modification,
    //   creation,
    //   acces,
    //   code_fonction
    // );

    const res = await axios.post(`${process.env.API_URL}/droit/addDroit`, {
      nom,
      nom_module,
      code_fonction,
      acces,
      creation,
      modification,
      suppression,
    });
    // console.log(nom, nom_module, suppression, modification, creation, acces);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

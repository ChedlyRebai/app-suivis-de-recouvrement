"use server";
import { fonction } from "@/Models/fonction.model";
import { Historique } from "@/Models/historique.model";
import axios from "axios";

export const getAllHistorique = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const res = await axios.get<Historique[]>(
      `http://localhost:10001/historique/all`
    );
    return res.data || ([] as Historique[]);
  } catch (error) {
    console.log(error);
    return [] as Historique[];
  }
};

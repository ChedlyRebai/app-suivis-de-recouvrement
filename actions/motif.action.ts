"use server ";

import { Cxuntges } from "@/Models/Cxuntges.model";
import { ab_cxrepenv } from "@/Models/ab_cxrepenv.model";
import axios from "axios";

export const getMotif = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get<ab_cxrepenv[]>(
      `http://localhost:10001/client/motif`
    );
    return response.data || [] as ab_cxrepenv[];
  } catch (error) {
    console.log(error);
    return [] as ab_cxrepenv[];
  }
};

export const getMotifCommercial = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get<ab_cxrepenv[]>(
      `http://localhost:10001/client/motifcommercial`
    );
    return response.data || [] as ab_cxrepenv[];
  } catch (error) {
    console.log(error);
    return [] as ab_cxrepenv[];
  }
}
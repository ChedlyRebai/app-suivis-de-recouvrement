"use server ";

import { Cxuntges } from "@/Models/Cxuntges.model";
import { ab_cxrepenv } from "@/Models/ab_cxrepenv.model";
import axios from "axios";

export const getMotif = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get<ab_cxrepenv[]>(
      `https://release2.vercel.app/client/motifs`
    );
    console.log(response.data);
    return response.data || ([] as ab_cxrepenv[]);
  } catch (error) {
    console.log(error);
    return [] as ab_cxrepenv[];
  }
};

export const MOTT = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get<ab_cxrepenv[]>(
      `https://release3-v2.vercel.app/client/motif`
    );
    console.log(response.data);
    return (response.data as any[]) || ([] as any[]);
  } catch (error) {
    console.log(error);
    return [] as any[];
  }
};
export const getMotifCommercial = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get<ab_cxrepenv[]>(
      `https://release3-v2.vercel.app/client/motifcommercial`
    );

    return response.data || ([] as ab_cxrepenv[]);
  } catch (error) {
    console.log(error);
    return [] as ab_cxrepenv[];
  }
};

export const VTRF = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get<any[]>(
      `https://release3-v2.vercel.app/transfer/vtrf`
    );

    return response.data || ([] as any[]);
  } catch (error) {
    console.log(error);
    return [] as any[];
  }
};

export const getHrdv = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get<Cxuntges[]>(
      `http://localhost:10001/client/gethrdv`
    );

    return response.data || ([] as Cxuntges[]);
  } catch (error) {
    console.log(error);
    return [] as Cxuntges[];
  }
};

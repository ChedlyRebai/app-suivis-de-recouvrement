"use server ";

import { Cxuntges } from "@/Models/Cxuntges.model";
import axios from "axios";

interface Main {
  code: number;
  libelle: string;
}

export const getMotif = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get<Main[]>(
      `https://release2.vercel.app/client/motifs`
    );
    return response.data || ([] as Main[]);
  } catch (error) {
    console.log(error);
    return [] as Main[];
  }
};

export const getcontact = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get<Main[]>(
      `https://release2.vercel.app/client/contact`
    );
    return response.data || ([] as Main[]);
  } catch (error) {
    console.log(error);
    return [] as Main[];
  }
};

export const getappreciation = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get<Main[]>(
      `https://release2.vercel.app/client/appreciation`
    );

    return response.data || ([] as Main[]);
  } catch (error) {
    console.log(error);
    return [] as Main[];
  }
};

export const gethrdv = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get<Main[]>(
      `https://release2.vercel.app/client/gethrdv`
    );

    return response.data || ([] as Main[]);
  } catch (error) {
    console.log(error);
    return [] as Main[];
  }
};


export const getcomptrendutypes = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get<Cxuntges[]>(
      `https://release2.vercel.app/compterendu/compterendutypes`
    );

    return response.data || ([] as Main[]);
  } catch (error) {
    console.log(error);
    return [] as Main[];
  }
};
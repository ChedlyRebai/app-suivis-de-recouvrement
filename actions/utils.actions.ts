"use server ";

import { Cxuntges } from "@/Models/Cxuntges.model";
import { ab_cxrepenv } from "@/Models/ab_cxrepenv.model";
import axios from "axios";


interface Main {
    condeen:number;
    libelle:string;
}

export const getMotif = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get<Main[]>(
      `http://localhost:10001/client/motifs`
    );
    return response.data || ([] as Main[]);
  } catch (error) {
    console.log(error);
    return [] as Main[];
  }
};

export const getlisteChoix = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get<Main[]>(
      `http://localhost:10001/client/listechoix`
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
      `http://localhost:10001/client/appreciation`
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
        `http://localhost:10001/client/gethrdv`
      );
  
      return response.data || ([] as Main[]);
    } catch (error) {
      console.log(error);
      return [] as Main[];
    }
  };
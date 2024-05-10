import { CompteRenduList } from "@/constants/types";
import axios from "axios";
export interface Main {
    CompteRendu: CompteRenduList[];
    totalCount:  number;
    totalPages:  number;
}
export const getAllCompteRendu = async (page:any=1,perpage:any=4,search:string) => {
    try {
        // axios.defaults.baseURL = `${process.env.API_URL}`;
        const res = await axios.get<Main>(
          `http://localhost:10001/compterendu/all?page=${page}&perpage=8`
        );

        return res.data || {} as Main ;
      } catch (error) {
        return {} as Main ;
      }
}

export const getCompteRenduById = async (IdClient?: string | number) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const res = await axios.get<CompteRenduList>(
      `http://localhost:10001/compterendu/getbyid/${IdClient}`
    );

    return res.data || {} as CompteRenduList;
  } catch (error) {
    return {} as CompteRenduList;
  }
};


export const getCompteRenduByClientId = async (IdClient?: string | number) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const res = await axios.get<any>(
      `http://localhost:10001/compterendu/byclientid?id=${IdClient}`
    );

    return res.data || {} as any;
  } catch (error) {
    return {} as any;
  }
};


export const deleteCompteRenduById = async (idCompRendu: Number | string) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const res = await axios.delete(
      `http://localhost:10001/compterendu/deleteById?id=${idCompRendu}`
    );
    return res.data ;
  } catch (error) {
    return {} as any;
  }
}
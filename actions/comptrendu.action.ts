import { CompteRenduList } from "@/constants/types";
import axios from "axios";

export const getAllCompteRendu = async (page:any,perpage:any,search:string) => {
    try {
        axios.defaults.baseURL = `${process.env.API_URL}`;
        const res = await axios.get<CompteRenduList>(
          `http://localhost:10001/compterendu/all?page=${page}&perpage=${perpage}&search=${search}`
        );
        console.log("66666666666666666666666666666666666666666666666666666666666666");
        console.log(res.data);
        console.log("66666666666666666666666666666666666666666666666666666666666666");
        return res.data || {} as CompteRenduList;
      } catch (error) {
        return {} as CompteRenduList;
      }
}

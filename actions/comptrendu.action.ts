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

        console.log("66666666666666666666666666666666666666666666666666666666666666");
        console.log(res.data);
        console.log("66666666666666666666666666666666666666666666666666666666666666");
        return res.data || {} as Main ;
      } catch (error) {
        return {} as Main ;
      }
}

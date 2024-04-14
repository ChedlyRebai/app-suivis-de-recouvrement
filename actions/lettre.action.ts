import axios from "axios";
import { cookies } from "next/headers";
export interface Main {
    result: any[];
    totalCount: number;
    totalPages: number;
    total: Total;
  }
  
  export interface Total {
    mnt_imp: string;
    depassement: string;
    tot_creance: string;
    engagement: string;
  }
export const getLettre = async (
    IdClient?: string,
    currentpage?: number,
    perpage?: number,
    groupe?: string,
    agence?: string,
    dayfrom?: string,
    dayto?: string
  ) => {
    try {
    //console.log(`${process.env.API_URL}/fonction`);
    const cookieStore = cookies();
    const session = cookieStore.get("session");
    axios.defaults.baseURL = `http://localhost:10001`;
    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;
    
    console.log(`http://localhost:10001/lettre/getlettre?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`);

    const res = await axios.get<Main>(
      `http://localhost:10001/lettre/getlettre?page=${currentpage}&groupe=${groupe}&agence=${agence}&perPage=${perpage}&search=${IdClient}&from=${dayfrom}&to=${dayto}`
    );
    
    console.log("revalidate")
     return res.data as Main;
    } catch (error) {
      return {} as Main;
    }
  };
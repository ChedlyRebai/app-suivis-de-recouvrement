import axios from "axios";

export const getCompteByClientId = async (IdClient?: string | number) => {
    try {
      axios.defaults.baseURL = `${process.env.API_URL}`;
      const res = await axios.get<any>(
        `http://localhost:10001/comptes/allbyid?id=${IdClient}`
      );
  
      return res.data || {} as any;
    } catch (error) {
      return {} as any;
    }
  };
  
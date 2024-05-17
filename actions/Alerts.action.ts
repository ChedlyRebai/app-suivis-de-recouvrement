import axios from "axios";

export interface AlertsMain {
  alertes: Alerte[];
  totalCount: number;
  totalPages: number;
}

export interface Alerte {
  message: string;
  id: number;
  rapportid: number | null;
  rapporttype: number | null;
  ab_client: AbClient | null;
  compterendutype: Compterendutype | null;
}

export interface AbClient {
  cli: string;
  Agence: Agence;
  Zone: Zone;
  nom: string;
  tel1: string;
  tel2: null;
  email: string;
}

export interface Agence {
  codug: number;
  libelle: string;
  codugz: number;
}

export interface Zone {
  libelle: string;
  codugr: number;
  codug: number;
}

export interface Compterendutype {
  types: Types;
}

export interface Types {
  libelle: string;
}

export const getAllAlerts = async (
  page: any = 1,
  perpage: any = 4,
  search: string
) => {
  try {
    // axios.defaults.baseURL = `${process.env.API_URL}`;
    const res = await axios.get<AlertsMain>(
      `http://localhost:10001/alerts/all?page=${page}&perpage=8&search=${search}`
    );

    return res.data || ({} as AlertsMain);
  } catch (error) {
    return {} as AlertsMain;
  }
};

export const getAlerteById = async (id: number) => {
  try {
    // axios.defaults.baseURL = `${process.env.API_URL}`;
    const res = await axios.get<Alerte>(
      `http://localhost:10001/alerts/byid/${id}`
    );

    return res.data || ({} as Alerte);
  } catch (error) {
    return {} as Alerte;
  }
};

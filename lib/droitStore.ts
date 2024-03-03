import {
  getAllDroitAccess,
  getDroitAccessByCodeFonction,
  updateDroitAccessById,
} from "@/actions/droit_accees.action";
import { droit_accees } from "@/Models/droit_accees.model";
import { fonction } from "@/Models/fonction.model";
import { object } from "zod";
import create from "zustand";

export type State = {
  droitAccess: droit_accees[];
  fetchAllDroitAccess: () => Promise<void>;
  fetchDroitAccessByCodeFonction: (code: string) => Promise<void>;
  updateDroitAccessById: (
    id: number,
    suppression: string,
    modification: string,
    creation: string,
    acces: string
  ) => Promise<void>;
  creatDroit: (
    nom: string,
    nom_module: string,
    suppression: string,
    modification: string,
    creation: string,
    acces: string
  ) => void;
};

const useStore = create<State>((set) => ({
  droitAccess: [],
  fetchAllDroitAccess: async () => {
    const data = await getAllDroitAccess();
    set({ droitAccess: data });
  },
  fetchDroitAccessByCodeFonction: async (code: string) => {
    const data = await getDroitAccessByCodeFonction(code);
    set({ droitAccess: data });
    return data;
  },

  updateDroitAccessById: async (
    id: number,
    suppression: string,
    modification: string,
    creation: string,
    acces: string
  ) => {
    const data = await updateDroitAccessById(
      id,
      suppression,
      modification,
      creation,
      acces
    );
    set((state: any) => {
      const updatedDroitAccess = state.droitAccess.map((item: any) =>
        item.id === id ? data : item
      );
      return { droitAccess: updatedDroitAccess };
    });
  },
  creatDroit(
    nom: string,
    nom_module: string,
    suppression: string,
    modification: string,
    creation: string,
    acces: string
  ) {
    set((state: any) => {
      return {};
    });
  },
}));

export default useStore;

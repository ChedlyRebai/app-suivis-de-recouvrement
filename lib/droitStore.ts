export type Actions = {
  addDroit: () => void;
  deleteDroit: (id: string) => void;
  updateDroit: () => void;
  createDroit: () => void;
};

import {
  getAllDroitAccess,
  getDroitAccessByCodeFonction,
  updateDroitAccessById,
} from "@/actions/droit_accees.action";
import { object } from "zod";
import create from "zustand";

const useStore = create((set) => ({
  droitAccess: [],
  fetchAllDroitAccess: async () => {
    const data = await getAllDroitAccess();
    set({ droitAccess: data });
  },
  fetchDroitAccessByCodeFonction: async (code: string) => {
    const data = await getDroitAccessByCodeFonction(code);
    set({ droitAccess: data });
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
}));

export default useStore;

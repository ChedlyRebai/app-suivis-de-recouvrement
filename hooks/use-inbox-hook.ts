import Comp from "@/app/[locale]/test2/_component/comp";
import { CompteRenduList } from "@/constants/types";
import { create } from "zustand";

interface InboxStore {
  Comptrendu: CompteRenduList;

  setComptrendu: (Comptrendu: CompteRenduList) => void;
}

const useEditDroit = create<InboxStore>((set) => ({
  Comptrendu: {} as CompteRenduList,

  setComptrendu: (Comptrendu: CompteRenduList) =>
    set({ Comptrendu: Comptrendu }),
}));

export default useEditDroit;

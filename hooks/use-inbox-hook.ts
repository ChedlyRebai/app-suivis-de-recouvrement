import Comp from "@/app/[locale]/test2/_component/comp";
import { CompteRenduList } from "@/constants/types";
import { create } from "zustand";

interface InboxStore {
  Comptrendu: CompteRenduList;
id : number;
  setComptrendu: (Comptrendu: CompteRenduList) => void;
    setId: (id: number) => void;
}

const useInbox = create<InboxStore>((set) => ({
  id:0,
  setId: (id: number) => set({ id }),
  Comptrendu: {} as CompteRenduList,
  setComptrendu: (Comptrendu: CompteRenduList) =>
    set({ Comptrendu: Comptrendu }),
}));

export default useInbox;

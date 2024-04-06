import { SuiviAgenda } from "@/Models/SuiviAgenda.model";
import { create } from "zustand";

interface CompteRenduModalStore {
  id:number;
  isOpen: boolean;
  onOpen: (id:number) => void;
  onClose: () => void;
}

const useCompteRenduModal = create<CompteRenduModalStore>((set) => ({
  id:0,
  isOpen: false,
  onOpen: (id:number) => set({ isOpen: true, id: id}),
  onClose: () => set({ isOpen: false }),
}));

export default useCompteRenduModal;

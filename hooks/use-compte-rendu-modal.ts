import { SuiviAgenda } from "@/Models/SuiviAgenda.model";
import { create } from "zustand";

interface CompteRenduModalStore {
  suiviAgenda:SuiviAgenda;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCompteRenduModal = create<CompteRenduModalStore>((set) => ({
  suiviAgenda: {} as SuiviAgenda,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCompteRenduModal;

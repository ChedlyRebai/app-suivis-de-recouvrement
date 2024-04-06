import { SuiviAgenda } from "@/Models/SuiviAgenda.model";
import { create } from "zustand";

interface CompteRenduModalStore {
  suiviAgenda:SuiviAgenda;
  isOpen: boolean;
  onOpen: (suiviAgenda:SuiviAgenda) => void;
  onClose: () => void;
}

const useCompteRenduModal = create<CompteRenduModalStore>((set) => ({
  suiviAgenda: {} as SuiviAgenda,
  isOpen: false,
  onOpen: (suiviAgenda:SuiviAgenda) => set({ isOpen: true, suiviAgenda: suiviAgenda}),
  onClose: () => set({ isOpen: false }),
}));

export default useCompteRenduModal;

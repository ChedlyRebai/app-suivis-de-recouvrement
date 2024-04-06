import { create } from "zustand";

interface CompteRenduModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCompteRenduModal = create<CompteRenduModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCompteRenduModal;

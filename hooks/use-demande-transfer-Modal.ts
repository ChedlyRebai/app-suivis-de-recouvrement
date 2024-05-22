import { create } from "zustand";

interface DemandeTransferModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDemandeTransfernModal = create<DemandeTransferModalStore>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDemandeTransfernModal;

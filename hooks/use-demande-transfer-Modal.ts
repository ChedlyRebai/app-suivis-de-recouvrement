import { create } from "zustand";

interface DemandeTransferModalStore {
  id?: string | number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDemandeTransfernModal = create<DemandeTransferModalStore>((set) => ({
  id: undefined,
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDemandeTransfernModal;

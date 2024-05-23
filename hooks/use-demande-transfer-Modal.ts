import { create } from "zustand";

interface DemandeTransferModalStore {
  id?: string | number;
  isOpen: boolean;
  setId: (id: string | number) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useDemandeTransfernModal = create<DemandeTransferModalStore>((set) => ({
  id: undefined,
  isOpen: false,
  setId: (id) => set({ id }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDemandeTransfernModal;

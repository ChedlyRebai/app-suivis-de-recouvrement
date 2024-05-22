import { create } from "zustand";

interface ValidationTrnasferModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useValidationTransferModal = create<ValidationTrnasferModalStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

export default useValidationTransferModal;

import { create } from "zustand";

interface ValidationTrnasferModalStore {
  id?: string | number;
  isOpen: boolean;
  onOpen: () => void;
  setId: (id: string | number) => void;
  onClose: () => void;
}

const useValidationTransferModal = create<ValidationTrnasferModalStore>(
  (set) => ({
    id: undefined,
    setId: (id: string | number) => set({ id }),
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

export default useValidationTransferModal;

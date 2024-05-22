import { create } from "zustand";

interface ValidationProlongationModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useValidationProlongationModal = create<ValidationProlongationModalStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

export default useValidationProlongationModal;

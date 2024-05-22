import { create } from "zustand";

interface ValidationProlongationModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useValidationProlongationModal = create<ValidationProlongationModalStore>(
  (set) => ({
    isOpen: true,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

export default useValidationProlongationModal;

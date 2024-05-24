import { create } from "zustand";

interface ValidationProlongationModalStore {
  isOpen: boolean;
  id: string | undefined;
  setId: (id: string) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useValidationProlongationModal = create<ValidationProlongationModalStore>(
  (set) => ({
    id: undefined,
    setId: (id) => set({ id }),
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

export default useValidationProlongationModal;

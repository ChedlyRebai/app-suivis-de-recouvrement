import { create } from "zustand";

interface ValidationProlongationModalStore {
  isOpen: boolean;
  id: string | undefined;
  Motif: string | undefined;
  commentaire: string | undefined;
  setMotifCommentaire: (Motif: string, commentaire: string) => void;
  setId: (id: string) => void;
  onOpen: () => void;
  onClose: () => void;
  creationAcces: boolean;
  setCreationAcces: (creationAcces: boolean) => void;
}

const useValidationProlongationModal = create<ValidationProlongationModalStore>(
  (set) => ({
    commentaire: undefined,
    Motif: undefined,
    id: undefined,
    setMotifCommentaire: (Motif = "", commentaire = "") =>
      set({ Motif, commentaire }),
    setId: (id) => set({ id }),
    isOpen: false,
    creationAcces: false,
    setCreationAcces: (creationAcces) => set({ creationAcces }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

export default useValidationProlongationModal;

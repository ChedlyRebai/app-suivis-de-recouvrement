import { create } from "zustand";

interface ValidationTrnasferModalStore {
  isOpen: boolean;
  id: string | undefined;
  Motif: string | undefined;
  commentaire: string | undefined;
  setMotifCommentaire: (Motif: string, commentaire: string) => void;
  setId: (id: string) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useValidationTransferModal = create<ValidationTrnasferModalStore>(
  (set) => ({
    commentaire: undefined,
    Motif: undefined,
    id: undefined,
    setMotifCommentaire: (Motif = "", commentaire = "") =>
      set({ Motif, commentaire }),
    setId: (id) => set({ id }),
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

export default useValidationTransferModal;

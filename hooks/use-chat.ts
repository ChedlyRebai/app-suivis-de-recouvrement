import { SuiviAgenda } from "@/Models/SuiviAgenda.model";
import { create } from "zustand";

interface ChatUiBubblelStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useChatUiBubble = create<ChatUiBubblelStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useChatUiBubble;

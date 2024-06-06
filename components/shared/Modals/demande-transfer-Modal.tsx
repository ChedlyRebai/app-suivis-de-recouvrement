"use client";

import useDemandeProlongationModal from "@/hooks/use-demande-prolongation-Modal";
import Modal from "./Modal";
import { useDemandeTransfernModal } from "@/hooks/use-demande-transfer-Modal";
import DemandeTransferForm from "@/components/forms/demandeTransferForm";
type Props = {
  motif: any[];
  typeTransfer: any[];
};
const DemandeTransfernModal = ({ motif, typeTransfer }: Props) => {
  const { isOpen, onOpen, onClose } = useDemandeTransfernModal();
  return (
    <Modal
      title="Demande de transfert Anticipé"
      description="Veuillez remplir le formulaire ci-dessous pour demander un transfert anticipé."
      isOpen={isOpen}
      onChange={onClose}
    >
      <DemandeTransferForm motif={motif} typeTransfer={typeTransfer} />
    </Modal>
  );
};

export default DemandeTransfernModal;

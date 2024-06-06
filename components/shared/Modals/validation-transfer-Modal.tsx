"use client";

import useDemandeProlongationModal from "@/hooks/use-demande-prolongation-Modal";
import Modal from "./Modal";

import useValidationTransferModal from "@/hooks/use-validation-transfer-modal";
import ValidationTransferForm from "@/components/forms/ValidationTransferForm";

type ValidationTransferModalProps = {
  // Define props type here
  motifs: any[];
  validationTransfer: any[];
};
const ValidationTransferModal = ({
  motifs,
  validationTransfer,
}: ValidationTransferModalProps) => {
  const { isOpen, onOpen, onClose } = useValidationTransferModal();
  return (
    <Modal
      title="Validation du transfert anticipé"
      description="Veuillez remplir le formulaire ci-dessous pour valider le transfert anticipé."
      isOpen={isOpen}
      onChange={onClose}
    >
      <ValidationTransferForm motifs={motifs} validation={validationTransfer} />
    </Modal>
  );
};

export default ValidationTransferModal;

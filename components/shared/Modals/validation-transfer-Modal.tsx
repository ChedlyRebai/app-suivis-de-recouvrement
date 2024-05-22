"use client";

import useDemandeProlongationModal from "@/hooks/use-demande-prolongation-Modal";
import Modal from "./Modal";
import useDemandeTransfernModal from "@/hooks/use-demande-transfer-Modal";
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
      title="Actualisez vos droits d'accès"
      description="Trouvez et mettez à jour vos fonctions en quelques clics"
      isOpen={isOpen}
      onChange={onClose}
    >
      <ValidationTransferForm
        motifs={motifs}
        validationTransfer={validationTransfer}
      />
    </Modal>
  );
};

export default ValidationTransferModal;

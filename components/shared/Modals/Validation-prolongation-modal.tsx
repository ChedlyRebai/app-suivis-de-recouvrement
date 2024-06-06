"use client";

import useDemandeProlongationModal from "@/hooks/use-demande-prolongation-Modal";
import Modal from "./Modal";

import useValidationProlongationModal from "@/hooks/use-validation-prolongation-modal";
import ValidationProlonagationForm from "@/components/forms/ValidationProlongationForm";
type ValidationTransferModalProps = {
  // Define props type here
  motifs: any[];
  validationTransfer: any[];
};
const ValidationProlonagationnModal = ({
  motifs,
  validationTransfer,
}: ValidationTransferModalProps) => {
  const { isOpen, onOpen, onClose } = useValidationProlongationModal();
  return (
    <Modal
      title="Validation de la prolongation"
      description="Veuillez remplir le formulaire ci-dessous pour valider la prolongation."
      isOpen={isOpen}
      onChange={onClose}
    >
      <ValidationProlonagationForm
        motifs={motifs}
        validation={validationTransfer}
      />
    </Modal>
  );
};

export default ValidationProlonagationnModal;

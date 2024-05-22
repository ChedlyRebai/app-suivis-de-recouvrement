"use client";

import useDemandeProlongationModal from "@/hooks/use-demande-prolongation-Modal";
import Modal from "./Modal";
import useDemandeTransfernModal from "@/hooks/use-demande-transfer-Modal";
import useValidationProlongationModal from "@/hooks/use-validation-prolongation-modal";
import ValidationProlonagationForm from "@/components/forms/ValidationProlongationForm";

const ValidationProlonagationnModal = () => {
  const { isOpen, onOpen, onClose } = useValidationProlongationModal();
  return (
    <Modal
      title="Actualisez vos droits d'accès"
      description="Trouvez et mettez à jour vos fonctions en quelques clics"
      isOpen={isOpen}
      onChange={onClose}
    >
      <ValidationProlonagationForm />
    </Modal>
  );
};

export default ValidationProlonagationnModal;

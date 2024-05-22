"use client";

import useDemandeProlongationModal from "@/hooks/use-demande-prolongation-Modal";
import Modal from "./Modal";
import useDemandeTransfernModal from "@/hooks/use-demande-transfer-Modal";
import DemandeTransferForm from "@/components/forms/demandeTransferForm";

const DemandeTransfernModal = () => {
  const { isOpen, onOpen, onClose } = useDemandeTransfernModal();
  return (
    <Modal
      title="Actualisez vos droits d'accès"
      description="Trouvez et mettez à jour vos fonctions en quelques clics"
      isOpen={isOpen}
      onChange={onClose}
    >
      <DemandeTransferForm />
    </Modal>
  );
};

export default DemandeTransfernModal;

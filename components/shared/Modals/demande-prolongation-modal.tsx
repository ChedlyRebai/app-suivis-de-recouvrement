"use client";

import useDemandeProlongationModal from "@/hooks/use-demande-prolongation-Modal";
import Modal from "./Modal";

const DemandeProlonagationModal = () => {
  const { isOpen, onOpen, onClose } = useDemandeProlongationModal();
  return (
    <Modal
      title="Actualisez vos droits d'accès"
      description="Trouvez et mettez à jour vos fonctions en quelques clics"
      isOpen={isOpen}
      onChange={onClose}
    >
      edit
    </Modal>
  );
};

export default DemandeProlonagationModal;

"use client";

import useDemandeProlongationModal from "@/hooks/use-demande-prolongation-Modal";
import Modal from "./Modal";
import DemandeProlongationForm from "@/components/forms/demandeProlongationForm";

const DemandeProlonagationModal = ({ motifs }: { motifs: any[] }) => {
  const { isOpen, onOpen, onClose } = useDemandeProlongationModal();
  return (
    <Modal
      title="Actualisez vos droits d'accès"
      description="Trouvez et mettez à jour vos fonctions en quelques clics"
      isOpen={isOpen}
      onChange={onClose}
    >
      <DemandeProlongationForm motifs={motifs} />
    </Modal>
  );
};

export default DemandeProlonagationModal;

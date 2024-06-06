"use client";

import useDemandeProlongationModal from "@/hooks/use-demande-prolongation-Modal";
import Modal from "./Modal";
import DemandeProlongationForm from "@/components/forms/demandeProlongationForm";

const DemandeProlonagationModal = ({ motifs }: { motifs: any[] }) => {
  const { isOpen, onOpen, onClose } = useDemandeProlongationModal();
  return (
    <Modal
      title="Demander une prolongation"
      description="Veuillez remplir le formulaire ci-dessous pour demander une prolongation."
      isOpen={isOpen}
      onChange={onClose}
    >
      <DemandeProlongationForm motifs={motifs} />
    </Modal>
  );
};

export default DemandeProlonagationModal;

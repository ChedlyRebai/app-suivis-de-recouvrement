"use client";

import Modal from "./Modal";
import useInvalidCredentialModal from "@/hooks/useInvalidCredential";

import { Button } from "@/components/ui/button";

const InvalidCredentialModal = () => {
  const { isOpen, onOpen, onClose, textError } = useInvalidCredentialModal();
  console.log("invelid");
  return (
    <Modal
      title="Les informations d'identification invalides"
      description={textError}
      isOpen={isOpen}
      onChange={onClose}
    >
      <div className="w-full justify-end">
        <Button
          type="button"
          className="w-1/3 end-0 float-right"
          onClick={onClose}
        >
          OK
        </Button>
      </div>
    </Modal>
  );
};

export default InvalidCredentialModal;

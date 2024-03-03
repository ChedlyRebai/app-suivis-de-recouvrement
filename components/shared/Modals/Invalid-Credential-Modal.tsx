"use client";

import Modal from "./Modal";
import useInvalidCredentialModal from "@/hooks/useInvalidCredential";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const InvalidCredentialModal = () => {
  const { isOpen, onOpen, onClose } = useInvalidCredentialModal();
  console.log("invelid");
  return (
    <Modal
      title="Les informations d'identification invalides"
      description="Vérifiez votre Matricule et votre mot de passe et réessayez"
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

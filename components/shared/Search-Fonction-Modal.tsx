"use client";
import React from "react";
import Modal from "./Modal";
import useAuthModal from "@/hooks/use-fonction-search-modal";
import { Button } from "../ui/button";
import { getAllDroitAccess } from "@/actions/droit_accees.action";
import { DataTable } from "@/app/(root)/access-management/_component/data-table";
import { columns } from "@/app/(root)/access-management/_component/columns";
import { droit_accees } from "@/Models/droit_accees.model";

const SearchFonctionModal = () => {
  const { onClose, isOpen } = useAuthModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Welcome back"
      description="Login to your account."
      isOpen={isOpen}
      onChange={onClose}
    >
      s
    </Modal>
  );
};

export default SearchFonctionModal;

"use client";
import { Button } from "@/components/ui/button";
import useUploadFileModal from "@/hooks/use-UploadFile-Modal";
import { ListPlusIcon } from "lucide-react";
import React from "react";

type OpenModelButtonProps = {
  access?: boolean;
};
const OpenModelButton = ({ access }: OpenModelButtonProps) => {
  const { onOpen } = useUploadFileModal();
  console.log(access, ":button");
  return (
    <Button disabled={access} onClick={onOpen} variant="default" className="">
      <ListPlusIcon className="mr-2 h-4 w-4" />
      Ajouter un document
    </Button>
  );
};

export default OpenModelButton;

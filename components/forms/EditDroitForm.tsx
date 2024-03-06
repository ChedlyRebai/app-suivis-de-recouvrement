"use client";

import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

import { useState } from "react";
import useEditDroit from "@/hooks/use-edit-droit-modal";
import { updateDroitAccessById } from "@/actions/droit_accees.action";
import { CircleIcon, XIcon } from "lucide-react";
import { Label } from "../ui/label";
import useStore from "@/lib/droitStore";

interface EditDoitProps {
  id: string;
  acces: string;
  suppression: string;
  modification: string;
  creation: string;
}

const FormSchema = z.object({
  email: z.string({
    required_error: "Please select an email to display.",
  }),
});

const EditDroitForm = () => {
  const {
    onClose,
    id,
    setAccess,
    setCreation,
    setModification,
    setSuppresion,
    suppression,
    acces,
    modification,
    creation,
  } = useEditDroit();
  function onSubmi(data: z.infer<typeof FormSchema>) {}

  const valueChange = (n: string) => {
    setAccess(n);
    console.log(n);
    console.log(acces);
  };

  const editDroit = useStore((state) => state.updateDroitAccessById);
  const onSubmit = async () => {
    onClose();
    toast.promise(
      editDroit(parseInt(id), suppression, modification, creation, acces),
      {
        loading: "Saving...",
        success: <b>saved!</b>,
        error: <b>Could not save.</b>,
      }
    );
    /* const response = await updateDroitAccessById(
      parseInt(id),
      suppression,
      modification,
      creation,
      acces
    );
    
    if (response) {
      console.log(response);
      toast.success("Mis à jour avec succés");
      onClose();
    }*/
  };

  return (
    <div className="grid gap-4 pt-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Acces
        </Label>

        <Select onValueChange={setAccess} defaultValue={acces}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="O">Oui</SelectItem>
              <SelectItem value="N">Non</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Creation
        </Label>

        <Select onValueChange={setCreation} defaultValue={creation}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="O">Oui</SelectItem>
              <SelectItem value="N">Non</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Modification
        </Label>

        <Select onValueChange={setModification} defaultValue={modification}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="O">Oui</SelectItem>
              <SelectItem value="N">Non</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Suppression
        </Label>

        <Select onValueChange={setSuppresion} defaultValue={suppression}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="O">Oui</SelectItem>
              <SelectItem value="N">Non</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-end space-x-2 ">
        <Button variant="default" onClick={onSubmit} size="sm">
          Mettre A Jour
        </Button>
        <Button onClick={onClose} variant="outline" size="sm">
          Annuler
        </Button>
      </div>
    </div>
  );
};

export default EditDroitForm;

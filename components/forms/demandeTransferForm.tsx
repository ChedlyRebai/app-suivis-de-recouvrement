"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { DialogFooter } from "../ui/dialog";
import useAddDroitModal from "@/hooks/useAddDroitModal";
import { useEffect, useState } from "react";
import { getAllFunctions } from "@/actions/fonction.action";
import useStore from "@/lib/droitStore";
import toast from "react-hot-toast";
import { Textarea } from "../ui/textarea";
import useDemandeTransfernModal from "@/hooks/use-demande-transfer-Modal";

const formSchema = z.object({
  Motif: z.string().min(1, {
    message: "",
  }),
  typetransfer: z.string().min(1, {
    message: "",
  }),
  Commentaire: z.string().min(1, {
    message: "",
  }),
});

type Props = {
  motif: any[];
  typeTransfer: any[];
};
const DemandeTransferForm = ({ motif, typeTransfer }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Motif: "",
      Commentaire: "",
    },
  });
  const { onClose } = useDemandeTransfernModal();

  //const creatDroit = useStore((state) => state.creatDroit) as any;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 ">
        <FormField
          control={form.control}
          name="Motif"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username">Motif de transfert</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionné une motif">
                      {field.value}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {motif.map((item: any) => (
                    <SelectItem key={item.codenv} value={item.libelle}>
                      {item.codenv}: {item.libelle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="typetransfer"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username">typetransfer </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionné une motif">
                      {field.value}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {typeTransfer.map((item: any) => (
                    <SelectItem key={item.codenv} value={item.libelle}>
                      {item.codenv}: {item.libelle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Commentaire"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="commentaire">Commentaire</FormLabel>
              <FormControl>
                <Textarea id="username" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button variant={"outline"} onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default DemandeTransferForm;

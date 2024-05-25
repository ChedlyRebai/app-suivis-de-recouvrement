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

import { useEffect, useState } from "react";

import { getMotif } from "@/actions/utils.actions";
import useDemandeProlongationModal from "@/hooks/use-demande-prolongation-Modal";
import { Textarea } from "../ui/textarea";
import { updatePro } from "@/actions/prologation.action";
import toast from "react-hot-toast";

const formSchema = z.object({
  Motif: z.string().min(1, {
    message: "",
  }),
  Commentaire: z.string().min(1, {
    message: "",
  }),
});

const DemandeProlongationForm = ({ motifs }: { motifs: any[] }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Motif: "",
      Commentaire: "",
    },
  });
  const { onClose, id } = useDemandeProlongationModal();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await updatePro(values.Motif, values.Commentaire, id).then((res) => {
      if (res.status === 200) {
        toast.success("Demande de prolonagation effectué avec succès");
        onClose();
      } else {
        toast.error("Erreur lors de la demande de prolonagation");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 ">
        <FormField
          control={form.control}
          name="Motif"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username">Motif de prolongation</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionné une motif" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {motifs.map((item: any) => (
                    <SelectItem key={item.codenv} value={`${item.codenv}`}>
                      {item.libelle}
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

export default DemandeProlongationForm;

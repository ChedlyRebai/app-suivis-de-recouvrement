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
import { DialogFooter } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import useValidationTransferModal from "@/hooks/use-validation-transfer-modal";
import { Label } from "../ui/label";
import { validateTransfer } from "@/actions/transfer.action";
import toast from "react-hot-toast";

const formSchema = z.object({
  validation: z.string().min(1, {
    message: "",
  }),
});

type Props = {
  motifs: any[];
  validation: any[];
};

const ValidationTransferForm = ({ motifs, validation }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      validation: "",
    },
  });

  const { onClose, id, commentaire, Motif } = useValidationTransferModal();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    console.log(id);
    await validateTransfer(id, values.validation)
      .then((res) => {
        toast.success("Validation effectuée avec succès");
        onClose();
      })
      .catch((err) => {
        toast.error("Erreur lors de la validation");
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 ">
        <FormField
          control={form.control}
          name="validation"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username">Validation </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionné une motif" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {validation.map((item: any) => (
                    <SelectItem key={item.codenv} value={item.codenv}>
                      {item.codenv}: {item.libelle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Label>Motif de prolongation</Label>
        {Motif ? <p>{Motif}</p> : <p>pas de motif</p>}
        <Label>Commentaire</Label>
        {commentaire ? <p>{commentaire}</p> : <p>pas de commentaire</p>}

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

export default ValidationTransferForm;

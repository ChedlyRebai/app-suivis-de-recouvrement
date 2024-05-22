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

const formSchema = z.object({
  Motif: z.string().min(1, {
    message: "",
  }),
  validation: z.string().min(1, {
    message: "",
  }),
  Commentaire: z.string().min(1, {
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
      Motif: "",
      Commentaire: "",
      validation: "",
    },
  });

  const { onClose, id } = useValidationTransferModal();

  //const creatDroit = useStore((state) => state.creatDroit) as any;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    console.log(id);
  };

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
                  {motifs.map((item: any) => (
                    <SelectItem key={item.codenv} value={item.codenv}>
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
          name="validation"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username">Validation </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionné une motif">
                      {field.value}
                    </SelectValue>
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

export default ValidationTransferForm;

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
import { useStore } from "zustand";
import { State } from "@/lib/droitStore";

const formSchema = z.object({
  Module: z.string().min(1, {
    message: "",
  }),
  ModuleP: z.string().min(1, {
    message: "",
  }),
  codefonction: z.string().min(1, {
    message: "",
  }),

  acces: z.string().min(1, {
    message: "",
  }),

  Creation: z.string().min(1, {
    message: "",
  }),

  Modification: z.string().min(1, {
    message: "",
  }),

  Suppression: z.string().min(1, {
    message: "",
  }),
});

const AddDroitForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Module: "",
      ModuleP: "",
      codefonction: "",
      acces: "N",
      Creation: "N",
      Modification: "N",
      Suppression: "N",
    },
  });


const addDroit = useStore((state:);

const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = useStore();
};
  const { onClose } = useAddDroitModal();
  const [fonctions, setFonctions] = useState<any>([]);
  console.log(fonctions);
  useEffect(() => {
    const fetchData = async () => {
      const fonction = await getAllFunctions();
      setFonctions(fonction);
      console.log(fonction);
    };
    fetchData();
  }, []);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 ">
        <FormField
          control={form.control}
          name="Module"
          render={({ field }) => (
            <div className="grid grid-cols-4 items-center gap-4">
              <FormLabel htmlFor="username" className="text-right">
                Module
              </FormLabel>
              <FormControl>
                <Input id="username" className="col-span-3" {...field} />
              </FormControl>
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="ModuleP"
          render={({ field }) => (
            <div className="grid grid-cols-4 items-center gap-4">
              <FormLabel htmlFor="username" className="text-right">
                ModuleP
              </FormLabel>
              <FormControl>
                <Input id="username" className="col-span-3" {...field} />
              </FormControl>
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="codefonction"
          render={({ field }) => (
            <div className="grid grid-cols-4 items-center gap-4">
              <FormLabel htmlFor="username" className="text-right">
                CodeFonction
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionné une fonction">
                      {field.value}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {fonctions.map((item: any) => (
                    <SelectItem
                      key={item.code_fonction}
                      value={item.code_fonction}
                    >
                      {item.code_fonction}: {item.lib_fonction}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="acces"
          render={({ field }) => (
            <div className="grid grid-cols-4 items-center gap-4">
              <FormLabel htmlFor="username" className="text-right">
                Acees
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="O">Oui</SelectItem>
                  <SelectItem value="N">Non</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="Creation"
          render={({ field }) => (
            <div className="grid grid-cols-4 items-center gap-4">
              <FormLabel htmlFor="username" className="text-right">
                Creation
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="O">Oui</SelectItem>
                  <SelectItem value="N">Non</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="Modification"
          render={({ field }) => (
            <div className="grid grid-cols-4 items-center gap-4">
              <FormLabel htmlFor="username" className="text-right">
                Modification
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="O">Oui</SelectItem>
                  <SelectItem value="N">Non</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="Suppression"
          render={({ field }) => (
            <div className="grid grid-cols-4 items-center gap-4">
              <FormLabel htmlFor="username" className="text-right">
                Suppression
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="O">Oui</SelectItem>
                  <SelectItem value="N">Non</SelectItem>
                </SelectContent>
              </Select>
            </div>
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

export default AddDroitForm;

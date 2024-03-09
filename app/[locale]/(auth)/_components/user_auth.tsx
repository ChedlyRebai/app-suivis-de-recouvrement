"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
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
import { FormEvent, useState } from "react";
import { Login } from "@/actions/auth.action";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { getSession, login } from "@/lib";
import WrongPassword from "./WrongPassword";
import { getUserBuMatricule } from "@/actions/utilisateur.action";
import useInvalidCredentialModal from "@/hooks/useInvalidCredential";
import useAddDroitModal from "@/hooks/useAddDroitModal";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  matricule: string;
  password: string;
}

const formSchema = z.object({
  matricule: z.string().min(4, {
    message: "Matricule doit comporter au moins 4 caractères.",
  }),
  password: z.string().min(1, {
    message: "Mot de passe doit comporter au moins 1 caractères.",
  }),
});

export function UserAuthForm({
  className,
  password,
  matricule,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [invalidCredential, setInvalidCredential] = useState(null);

  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    await login(values.matricule, values.password)
      .then((e) => {
        console.log(e);
        toast.success("Bienvenu");
        router.push("/access-management");
      })
      .catch((e) => {})
      .finally(() => {
        setIsLoading(false);
      });
    //   router.push("/");
    /*const instance = axios.create({
      baseURL: process.env.API_URL,
    });*/
    // setIsLoading(true);
    // const res = await Login(values.matricule, values.password);
    // setIsLoading(false);
    // console.log(res);
    // Cookies.set("token", res.token);
    // if (res.status === 200) {
    //   toast.success(res.message);
    //   router.push("/");
    // }

    // Cookies.set('token', token);
    // Cookies
    // await axios
    //   .get(`https://app-suivis-de-recouvrement-server-37up.vercel.app/users/getUsername/`)
    //   .then((username: any) => {
    //     console.log(username);
    //   });
  };

  const getUsername = async (values: z.infer<typeof formSchema>) => {
    setUsername("");

    const response = await getUserBuMatricule(values.matricule);
    console.log("response");
    console.log(response);
    setUsername(response);
    // await axios
    //   .get(`${process.env.API_URL}/users/getUsername`)
    //   .then((username: any) => {
    //     console.log(username);
    //   });
    // console.log(values);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      matricule: "",
      password: "",
    },
  });

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={(event: FormEvent<HTMLFormElement>) =>
            getUsername(form.getValues())
          }
        >
          <div className="grid gap-2">
            <div className="grid mt-3 gap-1">
              <FormField
                control={form.control}
                name="matricule"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{matricule}</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g: 1234" {...field} />
                    </FormControl>
                    <FormDescription className=" text-inherit">
                      {username}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{password}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="e.g: 1234"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {/* {isLoading && (
                <ClipLoader className="mr-2 h-4 w-4 animate-spin" />
              )} */}
              Connexion
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

import { ClipLoader } from "react-spinners";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  matricule: z.string().min(4, {
    message: "matricule must be at least 4 characters.",
  }),
  password: z.string().min(2),
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const instance = axios.create({
      baseURL: process.env.API_URL,
    });

    await axios
      .get(`http://localhost:10000/users/getUsername/`)
      .then((username: any) => {
        console.log(username);
      });
    console.log(values);
  };

  const getUsername = async (values: z.infer<typeof formSchema>) => {
    if (values.matricule.length < 4) return;
    await axios
      .get(`${process.env.API_URL}/users/getUsername`)
      .then((username: any) => {
        console.log(username);
      });
    console.log(values);
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
                    <FormLabel>Matricule</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Matricule" {...field} />
                    </FormControl>
                    <FormDescription>{username}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <ClipLoader className="mr-2 h-4 w-4 animate-spin" />
              )}
              LogIn
            </Button>
          </div>
        </form>
      </Form>
      {/*<div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <ClipLoader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <ClipLoader className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
        </Button>*/}
    </div>
  );
}

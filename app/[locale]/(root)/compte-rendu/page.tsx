import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import CompteRenduForm from "./_component/Compte-rendu-form";
import { getCompterendu, getListCompte, getListCompteRenduHistorique } from "@/actions/client.action";


export default async function Home({
  searchParams,
}: {
  searchParams?: {
    cli?: string; 
  };
}) {
  const cli = searchParams?.cli || "";
  const suiviAgenda =await getCompterendu(cli)
  const listecompte=await getListCompte(cli)
  const historiqueCompteRendu= await getListCompteRenduHistorique(cli)

  console.log(suiviAgenda,listecompte)
  return (
    <div className="bg-hero-patter bg-slate-100 min-h-screen py-6 mt-16  dark:bg-inherit ">
      <div className="py-6">
        <div className=" mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Compte Rendu
          </h1>
        </div>
        <CompteRenduForm suiviAgenda={suiviAgenda} listcompte={listecompte} historiqueCompteRendu={historiqueCompteRendu}/>
      </div>
    </div>
  );
};

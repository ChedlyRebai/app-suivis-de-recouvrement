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
import CompteRenduForm from "@/components/forms/Compte-rendu-form";

const page = () => {
  const date = new Date();
  return (
    <div className="bg-gray-50 dark:bg-inherit">
      <div className="py-6">
        <div className=" mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Compte Rendu
          </h1>
        </div>
        <CompteRenduForm/>
      </div>
    </div>
  );
};

export default page;

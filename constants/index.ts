import { FileCog, HomeIcon, LucideIcon, UsersIcon } from "lucide-react";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";

export const IconMap: Record<string, LucideIcon> = {
  "consicons/ug": HomeIcon,
  "consicons/users": UsersIcon,
  "consicons/fonctions": FileCog,
};


export const heureVisite=[
  {Code : 8, libelle :"8 h - 9 h"},
  {Code : 9, libelle :"9 h - 10 h"},
  {Code : 10, libelle :"10 h - 11 h"},
  {Code : 11, libelle :"11 h - 12 h"},
  {Code : 12, libelle :"12 h - 13 h"},
  {Code : 13, libelle :"13 h - 14 h"},
  {Code : 14, libelle :"14 h- 15 h"},
  {Code : 15, libelle :"15 h - 16 h"},
  {Code : 16, libelle :"16 h - 17 h"},
]


export const APP_GEN=[
  {Code : 1, libelle :"Client coopérant"},
  {Code : 2, libelle :"Client agressif"},
  {Code : 3, libelle :"Client normal"},
]
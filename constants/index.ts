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

export const LISTE_CHOIX =[
  {Code : 1, libelle :"Appel télephonique"},
  {Code : 2, libelle :"Visite du client"},
  {Code : 3, libelle :"Lettre"},
  {Code : 4, libelle :"grapes"},
  {Code : 5, libelle :"Sommation"},
] 

export const MOTIF_IM=[
  {Code : 1, libelle :"Salaire suspendu"},
  {Code : 2, libelle :"Salaire dégradé"},
  {Code : 3, libelle :"Salaire suspendu puis repris"},
  {Code : 4, libelle :"Baisse de mouvement"},
  {Code : 5, libelle :"Débit non autorisé"},
  {Code : 6, libelle :"autre"},
]

export const Sort=[
 {Code : 1, libelle :"Promesse de règlement"},
  {Code : 2, libelle :"Nouvelles coordonnées"},
  {Code : 3, libelle :"Facilité de paiement"},
  {Code : 4, libelle :"Non reconnaissance de la créance"},
  {Code : 5, libelle :"Visite"},
  {Code : 6, libelle :"Client injoignable"},
]
import addDays from "date-fns/addDays";
import addHours from "date-fns/addHours";
import format from "date-fns/format";
import nextSaturday from "date-fns/nextSaturday";
import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
} from "lucide-react";

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui//dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Mail } from "../data";
import { formatDate } from "date-fns";
import useInbox from "@/hooks/use-inbox-hook";
import { useQuery } from "@tanstack/react-query";
import { getCompteRenduById } from "@/actions/client.action";
import { CompteRenduList } from "@/constants/types";

interface MailDisplayProps {
  mail: Mail | null;
}

export function MailDisplay() {
  const today = new Date();
  const { Comptrendu, id } = useInbox();
  console.log("Comptrendu", Comptrendu);

  const {
    isPending,
    error,
    isLoading,
    data = {} as CompteRenduList,
  } = useQuery<CompteRenduList>({
    queryKey: ["getCompteRendu", id],
    queryFn: async () => await getCompteRenduById(id),
  });

  console.log("data", data);

  if(!data){
    return <div>loading...</div>
  }
  
  return (
    <div className="flex h-fit flex-col">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!data}>
                <Archive className="h-4 w-4" />
                <span className="sr-only">Archive</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Archive</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!data}>
                <ArchiveX className="h-4 w-4" />
                <span className="sr-only">Move to junk</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to junk</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!data}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Move to trash</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to trash</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Tooltip>
            <Popover>
              <PopoverTrigger asChild>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" disabled={!data}>
                    <Clock className="h-4 w-4" />
                    <span className="sr-only">Snooze</span>
                  </Button>
                </TooltipTrigger>
              </PopoverTrigger>
              <PopoverContent className="flex w-[535px] p-0">
                <div className="flex flex-col gap-2 border-r px-2 py-4">
                  <div className="px-4 text-sm font-medium">Snooze until</div>
                  <div className="grid min-w-[250px] gap-1">
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Later today{" "}
                      <span className="ml-auto text-muted-foreground">
                        {/* {format(addHours(today, 4), "E, h:m b")} */}
                        hour
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Tomorrow
                      <span className="ml-auto text-muted-foreground">
                        {/* {format(addDays(today, 1), "E, h:m b")} */}
                        days
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      This weekend
                      <span className="ml-auto text-muted-foreground">
                        eekend
                        {/* {format(nextSaturday(today), "E, h:m b")} */}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Next week
                      <span className="ml-auto text-muted-foreground">
                        Next week
                        {/* {formatDate(addDays(today, 7), "E, h:m b")} */}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="p-2">
                  <Calendar />
                </div>
              </PopoverContent>
            </Popover>
            <TooltipContent>Snooze</TooltipContent>
          </Tooltip>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!data}>
                <Reply className="h-4 w-4" />
                <span className="sr-only">Reply</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!data}>
                <ReplyAll className="h-4 w-4" />
                <span className="sr-only">Reply all</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply all</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!data}>
                <Forward className="h-4 w-4" />
                <span className="sr-only">Forward</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Forward</TooltipContent>
          </Tooltip>
        </div>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={!data}>
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
            <DropdownMenuItem>Star thread</DropdownMenuItem>
            <DropdownMenuItem>Add label</DropdownMenuItem>
            <DropdownMenuItem>Mute thread</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">Loading...</div>
      ) : (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={data.cli} />
                <AvatarFallback>
                  {/* {data.name
                      .split(" ")
                      .map((chunk) => chunk[0])
                      .join("")} */}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">
                  {data.compterendutype_compterendutype_compterenduidTosuivi_agenda &&
                  data
                    .compterendutype_compterendutype_compterenduidTosuivi_agenda[0]
                    ? data
                        .compterendutype_compterendutype_compterenduidTosuivi_agenda[0]
                        .types.libelle
                    : ""}
                </div>
                <div className="line-clamp-1 text-xs">
                  {data.compterendutype_compterendutype_compterenduidTosuivi_agenda &&
                  data
                    .compterendutype_compterendutype_compterenduidTosuivi_agenda[0]
                    ? data
                        .compterendutype_compterendutype_compterenduidTosuivi_agenda[0]
                        .types.libelle
                    : ""}
                </div>
                <div className="line-clamp-1 text-xs">
                  {/* <span className="font-medium">Reply-To:</span> {data.edata} */}
                </div>
              </div>
            </div>
            {data.created_at && (
              <div className="ml-auto text-xs text-muted-foreground">
                {/* {format(new Date(data.date), "PPpp")} 
                  data.date */}
                {data.created_at.toString().substring(0, 10)}
              </div>
            )}
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {data.compte_rendu}
          </div>
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
          {data?.compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]
    ?.types?.code === 1 && (
            <div className="">
              <Label className="text-primary">Montant</Label>
              <p>
                {
                  data?.compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]
                    .promesseregresse.mnt_reg
                }
              </p>
              <Label className="text-primary">Lieu ver</Label>
              <p>
                {
                  data?.compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]
                    .promesseregresse.lieu_ver
                }
              </p>
              <Label className="text-primary">Date </Label>
              <p>
                {
                  data?.compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]
                    .promesseregresse.date_ver
                }
              </p>

            </div>
          )}

          {data?.compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]
            ?.types?.code === 2 && (
            <div className="">
              <Label className="text-primary">Nouveau Telephone 1</Label>
              <p>
                {" "}
                {
                  data?.compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]
                    .nouvellecoordonnees?.nouv_tel
                }
              </p>{" "}
              <Label className="text-primary">Nouveau Telephone 2</Label>
              <p>
                {
                  data?.compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]
                    ?.nouvellecoordonnees?.nouv_te2
                }
              </p>{" "}
              <Label className="text-primary">Nouveau Addresse</Label>
              <p>
                {
                  data?.compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]
                    ?.nouvellecoordonnees?.nouv_adresse
                }
              </p>{" "}
            </div>
          )}

          {data?.compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]
            ?.types?.code === 3 && (
            <div className="flex justify-center items-center">
              <Label className="text-primary">Montant</Label>
              <p>
                {
                  data?.compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]
                    ?.FacilitePaiment.mnt_rec
                }
              </p>
              <Label className="text-primary">Nombre echeance</Label>
              <p>
                {
                  data?.compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]
                    ?.FacilitePaiment.nb_ech
                }
              </p>
              {data?.compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]?.FacilitePaiment?.montantFacilites?.map(
                (item: any, index: number) => (
                  <div key={index}>
                    <Label className="text-primary">Montant echeance</Label>
                    <p>{item.mntech}</p>
                    <Label className="text-primary">Date echeance</Label>
                    <p>{item.date_ech}</p>
                  </div>
                )
              )}
            </div>
          )}

          {/* export interface FacilitePaiment {
    nb_ech:   null;
    mnt_rec:  string;
    montantFacilites: MontantFacilite[];
}

export interface MontantFacilite {
    mntech:   string;
    date_ech: null;
} */}

          {data?.compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]
            ?.types?.code === 4 && (
            <div className="">
              <Label className="text-primary">Observation</Label>
              <p>
                {
                  data?.compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]
                    .nonreconaissance?.observation
                }
              </p>
            </div>
          )}

          {data?.compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]
            ?.types?.code === 5 && (
            <div className="">
              <Label className="text-primary">Heure visite</Label>
              <p>
                {" "}
                {
                  data?.compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]
                    .visite?.h_rdv_visite_h_rdvToh_rdv.libelle
                }
              </p>{" "}
              <Label className="text-primary">Lieu Visite 2</Label>
              <p>
                {
                  data?.compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]
                    ?.visite?.Agence.libelle
                }{" "}
                {
                  data?.compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]
                    ?.visite?.lieu_visite
                }
              </p>{" "}
              <Label className="text-primary">Date visite</Label>
              <p>
                {
                  data?.compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]
                    ?.visite?.date_visite
                }
              </p>{" "}
            </div>
          )}

          {data?.compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]
            ?.types?.code === 6 && (
            <div className="flex justify-center items-center">
              <Label className="text-primary">Client Injoignable</Label>
            </div>
          )}
        </div>
        </div>
      )}
      {data && !isLoading ? (
        <div className="flex flex-1 flex-col"></div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  );
}

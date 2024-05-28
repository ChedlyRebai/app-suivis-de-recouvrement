"use client";
import { ComponentProps } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useEffect, useState } from "react";

import * as React from "react";
import { AlertCircle, Archive, Bell, Search } from "lucide-react";

import { useInView } from "react-intersection-observer";

import { Nav } from "./nav";
import { type Mail } from "../data";
import { useMail } from "../use-mail";

import useInbox from "@/hooks/use-inbox-hook";

import { format } from "date-fns/format";

interface IProps {
  items: Mail[];
  initialData: Alerte[];
  search: string;
  limit: number;
}

import { Alerte, AlertesTypes, getAllAlerts } from "@/actions/Alerts.action";
export function MailList({ items, initialData, search, limit }: IProps) {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();
  const [isDisable, setDisable] = useState(false);

  async function loadMoreData() {
    console.log("loadMoreData");
    const next = page + 1;
    const offset = next * limit;
    const newData = await getAllAlerts(next, limit, search);
    console.log("newData", newData);
    //const { data: newData } = await GetPokemons({ search, offset, limit })
    // const newData: any = [];
    if (newData?.alertes?.length) {
      setPage(next);

      setData((prev: any[] | undefined) => [
        ...(prev?.length ? prev : []),
        ...newData.alertes,
      ]);
      console.log("newData length", data.length);
    } else {
      setDisable(true);
    }
  }

  useEffect(() => {
    console.log("data l1", data.length);
    if (inView) {
      console.log("inView");
      loadMoreData();
    }
    console.log("inView1");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  console.log("data ", data);
  const [mail, setMail] = useMail();
  const { alerte, setAlert, setId } = useInbox();
  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {data.map((item: Alerte) => (
          <button
            key={item.id}
            onClick={() => {
              console.log("item", item);
              setAlert(item);
              setId(item.id);
            }}
            className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  {/* <div className="font-semibold">{item.compterendutype_compterendutype_compterenduidTosuivi_agenda[0].types.libelle }</div> */}
                  <div className="font-semibold">{item?.ab_client?.nom}</div>
                  {!item?.compterendutype?.types.libelle && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  // className={cn(
                  //   "ml-auto text-xs",
                  //   mail.selected === item.id
                  //     ? "text-foreground"
                  //     : "text-muted-foreground"
                  // )}
                  className="ml-auto text-xs text-muted-foreground"
                >
                  {/* {formatDistanceToNowStrict(new Date(item.created_at), {
                    addSuffix: true,
                  })}  */}
                  {/* {item.created_at.toString().substring(0, 10)} */}
                  {format(new Date(item?.created_at?.toString()), "PP")}
                </div>
              </div>
              <div className="text-xs font-medium">{item?.ab_client?.cli}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item?.message?.substring(0, 100)}...
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant={getBadgeVariantFromLabel(`${item?.types?.libelle}`)}
              >
                {item?.types?.libelle}
              </Badge>
            </div>
          </button>
        ))}
        {!isDisable ? (
          <div
            ref={ref}
            className="mt-6 flex flex-col items-center justify-center"
          >
            {/* <Loader2 className="animate-spin" size={48} /> */}
            Chargement...
          </div>
        ) : (
          <></>
        )}
      </div>
    </ScrollArea>
  );
}

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["visite"].includes(label?.toLowerCase())) {
    return "default";
  }

  if (["promesse de règlement"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}

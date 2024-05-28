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
  const [data, setData] = useState<Alerte[]>(initialData);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();
  const [isDisable, setDisable] = useState(false);

  const loadMoreData = async () => {
    console.log("Loading more data...");
    const nextPage = page + 1;
    const newData = await getAllAlerts(nextPage, limit, search);
    console.log("newData", newData);
    if (newData?.alertes?.length) {
      setData((prevData) => [...prevData, ...newData.alertes]);
      setPage(nextPage);
    } else {
      setDisable(true);
    }
  };

  useEffect(() => {
    if (inView && !isDisable) {
      loadMoreData();
    }
  }, [inView, page, limit]);

  const [mail, setMail] = useMail();
  const { alerte, setAlert, setId } = useInbox();

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {data.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setAlert(item);
              setId(item.id);
            }}
            className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">
                    {item?.ab_client?.nom} {item?.id}
                  </div>
                  {!item?.compterendutype?.types.libelle && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div className="ml-auto text-xs text-muted-foreground">
                  {/* {formatDistanceToNow(new Date(item.created_at), {
                    addSuffix: true,
                  })} */}
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
            Chargement...
          </div>
        ) : null}
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

"use client";
import { ComponentProps } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useEffect, useState } from "react";

import * as React from "react";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";

import { useInView } from "react-intersection-observer";

interface IProps {
  items: Mail[];
  initialData: any[];
  search: string;
  limit: number;
}

import { cn } from "@/lib/utils";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AccountSwitcher } from "./account-switcher";
import { MailDisplay } from "./mail-display";

import { Nav } from "./nav";
import { type Mail } from "../data";
import { useMail } from "../use-mail";
import { Input } from "@/components/ui/input";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useDebouncedCallback } from "use-debounce";
import { CompteRenduList } from "@/constants/types";
import { formatDistanceToNowStrict } from "date-fns";
import useInbox from "@/hooks/use-inbox-hook";
import { getAllCompteRendu } from "@/actions/comptrendu.action";
import { format } from "date-fns/format";
interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  initialData: any[];
  search: string;
  limit: number;
}
export function Mail({
  accounts,
  mails,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
  search,
  limit,
  initialData,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail] = useMail();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  console.log("initialData", initialData);
  const { Comptrendu, setComptrendu, setId } = useInbox();

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query);
      params.set("page", "1");
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          // onCollapse={(collapsed) => {
          //   setIsCollapsed(collapsed)
          //   document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
          //     collapsed
          //   )}`
          // }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            {/* <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} /> */}
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Compte rendus",
                label: "128",
                icon: Inbox,
                variant: "default",
              },
              {
                title: "Contactés",
                label: "",
                icon: Archive,
                variant: "ghost",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Inbox</h1>
              <TabsList className="ml-auto">
                {/* <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All mail
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Unread
                </TabsTrigger> */}
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search"
                    onChange={(e: any) => {
                      e.preventDefault();
                      handleSearch(e.target.value);
                    }}
                    defaultValue={searchParams.get("query")?.toString()}
                    className="pl-8"
                  />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <MailList
                search={search}
                initialData={initialData}
                limit={limit}
                items={mails}
              />
            </TabsContent>

            <TabsContent value="unread" className="m-0">
              <MailList
                search={search}
                initialData={initialData}
                limit={limit}
                items={mails.filter((item) => !item.read)}
              />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}>
          {Comptrendu && <MailDisplay />}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}

export function MailList({ items, initialData, search, limit }: IProps) {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();
  const [isDisable, setDisable] = useState(false);

  async function loadMoreData() {
    console.log("loadMoreData");
    const next = page + 1;
    const offset = next * limit;
    const newData = await getAllCompteRendu(next, limit, search);
    //const { data: newData } = await GetPokemons({ search, offset, limit })
    // const newData: any = [];
    if (newData.CompteRendu.length) {
      setPage(next);

      setData((prev: any[] | undefined) => [
        ...(prev?.length ? prev : []),
        ...newData.CompteRendu,
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
  const [mail, setMail] = useMail();
  const { Comptrendu, setComptrendu, setId } = useInbox();
  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {data.map((item: CompteRenduList) => (
          <button
            key={item.id}
            // className={cn(
            //   "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
            //   mail.selected === item.id && "bg-muted"
            // )}
            // onClick={() =>
            //   setMail({
            //     ...mail,
            //     selected: item.id,
            //   })
            // }

            onClick={() => {
              console.log("item", item);
              setComptrendu(item);
              setId(item.id);
            }}
            className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  {/* <div className="font-semibold">{item.compterendutype_compterendutype_compterenduidTosuivi_agenda[0].types.libelle }</div> */}
                  <div className="font-semibold">{item?.ab_client?.nom}</div>
                  {!item
                    ?.compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]
                    ?.types?.libelle && (
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
                  {format(new Date(item.created_at.toString()), "PPpp")}
                </div>
              </div>
              <div className="text-xs font-medium">{item?.ab_client?.cli}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {
                item
                  ?.compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]
                  ?.types?.libelle
              }
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant={getBadgeVariantFromLabel(
                  item
                    ?.compterendutype_compterendutype_compterenduidTosuivi_agenda[0]
                    ?.types?.libelle
                )}
              >
                {
                  item
                    ?.compterendutype_compterendutype_compterenduidTosuivi_agenda[0]
                    ?.types?.libelle
                }
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
            loading
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
  if (["visite"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["promesse de règlement"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}

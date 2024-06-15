"use client";
import { ComponentProps } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useEffect, useState } from "react";

import * as React from "react";
import { AlertCircle, Archive, Bell, Search } from "lucide-react";

import { useInView } from "react-intersection-observer";

interface IProps {
  items: any[];
  initialData: Alerte[];
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

import { Input } from "@/components/ui/input";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useDebouncedCallback } from "use-debounce";
import { CompteRenduList } from "@/constants/types";
import { formatDistanceToNowStrict } from "date-fns";
import useInbox from "@/hooks/use-inbox-hook";

import { format } from "date-fns/format";
import { Alerte, AlertesTypes, getAllAlerts } from "@/actions/Alerts.action";
import { MailList } from "./mail-list";
interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  mails: any[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  initialData: any[];
  search: string;
  limit: number;
  alertesTypes: AlertesTypes[];
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
  alertesTypes,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  console.log("initialData", initialData);
  const { alerte, setAlert, setId } = useInbox();

  // const handleSearch = useDebouncedCallback((query: string) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (query) {
  //     params.set("query", query);
  //     params.set("page", "1");
  //   } else {
  //     params.delete("query");
  //   }
  //   replace(`${pathname}?${params.toString()}`);
  // }, 300);

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
              "flex h-[56px] items-center justify-center",
              isCollapsed ? "h-[56px]" : "px-2"
            )}
          >
            {/* <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} /> */}
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Alertes",
                label: "128",
                icon: Bell,
                variant: "default",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Notifications</h1>
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
                {alertesTypes.map((item, i) => {
                  return (
                    <TabsTrigger
                      value={`${item.rapporttype}`}
                      className="text-zinc-600 dark:text-zinc-200"
                    >
                      {item.types?.libelle}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              {/* <form>
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
              </form> */}
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
          {alerte && <MailDisplay />}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}

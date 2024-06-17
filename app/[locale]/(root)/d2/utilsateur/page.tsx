import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { Progress } from "@/components/ui/progress";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import UploadFiles from "@/components/shared/Modals/Upload-file-Modal";

import CompteRenduModal from "@/components/shared/Modals/Compte-Rendu-Modal";

import { getUserDetails } from "@/actions/utilisateur.action";
import UserInfo from "./_component/UserDetails";
import UserDocuments from "./_component/Documents/Documents";
import UserCompteRendu from "./_component/Compterendu/CompteRendus";
import { CountUp } from "@/components/ui/count-up";
import { getUserStat } from "@/actions/admin.action";
export default async function page({
  searchParams,
}: {
  searchParams?: {
    id?: string;
  };
}) {
  const id = Number(searchParams?.id);
  const User = await getUserDetails(id);
  const stat = await getUserStat(id);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div>
        <UserInfo user={User} />
      </div>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          {/* <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>Your Orders</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Introducing Our Dynamic Orders Dashboard for Seamless
                  Management and Insightful Analysis.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button>Create New Order</Button>
              </CardFooter>
            </Card> */}
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>
                Nombre compte rendu cette semaine
              </CardDescription>
              <CardTitle className="text-4xl">
                <CountUp
                  end={stat.comptrenduThisWeek}
                  duration={2}
                  preserveValue
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="h-10">
              <div className="text-xs text-muted-foreground">
                <CountUp
                  end={stat.percentageWeekChange}
                  duration={2}
                  preserveValue
                />
                % de la semaine dernière
              </div>
            </CardContent>
            <CardFooter>
              <Progress
                value={stat.percentageWeekChange}
                aria-label="25% increase"
              />
            </CardFooter>
          </Card>

          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>Nombre documents ce mois-ci</CardDescription>
              <CardTitle className="text-4xl">
                <CountUp end={stat.filesThisMonth} duration={2} preserveValue />
              </CardTitle>
            </CardHeader>
            <CardContent className="h-10">
              <div className="text-xs text-muted-foreground">
                <CountUp
                  end={stat.percentageMonthChangeFiles}
                  duration={2}
                  preserveValue
                />
                % du mois dernier
              </div>
            </CardContent>
            <CardFooter>
              <Progress
                value={stat.percentageMonthChangeFiles}
                aria-label="25% increase"
              />
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>Nombre documents Cette semaine</CardDescription>
              <CardTitle className="text-4xl">
                <CountUp end={stat.filesThisWeek} duration={2} preserveValue />
              </CardTitle>
            </CardHeader>
            <CardContent className="h-10">
              <div className="text-xs text-muted-foreground">
                <CountUp
                  end={stat.percentageWeekChangeFiles}
                  duration={2}
                  preserveValue
                />
                % de la semaine dernière
              </div>
            </CardContent>
            <CardFooter>
              <Progress
                value={stat.percentageWeekChangeFiles}
                aria-label="25% increase"
              />
            </CardFooter>
          </Card>

          <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-2">
              <CardDescription>Nombre compte rendu ce mois-ci</CardDescription>
              <CardTitle className="text-4xl">
                <CountUp
                  end={stat.compterenduThisMonth}
                  duration={2}
                  preserveValue
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="h-10">
              <div className="text-xs text-muted-foreground">
                <CountUp
                  end={stat.percentageMonthChange}
                  duration={2}
                  preserveValue
                />
                % du mois dernier
              </div>
            </CardContent>
            <CardFooter>
              <Progress
                value={stat.percentageMonthChange}
                aria-label="12% increase"
              />
            </CardFooter>
          </Card>
        </div>
        <Tabs defaultValue="Documents">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="Documents">Documents</TabsTrigger>
              <TabsTrigger value="comptrendu">Compterendu</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                {/* <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                  >
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger> */}
                {/* <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Fulfilled
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
                </DropdownMenuContent> */}
              </DropdownMenu>
              {/* <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Export</span>
              </Button> */}
            </div>
          </div>
          <TabsContent value="Documents">
            <UserDocuments file={User.Files || ([] as File[])} />
          </TabsContent>
          <TabsContent value="comptrendu">
            <UserCompteRendu compterendus={User.suivi_agenda || []} />
          </TabsContent>
        </Tabs>
      </div>
      <CompteRenduModal />
    </main>
  );
}

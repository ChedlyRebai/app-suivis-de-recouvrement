"use server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AccessManagementDataTable } from "./_component/data-table";
import { getSession } from "@/lib";
import { redirect } from "next/navigation";
import { GetServerSideProps } from "next";
import TakePathnameComponent from "@/components/shared/TakePathnameComponent";
import { acccess } from "@/actions/acess.action";
import { getFonctionName } from "@/actions/droit_accees.action";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
    perPage?: string;
    code?: string;
  };
}) {
  const session = await getSession();
  const access = await acccess("access-management");
  if (!session) {
    return redirect("login");
  }

  if (access.acces === "N") {
    return redirect("/fr/forbidden");
  }
  const fonctionName = await getFonctionName(searchParams?.code || "");
  console.log("access access-management:", access);
  return (
    <div className="bg-hero-patter px-3 bg-slate-100 min-h-screen py-6 mt-16  dark:bg-muted/40 ">
      <div className="py-6 min-h-60">
        <Card className="min-h-56">
          {" "}
          <CardHeader>
            <CardTitle>Gestion des accès</CardTitle>
            <CardDescription>{fonctionName?.lib_fonction}</CardDescription>
          </CardHeader>
          <CardContent>
            <AccessManagementDataTable access={access} />
          </CardContent>
        </Card>{" "}
      </div>
    </div>
  );
}

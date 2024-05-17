import React, { Suspense } from "react";

import MailPage from "@/components/shared/mail/page";
import { cookies } from "next/headers";
import Image from "next/image";
import { Mail } from "@/components/shared/mail/components/mail";
import { accounts, mails } from "@/components/shared/mail/data";
import LoadingIcons, { Oval } from "react-loading-icons";
import { getAllCompteRendu } from "@/actions/comptrendu.action";
import { getAllAlerts } from "@/actions/Alerts.action";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;
  const search = searchParams?.query || "";
  const limit = 20;
  const initialdata = await getAllAlerts(1, limit, search);
  console.log("initialData", initialdata);
  return (
    <>
      <div className="" />
      <div className="mt-20">
        <div className="md:hidden">
          <Image
            src="/examples/mail-dark.png"
            width={1280}
            height={727}
            alt="Mail"
            className="hidden dark:block"
          />

          <Image
            src="/examples/mail-light.png"
            width={1280}
            height={727}
            alt="Mail"
            className="block dark:hidden"
          />
        </div>
        <div className="hidden flex-col md:flex">
          <Suspense key={search} fallback={<Oval />}>
            <Mail
              initialData={initialdata.CompteRendu || []}
              limit={5}
              search={search}
              accounts={accounts}
              mails={mails}
              defaultLayout={defaultLayout}
              defaultCollapsed={defaultCollapsed}
              navCollapsedSize={4}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}

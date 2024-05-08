import { getLinksByCodeFonction } from "@/actions/navbar.action";
import { getSession } from "@/lib";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Navbar from "./(root)/access-management/_component/MainLayout";
import Mainlayout from "./(root)/access-management/_component/MainLayout";
import { redirect } from "next/navigation";

// const Page = async ({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) => {
//   const links = await getLinksByCodeFonction();
//   const t = await getTranslations("access-management");
//   const session = await getSession();
//   if(!session){
//     return redirect("login");
//   }

//   return (
//     <Mainlayout showSidebar links={links} title={t("title")} session={session}>
//       {children}
//     </Mainlayout>
//   );
// };

// export default Page;


'use client';

import * as React from 'react';
import { useEdgeStore } from "@/lib/edgestore";

export default function Page() {
  const [file, setFile] = React.useState<File>();
  const { edgestore } = useEdgeStore();

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files?.[0]);
        }}
      />
      <button
        onClick={async () => {
          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress:any) => {
                // you can use this to show a progress bar
                console.log(progress);
              },
            });
            // you can run some server action or api here
            // to add the necessary data to your database
            console.log(res);
          }
        }}
      >
        Upload
      </button>
    </div>
  );
}
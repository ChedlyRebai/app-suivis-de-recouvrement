import React from "react";
import { UserAuthForm } from "../_components/user_auth";
import { getSession } from "@/lib";
import InvalidCredentialModal from "@/components/shared/Modals/Invalid-Credential-Modal";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
const Page = async () => {
  const session = await getSession();
  console.log("session1");

  if (session?.user) console.log(session.user.role);
  const t = await getTranslations("login");
  return (
    <>
      <UserAuthForm matricule={t("matricule")} password={t("password")} />
      <InvalidCredentialModal />
    </>
  );
};

export default Page;

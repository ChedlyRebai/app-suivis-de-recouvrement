import React from "react";
import { UserAuthForm } from "../_components/user_auth";
import { getSession } from "@/lib";
import InvalidCredentialModal from "@/components/shared/Modals/Invalid-Credential-Modal";

const Page = async () => {
  const session = await getSession();
  console.log("session1");
  if (session?.user) console.log(session.user.role);
  return (
    <>
      <UserAuthForm />
      <InvalidCredentialModal />
    </>
  );
};

export default Page;

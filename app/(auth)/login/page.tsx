import React from "react";
import { UserAuthForm } from "../_components/user_auth";
import { getSession } from "@/lib";

const Page = async () => {
  const session = await getSession();
  console.log("session1");
  console.log(session.user.role);
  return (
    <>
      <UserAuthForm />
    </>
  );
};

export default Page;

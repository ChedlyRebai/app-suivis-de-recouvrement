import {
  getAllAccount,
  getAllClient,
  getAllCompteRendu,
  getAllUsers,
} from "@/actions/admin.action";
import React from "react";
import { PowerBIEmbed } from "powerbi-client-react";

import { models } from "powerbi-client";
import { AllUsers } from "../_component/alllusers";
import { Utilisateurcolumns } from "../_component/Utilisateurcolumns";
import Co from "./c";
const page = () => {
  return (
    <>
      <Co />
    </>
  );
};

export default page;

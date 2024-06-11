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

import PowerBi from "./PowerBi";
const page = () => {
  return (
    <>
      <PowerBi />
    </>
  );
};

export default page;

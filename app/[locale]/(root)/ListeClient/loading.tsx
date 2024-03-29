import React from "react";
import { Oval } from "react-loading-icons";

const laoding = () => {
  return (
    <div className="absolute top-[50%] right-[50%] flex items-center justify-center">
      <Oval />
    </div>
  );
};

export default laoding;

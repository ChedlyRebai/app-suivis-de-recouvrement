import Image from "next/image";
import React from "react";

const laoding = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Image src={"/images/logo.png"} alt={"Logo"} width={200} height={200} />
    </div>
  );
};


export default laoding;

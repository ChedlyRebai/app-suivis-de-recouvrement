"use client";
import { usePathname } from "next/navigation";

const TakeAccessManagementCode = () => {
  const pathname = usePathname();

  const path = pathname.split("/", 3);
  console.log(path[path.findLastIndex((x) => x)]);
};

export default TakeAccessManagementCode;

"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const pathname = usePathname();
  console.log(localActive);
  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    console.log(pathname.split("/").slice(2).join("/"));
    startTransition(() => {
      router.replace(
        `/${nextLocale}/${pathname.split("/").slice(2).join("/")}`
      );
    });
  };
  return (
    <label className="border-2  rounded">
      <p className="sr-only">change language</p>
      <select
        defaultValue={localActive}
        className="py-2 bg-transparent"
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value="en">En</option>
        <option value="fr">Fr</option>
      </select>
    </label>
  );
}

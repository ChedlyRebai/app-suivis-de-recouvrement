"use client";
import { Fragment, ReactNode, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  InboxIcon,
  BarChart2Icon,
  XIcon,
  MenuIcon,
  SearchIcon,
  BellIcon,
  BarChartIcon,
} from "lucide-react";
import { IconMap } from "@/constants";

export interface Navigation {
  name: string;
  icon: Icon;
  current?: boolean;
  children: Navigation[];
  href?: string;
}

export enum Icon {
  ConsiconsFonctions = "consicons/fonctions",
  ConsiconsUg = "consicons/ug",
  ConsiconsUsers = "consicons/users",
}

function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(" ");
}

const NavbarItem = ({ name, icon, current, children, href }: Navigation) => {
  return (
    <>
      {children &&
        Array.isArray(children) &&
        children.map((item: Navigation) =>
          !item.children ? (
            <div key={item.name}>
              <a
                href="#"
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
              >
                {/* <item.icon
                          className={classNames(
                            item.current
                              ? "text-gray-500"
                              : "text-gray-400  group-hover:text-gray-300
                              ",
                            "mr-3 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        /> */}
                {item.name}
              </a>
            </div>
          ) : (
            <Disclosure as="div" key={item.name} className="space-y-1">
              {({ open }) => {
                let Icon = IconMap[item.icon || "consicons/users"];
                return (
                  <>
                    <Disclosure.Button
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "group capitalize w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      )}
                    >
                      <Icon
                        className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-300"
                        aria-hidden="true"
                      />
                      <span className="flex-1 capitalize">{item.name}</span>
                      <svg
                        className={classNames(
                          open ? "text-gray-400 rotate-90" : "text-gray-300",
                          "ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150"
                        )}
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                      </svg>
                    </Disclosure.Button>
                    <Disclosure.Panel className="space-y-1">
                      {item.children &&
                        Array.isArray(item.children) &&
                        item.children.map((subItem: any, index: number) => {
                          let Icon = IconMap[subItem.icon || "consicons/ug"];
                          console.log(subItem.children);
                          return (
                            <>
                              <NavbarItem
                                children={subItem.children}
                                icon={subItem.icon}
                                name={subItem.name}
                              />
                            </>
                          );
                        })}
                    </Disclosure.Panel>
                  </>
                );
              }}
            </Disclosure>
          )
        )}
    </>
  );
};

export default NavbarItem;

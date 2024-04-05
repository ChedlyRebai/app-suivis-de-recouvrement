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
import Link from "next/link";

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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const NavbarItem = ({ name, icon, current, children, href }: Navigation) => {
  return (
    <div>
      
      {children && ( 
        <Disclosure as="div" key={name} className="space-y-1">
          {({ open }) => {
            let IconComponent = IconMap[icon || "consicons/users"];
            return (
              <>
                <Disclosure.Button
                  className={classNames(
                    !current
                      ? "text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                      : "text-gray-900 bg-gray-100 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50",
                    "flex items-center w-full gap-3 rounded-lg px-3 py-2  "
                  )}
                >
                  
                  <IconComponent
                    className="mr- flex-shrink-0 h-4 w-4 dark:text-inherit text-black group-hover:text-gray-300"
                    aria-hidden="true"
                  />

                  <Link href={`/${href}`}  className="hover:underline capitalize dark:text-inherit text-black text-sm text-nowrap">{name}</Link>

                  {children.length !== 0 && (
                    <svg
                      className={classNames(
                        open
                          ? "dark:text-white rotate-90"
                          : "dark:text-gray-300",
                        "ml-auto flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150"
                      )}
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                    </svg>
                  )}
                </Disclosure.Button>
                {children.length !== 0 && (
                  <Disclosure.Panel className="space-y-1">
                    {children &&
                      Array.isArray(children) &&
                      children.map((subItem: any, index: number) => {
                        let SubIconComponent = IconMap[subItem.icon || "consicons/ug"];
                        console.log(subItem.children);
                        return (
                          <div
                            key={subItem.href}
                            style={{ marginLeft: `${subItem.level * 14}px` }}
                          >
                            <NavbarItem
                              key={subItem.href}
                              children={subItem.children}
                              icon={subItem.icon}
                              name={subItem.name}
                            />
                          </div>
                        );
                      })}
                  </Disclosure.Panel>      
                )}
              </>
            );
          }}
        </Disclosure>
      )}
    </div>
  );
}

export default NavbarItem;


      {/* {children &&
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
                  "group flex items-center px-2 py-2 text-md font-medium rounded-md"
                )}
              >
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
                        !item.current
                          ? "text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                          : "text-gray-900 bg-gray-100 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50",
                        "flex items-center w-full gap-3 rounded-lg px-3 py-2  "
                      )}
                    >
                      {/* <Icon
                        className="mr-3 flex-shrink-0 h-5 w-5 text-white group-hover:text-gray-300"
                        aria-hidden="true"
                      /> */}
                      {/* <span className="flex-1 capitalize">{item.name}</span> 

                      <Icon
                        className={
                          "dark:text-white -gray-300 ml- flex-shrink-0 h-4 w-4 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150"
                        }
                      />

                      {item.children.length !== 0 ? (
                        <Link href={"listeclient"}>{item.name}</Link>
                      ):(
                        <>{item.name}</>
                      )}

                      {item.children.length !== 0 && (
                        <svg
                          className={classNames(
                            open
                              ? "dark:text-white rotate-90"
                              : "dark:text-gray-300",
                            "ml-auto flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150"
                          )}
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                        </svg>
                      )}
                    </Disclosure.Button>
                    {item.children.length !== 0 && (
                      <Disclosure.Panel className="space-y-1">
                        {item.children &&
                          Array.isArray(item.children) &&
                          item.children.map((subItem: any, index: number) => {
                            let Icon = IconMap[subItem.icon || "consicons/ug"];
                            console.log(subItem.children);
                            return (
                              <div
                                key={subItem.href}
                                style={{ marginLeft: `${subItem.level * 5}px` }}
                              >
                                <NavbarItem
                                  key={subItem.href}
                                  children={subItem.children}
                                  icon={subItem.icon}
                                  name={subItem.name}
                                />
                              </div>
                            );
                          })}
                      </Disclosure.Panel>
                    )}
                  </>
                );
              }}
            </Disclosure>*/}
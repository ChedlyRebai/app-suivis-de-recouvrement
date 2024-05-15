"use client";
import { Fragment, ReactNode, useEffect, useState } from "react";
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
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import SearchFonctionModal from "@/components/shared/Modals/Search-Fonction-Modal";
import ModalProviders from "@/providers/ModalProviders";
import { getSession } from "@/lib";

import NavbarItem from "./NavbarItem";
import ThemeButton from "@/components/shared/ThemeButton";
import { useLocale, useTranslations } from "next-intl";
import LocalSwitcher from "@/components/shared/Local-switcher";
import { usePathname } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import { IconMap } from "@/constants";

interface NavBarProps {
  children?: ReactNode;
  Resizpanel?: ReactNode;
  showSidebar?: boolean;
  session: any;
  title: string;
  links: any[];
}

const Mainlayout = ({
  children,
  session,
  Resizpanel,
  links: navigation,
  title,
  showSidebar,
}: NavBarProps) => {
  const navigaion = [
    { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
    { name: "Team", href: "#", icon: UsersIcon, current: false },
    { name: "Projects", href: "#", icon: FolderIcon, current: false },
    { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
    { name: "Documents", href: "#", icon: InboxIcon, current: false },
    { name: "Reports", href: "#", icon: BarChart2Icon, current: false },
  ];
  const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
  ];
  //console.log(navigation);
  console.log(navigaion);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [defaultSize, setDefaultSize] = useState(20);

  const pathname = usePathname();
  const local = useLocale();

  useEffect(() => {
    if (pathname !== `/${local}`) {
      console.log(pathname !== `/${local}`);
      // SetShowSideBar(false);
      console.log(defaultSize);
    }
    setDefaultSize(0);
  }, []);

  function classNames(...classes: String[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      {" "}
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-row w-screen min-h-screen h-screen"
      >
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 dark:bg-gray-800/40">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigaion &&
                      Array.isArray(navigation) &&
                      navigation.map((item) =>
                        !item.children ? (
                          <div key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-gray-900 text-white"
                                  : "text-white hover:bg-gray-700 hover:text-white",
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
                              {item.name}n
                            </a>
                          </div>
                        ) : (
                          <Disclosure
                            as="div"
                            key={item.name}
                            className="space-y-1"
                          >
                            {({ open }) => {
                              let Icon =
                                IconMap[item.icon || "consicons/users"];
                              return (
                                <>
                                  <Disclosure.Button
                                    className={classNames(
                                      item.current
                                        ? "bg-gray-900 text-white"
                                        : "text-white hover:bg-gray-700 hover:text-white",
                                      "group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    )}
                                  >
                                    <Icon
                                      className="mr-3 flex-shrink-0 h-4 w-4 text-white  group-hover:text-gray-300 "
                                      aria-hidden="true"
                                    />
                                    <span className="flex-1 capitalize">
                                      {item.name}z
                                    </span>
                                    <svg
                                      className={classNames(
                                        open
                                          ? "text-white rotate-90"
                                          : "text-gray-300",
                                        "ml-3 flex-shrink-0 h-4 w-4 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150"
                                      )}
                                      viewBox="0 0 20 20"
                                      aria-hidden="true"
                                    >
                                      <path
                                        d="M6 6L14 10L6 14V6Z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                  </Disclosure.Button>
                                  <Disclosure.Panel className="space-y-1">
                                    {item.children.map((subItem: any) => (
                                      <Disclosure.Button
                                        key={subItem.name}
                                        as="a"
                                        href={subItem.href}
                                        className="group capitalize w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
                                      >
                                        {subItem.name} {subItem.href}
                                      </Disclosure.Button>
                                    ))}
                                  </Disclosure.Panel>
                                </>
                              );
                            }}
                          </Disclosure>
                        )
                      )}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        {/* <Resizpanel /> */}
        {showSidebar && (
          <>
            <ResizablePanel
              defaultSize={20}
              className="hidden w-1/4 md:flex max-h-screen md:w-fit md:flex-col md:fixd md:inset-y-0"
            >
              {/* Sidebar component, swap this element with another sidebar if you
            like */}
              <div className="flex flex-col flex-grow pt-5   bg-gray-100/40 lg:block dark:bg-gray-800/40  overflow-y-auto">
                <div className="flex items-center justify-center flex-shrink-0 px-4 h-[60px] border-b">
                  <img
                    className="h-16 center"
                    src={"/images/logo.png"}
                    alt="Workflow"
                  />
                </div>
                <div className="mt-5 flex-1 flex flex-col h-screen">
                  <nav className="flex-1 px-2 pb-4 space-y-1 ">
                    {navigation &&
                      Array.isArray(navigation) &&
                      navigation.map((item: any, i) => (
                        <NavbarItem
                          key={item.name}
                          children={item.children}
                          name={item.name}
                          icon={item.Icon}
                          href={item.href}
                        />
                      ))}
                  </nav>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
          </>
        )}

        <ResizablePanel defaultSize={80} className="  flex flex-col flex-1">
          <Navbar session={session} onChange={setSidebarOpen} />
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default Mainlayout;

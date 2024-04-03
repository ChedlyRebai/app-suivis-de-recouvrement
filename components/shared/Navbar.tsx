import { Transition, Menu } from "@headlessui/react";
import {
  MenuIcon,
  HomeIcon,
  UsersIcon,
  BellIcon,
  ArrowBigLeft,
  ArrowLeft,
} from "lucide-react";
import React, { Fragment } from "react";
import LocalSwitcher from "./Local-switcher";
import ThemeButton from "./ThemeButton";
import { redirect, usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Cookies from "js-cookie";

type NavbarProps = {
  onChange: (value: boolean) => void;
  session: any;
};




const Navbar = ({ onChange, session }: NavbarProps) => {
  const logout= async()=>{
    const router = useRouter();
    Cookies.remove("session");
    router.push("/login");
  }
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="fixed w-screen top-0 z-10 flex-shrink-0 flex h-20  backdrop-blur-3xl shadow dark:border-b ">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <MenuIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      {pathname !== "/" && (
        <button
          type="button"
          className="px-4 border-r border-gray-200 dark:text-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 "
          onClick={() => router.push("/")}
        >
          <span className="sr-only">Open sidebar</span>
          <ArrowLeft className="h-6 w-6" aria-hidden="true" />
        </button>
      )}

      <div className="flex-1 backdrop-blur- mb  px-4 flex justify-between">
        <div className="flex-1 flex">
          <form className="w-full flex md:ml-0" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <div className="relative justify-between items-center flex w-full text-black focus-within:text-gray-600">
              <div className="justify-start mr-auto absolute inset-y-0 left-0 flex flex-col  pointer-events-none  pt-3">
                {/* <SearchIcon className="h-5 w-5" aria-hidden="true" /> */}
                <div className="flex mb-1 items-center text-gray-900 dark:text-white">
                  <HomeIcon
                    className="h-5 w-5 text-gray-900 dark:text-white"
                    aria-hidden="true"
                  />
                  <p className="pl-2 text-base text-gray-900 dark:text-white font-semibold  ">
                    {session?.matricule}
                  </p>
                </div>
                <div className="flex items-center  ">
                  <UsersIcon
                    className="h-5 w-5 text-gray-600 dark:text-gray-300"
                    aria-hidden="true"
                  />
                  <p className="pl-2 text-base text-gray-600 font-semibold dark:text-gray-300  ">
                    {session?.role}
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="ml-4 flex items-center md:ml-6">
          {/* <button
            type="button"
            className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button> */}
          <ThemeButton />
          
          <div className="w-1" />
          <LocalSwitcher />
          <Menu as="div" className="ml-3 relative pr-1">
            <div>
              <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              {/* <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <a
                        href={item.href}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        {item.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items> */}
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

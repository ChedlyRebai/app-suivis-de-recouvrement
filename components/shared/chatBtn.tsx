"use client";
import React from "react";
import { Button } from "../ui/button";
import useChatUiBubble from "@/hooks/use-chat";

const ChatBtn = () => {
  const { toggle } = useChatUiBubble();
  return (
    <Button
      className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-14 h-14 dark:bg-slate-50 bg-black hover:bg-gray-900 m-0 cursor-pointer  border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
      type="button"
      onClick={toggle}
      aria-haspopup="dialog"
      aria-expanded="false"
      data-state="closed"
    >
      <svg
        xmlns=" http://www.w3.org/2000/svg"
        width="28"
        // height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <path
          d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"
          className="border-gray-200"
        ></path>
      </svg>
    </Button>
  );
};

export default ChatBtn;

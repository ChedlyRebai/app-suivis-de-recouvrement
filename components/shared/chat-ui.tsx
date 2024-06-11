"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "../ui/button";
import useChatUiBubble from "@/hooks/use-chat";

const ChatUi = () => {
  const { isOpen, onClose, onOpen } = useChatUiBubble();
  const [messages, setMessages] = useState<any>([]);
  const [inputMessage, setInputMessage] = useState("");
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { text: inputMessage, sender: "user" },
    ]);
    setInputMessage("");

    try {
      const response = await fetch("https://release4.vercel.app/openai/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputMessage }),
      });
      const data = await response.json();
      console.log(data);
      setMessages((prevMessages: any) => [
        ...prevMessages,
        { text: data.finalContent, sender: "AI" },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!isOpen) {
    return "";
  }

  return (
    <div>
      <div className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-background p-6 rounded-lg border dark:border-[#e5e7eb] border-black w-[400px] ">
        <div className="pr-4 h-[365px] overflow-y-auto">
          {messages.map((message: any, index: number) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } gap-3 my-4 text-gray-600 dark:text-gray-100 text-sm`}
            >
              {message.sender === "AI" && (
                <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                  <div className="rounded-full bg-gray-100 border p-1">
                    <svg
                      stroke="none"
                      fill="black"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                      ></path>
                    </svg>
                  </div>
                </span>
              )}
              <p
                className={`text-sm dark:text-white text-black`}
                style={{ whiteSpace: "pre-line" }}
              >
                {message.text}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center pt-0">
          <div className="flex items-center justify-center w-full space-x-2">
            <Input
              placeholder="Type your message"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <Button
              variant={"secondary"}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
              onClick={sendMessage}
            >
              Envoyer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUi;

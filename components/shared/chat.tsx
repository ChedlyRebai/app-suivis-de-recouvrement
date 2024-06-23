"use client";
import { scrollToBottom, initialMessages } from "@/lib/utils";
import { ChatLine } from "./chat-line";
import { PromptSuggestion } from "./prompt-suggestion";
import { useChat, Message } from "ai/react";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Spinner } from "./spinner";

export function Chat() {
  const [suggestions, setSuggestions] = useState([
    "Who authored this paper?",
    "What is this paper about?",
    "Explain transformer architecture",
    "What is attention mechanism?",
  ]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [enterKeyPressed, setEnterKeyPressed] = useState(false);

  const {
    messages,
    setMessages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
  } = useChat({
    initialMessages,
    onFinish() {
      setShowSuggestions(true);
      setTimeout(() => scrollToBottom(containerRef), 100);
    },
  });

  useEffect(() => {
    setTimeout(() => scrollToBottom(containerRef), 100);
    setEnterKeyPressed(false);
  }, [messages]);

  useEffect(() => {
    document.getElementById("chat")?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        setEnterKeyPressed(true);
      }
    });
  }, []);

  const handleSuggestionClick = (text: string, index: number) => {
    if (enterKeyPressed) {
      setTimeout(() => setShowSuggestions(false), 0);
      return;
    }
    setInput(text);
    setTimeout(() => {
      setShowSuggestions(false);
      const newSuggestions = suggestions.filter((_s, i) => i !== index);
      setSuggestions(newSuggestions);
    }, 0);
  };

  const handleDelete = (id: string) => {
    setMessages(messages.filter((m) => m.id !== id));
  };

  return (
    <div className="rounded-2xl border h-[75vh] flex flex-col justify-between">
      <div className="p-6 overflow-auto" ref={containerRef}>
        {messages.map(({ id, role, content }: Message) => (
          <ChatLine
            key={id}
            id={id}
            role={role}
            content={content}
            handleDelete={handleDelete}
          />
        ))}
        {showSuggestions &&
          suggestions.map((s: string, i: number) => (
            <PromptSuggestion
              key={s}
              handleClick={handleSuggestionClick}
              text={s}
              index={i}
            />
          ))}
      </div>

      {isLoading && (
        <Button
          onClick={() => {
            stop();
            setShowSuggestions(true);
          }}
          className="px-2 pr-3 absolute left-1/2 -translate-x-1/2 top-3/4 -translate-y-full"
        >
          <span className="pr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
              />
            </svg>
          </span>
          Stop Generating
        </Button>
      )}

      <form id="chat" onSubmit={handleSubmit} className="p-4 flex clear-both">
        <Input
          value={input}
          placeholder={"Type to chat with AI..."}
          onChange={handleInputChange}
          className="mr-2"
        />

        <Button type="submit" className="w-24">
          {isLoading ? <Spinner /> : "Ask"}
        </Button>
      </form>
    </div>
  );
}

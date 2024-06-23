import { Chat } from "@/components/shared/chat";
import { ModeToggle } from "@/components/shared/mode-toggle";

export default function Home() {
  return (
    <div className="bg-hero-patter px-3 bg-slate-100 min-h-screen py-6 mt-16  dark:bg-muted/40 ">
      <div className="py-6 min-h-60">
        <div className="flex flex-1 py-4">
          <div className="w-full">
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
}

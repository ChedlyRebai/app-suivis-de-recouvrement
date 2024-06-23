import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Message } from "ai/react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const formatContent = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));
type Props = Partial<Message> & { handleDelete: (id: string) => void };

export function ChatLine({
  id = "",
  role = "assistant",
  content,
  handleDelete,
}: Props) {
  if (!content) {
    return null;
  }
  const formattedMessage = formatContent(content);

  return (
    <div>
      <Card className="mb-2">
        <CardHeader className="pb-3">
          <CardTitle
            className={cn(
              `${
                role === "assistant"
                  ? "text-blue-500 dark:text-blue-200"
                  : "text-amber-500 dark:text-amber-200"
              }`,
              "flex justify-between items-center"
            )}
          >
            <span>{role === "assistant" ? "AI" : "You"}</span>
            <Button className="bg-white px-3" onClick={() => handleDelete(id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="#000"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>{formattedMessage}</CardContent>
      </Card>
    </div>
  );
}

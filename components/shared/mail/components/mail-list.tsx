import { ComponentProps } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Mail } from "../data";
import { useMail } from "../use-mail";
import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import useInbox from "@/hooks/use-inbox-hook";

interface IProps {
  items: Mail[];
  initialData: any[];
  search: string;
  limit: number;
}
export function MailList({ items, initialData, search, limit }: IProps) {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();
  const [isDisable, setDisable] = useState(false);

  async function loadMoreData() {
    const next = page + 1;
    const offset = next * limit;
    //const { data: newData } = await GetPokemons({ search, offset, limit })
    const newData: any = [];
    if (newData.length) {
      setPage(next);
      setData((prev: any[] | undefined) => [
        ...(prev?.length ? prev : []),
        ...newData,
      ]);
    } else {
      setDisable(true);
    }
  }

  useEffect(() => {
    if (inView) {
      loadMoreData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  const [mail, setMail] = useMail();
  const { alerte, setAlert, setId } = useInbox();
  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              mail.selected === item.id && "bg-muted"
            )}
            onClick={() => {
              console.log("item", item);
            }}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.name}</div>
                  {!item.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    mail.selected === item.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {/* {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                  })} */}
                </div>
              </div>
              <div className="text-xs font-medium">{item.subject}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.text.substring(0, 300)}
            </div>
            {item.labels.length ? (
              <div className="flex items-center gap-2">
                {item.labels.map((label) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null}
          </button>
        ))}
      </div>
      {!isDisable ? (
        <div
          ref={ref}
          className="mt-6 flex flex-col items-center justify-center"
        >
          <Loader2 className="animate-spin" size={48} />
        </div>
      ) : (
        <></>
      )}
    </ScrollArea>
  );
}

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}

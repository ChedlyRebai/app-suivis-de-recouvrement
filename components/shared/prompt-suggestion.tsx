import { Card } from "../ui/card";

type Props = {
  text: string;
  index: number;
  handleClick: (text: string, index: number) => void;
};

export function PromptSuggestion({ text, index, handleClick }: Props) {
  return (
    <Card
      className="mt-4 w-max hover:cursor-pointer border-none"
      onClick={() => handleClick(text, index)}
    >
      <button className="p-2 px-5 rounded-xl" form="chat" type="submit">
        <span className="pr-2">💡</span>
        {text}
      </button>
    </Card>
  );
}

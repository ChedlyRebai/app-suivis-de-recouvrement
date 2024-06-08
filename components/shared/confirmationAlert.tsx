// replace with your actual import
import {
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialog,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface AlertProps {
  icon?: React.ReactNode;
  buttonText: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  title?: string;
  description?: string;
  disabled?: boolean;
  onConfirm: () => void;
}

const AlertConfirmation: React.FC<AlertProps> = ({
  icon,
  buttonText,
  title,
  variant,
  disabled,
  description,
  onConfirm,
}) => {
  if (disabled) {
    return (
      <Button
        className="flex items-center"
        disabled={disabled}
        variant={variant}
      >
        {buttonText} {icon}
      </Button>
    );
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center justify-center">
        <Button
          className="flex items-center"
          disabled={disabled}
          variant={variant}
        >
          {buttonText} {icon}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertConfirmation;

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAuthModal from "@/hooks/use-fonction-search-modal";

interface ModalProps {
  isOpen: boolean;
  onChange: () => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  onChange,
  title,
  description,
  children,
  isOpen,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {/* this is how it can be used */}
          <DialogClose />
        </DialogFooter>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;

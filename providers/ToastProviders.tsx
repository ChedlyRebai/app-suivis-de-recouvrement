import toast, { Toaster } from "react-hot-toast";
import { Toaster as ShadecnToaster } from "@/components/ui/toaster";
const ToastProviders = () => {
  return (
    <>
      <Toaster position="top-right" />
      <ShadecnToaster />
    </>
  );
};

export default ToastProviders;

import { getAllFunctions } from "@/actions/fonction.action";
import { Payment, columns } from "./_component/columns";
import { DataTable } from "./_component/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAllDroitAccess } from "@/actions/droit_accees.action";
import { droit_accees } from "@/Models/droit_accees.model";
import SearchFonctionModal from "@/components/shared/Search-Fonction-Modal";
export default async function Page() {
  return (
    <div>
      <DataTable columns={columns} />
    </div>
  );
}

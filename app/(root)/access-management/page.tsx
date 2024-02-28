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

async function getData(): Promise<droit_accees[]> {
  // Fetch data from your API here.
  return [
    {
      ordre1: 5,
      ordre2: 5,
      nom: "Affectation des clients",
      icon: "consicons/fonctions",
      valeur: 244221,
      sup: 24422,
      nom_module: "IMP_CLIENTAC",
      flg_url: "N",
      indice_alerte: null!!!!,
      icon_alerte: null!!!!,
      code_fonction: 10,
      acces: "N",
      creation: "O",
      modification: "O",
      suppression: "N",
      sup_alerte: null!!!!,
      flag_acces_dos: "N",
      req: null!!!!,
      req2: null!!!!,
      id: 97,
    },
    {
      ordre1: 5,
      ordre2: 5,
      nom: "Lettres de mise en demeure",
      icon: "consicons/fonctions",
      valeur: 244232,
      sup: 24423,
      nom_module: null!!!!,
      flg_url: "N",
      indice_alerte: null!!!!,
      icon_alerte: null!!!!,
      code_fonction: 10,
      acces: "N",
      creation: "O",
      modification: "O",
      suppression: "N",
      sup_alerte: null!!,
      flag_acces_dos: "N",
      req: null!!,
      req2: null!!,
      id: 98,
    },
    {
      ordre1: 5,
      ordre2: 5,
      nom: "Demande de transfert anticip�",
      icon: "consicons/fonctions",
      valeur: 244241,
      sup: 24424,
      nom_module: "IMP_TRANSANTDC",
      flg_url: "N",
      indice_alerte: null!!,
      icon_alerte: null!!,
      code_fonction: 10,
      acces: "O",
      creation: "O",
      modification: "N",
      suppression: "N",
      sup_alerte: null!!,
      flag_acces_dos: "N",
      req: null!!,
      req2: null!!,
      id: 99,
    },
    {
      ordre1: 5,
      ordre2: 5,
      nom: "Consultation impay�e",
      icon: "consicons/fonctions",
      valeur: 244254,
      sup: 24425,
      nom_module: "IMP_CONSULTATION",
      flg_url: "N",
      indice_alerte: null!!,
      icon_alerte: null!!,
      code_fonction: 10,
      acces: "O",
      creation: "O",
      modification: "O",
      suppression: "N",
      sup_alerte: null!!,
      flag_acces_dos: null!!,
      req: null!!,
      req2: null!!,
      id: 100,
    },
    // ...
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <div>
      <SearchFonctionModal />
      <DataTable columns={columns} />
    </div>
  );
}

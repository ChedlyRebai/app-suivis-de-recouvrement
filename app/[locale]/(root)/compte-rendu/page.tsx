
import CompteRenduForm from "./_component/Compte-rendu-form";
import {
  getCompterendu,
  getListCompte,
  getListCompteRenduHistorique,
} from "@/actions/client.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    cli?: string;
  };
}) {
  
  const cli = searchParams?.cli || "";
  const suiviAgenda = await getCompterendu(cli);
  const listecompte = await getListCompte(cli);
  const historiqueCompteRendu = await getListCompteRenduHistorique(cli);
  console.log("suiviAgenda")
  console.log(suiviAgenda)
  return (
    <div className="bg-hero-patter px-3 bg-slate-100 min-h-screen py-6 mt-16  dark:bg-muted/40 ">
      <div className="py-6 min-h-60">
        <Card className="min-h-56">
          {" "}
          <CardHeader>
            <CardTitle>Compte Rendu</CardTitle>
          </CardHeader>
          <CardContent>
            <CompteRenduForm
              suiviAgenda={suiviAgenda}
              listcompte={listecompte}
              historiqueCompteRendu={historiqueCompteRendu}
            />
          </CardContent>
        </Card>{" "}
      </div>
    </div>
  );
}

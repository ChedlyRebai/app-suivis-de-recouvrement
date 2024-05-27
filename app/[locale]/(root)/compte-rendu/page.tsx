import CompteRenduForm from "./_component/Compte-rendu-form";
import {
  getCompterendu,
  getListCompte,
  getListCompteRenduHistorique,
} from "@/actions/client.action";
import { getMotif } from "@/actions/motif.action";
import {
  getappreciation,
  getcomptrendutypes,
  getcontact,
} from "@/actions/utils.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    cli?: string;
  };
}) {
  // const { isPending: MotifPending, data: Motifdata } = useQuery({
  //   queryKey: ["getMotif"],
  //   queryFn: async () => await getMotif(),
  // });

  // const { isPending: contactpending, data: contactdata } = useQuery({
  //   queryKey: ["getcontact"],
  //   queryFn: async () => await getcontact(),
  // });
  // const { isPending: comptrendutypespending, data: comptrendutypesdata } =
  //   useQuery({
  //     queryKey: ["getconptrendutypes"],
  //     queryFn: async () => await getcomptrendutypes(),
  //   });
  // const { isPending: appreciationpending, data: appreciationdata } = useQuery({
  //   queryKey: ["appreciation"],
  //   queryFn: async () => await getappreciation(),
  // });
  const comptrendutypesdata = await getcomptrendutypes();
  const Motifdata = await getMotif();
  const contactdata = await getcontact();
  const cli = searchParams?.cli || "";
  const suiviAgenda = await getCompterendu(cli);
  const appreciationdata = await getappreciation();
  const listecompte = await getListCompte(cli);
  const historiqueCompteRendu = await getListCompteRenduHistorique(cli);
  console.log("suiviAgenda", suiviAgenda);
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
              appreciationdata={appreciationdata}
              Motifdata={Motifdata}
              contactdata={contactdata}
              comptrendutypesdata={comptrendutypesdata}
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

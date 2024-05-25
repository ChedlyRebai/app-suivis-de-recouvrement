import { getAllfiles, getAllfilesByClientId } from "@/actions/file.action";
import { AllFilles } from "../_component/allfiles";
import { filecolumns } from "../_component/fileColumn";
import { getAllHistorique } from "@/actions/historique.action";
import { AllHistoriques } from "./_components/allHistoriques";
import { HistoriqueColumn } from "./_components/historiqueColumn";
export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
    perPage?: string;
    groupe?: string;
    agence?: string;
  };
}) {
  const search = searchParams?.query || "";
  const group = searchParams?.groupe || "";
  const agence = searchParams?.agence || "";

  const currentPage = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 5;
  const limit = Number(searchParams?.limit) || 20;

  const historiques = await getAllHistorique(currentPage, perPage, search);

  return (
    <AllHistoriques
      columns={HistoriqueColumn}
      totalPages={0}
      data={historiques.result || []}
    />
  );
}

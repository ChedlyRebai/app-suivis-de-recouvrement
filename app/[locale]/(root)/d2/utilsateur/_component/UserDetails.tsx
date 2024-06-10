import { UserDetails } from "@/actions/utilisateur.action";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const UserInfo = ({ user }: { user: UserDetails }) => {
  console.log(user);
  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {user?.usr_nomprenom}
          </CardTitle>
          <CardDescription>{user?.usr_matricule}</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1"></div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">User Details</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Agence <span></span>
              </span>
              <span>
                {user?.AffecterA?.[0]?.Agence?.codug} :{" "}
                {user?.AffecterA?.[0]?.Agence?.libelle}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Zone <span></span>
              </span>
              <span>
                {user?.AffecterA?.[0]?.Zone?.codug} :{" "}
                {user?.AffecterA?.[0]?.Zone?.libelle}
              </span>
            </li>
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Department:</span>
              <span>{user?.fonction?.departement?.nom_depart}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Fonction </span>
              <span>{user?.fonction?.lib_fonction}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Telephone</span>
              <span>{user?.tel_chargee}</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Email</span>
              <span>{user?.email_chargee}</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          <time>{user?.created_at?.toString()?.substring(0, 10)}</time>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserInfo;

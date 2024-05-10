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
            {/* <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy Order ID</span>
                </Button> */}
          </CardTitle>
          <CardDescription>{user?.usr_matricule}</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          {/* <Button size="sm" variant="outline" className="h-8 gap-1">
                <Truck className="h-3.5 w-3.5" />
                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                  Track Order
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <MoreVertical className="h-3.5 w-3.5" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Trash</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
        </div>
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
        {/* <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <div className="font-semibold">Shipping Information</div>
                <address className="grid gap-0.5 not-italic text-muted-foreground">
                  <span>Liam Johnson</span>
                  <span>1234 Main St.</span>
                  <span>Anytown, CA 12345</span>
                </address>
              </div>
              <div className="grid auto-rows-max gap-3">
                <div className="font-semibold">Billing Information</div>
                <div className="text-muted-foreground">
                  Same as shipping address
                </div>
              </div>
            </div> */}
        {/* <Separator className="my-4" /> */}
        {/* <div className="grid gap-3">
              <div className="font-semibold">Contact inforamation</div>
              <dl className="grid gap-3">
                
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Address</dt>
                  <dd>Liam Johnson</dd>
                </div>

                

                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd>
                    <a href="mailto:">liam@acme.com</a>
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Telephone 1</dt>
                  <dd>
                    <a href="tel:">{user??.tel1}</a>
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Telephone 2</dt>
                  <dd>
                    <a href="tel:">{user??.tel2}</a>
                  </dd>
                </div>
              </dl>
            </div>
            <Separator className="my-4" /> */}
        {/* <div className="grid gap-3">
              <div className="font-semibold">Payment Information</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-1 text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    Visa
                  </dt>
                  <dd>**** **** **** 4532</dd>
                </div>
              </dl>
            </div> */}
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          <time>{user?.created_at?.toString()?.substring(0, 10)}</time>
        </div>
        {/* <Pagination className="ml-auto mr-0 w-auto">
                  <PaginationContent>
                    <PaginationItem>
                      <Button size="icon" variant="outline" className="h-6 w-6">
                        <ChevronLeft className="h-3.5 w-3.5" />
                        <span className="sr-only">Previous Order</span>
                      </Button>
                    </PaginationItem>
                    <PaginationItem>
                      <Button size="icon" variant="outline" className="h-6 w-6">
                        <ChevronRight className="h-3.5 w-3.5" />
                        <span className="sr-only">Next Order</span>
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination> */}
      </CardFooter>
    </Card>
  );
};

export default UserInfo;

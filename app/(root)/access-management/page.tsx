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

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "che@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "mohamed@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "karim@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "hichem@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "che@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "mohamed@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "karim@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "hichem@example.com",
    },
    // ...
  ];
}

export default async function Page() {
  const data = await getData();
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

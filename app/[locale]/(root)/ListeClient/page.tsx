"use server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTableContactes } from "./_components/contactes/data-table-contactes";
import { columns } from "./_components/contactes/columns";

const page = () => {
  return (
    <div>
      <div className="py-6">
        <div className=" mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white"></h1>
        </div>
        <div className=" mx-auto px-4 sm:px-6 md:px-8">
          <Tabs defaultValue="account" className="">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="noncontactes">
                Liste des clients non contactés{" "}
              </TabsTrigger>

              <TabsTrigger value="contactes">
                Liste des clients contactés{" "}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="noncontactes">
              <div className="py-6">
                <div className=" mx-auto px-4 sm:px-6 md:px-8">
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Liste des clients non contactés{" "}
                  </h1>
                </div>
                <div className=" mx-auto px-4 sm:px-6 md:px-8">
                  <DataTableContactes
                    columns={columns}
                    data={[]}
                    type="noncontactes"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="contactes">
              <div className="py-6">
                <div className=" mx-auto px-4 sm:px-6 md:px-8">
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Liste des clients contactés{" "}
                  </h1>
                </div>
                <div className=" mx-auto px-4 sm:px-6 md:px-8">
                  <DataTableContactes
                    columns={columns}
                    data={[]}
                    type="noncontactes"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default page;

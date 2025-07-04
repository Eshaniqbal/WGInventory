import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getInventoryItems, getLowStockCount, getProductCount } from "@/lib/data";
import { Boxes, IndianRupee, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { InventoryOverviewChart } from "./components/inventory-overview-chart";
import { DashboardActions } from "./components/dashboard-actions";
import { AuthGuard } from "@/components/auth-guard";
import { MainLayout } from "@/components/layout/main-layout";

export default async function Dashboard() {
  const allItems = await getInventoryItems();
  const totalProducts = await getProductCount();
  const lowStockCount = await getLowStockCount();
  
  const recentItems = allItems.slice(0, 5);
  const totalValue = allItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const chartData = allItems.map(item => ({
    name: item.name,
    total: item.quantity
  }));

  return (
    <AuthGuard>
      <MainLayout>
        <div className="flex flex-col gap-8">
          <PageHeader
            title="Dashboard"
            actions={<DashboardActions />}
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Boxes className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalProducts}</div>
                <p className="text-xs text-muted-foreground">
                  Across all items
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Inventory Value
                </CardTitle>
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(totalValue)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Estimated value of all stock
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{lowStockCount}</div>
                <p className="text-xs text-muted-foreground">
                  Items with quantity less than 10
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[2fr_3fr]">
            <InventoryOverviewChart data={chartData} />
            <Card>
              <CardHeader>
                <CardTitle>Recently Added Items</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Date Added</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item.price)}</TableCell>
                        <TableCell>
                          {format(new Date(item.createdAt), "PPP")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    </AuthGuard>
  );
}

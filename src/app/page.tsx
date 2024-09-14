import { DashboardCard } from "@/components/dashboard-card";
import { Calendar, DollarSign, PersonStanding, UserPlus } from "lucide-react";

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-5">
      <h1 className="mx-6 text-center text-2xl font-bold">DashBoard</h1>
      <div className="container mx-auto py-8">
        <div className="flex w-full flex-col gap-5">
          <section className="sm:grid-cols-2 xl:grid-cols-4 grid w-full grid-cols-1 gap-x-4 transition-all">
            <DashboardCard
              label={"Total Revenue"}
              Icon={DollarSign}
              amount={43545}
              description="All Time"
            />
            <DashboardCard
              label={"Total Paid Subscriptions"}
              Icon={Calendar}
              amount={43545}
              description="All Time"
            />
            <DashboardCard
              label={"Total Users"}
              Icon={PersonStanding}
              amount={43545}
              description="All Time"
            />
            <DashboardCard
              label={"Users This month"}
              Icon={UserPlus}
              amount={43545}
              description="This Month"
            />
          </section>
        </div>
      </div>
    </div>
  );
}

import { DashboardCard, DashboardCardContent } from "@/components/dashboard-card";
import UserDataCard, { UserDataProps } from "@/components/User-data-card";
import { Calendar, DollarSign, PersonStanding, UserPlus, UserRoundCheck } from "lucide-react";
import { db } from "@/lib/db";
import { formatDistanceToNow } from "date-fns";

export default async function DashBoard() {

  const recentUsers = await db.user.findMany({
    orderBy: {
      createdAt:'desc'
    }, 
    take: 8
  });

  const UserData: UserDataProps[] = recentUsers.map((account: { name: any; email: any; image: any; createdAt: string | number | Date; }) => ({
    name: account.name || 'unknown',
    email: account.email || 'unknow',
    image: account.image || './mesh.jpg',
    time : formatDistanceToNow(new Date(account.createdAt),{addSuffix:true})
  }))
  
  return (
    <div className="flex w-full flex-col gap-5">
      <h1 className="mx-6 text-center text-2xl font-bold">DashBoard</h1>
      <div className="container mx-auto py-8">
        <div className="flex w-full flex-col gap-5">
          <section className="grid w-full grid-cols-1 gap-x-4 transition-all sm:grid-cols-2 xl:grid-cols-4">
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
          <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
            <DashboardCardContent>
              <section className="flex justify-between gap-2 pb-2">
                <p>Recent Users</p>
                <UserRoundCheck className="h-4 w-4" />
              </section>
              {UserData.map((data, index) => (
                <UserDataCard
                  key={index}
                  name={data.name}
                  email={data.email}
                  image={data.image}
                  time={data.time}
                />
              ))}
            </DashboardCardContent>
          </section>
        </div>
      </div>
    </div>
  );
}

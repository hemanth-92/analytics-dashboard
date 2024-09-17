import { DashboardCard, DashboardCardContent } from "@/components/dashboard-card";
import UserDataCard, { UserDataProps } from "@/components/User-data-card";
import { Calendar, CreditCard, DollarSign, PersonStanding, UserPlus, UserRoundCheck } from "lucide-react";
import { db } from "@/lib/db";
import { endOfMonth,startOfMonth,formatDistanceToNow, eachMonthOfInterval } from "date-fns";
import UserPurchaseCard,{ UserPurchaseProps } from "@/components/user-purchase-card";
import { format } from "date-fns/format";
import BarChart from "@/components/barchart";
import LineGraph from "@/components/linechart";
import GoalDataCard from "@/components/goals";

export default async function DashBoard() {

  const recentUsers = await db.user.findMany({
    orderBy: {
      createdAt:'desc'
    }, 
    take: 8
  });

  const UserData: UserDataProps[] = recentUsers.map((account) => ({
    name: account.name || 'unknown',
    email: account.email || 'unknow',
    image: account.image || './mesh.jpg',
    time : formatDistanceToNow(new Date(account.createdAt),{addSuffix:true})
  }))
  
  const salesCount = await db.purchase.count()

  const salesTotal  = await db.purchase.aggregate({
    _sum: {
    amount :true
    }
  })
  
  const totalAmount = salesTotal._sum.amount || 0

  // user count
  const userCount =  await db.user.count()

const currentDate =  new Date()

  // user count this month
  const userCountMonth = await db.user.count({
    where: {
      createdAt: {
        gte: startOfMonth(currentDate),
        lte: endOfMonth(currentDate),
      },
    },
  });


  const recentSales = await db.purchase.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 8,
    include: {
      user:true,
    }
  })


  const PurchaseCard: UserPurchaseProps[] = recentSales.map((purchase => ({
      name: purchase.user.name || 'unknown',
    email: purchase.user.email || 'unknow',
    image: purchase.user.image || './mesh.jpg',
    salesAmount:`$${(purchase.amount || 0 ).toFixed(2)}`
  })))
  
    // users this month

  const userThisMonth = await db.user.groupBy({
    by: ['createdAt'],
    _count: {
      createdAt:true
    },
    orderBy: {
      createdAt:"asc"
    }
  })

  const montlyUsersData = eachMonthOfInterval({
    start: startOfMonth(new Date(userThisMonth[0]?.createdAt || new Date())),
    end: endOfMonth(currentDate),
  }).map(month => {
    const monthString = format(month, 'MMM');
    const userMonthly = userThisMonth.filter(user => format(new Date(user.createdAt), 'MMM') === monthString).reduce((total, user) => total + user._count.createdAt, 0);
    return { month:monthString,total:userMonthly}
  })
  
  const salesThisMonth = await db.purchase.groupBy({
    by: ['createdAt'],
    _sum: {
      amount: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  const monthlySalesData = eachMonthOfInterval({
    start: startOfMonth(new Date(salesThisMonth[0]?.createdAt || new Date())),
    end: endOfMonth(currentDate),
  }).map((month) => {
    const monthString = format(month, "MMM");
    const salesInMonth = salesThisMonth
      .filter(
        (sales) => format(new Date(sales.createdAt), "MMM") === monthString,
      )
      .reduce((total, sale) => total + sale._sum.amount!, 0);
    return { month: monthString, total: salesInMonth };
  });

  // Goal amount 
  const goalAmount = 2000;
  const goalProgress = totalAmount / goalAmount * 100;

  return (
    <div className="flex w-full flex-col gap-5">
      <h1 className="mx-6 text-center text-2xl font-bold">DashBoard</h1>
      <div className="container mx-auto py-8">
        <div className="flex w-full flex-col gap-5">
          <section className="grid w-full grid-cols-1 gap-x-4 transition-all sm:grid-cols-2 xl:grid-cols-4">
            <DashboardCard
              label={"Total Revenue"}
              Icon={DollarSign}
              amount={`$${totalAmount}`}
              description="All Time"
            />
            <DashboardCard
              label={"Total Paid Subscriptions"}
              Icon={Calendar}
              amount={`+${salesCount}`}
              description="All Time"
            />
            <DashboardCard
              label={"Total Users"}
              Icon={PersonStanding}
              amount={`+${userCount}`}
              description="All Time"
            />
            <DashboardCard
              label={"Users This month"}
              Icon={UserPlus}
              amount={`${userCountMonth}`}
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
            <DashboardCardContent>
              <section className="flex justify-between gap-2 pb-2">
                <p>Recent Sales</p>
                <CreditCard className="h-4 w-4" />
              </section>
              {PurchaseCard.map((data, index) => (
                <UserPurchaseCard
                  key={index}
                  name={data.name}
                  email={data.email}
                  image={data.image}
                  salesAmount={data.salesAmount}
                />
              ))}
            </DashboardCardContent>
          </section>
          <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
            <BarChart data={montlyUsersData} />
            <LineGraph data={monthlySalesData} />
          </section>
          <GoalDataCard goal={goalAmount} value={goalProgress} />
        </div>
      </div>
    </div>
  );
}

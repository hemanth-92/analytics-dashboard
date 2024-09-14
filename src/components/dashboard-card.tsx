import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardCardsProps {
  label: string;
  Icon: LucideIcon;
  amount: any;
  description: string;
}

export const DashboardCard = ({
  label,
  Icon,
  amount,
  description,
}: DashboardCardsProps) => {
  return (
    <div className="flex w-full flex-col gap-3 rounded-[6px] border bg-slate-100/40 p-5 shadow">
      <section className="flex justify-between gap-2">
        <p className="text-sm">{label}</p>
        <Icon className="h-4 w-4" />
      </section>
      <section className="flex justify-between gap-2">
        <h2 className="text-2xl font-semibold">{amount}</h2>
        <p className="text-sm">{description}</p>
      </section>
    </div>
  );
};

export function DashboardCardContent(
  props: React.HTMLAttributes<HTMLDivElement>,
) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full flex-col gap-3 rounded-[6px] bg-slate-100/40 p-5 shadow",
        props.className,
      )}
    />
  );
}

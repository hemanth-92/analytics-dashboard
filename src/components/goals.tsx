import { Target } from "lucide-react"
import { Progress } from "./ui/progress"

export type GoalProps = {
  value: number,
  goal:number,
}

export default function GoalDataCard(props: GoalProps) {
  return (
    <div className="bg-slate-100/70 rounded-[6px] p-5">
      <section className="flex justify-between pb-2 gap-3">
        <p>Goals progress</p>
        <Target className="w-4 h-4"/>
      </section>
      <div className="gap-3 pt-2">
        <section className="flex justify-between gap-3">
          <div className="w-full rounded-full">
            <Progress value={props.value} className="border border-black/10  bg-slate-100/20 h-2 "/>
          </div>
        </section>
        <div className="flex justify-between text-sm opacity-50 pt-3">
          <p>Goals :${props.goal}</p>
          <p>${ Math.round(props.value) * 10} made</p>
        </div>
      </div>
    </div>
  )
}
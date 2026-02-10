"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from "recharts"
import { RiRobot2Line } from "@remixicon/react"

const cobots = [
  { id: "UR-10e #1", status: "running", task: "Pick & Place", cycles: 12847, cycleTime: "4.2s", load: 78, joints: { temp: 42, torque: 65 } },
  { id: "UR-10e #2", status: "running", task: "Welding", cycles: 9632, cycleTime: "6.8s", load: 92, joints: { temp: 51, torque: 78 } },
  { id: "UR-5e #3", status: "idle", task: "Awaiting Parts", cycles: 7451, cycleTime: "3.1s", load: 0, joints: { temp: 28, torque: 0 } },
  { id: "UR-16e #4", status: "running", task: "Assembly", cycles: 15203, cycleTime: "5.5s", load: 85, joints: { temp: 47, torque: 71 } },
  { id: "UR-10e #5", status: "running", task: "Inspection", cycles: 18920, cycleTime: "2.9s", load: 45, joints: { temp: 38, torque: 42 } },
  { id: "UR-20e #6", status: "maintenance", task: "Scheduled Maint.", cycles: 22105, cycleTime: "—", load: 0, joints: { temp: 24, torque: 0 } },
]

const statusConfig: Record<string, { color: string; dot: string }> = {
  running: { color: "text-forge-green", dot: "bg-forge-green status-online" },
  idle: { color: "text-forge-amber", dot: "bg-forge-amber" },
  maintenance: { color: "text-muted-foreground", dot: "bg-muted-foreground" },
}

const utilizationData = cobots.map((c) => ({
  name: c.id,
  utilization: c.load,
}))

const utilizationConfig = {
  utilization: {
    label: "Utilization %",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const cycleTimeData = [
  { hour: "06:00", ur10e1: 4.2, ur10e2: 6.9, ur5e3: 3.0, ur16e4: 5.6 },
  { hour: "07:00", ur10e1: 4.1, ur10e2: 6.7, ur5e3: 3.2, ur16e4: 5.4 },
  { hour: "08:00", ur10e1: 4.3, ur10e2: 6.8, ur5e3: 3.1, ur16e4: 5.5 },
  { hour: "09:00", ur10e1: 4.0, ur10e2: 7.0, ur5e3: 3.3, ur16e4: 5.3 },
  { hour: "10:00", ur10e1: 4.2, ur10e2: 6.6, ur5e3: 3.1, ur16e4: 5.7 },
  { hour: "11:00", ur10e1: 4.4, ur10e2: 6.9, ur5e3: 3.0, ur16e4: 5.5 },
  { hour: "12:00", ur10e1: 4.5, ur10e2: 7.1, ur5e3: 3.4, ur16e4: 5.8 },
  { hour: "13:00", ur10e1: 4.3, ur10e2: 6.8, ur5e3: 3.2, ur16e4: 5.4 },
  { hour: "14:00", ur10e1: 4.1, ur10e2: 6.7, ur5e3: 3.1, ur16e4: 5.6 },
  { hour: "15:00", ur10e1: 4.2, ur10e2: 6.8, ur5e3: 3.0, ur16e4: 5.5 },
]

const cycleTimeConfig = {
  ur10e1: { label: "UR-10e #1", color: "var(--chart-1)" },
  ur10e2: { label: "UR-10e #2", color: "var(--chart-2)" },
  ur5e3: { label: "UR-5e #3", color: "var(--chart-3)" },
  ur16e4: { label: "UR-16e #4", color: "var(--chart-4)" },
} satisfies ChartConfig

export default function RobotPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      {/* Cobot Status Cards */}
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
        {cobots.map((cobot) => {
          const status = statusConfig[cobot.status]
          return (
            <Card key={cobot.id} className="relative overflow-hidden">
              <div className={`absolute top-0 left-0 h-0.5 w-full ${cobot.status === "running" ? "bg-forge-green/60" : cobot.status === "idle" ? "bg-forge-amber/60" : "bg-muted-foreground/40"}`} />
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <RiRobot2Line className="size-4" />
                  {cobot.id}
                </CardDescription>
                <CardTitle className="flex items-center justify-between">
                  <span className="font-display text-lg">{cobot.task}</span>
                  <Badge variant="outline" className="gap-1.5">
                    <span className={`size-1.5 rounded-full ${status.dot}`} />
                    <span className={`text-xs capitalize ${status.color}`}>{cobot.status}</span>
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground text-xs">Cycles</div>
                    <div className="font-mono font-medium tabular-nums">{cobot.cycles.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Cycle Time</div>
                    <div className="font-mono font-medium tabular-nums">{cobot.cycleTime}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Load</div>
                    <div className="font-mono font-medium tabular-nums">{cobot.load}%</div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-4 border-t pt-3 text-sm">
                  <div>
                    <div className="text-muted-foreground text-xs">Joint Temp</div>
                    <div className={`font-mono font-medium tabular-nums ${cobot.joints.temp > 50 ? "text-forge-red" : ""}`}>
                      {cobot.joints.temp}°C
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Torque</div>
                    <div className="font-mono font-medium tabular-nums">{cobot.joints.torque}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @5xl/main:grid-cols-2">
        {/* Utilization Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Robot Utilization</CardTitle>
            <CardDescription>Current load percentage per cobot</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={utilizationConfig} className="aspect-auto h-[250px] w-full">
              <BarChart data={utilizationData} layout="vertical">
                <CartesianGrid horizontal={false} strokeOpacity={0.3} />
                <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  width={80}
                  tick={{ fontSize: 12 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="utilization" fill="var(--color-utilization)" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Cycle Time Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Cycle Time Trends</CardTitle>
            <CardDescription>Seconds per cycle — today by hour</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={cycleTimeConfig} className="aspect-auto h-[250px] w-full">
              <LineChart data={cycleTimeData}>
                <CartesianGrid vertical={false} strokeOpacity={0.3} />
                <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} domain={[2, 8]} width={30} />
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                <Line type="monotone" dataKey="ur10e1" stroke="var(--color-ur10e1)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="ur10e2" stroke="var(--color-ur10e2)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="ur5e3" stroke="var(--color-ur5e3)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="ur16e4" stroke="var(--color-ur16e4)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

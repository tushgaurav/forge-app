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
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Bar, BarChart } from "recharts"
import { RiTempHotLine, RiWaterFlashLine, RiEarthquakeLine, RiDropLine } from "@remixicon/react"

const sensorOverview = [
  { label: "Temperature", value: "72.4°C", status: "normal", change: "+1.2°C", icon: RiTempHotLine, count: 24 },
  { label: "Pressure", value: "4.8 bar", status: "normal", change: "-0.1 bar", icon: RiWaterFlashLine, count: 16 },
  { label: "Vibration", value: "2.3 mm/s", status: "warning", change: "+0.8 mm/s", icon: RiEarthquakeLine, count: 12 },
  { label: "Humidity", value: "45%", status: "normal", change: "+2%", icon: RiDropLine, count: 8 },
]

const statusColors: Record<string, { dot: string; text: string }> = {
  normal: { dot: "bg-forge-green status-online", text: "text-forge-green" },
  warning: { dot: "bg-forge-red status-online", text: "text-forge-red" },
}

const generateTempData = () => {
  const data = []
  for (let i = 0; i < 24; i++) {
    const hour = `${String(i).padStart(2, "0")}:00`
    data.push({
      hour,
      zone1: 68 + Math.random() * 10,
      zone2: 72 + Math.random() * 8,
      zone3: 65 + Math.random() * 12,
    })
  }
  return data
}

const tempData = generateTempData()

const tempConfig = {
  zone1: { label: "Zone A", color: "var(--chart-1)" },
  zone2: { label: "Zone B", color: "var(--chart-4)" },
  zone3: { label: "Zone C", color: "var(--chart-2)" },
} satisfies ChartConfig

const pressureData = [
  { time: "00:00", lineA: 4.8, lineB: 5.1 },
  { time: "02:00", lineA: 4.7, lineB: 5.0 },
  { time: "04:00", lineA: 4.9, lineB: 5.2 },
  { time: "06:00", lineA: 4.8, lineB: 5.1 },
  { time: "08:00", lineA: 4.6, lineB: 4.9 },
  { time: "10:00", lineA: 4.7, lineB: 5.0 },
  { time: "12:00", lineA: 4.9, lineB: 5.2 },
  { time: "14:00", lineA: 4.8, lineB: 5.1 },
  { time: "16:00", lineA: 4.7, lineB: 5.0 },
  { time: "18:00", lineA: 4.8, lineB: 5.1 },
  { time: "20:00", lineA: 4.9, lineB: 5.2 },
  { time: "22:00", lineA: 4.8, lineB: 5.0 },
]

const pressureConfig = {
  lineA: { label: "Line A", color: "var(--chart-3)" },
  lineB: { label: "Line B", color: "var(--chart-1)" },
} satisfies ChartConfig

const vibrationData = [
  { sensor: "CNC-1", level: 1.8 },
  { sensor: "CNC-2", level: 2.1 },
  { sensor: "Press-A", level: 3.2 },
  { sensor: "Press-B", level: 2.8 },
  { sensor: "Lathe-1", level: 1.5 },
  { sensor: "Conv-1", level: 0.9 },
  { sensor: "Conv-2", level: 1.1 },
  { sensor: "Pump-A", level: 2.5 },
]

const vibrationConfig = {
  level: { label: "mm/s RMS", color: "var(--chart-4)" },
} satisfies ChartConfig

const sensorHealth = [
  { name: "T-001 — Furnace Inlet", type: "Temperature", reading: "78.2°C", health: "good" },
  { name: "T-002 — Furnace Outlet", type: "Temperature", reading: "71.5°C", health: "good" },
  { name: "T-003 — Coolant Loop", type: "Temperature", reading: "34.8°C", health: "good" },
  { name: "P-001 — Hydraulic Main", type: "Pressure", reading: "4.9 bar", health: "good" },
  { name: "P-002 — Pneumatic Feed", type: "Pressure", reading: "5.1 bar", health: "good" },
  { name: "V-001 — CNC Spindle", type: "Vibration", reading: "2.1 mm/s", health: "good" },
  { name: "V-002 — Press Ram", type: "Vibration", reading: "3.2 mm/s", health: "warning" },
  { name: "H-001 — Floor Ambient", type: "Humidity", reading: "45%", health: "good" },
]

const healthColors: Record<string, string> = {
  good: "bg-forge-green",
  warning: "bg-forge-red status-online",
}

export default function SensorsPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      {/* Sensor category cards */}
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {sensorOverview.map((sensor) => {
          const st = statusColors[sensor.status]
          return (
            <Card key={sensor.label} className="relative overflow-hidden">
              <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-primary/60 to-transparent" />
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <sensor.icon className="size-4 text-primary" />
                  {sensor.label}
                </CardDescription>
                <CardTitle className="font-display text-2xl font-bold tabular-nums">
                  {sensor.value}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-mono text-xs">{sensor.change} (1h)</span>
                  <Badge variant="outline" className="gap-1.5">
                    <span className={`size-1.5 rounded-full ${st.dot}`} />
                    <span className={`text-xs ${st.text}`}>{sensor.count} sensors</span>
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Temperature chart + Pressure chart */}
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @5xl/main:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Temperature Readings</CardTitle>
            <CardDescription>24-hour zone temperatures (°C)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={tempConfig} className="aspect-auto h-[250px] w-full">
              <AreaChart data={tempData}>
                <defs>
                  <linearGradient id="fillZone1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-zone1)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-zone1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="fillZone2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-zone2)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-zone2)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="fillZone3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-zone3)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-zone3)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeOpacity={0.3} />
                <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} interval={3} />
                <YAxis tickLine={false} axisLine={false} domain={[60, 85]} width={35} />
                <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                <Area type="monotone" dataKey="zone1" stroke="var(--color-zone1)" fill="url(#fillZone1)" strokeWidth={2} />
                <Area type="monotone" dataKey="zone2" stroke="var(--color-zone2)" fill="url(#fillZone2)" strokeWidth={2} />
                <Area type="monotone" dataKey="zone3" stroke="var(--color-zone3)" fill="url(#fillZone3)" strokeWidth={2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display">Vibration Levels</CardTitle>
            <CardDescription>RMS velocity by equipment (mm/s)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={vibrationConfig} className="aspect-auto h-[250px] w-full">
              <BarChart data={vibrationData}>
                <CartesianGrid vertical={false} strokeOpacity={0.3} />
                <XAxis dataKey="sensor" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} width={30} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="level" fill="var(--color-level)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sensor Health Table */}
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Sensor Health</CardTitle>
            <CardDescription>Individual sensor status and latest readings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-2 pb-2 text-xs text-muted-foreground font-mono uppercase tracking-wider">
                <span>Sensor</span>
                <span className="w-24">Type</span>
                <span className="w-20 text-right">Reading</span>
                <span className="w-16 text-right">Health</span>
              </div>
              {sensorHealth.map((s) => (
                <div
                  key={s.name}
                  className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 rounded-sm px-2 py-2 hover:bg-muted/50 transition-colors"
                >
                  <span className="text-sm truncate">{s.name}</span>
                  <span className="w-24 text-sm text-muted-foreground">{s.type}</span>
                  <span className="w-20 text-right font-mono text-sm tabular-nums">{s.reading}</span>
                  <div className="w-16 flex justify-end">
                    <span className={`size-2 rounded-full ${healthColors[s.health]}`} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

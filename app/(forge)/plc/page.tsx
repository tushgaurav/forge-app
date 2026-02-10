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
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Bar, BarChart } from "recharts"
import { RiCpuLine } from "@remixicon/react"

const plcUnits = [
  {
    id: "PLC-S7-1500 #1",
    model: "Siemens S7-1500",
    status: "running",
    scanTime: "2.4 ms",
    inputs: { active: 128, total: 256 },
    outputs: { active: 96, total: 128 },
    memory: 62,
    program: "Main_Line_A",
    errors: 0,
    comms: "PROFINET",
  },
  {
    id: "PLC-AB-5380 #2",
    model: "Allen-Bradley 5380",
    status: "running",
    scanTime: "3.1 ms",
    inputs: { active: 96, total: 192 },
    outputs: { active: 72, total: 96 },
    memory: 48,
    program: "Assembly_Cell_B",
    errors: 0,
    comms: "EtherNet/IP",
  },
  {
    id: "PLC-S7-1200 #3",
    model: "Siemens S7-1200",
    status: "running",
    scanTime: "4.8 ms",
    inputs: { active: 32, total: 64 },
    outputs: { active: 24, total: 32 },
    memory: 35,
    program: "Conveyor_Ctrl",
    errors: 0,
    comms: "PROFINET",
  },
  {
    id: "PLC-M340 #4",
    model: "Schneider M340",
    status: "warning",
    scanTime: "5.2 ms",
    inputs: { active: 48, total: 64 },
    outputs: { active: 32, total: 48 },
    memory: 78,
    program: "HVAC_Control",
    errors: 2,
    comms: "Modbus TCP",
  },
]

const statusConfig: Record<string, { dot: string; text: string }> = {
  running: { dot: "bg-forge-green status-online", text: "text-forge-green" },
  warning: { dot: "bg-forge-red status-online", text: "text-forge-red" },
  stopped: { dot: "bg-muted-foreground", text: "text-muted-foreground" },
}

const scanTimeData = [
  { time: "06:00", plc1: 2.3, plc2: 3.0, plc3: 4.7, plc4: 5.1 },
  { time: "07:00", plc1: 2.4, plc2: 3.1, plc3: 4.8, plc4: 5.0 },
  { time: "08:00", plc1: 2.5, plc2: 3.2, plc3: 4.9, plc4: 5.3 },
  { time: "09:00", plc1: 2.4, plc2: 3.1, plc3: 4.7, plc4: 5.2 },
  { time: "10:00", plc1: 2.3, plc2: 3.0, plc3: 4.8, plc4: 5.4 },
  { time: "11:00", plc1: 2.4, plc2: 3.1, plc3: 5.0, plc4: 5.6 },
  { time: "12:00", plc1: 2.6, plc2: 3.3, plc3: 5.1, plc4: 5.8 },
  { time: "13:00", plc1: 2.4, plc2: 3.1, plc3: 4.9, plc4: 5.3 },
  { time: "14:00", plc1: 2.3, plc2: 3.0, plc3: 4.8, plc4: 5.2 },
  { time: "15:00", plc1: 2.4, plc2: 3.1, plc3: 4.7, plc4: 5.1 },
]

const scanTimeConfig = {
  plc1: { label: "S7-1500 #1", color: "var(--chart-1)" },
  plc2: { label: "AB-5380 #2", color: "var(--chart-2)" },
  plc3: { label: "S7-1200 #3", color: "var(--chart-3)" },
  plc4: { label: "M340 #4", color: "var(--chart-4)" },
} satisfies ChartConfig

const ioData = plcUnits.map((plc) => ({
  name: plc.id.replace("PLC-", "").replace(/\s#\d+/, ""),
  inputs: plc.inputs.active,
  outputs: plc.outputs.active,
}))

const ioConfig = {
  inputs: { label: "Active Inputs", color: "var(--chart-1)" },
  outputs: { label: "Active Outputs", color: "var(--chart-3)" },
} satisfies ChartConfig

const errorLog = [
  { time: "14:32:08", plc: "M340 #4", code: "ERR_0x42", message: "Watchdog timeout on Module 3", severity: "warning" },
  { time: "14:28:15", plc: "M340 #4", code: "ERR_0x21", message: "Comm delay on Modbus address 40012", severity: "info" },
  { time: "12:15:42", plc: "S7-1500 #1", code: "INFO_0x01", message: "Program download completed successfully", severity: "info" },
  { time: "09:45:03", plc: "AB-5380 #2", code: "INFO_0x03", message: "EtherNet/IP ring topology verified", severity: "info" },
  { time: "08:00:00", plc: "ALL", code: "SYS_0x00", message: "Shift start — all PLCs scanned OK", severity: "info" },
]

const severityColors: Record<string, string> = {
  warning: "text-forge-red",
  info: "text-muted-foreground",
}

export default function PlcPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      {/* PLC Status Cards */}
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2">
        {plcUnits.map((plc) => {
          const st = statusConfig[plc.status]
          return (
            <Card key={plc.id} className="relative overflow-hidden">
              <div className={`absolute top-0 left-0 h-0.5 w-full ${plc.status === "running" ? "bg-forge-green/60" : "bg-forge-red/60"}`} />
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <RiCpuLine className="size-4" />
                  {plc.model}
                </CardDescription>
                <CardTitle className="flex items-center justify-between">
                  <span className="font-display text-lg">{plc.id}</span>
                  <Badge variant="outline" className="gap-1.5">
                    <span className={`size-1.5 rounded-full ${st.dot}`} />
                    <span className={`text-xs capitalize ${st.text}`}>{plc.status}</span>
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground text-xs">Scan Time</div>
                    <div className="font-mono font-medium tabular-nums">{plc.scanTime}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">I/O Active</div>
                    <div className="font-mono font-medium tabular-nums">
                      {plc.inputs.active + plc.outputs.active}/{plc.inputs.total + plc.outputs.total}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Memory</div>
                    <div className="font-mono font-medium tabular-nums">{plc.memory}%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Errors</div>
                    <div className={`font-mono font-medium tabular-nums ${plc.errors > 0 ? "text-forge-red" : ""}`}>
                      {plc.errors}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t pt-3 text-sm">
                  <div>
                    <span className="text-muted-foreground text-xs">Program: </span>
                    <span className="font-mono text-xs">{plc.program}</span>
                  </div>
                  <Badge variant="outline" className="text-xs font-mono">{plc.comms}</Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @5xl/main:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Scan Time Trends</CardTitle>
            <CardDescription>Milliseconds per scan cycle — today</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={scanTimeConfig} className="aspect-auto h-[250px] w-full">
              <LineChart data={scanTimeData}>
                <CartesianGrid vertical={false} strokeOpacity={0.3} />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} domain={[0, 7]} width={30} />
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                <Line type="monotone" dataKey="plc1" stroke="var(--color-plc1)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="plc2" stroke="var(--color-plc2)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="plc3" stroke="var(--color-plc3)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="plc4" stroke="var(--color-plc4)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display">I/O Utilization</CardTitle>
            <CardDescription>Active inputs and outputs per PLC</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={ioConfig} className="aspect-auto h-[250px] w-full">
              <BarChart data={ioData}>
                <CartesianGrid vertical={false} strokeOpacity={0.3} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} width={35} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="inputs" fill="var(--color-inputs)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="outputs" fill="var(--color-outputs)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Error Log */}
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Event Log</CardTitle>
            <CardDescription>Recent PLC events and diagnostics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="grid grid-cols-[auto_auto_auto_1fr] gap-4 px-2 pb-2 text-xs text-muted-foreground font-mono uppercase tracking-wider">
                <span className="w-20">Time</span>
                <span className="w-24">PLC</span>
                <span className="w-20">Code</span>
                <span>Message</span>
              </div>
              {errorLog.map((entry, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[auto_auto_auto_1fr] items-center gap-4 rounded-sm px-2 py-2 hover:bg-muted/50 transition-colors"
                >
                  <span className="w-20 font-mono text-sm tabular-nums text-muted-foreground">{entry.time}</span>
                  <span className="w-24 text-sm">{entry.plc}</span>
                  <span className={`w-20 font-mono text-xs ${severityColors[entry.severity]}`}>{entry.code}</span>
                  <span className="text-sm truncate">{entry.message}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
